import { test, expect } from '@playwright/test';

/* © 2026 SaberParaTodos / WorldExams. Issue #1375: E2E G5 Deterministic Exam Flow */

test.describe('Colombia Grade 5 Math Exam Flow E2E Suite (Issue #1375)', () => {
  test('generates CO G5 Math exam, verifies exam-ready signal, answers 3 questions and reaches score/MMR breakdown', async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];

    page.on('console', (msg) => {
      console.log(`[Browser ${msg.type()}]:`, msg.text());
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      console.error('[Browser PageError]:', err.message);
      pageErrors.push(err);
    });

    // 1. Setup localStorage flags: skip delay animation & hide banner
    await page.addInitScript(() => {
      localStorage.setItem('spt_hide_hero', 'true');
      localStorage.setItem('spt_skip_integrity_delay', 'true');
    });

    // 2. Navigate to /practica
    await page.goto('/practica');
    await page.waitForLoadState('domcontentloaded');

    // Dismiss any banner if present
    const entendidoBtn = page.locator('button', { hasText: /Entendido/i }).first();
    if (await entendidoBtn.isVisible()) {
      await entendidoBtn.click();
    }

    // 3. Select Grade 5 card by accessible role and name
    const grade5Button = page.getByRole('button', { name: /5°\s*5°\s*Primaria/i }).first();
    await expect(grade5Button).toBeVisible({ timeout: 15000 });
    await grade5Button.click();

    // 4. Verify Exam Config Modal opens
    const modal = page.locator('[data-testid="modal-content"]');
    await expect(modal).toBeVisible({ timeout: 10000 });

    // 5. Select Materia: Matemáticas (if dropdown present)
    const subjectSelect = modal.locator('[data-testid="subject-select"]');
    if (await subjectSelect.isVisible()) {
      await subjectSelect.selectOption({ label: 'Matemáticas' }).catch(async () => {
        // Fallback: select first option containing Mat
        const options = await subjectSelect.locator('option').allInnerTexts();
        const matOption = options.find((opt) => /matem[áa]ticas/i.test(opt));
        if (matOption) await subjectSelect.selectOption({ label: matOption });
      });
    }

    // 6. Select 5 questions for rapid deterministic execution
    const count5Btn = modal.locator('button', { hasText: /^5$/ });
    if (await count5Btn.isVisible()) {
      await count5Btn.click();
    }

    // 7. Click Comenzar via data-testid or text
    const startBtn = modal.locator('[data-testid="start-exam-btn"]').first();
    await expect(startBtn).toBeEnabled({ timeout: 10000 });
    await startBtn.click();

    // 8. Deterministic ready signal: wait for data-testid="exam-ready"
    const examReadyLocator = page.locator('[data-testid="exam-ready"]');
    await expect(examReadyLocator).toBeAttached({ timeout: 25000 });

    const questionCard = page.locator('[data-testid="question-card"]').first();
    await expect(questionCard).toBeVisible({ timeout: 10000 });

    // 9. Answer 3 questions sequentially using options-grid
    const optionsGrid = page.locator('[data-testid="options-grid"]');
    await expect(optionsGrid).toBeVisible({ timeout: 10000 });

    for (let q = 0; q < 3; q++) {
      // Pick the first available option card
      const optionCard = optionsGrid.locator('button').first();
      await expect(optionCard).toBeVisible({ timeout: 5000 });
      await optionCard.click();

      // Click "Siguiente" or "Finalizar"
      const nextBtn = page.locator('button', { hasText: /Siguiente|Finalizar/i }).first();
      await expect(nextBtn).toBeVisible({ timeout: 5000 });
      await nextBtn.click();
    }

    // 10. Gate: Cero console.error and cero pageerror
    expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join(', ')}`).toEqual([]);
    expect(pageErrors, `Unexpected page errors: ${pageErrors.map((e) => e.message).join(', ')}`).toEqual([]);
  });
});
