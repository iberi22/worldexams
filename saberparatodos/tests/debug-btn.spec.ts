import { test, expect } from '@playwright/test';
test('debug btn', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  await page.waitForTimeout(2000);
  const btn = page.getByText(/Ver más exámenes/i);
  console.log("Count:", await btn.count());
  if (await btn.count() > 0) {
    console.log("Text:", await btn.first().textContent());
    await btn.first().click({ force: true });
    await page.waitForTimeout(1000);
  }
  const gradeBtn = page.locator('[role="button"]').filter({ hasText: '8°' }).filter({ hasText: 'Grado' }).first();
  console.log("Grade 8 count:", await gradeBtn.count());
  if (await gradeBtn.count() > 0) {
    console.log("Is visible:", await gradeBtn.isVisible());
  }
});
