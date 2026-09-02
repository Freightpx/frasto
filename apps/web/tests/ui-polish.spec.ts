import { expect, test } from '@playwright/test';

test.describe('Component and documentation polish', () => {
  test('semantic control colors reach checked controls and indicators stay centered', async ({ page }) => {
    await page.goto('/docs/components/checkbox/');
    const checkbox = page.getByRole('checkbox', { name: 'Include this customer in the weekly digest' });
    const checkboxRoot = checkbox.locator('xpath=..');

    await page.evaluate(() => {
      document.documentElement.style.setProperty('--frasto-control-selected-bg', 'rgb(92 58 22)');
    });
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await page.waitForTimeout(140);

    const checkboxGeometry = await checkboxRoot.evaluate((root) => {
      const input = root.querySelector<HTMLElement>('[data-frasto-checkbox-input]')!;
      const indicator = root.querySelector<HTMLElement>('[data-frasto-checkbox-indicator]')!;
      const inputBox = input.getBoundingClientRect();
      const indicatorBox = indicator.getBoundingClientRect();
      return {
        background: getComputedStyle(input).backgroundColor,
        inputCenter: [inputBox.x + inputBox.width / 2, inputBox.y + inputBox.height / 2],
        indicatorCenter: [indicatorBox.x + indicatorBox.width / 2, indicatorBox.y + indicatorBox.height / 2],
        opacity: getComputedStyle(indicator).opacity,
      };
    });

    expect(checkboxGeometry.background).toBe('rgb(92, 58, 22)');
    expect(checkboxGeometry.opacity).toBe('1');
    expect(Math.abs(checkboxGeometry.inputCenter[0] - checkboxGeometry.indicatorCenter[0])).toBeLessThan(0.6);
    expect(Math.abs(checkboxGeometry.inputCenter[1] - checkboxGeometry.indicatorCenter[1])).toBeLessThan(0.6);

    await page.goto('/docs/components/radio/');
    const radio = page.getByRole('radio', { name: 'Monthly' });
    const radioRoot = radio.locator('xpath=..');
    const indicator = radioRoot.locator('[data-frasto-radio-indicator]');
    await radio.check();
    await expect(indicator).toHaveCSS('opacity', '1');

    const radioOffset = await radioRoot.evaluate((root) => {
      const input = root.querySelector<HTMLElement>('[data-frasto-radio-input]')!.getBoundingClientRect();
      const dot = root.querySelector<HTMLElement>('[data-frasto-radio-indicator]')!.getBoundingClientRect();
      return {
        x: Math.abs(input.x + input.width / 2 - (dot.x + dot.width / 2)),
        y: Math.abs(input.y + input.height / 2 - (dot.y + dot.height / 2)),
      };
    });
    expect(radioOffset.x).toBeLessThan(0.6);
    expect(radioOffset.y).toBeLessThan(0.6);
  });

  test('accordion and tabs expose restrained state motion', async ({ page }) => {
    await page.goto('/docs/components/accordion/');
    const preview = page.locator('.frasto-preview').first();
    const returns = preview.getByRole('button', { name: 'Can I return an order?' });
    const content = returns
      .locator('xpath=ancestor::*[@data-frasto-accordion-item][1]')
      .locator('[data-frasto-accordion-content]');

    await expect(content).toHaveAttribute('aria-hidden', 'true');
    await expect(content).toHaveAttribute('inert', '');
    expect(await content.evaluate((element) => getComputedStyle(element).transitionProperty)).toContain('grid-template-rows');
    await returns.click();
    await expect(content).toHaveAttribute('aria-hidden', 'false');
    await expect(content).not.toHaveAttribute('inert', '');

    await page.goto('/docs/components/tabs/');
    const overview = page.getByRole('tab', { name: 'Overview' });
    const invoices = page.getByRole('tab', { name: 'Invoices' });
    await page.waitForTimeout(220);
    const initialRule = await overview.evaluate((element) => getComputedStyle(element, '::after').transform);
    await invoices.click();
    await page.waitForTimeout(220);
    const nextRule = await invoices.evaluate((element) => getComputedStyle(element, '::after').transform);
    expect(initialRule).toBe('matrix(1, 0, 0, 1, 0, 0)');
    expect(nextRule).toBe('matrix(1, 0, 0, 1, 0, 0)');
  });

  test('segmented Tabs move one square indicator across variable-width tabs', async ({ page }) => {
    await page.goto('/docs/components/tabs/');
    const preview = page.locator('.frasto-preview').nth(1);
    const root = preview.locator('[data-frasto-tabs]');
    const indicator = root.locator('[data-frasto-tab-indicator]');
    const chats = preview.getByRole('tab', { name: 'Chats' });
    const emails = preview.getByRole('tab', { name: 'Emails' });

    await expect(root).toHaveAttribute('data-indicator-ready', 'true');
    await expect(chats).toHaveAttribute('aria-selected', 'true');
    const before = await indicator.boundingBox();
    const initialGeometry = await preview.evaluate((element) => {
      const list = element.querySelector<HTMLElement>('[data-frasto-tab-list]')!;
      const tabs = Array.from(element.querySelectorAll<HTMLElement>('[data-frasto-tab]'));
      return {
        listWidth: list.getBoundingClientRect().width,
        previewWidth: element.getBoundingClientRect().width,
        tabWidths: tabs.map((tab) => tab.getBoundingClientRect().width),
      };
    });
    await emails.click();
    await expect(emails).toHaveAttribute('aria-selected', 'true');
    await page.waitForTimeout(220);
    const after = await indicator.boundingBox();
    const selectedGeometry = await preview.evaluate((element) => {
      const list = element.querySelector<HTMLElement>('[data-frasto-tab-list]')!;
      const tabs = Array.from(element.querySelectorAll<HTMLElement>('[data-frasto-tab]'));
      return {
        listWidth: list.getBoundingClientRect().width,
        tabWidths: tabs.map((tab) => tab.getBoundingClientRect().width),
      };
    });

    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    expect(after!.x).toBeGreaterThan(before!.x);
    expect(initialGeometry.listWidth).toBeLessThan(initialGeometry.previewWidth);
    expect(Math.abs(selectedGeometry.listWidth - initialGeometry.listWidth)).toBeLessThan(0.6);
    selectedGeometry.tabWidths.forEach((width, index) => {
      expect(Math.abs(width - initialGeometry.tabWidths[index]!)).toBeLessThan(0.6);
    });
    expect(await indicator.evaluate((element) => getComputedStyle(element).transitionProperty)).toContain('transform');
  });

  test('text-entry controls use a focus border without an outer line', async ({ page }) => {
    const cases = [
      ['/docs/components/input/', page.getByRole('textbox', { name: 'Customer name' })],
      ['/docs/components/textarea/', page.getByRole('textbox', { name: 'Internal note' })],
      ['/docs/components/select/', page.getByRole('combobox', { name: 'Customer status' })],
    ] as const;

    for (const [path, control] of cases) {
      await page.goto(path);
      await control.focus();
      await page.waitForTimeout(160);
      const appearance = await control.evaluate((element) => {
        const target = element.matches('textarea') ? element : element.parentElement!;
        const style = getComputedStyle(target);
        return { borderColor: style.borderColor, outlineStyle: style.outlineStyle };
      });
      expect(appearance.outlineStyle).toBe('none');
      expect(appearance.borderColor).toBe('rgb(17, 17, 17)');
    }
  });

  test('ThemeSwitch synchronizes instances, emits state, and responds to storage changes', async ({ page }) => {
    await page.goto('/docs/components/theme-switch/');
    const docsSwitch = page.getByRole('button', { name: /Site color theme/ });
    const previewSwitch = page.getByRole('group', { name: 'Segmented color theme' });
    await page.evaluate(() => {
      document.addEventListener('frasto:theme-change', (event) => {
        (window as Window & { themeDetail?: unknown }).themeDetail = (event as CustomEvent).detail;
      });
    });

    await previewSwitch.getByRole('button', { name: 'Dark' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(docsSwitch).toHaveAttribute('aria-pressed', 'true');
    await expect(docsSwitch).toHaveAccessibleName(/Current theme: Dark. Switch to Light./);
    expect(await page.evaluate(() => (window as Window & { themeDetail?: unknown }).themeDetail)).toEqual({ theme: 'dark' });

    await page.evaluate(() => {
      window.dispatchEvent(new StorageEvent('storage', { key: 'starlight-theme', newValue: 'light' }));
    });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(previewSwitch.getByRole('button', { name: 'Light' })).toHaveAttribute('aria-pressed', 'true');
    await expect(docsSwitch).toHaveAccessibleName(/Current theme: Light. Switch to Dark./);
  });

  test('ThemeSwitch variants keep 36px controls, stable labels, and reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/docs/components/theme-switch/');
    const segmented = page.locator('[data-frasto-theme-switch][data-variant="segmented"]');
    const compact = page.locator('[data-frasto-theme-switch][data-variant="segmented-icons"]');
    const animatedIcon = page.getByRole('button', { name: /Icon color theme/ });
    const animatedLabel = page.locator('[data-frasto-theme-switch][data-variant="animated-icon-label"]').last();

    for (const button of [
      segmented.getByRole('button', { name: 'Light' }),
      segmented.getByRole('button', { name: 'Dark' }),
      compact.getByRole('button', { name: 'Light' }),
      compact.getByRole('button', { name: 'Dark' }),
      animatedIcon,
      animatedLabel.getByRole('button'),
    ]) {
      await expect(button).toHaveCSS('height', '36px');
      await expect(button).toHaveCSS('margin', '0px');
    }

    await expect(compact.getByRole('button', { name: 'Light' })).toHaveCSS('width', '36px');
    await expect(animatedIcon).toHaveCSS('width', '36px');
    const before = await animatedLabel.getByRole('button').boundingBox();
    await animatedLabel.getByRole('button').click();
    const after = await animatedLabel.getByRole('button').boundingBox();
    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    expect(Math.abs(after!.width - before!.width)).toBeLessThan(0.6);
    const transitionDuration = await animatedLabel.locator('[data-frasto-theme-icon]').first()
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration) || 0);
    expect(transitionDuration).toBeLessThanOrEqual(0.01);
  });

  test('ThemeSwitch remains operable when storage is unavailable', async ({ page }) => {
    await page.addInitScript(() => {
      Storage.prototype.getItem = () => {
        throw new DOMException('Storage blocked');
      };
      Storage.prototype.setItem = () => {
        throw new DOMException('Storage blocked');
      };
    });
    await page.goto('/');
    const themeSwitch = page.getByRole('button', { name: /Site color theme/ });
    const initialTheme = await page.locator('html').getAttribute('data-theme');
    await themeSwitch.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', initialTheme === 'dark' ? 'light' : 'dark');
  });

  test('Alert actions and Stat context keep stable responsive geometry', async ({ page }) => {
    await page.goto('/docs/components/alert/');
    const alert = page.locator('[data-frasto-alert]').first();
    const action = alert.locator('[data-frasto-alert-action]');
    await expect(action.getByRole('button', { name: 'Review' })).toBeVisible();
    expect(await action.evaluate((element) => getComputedStyle(element).gridColumnStart)).not.toBe('1');
    const alertAlignment = await alert.evaluate((element) => {
      const icon = element.querySelector<HTMLElement>('[data-frasto-alert-icon]')!;
      const title = element.querySelector<HTMLElement>('[data-frasto-alert-title]')!;
      const iconBox = icon.getBoundingClientRect();
      const titleBox = title.getBoundingClientRect();
      const svgBox = icon.querySelector('svg')!.getBoundingClientRect();
      return {
        offset: Math.abs(iconBox.top - titleBox.top),
        svgHeight: svgBox.height,
        svgWidth: svgBox.width,
      };
    });
    expect(alertAlignment.offset).toBeLessThan(0.6);
    expect(alertAlignment.svgWidth).toBe(20);
    expect(alertAlignment.svgHeight).toBe(20);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/docs/components/alert/');
    const narrowAlert = page.locator('[data-frasto-alert]').first();
    const narrowBody = narrowAlert.locator('[data-frasto-alert-body]');
    const narrowAction = narrowAlert.locator('[data-frasto-alert-action]');
    const alertGeometry = await Promise.all([narrowBody.boundingBox(), narrowAction.boundingBox()]);
    expect(alertGeometry[0]).not.toBeNull();
    expect(alertGeometry[1]).not.toBeNull();
    expect(alertGeometry[1]!.y).toBeGreaterThan(alertGeometry[0]!.y + alertGeometry[0]!.height);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/docs/components/stat/');
    const stats = page.locator('[data-frasto-stat]');
    const topEdges = await stats.evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().top));
    expect(Math.max(...topEdges) - Math.min(...topEdges)).toBeLessThanOrEqual(1);
    const contexts = page.locator('[data-frasto-stat-context]');
    for (let index = 0; index < await contexts.count(); index += 1) {
      await expect(contexts.nth(index)).toHaveCSS('flex-direction', 'column');
    }
  });

  test('installation copy action and theme controls remain aligned and operable', async ({ page }) => {
    await page.goto('/docs/getting-started/installation/');
    const frame = page.locator('.expressive-code figure.frame').first();
    const copy = frame.locator('.copy button');
    const placement = await frame.evaluate((element) => {
      const frameBox = element.getBoundingClientRect();
      const buttonBox = element.querySelector<HTMLElement>('.copy button')!.getBoundingClientRect();
      return {
        top: buttonBox.top - frameBox.top,
        right: frameBox.right - buttonBox.right,
        width: buttonBox.width,
        height: buttonBox.height,
      };
    });
    expect(placement.top).toBeGreaterThanOrEqual(5);
    expect(placement.top).toBeLessThanOrEqual(8);
    expect(placement.right).toBeGreaterThanOrEqual(5);
    expect(placement.right).toBeLessThanOrEqual(8);
    expect(placement.width).toBe(32);
    expect(placement.height).toBe(32);
    await expect(copy).toHaveAttribute('title', 'Copy to clipboard');

    const docsSwitch = page.getByRole('button', { name: /Site color theme/ });
    const initialTheme = await page.locator('html').getAttribute('data-theme');
    const toggledTheme = initialTheme === 'dark' ? 'light' : 'dark';
    await docsSwitch.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', toggledTheme);
    await expect.poll(() => page.evaluate(() => localStorage.getItem('starlight-theme'))).toBe(toggledTheme);
    await docsSwitch.focus();
    await page.keyboard.press('ArrowLeft');
    await expect(docsSwitch).toBeFocused();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.goto('/');
    const siteSwitch = page.getByRole('button', { name: /Site color theme/ });
    await expect(siteSwitch.locator('svg')).toHaveCount(2);
    const siteInitialTheme = await page.locator('html').getAttribute('data-theme');
    const siteToggledTheme = siteInitialTheme === 'dark' ? 'light' : 'dark';
    await siteSwitch.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', siteToggledTheme);
    await expect.poll(() => page.evaluate(() => localStorage.getItem('starlight-theme'))).toBe(siteToggledTheme);
  });
});
