import { describe, it, expect } from 'vitest';
import type { AppQuestion } from '../api-service';
import { filterByPeriod, filterValidQuestions } from './filters';

const baseQuestion: AppQuestion = {
  id: 'CO-MAT-11-algebra-001-v1',
  text: 'x + 1 = 2',
  options: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }],
  correctOptionId: 'A',
  category: 'MATEMATICAS :: CO-MAT-11-algebra-001',
  grade: 11,
  difficulty: 3,
  topics: ['algebra'],
  periodo: 1
};

describe('question filters', () => {
  it('filters by explicit periodo in period mode', () => {
    const q1 = { ...baseQuestion, id: 'q1', periodo: 1 };
    const q2 = { ...baseQuestion, id: 'q2', periodo: 2 };

    const filtered = filterByPeriod([q1, q2], {
      examMode: 'period',
      period: 1,
      subject: 'Matemáticas',
      grade: 11
    });

    expect(filtered.map((q) => q.id)).toEqual(['q1']);
  });

  it('validates minimum required question shape', () => {
    const invalid = { ...baseQuestion, id: 'bad', options: [] as any[] };
    const result = filterValidQuestions([baseQuestion, invalid], 2);
    expect(result.validQuestions).toHaveLength(1);
    expect(result.invalidCount).toBe(1);
  });
});
