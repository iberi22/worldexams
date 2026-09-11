import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createProfile,
  getActiveProfile,
  saveProgress,
  getProgress,
  getAllProgress,
  sanitizeSyncPayload,
  enqueueSyncPayload,
  getSyncQueue,
  clearSyncQueue,
  syncPendingQueue,
  NEUTRAL_NICKNAMES,
  STORAGE_KEYS,
  ALLOWED_SYNC_KEYS
} from './progreso';

describe('Child Profiles & Progress (progreso.ts)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('createProfile() yields { id, nickname } with NO name/email/device/PII fields', () => {
    const profile = createProfile();

    expect(profile).toHaveProperty('id');
    expect(profile).toHaveProperty('nickname');

    // Assert exact key set - no extra properties allowed
    const keys = Object.keys(profile);
    expect(keys.sort()).toEqual(['id', 'nickname'].sort());

    // Assert nickname is strictly from fixed neutral Spanish word list
    expect(NEUTRAL_NICKNAMES).toContain(profile.nickname);

    // Assert absence of identity/PII keys
    expect(profile).not.toHaveProperty('name');
    expect(profile).not.toHaveProperty('nombre');
    expect(profile).not.toHaveProperty('email');
    expect(profile).not.toHaveProperty('device');
    expect(profile).not.toHaveProperty('deviceId');
    expect(profile).not.toHaveProperty('ip');
  });

  it('getActiveProfile() creates profile if missing and retrieves existing profile', () => {
    const created = getActiveProfile();
    expect(created.id).toBeDefined();

    const retrieved = getActiveProfile();
    expect(retrieved.id).toBe(created.id);
    expect(retrieved.nickname).toBe(created.nickname);
  });

  it('round-trips reading progress through localStorage', () => {
    const slug = 'tana-tucan-comparte';

    // Verify initial progress is null
    expect(getProgress(slug)).toBeNull();

    // Save page 5 progress
    const saved = saveProgress(slug, 5, false, 2);
    expect(saved.slug).toBe(slug);
    expect(saved.lastPage).toBe(5);
    expect(saved.finished).toBe(false);
    expect(saved.quizBest).toBe(2);

    // Read back progress from localStorage
    const retrieved = getProgress(slug);
    expect(retrieved).not.toBeNull();
    expect(retrieved?.lastPage).toBe(5);
    expect(retrieved?.quizBest).toBe(2);

    // Save updated page (page 8, finished, quiz 3)
    saveProgress(slug, 8, true, 3);
    const updated = getProgress(slug);
    expect(updated?.lastPage).toBe(8);
    expect(updated?.finished).toBe(true);
    expect(updated?.quizBest).toBe(3);

    // Read all progress
    const all = getAllProgress();
    expect(all[slug]).toBeDefined();
    expect(all[slug].lastPage).toBe(8);
  });

  it('sanitizeSyncPayload enforces strict allow-list and removes unauthorized identity keys', () => {
    const untrustedPayload = {
      profile_id: '123e4567-e89b-12d3-a456-426614174000',
      profile_nickname: 'Zorro Astuto',
      slug: 'bruno-zorro-paciencia',
      last_page: 4,
      finished: false,
      quiz_best: 1,
      updated_at: '2026-09-05T00:00:00.000Z',
      // FORBIDDEN IDENTITY & PII FIELDS BELOW:
      name: 'Juan Perez',
      email: 'juan@example.com',
      device_id: 'android-uuid-1234',
      user_token: 'secret-token-5678',
      ip_address: '192.168.1.1'
    };

    const sanitized = sanitizeSyncPayload(untrustedPayload);

    // Check that keys match ONLY the allowed sync keys
    const keys = Object.keys(sanitized);
    expect(keys.sort()).toEqual([...ALLOWED_SYNC_KEYS].sort());

    expect(sanitized).not.toHaveProperty('name');
    expect(sanitized).not.toHaveProperty('email');
    expect(sanitized).not.toHaveProperty('device_id');
    expect(sanitized).not.toHaveProperty('user_token');
    expect(sanitized).not.toHaveProperty('ip_address');

    expect(sanitized.profile_id).toBe('123e4567-e89b-12d3-a456-426614174000');
    expect(sanitized.profile_nickname).toBe('Zorro Astuto');
    expect(sanitized.slug).toBe('bruno-zorro-paciencia');
    expect(sanitized.last_page).toBe(4);
  });

  it('queues offline writes locally and flushes on reconnect sync', async () => {
    clearSyncQueue();
    expect(getSyncQueue()).toHaveLength(0);

    const profile = getActiveProfile();

    const payload = {
      profile_id: profile.id,
      profile_nickname: profile.nickname,
      slug: 'nieve-osa-hielo',
      last_page: 3,
      finished: false,
      quiz_best: 0,
      updated_at: new Date().toISOString()
    };

    enqueueSyncPayload(payload);
    expect(getSyncQueue()).toHaveLength(1);

    // Mock failing Supabase client (offline scenario)
    const mockFailingClient = {
      from: vi.fn().mockReturnValue({
        upsert: vi.fn().mockResolvedValue({ error: new Error('Network offline') })
      })
    } as any;

    const offlineResult = await syncPendingQueue(mockFailingClient);
    expect(offlineResult.success).toBe(false);
    // Queue remains intact on offline/failure
    expect(getSyncQueue()).toHaveLength(1);

    // Mock successful Supabase client (reconnected scenario)
    const mockSuccessClient = {
      from: vi.fn().mockReturnValue({
        upsert: vi.fn().mockResolvedValue({ error: null })
      })
    } as any;

    const onlineResult = await syncPendingQueue(mockSuccessClient);
    expect(onlineResult.success).toBe(true);
    expect(onlineResult.syncedCount).toBe(1);
    // Queue flushed after successful sync
    expect(getSyncQueue()).toHaveLength(0);
  });
});
