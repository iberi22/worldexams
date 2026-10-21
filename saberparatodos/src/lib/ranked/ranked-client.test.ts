import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../leaderboard-service', () => ({
  getDeviceHash: () => 'dev_test'
}));

import {
  RankedError,
  rankedErrorMessage,
  RANKED_ERROR_MESSAGES,
  startRanked,
  submitRanked,
  loadActiveRankedSession,
  saveActiveRankedSession,
  clearActiveRankedSession,
  expiresAtMs,
  RANKED_MIN_ANSWERED
} from './ranked-client';
import type { DwellTimeState } from './dwell-time';

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body
  } as Response;
}

describe('ranked error messages', () => {
  it('maps every RankedErrorCode to a Spanish message', () => {
    const codes = Object.keys(RANKED_ERROR_MESSAGES) as (keyof typeof RANKED_ERROR_MESSAGES)[];
    expect(codes).toEqual(
      expect.arrayContaining([
        'RATE_LIMITED',
        'UNAVAILABLE',
        'ALREADY_SUBMITTED',
        'NETWORK',
        'UNKNOWN',
        'POOL_INSUFFICIENT'
      ])
    );
    for (const code of codes) {
      expect(rankedErrorMessage(code)).not.toMatch(/[A-Za-z]+ error!/i);
      expect(rankedErrorMessage(code).length).toBeGreaterThan(10);
    }
  });

  it('maps POOL_INSUFFICIENT to the exact retry-later copy', () => {
    expect(rankedErrorMessage('POOL_INSUFFICIENT')).toBe(
      'No hay suficientes preguntas disponibles ahora. Intenta más tarde.'
    );
  });

  it('falls back to the generic message for unknown codes', () => {
    expect(rankedErrorMessage('UNKNOWN')).toBeTypeOf('string');
    // @ts-expect-error exercising the fallback branch
    expect(rankedErrorMessage('NOT_A_CODE', 'custom fallback')).toBe('custom fallback');
    // @ts-expect-error exercising the fallback branch
    expect(rankedErrorMessage('NOT_A_CODE')).toBe(RANKED_ERROR_MESSAGES.UNKNOWN);
  });
});

describe('startRanked error mapping', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('maps HTTP 503 with error POOL_INSUFFICIENT to POOL_INSUFFICIENT', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(jsonResponse({ error: 'POOL_INSUFFICIENT' }, 503));

    await expect(startRanked('nico')).rejects.toMatchObject({
      code: 'POOL_INSUFFICIENT'
    });
  });

  it('maps any other HTTP 503 to UNAVAILABLE', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(jsonResponse({ error: 'RANKED_UNAVAILABLE' }, 503));

    await expect(startRanked('nico')).rejects.toMatchObject({
      code: 'UNAVAILABLE'
    });
  });

  it('maps HTTP 429 to RATE_LIMITED', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(jsonResponse({}, 429));

    await expect(startRanked('nico')).rejects.toMatchObject({ code: 'RATE_LIMITED' });
  });

  it('maps other HTTP failures to UNKNOWN with a non-English message', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(jsonResponse({}, 500));

    try {
      await startRanked('nico');
      expect.unreachable('startRanked should throw');
    } catch (err) {
      const ranked = err as RankedError;
      expect(ranked.code).toBe('UNKNOWN');
      expect(rankedErrorMessage(ranked.code)).not.toMatch(/HTTP error!/);
    }
  });

  it('maps network failures to NETWORK', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(startRanked('nico')).rejects.toMatchObject({ code: 'NETWORK' });
  });

  it('parses a successful start payload', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      jsonResponse({
        sessionId: 's1',
        seed: 7,
        expiresAt: '2026-01-01T00:00:00.000Z',
        questions: []
      })
    );

    const res = await startRanked('nico', 'co', 7);
    expect(res.sessionId).toBe('s1');
    expect(res.questions).toEqual([]);
  });
});

describe('submitRanked error mapping', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('maps HTTP 409 to ALREADY_SUBMITTED', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(jsonResponse({}, 409));

    await expect(submitRanked('s1', [], {} as never)).rejects.toMatchObject({
      code: 'ALREADY_SUBMITTED'
    });
  });

  it('maps HTTP 503 to UNAVAILABLE (not POOL_INSUFFICIENT)', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(jsonResponse({}, 503));

    await expect(submitRanked('s1', [], {} as never)).rejects.toMatchObject({
      code: 'UNAVAILABLE'
    });
  });
});

describe('ActiveRankedSession persistence', () => {
  const dwell: DwellTimeState = {
    totals: { q1: 12_000 },
    currentId: 'q1',
    visitStartedAt: null,
    paused: true
  };

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('round-trips answers, currentIdx and dwell state', () => {
    saveActiveRankedSession({
      sessionId: 's1',
      expiresAt: Date.now() + 60_000,
      questions: [],
      answers: [{ questionId: 'q1', letter: 'A', ms: 12_000 }],
      currentIdx: 3,
      dwell
    });

    const loaded = loadActiveRankedSession();
    expect(loaded?.currentIdx).toBe(3);
    expect(loaded?.answers[0].ms).toBe(12_000);
    expect(loaded?.dwell?.totals.q1).toBe(12_000);
    expect(loaded?.dwell?.paused).toBe(true);
  });

  it('drops an expired session', () => {
    saveActiveRankedSession({
      sessionId: 's1',
      expiresAt: Date.now() - 1_000,
      questions: [],
      answers: []
    });

    expect(loadActiveRankedSession()).toBeNull();
    clearActiveRankedSession();
  });

  it('loads a legacy session without dwell/currentIdx', () => {
    localStorage.setItem(
      'worldexams_ranked_active',
      JSON.stringify({ sessionId: 's1', expiresAt: Date.now() + 60_000, questions: [], answers: [] })
    );

    const loaded = loadActiveRankedSession();
    expect(loaded?.currentIdx).toBeUndefined();
    expect(loaded?.dwell).toBeUndefined();
  });
});

describe('expiresAtMs', () => {
  it('normalizes ISO strings, unix seconds and epoch millis', () => {
    expect(expiresAtMs('2026-01-01T00:00:00.000Z')).toBe(Date.parse('2026-01-01T00:00:00.000Z'));
    expect(expiresAtMs(1_700_000_000)).toBe(1_700_000_000_000);
    expect(expiresAtMs(1_700_000_000_000)).toBe(1_700_000_000_000);
  });

  it('exposes the ranking eligibility threshold', () => {
    expect(RANKED_MIN_ANSWERED).toBe(31);
  });
});
