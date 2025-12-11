/**
 * Party State Store (Svelte 5 Runes)
 * Gestión centralizada del estado de la party
 */

import { connectionService } from '../services/connection';
import { antiCheatService } from '../services/antiCheat';
import type {
  PartyConfig,
  PartyRole,
  Player,
  GameState,
  PlayerAnswer,
  WSMessage,
  SuspiciousEvent,
  PartyResults,
} from '../types';

class PartyState {
  // State primitivo
  config = $state<PartyConfig | null>(null);
  role = $state<PartyRole>('player');
  currentPlayer = $state<Player | null>(null);
  players = $state<Player[]>([]);
  gameState = $state<GameState>({
    status: 'waiting',
    currentQuestionIndex: 0,
    timeRemaining: 0,
  });
  answers = $state<PlayerAnswer[]>([]);
  connectionStatus = $state<'connected' | 'connecting' | 'disconnected'>('disconnected');

  // Derived state
  isHost = $derived(() => this.role === 'host');
  isGameActive = $derived(() => this.gameState.status === 'active');
  currentQuestion = $derived(() => {
    // TODO: Obtener pregunta actual del banco según gameState.currentQuestionIndex
    return null;
  });
  playersOnline = $derived(() => this.players.filter((p) => p.isOnline).length);
  playersWithSuspiciousActivity = $derived(() =>
    this.players.filter((p) => p.suspiciousActivity.length > 0)
  );

  /**
   * Crea una nueva party (solo Host)
   */
  async createParty(
    hostName: string,
    partyName: string,
    grado: number,
    asignatura: string,
    config: Partial<PartyConfig> = {}
  ): Promise<string> {
    const partyId = this.generatePartyId();

    this.config = {
      id: partyId,
      name: partyName,
      hostId: crypto.randomUUID(),
      hostName,
      maxPlayers: config.maxPlayers || 100,
      timePerQuestion: config.timePerQuestion || 60,
      totalQuestions: config.totalQuestions || 20,
      grado,
      asignatura,
      connectionMode: config.connectionMode || 'supabase',
      createdAt: new Date(),
    };

    this.role = 'host';
    this.currentPlayer = {
      id: this.config.hostId,
      name: hostName,
      isOnline: true,
      isHost: true,
      joinedAt: new Date(),
      leftScreenCount: 0,
      lastActivityAt: new Date(),
      suspiciousActivity: [],
    };

    this.players = [this.currentPlayer];

    // Conectar al servicio
    await connectionService.connect(this.config);
    this.connectionStatus = 'connected';

    // Escuchar mensajes
    connectionService.onMessage(this.handleMessage.bind(this));

    console.log('[Party] Party creada:', partyId);
    return partyId;
  }

  /**
   * Unirse a una party existente (Player)
   */
  async joinParty(partyId: string, playerName: string, config: PartyConfig): Promise<void> {
    this.config = config;
    this.role = 'player';

    this.currentPlayer = {
      id: crypto.randomUUID(),
      name: playerName,
      isOnline: true,
      isHost: false,
      joinedAt: new Date(),
      leftScreenCount: 0,
      lastActivityAt: new Date(),
      suspiciousActivity: [],
    };

    // Conectar
    await connectionService.connect(config);
    this.connectionStatus = 'connected';

    // Escuchar mensajes
    connectionService.onMessage(this.handleMessage.bind(this));

    // Notificar al Host que me uní
    connectionService.broadcast({
      type: 'player_joined',
      player: this.currentPlayer,
    });

    // Iniciar anti-cheat
    antiCheatService.startMonitoring(this.handleSuspiciousActivity.bind(this));

    console.log('[Party] Unido a party:', partyId);
  }

  /**
   * Abandona la party
   */
  leaveParty(): void {
    if (this.currentPlayer) {
      connectionService.broadcast({
        type: 'player_left',
        playerId: this.currentPlayer.id,
      });
    }

    antiCheatService.stopMonitoring();
    connectionService.disconnect();

    // Reset state
    this.config = null;
    this.currentPlayer = null;
    this.players = [];
    this.gameState = { status: 'waiting', currentQuestionIndex: 0, timeRemaining: 0 };
    this.connectionStatus = 'disconnected';

    console.log('[Party] Party abandonada');
  }

  /**
   * Inicia el juego (solo Host)
   */
  startGame(): void {
    if (!this.isHost()) return;

    this.gameState = {
      status: 'active',
      currentQuestionIndex: 0,
      startedAt: new Date(),
      timeRemaining: this.config!.timePerQuestion,
    };

    connectionService.broadcast({
      type: 'game_started',
      startedAt: this.gameState.startedAt!,
    });

    this.startQuestionTimer();
  }

  /**
   * Avanza a la siguiente pregunta (solo Host)
   */
  nextQuestion(): void {
    if (!this.isHost()) return;

    const nextIndex = this.gameState.currentQuestionIndex + 1;

    if (nextIndex >= this.config!.totalQuestions) {
      this.finishGame();
      return;
    }

    this.gameState.currentQuestionIndex = nextIndex;
    this.gameState.timeRemaining = this.config!.timePerQuestion;

    connectionService.broadcast({
      type: 'next_question',
      questionIndex: nextIndex,
    });

    this.startQuestionTimer();
  }

  /**
   * Pausa el juego (solo Host)
   */
  pauseGame(): void {
    if (!this.isHost()) return;

    this.gameState.status = 'paused';
    this.gameState.pausedAt = new Date();

    connectionService.broadcast({
      type: 'game_paused',
      pausedAt: this.gameState.pausedAt,
    });
  }

  /**
   * Finaliza el juego (solo Host)
   */
  finishGame(): void {
    if (!this.isHost()) return;

    this.gameState.status = 'finished';
    this.gameState.finishedAt = new Date();

    const results = this.generateResults();

    connectionService.broadcast({
      type: 'game_finished',
      results,
    });
  }

  /**
   * Envía una respuesta (Player)
   */
  submitAnswer(questionId: string, answer: string, isCorrect: boolean, timeSpent: number): void {
    if (!this.currentPlayer) return;

    const playerAnswer: PlayerAnswer = {
      playerId: this.currentPlayer.id,
      questionId,
      answer,
      isCorrect,
      timeSpent,
      timestamp: new Date(),
    };

    this.answers.push(playerAnswer);

    connectionService.broadcast({
      type: 'player_answer',
      answer: playerAnswer,
    });

    antiCheatService.recordActivity();
  }

  /**
   * Maneja mensajes del WebSocket
   */
  private handleMessage(message: WSMessage): void {
    switch (message.type) {
      case 'player_joined':
        if (!this.players.find((p) => p.id === message.player.id)) {
          this.players.push(message.player);
        }
        break;

      case 'player_left':
        this.players = this.players.filter((p) => p.id !== message.playerId);
        break;

      case 'game_started':
        this.gameState.status = 'active';
        this.gameState.startedAt = new Date(message.startedAt);
        this.startQuestionTimer();
        break;

      case 'next_question':
        this.gameState.currentQuestionIndex = message.questionIndex;
        this.gameState.timeRemaining = this.config!.timePerQuestion;
        this.startQuestionTimer();
        break;

      case 'game_paused':
        this.gameState.status = 'paused';
        this.gameState.pausedAt = new Date(message.pausedAt);
        break;

      case 'game_finished':
        this.gameState.status = 'finished';
        this.gameState.finishedAt = new Date();
        break;

      case 'player_answer':
        if (!this.answers.find((a) => a.playerId === message.answer.playerId && a.questionId === message.answer.questionId)) {
          this.answers.push(message.answer);
        }
        break;

      case 'suspicious_activity':
        const player = this.players.find((p) => p.id === message.playerId);
        if (player) {
          player.suspiciousActivity.push(message.event);
          player.leftScreenCount++;
        }
        break;

      case 'sync_state':
        this.gameState = message.state;
        break;
    }
  }

  /**
   * Maneja eventos anti-cheat
   */
  private handleSuspiciousActivity(event: SuspiciousEvent): void {
    if (!this.currentPlayer) return;

    this.currentPlayer.suspiciousActivity.push(event);
    this.currentPlayer.leftScreenCount++;

    // Notificar al Host
    connectionService.broadcast({
      type: 'suspicious_activity',
      playerId: this.currentPlayer.id,
      event,
    });
  }

  /**
   * Timer de pregunta
   */
  private startQuestionTimer(): void {
    const interval = setInterval(() => {
      if (this.gameState.status !== 'active') {
        clearInterval(interval);
        return;
      }

      this.gameState.timeRemaining--;

      if (this.gameState.timeRemaining <= 0) {
        clearInterval(interval);
        if (this.isHost()) {
          this.nextQuestion();
        }
      }
    }, 1000);
  }

  /**
   * Genera ID único para la party
   */
  private generatePartyId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  /**
   * Genera resultados finales
   */
  private generateResults(): PartyResults {
    // TODO: Implementar cálculo detallado de estadísticas
    return {
      partyId: this.config!.id,
      partyName: this.config!.name,
      totalPlayers: this.players.length,
      completedPlayers: this.players.length,
      averageScore: 0,
      averageTime: 0,
      playerStats: [],
      questionStats: [],
      generatedAt: new Date(),
    };
  }
}

// Exportar instancia singleton
export const partyState = new PartyState();
