import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Gate 3 component quality paths', () => {
  test('Pagination exposes native navigation, current-page, and link behavior', async ({ page }) => {
    await page.goto('/docs/components/pagination/');

    const preview = page.locator('.frasto-preview').first();
    const pagination = preview.getByRole('navigation', { name: 'Customer results' });

    await expect(pagination).toBeVisible();
    await expect(pagination.locator('ol')).toHaveCount(1);
    await expect(pagination.locator('[aria-current="page"]')).toHaveText('2');
    await expect(pagination.getByRole('link', { name: 'Go to page 1' })).toHaveAttribute('href', '?page=1');

    await pagination.getByRole('link', { name: 'Go to page 1' }).focus();
    await expect(pagination.getByRole('link', { name: 'Go to page 1' })).toBeFocused();

    const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
    expect(results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual([]);
  });

  test('Pagination preserves position context at narrow width in both themes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const theme of ['light', 'dark']) {
      await page.goto('/docs/components/pagination/');
      await page.evaluate((nextTheme) => document.documentElement.setAttribute('data-theme', nextTheme), theme);

      const preview = page.locator('.frasto-preview').first();
      await expect(preview.locator('[data-frasto-pagination-summary]')).toBeVisible();
      await expect(preview.locator('[data-frasto-pagination-current]')).toBeVisible();
      await expect(preview.locator('[data-kind="previous"]')).toBeVisible();
      await expect(preview.locator('[data-kind="next"]')).toBeVisible();
      await expect(preview.locator('[data-kind="gap"]')).toBeHidden();
      await expect(preview.locator('[data-kind="page"]:not([data-current="true"])').first()).toBeHidden();
    }
  });

  test('Stat exposes readable description-list content and wraps at narrow width', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/docs/components/stat/');

    const preview = page.locator('.frasto-preview').first();
    const firstStat = preview.locator('[data-frasto-stat]').first();

    await expect(firstStat.locator('dt')).toHaveText('Active customers');
    await expect(firstStat.locator('[data-frasto-stat-value]')).toHaveText('112');
    await expect(firstStat.locator('[data-frasto-stat-change]')).toHaveText('Up 8 this month');
    await expect(firstStat).toHaveAttribute('data-tone', 'positive');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

    const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
    expect(results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual([]);
  });
});
