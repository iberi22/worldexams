/**
 * salon-directory.ts — Directorio de salones sobre MeshTransport (mesh-first).
 *
 * CONTEXTO: el core `@iberi22/edge-mesh` NO exporta `SalonRegistry` ni `SalonAd`
 * (verificado contra `cores/edge-mesh/src`). Este directorio implementa el
 * anuncio/descubrimiento que `p2p-edge-mesh.ts` asumía, usando las capas que
 * sí existen:
 *   L0 BroadcastChannel en la sala-pozo `wx-directory-v1` (offline, instantáneo)
 *   L2/L3 rendezvous + relay del Worker `/v1/mesh/*` ( efímero, sin persistencia)
 *
 * PRIVACIDAD (BR-03/BR-04/BR-06):
 * - El anuncio lleva alias de sala/host elegidos por el usuario (nunca PII real).
 * - `isValidAd` solo admite las 10 claves fijas con largos capados; el Worker
 *   vuelve a validar. Sin telemetría, sin tokens.
 * - `listar()` es lectura del caché local (sync, sin red). `refresh()` pulsa CF.
 */

import { MeshTransport, type MeshEnvelope } from './transport';

export interface SalonAd {
  codigo: string;
  nombre: string;
  hostNodoId: string;
  hostPeerId: string;
  subject?: string;
  grade?: number;
  region?: string;
  maxParticipantes?: number;
  status?: string;
  createdAt: number;
}

const DIRECTORY_ROOM = 'wx-directory-v1';
const AD_TTL_MS = 90_000;
const AD_KEYS = new Set([
  'codigo',
  'nombre',
  'hostNodoId',
  'hostPeerId',
  'subject',
  'grade',
  'region',
  'maxParticipantes',
  'status',
  'createdAt',
]);

function b64encodeUtf8(input: string): string {
  try {
    const bytes = new TextEncoder().encode(input);
    let bin = '';
    for (const b of bytes) bin += String.fromCharCode(b);
    return btoa(bin);
  } catch {
    return '';
  }
}

function b64decodeUtf8(input: string): string {
  try {
    const bin = atob(input);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return '';
  }
}

export function isValidAd(input: unknown): input is SalonAd {
  if (typeof input !== 'object' || input === null) return false;
  const a = input as Record<string, unknown>;
  for (const k of Object.keys(a)) if (!AD_KEYS.has(k)) return false;
  if (typeof a.codigo !== 'string' || !/^[a-z0-9_-]{8,128}$/i.test(a.codigo)) return false;
  if (typeof a.nombre !== 'string' || a.nombre.length === 0 || a.nombre.length > 80) return false;
  if (typeof a.hostNodoId !== 'string' || a.hostNodoId.length > 64) return false;
  if (typeof a.hostPeerId !== 'string' || a.hostPeerId.length > 64) return false;
  if (a.subject !== undefined && (typeof a.subject !== 'string' || a.subject.length > 40)) return false;
  if (a.grade !== undefined && (typeof a.grade !== 'number' || a.grade < 1 || a.grade > 11)) return false;
  if (a.region !== undefined && (typeof a.region !== 'string' || a.region.length > 16)) return false;
  if (a.maxParticipantes !== undefined && typeof a.maxParticipantes !== 'number') return false;
  if (a.status !== undefined && (typeof a.status !== 'string' || a.status.length > 16)) return false;
  if (typeof a.createdAt !== 'number' || !Number.isFinite(a.createdAt)) return false;
  return true;
}

export interface SalonDirectoryOptions {
  backendBase?: string;
  peerId?: string;
  fetchImpl?: typeof fetch;
}

interface CachedAd {
  ad: SalonAd;
  lastSeen: number;
}

export class SalonDirectory {
  private transport: MeshTransport;
  private ads = new Map<string, CachedAd>();
  private hostedCode: string | null = null;
  private hostedAd: SalonAd | null = null;
  private reBeacon: ReturnType<typeof setInterval> | null = null;
  private listening = false;

  constructor(opts: SalonDirectoryOptions = {}) {
    this.transport = new MeshTransport({
      backendBase: opts.backendBase,
      peerId: opts.peerId,
      fetchImpl: opts.fetchImpl,
      relayKinds: ['beacon', 'bye'],
    });
    this.transport.onEnvelope((env) => this.ingest(env));
  }

  /** Empieza a escuchar anuncios (BC siempre; CF solo si hay backendBase). */
  listen(): void {
    if (this.listening) return;
    this.listening = true;
    this.transport.start(DIRECTORY_ROOM);
  }

  /** Anuncia (o actualiza) una sala propia. Re-beacon 20s (mismo ritmo L2). */
  host(ad: SalonAd): SalonAd {
    if (!isValidAd(ad)) throw new Error('[directory] anuncio inválido (BR-04)');
    this.listen();
    this.hostedCode = ad.codigo;
    this.hostedAd = ad;
    this.put(ad);
    this.push();
    this.clearReBeacon();
    this.reBeacon = setInterval(() => this.push(), 20_000);
    return ad;
  }

  unhost(): void {
    this.clearReBeacon();
    this.hostedCode = null;
    this.hostedAd = null;
  }

  /** Caché local sync (sin red). Filtro regional opcional. */
  listar(region?: string): SalonAd[] {
    this.prune();
    const out: SalonAd[] = [];
    for (const { ad } of this.ads.values()) {
      if (region && ad.region !== region) continue;
      out.push(ad);
    }
    return out.sort((a, b) => b.createdAt - a.createdAt);
  }

  buscar(codigo: string): SalonAd | null {
    this.prune();
    return this.ads.get(codigo)?.ad ?? null;
  }

  /** Pulso CF on-demand + re-lectura del caché. */
  async refresh(): Promise<SalonAd[]> {
    this.listen();
    await this.transport.refreshNow();
    return this.listar();
  }

  dispose(): void {
    this.clearReBeacon();
    this.unhost();
    try {
      this.transport.stop();
    } catch {
      /* noop */
    }
    this.ads.clear();
    this.listening = false;
  }

  private clearReBeacon(): void {
    if (this.reBeacon) clearInterval(this.reBeacon);
    this.reBeacon = null;
  }

  private push(): void {
    if (!this.hostedAd) return;
    const blob = b64encodeUtf8(JSON.stringify(this.hostedAd));
    if (blob) this.transport.send('beacon', blob);
  }

  private put(ad: SalonAd): void {
    this.ads.set(ad.codigo, { ad, lastSeen: Date.now() });
  }

  private ingest(env: MeshEnvelope): void {
    if (env.kind === 'bye') {
      // Un peer que se va retira sus anuncios.
      for (const [code, cached] of this.ads) {
        if (cached.ad.hostPeerId === env.from) this.ads.delete(code);
      }
      return;
    }
    if (env.kind !== 'beacon') return;
    try {
      const parsed: unknown = JSON.parse(b64decodeUtf8(env.blob));
      if (isValidAd(parsed)) this.put(parsed);
    } catch {
      /* anuncio corrupto → ignorar */
    }
  }

  private prune(): void {
    const now = Date.now();
    for (const [code, cached] of this.ads) {
      if (now - cached.lastSeen > AD_TTL_MS) this.ads.delete(code);
    }
  }
}
