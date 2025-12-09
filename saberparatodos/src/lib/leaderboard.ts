/**
 * Tipos para el Sistema de Leaderboards de World Exams
 */

import type { ExamStats } from './scoring';

// ============================================================================
// TIPOS DE PERÍODOS
// ============================================================================

export type LeaderboardPeriod =
  | 'weekly'
  | 'monthly'
  | 'semester-a'
  | 'semester-b'
  | 'annual'
  | 'alltime';

export interface PeriodInfo {
  type: LeaderboardPeriod;
  label: string;
  shortLabel: string;
  description: string;
}

export const PERIOD_INFO: Record<LeaderboardPeriod, PeriodInfo> = {
  'weekly': {
    type: 'weekly',
    label: 'Esta semana',
    shortLabel: 'Semana',
    description: 'Ranking de los últimos 7 días (lunes a domingo)'
  },
  'monthly': {
    type: 'monthly',
    label: 'Este mes',
    shortLabel: 'Mes',
    description: 'Ranking del mes actual'
  },
  'semester-a': {
    type: 'semester-a',
    label: 'Semestre (Cal. A)',
    shortLabel: 'Sem A',
    description: 'Calendario A: Feb-Jun / Jul-Nov'
  },
  'semester-b': {
    type: 'semester-b',
    label: 'Semestre (Cal. B)',
    shortLabel: 'Sem B',
    description: 'Calendario B: Sep-Dic / Ene-Jun'
  },
  'annual': {
    type: 'annual',
    label: 'Este año',
    shortLabel: 'Año',
    description: 'Ranking del año actual'
  },
  'alltime': {
    type: 'alltime',
    label: 'Histórico',
    shortLabel: 'Total',
    description: 'Ranking de todos los tiempos'
  }
};

// ============================================================================
// TIPOS DE ENTRADAS
// ============================================================================

export interface LeaderboardEntryStats {
  questionsAnswered: number;
  accuracy: number;
  averageDifficulty: number;
  longestStreak: number;
  examsCompleted: number;
  perfectScores: number;
}

export interface LeaderboardEntry {
  rank: number;
  anonymousId: string;
  displayName: string;
  score: number;
  stats: LeaderboardEntryStats;
  grade: string;
  region: string;
  lastActive: string; // ISO date
}

export interface LeaderboardMetadata {
  topGrade: string;
  topRegion: string;
  averageScore: number;
  averageAccuracy: number;
  totalExamsCompleted: number;
}

// ============================================================================
// TIPOS DE LEADERBOARD
// ============================================================================

export interface Leaderboard {
  version: string;
  period: LeaderboardPeriod;
  periodStart: string; // ISO date
  periodEnd: string; // ISO date
  lastUpdated: string; // ISO date
  totalParticipants: number;
  entries: LeaderboardEntry[];
  metadata: LeaderboardMetadata;
}

// ============================================================================
// TIPOS DE CONFIGURACIÓN
// ============================================================================

export interface LeaderboardPeriodConfig {
  enabled: boolean;
  topN: number; // Cuántas entradas guardar
}

export interface LeaderboardConfig {
  version: string;
  scoring: {
    basePoints: number;
    difficultyMultipliers: number[];
    timeBonus: {
      maxMultiplier: number;
      decaySeconds: number;
    };
    streakBonus: {
      incrementPerStreak: number;
      maxMultiplier: number;
    };
    incorrectPenalty: number;
    completionBonus: number;
    accuracyBonusThreshold: number;
    accuracyBonusMultiplier: number;
    perfectBonus: number;
  };
  periods: Record<LeaderboardPeriod, LeaderboardPeriodConfig>;
  regions: string[];
  lastUpdated: string;
}

// ============================================================================
// TIPOS DE SUBMISSION
// ============================================================================

export interface ScoreSubmission {
  anonymousId: string;
  displayName: string;
  score: number;
  stats: LeaderboardEntryStats;
  grade: string;
  region: string;
  examId: string;
  timestamp: string;
  checksum: string; // Para validación básica
}

// ============================================================================
// FUNCIONES DE PERÍODO
// ============================================================================

/**
 * Obtiene el número de semana ISO
 */
export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

/**
 * Obtiene el lunes de la semana actual
 */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Obtiene el domingo de la semana actual
 */
export function getWeekEnd(date: Date): Date {
  const d = getWeekStart(date);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Obtiene el inicio del mes
 */
export function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

/**
 * Obtiene el fin del mes
 */
export function getMonthEnd(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

/**
 * Obtiene el semestre actual según calendario colombiano
 * Calendario A: Sem1 (Feb-Jun), Sem2 (Jul-Nov)
 * Calendario B: Sem1 (Sep-Dic), Sem2 (Ene-Jun)
 */
export function getSemesterInfo(date: Date, calendar: 'A' | 'B'): {
  semester: 1 | 2;
  start: Date;
  end: Date
} {
  const month = date.getMonth(); // 0-11
  const year = date.getFullYear();

  if (calendar === 'A') {
    // Calendario A: Feb-Jun = Sem1, Jul-Nov = Sem2, Dic-Ene = vacaciones
    if (month >= 1 && month <= 5) {
      // Febrero a Junio = Semestre 1
      return {
        semester: 1,
        start: new Date(year, 1, 1, 0, 0, 0, 0),
        end: new Date(year, 5, 30, 23, 59, 59, 999)
      };
    } else if (month >= 6 && month <= 10) {
      // Julio a Noviembre = Semestre 2
      return {
        semester: 2,
        start: new Date(year, 6, 1, 0, 0, 0, 0),
        end: new Date(year, 10, 30, 23, 59, 59, 999)
      };
    } else {
      // Diciembre o Enero = entre semestres, usar semestre más cercano
      if (month === 11) {
        return {
          semester: 2,
          start: new Date(year, 6, 1, 0, 0, 0, 0),
          end: new Date(year, 10, 30, 23, 59, 59, 999)
        };
      } else {
        return {
          semester: 1,
          start: new Date(year, 1, 1, 0, 0, 0, 0),
          end: new Date(year, 5, 30, 23, 59, 59, 999)
        };
      }
    }
  } else {
    // Calendario B: Sep-Dic = Sem1, Ene-Jun = Sem2, Jul-Ago = vacaciones
    if (month >= 8) {
      // Septiembre a Diciembre = Semestre 1
      return {
        semester: 1,
        start: new Date(year, 8, 1, 0, 0, 0, 0),
        end: new Date(year, 11, 31, 23, 59, 59, 999)
      };
    } else if (month >= 0 && month <= 5) {
      // Enero a Junio = Semestre 2
      return {
        semester: 2,
        start: new Date(year, 0, 1, 0, 0, 0, 0),
        end: new Date(year, 5, 30, 23, 59, 59, 999)
      };
    } else {
      // Julio-Agosto = vacaciones, usar semestre más cercano
      return {
        semester: 1,
        start: new Date(year, 8, 1, 0, 0, 0, 0),
        end: new Date(year, 11, 31, 23, 59, 59, 999)
      };
    }
  }
}

/**
 * Determina si un período debe resetearse
 */
export function shouldResetPeriod(
  period: LeaderboardPeriod,
  lastReset: Date,
  now: Date = new Date()
): boolean {
  switch (period) {
    case 'weekly':
      return getWeekNumber(now) !== getWeekNumber(lastReset) ||
             now.getFullYear() !== lastReset.getFullYear();

    case 'monthly':
      return now.getMonth() !== lastReset.getMonth() ||
             now.getFullYear() !== lastReset.getFullYear();

    case 'semester-a': {
      const currentSem = getSemesterInfo(now, 'A');
      const lastSem = getSemesterInfo(lastReset, 'A');
      return currentSem.semester !== lastSem.semester ||
             now.getFullYear() !== lastReset.getFullYear();
    }

    case 'semester-b': {
      const currentSem = getSemesterInfo(now, 'B');
      const lastSem = getSemesterInfo(lastReset, 'B');
      return currentSem.semester !== lastSem.semester ||
             now.getFullYear() !== lastReset.getFullYear();
    }

    case 'annual':
      return now.getFullYear() !== lastReset.getFullYear();

    case 'alltime':
      return false; // Nunca se resetea

    default:
      return false;
  }
}

/**
 * Obtiene las fechas de inicio y fin para un período
 */
export function getPeriodDates(
  period: LeaderboardPeriod,
  referenceDate: Date = new Date()
): { start: Date; end: Date } {
  switch (period) {
    case 'weekly':
      return {
        start: getWeekStart(referenceDate),
        end: getWeekEnd(referenceDate)
      };

    case 'monthly':
      return {
        start: getMonthStart(referenceDate),
        end: getMonthEnd(referenceDate)
      };

    case 'semester-a':
      return getSemesterInfo(referenceDate, 'A');

    case 'semester-b':
      return getSemesterInfo(referenceDate, 'B');

    case 'annual':
      return {
        start: new Date(referenceDate.getFullYear(), 0, 1, 0, 0, 0, 0),
        end: new Date(referenceDate.getFullYear(), 11, 31, 23, 59, 59, 999)
      };

    case 'alltime':
      return {
        start: new Date(2025, 0, 1, 0, 0, 0, 0), // Inicio del proyecto
        end: new Date(2099, 11, 31, 23, 59, 59, 999) // Futuro lejano
      };

    default:
      return {
        start: new Date(),
        end: new Date()
      };
  }
}

// ============================================================================
// FUNCIONES DE LEADERBOARD
// ============================================================================

/**
 * Crea un leaderboard vacío
 */
export function createEmptyLeaderboard(period: LeaderboardPeriod): Leaderboard {
  const { start, end } = getPeriodDates(period);

  return {
    version: '1.0',
    period,
    periodStart: start.toISOString(),
    periodEnd: end.toISOString(),
    lastUpdated: new Date().toISOString(),
    totalParticipants: 0,
    entries: [],
    metadata: {
      topGrade: '',
      topRegion: '',
      averageScore: 0,
      averageAccuracy: 0,
      totalExamsCompleted: 0
    }
  };
}

/**
 * Actualiza o inserta una entrada en el leaderboard
 */
export function upsertEntry(
  leaderboard: Leaderboard,
  submission: ScoreSubmission,
  maxEntries: number = 100
): Leaderboard {
  const existingIndex = leaderboard.entries.findIndex(
    e => e.anonymousId === submission.anonymousId
  );

  if (existingIndex >= 0) {
    // Actualizar entrada existente
    const existing = leaderboard.entries[existingIndex];
    existing.score += submission.score;
    existing.stats.questionsAnswered += submission.stats.questionsAnswered;
    existing.stats.examsCompleted += 1;
    existing.stats.longestStreak = Math.max(
      existing.stats.longestStreak,
      submission.stats.longestStreak
    );
    existing.stats.perfectScores += submission.stats.perfectScores;
    // Recalcular precisión promedio
    const totalAnswered = existing.stats.questionsAnswered;
    const newAccuracy = submission.stats.accuracy;
    const submissionAnswered = submission.stats.questionsAnswered;
    existing.stats.accuracy = (
      (existing.stats.accuracy * (totalAnswered - submissionAnswered)) +
      (newAccuracy * submissionAnswered)
    ) / totalAnswered;
    // Actualizar dificultad promedio similar
    existing.stats.averageDifficulty = (
      (existing.stats.averageDifficulty * (totalAnswered - submissionAnswered)) +
      (submission.stats.averageDifficulty * submissionAnswered)
    ) / totalAnswered;
    existing.lastActive = submission.timestamp;
  } else {
    // Nueva entrada
    const newEntry: LeaderboardEntry = {
      rank: 0, // Se calculará después
      anonymousId: submission.anonymousId,
      displayName: submission.displayName,
      score: submission.score,
      stats: {
        ...submission.stats,
        examsCompleted: 1
      },
      grade: submission.grade,
      region: submission.region,
      lastActive: submission.timestamp
    };
    leaderboard.entries.push(newEntry);
    leaderboard.totalParticipants++;
  }

  // Reordenar por score y asignar ranks
  leaderboard.entries.sort((a, b) => b.score - a.score);
  leaderboard.entries = leaderboard.entries.slice(0, maxEntries);
  leaderboard.entries.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  // Actualizar metadata
  if (leaderboard.entries.length > 0) {
    const grades: Record<string, number> = {};
    const regions: Record<string, number> = {};
    let totalScore = 0;
    let totalAccuracy = 0;
    let totalExams = 0;

    for (const entry of leaderboard.entries) {
      grades[entry.grade] = (grades[entry.grade] || 0) + entry.score;
      regions[entry.region] = (regions[entry.region] || 0) + entry.score;
      totalScore += entry.score;
      totalAccuracy += entry.stats.accuracy;
      totalExams += entry.stats.examsCompleted;
    }

    leaderboard.metadata = {
      topGrade: Object.entries(grades).sort((a, b) => b[1] - a[1])[0]?.[0] || '',
      topRegion: Object.entries(regions).sort((a, b) => b[1] - a[1])[0]?.[0] || '',
      averageScore: Math.round(totalScore / leaderboard.entries.length),
      averageAccuracy: totalAccuracy / leaderboard.entries.length,
      totalExamsCompleted: totalExams
    };
  }

  leaderboard.lastUpdated = new Date().toISOString();

  return leaderboard;
}

/**
 * Filtra leaderboard por grado
 */
export function filterByGrade(
  leaderboard: Leaderboard,
  grade: string
): LeaderboardEntry[] {
  return leaderboard.entries
    .filter(e => e.grade === grade)
    .map((e, i) => ({ ...e, rank: i + 1 }));
}

/**
 * Filtra leaderboard por región
 */
export function filterByRegion(
  leaderboard: Leaderboard,
  region: string
): LeaderboardEntry[] {
  return leaderboard.entries
    .filter(e => e.region === region)
    .map((e, i) => ({ ...e, rank: i + 1 }));
}

/**
 * Busca la posición de un usuario
 */
export function findUserRank(
  leaderboard: Leaderboard,
  anonymousId: string
): LeaderboardEntry | null {
  return leaderboard.entries.find(e => e.anonymousId === anonymousId) || null;
}
