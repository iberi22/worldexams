import { describe, it, expect, beforeEach } from 'vitest';
import {
  applyAttempt,
  expectedScore,
  initialElo,
  gradeOffset,
  questionEloFor,
  selectMatchmaking,
  ELO_MAX,
} from './elo';
import { tierFor, xpToNextTier, awardXp } from './xp';
import { loadState, saveState, recordDaily, addActionXp, recordAttempt, GAME_STORAGE_KEY } from './store';

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
    expect(initialElo(11)).toBe(1800);
    expect(initialElo(3)).toBe(500);
  });

  it('expectedScore 50% en igualdad', () => {
    expect(expectedScore(1200, 1200)).toBeCloseTo(0.5, 5);
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
});
