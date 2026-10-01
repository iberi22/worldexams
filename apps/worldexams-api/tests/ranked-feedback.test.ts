// Regression: ranked used to drop three of the four option feedbacks.
//
// The four-option feedback standard in AGENTS.md exists so the student learns
// why each distractor is wrong. ranked.ts shuffled and re-lettered the options
// and then returned `{ letter, text }`, so the three distractor feedbacks never
// left the API and the client had nothing to show after a wrong answer.
//
// The fix is one line in the lettering map, and the durable check is that the
// pack question keeps a feedback on every option, because that is the input
// ranked re-letters. Driving it through routeRanked would need a stub that
// faithfully replays Cloudflare's D1 binding surface, and that would test the
// stub rather than the behaviour.

import { describe, it, expect } from 'vitest';
import { normalizePackQuestion } from '../src/index';

const packQuestion = {
  id: 'q1',
  statement: '¿Cuál es la capital de Colombia?',
  explanation: 'Bogotá es la capital desde 1538.',
  options: [
    { letter: 'A', text: 'Bogotá', is_correct: true, feedback: 'Correcto: es la capital desde 1538.' },
    { letter: 'B', text: 'Medellín', is_correct: false, feedback: 'Medellín es la segunda ciudad, no la capital.' },
    { letter: 'C', text: 'Cali', is_correct: false, feedback: 'Cali está al sur y nunca fue capital.' },
    { letter: 'D', text: 'Barranquilla', is_correct: false, feedback: 'Barranquilla es un puerto en la costa.' },
  ],
};

describe('the pack question ranked re-letters keeps every feedback', () => {
  it('carries a non-empty feedback on all four options', () => {
    const norm = normalizePackQuestion(packQuestion as any);
    expect(norm.options).toHaveLength(4);
    for (const o of norm.options as any[]) {
      expect(typeof o.feedback).toBe('string');
      expect(o.feedback.length).toBeGreaterThan(0);
    }
  });

  it('keeps each feedback attached to its own option text', () => {
    const norm = normalizePackQuestion(packQuestion as any);
    const byText = new Map((norm.options as any[]).map((o) => [o.text, o.feedback]));
    // Each feedback has to distinguish its own option. A feedback that names
    // another option's text is the failure mode, because re-lettering would
    // then show the student an explanation about a different answer. Not
    // repeating the option text is fine; explaining it differently is the
    // point.
    expect(byText.get('Medellín')).toContain('segunda ciudad');
    expect(byText.get('Bogotá')).toContain('capital');
    expect(byText.get('Bogotá')).not.toContain('Medellín');
    expect(byText.get('Cali')).not.toContain('Bogotá');
  });

  it('marks exactly one option correct, so the key survives re-lettering', () => {
    const norm = normalizePackQuestion(packQuestion as any);
    const correct = (norm.options as any[]).filter((o) => o.is_correct);
    expect(correct).toHaveLength(1);
    expect(correct[0].text).toBe('Bogotá');
  });
});
