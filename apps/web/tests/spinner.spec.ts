import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator, type Page } from '@playwright/test';

const variants = ['orbit', 'breathe', 'cascade', 'counter', 'typewriter', 'refresh'] as const;
const durations = ['1.2s', '1.6s', '1.1s', '1.4s', '1.8s', '1.4s'];
const seriousViolations = (violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) =>
  violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical');

/* Cell indices follow the row-major matrix (1–9). The perimeter is indexed
   clockwise starting at cell 1. */
const PERIMETER = [1, 2, 3, 6, 9, 8, 7, 4];

/**
 * Samples computed opacity of every cell (or one pseudo-element track) across
 * two animation cycles and returns, per cell, the time fraction within one
 * cycle at which that cell reaches its maximum opacity. Negative animation
 * delays make each cell peak at `phase mod duration`, so the returned peak
 * fractions prove movement direction without screenshots or timing luck.
 * Sample times come from performance.now() so timer jitter cannot blur the
 * measured phases.
 */
async function peakFractions(root: Locator, pseudo?: '::before' | '::after', cycles = 2) {
  return root.locator('[data-frasto-spinner-cell]').evaluateAll(async (cells, args) => {
    const { pseudo: pseudoElement, cycles: cycleCount } = args as { pseudo?: string; cycles: number };
    const duration = Number.parseFloat(getComputedStyle(cells[0], pseudoElement).animationDuration) * 1000;
    const samplesPerCycle = 24;
    const samples = samplesPerCycle * cycleCount;
    const interval = (duration * cycleCount) / samples;
    const series: { time: number; opacity: number }[][] = cells.map(() => []);

    for (let step = 0; step <= samples; step += 1) {
      const time = document.timeline && typeof document.timeline.currentTime === 'number'
        ? document.timeline.currentTime
        : performance.now();
      cells.forEach((cell, index) => {
        const opacity = Number.parseFloat(getComputedStyle(cell, pseudoElement).opacity);
        series[index].push({ time, opacity });
      });
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    return series.map((points) => {
      let best = points[0];
      for (const point of points) if (point.opacity > best.opacity) best = point;
      return (best.time % duration) / duration;
    });
  }, { pseudo, cycles } as const);
}

/** Cyclic gap from fraction a to fraction b, in [0, 1). */
const cyclicGap = (a: number, b: number) => (((b - a) % 1) + 1) % 1;

/** Shortest cyclic distance between two fractions on the unit circle. */
const cyclicDistance = (a: number, b: number) => {
  const gap = cyclicGap(a, b);
  return Math.min(gap, 1 - gap);
};

/** Rotates every fraction so `anchor` maps to 0, removing cycle wrap-around. */
const reanchor = (fractions: number[], anchor: number) => fractions.map((value) => cyclicGap(anchor, value));

/**
 * Samples both pseudo-element tracks simultaneously and returns, per valid
 * checkpoint, the perimeter positions of the two brightest heads.
 */
async function simultaneousHeadPositions(root: Locator, durationMs: number) {
  return root.locator('[data-frasto-spinner-cell]').evaluateAll(async (cells, args) => {
    const { duration: cycle, perimeter } = args as { duration: number; perimeter: number[] };
    const cellsByPerimeter = perimeter.map((cell) => cells[cell - 1]);
    const samples = 60;
    const interval = (cycle * 2) / samples;
    const checkpoints: { a: number; b: number; strength: number }[] = [];

    for (let step = 0; step <= samples; step += 1) {
      const before = cellsByPerimeter.map((cell) => Number.parseFloat(getComputedStyle(cell, '::before').opacity));
      const after = cellsByPerimeter.map((cell) => Number.parseFloat(getComputedStyle(cell, '::after').opacity));
      const strongestA = Math.max(...before);
      const strongestB = Math.max(...after);
      if (strongestA > 0.85 && strongestB > 0.85) {
        checkpoints.push({
          a: before.indexOf(strongestA),
          b: after.indexOf(strongestB),
          strength: Math.min(strongestA, strongestB),
        });
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    return checkpoints;
  }, { duration: durationMs, perimeter: PERIMETER } as const);
}

async function openSpinnerPage(page: Page) {
  await page.goto('/docs/components/spinner/');
  await page.locator('[data-spinner-variants]').scrollIntoViewIfNeeded();
}

test.describe('Square Spinner redesign', () => {
  test('renders nine decorative square cells for every variant', async ({ page }) => {
    await page.goto('/docs/components/spinner/');

    const defaultSpinner = page.locator('.frasto-preview').first().locator('[data-frasto-spinner]');
    await expect(defaultSpinner).toHaveAttribute('data-variant', 'orbit');
    await expect(defaultSpinner).toHaveAttribute('aria-hidden', 'true');
    await expect(defaultSpinner.locator('[data-frasto-spinner-cell]')).toHaveCount(9);

    const comparison = page.locator('[data-spinner-variants]');
    const spinners = comparison.locator('[data-frasto-spinner]');
    await expect(spinners).toHaveCount(6);

    for (let index = 0; index < variants.length; index += 1) {
      const spinner = spinners.nth(index);
      const cells = spinner.locator('[data-frasto-spinner-cell]');
      await expect(spinner).toHaveAttribute('data-variant', variants[index]);
      await expect(cells).toHaveCount(9);
      await expect(cells.first()).toHaveAttribute('aria-hidden', 'true');

      const animation = await cells.first().evaluate((cell, variant) => {
        const dualLeader = variant === 'counter' || variant === 'refresh';
        const style = getComputedStyle(cell, dualLeader ? '::before' : undefined);
        const expected = dualLeader ? 'frasto-spinner-leader' : `frasto-spinner-${variant}`;
        return { duration: style.animationDuration, name: style.animationName, expected };
      }, variants[index]);
      expect(animation.name).toContain(animation.expected);
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

  test('orbits the perimeter clockwise from cell 1 while the center stays quiet', async ({ page }) => {
    await openSpinnerPage(page);
    const orbit = page.locator('[data-spinner-variants] [data-frasto-spinner][data-variant="orbit"]');
    const peaks = await peakFractions(orbit);

    for (let step = 0; step < PERIMETER.length; step += 1) {
      const current = PERIMETER[step] - 1;
      const next = PERIMETER[(step + 1) % PERIMETER.length] - 1;
      const gap = cyclicGap(peaks[current], peaks[next]);
      expect(gap, `cell ${PERIMETER[step]} peaks before cell ${PERIMETER[(step + 1) % PERIMETER.length]}`).toBeGreaterThan(0.06);
      expect(gap).toBeLessThan(0.19);
    }

    const center = await orbit.locator('[data-frasto-spinner-cell]').nth(4).evaluate((cell) => getComputedStyle(cell).animationName);
    expect(center).toBe('none');
  });

  test('breathes outward from the center through edges then corners', async ({ page }) => {
    await openSpinnerPage(page);
    const breathe = page.locator('[data-spinner-variants] [data-frasto-spinner][data-variant="breathe"]');
    const fractions = await peakFractions(breathe);
    const peaks = reanchor(fractions, fractions[4]);

    const edges = [2, 4, 6, 8].map((cell) => peaks[cell - 1]);
    const corners = [1, 3, 7, 9].map((cell) => peaks[cell - 1]);
    for (const edge of edges) {
      expect(edge).toBeGreaterThan(0.05);
      expect(edge).toBeLessThan(0.19);
    }
    for (const corner of corners) {
      expect(corner).toBeGreaterThan(Math.max(...edges) - 0.02);
      expect(corner).toBeLessThan(0.33);
    }
  });

  test('cascades diagonally from top-left to bottom-right', async ({ page }) => {
    await openSpinnerPage(page);
    const cascade = page.locator('[data-spinner-variants] [data-frasto-spinner][data-variant="cascade"]');
    const fractions = await peakFractions(cascade);
    const peaks = reanchor(fractions, fractions[0]);

    const bands = [[1], [2, 4], [3, 5, 7], [6, 8], [9]] as const;
    for (let band = 0; band < bands.length - 1; band += 1) {
      const currentMax = Math.max(...bands[band].map((cell) => peaks[cell - 1]));
      const nextMin = Math.min(...bands[band + 1].map((cell) => peaks[cell - 1]));
      expect(nextMin, `diagonal band ${band + 1} peaks after band ${band}`).toBeGreaterThan(currentMax - 0.02);
    }
  });

  test('typewriter reveals cells in row-major reading order', async ({ page }) => {
    await openSpinnerPage(page);
    const typewriter = page.locator('[data-spinner-variants] [data-frasto-spinner][data-variant="typewriter"]');
    const fractions = await peakFractions(typewriter);
    const peaks = reanchor(fractions, fractions[0]);

    for (let cell = 2; cell <= 9; cell += 1) {
      expect(peaks[cell - 1], `cell ${cell} reveals after cell ${cell - 1}`).toBeGreaterThan(peaks[cell - 2] - 0.015);
      expect(cyclicGap(peaks[cell - 2], peaks[cell - 1])).toBeLessThan(0.1);
    }
  });

  test('counter runs two leaders that start apart and advance in opposite directions', async ({ page }) => {
    await openSpinnerPage(page);
    const counter = page.locator('[data-spinner-variants] [data-frasto-spinner][data-variant="counter"]');

    const leaderA = await peakFractions(counter, '::before');
    const leaderB = await peakFractions(counter, '::after');

    // Leader A travels the perimeter clockwise: 1 2 3 6 9 8 7 4.
    for (let step = 0; step < PERIMETER.length; step += 1) {
      const current = PERIMETER[step] - 1;
      const next = PERIMETER[(step + 1) % PERIMETER.length] - 1;
      const gap = cyclicGap(leaderA[current], leaderA[next]);
      expect(gap, `counter leader A advances clockwise from cell ${PERIMETER[step]}`).toBeGreaterThan(0.06);
      expect(gap).toBeLessThan(0.19);
    }

    // Leader B starts at cell 9 and travels counter-clockwise: 9 6 3 2 1 4 7 8.
    const counterClockwise = [9, 6, 3, 2, 1, 4, 7, 8];
    for (let step = 0; step < counterClockwise.length; step += 1) {
      const current = counterClockwise[step] - 1;
      const next = counterClockwise[(step + 1) % counterClockwise.length] - 1;
      const gap = cyclicGap(leaderB[current], leaderB[next]);
      expect(gap, `counter leader B advances counter-clockwise from cell ${counterClockwise[step]}`).toBeGreaterThan(0.06);
      expect(gap).toBeLessThan(0.19);
    }

    // The leaders begin a half loop apart: cells 1 and 9 peak together.
    const startOffset = cyclicDistance(leaderA[0], leaderB[8]);
    expect(startOffset).toBeLessThan(0.08);

    // Both tracks stay readable: center cell stays quiet.
    const center = await counter.locator('[data-frasto-spinner-cell]').nth(4).evaluate((cell) => getComputedStyle(cell).opacity);
    expect(Number.parseFloat(center)).toBeLessThan(0.1);

    // As the leaders slide past each other, their separation takes many values.
    const checkpoints = await simultaneousHeadPositions(counter, 1400);
    expect(checkpoints.length).toBeGreaterThan(10);
    const separations = new Set(checkpoints.map((checkpoint) => (((checkpoint.a - checkpoint.b) % 8) + 8) % 8));
    expect(separations.size).toBeGreaterThan(3);
  });

  test('refresh keeps two clockwise heads half a loop apart without crossing', async ({ page }) => {
    await openSpinnerPage(page);
    const refresh = page.locator('[data-spinner-variants] [data-frasto-spinner][data-variant="refresh"]');

    const headA = await peakFractions(refresh, '::before');
    const headB = await peakFractions(refresh, '::after');

    // Head A follows the clockwise perimeter from cell 1.
    for (let step = 0; step < PERIMETER.length; step += 1) {
      const current = PERIMETER[step] - 1;
      const next = PERIMETER[(step + 1) % PERIMETER.length] - 1;
      const gap = cyclicGap(headA[current], headA[next]);
      expect(gap, `refresh head A advances clockwise from cell ${PERIMETER[step]}`).toBeGreaterThan(0.06);
      expect(gap).toBeLessThan(0.19);
    }

    // Head B follows the user-specified clockwise sequence from cell 9.
    const refreshB = [9, 8, 7, 4, 1, 2, 3, 6];
    for (let step = 0; step < refreshB.length; step += 1) {
      const current = refreshB[step] - 1;
      const next = refreshB[(step + 1) % refreshB.length] - 1;
      const gap = cyclicGap(headB[current], headB[next]);
      expect(gap, `refresh head B advances clockwise from cell ${refreshB[step]}`).toBeGreaterThan(0.06);
      expect(gap).toBeLessThan(0.19);
    }

    // The heads begin together at cells 1 and 9 and stay opposite throughout.
    const startOffset = cyclicDistance(headA[0], headB[8]);
    expect(startOffset).toBeLessThan(0.08);

    const checkpoints = await simultaneousHeadPositions(refresh, 1400);
    expect(checkpoints.length).toBeGreaterThan(10);
    for (const checkpoint of checkpoints) {
      const separation = (((checkpoint.a - checkpoint.b) % 8) + 8) % 8;
      expect(separation, 'refresh heads remain four perimeter positions apart').toBe(4);
    }

    const center = await refresh.locator('[data-frasto-spinner-cell]').nth(4).evaluate((cell) => getComputedStyle(cell).opacity);
    expect(Number.parseFloat(center)).toBeLessThan(0.1);
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
