import { describe, it, expect } from 'vitest';
import type { AppQuestion } from '../api-service';
import { shuffleQuestionOptions, mulberry32 } from './selection';
import { filterByPeriod } from './filters';

const baseQuestion: AppQuestion = {
  id: 'CO-MAT-11-algebra-001-v1',
  text: 'What is 2+2?',
  options: [
    { id: 'A', text: '4', feedback: 'Correct!' },
    { id: 'B', text: '3' },
    { id: 'C', text: '5' },
    { id: 'D', text: '6' }
  ],
  correctOptionId: 'A',
  category: 'MATEMATICAS :: CO-MAT-11-algebra-001',
  grade: 11,
  difficulty: 3,
  topics: ['algebra']
};

describe('shuffleQuestionOptions', () => {
  it('keeps the same multiset of text and feedback', () => {
    const q = { ...baseQuestion };
    const shuffled = shuffleQuestionOptions(q);

    const origTexts = q.options.map(o => o.text).sort();
    const newTexts = shuffled.options.map(o => o.text).sort();
    expect(newTexts).toEqual(origTexts);

    const origFeedbacks = q.options.map(o => o.feedback).sort();
    const newFeedbacks = shuffled.options.map(o => o.feedback).sort();
    expect(newFeedbacks).toEqual(origFeedbacks);
  });

  it('keeps the correct text correct after remap', () => {
    const q = { ...baseQuestion };
    const shuffled = shuffleQuestionOptions(q);

    const correctOption = shuffled.options.find(o => o.id === shuffled.correctOptionId);
    expect(correctOption).toBeDefined();
    expect(correctOption!.text).toBe('4');
    expect(correctOption!.feedback).toBe('Correct!');
  });

  it('distributes seeded shuffle evenly', () => {
    const q = { ...baseQuestion };
    const rng = mulberry32(12345);

    const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
    for (let i = 0; i < 1000; i++) {
      const shuffled = shuffleQuestionOptions(q, rng);
      counts[shuffled.correctOptionId]++;
    }

    for (const key in counts) {
      const ratio = counts[key] / 1000;
      expect(ratio).toBeGreaterThan(0.20);
      expect(ratio).toBeLessThan(0.30);
    }
  });

  it('does not mutate input object', () => {
    const q = { ...baseQuestion, options: [...baseQuestion.options] };
    const originalQStr = JSON.stringify(q);

    shuffleQuestionOptions(q);

    expect(JSON.stringify(q)).toBe(originalQStr);
  });

  it('remaps correctOptionIds if present', () => {
    const q: AppQuestion = {
      ...baseQuestion,
      correctOptionIds: ['A', 'C']
    };
    const shuffled = shuffleQuestionOptions(q);

    expect(shuffled.correctOptionIds).toBeDefined();
    expect(shuffled.correctOptionIds!.length).toBe(2);

    const correctTexts = shuffled.options
      .filter(o => shuffled.correctOptionIds!.includes(o.id))
      .map(o => o.text)
      .sort();

    expect(correctTexts).toEqual(['4', '5']);
  });
});

describe('filterByPeriod week mapping', () => {
  const qBase: AppQuestion = {
    ...baseQuestion,
    category: 'MATEMATICAS :: algebra'
  };

  it('extracts week from id and maps to period correctly', () => {
    const questions = [
      { ...qBase, id: 'CO-MAT-11-2026-W02-algebra-001' },
      { ...qBase, id: 'CO-MAT-11-2026-W10-algebra-001' },
      { ...qBase, id: 'CO-MAT-11-2026-W11-algebra-001' },
      { ...qBase, id: 'CO-MAT-11-2026-W40-algebra-001' }
    ];

    const p1 = filterByPeriod(questions, { examMode: 'period', period: 1, subject: 'Matemáticas', grade: 11 });
    expect(p1.map(q => q.id)).toEqual([
      'CO-MAT-11-2026-W02-algebra-001',
      'CO-MAT-11-2026-W10-algebra-001'
    ]);

    const p2 = filterByPeriod(questions, { examMode: 'period', period: 2, subject: 'Matemáticas', grade: 11 });
    expect(p2.map(q => q.id)).toEqual([
      'CO-MAT-11-2026-W11-algebra-001'
    ]);

    const p4 = filterByPeriod(questions, { examMode: 'period', period: 4, subject: 'Matemáticas', grade: 11 });
    expect(p4.map(q => q.id)).toEqual([
      'CO-MAT-11-2026-W40-algebra-001'
    ]);
  });
});
