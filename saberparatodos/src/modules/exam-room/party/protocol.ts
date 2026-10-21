/**
 * Party Mode protocol (/party)
 *
 * Mensajes host ⇄ jugadores para una sala en vivo. El host es la única fuente
 * de verdad: guarda la configuración real de la sala, las preguntas (con la
 * respuesta correcta), el reloj y el puntaje. Los jugadores solo reciben la
 * configuración que el host les envía en `join_accepted`; nunca se construye
 * una configuración local de relleno.
 */

import type { AppQuestion } from '../../../lib/api-service';

export const PARTY_PROTOCOL_VERSION = 1;

/** Sin caracteres ambiguos (0/O, 1/I/L) para dictar el código en voz alta. */
const ROOM_CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const ROOM_CODE_LENGTH = 6;

export const PARTY_LIMITS = {
  minQuestions: 3,
  maxQuestions: 30,
  minSecondsPerQuestion: 10,
  maxSecondsPerQuestion: 120,
  maxPlayers: 60,
  maxNicknameLength: 20,
} as const;

/** Configuración real de la sala, elegida por el host y sincronizada a todos. */
export interface PartyRoomConfig {
  code: string;
  hostName: string;
  countryCode: string;
  grado: number;
  asignatura: string;
  /** Nombre legible de la asignatura para la UI. */
  asignaturaLabel: string;
  totalQuestions: number;
  secondsPerQuestion: number;
  maxPlayers: number;
  createdAt: number;
}

export type PartyPhase = 'lobby' | 'question' | 'reveal' | 'finished';

export interface PartyPlayerInfo {
  id: string;
  nickname: string;
  online: boolean;
  score: number;
  correct: number;
}

export interface PublicOption {
  id: string;
  text: string;
}

/** Pregunta tal como la ven los jugadores: sin respuesta correcta ni feedback. */
export interface PublicQuestion {
  id: string;
  text: string;
  context?: string;
  options: PublicOption[];
}

export interface ScoreboardEntry {
  playerId: string;
  nickname: string;
  score: number;
  correct: number;
  rank: number;
}

export interface QuestionPayload {
  index: number;
  total: number;
  question: PublicQuestion;
  durationMs: number;
  remainingMs: number;
}

export interface RevealPayload {
  index: number;
  correctOptionId: string;
  explanation?: string;
  scoreboard: ScoreboardEntry[];
}

/** Estado completo que el host envía a un jugador al (re)unirse. */
export interface PartySnapshot {
  phase: PartyPhase;
  players: PartyPlayerInfo[];
  question?: QuestionPayload;
  reveal?: RevealPayload;
  /** Respuesta que este jugador ya envió en la pregunta actual (reconexión). */
  yourAnswer?: string;
  scoreboard: ScoreboardEntry[];
}

export type JoinRejectReason = 'room_full' | 'nickname_taken';

export type PartyMessage =
  // jugador → host
  | { type: 'join_request'; playerId: string; nickname: string }
  | { type: 'answer'; playerId: string; index: number; optionId: string }
  | { type: 'player_heartbeat'; playerId: string }
  | { type: 'player_leave'; playerId: string }
  // host → jugadores
  | { type: 'join_accepted'; playerId: string; config: PartyRoomConfig; snapshot: PartySnapshot }
  | { type: 'join_rejected'; playerId: string; reason: JoinRejectReason }
  | { type: 'player_list'; players: PartyPlayerInfo[] }
  | { type: 'question'; payload: QuestionPayload }
  | { type: 'progress'; index: number; answered: number; expected: number }
  | { type: 'question_result'; payload: RevealPayload }
  | { type: 'game_finished'; scoreboard: ScoreboardEntry[] }
  | { type: 'host_heartbeat'; phase: PartyPhase }
  | { type: 'room_closed' }
  | { type: 'player_kicked'; playerId: string };

export interface PartyEnvelope {
  v: typeof PARTY_PROTOCOL_VERSION;
  /** Id único del envelope; permite deduplicar cuando hay varios transportes. */
  id: string;
  room: string;
  from: string;
  t: number;
  msg: PartyMessage;
}

export type PartyErrorCode =
  | 'room_not_found'
  | 'host_left'
  | 'transport_unavailable'
  | 'room_full'
  | 'nickname_taken'
  | 'kicked'
  | 'no_questions';

/** Mensajes de error en español, listos para la UI. */
export const PARTY_ERROR_MESSAGES: Record<PartyErrorCode, string> = {
  room_not_found:
    'No encontramos esa sala. Revisa el código con tu docente y que la sala siga abierta en su pantalla. Necesitas conexión a internet para unirte desde otro dispositivo.',
  host_left:
    'El docente salió de la sala o perdió la conexión. Espera a que la vuelva a abrir o pídele un código nuevo.',
  transport_unavailable:
    'No pudimos conectarte para jugar en vivo. Revisa tu conexión a internet y vuelve a intentarlo.',
  room_full: 'La sala está llena. Pídele al docente que amplíe el cupo.',
  nickname_taken: 'Ese apodo ya está en uso en esta sala. Elige otro.',
  kicked: 'El docente te retiró de la sala.',
  no_questions:
    'No hay preguntas publicadas para ese país, grado y asignatura. Prueba con otra combinación.',
};

export class PartyError extends Error {
  readonly code: PartyErrorCode;

  constructor(code: PartyErrorCode, detail?: string) {
    super(detail ? `${PARTY_ERROR_MESSAGES[code]} (${detail})` : PARTY_ERROR_MESSAGES[code]);
    this.name = 'PartyError';
    this.code = code;
  }
}

// ─── Helpers puros ─────────────────────────────────────────────────────────

export function randomId(prefix = ''): string {
  try {
    return `${prefix}${crypto.randomUUID()}`;
  } catch {
    return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function generateRoomCode(random: () => number = Math.random): string {
  let code = '';
  for (let i = 0; i < ROOM_CODE_LENGTH; i++) {
    code += ROOM_CODE_ALPHABET[Math.floor(random() * ROOM_CODE_ALPHABET.length)];
  }
  return code;
}

/** Normaliza lo que el estudiante escribe: mayúsculas, sin espacios ni guiones. */
export function normalizeRoomCode(input: string): string {
  return String(input || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, ROOM_CODE_LENGTH);
}

export function isValidRoomCode(code: string): boolean {
  if (code.length !== ROOM_CODE_LENGTH) return false;
  for (const ch of code) if (!ROOM_CODE_ALPHABET.includes(ch)) return false;
  return true;
}

export function sanitizeNickname(input: string): string {
  return String(input || '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, PARTY_LIMITS.maxNicknameLength);
}

export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function buildJoinUrl(origin: string, code: string): string {
  return `${origin.replace(/\/+$/, '')}/party?join=${encodeURIComponent(code)}`;
}

export function toPublicQuestion(q: AppQuestion): PublicQuestion {
  return {
    id: q.id,
    text: q.text,
    context: q.context || undefined,
    options: (q.options || []).map((o) => ({ id: o.id, text: o.text })),
  };
}

/** 1000 puntos por acierto + hasta 500 de bonificación por rapidez. */
export function scoreAnswer(isCorrect: boolean, elapsedMs: number, durationMs: number): number {
  if (!isCorrect) return 0;
  const remaining = Math.max(0, durationMs - Math.max(0, elapsedMs));
  return 1000 + Math.floor((500 * remaining) / Math.max(1, durationMs));
}

export function buildScoreboard(players: PartyPlayerInfo[]): ScoreboardEntry[] {
  const sorted = [...players].sort(
    (a, b) => b.score - a.score || b.correct - a.correct || a.nickname.localeCompare(b.nickname),
  );
  let rank = 0;
  let prevScore: number | null = null;
  return sorted.map((p, i) => {
    if (prevScore === null || p.score !== prevScore) rank = i + 1;
    prevScore = p.score;
    return { playerId: p.id, nickname: p.nickname, score: p.score, correct: p.correct, rank };
  });
}

export function isPartyEnvelope(input: unknown): input is PartyEnvelope {
  if (typeof input !== 'object' || input === null) return false;
  const e = input as Record<string, unknown>;
  return (
    e.v === PARTY_PROTOCOL_VERSION &&
    typeof e.id === 'string' &&
    typeof e.room === 'string' &&
    typeof e.from === 'string' &&
    typeof e.t === 'number' &&
    typeof e.msg === 'object' &&
    e.msg !== null &&
    typeof (e.msg as { type?: unknown }).type === 'string'
  );
}
