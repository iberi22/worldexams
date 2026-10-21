import { describe, it, expect, vi } from 'vitest';
import {
  AgenticNeuroCoach,
  REMOTE_COACH_OPT_IN_KEY,
  consecutiveGoodSessions,
  dailyPlan,
  recommendNext,
  spacedIntervalDays
} from './agentic-neuro-coach';
import { computeCognitiveProfile, type RawCognitiveScores } from './scoring-cognitive';
import { buildSessionRecord, type StorageLike, type TrainingSessionRecord } from './training-history';
import { scoreTrials, type TrainingGameId } from './training-catalog';

function memoryStorage(): StorageLike {
  const data = new Map<string, string>();
  return {
    getItem: (k) => (data.has(k) ? data.get(k)! : null),
    setItem: (k, v) => void data.set(k, v),
    removeItem: (k) => void data.delete(k)
  };
}

const day = (d: number, h = 12) => new Date(2026, 9, d, h).getTime();

function rec(gameId: TrainingGameId, d: number, accuracy: number, level = 1): TrainingSessionRecord {
  const n = 10;
  const score = scoreTrials(
    Array.from({ length: n }, (_, i) => ({ correct: i < Math.round(accuracy * n), rtMs: 500, level, deadlineMs: 2000 }))
  );
  return buildSessionRecord(gameId, score, level, level, day(d));
}

describe('NeuroGym offline coach — repetición espaciada', () => {
  it('intervalos 1 → 2 → 4 → 7 → 14 días según sesiones buenas consecutivas', () => {
    expect([0, 1, 2, 3, 4, 9].map(spacedIntervalDays)).toEqual([1, 2, 4, 7, 14, 14]);
  });

  it('una sesión floja reinicia la caja', () => {
    const newestFirst = [rec('stroop', 5, 0.9), rec('stroop', 4, 0.6), rec('stroop', 3, 1)];
    expect(consecutiveGoodSessions(newestFirst)).toBe(1);
    expect(consecutiveGoodSessions([rec('stroop', 5, 0.5)])).toBe(0);
  });
});

describe('NeuroGym offline coach — recomendaciones deterministas', () => {
  it('sin historial recomienda todas las habilidades como nuevas en orden canónico', () => {
    const recs = recommendNext([], {}, day(21));
    expect(recs.map((r) => r.skill)).toEqual([
      'atencion',
      'memoria_trabajo',
      'velocidad_procesamiento',
      'flexibilidad',
      'razonamiento'
    ]);
    expect(recs.every((r) => r.reason === 'nueva' && r.level === 1)).toBe(true);
  });

  it('prioriza la habilidad más débil entre las que tocan hoy', () => {
    const history = [
      rec('stroop', 19, 0.6), // atención floja, intervalo 1 día → pendiente
      rec('corsi', 19, 0.5), // memoria aún más floja → pendiente
      rec('reaction', 20, 1), // velocidad buena, intervalo 2 → mantenimiento
      rec('cardsort', 20, 1),
      rec('arithmetic', 20, 1)
    ];
    const recs = recommendNext(history, {}, day(21));
    expect(recs[0].skill).toBe('memoria_trabajo');
    expect(recs[0].reason).toBe('pendiente');
    expect(recs[1].skill).toBe('atencion');
    expect(recs.slice(2).every((r) => r.reason === 'mantenimiento')).toBe(true);
    expect(recs[2].dueInDays).toBe(1);
  });

  it('una habilidad nunca entrenada va antes que un repaso pendiente', () => {
    const recs = recommendNext([rec('stroop', 10, 0.4)], {}, day(21));
    expect(recs[0].reason).toBe('nueva');
    expect(recs.find((r) => r.skill === 'atencion')!.reason).toBe('pendiente');
  });

  it('elige el juego menos reciente de la habilidad y su nivel de escalera', () => {
    const history = [rec('corsi', 20, 0.9)];
    const recs = recommendNext(history, { nback: { level: 3, correctStreak: 0 } }, day(21));
    const wm = recs.find((r) => r.skill === 'memoria_trabajo')!;
    expect(wm.gameId).toBe('nback');
    expect(wm.level).toBe(3);
  });

  it('el intervalo crece con sesiones buenas consecutivas', () => {
    const history = [rec('stroop', 17, 0.9), rec('stroop', 15, 0.9), rec('stroop', 13, 0.9)];
    const att = recommendNext(history, {}, day(21)).find((r) => r.skill === 'atencion')!;
    expect(att.intervalDays).toBe(7);
    expect(att.dueInDays).toBe(3);
    expect(att.reason).toBe('mantenimiento');
  });

  it('misma entrada → misma salida (independiente del orden del historial)', () => {
    const h = [rec('stroop', 19, 0.6), rec('corsi', 18, 0.7), rec('trail', 20, 0.9)];
    const a = recommendNext(h, {}, day(21));
    const b = recommendNext([...h].reverse(), {}, day(21));
    expect(a).toEqual(b);
    expect(dailyPlan(h, {}, day(21))).toEqual(a.slice(0, 3));
  });

  it('todas las justificaciones están en español y sin promesas de CI', () => {
    const recs = recommendNext([rec('stroop', 19, 0.6), rec('corsi', 20, 1)], {}, day(21));
    for (const r of recs) {
      expect(r.rationale.length).toBeGreaterThan(20);
      expect(r.rationale).not.toMatch(/\bCI\b|\bIQ\b|neuroplasticidad/i);
    }
  });
});

describe('NeuroGym coach — recomendación por perfil de batería', () => {
  it('identifica el dominio más débil', () => {
    const coach = new AgenticNeuroCoach({ storage: null, remoteFlagEnabled: false });
    const raw: RawCognitiveScores = {
      fluidReasoningRaw: { correct: 18, total: 20, avgTimeMs: 8000 },
      workingMemorySpan: { maxNLevel: 1, corsiSpan: 4, accuracy: 0.6 },
      processingSpeed: { avgReactionMs: 240, stroopInterferenceMs: 40, errorRate: 0.03 },
      motorCoordination: { tapsPer10s: 60, goNoGoAccuracy: 0.95, motorJitterMs: 12 },
      analyticalFlexibility: { ruleSwitchesSuccess: 12, totalRuleTrials: 14 },
      verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
      quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
    };
    const advice = coach.synthesizeWorkoutPlan(computeCognitiveProfile(raw));
    expect(advice.focusDomain).toBe('Memoria de Trabajo');
    expect(advice.recommendedGame).toContain('Dual N-Back');
    expect(advice.confidenceScore).toBeGreaterThan(0.5);
    expect(advice.confidenceScore).toBeLessThanOrEqual(1);
    expect(advice.rationale).not.toMatch(/neuroplasticidad/i);
  });
});

describe('NeuroGym coach — backend remoto opcional (BR-03)', () => {
  const okFetch = () =>
    vi.fn(async () => ({ ok: true, json: async () => ({ results: [{ content: 'estrategia' }] }) }) as unknown as Response);

  it('está apagado por defecto: sin flag no hay ninguna petición', async () => {
    const fetchImpl = okFetch();
    const storage = memoryStorage();
    storage.setItem(REMOTE_COACH_OPT_IN_KEY, 'true');
    const coach = new AgenticNeuroCoach({ storage, fetchImpl, remoteFlagEnabled: false });
    expect(await coach.consultXavierContext('Memoria de Trabajo')).toBeNull();
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('el flag de build está OFF si no se define PUBLIC_NEUROGYM_REMOTE_COACH', () => {
    const coach = new AgenticNeuroCoach({ storage: memoryStorage() });
    expect(coach.isRemoteAvailable()).toBe(false);
  });

  it('con flag pero sin consentimiento explícito tampoco envía nada', async () => {
    const fetchImpl = okFetch();
    const coach = new AgenticNeuroCoach({ storage: memoryStorage(), fetchImpl, remoteFlagEnabled: true });
    expect(coach.canUseRemote()).toBe(false);
    expect(await coach.consultXavierContext('Atención')).toBeNull();
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('con flag y consentimiento solo envía el nombre del dominio', async () => {
    const fetchImpl = okFetch();
    const coach = new AgenticNeuroCoach({ storage: memoryStorage(), fetchImpl, remoteFlagEnabled: true });
    coach.setRemoteOptIn(true);
    expect(await coach.consultXavierContext('Atención')).toBe('estrategia');
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const body = JSON.parse((fetchImpl.mock.calls[0] as any)[1].body);
    expect(Object.keys(body).sort()).toEqual(['limit', 'query']);
    expect(body.query).toContain('Atención');
    coach.setRemoteOptIn(false);
    expect(coach.canUseRemote()).toBe(false);
  });

  it('un fallo de red devuelve null sin lanzar', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error('offline');
    });
    const coach = new AgenticNeuroCoach({ storage: memoryStorage(), fetchImpl: fetchImpl as any, remoteFlagEnabled: true });
    coach.setRemoteOptIn(true);
    await expect(coach.consultXavierContext('Atención')).resolves.toBeNull();
  });
});
