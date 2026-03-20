import { test, expect, type Page } from '@playwright/test';

async function seedLocalHistory(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open('worldexams_db', 4);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('exam_results')) {
          const store = db.createObjectStore('exam_results', { keyPath: 'id', autoIncrement: true });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('synced', 'synced', { unique: false });
        }
      };

      request.onerror = () => reject(request.error);
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const tx = db.transaction(['exam_results'], 'readwrite');
        const store = tx.objectStore('exam_results');

        store.put({
          id: 1,
          timestamp: Date.now() - 60_000,
          grade: 11,
          subject: 'MATEMATICAS',
          score: 78,
          totalQuestions: 20,
          correctCount: 16,
          timeSpentSeconds: 900,
          answers: {},
          details: [
            { questionId: 'Q1', isCorrect: true, difficulty: 3, category: 'MATEMATICAS :: ALGEBRA', timeSpentMs: 12000 },
            { questionId: 'Q2', isCorrect: false, difficulty: 4, category: 'MATEMATICAS :: GEOMETRIA', timeSpentMs: 18000 }
          ],
          synced: false
        });

        tx.oncomplete = () => {
          db.close();
          resolve();
        };
        tx.onerror = () => reject(tx.error);
      };
    });
  });
}

async function startExam(page: Page) {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: '11° Grado' }).click();
  await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 30000 });
  await page.getByRole('button', { name: 'Comenzar' }).click();
  await expect(page.getByTestId('exam-shell')).toBeVisible({ timeout: 90000 });
}

async function startPreuniversitarioExam(page: Page) {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const showMoreButton = page.getByRole('button', { name: 'Ver más exámenes y Preuniversitario' });
  if (await showMoreButton.isVisible()) {
    await showMoreButton.click();
  }

  await page.getByText('PREU', { exact: true }).click();
  await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 30000 });

  const universityButton = page
    .getByTestId('modal-content')
    .locator('button')
    .filter({ hasText: /Nacional|Javeriana|Andes|Antioquia|U\./i })
    .first();

  await universityButton.click();
  await page.getByRole('button', { name: 'Comenzar' }).click();
  await expect(page.getByTestId('exam-shell')).toBeVisible({ timeout: 90000 });
}

test.describe('Exam launch overlay', () => {
  test('shows the local snapshot and auto closes after 3 seconds', async ({ page }) => {
    await page.goto('/');
    await seedLocalHistory(page);
    await startExam(page);

    const overlay = page.getByTestId('exam-launch-overlay');
    await expect(overlay).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('exam-performance-snapshot')).toBeVisible();
    await expect(overlay).toContainText('Ultima sesion');
    await expect(overlay).toContainText('Ultimo puntaje');
    await expect(overlay).toContainText('ICFES 2026');

    await page.waitForTimeout(3400);
    await expect(overlay).toBeHidden();
  });

  test('supports manual close and persists dont-show-again', async ({ page }) => {
    await startExam(page);

    const overlay = page.getByTestId('exam-launch-overlay');
    await expect(overlay).toBeVisible({ timeout: 15000 });

    await page.getByTestId('overlay-dont-show-checkbox').evaluate((element) => {
      const input = element as HTMLInputElement;
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.getByTestId('overlay-close-button').evaluate((element) => {
      (element as HTMLButtonElement).click();
    });
    await expect(overlay).toBeHidden();

    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: '11° Grado' }).click();
    await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 30000 });
    await page.getByRole('button', { name: 'Comenzar' }).click();
    await expect(page.getByTestId('exam-shell')).toBeVisible({ timeout: 90000 });

    await expect(page.getByTestId('exam-launch-overlay')).toBeHidden();
  });

  test('hides global notices while overlay is open on mobile and still allows preuniversitario entry', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await startPreuniversitarioExam(page);

    const overlay = page.getByTestId('exam-launch-overlay');
    await expect(overlay).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('overlay-countdown')).toBeVisible();
    await expect(page.getByTestId('cookie-consent-banner')).toBeHidden();
    await expect(page.getByTestId('local-mode-notice')).toBeHidden();

    await page.waitForTimeout(3400);
    await expect(overlay).toBeHidden();
    await expect(page.getByTestId('exam-shell')).toBeVisible();
  });
});
