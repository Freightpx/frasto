import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Gate 4 component quality paths', () => {
  test('Accordion coordinates state, keyboard focus, disabled items, and events', async ({ page }) => {
    await page.goto('/docs/components/accordion/');
    const accordion = page.locator('.frasto-preview').first().locator('[data-frasto-accordion]');
    const shipping = accordion.getByRole('button', { name: 'How does shipping work?' });
    const returns = accordion.getByRole('button', { name: 'Can I return an order?' });
    const disabled = accordion.getByRole('button', { name: 'Archived policy' });

    await expect(shipping).toHaveAttribute('aria-expanded', 'true');
    await expect(returns).toHaveAttribute('aria-expanded', 'false');
    await expect(disabled).toBeDisabled();
    await expect(accordion.getByText('Orders leave the warehouse')).toBeVisible();
    await expect(accordion.getByText('Unused items may be returned')).toBeHidden();

    await page.evaluate(() => {
      const root = document.querySelector('[data-frasto-accordion]');
      root?.addEventListener('frasto:accordion-change', (event) => {
        (window as Window & { accordionDetail?: unknown }).accordionDetail = (event as CustomEvent).detail;
      });
    });
    await returns.click();
    await expect(returns).toHaveAttribute('aria-expanded', 'true');
    await expect(shipping).toHaveAttribute('aria-expanded', 'false');
    expect(await page.evaluate(() => (window as Window & { accordionDetail?: unknown }).accordionDetail)).toEqual({
      value: 'returns', open: true, values: ['returns'],
    });

    await shipping.focus();
    await page.keyboard.press('ArrowDown');
    await expect(returns).toBeFocused();
    await page.keyboard.press('End');
    await expect(returns).toBeFocused();

    const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
    expect(results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual([]);
  });

  test('Collapsible toggles with the keyboard and emits state', async ({ page }) => {
    await page.goto('/docs/components/collapsible/');
    const root = page.locator('.frasto-preview').first().locator('[data-frasto-collapsible]');
    const trigger = root.getByRole('button', { name: 'Show deployment details' });
    const content = root.getByText('Production deployed from commit');

    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toBeVisible();
    await page.evaluate(() => {
      const collapsible = document.querySelector('[data-frasto-collapsible]');
      collapsible?.addEventListener('frasto:collapsible-change', (event) => {
        (window as Window & { collapsibleDetail?: unknown }).collapsibleDetail = (event as CustomEvent).detail;
      });
    });
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(content).toBeHidden();
    expect(await page.evaluate(() => (window as Window & { collapsibleDetail?: unknown }).collapsibleDetail)).toEqual({ open: false });
  });

  test('Alert remains static, readable, and accessible in narrow dark mode', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/docs/components/alert/');
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    const preview = page.locator('.frasto-preview').first();

    await expect(preview.getByText('Review account details')).toBeVisible();
    await expect(preview.locator('[data-frasto-alert]')).toHaveCount(3);
    await expect(preview.locator('[role="alert"]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

    const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
    expect(results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual([]);
  });

  test('ButtonGroup has a name and preserves child focus order', async ({ page }) => {
    await page.goto('/docs/components/button-group/');
    const preview = page.locator('.frasto-preview').first();
    const group = preview.getByRole('group', { name: 'Save options' });
    const save = group.getByRole('button', { name: 'Save', exact: true });
    const more = group.getByRole('button', { name: 'More save options' });

    await expect(group).toBeVisible();
    await save.focus();
    await page.keyboard.press('Tab');
    await expect(more).toBeFocused();
    await expect(group.locator('[data-frasto-button-group-separator]')).toHaveAttribute('aria-hidden', 'true');

    const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
    expect(results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual([]);
  });

  test('Phase 4 additions remain contained at narrow 200% zoom and honor reduced motion', async ({ page }) => {
    // A 780px-wide browser at 200% zoom exposes roughly a 390 CSS-pixel reflow viewport.
    await page.setViewportSize({ width: 390, height: 900 });
    const paths = [
      '/docs/components/pagination/',
      '/docs/components/stat/',
      '/docs/components/accordion/',
      '/docs/components/collapsible/',
      '/docs/components/alert/',
      '/docs/components/button-group/',
    ];

    for (const path of paths) {
      await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
      await page.goto(path);
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
      });
      const preview = page.locator('.frasto-preview').first();
      await expect(preview).toBeVisible();
      expect(
        await preview.evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
        `${path} preview should not overflow at 200% zoom`,
      ).toBe(true);
    }

    await page.goto('/docs/components/accordion/');
    const indicator = page.locator('.frasto-preview').first().locator('[data-frasto-disclosure-indicator]').first();
    const transitionDuration = await indicator.evaluate((element) => getComputedStyle(element).transitionDuration);
    expect(Number.parseFloat(transitionDuration)).toBeLessThanOrEqual(0.00001);
  });
});
