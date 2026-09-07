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
    const panel = drawer.locator('[data-frasto-drawer-panel]');
    // Visibility precedes the opening slide and native focus scrolling settling.
    await expect(drawer).toHaveAttribute('data-state', 'open');
    await expect(panel).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
    const backdropPoint = await panel.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return { x: bounds.left / 2, y: window.innerHeight / 2 };
    });
    expect(backdropPoint.x).toBeGreaterThan(0);
    await expect.poll(() => drawer.evaluate((element, point) => (
      document.elementFromPoint(point.x, point.y) === element
    ), backdropPoint)).toBe(true);
    await page.touchscreen.tap(backdropPoint.x, backdropPoint.y);
    await expect(drawer).toBeHidden();
    await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('');
  });
});
