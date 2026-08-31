import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const seriousViolations = (violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) =>
  violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical');

test.describe('Phase 5 native-control evidence', () => {
  test('Button loading state exposes only its progress label', async ({ page }) => {
    await page.goto('/docs/components/button/');
    const preview = page.locator('.frasto-preview').filter({ hasText: 'Save changes' });
    const loading = preview.getByRole('button', { name: 'Saving changes', exact: true });

    await expect(loading).toBeVisible();
    await expect(loading).toBeDisabled();
    await expect(loading).toHaveAttribute('aria-busy', 'true');
    await expect(preview.getByRole('button', { name: 'Save changes Saving changes', exact: true })).toHaveCount(0);
  });

  test('Input states retain native focus, editability, and invalid semantics', async ({ page }) => {
    await page.goto('/docs/components/input/');
    const customer = page.getByRole('textbox', { name: 'Customer name' });
    const invalid = page.getByRole('textbox', { name: 'Invalid reference' });
    const disabled = page.getByRole('textbox', { name: 'Disabled reference' });
    const readonly = page.getByRole('textbox', { name: 'Read-only reference' });

    await customer.fill('Northstar Goods');
    await expect(customer).toHaveValue('Northstar Goods');
    await expect(invalid).toHaveAttribute('aria-invalid', 'true');
    await expect(disabled).toBeDisabled();
    await expect(readonly).toHaveAttribute('readonly', '');
    await readonly.focus();
    await expect(readonly).toBeFocused();

    const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
    expect(seriousViolations(results.violations)).toEqual([]);
  });

  test('Textarea and Select preserve native value and option behavior', async ({ page }) => {
    await page.goto('/docs/components/textarea/');
    const note = page.getByRole('textbox', { name: 'Internal note' });
    await note.fill('Operational context');
    await expect(note).toHaveValue('Operational context');
    await expect(page.getByRole('textbox', { name: 'Invalid note' })).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByRole('textbox', { name: 'Disabled note' })).toBeDisabled();

    await page.goto('/docs/components/select/');
    const status = page.getByRole('combobox', { name: 'Customer status' });
    await status.selectOption({ label: 'Invited' });
    await expect(status).toHaveValue('Invited');
  });

  test('Checkbox and Radio retain native keyboard and grouping behavior', async ({ page }) => {
    await page.goto('/docs/components/checkbox/');
    const digest = page.getByRole('checkbox', { name: 'Include this customer in the weekly digest' });
    await digest.focus();
    await page.keyboard.press('Space');
    await expect(digest).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'Unavailable option' })).toBeDisabled();

    await page.goto('/docs/components/radio/');
    const monthly = page.getByRole('radio', { name: 'Monthly' });
    const annual = page.getByRole('radio', { name: 'Annual' });
    await monthly.focus();
    await page.keyboard.press('ArrowDown');
    await expect(annual).toBeFocused();
    await expect(annual).toBeChecked();
    await expect(monthly).not.toBeChecked();
  });

  test('FormField composes label, description, error, and control semantics', async ({ page }) => {
    await page.goto('/docs/components/form-field/');
    const email = page.getByRole('textbox', { name: 'Email', exact: true });
    const billing = page.getByRole('textbox', { name: 'Billing email' });

    await expect(email).toHaveAccessibleDescription('Used for account notices.');
    await expect(billing).toHaveAttribute('aria-invalid', 'true');
    await expect(billing).toHaveAccessibleDescription('Enter a valid email address.');
    const results = await new AxeBuilder({ page }).include('.frasto-preview').analyze();
    expect(seriousViolations(results.violations)).toEqual([]);
  });

  test('Native-control previews reflow at narrow width and 200% zoom', async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 800 });
    const paths = ['button', 'icon-button', 'input', 'textarea', 'select', 'checkbox', 'radio', 'form-field'];

    for (const component of paths) {
      await page.goto(`/docs/components/${component}/`);
      await page.evaluate(() => {
        document.documentElement.style.zoom = '2';
      });
      const preview = page.locator('.frasto-preview').first();
      await expect(preview).toBeVisible();
      expect(
        await preview.evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
        `${component} preview should not overflow at 200% zoom`,
      ).toBe(true);
    }
  });
});
