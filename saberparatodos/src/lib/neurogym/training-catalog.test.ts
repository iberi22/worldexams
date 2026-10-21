import { describe, it, expect } from 'vitest';
import {
  TRAINING_GAMES,
  SKILL_ORDER,
  blockPassed,
  cardSortSwitchAfter,
  corsiSpanForLevel,
  getTrainingGame,
  performanceIndex,
  rotationTargetFor,
  scoreCardSort,
  scoreNBack,
  scoreTrail,
  scoreTrials,
  stroopSeedFor,
  trialPoints,
  type TrialOutcome
} from './training-catalog';
import { generateStroopTrial } from './secure-items-vault';

describe('NeuroGym training catalog', () => {
  it('cada juego tiene instrucciones en español, práctica, ronda puntuada y rango de niveles', () => {
    expect(TRAINING_GAMES.length).toBe(9);
    for (const g of TRAINING_GAMES) {
      expect(g.instructions.length).toBeGreaterThanOrEqual(2);
      expect(g.controls).toMatch(/tecla|Tab|Espacio|flecha/i);
      expect(g.practiceTrials).toBeGreaterThanOrEqual(1);
      expect(g.scoredTrials).toBeGreaterThanOrEqual(1);
      expect(g.bounds.maxLevel).toBeGreaterThan(g.bounds.minLevel);
      expect(SKILL_ORDER).toContain(g.skill);
      expect(g.levelHint(g.bounds.minLevel).length).toBeGreaterThan(0);
    }
  });

  it('todas las habilidades tienen al menos un juego', () => {
    for (const skill of SKILL_ORDER) {
      expect(TRAINING_GAMES.some((g) => g.skill === skill)).toBe(true);
    }
  });

  it('no promete ganancias de CI en las instrucciones', () => {
    const text = TRAINING_GAMES.flatMap((g) => [g.name, ...g.instructions]).join(' ');
    expect(text).not.toMatch(/\bCI\b|\bIQ\b|coeficiente|inteligencia/i);
  });

  it('los parámetros de nivel endurecen el estímulo', () => {
    const stroop = getTrainingGame('stroop');
    expect(stroop.deadlineMs(1)!).toBeGreaterThan(stroop.deadlineMs(4)!);
    const reaction = getTrainingGame('reaction');
    expect(reaction.deadlineMs(6)).toBe(500);
    expect(corsiSpanForLevel(1)).toBe(3);
    expect(corsiSpanForLevel(7)).toBe(9);
    expect(cardSortSwitchAfter(1)).toBeGreaterThan(cardSortSwitchAfter(4));
    expect(cardSortSwitchAfter(4)).toBe(3);
  });

  it('en Stroop nivel >= 3 todas las semillas son incongruentes', () => {
    for (let i = 0; i < 30; i++) {
      expect(generateStroopTrial(stroopSeedFor(i, 3, 11)).isCongruent).toBe(false);
    }
  });

  it('el objetivo de rotación se aleja con el nivel', () => {
    const easy = rotationTargetFor(0, 1);
    const hard = rotationTargetFor(0, 5);
    expect(hard.x + hard.y).toBeGreaterThan(easy.x + easy.y);
  });
});

describe('NeuroGym scoring — juegos por ensayos (Stroop, reacción, Corsi, cálculo, vocabulario, rotación)', () => {
  it('trialPoints: 100 × nivel más bono de rapidez hasta 50', () => {
    expect(trialPoints({ correct: false, rtMs: 100, level: 3, deadlineMs: 1000 })).toBe(0);
    expect(trialPoints({ correct: true, rtMs: 0, level: 2, deadlineMs: 1000 })).toBe(250);
    expect(trialPoints({ correct: true, rtMs: 500, level: 2, deadlineMs: 1000 })).toBe(225);
    expect(trialPoints({ correct: true, rtMs: 5000, level: 1, deadlineMs: 1000 })).toBe(100);
    expect(trialPoints({ correct: true, rtMs: null, level: 4 })).toBe(400);
  });

  it('scoreTrials calcula precisión, TR medio de aciertos, puntos y nivel pico', () => {
    const trials: TrialOutcome[] = [
      { correct: true, rtMs: 400, level: 1, deadlineMs: 1000 },
      { correct: true, rtMs: 600, level: 1, deadlineMs: 1000 },
      { correct: false, rtMs: 900, level: 2, deadlineMs: 1000 },
      { correct: true, rtMs: 200, level: 1, deadlineMs: 1000 }
    ];
    const s = scoreTrials(trials);
    expect(s.correct).toBe(3);
    expect(s.total).toBe(4);
    expect(s.accuracy).toBe(0.75);
    expect(s.meanRtMs).toBe(400);
    expect(s.points).toBe(130 + 120 + 0 + 140);
    expect(s.peakLevel).toBe(1);
  });

  it('scoreTrials con lista vacía no divide por cero', () => {
    expect(scoreTrials([])).toEqual({ correct: 0, total: 0, accuracy: 0, meanRtMs: null, points: 0, peakLevel: 0 });
  });

  it('Corsi (sin límite de tiempo) puntúa por nivel', () => {
    const s = scoreTrials([
      { correct: true, rtMs: null, level: 3, deadlineMs: null },
      { correct: true, rtMs: null, level: 4, deadlineMs: null }
    ]);
    expect(s.points).toBe(700);
    expect(s.peakLevel).toBe(4);
    expect(s.meanRtMs).toBeNull();
  });
});

describe('NeuroGym scoring — juegos por bloque', () => {
  it('scoreNBack usa F1 combinado y nivel N', () => {
    const pass = scoreNBack({ nLevel: 2, accuracy: 0.9, combinedF1: 0.85, totalOpportunities: 18 });
    expect(pass.points).toBe(1700);
    expect(pass.peakLevel).toBe(2);
    expect(pass.correct).toBe(16);
    const fail = scoreNBack({ nLevel: 3, accuracy: 0.5, combinedF1: 0.4, totalOpportunities: 17 });
    expect(fail.peakLevel).toBe(2);
    expect(blockPassed(fail)).toBe(false);
  });

  it('scoreCardSort premia aciertos y cambios de regla, penaliza perseveración', () => {
    const s = scoreCardSort({ correctTrials: 12, totalTrials: 15, ruleSwitches: 2, perseverativeErrors: 1 }, 2);
    expect(s.accuracy).toBe(0.8);
    expect(s.points).toBe(12 * 40 + 100 - 10);
    expect(blockPassed(s)).toBe(true);
    expect(scoreCardSort({ correctTrials: 0, totalTrials: 15, ruleSwitches: 0, perseverativeErrors: 20 }, 1).points).toBe(0);
  });

  it('scoreTrail combina errores y rapidez', () => {
    const clean = scoreTrail({ totalTimeMs: 15000, errors: 0, nodes: 10 }, 1);
    expect(clean.accuracy).toBe(1);
    expect(clean.points).toBe(200 + 250);
    expect(clean.meanRtMs).toBe(1500);
    const sloppy = scoreTrail({ totalTimeMs: 40000, errors: 5, nodes: 10 }, 2);
    expect(sloppy.accuracy).toBe(0.667);
    expect(sloppy.points).toBe(400 - 125);
    expect(blockPassed(sloppy)).toBe(false);
  });
});

describe('performanceIndex', () => {
  it('combina 60 % precisión y 40 % nivel', () => {
    expect(performanceIndex(1, 1, 5)).toBe(60);
    expect(performanceIndex(1, 5, 5)).toBe(100);
    expect(performanceIndex(0.5, 3, 5)).toBe(50);
    expect(performanceIndex(2, 99, 5)).toBe(100);
  });
});
