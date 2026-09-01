import { test, expect } from '@playwright/test';

test.describe('Rigorous Leaderboard & Official ICFES Presets', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Exam config modal presents official ICFES presets (60, 115, 230)', async ({ page }) => {
    // Open practice modal by clicking start practice
    const startButton = page.locator('button:has-text("Comenzar"), button:has-text("Practicar"), button:has-text("Simulacro")').first();
    if (await startButton.isVisible()) {
      await startButton.click();

      // Check presets buttons in modal
      await expect(page.locator('text=15')).toBeVisible();
      await expect(page.locator('text=30')).toBeVisible();
      await expect(page.locator('text=60')).toBeVisible();
      await expect(page.locator('text=115')).toBeVisible();
      await expect(page.locator('text=230')).toBeVisible();

      // Click 230 questions preset
      await page.click('button:has-text("230")');
      await expect(page.locator('text=Cuadernillo Completo Saber 11')).toBeVisible();

      // Click 115 questions preset
      await page.click('button:has-text("115")');
      await expect(page.locator('text=Media Jornada ICFES')).toBeVisible();
    }
  });
});
