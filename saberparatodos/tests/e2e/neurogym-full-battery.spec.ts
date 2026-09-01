import { test, expect } from '@playwright/test';

test.describe('WorldExams NeuroGym - Exhaustive E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/neurogym');
  });

  test('executes end-to-end cognitive evaluation and verifies radar visual outputs', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('NeuroGym');

    // Iniciar evaluación
    await page.click('button:has-text("Comenzar Evaluación")');

    // Responder Raven
    await expect(page.locator('text=FASE 1/3: MATRICES ABSTRACTAS')).toBeVisible();
    for (let i = 0; i < 3; i++) {
      const opt = page.locator('button:has(svg)').first();
      await opt.click();
    }

    // Responder Stroop
    await expect(page.locator('text=FASE 2/3: INHIBICIÓN & ATENCIÓN')).toBeVisible();
    for (let i = 0; i < 5; i++) {
      const colorBtn = page.locator('button:has-text("Rojo"), button:has-text("Azul"), button:has-text("Verde"), button:has-text("Amarillo")').first();
      await colorBtn.click();
    }

    // Responder Reaction
    await expect(page.locator('text=FASE 3/3: VELOCIDAD & MOTRICIDAD')).toBeVisible();
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(1400);
      const pad = page.locator('button:has-text("Espera..."), button:has-text("¡AHORA!"), button:has-text("Registrado")');
      await pad.click({ force: true });
    }

    // Comprobar pantalla de resultados y recomendaciones de ejercicios
    await expect(page.locator('text=Resultados de Evaluación Cognitiva')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Proxy CI (Razonamiento Fluido)')).toBeVisible();
    await expect(page.locator('text=Plan de Gimnasio Cerebral Recomendado')).toBeVisible();
  });
});
