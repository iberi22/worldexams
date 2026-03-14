import { test, expect } from '@playwright/test';

test.describe('Prelaunch Practice Shell', () => {
  test('home loads the current practice shell', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /domina el icfes con inteligencia/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /guía completa icfes/i })).toBeVisible();
  });

  test('blog entry point is not exposed in the current shell', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/blog \/ artículos/i)).toHaveCount(0);
  });

  test('legacy practica route redirects to home', async ({ page }) => {
    await page.goto('/practica');
    await page.waitForURL(/\/$/, { timeout: 20000 });
    await expect(page.getByRole('heading', { name: /domina el icfes con inteligencia/i })).toBeVisible();
  });
});
