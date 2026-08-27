/**
 * PWA Offline Grade Storage Service
 * Manages full offline grade packages in IndexedDB (worldexams_offline_grades_db).
 */

import type { APIQuestion } from './api-service';
import { getAvailableSubjects, fetchQuestionsFromPacks } from './api-service';
import { normalizeSubjectKey } from './question-transformer';

const DB_NAME = 'worldexams_offline_grades_db';
const DB_VERSION = 1;
const STORE_GRADE_BUNDLES = 'offline_grade_bundles';

export interface StoredGradeBundle {
  id: string; // Format: `${country.toLowerCase()}-${grade}`
  country: string;
  grade: number;
  downloadedAt: number;
  sizeBytes: number;
  questions: APIQuestion[];
}

/**
 * Open the offline grade database.
 */
function openOfflineGradesDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IDB Offline Grades Open Error:', event);
      reject(new Error('Failed to open offline grades database'));
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_GRADE_BUNDLES)) {
        const store = db.createObjectStore(STORE_GRADE_BUNDLES, { keyPath: 'id' });
        store.createIndex('country', 'country', { unique: false });
        store.createIndex('grade', 'grade', { unique: false });
        store.createIndex('downloadedAt', 'downloadedAt', { unique: false });
      }
    };
  });
}

function getBundleKey(country: string, grade: number): string {
  return `${country.trim().toLowerCase()}-${grade}`;
}

/**
 * Helper to estimate memory / JSON byte size of questions array or object
 */
function calculateSizeBytes(obj: any): number {
  try {
    const str = JSON.stringify(obj);
    if (typeof Blob !== 'undefined') {
      return new Blob([str]).size;
    }
    return str.length * 2; // Rough UTF-16 estimate
  } catch {
    return 0;
  }
}

/**
 * Download and store all questions for a specific country and grade.
 */
export async function downloadAndStoreGradeBundle(
  country: string,
  grade: number,
  onProgress?: (pct: number) => void
): Promise<boolean> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return false;
  }

  try {
    if (onProgress) onProgress(0);

    const subjects = await getAvailableSubjects(grade);
    const allQuestions: APIQuestion[] = [];
    const seenIds = new Set<string>();

    const totalSubjects = Math.max(1, subjects.length);

    for (let i = 0; i < subjects.length; i++) {
      const subj = subjects[i];
      // Fetch questions from packs (handles static packs / remote API fallback)
      const fetchedAppQuestions = await fetchQuestionsFromPacks(grade, subj);

      for (const appQ of fetchedAppQuestions) {
        if (!seenIds.has(appQ.id)) {
          seenIds.add(appQ.id);

          // Convert AppQuestion to APIQuestion format for offline bundle store
          const apiQ: APIQuestion = {
            id: appQ.id,
            number: 1,
            statement: appQ.text,
            options: appQ.options.map((opt) => ({
              letter: opt.id,
              text: opt.text,
              is_correct: opt.id === appQ.correctOptionId
            })),
            correct_answer: appQ.correctOptionId,
            explanation: appQ.explanation || '',
            difficulty: String(appQ.difficulty),
            bundle_id: appQ.bundleId || '',
            source_url: '',
            tags: appQ.topics || [],
            images: [],
            context: appQ.context,
            modern_context: appQ.modernContext,
            context_type: appQ.contextType,
            context_tags: appQ.contextTags,
            protocol_version: appQ.protocol_version,
            cefr_level: appQ.cefr_level,
            country: country.toLowerCase(),
            subject: subj,
            grade
          };

          allQuestions.push(apiQ);
        }
      }

      const currentPct = Math.round(((i + 1) / totalSubjects) * 100);
      if (onProgress) onProgress(currentPct);
    }

    const bundleKey = getBundleKey(country, grade);
    const sizeBytes = calculateSizeBytes(allQuestions);

    const bundleRecord: StoredGradeBundle = {
      id: bundleKey,
      country: country.toLowerCase(),
      grade,
      downloadedAt: Date.now(),
      sizeBytes,
      questions: allQuestions
    };

    const db = await openOfflineGradesDB();

    return new Promise((resolve) => {
      const tx = db.transaction([STORE_GRADE_BUNDLES], 'readwrite');
      const store = tx.objectStore(STORE_GRADE_BUNDLES);

      const request = store.put(bundleRecord);

      request.onsuccess = () => {
        if (onProgress) onProgress(100);
        resolve(true);
      };

      request.onerror = (err) => {
        console.error('Error saving grade bundle to IndexedDB:', err);
        resolve(false);
      };

      tx.onerror = (err) => {
        console.error('Transaction error saving grade bundle:', err);
        resolve(false);
      };
    });
  } catch (err) {
    console.error('Failed to download and store grade bundle:', err);
    return false;
  }
}

/**
 * Get a stored grade bundle by country and grade.
 */
export async function getGradeBundle(
  country: string,
  grade: number
): Promise<StoredGradeBundle | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return null;
  }

  try {
    const db = await openOfflineGradesDB();
    const bundleKey = getBundleKey(country, grade);

    return new Promise((resolve) => {
      const tx = db.transaction([STORE_GRADE_BUNDLES], 'readonly');
      const store = tx.objectStore(STORE_GRADE_BUNDLES);
      const request = store.get(bundleKey);

      request.onsuccess = () => {
        resolve((request.result as StoredGradeBundle) || null);
      };

      request.onerror = () => {
        resolve(null);
      };
    });
  } catch (err) {
    console.error('Error getting grade bundle:', err);
    return null;
  }
}

/**
 * Check if a grade bundle is stored offline.
 */
export async function isGradeOfflineAvailable(
  country: string,
  grade: number
): Promise<boolean> {
  const bundle = await getGradeBundle(country, grade);
  return bundle !== null && bundle.questions.length > 0;
}

/**
 * Remove a stored grade bundle.
 */
export async function removeGradeBundle(
  country: string,
  grade: number
): Promise<void> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return;
  }

  try {
    const db = await openOfflineGradesDB();
    const bundleKey = getBundleKey(country, grade);

    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_GRADE_BUNDLES], 'readwrite');
      const store = tx.objectStore(STORE_GRADE_BUNDLES);
      const request = store.delete(bundleKey);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error removing grade bundle:', err);
  }
}

/**
 * Get stored offline questions for a specific country, grade, and subject.
 */
export async function getOfflineQuestionsBySubject(
  country: string,
  grade: number,
  subject: string
): Promise<APIQuestion[]> {
  const bundle = await getGradeBundle(country, grade);
  if (!bundle || !bundle.questions) {
    return [];
  }

  const targetNormSubject = normalizeSubjectKey(subject);

  return bundle.questions.filter((q) => {
    const qNormSubject = normalizeSubjectKey(q.subject || '');
    return qNormSubject === targetNormSubject;
  });
}
