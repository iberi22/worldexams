import { test, expect } from '@playwright/test';

test.describe('E2E: English C1 Exam Evaluation & Context Display (Desktop & Mobile)', () => {
  async function setupAndStartEnglishExam(page: any) {
    await page.addInitScript(() => {
      localStorage.setItem('spt_hide_hero', 'true');
      localStorage.setItem('spt_skip_integrity_delay', 'true');
      localStorage.setItem('spt_local_mode_dismissed', 'true');
    });

    await page.goto('/practica');
    await page.waitForLoadState('networkidle');

    const entendidoBtn = page.getByRole('button', { name: /Entendido/i });
    if (await entendidoBtn.isVisible()) {
      await entendidoBtn.click().catch(() => {});
    }

    const grade11Card = page.locator('text=11°').first();
    await expect(grade11Card).toBeVisible({ timeout: 15000 });
    await grade11Card.click();

    const modal = page.locator('[data-testid="modal-content"]');
    await expect(modal).toBeVisible({ timeout: 15000 });

    const subjectSelect = modal.locator('select').first();
    if (await subjectSelect.isVisible()) {
      await subjectSelect.selectOption('Inglés');
    }

    const count10Btn = modal.locator('button', { hasText: /^10$/ });
    if (await count10Btn.isVisible()) {
      await count10Btn.click();
    }

    const startBtn = modal.locator('button', { hasText: /Comenzar/i });
    await expect(startBtn).toBeEnabled();
    await startBtn.click();

    await page.waitForSelector('[data-testid="options-grid"]', { timeout: 30000 });
  }

  test('1. English C1 exam on Desktop: checks 10 questions and evaluates context split panel', async ({ page }) => {
    test.setTimeout(90000);
    await setupAndStartEnglishExam(page);

    const evaluatedQuestions = [];

    // Loop through 10 questions
    for (let i = 0; i < 10; i++) {
      // 1. Verify progress counter (e.g., "1 / 10", "2 / 10")
      await expect(page.locator(`text=${i + 1} / 10`).first()).toBeVisible();

      // 2. Check question text / statement
      const questionTextEl = page.locator('.font-sans.tracking-wide').first();
      await expect(questionTextEl).toBeVisible();
      const questionText = await questionTextEl.innerText();
      expect(questionText.length).toBeGreaterThan(10);

      // 3. Inspect Context panel if present
      const contextPanel = page.locator('text=Panel de Lectura');
      const hasContextPanel = await contextPanel.isVisible();
      let contextContent = null;
      if (hasContextPanel) {
        const contextTextEl = page.locator('.prose-invert.font-serif').first();
        contextContent = await contextTextEl.innerText();
      }

      // 4. Verify 4 options exist
      const options = page.locator('[data-testid="options-grid"] button');
      await expect(options).toHaveCount(4);

      evaluatedQuestions.push({
        index: i + 1,
        questionText: questionText.slice(0, 80),
        hasContextPanel,
        contextLength: contextContent ? contextContent.length : 0,
        contextPreview: contextContent ? contextContent.slice(0, 60) : null
      });

      // 5. Select the first option
      await options.first().click();

      // 6. Click "Siguiente" or "Finalizar"
      const nextBtn = page.getByRole('button', { name: /^Siguiente$|^Finalizar$/i });
      await expect(nextBtn).toBeVisible();
      await nextBtn.click();

      await page.waitForTimeout(300);
    }

    console.log('--- Desktop Evaluated English C1 Questions ---', JSON.stringify(evaluatedQuestions, null, 2));

    // Verify Results screen loads properly
    await page.waitForSelector('h2:has-text("Resultados")', { timeout: 20000 });
    await expect(page.locator('h2:has-text("Resultados")')).toBeVisible();
  });

  test('2. English C1 exam on Mobile: verifies responsive layout and mobile context drawer', async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width: 375, height: 667 });
    await setupAndStartEnglishExam(page);

    // Verify question statement and options on mobile
    const questionTextEl = page.locator('.font-sans.tracking-wide').first();
    await expect(questionTextEl).toBeVisible();

    const verLecturaBtn = page.getByRole('button', { name: /Ver Lectura/i });
    const hasVerLectura = await verLecturaBtn.isVisible();

    if (hasVerLectura) {
      await verLecturaBtn.click();
      
      const drawer = page.locator('.fixed.inset-0.z-\\[60\\]');
      await expect(drawer).toBeVisible();
      await expect(drawer.getByText('Contexto de Lectura')).toBeVisible();

      const closeBtn = drawer.getByRole('button', { name: /Entendido, Volver/i });
      await closeBtn.click();
      await expect(drawer).not.toBeVisible();
    }

    // Verify options are touch-friendly and readable
    const options = page.locator('[data-testid="options-grid"] button');
    await expect(options).toHaveCount(4);
    await options.first().click();

    const nextBtn = page.getByRole('button', { name: /^Siguiente$|^Finalizar$/i });
    await expect(nextBtn).toBeVisible();
  });
});
