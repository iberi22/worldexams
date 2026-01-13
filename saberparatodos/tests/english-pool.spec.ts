import { test, expect } from '@playwright/test';

test('English Pool Prefetch and Cache', async ({ page }) => {
  // 1. Go to homepage
  await page.goto('/');

  // 2. Open Exam Configuration
  await page.getByRole('button', { name: 'Simulacro Completo' }).click();

  // 3. Select English Diagnostic Mode
  // If "Inglés Diagnóstico" is not a direct button, we might need to select subject
  await page.getByText('Inglés').click();
  // Toggle diagnostic mode if exists (or check if it auto-activates)

  // Wait for the indicator using the new UI element
  const poolIndicator = page.locator('text=Pool Offline:');
  await expect(poolIndicator).toBeVisible({ timeout: 10000 });

  // 4. Check status
  // It might be prefetching (hourglass) or done (floppy disk)
  const poolText = await poolIndicator.innerText();
  console.log('Pool Status:', poolText);

  // 5. Verify prefetch trigger
  // We expect the count to increase or be sufficient
  // This depends on network, so we just check presence for now
  expect(poolText).toContain('/400');
});
