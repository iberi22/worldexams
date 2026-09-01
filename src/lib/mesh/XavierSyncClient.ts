/**
 * XavierSyncClient — wrapper HTTP para /v1/f12/private-mesh/sync (D-102 / BR-04)
 *
 * - Endpoint: POST {xavierUrl}/v1/f12/private-mesh/sync
 * - Payload MÍNIMO: {node_hash, subject, week, score, avg} — cero PII
 * - Cifrado por wallet (header X-Wallet-Hash / Authorization opcional)
 * - Recibe vectores agregados anónimos de otros nodos worldexams
 *
 * Garantías:
 *  - BR-04: assertNoPII() rechaza cualquier campo fuera del allow-list
 *  - BR-03: ningún flujo invoca swal-credits / karma / telemetry
 *  - BR-06: el llamante (WorldExamsNode) debe verificar opt-in antes de sync
 *  - D-105: la persistencia genera storage rent al OPERADOR nodal, no al estudiante
 *
 * @see src/lib/mesh/types.ts
 * @see docs/SWAL/ADR-worldexams-mesh.md
 */

import {
  assertNoPII,
  validateTipData,
  type AggregatedVector,
  type SyncPayload,
  type SyncResponse,
  type SyncResult,
  type TipData,
  type XavierSyncConfig,
} from './types';

const SYNC_PATH = '/v1/f12/private-mesh/sync';

function resolveFetch(impl?: typeof fetch): typeof fetch {
  if (impl) return impl;
  if (typeof globalThis.fetch !== 'undefined') return globalThis.fetch.bind(globalThis) as typeof fetch;
  throw new Error('fetch no disponible — inyecta fetchImpl en XavierSyncConfig');
}

function buildSyncUrl(xavierUrl: string): string {
  const base = xavierUrl.replace(/\/+$/, '');
  return `${base}${SYNC_PATH}`;
}

/**
 * XavierSyncClient — cliente minimalista y testeable para la red
 * privada WorldExams sobre Xavier.
 */
export class XavierSyncClient {
  private readonly xavierUrl: string;
  private readonly walletPrivateKey?: string;
  private readonly nodeHash?: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;

  constructor(config: XavierSyncConfig) {
    if (!config.xavierUrl || typeof config.xavierUrl !== 'string') {
      throw new Error('XavierSyncConfig.xavierUrl requerido');
    }
    // Validación básica de URL
    try {
      new URL(config.xavierUrl);
    } catch {
      throw new Error(`xavierUrl inválido: ${config.xavierUrl}`);
    }
    this.xavierUrl = config.xavierUrl.replace(/\/+$/, '');
    this.walletPrivateKey = config.walletPrivateKey;
    this.nodeHash = config.nodeHash;
    this.fetchImpl = resolveFetch(config.fetchImpl);
    this.timeoutMs = config.timeoutMs ?? 8000;
  }

  /** URL efectiva de sync (útil para tests/logs) */
  get syncUrl(): string {
    return buildSyncUrl(this.xavierUrl);
  }

  /**
   * Cifra un payload con la clave provista o del cliente.
   * Stub con marcador XOR/placeholder.
   * TODO ML-DSA: Reemplazar por firma/cifrado post-cuántico ML-DSA-65 en producción.
   */
  encryptPayload(payload: Record<string, unknown>, secretKey?: string): string {
    const key = secretKey || this.walletPrivateKey || 'default-secret-key';
    const jsonStr = JSON.stringify(payload);
    let cipher = '';
    for (let i = 0; i < jsonStr.length; i++) {
      cipher += String.fromCharCode(jsonStr.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return typeof btoa !== 'undefined' ? btoa(cipher) : Buffer.from(cipher, 'binary').toString('base64');
  }

  /**
   * Publica un tip usando el namespace swal/worldexams/{instanceId}
   */
  async publishTip(tip: TipData, instanceId: string = 'default'): Promise<AggregatedVector[]> {
    const _namespace = `swal/worldexams/${instanceId}`;
    // Se asegura zero-PII antes del envío dentro del namespace (_namespace documentado para auditoría)
    assertNoPII(tip as unknown as Record<string, unknown>);
    return this.sync(tip);
  }

  /**
   * Envía un TipData mínimo al Xavier server y retorna los vectores
   * agregados anónimos de otros nodos worldexams.
   *
   * @throws si el payload contiene PII o campos fuera del allow-list (BR-04)
   * @throws si el server responde no-ok o hay error de red
   */
  async sync(tip: TipData): Promise<AggregatedVector[]> {
    // 1) Validación local estricta — falla antes de tocar la red
    validateTipData(tip);

    // Defensa adicional: assertNoPII sobre el objeto plano
    assertNoPII(tip as unknown as Record<string, unknown>);

    const minimalPayload: SyncPayload = {
      node_hash: tip.node_hash,
      subject: tip.subject,
      week: tip.week,
      score: tip.score,
      avg: tip.avg,
    };

    // 2) Construir headers — cifrado por wallet (si hay key)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    // Wallet-gated sync: el server verifica firma derivada del private key.
    // No enviamos la private key en claro; solo un header opaco.
    if (this.walletPrivateKey) {
      // En producción esto sería una firma real (Ed25519/ML-DSA-65).
      // Aquí enviamos un marcador que el server usa para derivar el nodo.
      headers['X-Wallet-Hash'] = this.nodeHash ?? tip.node_hash;
    }

    const url = this.syncUrl;

    // Timeout con AbortController
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), this.timeoutMs) : null;

    let res: Response;
    try {
      res = await this.fetchImpl(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(minimalPayload),
        signal: controller?.signal,
      } as RequestInit);
    } catch (e) {
      if (timeoutId) clearTimeout(timeoutId);
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes('abort')) throw new Error(`XavierSyncClient timeout (${this.timeoutMs}ms) POST ${url}`);
      throw new Error(`XavierSyncClient network error POST ${url}: ${msg}`);
    }
    if (timeoutId) clearTimeout(timeoutId);

    if (!res.ok) {
      const text = await safeReadText(res);
      throw new Error(`XavierSyncClient HTTP ${res.status} POST ${url}: ${text.slice(0, 500)}`);
    }

    let json: SyncResponse;
    try {
      json = (await res.json()) as SyncResponse;
    } catch {
      throw new Error(`XavierSyncClient: respuesta no-JSON desde ${url}`);
    }

    if (!json.ok && json.error) {
      throw new Error(`XavierSyncClient server error: ${json.error}`);
    }

    // vectors puede venir vacío si aún no hay otros nodos — es válido
    const vectors = Array.isArray(json.vectors) ? json.vectors : [];
    // Saneo: asegurar que los vectores no traigan PII (defensa en profundidad)
    for (const v of vectors) {
      if (typeof v.subject !== 'string' || typeof v.week !== 'string') {
        throw new Error('Vector inválido recibido del server (subject/week requeridos)');
      }
      // Nunca debe venir identidad en vectores agregados
      if ((v as unknown as Record<string, unknown>).email || (v as unknown as Record<string, unknown>).name) {
        throw new Error('[BR-04] Vector agregado contiene PII — rechazado');
      }
    }
    return vectors;
  }

  /**
   * Versión que retorna SyncResult con metadata (útil para WorldExamsNode).
   */
  async syncWithMeta(tip: TipData): Promise<SyncResult> {
    const vectors = await this.sync(tip);
    return {
      sent: { node_hash: tip.node_hash, subject: tip.subject, week: tip.week, score: tip.score, avg: tip.avg },
      received: vectors,
      at: new Date().toISOString(),
    };
  }

  /** Healthcheck opcional: GET {xavierUrl}/v1/f12/private-mesh/health */
  async health(): Promise<boolean> {
    const url = `${this.xavierUrl}/v1/f12/private-mesh/health`;
    try {
      const res = await this.fetchImpl(url, { method: 'GET', headers: { Accept: 'application/json' } } as RequestInit);
      return res.ok;
    } catch {
      return false;
    }
  }
}

async function safeReadText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return '<no body>';
  }
}

export { SYNC_PATH };
