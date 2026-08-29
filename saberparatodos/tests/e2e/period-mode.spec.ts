import { test, expect } from '@playwright/test';

test.describe('Period Mode Launch and Degrade Confirmation', () => {
  test('selecting period mode and launching handles period questions gracefully', async ({ page }) => {
    await page.goto('/');

    // Open exam configuration modal if not already open
    const modal = page.locator('[data-testid="modal-content"]');
    if (!(await modal.isVisible())) {
      const configBtn = page.locator('button:has-text("Configurar Examen"), button:has-text("Simulacro")').first();
      await expect(configBtn).toBeVisible({ timeout: 10000 });
      await configBtn.click();
    }

    await expect(modal).toBeVisible({ timeout: 10000 });

    // Switch to Por Periodo
    const periodBtn = page.locator('button:has-text("Por Periodo")');
    await expect(periodBtn).toBeVisible();
    await periodBtn.click();

    // Select Periodo 4
    const period4Btn = page.locator('button:has-text("Periodo 4")');
    await expect(period4Btn).toBeVisible();
    await period4Btn.click();

    // Set up dialog handler for confirm degrade if triggered
    let dialogHandled = false;
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('periodo 4');
      dialogHandled = true;
      await dialog.accept();
    });

    // Click comenzar
    const startBtn = page.locator('button:has-text("Comenzar")');
    await expect(startBtn).toBeVisible();
    await startBtn.click();

    // Verify modal closes or dialog handled
    await page.waitForTimeout(1000);
    const modalVisible = await modal.isVisible();
    expect(!modalVisible || dialogHandled).toBe(true);
  });
});
