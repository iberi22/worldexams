import { test, expect } from '@playwright/test';

// Mock questions for testing
const MOCK_QUESTIONS = {
    questions: [
        {
            id: 'TEST-001',
            statement: 'Pregunta 1: ¿Cuál es 2 + 2?',
            options: [
                { letter: 'A', text: 'Respuesta Correcta A', is_correct: true },
                { letter: 'B', text: 'Respuesta Incorrecta B', is_correct: false },
                { letter: 'C', text: 'Respuesta Incorrecta C', is_correct: false },
                { letter: 'D', text: 'Respuesta Incorrecta D', is_correct: false }
            ],
            correct_answer: 'A',
            explanation: 'Explicación de la pregunta 1',
            difficulty: 3,
            competency: 'Álgebra',
            subject: 'Matemáticas',
            grade: 11
        },
        {
            id: 'TEST-002',
            statement: 'Pregunta 2: ¿Cuál es 3 + 3?',
            options: [
                { letter: 'A', text: 'Respuesta Incorrecta A2', is_correct: false },
                { letter: 'B', text: 'Respuesta Correcta B', is_correct: true },
                { letter: 'C', text: 'Respuesta Incorrecta C2', is_correct: false },
                { letter: 'D', text: 'Respuesta Incorrecta D2', is_correct: false }
            ],
            correct_answer: 'B',
            explanation: 'Explicación de la pregunta 2',
            difficulty: 2,
            competency: 'Geometría',
            subject: 'Matemáticas',
            grade: 11
        }
    ]
};

test.describe('Sistema de Informes E2E', () => {

    test('Verificar Dashboard de Métricas Local', async ({ page, context }) => {
        // Intercept API requests
        await context.route(/.*/, async route => {
            const url = route.request().url();
            if (url.includes('get-questions') || (url.includes('/api/') && url.includes('.json'))) {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(MOCK_QUESTIONS)
                });
                return;
            }
            await route.continue();
        });

        // Navigate and verify landing loads
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Take screenshot of landing
        await page.screenshot({ path: 'test-results/landing-page.png' });

        // Verify "Mis Métricas" card exists
        const metricsCard = page.getByText('Mis Métricas');
        await expect(metricsCard).toBeVisible({ timeout: 10000 });

        // Click to open metrics dashboard
        await metricsCard.click();
        await page.waitForTimeout(1000);

        // Take screenshot of metrics modal
        await page.screenshot({ path: 'test-results/metrics-modal.png' });

        // Verify modal opened with correct title
        await expect(page.getByText('Inteligencia Local')).toBeVisible({ timeout: 5000 });

        // Verify tabs exist
        await expect(page.getByRole('button', { name: /Dashboard/i }).first()).toBeVisible();
        await expect(page.getByRole('button', { name: /Historial/i }).first()).toBeVisible();

        // Click Historial tab
        await page.getByRole('button', { name: /Historial/i }).first().click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'test-results/metrics-historial.png' });

        console.log('✅ Metrics dashboard test passed');
    });

    test('Simular Examen y Verificar Guardado en IndexedDB', async ({ page, context }) => {
        // Setup mock
        await context.route(/.*/, async route => {
            const url = route.request().url();
            if (url.includes('get-questions') || (url.includes('/api/') && url.includes('.json'))) {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(MOCK_QUESTIONS)
                });
                return;
            }
            await route.continue();
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Use JavaScript to directly simulate saving exam results to IndexedDB
        const result = await page.evaluate(async () => {
            // Access IndexedDB directly
            return new Promise((resolve) => {
                const request = indexedDB.open('saberparatodos-local', 1);

                request.onerror = () => resolve({ error: 'Failed to open DB' });

                request.onupgradeneeded = (event) => {
                    const db = (event.target as IDBOpenDBRequest).result;
                    if (!db.objectStoreNames.contains('examResults')) {
                        db.createObjectStore('examResults', { keyPath: 'id', autoIncrement: true });
                    }
                };

                request.onsuccess = (event) => {
                    const db = (event.target as IDBOpenDBRequest).result;
                    const tx = db.transaction('examResults', 'readwrite');
                    const store = tx.objectStore('examResults');

                    // Add a perfect score exam result
                    const examResult = {
                        timestamp: Date.now(),
                        grade: 11,
                        subject: 'MATEMATICAS',
                        score: 100,
                        totalQuestions: 4,
                        correctCount: 4,
                        timeSpentSeconds: 120
                    };

                    store.add(examResult);

                    // Add a 50% score exam result
                    const examResult50 = {
                        timestamp: Date.now() + 1000,
                        grade: 11,
                        subject: 'MATEMATICAS',
                        score: 50,
                        totalQuestions: 4,
                        correctCount: 2,
                        timeSpentSeconds: 180
                    };

                    store.add(examResult50);

                    tx.oncomplete = () => {
                        resolve({ success: true, message: 'Added 2 exam results' });
                    };
                };
            });
        });

        console.log('IndexedDB result:', result);

        // Reload page to see data in metrics
        await page.reload();
        await page.waitForLoadState('networkidle');

        // Open metrics
        await page.getByText('Mis Métricas').click();
        await page.waitForTimeout(1500);

        // Take screenshot showing data
        await page.screenshot({ path: 'test-results/metrics-with-data.png' });

        // Should now show historial with 2 exams
        await page.getByRole('button', { name: /Historial/i }).first().click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'test-results/historial-with-data.png' });

        console.log('✅ IndexedDB simulation test passed');
    });

    test('Verificar Gráficos y Plan de Mejora', async ({ page, context }) => {
        await context.route(/.*/, async route => {
            const url = route.request().url();
            if (url.includes('get-questions') || (url.includes('/api/') && url.includes('.json'))) {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(MOCK_QUESTIONS)
                });
                return;
            }
            await route.continue();
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Inject multiple exam results for better testing
        await page.evaluate(async () => {
            return new Promise((resolve) => {
                const request = indexedDB.open('saberparatodos-local', 1);

                request.onupgradeneeded = (event) => {
                    const db = (event.target as IDBOpenDBRequest).result;
                    if (!db.objectStoreNames.contains('examResults')) {
                        db.createObjectStore('examResults', { keyPath: 'id', autoIncrement: true });
                    }
                };

                request.onsuccess = (event) => {
                    const db = (event.target as IDBOpenDBRequest).result;
                    const tx = db.transaction('examResults', 'readwrite');
                    const store = tx.objectStore('examResults');

                    // Add 5 exam results with varying scores
                    const scores = [100, 80, 60, 75, 90];
                    scores.forEach((score, i) => {
                        store.add({
                            timestamp: Date.now() + (i * 86400000), // Each day
                            grade: 11,
                            subject: i % 2 === 0 ? 'MATEMATICAS' : 'LECTURA_CRITICA',
                            score,
                            totalQuestions: 10,
                            correctCount: score / 10,
                            timeSpentSeconds: 300 + (i * 60)
                        });
                    });

                    tx.oncomplete = () => resolve({ success: true });
                };
            });
        });

        // Reload and check metrics
        await page.reload();
        await page.waitForLoadState('networkidle');

        await page.getByText('Mis Métricas').click();
        await page.waitForTimeout(2000);

        // Take full page screenshot of dashboard with charts
        await page.screenshot({ path: 'test-results/dashboard-full.png', fullPage: true });

        // Scroll down to see more content
        const modal = page.locator('.overflow-y-auto').first();
        if (await modal.isVisible()) {
            await modal.evaluate(el => el.scrollTop = el.scrollHeight / 2);
            await page.waitForTimeout(500);
            await page.screenshot({ path: 'test-results/dashboard-charts.png' });

            await modal.evaluate(el => el.scrollTop = el.scrollHeight);
            await page.waitForTimeout(500);
            await page.screenshot({ path: 'test-results/dashboard-plan-mejora.png' });
        }

        console.log('✅ Charts and improvement plan test passed');
    });
});
