import { describe, it, expect } from 'vitest';
import { evaluateChoice, isCorrectOption, withAds, adIntervalFor } from './practice';

const question = {
  correctOptionId: 'B',
  options: [
    { id: 'A', text: 'uno', feedback: 'Incorrecto. Confundiste el signo.' },
    { id: 'B', text: 'dos', feedback: 'Correcto. 1 + 1 = 2.' },
  ],
};

describe('practice helpers', () => {
  it('evaluates a wrong and a right choice with the chosen feedback', () => {
    expect(evaluateChoice(question, 'A')).toEqual({
      isCorrect: false,
      correctOptionId: 'B',
      feedback: 'Incorrecto. Confundiste el signo.',
    });
    expect(evaluateChoice(question, 'b').isCorrect).toBe(true);
  });

  it('accepts multi-answer correctOptionIds', () => {
    expect(isCorrectOption({ correctOptionId: 'A', correctOptionIds: ['A', 'C'] }, 'C')).toBe(true);
    expect(isCorrectOption({ correctOptionId: 'A' }, '')).toBe(false);
  });

  it('never places more than 1 ad per 12 cards on mobile', () => {
    const items = Array.from({ length: 36 }, (_, i) => ({ id: `q${i}` }));
    const mobile = withAds(items, adIntervalFor(true));
    expect(mobile.filter((i) => i.type === 'ad')).toHaveLength(3);
    expect(mobile.findIndex((i) => i.type === 'ad')).toBe(12);
    const desktop = withAds(items, adIntervalFor(false));
    expect(desktop.filter((i) => i.type === 'ad')).toHaveLength(6);
  });
});
