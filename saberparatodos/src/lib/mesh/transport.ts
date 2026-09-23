/**
 * transport.ts — MeshTransport: transporte mesh-first por capas para WorldExams.
 *
 * CAPAS (orden de prioridad, todas activas a la vez cuando hay sala):
 *   L0 BroadcastChannel `wx-mesh-v1` — offline total, misma red/tabs. SIEMPRE on.
 *   L1 LAN beacons — vía `LocalMeshPairingService` existente (reutilizar, no duplicar).
 *   L2 CF rendezvous — announce (20s) + discover (25s), best-effort. Si el backend
 *      cae o no hay internet, se marca `backend:'down'` y la mesh SIGUE en L0/L1.
 *   L3 CF relay mailbox — solo con sala activa y solo para `sdp`/deltas urgentes;
 *      poll 10s, lectura destructiva, blobs opacos.
 *   L4 Outbox offline — localStorage `wx-mesh-outbox-v1` (cap 200). Todo lo que no
 *      pudo salir por L0-L3 se encola y se reintenta al ver peers o backend.
 *
 * AHORRO DE TIER: ningún timer corre sin sala activa. Announce/discover/relay
 * solo mientras `start(roomHash)` está vigente; `stop()` limpia todo.
 *
 * PRIVACIDAD (BR-03/BR-04/BR-06):
 * - El transporte solo mueve `MeshEnvelope` con `blob` OPACO (el llamante cifra
 *   antes). Las claves del envelope son fijas; si aparece una clave PII se
 *   rechaza en origen (defensa en profundidad, el Worker vuelve a validar).
 * - Jamás se envían notas/calificaciones en claro. Sin telemetría.
 * - El opt-in (BR-06) lo gestiona el llamante (`OptInManager.canShareData`);
 *   el transporte expone `setEnabled()` para cortar toda red al revocar.
 */

export type MeshEnvelopeKind = 'beacon' | 'delta' | 'bye' | 'sdp';

export interface MeshEnvelope {
  v: 1;
  room: string;
  from: string;
  seq: number;
  t: number;
  kind: MeshEnvelopeKind;
  /** Opaco: ciphertext o hash agregado. NUNCA datos de usuario en claro. */
  blob: string;
}

export type MeshBackendStatus = 'unknown' | 'ok' | 'down';

export interface MeshTransportStatus {
  room: string | null;
  enabled: boolean;
  backend: MeshBackendStatus;
  lastBackendOk: number | null;
  bcPeers: number;
  cfPeers: number;
  outbox: number;
  seq: number;
}

export interface MeshTransportOptions {
  /** Base del Worker, ej. https://api.saberparatodos.space. Vacío = solo capas locales. */
  backendBase?: string;
  peerId?: string;
  fetchImpl?: typeof fetch;
  announceMs?: number;
  discoverMs?: number;
  relayPollMs?: number;
  outboxKey?: string;
  /** Qué kinds se depositan en el relay CF. Por defecto solo sdp/delta (ahorro tier).
   *  El SalonDirectory usa ['beacon','bye'] porque su beacon ES el anuncio. */
  relayKinds?: MeshEnvelopeKind[];
}

const BC_NAME = 'wx-mesh-v1';
const DEFAULT_OUTBOX_KEY = 'wx-mesh-outbox-v1';
const OUTBOX_CAP = 200;
const MAX_BLOB_CHARS = 4096;
const HASH_RE = /^[a-z0-9_-]{8,128}$/i;
const PEER_RE = /^[a-z0-9_-]{1,64}$/i;

/** Gate BR-04 en origen: el envelope solo admite sus 7 claves fijas. */
const ENVELOPE_KEYS = new Set(['v', 'room', 'from', 'seq', 't', 'kind', 'blob']);
const FORBIDDEN_HINT = ['email', 'nombre', 'name', 'nota', 'calific', 'phone', 'telefono', 'documento', 'password', 'wallet', 'token'];

export function isValidEnvelopeShape(input: unknown): input is MeshEnvelope {
  if (typeof input !== 'object' || input === null) return false;
  const e = input as Record<string, unknown>;
  for (const k of Object.keys(e)) if (!ENVELOPE_KEYS.has(k)) return false;
  if (e.v !== 1) return false;
  if (typeof e.room !== 'string' || !HASH_RE.test(e.room)) return false;
  if (typeof e.from !== 'string' || !PEER_RE.test(e.from)) return false;
  if (typeof e.seq !== 'number' || !Number.isFinite(e.seq) || e.seq < 0) return false;
  if (typeof e.t !== 'number' || !Number.isFinite(e.t)) return false;
  if (e.kind !== 'beacon' && e.kind !== 'delta' && e.kind !== 'bye' && e.kind !== 'sdp') return false;
  if (typeof e.blob !== 'string' || e.blob.length > MAX_BLOB_CHARS) return false;
  // Gate BR-04 en origen: solo los `delta` llevan payload opaco que deba
  // inspeccionarse. Ciphertext real no contiene estas palabras; si las
  // contiene, viaja en claro → rechazar. beacon/sdp/bye tienen schema fijo.
  if (e.kind === 'delta') {
    const lower = e.blob.toLowerCase();
    if (FORBIDDEN_HINT.some((h) => lower.includes(h))) return false;
  }
  return true;
}

function randomPeerId(): string {
  try {
    const buf = new Uint32Array(2);
    crypto.getRandomValues(buf);
    return `p_${buf[0].toString(36)}${buf[1].toString(36)}`.slice(0, 24);
  } catch {
    return `p_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`.slice(0, 24);
  }
}

function readOutbox(key: string): MeshEnvelope[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidEnvelopeShape) : [];
  } catch {
    return [];
  }
}

export type EnvelopeHandler = (envelope: MeshEnvelope, via: 'bc' | 'cf') => void;
export type StatusHandler = (status: MeshTransportStatus) => void;

export class MeshTransport {
  readonly peerId: string;
  private backendBase: string;
  private fetchImpl: typeof fetch;
  private announceMs: number;
  private discoverMs: number;
  private relayPollMs: number;
  private outboxKey: string;
  private relayKinds: MeshEnvelopeKind[];

  private room: string | null = null;
  private enabled = true;
  private seq = 0;
  private backend: MeshBackendStatus = 'unknown';
  private lastBackendOk: number | null = null;
  private bcPeers = new Set<string>();
  private cfPeers = new Set<string>();
  private seenSeq = new Map<string, number>(); // from -> max seq (dedupe L0/L3)

  private bc: BroadcastChannel | null = null;
  private timers: Array<ReturnType<typeof setInterval>> = [];
  private handlers = new Set<EnvelopeHandler>();
  private statusHandlers = new Set<StatusHandler>();

  constructor(opts: MeshTransportOptions = {}) {
    this.peerId = opts.peerId || randomPeerId();
    this.backendBase = (opts.backendBase || '').replace(/\/$/, '');
    this.fetchImpl = opts.fetchImpl || fetch.bind(globalThis);
    this.announceMs = opts.announceMs ?? 20000;
    this.discoverMs = opts.discoverMs ?? 25000;
    this.relayPollMs = opts.relayPollMs ?? 10000;
    this.outboxKey = opts.outboxKey || DEFAULT_OUTBOX_KEY;
    this.relayKinds = opts.relayKinds ?? ['sdp', 'delta'];
  }

  // ─── Ciclo de vida ──────────────────────────────────────────────────────

  /** Activa todas las capas para una sala. Sin sala no hay ningún timer (ahorro tier). */
  start(roomHash: string): void {
    if (!HASH_RE.test(roomHash)) throw new Error('[mesh] room hash inválido');
    this.stopTimers();
    this.room = roomHash;
    this.openBroadcast();
    if (this.enabled) {
      this.sendBeacon();
      this.flushOutbox();
      if (this.backendBase) {
        this.announceCf().catch(() => undefined);
        this.timers.push(setInterval(() => this.announceCf().catch(() => undefined), this.announceMs));
        this.timers.push(setInterval(() => this.discoverCf().catch(() => undefined), this.discoverMs));
        this.timers.push(setInterval(() => this.pollRelay().catch(() => undefined), this.relayPollMs));
        this.discoverCf().catch(() => undefined);
        this.pollRelay().catch(() => undefined);
      }
    }
    this.emitStatus();
  }

  stop(): void {
    if (this.room) this.sendRaw('bye', 'e30'); // '{}' base64 = adiós, sin datos
    this.room = null;
    this.stopTimers();
    this.closeBroadcast();
    this.bcPeers.clear();
    this.cfPeers.clear();
    this.emitStatus();
  }

  /** BR-06: corta toda red (incluye revocar beacons con `bye`). */
  setEnabled(on: boolean): void {
    if (!on && this.room) this.sendRaw('bye', 'e30');
    this.enabled = on;
    if (!on) {
      this.stopTimers();
      this.closeBroadcast();
    } else if (this.room) {
      const room = this.room;
      this.room = null;
      this.start(room);
    }
    this.emitStatus();
  }

  // ─── Envío ──────────────────────────────────────────────────────────────

  /**
   * Envía un blob OPACO (cifrado por el llamante) por todas las capas.
   * Si no hay red, se encola en outbox offline (L4).
   */
  send(kind: MeshEnvelopeKind, blob: string): MeshEnvelope | null {
    return this.sendRaw(kind, blob);
  }

  private sendRaw(kind: MeshEnvelopeKind, blob: string): MeshEnvelope | null {
    if (!this.enabled || !this.room) return null;
    const envelope: MeshEnvelope = {
      v: 1,
      room: this.room,
      from: this.peerId,
      seq: this.seq++,
      t: Date.now(),
      kind,
      blob,
    };
    if (!isValidEnvelopeShape(envelope)) return null;

    let delivered = false;
    if (this.bc) {
      try {
        this.bc.postMessage(envelope);
        delivered = true;
      } catch {
        /* BC caído → sigue a CF/outbox */
      }
    }
    if (this.backendBase && this.relayKinds.includes(kind)) {
      // Relay best-effort (no bloquea); el inbox es el hash de sala.
      this.depositRelay(envelope).then((ok) => {
        if (ok) delivered = true;
        else this.enqueueOutbox(envelope);
        this.emitStatus();
      });
    } else if (!delivered) {
      this.enqueueOutbox(envelope);
    }
    this.emitStatus();
    return envelope;
  }

  // ─── L0 BroadcastChannel ────────────────────────────────────────────────

  private openBroadcast(): void {
    this.closeBroadcast();
    try {
      if (typeof BroadcastChannel === 'undefined') return;
      this.bc = new BroadcastChannel(BC_NAME);
      this.bc.onmessage = (event) => {
        const data = (event as MessageEvent).data;
        if (isValidEnvelopeShape(data) && data.room === this.room && data.from !== this.peerId) {
          this.ingest(data, 'bc');
        }
      };
    } catch {
      this.bc = null;
    }
  }

  private closeBroadcast(): void {
    try {
      this.bc?.close();
    } catch {
      /* noop */
    }
    this.bc = null;
  }

  private sendBeacon(): void {
    this.sendRaw('beacon', 'e30');
  }

  // ─── L2/L3 Cloudflare (best-effort, jamás bloquea la mesh) ──────────────

  private cfUrl(path: string): string {
    return `${this.backendBase}${path}`;
  }

  private markBackend(ok: boolean): void {
    const next = ok ? 'ok' : 'down';
    if (next !== this.backend) {
      this.backend = next;
      if (ok) {
        this.lastBackendOk = Date.now();
        this.flushOutbox();
      }
      this.emitStatus();
    } else if (ok) {
      this.lastBackendOk = Date.now();
    }
  }

  private async announceCf(): Promise<void> {
    if (!this.room || !this.enabled) return;
    try {
      const res = await this.fetchImpl(this.cfUrl('/v1/mesh/announce'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_hash: this.room, peer_id: this.peerId }),
      });
      this.markBackend(res.ok);
    } catch {
      this.markBackend(false);
    }
  }

  private async discoverCf(): Promise<void> {
    if (!this.room || !this.enabled) return;
    try {
      const res = await this.fetchImpl(this.cfUrl(`/v1/mesh/discover?room=${encodeURIComponent(this.room)}`));
      if (!res.ok) {
        this.markBackend(false);
        return;
      }
      this.markBackend(true);
      const data = (await res.json()) as { peers?: Array<{ peer_id: string }> };
      this.cfPeers.clear();
      for (const p of data.peers || []) {
        if (typeof p.peer_id === 'string' && p.peer_id !== this.peerId) this.cfPeers.add(p.peer_id);
      }
      this.emitStatus();
    } catch {
      this.markBackend(false);
    }
  }

  private inboxHash(): string | null {
    return this.room;
  }

  private async depositRelay(envelope: MeshEnvelope): Promise<boolean> {
    const inbox = this.inboxHash();
    if (!inbox) return false;
    try {
      const { room: _room, ...wire } = envelope;
      const res = await this.fetchImpl(this.cfUrl('/v1/mesh/relay'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inbox_hash: inbox, envelope: wire }),
      });
      this.markBackend(true);
      return res.ok;
    } catch {
      this.markBackend(false);
      return false;
    }
  }

  private async pollRelay(): Promise<void> {
    const inbox = this.inboxHash();
    if (!inbox || !this.enabled) return;
    try {
      const res = await this.fetchImpl(this.cfUrl(`/v1/mesh/relay?inbox=${encodeURIComponent(inbox)}`));
      if (!res.ok) {
        this.markBackend(false);
        return;
      }
      this.markBackend(true);
      const data = (await res.json()) as { messages?: MeshEnvelope[] };
      for (const m of data.messages || []) {
        const full = { ...m, room: inbox };
        if (isValidEnvelopeShape(full) && full.from !== this.peerId) this.ingest(full, 'cf');
      }
    } catch {
      this.markBackend(false);
    }
  }

  /** Pulso manual L2/L3 (discover + relay) sin esperar intervalos. Best-effort. */
  async refreshNow(): Promise<void> {
    if (!this.room || !this.enabled || !this.backendBase) return;
    await this.discoverCf().catch(() => undefined);
    await this.pollRelay().catch(() => undefined);
  }

  // ─── L4 Outbox offline ──────────────────────────────────────────────────

  private enqueueOutbox(envelope: MeshEnvelope): void {
    try {
      if (typeof localStorage === 'undefined') return;
      const box = readOutbox(this.outboxKey);
      box.push(envelope);
      localStorage.setItem(this.outboxKey, JSON.stringify(box.slice(-OUTBOX_CAP)));
    } catch {
      /* quota → se pierde el más viejo en el slice; mesh sigue */
    }
  }

  /** Reinyecta outbox a la mesh al recuperar conectividad o ver peers. */
  flushOutbox(): number {
    let box: MeshEnvelope[] = [];
    try {
      if (typeof localStorage === 'undefined') return 0;
      box = readOutbox(this.outboxKey);
      localStorage.removeItem(this.outboxKey);
    } catch {
      return 0;
    }
    let flushed = 0;
    for (const e of box) {
      if (e.room !== this.room) continue; // otra sala: se descarta (TTL lógico)
      if (this.bc) {
        try {
          this.bc.postMessage(e);
          flushed++;
          continue;
        } catch {
          /* cae a relay */
        }
      }
      if (this.backendBase && this.relayKinds.includes(e.kind)) {
        this.depositRelay(e).catch(() => this.enqueueOutbox(e));
        flushed++;
      }
    }
    this.emitStatus();
    return flushed;
  }

  getOutboxCount(): number {
    return readOutbox(this.outboxKey).length;
  }

  // ─── Ingesta (dedupe entre capas) ───────────────────────────────────────

  private ingest(envelope: MeshEnvelope, via: 'bc' | 'cf'): void {
    const maxSeen = this.seenSeq.get(envelope.from) ?? -1;
    if (envelope.seq <= maxSeen) return; // duplicado L0/L3
    this.seenSeq.set(envelope.from, envelope.seq);
    if (via === 'bc') {
      this.bcPeers.add(envelope.from);
      if (this.getOutboxCount() > 0) this.flushOutbox();
    }
    for (const h of this.handlers) {
      try {
        h(envelope, via);
      } catch {
        /* un handler no tumba la mesh */
      }
    }
    this.emitStatus();
  }

  onEnvelope(handler: EnvelopeHandler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  onStatus(handler: StatusHandler): () => void {
    this.statusHandlers.add(handler);
    return () => this.statusHandlers.delete(handler);
  }

  status(): MeshTransportStatus {
    return {
      room: this.room,
      enabled: this.enabled,
      backend: this.backend,
      lastBackendOk: this.lastBackendOk,
      bcPeers: this.bcPeers.size,
      cfPeers: this.cfPeers.size,
      outbox: this.getOutboxCount(),
      seq: this.seq,
    };
  }

  private emitStatus(): void {
    if (this.statusHandlers.size === 0) return;
    const s = this.status();
    for (const h of this.statusHandlers) {
      try {
        h(s);
      } catch {
        /* noop */
      }
    }
  }

  private stopTimers(): void {
    for (const t of this.timers) clearInterval(t);
    this.timers = [];
  }
}
