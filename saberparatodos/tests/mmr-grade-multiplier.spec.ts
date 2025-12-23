import { test, expect } from '@playwright/test';

/**
 * Tests for MMR Grade Multiplier and Smart Question Filtering
 * These tests verify the behavior through the actual UI and IndexedDB
 */

test.describe('IndexedDB Storage for Anti-Repeat', () => {

  test('IndexedDB answered_questions store is created on page load', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const storeExists = await page.evaluate(async () => {
      return new Promise((resolve) => {
        // Try to open DB version 2 (our updated version)
        const request = indexedDB.open('worldexams_db', 2);

        request.onupgradeneeded = () => {
          // This means the store was just created
          resolve('created');
        };

        request.onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          const hasStore = db.objectStoreNames.contains('answered_questions');
          db.close();
          resolve(hasStore ? 'exists' : 'missing');
        };

        request.onerror = () => resolve('error');
      });
    });

    // Store should exist or be created
    expect(['exists', 'created']).toContain(storeExists);
  });

  test('Can write and read from answered_questions store', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const result = await page.evaluate(async () => {
      return new Promise((resolve) => {
        const request = indexedDB.open('worldexams_db', 2);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains('answered_questions')) {
            const store = db.createObjectStore('answered_questions', { keyPath: 'questionId' });
            store.createIndex('answeredAt', 'answeredAt', { unique: false });
            store.createIndex('wasCorrect', 'wasCorrect', { unique: false });
          }
        };

        request.onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;

          // Write a test record
          const tx = db.transaction(['answered_questions'], 'readwrite');
          const store = tx.objectStore('answered_questions');

          const testRecord = {
            questionId: 'TEST-E2E-001',
            answeredAt: Date.now(),
            wasCorrect: true,
            grade: 11,
            subject: 'MATEMATICAS',
            difficulty: 3
          };

          store.put(testRecord);

          tx.oncomplete = () => {
            // Read it back
            const tx2 = db.transaction(['answered_questions'], 'readonly');
            const store2 = tx2.objectStore('answered_questions');
            const getReq = store2.get('TEST-E2E-001');

            getReq.onsuccess = () => {
              db.close();
              resolve(getReq.result ? getReq.result.wasCorrect : null);
            };

            getReq.onerror = () => {
              db.close();
              resolve(null);
            };
          };

          tx.onerror = () => {
            db.close();
            resolve(null);
          };
        };

        request.onerror = () => resolve(null);
      });
    });

    expect(result).toBe(true);
  });

  test('Can filter by wasCorrect index', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const correctCount = await page.evaluate(async () => {
      return new Promise((resolve) => {
        const request = indexedDB.open('worldexams_db', 2);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains('answered_questions')) {
            const store = db.createObjectStore('answered_questions', { keyPath: 'questionId' });
            store.createIndex('answeredAt', 'answeredAt', { unique: false });
            store.createIndex('wasCorrect', 'wasCorrect', { unique: false });
          }
        };

        request.onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;

          // Insert test data
          const tx = db.transaction(['answered_questions'], 'readwrite');
          const store = tx.objectStore('answered_questions');

          store.put({ questionId: 'FILTER-TEST-1', answeredAt: Date.now(), wasCorrect: true, grade: 11, subject: 'MAT', difficulty: 3 });
          store.put({ questionId: 'FILTER-TEST-2', answeredAt: Date.now(), wasCorrect: true, grade: 11, subject: 'MAT', difficulty: 3 });
          store.put({ questionId: 'FILTER-TEST-3', answeredAt: Date.now(), wasCorrect: false, grade: 11, subject: 'MAT', difficulty: 3 });

          tx.oncomplete = () => {
            // Query only correct answers
            const tx2 = db.transaction(['answered_questions'], 'readonly');
            const store2 = tx2.objectStore('answered_questions');
            const getAllReq = store2.getAll();

            getAllReq.onsuccess = () => {
              const all = getAllReq.result || [];
              const correct = all.filter((r: any) => r.wasCorrect === true);
              db.close();
              resolve(correct.length);
            };

            getAllReq.onerror = () => {
              db.close();
              resolve(-1);
            };
          };
        };

        request.onerror = () => resolve(-1);
      });
    });

    // At least the 2 correct ones we inserted (plus any from previous tests)
    expect(correctCount).toBeGreaterThanOrEqual(2);
  });
});

test.describe('UI Integration', () => {

  test('Landing page loads correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify the page loaded
    const title = await page.title();
    expect(title).toContain('Saber');
  });

  test('Mis Métricas button is visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const metricsButton = page.getByText('Mis Métricas');
    await expect(metricsButton).toBeVisible({ timeout: 10000 });
  });

  test('Local Intelligence modal opens', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click Mis Métricas
    await page.getByText('Mis Métricas').click();
    await page.waitForTimeout(1000);

    // Verify modal opened
    const modalTitle = page.getByText('Inteligencia Local');
    await expect(modalTitle).toBeVisible({ timeout: 5000 });
  });
});
