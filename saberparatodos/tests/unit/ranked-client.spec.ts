import { describe, it, expect, beforeEach, afterEach, vi, type MockedFunction } from 'vitest';
import {
  startRanked,
  submitRanked,
  fetchLeaderboard,
  saveActiveRankedSession,
  loadActiveRankedSession,
  clearActiveRankedSession,
  validateNickname,
  RankedError,
  type ActiveRankedSession
} from '../../src/lib/ranked/ranked-client';

// Mock getDeviceHash
vi.mock('../../src/lib/leaderboard-service', () => ({
  getDeviceHash: vi.fn(() => 'dev_123456')
}));

describe('ranked-client', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null);
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});

    // Default import.meta.env mock if needed, but not strictly required since default fallback is tested
  });

  afterEach(() => {
    vi.restoreAllMocks();
    global.fetch = originalFetch;
  });

  describe('startRanked', () => {
    it('returns success payload', async () => {
      const mockResponse = {
        sessionId: 'session-1',
        seed: 42,
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
        questions: []
      };
      (global.fetch as any).mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));

      const result = await startRanked('TestUser');
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.saberparatodos.space/v1/ranked/start',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ deviceId: 'dev_123456', nickname: 'TestUser' })
        })
      );
    });

    it('throws RATE_LIMITED on 429', async () => {
      (global.fetch as any).mockResolvedValue(new Response('Rate Limited', { status: 429 }));

      await expect(startRanked('TestUser')).rejects.toThrow(RankedError);
      await expect(startRanked('TestUser')).rejects.toThrowError(/Rate limited/);
      await expect(startRanked('TestUser').catch(e => e.code)).resolves.toBe('RATE_LIMITED');
    });

    it('throws UNAVAILABLE on 503', async () => {
      (global.fetch as any).mockResolvedValue(new Response('Service Unavailable', { status: 503 }));

      await expect(startRanked('TestUser')).rejects.toThrowError(/Ranked module unavailable/);
      await expect(startRanked('TestUser').catch(e => e.code)).resolves.toBe('UNAVAILABLE');
    });

    it('throws NETWORK on network error', async () => {
      (global.fetch as any).mockRejectedValue(new Error('Failed to fetch'));

      await expect(startRanked('TestUser')).rejects.toThrowError(/Network error/);
      await expect(startRanked('TestUser').catch(e => e.code)).resolves.toBe('NETWORK');
    });
  });

  describe('submitRanked', () => {
    const mockIntegrity = {
      tabSwitches: 0,
      focusLoss: 0,
      fullscreenExits: 0,
      copyPaste: 0,
      rightClick: 0,
      devtools: 0
    };

    it('returns success payload', async () => {
      const mockResponse = {
        status: 'valid',
        score: 100,
        correct: 40,
        answered: 40,
        total: 40,
        review: []
      };
      (global.fetch as any).mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));

      const result = await submitRanked('session-1', [], mockIntegrity);
      expect(result).toEqual(mockResponse);
    });

    it('throws ALREADY_SUBMITTED on 409', async () => {
      (global.fetch as any).mockResolvedValue(new Response('Conflict', { status: 409 }));

      await expect(submitRanked('session-1', [], mockIntegrity)).rejects.toThrowError(/Already submitted/);
      await expect(submitRanked('session-1', [], mockIntegrity).catch(e => e.code)).resolves.toBe('ALREADY_SUBMITTED');
    });
  });

  describe('fetchLeaderboard', () => {
    it('returns leaderboard payload', async () => {
      const mockResponse = {
        season: '2026-03',
        average: 50,
        entries: []
      };
      (global.fetch as any).mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));

      const result = await fetchLeaderboard('2026-03');
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.saberparatodos.space/v1/leaderboard?limit=50&season=2026-03',
        expect.any(Object)
      );
    });

    it('works without season', async () => {
      const mockResponse = { season: '2026-04', average: 0, entries: [] };
      (global.fetch as any).mockResolvedValue(new Response(JSON.stringify(mockResponse), { status: 200 }));

      await fetchLeaderboard();
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.saberparatodos.space/v1/leaderboard?limit=50',
        expect.any(Object)
      );
    });
  });

  describe('ActiveSession Management', () => {
    it('saves active ranked session', () => {
      const session: ActiveRankedSession = {
        sessionId: 'session-1',
        expiresAt: new Date().toISOString(),
        questions: [],
        answers: []
      };
      saveActiveRankedSession(session);
      expect(localStorage.setItem).toHaveBeenCalledWith('worldexams_ranked_active', JSON.stringify(session));
    });

    it('loads active ranked session if not expired', () => {
      const session: ActiveRankedSession = {
        sessionId: 'session-1',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
        questions: [],
        answers: []
      };
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(session));

      const loaded = loadActiveRankedSession();
      expect(loaded).toEqual(session);
    });

    it('clears active ranked session if expired', () => {
      const session: ActiveRankedSession = {
        sessionId: 'session-1',
        expiresAt: new Date(Date.now() - 3600000).toISOString(),
        questions: [],
        answers: []
      };
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(session));

      const loaded = loadActiveRankedSession();
      expect(loaded).toBeNull();
      expect(localStorage.removeItem).toHaveBeenCalledWith('worldexams_ranked_active');
    });

    it('clears active ranked session manually', () => {
      clearActiveRankedSession();
      expect(localStorage.removeItem).toHaveBeenCalledWith('worldexams_ranked_active');
    });
  });

  describe('validateNickname', () => {
    it('accepts valid nicknames', () => {
      expect(validateNickname('Player 1')).toBe(true);
      expect(validateNickname('Ana_123')).toBe(true);
      expect(validateNickname('User-Name')).toBe(true);
      expect(validateNickname('María')).toBe(true); // Unicode support
    });

    it('rejects invalid nicknames', () => {
      expect(validateNickname('A')).toBe(false); // Too short
      expect(validateNickname('ThisNicknameIsWayTooLong')).toBe(false); // Too long
      expect(validateNickname('User@Name')).toBe(false); // Invalid chars
      expect(validateNickname('!Invalid')).toBe(false); // Invalid chars
    });
  });
});

describe('expiresAtMs', () => {
  it('normalizes ISO strings, unix seconds and milliseconds', async () => {
    const { expiresAtMs } = await import('../../src/lib/ranked/ranked-client');
    const iso = '2026-09-27T00:00:00.000Z';
    const ms = Date.parse(iso);
    expect(expiresAtMs(iso)).toBe(ms);
    expect(expiresAtMs(ms / 1000)).toBe(ms);
    expect(expiresAtMs(ms)).toBe(ms);
    expect(expiresAtMs(String(ms / 1000))).toBe(ms);
  });
});
