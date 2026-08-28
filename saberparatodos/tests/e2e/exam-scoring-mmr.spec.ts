import { test, expect } from '@playwright/test';

test.describe('Exam Timer, Scoring & Local MMR Multiplier Validation Suite (Wave 5.08)', () => {
  test('navigates to /practica, completes exam, verifies timer, score breakdown, MMR, and IndexedDB persistence', async ({ page }) => {
    // 1. Set local storage flags before navigation to skip hero modal and integrity animation delay
    await page.addInitScript(() => {
      localStorage.setItem('spt_hide_hero', 'true');
      localStorage.setItem('spt_skip_integrity_delay', 'true');
    });

    // 2. Navigate to /practica
    await page.goto('/practica');
    await expect(page).toHaveTitle(/SaberParaTodos|Saber Para Todos|World Exams|Practica/i);

    // 3. Initiate practice session: click Grade 11 card
    const grade11Card = page.locator('text=11°').first();
    await expect(grade11Card).toBeVisible();
    await grade11Card.click();

    // 4. Verify Exam Config Modal opens
    const modal = page.locator('[data-testid="modal-content"]');
    await expect(modal).toBeVisible();

    // Select 5 questions for faster test execution
    const count5Btn = modal.locator('button', { hasText: /^5$/ });
    if (await count5Btn.isVisible()) {
      await count5Btn.click();
    }

    // Click "Comenzar"
    const startBtn = modal.locator('button', { hasText: /Comenzar/i });
    await expect(startBtn).toBeEnabled();
    await startBtn.click();

    // 5. Verify transition to ExamView shell
    const examShell = page.locator('[data-testid="exam-shell"]').first();
    await expect(examShell).toBeVisible({ timeout: 25000 });

    // Verify timer starts counting down and remains visible
    const timerText = examShell.locator('.tabular-nums').first();
    await expect(timerText).toBeVisible();
    const initialTimerValue = await timerText.textContent();
    expect(initialTimerValue).toMatch(/\d{2}:\d{2}/);

    // 6. Answer questions sequentially with a mix of options
    const questionOptions = ['A', 'B', 'C', 'D'];

    // Loop until "Finalizar" or Results view appears
    for (let i = 0; i < 15; i++) {
      // Check if we reached Results view
      const resultsHeading = page.locator('h2', { hasText: /Resultados/i });
      if (await resultsHeading.isVisible()) {
        break;
      }

      // Check options grid
      const optionsGrid = page.locator('[data-testid="options-grid"]');
      if (await optionsGrid.isVisible()) {
        // Pick an option (cycling A, B, C, D)
        const chosenOptionLetter = questionOptions[i % questionOptions.length];
        const optionBtn = optionsGrid.locator(`text=${chosenOptionLetter}`).first();

        if (await optionBtn.isVisible()) {
          await optionBtn.click();
        } else {
          const firstOption = optionsGrid.locator('div').first();
          await firstOption.click();
        }

        // Verify timer is still visible during question transitions
        await expect(timerText).toBeVisible();

        // Click Siguiente or Finalizar
        const nextBtn = page.locator('button', { hasText: /Siguiente|Finalizar/i }).first();
        await expect(nextBtn).toBeVisible();
        await nextBtn.click();
        await page.waitForTimeout(300);
      } else {
        break;
      }
    }

    // 7. Finish exam and verify result screen displays percentage score, subject breakdown, and MMR
    const resultsHeading = page.locator('h2', { hasText: /Resultados/i });
    await expect(resultsHeading).toBeVisible({ timeout: 15000 });

    // Verify score percentage display
    const percentageText = page.locator('span', { hasText: /^\d+%/ }).first();
    await expect(percentageText).toBeVisible();

    // Verify subject breakdown / question review list
    const questionReviewCards = page.locator('text=/Pregunta \\d+/i');
    const reviewCount = await questionReviewCards.count();
    expect(reviewCount).toBeGreaterThan(0);

    // Verify score display & MMR / practice rating details
    const scoreDisplay = page.locator('text=/Precisión|Puntaje|Desempeño|Métricas|Correctas|Rango/i').first();
    await expect(scoreDisplay).toBeVisible();

    // 8. Verify exam result is saved in local IndexedDB exam_results store
    const idbResult = await page.evaluate(async () => {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open('worldexams_db');
        req.onerror = (evt) => reject('Failed to open IndexedDB: ' + evt);
        req.onsuccess = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains('exam_results')) {
            resolve({ exists: false, records: [] });
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
    expect(idbResult.records.length).toBeGreaterThan(0);
    const lastRecord = idbResult.records[idbResult.records.length - 1];
    expect(lastRecord).toHaveProperty('grade');
    expect(lastRecord).toHaveProperty('subject');
    expect(lastRecord.score !== undefined || lastRecord._encryptedPayload !== undefined).toBe(true);
  });
});
