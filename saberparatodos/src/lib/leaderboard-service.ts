/**
 * Servicio de Leaderboard para el Frontend
 *
 * Maneja la carga de leaderboards y el envío de puntuaciones
 * usando repository_dispatch de GitHub Actions.
 */

import type {
  Leaderboard,
  LeaderboardEntry,
  LeaderboardPeriod,
  ScoreSubmission,
  LeaderboardConfig
} from './leaderboard';
import type { ExamScore } from './scoring';
import type { AnonymousIdentity } from './identity';

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const LEADERBOARDS_BASE_URL = '/leaderboards';

// Token público con permisos mínimos (solo repo:dispatch)
// NOTA: Este token debe configurarse en las variables de entorno del build
// No otorga acceso a nada más que disparar workflows
const GITHUB_DISPATCH_URL = 'https://api.github.com/repos/worldexams/saberparatodos/dispatches';

// ============================================================================
// CARGA DE LEADERBOARDS
// ============================================================================

/**
 * Carga un leaderboard específico
 */
export async function loadLeaderboard(period: LeaderboardPeriod): Promise<Leaderboard | null> {
  const filename = `leaderboard-${period}.json`;
  const url = `${LEADERBOARDS_BASE_URL}/${filename}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to load leaderboard: ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    return null;
  }
}

/**
 * Carga la configuración de leaderboards
 */
export async function loadConfig(): Promise<LeaderboardConfig | null> {
  const url = `${LEADERBOARDS_BASE_URL}/config.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
}

/**
 * Carga todos los leaderboards activos
 */
export async function loadAllLeaderboards(): Promise<Map<LeaderboardPeriod, Leaderboard>> {
  const periods: LeaderboardPeriod[] = ['weekly', 'monthly', 'annual', 'alltime'];
  const results = new Map<LeaderboardPeriod, Leaderboard>();

  const promises = periods.map(async period => {
    const data = await loadLeaderboard(period);
    if (data) {
      results.set(period, data);
    }
  });

  await Promise.all(promises);
  return results;
}

// ============================================================================
// ENVÍO DE PUNTUACIONES
// ============================================================================

/**
 * Genera un checksum simple para validación básica
 */
function generateChecksum(data: Partial<ScoreSubmission>): string {
  const str = `${data.anonymousId}:${data.score}:${data.timestamp}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Crea un objeto de submission a partir de los resultados del examen
 */
export function createSubmission(
  identity: AnonymousIdentity,
  examScore: ExamScore,
  examId: string
): ScoreSubmission {
  const timestamp = new Date().toISOString();

  const submission: Omit<ScoreSubmission, 'checksum'> = {
    anonymousId: identity.id,
    displayName: identity.displayName,
    score: examScore.totalScore,
    stats: {
      questionsAnswered: examScore.stats.questionsAnswered,
      accuracy: examScore.stats.accuracy,
      averageDifficulty: examScore.stats.averageDifficulty,
      longestStreak: examScore.stats.longestStreak,
      examsCompleted: 1,
      perfectScores: examScore.stats.accuracy === 1 ? 1 : 0
    },
    grade: identity.grade,
    region: identity.region,
    examId,
    timestamp
  };

  return {
    ...submission,
    checksum: generateChecksum(submission)
  };
}

/**
 * Input data from the frontend (ResultsView)
 */
export interface ScoreSubmissionInput {
  anonymousId: string;
  displayName: string;
  grade: string | number;
  region: string;
  totalPoints: number;
  questionsAnswered: number;
  correctAnswers: number;
  averageDifficulty: number;
  examDurationMs: number;
  timestamp: number;
  /** Checksum for anti-cheat validation */
  checksum?: string;
}

/**
 * Generates the GitHub Issue URL for manual submission
 */
export function getSubmissionUrl(input: ScoreSubmissionInput): string {
  const baseUrl = 'https://github.com/worldexams/saberparatodos/issues/new';
  const params = new URLSearchParams({
    template: 'score_submission.yml',
    title: `Score: ${input.displayName} - ${input.totalPoints}`,
    labels: 'score-submission',
    anonymousId: input.anonymousId,
    displayName: input.displayName,
    grade: String(input.grade),
    region: input.region,
    totalPoints: input.totalPoints.toString(),
    questionsAnswered: input.questionsAnswered.toString(),
    correctAnswers: input.correctAnswers.toString(),
    examDurationMs: input.examDurationMs.toString(),
    timestamp: input.timestamp.toString()
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Saves the score locally and returns the URL for GitHub submission
 */
export async function submitScoreInput(input: ScoreSubmissionInput): Promise<boolean> {
  // Convert to ScoreSubmission format for local storage
  const submission: ScoreSubmission = {
    anonymousId: input.anonymousId,
    displayName: input.displayName,
    score: input.totalPoints,
    stats: {
      questionsAnswered: input.questionsAnswered,
      accuracy: input.correctAnswers / input.questionsAnswered,
      averageDifficulty: input.averageDifficulty,
      longestStreak: 0,
      examsCompleted: 1,
      perfectScores: input.correctAnswers === input.questionsAnswered ? 1 : 0
    },
    grade: String(input.grade),
    region: input.region,
    examId: `exam-${input.timestamp}`,
    timestamp: new Date(input.timestamp).toISOString(),
    checksum: generateChecksum({ anonymousId: input.anonymousId, score: input.totalPoints, timestamp: new Date(input.timestamp).toISOString() })
  };

  // Save locally as backup
  saveLocalScore(submission);

  // Log for debugging
  console.log('Score ready for submission. URL:', getSubmissionUrl(input));

  return true;
}

// ============================================================================
// ALMACENAMIENTO LOCAL
// ============================================================================

const LOCAL_SCORES_KEY = 'worldexams_pending_scores';
const LOCAL_HISTORY_KEY = 'worldexams_score_history';

interface LocalScoreEntry {
  submission: ScoreSubmission;
  savedAt: string;
  synced: boolean;
}

/**
 * Guarda una puntuación localmente (backup/offline)
 */
export function saveLocalScore(submission: ScoreSubmission): void {
  if (typeof localStorage === 'undefined') return;

  // Guardar en pendientes
  const pending = getLocalPendingScores();
  pending.push({
    submission,
    savedAt: new Date().toISOString(),
    synced: false
  });
  localStorage.setItem(LOCAL_SCORES_KEY, JSON.stringify(pending));

  // Guardar en historial
  const history = getLocalScoreHistory();
  history.unshift(submission);
  // Mantener solo los últimos 50
  localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
}

/**
 * Obtiene las puntuaciones pendientes de sincronizar
 */
export function getLocalPendingScores(): LocalScoreEntry[] {
  if (typeof localStorage === 'undefined') return [];

  const data = localStorage.getItem(LOCAL_SCORES_KEY);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Obtiene el historial de puntuaciones del usuario
 */
export function getLocalScoreHistory(): ScoreSubmission[] {
  if (typeof localStorage === 'undefined') return [];

  const data = localStorage.getItem(LOCAL_HISTORY_KEY);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Marca puntuaciones como sincronizadas
 */
export function markScoresAsSynced(checksums: string[]): void {
  if (typeof localStorage === 'undefined') return;

  const pending = getLocalPendingScores();
  const updated = pending.map(entry => ({
    ...entry,
    synced: checksums.includes(entry.submission.checksum) ? true : entry.synced
  }));

  // Remover los sincronizados
  const remaining = updated.filter(e => !e.synced);
  localStorage.setItem(LOCAL_SCORES_KEY, JSON.stringify(remaining));
}

/**
 * Intenta sincronizar puntuaciones pendientes
 */
export async function syncPendingScores(): Promise<number> {
  const pending = getLocalPendingScores().filter(e => !e.synced);

  if (pending.length === 0) return 0;

  let synced = 0;
  const syncedChecksums: string[] = [];

  for (const entry of pending) {
    // Try to submit via the submission URL endpoint
    try {
      const url = `${GITHUB_DISPATCH_URL}?${new URLSearchParams({
        anonymous_id: entry.submission.anonymousId,
        display_name: entry.submission.displayName,
        score: entry.submission.score.toString(),
        grade: entry.submission.grade,
        region: entry.submission.region || '',
        questions_answered: entry.submission.stats.questionsAnswered.toString(),
        correct_answers: Math.round(entry.submission.stats.accuracy * entry.submission.stats.questionsAnswered).toString(),
        average_difficulty: entry.submission.stats.averageDifficulty.toString(),
        timestamp: entry.submission.timestamp
      })}`;

      const response = await fetch(url);
      if (response.ok) {
        synced++;
        syncedChecksums.push(entry.submission.checksum);
      }
    } catch (error) {
      console.error('Error syncing score:', error);
    }
  }

  markScoresAsSynced(syncedChecksums);

  return synced;
}

// ============================================================================
// BÚSQUEDA DE USUARIO
// ============================================================================

/**
 * Busca la posición del usuario en un leaderboard
 */
export function findUserInLeaderboard(
  leaderboard: Leaderboard,
  anonymousId: string
): LeaderboardEntry | null {
  return leaderboard.entries.find(e => e.anonymousId === anonymousId) || null;
}

/**
 * Obtiene el resumen del usuario en todos los períodos
 */
export async function getUserSummary(anonymousId: string): Promise<Map<LeaderboardPeriod, LeaderboardEntry | null>> {
  const leaderboards = await loadAllLeaderboards();
  const summary = new Map<LeaderboardPeriod, LeaderboardEntry | null>();

  for (const [period, leaderboard] of leaderboards) {
    summary.set(period, findUserInLeaderboard(leaderboard, anonymousId));
  }

  return summary;
}

// ============================================================================
// UTILIDADES DE DISPLAY
// ============================================================================

/**
 * Formatea el rank con medalla si aplica
 */
export function formatRank(rank: number): string {
  if (rank === 1) return '🥇 1°';
  if (rank === 2) return '🥈 2°';
  if (rank === 3) return '🥉 3°';
  if (rank <= 10) return `🏅 ${rank}°`;
  return `${rank}°`;
}

/**
 * Obtiene el color CSS para un rank
 */
export function getRankColor(rank: number): string {
  if (rank === 1) return 'text-yellow-400';
  if (rank === 2) return 'text-gray-300';
  if (rank === 3) return 'text-amber-600';
  if (rank <= 10) return 'text-blue-400';
  return 'text-gray-400';
}

/**
 * Obtiene la clase de background para un rank
 */
export function getRankBackground(rank: number): string {
  if (rank === 1) return 'bg-yellow-500/10 border-yellow-500/30';
  if (rank === 2) return 'bg-gray-500/10 border-gray-500/30';
  if (rank === 3) return 'bg-amber-500/10 border-amber-500/30';
  if (rank <= 10) return 'bg-blue-500/10 border-blue-500/30';
  return 'bg-gray-500/5 border-gray-500/20';
}
