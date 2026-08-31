import { expect, test } from '@playwright/test';

test.use({
  hasTouch: true,
  viewport: { width: 390, height: 844 },
});

test.describe('Phase 5 mobile interaction evidence', () => {
  test('touch opens and dismisses popovers and modal drawers', async ({ page }) => {
    await page.goto('/docs/components/popover/');
    const preview = page.locator('.frasto-preview').first();
    const popoverTrigger = preview.getByRole('button', { name: 'Sync status' });
    const popover = preview.getByRole('dialog', { name: 'Sync details' });

    await popoverTrigger.tap();
    await expect(popover).toBeVisible();
    await page.locator('main h1').tap();
    await expect(popover).toBeHidden();

    await page.goto('/docs/components/drawer/');
    const drawerTrigger = page.locator('.frasto-preview').first().getByRole('button', { name: 'View customer' });
    const drawer = page.getByRole('dialog', { name: 'Customer details' });
    await drawerTrigger.tap();
    await expect(drawer).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden');
    await page.touchscreen.tap(4, 4);
    await expect(drawer).toBeHidden();
    await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('');
  });
});
