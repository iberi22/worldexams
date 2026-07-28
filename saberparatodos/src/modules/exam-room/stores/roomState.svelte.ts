// @ts-nocheck
/**
 * Party State Store (Svelte 5 Runes)
 * Gestión centralizada del estado de la party
 */

import { connectionService } from '../services/connection';
import { antiCheatService } from '../services/antiCheat';
import { p2p } from '../../../lib/p2p-edge-mesh';
import {
  getSupabaseMirrorUser,
  isSupabaseMirrorEnabled,
  maybeAnalyzePartyResults,
  maybePersistPartyResults,
  maybePersistPartySession,
} from '../services/authPersistence';
import type {
  RoomConfig,
  RoomRole,
  Player,
  GameState,
  PlayerAnswer,
  WSMessage,
  SuspiciousEvent,
  RoomResults,
  SubscriptionPlan,
} from '../types';
import { PLAN_LIMITS } from '../types';
import type { AppQuestion } from '../../../lib/api-service';
import {
  defaultQuestionRepository,
  filterValidQuestions,
  prepareStopModeQuestions,
} from '../../../lib/questions';

function getRuntimeCountryCode(): string {
  if (typeof document === 'undefined') return '';

  try {
    const config = document.getElementById('api-config')?.textContent;
    return config
      ? String(JSON.parse(config).countryCode || '').toUpperCase()
      : '';
  } catch {
    return '';
  }
}

class RoomState {
  // State primitivo
  config = $state<RoomConfig | null>(null);
  role = $state<RoomRole>('player');
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
  results = $state<RoomResults | null>(null);
  questions = $state<any[]>([]);
  publicRooms = $state<any[]>([]);

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
   * Crea una nueva sala (solo Host)
   */
  async createRoom(
    hostName: string,
    roomName: string,
    grado: number,
    asignatura: string,
    config: Partial<RoomConfig> = {}
  ): Promise<string> {
    // 1. Check Plan Limits
    const limits = PLAN_LIMITS[this.currentPlan];

    // 🆕 Skip limits for Stop Mode (it's a quick game mode)
    const isStopMode = config.mode === 'stop';

    // Check exams per week (only for standard room mode on free plan)
    if (this.currentPlan === 'free' && !isStopMode) {
      const weeklyCount = parseInt(localStorage.getItem('weekly_exam_count') || '0', 10);
      const lastReset = localStorage.getItem('weekly_exam_reset');
      const now = Date.now();
      const oneWeek = 7 * 24 * 60 * 60 * 1000;

      // Reset counter if a week has passed
      if (!lastReset || (now - parseInt(lastReset, 10)) > oneWeek) {
        localStorage.setItem('weekly_exam_count', '0');
        localStorage.setItem('weekly_exam_reset', now.toString());
      } else if (weeklyCount >= limits.examsPerWeek) {
        throw new Error(`PLAN_LIMIT_REACHED: Has alcanzado el límite de ${limits.examsPerWeek} exámenes por semana.`);
      }
    }

    const roomId = this.generateRoomId();

    // Auth is only consulted when the optional Supabase mirror is enabled.
    const user = await getSupabaseMirrorUser();
    const hostId = user ? user.id : crypto.randomUUID();
    const regionCode = getRuntimeCountryCode();

    this.config = {
      id: roomId,
      name: roomName,
      hostId: hostId,
      hostName,
      maxPlayers: limits.maxPlayers, // Enforce limit
      timePerQuestion: config.timePerQuestion || 60,
      totalQuestions: config.totalQuestions || 20,
      grado,
      asignatura,
      region: regionCode || 'LATAM',
      countryCode: regionCode || undefined,
      connectionMode: config.connectionMode || 'edge-mesh',
      createdAt: new Date(),
      // 🆕 Stop Mode configuration
      mode: config.mode,
      stopConfig: config.stopConfig
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

    // Generate questions
    if (this.config && this.config.mode === 'stop' && this.config.stopConfig) {
      // --- STOP MODE LOGIC ---
      try {
          console.log('[Room] Fetching questions for Stop Mode from Weekly Pack...');
          const selected = await prepareStopModeQuestions({
            repository: defaultQuestionRepository,
            totalQuestions: this.config.totalQuestions,
            includeEnglish: Boolean(this.config.stopConfig.includeEnglish),
            difficulty: this.config.stopConfig.difficulty
          });

          if (selected.length > 0) {
            this.questions = selected;
            console.log(`[Room] Generated ${this.questions.length} questions for Stop Mode`);
          } else {
            throw new Error('No questions found in pool');
          }
      } catch (err) {
          console.error('[Room] Error fetching questions for Stop Mode, using placeholders:', err);
          // Fallback to placeholders if fetch fails
          this.questions = Array.from({ length: this.config.totalQuestions || 10 }, (_, i) => ({
            id: `q-fallback-${i + 1}`,
            text: `(Respaldo) Pregunta de Práctica ${i + 1}`,
            options: [
              { id: 'A', text: 'Opción A' },
              { id: 'B', text: 'Opción B' },
              { id: 'C', text: 'Opción C' },
              { id: 'D', text: 'Opción D' },
            ],
            correctOptionId: 'A',
            grade: 11,
            category: 'General',
            difficulty: 3,
            explanation: 'Pregunta de respaldo cargada debido a un error de conexión con el banco de preguntas.',
          }));
      }
    } else {
      // --- STANDARD MODE (real questions from the validated pack pool) ---
      try {
        const wanted = this.config.totalQuestions || 20;
        console.log(`[Room] Fetching ${wanted} questions for ${asignatura} grado ${grado}...`);

        const pool: AppQuestion[] = [];
        const seen = new Set<string>();
        const maxPages = Math.min(5, Math.ceil(wanted / 10) + 1);
        for (let page = 1; page <= maxPages && pool.length < wanted; page++) {
          const batch = await defaultQuestionRepository.fetchQuestions(grado, asignatura, page);
          if (batch.length === 0) break;
          for (const q of batch) {
            if (q?.id && !seen.has(q.id)) {
              seen.add(q.id);
              pool.push(q);
            }
          }
          if (batch.length < 10) break;
        }

        const { validQuestions } = filterValidQuestions(pool, 4);
        const selected = [...validQuestions]
          .sort(() => Math.random() - 0.5)
          .slice(0, wanted);

        if (selected.length === 0) {
          throw new Error(`Empty question pool for ${asignatura} grado ${grado}`);
        }

        this.questions = selected;
        console.log(`[Room] Loaded ${selected.length} real questions for Standard Mode`);
      } catch (err) {
        console.warn('[Room] Standard Mode pool unavailable, using placeholders:', err);
        this.questions = Array.from({ length: this.config.totalQuestions }, (_, i) => ({
          id: `q-fallback-${i + 1}`,
          text: `(Respaldo) Pregunta ${i + 1} de ${asignatura}`,
          options: [
            { id: 'A', text: 'Opción A' },
            { id: 'B', text: 'Opción B' },
            { id: 'C', text: 'Opción C' },
            { id: 'D', text: 'Opción D' },
          ],
          correctOptionId: 'A',
          grade: grado,
          category: asignatura,
          difficulty: 3,
          explanation: 'Pregunta de respaldo: no se encontraron packs validados para este grado y asignatura.',
        }));
      }
    }

    // Conectar al servicio (Retry logic)
    // edge-mesh + PeerJS signaling needs more than a 2s race
    const connectTimeoutMs =
      this.config.connectionMode === 'edge-mesh' ? 12_000 : 2_000;
    let attempts = 0;
    while (attempts < 2) {
      try {
        await Promise.race([
          connectionService.connect({
            ...this.config,
            nombreUsuario: hostName,
            meshIntent: 'create',
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout')), connectTimeoutMs))
        ]);
        break;
      } catch (e) {
        attempts++;
        console.warn(`[Room] Connection attempt ${attempts} failed:`, e);
        if (attempts === 2) {
          this.connectionStatus = 'disconnected';
          throw e;
        }
        await new Promise(r => setTimeout(r, 500));
      }
    }
    this.connectionStatus = 'connected';

    // edge-mesh: room code real es salon.id — sincronizar si difiere del id local
    if (this.config.connectionMode === 'edge-mesh') {
      const meshCode = connectionService.getCodigoSala();
      if (meshCode && meshCode !== roomId) {
        console.log(`[Room] edge-mesh room code: ${meshCode} (local was ${roomId})`);
        this.config = { ...this.config, id: meshCode };
      }
    }

    // Mirror opcional: nunca participa en discovery y requiere flag + sesión.
    try {
      const mirrored = await maybePersistPartySession({
        party_code: this.config.id,
        host_name: hostName,
        exam_config: {
          ...this.config,
          is_public: true,
          region: regionCode || 'LATAM',
          countryCode: regionCode || null,
        },
        students: [{ id: hostId, name: hostName, joined_at: new Date().toISOString(), ready: true }],
        max_students: limits.maxPlayers,
        status: 'waiting',
        current_question: 0
      });
      if (mirrored) {
        console.log('[Room] Sesión reflejada en Supabase:', this.config.id);
      }
    } catch (dbErr) {
      console.warn('[Room] Falló el mirror opcional; el salón mesh sigue activo:', dbErr);
    }

    // Escuchar mensajes
    connectionService.onMessage(this.handleMessage.bind(this));

    // Registrar al Host en el servidor
    connectionService.broadcast({
      type: 'player_joined',
      player_id: this.currentPlayer!.id,
      player_name: this.currentPlayer!.name,
      player: this.currentPlayer!,
    });

    console.log('[Room] Sala creada:', this.config.id);

    // 🆕 Increment weekly exam counter (only for non-Stop mode)
    if (!isStopMode && this.currentPlan === 'free') {
      const currentCount = parseInt(localStorage.getItem('weekly_exam_count') || '0', 10);
      localStorage.setItem('weekly_exam_count', (currentCount + 1).toString());
    }

    return this.config.id;
  }

  /**
   * Unirse a una sala existente (Player)
   */
  async joinRoom(roomId: string, playerName: string, config: RoomConfig): Promise<void> {
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

    // Conectar (Retry logic)
    const joinTimeoutMs =
      this.config.connectionMode === 'edge-mesh' ? 12_000 : 3_000;
    let attempts = 0;
    while (attempts < 3) {
      try {
        await Promise.race([
          connectionService.connect({
            ...this.config,
            nombreUsuario: playerName,
            meshIntent: 'join',
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout')), joinTimeoutMs))
        ]);
        break;
      } catch (e) {
        attempts++;
        if (attempts === 3) {
          this.connectionStatus = 'disconnected';
          throw e;
        }
        await new Promise(r => setTimeout(r, 1000));
      }
    }
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

    console.log('[Room] Unido a sala:', roomId);
  }

  /**
   * Abandona la sala
   */
  leaveRoom(): void {
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

    console.log('[Room] Sala abandonada');
  }

  /**
   * Host: generate exam on-device and publish via mesh ExamenCompartido.
   * Marks session metadata creador: local-llm (never writes questions_data/).
   */
  async generateQuestionsWithAi(opts?: { count?: number; topic?: string }): Promise<void> {
    if (!this.isHost || !this.config) {
      throw new Error('Solo el host puede generar el examen con IA');
    }
    const { hostGenerateAndPublishExam } = await import('../../../lib/ai/salon-exam-publish');
    const result = await hostGenerateAndPublishExam({
      subject: this.config.asignatura || 'matematicas',
      grade: this.config.grado || 11,
      count: opts?.count ?? this.config.totalQuestions ?? 10,
      topic: opts?.topic,
      countryCode: this.config.countryCode,
    });

    this.questions = result.questions.map((q) => ({
      id: q.id,
      text: q.context ? `${q.context}\n\n${q.statement}` : q.statement,
      options: q.options.map((o) => ({ id: o.letter, text: o.text, feedback: o.feedback })),
      correctOptionId: q.correct_answer,
      explanation: q.explanation,
      grade: this.config!.grado,
      category: this.config!.asignatura,
      difficulty: Number(String(q.difficulty).replace(/\D/g, '')) || 5,
      meta: { creador: 'local-llm', mode: result.mode },
    }));

    if (result.mode === 'pool-assembled' && result.warning) {
      console.warn('[Room] AI generator fallback:', result.warning);
    }
  }

  /**
   * Inicia el juego (solo Host)
   */
  async startGame() {
    if (!this.isHost) return;

    console.log('[Room] Iniciando juego...');

    const startedAt = new Date().toISOString();

    // Send start command to server with questions
    connectionService.broadcast({
      type: 'start_game',
      room_code: this.config?.id,
      player_id: this.currentPlayer?.id,
      questions: this.questions,
      startedAt: startedAt
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

    // 🆕 Calculate Results for Supabase Mode
    const resultsPayload = this.players.map(p => ({
        player_id: p.id,
        player_name: p.name,
        score: p.score || 0,
        correct_answers: p.correctAnswers || 0,
        total_questions: this.config?.totalQuestions || 0,
        average_time_ms: 0 // Placeholder
    })).sort((a, b) => b.score - a.score);

    connectionService.broadcast({
      type: 'finish_game',
      results: resultsPayload
    });

    // Persist to the optional authenticated Supabase mirror.
    if (this.config) {
      try {
        const mirrored = await maybePersistPartyResults({
          config: this.config,
          players: this.players,
        });
        if (mirrored) console.log('[Room] Resultados reflejados en Supabase');
      } catch (err) {
        console.warn('[Room] Falló el mirror de resultados:', err);
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
    if (!isSupabaseMirrorEnabled()) {
      this.aiAnalysis = 'El historial y análisis requieren el mirror autenticado.';
      return;
    }

    try {
      this.aiAnalysis = "Generando análisis con IA...";

      const data = await maybeAnalyzePartyResults(this.config.id);
      if (!data) {
        this.aiAnalysis = 'Inicia sesión para analizar resultados guardados.';
        return;
      }

      this.aiAnalysis = data.analysis;

      // Broadcast to players (optional, maybe just host)
      connectionService.broadcast({
        type: 'ai_analysis_ready',
        analysis: data.analysis
      });

    } catch (err) {
      console.error('[Room] Error requesting AI analysis:', err);
      this.aiAnalysis = "Error al generar análisis. Intenta nuevamente.";
    }
  }

  /**
   * Envía una respuesta (Player)
   */
  submitAnswer(questionId: string, answer: string, timeSpent: number): void {
    if (!this.currentPlayer) return;

    // SCORING: 1000 Base + Speed Bonus
    const totalTime = this.config?.timePerQuestion || 60;
    const timeRemaining = Math.max(0, totalTime - timeSpent);
    const isCorrect = answer === this.currentQuestion?.correctOptionId;

    let score = 0;
    if (isCorrect) {
       const speedBonus = Math.floor(1000 * (timeRemaining / totalTime));
       score = 1000 + speedBonus;
    }

    connectionService.broadcast({
      type: 'question_answered',
      player_id: this.currentPlayer.id,
      question_id: questionId,
      answer,
      isCorrect, // Send correctness
      score,     // Send score
      time_ms: timeSpent * 1000,
    });
  }

  /**
   * Expulsa a un jugador (Solo Host)
   */
  kickPlayer(playerId: string): void {
    if (!this.isHost) return;

    connectionService.broadcast({
      type: 'player_kicked',
      playerId: playerId
    });

    // Remove locally
    this.players = this.players.filter(p => p.id !== playerId);
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

      case 'player_kicked':
        if (this.currentPlayer && this.currentPlayer.id === message.playerId) {
            alert('Has sido expulsado de la sala por el anfitrión.');
            this.leaveRoom();
            window.location.href = '/practica';
        } else {
            this.players = this.players.filter((p) => p.id !== message.playerId);
        }
        break;

      case 'game_started':
        console.log('[Room] Game started! Questions:', message.questions?.length);
        this.gameState.status = 'active';
        this.gameState.startedAt = message.startedAt ? new Date(message.startedAt) : new Date();
        this.questions = message.questions || [];
        // Set initial time remaining based on config
        if (this.config) {
            this.gameState.timeRemaining = this.config.timePerQuestion;
        }
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

        // Adapt Rust results (array) to RoomResults (object)
        const playerResults = message.results || [];
        this.results = {
          roomId: this.config?.id || '',
          roomName: this.config?.name || '',
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
          answer: message.answer,
          isCorrect: message.isCorrect || false,
          score: message.score || 0,
          timeSpent: message.time_ms || 0,
          timestamp: new Date()
        });

        // 🆕 Host Logic: Update Score & Sudden Death
        if (this.isHost) {
            const p = this.players.find(pl => pl.id === message.player_id);
            if (p) {
                p.score = (p.score || 0) + (message.score || 0);
                if (message.isCorrect) {
                  p.correctAnswers = (p.correctAnswers || 0) + 1;
                }
            }

            // ⚡ Sudden Death: If everyone answered, speed up timer
            const currentQ = this.currentQuestion;
            if (currentQ) {
                const answersForQ = this.answers.filter(a => a.questionId === currentQ.id);
                // Only count players who are marked as online or part of game?
                // For robustness, count all players in list.
                if (answersForQ.length >= this.players.length) {
                    console.log('⚡ All players answered! Fast forwarding...');
                    if (this.gameState.timeRemaining > 3) {
                        this.gameState.timeRemaining = 3;
                    }
                }
            }
        }
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
   * Obtiene salas públicas activas
   */
  async fetchPublicRooms(regionFilter?: string) {
    try {
      await p2p.iniciar('lobby-browser');
      const rooms = p2p.listarSalones(regionFilter);
      this.publicRooms = rooms
        .map((room) => ({
          party_code: room.codigo,
          host_name: room.hostPeerId,
          exam_config: {
            id: room.codigo,
            name: room.nombre,
            asignatura: room.subject || 'General',
            grado: room.grade || 11,
            region: room.region || 'LATAM',
            countryCode: room.region,
            connectionMode: 'edge-mesh',
          },
          students: [{ id: room.hostNodoId, name: room.hostPeerId, isHost: true }],
          max_students: room.maxParticipantes || 50,
          status: room.status,
          created_at: new Date(room.createdAt).toISOString(),
        }))
        .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
        .slice(0, 20);
    } catch (err) {
      console.error('[Room] Error fetching public rooms:', err);
      this.publicRooms = [];
    }
  }

  /**
   * Genera ID único para la sala
   */
  private generateRoomId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}

// Exportar instancia singleton
export const roomState = new RoomState();
