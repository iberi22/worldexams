/**
 * WorldExams Private Mesh — Types (D-102 / BR-04 / BR-06 / D-105)
 *
 * Red Xavier PROPIA de WorldExams, separada de la red SWAL.
 * Payload mínimo anónimo salvado cifrado por wallet.
 * Cero PII. Opt-in revocable. Storage rent solo al operador nodal.
 *
 * @see docs/SWAL/ADR-worldexams-mesh.md
 * @see docs/DECISIONS_2026-08-25-REDES-XAVIER-Y-ETICA.md (D-101..D-105)
 */

// ---------------------------------------------------------------------------
// TipData — unidad mínima de sync (BR-04: solo estos 5 campos)
// ---------------------------------------------------------------------------

/**
 * TipData — payload mínimo por materia/semana enviado a
 * POST /v1/f12/private-mesh/sync. BR-04 garantiza que NO se envía
 * ningún dato personal identificable.
 *
 * - node_hash: hash opaco del wallet/node (p.ej. sha256(wallet_pubkey+instanceId))
 * - subject:   materia canónica (matematicas, lengua, ciencias, ingles, etc.)
 * - week:      W01..W40 (secuencia curricular interna, no ISO)
 * - score:     puntaje obtenido en la semana (0..100 | 0..20 según país)
 * - avg:       promedio acumulado del nodo en esa materia
 */
export interface TipData {
  node_hash: string;
  subject: string;
  week: string;
  score: number;
  avg: number;
}

// Alias canónico exigido por la tarea — mismo shape que TipData
export type SyncPayload = TipData;

// Payload minimalista validado antes de enviar (sin campos extra)
export type SyncPayloadMinimal = Pick<TipData, 'node_hash' | 'subject' | 'week' | 'score' | 'avg'>;

// ---------------------------------------------------------------------------
// Validación Zero-PII (BR-04) — lista de claves prohibidas
// ---------------------------------------------------------------------------

/** Campos que JAMÁS deben aparecer en el payload (cero PII). */
export const FORBIDDEN_PII_KEYS = [
  'email',
  'name',
  'nombre',
  'phone',
  'telefono',
  'address',
  'direccion',
  'student_id',
  'student_name',
  'user',
  'username',
  'usuario',
  'pii',
  'dni',
  'cedula',
  'cpf',
  'birthdate',
  'fecha_nacimiento',
  'ip',
  'location',
  'geolocation',
  'photo',
  'avatar',
] as const;

export const ALLOWED_PAYLOAD_KEYS: ReadonlySet<string> = new Set([
  'node_hash',
  'subject',
  'week',
  'score',
  'avg',
]);

/**
 * Detecta si un objeto contiene claves PII prohibidas o claves fuera del
 * allow-list. Retorna { ok, reason } para que el cliente falle rápido
 * localmente sin siquiera hacer fetch.
 */
export function assertNoPII(payload: Record<string, unknown>): void {
  const keys = Object.keys(payload).map((k) => k.toLowerCase());
  for (const k of keys) {
    if (!ALLOWED_PAYLOAD_KEYS.has(k)) {
      // Si la clave está en la lista prohibida → PII leak
      if ((FORBIDDEN_PII_KEYS as readonly string[]).includes(k)) {
        throw new Error(`[BR-04] PII detectado — clave prohibida: "${k}" (zero-PII guarantee)`);
      }
      // Cualquier otra clave no permitida también se rechaza (payload mínimo)
      throw new Error(`[BR-04] Campo no permitido en SyncPayload: "${k}". Solo {node_hash, subject, week, score, avg}`);
    }
    const val = payload[k];
    // Heurística: detectar emails embebidos en valores string
    if (typeof val === 'string' && /[^\s]+@[^\s]+\.[^\s]+/.test(val) && k !== 'node_hash') {
      throw new Error(`[BR-04] Posible PII en valor de "${k}": parece email`);
    }
  }
}

/**
 * Valida shape y rangos del payload mínimo.
 */
export function validateTipData(data: unknown): asserts data is TipData {
  if (typeof data !== 'object' || data === null) throw new Error('TipData debe ser un objeto');
  const d = data as Record<string, unknown>;
  assertNoPII(d as Record<string, unknown>);

  if (typeof d.node_hash !== 'string' || d.node_hash.length < 8) {
    throw new Error('node_hash debe ser string >= 8 chars (hash opaco del nodo)');
  }
  if (typeof d.subject !== 'string' || !d.subject.trim()) {
    throw new Error('subject requerido (ej: matematicas)');
  }
  if (typeof d.week !== 'string' || !/^W(0[1-9]|[1-3][0-9]|40)$/.test(d.week)) {
    throw new Error('week debe ser W01..W40');
  }
  if (typeof d.score !== 'number' || Number.isNaN(d.score) || d.score < 0 || d.score > 100) {
    throw new Error('score debe ser number 0..100');
  }
  if (typeof d.avg !== 'number' || Number.isNaN(d.avg) || d.avg < 0 || d.avg > 100) {
    throw new Error('avg debe ser number 0..100');
  }
}

// ---------------------------------------------------------------------------
// Sync protocol types
// ---------------------------------------------------------------------------

/** Config del cliente Xavier sync. Lee wallet + URL desde localStorage/config. */
export interface XavierSyncConfig {
  /** URL base del Xavier server (ej: http://127.0.0.1:8006 o https://xavier.swal.network) */
  xavierUrl: string;
  /** Private key / seed de la wallet que cifra el payload (opcional en tests) */
  walletPrivateKey?: string;
  /** Hash opaco del nodo (derivado de wallet; si no se provee se calcula) */
  nodeHash?: string;
  /** Fetch impl inyectable para tests (default: globalThis.fetch) */
  fetchImpl?: typeof fetch;
  /** Timeout ms para POST sync */
  timeoutMs?: number;
}

/** Vector agregado anónimo recibido de otros nodos worldexams. */
export interface AggregatedVector {
  subject: string;
  week: string;
  count: number; // nº de nodos que aportaron en esa materia/semana
  avg: number; // promedio agregado anónimo
  p50?: number;
  p90?: number;
  min?: number;
  max?: number;
}

/** Alias semántico para compatibilidad con spec: PeerStats = AggregatedVector + node_hash opcional */
export interface PeerStats extends AggregatedVector {
  /** node_hash solo aparece si el peer permite desanonimizar su agregado (normalmente no) */
  node_hash?: string;
}

/** Respuesta del endpoint /v1/f12/private-mesh/sync */
export interface SyncResponse {
  ok: boolean;
  vectors: AggregatedVector[];
  // El servidor puede devolver también el hash confirmado y el timestamp
  received?: { node_hash: string; at: string };
  error?: string;
}

/** Resultado de publish/sync en el cliente */
export interface SyncResult {
  sent: SyncPayloadMinimal;
  received: AggregatedVector[];
  at: string;
}

// ---------------------------------------------------------------------------
// WorldExamsNode config & events
// ---------------------------------------------------------------------------

export interface WorldExamsNodeConfig {
  xavierUrl: string;
  walletPrivateKey: string;
  nodeHash: string;
  /** opt-in revocable (BR-06). Si false, publish() es no-op */
  optIn: boolean;
  /** Si true, el payload se cifra con wallet antes de POST (wallet-gated sync) */
  encrypted: boolean;
}

export type MeshEventType = 'sync' | 'peers:update' | 'optin:change';

export interface MeshEventMap {
  'sync': SyncResult;
  'peers:update': PeerStats[];
  'optin:change': boolean;
}
