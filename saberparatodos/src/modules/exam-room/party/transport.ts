/**
 * Transportes del modo Party.
 *
 * El protocolo (protocol.ts) es independiente del canal. Aquí viven los canales:
 *
 * - PeerJS (WebRTC): entre dispositivos. Usa la señalización pública de PeerJS
 *   (la misma que edge-mesh), sin backend de WorldExams. El host registra el id
 *   `wx-party-v1-<CODE>`; cada jugador abre una conexión de datos hacia ese id y
 *   el host reenvía sus mensajes a todos los jugadores conectados.
 * - BroadcastChannel: pestañas/ventanas del mismo navegador. Respaldo cuando
 *   PeerJS no está disponible (sin WebRTC o sin acceso a la señalización).
 * - Bridge: `window.__wxPartyBridge`, inyectado por un shell nativo o por las
 *   pruebas E2E para enlazar contextos de navegador aislados.
 * - Loopback: hub en memoria para pruebas unitarias.
 *
 * El adaptador `@swal/edge-mesh` (lib/p2p-edge-mesh.ts) todavía no expone un
 * canal de mensajes ni unión remota por código (fase 2), por eso no se usa aquí.
 */

import { isPartyEnvelope, type PartyEnvelope } from './protocol';

export type EnvelopeListener = (envelope: PartyEnvelope) => void;

export type PartyRole = 'host' | 'player';

/** Canales conectados y canales que aún intentan conectar. */
export interface TransportStatus {
  active: string[];
  pending: string[];
}

export interface PartyTransport {
  readonly kind: string;
  connect(room: string): Promise<void>;
  send(envelope: PartyEnvelope): void;
  onEnvelope(listener: EnvelopeListener): () => void;
  disconnect(): void;
  /** Estado en vivo de los canales (solo transportes compuestos). */
  getStatus?(): TransportStatus;
  onStatusChange?(listener: () => void): () => void;
}

abstract class BaseTransport implements PartyTransport {
  abstract readonly kind: string;
  protected listeners = new Set<EnvelopeListener>();
  protected room: string | null = null;

  abstract connect(room: string): Promise<void>;
  abstract send(envelope: PartyEnvelope): void;
  abstract disconnect(): void;

  onEnvelope(listener: EnvelopeListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  protected emit(data: unknown): void {
    if (!isPartyEnvelope(data) || data.room !== this.room) return;
    for (const listener of [...this.listeners]) listener(data);
  }
}

// ─── Loopback (pruebas) ───────────────────────────────────────────────────

export interface LoopbackNetwork {
  createTransport(): PartyTransport;
  /** Simula un corte de red: los mensajes dejan de entregarse. */
  setOnline(online: boolean): void;
  readonly delivered: PartyEnvelope[];
}

export function createLoopbackNetwork(): LoopbackNetwork {
  const members = new Set<LoopbackTransport>();
  const delivered: PartyEnvelope[] = [];
  let online = true;

  class LoopbackTransport extends BaseTransport {
    readonly kind = 'loopback';

    async connect(room: string): Promise<void> {
      this.room = room;
      members.add(this);
    }

    send(envelope: PartyEnvelope): void {
      if (!online || !this.room) return;
      delivered.push(envelope);
      for (const member of [...members]) {
        if (member !== this) member.receive(envelope);
      }
    }

    receive(envelope: PartyEnvelope): void {
      this.emit(structuredClone(envelope));
    }

    disconnect(): void {
      members.delete(this);
      this.room = null;
    }
  }

  return {
    createTransport: () => new LoopbackTransport(),
    setOnline: (value) => {
      online = value;
    },
    delivered,
  };
}

// ─── PeerJS / WebRTC (entre dispositivos) ────────────────────────────────

export const PARTY_PEER_ID_PREFIX = 'wx-party-v1-';

export function hostPeerId(room: string): string {
  return `${PARTY_PEER_ID_PREFIX}${room}`;
}

type Handler = (...args: any[]) => void;

/** Subconjunto de `DataConnection` de peerjs que usamos. */
export interface PeerConnectionLike {
  open: boolean;
  on(event: string, handler: Handler): unknown;
  send(data: unknown): unknown;
  close(): void;
}

/** Subconjunto de `Peer` de peerjs que usamos (facilita los mocks). */
export interface PeerLike {
  on(event: string, handler: Handler): unknown;
  off?(event: string, handler: Handler): unknown;
  connect(id: string, options?: { reliable?: boolean; serialization?: string }): PeerConnectionLike;
  reconnect?(): void;
  destroy(): void;
  disconnected?: boolean;
  destroyed?: boolean;
}

/** Crea un Peer: con `id` registra ese id en la señalización; sin él, uno aleatorio. */
export type PeerFactory = (id?: string) => PeerLike;

async function loadPeerJs(): Promise<PeerFactory> {
  const mod = (await import('peerjs')) as unknown as {
    Peer?: new (...args: unknown[]) => PeerLike;
    default?: new (...args: unknown[]) => PeerLike;
  };
  const Peer = mod.Peer ?? mod.default;
  if (!Peer) throw new Error('peerjs no disponible');
  return (id) => (id ? new Peer(id, { debug: 0 }) : new Peer({ debug: 0 }));
}

export interface PeerJsTransportOptions {
  role: PartyRole;
  loadPeer?: () => Promise<PeerFactory>;
  /** Espera máxima para registrarse en la señalización o abrir la conexión con el host. */
  connectTimeoutMs?: number;
  /** Pausa entre reintentos (id del host aún ocupado, reconexión del jugador). */
  retryMs?: number;
  /** Reintentos si el id del host sigue ocupado (p. ej. tras recargar la página). */
  hostIdRetries?: number;
}

type PeerError = Error & { type?: string };

function peerError(message: string, type: string): PeerError {
  return Object.assign(new Error(message), { type });
}

export class PeerJsPartyTransport extends BaseTransport {
  readonly kind = 'peerjs';
  private role: PartyRole;
  private loadPeer: () => Promise<PeerFactory>;
  private connectTimeoutMs: number;
  private retryMs: number;
  private hostIdRetries: number;

  private peer: PeerLike | null = null;
  /** Host: conexiones de jugadores. */
  private players = new Set<PeerConnectionLike>();
  /** Jugador: conexión con el host. */
  private hostConn: PeerConnectionLike | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private closed = true;

  constructor(options: PeerJsTransportOptions) {
    super();
    this.role = options.role;
    this.loadPeer = options.loadPeer ?? loadPeerJs;
    this.connectTimeoutMs = options.connectTimeoutMs ?? 10_000;
    this.retryMs = options.retryMs ?? 2000;
    this.hostIdRetries = options.hostIdRetries ?? 6;
  }

  static isSupported(): boolean {
    return typeof window !== 'undefined' && typeof RTCPeerConnection !== 'undefined';
  }

  async connect(room: string): Promise<void> {
    this.disconnect();
    this.room = room;
    this.closed = false;
    const factory = await this.loadPeer();
    try {
      if (this.role === 'host') await this.openHost(factory, room);
      else await this.openPlayer(factory, room);
    } catch (err) {
      this.disconnect();
      throw err;
    }
  }

  send(envelope: PartyEnvelope): void {
    if (this.role === 'host') {
      for (const conn of this.players) {
        if (conn.open) conn.send(envelope);
      }
    } else if (this.hostConn?.open) {
      this.hostConn.send(envelope);
    }
  }

  disconnect(): void {
    this.closed = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
    for (const conn of this.players) conn.close();
    this.players.clear();
    this.hostConn?.close();
    this.hostConn = null;
    this.peer?.destroy();
    this.peer = null;
    this.room = null;
  }

  // ─── Host ─────────────────────────────────────────────────────────────

  private async openHost(factory: PeerFactory, room: string): Promise<void> {
    let peer: PeerLike;
    for (let attempt = 0; ; attempt++) {
      try {
        peer = await this.openPeer(factory, hostPeerId(room));
        break;
      } catch (err) {
        // Tras recargar, la señalización puede tardar en liberar el id anterior.
        const retry = (err as PeerError).type === 'unavailable-id' && attempt < this.hostIdRetries;
        if (!retry || this.closed) throw err;
        await new Promise((r) => setTimeout(r, this.retryMs));
        if (this.closed) throw err;
      }
    }
    this.adopt(peer);
    peer.on('connection', (conn: PeerConnectionLike) => this.acceptPlayer(conn));
  }

  private acceptPlayer(conn: PeerConnectionLike): void {
    if (this.closed) {
      conn.close();
      return;
    }
    this.players.add(conn);
    conn.on('data', (data: unknown) => this.emit(data));
    const drop = () => this.players.delete(conn);
    conn.on('close', drop);
    conn.on('error', drop);
  }

  // ─── Jugador ──────────────────────────────────────────────────────────

  private async openPlayer(factory: PeerFactory, room: string): Promise<void> {
    this.adopt(await this.openPeer(factory));
    await this.connectToHost(room);
  }

  private connectToHost(room: string): Promise<void> {
    const peer = this.peer;
    if (!peer) return Promise.reject(peerError('PeerJS cerrado', 'closed'));
    return new Promise<void>((resolve, reject) => {
      const conn = peer.connect(hostPeerId(room), { reliable: true, serialization: 'json' });
      let settled = false;
      const finish = (err?: unknown) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        peer.off?.('error', onPeerError);
        if (err) {
          conn.close();
          reject(err);
        } else {
          this.attachHost(conn);
          resolve();
        }
      };
      // "peer-unavailable" llega por el Peer, no por la conexión: no hay host con ese código.
      const onPeerError = (err: PeerError) => {
        if (err?.type === 'peer-unavailable') finish(err);
      };
      const timer = setTimeout(
        () => finish(peerError('El host no respondió por PeerJS', 'timeout')),
        this.connectTimeoutMs,
      );
      peer.on('error', onPeerError);
      conn.on('open', () => finish());
      conn.on('error', (err: unknown) => finish(err ?? peerError('Error de conexión', 'connection')));
    });
  }

  private attachHost(conn: PeerConnectionLike): void {
    this.hostConn = conn;
    conn.on('data', (data: unknown) => this.emit(data));
    conn.on('close', () => {
      if (this.hostConn === conn) this.hostConn = null;
      this.scheduleReconnect();
    });
  }

  /** El host recargó o perdió la red: reintentar hasta que vuelva o el jugador salga. */
  private scheduleReconnect(): void {
    if (this.closed || this.reconnectTimer || !this.room) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (this.closed || this.hostConn || !this.room) return;
      this.connectToHost(this.room).catch(() => this.scheduleReconnect());
    }, this.retryMs);
  }

  // ─── Común ────────────────────────────────────────────────────────────

  /** Toma el Peer recién abierto, salvo que se haya llamado a disconnect() mientras tanto. */
  private adopt(peer: PeerLike): void {
    if (this.closed) {
      peer.destroy();
      throw peerError('PeerJS cerrado', 'closed');
    }
    this.peer = peer;
    peer.on('disconnected', () => {
      if (!this.closed && !peer.destroyed) peer.reconnect?.();
    });
  }

  private openPeer(factory: PeerFactory, id?: string): Promise<PeerLike> {
    return new Promise<PeerLike>((resolve, reject) => {
      let settled = false;
      const peer = factory(id);
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        peer.destroy();
        reject(peerError('Sin respuesta de la señalización PeerJS', 'timeout'));
      }, this.connectTimeoutMs);
      peer.on('open', () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(peer);
      });
      peer.on('error', (err: PeerError) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        peer.destroy();
        reject(err);
      });
    });
  }
}

// ─── BroadcastChannel (mismo navegador) ──────────────────────────────────

export class BroadcastChannelPartyTransport extends BaseTransport {
  readonly kind = 'broadcast-channel';
  private channel: BroadcastChannel | null = null;

  static isSupported(): boolean {
    return typeof BroadcastChannel !== 'undefined';
  }

  async connect(room: string): Promise<void> {
    if (!BroadcastChannelPartyTransport.isSupported()) {
      throw new Error('BroadcastChannel no disponible');
    }
    this.disconnect();
    this.room = room;
    this.channel = new BroadcastChannel(`wx-party-v1-${room}`);
    this.channel.onmessage = (event) => this.emit((event as MessageEvent).data);
  }

  send(envelope: PartyEnvelope): void {
    this.channel?.postMessage(envelope);
  }

  disconnect(): void {
    try {
      this.channel?.close();
    } catch {
      /* noop */
    }
    this.channel = null;
    this.room = null;
  }
}

// ─── Bridge (shell nativo / E2E) ──────────────────────────────────────────

export interface PartyBridge {
  send(envelope: PartyEnvelope): void;
  subscribe(listener: (envelope: unknown) => void): () => void;
}

export function getPartyBridge(): PartyBridge | null {
  if (typeof window === 'undefined') return null;
  const bridge = (window as unknown as { __wxPartyBridge?: PartyBridge }).__wxPartyBridge;
  return bridge && typeof bridge.send === 'function' && typeof bridge.subscribe === 'function'
    ? bridge
    : null;
}

export class BridgePartyTransport extends BaseTransport {
  readonly kind = 'bridge';
  private unsubscribe: (() => void) | null = null;

  constructor(private bridge: PartyBridge) {
    super();
  }

  async connect(room: string): Promise<void> {
    this.disconnect();
    this.room = room;
    this.unsubscribe = this.bridge.subscribe((data) => this.emit(data));
  }

  send(envelope: PartyEnvelope): void {
    if (this.room) this.bridge.send(envelope);
  }

  disconnect(): void {
    this.unsubscribe?.();
    this.unsubscribe = null;
    this.room = null;
  }
}

// ─── Composite: varios canales a la vez, entrega deduplicada ─────────────

export class CompositePartyTransport extends BaseTransport {
  readonly kind: string;
  private active: PartyTransport[] = [];
  private pending = new Set<PartyTransport>();
  private generation = 0;
  private seen = new Set<string>();
  private seenOrder: string[] = [];
  private unsubscribers: Array<() => void> = [];
  private statusListeners = new Set<() => void>();

  constructor(private transports: PartyTransport[]) {
    super();
    this.kind = transports.map((t) => t.kind).join('+') || 'none';
  }

  /**
   * Conecta todos los canales. Resuelve en cuanto el primero conecta; los más
   * lentos (PeerJS necesita la señalización) se suman después sin bloquear.
   * Falla solo si ninguno conecta.
   */
  connect(room: string): Promise<void> {
    this.disconnect();
    this.room = room;
    const generation = this.generation;
    this.pending = new Set(this.transports);
    this.notify();
    if (this.transports.length === 0) {
      this.room = null;
      return Promise.reject(new Error('sin transportes'));
    }

    return new Promise<void>((resolve, reject) => {
      let resolved = false;
      const errors: string[] = [];
      for (const t of this.transports) {
        t.connect(room).then(
          () => {
            if (generation !== this.generation) {
              t.disconnect();
              return;
            }
            this.pending.delete(t);
            this.active.push(t);
            this.unsubscribers.push(t.onEnvelope((env) => this.receive(env)));
            this.notify();
            if (!resolved) {
              resolved = true;
              resolve();
            }
          },
          (err: unknown) => {
            if (generation !== this.generation) return;
            this.pending.delete(t);
            errors.push(`${t.kind}: ${err instanceof Error ? err.message : String(err)}`);
            this.notify();
            if (!resolved && this.pending.size === 0 && this.active.length === 0) {
              resolved = true;
              this.room = null;
              reject(new Error(errors.join('; ')));
            }
          },
        );
      }
    });
  }

  getStatus(): TransportStatus {
    return {
      active: this.active.map((t) => t.kind),
      pending: [...this.pending].map((t) => t.kind),
    };
  }

  onStatusChange(listener: () => void): () => void {
    this.statusListeners.add(listener);
    return () => this.statusListeners.delete(listener);
  }

  private notify(): void {
    for (const listener of [...this.statusListeners]) listener();
  }

  private remember(id: string): boolean {
    if (this.seen.has(id)) return false;
    this.seen.add(id);
    this.seenOrder.push(id);
    if (this.seenOrder.length > 2000) {
      const old = this.seenOrder.splice(0, 1000);
      for (const o of old) this.seen.delete(o);
    }
    return true;
  }

  private receive(envelope: PartyEnvelope): void {
    if (this.remember(envelope.id)) this.emit(envelope);
  }

  send(envelope: PartyEnvelope): void {
    this.remember(envelope.id);
    for (const t of this.active) {
      try {
        t.send(envelope);
      } catch (err) {
        console.warn(`[Party] Falló el envío por ${t.kind}:`, err);
      }
    }
  }

  disconnect(): void {
    this.generation++;
    for (const u of this.unsubscribers) u();
    this.unsubscribers = [];
    const wasConnecting = this.active.length > 0 || this.pending.size > 0;
    for (const t of [...this.active, ...this.pending]) t.disconnect();
    this.active = [];
    this.pending.clear();
    this.room = null;
    if (wasConnecting) this.notify();
  }
}

/** Indica si los estudiantes pueden unirse desde otros dispositivos. */
export function supportsOtherDevices(status: TransportStatus): boolean {
  return status.active.includes('peerjs') || status.active.includes('bridge');
}

/**
 * Transporte por defecto del navegador: PeerJS (otros dispositivos) más
 * BroadcastChannel (mismo navegador) como respaldo. Si hay un bridge inyectado
 * se usa solo ese (contextos aislados de las pruebas E2E).
 */
export function createDefaultPartyTransport(role: PartyRole): CompositePartyTransport {
  const bridge = getPartyBridge();
  if (bridge) return new CompositePartyTransport([new BridgePartyTransport(bridge)]);

  const transports: PartyTransport[] = [];
  if (PeerJsPartyTransport.isSupported()) transports.push(new PeerJsPartyTransport({ role }));
  if (BroadcastChannelPartyTransport.isSupported()) transports.push(new BroadcastChannelPartyTransport());
  return new CompositePartyTransport(transports);
}
