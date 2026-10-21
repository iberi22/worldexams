/**
 * Transportes del modo Party.
 *
 * El protocolo (protocol.ts) es independiente del canal. Aquí viven los canales:
 *
 * - BroadcastChannel: pestañas/ventanas del mismo navegador (proyector + celular
 *   del docente en el mismo equipo, demos). Siempre disponible en navegadores modernos.
 * - Supabase Realtime: entre dispositivos por internet, solo si el mirror opt-in
 *   `PUBLIC_ROOMS_SUPABASE_MIRROR=true` está activo (mismo canal `party:{code}`
 *   y evento `party_message` que usa `services/connection.ts`).
 * - Bridge: `window.__wxPartyBridge`, inyectado por un shell nativo o por las
 *   pruebas E2E para enlazar contextos de navegador aislados.
 * - Loopback: hub en memoria para pruebas unitarias.
 *
 * El transporte `@swal/edge-mesh` (lib/p2p-edge-mesh.ts) todavía no expone un
 * canal de mensajes ni unión remota por código (fase 2), por eso no se usa aquí.
 */

import type { RealtimeChannel } from '@supabase/supabase-js';
import { isPartyEnvelope, type PartyEnvelope } from './protocol';

export type EnvelopeListener = (envelope: PartyEnvelope) => void;

export interface PartyTransport {
  readonly kind: string;
  connect(room: string): Promise<void>;
  send(envelope: PartyEnvelope): void;
  onEnvelope(listener: EnvelopeListener): () => void;
  disconnect(): void;
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

// ─── Supabase Realtime (opt-in, entre dispositivos) ──────────────────────

export function isSupabasePartyEnabled(): boolean {
  try {
    return import.meta.env.PUBLIC_ROOMS_SUPABASE_MIRROR === 'true';
  } catch {
    return false;
  }
}

export class SupabasePartyTransport extends BaseTransport {
  readonly kind = 'supabase';
  private channel: RealtimeChannel | null = null;

  async connect(room: string): Promise<void> {
    this.disconnect();
    this.room = room;
    const { supabase } = await import('../../../lib/supabase');
    const channel = supabase.channel(`party:${room}`, { config: { broadcast: { self: false } } });
    channel.on('broadcast', { event: 'party_message' }, ({ payload }) => this.emit(payload));
    const status = await new Promise<string>((resolve) => {
      const timer = setTimeout(() => resolve('TIMED_OUT'), 8000);
      channel.subscribe((s) => {
        if (s === 'SUBSCRIBED' || s === 'CHANNEL_ERROR' || s === 'TIMED_OUT' || s === 'CLOSED') {
          clearTimeout(timer);
          resolve(s);
        }
      });
    });
    if (status !== 'SUBSCRIBED') {
      void channel.unsubscribe();
      throw new Error(`Supabase Realtime: ${status}`);
    }
    this.channel = channel;
  }

  send(envelope: PartyEnvelope): void {
    void this.channel?.send({ type: 'broadcast', event: 'party_message', payload: envelope });
  }

  disconnect(): void {
    void this.channel?.unsubscribe();
    this.channel = null;
    this.room = null;
  }
}

// ─── Composite: varios canales a la vez, entrega deduplicada ─────────────

export class CompositePartyTransport extends BaseTransport {
  readonly kind: string;
  private active: PartyTransport[] = [];
  private seen = new Set<string>();
  private seenOrder: string[] = [];
  private unsubscribers: Array<() => void> = [];

  constructor(private transports: PartyTransport[]) {
    super();
    this.kind = transports.map((t) => t.kind).join('+') || 'none';
  }

  /** Conecta todos los canales posibles; falla solo si ninguno conecta. */
  async connect(room: string): Promise<void> {
    this.disconnect();
    this.room = room;
    const results = await Promise.allSettled(this.transports.map((t) => t.connect(room)));
    this.active = this.transports.filter((_, i) => results[i].status === 'fulfilled');
    if (this.active.length === 0) {
      this.room = null;
      const reasons = results
        .map((r) => (r.status === 'rejected' ? String((r.reason as Error)?.message ?? r.reason) : ''))
        .filter(Boolean)
        .join('; ');
      throw new Error(reasons || 'sin transportes');
    }
    this.unsubscribers = this.active.map((t) => t.onEnvelope((env) => this.receive(env)));
  }

  get activeKinds(): string[] {
    return this.active.map((t) => t.kind);
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
    for (const u of this.unsubscribers) u();
    this.unsubscribers = [];
    for (const t of this.active) t.disconnect();
    this.active = [];
    this.room = null;
  }
}

/**
 * Transporte por defecto del navegador. Si hay un bridge inyectado se usa solo
 * ese (contextos aislados que no comparten BroadcastChannel).
 */
export function createDefaultPartyTransport(): PartyTransport {
  const bridge = getPartyBridge();
  if (bridge) return new CompositePartyTransport([new BridgePartyTransport(bridge)]);

  const transports: PartyTransport[] = [];
  if (BroadcastChannelPartyTransport.isSupported()) transports.push(new BroadcastChannelPartyTransport());
  if (isSupabasePartyEnabled()) transports.push(new SupabasePartyTransport());
  return new CompositePartyTransport(transports);
}
