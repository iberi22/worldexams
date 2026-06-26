import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  filterUnansweredQuestions,
  saveAnsweredQuestions,
  loadAnsweredQuestions
} from './question-memory';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

describe('question-memory', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('filterUnansweredQuestions', () => {
    const q1 = { id: 'q1' };
    const q2 = { id: 'q2' };
    const q3 = { id: 'q3' };
    const questions = [q1, q2, q3];

    it('returns all questions when none are answered', () => {
      const result = filterUnansweredQuestions(questions, 3);
      expect(result.filtered).toHaveLength(3);
      expect(result.hadToRepeat).toBe(false);
      expect(result.wasReset).toBe(false);
    });

    it('filters out answered questions', () => {
      saveAnsweredQuestions(new Set(['q1']), 10);
      const result = filterUnansweredQuestions(questions, 2);
      expect(result.filtered).toHaveLength(2);
      expect(result.filtered).not.toContainEqual(q1);
      expect(result.hadToRepeat).toBe(false);
      expect(result.wasReset).toBe(false);
    });

    it('uses previously answered questions if not enough unanswered', () => {
      saveAnsweredQuestions(new Set(['q1', 'q2']), 10);
      // q3 is unanswered, q1, q2 are answered. Requesting 2.
      const result = filterUnansweredQuestions(questions, 2);
      expect(result.filtered).toHaveLength(2);
      expect(result.filtered).toContainEqual(q3);
      expect(result.hadToRepeat).toBe(true);
      expect(result.wasReset).toBe(false);
    });

    it('prioritizes oldest answered questions when repeating', () => {
      const now = Date.now();
      const storageKey = "saberparatodos_answered_questions";

      // q1 answered 2 days ago, q2 answered 1 day ago
      const data = {
        answeredTimestamps: {
          'q1': now - 2 * 24 * 60 * 60 * 1000,
          'q2': now - 1 * 24 * 60 * 60 * 1000
        },
        lastUpdated: now,
        totalAvailable: 10
      };
      localStorage.setItem(storageKey, JSON.stringify(data));

      // q3 is unanswered. Requesting 2.
      // It should pick q3 (unanswered) and then q1 (older)
      const result = filterUnansweredQuestions(questions, 2);
      expect(result.filtered).toContainEqual(q3);
      expect(result.filtered).toContainEqual(q1);
      expect(result.filtered).not.toContainEqual(q2);
    });

    it('resets memory PARTIALLY when all questions in current pool are exhausted', () => {
      // Answer q1, q2, q3 (current pool) AND q4 (other subject)
      saveAnsweredQuestions(new Set(['q1', 'q2', 'q3', 'q4']), 10);

      // All questions in current pool are answered. Requesting 1.
      const result = filterUnansweredQuestions(questions, 1);

      expect(result.hadToRepeat).toBe(true);
      expect(result.wasReset).toBe(true);

      // Memory should have been cleared for q1, q2, q3 but preserved for q4
      const answered = loadAnsweredQuestions();
      expect(answered.has('q1')).toBe(false);
      expect(answered.has('q2')).toBe(false);
      expect(answered.has('q3')).toBe(false);
      expect(answered.has('q4')).toBe(true);
    });

    it('does not reset memory if at least one question is unanswered', () => {
        saveAnsweredQuestions(new Set(['q1', 'q2']), 10);
        // q3 is still unanswered
        const result = filterUnansweredQuestions(questions, 3);
        expect(result.wasReset).toBe(false);
        expect(result.hadToRepeat).toBe(true);

        const answered = loadAnsweredQuestions();
        expect(answered.has('q1')).toBe(true);
        expect(answered.has('q2')).toBe(true);
    });
  });
});
