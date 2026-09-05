import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const seriousViolations = (violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) =>
  violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical');

test.describe('Phase 5 high-risk interaction evidence', () => {
  test('Drawer traps modal focus, dismisses with Escape, and restores its trigger', async ({ page }) => {
    await page.goto('/docs/components/drawer/');
    const preview = page.locator('.frasto-preview').first();
    const trigger = preview.getByRole('button', { name: 'View customer' });
    const drawer = page.getByRole('dialog', { name: 'Customer details' });
    const initialPageGeometry = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        authoredPadding: root.style.paddingInlineEnd,
        bodyWidth: document.body.getBoundingClientRect().width,
        computedPadding: Number.parseFloat(getComputedStyle(root).paddingInlineEnd) || 0,
        reservesStableGutter: getComputedStyle(root).scrollbarGutter.split(/\s+/).includes('stable'),
        scrollbarWidth: Math.max(0, window.innerWidth - root.clientWidth),
      };
    });

    await trigger.click();
    await expect(drawer).toBeVisible();
    await expect(drawer).toHaveAttribute('data-state', 'open');
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(drawer.getByRole('button', { name: 'Close drawer' })).toBeFocused();
    const lockedPageGeometry = await page.evaluate(() => ({
      authoredPadding: document.documentElement.style.paddingInlineEnd,
      bodyWidth: document.body.getBoundingClientRect().width,
      overflow: document.documentElement.style.overflow,
    }));
    expect(Math.abs(lockedPageGeometry.bodyWidth - initialPageGeometry.bodyWidth)).toBeLessThanOrEqual(1);
    if (initialPageGeometry.scrollbarWidth > 0 && !initialPageGeometry.reservesStableGutter) {
      expect(Number.parseFloat(lockedPageGeometry.authoredPadding)).toBe(
        initialPageGeometry.computedPadding + initialPageGeometry.scrollbarWidth,
      );
    }
    // The open state starts the slide; measure final geometry only after it settles.
    await expect(drawer.locator('[data-frasto-drawer-panel]')).toHaveCSS(
      'transform',
      'matrix(1, 0, 0, 1, 0, 0)',
    );
    expect(
      await drawer.locator('[data-frasto-drawer-panel]').evaluate((panel) => {
        const bounds = panel.getBoundingClientRect();
        return Math.abs(window.innerWidth - bounds.right) <= 1;
      }),
    ).toBe(true);
    const drawerGeometry = await drawer.locator('[data-frasto-drawer-panel]').evaluate((panel) => {
      const header = panel.querySelector('header')!;
      const content = panel.querySelector<HTMLElement>('[data-frasto-drawer-content]')!;
      const panelStyle = getComputedStyle(panel);
      return {
        width: panel.getBoundingClientRect().width,
        headerPadding: getComputedStyle(header).paddingTop,
        contentPadding: getComputedStyle(content).paddingTop,
        transitionProperty: panelStyle.transitionProperty,
        transitionDuration: panelStyle.transitionDuration,
      };
    });
    expect(drawerGeometry.width).toBeCloseTo(384, 2);
    expect(drawerGeometry.headerPadding).toBe('24px');
    expect(drawerGeometry.contentPadding).toBe('24px');
    expect(drawerGeometry.transitionProperty).toContain('transform');
    expect(drawerGeometry.transitionDuration).toBe('0.22s');
    const results = await new AxeBuilder({ page }).include('dialog[open]').analyze();
    expect(seriousViolations(results.violations)).toEqual([]);

    const closingGeometry = await drawer.evaluate((element) => {
      element.dispatchEvent(new Event('cancel', { cancelable: true }));
      return {
        paddingInlineEnd: document.documentElement.style.paddingInlineEnd,
        overflow: document.documentElement.style.overflow,
        state: element.getAttribute('data-state'),
      };
    });
    expect(closingGeometry.state).toBe('closing');
    expect(closingGeometry.overflow).toBe('hidden');
    expect(closingGeometry.paddingInlineEnd).toBe(lockedPageGeometry.authoredPadding);
    await expect(drawer).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('');
    expect(await page.evaluate(() => document.documentElement.style.paddingInlineEnd)).toBe(
      initialPageGeometry.authoredPadding,
    );
  });

  test('Dialog locks document scrolling and backdrop interaction restores the page', async ({ page }) => {
    await page.goto('/docs/components/dialog/');
    const preview = page.locator('.frasto-preview').first();
    const trigger = preview.getByRole('button', { name: 'Rename customer' });
    const dialog = page.getByRole('dialog', { name: 'Rename customer' });
    await page.evaluate(() => {
      document.documentElement.style.scrollbarGutter = 'stable';
      document.documentElement.style.paddingInlineEnd = '7px';
    });

    await trigger.click();
    await expect(dialog).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden');
    expect(await page.evaluate(() => document.documentElement.style.paddingInlineEnd)).toBe('7px');
    await page.mouse.click(4, 4);
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('');
    expect(await page.evaluate(() => document.documentElement.style.paddingInlineEnd)).toBe('7px');
    await page.evaluate(() => {
      document.documentElement.style.scrollbarGutter = '';
      document.documentElement.style.paddingInlineEnd = '';
    });
  });

  test('A non-dismissible Drawer requires an explicit completion control', async ({ page }) => {
    await page.goto('/docs/components/drawer/');
    const previews = page.locator('.frasto-preview');
    const preview = previews.nth(1);
    const trigger = preview.getByRole('button', { name: 'Review profile' });
    const drawer = page.getByRole('dialog', { name: 'Complete profile review' });

    await trigger.click();
    await expect(drawer).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(drawer).toBeVisible();
    await drawer.getByRole('button', { name: 'Finish review' }).click();
    await expect(drawer).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('Dropdown supports trigger arrows, roving focus, disabled skipping, and Escape', async ({ page }) => {
    await page.goto('/docs/components/dropdown/');
    const preview = page.locator('.frasto-preview').first();
    const trigger = preview.getByRole('button', { name: 'Actions' });
    const menu = preview.getByRole('menu', { name: 'Customer actions' });

    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('menuitem', { name: 'Edit customer' })).toBeFocused();
    await page.keyboard.press('End');
    await expect(menu.getByRole('menuitem', { name: 'Open documentation' })).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(menu.getByRole('menuitem', { name: 'Edit customer' })).toBeFocused();

    const results = await new AxeBuilder({ page }).include('[data-frasto-dropdown]').analyze();
    expect(seriousViolations(results.violations)).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('Popover dismisses from Escape and outside interaction with correct focus policy', async ({ page }) => {
    await page.goto('/docs/components/popover/');
    const preview = page.locator('.frasto-preview').first();
    const trigger = preview.getByRole('button', { name: 'Sync status' });
    const popover = preview.getByRole('dialog', { name: 'Sync details' });

    await trigger.click();
    await expect(popover).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const results = await new AxeBuilder({ page }).include('[data-frasto-popover]').analyze();
    expect(seriousViolations(results.violations)).toEqual([]);
    await page.keyboard.press('Tab');
    await expect(popover.getByRole('button', { name: 'Review sync log' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(popover).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await page.locator('main h1').click();
    await expect(popover).toBeHidden();
    await expect(trigger).not.toBeFocused();
  });

  test('Floating overlays stay inside viewport edges and nested triggers remain operable', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 480 });
    await page.goto('/docs/components/popover/');
    const preview = page.locator('.frasto-preview').first();
    await preview.getByRole('button', { name: 'Sync status' }).click();
    const panel = preview.getByRole('dialog', { name: 'Sync details' });
    const bounds = await panel.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(7);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(313);
    expect(bounds!.y).toBeGreaterThanOrEqual(7);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(473);

    await page.goto('/demo/');
    const nestedTrigger = page.getByRole('button', { name: 'Open customer actions' });
    await nestedTrigger.click();
    const nestedMenu = page.getByRole('menu', { name: 'Customer actions' });
    await expect(nestedMenu).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(nestedMenu).toBeHidden();
    await expect(nestedTrigger).toBeFocused();
  });

  test('Tooltip preserves hover and focus parity, then dismisses with Escape', async ({ page }) => {
    await page.goto('/docs/components/tooltip/');
    const preview = page.locator('.frasto-preview').first();
    const trigger = preview.getByRole('button', { name: 'Export' });
    const tooltip = preview.getByRole('tooltip');

    await trigger.hover();
    await trigger.focus();
    await expect(tooltip).toBeVisible();
    const results = await new AxeBuilder({ page }).include('[data-frasto-tooltip]').analyze();
    expect(seriousViolations(results.violations)).toEqual([]);
    await page.mouse.move(0, 0);
    await expect(trigger).toBeFocused();
    await expect(tooltip).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(tooltip).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('Tooltip cancels a delayed hover opening after pointer exit', async ({ page }) => {
    await page.goto('/docs/components/tooltip/');
    const preview = page.locator('.frasto-preview').first();
    const trigger = preview.getByRole('button', { name: 'Export' });
    const tooltip = preview.locator('[data-frasto-tooltip-content]');

    await trigger.hover();
    await page.waitForTimeout(100);
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);
    await expect(tooltip).toBeHidden();
  });

  test('Tabs wire relationships, skip disabled tabs, activate with arrows, and emit state', async ({ page }) => {
    await page.goto('/docs/components/tabs/');
    const preview = page.locator('.frasto-preview').first();
    const tabs = preview.locator('[data-frasto-tabs]').first();
    const overview = preview.getByRole('tab', { name: 'Overview' });
    const invoices = preview.getByRole('tab', { name: 'Invoices' });
    const activity = preview.getByRole('tab', { name: 'Activity' });

    await expect(overview).toHaveAttribute('aria-selected', 'true');
    await expect(overview).toHaveAttribute('tabindex', '0');
    await expect(preview.getByRole('tabpanel', { name: 'Overview' })).toBeVisible();
    await page.evaluate(() => {
      const root = document.querySelector('frasto-tabs');
      root?.addEventListener('frasto:tab-change', (event) => {
        (window as Window & { tabDetail?: unknown }).tabDetail = (event as CustomEvent).detail;
      });
    });
    await overview.focus();
    await page.keyboard.press('ArrowRight');
    await expect(invoices).toBeFocused();
    await expect(invoices).toHaveAttribute('aria-selected', 'true');
    await expect(activity).toBeDisabled();
    await expect(preview.getByRole('tabpanel', { name: 'Invoices' })).toBeVisible();
    expect(await page.evaluate(() => (window as Window & { tabDetail?: unknown }).tabDetail)).toEqual({ value: 'invoices' });

    const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
    expect(seriousViolations(results.violations)).toEqual([]);
    expect(await tabs.count()).toBe(1);
    await page.keyboard.press('End');
    await expect(invoices).toBeFocused();
  });

  test('Switch toggles natively, emits change, and preserves form state', async ({ page }) => {
    await page.goto('/docs/components/switch/');
    const preview = page.locator('.frasto-preview').first();
    const activity = preview.getByRole('switch', { name: 'Show account activity' });

    await expect(activity).toBeChecked();
    await page.evaluate(() => {
      const input = document.querySelector<HTMLInputElement>('[data-frasto-switch-input]');
      input?.addEventListener('change', () => {
        (window as Window & { switchChanged?: boolean }).switchChanged = input.checked;
      });
    });
    await activity.focus();
    await page.keyboard.press('Space');
    await expect(activity).not.toBeChecked();
    expect(await page.evaluate(() => (window as Window & { switchChanged?: boolean }).switchChanged)).toBe(false);

    const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
    expect(seriousViolations(results.violations)).toEqual([]);
  });

  test('High-risk previews stay contained in narrow dark reduced-motion mode', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    const paths = ['drawer', 'dropdown', 'popover', 'tooltip', 'tabs', 'switch'];

    for (const component of paths) {
      await page.goto(`/docs/components/${component}/`);
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
      const preview = page.locator('.frasto-preview').first();
      await expect(preview).toBeVisible();
      expect(
        await preview.evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
        `${component} preview should not overflow its narrow workbench`,
      ).toBe(true);
    }
  });
});
