import { describe, it, expect } from 'vitest';
import { normalizeSubjectName, subjectsMatch, resolveApiSubject } from './subject';

describe('question subject helpers', () => {
  it('normalizes accents and separators', () => {
    expect(normalizeSubjectName('Lectura_Crítica')).toBe('LECTURA CRITICA');
  });

  it('matches subject names with aliases', () => {
    expect(subjectsMatch('LECTURA CRÍTICA :: CO-LEC', 'lectura-critica')).toBe(true);
    expect(subjectsMatch('MATEMÁTICAS :: CO-MAT', 'lectura-critica')).toBe(false);
  });

  it('resolves english diagnostic to ingles key', () => {
    expect(resolveApiSubject('Inglés Diagnóstico')).toBe('ingles');
  });
});
