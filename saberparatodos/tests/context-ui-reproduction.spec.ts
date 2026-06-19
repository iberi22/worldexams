import { test, expect } from '@playwright/test';

/**
 * QA UI Context Logic E2E Test
 * Validates that questions with a context display the side-by-side (split-panel) layout on desktop.
 */
test('should display side-by-side context layout on desktop', async ({ page }) => {
  // Set viewport to desktop size
  await page.setViewportSize({ width: 1280, height: 800 });

  // 1. Visit landing and inject bypass flags
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('spt_hide_hero', 'true');
    localStorage.setItem('spt_skip_integrity_delay', 'true');
    localStorage.setItem('saberparatodos_local_mode_ack', 'true');
  });
  await page.reload();

  // 2. Mock a pool of questions with context
  const mockQuestions = [
    {
      id: 'mock-context-1',
      category: 'LECTURA CRÍTICA',
      text: '¿Cuál es la idea principal del texto?',
      context: 'Este es un contexto de prueba largo para validar el split panel. Debería aparecer a la izquierda.',
      options: [
        { id: 'A', text: 'La importancia de las abejas' },
        { id: 'B', text: 'El cambio climático' },
        { id: 'C', text: 'La fotosíntesis' },
        { id: 'D', text: 'La revolución industrial' }
      ],
      correctOptionId: 'A',
      grade: 11,
      difficulty: 3
    }
  ];

  // 3. Inject mock questions into the app state via evaluate
  // We target the internal storage used by prepareSoloExamQuestions fallback
  await page.evaluate((qs) => {
    // Force the app to use our questions by putting them in the global bank
    (window as any).__MOCK_QUESTIONS__ = qs;
  }, mockQuestions);

  // Note: We need App.svelte to actually pick up these questions.
  // In our current App.svelte, it uses fetchAllQuestionsForGrade.
  // We can intercept the network request or mock the function.
  // Intercepting the pack fetch is more robust.
  await page.route('**/api/packs/*.json', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        subject: 'lectura_critica',
        questions: mockQuestions.map(q => ({
          id: q.id,
          statement: q.text,
          context: q.context,
          options: q.options.map(o => ({ letter: o.id, text: o.text, is_correct: o.id === q.correctOptionId })),
          correct_answer: q.correctOptionId,
          explanation: 'Explicación de prueba',
          difficulty: 'Medium',
          tags: ['test'],
          images: []
        }))
      })
    });
  });

  // 4. Start Exam
  // Select Grade 11
  await page.getByText('11°', { exact: true }).first().click();

  // In ExamConfigModal, select "Lectura Crítica" if it appears, or just "Comenzar"
  // If it's the unified modal, it might show subjects.
  const comenzarBtn = page.getByRole('button', { name: /Comenzar/i });
  await comenzarBtn.click();

  // 5. Assert Split Panel visibility
  // The SharedContextLayout should have md:grid-cols-2
  const contextPanel = page.locator('text=Contexto de Lectura');
  await expect(contextPanel).toBeVisible({ timeout: 10000 });

  // Verify it's side-by-side by checking the grid container
  const gridContainer = page.locator('.grid-cols-1.md\\:grid-cols-2');
  await expect(gridContainer).toBeVisible();

  // 6. Verify Context Content
  await expect(page.locator('text=Este es un contexto de prueba largo')).toBeVisible();

  // 7. Verify Question Content
  await expect(page.locator('text=¿Cuál es la idea principal del texto?')).toBeVisible();

  // 8. Take a screenshot for visual verification
  await page.screenshot({ path: 'test-results/context-split-panel-desktop.png' });
});

test('should display floating button for context on mobile', async ({ page }) => {
  // Set viewport to mobile size
  await page.setViewportSize({ width: 375, height: 667 });

  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('spt_hide_hero', 'true');
    localStorage.setItem('spt_skip_integrity_delay', 'true');
    localStorage.setItem('saberparatodos_local_mode_ack', 'true');
  });
  await page.reload();

  const mockQuestions = [
    {
      id: 'mock-context-mobile',
      category: 'LECTURA CRÍTICA',
      text: 'Pregunta móvil',
      context: 'Contexto móvil que debería estar oculto inicialmente.',
      options: [{ id: 'A', text: 'A' }, { id: 'B', text: 'B' }],
      correctOptionId: 'A',
      grade: 11,
      difficulty: 3
    }
  ];

  await page.route('**/api/packs/*.json', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        subject: 'lectura_critica',
        questions: mockQuestions.map(q => ({
          id: q.id,
          statement: q.text,
          context: q.context,
          options: q.options.map(o => ({ letter: o.id, text: o.text, is_correct: o.id === q.correctOptionId })),
          correct_answer: q.correctOptionId,
          difficulty: 'Medium',
          tags: ['test']
        }))
      })
    });
  });

  await page.getByText('11°', { exact: true }).first().click();
  await page.getByRole('button', { name: /Comenzar/i }).click();

  // Mobile split panel (left column) should be hidden
  const desktopPanel = page.locator('.hidden.md\\:block');
  await expect(desktopPanel).not.toBeVisible();

  // Floating button should be visible
  const verLecturaBtn = page.getByRole('button', { name: /Ver Lectura/i });
  await expect(verLecturaBtn).toBeVisible();

  // Click floating button and verify overlay
  await verLecturaBtn.click();
  // We use .first() or target the md:hidden container because the desktop context also exists in DOM (but hidden)
  await expect(page.locator('.md\\:hidden').getByText('Contexto móvil que debería estar oculto')).toBeVisible();

  // Close overlay
  await page.getByRole('button', { name: '✕' }).click();
  await expect(page.locator('text=Contexto móvil que debería estar oculto')).not.toBeVisible();

  await page.screenshot({ path: 'test-results/context-mobile-floating.png' });
});
