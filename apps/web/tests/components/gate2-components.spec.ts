import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Gate 2 component quality paths', () => {
  test('Table preserves semantics and contains narrow overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/docs/application-components/table/');

    const preview = page.locator('.frasto-preview').first();
    const table = preview.getByRole('table', { name: 'Customer accounts' });
    const container = preview.locator('[data-frasto-table-container]');

    await expect(table).toBeVisible();
    await expect(table.locator('th[scope="col"]')).toHaveCount(4);
    await expect(table.locator('th[scope="row"]')).toHaveCount(3);
    const dimensions = await container.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(dimensions.scrollWidth > dimensions.clientWidth).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });

  test('PageHeader keeps hierarchy and stacks actions at narrow width', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/docs/application-components/page-header/');

    const preview = page.locator('.frasto-preview').first();
    const header = preview.locator('[data-frasto-page-header]');
    const content = header.locator('[data-frasto-page-header-content]');
    const actions = header.locator('[data-frasto-page-header-actions]');

    await expect(header.getByRole('heading', { name: 'Customers', level: 2 })).toBeVisible();
    await expect(actions.getByRole('button')).toHaveCount(2);

    const contentBox = await content.boundingBox();
    const actionsBox = await actions.boundingBox();
    expect(contentBox).not.toBeNull();
    expect(actionsBox).not.toBeNull();
    expect(actionsBox?.y).toBeGreaterThan(contentBox?.y ?? 0);
  });

  test('EmptyState preserves hierarchy, decorative icon policy, and action order', async ({ page }) => {
    await page.goto('/docs/application-components/empty-state/');

    const preview = page.locator('.frasto-preview').first();
    const emptyState = preview.locator('[data-frasto-empty-state]');

    await expect(emptyState.getByRole('heading', { name: 'No invoices yet', level: 3 })).toBeVisible();
    await expect(emptyState.locator('[data-frasto-empty-state-icon]')).toHaveAttribute('aria-hidden', 'true');
    await expect(emptyState.getByRole('button').nth(0)).toHaveText('Create invoice');
    await expect(emptyState.getByRole('button').nth(1)).toHaveText('View billing guide');

    const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
    expect(results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual([]);
  });

  test('Dialog opens modally, dismisses with Escape, and restores focus', async ({ page }) => {
    await page.goto('/docs/components/dialog/');

    const preview = page.locator('.frasto-preview').first();
    const trigger = preview.getByRole('button', { name: 'Rename customer' });
    const dialog = page.getByRole('dialog', { name: 'Rename customer' });

    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const results = await new AxeBuilder({ page }).include('dialog[open]').analyze();
    expect(results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual([]);

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
