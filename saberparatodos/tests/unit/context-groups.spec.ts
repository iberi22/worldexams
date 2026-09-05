import { describe, it, expect } from 'vitest';
import {
  groupQuestionsByContext,
  shouldShowInlineBadge,
  isLongContextText,
  type QuestionContextItem
} from '../../src/lib/context-groups';

describe('context-groups.ts - Context Grouping Logic', () => {
  it('identifies long context text correctly using threshold rule', () => {
    expect(isLongContextText('Short text')).toBe(false);
    expect(isLongContextText('A'.repeat(140))).toBe(true);
    expect(isLongContextText('Short text\nwith newline')).toBe(true);
    expect(isLongContextText('')).toBe(false);
  });

  it('groups 3 consecutive questions with long context into a single long group', () => {
    const longPassage = 'Un extenso pasaje de lectura sobre la historia del arte contemporáneo en Latinoamérica. '.repeat(3);
    expect(longPassage.length).toBeGreaterThanOrEqual(140);

    const questions: QuestionContextItem[] = [
      { id: 'q1', context: longPassage },
      { id: 'q2', context: longPassage },
      { id: 'q3', context: longPassage }
    ];

    const groups = groupQuestionsByContext(questions);

    expect(groups).toHaveLength(1);
    expect(groups[0].context).toBe(longPassage.trim());
    expect(groups[0].questionIds).toEqual(['q1', 'q2', 'q3']);
    expect(groups[0].isLong).toBe(true);
    expect(groups[0].startIndex).toBe(0);
  });

  it('handles 20 consecutive questions with short repeated context and shows inline badge only for the first', () => {
    const shortText = 'Escenario de prueba.';
    expect(shortText.length).toBeLessThan(140);

    const questions: QuestionContextItem[] = Array.from({ length: 20 }, (_, i) => ({
      id: `q${i + 1}`,
      context: shortText
    }));

    const groups = groupQuestionsByContext(questions);

    expect(groups).toHaveLength(1);
    expect(groups[0].questionIds).toHaveLength(20);
    expect(groups[0].isLong).toBe(false);

    // Badge should show ONLY on the first question (index 0 / startIndex)
    expect(shouldShowInlineBadge(groups[0], 0)).toBe(true);

    for (let i = 1; i < 20; i++) {
      expect(shouldShowInlineBadge(groups[0], i)).toBe(false);
    }
  });

  it('creates separate groups for different consecutive contexts', () => {
    const questions: QuestionContextItem[] = [
      { id: 1, context: 'Contexto A' },
      { id: 2, context: 'Contexto A' },
      { id: 3, context: 'Contexto B' },
      { id: 4, context: 'Contexto C' }
    ];

    const groups = groupQuestionsByContext(questions);

    expect(groups).toHaveLength(3);

    expect(groups[0].questionIds).toEqual([1, 2]);
    expect(groups[0].startIndex).toBe(0);

    expect(groups[1].questionIds).toEqual([3]);
    expect(groups[1].startIndex).toBe(2);

    expect(groups[2].questionIds).toEqual([4]);
    expect(groups[2].startIndex).toBe(3);
  });

  it('treats empty or whitespace-only contexts as separate individual empty groups', () => {
    const questions: QuestionContextItem[] = [
      { id: 'q1', context: '' },
      { id: 'q2', context: '   ' },
      { id: 'q3', context: undefined },
      { id: 'q4', context: 'Texto válido' }
    ];

    const groups = groupQuestionsByContext(questions);

    expect(groups).toHaveLength(4);
    expect(groups[0].questionIds).toEqual(['q1']);
    expect(groups[1].questionIds).toEqual(['q2']);
    expect(groups[2].questionIds).toEqual(['q3']);
    expect(groups[3].questionIds).toEqual(['q4']);

    expect(shouldShowInlineBadge(groups[0], 0)).toBe(false);
    expect(shouldShowInlineBadge(groups[1], 1)).toBe(false);
    expect(shouldShowInlineBadge(groups[2], 2)).toBe(false);
    expect(shouldShowInlineBadge(groups[3], 3)).toBe(true);
  });

  it('breaks group boundaries when repeated contexts are non-consecutive', () => {
    const questions: QuestionContextItem[] = [
      { id: 1, context: 'Lectura Compartida' },
      { id: 2, context: 'Lectura Compartida' },
      { id: 3, context: 'Otra Lectura Distinta' },
      { id: 4, context: 'Lectura Compartida' }
    ];

    const groups = groupQuestionsByContext(questions);

    expect(groups).toHaveLength(3);
    expect(groups[0].questionIds).toEqual([1, 2]);
    expect(groups[0].startIndex).toBe(0);

    expect(groups[1].questionIds).toEqual([3]);
    expect(groups[1].startIndex).toBe(2);

    expect(groups[2].questionIds).toEqual([4]);
    expect(groups[2].startIndex).toBe(3);
  });
});
