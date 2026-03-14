import { describe, it, expect, vi } from 'vitest';
import { fetchEnglishQuestionsAllGrades } from '../api-service';
import * as packStorage from '../pack-storage';

vi.mock('../pack-storage', () => ({
  getQuestionPool: vi.fn()
}));

vi.mock('../idb-storage', () => ({
  getAnsweredQuestionIds: vi.fn(() => Promise.resolve(new Set())),
  getAllLocalResults: vi.fn(() => Promise.resolve([]))
}));

vi.mock('../question-memory', () => ({
  getAnsweredQuestionIds: vi.fn(() => Promise.resolve(new Set())),
  getSavedEnglishProficiencyLevel: vi.fn()
}));

describe('fetchEnglishQuestionsAllGrades filtering', () => {
  it('strictly filters for Protocol 4 in Grades 9-11 for High Levels (B1+)', async () => {
    const mockQuestions = [
      { id: 'v3-q1', protocol_version: '3.1', difficulty: 3, asignatura: 'ingles' },
      { id: 'v4-q2', protocol_version: '4.0', difficulty: 3, asignatura: 'ingles' },
      { id: 'v4-q3', protocol_version: '4.1', difficulty: 5, asignatura: 'ingles' }
    ];

    (packStorage.getQuestionPool as any).mockImplementation((grade: number) => {
      if ([9, 10, 11].includes(grade)) return mockQuestions;
      return [];
    });

    // B1+ = level 6
    const results = await fetchEnglishQuestionsAllGrades(10, false, 6);

    expect(results.every(q => q.protocol_version?.startsWith('4.'))).toBe(true);
    expect(results.some(q => q.id === 'v4-q2')).toBe(true);
    expect(results.some(q => q.id === 'v3-q1')).toBe(false);
  });

  it('allows mixed protocols and filters difficulty for higher grades for Low Levels (A2)', async () => {
    const mockHighQuestions = [
      { id: 'high-hard', difficulty: 5, protocol_version: '4.0', asignatura: 'ingles' },
      { id: 'high-easy', difficulty: 2, protocol_version: '4.0', asignatura: 'ingles' }
    ];
    const mockLowQuestions = [
      { id: 'low-q1', difficulty: 1, protocol_version: '3.1', asignatura: 'ingles' }
    ];

    (packStorage.getQuestionPool as any).mockImplementation((grade: number) => {
      if (grade >= 10) return mockHighQuestions;
      if (grade === 3) return mockLowQuestions;
      return [];
    });

    // A2 = level 3
    const results = await fetchEnglishQuestionsAllGrades(10, false, 3);

    expect(results.some(q => q.id === 'low-q1')).toBe(true);
    expect(results.some(q => q.id === 'high-easy')).toBe(true);
    expect(results.some(q => q.id === 'high-hard')).toBe(false);
  });
});
