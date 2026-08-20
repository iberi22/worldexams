/**
 * Tutor session history management using IndexedDB storage.
 * Handles persisting past tutoring conversations locally and optional Xavier sync.
 */

import type { TutorContext, TutorTurn } from './tutor-session';
import { isXavierConfigured, xavierSave } from '../xavier-client';

export interface TutorSessionRecord {
  sessionId: string;
  context: TutorContext;
  history: TutorTurn[];
  createdAt: number;
  updatedAt: number;
  syncedToXavier?: boolean;
}

const DB_NAME = 'worldexams_db';
const DB_VERSION = 6;
const STORE_TUTOR_SESSIONS = 'tutor_sessions';

/**
 * Opens IndexedDB database for tutor session history.
 */
function openTutorDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IndexedDB error in tutor-history:', event);
      reject(new Error('Failed to open IndexedDB database'));
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_TUTOR_SESSIONS)) {
        const store = db.createObjectStore(STORE_TUTOR_SESSIONS, { keyPath: 'sessionId' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
        store.createIndex('updatedAt', 'updatedAt', { unique: false });
      }
    };
  });
}

/**
 * Clean session record to ensure it is structuredClone-compatible (stripping non-clonable audio buffers if needed).
 */
function sanitizeSessionRecord(record: TutorSessionRecord): TutorSessionRecord {
  const cleanHistory = record.history.map((turn) => {
    const { audioWav, ...rest } = turn;
    return rest;
  });
  return {
    ...record,
    history: cleanHistory,
  };
}

/**
 * Persists a tutor session record to IndexedDB local storage.
 */
export async function saveTutorSession(session: TutorSessionRecord): Promise<void> {
  try {
    const db = await openTutorDB();
    const cleanRecord = sanitizeSessionRecord(session);

    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_TUTOR_SESSIONS], 'readwrite');
      const store = tx.objectStore(STORE_TUTOR_SESSIONS);
      const request = store.put(cleanRecord);

      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to save tutor session to IndexedDB:', err);
  }
}

/**
 * Retrieves a single tutor session by sessionId from IndexedDB storage.
 */
export async function getTutorSession(sessionId: string): Promise<TutorSessionRecord | null> {
  try {
    const db = await openTutorDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_TUTOR_SESSIONS], 'readonly');
      const store = tx.objectStore(STORE_TUTOR_SESSIONS);
      const request = store.get(sessionId);

      request.onsuccess = () => {
        resolve(request.result || null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to get tutor session from IndexedDB:', err);
    return null;
  }
}

/**
 * Gets all saved tutor sessions from IndexedDB history, newest first.
 */
export async function getAllTutorSessions(): Promise<TutorSessionRecord[]> {
  try {
    const db = await openTutorDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_TUTOR_SESSIONS], 'readonly');
      const store = tx.objectStore(STORE_TUTOR_SESSIONS);
      const index = store.index('updatedAt');
      const request = index.getAll();

      request.onsuccess = () => {
        const records = (request.result as TutorSessionRecord[]) || [];
        resolve(records.reverse());
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to fetch tutor sessions from IndexedDB:', err);
    return [];
  }
}

/**
 * Deletes a tutor session by sessionId from IndexedDB.
 */
export async function deleteTutorSession(sessionId: string): Promise<void> {
  try {
    const db = await openTutorDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_TUTOR_SESSIONS], 'readwrite');
      const store = tx.objectStore(STORE_TUTOR_SESSIONS);
      const request = store.delete(sessionId);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to delete tutor session from IndexedDB:', err);
  }
}

/**
 * Clears all tutor sessions from IndexedDB history.
 */
export async function clearTutorHistory(): Promise<void> {
  try {
    const db = await openTutorDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_TUTOR_SESSIONS], 'readwrite');
      const store = tx.objectStore(STORE_TUTOR_SESSIONS);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to clear tutor history in IndexedDB:', err);
  }
}

/**
 * Optionally syncs tutor session summary/data to Xavier memory storage if configured.
 */
export async function syncSessionToXavier(session: TutorSessionRecord): Promise<boolean> {
  if (!isXavierConfigured()) return false;
  try {
    const summaryText = `Tutor session ${session.sessionId} (${session.context.subject || 'general'}): ${session.history.length} turns.`;
    const ok = await xavierSave(summaryText, {
      kind: 'tutor-session',
      sessionId: session.sessionId,
      subject: session.context.subject,
      grade: session.context.grade,
      turnsCount: session.history.length,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    });
    if (ok) {
      session.syncedToXavier = true;
      await saveTutorSession(session);
    }
    return ok;
  } catch (err) {
    console.warn('Xavier sync failed for tutor session:', err);
    return false;
  }
}
