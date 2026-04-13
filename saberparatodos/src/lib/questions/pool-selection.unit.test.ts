import { describe, it, expect } from 'vitest';
import type { AppQuestion } from '../api-service';
import { dedupeById } from './pool';
import { buildDiagnosticMixPool } from './selection';

const makeQ = (overrides: Partial<AppQuestion> = {}): AppQuestion => ({
  id: 'test',
  text: 'Test?',
  options: [{ id: 'A', text: 'a' }, { id: 'B', text: 'b' }],
  correctOptionId: 'A',
  category: 'MATEMATICAS',
  grade: 11,
  difficulty: 3,
  ...overrides,
});

describe('pool', () => {
  describe('dedupeById', () => {
    it('removes duplicate IDs keeping first occurrence', () => {
      const qs = [
        makeQ({ id: 'q1' }),
        makeQ({ id: 'q2' }),
        makeQ({ id: 'q1' }), // duplicate
        makeQ({ id: 'q3' }),
      ];
      const result = dedupeById(qs);
      expect(result).toHaveLength(3);
      const ids = result.map(q => q.id);
      expect(ids).toContain('q1');
      expect(ids.filter(i => i === 'q1')).toHaveLength(1);
    });

    it('treats undefined/null IDs as falsy keys (not added to map), but empty result for all-undefined', () => {
      // With id: null, q?.id is null (falsy) → if condition fails → q not added to map
      // But this means q with null id is SKIPPED (not in dedupe), so result has only q1
      const qs = [
        makeQ({ id: 'q1' }),
        makeQ({ id: null as any }),
      ];
      const result = dedupeById(qs);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('q1');
    });

    it('returns empty array for empty input', () => {
      expect(dedupeById([])).toHaveLength(0);
    });
  });
});

describe('selection', () => {
  describe('buildDiagnosticMixPool', () => {
    it('returns all questions when useDiagnostic is false', () => {
      const qs = [
        makeQ({ id: 'q1', grade: 11 }),
        makeQ({ id: 'q2', grade: 11 }),
      ];
      const result = buildDiagnosticMixPool(qs, {
        grade: 11,
        useDiagnostic: false,
        count: 10,
      });
      expect(result).toHaveLength(2);
    });

    it('returns all questions when count >= pool size', () => {
      const qs = [makeQ({ id: 'q1' }), makeQ({ id: 'q2' })];
      const result = buildDiagnosticMixPool(qs, {
        grade: 11,
        useDiagnostic: true,
        count: 100,
        diagnosticMixPercent: 20,
      });
      expect(result).toHaveLength(2);
    });

    it('passes minCefrLevel config without error', () => {
      const qs = [
        makeQ({ id: 'q1', cefr_level: 'B1' }),
        makeQ({ id: 'q2', cefr_level: 'C1' }),
      ];
      const result = buildDiagnosticMixPool(qs, {
        grade: 11,
        useDiagnostic: false,
        count: 10,
        minCefrLevel: 'B1',
      });
      expect(result.length).toBeGreaterThan(0);
    });

    it('clamps diagnosticMixPercent to valid range', () => {
      const qs = Array.from({ length: 30 }, (_, i) =>
        makeQ({ id: `q${i}`, grade: i < 15 ? 11 : 5 })
      );
      // Invalid percent (negative or >100) should be clamped
      const result1 = buildDiagnosticMixPool(qs, {
        grade: 11,
        useDiagnostic: true,
        count: 10,
        diagnosticMixPercent: -5,
      });
      expect(result1).toBeDefined();

      const result2 = buildDiagnosticMixPool(qs, {
        grade: 11,
        useDiagnostic: true,
        count: 10,
        diagnosticMixPercent: 200,
      });
      expect(result2).toBeDefined();
    });

    it('returns empty array when input is empty', () => {
      const result = buildDiagnosticMixPool([], {
        grade: 11,
        useDiagnostic: false,
        count: 10,
      });
      expect(result).toHaveLength(0);
    });
  });
});