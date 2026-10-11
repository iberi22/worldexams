import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock must be hoisted before imports according to Vitest ESM rules
vi.mock('../../src/lib/pack-fetcher', () => ({
  fetchQuestionsFromPacks: vi.fn(),
}));

import { fetchQuestionAvailability } from '../../src/lib/api-service';
import { clearCache } from '../../src/lib/question-cache';
import { fetchQuestionsFromPacks } from '../../src/lib/pack-fetcher';

describe('fetchQuestionAvailability guard', () => {
  beforeEach(() => {
    // Clear cache because fetchQuestions caches results based on grade, subject, page
    clearCache();
    vi.clearAllMocks();
  });

  it('returns status empty when no questions are found', async () => {
    vi.mocked(fetchQuestionsFromPacks).mockResolvedValueOnce([]);

    const result = await fetchQuestionAvailability(11, 'matematicas');

    expect(result).toEqual({ status: 'empty', available: 0 });
    expect(fetchQuestionsFromPacks).toHaveBeenCalledWith(11, 'matematicas', 1, undefined);
  });

  it('returns status ok and question count when questions exist', async () => {
    const mockQuestions: any[] = [
      { id: '1', text: 'q1', options: [], correctOptionId: 'A', category: 'Mat', grade: 11, difficulty: 3 },
      { id: '2', text: 'q2', options: [], correctOptionId: 'A', category: 'Mat', grade: 11, difficulty: 3 }
    ];
    vi.mocked(fetchQuestionsFromPacks).mockResolvedValueOnce(mockQuestions);

    const result = await fetchQuestionAvailability(11, 'matematicas');

    expect(result).toEqual({ status: 'ok', available: 2 });
  });

  it('returns status error when fetch throws an exception', async () => {
    vi.mocked(fetchQuestionsFromPacks).mockRejectedValueOnce(new Error('Network failure'));

    const result = await fetchQuestionAvailability(11, 'matematicas');

    expect(result).toEqual({ status: 'error', available: 0 });
  });
});
