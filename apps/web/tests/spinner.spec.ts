import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const variants = ['orbit', 'breathe', 'cascade', 'counter', 'typewriter'] as const;
const durations = ['1.2s', '1.6s', '1.1s', '1.4s', '1.8s'];
const seriousViolations = (violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) =>
  violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical');

test.describe('Square Spinner redesign', () => {
  test('renders nine decorative square cells for every variant', async ({ page }) => {
    await page.goto('/docs/components/spinner/');

    const defaultSpinner = page.locator('.frasto-preview').first().locator('[data-frasto-spinner]');
    await expect(defaultSpinner).toHaveAttribute('data-variant', 'orbit');
    await expect(defaultSpinner).toHaveAttribute('aria-hidden', 'true');
    await expect(defaultSpinner.locator('[data-frasto-spinner-cell]')).toHaveCount(9);

    const comparison = page.locator('[data-spinner-variants]');
    const spinners = comparison.locator('[data-frasto-spinner]');
    await expect(spinners).toHaveCount(5);

    for (let index = 0; index < variants.length; index += 1) {
      const spinner = spinners.nth(index);
      const cells = spinner.locator('[data-frasto-spinner-cell]');
      await expect(spinner).toHaveAttribute('data-variant', variants[index]);
      await expect(cells).toHaveCount(9);
      await expect(cells.first()).toHaveAttribute('aria-hidden', 'true');

      const animation = await cells.first().evaluate((cell, variant) => {
        const style = getComputedStyle(cell, variant === 'counter' ? '::before' : undefined);
        return { duration: style.animationDuration, name: style.animationName };
      }, variants[index]);
      expect(animation.name).toContain(`frasto-spinner-${variants[index] === 'counter' ? 'orbit' : variants[index]}`);
      expect(animation.duration).toBe(durations[index]);
    }

    await expect(spinners.first().locator('[data-frasto-spinner-cell]').nth(4)).toHaveCSS('animation-name', 'none');
  });

  test('keeps fixed root geometry while cells and customization remain proportional', async ({ page }) => {
    await page.goto('/docs/components/spinner/');
    const sized = page.locator('[data-spinner-sizes] [data-frasto-spinner]');
    const expectedSizes = [12, 16, 20];

    for (let index = 0; index < expectedSizes.length; index += 1) {
      const spinner = sized.nth(index);
      const rootBox = await spinner.boundingBox();
      const cellBox = await spinner.locator('[data-frasto-spinner-cell]').first().boundingBox();
      expect(rootBox).not.toBeNull();
      expect(cellBox).not.toBeNull();
      expect(rootBox!.width).toBeCloseTo(expectedSizes[index], 2);
      expect(rootBox!.height).toBeCloseTo(expectedSizes[index], 2);
      expect(Math.abs(cellBox!.width - cellBox!.height)).toBeLessThan(0.2);
    }

    const orbit = page.locator('[data-spinner-variants] [data-frasto-spinner][data-variant="orbit"]');
    const before = await orbit.boundingBox();
    await page.waitForTimeout(320);
    const after = await orbit.boundingBox();
    expect(after).toEqual(before);

    const customization = page.locator('[data-spinner-customization]');
    const colored = customization.locator('[data-frasto-spinner]').first();
    const colorEvidence = await colored.evaluate((spinner) => ({
      color: getComputedStyle(spinner).color,
      cell: getComputedStyle(spinner.querySelector<HTMLElement>('[data-frasto-spinner-cell]')!).backgroundColor,
    }));
    expect(colorEvidence.cell).toBe(colorEvidence.color);
    await expect(customization.locator('[data-frasto-spinner][data-variant="typewriter"]')).toHaveCSS('animation-duration', '0s');
    await expect(customization.locator('[data-frasto-spinner][data-variant="typewriter"] [data-frasto-spinner-cell]').first()).toHaveCSS('animation-duration', '2.4s');
  });

  test('preserves one loading announcement and Button integration', async ({ page }) => {
    await page.goto('/docs/components/spinner/');
    const semantics = page.locator('[data-spinner-semantics]');
    const decorative = semantics.locator('[data-frasto-spinner]').first();
    const labelled = semantics.locator('[data-frasto-spinner]').nth(1);

    await expect(decorative).toHaveAttribute('aria-hidden', 'true');
    await expect(labelled).toHaveAttribute('role', 'status');
    await expect(labelled).toHaveAccessibleName('Loading the customer reconciliation report');
    await expect(labelled.locator('[data-frasto-spinner-cell]')).toHaveCount(9);

    const button = page.locator('[data-spinner-button]').getByRole('button', { name: 'Saving changes' });
    await expect(button).toHaveAttribute('aria-busy', 'true');
    const buttonSpinner = button.locator('[data-frasto-spinner]');
    await expect(buttonSpinner).toHaveAttribute('data-variant', 'orbit');
    await expect(buttonSpinner.locator('[data-frasto-spinner-cell]')).toHaveCount(9);

    const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
    expect(seriousViolations(results.violations)).toEqual([]);
  });

  test('uses a visible static matrix for reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
    await page.goto('/docs/components/spinner/');
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    const spinners = page.locator('[data-spinner-variants] [data-frasto-spinner]');

    for (let index = 0; index < variants.length; index += 1) {
      const cells = spinners.nth(index).locator('[data-frasto-spinner-cell]');
      const evidence = await cells.evaluateAll((items) => ({
        animationNames: items.map((item) => getComputedStyle(item).animationName),
        opacities: items.map((item) => Number.parseFloat(getComputedStyle(item).opacity)),
      }));
      expect(new Set(evidence.animationNames)).toEqual(new Set(['none']));
      expect(Math.max(...evidence.opacities)).toBeGreaterThan(Math.min(...evidence.opacities));
      expect(Math.max(...evidence.opacities)).toBeGreaterThanOrEqual(0.7);
    }
  });

  test('remains contained with long labels at a narrow zoom-equivalent viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    await page.goto('/docs/components/spinner/');
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));

    const previews = page.locator('.frasto-preview');
    for (let index = 0; index < await previews.count(); index += 1) {
      const preview = previews.nth(index);
      expect(await preview.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });
});
