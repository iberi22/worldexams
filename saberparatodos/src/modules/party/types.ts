/**
 * Party Mode Types
 * Sistema de aula virtual multiplayer para exámenes sincronizados
 */

export type ConnectionMode = 'supabase' | 'local';

export type PartyRole = 'host' | 'player';

export type PartyStatus = 'waiting' | 'active' | 'paused' | 'finished';

export interface PartyConfig {
  id: string;
  name: string;
  hostId: string;
  hostName: string;
  maxPlayers: number;
  timePerQuestion: number; // segundos
  totalQuestions: number;
  grado: number;
  asignatura: string;
  connectionMode: ConnectionMode;
  createdAt: Date;
}

export interface Player {
  id: string;
  name: string;
  isOnline: boolean;
  isHost: boolean;
  joinedAt: Date;
  // Anti-cheat tracking
  leftScreenCount: number;
  lastActivityAt: Date;
  suspiciousActivity: SuspiciousEvent[];
}

export interface SuspiciousEvent {
  type: 'tab_switch' | 'window_blur' | 'page_hidden' | 'long_inactivity';
  timestamp: Date;
  duration?: number; // ms
}

export interface GameState {
  status: PartyStatus;
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

export interface PartyResults {
  partyId: string;
  partyName: string;
  totalPlayers: number;
  completedPlayers: number;
  averageScore: number;
  averageTime: number; // ms
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
  recommendation: string;
}

export interface QuestionStats {
  questionId: string;
  correctCount: number;
  incorrectCount: number;
  averageTime: number; // ms
  difficultyPerceived: number; // 1-5 basado en % de aciertos
}

// WebSocket Messages
export type WSMessage =
  | { type: 'player_joined'; player: Player }
  | { type: 'player_left'; playerId: string }
  | { type: 'game_started'; startedAt: Date }
  | { type: 'next_question'; questionIndex: number }
  | { type: 'game_paused'; pausedAt: Date }
  | { type: 'game_resumed'; resumedAt: Date }
  | { type: 'game_finished'; results: PartyResults }
  | { type: 'player_answer'; answer: PlayerAnswer }
  | { type: 'suspicious_activity'; playerId: string; event: SuspiciousEvent }
  | { type: 'host_message'; message: string }
  | { type: 'sync_state'; state: GameState };
