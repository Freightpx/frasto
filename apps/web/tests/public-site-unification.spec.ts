import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const publicNavigation = ['Home', 'Documentation', 'Components'];
const seriousViolations = (violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) =>
  violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical');

test.describe('Unified public site', () => {
  test('homepage and documentation share the same public identity and header geometry', async ({ page }) => {
    for (const path of ['/', '/docs/components/overview/']) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      const header = page.getByRole('banner').first();
      await expect(header).toBeVisible();
      expect(Math.round((await header.boundingBox())!.height)).toBe(64);

      await expect(page.getByRole('link', { name: 'Frasto home' })).toBeVisible();
      const navigation = page.getByRole('navigation', {
        name: path === '/' ? 'Primary navigation' : 'Documentation navigation',
      });
      for (const label of publicNavigation) {
        await expect(navigation.getByRole('link', { name: label, exact: true })).toBeVisible();
      }
    }
  });

  test('narrow layouts retain task navigation and the documentation menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
    await expect(navigation.getByRole('link', { name: 'Documentation', exact: true })).toBeVisible();
    await expect(navigation.getByRole('link', { name: 'Components', exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

    await page.goto('/docs/components/overview/');
    await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible();
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.locator('starlight-menu-button')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('body')).toHaveAttribute('data-mobile-menu-expanded', '');
    await expect(page.locator('#starlight__sidebar')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Installation' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });

  test('theme preference migrates once and persists between site surfaces', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('starlight-theme');
      localStorage.setItem('frasto-site-theme', 'dark');
    });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect.poll(() => page.evaluate(() => localStorage.getItem('starlight-theme'))).toBe('dark');

    await page.getByRole('button', { name: /Site color theme/ }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.goto('/docs/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.getByRole('button', { name: /Site color theme/ }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('homepage exposes the alpha field without reviving removed sections or demo promotion', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Astro UI components.' })).toBeVisible();
    await expect(page.locator('.hero-astro-mark img')).toHaveCount(2);
    await expect(page.getByText('35 EXPERIMENTAL FAMILIES')).toBeVisible();
    await expect(page.locator('[data-homepage-showcase]')).toBeVisible();
    await expect(page.locator('[data-homepage-showcase] .showcase-region')).toHaveCount(7);
    await expect(page.getByText('Foundation', { exact: true })).toHaveCount(0);
    await expect(page.getByRole('link', { name: /demo/i })).toHaveCount(0);
    await expect(page.locator('a[href="/demo/"]')).toHaveCount(0);
  });

  test('showcase interactions and shared footer remain usable', async ({ page }) => {
    await page.goto('/');
    const showcase = page.locator('[data-homepage-showcase]');

    await showcase.getByRole('tab', { name: 'Manual review' }).click();
    await expect(showcase.getByRole('tabpanel')).toContainText('Keyboard and assistive-technology notes');
    await showcase.getByRole('button', { name: 'Notify' }).click();
    await expect(page.getByText('Release team notified')).toBeVisible();
    await showcase.getByRole('button', { name: 'Open dialog' }).click();
    await expect(page.getByRole('dialog', { name: 'Review release' })).toBeVisible();
    await page.getByRole('dialog', { name: 'Review release' }).getByRole('button', { name: 'Close', exact: true }).click();

    const footer = page.getByRole('contentinfo');
    await expect(footer.getByText('Public alpha · 0.1.0-alpha.1')).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Security' })).toBeVisible();
  });

  test('documentation home is task-led and the private demo remains unindexed', async ({ page }) => {
    await page.goto('/docs/');
    await expect(page.getByRole('heading', { name: 'Build with Frasto UI.' })).toBeVisible();
    await expect(page.locator('.frasto-docs-paths > a')).toHaveCount(4);
    await expect(page.getByText('35 component families remain Experimental', { exact: false })).toBeVisible();
    await expect(page.getByText('Installation', { exact: true }).first()).toBeVisible();

    await page.goto('/demo/');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  });

  test('homepage and documentation have no serious automated accessibility violations', async ({ page }) => {
    for (const path of ['/', '/docs/']) {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      expect(seriousViolations(results.violations), `${path} accessibility`).toEqual([]);
    }
  });

  test('essential public content remains available without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({
      baseURL: 'http://127.0.0.1:4322',
      javaScriptEnabled: false,
    });
    const page = await context.newPage();

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Astro UI components.' })).toBeVisible();
    await expect(page.getByText('35 EXPERIMENTAL FAMILIES')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Open dialog' })).toBeVisible();

    await page.goto('/docs/');
    await expect(page.getByRole('heading', { name: 'Build with Frasto UI.' })).toBeVisible();
    await expect(page.locator('.frasto-docs-paths > a')).toHaveCount(4);
    await context.close();
  });
});
