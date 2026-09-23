import { describe, it, expect, beforeEach } from 'vitest';
import {
  applyAttempt,
  expectedScore,
  initialElo,
  gradeOffset,
  questionEloFor,
  selectMatchmaking,
  kForPlayer,
  ELO_MAX,
} from './elo';
import { tierFor, xpToNextTier, awardXp } from './xp';
import { loadState, saveState, recordDaily, addActionXp, recordAttempt, matchPool, GAME_STORAGE_KEY } from './store';

describe('elo (K=32, tope 2200)', () => {
  it('hazaña 1200 vs 1800 correcta sube fuerte (+31)', () => {
    const r = applyAttempt(1200, 1800, true);
    expect(r.playerDelta).toBe(31);
    expect(r.newPlayerElo).toBe(1231);
    expect(r.questionDelta).toBeLessThan(0); // la pregunta "pierde"
  });

  it('fallar la difícil casi no penaliza (-1)', () => {
    const r = applyAttempt(1200, 1800, false);
    expect(r.playerDelta).toBe(-1);
  });

  it('fallar una fácil penaliza fuerte (-29)', () => {
    const r = applyAttempt(1200, 800, false);
    expect(r.playerDelta).toBe(-29);
  });

  it('topa en 2200 y no baja de 100', () => {
    expect(applyAttempt(2190, 800, true).newPlayerElo).toBeLessThanOrEqual(ELO_MAX);
    expect(applyAttempt(100, 2200, false).newPlayerElo).toBeGreaterThanOrEqual(100);
  });

  it('tablas DECISION-ELO-MMR', () => {
    expect(questionEloFor('D3-D4', 6)).toBe(900); // 800 + 100
    expect(questionEloFor('D9-D10', 11)).toBe(2200); // 2000+400 topado
    expect(gradeOffset(4)).toBe(0);
    expect(gradeOffset(6)).toBe(100);
    expect(gradeOffset(8)).toBe(200);
    expect(gradeOffset(10)).toBe(300);
    expect(gradeOffset(11)).toBe(400);
    expect(initialElo(11)).toBe(1800);
    expect(initialElo(10)).toBe(1600);
    expect(initialElo(9)).toBe(1300);
    expect(initialElo(6)).toBe(1000);
    expect(initialElo(3)).toBe(500);
  });

  it('expectedScore 50% en igualdad', () => {
    expect(expectedScore(1200, 1200)).toBeCloseTo(0.5, 5);
  });

  it('K por incertidumbre: 40/32/16', () => {
    expect(kForPlayer(0)).toBe(40);
    expect(kForPlayer(9)).toBe(40);
    expect(kForPlayer(10)).toBe(32);
    expect(kForPlayer(29)).toBe(32);
    expect(kForPlayer(30)).toBe(16);
    // default preserva clásico: hazaña con attemptsPlayed omitido = +31
    expect(applyAttempt(1200, 1800, true).playerDelta).toBe(31);
    // K alto calibra más rápido al inicio
    expect(applyAttempt(1200, 1800, true, { attemptsPlayed: 0 }).playerDelta).toBe(39);
  });

  it('ancla frena el encarecimiento por fallos en racha', () => {
    const sin = applyAttempt(1000, 800, false);
    const con = applyAttempt(1000, 800, false, { questionAnchor: 800 });
    expect(con.newQuestionElo).toBeLessThan(sin.newQuestionElo);
    expect(con.newQuestionElo).toBeGreaterThanOrEqual(800);
  });

  it('novato con piso D1 se recupera (sin espiral de muerte)', () => {
    // Simulación determinista 60q: novato real ~45%, PRNG fijo
    let seed = 42;
    const rand = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    let elo = 1000;
    let q = 800;
    let attempts = 0;
    let min = elo;
    for (let i = 0; i < 60; i++) {
      const exp = 1 / (1 + Math.pow(10, (q - elo) / 400));
      const correct = rand() < 0.45;
      const r = applyAttempt(elo, q, correct, { attemptsPlayed: attempts, questionAnchor: 800 });
      elo = r.newPlayerElo;
      q = r.newQuestionElo;
      attempts++;
      min = Math.min(min, elo);
      void exp;
    }
    expect(min).toBeLessThan(1000); // cae al inicio (calibración honesta)
    expect(elo).toBeGreaterThan(min); // ...pero se recupera, no muere
    expect(q).toBeLessThan(950); // la pregunta no se encareció sin límite
  });
});

describe('matchmaking ventana ±200', () => {
  const pool = [
    { id: 'facil', elo: 800 },
    { id: 'cerca1', elo: 1250 },
    { id: 'cerca2', elo: 1150 },
    { id: 'dificil', elo: 2000 },
  ];

  it('prioriza ventana y rellena con cercanas', () => {
    const picked = selectMatchmaking(pool, 1200, 5);
    expect(picked.map((q) => q.id)).toContain('cerca1');
    expect(picked.map((q) => q.id)).toContain('cerca2');
    expect(picked.length).toBe(4); // pool de 4
  });

  it('respeta exclusiones', () => {
    const picked = selectMatchmaking(pool, 1200, 5, 200, new Set(['cerca1', 'cerca2']));
    expect(picked.map((q) => q.id)).not.toContain('cerca1');
  });
});

describe('xp (ligas semanales)', () => {
  it('tiers por XP', () => {
    expect(tierFor(0)).toBe('Bronce');
    expect(tierFor(500)).toBe('Plata');
    expect(tierFor(1200)).toBe('Oro');
    expect(tierFor(2500)).toBe('Platino');
    expect(tierFor(5000)).toBe('Diamante');
    expect(xpToNextTier(1150)).toBe(50);
    expect(xpToNextTier(6000)).toBe(0);
  });

  it('tabla de acciones + bonus constancia', () => {
    expect(awardXp('respuesta')).toBe(10);
    expect(awardXp('correccion')).toBe(20);
    expect(awardXp('respuesta', 3)).toBe(15); // racha ≥3 días ×1.5
  });
});

describe('store local', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('racha diaria: primer día 1, consecutivo 2, salto resetea', () => {
    const day1 = new Date(2026, 8, 21, 12).getTime(); // lunes
    const s = loadState(11, day1);
    expect(s.elo).toBe(1800);
    recordDaily(s, day1);
    expect(s.streakDays).toBe(1);
    expect(recordDaily(s, day1 + 3600_000)).toBe(0); // mismo día
    recordDaily(s, day1 + 86_400_000);
    expect(s.streakDays).toBe(2);
    recordDaily(s, day1 + 3 * 86_400_000); // salto un día
    expect(s.streakDays).toBe(1);
  });

  it('recordAttempt mueve ambos Elos sin tocar XP', () => {
    const s = loadState(6, Date.now());
    const xpBefore = s.xpWeekly;
    const { playerDelta } = recordAttempt(s, { questionId: 'q1', questionElo: 900, correct: true });
    expect(playerDelta).toBeGreaterThan(0);
    expect(s.questionElo['q1']).toBeLessThan(900);
    expect(s.xpWeekly).toBe(xpBefore);
    saveState(s);
    expect(JSON.parse(localStorage.getItem(GAME_STORAGE_KEY) || '{}').elo).toBe(s.elo);
  });

  it('addActionXp no toca Elo', () => {
    const s = loadState(6, Date.now());
    const eloBefore = s.elo;
    addActionXp(s, 'respuesta');
    expect(s.xpWeekly).toBe(10);
    expect(s.elo).toBe(eloBefore);
  });

  it('loadState recupera ante corrupción o cambio de semana', () => {
    localStorage.setItem(GAME_STORAGE_KEY, 'invalid json');
    const corrupted = loadState(6, Date.now());
    expect(corrupted.elo).toBe(1000);

    localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify({ v: 2, elo: 1500 }));
    const badVersion = loadState(6, Date.now());
    expect(badVersion.elo).toBe(1000);

    const oldWeekState = {
      v: 1,
      elo: 1500,
      xpWeekly: 500,
      weekKey: '2020-W01',
      streakDays: 5,
      lastActiveDay: null,
      questionElo: { q1: 1000 },
      updatedAt: 1000,
    };
    localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(oldWeekState));
    const resetState = loadState(6, Date.now());
    expect(resetState.elo).toBe(1500);
    expect(resetState.xpWeekly).toBe(0);
  });

  it('saveState recorta elo de preguntas mayores a 2000 y matchPool mapea correctamente', () => {
    const s = loadState(6, Date.now());
    for (let i = 0; i < 2005; i++) {
      s.questionElo[`q_${i}`] = 1000 + i;
    }
    saveState(s);
    const saved = JSON.parse(localStorage.getItem(GAME_STORAGE_KEY) || '{}');
    expect(Object.keys(saved.questionElo).length).toBe(2000);
    expect(saved.questionElo['q_2004']).toBe(3004);

    const pool = matchPool(s);
    expect(pool.length).toBe(2000);
    expect(pool[0]).toHaveProperty('id');
    expect(pool[0]).toHaveProperty('elo');
  });
});
