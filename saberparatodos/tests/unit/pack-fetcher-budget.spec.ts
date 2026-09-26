import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchQuestionsFromPacks } from '../../src/lib/pack-fetcher';
import { ensureBasePool } from '../../src/lib/questions/pool';
import * as packStorage from '../../src/lib/pack-storage';

describe('Pack Fetcher and Pool Budget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('API 200 with questions: [] -> 0 static-pack requests, returns []', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ questions: [] }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchQuestionsFromPacks(11, 'matematicas', 1, 1);

    expect(result).toEqual([]);
    // fetch is called exactly once for the API endpoint, but no static packs
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('/questions');
  });

  it('API network error, no period -> <= 24 fetch calls, returns questions from first successful pack', async () => {
    // Override navigator to bypass isJsdom check, allowing canUseRelativeFetch to be true
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', { value: 'Chrome', configurable: true });
    // Also need to set window.location.origin
    const originalLocation = window.location;
    delete (window as any).location;
    (window as any).location = { origin: 'https://test.local' };

    let fetchCount = 0;
    const fetchMock = vi.fn().mockImplementation(async (url) => {
      fetchCount++;
      if (url.includes('/questions')) {
        return { ok: false };
      }
      if (fetchCount === 2) {
        return {
          ok: true,
          json: async () => ({
            questions: [{
              id: 'q1', text: 'Q1', options: [{ id: 'A', text: 'A' }]
            }]
          })
        };
      }
      return { ok: false };
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchQuestionsFromPacks(11, 'matematicas');

    // Restore
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent, configurable: true });
    (window as any).location = originalLocation;


    expect(result.length).toBeGreaterThan(0);
    expect(result[0].id).toBe('q1');
    expect(fetchCount).toBeLessThanOrEqual(24);
  });

  it('fetchSubjectScopedPool with repository returning 20, 20, 7, [] -> 4 calls (stops on empty page, not on short page)', async () => {
    let callCount = 0;
    const repository = {
      fetchQuestions: vi.fn().mockImplementation(async () => {
        callCount++;
        if (callCount === 1) return Array.from({ length: 20 }, (_, i) => ({ id: `q${i}` }));
        if (callCount === 2) return Array.from({ length: 20 }, (_, i) => ({ id: `q${i + 20}` }));
        if (callCount === 3) return Array.from({ length: 7 }, (_, i) => ({ id: `q${i + 40}` }));
        return [];
      }),
      fetchAllQuestionsForGrade: vi.fn(),
      fetchBulkQuestions: vi.fn(),
      fetchEnglishQuestionsAllGrades: vi.fn(),
    };

    const result = await ensureBasePool({
      repository,
      loadedQuestions: [],
      grade: 11,
      subject: 'matematicas',
      maxQuestions: 100,
    });

    expect(repository.fetchQuestions).toHaveBeenCalledTimes(3);
    expect(result.length).toBe(47);
  });

  it('fetchSubjectScopedPool returning same 20 twice -> 2 calls', async () => {
    let callCount = 0;
    const batch = Array.from({ length: 20 }, (_, i) => ({ id: `q${i}` }));
    const repository = {
      fetchQuestions: vi.fn().mockImplementation(async () => {
        callCount++;
        return batch;
      }),
      fetchAllQuestionsForGrade: vi.fn(),
      fetchBulkQuestions: vi.fn(),
      fetchEnglishQuestionsAllGrades: vi.fn(),
    };

    const result = await ensureBasePool({
      repository,
      loadedQuestions: [],
      grade: 11,
      subject: 'matematicas',
      maxQuestions: 100,
    });

    expect(repository.fetchQuestions).toHaveBeenCalledTimes(2);
    expect(result.length).toBe(20);
  });

  it('Two different pages produce two different savePack keys. Spy on savePack.', async () => {
    const savePackSpy = vi.spyOn(packStorage, 'savePack').mockImplementation(() => {});

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        questions: [{ id: 'q1', text: 'Q1', options: [{ id: 'A', text: 'A' }] }]
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await fetchQuestionsFromPacks(11, 'matematicas', 1, 1);
    await fetchQuestionsFromPacks(11, 'matematicas', 2, 1);

    expect(savePackSpy).toHaveBeenCalledTimes(2);

    const call1Arg = savePackSpy.mock.calls[0][0];
    const call2Arg = savePackSpy.mock.calls[1][0];

    expect(call1Arg.packId).toContain('-pg1');
    expect(call2Arg.packId).toContain('-pg2');
    expect(call1Arg.packId).not.toEqual(call2Arg.packId);
  });
});
