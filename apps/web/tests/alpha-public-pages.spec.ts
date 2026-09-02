import { expect, test } from '@playwright/test';

test.describe('Public alpha page evidence', () => {
  test('homepage named imports retain Frasto styles and theme tokens', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ colorScheme: 'light' });
    const response = await page.goto('/');

    expect(response?.status()).toBe(200);
    const primaryAction = page.getByRole('link', { name: 'Read the docs' });
    await expect(primaryAction).toBeVisible();

    const lightState = await page.evaluate(() => ({
      background: getComputedStyle(document.body).backgroundColor,
      token: getComputedStyle(document.documentElement).getPropertyValue('--frasto-bg').trim(),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }));
    const primaryStyle = await primaryAction.evaluate((element) => ({
      background: getComputedStyle(element).backgroundColor,
      height: element.getBoundingClientRect().height,
      paddingInline: getComputedStyle(element).paddingInline,
    }));

    expect(lightState.token).not.toBe('');
    expect(lightState.overflow).toBe(false);
    expect(primaryStyle.height).toBe(36);
    expect(primaryStyle.paddingInline).toBe('16px');
    expect(primaryStyle.background).not.toBe('rgba(0, 0, 0, 0)');

    await page.getByRole('button', { name: /Site color theme/ }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const darkBackground = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(darkBackground).not.toBe(lightState.background);
  });

  test('project-status banner stays readable at a narrow dark viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ colorScheme: 'dark' });
    const response = await page.goto('/docs/getting-started/status/');

    expect(response?.status()).toBe(200);
    const banner = page.locator('.sl-markdown-content > p').first();
    await expect(banner).toContainText('public-alpha release-candidate stage');

    const layout = await banner.evaluate((element) => ({
      clientWidth: element.clientWidth,
      display: getComputedStyle(element).display,
      scrollWidth: element.scrollWidth,
      textTransform: getComputedStyle(element).textTransform,
    }));

    expect(layout.display).toBe('block');
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
    expect(layout.textTransform).toBe('none');
  });
});
