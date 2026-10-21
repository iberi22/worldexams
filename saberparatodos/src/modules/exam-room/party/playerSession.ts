/**
 * PartyPlayerSession — lógica del estudiante para /party.
 *
 * El jugador no conoce la configuración de la sala hasta que el host la envía
 * en `join_accepted`. Si el host no responde, la unión falla con un error claro
 * (sala no encontrada) en lugar de entrar a una sala inventada.
 */

import type { PartyTransport } from './transport';
import {
  PARTY_ERROR_MESSAGES,
  PARTY_PROTOCOL_VERSION,
  PartyError,
  normalizeRoomCode,
  randomId,
  sanitizeNickname,
  type PartyEnvelope,
  type PartyErrorCode,
  type PartyMessage,
  type PartyPhase,
  type PartyPlayerInfo,
  type PartyRoomConfig,
  type PartySnapshot,
  type QuestionPayload,
  type RevealPayload,
  type ScoreboardEntry,
} from './protocol';

export const PLAYER_STORAGE_KEY = 'wx-party-player-v1';
const PLAYER_SESSION_MAX_AGE_MS = 6 * 60 * 60 * 1000;

export interface PlayerSessionOptions {
  transport: PartyTransport;
  storage?: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> | null;
  joinTimeoutMs?: number;
  joinRetryMs?: number;
  heartbeatMs?: number;
  hostTimeoutMs?: number;
}

export interface PlayerResult {
  correct: boolean;
  gained: number;
}

export interface PlayerState {
  status: 'idle' | 'joining' | 'joined' | 'error' | 'left';
  playerId: string;
  nickname: string;
  config: PartyRoomConfig | null;
  phase: PartyPhase;
  players: PartyPlayerInfo[];
  question: QuestionPayload | null;
  /** Epoch ms local en el que se cierra la pregunta actual. */
  deadline: number | null;
  selected: string | null;
  reveal: RevealPayload | null;
  lastResult: PlayerResult | null;
  scoreboard: ScoreboardEntry[];
  me: ScoreboardEntry | null;
  answeredCount: number;
  expectedCount: number;
  error: { code: PartyErrorCode; message: string } | null;
}

export interface SavedPlayerSession {
  savedAt: number;
  room: string;
  playerId: string;
  nickname: string;
}

type Listener = (state: PlayerState) => void;

export class PartyPlayerSession {
  private transport: PartyTransport;
  private storage: PlayerSessionOptions['storage'];
  private joinTimeoutMs: number;
  private joinRetryMs: number;
  private heartbeatMs: number;
  private hostTimeoutMs: number;

  private peerId = randomId('player-');
  private room = '';
  private state: PlayerState;
  private lastHostSeen = 0;
  private scoreBeforeReveal = 0;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private unsubscribeTransport: (() => void) | null = null;
  private pendingJoin: {
    resolve: (config: PartyRoomConfig) => void;
    reject: (err: PartyError) => void;
    retry: ReturnType<typeof setInterval>;
    timeout: ReturnType<typeof setTimeout>;
  } | null = null;
  private listeners = new Set<Listener>();

  constructor(options: PlayerSessionOptions) {
    this.transport = options.transport;
    this.storage = options.storage ?? null;
    // PeerJS necesita la señalización y WebRTC antes de que llegue la respuesta del host.
    this.joinTimeoutMs = options.joinTimeoutMs ?? 15000;
    this.joinRetryMs = options.joinRetryMs ?? 1500;
    this.heartbeatMs = options.heartbeatMs ?? 2500;
    this.hostTimeoutMs = options.hostTimeoutMs ?? 9000;
    this.state = {
      status: 'idle',
      playerId: '',
      nickname: '',
      config: null,
      phase: 'lobby',
      players: [],
      question: null,
      deadline: null,
      selected: null,
      reveal: null,
      lastResult: null,
      scoreboard: [],
      me: null,
      answeredCount: 0,
      expectedCount: 0,
      error: null,
    };
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  getState(): PlayerState {
    return { ...this.state };
  }

  static loadSaved(storage: Pick<Storage, 'getItem'> | null | undefined): SavedPlayerSession | null {
    try {
      const raw = storage?.getItem(PLAYER_STORAGE_KEY);
      if (!raw) return null;
      const saved = JSON.parse(raw) as SavedPlayerSession;
      if (!saved?.room || !saved.playerId || !saved.nickname) return null;
      if (Date.now() - saved.savedAt > PLAYER_SESSION_MAX_AGE_MS) return null;
      return saved;
    } catch {
      return null;
    }
  }

  /**
   * Se une a la sala `code`. Pasa `playerId` para reconectar con la misma
   * identidad (y puntaje) tras recargar la página.
   */
  async join(code: string, rawNickname: string, playerId?: string): Promise<PartyRoomConfig> {
    const room = normalizeRoomCode(code);
    const nickname = sanitizeNickname(rawNickname);
    if (!room) throw this.fail('room_not_found');
    this.stopTimers();
    this.room = room;
    this.update({
      status: 'joining',
      playerId: playerId || randomId('p-'),
      nickname,
      config: null,
      error: null,
    });

    try {
      if (!this.unsubscribeTransport) {
        await this.transport.connect(room);
        this.unsubscribeTransport = this.transport.onEnvelope((env) => this.handle(env));
      }
    } catch (err) {
      this.transport.disconnect();
      throw this.fail('transport_unavailable', err instanceof Error ? err.message : undefined);
    }

    return new Promise<PartyRoomConfig>((resolve, reject) => {
      const request = () =>
        this.send({ type: 'join_request', playerId: this.state.playerId, nickname: this.state.nickname });
      const retry = setInterval(request, this.joinRetryMs);
      const timeout = setTimeout(() => {
        this.pendingJoin = null;
        clearInterval(retry);
        this.teardownTransport();
        reject(this.fail('room_not_found'));
      }, this.joinTimeoutMs);
      this.pendingJoin = { resolve, reject, retry, timeout };
      request();
    });
  }

  answer(optionId: string): void {
    const q = this.state.question;
    if (this.state.phase !== 'question' || !q || this.state.selected) return;
    this.update({ selected: optionId });
    this.send({ type: 'answer', playerId: this.state.playerId, index: q.index, optionId });
  }

  /** Sale de la sala a propósito: avisa al host y olvida la sesión guardada. */
  leave(): void {
    if (this.state.status === 'joined') {
      this.send({ type: 'player_leave', playerId: this.state.playerId });
    }
    this.clearSaved();
    this.teardownTransport();
    this.update({ status: 'left' });
  }

  /** Libera recursos sin avisar al host (recarga/cierre de pestaña). */
  dispose(): void {
    this.teardownTransport();
    this.listeners.clear();
  }

  // ─── Mensajes entrantes ───────────────────────────────────────────────

  private handle(env: PartyEnvelope): void {
    // Solo el host habla con los jugadores; ignoramos el tráfico de otros jugadores.
    if (!env.from.startsWith('host-')) return;
    this.lastHostSeen = Date.now();
    const msg = env.msg;

    // El host volvió (recargó su página): re-sincronizamos con un nuevo join.
    if (this.state.status === 'error' && this.state.error?.code === 'host_left' && msg.type !== 'room_closed') {
      this.update({ status: 'joined', error: null });
      this.send({ type: 'join_request', playerId: this.state.playerId, nickname: this.state.nickname });
    }

    switch (msg.type) {
      case 'join_accepted':
        if (msg.playerId === this.state.playerId) this.onAccepted(msg.config, msg.snapshot);
        break;
      case 'join_rejected':
        if (msg.playerId === this.state.playerId && this.pendingJoin) {
          const pending = this.pendingJoin;
          this.pendingJoin = null;
          clearInterval(pending.retry);
          clearTimeout(pending.timeout);
          this.teardownTransport();
          pending.reject(this.fail(msg.reason));
        }
        break;
      case 'player_list':
        if (this.state.status === 'joined') this.applyPlayers(msg.players);
        break;
      case 'question':
        if (this.state.status === 'joined') this.applyQuestion(msg.payload);
        break;
      case 'progress':
        if (this.state.question?.index === msg.index) {
          this.update({ answeredCount: msg.answered, expectedCount: msg.expected });
        }
        break;
      case 'question_result':
        if (this.state.status === 'joined') this.applyReveal(msg.payload);
        break;
      case 'game_finished':
        if (this.state.status === 'joined') {
          this.update({
            phase: 'finished',
            question: null,
            deadline: null,
            scoreboard: msg.scoreboard,
            me: msg.scoreboard.find((e) => e.playerId === this.state.playerId) ?? null,
          });
        }
        break;
      case 'player_kicked':
        if (msg.playerId === this.state.playerId) {
          this.clearSaved();
          this.teardownTransport();
          this.fail('kicked');
        }
        break;
      case 'room_closed':
        if (this.state.status === 'joined' || this.state.status === 'error') {
          this.clearSaved();
          this.teardownTransport();
          this.fail('host_left');
        }
        break;
      default:
        break;
    }
  }

  private onAccepted(config: PartyRoomConfig, snapshot: PartySnapshot): void {
    const pending = this.pendingJoin;
    this.pendingJoin = null;
    if (pending) {
      clearInterval(pending.retry);
      clearTimeout(pending.timeout);
    }
    this.update({ status: 'joined', config, error: null, selected: snapshot.yourAnswer ?? null });
    this.applyPlayers(snapshot.players);
    this.update({ scoreboard: snapshot.scoreboard, phase: snapshot.phase });
    if (snapshot.phase === 'question' && snapshot.question) {
      this.applyQuestion(snapshot.question, snapshot.yourAnswer ?? null);
    } else if (snapshot.phase === 'reveal' && snapshot.reveal) {
      this.applyReveal(snapshot.reveal);
    } else if (snapshot.phase === 'finished') {
      this.update({ me: snapshot.scoreboard.find((e) => e.playerId === this.state.playerId) ?? null });
    }
    this.save();
    this.startHeartbeat();
    pending?.resolve(config);
  }

  private applyPlayers(players: PartyPlayerInfo[]): void {
    const me = players.find((p) => p.id === this.state.playerId);
    this.update({
      players,
      expectedCount: players.filter((p) => p.online).length,
      me: me
        ? (this.state.scoreboard.find((e) => e.playerId === me.id) ?? {
            playerId: me.id,
            nickname: me.nickname,
            score: me.score,
            correct: me.correct,
            rank: 0,
          })
        : this.state.me,
    });
  }

  private applyQuestion(payload: QuestionPayload, previousAnswer: string | null = null): void {
    const sameQuestion = this.state.question?.index === payload.index && this.state.phase === 'question';
    this.scoreBeforeReveal = this.state.me?.score ?? 0;
    this.update({
      phase: 'question',
      question: payload,
      deadline: Date.now() + payload.remainingMs,
      selected: sameQuestion ? this.state.selected : previousAnswer,
      reveal: null,
      lastResult: null,
      answeredCount: sameQuestion ? this.state.answeredCount : 0,
    });
  }

  private applyReveal(payload: RevealPayload): void {
    const me = payload.scoreboard.find((e) => e.playerId === this.state.playerId) ?? null;
    const answeredThis = this.state.question?.index === payload.index;
    this.update({
      phase: 'reveal',
      reveal: payload,
      deadline: null,
      scoreboard: payload.scoreboard,
      me,
      lastResult: answeredThis
        ? {
            correct: this.state.selected === payload.correctOptionId,
            gained: Math.max(0, (me?.score ?? 0) - this.scoreBeforeReveal),
          }
        : null,
    });
  }

  // ─── Heartbeat y detección de host caído ─────────────────────────────

  private startHeartbeat(): void {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.lastHostSeen = Date.now();
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: 'player_heartbeat', playerId: this.state.playerId });
      if (this.state.status === 'joined' && Date.now() - this.lastHostSeen > this.hostTimeoutMs) {
        // Conservamos la sesión guardada: si el host vuelve, reconectamos solos.
        this.fail('host_left');
      }
    }, this.heartbeatMs);
  }

  // ─── Utilidades ───────────────────────────────────────────────────────

  private fail(code: PartyErrorCode, detail?: string): PartyError {
    const error = new PartyError(code, detail);
    this.update({ status: 'error', error: { code, message: PARTY_ERROR_MESSAGES[code] } });
    return error;
  }

  private send(msg: PartyMessage): void {
    if (!this.room) return;
    this.transport.send({
      v: PARTY_PROTOCOL_VERSION,
      id: randomId(),
      room: this.room,
      from: this.peerId,
      t: Date.now(),
      msg,
    });
  }

  private save(): void {
    const saved: SavedPlayerSession = {
      savedAt: Date.now(),
      room: this.room,
      playerId: this.state.playerId,
      nickname: this.state.nickname,
    };
    try {
      this.storage?.setItem(PLAYER_STORAGE_KEY, JSON.stringify(saved));
    } catch {
      /* noop */
    }
  }

  private clearSaved(): void {
    try {
      this.storage?.removeItem(PLAYER_STORAGE_KEY);
    } catch {
      /* noop */
    }
  }

  private stopTimers(): void {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = null;
    if (this.pendingJoin) {
      clearInterval(this.pendingJoin.retry);
      clearTimeout(this.pendingJoin.timeout);
      this.pendingJoin = null;
    }
  }

  private teardownTransport(): void {
    this.stopTimers();
    this.unsubscribeTransport?.();
    this.unsubscribeTransport = null;
    this.transport.disconnect();
  }

  private update(patch: Partial<PlayerState>): void {
    this.state = { ...this.state, ...patch };
    const snapshot = this.getState();
    for (const listener of [...this.listeners]) listener(snapshot);
  }
}
