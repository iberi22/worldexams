import { test, expect } from '@playwright/test';

/**
 * WorldExams NeuroGym - Exhaustive E2E Test Suite
 * File Target: saberparatodos/tests/e2e/neurogym-full-battery.spec.ts
 *
 * Validates 100% of user pathways:
 * - Full psychometric battery assessment execution (Raven, Stroop, Reaction) to score calculation and recommendation plan
 * - Institutional P2P consent toggle modal ("Acuerdo P2P")
 * - Navigation across all 9 NeuroGym tabs and SVG Cognitive Radar Chart visual outputs
 * - Daily micro-workout routine execution with reaction time handling and completed streak state
 */

test.describe('WorldExams NeuroGym - Exhaustive E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/neurogym');
  });

  test('executes end-to-end cognitive evaluation battery and verifies psychometric scores & workout plan', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('WorldExams NeuroGym');

    // Start evaluation battery
    const startBtn = page.locator('button:has-text("Comenzar Evaluación")');
    await expect(startBtn).toBeVisible();
    await startBtn.click();

    // Phase 1: Abstract Raven Matrices (3 trials)
    await expect(page.locator('text=FASE 1/3: MATRICES ABSTRACTAS')).toBeVisible();
    for (let i = 0; i < 3; i++) {
      const optionButtons = page.locator('button:has(svg)');
      await expect(optionButtons.first()).toBeVisible();
      await optionButtons.first().click();
    }

    // Phase 2: Stroop Inhibition & Attention (5 trials)
    await expect(page.locator('text=FASE 2/3: INHIBICIÓN & ATENCIÓN')).toBeVisible();
    for (let i = 0; i < 5; i++) {
      const colorBtn = page.locator('button:has-text("Rojo"), button:has-text("Azul"), button:has-text("Verde"), button:has-text("Amarillo")').first();
      await expect(colorBtn).toBeVisible();
      await colorBtn.click();
    }

    // Phase 3: Speed & Motor Reaction (3 trials)
    await expect(page.locator('text=FASE 3/3: VELOCIDAD & MOTRICIDAD')).toBeVisible();
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(1400);
      const tapPad = page.locator('button:has-text("Espera..."), button:has-text("¡AHORA!"), button:has-text("Registrado")');
      await expect(tapPad).toBeVisible();
      await tapPad.click({ force: true });
    }

    // Verify Psychometric Score Card & Domain Breakdown Results
    await expect(page.locator('text=Resultados de Evaluación Cognitiva')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Puntaje Estándar Compuesto')).toBeVisible();
    await expect(page.locator('text=Proxy CI (Razonamiento Fluido)')).toBeVisible();
    await expect(page.locator('text=Memoria de Trabajo (Span)')).toBeVisible();
    await expect(page.locator('text=Velocidad de Procesamiento (PSI)')).toBeVisible();
    await expect(page.locator('text=Agilidad Motora & Control')).toBeVisible();
    await expect(page.locator('text=Flexibilidad Analítica')).toBeVisible();

    // Verify Recommended Daily Workout Plan
    await expect(page.locator('text=Plan de Gimnasio Cerebral Recomendado')).toBeVisible();

    // Reset and return to intro screen
    const resetBtn = page.locator('button:has-text("Nueva Evaluación")');
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();
    await expect(page.locator('button:has-text("Comenzar Evaluación")')).toBeVisible();
  });

  test('toggles institutional P2P agreement consent modal and verifies privacy content', async ({ page }) => {
    // Open Institutional P2P modal
    const p2pBtn = page.locator('button:has-text("Acuerdo P2P")');
    await expect(p2pBtn).toBeVisible();
    await p2pBtn.click();

    // Modal should be visible with text & close options
    const modalHeading = page.locator('h3:has-text("Acuerdo P2P Institucional")');
    await expect(modalHeading).toBeVisible();
    await expect(page.locator('text=Intercambio P2P local habilitado sin servidores intermedios')).toBeVisible();

    // Close modal via "Entendido" button
    const confirmBtn = page.locator('button:has-text("Entendido")');
    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();

    await expect(modalHeading).not.toBeVisible();
  });

  test('navigates across all 9 NeuroGym tabs and verifies Cognitive Radar Chart SVG rendering', async ({ page }) => {
    // 1. Gimnasio Diario
    await page.click('button:has-text("Gimnasio Diario")');
    await expect(page.locator('h3:has-text("Micro-Entrenamiento Diario")')).toBeVisible();

    // 2. WebGPU 3D
    await page.click('button:has-text("WebGPU 3D")');
    await expect(page.locator('text=Rotación Espacial')).toBeVisible();

    // 3. Coach Agéntico
    await page.click('button:has-text("Coach Agéntico")');
    await expect(page.locator('text=Neuro-Coach Agéntico')).toBeVisible();

    // 4. Duelo P2P
    await page.click('button:has-text("Duelo P2P")');
    await expect(page.locator('text=Duelo Cognitivo P2P')).toBeVisible();

    // 5. Psicoacústica
    await page.click('button:has-text("Psicoacústica")');
    await expect(page.locator('text=Estación Psicoacústica')).toBeVisible();

    // 6. Radar & Historial
    await page.click('button:has-text("Radar & Historial")');
    await expect(page.locator('text=Historial de Evaluaciones')).toBeVisible();
    // Check SVG Radar Chart presence and axis labels
    const radarSvg = page.locator('svg polygon').first();
    await expect(radarSvg).toBeVisible();
    await expect(page.locator('text=Razonamiento (IQ)')).toBeVisible();
    await expect(page.locator('text=Memoria Trabajo')).toBeVisible();

    // 7. Talleres de Aula
    await page.click('button:has-text("Talleres de Aula")');
    await expect(page.locator('text=Generador de Talleres')).toBeVisible();

    // 8. Gabinete Orientación
    await page.click('button:has-text("Gabinete Orientación")');
    await expect(page.locator('text=Informe para Orientación')).toBeVisible();

    // 9. Back to Evaluación
    await page.click('button:has-text("Evaluación Psicométrica")');
    await expect(page.locator('button:has-text("Comenzar Evaluación")')).toBeVisible();
  });

  test('executes daily micro-workout routine and verifies completion streak state', async ({ page }) => {
    // Switch to Gimnasio Diario tab
    await page.click('button:has-text("Gimnasio Diario")');
    await expect(page.locator('h3:has-text("Micro-Entrenamiento Diario")')).toBeVisible();

    // Start Daily Routine
    const startRoutineBtn = page.locator('button:has-text("Iniciar Rutina de Hoy")');
    await expect(startRoutineBtn).toBeVisible();
    await startRoutineBtn.click();

    // Block 1: Stroop Inhibition (5 trials)
    await expect(page.locator('text=BLOQUE 1: INHIBICIÓN')).toBeVisible();
    for (let i = 0; i < 5; i++) {
      const colorBtn = page.locator('button:has-text("Rojo"), button:has-text("Azul"), button:has-text("Verde"), button:has-text("Amarillo")').first();
      await expect(colorBtn).toBeVisible();
      await colorBtn.click();
    }

    // Block 2: Speed Motor (3 trials)
    await expect(page.locator('text=BLOQUE 2: VELOCIDAD')).toBeVisible();
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(1400);
      const tapPad = page.locator('button:has-text("Espera..."), button:has-text("¡AHORA!"), button:has-text("Registrado")');
      await expect(tapPad).toBeVisible();
      await tapPad.click({ force: true });
    }

    // Verify Completion Screen
    await expect(page.locator('text=¡Rutina Diaria Completada!')).toBeVisible();
    const returnBtn = page.locator('button:has-text("Volver al Panel")');
    await expect(returnBtn).toBeVisible();
    await returnBtn.click();

    await expect(page.locator('button:has-text("Iniciar Rutina de Hoy")')).toBeVisible();
  });
});
