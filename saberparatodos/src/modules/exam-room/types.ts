/**
 * Room Mode Types
 * Sistema de aula virtual multiplayer para exámenes sincronizados
 */

/** edge-mesh = default; supabase = opt-in mirror/legacy; local = rust/legacy */
export type ConnectionMode = 'edge-mesh' | 'supabase' | 'local';

export type SubscriptionPlan = 'free' | 'pro' | 'institutional';

export const PLAN_LIMITS = {
  free: {
    maxPlayers: 10,
    examsPerWeek: 10, // Increased from 1 to 10
    allowAiAnalysis: false,
    allowExportPdf: false,
  },
  pro: {
    maxPlayers: 100,
    examsPerWeek: 50,
    allowAiAnalysis: true,
    allowExportPdf: true,
  },
  institutional: {
    maxPlayers: 1000,
    examsPerWeek: Infinity,
    allowAiAnalysis: true,
    allowExportPdf: true,
  },
};

export type RoomRole = 'host' | 'player';

export type RoomStatus = 'waiting' | 'active' | 'paused' | 'finished';

export interface RoomConfig {
  id: string;
  name: string;
  hostId: string;
  hostName: string;
  maxPlayers: number;
  timePerQuestion: number; // segundos
  totalQuestions: number;
  grado: number;
  asignatura: string;
  passwordPin?: string; // PIN opcional de 4-6 dígitos
  resultsVisibility?: 'all' | 'host_and_player_only'; // Privacidad de resultados
  /** Mesh registry metadata used for regional discovery. */
  region?: string;
  countryCode?: string;
  connectionMode: ConnectionMode;
  mode?: 'standard' | 'stop';
  stopConfig?: {
    includeEnglish: boolean;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  createdAt: Date;
}

/** Connection service alias — RoomConfig + optional display name for mesh peer. */
export type PartyConfig = RoomConfig & {
  nombreUsuario?: string;
  /** edge-mesh: create announces a salon; join discovers it by room code. */
  meshIntent?: 'create' | 'join';
};

export interface Player {
  id: string;
  name: string;
  isOnline: boolean;
  isHost: boolean;
  joinedAt: Date;
  blockedUntil?: number; // Epoch ms timestamp for timeout (5 min)
  isKicked?: boolean;
  // Anti-cheat tracking
  leftScreenCount: number;
  lastActivityAt: Date;
  suspiciousActivity: SuspiciousEvent[];
}

export interface SuspiciousEvent {
  type:
    | 'tab_switch'
    | 'window_blur'
    | 'page_hidden'
    | 'long_inactivity'
    | 'fullscreen_exit'
    | 'orientation_change'
    | 'resize_suspicious'
    | 'no_face'
    | 'multiple_faces'
    | 'face_mismatch';
  timestamp: Date;
  duration?: number; // ms
}

export interface GameState {
  status: RoomStatus;
  currentQuestionIndex: number;
  startedAt?: Date;
  pausedAt?: Date;
  finishedAt?: Date;
  timeRemaining: number; // segundos
}

export interface PlayerAnswer {
  playerId: string;
  questionId: string;
  answer: string;
  isCorrect: boolean;
  timeSpent: number; // ms
  timestamp: Date;
}

export interface RoomResults {
  roomId: string;
  roomName: string;
  totalPlayers: number;
  completedPlayers: number;
  averageScore: number;
  averageTime: number; // ms
  resultsVisibility?: 'all' | 'host_and_player_only';
  playerStats: PlayerStats[];
  questionStats: QuestionStats[];
  generatedAt: Date;
}

export interface PlayerStats {
  playerId: string;
  playerName: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  averageTimePerQuestion: number; // ms
  fastestAnswer: number; // ms
  slowestAnswer: number; // ms
  suspiciousEvents: number;
  integrityLevel?: 'green' | 'yellow' | 'red';
  suspiciousLog?: SuspiciousEvent[];
  recommendation: string;
}

export interface QuestionStats {
  questionId: string;
  correctCount: number;
  incorrectCount: number;
  averageTime: number; // ms
  difficultyPerceived: number; // 1-5 basado en % de aciertos
  mostChosenDistractor?: string;
}

// WebSocket Messages
export type WSMessage =
  | { type: 'player_joined'; player_id: string; player_name: string; player?: Player }
  | { type: 'player_left'; playerId: string }
  | { type: 'player_list_update'; players: Partial<Player>[] }
  | { type: 'game_started'; startedAt: Date }
  | { type: 'next_question'; questionIndex: number }
  | { type: 'game_paused'; pausedAt: Date }
  | { type: 'game_resumed'; resumedAt: Date }
  | { type: 'game_finished'; results: RoomResults }
  | { type: 'player_answer'; answer: PlayerAnswer }
  | { type: 'suspicious_activity'; playerId: string; event: SuspiciousEvent }
  | { type: 'host_message'; message: string }
  | { type: 'peer_kicked'; targetPlayerId: string; reason?: string }
  | { type: 'peer_timeout'; targetPlayerId: string; durationMs: number; blockedUntil: number }
  | { type: 'sync_state'; state: GameState };
