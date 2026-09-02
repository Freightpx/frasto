import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const seriousViolations = (violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) =>
  violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical');

test.describe('Phase 5 static-component evidence', () => {
  test('Display primitives preserve visible meaning and loading semantics', async ({ page }) => {
    await page.goto('/docs/components/avatar/');
    const avatarPreview = page.locator('.frasto-preview').first();
    await expect(avatarPreview.getByRole('img', { name: 'Maya Chen' })).toBeVisible();

    await page.goto('/docs/components/badge/');
    const badgePreview = page.locator('.frasto-preview').first();
    await expect(badgePreview.getByText('Active', { exact: true })).toBeVisible();

    await page.goto('/docs/components/status/');
    const statusPreview = page.locator('.frasto-preview').first();
    await expect(statusPreview.getByText('Needs review', { exact: true })).toBeVisible();
    await expect(statusPreview.locator('[data-frasto-status-marker]').first()).toHaveAttribute('aria-hidden', 'true');

    await page.goto('/docs/components/skeleton/');
    await expect(page.locator('.frasto-preview').first().locator('[data-frasto-skeleton]').first()).toHaveAttribute('aria-hidden', 'true');

    await page.goto('/docs/components/spinner/');
    await expect(page.locator('.frasto-preview').first().locator('[data-frasto-spinner]')).toHaveAttribute('aria-hidden', 'true');
  });

  test('Breadcrumb, Surface, and Separator expose deliberate structure', async ({ page }) => {
    await page.goto('/docs/components/breadcrumb/');
    const breadcrumb = page.getByRole('navigation', { name: 'Customer location' });
    await expect(breadcrumb.getByRole('link', { name: 'Workspace' })).toHaveAttribute('href', '/docs/');
    await expect(breadcrumb.getByText('Northstar Goods', { exact: true })).toHaveAttribute('aria-current', 'page');

    await page.goto('/docs/components/surface/');
    await expect(page.getByRole('region', { name: 'Account summary' })).toBeVisible();

    await page.goto('/docs/components/separator/');
    await expect(page.locator('.frasto-preview').first().getByRole('separator')).toBeVisible();
  });

  test('Representative static previews have no serious accessibility violations', async ({ page }) => {
    const paths = ['avatar', 'badge', 'status', 'skeleton', 'spinner', 'breadcrumb', 'surface', 'separator'];

    for (const component of paths) {
      await page.goto(`/docs/components/${component}/`);
      const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
      expect(seriousViolations(results.violations), `${component} preview accessibility`).toEqual([]);
    }
  });

  test('Static families remain contained with long content at a 320 CSS-pixel reflow equivalent', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    const paths = [
      'components/avatar', 'components/badge', 'components/status', 'components/skeleton',
      'components/spinner', 'components/alert', 'application-components/empty-state',
      'components/breadcrumb', 'components/pagination', 'components/stat', 'components/surface',
      'components/separator', 'application-components/page-header', 'components/button-group',
    ];

    for (const component of paths) {
      await page.goto(`/docs/${component}/`);
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
      });
      const preview = page.locator('.frasto-preview').first();
      const longText = 'A deliberately long localized interface label that must wrap without obscuring adjacent content';
      await preview.evaluate((element, text) => {
        const target = element.querySelector('[data-frasto-badge], [data-frasto-status-label], [data-frasto-alert-title]');
        if (target) target.textContent = text;
      }, longText);
      await expect(preview).toBeVisible();
      expect(
        await preview.evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
        `${component} preview should not overflow in narrow dark reflow mode`,
      ).toBe(true);
    }
  });
});
