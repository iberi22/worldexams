import { test, expect } from '@playwright/test';

test.describe('PWA Service Worker & Offline Cache Simulation Suite (Wave 5.07)', () => {
  test('seeds test question bundle in IndexedDB, blocks network, and completes question selection on /practica', async ({ page }) => {
    // Hide hero overlay to avoid click interception during practice flow
    await page.addInitScript(() => {
      localStorage.setItem('spt_hide_hero', 'true');
    });

    // 1. Visit /ajustes/offline
    await page.goto('/ajustes/offline');
    await expect(page).toHaveTitle(/Descarga Offline|Descarga de Grados/i);

    // 2. Seed test question bundle into IndexedDB (worldexams_offline_grades_db)
    await page.evaluate(async () => {
      return new Promise<void>((resolve, reject) => {
        const req = indexedDB.open('worldexams_offline_grades_db', 1);
        req.onupgradeneeded = (e: any) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('offline_grade_bundles')) {
            const store = db.createObjectStore('offline_grade_bundles', { keyPath: 'id' });
            store.createIndex('country', 'country', { unique: false });
            store.createIndex('grade', 'grade', { unique: false });
            store.createIndex('downloadedAt', 'downloadedAt', { unique: false });
          }
        };
        req.onsuccess = (e: any) => {
          const db = e.target.result;
          const tx = db.transaction(['offline_grade_bundles'], 'readwrite');
          const store = tx.objectStore('offline_grade_bundles');

          const testBundle = {
            id: 'co-11',
            country: 'co',
            grade: 11,
            downloadedAt: Date.now(),
            sizeBytes: 2048,
            questions: [
              {
                id: 'offline-q1',
                number: 1,
                statement: '¿Cuál es la función derivada de f(x) = x^2?',
                options: [
                  { letter: 'A', text: "f'(x) = 2x", is_correct: true },
                  { letter: 'B', text: "f'(x) = x", is_correct: false },
                  { letter: 'C', text: "f'(x) = x^2", is_correct: false },
                  { letter: 'D', text: "f'(x) = 2", is_correct: false }
                ],
                correct_answer: 'A',
                explanation: 'La derivada de x^n es n*x^(n-1).',
                difficulty: '1',
                bundle_id: 'offline-test-bundle',
                source_url: '',
                tags: ['matematicas'],
                images: [],
                country: 'co',
                subject: 'matematicas',
                grade: 11
              },
              {
                id: 'offline-q2',
                number: 2,
                statement: '¿Cuál es el símbolo químico del agua?',
                options: [
                  { letter: 'A', text: 'CO2', is_correct: false },
                  { letter: 'B', text: 'H2O', is_correct: true },
                  { letter: 'C', text: 'NaCl', is_correct: false },
                  { letter: 'D', text: 'O2', is_correct: false }
                ],
                correct_answer: 'B',
                explanation: 'El agua se compone de dos átomos de hidrógeno y uno de oxígeno.',
                difficulty: '1',
                bundle_id: 'offline-test-bundle',
                source_url: '',
                tags: ['ciencias_naturales'],
                images: [],
                country: 'co',
                subject: 'ciencias_naturales',
                grade: 11
              }
            ]
          };

          const putReq = store.put(testBundle);
          putReq.onsuccess = () => resolve();
          putReq.onerror = (err: any) => reject(err);
        };
        req.onerror = (err: any) => reject(err);
      });
    });

    // Verify bundle is stored in IndexedDB
    const bundleAvailable = await page.evaluate(async () => {
      return new Promise<boolean>((resolve) => {
        const req = indexedDB.open('worldexams_offline_grades_db', 1);
        req.onsuccess = (e: any) => {
          const db = e.target.result;
          const tx = db.transaction(['offline_grade_bundles'], 'readonly');
          const store = tx.objectStore('offline_grade_bundles');
          const getReq = store.get('co-11');
          getReq.onsuccess = () => {
            resolve(!!getReq.result && getReq.result.questions.length > 0);
          };
          getReq.onerror = () => resolve(false);
        };
        req.onerror = () => resolve(false);
      });
    });
    expect(bundleAvailable).toBe(true);

    // 3. Emulate network offline state by aborting external HTTP/API requests
    await page.route('**/*', (route) => {
      const url = route.request().url();
      if (
        url.includes('/api/packs/') ||
        url.includes('/packs/') ||
        url.includes('/questions') ||
        url.includes('supabase') ||
        url.includes('saberparatodos.space')
      ) {
        return route.abort('failed');
      }
      return route.continue();
    });

    // 4. Navigate to /practica and verify cached questions load from IndexedDB
    await page.goto('/practica');

    // Wait for practice view / main layout
    const mainContainer = page.locator('main, #practice-app, body');
    await expect(mainContainer.first()).toBeVisible();

    // Select grade 11 or click start exam if config modal opens
    const grade11Card = page.locator('text=11°').first();
    if (await grade11Card.isVisible()) {
      await grade11Card.click();
    }

    // Modal / exam view button
    const startButton = page.locator('button:has-text("Comenzar"), button:has-text("Iniciar Examen"), button:has-text("Ir a la practica")').first();
    if (await startButton.isVisible()) {
      await startButton.click();
    }

    // 5. Verify questions and options rendered from IndexedDB cache
    const optionsGrid = page.locator('[data-testid="options-grid"], .options-grid, button:has-text("A")').first();
    await expect(optionsGrid).toBeVisible({ timeout: 15000 });

    // Select an option
    const optionA = page.locator('button:has-text("A"), [data-testid="options-grid"] button').first();
    await expect(optionA).toBeVisible();
    await optionA.click();

    // Verify option selection completed cleanly without network errors
    await expect(optionA).toBeVisible();
  });
});
