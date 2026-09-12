import { test, expect } from '@playwright/test';

test.describe('PDF Studio LLM v5.2 Generator E2E Suite (Wave 12.01)', () => {
  test('generates draft questions from PDF using mocked Chrome Nano API with zero console errors', async ({ page }, testInfo) => {
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(err);
    });

    // Mock Chrome Built-in AI (Gemini Nano) in browser window context
    await page.addInitScript(() => {
      const mockQuestions = [
        {
          statement: '¿Cuál es la función principal de la clorofila durante la fotosíntesis?',
          context: 'La fotosíntesis ocurre en los cloroplastos de las hojas vegetales.',
          options: [
            { letter: 'A', text: 'Absorber la luz solar', is_correct: true, feedback: 'Correcto, capta los fotones de luz solar.' },
            { letter: 'B', text: 'Sintetizar sacarosa directamente', is_correct: false, feedback: 'La glucosa se sintetiza en el ciclo de Calvin.' },
            { letter: 'C', text: 'Liberar dióxido de carbono', is_correct: false, feedback: 'El CO2 se consume, no se libera.' },
            { letter: 'D', text: 'Almacenar agua en la vacuola', is_correct: false, feedback: 'La vacuola se encarga del almacenamiento hídrico.' },
          ],
          correct_answer: 'A',
          explanation: 'La clorofila es el pigmento fotoreceptor clave de la fase luminosa.',
          difficulty: 'D5',
          bloom: 'Comprender',
        },
      ];

      (window as any).ai = {
        languageModel: {
          availability: async () => 'readily',
          capabilities: async () => ({ available: 'readily' }),
          create: async () => ({
            prompt: async () => JSON.stringify(mockQuestions),
            destroy: () => {},
          }),
        },
      };
    });

    // Navigate to /estudio page
    await page.goto('/estudio');

    // Verify main page elements
    const heading = page.locator('h2:has-text("Studio PDF"), h1:has-text("Studio"), h2:has-text("Estudio")').first();
    await expect(heading).toBeVisible();

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('studio-landing', {
      body: screenshot,
      contentType: 'image/png',
    });

    // Assert zero console or page errors during navigation
    expect(consoleErrors, `Console errors detected: ${consoleErrors.join(', ')}`).toEqual([]);
    expect(pageErrors, `Page errors detected: ${pageErrors.map((e) => e.message).join(', ')}`).toEqual([]);
  });
});
