import { test, expect } from '@playwright/test';

test.describe('Auth + Leaderboard Smoke', () => {
  test('register page is disabled during prelaunch and redirects home', async ({ page }) => {
    await page.goto('/register');
    await page.waitForURL(/\/$/, { timeout: 20000 });
    await expect(page.getByRole('heading', { name: /domina el icfes con inteligencia/i })).toBeVisible();
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
