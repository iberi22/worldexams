/**
 * neuro-storage.ts
 * Gestor Soberano de Almacenamiento Local (IndexedDB + localStorage fallback)
 * para perfiles psicométricos, radar de evolución y rachas de entrenamiento.
 */

import type { FullCognitiveProfile } from './scoring-cognitive';

const DB_NAME = 'worldexams_neurogym';
const STORE_NAME = 'sessions';
const DB_VERSION = 1;
const STREAK_KEY = 'neurogym_streak_data';

export interface StoredNeuroSession {
  id: string;
  timestamp: number;
  dateStr: string;
  profile: FullCognitiveProfile;
}

export interface NeuroStreakInfo {
  currentStreak: number;
  lastTrainedDate: string;
  totalWorkouts: number;
}

function openDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e: any) => {
        const db = e.target.result as IDBDatabase;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

/**
 * Guarda una sesión completa de evaluación o entrenamiento
 */
export async function saveNeuroSession(profile: FullCognitiveProfile): Promise<string> {
  const dateStr = new Date(profile.timestamp).toISOString().split('T')[0];
  const id = `session_${profile.timestamp}_${Math.random().toString(36).substring(2, 7)}`;
  const record: StoredNeuroSession = {
    id,
    timestamp: profile.timestamp,
    dateStr,
    profile
  };

  updateStreak(dateStr);

  const db = await openDB();
  if (!db) {
    // Fallback a localStorage
    if (typeof localStorage !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('neurogym_fallback_sessions') || '[]');
      existing.unshift(record);
      localStorage.setItem('neurogym_fallback_sessions', JSON.stringify(existing.slice(0, 50)));
    }
    return id;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(record);
      tx.oncomplete = () => resolve(id);
      tx.onerror = () => resolve(id);
    } catch {
      resolve(id);
    }
  });
}

/**
 * Obtiene el historial de sesiones almacenadas (hasta maxCount)
 */
export async function getNeuroSessionsHistory(maxCount = 30): Promise<StoredNeuroSession[]> {
  const db = await openDB();
  if (!db) {
    if (typeof localStorage !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('neurogym_fallback_sessions') || '[]');
      return existing.slice(0, maxCount);
    }
    return [];
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const results = (req.result as StoredNeuroSession[]) || [];
        results.sort((a, b) => b.timestamp - a.timestamp);
        resolve(results.slice(0, maxCount));
      };
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

/**
 * Obtiene o actualiza la racha diaria
 */
export function getStreakInfo(): NeuroStreakInfo {
  if (typeof localStorage === 'undefined') {
    return { currentStreak: 0, lastTrainedDate: '', totalWorkouts: 0 };
  }
  const raw = localStorage.getItem(STREAK_KEY);
  return raw ? JSON.parse(raw) : { currentStreak: 0, lastTrainedDate: '', totalWorkouts: 0 };
}

function updateStreak(todayStr: string) {
  if (typeof localStorage === 'undefined') return;
  const info = getStreakInfo();
  if (info.lastTrainedDate === todayStr) {
    info.totalWorkouts++;
  } else {
    const lastDate = info.lastTrainedDate ? new Date(info.lastTrainedDate) : null;
    const today = new Date(todayStr);
    const diffDays = lastDate ? Math.round((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24)) : 99;

    if (diffDays === 1) {
      info.currentStreak++;
    } else if (diffDays > 1) {
      info.currentStreak = 1;
    }
    info.lastTrainedDate = todayStr;
    info.totalWorkouts++;
  }
  localStorage.setItem(STREAK_KEY, JSON.stringify(info));
}

/**
 * Limpia el historial local de NeuroGym
 */
export async function clearNeuroHistory(): Promise<boolean> {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('neurogym_fallback_sessions');
    localStorage.removeItem(STREAK_KEY);
  }
  const db = await openDB();
  if (!db) return true;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).clear();
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}
