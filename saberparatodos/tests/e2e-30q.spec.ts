import { test, expect } from '@playwright/test';

const BASE_URL = 'https://saberparatodos.space';

async function startExam(page: any, grade: any, subject: any, mode: any, period: number | null = null) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  const gradeBtn = page.locator('button').filter({ hasText: `${grade}° Grado` }).first();
  await expect(gradeBtn).toBeVisible({ timeout: 15000 });
  await gradeBtn.click();
  await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 120000 });

  const dropdown = page.locator('select');
  await expect(dropdown).toBeVisible({ timeout: 5000 });
  await dropdown.selectOption({ label: subject });

  if (mode === 'period') {
    const periodModeBtn = page.locator('button').filter({ hasText: 'Por Periodo' }).first();
    await expect(periodModeBtn).toBeVisible();
    await periodModeBtn.click();
    const periodBtn = page.locator('button').filter({ hasText: `Periodo ${period}` }).first();
    await expect(periodBtn).toBeVisible({ timeout: 10000 });
    await periodBtn.click();
  }

  const btn30 = page.locator('button').filter({ hasText: '30' }).first();
  await expect(btn30).toBeVisible({ timeout: 5000 });
  await btn30.click();

  const startBtn = page.locator('button').filter({ hasText: 'Comenzar' }).first();
  await expect(startBtn).toBeEnabled({ timeout: 10000 });
  await startBtn.click();
}

async function validateQuestions(page: any, label: any) {
  try {
    await expect(page.getByTestId('options-grid')).toBeVisible({ timeout: 60000 });
    const count = await page.locator('[data-testid="options-grid"] button, [data-testid="options-grid"] div[role="button"]').count();
    expect(count).toBeGreaterThanOrEqual(2);
    console.log(`✅ ${label}: SUCCESS (${count} options)`);
  } catch (e) {
    const errorEl = page.locator('div[role="alert"], .text-red-400, .bg-red-500\\/10').first();
    if (await errorEl.isVisible({ timeout: 3000 }).catch(() => false)) {
      const text = await errorEl.innerText();
      console.log(`❌ ${label}: FAILED - ${text}`);
    } else {
      console.log(`❌ ${label}: FAILED - timeout`);
      const body = await page.locator('body').innerText({ timeout: 2000 }).catch(() => 'N/A');
      console.log(body.substring(0, 300));
    }
    test.fail();
  }
}

// ═══════════════════════════════════════════
// Grade 6 - Simulacro Completo - 30 preguntas
// ═══════════════════════════════════════════

test('G6_Matematicas_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 6, 'Matemáticas', 'simulacro');
  await validateQuestions(page, 'G6 Matemáticas');
});

test('G6_LecturaCritica_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 6, 'Lectura Crítica', 'simulacro');
  await validateQuestions(page, 'G6 Lectura Crítica');
});

test('G6_CienciasNaturales_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 6, 'Ciencias Naturales', 'simulacro');
  await validateQuestions(page, 'G6 Cs Naturales');
});

test('G6_Sociales_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 6, 'Sociales y Ciudadanas', 'simulacro');
  await validateQuestions(page, 'G6 Sociales');
});

test('G6_Ingles_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 6, 'Inglés', 'simulacro');
  await validateQuestions(page, 'G6 Inglés');
});

// ═══════════════════════════════════════════
// Grade 9 - Simulacro Completo - 30 preguntas
// ═══════════════════════════════════════════

test('G9_Matematicas_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 9, 'Matemáticas', 'simulacro');
  await validateQuestions(page, 'G9 Matemáticas');
});

test('G9_LecturaCritica_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 9, 'Lectura Crítica', 'simulacro');
  await validateQuestions(page, 'G9 Lectura Crítica');
});

test('G9_CienciasNaturales_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 9, 'Ciencias Naturales', 'simulacro');
  await validateQuestions(page, 'G9 Cs Naturales');
});

test('G9_Sociales_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 9, 'Sociales y Ciudadanas', 'simulacro');
  await validateQuestions(page, 'G9 Sociales');
});

test('G9_Ingles_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 9, 'Inglés', 'simulacro');
  await validateQuestions(page, 'G9 Inglés');
});

// ════════════════════════════════════════════
// Grade 11 - Simulacro Completo - 30 preguntas
// ════════════════════════════════════════════

test('G11_Matematicas_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 11, 'Matemáticas', 'simulacro');
  await validateQuestions(page, 'G11 Matemáticas');
});

test('G11_LecturaCritica_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 11, 'Lectura Crítica', 'simulacro');
  await validateQuestions(page, 'G11 Lectura Crítica');
});

test('G11_CienciasNaturales_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 11, 'Ciencias Naturales', 'simulacro');
  await validateQuestions(page, 'G11 Cs Naturales');
});

test('G11_Sociales_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 11, 'Sociales y Ciudadanas', 'simulacro');
  await validateQuestions(page, 'G11 Sociales');
});

test('G11_Ingles_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 11, 'Inglés', 'simulacro');
  await validateQuestions(page, 'G11 Inglés');
});

// ════════════════════════════════════════════
// Grade 11 - Period 1 - 30 preguntas
// (critical subjects only)
// ════════════════════════════════════════════

test('G11_Matematicas_P1_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 11, 'Matemáticas', 'period', 1);
  await validateQuestions(page, 'G11 Matemáticas Period 1');
});

test('G11_Ingles_P1_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 11, 'Inglés', 'period', 1);
  await validateQuestions(page, 'G11 Inglés Period 1');
});

test('G11_Sociales_P1_30', async ({ page }) => {
  test.setTimeout(180000);
  await startExam(page, 11, 'Sociales y Ciudadanas', 'period', 1);
  await validateQuestions(page, 'G11 Sociales Period 1');
});

// ════════════════════════════════════════════
// Preuniversitario (if available)
// ════════════════════════════════════════════

test('G11_Preuniversitario_30', async ({ page }) => {
  test.setTimeout(120000);
  
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  const gradeBtn = page.locator('button').filter({ hasText: '11° Grado' }).first();
  await expect(gradeBtn).toBeVisible({ timeout: 15000 });
  await gradeBtn.click();
  await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 120000 });

  const dropdown = page.locator('select');
  const options = await dropdown.locator('option').allTextContents();
  const preuAvailable = options.some(o => o.includes('Preuniversitario'));
  
  if (!preuAvailable) {
    console.log('ℹ️ Preuniversitario not available, skipping');
    test.skip();
    return;
  }

  await dropdown.selectOption({ label: 'Preuniversitario' });
  const btn30 = page.locator('button').filter({ hasText: '30' }).first();
  await expect(btn30).toBeVisible({ timeout: 5000 });
  await btn30.click();
  const startBtn = page.locator('button').filter({ hasText: 'Comenzar' }).first();
  await expect(startBtn).toBeEnabled({ timeout: 10000 });
  await startBtn.click();

  await validateQuestions(page, 'G11 Preuniversitario');
});
