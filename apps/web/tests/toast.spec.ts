import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const seriousViolations = (violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) =>
  violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical');

test.describe('Toast component family', () => {
  test('shows polite feedback without moving focus and emits dismissal evidence', async ({ page }) => {
    await page.goto('/docs/components/toast/');
    const preview = page.locator('[data-toast-preview]');
    const region = page.getByRole('region', { name: 'Documentation notifications' });
    const trigger = preview.getByRole('button', { name: 'Information' });
    await page.evaluate(() => {
      (window as Window & { toastEvents?: unknown[] }).toastEvents = [];
      document.addEventListener('frasto:toast-show', (event) => {
        (window as Window & { toastEvents?: unknown[] }).toastEvents?.push({
          type: event.type,
          detail: (event as CustomEvent).detail,
        });
      });
      document.addEventListener('frasto:toast-dismiss', (event) => {
        (window as Window & { toastEvents?: unknown[] }).toastEvents?.push({
          type: event.type,
          detail: (event as CustomEvent).detail,
        });
      });
    });

    await trigger.focus();
    await expect(trigger).toBeFocused();
    await trigger.press('Enter');
    await expect(trigger).toBeFocused();
    const toast = region.getByRole('status').filter({ hasText: 'Update available' });
    await expect(toast).toBeVisible();
    await expect(toast).toHaveAttribute('data-tone', 'info');
    await expect(region.getByRole('alert')).toHaveCount(0);

    const results = await new AxeBuilder({ page }).include('[data-frasto-toast-region]').analyze();
    expect(seriousViolations(results.violations)).toEqual([]);

    await toast.getByRole('button', { name: 'Dismiss notification' }).click();
    await expect(toast).toBeHidden();
    const events = await page.evaluate(() => (window as Window & { toastEvents?: unknown[] }).toastEvents);
    expect(events).toEqual([
      expect.objectContaining({ type: 'frasto:toast-show' }),
      expect.objectContaining({
        type: 'frasto:toast-dismiss',
        detail: expect.objectContaining({ reason: 'dismiss' }),
      }),
    ]);
  });

  test('supports actions, assertive priority, visible stacking, and dismiss all', async ({ page }) => {
    await page.goto('/docs/components/toast/');
    const preview = page.locator('[data-toast-preview]');
    const region = page.getByRole('region', { name: 'Documentation notifications' });

    await preview.getByRole('button', { name: 'Action' }).click();
    const actionToast = region.getByRole('status').filter({ hasText: 'Payment method expires soon' });
    await expect(actionToast).toBeVisible();
    await actionToast.getByRole('button', { name: 'Review' }).click();
    await expect(actionToast).toBeHidden();
    await expect(preview).toHaveAttribute('data-toast-action', 'reviewed');

    await preview.getByRole('button', { name: 'Information' }).click();
    await preview.getByRole('button', { name: 'Persistent' }).click();
    await preview.getByRole('button', { name: 'Urgent' }).click();
    await expect(region.locator('[data-frasto-toast]')).toHaveCount(3);
    await expect(region.getByRole('alert').filter({ hasText: 'Connection lost' })).toBeVisible();

    await preview.getByRole('button', { name: 'Dismiss all' }).click();
    await expect(region.locator('[data-frasto-toast]')).toHaveCount(0);
  });

  test('pauses the remaining timeout while hovered', async ({ page }) => {
    await page.goto('/docs/components/toast/');
    const preview = page.locator('[data-toast-preview]');
    await preview.getByRole('button', { name: 'Success' }).click();
    const toast = page.getByRole('region', { name: 'Documentation notifications' })
      .getByRole('status')
      .filter({ hasText: 'Changes saved' });

    await toast.hover();
    await page.waitForTimeout(1350);
    await expect(toast).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(toast).toBeHidden({ timeout: 2000 });

    await preview.getByRole('button', { name: 'Success' }).click();
    const focusPausedToast = page.getByRole('region', { name: 'Documentation notifications' })
      .getByRole('status')
      .filter({ hasText: 'Changes saved' });
    await focusPausedToast.getByRole('button', { name: 'Dismiss notification' }).focus();
    await page.waitForTimeout(1350);
    await expect(focusPausedToast).toBeVisible();
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await expect(focusPausedToast).toBeHidden({ timeout: 2000 });

    await preview.getByRole('button', { name: 'Success' }).click();
    const visibilityPausedToast = page.getByRole('region', { name: 'Documentation notifications' })
      .getByRole('status')
      .filter({ hasText: 'Changes saved' });
    await page.evaluate(() => {
      Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await page.waitForTimeout(1350);
    await expect(visibilityPausedToast).toBeVisible();
    await page.evaluate(() => {
      Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await expect(visibilityPausedToast).toBeHidden({ timeout: 2000 });
  });

  test('supports all viewport positions and narrow long content containment', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/docs/components/toast/');
    const preview = page.locator('[data-toast-preview]');
    const region = page.getByRole('region', { name: 'Documentation notifications' });
    await preview.getByRole('button', { name: 'Persistent' }).click();
    const description = region.locator('[data-frasto-toast-description]');
    await description.evaluate((element) => {
      element.textContent = 'A very long notification description must wrap without forcing the viewport wider than the available mobile layout. '.repeat(5);
    });

    for (const position of [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ]) {
      await region.evaluate((element, value) => element.setAttribute('data-position', value), position);
      const bounds = await region.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(11);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(379);
      if (position.endsWith('left')) expect(bounds!.x).toBeLessThanOrEqual(13);
      if (position.endsWith('right')) expect(bounds!.x + bounds!.width).toBeGreaterThanOrEqual(377);
      if (position.endsWith('center')) {
        expect(Math.abs(bounds!.x + bounds!.width / 2 - 195)).toBeLessThanOrEqual(1);
      }
    }

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });

  test('makes duplicate regions inactive and removes exit motion for reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/docs/components/toast/');
    const region = page.getByRole('region', { name: 'Documentation notifications' });
    const duplicateState = await page.evaluate(() => {
      const duplicate = document.createElement('frasto-toast-region');
      duplicate.setAttribute('aria-label', 'Duplicate notifications');
      duplicate.setAttribute('data-frasto-toast-region', '');
      duplicate.append(document.createElement('div'));
      document.body.append(duplicate);
      return duplicate.dataset.inactive;
    });
    expect(duplicateState).toBe('true');

    await page.getByRole('button', { name: 'Persistent' }).click();
    const toast = region.getByRole('status').filter({ hasText: 'Background import running' });
    await expect(toast).toBeVisible();
    await toast.getByRole('button', { name: 'Dismiss notification' }).click();
    await expect(toast).toBeHidden();
  });
});
