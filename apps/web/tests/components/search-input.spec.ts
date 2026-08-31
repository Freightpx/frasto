import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const path = '/docs/application-components/search-input/';

test.describe('SearchInput quality gate', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(path);
  });

  test('clears with the keyboard, restores focus, and emits both events', async ({ page }) => {
    const preview = page.locator('.frasto-preview').first();
    const input = preview.getByRole('searchbox', { name: 'Search customers' });
    const clear = preview.getByRole('button', { name: 'Clear search' });

    await expect(input).toHaveValue('Northstar');
    await expect(clear).toBeVisible();

    await input.evaluate((element) => {
      const testWindow = window as Window & { __frastoEvents?: string[] };
      const root = element.closest('frasto-search-input');
      testWindow.__frastoEvents = [];
      element.addEventListener('input', () => testWindow.__frastoEvents?.push('input'));
      root?.addEventListener('frasto:search-clear', () => testWindow.__frastoEvents?.push('clear'));
    });

    await clear.focus();
    await clear.press('Enter');

    await expect(input).toHaveValue('');
    await expect(input).toBeFocused();
    await expect(clear).toBeHidden();
    await expect.poll(() => page.evaluate(() => (window as Window & { __frastoEvents?: string[] }).__frastoEvents)).toEqual(['input', 'clear']);
  });

  test('synchronizes populated state after uncontrolled typing', async ({ page }) => {
    const preview = page.locator('.frasto-preview').first();
    const input = preview.getByRole('searchbox', { name: 'Search customers' });
    const clear = preview.getByRole('button', { name: 'Clear search' });

    await input.fill('');
    await expect(clear).toBeHidden();
    await input.fill('Frasto');
    await expect(clear).toBeVisible();
  });

  test('has no serious accessibility violations in its preview', async ({ page }) => {
    const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
    const serious = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    );

    expect(serious).toEqual([]);
  });

  for (const theme of ['light', 'dark'] as const) {
    test(`fits a narrow viewport in ${theme} mode`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate((value) => document.documentElement.setAttribute('data-theme', value), theme);

      const preview = page.locator('.frasto-preview').first();
      await expect(preview).toBeVisible();
      expect(await preview.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    });
  }
});
