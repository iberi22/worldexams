import { describe, it, expect } from 'vitest';
import {
  POOL_ACTIVATION_THRESHOLD,
  countScopedPool,
  getPoolActivation,
  mapPeriodoToPeriod,
} from '../../src/lib/questions/pool-activation';
import type { AppQuestion } from '../../src/lib/api-service';

function q(id: string, grade: number, category: string, periodo?: number): AppQuestion {
  return {
    id,
    text: `enunciado ${id}`,
    options: [
      { id: 'A', text: 'a' },
      { id: 'B', text: 'b' },
    ],
    correctOptionId: 'A',
    category,
    grade,
    difficulty: 3,
    ...(periodo !== undefined ? { periodo } : {}),
  };
}

describe('pool-activation (>100 por materia+periodo)', () => {
  it('expone el umbral 100', () => {
    expect(POOL_ACTIVATION_THRESHOLD).toBe(100);
  });

  it('mapea periodo explícito y semana curricular W01–W40', () => {
    expect(mapPeriodoToPeriod(2)).toBe(2);
    expect(mapPeriodoToPeriod(12)).toBe(2); // ceil(12/10)
    expect(mapPeriodoToPeriod(31)).toBe(4); // ceil(31/10)
    expect(mapPeriodoToPeriod(40)).toBe(4);
    expect(mapPeriodoToPeriod(undefined)).toBeNull();
    expect(mapPeriodoToPeriod(0)).toBeNull();
  });

  it('cuenta solo grado+materia del scope', () => {
    const pool = [
      ...Array.from({ length: 120 }, (_, i) => q(`m11-${i}`, 11, 'MATEMATICAS :: b')),
      ...Array.from({ length: 30 }, (_, i) => q(`m9-${i}`, 9, 'MATEMATICAS :: b')),
      ...Array.from({ length: 20 }, (_, i) => q(`i11-${i}`, 11, 'INGLES :: b')),
    ];
    expect(countScopedPool(pool, { grade: 11, subject: 'Matemáticas' })).toBe(120);
    expect(countScopedPool(pool, { grade: 11, subject: 'Inglés' })).toBe(20);
    expect(countScopedPool(pool, { grade: 9, subject: 'Matemáticas' })).toBe(30);
  });

  it('activa con >100 y desactiva con ≤100 (frontera exacta)', () => {
    const at100 = Array.from({ length: 100 }, (_, i) => q(`a-${i}`, 11, 'MATEMATICAS :: b'));
    const at101 = [...at100, q('a-100', 11, 'MATEMATICAS :: b')];
    const scope = { grade: 11, subject: 'Matemáticas' } as const;

    const off = getPoolActivation(at100, scope);
    expect(off.active).toBe(false);
    expect(off.count).toBe(100);

    const on = getPoolActivation(at101, scope);
    expect(on.active).toBe(true);
    expect(on.count).toBe(101);
  });

  it('filtra por periodo cuando se pide (semana W12 => periodo 2)', () => {
    const pool = [
      ...Array.from({ length: 60 }, (_, i) => q(`w12-${i}`, 11, 'MATEMATICAS :: b', 12)),
      ...Array.from({ length: 60 }, (_, i) => q(`w31-${i}`, 11, 'MATEMATICAS :: b', 31)),
      ...Array.from({ length: 60 }, (_, i) => q(`noper-${i}`, 11, 'MATEMATICAS :: b')),
    ];
    // periodo 2: 60 con W12 + 60 sin periodo declarado (no descartables).
    expect(countScopedPool(pool, { grade: 11, subject: 'Matemáticas', period: 2 })).toBe(120);
    const act = getPoolActivation(pool, { grade: 11, subject: 'Matemáticas', period: 2 });
    expect(act.active).toBe(true);
    const act3 = getPoolActivation(pool, { grade: 11, subject: 'Matemáticas', period: 3 });
    expect(act3.active).toBe(false); // 0 con periodo 3 + 60 sin periodo = 60 ≤ 100
  });
});
