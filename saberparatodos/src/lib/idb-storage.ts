
/**
 * IndexedDB Storage Service
 * Handles local storage of exam results for offline capability and future sync.
 */

const DB_NAME = 'worldexams_db';
const DB_VERSION = 4; // 🆕 Bumped for party_sessions store
const STORE_RESULTS = 'exam_results';
const STORE_ANSWERED = 'answered_questions';
const STORE_PARTY_SESSIONS = 'party_sessions';

import type { QuestionResultData, ExamCompletionData } from '../types';

export interface ExamResultRecord {
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

// 🆕 Party Session for local-first architecture
export interface PartySessionRecord {
  sessionId: string;           // crypto.randomUUID()
  partyCode: string;
  isHost: boolean;
  userName: string;
  grade: number;
  subject: string;
  startedAt: number;
  endedAt?: number;
  questions: any[];            // Exam questions
  answers: Record<string, string>;
  focusEvents: { timestamp: number; type: string; duration?: number }[];
  focusViolations?: number;    // 🆕 Count of focus violations
  score?: number;
  totalQuestions?: number;
  correctCount?: number;
  synced: boolean;
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

      // 🆕 Store for known questions (Permanent Cache)
      if (!db.objectStoreNames.contains('known_questions')) {
        db.createObjectStore('known_questions', { keyPath: 'id' });
      }

      // 🆕 Store for party sessions (Local-First Party Mode)
      if (!db.objectStoreNames.contains(STORE_PARTY_SESSIONS)) {
        const store = db.createObjectStore(STORE_PARTY_SESSIONS, { keyPath: 'sessionId' });
        store.createIndex('partyCode', 'partyCode', { unique: false });
        store.createIndex('startedAt', 'startedAt', { unique: false });
        store.createIndex('synced', 'synced', { unique: false });
      }
    };
  });
}

/**
 * Save an exam result locally
 */
export async function saveExamResultLocal(
  examData: ExamCompletionData,
  answers: Record<string, string>
): Promise<number> {
  try {
    const db = await openDB();

    const { grade, subject, questions } = examData;
    const totalQuestions = questions.length;
    const correctCount = questions.filter(q => q.isCorrect).length;
    const score = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
    const timeSpentSeconds = Math.floor(examData.totalTimeMs / 1000);

    // 🆕 Clean data to ensure it is cloneable (Strips Svelte 5 Proxies)
    // Structured Clone fail check - uses JSON as fallback for deep sanitization
    let cleanDetails = [];
    try {
       cleanDetails = JSON.parse(JSON.stringify(questions || []));
    } catch (e) {
       console.warn('Could not deep clone details, stripping complex objects', e);
       cleanDetails = (questions || []).map(d => ({
         questionId: d.questionId,
         isCorrect: d.isCorrect,
         difficulty: d.difficulty,
         timeSpentMs: d.timeSpentMs
       }));
    }

    const record: ExamResultRecord = {
      timestamp: Date.now(),
      grade,
      subject,
      score: Math.round(score),
      totalQuestions,
      correctCount,
      timeSpentSeconds,
      answers: JSON.parse(JSON.stringify(answers || {})), // ⚡ FIXED: Default to {} to avoid "undefined" JSON error
      details: cleanDetails,
      synced: false
    };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_RESULTS], 'readwrite');
      const store = transaction.objectStore(STORE_RESULTS);

      // Final sanitization of the whole record just in case
      const finalRecord = JSON.parse(JSON.stringify(record));
      const request = store.add(finalRecord);

      request.onsuccess = () => {
        resolve(request.result as number);
        // Fire-and-forget sync update
        updateAnsweredQuestions(questions).catch(console.error);
      };

      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error saving local result:', err);
    throw err;
  }
}

/**
 * Update the tracking of individual answered questions
 */
async function updateAnsweredQuestions(details: QuestionResultData[]) {
  try {
    const db = await openDB();
    const tx = db.transaction([STORE_ANSWERED], 'readwrite');
    const store = tx.objectStore(STORE_ANSWERED);
    const now = Date.now();

    details.forEach(d => {
      const record: AnsweredQuestionRecord = {
        questionId: String(d.questionId),
        answeredAt: now,
        wasCorrect: d.isCorrect,
        grade: 11, // Fallback if not available
        subject: 'unknown',
        difficulty: d.difficulty
      };

      // We use put to overwrite/update the last status
      store.put(record);
    });

    // Also update permanent cache for these questions
    const questionsToCache = details.filter(d => d.question).map(d => d.question);
    if (questionsToCache.length > 0) {
      saveKnownQuestions(questionsToCache).catch(console.warn);
    }

  } catch (err) {
    console.warn('Error updating answered tracking:', err);
  }
}


/**
 * Get all local exam results
 */
export async function getAllLocalResults(): Promise<ExamResultRecord[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_RESULTS], 'readonly');
      const store = transaction.objectStore(STORE_RESULTS);
      const index = store.index('timestamp');
      const request = index.getAll(); // Sorted by timestamp ascending (default)

      request.onsuccess = () => { // Reverse to get newest first
        resolve((request.result as ExamResultRecord[]).reverse());
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error getting local results:', err);
    return [];
  }
}

/**
 * Get results that haven't been synced to cloud
 */
export async function getUnsyncedResults(): Promise<ExamResultRecord[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_RESULTS], 'readonly');
      const store = transaction.objectStore(STORE_RESULTS);
      const index = store.index('synced');
      const request = index.getAll(IDBKeyRange.only(false));

      request.onsuccess = () => {
        resolve(request.result as ExamResultRecord[]);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error getting unsynced results:', err);
    return [];
  }
}

/**
 * Mark a result as synced
 */
export async function markResultAsSynced(id: number): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_RESULTS], 'readwrite');
    const store = transaction.objectStore(STORE_RESULTS);
    const request = store.get(id);

    request.onsuccess = () => {
      const record = request.result;
      if (record) {
        record.synced = true;
        store.put(record);
      }
    };
  } catch (err) {
    console.error('Error marking result as synced:', err);
  }
}

/**
 * Get IDs of questions correctly answered in the last X days
 * Used for spaced repetition filtering
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

        // Filter for correct answers within the time window
        const recentCorrect = results
          .filter(r => r.wasCorrect && r.answeredAt >= cutoff)
          .map(r => r.questionId);

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
 * 🆕 Get IDs of answered questions
 * @param withinDays -1 for all history, or number of days
 * @param onlyCorrect If true, only returns IDs of questions answered CORRECTLY (for exclusion).
 *                    If false (default), returns all attempted IDs.
 */
export async function getAnsweredQuestionIds(withinDays: number = 7, onlyCorrect: boolean = false): Promise<Set<string>> {
  try {
    const db = await openDB();
    const cutoff = Date.now() - (withinDays * 24 * 60 * 60 * 1000);

    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_ANSWERED], 'readonly');
      const store = tx.objectStore(STORE_ANSWERED);
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result as AnsweredQuestionRecord[];
        const recent = results
          .filter(r => {
            const timeOk = withinDays === -1 || r.answeredAt >= cutoff;
            const correctOk = onlyCorrect ? r.wasCorrect === true : true;
            return timeOk && correctOk;
          })
          .map(r => r.questionId);
        resolve(new Set(recent));
      };

      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Error getting answered IDs:', err);
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

// ═══════════════════════════════════════════════════════════════════════════
// 🆕 PERMANENT QUESTION CACHE - Anti-Rotation System
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Save questions to permanent local cache
 * This ensures even if API rotates, we keep the questions we've seen.
 */
export async function saveKnownQuestions(questions: any[]): Promise<void> {
  if (!questions || questions.length === 0) return;

  try {
    // Clean questions to remove Proxies or non-clonable data (Svelte state)
    // Uses JSON.parse(JSON.stringify) for safe deep clone (sanitization)
    const cleanQuestions = JSON.parse(JSON.stringify(questions));

    const db = await openDB();
    const tx = db.transaction(['known_questions'], 'readwrite');
    const store = tx.objectStore('known_questions');

    cleanQuestions.forEach((q: any) => {
      // Clean up question data if needed or store raw
      if (q && q.id) {
        store.put(q);
      }
    });

    return new Promise((resolve) => {
      tx.oncomplete = () => {
        console.log(`💾 Persisted ${cleanQuestions.length} questions to permanent cache`);
        resolve();
      };
      // Don't reject on error, just log (non-critical)
      tx.onerror = (e) => {
        console.warn('Failed to persist questions:', e);
        resolve();
      };
    });
  } catch (err) {
    console.warn('Error saving known questions:', err);
  }
}

/**
 * Try to find a single question in the permanent cache
 */
export async function getKnownQuestion(id: string): Promise<any | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(['known_questions'], 'readonly');
      const store = tx.objectStore('known_questions');

      // Try exact ID
      const request = store.get(id);

      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result);
        } else {
          // We iterate because IndexedDB doesn't have "contains" queries without iterating
          const cursorRequest = store.openCursor();

          // Normalize ID for fuzzy match
          const searchId = id.toLowerCase().replace(/-v\d+$/i, '').replace(/r$/, ''); // celular -> celula

          cursorRequest.onsuccess = (e: any) => {
            const cursor = e.target.result;
            if (cursor) {
              const q = cursor.value;
              const qId = q.id.toLowerCase().replace(/r$/, '');
              const bundleId = (q.bundleId || '').toLowerCase().replace(/r$/, '');

              if (qId === id.toLowerCase() ||
                  qId.includes(searchId) ||
                  bundleId.includes(searchId)) {
                resolve(q); // Found match!
                return;
              }
              cursor.continue();
            } else {
              resolve(null); // End of cursor, not found
            }
          };
        }
      };

      request.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('Error getting known question:', err);
    return null;
  }
}

/**
 * 🆕 Get all cached English questions from IndexedDB
 * Used for cache-first loading strategy
 */
export async function getCachedEnglishQuestions(): Promise<any[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(['known_questions'], 'readonly');
      const store = tx.objectStore('known_questions');
      const request = store.getAll();

      request.onsuccess = () => {
        const allQuestions = request.result || [];

        // Filter only English questions
        const englishQuestions = allQuestions.filter((q: any) => {
          const category = (q.category || '').toLowerCase();
          const id = (q.id || '').toLowerCase();
          return category.includes('inglés') ||
                 category.includes('ingles') ||
                 id.includes('-eng-') ||
                 id.includes('co-ing-');
        });

        if (englishQuestions.length > 0) {
          console.log(`📦 Found ${englishQuestions.length} English questions in local cache`);
        }

        resolve(englishQuestions);
      };

      request.onerror = () => {
        console.warn('Error reading cached questions:', request.error);
        resolve([]);
      };
    });
  } catch (err) {
    console.warn('Error getting cached English questions:', err);
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🆕 PARTY SESSIONS - Local-First Architecture
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Save a new party session locally
 */
export async function savePartySession(session: PartySessionRecord): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction([STORE_PARTY_SESSIONS], 'readwrite');
    const store = tx.objectStore(STORE_PARTY_SESSIONS);

    // Sanitize to remove proxies
    const cleanSession = JSON.parse(JSON.stringify(session));
    store.put(cleanSession);

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        console.log(`💾 Saved party session: ${session.sessionId}`);
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Error saving party session:', err);
    throw err;
  }
}

/**
 * Get a party session by sessionId
 */
export async function getPartySession(sessionId: string): Promise<PartySessionRecord | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_PARTY_SESSIONS], 'readonly');
      const store = tx.objectStore(STORE_PARTY_SESSIONS);
      const request = store.get(sessionId);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error getting party session:', err);
    return null;
  }
}

/**
 * Get all sessions for a party code
 */
export async function getPartySessionsByCode(partyCode: string): Promise<PartySessionRecord[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_PARTY_SESSIONS], 'readonly');
      const store = tx.objectStore(STORE_PARTY_SESSIONS);
      const index = store.index('partyCode');
      const request = index.getAll(partyCode);

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error getting party sessions by code:', err);
    return [];
  }
}

/**
 * Update a party session (e.g., add answers, focus events)
 */
export async function updatePartySession(
  sessionId: string,
  updates: Partial<PartySessionRecord>
): Promise<void> {
  try {
    const existing = await getPartySession(sessionId);
    if (!existing) {
      console.warn(`Party session not found: ${sessionId}`);
      return;
    }

    const updated: PartySessionRecord = {
      ...existing,
      ...updates
    };

    await savePartySession(updated);
  } catch (err) {
    console.error('Error updating party session:', err);
  }
}

/**
 * Get unsynced party sessions for batch upload
 */
export async function getUnsyncedPartySessions(): Promise<PartySessionRecord[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_PARTY_SESSIONS], 'readonly');
      const store = tx.objectStore(STORE_PARTY_SESSIONS);
      const index = store.index('synced');
      const request = index.getAll(IDBKeyRange.only(false));

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error getting unsynced party sessions:', err);
    return [];
  }
}

/**
 * Mark a party session as synced
 */
export async function markPartySessionSynced(sessionId: string): Promise<void> {
  await updatePartySession(sessionId, { synced: true });
}

