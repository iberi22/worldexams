import { describe, it, expect } from 'vitest';
import {
  groupQuestionsByContext,
  shouldShowInlineBadge,
  isLongContextText,
  getSharedContextTitle,
  getEffectiveContextFor,
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

  it('generates range title "Lectura compartida · preguntas X–Y" only when long and >= 2 questions', () => {
    const longPassage = 'A'.repeat(150);
    const questions: QuestionContextItem[] = [
      { id: 'q5', context: longPassage },
      { id: 'q6', context: longPassage },
      { id: 'q7', context: longPassage }
    ];
    // Notice startIndex for q5 is 4 if offset, but groupQuestionsByContext sets startIndex to 0 in this sub-array
    const groups = groupQuestionsByContext(questions);
    expect(getSharedContextTitle(groups[0])).toBe('Lectura compartida · preguntas 1–3');
  });

  it('generates generic title "Contexto de Lectura" for single-question long group or short groups', () => {
    const longPassage = 'B'.repeat(150);
    const questionsLongSingle: QuestionContextItem[] = [{ id: 'q1', context: longPassage }];
    const groupLongSingle = groupQuestionsByContext(questionsLongSingle)[0];

    expect(getSharedContextTitle(groupLongSingle)).toBe('Contexto de Lectura');

    const questionsShortMulti: QuestionContextItem[] = [
      { id: 'q1', context: 'Texto corto' },
      { id: 'q2', context: 'Texto corto' }
    ];
    const groupShortMulti = groupQuestionsByContext(questionsShortMulti)[0];

    expect(getSharedContextTitle(groupShortMulti)).toBe('Contexto de Lectura');
    expect(getSharedContextTitle(null)).toBe('Contexto de Lectura');
    expect(getSharedContextTitle(undefined)).toBe('Contexto de Lectura');
  });

  it('suppresses effective context for non-first short questions in a group', () => {
    const shortText = 'Breve fragmento.';
    const questions: QuestionContextItem[] = [
      { id: 'q10', context: shortText },
      { id: 'q11', context: shortText },
      { id: 'q12', context: shortText }
    ];
    const group = groupQuestionsByContext(questions)[0];

    // First question (index 0) gets the context text for inline badge
    expect(getEffectiveContextFor(group, shortText, 0)).toBe(shortText);

    // Subsequent questions (index 1, 2) get empty string to avoid redundant inline badges
    expect(getEffectiveContextFor(group, shortText, 1)).toBe('');
    expect(getEffectiveContextFor(group, shortText, 2)).toBe('');
  });

  it('always returns effective context for long contexts regardless of question index', () => {
    const longPassage = 'Un texto extenso '.repeat(10);
    const questions: QuestionContextItem[] = [
      { id: 'q1', context: longPassage },
      { id: 'q2', context: longPassage }
    ];
    const group = groupQuestionsByContext(questions)[0];

    expect(getEffectiveContextFor(group, longPassage, 0)).toBe(longPassage);
    expect(getEffectiveContextFor(group, longPassage, 1)).toBe(longPassage);
  });

  it('handles null, undefined, and empty question context gracefully in getEffectiveContextFor', () => {
    const group = { context: 'Test', questionIds: ['q1'], isLong: false, startIndex: 0 };

    expect(getEffectiveContextFor(group, '', 0)).toBe('');
    expect(getEffectiveContextFor(group, undefined, 0)).toBe('');
    expect(getEffectiveContextFor(null, 'Texto', 0)).toBe('');
  });
});
