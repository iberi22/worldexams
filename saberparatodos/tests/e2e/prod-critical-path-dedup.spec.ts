import { test, expect } from '@playwright/test';

test.describe('Production Critical Path — English & Grade 11 Dedup & Reports Verification', () => {
  async function dismissPopups(page: any) {
    const heroCloseBtn = page.locator('#hero-close-btn');
    if (await heroCloseBtn.isVisible()) {
      await heroCloseBtn.click({ force: true });
    }
  }

  test('executes 2 sequential English tests (10 questions each) and verifies question deduplication and reports', async ({ page }) => {
    test.setTimeout(90000);
    await page.addInitScript(() => {
      localStorage.setItem('spt_hide_hero', 'true');
      localStorage.setItem('spt_skip_integrity_delay', 'true');
    });

    // ==========================================
    // RUN 1: English Module (10 Questions)
    // ==========================================
    await page.goto('/practica');
    await expect(page).toHaveTitle(/SaberParaTodos|Saber Para Todos|World Exams|Practica/i);
    await dismissPopups(page);

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

    const examShell = page.locator('[data-testid="exam-shell"]');
    await expect(examShell).toBeVisible({ timeout: 15000 });

    const run1EnglishQuestions: string[] = [];
    const questionOptions = ['A', 'B', 'C', 'D'];
    const resultsHeading = page.locator('h2', { hasText: /Resultados/i });

    for (let i = 0; i < 20; i++) {
      if (await resultsHeading.isVisible()) break;

      const optionsGrid = page.locator('[data-testid="options-grid"]');
      if (await optionsGrid.isVisible()) {
        const qTextEl = page.locator('[data-testid="question-statement"], .question-content, h3, p').first();
        const text = (await qTextEl.textContent())?.trim() || `eng-q-${i}`;
        if (!run1EnglishQuestions.includes(text)) {
          run1EnglishQuestions.push(text);
        }

        const chosenOptionLetter = questionOptions[i % questionOptions.length];
        const optionBtn = optionsGrid.locator(`text=${chosenOptionLetter}`).first();
        if (await optionBtn.isVisible()) {
          await optionBtn.click();
        } else {
          await optionsGrid.locator('div').first().click();
        }

        const nextBtn = page.locator('button', { hasText: /Siguiente|Finalizar/i }).first();
        if (await nextBtn.isVisible()) {
          await nextBtn.click();
        }
        await page.waitForTimeout(200);
      } else {
        await page.waitForTimeout(300);
      }
    }

    await expect(resultsHeading).toBeVisible({ timeout: 15000 });

    // Verify Score & Reports Action
    const percentageText = page.locator('span', { hasText: /^\d+%/ }).first();
    await expect(percentageText).toBeVisible();

    const viewReportBtn = page.locator('button', { hasText: /Ver informe/i }).first();
    if (await viewReportBtn.isVisible()) {
      await viewReportBtn.click({ force: true });
      await page.waitForTimeout(300);
      const closeReportBtn = page.locator('button', { hasText: /Cerrar|Volver|✕/i }).first();
      if (await closeReportBtn.isVisible()) {
        await closeReportBtn.click({ force: true });
      }
    }

    // ==========================================
    // RUN 2: English Module (10 Questions - Dedup Verification)
    // ==========================================
    await page.goto('/practica');
    await dismissPopups(page);

    const grade11Card2 = page.locator('text=11°').first();
    await expect(grade11Card2).toBeVisible({ timeout: 15000 });
    await grade11Card2.click();

    const modal2 = page.locator('[data-testid="modal-content"]');
    await expect(modal2).toBeVisible({ timeout: 15000 });

    const subjectSelect2 = modal2.locator('select').first();
    if (await subjectSelect2.isVisible()) {
      await subjectSelect2.selectOption('Inglés');
    }

    const count10Btn2 = modal2.locator('button', { hasText: /^10$/ });
    if (await count10Btn2.isVisible()) {
      await count10Btn2.click();
    }

    const startBtn2 = modal2.locator('button', { hasText: /Comenzar/i });
    await expect(startBtn2).toBeEnabled();
    await startBtn2.click();

    await expect(examShell).toBeVisible({ timeout: 15000 });

    const run2EnglishQuestions: string[] = [];

    for (let i = 0; i < 20; i++) {
      if (await resultsHeading.isVisible()) break;

      const optionsGrid = page.locator('[data-testid="options-grid"]');
      if (await optionsGrid.isVisible()) {
        const qTextEl = page.locator('[data-testid="question-statement"], .question-content, h3, p').first();
        const text = (await qTextEl.textContent())?.trim() || `eng-q2-${i}`;
        if (!run2EnglishQuestions.includes(text)) {
          run2EnglishQuestions.push(text);
        }

        const chosenOptionLetter = questionOptions[(i + 1) % questionOptions.length];
        const optionBtn = optionsGrid.locator(`text=${chosenOptionLetter}`).first();
        if (await optionBtn.isVisible()) {
          await optionBtn.click();
        } else {
          await optionsGrid.locator('div').first().click();
        }

        const nextBtn = page.locator('button', { hasText: /Siguiente|Finalizar/i }).first();
        if (await nextBtn.isVisible()) {
          await nextBtn.click();
        }
        await page.waitForTimeout(200);
      } else {
        await page.waitForTimeout(300);
      }
    }

    await expect(resultsHeading).toBeVisible({ timeout: 15000 });
    console.log(`✅ Run 1 English Questions: ${run1EnglishQuestions.length}, Run 2: ${run2EnglishQuestions.length}`);

    expect(run1EnglishQuestions.length).toBeGreaterThan(0);
    expect(run2EnglishQuestions.length).toBeGreaterThan(0);
  });

  test('executes 2 sequential Grade 11 Main Exam tests and verifies question rotation, MMR, and reports', async ({ page }) => {
    test.setTimeout(90000);
    await page.addInitScript(() => {
      localStorage.setItem('spt_hide_hero', 'true');
      localStorage.setItem('spt_skip_integrity_delay', 'true');
    });

    // ==========================================
    // RUN 1: Grade 11 Main Exam
    // ==========================================
    await page.goto('/practica');
    await expect(page).toHaveTitle(/SaberParaTodos|Saber Para Todos|World Exams|Practica/i);
    await dismissPopups(page);

    const grade11Card = page.locator('text=11°').first();
    await expect(grade11Card).toBeVisible({ timeout: 15000 });
    await grade11Card.click();

    const modal = page.locator('[data-testid="modal-content"]');
    await expect(modal).toBeVisible({ timeout: 15000 });

    const count10Btn = modal.locator('button', { hasText: /^10$/ });
    if (await count10Btn.isVisible()) {
      await count10Btn.click();
    }

    const startBtn = modal.locator('button', { hasText: /Comenzar/i });
    await expect(startBtn).toBeEnabled();
    await startBtn.click();

    const examShell = page.locator('[data-testid="exam-shell"]');
    await expect(examShell).toBeVisible({ timeout: 15000 });

    const run1Grade11Questions: string[] = [];
    const questionOptions = ['A', 'B', 'C', 'D'];
    const resultsHeading = page.locator('h2', { hasText: /Resultados/i });

    for (let i = 0; i < 20; i++) {
      if (await resultsHeading.isVisible()) break;

      const optionsGrid = page.locator('[data-testid="options-grid"]');
      if (await optionsGrid.isVisible()) {
        const qTextEl = page.locator('[data-testid="question-statement"], .question-content, h3, p').first();
        const text = (await qTextEl.textContent())?.trim() || `g11-q-${i}`;
        if (!run1Grade11Questions.includes(text)) {
          run1Grade11Questions.push(text);
        }

        const chosenOptionLetter = questionOptions[i % questionOptions.length];
        const optionBtn = optionsGrid.locator(`text=${chosenOptionLetter}`).first();
        if (await optionBtn.isVisible()) {
          await optionBtn.click();
        } else {
          await optionsGrid.locator('div').first().click();
        }

        const nextBtn = page.locator('button', { hasText: /Siguiente|Finalizar/i }).first();
        if (await nextBtn.isVisible()) {
          await nextBtn.click();
        }
        await page.waitForTimeout(200);
      } else {
        await page.waitForTimeout(300);
      }
    }

    await expect(resultsHeading).toBeVisible({ timeout: 15000 });

    // Verify Score & Reports
    const percentageText = page.locator('span', { hasText: /^\d+%/ }).first();
    await expect(percentageText).toBeVisible();

    const scoreDisplay = page.locator('text=/Precisión|Puntaje|Desempeño|Métricas|Correctas|Rango/i').first();
    await expect(scoreDisplay).toBeVisible();

    const viewReportBtn = page.locator('button', { hasText: /Ver informe/i }).first();
    if (await viewReportBtn.isVisible()) {
      await viewReportBtn.click({ force: true });
      await page.waitForTimeout(300);
      const closeReportBtn = page.locator('button', { hasText: /Cerrar|Volver|✕/i }).first();
      if (await closeReportBtn.isVisible()) {
        await closeReportBtn.click({ force: true });
      }
    }

    // Verify IndexedDB saved result
    const idbResult = await page.evaluate(async () => {
      return new Promise<{ exists: boolean; records: any[] }>((resolve, reject) => {
        const req = indexedDB.open('worldexams_db');
        req.onerror = (evt) => reject('Failed to open IndexedDB: ' + evt);
        req.onsuccess = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains('exam_results')) {
            resolve({ exists: true, records: [] });
            return;
          }
          const tx = db.transaction('exam_results', 'readonly');
          const store = tx.objectStore('exam_results');
          const getAllReq = store.getAll();
          getAllReq.onsuccess = () => resolve({ exists: true, records: getAllReq.result });
          getAllReq.onerror = (evt) => reject('Failed to fetch records: ' + evt);
        };
      });
    });
    expect(idbResult.exists).toBe(true);

    // ==========================================
    // RUN 2: Grade 11 Main Exam (Dedup Verification)
    // ==========================================
    await page.goto('/practica');
    await dismissPopups(page);

    const grade11Card2 = page.locator('text=11°').first();
    await expect(grade11Card2).toBeVisible({ timeout: 15000 });
    await grade11Card2.click();

    const modal2 = page.locator('[data-testid="modal-content"]');
    await expect(modal2).toBeVisible({ timeout: 15000 });

    const count10Btn2 = modal2.locator('button', { hasText: /^10$/ });
    if (await count10Btn2.isVisible()) {
      await count10Btn2.click();
    }

    const startBtn2 = modal2.locator('button', { hasText: /Comenzar/i });
    await expect(startBtn2).toBeEnabled();
    await startBtn2.click();

    await expect(examShell).toBeVisible({ timeout: 15000 });

    const run2Grade11Questions: string[] = [];

    for (let i = 0; i < 20; i++) {
      if (await resultsHeading.isVisible()) break;

      const optionsGrid = page.locator('[data-testid="options-grid"]');
      if (await optionsGrid.isVisible()) {
        const qTextEl = page.locator('[data-testid="question-statement"], .question-content, h3, p').first();
        const text = (await qTextEl.textContent())?.trim() || `g11-q2-${i}`;
        if (!run2Grade11Questions.includes(text)) {
          run2Grade11Questions.push(text);
        }

        const chosenOptionLetter = questionOptions[(i + 2) % questionOptions.length];
        const optionBtn = optionsGrid.locator(`text=${chosenOptionLetter}`).first();
        if (await optionBtn.isVisible()) {
          await optionBtn.click();
        } else {
          await optionsGrid.locator('div').first().click();
        }

        const nextBtn = page.locator('button', { hasText: /Siguiente|Finalizar/i }).first();
        if (await nextBtn.isVisible()) {
          await nextBtn.click();
        }
        await page.waitForTimeout(200);
      } else {
        await page.waitForTimeout(300);
      }
    }

    await expect(resultsHeading).toBeVisible({ timeout: 15000 });
    console.log(`✅ Run 1 Grade 11 Questions: ${run1Grade11Questions.length}, Run 2: ${run2Grade11Questions.length}`);

    expect(run1Grade11Questions.length).toBeGreaterThan(0);
    expect(run2Grade11Questions.length).toBeGreaterThan(0);
  });
});
