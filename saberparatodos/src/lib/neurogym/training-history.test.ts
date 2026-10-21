import { describe, it, expect } from 'vitest';
import {
  MAX_HISTORY_RECORDS,
  TRAINING_HISTORY_KEY,
  buildSessionRecord,
  clearTrainingHistory,
  computeStreak,
  daysBetween,
  getGameLevel,
  getSkillTrend,
  loadLevels,
  loadTrainingHistory,
  saveGameLevel,
  saveTrainingSession,
  sparklinePoints,
  toLocalDateStr,
  toSessionSummary,
  type StorageLike
} from './training-history';
import { scoreTrials } from './training-catalog';

function memoryStorage(): StorageLike & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (k) => (data.has(k) ? data.get(k)! : null),
    setItem: (k, v) => void data.set(k, v),
    removeItem: (k) => void data.delete(k)
  };
}

const throwingStorage: StorageLike = {
  getItem: () => {
    throw new Error('SecurityError');
  },
  setItem: () => {
    throw new Error('QuotaExceededError');
  },
  removeItem: () => {
    throw new Error('SecurityError');
  }
};

const day = (d: number, h = 12) => new Date(2026, 9, d, h).getTime();

function rec(gameId: 'stroop' | 'corsi', ts: number, accuracy: number) {
  const score = scoreTrials(
    Array.from({ length: 10 }, (_, i) => ({ correct: i < accuracy * 10, rtMs: 500, level: 2, deadlineMs: 2000 }))
  );
  return buildSessionRecord(gameId, score, 2, 2, ts);
}

describe('NeuroGym training history (localStorage)', () => {
  it('guarda y carga sesiones del más reciente al más antiguo', () => {
    const st = memoryStorage();
    saveTrainingSession(rec('stroop', day(1), 0.7), st);
    saveTrainingSession(rec('corsi', day(3), 0.9), st);
    saveTrainingSession(rec('stroop', day(2), 0.8), st);
    const h = loadTrainingHistory(st);
    expect(h.map((r) => r.dateStr)).toEqual(['2026-10-03', '2026-10-02', '2026-10-01']);
    expect(h[0].skill).toBe('memoria_trabajo');
  });

  it('limita el historial a MAX_HISTORY_RECORDS', () => {
    const st = memoryStorage();
    for (let i = 0; i < MAX_HISTORY_RECORDS + 5; i++) saveTrainingSession(rec('stroop', day(1) + i * 1000, 0.8), st);
    expect(loadTrainingHistory(st).length).toBe(MAX_HISTORY_RECORDS);
  });

  it('tolera almacenamiento corrupto, ausente o que lanza excepciones', () => {
    const st = memoryStorage();
    st.setItem(TRAINING_HISTORY_KEY, '{no-json');
    expect(loadTrainingHistory(st)).toEqual([]);
    st.setItem(TRAINING_HISTORY_KEY, JSON.stringify([{ foo: 1 }, null]));
    expect(loadTrainingHistory(st)).toEqual([]);
    expect(loadTrainingHistory(null)).toEqual([]);
    expect(loadTrainingHistory(throwingStorage)).toEqual([]);
    expect(() => saveTrainingSession(rec('stroop', day(1), 1), throwingStorage)).not.toThrow();
    expect(() => saveGameLevel('stroop', { level: 2, correctStreak: 0 }, throwingStorage)).not.toThrow();
    expect(() => clearTrainingHistory(throwingStorage)).not.toThrow();
  });

  it('persiste el nivel de la escalera por juego y lo acota', () => {
    const st = memoryStorage();
    expect(getGameLevel('corsi', loadLevels(st))).toEqual({ level: 1, correctStreak: 0 });
    saveGameLevel('corsi', { level: 4, correctStreak: 1 }, st);
    expect(getGameLevel('corsi', loadLevels(st))).toEqual({ level: 4, correctStreak: 1 });
    saveGameLevel('trail', { level: 40, correctStreak: 0 }, st);
    expect(getGameLevel('trail', loadLevels(st)).level).toBe(2);
  });

  it('el resumen de sesión solo expone agregados', () => {
    const s = toSessionSummary(rec('stroop', day(5), 0.8));
    expect(Object.keys(s).sort()).toEqual(
      ['accuracy', 'completedAt', 'correct', 'endLevel', 'gameId', 'gameName', 'index', 'meanRtMs', 'points', 'skill', 'startLevel', 'total'].sort()
    );
  });
});

describe('NeuroGym racha y tendencias', () => {
  it('daysBetween y toLocalDateStr', () => {
    expect(toLocalDateStr(day(21))).toBe('2026-10-21');
    expect(daysBetween('2026-10-30', '2026-11-02')).toBe(3);
  });

  it('computeStreak cuenta días consecutivos que terminan hoy o ayer', () => {
    expect(computeStreak([], '2026-10-21')).toBe(0);
    expect(computeStreak(['2026-10-21', '2026-10-20', '2026-10-20', '2026-10-19'], '2026-10-21')).toBe(3);
    expect(computeStreak(['2026-10-20', '2026-10-19'], '2026-10-21')).toBe(2);
    expect(computeStreak(['2026-10-18', '2026-10-17'], '2026-10-21')).toBe(0);
    expect(computeStreak(['2026-10-21', '2026-10-19'], '2026-10-21')).toBe(1);
  });

  it('getSkillTrend ordena cronológicamente y calcula la diferencia', () => {
    const records = [rec('stroop', day(3), 1), rec('stroop', day(1), 0.5), rec('stroop', day(2), 0.7), rec('corsi', day(2), 1)];
    const t = getSkillTrend(records, 'atencion');
    expect(t.sessions).toBe(3);
    expect(t.points).toEqual([records[1].index, records[2].index, records[0].index]);
    expect(t.latest).toBe(records[0].index);
    expect(t.delta).toBeGreaterThan(0);
    expect(getSkillTrend(records, 'flexibilidad')).toMatchObject({ points: [], latest: null, delta: 0, sessions: 0 });
  });

  it('sparklinePoints mapea 0..100 al alto del SVG', () => {
    expect(sparklinePoints([], 100, 20)).toBe('');
    expect(sparklinePoints([50], 100, 20)).toBe('50,10');
    expect(sparklinePoints([0, 100], 100, 20, 0)).toBe('0,20 100,0');
  });
});
