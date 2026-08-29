import { describe, it, expect } from 'vitest';
import { normalizeSubjectName, subjectsMatch, resolveApiSubject } from './subject';

describe('question subject helpers', () => {
  it('normalizes accents and separators', () => {
    expect(normalizeSubjectName('Lectura_Crítica')).toBe('LECTURA CRITICA');
  });

  it('matches subject names with aliases', () => {
    expect(subjectsMatch('LECTURA CRÍTICA :: CO-LEC', 'lectura-critica')).toBe(true);
    expect(subjectsMatch('MATEMÁTICAS :: CO-LEC', 'lectura-critica')).toBe(false);
    expect(subjectsMatch('MATEMÁTICAS :: CO-MAT', 'lectura-critica')).toBe(false);
    expect(subjectsMatch(null, 'matematicas')).toBe(false);
    expect(subjectsMatch('anything', null)).toBe(true);
    expect(subjectsMatch('anything', 'Simulacro Completo')).toBe(true);
    expect(subjectsMatch('SOCIALES', 'sociales_y_ciudadanas')).toBe(true);
  });

  it('resolves english diagnostic to ingles key', () => {
    expect(resolveApiSubject('Inglés Diagnóstico')).toBe('ingles');
    expect(resolveApiSubject('ingles-diagnostico')).toBe('ingles');
  });

  it('resolves Simulacro Completo (UI mode, not a subject) to empty string', () => {
    expect(resolveApiSubject('Simulacro Completo')).toBe('');
    expect(resolveApiSubject('simulacro_completo')).toBe('');
    expect(resolveApiSubject('SIMULACRO COMPLETO')).toBe('');
  });

  it('resolves empty/nullish input to empty string', () => {
    expect(resolveApiSubject('')).toBe('');
    expect(resolveApiSubject(null)).toBe('');
    expect(resolveApiSubject(undefined)).toBe('');
  });

  it('normalizes regular subjects to api keys', () => {
    expect(resolveApiSubject('Matemáticas')).toBe('matematicas');
    expect(resolveApiSubject('Lectura Crítica')).toBe('lectura_critica');
    expect(resolveApiSubject('Sociales y Ciudadanas')).toBe('sociales_y_ciudadanas');
  });
});
