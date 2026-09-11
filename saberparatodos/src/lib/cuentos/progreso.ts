/**
 * Anonymous Child Profiles & Reading Progress Management
 * Feature: feat-cuentos-lector (Ola C2.05)
 *
 * Enforces BR-03 / BR-07: Zero identity, zero tokens, zero karma, zero telemetry.
 * All profiles are strictly anonymous on-device UUIDs + fixed neutral Spanish nicknames.
 */

import type { SupabaseClient } from '@supabase/supabase-js';

// Fixed neutral-Spanish word list for anonymous child nicknames (no typed PII allowed)
export const NEUTRAL_NICKNAMES: readonly string[] = [
  'Explorador Curioso',
  'Zorro Astuto',
  'Lechuza Sabia',
  'Castor Paciente',
  'Tortuga Veloz',
  'Lobo Amigable',
  'Panda Alegre',
  'Delfín Ágil',
  'Oso Valiente',
  'Jirafa Atenta',
  'Abeja Laboriosa',
  'Puma Audaz',
  'Koala Sereno',
  'Cisne Elegante',
  'Tigre Noble',
  'Halcón Veloz'
] as const;

export interface ChildProfile {
  id: string;
  nickname: string;
}

export interface CuentoProgressRecord {
  slug: string;
  lastPage: number;
  finished: boolean;
  quizBest: number;
  updatedAt: string;
}

export interface SupabaseSyncPayload {
  profile_id: string;
  profile_nickname: string;
  slug: string;
  last_page: number;
  finished: boolean;
  quiz_best: number;
  updated_at: string;
}

export const STORAGE_KEYS = {
  PROFILE: 'worldexams_cuento_profile',
  PROGRESS_PREFIX: 'worldexams_cuento_progreso_',
  SYNC_QUEUE: 'worldexams_cuento_sync_queue'
} as const;

// Strict allow-list for database sync payload keys
export const ALLOWED_SYNC_KEYS: readonly (keyof SupabaseSyncPayload)[] = [
  'profile_id',
  'profile_nickname',
  'slug',
  'last_page',
  'finished',
  'quiz_best',
  'updated_at'
] as const;

/**
  Generate random UUID on device with fallback for older environments
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Creates a brand new anonymous child profile.
 * Guarantees zero identity / PII fields.
 */
export function createProfile(): ChildProfile {
  const randomIndex = Math.floor(Math.random() * NEUTRAL_NICKNAMES.length);
  const profile: ChildProfile = {
    id: generateUUID(),
    nickname: NEUTRAL_NICKNAMES[randomIndex]
  };

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }

  return profile;
}

/**
 * Retrieves existing active profile or creates one if none exists.
 */
export function getActiveProfile(): ChildProfile {
  if (typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.id === 'string' && typeof parsed.nickname === 'string') {
          return { id: parsed.id, nickname: parsed.nickname };
        }
      } catch {
        // Fallthrough if corrupt
      }
    }
  }
  return createProfile();
}

/**
 * Saves reading progress locally in localStorage and enqueues for Supabase sync.
 */
export function saveProgress(
  slug: string,
  lastPage: number,
  finished: boolean = false,
  quizScore: number = 0,
  supabaseClient?: SupabaseClient
): CuentoProgressRecord {
  const profile = getActiveProfile();
  const storageKey = `${STORAGE_KEYS.PROGRESS_PREFIX}${profile.id}`;

  let records: Record<string, CuentoProgressRecord> = {};
  if (typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        records = JSON.parse(raw) || {};
      } catch {
        records = {};
      }
    }
  }

  const existing = records[slug];
  const newLastPage = Math.max(lastPage, existing?.lastPage || 1);
  const newFinished = Boolean(finished || existing?.finished);
  const newQuizBest = Math.max(quizScore, existing?.quizBest || 0);

  const updatedRecord: CuentoProgressRecord = {
    slug,
    lastPage: newLastPage,
    finished: newFinished,
    quizBest: newQuizBest,
    updatedAt: new Date().toISOString()
  };

  records[slug] = updatedRecord;

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(storageKey, JSON.stringify(records));
  }

  // Enqueue for offline-first sync
  enqueueSyncPayload({
    profile_id: profile.id,
    profile_nickname: profile.nickname,
    slug: updatedRecord.slug,
    last_page: updatedRecord.lastPage,
    finished: updatedRecord.finished,
    quiz_best: updatedRecord.quizBest,
    updated_at: updatedRecord.updatedAt
  });

  if (supabaseClient) {
    syncPendingQueue(supabaseClient).catch(() => {
      // Offline-first: quiet fail, stays queued
    });
  }

  return updatedRecord;
}

/**
 * Retrieves progress for a specific story slug.
 */
export function getProgress(slug: string): CuentoProgressRecord | null {
  const profile = getActiveProfile();
  const storageKey = `${STORAGE_KEYS.PROGRESS_PREFIX}${profile.id}`;

  if (typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const records: Record<string, CuentoProgressRecord> = JSON.parse(raw);
        return records[slug] || null;
      } catch {
        return null;
      }
    }
  }

  return null;
}

/**
 * Retrieves all story progress records for the active profile.
 */
export function getAllProgress(): Record<string, CuentoProgressRecord> {
  const profile = getActiveProfile();
  const storageKey = `${STORAGE_KEYS.PROGRESS_PREFIX}${profile.id}`;

  if (typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        return JSON.parse(raw) || {};
      } catch {
        return {};
      }
    }
  }

  return {};
}

/**
 * Filters payload strictly according to the allow-list, stripping any non-allowed attributes.
 */
export function sanitizeSyncPayload(payload: Record<string, unknown>): SupabaseSyncPayload {
  const sanitized: Partial<SupabaseSyncPayload> = {};

  for (const key of ALLOWED_SYNC_KEYS) {
    if (key in payload) {
      (sanitized as any)[key] = payload[key];
    }
  }

  return {
    profile_id: String(sanitized.profile_id || ''),
    profile_nickname: String(sanitized.profile_nickname || ''),
    slug: String(sanitized.slug || ''),
    last_page: Number(sanitized.last_page || 1),
    finished: Boolean(sanitized.finished),
    quiz_best: Number(sanitized.quiz_best || 0),
    updated_at: String(sanitized.updated_at || new Date().toISOString())
  };
}

/**
 * Enqueues a progress payload to the offline local sync queue.
 */
export function enqueueSyncPayload(payload: SupabaseSyncPayload): void {
  const sanitized = sanitizeSyncPayload(payload as unknown as Record<string, unknown>);
  const queue = getSyncQueue();

  // Replace duplicate entry for same profile_id and slug with newest update
  const existingIndex = queue.findIndex(
    (item) => item.profile_id === sanitized.profile_id && item.slug === sanitized.slug
  );

  if (existingIndex >= 0) {
    queue[existingIndex] = sanitized;
  } else {
    queue.push(sanitized);
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
  }
}

/**
 * Reads pending sync queue from localStorage.
 */
export function getSyncQueue(): SupabaseSyncPayload[] {
  if (typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
    if (raw) {
      try {
        return JSON.parse(raw) || [];
      } catch {
        return [];
      }
    }
  }
  return [];
}

/**
 * Clears the offline sync queue.
 */
export function clearSyncQueue(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.SYNC_QUEUE);
  }
}

/**
 * Flushes all pending queued progress updates to Supabase RLS table `cuento_progreso`.
 */
export async function syncPendingQueue(supabaseClient: SupabaseClient): Promise<{
  success: boolean;
  syncedCount: number;
  error?: unknown;
}> {
  const queue = getSyncQueue();
  if (queue.length === 0) {
    return { success: true, syncedCount: 0 };
  }

  const itemsToSync = queue.map((item) => sanitizeSyncPayload(item as unknown as Record<string, unknown>));

  try {
    const { error } = await supabaseClient
      .from('cuento_progreso')
      .upsert(itemsToSync, { onConflict: 'profile_id,slug' });

    if (error) {
      return { success: false, syncedCount: 0, error };
    }

    clearSyncQueue();
    return { success: true, syncedCount: itemsToSync.length };
  } catch (err) {
    return { success: false, syncedCount: 0, error: err };
  }
}
