import { describe, it, expect } from 'vitest';
import { clampLevel, createStaircase, runStaircase, stepStaircase } from './adaptive-staircase';

const bounds = { minLevel: 1, maxLevel: 5 };

describe('NeuroGym adaptive staircase (2-up / 1-down)', () => {
  it('sube un nivel solo tras dos aciertos consecutivos', () => {
    const s0 = createStaircase(2, bounds);
    const s1 = stepStaircase(s0, true, bounds);
    expect(s1).toEqual({ level: 2, correctStreak: 1 });
    const s2 = stepStaircase(s1, true, bounds);
    expect(s2).toEqual({ level: 3, correctStreak: 0 });
  });

  it('baja un nivel con un solo error y reinicia la racha', () => {
    const s = stepStaircase({ level: 3, correctStreak: 1 }, false, bounds);
    expect(s).toEqual({ level: 2, correctStreak: 0 });
  });

  it('respeta los límites mínimo y máximo', () => {
    expect(stepStaircase({ level: 1, correctStreak: 0 }, false, bounds).level).toBe(1);
    expect(runStaircase(createStaircase(5, bounds), [true, true, true, true], bounds).level).toBe(5);
    expect(clampLevel(99, bounds)).toBe(5);
    expect(clampLevel(Number.NaN, bounds)).toBe(1);
  });

  it('es determinista para la misma secuencia de respuestas', () => {
    const seq = [true, true, true, false, true, true, true, true, false];
    const a = runStaircase(createStaircase(1, bounds), seq, bounds);
    const b = runStaircase(createStaircase(1, bounds), seq, bounds);
    expect(a).toEqual(b);
    // 1 →(TT)2 →(T F)1 →(TT)2 →(TT)3 →(F)2
    expect(a).toEqual({ level: 2, correctStreak: 0 });
  });

  it('no muta el estado de entrada', () => {
    const s0 = { level: 2, correctStreak: 1 };
    stepStaircase(s0, true, bounds);
    expect(s0).toEqual({ level: 2, correctStreak: 1 });
  });
});
