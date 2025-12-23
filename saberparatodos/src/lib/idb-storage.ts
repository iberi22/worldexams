
/**
 * IndexedDB Storage Service
 * Handles local storage of exam results for offline capability and future sync.
 */

const DB_NAME = 'worldexams_db';
const DB_VERSION = 2; // Bumped for answered_questions store
const STORE_RESULTS = 'exam_results';
const STORE_ANSWERED = 'answered_questions';

interface ExamResultRecord {
  id?: number;
  timestamp: number;
  grade: number;
  subject: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
  answers: Record<string, string>;
  details: any[]; // Detailed question breakdown
  synced: boolean;
}

export interface AnsweredQuestionRecord {
  questionId: string;
  answeredAt: number;
  wasCorrect: boolean;
  grade: number;
  subject: string;
  difficulty: number;
}

/**
 * Open the database (creates schema if needed)
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IDB Open Error:', event);
      reject(new Error('Failed to open database'));
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_RESULTS)) {
        const store = db.createObjectStore(STORE_RESULTS, { keyPath: 'id', autoIncrement: true });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('synced', 'synced', { unique: false });
      }
      // New store for individual question tracking
      if (!db.objectStoreNames.contains(STORE_ANSWERED)) {
        const store = db.createObjectStore(STORE_ANSWERED, { keyPath: 'questionId' });
        store.createIndex('answeredAt', 'answeredAt', { unique: false });
        store.createIndex('wasCorrect', 'wasCorrect', { unique: false });
      }
    };
  });
}

/**
 * Save an exam result locally
 */
export async function saveExamResultLocal(
  examData: any,
  userAnswers: Record<string, string>
): Promise<number> {
  try {
    const db = await openDB();

    // Calculate basic stats for the record
    const safeQuestions = examData?.questions || [];
    const correctCount = safeQuestions.filter((q: any) => q?.isCorrect).length;

    const record: ExamResultRecord = {
      timestamp: Date.now(),
      grade: examData?.grade || 0,
      subject: examData?.subject || 'GENERAL',
      score: (safeQuestions.length > 0) ? Math.round((correctCount / safeQuestions.length) * 100) : 0,
      totalQuestions: safeQuestions.length,
      correctCount: correctCount,
      timeSpentSeconds: Math.round((examData?.totalTimeMs || 0) / 1000),
      answers: userAnswers,
      details: safeQuestions,
      synced: false // Pending upload if user logs in later
    };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_RESULTS], 'readwrite');
      const store = transaction.objectStore(STORE_RESULTS);
      const request = store.add(record);

      request.onsuccess = () => {
        console.log('✅ Exam result saved to IndexedDB');
        resolve(request.result as number);
      };

      request.onerror = () => {
        console.error('❌ Failed to save to IDB');
        reject(request.error);
      };
    });
  } catch (err) {
    console.error('IDB Save Error:', err);
    return -1;
  }
}

/**
 * Get all unsynced results (for future sync logic)
 */
export async function getUnsyncedResults(): Promise<ExamResultRecord[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_RESULTS], 'readonly');
    const store = transaction.objectStore(STORE_RESULTS);
    const index = store.index('synced');
    const request = index.getAll(IDBKeyRange.only(false));

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Mark a result as synced
 */
export async function markAsSynced(id: number): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_RESULTS], 'readwrite');
    const store = transaction.objectStore(STORE_RESULTS);
    const getReq = store.get(id);

    getReq.onsuccess = () => {
      const record = getReq.result;
      if (record) {
        record.synced = true;
        store.put(record).onsuccess = () => resolve();
      } else {
        resolve(); // Or reject ifstrict
      }
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

/**
 * Get all stored results
 */
export async function getAllLocalResults(): Promise<ExamResultRecord[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_RESULTS], 'readonly');
    const store = transaction.objectStore(STORE_RESULTS);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 🆕 INDIVIDUAL QUESTION TRACKING - Anti-Repeat System
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Save an answered question record (upserts by questionId)
 */
export async function saveAnsweredQuestion(record: AnsweredQuestionRecord): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_ANSWERED], 'readwrite');
      const store = tx.objectStore(STORE_ANSWERED);
      store.put(record); // Upsert by questionId (keyPath)
      tx.oncomplete = () => {
        console.log(`📝 Saved answered question: ${record.questionId} (correct: ${record.wasCorrect})`);
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Error saving answered question:', err);
  }
}

/**
 * Get all correctly answered question IDs within last N days
 * Used to filter out questions that user already mastered
 */
export async function getCorrectlyAnsweredIds(withinDays: number = 30): Promise<Set<string>> {
  try {
    const db = await openDB();
    const cutoff = Date.now() - (withinDays * 24 * 60 * 60 * 1000);

    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_ANSWERED], 'readonly');
      const store = tx.objectStore(STORE_ANSWERED);
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result as AnsweredQuestionRecord[];
        const recentCorrect = results
          .filter(r => r.wasCorrect && r.answeredAt >= cutoff)
          .map(r => r.questionId);
        console.log(`🧠 Found ${recentCorrect.length} correctly answered questions in last ${withinDays} days`);
        resolve(new Set(recentCorrect));
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error getting correctly answered IDs:', err);
    return new Set();
  }
}

/**
 * Get count statistics about answered questions
 */
export async function getAnsweredStats(): Promise<{
  total: number;
  correct: number;
  incorrect: number;
  recentCorrect: number;
}> {
  try {
    const db = await openDB();
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_ANSWERED], 'readonly');
      const store = tx.objectStore(STORE_ANSWERED);
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result as AnsweredQuestionRecord[];
        const correct = results.filter(r => r.wasCorrect);
        const recentCorrect = correct.filter(r => r.answeredAt >= thirtyDaysAgo);

        resolve({
          total: results.length,
          correct: correct.length,
          incorrect: results.length - correct.length,
          recentCorrect: recentCorrect.length
        });
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error getting answered stats:', err);
    return { total: 0, correct: 0, incorrect: 0, recentCorrect: 0 };
  }
}
