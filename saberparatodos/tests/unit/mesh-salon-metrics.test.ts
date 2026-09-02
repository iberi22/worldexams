import { describe, it, expect } from 'vitest';
import {
  computeRoomMetrics,
  mean,
  median,
  stdev,
} from '../../src/lib/mesh/salon-metrics';
import type { SalonResult } from '../../src/lib/mesh/salon-shared';

const answerKey = { q1: 'A', q2: 'B' } as const;

const results: SalonResult[] = [
  { peerId: 's1', score: 100, answers: { q1: 'A', q2: 'B' }, answeredAt: 'x' },
  { peerId: 's2', score: 50, answers: { q1: 'B', q2: 'B' }, answeredAt: 'y' },
  { peerId: 's3', score: 50, answers: { q1: 'C', q2: 'A' }, answeredAt: 'z' },
];

describe('#1168 Group Metrics Engine', () => {
  it('mediana impar/par y desvio estandar muestral', () => {
    expect(median([5, 1, 3])).toBe(3);
    expect(median([4, 1, 2, 3])).toBe(2.5);
    expect(mean([])).toBe(0);
    expect(stdev([7])).toBe(0);
    expect(stdev([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2.138, 3);
  });

  it('metricas agregadas del salon', () => {
    const m = computeRoomMetrics(results, answerKey);
    expect(m.n).toBe(3);
    expect(m.mean).toBeCloseTo(66.67, 2);
    expect(m.median).toBe(50);
    expect(m.min).toBe(50);
    expect(m.max).toBe(100);
  });

  it('analisis de distractores por pregunta', () => {
    const m = computeRoomMetrics(results, answerKey);
    const q1 = m.questions.find((q) => q.questionId === 'q1')!;
    expect(q1.answeredBy).toBe(3);
    expect(q1.correctCount).toBe(1);
    expect(q1.successRate).toBeCloseTo(1 / 3, 5);
    expect(q1.optionCounts).toEqual({ A: 1, B: 1, C: 1, D: 0 });
    expect(q1.distractorRate).toBeCloseTo(2 / 3, 5);
    expect(m.hardest[0]).toBe('q1'); // q1 exito 1/3 < q2 exito 2/3
  });

  it('salon vacio no rompe', () => {
    const empty = computeRoomMetrics([], { q1: 'A' });
    expect(empty.n).toBe(0);
    expect(empty.mean).toBe(0);
    expect(empty.hardest).toEqual(['q1']); // sin datos, exito 0% => entra a hardest
    expect(computeRoomMetrics([], {}).hardest).toEqual([]);
  });
});
