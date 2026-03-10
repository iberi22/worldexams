import { test, expect } from '@playwright/test';

test.describe('English Module E2E Verification', () => {

  test('should complete an English exam and verify new UI improvements', async ({ page }) => {
    test.setTimeout(180000);

    await page.goto('/practica');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => {
      const selectors = ['.cookie-banner', '#cookie-notice', '[class*="cookie"]', '[id*="cookie"]', '[class*="privacy"]'];
      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => el.remove());
      });
    }).catch(() => {});

    const localModeNotice = page.getByRole('button', { name: /Entendido/i }).first();
    await page.getByRole('button', { name: /Aceptar cookies|Rechazar cookies/i }).first().click({ force: true }).catch(() => {});
    await localModeNotice.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    if (await localModeNotice.isVisible().catch(() => false)) {
      await localModeNotice.click({ force: true });
      await expect(localModeNotice).toBeHidden({ timeout: 10000 });
    }

    const englishCard = page.getByRole('button', { name: /Inglés.*Diagnóstico/i }).first();
    await expect(englishCard).toBeVisible({ timeout: 20000 });
    await englishCard.click({ force: true });

    const startExamBtn = page.getByRole('button', { name: /Comenzar|Empezar|Iniciar/i }).first();
    await expect(startExamBtn).toBeVisible({ timeout: 15000 });
    await startExamBtn.click({ force: true });

    await expect(page.locator('text=Pregunta 1 /').first()).toBeVisible({ timeout: 30000 });
    await expect(page.locator('[data-testid="options-grid"]')).toBeVisible({ timeout: 30000 });

    let questionCount = 0;
    while (questionCount < 40) {
      if (await page.getByRole('heading', { name: /Resultados/i }).isVisible().catch(() => false)) {
        break;
      }

      const options = page.locator('[data-testid="options-grid"] > *');
      const nextBtn = page.getByRole('button', { name: /Siguiente|Finalizar/i }).last();

      if (await options.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await options.first().click();
      }

      await expect(nextBtn).toBeVisible({ timeout: 10000 });
      await nextBtn.click();
      questionCount += 1;
    }

    await expect(page.getByRole('heading', { name: /Resultados/i })).toBeVisible({ timeout: 20000 });
    await expect(page.locator('body')).toContainText(/Precisión/);
    await expect(page.locator('body')).toContainText(/Plan de Estudio Personalizado|NotebookLM|Descargar \.MD/);
    await expect(page.getByRole('button', { name: /Descargar \.MD/i })).toBeVisible();
  });
});
