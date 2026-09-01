import { test, expect } from '@playwright/test';

test.describe('WorldExams NeuroGym - Cognitive Assessment Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/neurogym');
  });

  test('NeuroGym displays introductory overview and starts battery', async ({ page }) => {
    await expect(page.locator('h1:has-text("WorldExams NeuroGym")')).toBeVisible();
    await expect(page.locator('text=Matrices Raven')).toBeVisible();
    await expect(page.locator('text=Test Stroop')).toBeVisible();
    await expect(page.locator('text=Tiempo Reacción')).toBeVisible();

    // Iniciar evaluación
    const startBtn = page.locator('button:has-text("Comenzar Evaluación")');
    await expect(startBtn).toBeVisible();
    await startBtn.click();

    // Fase 1: Matrices Abstractas (Raven)
    await expect(page.locator('text=FASE 1/3: MATRICES ABSTRACTAS')).toBeVisible();
    await expect(page.locator('text=?')).toBeVisible();

    // Responder 3 matrices
    for (let i = 0; i < 3; i++) {
      const optionButtons = page.locator('button:has(svg)');
      await expect(optionButtons.first()).toBeVisible();
      await optionButtons.first().click();
    }

    // Fase 2: Control Inhibitorio (Stroop)
    await expect(page.locator('text=FASE 2/3: INHIBICIÓN & ATENCIÓN')).toBeVisible();
    for (let i = 0; i < 5; i++) {
      const colorBtn = page.locator('button:has-text("Rojo"), button:has-text("Azul"), button:has-text("Verde"), button:has-text("Amarillo")').first();
      await expect(colorBtn).toBeVisible();
      await colorBtn.click();
    }

    // Fase 3: Tiempo de Reacción & Motricidad
    await expect(page.locator('text=FASE 3/3: VELOCIDAD & MOTRICIDAD')).toBeVisible();
    for (let i = 0; i < 3; i++) {
      const tapPad = page.locator('button:has-text("Espera..."), button:has-text("¡AHORA!"), button:has-text("Registrado")');
      await expect(tapPad).toBeVisible();
      // Esperar a que se active o dar click
      await page.waitForTimeout(1500);
      await tapPad.click({ force: true });
    }

    // Pantalla de Resultados Psicométricos Baremados
    await expect(page.locator('text=Resultados de Evaluación Cognitiva')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Proxy CI (Razonamiento Fluido)')).toBeVisible();
    await expect(page.locator('text=Memoria de Trabajo (Span)')).toBeVisible();
    await expect(page.locator('text=Velocidad de Procesamiento (PSI)')).toBeVisible();
    await expect(page.locator('text=Plan de Gimnasio Cerebral Recomendado')).toBeVisible();
  });
});
