import { describe, it, expect } from 'vitest';
import type { AppQuestion } from '../api-service';
import { filterBySubject } from './filters';
import { filterByGradeAndDiagnostic } from './filters';
import { filterByCefrLevel } from './filters';

const makeQuestion = (overrides: Partial<AppQuestion> = {}): AppQuestion => ({
  id: 'test-q',
  text: 'Test question?',
  options: [{ id: 'A', text: 'a' }, { id: 'B', text: 'b' }],
  correctOptionId: 'A',
  category: 'MATEMATICAS',
  grade: 11,
  difficulty: 3,
  topics: ['algebra'],
  periodo: 1,
  ...overrides,
});

describe('filters', () => {
  describe('filterBySubject', () => {
    it('filters by exact category match', () => {
      const qs = [
        makeQuestion({ id: 'q1', category: 'MATEMATICAS' }),
        makeQuestion({ id: 'q2', category: 'INGLES' }),
        makeQuestion({ id: 'q3', category: 'LECTURA CRITICA' }),
      ];
      const filtered = filterBySubject(qs, 'matematicas');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe('q1');
    });

    it('returns all questions when subject is null', () => {
      const qs = [makeQuestion({ id: 'q1' }), makeQuestion({ id: 'q2' })];
      expect(filterBySubject(qs, null)).toHaveLength(2);
    });

    it('matches subject regardless of case', () => {
      const qs = [makeQuestion({ id: 'q1', category: 'Matemáticas' })];
      expect(filterBySubject(qs, 'matematicas')).toHaveLength(1);
    });
  });

  describe('filterByGradeAndDiagnostic', () => {
    it('returns only matching grade when useDiagnostic is false', () => {
      const qs = [
        makeQuestion({ id: 'q1', grade: 11 }),
        makeQuestion({ id: 'q2', grade: 9 }),
        makeQuestion({ id: 'q3', grade: 11 }),
      ];
      const filtered = filterByGradeAndDiagnostic(qs, 11, false, false);
      expect(filtered).toHaveLength(2);
    });

    it('returns grade + lower grades when useDiagnostic is true', () => {
      const qs = [
        makeQuestion({ id: 'q1', grade: 11 }),
        makeQuestion({ id: 'q2', grade: 9 }),
        makeQuestion({ id: 'q3', grade: 5 }),
        makeQuestion({ id: 'q4', grade: 7 }),
      ];
      const filtered = filterByGradeAndDiagnostic(qs, 11, true, false);
      expect(filtered).toHaveLength(4); // 11 + 9 + 7 + 5 (lowerGrades for grade 11)
    });

    it('returns all questions when englishDiagnostic is true', () => {
      const qs = [
        makeQuestion({ id: 'q1', grade: 11 }),
        makeQuestion({ id: 'q2', grade: 5 }),
      ];
      const filtered = filterByGradeAndDiagnostic(qs, 11, false, true);
      expect(filtered).toHaveLength(2);
    });

    it('D2: grade 0 filters strictly (no truthiness leak of all grades)', () => {
      const qs = [
        makeQuestion({ id: 'q1', grade: 11 }),
        makeQuestion({ id: 'q2', grade: 9 }),
        makeQuestion({ id: 'q3', grade: 0 }),
      ];
      // Sin el fix, grade=0 desactivaba el filtro y pasaban las 3.
      const filtered = filterByGradeAndDiagnostic(qs, 0, false, false);
      expect(filtered.map((q) => q.id)).toEqual(['q3']);
    });
  });

  describe('filterByCefrLevel', () => {
    it('returns all questions when no minCefrLevel specified', () => {
      const qs = [makeQuestion({ id: 'q1' }), makeQuestion({ id: 'q2' })];
      expect(filterByCefrLevel(qs, undefined)).toHaveLength(2);
    });

    it('filters out questions below minimum CEFR level', () => {
      const qs = [
        makeQuestion({ id: 'q1', cefr_level: 'A1' }),
        makeQuestion({ id: 'q2', cefr_level: 'B1' }),
        makeQuestion({ id: 'q3', cefr_level: 'C1' }),
      ];
      const filtered = filterByCefrLevel(qs, 'B1');
      expect(filtered.map(q => q.id)).toEqual(['q2', 'q3']);
    });

    it('allows level >= (minIndex-1) per the implementation (not strictly one level)', () => {
      const qs = [
        makeQuestion({ id: 'q1', cefr_level: 'A1' }),
        makeQuestion({ id: 'q2', cefr_level: 'A2+' }),  // index 3, minIndex-1 for B1=4 → 3, so A2+ passes
        makeQuestion({ id: 'q3', cefr_level: 'B1' }),
      ];
      const filtered = filterByCefrLevel(qs, 'B1');
      // minIndex=4 (B1), minIndex-1=3 (A2+). Only A2+ and above pass (A2 index 2 is below 3)
      expect(filtered.map(q => q.id)).toEqual(['q2', 'q3']);
    });

    it('returns questions without cefr_level as valid', () => {
      const qs = [
        makeQuestion({ id: 'q1', cefr_level: 'B2' }),
        makeQuestion({ id: 'q2', cefr_level: undefined as any }),
      ];
      expect(filterByCefrLevel(qs, 'B1')).toHaveLength(2);
    });

    it('correctly uses GRADE_TO_CEFR fallback for grade-only questions', () => {
      const qs = [
        makeQuestion({ id: 'q1', grade: 4, cefr_level: undefined as any }), // maps to A1 (index 0)
        makeQuestion({ id: 'q2', grade: 11, cefr_level: undefined as any }), // maps to B2+ (index 7)
      ];
      const filtered = filterByCefrLevel(qs, 'C1'); // C1 minIndex is 8, allows 1 level below (index >= 7)
      expect(filtered.map(q => q.id)).toEqual(['q2']); // B2+ passes, A1 does not
    });

    it('correctly filters questions for every CEFR level from A1 to C2', () => {
      const levels = ['A1', 'A1+', 'A2', 'A2+', 'B1', 'B1+', 'B2', 'B2+', 'C1', 'C2'];
      const pool = levels.map((lvl) => makeQuestion({ id: `q-${lvl}`, cefr_level: lvl }));

      levels.forEach((targetLevel) => {
        const filtered = filterByCefrLevel(pool, targetLevel);
        const minIndex = levels.indexOf(targetLevel);
        const expectedMinIndex = Math.max(0, minIndex - 1);

        filtered.forEach((q) => {
          const qIndex = levels.indexOf(q.cefr_level || '');
          expect(qIndex).toBeGreaterThanOrEqual(expectedMinIndex);
        });

        expect(filtered.some(q => q.id === `q-${targetLevel}`)).toBe(true);
      });
    });
  });
});
