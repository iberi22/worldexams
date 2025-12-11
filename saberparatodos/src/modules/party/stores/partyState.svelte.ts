/**
 * Party State Store (Svelte 5 Runes)
 * Gestión centralizada del estado de la party
 */

import { connectionService } from '../services/connection';
import { antiCheatService } from '../services/antiCheat';
import { supabase } from '../../../lib/supabase';
import type {
  PartyConfig,
  PartyRole,
  Player,
  GameState,
  PlayerAnswer,
  WSMessage,
  SuspiciousEvent,
  PartyResults,
  SubscriptionPlan,
} from '../types';
import { PLAN_LIMITS } from '../types';

class PartyState {
  // State primitivo
  config = $state<PartyConfig | null>(null);
  role = $state<PartyRole>('player');
  currentPlan = $state<SubscriptionPlan>('free'); // Default to free
  currentPlayer = $state<Player | null>(null);
  players = $state<Player[]>([]);
  gameState = $state<GameState>({
    status: 'waiting',
    currentQuestionIndex: 0,
    timeRemaining: 0,
  });
  answers = $state<PlayerAnswer[]>([]);
  connectionStatus = $state<'connected' | 'connecting' | 'disconnected'>('disconnected');
  aiAnalysis = $state<string | null>(null);
  results = $state<PartyResults | null>(null);
  questions = $state<any[]>([]);

  // Derived state
  get isHost() { return this.role === 'host'; }
  get isGameActive() { return this.gameState.status === 'active'; }
  get currentQuestion() {
    if (this.questions.length === 0) return null;
    return this.questions[this.gameState.currentQuestionIndex];
  }
  get playersOnline() { return this.players.filter((p) => p.isOnline).length; }
  get playersWithSuspiciousActivity() {
    return this.players.filter((p) => p.suspiciousActivity.length > 0);
  }

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
    // 1. Check Plan Limits
    const limits = PLAN_LIMITS[this.currentPlan];
    
    // Check exams per week (Simple LocalStorage check for MVP)
    if (this.currentPlan === 'free') {
      const lastExam = localStorage.getItem('last_exam_date');
      if (lastExam) {
        const daysSince = (new Date().getTime() - new Date(lastExam).getTime()) / (1000 * 3600 * 24);
        if (daysSince < 7) {
          throw new Error('PLAN_LIMIT_REACHED: Solo puedes crear 1 examen por semana en el plan gratuito.');
        }
      }
    }

    const partyId = this.generatePartyId();

    // Try to get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    const hostId = user ? user.id : crypto.randomUUID();

    this.config = {
      id: partyId,
      name: partyName,
      hostId: hostId,
      hostName,
      maxPlayers: limits.maxPlayers, // Enforce limit
      timePerQuestion: config.timePerQuestion || 60,
      totalQuestions: config.totalQuestions || 20,
      grado,
      asignatura,
      connectionMode: config.connectionMode || 'supabase',
      createdAt: new Date(),
    };

    // Record exam creation
    if (this.currentPlan === 'free') {
      localStorage.setItem('last_exam_date', new Date().toISOString());
    }

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

    // Generate mock questions for now
    this.questions = Array.from({ length: this.config.totalQuestions }, (_, i) => ({
      id: `q-${i + 1}`,
      enunciado: `Pregunta ${i + 1} de ${asignatura}`,
      opciones: [
        { id: 'A', texto: 'Opción A', es_correcta: true },
        { id: 'B', texto: 'Opción B', es_correcta: false },
        { id: 'C', texto: 'Opción C', es_correcta: false },
        { id: 'D', texto: 'Opción D', es_correcta: false },
      ],
      explicacion: 'Explicación de la respuesta correcta',
    }));

    // Conectar al servicio
    await connectionService.connect(this.config);
    this.connectionStatus = 'connected';

    // Escuchar mensajes
    connectionService.onMessage(this.handleMessage.bind(this));

    // Registrar al Host en el servidor
    connectionService.broadcast({
      type: 'player_joined',
      player_id: this.currentPlayer!.id,
      player_name: this.currentPlayer!.name,
      player: this.currentPlayer!,
    });

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
      player_id: this.currentPlayer!.id,
      player_name: this.currentPlayer!.name,
      player: this.currentPlayer!,
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
  async startGame() {
    if (!this.isHost) return;
    
    console.log('[Party] Iniciando juego...');
    
    // Send start command to server with questions
    connectionService.broadcast({
      type: 'start_game',
      party_code: this.partyCode,
      player_id: this.playerId,
      questions: this.questions
    });
  }

  /**
   * Avanza a la siguiente pregunta (solo Host)
   */
  nextQuestion(): void {
    if (!this.isHost) return;

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
  }

  /**
   * Pausa el juego (solo Host)
   */
  pauseGame(): void {
    if (!this.isHost) return;

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
  async finishGame(): Promise<void> {
    if (!this.isHost) return;

    connectionService.broadcast({
      type: 'finish_game',
    });

    // Persist to Supabase (if authenticated)
    if (this.config) {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && user.id === this.config.hostId) {
        try {
          // 1. Save Party
          const { error: partyError } = await supabase
            .from('parties')
            .insert({
              id: this.config.id,
              pin: this.config.id, // Using ID as PIN for now
              host_id: user.id,
              status: 'finished',
              config: this.config,
              total_questions: this.config.totalQuestions,
              ended_at: new Date().toISOString(),
            });

          if (partyError) {
            console.error('[Party] Error saving party:', partyError);
          } else {
            // 2. Save Players
            const playersData = this.players.map(p => ({
              party_id: this.config!.id,
              player_id: p.id,
              nickname: p.name,
              score: p.score || 0,
              rank: p.rank,
              correct_answers: p.correctAnswers || 0,
              joined_at: p.joinedAt.toISOString()
            }));

            const { error: playersError } = await supabase
              .from('party_players')
              .insert(playersData);

            if (playersError) console.error('[Party] Error saving players:', playersError);
            else console.log('[Party] Results saved to Supabase');
          }
        } catch (err) {
          console.error('[Party] Failed to persist data:', err);
        }
      }
    }
  }

  /**
   * Solicita análisis de IA
   */
  async requestAIAnalysis(): Promise<void> {
    const limits = PLAN_LIMITS[this.currentPlan];
    if (!limits.allowAiAnalysis) {
      alert('Esta función requiere el Plan Pro o Institucional.');
      return;
    }

    if (!this.config?.id) return;

    try {
      this.aiAnalysis = "Generando análisis con IA...";
      
      const { data, error } = await supabase.functions.invoke('analyze-party-results', {
        body: { partyId: this.config.id }
      });

      if (error) throw error;

      this.aiAnalysis = data.analysis;

      // Broadcast to players (optional, maybe just host)
      connectionService.broadcast({
        type: 'ai_analysis_ready',
        analysis: data.analysis
      });

    } catch (err) {
      console.error('[Party] Error requesting AI analysis:', err);
      this.aiAnalysis = "Error al generar análisis. Intenta nuevamente.";
    }
  }

  /**
   * Envía una respuesta (Player)
   */
  submitAnswer(questionId: string, answer: string, timeSpent: number): void {
    if (!this.currentPlayer) return;

    connectionService.broadcast({
      type: 'question_answered',
      player_id: this.currentPlayer.id,
      question_id: questionId,
      answer,
      time_ms: timeSpent * 1000,
    });
  }

  /**
   * Maneja mensajes del WebSocket
   */
  private handleMessage(message: WSMessage): void {
    switch (message.type) {
      case 'player_list_update':
        this.players = message.players.map((p: any) => {
          const existing = this.players.find((ep) => ep.id === p.id);
          if (existing) {
            return { ...existing, ...p, isOnline: true };
          }
          return {
            id: p.id,
            name: p.name,
            isOnline: true,
            isHost: p.isHost || false,
            joinedAt: new Date(),
            leftScreenCount: 0,
            lastActivityAt: new Date(),
            suspiciousActivity: [],
          };
        });
        break;

      case 'player_joined': {
        const player = message.player || {
          id: message.player_id,
          name: message.player_name,
          isOnline: true,
          isHost: false,
          joinedAt: new Date(),
          leftScreenCount: 0,
          lastActivityAt: new Date(),
          suspiciousActivity: [],
        };
        if (!this.players.find((p) => p.id === player.id)) {
          this.players.push(player);
        }
        break;
      }

      case 'player_left':
        this.players = this.players.filter((p) => p.id !== message.playerId);
        break;

      case 'game_started':
        console.log('[Party] Game started! Questions:', message.questions?.length);
        this.gameState.status = 'active';
        this.gameState.startedAt = new Date();
        this.questions = message.questions || [];
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
        
        // Adapt Rust results (array) to PartyResults (object)
        const playerResults = message.results || [];
        this.results = {
          partyId: this.config?.id || '',
          partyName: this.config?.name || '',
          totalPlayers: playerResults.length,
          completedPlayers: playerResults.length, // Assuming all finished
          averageScore: playerResults.reduce((acc: number, p: any) => acc + p.score, 0) / (playerResults.length || 1),
          averageTime: playerResults.reduce((acc: number, p: any) => acc + p.average_time_ms, 0) / (playerResults.length || 1),
          playerStats: playerResults.map((p: any) => ({
            playerId: p.player_id,
            playerName: p.player_name,
            score: p.score,
            correctAnswers: p.correct_answers,
            totalQuestions: p.total_questions,
            averageTimePerQuestion: p.average_time_ms,
            fastestAnswer: 0, // Not provided by Rust yet
            slowestAnswer: 0, // Not provided by Rust yet
            suspiciousEvents: 0, // Not provided by Rust yet
            recommendation: 'Buen trabajo' // Placeholder
          })),
          questionStats: [], // Not provided by Rust yet
          generatedAt: new Date()
        };
        break;

      case 'ai_analysis_result':
        this.aiAnalysis = message.analysis;
        break;

      case 'player_answered':
        this.answers.push({
          playerId: message.player_id,
          questionId: message.question_id,
          answer: '', // Unknown to host until end
          isCorrect: false,
          timeSpent: 0,
          timestamp: new Date()
        });
        break;

      case 'suspicious_activity': {
        const player = this.players.find((p) => p.id === message.playerId);
        if (player) {
          player.suspiciousActivity.push(message.event);
          player.leftScreenCount++;
        }
        break;
      }

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
        if (this.isHost) {
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
