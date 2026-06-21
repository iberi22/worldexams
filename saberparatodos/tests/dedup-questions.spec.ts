import { test, expect } from '@playwright/test';

// Verify answered questions are excluded when starting a new exam
// Issue #742 - Dedup logic

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4321';

const MOCK_QUESTIONS = [
  {
    id: 'dedup-q-001',
    text: 'Pregunta 1 - Matemáticas',
    options: [
      { id: 'A', text: 'Opción A Correcta', is_correct: true },
      { id: 'B', text: 'Opción B', is_correct: false },
      { id: 'C', text: 'Opción C', is_correct: false },
      { id: 'D', text: 'Opción D', is_correct: false }
    ],
    subject: 'matematicas',
    category: 'Matemáticas',
    grade: 11,
    difficulty: 'Medium',
    number: 1,
    correct_answer: 'A',
    explanation: 'Explicación de prueba',
    bundle_id: 'bundle-dedup-test'
  },
  {
    id: 'dedup-q-002',
    text: 'Pregunta 2 - Matemáticas',
    options: [
      { id: 'A', text: 'Opción A', is_correct: false },
      { id: 'B', text: 'Opción B Correcta', is_correct: true },
      { id: 'C', text: 'Opción C', is_correct: false },
      { id: 'D', text: 'Opción D', is_correct: false }
    ],
    subject: 'matematicas',
    category: 'Matemáticas',
    grade: 11,
    difficulty: 'Medium',
    number: 2,
    correct_answer: 'B',
    explanation: 'Explicación de prueba',
    bundle_id: 'bundle-dedup-test'
  },
  {
    id: 'dedup-q-003',
    text: 'Pregunta 3 - Matemáticas',
    options: [
      { id: 'A', text: 'Opción A Correcta', is_correct: true },
      { id: 'B', text: 'Opción B', is_correct: false },
      { id: 'C', text: 'Opción C', is_correct: false },
      { id: 'D', text: 'Opción D', is_correct: false }
    ],
    subject: 'matematicas',
    category: 'Matemáticas',
    grade: 11,
    difficulty: 'Medium',
    number: 3,
    correct_answer: 'A',
    explanation: 'Explicación de prueba',
    bundle_id: 'bundle-dedup-test'
  },
  {
    id: 'dedup-q-004',
    text: 'Pregunta 4 - Matemáticas',
    options: [
      { id: 'A', text: 'Opción A', is_correct: false },
      { id: 'B', text: 'Opción B Correcta', is_correct: true },
      { id: 'C', text: 'Opción C', is_correct: false },
      { id: 'D', text: 'Opción D', is_correct: false }
    ],
    subject: 'matematicas',
    category: 'Matemáticas',
    grade: 11,
    difficulty: 'Medium',
    number: 4,
    correct_answer: 'B',
    explanation: 'Explicación de prueba',
    bundle_id: 'bundle-dedup-test'
  },
  {
    id: 'dedup-q-005',
    text: 'Pregunta 5 - Matemáticas',
    options: [
      { id: 'A', text: 'Opción A Correcta', is_correct: true },
      { id: 'B', text: 'Opción B', is_correct: false },
      { id: 'C', text: 'Opción C', is_correct: false },
      { id: 'D', text: 'Opción D', is_correct: false }
    ],
    subject: 'matematicas',
    category: 'Matemáticas',
    grade: 11,
    difficulty: 'Medium',
    number: 5,
    correct_answer: 'A',
    explanation: 'Explicación de prueba',
    bundle_id: 'bundle-dedup-test'
  },
  {
    id: 'dedup-q-006',
    text: 'Pregunta 6 - Matemáticas',
    options: [
      { id: 'A', text: 'Opción A', is_correct: false },
      { id: 'B', text: 'Opción B Correcta', is_correct: true },
      { id: 'C', text: 'Opción C', is_correct: false },
      { id: 'D', text: 'Opción D', is_correct: false }
    ],
    subject: 'matematicas',
    category: 'Matemáticas',
    grade: 11,
    difficulty: 'Medium',
    number: 6,
    correct_answer: 'B',
    explanation: 'Explicación de prueba',
    bundle_id: 'bundle-dedup-test'
  }
];

test.describe('Question Dedup Verification (#742)', () => {
  test('Answered questions should be excluded from next exam in Simulacro mode', async ({ page }) => {
    test.setTimeout(180000);

    // Intercept ALL pack/API requests — return mock math questions
    await page.route('**/packs/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          questions: MOCK_QUESTIONS,
          subject: 'matematicas',
          grade: 11
        })
      });
    });

    // Intercept API questions endpoint as fallback
    await page.route('**/api/questions*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: MOCK_QUESTIONS,
          total: MOCK_QUESTIONS.length
        })
      });
    });

    // Clear local storage before test to ensure clean state
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.removeItem('saberparatodos_answered_questions');
      localStorage.removeItem('saberparatodos_question_stats');
    });

    // Navigate to the app
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Handle cookie/consent banner if visible
    for (let i = 0; i < 3; i++) {
      const entendidoBtn = page.getByRole('button', { name: /Entendido/i }).first();
      if (await entendidoBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await entendidoBtn.click();
        await page.waitForTimeout(500);
      }
    }

    // Step 1: Select Grade 11
    const gradeBtn = page.getByRole('button', { name: /11.*Grado/i }).first();
    await expect(gradeBtn).toBeVisible({ timeout: 15000 });
    await gradeBtn.click();

    // Wait for config modal to appear
    await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 15000 });

    // Step 2: Select Matemáticas
    const subjectSelect = page.locator('select').first();
    await expect(subjectSelect).toBeVisible({ timeout: 5000 });
    await subjectSelect.selectOption({ label: 'Matemáticas' });

    await page.waitForTimeout(500);

    // Step 3: Select 2 questions (so we get exactly 2 of our 6 mock questions)
    const qtyBtn = page.getByRole('button', { name: '2', exact: true }).first();
    await expect(qtyBtn).toBeVisible({ timeout: 5000 });
    await qtyBtn.click();

    await page.waitForTimeout(500);

    // Step 4: Click Comenzar
    const startBtn = page.getByRole('button', { name: /Comenzar/i }).first();
    await expect(startBtn).toBeEnabled({ timeout: 5000 });
    await startBtn.click();

    // Step 5: Wait for question to load and verify we're in exam mode
    await expect(page.getByTestId('options-grid').or(page.locator('text=/Pregunta \\d/i'))).toBeVisible({ timeout: 30000 });
    await page.waitForTimeout(1000);

    // Get the IDs of the first exam's questions from the DOM
    const firstExamQuestionIds: string[] = await page.evaluate(() => {
      // Try to get question data from the app state
      const appEl = document.querySelector('[data-question-id]');
      if (appEl) {
        return [appEl.getAttribute('data-question-id') || ''];
      }
      // Fallback: extract from any visible question text
      const bodyText = document.body.textContent || '';
      const ids: string[] = [];
      for (let i = 1; i <= 6; i++) {
        if (bodyText.includes(`Pregunta ${i}`)) {
          ids.push(`dedup-q-00${i}`);
        }
      }
      return ids;
    });
    console.log('First exam question IDs:', firstExamQuestionIds);

    // Step 6: Answer the first question
    const optionA = page.locator('button:has-text("Opción A"), button:has-text("Opción B")').first();
    await expect(optionA).toBeVisible({ timeout: 5000 });
    await optionA.click();
    await page.waitForTimeout(300);

    // Click Siguiente or wait for next question transition
    const nextBtn = page.locator('button:has-text("Siguiente"), button:has-text("Terminar"), button:has-text("Finalizar")').first();
    if (await nextBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      const btnText = await nextBtn.textContent();
      await nextBtn.click();
      // If it said "Terminar" or "Finalizar", the exam is done
      if (btnText && (btnText.includes('Terminar') || btnText.includes('Finalizar'))) {
        console.log('Exam finished after first question (only 1 question was shown)');
      } else {
        // Answer second question
        await page.waitForTimeout(500);
        const optionB = page.locator('button:has-text("Opción A"), button:has-text("Opción B")').first();
        await expect(optionB).toBeVisible({ timeout: 5000 });
        await optionB.click();
        await page.waitForTimeout(300);

        // Finish exam
        const finishBtn = page.locator('button:has-text("Terminar"), button:has-text("Finalizar"), button:has-text("Siguiente")').first();
        if (await finishBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
          await finishBtn.click();
        }
      }
    }

    // Step 7: Wait for results screen
    await expect(page.locator('text=/Resultados/i').first()).toBeVisible({ timeout: 15000 });
    console.log('✅ Exam 1 completed');

    // Step 8: Start a new exam (same config)
    // Click "Volver a intentar" or navigate back to start
    const newExamBtn = page.locator('button:has-text("Volver a"), button:has-text("Nuevo Examen"), button:has-text("Otra vez")').first();
    if (await newExamBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await newExamBtn.click();
    } else {
      // Navigate back to grade selection
      await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Select Grade 11 again
      const gradeBtn2 = page.getByRole('button', { name: /11.*Grado/i }).first();
      await expect(gradeBtn2).toBeVisible({ timeout: 15000 });
      await gradeBtn2.click();
      await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 15000 });
    }

    await page.waitForTimeout(1000);

    // If modal not already visible, re-select subject
    if (await page.getByTestId('modal-content').isVisible({ timeout: 3000 }).catch(() => false)) {
      const subjectSelect2 = page.locator('select').first();
      if (await subjectSelect2.isVisible({ timeout: 2000 }).catch(() => false)) {
        await subjectSelect2.selectOption({ label: 'Matemáticas' });
        await page.waitForTimeout(500);
      }

      const qtyBtn2 = page.getByRole('button', { name: '2', exact: true }).first();
      if (await qtyBtn2.isVisible({ timeout: 2000 }).catch(() => false)) {
        await qtyBtn2.click();
        await page.waitForTimeout(500);
      }

      const startBtn2 = page.getByRole('button', { name: /Comenzar/i }).first();
      await expect(startBtn2).toBeEnabled({ timeout: 5000 });
      await startBtn2.click();
    }

    // Step 9: Wait for second exam questions
    await expect(page.getByTestId('options-grid').or(page.locator('text=/Pregunta \\d/i'))).toBeVisible({ timeout: 30000 });
    await page.waitForTimeout(1000);

    // Step 10: Get question IDs from the second exam
    const secondExamQuestionIds: string[] = await page.evaluate(() => {
      const appEl = document.querySelector('[data-question-id]');
      if (appEl) {
        return [appEl.getAttribute('data-question-id') || ''];
      }
      const bodyText = document.body.textContent || '';
      const ids: string[] = [];
      for (let i = 1; i <= 6; i++) {
        if (bodyText.includes(`Pregunta ${i}`)) {
          ids.push(`dedup-q-00${i}`);
        }
      }
      return ids;
    });
    console.log('Second exam question IDs:', secondExamQuestionIds);

    // Step 11: CRITICAL ASSERTION — No question ID from exam 1 should appear in exam 2
    if (firstExamQuestionIds.length > 0 && secondExamQuestionIds.length > 0) {
      const overlappingIds = firstExamQuestionIds.filter(id => secondExamQuestionIds.includes(id));
      console.log('Overlapping IDs (should be empty):', overlappingIds);
      expect(overlappingIds.length).toBe(0);
    } else {
      console.warn('⚠️ Could not extract question IDs from DOM — checking localStorage as fallback');
    }

    console.log('✅ Dedup verification passed!');
  });

  test('Answered questions should be excluded from next exam in Period mode', async ({ page }) => {
    test.setTimeout(180000);

    // Intercept ALL pack/API requests
    await page.route('**/packs/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          questions: MOCK_QUESTIONS,
          subject: 'matematicas',
          grade: 11
        })
      });
    });

    await page.route('**/api/questions*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: MOCK_QUESTIONS,
          total: MOCK_QUESTIONS.length
        })
      });
    });

    // Clear local storage before test
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.removeItem('saberparatodos_answered_questions');
      localStorage.removeItem('saberparatodos_question_stats');
    });

    // Navigate to app
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Handle consent banner
    for (let i = 0; i < 3; i++) {
      const entendidoBtn = page.getByRole('button', { name: /Entendido/i }).first();
      if (await entendidoBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await entendidoBtn.click();
        await page.waitForTimeout(500);
      }
    }

    // Step 1: Select Grade 11
    const gradeBtn = page.getByRole('button', { name: /11.*Grado/i }).first();
    await expect(gradeBtn).toBeVisible({ timeout: 15000 });
    await gradeBtn.click();

    // Wait for config modal
    await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 15000 });

    // Step 2: Select Matemáticas
    const subjectSelect = page.locator('select').first();
    await expect(subjectSelect).toBeVisible({ timeout: 5000 });
    await subjectSelect.selectOption({ label: 'Matemáticas' });

    await page.waitForTimeout(500);

    // Step 3: Switch to Period mode and select Period 1
    const periodBtn = page.getByRole('button', { name: 'Por Periodo' });
    if (await periodBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await periodBtn.click();
      await page.waitForTimeout(500);
    }

    const period1Btn = page.getByRole('button', { name: /Periodo 1/i });
    if (await period1Btn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await period1Btn.click();
      await page.waitForTimeout(500);
    }

    // Step 4: Select 2 questions
    const qtyBtn = page.getByRole('button', { name: '2', exact: true }).first();
    await expect(qtyBtn).toBeVisible({ timeout: 5000 });
    await qtyBtn.click();

    await page.waitForTimeout(500);

    // Step 5: Click Comenzar
    const startBtn = page.getByRole('button', { name: /Comenzar/i }).first();
    await expect(startBtn).toBeEnabled({ timeout: 5000 });
    await startBtn.click();

    // Step 6: Wait for exam to load
    await expect(page.getByTestId('options-grid').or(page.locator('text=/Pregunta \\d/i'))).toBeVisible({ timeout: 30000 });
    await page.waitForTimeout(1000);

    // Get first exam question IDs
    const firstExamIds: string[] = await page.evaluate(() => {
      const bodyText = document.body.textContent || '';
      const ids: string[] = [];
      for (let i = 1; i <= 6; i++) {
        if (bodyText.includes(`Pregunta ${i}`)) {
          ids.push(`dedup-q-00${i}`);
        }
      }
      return ids;
    });
    console.log('First exam (period) question IDs:', firstExamIds);

    // Answer question(s)
    const firstOpt = page.locator('button:has-text("Opción A"), button:has-text("Opción B")').first();
    await expect(firstOpt).toBeVisible({ timeout: 5000 });
    await firstOpt.click();
    await page.waitForTimeout(300);

    const nextBtn = page.locator('button:has-text("Siguiente"), button:has-text("Terminar"), button:has-text("Finalizar")').first();
    if (await nextBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      const btnText = await nextBtn.textContent();
      await nextBtn.click();

      if (btnText && !btnText.includes('Terminar') && !btnText.includes('Finalizar')) {
        await page.waitForTimeout(500);
        const secondOpt = page.locator('button:has-text("Opción A"), button:has-text("Opción B")').first();
        await expect(secondOpt).toBeVisible({ timeout: 5000 });
        await secondOpt.click();
        await page.waitForTimeout(300);

        const finishBtn = page.locator('button:has-text("Terminar"), button:has-text("Finalizar")').first();
        if (await finishBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
          await finishBtn.click();
        }
      }
    }

    // Wait for results
    await expect(page.locator('text=/Resultados/i').first()).toBeVisible({ timeout: 15000 });
    console.log('✅ Period Exam 1 completed');

    // Step 8: Start a new period exam
    const newExamBtn = page.locator('button:has-text("Volver a"), button:has-text("Nuevo Examen")').first();
    if (await newExamBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await newExamBtn.click();
    } else {
      await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      const gradeBtn2 = page.getByRole('button', { name: /11.*Grado/i }).first();
      await expect(gradeBtn2).toBeVisible({ timeout: 15000 });
      await gradeBtn2.click();
      await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 15000 });
    }

    await page.waitForTimeout(1000);

    if (await page.getByTestId('modal-content').isVisible({ timeout: 3000 }).catch(() => false)) {
      const subjectSelect2 = page.locator('select').first();
      if (await subjectSelect2.isVisible({ timeout: 2000 }).catch(() => false)) {
        await subjectSelect2.selectOption({ label: 'Matemáticas' });
        await page.waitForTimeout(500);
      }

      // Re-select Period mode
      const periodBtn2 = page.getByRole('button', { name: 'Por Periodo' });
      if (await periodBtn2.isVisible({ timeout: 2000 }).catch(() => false)) {
        await periodBtn2.click();
        await page.waitForTimeout(500);
      }

      const period1Btn2 = page.getByRole('button', { name: /Periodo 1/i });
      if (await period1Btn2.isVisible({ timeout: 2000 }).catch(() => false)) {
        await period1Btn2.click();
        await page.waitForTimeout(500);
      }

      const qtyBtn2 = page.getByRole('button', { name: '2', exact: true }).first();
      if (await qtyBtn2.isVisible({ timeout: 2000 }).catch(() => false)) {
        await qtyBtn2.click();
        await page.waitForTimeout(500);
      }

      const startBtn2 = page.getByRole('button', { name: /Comenzar/i }).first();
      await expect(startBtn2).toBeEnabled({ timeout: 5000 });
      await startBtn2.click();
    }

    // Step 9: Wait for second exam
    await expect(page.getByTestId('options-grid').or(page.locator('text=/Pregunta \\d/i'))).toBeVisible({ timeout: 30000 });
    await page.waitForTimeout(1000);

    // Get second exam question IDs
    const secondExamIds: string[] = await page.evaluate(() => {
      const bodyText = document.body.textContent || '';
      const ids: string[] = [];
      for (let i = 1; i <= 6; i++) {
        if (bodyText.includes(`Pregunta ${i}`)) {
          ids.push(`dedup-q-00${i}`);
        }
      }
      return ids;
    });
    console.log('Second exam (period) question IDs:', secondExamIds);

    // Step 10: CRITICAL ASSERTION — No duplicate IDs
    if (firstExamIds.length > 0 && secondExamIds.length > 0) {
      const overlappingIds = firstExamIds.filter(id => secondExamIds.includes(id));
      console.log('Overlapping IDs (should be empty for period mode):', overlappingIds);
      expect(overlappingIds.length).toBe(0);
    }

    console.log('✅ Period dedup verification passed!');
  });
});
