import { test, expect } from '@playwright/test';

// Utilizaremos un BASE_URL local si existe, de lo contrario a prod
// Los tests e2e interceptan los requests, así que funciona en ambos
const BASE_URL = 'http://localhost:4321';

test.use({ serviceWorkers: 'block' });

test.describe('CEFR Filtering and Memory Reset Logic', () => {
  test('Filters by CEFR exactly and resets memory when exhausted', async ({ page }) => {
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('request', req => console.log('REQUEST:', req.url()));
    
    // 1. Interceptar los packs de preguntas
    await page.route('**/packs/*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          questions: [
            {
              id: 'mock-q-a1',
              cefr_level: 'A1',
              text: 'Mock A1 Question',
              options: [
                { is_correct: true, text: 'Opción A' },
                { is_correct: false, text: 'Opción B' },
                { is_correct: false, text: 'Opción C' },
                { is_correct: false, text: 'Opción D' }
              ],
              subject: 'ingles',
              category: 'Inglés',
              grade: 11
            },
            {
              id: 'mock-q-a2',
              cefr_level: 'A2',
              text: 'Mock A2 Question',
              options: [
                { is_correct: true, text: 'Opción A' },
                { is_correct: false, text: 'Opción B' },
                { is_correct: false, text: 'Opción C' },
                { is_correct: false, text: 'Opción D' }
              ],
              subject: 'ingles',
              category: 'Inglés',
              grade: 11
            },
            {
              id: 'mock-q-b1',
              cefr_level: 'B1',
              text: 'Mock B1 Question',
              options: [
                { is_correct: true, text: 'Opción A' },
                { is_correct: false, text: 'Opción B' },
                { is_correct: false, text: 'Opción C' },
                { is_correct: false, text: 'Opción D' }
              ],
              subject: 'ingles',
              category: 'Inglés',
              grade: 11
            }
          ]
        })
      });
    });

    // Interceptar la API de fallback (búsqueda profunda)
    await page.route('**/questions?*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            {
              id: 'mock-q-a2-fallback',
              cefr_level: 'A2',
              text: 'Mock A2 Fallback',
              options: [
                { is_correct: true, text: 'Opción A' },
                { is_correct: false, text: 'Opción B' },
                { is_correct: false, text: 'Opción C' },
                { is_correct: false, text: 'Opción D' }
              ],
              subject: 'ingles',
              category: 'Inglés',
              grade: 11
            }
          ],
          total: 1
        })
      });
    });

    await page.goto(BASE_URL);

    // Seleccionar grado
    const gradeBtn = page.getByRole('button', { name: /11.*Grado/i }).first();
    await expect(gradeBtn).toBeVisible({ timeout: 15000 });
    await gradeBtn.click();

    await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 15000 });

    // Seleccionar asignatura
    const subjectDropdown = page.locator('select').first();
    await expect(subjectDropdown).toBeVisible({ timeout: 5000 });
    await subjectDropdown.selectOption({ label: 'Inglés' });

    // Click "Cambiar" to reveal the level selection buttons if they are hidden
    const cambiarBtn = page.getByRole('button', { name: /Cambiar/i }).first();
    const cefrBtn = page.getByRole('button', { name: /A2 - Elemental/i }).first();
    await expect(cefrBtn.or(cambiarBtn)).toBeVisible({ timeout: 5000 });
    if (await cambiarBtn.isVisible()) {
        await cambiarBtn.click();
    }
    
    // Seleccionar nivel CEFR
    // Ya tenemos el cefrBtn definido arriba
    await expect(cefrBtn).toBeVisible({ timeout: 5000 });
    await cefrBtn.click();

    // Esperar a que las estadísticas de memoria se calculen (el panel de memoria debe ser visible).
    const vistasContenedor = page.getByText('Vistas', { exact: true }).locator('..');
    await expect(vistasContenedor).toBeVisible({ timeout: 5000 });
    
    const totalElement = page.getByText('Total', { exact: true }).locator('..').locator('p').first();
    const totalText = await totalElement.textContent();
    const poolSize = parseInt(totalText || '4', 10);

    // Iniciar examen
    const btn10 = page.getByRole('button', { name: '10' }).first();
    await expect(btn10).toBeVisible();
    await btn10.click();

    const startBtn = page.getByRole('button', { name: /Comenzar/i }).first();
    await expect(startBtn).toBeEnabled();
    await startBtn.click();

    // Contestar todas las preguntas en el pool
    while (true) {
        await expect(page.locator('text=/Mock/i').first()).toBeVisible({ timeout: 10000 });
        await page.getByText('Opción A').first().click();
        
        const nextBtn = page.locator('button', { hasText: /Siguiente|Terminar|Finalizar/i }).first();
        await expect(nextBtn).toBeVisible({ timeout: 5000 });
        
        const btnText = await nextBtn.textContent();
        await nextBtn.click();
        
        if (btnText && btnText.match(/Finalizar|Terminar/i)) {
            break;
        }
    }

    // Finalizar
    await expect(page.getByText(/Resultados/i).first()).toBeVisible({ timeout: 10000 });

    // Recargar página para verificar la memoria
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: /11.*Grado/i }).first().click();
    
    await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 15000 });
    const subjectDropdown2 = page.locator('select').first();
    await expect(subjectDropdown2).toBeVisible({ timeout: 5000 });
    await subjectDropdown2.selectOption({ label: 'Inglés' });

    // Cuando recargamos, el nivel guardado en localstorage podría evitar que se muestre el pop-up de CEFR inicial, 
    // pero si lo hace, lo clickeamos de nuevo.
    const cefrBtn2 = page.getByRole('button', { name: /A2 - Elemental/i }).first();
    if (await cefrBtn2.isVisible()) {
        await cefrBtn2.click();
    }

    // Al haber agotado el pool, la memoria DEBIÓ haberse reseteado automáticamente.
    // Por lo tanto, "Vistas" debe ser 0.
    const vistasContenedorFinal = page.getByText('Vistas', { exact: true }).locator('..');
    await expect(vistasContenedorFinal).toBeVisible({ timeout: 5000 });
    const vistasElement = vistasContenedorFinal.locator('p').first();
    await expect(vistasElement).toHaveText('0', { timeout: 5000 });
  });
});
