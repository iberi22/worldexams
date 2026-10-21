/**
 * PartyHostSession — lógica del docente/host para /party.
 *
 * El host es autoritativo: guarda las preguntas con la respuesta correcta,
 * corre el reloj de cada pregunta, puntúa y difunde el marcador. Su estado se
 * guarda en sessionStorage para poder reanudar la sala tras recargar la página.
 */

import type { AppQuestion } from '../../../lib/api-service';
import type { PartyTransport, TransportStatus } from './transport';
import {
  PARTY_LIMITS,
  PARTY_PROTOCOL_VERSION,
  buildScoreboard,
  clamp,
  generateRoomCode,
  randomId,
  sanitizeNickname,
  scoreAnswer,
  toPublicQuestion,
  type PartyEnvelope,
  type PartyMessage,
  type PartyPhase,
  type PartyPlayerInfo,
  type PartyRoomConfig,
  type PartySnapshot,
  type QuestionPayload,
  type RevealPayload,
  type ScoreboardEntry,
} from './protocol';

export const HOST_STORAGE_KEY = 'wx-party-host-v1';
const HOST_SNAPSHOT_MAX_AGE_MS = 6 * 60 * 60 * 1000;

export type PartyRoomSetup = Omit<PartyRoomConfig, 'code' | 'createdAt'> & { code?: string };

export interface HostSessionOptions {
  transport: PartyTransport;
  storage?: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> | null;
  revealMs?: number;
  heartbeatMs?: number;
  playerTimeoutMs?: number;
}

export interface HostState {
  status: 'idle' | 'connecting' | 'open' | 'closed' | 'error';
  config: PartyRoomConfig | null;
  phase: PartyPhase;
  players: PartyPlayerInfo[];
  currentIndex: number;
  question: QuestionPayload | null;
  /** Epoch ms local en el que se cierra la pregunta actual. */
  deadline: number | null;
  reveal: RevealPayload | null;
  answeredCount: number;
  expectedCount: number;
  scoreboard: ScoreboardEntry[];
  /** Canales activos/pendientes: la UI avisa si solo hay juego en este navegador. */
  transport: TransportStatus;
  error: string | null;
}

interface StoredAnswer {
  optionId: string;
  score: number;
}

interface SavedHostSession {
  savedAt: number;
  hostPeerId: string;
  config: PartyRoomConfig;
  questions: AppQuestion[];
  players: PartyPlayerInfo[];
  answers: Array<[number, Array<[string, StoredAnswer]>]>;
  phase: PartyPhase;
  currentIndex: number;
}

type Listener = (state: HostState) => void;

export class PartyHostSession {
  private transport: PartyTransport;
  private storage: HostSessionOptions['storage'];
  private revealMs: number;
  private heartbeatMs: number;
  private playerTimeoutMs: number;

  private peerId = randomId('host-');
  private config: PartyRoomConfig | null = null;
  private questions: AppQuestion[] = [];
  private players = new Map<string, PartyPlayerInfo>();
  private lastSeen = new Map<string, number>();
  private answers = new Map<number, Map<string, StoredAnswer>>();
  private phase: PartyPhase = 'lobby';
  private currentIndex = -1;
  private questionStartedAt = 0;
  private status: HostState['status'] = 'idle';
  private error: string | null = null;

  private questionTimer: ReturnType<typeof setTimeout> | null = null;
  private revealTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private unsubscribeTransport: (() => void) | null = null;
  private unsubscribeStatus: (() => void) | null = null;
  private listeners = new Set<Listener>();

  constructor(options: HostSessionOptions) {
    this.transport = options.transport;
    this.storage = options.storage ?? null;
    this.revealMs = options.revealMs ?? 4000;
    this.heartbeatMs = options.heartbeatMs ?? 2000;
    this.playerTimeoutMs = options.playerTimeoutMs ?? 10000;
  }

  // ─── API pública ──────────────────────────────────────────────────────

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  getState(): HostState {
    const question = this.phase === 'question' ? this.questionPayload() : null;
    return {
      status: this.status,
      config: this.config,
      phase: this.phase,
      players: this.playerList(),
      currentIndex: this.currentIndex,
      question,
      deadline: question ? Date.now() + question.remainingMs : null,
      reveal: this.phase === 'reveal' && this.currentIndex >= 0 ? this.revealPayload() : null,
      answeredCount: this.answers.get(this.currentIndex)?.size ?? 0,
      expectedCount: this.expectedCount(),
      scoreboard: buildScoreboard(this.playerList()),
      transport: this.transport.getStatus?.() ?? { active: [this.transport.kind], pending: [] },
      error: this.error,
    };
  }

  /** Crea la sala con la configuración elegida por el host y las preguntas reales. */
  async open(setup: PartyRoomSetup, questions: AppQuestion[]): Promise<PartyRoomConfig> {
    if (questions.length === 0) throw new Error('La sala necesita al menos una pregunta.');
    const totalQuestions = Math.min(
      questions.length,
      clamp(setup.totalQuestions, PARTY_LIMITS.minQuestions, PARTY_LIMITS.maxQuestions),
    );
    const config: PartyRoomConfig = {
      code: setup.code || generateRoomCode(),
      hostName: sanitizeNickname(setup.hostName) || 'Docente',
      countryCode: setup.countryCode.toUpperCase(),
      grado: setup.grado,
      asignatura: setup.asignatura,
      asignaturaLabel: setup.asignaturaLabel || setup.asignatura,
      totalQuestions,
      secondsPerQuestion: clamp(
        setup.secondsPerQuestion,
        PARTY_LIMITS.minSecondsPerQuestion,
        PARTY_LIMITS.maxSecondsPerQuestion,
      ),
      maxPlayers: clamp(setup.maxPlayers, 1, PARTY_LIMITS.maxPlayers),
      createdAt: Date.now(),
    };
    this.config = config;
    this.questions = questions.slice(0, totalQuestions);
    this.players.clear();
    this.lastSeen.clear();
    this.answers.clear();
    this.phase = 'lobby';
    this.currentIndex = -1;
    await this.connect();
    return config;
  }

  /** Reanuda una sala guardada (recarga de página del host). */
  async resume(saved: SavedHostSession): Promise<PartyRoomConfig> {
    this.peerId = saved.hostPeerId || this.peerId;
    this.config = saved.config;
    this.questions = saved.questions;
    this.players = new Map(saved.players.map((p) => [p.id, { ...p, online: false }]));
    this.answers = new Map(saved.answers.map(([i, entries]) => [i, new Map(entries)]));
    this.currentIndex = saved.currentIndex;
    this.phase = saved.phase;
    await this.connect();
    this.broadcast({ type: 'player_list', players: this.playerList() });
    if (this.phase === 'question') {
      this.startQuestion(this.currentIndex);
    } else if (this.phase === 'reveal') {
      this.advance();
    } else if (this.phase === 'finished') {
      this.broadcast({ type: 'game_finished', scoreboard: buildScoreboard(this.playerList()) });
    }
    return saved.config;
  }

  static loadSaved(
    storage: Pick<Storage, 'getItem'> | null | undefined,
  ): SavedHostSession | null {
    try {
      const raw = storage?.getItem(HOST_STORAGE_KEY);
      if (!raw) return null;
      const saved = JSON.parse(raw) as SavedHostSession;
      if (!saved?.config?.code || !Array.isArray(saved.questions)) return null;
      if (Date.now() - saved.savedAt > HOST_SNAPSHOT_MAX_AGE_MS) return null;
      return saved;
    } catch {
      return null;
    }
  }

  start(): void {
    if (!this.config || this.phase !== 'lobby') return;
    this.startQuestion(0);
  }

  /** Avanza manualmente: cierra la pregunta actual o salta la pantalla de resultados. */
  next(): void {
    if (this.phase === 'question') this.endQuestion();
    else if (this.phase === 'reveal') this.advance();
  }

  kick(playerId: string): void {
    if (!this.players.has(playerId)) return;
    this.players.delete(playerId);
    this.lastSeen.delete(playerId);
    this.broadcast({ type: 'player_kicked', playerId });
    this.broadcast({ type: 'player_list', players: this.playerList() });
    this.changed();
  }

  /** Cierra la sala para todos y borra el estado guardado. */
  close(): void {
    if (this.status === 'open') this.broadcast({ type: 'room_closed' });
    this.clearTimers();
    this.releaseTransport();
    this.status = 'closed';
    try {
      this.storage?.removeItem(HOST_STORAGE_KEY);
    } catch {
      /* noop */
    }
    this.emit();
  }

  /** Detiene timers sin avisar a los jugadores (p. ej. al desmontar por recarga). */
  dispose(): void {
    this.clearTimers();
    this.releaseTransport();
    this.listeners.clear();
  }

  // ─── Conexión ─────────────────────────────────────────────────────────

  private releaseTransport(): void {
    this.unsubscribeTransport?.();
    this.unsubscribeTransport = null;
    this.unsubscribeStatus?.();
    this.unsubscribeStatus = null;
    this.transport.disconnect();
  }

  private async connect(): Promise<void> {
    if (!this.config) return;
    this.status = 'connecting';
    this.unsubscribeStatus?.();
    // PeerJS se suma después del canal local: refrescar la UI cuando cambie.
    this.unsubscribeStatus = this.transport.onStatusChange?.(() => this.emit()) ?? null;
    this.emit();
    try {
      await this.transport.connect(this.config.code);
    } catch (err) {
      this.status = 'error';
      this.error = err instanceof Error ? err.message : String(err);
      this.emit();
      throw err;
    }
    this.unsubscribeTransport = this.transport.onEnvelope((env) => this.handle(env));
    this.status = 'open';
    this.error = null;
    this.heartbeatTimer = setInterval(() => this.tick(), this.heartbeatMs);
    this.broadcast({ type: 'host_heartbeat', phase: this.phase });
    this.changed();
  }

  private tick(): void {
    const now = Date.now();
    let listChanged = false;
    for (const [id, player] of this.players) {
      const seen = this.lastSeen.get(id) ?? 0;
      if (player.online && now - seen > this.playerTimeoutMs) {
        player.online = false;
        listChanged = true;
      }
    }
    this.broadcast({ type: 'host_heartbeat', phase: this.phase });
    if (listChanged) {
      this.broadcast({ type: 'player_list', players: this.playerList() });
      this.maybeEndQuestionEarly();
      this.changed();
    }
  }

  // ─── Mensajes entrantes ───────────────────────────────────────────────

  private handle(env: PartyEnvelope): void {
    if (!this.config || env.from === this.peerId) return;
    const msg = env.msg;
    switch (msg.type) {
      case 'join_request':
        this.onJoinRequest(msg.playerId, msg.nickname);
        break;
      case 'player_heartbeat':
        this.touch(msg.playerId);
        break;
      case 'answer':
        this.touch(msg.playerId);
        this.onAnswer(msg.playerId, msg.index, msg.optionId);
        break;
      case 'player_leave':
        this.onLeave(msg.playerId);
        break;
      default:
        break;
    }
  }

  private onJoinRequest(playerId: string, rawNickname: string): void {
    const config = this.config!;
    const existing = this.players.get(playerId);
    if (existing) {
      // Reconexión del mismo jugador (recarga de página): conserva su puntaje.
      existing.online = true;
      this.lastSeen.set(playerId, Date.now());
      this.broadcast({ type: 'join_accepted', playerId, config, snapshot: this.snapshotFor(playerId) });
      this.broadcast({ type: 'player_list', players: this.playerList() });
      this.changed();
      return;
    }

    const nickname = sanitizeNickname(rawNickname);
    if (!nickname) return;
    const taken = [...this.players.values()].some(
      (p) => p.nickname.toLowerCase() === nickname.toLowerCase(),
    );
    if (taken) {
      this.broadcast({ type: 'join_rejected', playerId, reason: 'nickname_taken' });
      return;
    }
    if (this.players.size >= config.maxPlayers) {
      this.broadcast({ type: 'join_rejected', playerId, reason: 'room_full' });
      return;
    }

    this.players.set(playerId, { id: playerId, nickname, online: true, score: 0, correct: 0 });
    this.lastSeen.set(playerId, Date.now());
    this.broadcast({ type: 'join_accepted', playerId, config, snapshot: this.snapshotFor(playerId) });
    this.broadcast({ type: 'player_list', players: this.playerList() });
    this.changed();
  }

  private touch(playerId: string): void {
    const player = this.players.get(playerId);
    if (!player) return;
    this.lastSeen.set(playerId, Date.now());
    if (!player.online) {
      player.online = true;
      this.broadcast({ type: 'player_list', players: this.playerList() });
      this.changed();
    }
  }

  private onAnswer(playerId: string, index: number, optionId: string): void {
    const player = this.players.get(playerId);
    if (!player || this.phase !== 'question' || index !== this.currentIndex) return;
    const bucket = this.answers.get(index) ?? new Map<string, StoredAnswer>();
    if (bucket.has(playerId)) return;

    const question = this.questions[index];
    const isCorrect = optionId === question.correctOptionId;
    const score = scoreAnswer(isCorrect, Date.now() - this.questionStartedAt, this.durationMs());
    bucket.set(playerId, { optionId, score });
    this.answers.set(index, bucket);
    player.score += score;
    if (isCorrect) player.correct += 1;

    this.broadcast({
      type: 'progress',
      index,
      answered: bucket.size,
      expected: this.expectedCount(),
    });
    this.changed();
    this.maybeEndQuestionEarly();
  }

  private onLeave(playerId: string): void {
    const player = this.players.get(playerId);
    if (!player) return;
    if (this.phase === 'lobby') this.players.delete(playerId);
    else player.online = false;
    this.lastSeen.delete(playerId);
    this.broadcast({ type: 'player_list', players: this.playerList() });
    this.changed();
    this.maybeEndQuestionEarly();
  }

  // ─── Flujo de la partida ──────────────────────────────────────────────

  private startQuestion(index: number): void {
    this.clearRoundTimers();
    this.phase = 'question';
    this.currentIndex = index;
    this.questionStartedAt = Date.now();
    this.questionTimer = setTimeout(() => this.endQuestion(), this.durationMs());
    this.broadcast({ type: 'question', payload: this.questionPayload() });
    this.changed();
  }

  private maybeEndQuestionEarly(): void {
    if (this.phase !== 'question') return;
    const expected = this.expectedCount();
    const answered = this.answers.get(this.currentIndex)?.size ?? 0;
    if (expected > 0 && answered >= expected) this.endQuestion();
  }

  private endQuestion(): void {
    if (this.phase !== 'question') return;
    this.clearRoundTimers();
    this.phase = 'reveal';
    this.broadcast({ type: 'question_result', payload: this.revealPayload() });
    this.revealTimer = setTimeout(() => this.advance(), this.revealMs);
    this.changed();
  }

  private advance(): void {
    this.clearRoundTimers();
    const nextIndex = this.currentIndex + 1;
    if (nextIndex < this.questions.length) {
      this.startQuestion(nextIndex);
      return;
    }
    this.phase = 'finished';
    this.broadcast({ type: 'game_finished', scoreboard: buildScoreboard(this.playerList()) });
    this.changed();
  }

  // ─── Payloads ─────────────────────────────────────────────────────────

  private durationMs(): number {
    return (this.config?.secondsPerQuestion ?? 20) * 1000;
  }

  private expectedCount(): number {
    let count = 0;
    for (const p of this.players.values()) if (p.online) count++;
    return count;
  }

  private playerList(): PartyPlayerInfo[] {
    return [...this.players.values()].map((p) => ({ ...p }));
  }

  private questionPayload(): QuestionPayload {
    const duration = this.durationMs();
    return {
      index: this.currentIndex,
      total: this.questions.length,
      question: toPublicQuestion(this.questions[this.currentIndex]),
      durationMs: duration,
      remainingMs: Math.max(0, duration - (Date.now() - this.questionStartedAt)),
    };
  }

  private revealPayload(): RevealPayload {
    const question = this.questions[this.currentIndex];
    return {
      index: this.currentIndex,
      correctOptionId: question.correctOptionId,
      explanation: question.explanation,
      scoreboard: buildScoreboard(this.playerList()),
    };
  }

  private snapshotFor(playerId: string): PartySnapshot {
    return {
      phase: this.phase,
      players: this.playerList(),
      question: this.phase === 'question' ? this.questionPayload() : undefined,
      reveal: this.phase === 'reveal' ? this.revealPayload() : undefined,
      yourAnswer: this.answers.get(this.currentIndex)?.get(playerId)?.optionId,
      scoreboard: buildScoreboard(this.playerList()),
    };
  }

  // ─── Utilidades ───────────────────────────────────────────────────────

  private broadcast(msg: PartyMessage): void {
    if (!this.config || this.status !== 'open') return;
    this.transport.send({
      v: PARTY_PROTOCOL_VERSION,
      id: randomId(),
      room: this.config.code,
      from: this.peerId,
      t: Date.now(),
      msg,
    });
  }

  private clearRoundTimers(): void {
    if (this.questionTimer) clearTimeout(this.questionTimer);
    if (this.revealTimer) clearTimeout(this.revealTimer);
    this.questionTimer = null;
    this.revealTimer = null;
  }

  private clearTimers(): void {
    this.clearRoundTimers();
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = null;
  }

  private changed(): void {
    this.persist();
    this.emit();
  }

  private persist(): void {
    if (!this.storage || !this.config || this.status !== 'open') return;
    const saved: SavedHostSession = {
      savedAt: Date.now(),
      hostPeerId: this.peerId,
      config: this.config,
      questions: this.questions,
      players: this.playerList(),
      answers: [...this.answers.entries()].map(([i, m]) => [i, [...m.entries()]]),
      phase: this.phase,
      currentIndex: this.currentIndex,
    };
    try {
      this.storage.setItem(HOST_STORAGE_KEY, JSON.stringify(saved));
    } catch {
      /* cuota llena: la sala sigue, solo no se podrá reanudar */
    }
  }

  private emit(): void {
    const state = this.getState();
    for (const listener of [...this.listeners]) listener(state);
  }
}

export type { SavedHostSession };
