import { describe, it, expect } from 'vitest';
import { sanitizeIncomingQuestions } from './sync';

describe('question sync sanitizer', () => {
  it('keeps only valid questions', () => {
    const valid = {
      id: 'q1',
      text: 'Pregunta',
      options: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }],
      correctOptionId: 'A'
    };
    const invalid = { id: 'q2', text: 'x', options: [], correctOptionId: 'A' };

    const sanitized = sanitizeIncomingQuestions([valid, invalid]);
    expect(sanitized).toHaveLength(1);
    expect(sanitized[0].id).toBe('q1');
  });
});
