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
  LeaderboardScope,
  LeaderboardSettings,
  ScoreSubmission,
  LeaderboardConfig
} from './leaderboard';
import { getScoreRange, getPeriodDates, upsertEntry } from './leaderboard';
import type { ExamScore } from './scoring';
import type { AnonymousIdentity } from './identity';
import { supabase } from './supabase';
import { getOrCreateSwalInstanceId } from './swal-instance-id';
import { simpleHash } from './identity';
import { p2p, estadoMesh } from './p2p-edge-mesh';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

// ============================================================================
// CONFIGURACIÓN Y PRIVACIDAD DE USUARIO
// ============================================================================

const LEADERBOARDS_BASE_URL = '/leaderboards';
const LEADERBOARD_SETTINGS_KEY = 'worldexams_leaderboard_settings';

/**
 * Obtiene el hash de dispositivo único y estable
 */
export function getDeviceHash(): string {
  const instanceId = getOrCreateSwalInstanceId();
  const hashVal = simpleHash(`device_${instanceId}`).toString(36).toUpperCase().padStart(6, '0').slice(0, 8);
  return `dev_${hashVal}`;
}

/**
 * Obtiene las configuraciones de privacidad y opt-in del usuario (default: anónimo)
 */
export function getLeaderboardSettings(): LeaderboardSettings {
  if (typeof localStorage === 'undefined') {
    return { isOptedIn: false };
  }

  try {
    const raw = localStorage.getItem(LEADERBOARD_SETTINGS_KEY);
    if (!raw) return { isOptedIn: false };
    const parsed = JSON.parse(raw);
    return {
      isOptedIn: Boolean(parsed.isOptedIn),
      displayName: parsed.displayName ? String(parsed.displayName).trim() : undefined
    };
  } catch {
    return { isOptedIn: false };
  }
}

/**
 * Guarda las configuraciones de privacidad del usuario
 */
export function saveLeaderboardSettings(settings: LeaderboardSettings): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(LEADERBOARD_SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving leaderboard settings:', e);
  }
}

/**
 * Conmuta la opción de opt-in / opt-out
 */
export function toggleAnonymousOptIn(optIn?: boolean, displayName?: string): LeaderboardSettings {
  const current = getLeaderboardSettings();
  const updated: LeaderboardSettings = {
    isOptedIn: optIn !== undefined ? optIn : !current.isOptedIn,
    displayName: displayName !== undefined ? displayName : current.displayName
  };
  saveLeaderboardSettings(updated);
  return updated;
}

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
  examId: string,
  meta?: { institutionId?: string; subjectId?: string }
): ScoreSubmission {
  const timestamp = new Date().toISOString();
  const settings = getLeaderboardSettings();
  const deviceHash = getDeviceHash();

  const isAnonymous = !settings.isOptedIn;
  const displayName = isAnonymous
    ? `Anónimo (${deviceHash})`
    : (settings.displayName || identity.displayName);

  const submission: Omit<ScoreSubmission, 'checksum'> = {
    anonymousId: identity.id,
    deviceHash,
    displayName,
    score: examScore.totalScore,
    isAnonymous,
    institutionId: meta?.institutionId,
    subjectId: meta?.subjectId,
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
  const baseUrl = 'https://github.com/world-exams/saberparatodos/issues/new';
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

  const edgeSubmission: EdgeScoreSubmission = {
    anonymousId: input.anonymousId,
    displayName: input.displayName,
    grade: Number(input.grade),
    region: input.region || 'CO',
    totalPoints: input.totalPoints,
    questionsAnswered: input.questionsAnswered,
    correctAnswers: input.correctAnswers,
    averageDifficulty: input.averageDifficulty,
    examDurationMs: input.examDurationMs,
    timestamp: input.timestamp
  };

  // If offline, queue score for batch sync without blocking
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    console.log('Score stored locally while offline, queued for batch sync.');
    return false;
  }

  const edgeSuccess = await submitScoreToEdge(edgeSubmission);
  if (!edgeSuccess) {
    console.log('Score stored locally, pending sync. URL fallback:', getSubmissionUrl(input));
  }

  return edgeSuccess;
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

interface EdgeScoreSubmission {
  anonymousId: string;
  displayName: string;
  grade: number;
  region: string;
  totalPoints: number;
  questionsAnswered: number;
  correctAnswers: number;
  averageDifficulty: number;
  examDurationMs: number;
  timestamp: number;
}

function toEdgeSubmission(submission: ScoreSubmission): EdgeScoreSubmission {
  const parsedGrade = Number.parseInt(String(submission.grade), 10);
  const grade = Number.isFinite(parsedGrade) ? parsedGrade : 11;
  const questionsAnswered = submission.stats.questionsAnswered || 0;
  const correctAnswers = Math.round((submission.stats.accuracy || 0) * questionsAnswered);

  return {
    anonymousId: submission.anonymousId,
    displayName: submission.displayName,
    grade,
    region: submission.region || 'CO',
    totalPoints: submission.score,
    questionsAnswered,
    correctAnswers,
    averageDifficulty: submission.stats.averageDifficulty || 0,
    examDurationMs: 300000,
    timestamp: new Date(submission.timestamp).getTime()
  };
}

async function submitScoreToEdge(submission: EdgeScoreSubmission): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke('submit-leaderboard-score', {
      body: { submission }
    });

    if (error) {
      console.error('Error submitting score to edge function:', error);
      return false;
    }

    return Boolean(data?.success);
  } catch (error) {
    console.error('Unexpected edge submission error:', error);
    return false;
  }
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

  // Sync via P2P EdgeMesh CRDT
  syncScoreOverP2PMesh(submission);
}

// ============================================================================
// P2P EDGE-MESH CRDT SYNCHRONIZATION
// ============================================================================

/** Local CRDT Map store for active P2P synchronized entries per period */
export const p2pLeaderboardStore: Writable<Map<LeaderboardPeriod, Leaderboard>> = writable(new Map());

let isP2PMeshListenerInitialized = false;

/**
 * Initializes P2P EdgeMesh listener for receiving leaderboard updates
 */
export async function initP2PLeaderboardMesh(): Promise<void> {
  if (isP2PMeshListenerInitialized) return;
  isP2PMeshListenerInitialized = true;

  try {
    await p2p.iniciar('leaderboard-node');
    if (typeof window !== 'undefined') {
      window.addEventListener('p2p-leaderboard-entry', (event: Event) => {
        const customEv = event as CustomEvent<{ submission: ScoreSubmission; period?: LeaderboardPeriod }>;
        if (customEv.detail && customEv.detail.submission) {
          mergeP2PScoreSubmission(customEv.detail.submission, customEv.detail.period || 'weekly');
        }
      });
    }
  } catch (err) {
    console.warn('P2P Mesh init for Leaderboard deferred or failed:', err);
  }
}

/**
 * Broadcasts a score submission across P2P EdgeMesh
 */
export function syncScoreOverP2PMesh(submission: ScoreSubmission, period: LeaderboardPeriod = 'weekly'): void {
  // Merge locally into CRDT store
  mergeP2PScoreSubmission(submission, period);

  // Broadcast event over window / mesh channels
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('p2p-leaderboard-entry', {
      detail: { submission, period }
    }));
  }
}

/**
 * Merges an incoming P2P score submission into local CRDT state
 */
export function mergeP2PScoreSubmission(
  submission: ScoreSubmission,
  period: LeaderboardPeriod = 'weekly',
  scope: LeaderboardScope = 'global'
): Leaderboard {
  let currentMap = new Map<LeaderboardPeriod, Leaderboard>();
  p2pLeaderboardStore.subscribe(m => currentMap = m)();

  let board = currentMap.get(period);
  if (!board) {
    const { start, end } = getPeriodDates(period);
    board = {
      version: '1.0',
      period,
      scope,
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

  // Obfuscate if anonymous
  const entrySubmission: ScoreSubmission = submission.isAnonymous ? {
    ...submission,
    displayName: submission.displayName || `Anónimo (${submission.deviceHash || 'dev_00000000'})`,
  } : submission;

  const updatedBoard = upsertEntry(board, entrySubmission);
  currentMap.set(period, updatedBoard);
  p2pLeaderboardStore.set(new Map(currentMap));

  return updatedBoard;
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
    // Try to submit via secured edge function
    try {
      const edgeSuccess = await submitScoreToEdge(toEdgeSubmission(entry.submission));
      if (edgeSuccess) {
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
