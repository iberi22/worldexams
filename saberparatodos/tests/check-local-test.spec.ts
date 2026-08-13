import { test, expect } from '@playwright/test';

test('debug grade 3', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  await page.getByRole('button', { name: '3° Grado' }).click();
  await page.waitForTimeout(2000);
  const options = await page.locator('select').locator('option').allTextContents();
  console.log("Dropdown Options for Grade 3:", options);
});
