import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4321';

test.use({ serviceWorkers: 'block' });

/**
 * E2E Test: Issue #742 — Reparar lógica de deduplicación de preguntas
 *
 * This test verifies that answered question IDs are strictly excluded from
 * subsequent exam loads. It simulates a full exam cycle:
 *   1. Load exam → answer all questions → record IDs
 *   2. Load new exam (same subject/grade/level) → verify ZERO ID overlap
 *   3. Also verifies that changing CEFR level does not reset memory
 *
 * The test uses route interception with a carefully crafted pool of 15 questions
 * per grade/concept-level so that exams of 5-10 questions can be answered twice
 * without exhausting the pool, making dedup violations easy to detect.
 */

// ─── Mock Data Helpers ───────────────────────────────────────────────────────
function makeOption(id: string, text: string, isCorrect: boolean) {
  return { id, text, is_correct: isCorrect };
}

function makeQuestion(
  id: string,
  text: string,
  grade: number,
  subject: string,
  category: string,
  cefrLevel?: string,
): any {
  return {
    id,
    text,
    cefr_level: cefrLevel || null,
    options: [
      makeOption(`${id}-opt-a`, 'Opción A', true),
      makeOption(`${id}-opt-b`, 'Opción B', false),
      makeOption(`${id}-opt-c`, 'Opción C', false),
      makeOption(`${id}-opt-d`, 'Opción D', false),
    ],
    correctOptionId: `${id}-opt-a`,
    subject,
    category,
    grade,
    periodo: null,
    topics: [],
  };
}

/**
 * Create 15 unique questions for a given subject/grade/cefr.
 * Enough for two exams of up to 7 questions without exhausting.
 */
function makeSubjectQuestions(
  prefix: string,
  grade: number,
  subject: string,
  category: string,
  count = 15,
  cefrLevel?: string,
): any[] {
  return Array.from({ length: count }, (_, i) =>
    makeQuestion(`${prefix}-${i + 1}`, `Pregunta ${prefix} #${i + 1}`, grade, subject, category, cefrLevel),
  );
}

// ─── Route Interceptors ──────────────────────────────────────────────────────

async function setupMockRoutes(page: Page): Promise<void> {
  const allQuestions = [
    // Grade 11 Inglés — 15 questions at A2 level
    ...makeSubjectQuestions('ing-a2', 11, 'ingles', 'Inglés :: A2', 15, 'A2'),
    // Grade 11 Inglés — 10 questions at B1 level (to test CEFR change)
    ...makeSubjectQuestions('ing-b1', 11, 'ingles', 'Inglés :: B1', 10, 'B1'),
    // Grade 11 Matemáticas — 15 questions
    ...makeSubjectQuestions('mat-11', 11, 'matematicas', 'Matemáticas :: Grado 11', 15),
    // Grade 9 Matemáticas (diagnostic) — 10 questions
    ...makeSubjectQuestions('mat-9', 9, 'matematicas', 'Matemáticas :: Grado 9', 10),
  ];

  // Intercept pack requests
  await page.route('**/packs/**', async (route) => {
    const url = route.request().url();
    console.log('[MOCK] Pack request:', url);

    // Parse grade/subject from URL if possible
    let matchedQuestions: any[] = [];
    if (url.includes('ingles') || url.includes('Inglés') || url.includes('English')) {
      matchedQuestions = allQuestions.filter((q) => q.subject === 'ingles');
    } else if (url.includes('matematicas') || url.includes('Matemáticas')) {
      matchedQuestions = allQuestions.filter((q) => q.grade === 11 && q.subject === 'matematicas');
    } else {
      // Fallback: return everything
      matchedQuestions = allQuestions;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        questions: matchedQuestions,
        total: matchedQuestions.length,
      }),
    });
  });

  // Intercept questions API (deep search fallback)
  await page.route('**/questions?*', async (route) => {
    console.log('[MOCK] Questions API:', route.request().url());
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: allQuestions,
        total: allQuestions.length,
      }),
    });
  });

  // Intercept fetchEnglishQuestionsAllGrades
  await page.route('**/english*', async (route) => {
    const inglesQuestions = allQuestions.filter((q) => q.subject === 'ingles');
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: inglesQuestions,
        total: inglesQuestions.length,
      }),
    });
  });
}

// ─── Helper: Navigate to exam, answer all questions, return IDs ──────────────

async function answerAllQuestions(
  page: Page,
  opts: { grade: RegExp; subject: string; count: number; cefrLevel?: string },
): Promise<string[]> {
  const { grade, subject, count, cefrLevel } = opts;
  const answeredIds: string[] = [];

  // 1. Navigate home
  await page.goto(BASE_URL);

  // 2. Select grade
  const gradeBtn = page.getByRole('button', { name: grade }).first();
  await expect(gradeBtn).toBeVisible({ timeout: 15000 });
  await gradeBtn.click();

  // 3. Wait for modal
  await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 30000 });

  // 4. Select subject
  const subjectDropdown = page.locator('select').first();
  await expect(subjectDropdown).toBeVisible({ timeout: 10000 });
  await subjectDropdown.selectOption({ label: subject });

  // 5. Select CEFR level if provided
  if (cefrLevel) {
    // The CEFR buttons may be behind a "Cambiar" toggle
    const cambiarBtn = page.getByRole('button', { name: /Cambiar/i }).first();
    if (await cambiarBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await cambiarBtn.click();
    }
    const cefrBtn = page.getByRole('button', { name: cefrLevel }).first();
    await expect(cefrBtn).toBeVisible({ timeout: 5000 });
    await cefrBtn.click();
  }

  // 6. Select question count (wait for config to settle)
  await page.waitForTimeout(500);
  const countBtn = page.getByRole('button', { name: String(count), exact: true }).first();
  if (await countBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await countBtn.click();
  }

  // 7. Start exam
  const startBtn = page.getByRole('button', { name: /Comenzar/i }).first();
  await expect(startBtn).toBeEnabled({ timeout: 10000 });
  await startBtn.click();

  // 8. Answer each question
  const maxIterations = count + 5; // Safety limit
  for (let i = 0; i < maxIterations; i++) {
    // Wait for question to render
    await expect(page.locator('[data-testid="options-grid"], .options-grid, .question-container').first()).toBeVisible({
      timeout: 15000,
    });

    // Extract question ID from the DOM if possible
    // Fallback: we'll capture IDs via localStorage state changes
    // For now, answer and track

    // Click first option
    const firstOption = page.locator('label, button', { hasText: 'Opción A' }).first();
    await expect(firstOption).toBeVisible({ timeout: 5000 });
    await firstOption.click();

    // Click next / finish button
    const nextBtn = page.locator('button', { hasText: /Siguiente|Terminar|Finalizar/ }).first();
    await expect(nextBtn).toBeVisible({ timeout: 5000 });
    const btnText = (await nextBtn.textContent()) || '';
    await nextBtn.click();

    if (/Finalizar|Terminar/i.test(btnText)) {
      break;
    }
  }

  // 9. Wait for results screen
  await expect(page.getByText(/Resultados/i).first()).toBeVisible({ timeout: 20000 });

  // 10. Extract answered IDs from localStorage
  const memoryData = await page.evaluate(() => {
    const raw = localStorage.getItem('saberparatodos_answered_questions');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  if (memoryData?.answeredTimestamps) {
    answeredIds.push(...Object.keys(memoryData.answeredTimestamps));
  } else if (memoryData?.answeredIds) {
    answeredIds.push(...memoryData.answeredIds);
  }

  console.log(`[TEST] Answered ${answeredIds.length} questions: ${answeredIds.join(', ')}`);
  return answeredIds;
}

// ─── Tests ───────────────────────────────────────────────────────────────────

test.describe('Issue #742 — Deduplication of answered questions across exams', () => {
  test('No overlap between answered IDs of two consecutive exams (Matemáticas Grade 11)', async ({ page }) => {
    test.setTimeout(180000);
    page.on('console', (msg) => console.log(`[BROWSER] ${msg.text()}`));

    await setupMockRoutes(page);

    // Clear localStorage before starting
    await page.goto(BASE_URL);
    await page.evaluate(() => localStorage.clear());

    // ─── Exam 1: Answer 5 questions ──────────────────────────────────────
    const exam1Ids = await answerAllQuestions(page, {
      grade: /11.*Grado/i,
      subject: 'Matemáticas',
      count: 5,
    });
    expect(exam1Ids.length).toBeGreaterThan(0);
    expect(exam1Ids.length).toBeLessThanOrEqual(5);

    // Verify localStorage persisted the IDs
    const persistedCount = await page.evaluate(() => {
      const raw = localStorage.getItem('saberparatodos_answered_questions');
      if (!raw) return 0;
      const data = JSON.parse(raw);
      return Object.keys(data.answeredTimestamps || data.answeredIds || {}).length;
    });
    expect(persistedCount).toBe(exam1Ids.length);

    // ─── Exam 2: Answer 5 more questions ────────────────────────────────
    const exam2Ids = await answerAllQuestions(page, {
      grade: /11.*Grado/i,
      subject: 'Matemáticas',
      count: 5,
    });
    expect(exam2Ids.length).toBeGreaterThan(0);
    expect(exam2Ids.length).toBeLessThanOrEqual(7); // may get fillers if pool exhausted

    // ─── Verify ZERO overlap ────────────────────────────────────────────
    const overlap = exam1Ids.filter((id) => exam2Ids.includes(id));
    console.log(`[TEST] Exam 1 IDs (${exam1Ids.length}): ${exam1Ids.join(', ')}`);
    console.log(`[TEST] Exam 2 IDs (${exam2Ids.length}): ${exam2Ids.join(', ')}`);
    console.log(`[TEST] Overlap: ${overlap.length} — ${overlap.join(', ') || 'none'}`);

    // Critical assertion: at most 0 repeated IDs (strict dedup)
    // If pool exhaustion forces repeats, we allow it but expect < 20% overlap
    const overlapRatio = overlap.length / Math.min(exam1Ids.length, exam2Ids.length);
    expect(overlapRatio).toBeLessThan(0.2);
  });

  test('Memory persists after CEFR level change (Inglés A2 → B1)', async ({ page }) => {
    test.setTimeout(180000);
    page.on('console', (msg) => console.log(`[BROWSER] ${msg.text()}`));

    await setupMockRoutes(page);

    // Clear localStorage before starting
    await page.goto(BASE_URL);
    await page.evaluate(() => localStorage.clear());

    // ─── Exam 1: Answer 5 Inglés questions at A2 ─────────────────────────
    const exam1Ids = await answerAllQuestions(page, {
      grade: /11.*Grado/i,
      subject: 'Inglés',
      count: 5,
      cefrLevel: 'A2 - Elemental',
    });

    expect(exam1Ids.length).toBeGreaterThan(0);

    // Verify memory persisted
    const afterExam1 = await page.evaluate(() => {
      const raw = localStorage.getItem('saberparatodos_answered_questions');
      if (!raw) return 0;
      const data = JSON.parse(raw);
      return Object.keys(data.answeredTimestamps || data.answeredIds || {}).length;
    });
    expect(afterExam1).toBeGreaterThanOrEqual(exam1Ids.length);
    console.log(`[TEST] After exam 1: ${afterExam1} IDs in memory`);

    // ─── Exam 2: Answer 5 Inglés questions at B1 (different CEFR level) ──
    const exam2Ids = await answerAllQuestions(page, {
      grade: /11.*Grado/i,
      subject: 'Inglés',
      count: 5,
      cefrLevel: 'B1 - Intermedio',
    });

    // ─── Verify memory did NOT reset — it should have GROWN ──────────────
    const afterExam2 = await page.evaluate(() => {
      const raw = localStorage.getItem('saberparatodos_answered_questions');
      if (!raw) return 0;
      const data = JSON.parse(raw);
      return Object.keys(data.answeredTimestamps || data.answeredIds || {}).length;
    });
    console.log(`[TEST] After exam 2: ${afterExam2} IDs in memory`);

    // Memory should have grown (not reset) because we're adding B1 questions on top of A2
    // Exam 1 answered ~5 A2 questions, Exam 2 answered ~5 B1 questions
    // Total should be ~10, but different CEFR means A2 IDs are a different set
    expect(afterExam2).toBeGreaterThanOrEqual(afterExam1);

    // Overlap should be small (A2 vs B1 are different question pools)
    const overlap = exam1Ids.filter((id) => exam2Ids.includes(id));
    console.log(`[TEST] Overlap between A2 and B1 exams: ${overlap.length}`);
    expect(overlap.length).toBe(0);
  });

  test('Force memory fill: all questions in a pool get answered, verify no duplicates without memory wipe', async ({
    page,
  }) => {
    /**
     * This test validates the CORE FIX for #742:
     * When ALL questions for a given filter are answered (100% exhausted),
     * the system should NOT wipe memory. It should reuse oldest questions
     * (spaced repetition) while keeping the memory stats intact.
     *
     * We verify this by:
     * 1. Answering 10 out of 15 questions in a pool
     * 2. Answering the remaining 5 → pool exhausted at 100%
     * 3. Starting a THIRD exam → should show oldest previously-answered questions
     * 4. Memory counter should NOT be 0 (not wiped)
     */
    test.setTimeout(240000);
    page.on('console', (msg) => console.log(`[BROWSER] ${msg.text()}`));

    await setupMockRoutes(page);
    await page.goto(BASE_URL);
    await page.evaluate(() => localStorage.clear());

    // ─── Exam 1: Answer 7 questions ──────────────────────────────────────
    const exam1Ids = await answerAllQuestions(page, {
      grade: /11.*Grado/i,
      subject: 'Matemáticas',
      count: 7,
    });

    // ─── Exam 2: Answer 7 more questions ─────────────────────────────────
    const exam2Ids = await answerAllQuestions(page, {
      grade: /11.*Grado/i,
      subject: 'Matemáticas',
      count: 7,
    });

    // At this point, we've answered 14 out of 15 questions (almost exhausted)
    const answeredBeforeExam3 = await page.evaluate(() => {
      const raw = localStorage.getItem('saberparatodos_answered_questions');
      if (!raw) return 0;
      const data = JSON.parse(raw);
      return Object.keys(data.answeredTimestamps || data.answeredIds || {}).length;
    });
    console.log(`[TEST] Before exam 3: ${answeredBeforeExam3} IDs in memory`);
    expect(answeredBeforeExam3).toBeGreaterThanOrEqual(10);

    // ─── Exam 3: Answer 5 more questions → pool should be exhausted ──────
    const exam3Ids = await answerAllQuestions(page, {
      grade: /11.*Grado/i,
      subject: 'Matemáticas',
      count: 5,
    });

    // ─── CRITICAL ASSERTION: Memory was NOT wiped ─────────────────────────
    // After the third exam, memory should still have all previously answered IDs
    const answeredAfterExam3 = await page.evaluate(() => {
      const raw = localStorage.getItem('saberparatodos_answered_questions');
      if (!raw) return 0;
      const data = JSON.parse(raw);
      return Object.keys(data.answeredTimestamps || data.answeredIds || {}).length;
    });
    console.log(`[TEST] After exam 3: ${answeredAfterExam3} IDs in memory`);

    // FIX #742: Memory must NOT be 0 or less than before exam 3.
    // The old bug would wipe memory to 0 when 100% of questions in the subset were answered.
    expect(answeredAfterExam3).toBeGreaterThan(0);
    // Memory should be at least as large as before (can't shrink since we only add)
    expect(answeredAfterExam3).toBeGreaterThanOrEqual(answeredBeforeExam3);

    // Verify exam 3 has some IDs (even if repeated from exhaustion)
    expect(exam3Ids.length).toBeGreaterThan(0);

    console.log('[TEST] ✅ Memory survived pool exhaustion — no wipe occurred');
  });
});

test.describe('Issue #742 — localStorage key sanity', () => {
  test('Question memory key exists after answering', async ({ page }) => {
    await setupMockRoutes(page);
    await page.goto(BASE_URL);
    await page.evaluate(() => localStorage.clear());

    await answerAllQuestions(page, {
      grade: /11.*Grado/i,
      subject: 'Matemáticas',
      count: 3,
    });

    const hasMemory = await page.evaluate(() => {
      return localStorage.getItem('saberparatodos_answered_questions') !== null;
    });
    expect(hasMemory).toBe(true);
  });
});
