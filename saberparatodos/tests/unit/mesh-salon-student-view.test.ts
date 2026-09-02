import { describe, it, expect } from 'vitest';
import {
  buildStudentView,
  summarizeOwnResult,
} from '../../src/lib/mesh/salon-student-view';
import type { SalonResult } from '../../src/lib/mesh/salon-shared';

const results: SalonResult[] = [
  { peerId: 's1', score: 90, answers: { q1: 'A', q2: 'B' }, answeredAt: 'x' },
  { peerId: 's2', score: 60, answers: { q1: 'C' }, answeredAt: 'y' },
  { peerId: 's3', score: 75, answers: { q1: 'A' }, answeredAt: 'z' },
];

describe('#1167 Student Private View', () => {
  it('en private el estudiante solo ve su puntaje', () => {
    const view = buildStudentView(results, { peerId: 's2', role: 'student' }, 'private');
    const own = view.rows.find((r) => r.isSelf);
    expect(own?.score).toBe(60);
    expect(view.ownScore).toBe(60);
    expect(view.rows.filter((r) => !r.isSelf && r.score !== null)).toHaveLength(0);
  });

  it('en public todos los puntajes visibles ordenados por score', () => {
    const view = buildStudentView(results, { peerId: 's1', role: 'student' }, 'public');
    expect(view.rows.map((r) => r.score)).toEqual([90, 75, 60]);
    expect(view.ownRank).toBe(1);
  });

  it('host ve todo y rank correcto; anon oculta identidad', () => {
    const hostView = buildStudentView(results, { peerId: 'h', role: 'host' }, 'private');
    expect(hostView.rows.every((r) => r.score !== null)).toBe(true);
    const anonView = buildStudentView(results, { peerId: 's3', role: 'student' }, 'anon');
    expect(anonView.rows[0].alias).toMatch(/^Estudiante \d+$/);
    expect(anonView.ownRank).toBe(2);
  });

  it('summarizeOwnResult etiqueta desempeno', () => {
    expect(summarizeOwnResult(results[0]).gradeLabel).toBe('Destacado');
    expect(summarizeOwnResult(results[1]).gradeLabel).toBe('Suficiente');
    expect(summarizeOwnResult({ peerId: 'x', score: 30, answers: {}, answeredAt: '' }).gradeLabel).toBe('En proceso');
  });
});
