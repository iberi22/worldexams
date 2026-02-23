import { test, expect } from '@playwright/test';

test.describe('Auth + Leaderboard Smoke', () => {
  test('register page renders magic link form', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByText(/crea tu cuenta sin contrasena|crea tu cuenta sin contraseña/i)).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#submit-btn')).toBeVisible();
  });

  test('dashboard requires institutional membership', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL(/\/instituciones(\?|$)/, { timeout: 20000 });
    await expect(page.getByText(/portal institucional/i)).toBeVisible();
  });

  test('leaderboard alias redirects to ranking page', async ({ page }) => {
    await page.goto('/leaderboard');
    await page.waitForURL(/\/ranking$/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /ranking colombia/i })).toBeVisible();
  });
});
