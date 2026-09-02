/**
 * Tests unitarios del agregador de analítica de uso (#1035).
 */
import { describe, it, expect } from 'vitest';
import {
  aggregateUsage,
  filterByWindow,
  formatAccuracy,
  formatAvgTime,
  type UsageEvent,
} from '../../src/lib/analytics/usage-aggregator';
// SYNTHETIC DATA FOR DEMO — fixture sintético de demostración
import sampleUsage from '../../src/lib/analytics/__fixtures__/sample-usage.json';

const NOW = new Date('2026-08-15T12:00:00Z');

function evt(overrides: Partial<UsageEvent> & Pick<UsageEvent, 'questionId' | 'bundleId'>): UsageEvent {
  return {
    country: 'CO',
    grade: 7,
    subject: 'lengua',
    usedAt: '2026-08-10T10:00:00Z',
    correct: true,
    timeMs: 20000,
    ...overrides,
  };
}

function repeated(questionId: string, bundleId: string, uses: number, correctFirst: number): UsageEvent[] {
  return Array.from({ length: uses }, (_, i) => evt({ questionId, bundleId, correct: i < correctFirst }));
}

describe('aggregateUsage — estado sin datos', () => {
  it('devuelve hasData=false cuando hay pocos eventos (NUNCA inventar)', () => {
    const events = repeated('b1', 'b1', 5, 3);
    const summary = aggregateUsage(events, { now: NOW });
    expect(summary.hasData).toBe(false);
    expect(summary.topUsed).toEqual([]);
    expect(summary.topMissed).toEqual([]);
    expect(summary.heatmap).toEqual([]);
    expect(summary.bundles).toEqual([]);
  });

  it('hasData=true al superar el umbral mínimo de eventos', () => {
    const events = [...repeated('b1', 'bundle-1', 8, 6), ...repeated('b2', 'bundle-2', 6, 2)];
    const summary = aggregateUsage(events, { now: NOW });
    expect(summary.hasData).toBe(true);
    expect(summary.totalEvents).toBe(14);
  });
});

describe('aggregateUsage — ventana temporal', () => {
  it('filtraByWindow excluye eventos fuera de la ventana de 30 días', () => {
    const events = [
      evt({ questionId: 'old', bundleId: 'b1', usedAt: '2026-06-01T00:00:00Z' }),
      evt({ questionId: 'new', bundleId: 'b1', usedAt: '2026-08-01T00:00:00Z' }),
    ];
    const windowed = filterByWindow(events, 30, NOW);
    expect(windowed.map((e) => e.questionId)).toEqual(['new']);
  });

  it('ignora eventos con usedAt inválido', () => {
    const events = [evt({ questionId: 'x', bundleId: 'b1', usedAt: 'no-es-fecha' })];
    expect(filterByWindow(events, 30, NOW)).toHaveLength(0);
  });
});

describe('aggregateUsage — rankings y métricas', () => {
  const events: UsageEvent[] = [
    ...repeated('popular', 'bundle-a', 12, 10),
    ...repeated('regular', 'bundle-b', 7, 5),
    ...repeated('poca-suerte', 'bundle-b', 6, 1),
    ...repeated('una-sola', 'bundle-c', 1, 0),
  ];
  const summary = aggregateUsage(events, { now: NOW });

  it('topUsed ordena por usos descendente y limita a 10', () => {
    expect(summary.topUsed.length).toBeLessThanOrEqual(10);
    expect(summary.topUsed[0].questionId).toMatch(/^popular/);
    const uses = summary.topUsed.map((q) => q.uses);
    expect([...uses].sort((a, b) => b - a)).toEqual(uses);
  });

  it('topMissed exige usos mínimos y ordena por menor tasa de acierto', () => {
    const ids = summary.topMissed.map((q) => q.questionId);
    expect(ids.some((id) => id.startsWith('una-sola'))).toBe(false);
    expect(ids[0]).toMatch(/^poca-suerte/);
    expect(summary.topMissed[0].accuracy).toBeLessThanOrEqual(0.25);
  });

  it('calcula accuracy y avgTimeMs por pregunta', () => {
    const popular = summary.topUsed.find((q) => q.questionId.startsWith('popular'));
    expect(popular?.uses).toBe(12);
    expect(popular?.accuracy).toBeCloseTo(10 / 12, 5);
    expect(popular?.avgTimeMs).toBe(20000);
  });

  it('agrega rendimiento por bundle incluyendo preguntas únicas', () => {
    const bundleB = summary.bundles.find((b) => b.bundleId === 'bundle-b');
    expect(bundleB?.uses).toBe(13);
    expect(bundleB?.uniqueQuestions).toBe(2);
    expect(summary.bundles[0].bundleId).toBe('bundle-b');
  });

  it('genera celdas de heatmap país × grado con bundles únicos', () => {
    const cell = summary.heatmap.find((c) => c.country === 'CO' && c.grade === 7);
    expect(cell).toBeDefined();
    expect(cell?.uses).toBe(26);
    expect(cell?.bundles).toEqual(['bundle-a', 'bundle-b', 'bundle-c']);
  });
});

describe('format helpers', () => {
  it('formatea porcentaje y tiempo', () => {
    expect(formatAccuracy(0.857)).toBe('86%');
    expect(formatAvgTime(0)).toBe('—');
    expect(formatAvgTime(45000)).toBe('45.0s');
    expect(formatAvgTime(90000)).toBe('1m 30s');
  });
});

describe('fixture sintético sample-usage.json', () => {
  it('está marcado como datos sintéticos y agrega correctamente', () => {
    expect(sampleUsage._meta.synthetic).toBe(true);
    const events = sampleUsage.events as UsageEvent[];
    expect(events.length).toBeGreaterThan(100);
    const lastTs = Math.max(...events.map((e) => Date.parse(e.usedAt)));
    const summary = aggregateUsage(events, { now: new Date(lastTs) });
    expect(summary.hasData).toBe(true);
    expect(summary.topUsed).toHaveLength(10);
    expect(summary.heatmap.length).toBeGreaterThan(0);
    for (const cell of summary.heatmap) {
      expect(cell.uses).toBeGreaterThan(0);
      expect(cell.accuracy).toBeGreaterThanOrEqual(0);
      expect(cell.accuracy).toBeLessThanOrEqual(1);
    }
  });
});
