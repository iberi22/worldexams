/**
 * agentic-neuro-coach.ts
 * Coach de NeuroGym que funciona 100 % sin conexión.
 *
 * Estrategia local y determinista sobre el historial guardado en el dispositivo:
 * 1. Habilidad más débil primero (índice de desempeño medio más bajo).
 * 2. Repetición espaciada: tras cada sesión "buena" (precisión >= 80 %) el
 *    intervalo hasta el próximo repaso crece 1 → 2 → 4 → 7 → 14 días; una sesión
 *    floja lo reinicia a 1 día.
 * 3. Dificultad: el nivel sugerido es el de la escalera 2-up/1-down de cada juego.
 *
 * Backend externo (memoria Xavier) — estrictamente opcional (BR-03):
 * - Requiere el flag de compilación PUBLIC_NEUROGYM_REMOTE_COACH="true" (OFF por defecto)
 *   Y el consentimiento explícito del estudiante guardado en el dispositivo.
 * - Aun con ambos, solo envía el nombre genérico del dominio; nunca historial,
 *   puntajes ni identificadores.
 */

import type { FullCognitiveProfile } from './scoring-cognitive';
import {
  gamesForSkill,
  getTrainingGame,
  SKILL_LABELS,
  SKILL_ORDER,
  type NeuroSkill,
  type TrainingGameId
} from './training-catalog';
import {
  daysBetween,
  getGameLevel,
  toLocalDateStr,
  type LevelMap,
  type StorageLike,
  type TrainingSessionRecord
} from './training-history';

// ---------------------------------------------------------------------------
// Recomendaciones offline
// ---------------------------------------------------------------------------

/** Intervalos de repaso en días según sesiones buenas consecutivas (caja de Leitner). */
export const SPACED_INTERVALS_DAYS = [1, 2, 4, 7, 14] as const;
export const GOOD_SESSION_ACCURACY = 0.8;
/** Sesiones recientes que se promedian para estimar la fortaleza de una habilidad. */
export const STRENGTH_WINDOW = 3;

export type RecommendationReason = 'nueva' | 'pendiente' | 'mantenimiento';

export interface CoachRecommendation {
  skill: NeuroSkill;
  skillLabel: string;
  gameId: TrainingGameId;
  gameName: string;
  level: number;
  reason: RecommendationReason;
  /** Días hasta el próximo repaso (<= 0: toca hoy o está atrasado). */
  dueInDays: number;
  intervalDays: number;
  /** Índice medio reciente 0..100 (null si nunca se entrenó). */
  strength: number | null;
  rationale: string;
}

/** Sesiones buenas consecutivas más recientes (historial del más reciente al más antiguo). */
export function consecutiveGoodSessions(skillRecordsNewestFirst: TrainingSessionRecord[]): number {
  let n = 0;
  for (const r of skillRecordsNewestFirst) {
    if (r.accuracy >= GOOD_SESSION_ACCURACY) n++;
    else break;
  }
  return n;
}

/** Intervalo de repaso: 0 buenas → 1 día, 1 → 2, 2 → 4, 3 → 7, 4+ → 14. */
export function spacedIntervalDays(goodStreak: number): number {
  const idx = Math.min(SPACED_INTERVALS_DAYS.length - 1, Math.max(0, goodStreak));
  return SPACED_INTERVALS_DAYS[idx];
}

function pickGame(skill: NeuroSkill, records: TrainingSessionRecord[]): TrainingGameId {
  const games = gamesForSkill(skill);
  // Juego de la habilidad menos reciente (o nunca jugado), desempate por orden del catálogo.
  let best = games[0].id;
  let bestTs = Infinity;
  for (const g of games) {
    const last = records.find((r) => r.gameId === g.id);
    const ts = last ? last.timestamp : -Infinity;
    if (ts < bestTs) {
      bestTs = ts;
      best = g.id;
    }
  }
  return best;
}

/**
 * Lista ordenada (determinista) de recomendaciones, una por habilidad.
 * Orden: habilidades nunca entrenadas → repasos pendientes (más débil primero)
 * → mantenimiento (repaso más próximo primero, luego más débil).
 */
export function recommendNext(
  history: TrainingSessionRecord[],
  levels: LevelMap,
  nowMs: number
): CoachRecommendation[] {
  const today = toLocalDateStr(nowMs);
  const newestFirst = [...history].sort((a, b) => b.timestamp - a.timestamp);

  const recs = SKILL_ORDER.map((skill): CoachRecommendation => {
    const ofSkill = newestFirst.filter((r) => r.skill === skill);
    const gameId = pickGame(skill, ofSkill);
    const def = getTrainingGame(gameId);
    const level = getGameLevel(gameId, levels).level;
    const skillLabel = SKILL_LABELS[skill];

    if (ofSkill.length === 0) {
      return {
        skill,
        skillLabel,
        gameId,
        gameName: def.name,
        level,
        reason: 'nueva',
        dueInDays: 0,
        intervalDays: 0,
        strength: null,
        rationale: `Aún no has entrenado ${skillLabel.toLowerCase()}. Empieza con "${def.name}" en el nivel ${level} para tener una línea base.`
      };
    }

    const recent = ofSkill.slice(0, STRENGTH_WINDOW);
    const strength = Math.round(recent.reduce((s, r) => s + r.index, 0) / recent.length);
    const good = consecutiveGoodSessions(ofSkill);
    const intervalDays = spacedIntervalDays(good);
    const elapsed = daysBetween(ofSkill[0].dateStr, today);
    const dueInDays = intervalDays - elapsed;
    const reason: RecommendationReason = dueInDays <= 0 ? 'pendiente' : 'mantenimiento';

    let rationale: string;
    if (reason === 'pendiente') {
      rationale =
        good === 0
          ? `Tu última sesión de ${skillLabel.toLowerCase()} quedó por debajo del 80 % de aciertos: conviene repasar hoy (índice ${strength}/100).`
          : `Toca repasar ${skillLabel.toLowerCase()}: llevas ${good} ${good === 1 ? 'sesión buena' : 'sesiones buenas'} seguidas y el intervalo de ${intervalDays} ${intervalDays === 1 ? 'día' : 'días'} ya se cumplió.`;
    } else {
      rationale = `${skillLabel} va bien (índice ${strength}/100). Próximo repaso en ${dueInDays} ${dueInDays === 1 ? 'día' : 'días'}.`;
    }

    return { skill, skillLabel, gameId, gameName: def.name, level, reason, dueInDays, intervalDays, strength, rationale };
  });

  const rank: Record<RecommendationReason, number> = { nueva: 0, pendiente: 1, mantenimiento: 2 };
  const skillPos = (s: NeuroSkill) => SKILL_ORDER.indexOf(s);

  return recs.sort((a, b) => {
    if (rank[a.reason] !== rank[b.reason]) return rank[a.reason] - rank[b.reason];
    if (a.reason === 'mantenimiento' && a.dueInDays !== b.dueInDays) return a.dueInDays - b.dueInDays;
    const sa = a.strength ?? -1;
    const sb = b.strength ?? -1;
    if (sa !== sb) return sa - sb;
    return skillPos(a.skill) - skillPos(b.skill);
  });
}

/** Plan del día: las `count` primeras recomendaciones. */
export function dailyPlan(
  history: TrainingSessionRecord[],
  levels: LevelMap,
  nowMs: number,
  count = 3
): CoachRecommendation[] {
  return recommendNext(history, levels, nowMs).slice(0, count);
}

// ---------------------------------------------------------------------------
// Recomendación a partir de un perfil de evaluación (batería)
// ---------------------------------------------------------------------------

export interface AgentPedagogicalAdvice {
  focusDomain: string;
  recommendedGame: string;
  targetDurationMinutes: number;
  rationale: string;
  /** Qué tan clara es la prioridad: diferencia entre el dominio más bajo y el siguiente (0..1). */
  confidenceScore: number;
}

// ---------------------------------------------------------------------------
// Backend remoto opcional
// ---------------------------------------------------------------------------

export const REMOTE_COACH_OPT_IN_KEY = 'neurogym_remote_coach_opt_in';

export function isRemoteCoachFlagEnabled(): boolean {
  try {
    return import.meta.env?.PUBLIC_NEUROGYM_REMOTE_COACH === 'true';
  } catch {
    return false;
  }
}

function defaultStorage(): StorageLike | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

export interface AgenticNeuroCoachOptions {
  /** URL del backend de memoria. Solo se usa con flag + consentimiento. */
  remoteUrl?: string;
  /** Sobrescribe el flag de compilación (para pruebas). */
  remoteFlagEnabled?: boolean;
  storage?: StorageLike | null;
  fetchImpl?: typeof fetch;
}

export class AgenticNeuroCoach {
  private remoteUrl: string;
  private flagOverride: boolean | undefined;
  private storage: StorageLike | null;
  private fetchImpl: typeof fetch | undefined;

  constructor(options: AgenticNeuroCoachOptions = {}) {
    this.remoteUrl = options.remoteUrl ?? 'http://localhost:8006';
    this.flagOverride = options.remoteFlagEnabled;
    this.storage = options.storage === undefined ? defaultStorage() : options.storage;
    this.fetchImpl = options.fetchImpl;
  }

  /** ¿La función remota está compilada en esta build? (OFF por defecto). */
  isRemoteAvailable(): boolean {
    return this.flagOverride ?? isRemoteCoachFlagEnabled();
  }

  hasRemoteOptIn(): boolean {
    if (!this.storage) return false;
    try {
      return this.storage.getItem(REMOTE_COACH_OPT_IN_KEY) === 'true';
    } catch {
      return false;
    }
  }

  setRemoteOptIn(value: boolean): void {
    if (!this.storage) return;
    try {
      if (value) this.storage.setItem(REMOTE_COACH_OPT_IN_KEY, 'true');
      else this.storage.removeItem(REMOTE_COACH_OPT_IN_KEY);
    } catch {
      // sin almacenamiento: el consentimiento no persiste, el remoto queda apagado
    }
  }

  /** Remoto permitido solo con flag de build Y consentimiento explícito. */
  canUseRemote(): boolean {
    return this.isRemoteAvailable() && this.hasRemoteOptIn();
  }

  recommend(history: TrainingSessionRecord[], levels: LevelMap, nowMs: number): CoachRecommendation[] {
    return recommendNext(history, levels, nowMs);
  }

  /**
   * Recomendación a partir del perfil de la batería: dominio más bajo primero.
   */
  synthesizeWorkoutPlan(profile: FullCognitiveProfile): AgentPedagogicalAdvice {
    const scores = [
      { domain: 'Razonamiento Fluido', score: profile.overallIQProxy.standardScore, game: getTrainingGame('rotation').name },
      { domain: 'Memoria de Trabajo', score: profile.workingMemory.standardScore, game: `${getTrainingGame('nback').name} + ${getTrainingGame('corsi').name}` },
      { domain: 'Velocidad de Procesamiento', score: profile.processingSpeed.standardScore, game: getTrainingGame('reaction').name },
      { domain: 'Agilidad Motriz', score: profile.motorAgility.standardScore, game: getTrainingGame('trail').name },
      { domain: 'Flexibilidad Ejecutiva', score: profile.analyticalFlexibility.standardScore, game: getTrainingGame('cardsort').name }
    ];

    // Orden estable: puntaje ascendente, desempate por posición original.
    const ranked = scores.map((s, i) => ({ ...s, i })).sort((a, b) => a.score - b.score || a.i - b.i);
    const lowest = ranked[0];
    const gap = ranked.length > 1 ? ranked[1].score - lowest.score : 0;

    const rationale =
      lowest.score < 90
        ? `${lowest.domain} es el dominio con menor resultado (${lowest.score} pts). Se sugieren sesiones cortas de 5 a 7 minutos.`
        : `Resultados equilibrados. Mantén la práctica en ${lowest.domain}, el dominio con el resultado más bajo.`;

    return {
      focusDomain: lowest.domain,
      recommendedGame: lowest.game,
      targetDurationMinutes: 7,
      rationale,
      confidenceScore: Math.round(Math.min(1, 0.5 + gap / 30) * 100) / 100
    };
  }

  /**
   * Consulta opcional al backend de memoria. Devuelve null sin hacer ninguna
   * petición si el flag está apagado o no hay consentimiento explícito.
   * Solo envía el nombre genérico del dominio (sin datos del estudiante).
   */
  async consultXavierContext(domain: string): Promise<string | null> {
    if (!this.canUseRemote()) return null;
    const doFetch = this.fetchImpl ?? (typeof fetch === 'undefined' ? undefined : fetch);
    if (!doFetch) return null;
    try {
      const res = await doFetch(`${this.remoteUrl}/v1/memories/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `pedagogical strategy cognitive training ${domain}`, limit: 2 })
      });
      if (res.ok) {
        const data = await res.json();
        return data?.results?.[0]?.content || null;
      }
    } catch {
      // sin conexión: el coach local sigue funcionando
    }
    return null;
  }
}

export const agenticCoach = new AgenticNeuroCoach();
