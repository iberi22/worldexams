/**
 * IndexedDB Storage Service
 * Handles local storage of exam results for offline capability and future sync.
 * Includes optional transparent E2E Encryption layer (AES-256-GCM / Web Crypto).
 */

const DB_NAME = 'worldexams_db';
const DB_VERSION = 5; // 🆕 Bumped for ai_preferences store
const STORE_RESULTS = 'exam_results';
const STORE_ANSWERED = 'answered_questions';
const STORE_PARTY_SESSIONS = 'party_sessions';
const STORE_AI_PREFERENCES = 'ai_preferences';

import type { QuestionResultData, ExamCompletionData } from '../types';
import {
  encryptData,
  decryptData,
  isEncryptedPayload,
  isWebCryptoAvailable,
  type EncryptedPayload
} from './encryption';

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
  _encryptedPayload?: EncryptedPayload;
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
  _encryptedPayload?: EncryptedPayload;
}

/**
 * Transparent record encryption helpers for exam results
 */
async function encryptExamResultRecord(record: ExamResultRecord): Promise<any> {
  if (!isWebCryptoAvailable()) return record;
  try {
    const sensitivePayload = {
      score: record.score,
      totalQuestions: record.totalQuestions,
      correctCount: record.correctCount,
      timeSpentSeconds: record.timeSpentSeconds,
      answers: record.answers,
      details: record.details
    };
    const encrypted = await encryptData(sensitivePayload);
    if (isEncryptedPayload(encrypted)) {
      const recordToSave: any = {
        timestamp: record.timestamp,
        grade: record.grade,
        subject: record.subject,
        synced: record.synced,
        _encryptedPayload: encrypted
      };
      if (record.id !== undefined) recordToSave.id = record.id;
      return recordToSave;
    }
  } catch (err) {
    console.warn('Error encrypting exam result record:', err);
  }
  return record;
}

async function decryptExamResultRecord(record: any): Promise<ExamResultRecord> {
  if (!record || !record._encryptedPayload) return record as ExamResultRecord;
  try {
    const decrypted = await decryptData(record._encryptedPayload);
    if (decrypted && typeof decrypted === 'object') {
      const { _encryptedPayload, ...restRecord } = record;
      return {
        ...restRecord,
        ...decrypted
      } as ExamResultRecord;
    }
  } catch (err) {
    console.warn('Error decrypting exam result record:', err);
  }
  return record as ExamResultRecord;
}

/**
 * Transparent record encryption helpers for party sessions
 */
async function encryptPartySessionRecord(session: PartySessionRecord): Promise<any> {
  if (!isWebCryptoAvailable()) return session;
  try {
    const sensitivePayload = {
      userName: session.userName,
      questions: session.questions,
      answers: session.answers,
      focusEvents: session.focusEvents,
      focusViolations: session.focusViolations,
      score: session.score,
      totalQuestions: session.totalQuestions,
      correctCount: session.correctCount
    };
    const encrypted = await encryptData(sensitivePayload);
    if (isEncryptedPayload(encrypted)) {
      return {
        sessionId: session.sessionId,
        partyCode: session.partyCode,
        isHost: session.isHost,
        grade: session.grade,
        subject: session.subject,
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        synced: session.synced,
        _encryptedPayload: encrypted
      };
    }
  } catch (err) {
    console.warn('Error encrypting party session record:', err);
  }
  return session;
}

async function decryptPartySessionRecord(record: any): Promise<PartySessionRecord> {
  if (!record || !record._encryptedPayload) return record as PartySessionRecord;
  try {
    const decrypted = await decryptData(record._encryptedPayload);
    if (decrypted && typeof decrypted === 'object') {
      const { _encryptedPayload, ...restRecord } = record;
      return {
        ...restRecord,
        ...decrypted
      } as PartySessionRecord;
    }
  } catch (err) {
    console.warn('Error decrypting party session record:', err);
  }
  return record as PartySessionRecord;
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

      // 🆕 Store for AI preferences (e.g., selected tier)
      if (!db.objectStoreNames.contains(STORE_AI_PREFERENCES)) {
        db.createObjectStore(STORE_AI_PREFERENCES, { keyPath: 'key' });
      }
    };
  });
}

/**
 * Save an exam result locally (with transparent E2E encryption)
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
    let cleanDetails = [];
    try {
       cleanDetails = JSON.parse(JSON.stringify(questions || []));
    } catch (e) {
       console.warn('Could not deep clone details, stripping complex objects', e);
    }

    if (!cleanDetails.length || (cleanDetails.length > 0 && !cleanDetails[0].question)) {
       cleanDetails = (questions || []).map(d => ({
         questionId: d.questionId,
         isCorrect: d.isCorrect,
         difficulty: d.difficulty,
         timeSpentMs: d.timeSpentMs,
         question: safeSerializeQuestion(d.question)
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
      answers: JSON.parse(JSON.stringify(answers || {})),
      details: cleanDetails,
      synced: false
    };

    const recordToSave = await encryptExamResultRecord(record);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_RESULTS], 'readwrite');
      const store = transaction.objectStore(STORE_RESULTS);

      // Final sanitization of the whole record just in case
      const finalRecord = JSON.parse(JSON.stringify(recordToSave));
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

      store.put(record);
    });

    const questionsToCache = details.filter(d => d.question).map(d => d.question);
    if (questionsToCache.length > 0) {
      saveKnownQuestions(questionsToCache).catch(console.warn);
    }

  } catch (err) {
    console.warn('Error updating answered tracking:', err);
  }
}

/**
 * Get all local exam results (transparently decrypted)
 */
export async function getAllLocalResults(): Promise<ExamResultRecord[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_RESULTS], 'readonly');
      const store = transaction.objectStore(STORE_RESULTS);
      const index = store.index('timestamp');
      const request = index.getAll();

      request.onsuccess = async () => {
        const rawResults = (request.result as any[]).reverse();
        const decryptedResults = await Promise.all(
          rawResults.map(r => decryptExamResultRecord(r))
        );
        resolve(decryptedResults);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error getting local results:', err);
    return [];
  }
}

/**
 * Get results that haven't been synced to cloud (transparently decrypted)
 */
export async function getUnsyncedResults(): Promise<ExamResultRecord[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_RESULTS], 'readonly');
      const store = transaction.objectStore(STORE_RESULTS);
      const index = store.index('synced');
      const request = index.getAll(IDBKeyRange.only(false));

      request.onsuccess = async () => {
        const rawResults = request.result as any[];
        const decryptedResults = await Promise.all(
          rawResults.map(r => decryptExamResultRecord(r))
        );
        resolve(decryptedResults);
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
 * Get IDs of answered questions
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

export async function saveKnownQuestions(questions: any[]): Promise<void> {
  if (!questions || questions.length === 0) return;

  try {
    const cleanQuestions = JSON.parse(JSON.stringify(questions));

    const db = await openDB();
    const tx = db.transaction(['known_questions'], 'readwrite');
    const store = tx.objectStore('known_questions');

    cleanQuestions.forEach((q: any) => {
      if (q && q.id) {
        store.put(q);
      }
    });

    return new Promise((resolve) => {
      tx.oncomplete = () => {
        console.log(`💾 Persisted ${cleanQuestions.length} questions to permanent cache`);
        resolve();
      };
      tx.onerror = (e) => {
        console.warn('Failed to persist questions:', e);
        resolve();
      };
    });
  } catch (err) {
    console.warn('Error saving known questions:', err);
  }
}

export async function getKnownQuestion(id: string): Promise<any | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(['known_questions'], 'readonly');
      const store = tx.objectStore('known_questions');

      const request = store.get(id);

      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result);
        } else {
          const cursorRequest = store.openCursor();
          const searchId = id.toLowerCase().replace(/-v\d+$/i, '').replace(/r$/, '');

          cursorRequest.onsuccess = (e: any) => {
            const cursor = e.target.result;
            if (cursor) {
              const q = cursor.value;
              const qId = q.id.toLowerCase().replace(/r$/, '');
              const bundleId = (q.bundleId || '').toLowerCase().replace(/r$/, '');

              if (qId === id.toLowerCase() ||
                  qId.includes(searchId) ||
                  bundleId.includes(searchId)) {
                resolve(q);
                return;
              }
              cursor.continue();
            } else {
              resolve(null);
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

export async function getCachedEnglishQuestions(): Promise<any[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(['known_questions'], 'readonly');
      const store = tx.objectStore('known_questions');
      const request = store.getAll();

      request.onsuccess = () => {
        const allQuestions = request.result || [];

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
// 🆕 PARTY SESSIONS - Local-First Architecture (with E2E Encryption)
// ═══════════════════════════════════════════════════════════════════════════

export async function savePartySession(session: PartySessionRecord): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction([STORE_PARTY_SESSIONS], 'readwrite');
    const store = tx.objectStore(STORE_PARTY_SESSIONS);

    const cleanSession = JSON.parse(JSON.stringify(session));
    const recordToSave = await encryptPartySessionRecord(cleanSession);
    store.put(recordToSave);

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

export async function getPartySession(sessionId: string): Promise<PartySessionRecord | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_PARTY_SESSIONS], 'readonly');
      const store = tx.objectStore(STORE_PARTY_SESSIONS);
      const request = store.get(sessionId);

      request.onsuccess = async () => {
        if (!request.result) {
          resolve(null);
        } else {
          resolve(await decryptPartySessionRecord(request.result));
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error getting party session:', err);
    return null;
  }
}

export async function getPartySessionsByCode(partyCode: string): Promise<PartySessionRecord[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_PARTY_SESSIONS], 'readonly');
      const store = tx.objectStore(STORE_PARTY_SESSIONS);
      const index = store.index('partyCode');
      const request = index.getAll(partyCode);

      request.onsuccess = async () => {
        const raw = request.result || [];
        const decrypted = await Promise.all(
          raw.map(r => decryptPartySessionRecord(r))
        );
        resolve(decrypted);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error getting party sessions by code:', err);
    return [];
  }
}

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

export async function getUnsyncedPartySessions(): Promise<PartySessionRecord[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_PARTY_SESSIONS], 'readonly');
      const store = tx.objectStore(STORE_PARTY_SESSIONS);
      const index = store.index('synced');
      const request = index.getAll(IDBKeyRange.only(false));

      request.onsuccess = async () => {
        const raw = request.result || [];
        const decrypted = await Promise.all(
          raw.map(r => decryptPartySessionRecord(r))
        );
        resolve(decrypted);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error getting unsynced party sessions:', err);
    return [];
  }
}

export async function markPartySessionSynced(sessionId: string): Promise<void> {
  await updatePartySession(sessionId, { synced: true });
}

export async function saveAiTierPreference(tier: string): Promise<void> {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('swal.ai.tier', tier);
    }
    const db = await openDB();
    const tx = db.transaction([STORE_AI_PREFERENCES], 'readwrite');
    const store = tx.objectStore(STORE_AI_PREFERENCES);
    store.put({ key: 'selectedTier', value: tier, updatedAt: Date.now() });
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Error saving AI tier preference:', err);
  }
}

export async function getAiTierPreference(): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction([STORE_AI_PREFERENCES], 'readonly');
      const store = tx.objectStore(STORE_AI_PREFERENCES);
      const request = store.get('selectedTier');
      request.onsuccess = () => {
        if (request.result?.value) {
          resolve(request.result.value);
        } else if (typeof localStorage !== 'undefined') {
          resolve(localStorage.getItem('swal.ai.tier'));
        } else {
          resolve(null);
        }
      };
      request.onerror = () => {
        if (typeof localStorage !== 'undefined') {
          resolve(localStorage.getItem('swal.ai.tier'));
        } else {
          resolve(null);
        }
      };
    });
  } catch (err) {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('swal.ai.tier');
    }
    return null;
  }
}

function safeSerializeQuestion(q: any): any {
  if (!q) return null;
  try {
    const serialized = JSON.parse(JSON.stringify(q));
    if (serialized && typeof serialized === 'object' && serialized.id && serialized.options) {
      return serialized;
    }
  } catch (e) {
    console.warn('Question serialization failed, extracting safe fields', e);
  }
  const safe: any = {};
  const fields = ['id', 'text', 'statement', 'context', 'options', 'explanation',
                  'correctOptionId', 'difficulty', 'images', 'tags', 'bundleId',
                  'category', 'subject', 'grade', 'protocol_version'];
  for (const f of fields) {
    try { safe[f] = q[f]; } catch (e) { /* skip non-serializable */ }
  }
  if (safe.options && Array.isArray(safe.options)) {
    safe.options = safe.options.map((opt: any) => {
      try {
        return JSON.parse(JSON.stringify(opt));
      } catch (e) {
        return { id: opt.id, text: String(opt.text || ''), is_correct: !!opt.is_correct };
      }
    });
  }
  return safe;
}
