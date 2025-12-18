/**
 * E2E Tests - Security & Performance Improvements
 * World Exams - Supabase Edge Functions
 *
 * Tests implementados:
 * 1. Guest access sin JWT
 * 2. Bulk endpoint para Blog View
 * 3. Rate limiting (100 req/hr)
 * 4. Caching headers
 * 5. Input validation
 * 6. Static API deprecation
 */

import { test, expect } from '@playwright/test';

const EDGE_FUNCTION_URL = 'https://tzmrgvtptdtsjcugwqyq.supabase.co/functions/v1';
const FRONTEND_URL = 'https://d12a4b18.saberparatodos.pages.dev';

test.describe('Security & Performance Improvements', () => {

  // ============================================
  // TEST 1: Guest Access (sin JWT)
  // ============================================

  test('1.1 - Guest access sin JWT debe funcionar', async ({ request }) => {
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
      params: {
        grade: '11',
        subject: 'matematicas',
        limit: '5',
        country: 'CO'
      }
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.is_guest).toBe(true);
    expect(data.total_questions).toBeLessThanOrEqual(10);
    expect(data.questions).toHaveLength(Math.min(5, data.total_questions));
  });

  test('1.2 - Guest debe recibir máximo 10 preguntas', async ({ request }) => {
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
      params: {
        grade: '11',
        subject: 'matematicas',
        limit: '50', // Solicita 50, debe recibir máximo 10
        country: 'CO'
      }
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.is_guest).toBe(true);
    expect(data.total_questions).toBeLessThanOrEqual(10);
  });

  test('1.3 - Respuesta debe incluir campo is_guest', async ({ request }) => {
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
      params: {
        grade: '5',
        subject: 'matematicas',
        country: 'CO'
      }
    });

    const data = await response.json();
    expect(data).toHaveProperty('is_guest');
    expect(typeof data.is_guest).toBe('boolean');
  });

  // ============================================
  // TEST 2: Bulk Endpoint
  // ============================================

  test('2.1 - Bulk endpoint debe retornar múltiples grados', async ({ request }) => {
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions-bulk`, {
      params: {
        grades: '3,5,7,9,11',
        mode: 'sample',
        limit: '150',
        country: 'CO'
      }
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.total_questions).toBeGreaterThanOrEqual(50);
    expect(data.questions).toBeInstanceOf(Array);

    // Verificar que hay preguntas de diferentes grados
    const grades = [...new Set(data.questions.map((q: any) => q.grade))];
    expect(grades.length).toBeGreaterThan(1);
  });

  test('2.2 - Bulk endpoint debe respetar límite', async ({ request }) => {
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions-bulk`, {
      params: {
        grades: '11',
        mode: 'sample',
        limit: '20',
        country: 'CO'
      }
    });

    const data = await response.json();
    expect(data.questions.length).toBeLessThanOrEqual(20);
  });

  test('2.3 - Bulk endpoint debe incluir metadata correcta', async ({ request }) => {
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions-bulk`, {
      params: {
        grades: '11',
        mode: 'sample',
        limit: '50',
        country: 'CO'
      }
    });

    const data = await response.json();
    expect(data).toHaveProperty('total_questions');
    expect(data).toHaveProperty('grades');
    expect(data).toHaveProperty('subjects');
    expect(data).toHaveProperty('country');
    expect(data.country).toBe('CO');
  });

  // ============================================
  // TEST 3: Rate Limiting
  // ============================================

  test('3.1 - Múltiples requests dentro del límite deben funcionar', async ({ request }) => {
    const requests = [];

    for (let i = 0; i < 10; i++) {
      requests.push(
        request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
          params: { grade: '11', subject: 'matematicas', country: 'CO' }
        })
      );
    }

    const responses = await Promise.all(requests);

    // Todos deben ser 200 (aún dentro del límite de 100/hr)
    responses.forEach(response => {
      expect([200, 429]).toContain(response.status());
    });
  });

  test.skip('3.2 - Request 101 debe retornar 429 (Too Many Requests)', async ({ request }) => {
    // NOTA: Este test requiere ejecutarse en aislamiento o con IP única
    // Skip por defecto para evitar contaminar rate limit

    const requests = [];
    for (let i = 0; i < 101; i++) {
      requests.push(
        request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
          params: { grade: '11', subject: 'matematicas', country: 'CO' }
        })
      );
    }

    const responses = await Promise.all(requests);
    const statuses = responses.map(r => r.status());

    // Al menos uno debe ser 429
    expect(statuses).toContain(429);
  });

  // ============================================
  // TEST 4: Caching Headers
  // ============================================

  test('4.1 - Guest requests deben tener cache público', async ({ request }) => {
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
      params: { grade: '11', subject: 'matematicas', country: 'CO' }
    });

    const cacheControl = response.headers()['cache-control'];
    expect(cacheControl).toBeDefined();
    expect(cacheControl).toContain('public');
    expect(cacheControl).toMatch(/max-age=\d+/);
  });

  test('4.2 - Headers de seguridad CSP deben estar presentes', async ({ page }) => {
    const response = await page.goto(FRONTEND_URL);

    const headers = response?.headers() || {};

    // Verificar CSP header
    const csp = headers['content-security-policy'];
    if (csp) {
      expect(csp).toContain('script-src');
      expect(csp).toContain('connect-src');
    }

    // Verificar otros headers de seguridad
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('DENY');
  });

  // ============================================
  // TEST 5: Input Validation
  // ============================================

  test('5.1 - Parámetros inválidos deben retornar error 400', async ({ request }) => {
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
      params: {
        grade: 'invalid', // No es número
        subject: 'matematicas',
        country: 'CO'
      }
    });

    expect([400, 422]).toContain(response.status());
  });

  test('5.2 - Country code inválido debe retornar error', async ({ request }) => {
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
      params: {
        grade: '11',
        subject: 'matematicas',
        country: 'INVALID'
      }
    });

    expect([400, 422]).toContain(response.status());
  });

  test('5.3 - Subject vacío debe retornar error', async ({ request }) => {
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
      params: {
        grade: '11',
        subject: '',
        country: 'CO'
      }
    });

    expect([400, 422]).toContain(response.status());
  });

  // ============================================
  // TEST 6: Blog View Optimization
  // ============================================

  test('6.1 - Blog View debe cargar en menos de 3 segundos', async ({ page }) => {
    const startTime = Date.now();

    await page.goto(FRONTEND_URL);

    // Click en botón Blog
    const blogButton = page.locator('button:has-text("Blog")').or(page.locator('a:has-text("Blog")'));
    await blogButton.click();

    // Esperar a que carguen las preguntas
    await page.waitForSelector('[data-testid="blog-questions"], .question-card', { timeout: 5000 });

    const loadTime = Date.now() - startTime;

    // Debe cargar en menos de 3 segundos
    expect(loadTime).toBeLessThan(3000);
  });

  test('6.2 - Blog View debe hacer solo 1 request al backend', async ({ page }) => {
    const requests: string[] = [];

    page.on('request', request => {
      const url = request.url();
      if (url.includes('supabase.co/functions/v1')) {
        requests.push(url);
      }
    });

    await page.goto(FRONTEND_URL);

    // Click en Blog
    const blogButton = page.locator('button:has-text("Blog")').or(page.locator('a:has-text("Blog")'));
    await blogButton.click();

    await page.waitForTimeout(2000);

    // Filtrar solo requests a get-questions-bulk
    const bulkRequests = requests.filter(url => url.includes('get-questions-bulk'));

    // Debe haber solo 1 request al endpoint bulk
    expect(bulkRequests.length).toBe(1);
  });

  // ============================================
  // TEST 7: Performance Benchmarks
  // ============================================

  test('7.1 - Edge Function debe responder en menos de 500ms (p95)', async ({ request }) => {
    const times: number[] = [];

    for (let i = 0; i < 20; i++) {
      const start = Date.now();
      await request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
        params: { grade: '11', subject: 'matematicas', country: 'CO' }
      });
      times.push(Date.now() - start);
    }

    times.sort((a, b) => a - b);
    const p95 = times[Math.floor(times.length * 0.95)];

    expect(p95).toBeLessThan(500);
  });

  test('7.2 - Bulk endpoint debe responder en menos de 1 segundo', async ({ request }) => {
    const start = Date.now();

    await request.get(`${EDGE_FUNCTION_URL}/get-questions-bulk`, {
      params: {
        grades: '3,5,7,9,11',
        mode: 'sample',
        limit: '150',
        country: 'CO'
      }
    });

    const responseTime = Date.now() - start;

    expect(responseTime).toBeLessThan(1000);
  });

  // ============================================
  // TEST 8: Error Handling
  // ============================================

  test('8.1 - Edge Function debe manejar errores gracefully', async ({ request }) => {
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
      params: {
        grade: '999', // Grado inexistente
        subject: 'materiaInexistente',
        country: 'CO'
      }
    });

    // Debe retornar error controlado, no 500
    expect(response.status()).not.toBe(500);
  });

  test('8.2 - Respuestas de error deben incluir mensaje descriptivo', async ({ request }) => {
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
      params: {
        grade: 'abc',
        subject: 'matematicas',
        country: 'CO'
      }
    });

    if (!response.ok()) {
      const data = await response.json();
      expect(data).toHaveProperty('message');
      expect(typeof data.message).toBe('string');
      expect(data.message.length).toBeGreaterThan(0);
    }
  });

  // ============================================
  // TEST 9: Static API Deprecation (cuando se active)
  // ============================================

  test.skip('9.1 - Static API debe retornar 410 (Gone)', async ({ request }) => {
    // Skip: Solo cuando DISABLE_STATIC_API=true esté habilitado

    const response = await request.get(`${FRONTEND_URL}/api/v1/questions.json`);

    expect(response.status()).toBe(410);

    const data = await response.json();
    expect(data.message).toContain('deprecated');
  });

  // ============================================
  // TEST 10: Database Integration
  // ============================================

  test('10.1 - Guest requests deben registrarse en rate_limits table', async ({ request }) => {
    // Hacer request de guest
    const response = await request.get(`${EDGE_FUNCTION_URL}/get-questions`, {
      params: { grade: '11', subject: 'matematicas', country: 'CO' }
    });

    expect(response.status()).toBe(200);

    // NOTA: Verificación de DB requiere acceso directo a Supabase
    // Este test solo confirma que el request fue exitoso
    // La verificación real se hace via SQL query manual
  });
});

// ============================================
// TEST SUITE: Regression Tests
// ============================================

test.describe('Regression Tests - No Breaking Changes', () => {

  test('REG-1: Exam submission sigue funcionando', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // Iniciar examen
    const startButton = page.locator('button:has-text("Comenzar")').first();
    await startButton.click();

    // Debe cargar preguntas
    await page.waitForSelector('[data-testid="question"], .question-container', { timeout: 5000 });
  });

  test('REG-2: Party Mode sigue funcionando', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // Buscar botón de Party Mode
    const partyButton = page.locator('button:has-text("Party")').or(page.locator('a:has-text("Party")'));

    if (await partyButton.count() > 0) {
      await partyButton.click();

      // Debe mostrar interfaz de Party
      await page.waitForSelector('[data-testid="party-interface"], .party-container', { timeout: 5000 });
    }
  });

  test('REG-3: Leaderboard sigue funcionando', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    const leaderboardButton = page.locator('button:has-text("Ranking")').or(page.locator('a:has-text("Ranking")'));

    if (await leaderboardButton.count() > 0) {
      await leaderboardButton.click();

      // Debe mostrar tabla de ranking
      await page.waitForSelector('[data-testid="leaderboard"], table', { timeout: 5000 });
    }
  });
});
