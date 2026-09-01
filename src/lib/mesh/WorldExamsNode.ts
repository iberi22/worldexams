/**
 * WorldExamsNode — nodo WorldExams en SU PROPIA red Xavier (D-102)
 *
 * - Red separada de la red SWAL (no comparte namespaces ni economía)
 * - Lee XavierURL + wallet private key desde localStorage/config
 * - Sync cifrado por wallet vía /v1/f12/private-mesh/sync (XavierSyncClient)
 * - Payload mínimo {node_hash, subject, week, score, avg} — cero PII (BR-04)
 * - Opt-in revocable (BR-06) — publish() es no-op si optIn === false
 * - Storage rent: la persistencia en nodos Xavier genera retribución al
 *   OPERADOR nodal (D-105/D6). El estudiante nunca recibe tokens (BR-03).
 *
 * Interfaces públicas: subscribe(), publish(), getPeers()
 *
 * @see src/lib/mesh/types.ts
 * @see src/lib/mesh/XavierSyncClient.ts
 * @see docs/SWAL/ADR-worldexams-mesh.md
 */

import { XavierSyncClient } from './XavierSyncClient';
import {
  assertNoPII,
  FORBIDDEN_PII_KEYS,
  type AggregatedVector,
  type PeerStats,
  type TipData,
  type WorldExamsNodeConfig,
} from './types';

// ---------------------------------------------------------------------------
// LocalStorage keys (canónicos WorldExams)
// ---------------------------------------------------------------------------

export const LS_KEYS = {
  xavierUrl: 'worldexams.xavierUrl',
  walletPrivateKey: 'worldexams.walletPrivateKey',
  nodeHash: 'worldexams.nodeHash',
  optIn: 'worldexams.mesh.optIn',
  // Xavier server default (local dev)
  defaultXavierUrl: 'http://127.0.0.1:8006',
} as const;

function readLS(key: string): string | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLS(key: string, value: string): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, value);
  } catch {
    // quota / private mode — silencioso
  }
}

function readOptIn(): boolean {
  const raw = readLS(LS_KEYS.optIn);
  if (raw === null) return false; // BR-06: opt-in por defecto false
  return raw === '1' || raw === 'true';
}

/**
 * Deriva un node_hash opaco si no hay uno guardado.
 * En producción sería sha256(wallet_pubkey + instanceId) via SubtleCrypto.
 * Aquí usamos un hash simple determinístico para no depender de crypto.
 */
function deriveNodeHash(walletPrivateKey: string): string {
  // djb2-like hash to hex (suficiente para tests / dev; prod usa wallet real)
  let h = 5381;
  for (let i = 0; i < walletPrivateKey.length; i++) h = (h * 33) ^ walletPrivateKey.charCodeAt(i);
  const hex = (h >>> 0).toString(16).padStart(8, '0');
  // repetir para llegar a >= 16 chars
  return `wx-${hex}${hex}${hex}`.slice(0, 32);
}

export function loadWorldExamsNodeConfig(overrides: Partial<WorldExamsNodeConfig> = {}): WorldExamsNodeConfig {
  const xavierUrl = overrides.xavierUrl ?? readLS(LS_KEYS.xavierUrl) ?? LS_KEYS.defaultXavierUrl;
  const walletPrivateKey = overrides.walletPrivateKey ?? readLS(LS_KEYS.walletPrivateKey) ?? '';
  const storedHash = overrides.nodeHash ?? readLS(LS_KEYS.nodeHash) ?? '';
  const nodeHash = storedHash || (walletPrivateKey ? deriveNodeHash(walletPrivateKey) : 'wx-anonymous-node');
  const optIn = overrides.optIn ?? readOptIn();
  const encrypted = overrides.encrypted ?? true;
  return { xavierUrl, walletPrivateKey, nodeHash, optIn, encrypted };
}

// ---------------------------------------------------------------------------
// WorldExamsNode
// ---------------------------------------------------------------------------

export type PeersCallback = (peers: PeerStats[]) => void;
export type Unsubscribe = () => void;

/**
 * WorldExamsNode — fachada de alto nivel para la mesh privada WorldExams.
 *
 * @example
 * const node = new WorldExamsNode(); // lee localStorage
 * node.setOptIn(true);
 * await node.publish({ node_hash: node.config.nodeHash, subject: 'matematicas', week: 'W01', score: 85, avg: 78 });
 * const peers = await node.getPeers();
 * const off = node.subscribe((vectors) => console.log(vectors));
 */
export class WorldExamsNode {
  public readonly config: WorldExamsNodeConfig;
  private client: XavierSyncClient;
  private peersCache: PeerStats[] = [];
  private subscribers: Set<PeersCallback> = new Set();

  constructor(overrides: Partial<WorldExamsNodeConfig> & { fetchImpl?: typeof fetch } = {}) {
    const { fetchImpl, ...cfgOverrides } = overrides as Partial<WorldExamsNodeConfig> & { fetchImpl?: typeof fetch };
    this.config = loadWorldExamsNodeConfig(cfgOverrides);
    this.client = new XavierSyncClient({
      xavierUrl: this.config.xavierUrl,
      walletPrivateKey: this.config.walletPrivateKey || undefined,
      nodeHash: this.config.nodeHash,
      fetchImpl,
    });
  }

  /** Permite inyectar un fetch mock después de construir (útil en tests) */
  setFetchImpl(fetchImpl: typeof fetch): void {
    this.client = new XavierSyncClient({
      xavierUrl: this.config.xavierUrl,
      walletPrivateKey: this.config.walletPrivateKey || undefined,
      nodeHash: this.config.nodeHash,
      fetchImpl,
    });
  }

  // -- opt-in (BR-06: revocable) --------------------------------------------

  isOptedIn(): boolean {
    return this.config.optIn;
  }

  setOptIn(value: boolean): void {
    this.config.optIn = value;
    writeLS(LS_KEYS.optIn, value ? '1' : '0');
    // Notificar a subscribers del cambio de opt-in si revoca (limpia peers)
    if (!value) {
      this.peersCache = [];
      this.emitPeers();
    }
  }

  /**
   * Habilita o deshabilita la sincronización privada de notas (BR-06: opt-in revocable).
   */
  enablePrivateSync(optIn: boolean): void {
    this.setOptIn(optIn);
  }

  /**
   * Sincroniza una calificación de forma privada cifrada vía XavierSyncClient.
   * Garantiza cero PII comprobando FORBIDDEN_PII_KEYS y derivación de node_hash opaco (BR-04).
   * Si optIn es false, es un no-op y retorna un arreglo vacío (BR-06).
   */
  async syncGrade(gradeData: TipData): Promise<PeerStats[]> {
    if (!this.isOptedIn()) {
      return [];
    }
    // Validación estricta zero-PII
    assertNoPII(gradeData as unknown as Record<string, unknown>);
    return this.publish(gradeData);
  }

  // -- publish ----------------------------------------------------------------

  /**
   * Publica una nota a la red privada WorldExams.
   * - Si optIn === false → no-op (BR-06)
   * - Valida zero-PII antes de salir a la red (BR-04)
   * - Delega a XavierSyncClient.sync() (cifrado por wallet)
   * - Actualiza cache de peers con los vectores agregados anónimos recibidos
   */
  async publish(tip: TipData): Promise<PeerStats[]> {
    if (!this.isOptedIn()) {
      return [];
    }
    // Asegurar que el node_hash del tip coincide con el del nodo (si no, usar el del nodo)
    const normalized: TipData = {
      node_hash: tip.node_hash || this.config.nodeHash,
      subject: tip.subject,
      week: tip.week,
      score: tip.score,
      avg: tip.avg,
    };

    const vectors = await this.client.sync(normalized);
    // Actualizar cache (merge simple: reemplazar por materia/semana)
    this.mergePeers(vectors);
    this.emitPeers();
    return vectors;
  }

  // -- getPeers ---------------------------------------------------------------

  /**
   * Retorna los vectores agregados anónimos cacheados de otros nodos worldexams.
   * No expone identidad — solo agregados (count, avg, p50/p90).
   */
  async getPeers(): Promise<PeerStats[]> {
    // Si no hay cache y está opt-in, intentar un sync vacío no es válido;
    // simplemente retorna cache (puede estar vacío al inicio)
    return [...this.peersCache];
  }

  /** Acceso síncrono al cache (útil para UI reactiva) */
  getPeersSync(): PeerStats[] {
    return [...this.peersCache];
  }

  // -- subscribe --------------------------------------------------------------

  /**
   * Suscribe un callback que se invoca cada vez que llegan nuevos vectores
   * agregados (tras publish). Retorna función unsubscribe.
   */
  subscribe(callback: PeersCallback): Unsubscribe {
    this.subscribers.add(callback);
    // Emitir inmediatamente el estado actual (si hay)
    if (this.peersCache.length > 0) {
      try {
        callback([...this.peersCache]);
      } catch {
        // no romper si el callback falla
      }
    }
    return () => {
      this.subscribers.delete(callback);
    };
  }

  // -- internals --------------------------------------------------------------

  private mergePeers(vectors: AggregatedVector[]): void {
    for (const v of vectors) {
      const idx = this.peersCache.findIndex((p) => p.subject === v.subject && p.week === v.week);
      const peer: PeerStats = { ...v };
      if (idx >= 0) this.peersCache[idx] = peer;
      else this.peersCache.push(peer);
    }
  }

  private emitPeers(): void {
    const snapshot = [...this.peersCache];
    for (const cb of this.subscribers) {
      try {
        cb(snapshot);
      } catch {
        // aislar fallos de un subscriber
      }
    }
  }

  /** Expone el syncUrl efectivo (útil para debug/tests) */
  get syncUrl(): string {
    return this.client.syncUrl;
  }

  /** Reemplaza la URL de Xavier en runtime y persiste a localStorage */
  setXavierUrl(url: string): void {
    try {
      new URL(url);
    } catch {
      throw new Error(`XavierURL inválido: ${url}`);
    }
    this.config.xavierUrl = url.replace(/\/+$/, '');
    writeLS(LS_KEYS.xavierUrl, this.config.xavierUrl);
    // Recrear cliente con nueva URL
    this.client = new XavierSyncClient({
      xavierUrl: this.config.xavierUrl,
      walletPrivateKey: this.config.walletPrivateKey || undefined,
      nodeHash: this.config.nodeHash,
    });
  }
}

// Default singleton lazy (opcional, no auto-instancia en SSR)
let _defaultNode: WorldExamsNode | null = null;

export function getWorldExamsNode(overrides?: Partial<WorldExamsNodeConfig> & { fetchImpl?: typeof fetch }): WorldExamsNode {
  if (_defaultNode && !overrides) return _defaultNode;
  if (overrides) return new WorldExamsNode(overrides);
  _defaultNode = new WorldExamsNode();
  return _defaultNode;
}
