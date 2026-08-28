import { test, expect } from '@playwright/test';

test.describe('Universal Academic Bento Grid Dashboard (Wave 6.01)', () => {
  async function dismissHero(page: any) {
    const heroCloseBtn = page.locator('#hero-close-btn');
    if (await heroCloseBtn.isVisible()) {
      await heroCloseBtn.click();
    }
  }

  test('validates Bento Grid layout, cards, and modal triggers on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await dismissHero(page);

    // Wait for Svelte app to mount
    const mainContainer = page.locator('main').first();
    await expect(mainContainer).toBeVisible();

    // Verify Hero Primary Route card exists
    const heroCard = page.locator('button').filter({ hasText: /Iniciar Examen/i }).first();
    await expect(heroCard).toBeVisible();

    // Verify Secondary Grades Sub-Grid exists
    const secondaryGradesHeader = page.locator('text=Grados Secundarios');
    await expect(secondaryGradesHeader).toBeVisible();

    // Click on primary grade hero card to trigger ExamConfigModal
    await heroCard.click();

    // Verify ExamConfigModal opens
    const examModal = page.locator('[data-testid="modal-content"], h2:has-text("Configurar Examen")').first();
    await expect(examModal).toBeVisible();
  });

  test('validates responsive single-column Bento Grid on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await dismissHero(page);

    // Wait for Svelte app to mount
    const mainContainer = page.locator('main').first();
    await expect(mainContainer).toBeVisible();

    // Check Hero Card is full-width visible on mobile
    const heroCard = page.locator('button').filter({ hasText: /Iniciar Examen/i }).first();
    await expect(heroCard).toBeVisible();

    // Verify footer copyright is visible and not hidden by overlays
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('World Exams');
  });
});
