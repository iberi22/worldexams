import { describe, it, expect } from 'vitest';
import { getNextAdaptiveQuestion } from './adaptive-engine';
import type { AppQuestion } from './api-service';
import type { QuestionResult } from './english-proficiency';

describe('Adaptive Testing Engine', () => {

  // Mock a diverse question pool (A1 to C1)
  const mockPool: AppQuestion[] = [
    { id: 'q1', text: 'A1-Easy', cefr_level: 'A1', difficulty: 2, options: [], correctOptionId: 'A', category: 'ingles', grade: 11 },
    { id: 'q2', text: 'A2-Medium', cefr_level: 'A2', difficulty: 5, options: [], correctOptionId: 'A', category: 'ingles', grade: 11 },
    { id: 'q3', text: 'B1-Medium', cefr_level: 'B1', difficulty: 6, options: [], correctOptionId: 'A', category: 'ingles', grade: 11 },
    { id: 'q4', text: 'B2-Hard', cefr_level: 'B2', difficulty: 8, options: [], correctOptionId: 'A', category: 'ingles', grade: 11 },
    { id: 'q5', text: 'C1-Expert', cefr_level: 'C1', difficulty: 10, options: [], correctOptionId: 'A', category: 'ingles', grade: 11 },
  ];

  it('should return a calibration question when answered count is low', () => {
    // 0 questions answered - should use default calibration (B1 / Diff 5)
    // The closest is q3 (B1, diff 6)
    const usedIds = new Set<string>();
    const nextQ = getNextAdaptiveQuestion(mockPool, [], usedIds);

    expect(nextQ).not.toBeNull();
    expect(nextQ?.cefr_level).toBe('B1');
  });

  it('should scale up difficulty when student answers perfectly', () => {
    const answeredResults: QuestionResult[] = [
      { questionId: 'q1', isCorrect: true, cefrLevel: 'B1' },
      { questionId: 'q2', isCorrect: true, cefrLevel: 'B1' },
      { questionId: 'q3', isCorrect: true, cefrLevel: 'B1' },
    ];
    const usedIds = new Set<string>(['q1', 'q2', 'q3']);

    // With 100% accuracy on B1, it should estimate B1/B1+ and push up to B2
    const nextQ = getNextAdaptiveQuestion(mockPool, answeredResults, usedIds);
    expect(nextQ).not.toBeNull();
    // Because accuracy > 75%, it scales up from current estimate
    expect(['B2', 'B2+', 'C1']).toContain(nextQ?.cefr_level);
  });

  it('should scale down difficulty when student struggles', () => {
    const answeredResults: QuestionResult[] = [
      { questionId: 'qA', isCorrect: false, cefrLevel: 'B2' },
      { questionId: 'qB', isCorrect: false, cefrLevel: 'B2' },
      { questionId: 'qC', isCorrect: true, cefrLevel: 'B1' }, // 33% accuracy
    ];
    const usedIds = new Set<string>(['qA', 'qB', 'qC']);

    // Accuracy is ~33%, it should down-scale from the estimated level
    const nextQ = getNextAdaptiveQuestion(mockPool, answeredResults, usedIds);
    expect(nextQ).not.toBeNull();
    // It should give an easier question (A1, A1+, A2)
    expect(['A1', 'A1+', 'A2', 'A2+']).toContain(nextQ?.cefr_level);
  });

  it('should return null when the pool is exhausted', () => {
    const usedIds = new Set<string>(mockPool.map(q => q.id));
    const nextQ = getNextAdaptiveQuestion(mockPool, [], usedIds);
    expect(nextQ).toBeNull();
  });

  describe('3-Strike Protocol Logic', () => {
    const protocolPool: AppQuestion[] = [
      { id: 'v4-1', text: 'V4 Question 1', protocol_version: '4.0', options: [], correctOptionId: 'A', category: 'ingles', grade: 11, difficulty: 3 },
      { id: 'v4-2', text: 'V4 Question 2', protocol_version: '4.0', options: [], correctOptionId: 'A', category: 'ingles', grade: 11, difficulty: 3 },
      { id: 'trad-1', text: 'Traditional 1', options: [], correctOptionId: 'A', category: 'ingles', grade: 11, difficulty: 3 },
      { id: 'trad-2', text: 'Traditional 2', options: [], correctOptionId: 'A', category: 'ingles', grade: 11, difficulty: 3 },
    ];

    it('should prioritize Protocol v4 questions on start', () => {
      const nextQ = getNextAdaptiveQuestion(protocolPool, [], new Set());
      expect(nextQ?.protocol_version).toBe('4.0');
    });

    it('should switch to traditional questions after 3 incorrect answers', () => {
      const results: QuestionResult[] = [
        { questionId: 'any1', isCorrect: false, cefrLevel: 'B1' },
        { questionId: 'any2', isCorrect: false, cefrLevel: 'B1' },
        { questionId: 'any3', isCorrect: false, cefrLevel: 'B1' },
      ];
      const nextQ = getNextAdaptiveQuestion(protocolPool, results, new Set(['any1', 'any2', 'any3']));
      // Should not be v4
      expect(nextQ?.protocol_version).toBeUndefined();
      expect(nextQ?.id).toMatch(/trad/);
    });

    it('should keep Protocol v4 if at least one of the first 3 is correct', () => {
       const results: QuestionResult[] = [
        { questionId: 'any1', isCorrect: false, cefrLevel: 'B1' },
        { questionId: 'any2', isCorrect: true, cefrLevel: 'B1' },
        { questionId: 'any3', isCorrect: false, cefrLevel: 'B1' },
      ];
      const nextQ = getNextAdaptiveQuestion(protocolPool, results, new Set(['any1', 'any2', 'any3', 'v4-1']));
      expect(nextQ?.protocol_version).toBe('4.0');
    });
  });
});
