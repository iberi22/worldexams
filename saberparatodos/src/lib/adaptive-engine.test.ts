import { describe, it, expect } from 'vitest';
import {
  getNextAdaptiveQuestion,
  parseBloomLevel,
  parseDifficultyBand,
  BLOOM_LEVEL_NUM,
  DIFFICULTY_BAND_NUM
} from './adaptive-engine';
import type { AppQuestion } from './api-service';
import type { QuestionResult } from './english-proficiency';

describe('Adaptive Testing Engine', () => {

  // Mock a diverse question pool for English (A1 to C1)
  const englishMockPool: AppQuestion[] = [
    { id: 'q1', text: 'A1-Easy', cefr_level: 'A1', difficulty: 2, options: [], correctOptionId: 'A', category: 'ingles', grade: 11 },
    { id: 'q2', text: 'A2-Medium', cefr_level: 'A2', difficulty: 5, options: [], correctOptionId: 'A', category: 'ingles', grade: 11 },
    { id: 'q3', text: 'B1-Medium', cefr_level: 'B1', difficulty: 6, options: [], correctOptionId: 'A', category: 'ingles', grade: 11 },
    { id: 'q4', text: 'B2-Hard', cefr_level: 'B2', difficulty: 8, options: [], correctOptionId: 'A', category: 'ingles', grade: 11 },
    { id: 'q5', text: 'C1-Expert', cefr_level: 'C1', difficulty: 10, options: [], correctOptionId: 'A', category: 'ingles', grade: 11 },
  ];

  // Mock STEM/Humanities question pools (Matemáticas, Lengua, Ciencias) with Bloom & Difficulty Bands
  const stemMockPool: AppQuestion[] = [
    { id: 'm1', text: 'Math Easy', difficulty: 2, options: [], correctOptionId: 'A', category: 'matematicas', grade: 11, bloom: 'Remember', difficulty_band: 'D1-D2' } as any,
    { id: 'm2', text: 'Math Basic', difficulty: 4, options: [], correctOptionId: 'A', category: 'matematicas', grade: 11, bloom: 'Understand', difficulty_band: 'D3-D4' } as any,
    { id: 'm3', text: 'Math Medium', difficulty: 6, options: [], correctOptionId: 'A', category: 'matematicas', grade: 11, bloom: 'Apply', difficulty_band: 'D5-D6' } as any,
    { id: 'm4', text: 'Math Advanced', difficulty: 8, options: [], correctOptionId: 'A', category: 'matematicas', grade: 11, bloom: 'Analyze', difficulty_band: 'D7-D8' } as any,
    { id: 'm5', text: 'Math Expert', difficulty: 10, options: [], correctOptionId: 'A', category: 'matematicas', grade: 11, bloom: 'Evaluate', difficulty_band: 'D9-D10' } as any,
  ];

  const cienciasMockPool: AppQuestion[] = [
    { id: 'c1', text: 'Ciencias Recordar', difficulty: 3, options: [], correctOptionId: 'A', category: 'ciencias_naturales', grade: 11, bloom: 'Recordar', difficulty_band: 'D3-D4' } as any,
    { id: 'c2', text: 'Ciencias Aplicar', difficulty: 6, options: [], correctOptionId: 'A', category: 'ciencias_naturales', grade: 11, bloom: 'Aplicar', difficulty_band: 'D5-D6' } as any,
    { id: 'c3', text: 'Ciencias Evaluar', difficulty: 9, options: [], correctOptionId: 'A', category: 'ciencias_naturales', grade: 11, bloom: 'Evaluar', difficulty_band: 'D9-D10' } as any,
  ];

  it('should return a calibration question when answered count is low (English)', () => {
    const usedIds = new Set<string>();
    const nextQ = getNextAdaptiveQuestion(englishMockPool, [], usedIds);

    expect(nextQ).not.toBeNull();
    expect(nextQ?.cefr_level).toBe('B1');
  });

  it('should scale up difficulty when student answers perfectly (English)', () => {
    const answeredResults: QuestionResult[] = [
      { questionId: 'q1', isCorrect: true, cefrLevel: 'B1' },
      { questionId: 'q2', isCorrect: true, cefrLevel: 'B1' },
      { questionId: 'q3', isCorrect: true, cefrLevel: 'B1' },
    ];
    const usedIds = new Set<string>(['q1', 'q2', 'q3']);

    const nextQ = getNextAdaptiveQuestion(englishMockPool, answeredResults, usedIds);
    expect(nextQ).not.toBeNull();
    expect(['B2', 'B2+', 'C1']).toContain(nextQ?.cefr_level);
  });

  it('should scale down difficulty when student struggles (English)', () => {
    const answeredResults: QuestionResult[] = [
      { questionId: 'qA', isCorrect: false, cefrLevel: 'B2' },
      { questionId: 'qB', isCorrect: false, cefrLevel: 'B2' },
      { questionId: 'qC', isCorrect: true, cefrLevel: 'B1' }, // 33% accuracy
    ];
    const usedIds = new Set<string>(['qA', 'qB', 'qC']);

    const nextQ = getNextAdaptiveQuestion(englishMockPool, answeredResults, usedIds);
    expect(nextQ).not.toBeNull();
    expect(['A1', 'A1+', 'A2', 'A2+']).toContain(nextQ?.cefr_level);
  });

  it('should return null when the pool is exhausted', () => {
    const usedIds = new Set<string>(englishMockPool.map(q => q.id));
    const nextQ = getNextAdaptiveQuestion(englishMockPool, [], usedIds);
    expect(nextQ).toBeNull();
  });

  describe('Subject-Agnostic Engine (Matemáticas, Ciencias, Lengua)', () => {
    it('should select base Bloom / difficulty band during calibration phase', () => {
      const usedIds = new Set<string>();
      const nextQ = getNextAdaptiveQuestion(stemMockPool, [], usedIds);

      expect(nextQ).not.toBeNull();
      // Base config starts at baseDifficulty 5 (Apply / D5-D6), m3 is closest (diff 6, Apply, D5-D6)
      expect(nextQ?.id).toBe('m3');
    });

    it('should scale up to higher Bloom / difficulty band on high accuracy (Matemáticas)', () => {
      const answeredResults: QuestionResult[] = [
        { questionId: 'm3', isCorrect: true, cefrLevel: 'A2', difficulty: 6 },
        { questionId: 'm3b', isCorrect: true, cefrLevel: 'A2', difficulty: 6 },
        { questionId: 'm3c', isCorrect: true, cefrLevel: 'A2', difficulty: 6 },
      ]; // 100% accuracy on level 6 questions
      const usedIds = new Set<string>(['m3']);

      const nextQ = getNextAdaptiveQuestion(stemMockPool, answeredResults, usedIds);
      expect(nextQ).not.toBeNull();
      // Should scale up difficulty from 6 to ~8+ (Analyze / Evaluate, D7-D8 / D9-D10)
      expect(['m4', 'm5']).toContain(nextQ?.id);
    });

    it('should scale down to lower Bloom / difficulty band on low accuracy (Ciencias)', () => {
      const answeredResults: QuestionResult[] = [
        { questionId: 'c2', isCorrect: false, cefrLevel: 'A2', difficulty: 6 },
        { questionId: 'c2b', isCorrect: false, cefrLevel: 'A2', difficulty: 6 },
        { questionId: 'c2c', isCorrect: true, cefrLevel: 'A2', difficulty: 6 },
      ]; // 33% accuracy
      const usedIds = new Set<string>(['c2']);

      const nextQ = getNextAdaptiveQuestion(cienciasMockPool, answeredResults, usedIds);
      expect(nextQ).not.toBeNull();
      // Should scale down to c1 (Recordar / D3-D4)
      expect(nextQ?.id).toBe('c1');
    });
  });

  describe('Bloom & Difficulty Band Metadata Parsers', () => {
    it('should parse Spanish and English Bloom taxonomy levels correctly', () => {
      expect(parseBloomLevel('Remember')).toBe('Remember');
      expect(parseBloomLevel('Recordar')).toBe('Remember');
      expect(parseBloomLevel('comprender')).toBe('Understand');
      expect(parseBloomLevel('APPLY')).toBe('Apply');
      expect(parseBloomLevel('Analizar')).toBe('Analyze');
      expect(parseBloomLevel('EVALUAR')).toBe('Evaluate');
      expect(parseBloomLevel('Crear')).toBe('Create');
      expect(parseBloomLevel(undefined)).toBeNull();
      expect(parseBloomLevel('Invalid')).toBeNull();
    });

    it('should parse Difficulty Bands (D1-D2 through D9-D10) correctly', () => {
      expect(parseDifficultyBand('D1-D2')).toBe('D1-D2');
      expect(parseDifficultyBand('D3-D4')).toBe('D3-D4');
      expect(parseDifficultyBand('d5-d6')).toBe('D5-D6');
      expect(parseDifficultyBand('D7-D8')).toBe('D7-D8');
      expect(parseDifficultyBand('D9-D10')).toBe('D9-D10');
      expect(parseDifficultyBand('D5')).toBe('D5-D6');
      expect(parseDifficultyBand(undefined)).toBeNull();
    });
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
