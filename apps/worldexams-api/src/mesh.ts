/**
 * mesh.ts — Señalización efímera mesh-first para worldexams-api.
 *
 * PRINCIPIOS (no negociables):
 * - El backend es SOLO señalización + buzón relay opaco. NUNCA almacena ni
 *   opera datos del usuario: solo hashes de sala/buzón + blobs cifrados opacos
 *   que el servidor jamás descifra ni inspecciona más allá del gate BR-04.
 * - Sin persistencia: memoria por isolate con TTL corto. El cliente re-anuncia
 *   cada ~20s; si el backend cae, los nodos siguen conectados vía
 *   BroadcastChannel/LAN (L0/L1) + outbox offline (L4). Backend DOWN ≠ mesh DOWN.
 * - Ahorro de tier: sin Durable Objects, sin KV/D1 obligatorios, sin WS
 *   persistentes. Polling solo con sala activa, rate-limit por IP, respuestas
 *   `no-store`, payloads capados.
 * - BR-04: cualquier payload con claves PII se rechaza con 400. BR-03: este
 *   módulo jamás toca notas/calificaciones (solo hashes opacos).
 *
 * Funciones puras + stores inyectables para que `mesh.test.ts` corra en vitest
 * sin dependencias Cloudflare.
 */

export const MESH_RENDEZVOUS_TTL_S = 60;
export const MESH_RELAY_TTL_S = 120;
export const MESH_MAX_BLOB_CHARS = 4096;
export const MESH_MAX_ENVELOPE_JSON = 6144;
export const MESH_MAX_ROOMS = 500;
export const MESH_MAX_PEERS_PER_ROOM = 50;
export const MESH_MAX_INBOXES = 1000;
export const MESH_MAX_MSGS_PER_INBOX = 20;
export const MESH_RATE_LIMIT_PER_MIN = 30;

/** Claves prohibidas (BR-04). El servidor rechaza el payload que las contenga. */
export const MESH_FORBIDDEN_KEYS = [
  "email",
  "nombre",
  "name",
  "apellido",
  "nota",
  "notas",
  "calificacion",
  "calificación",
  "grade_data",
  "phone",
  "telefono",
  "teléfono",
  "documento",
  "password",
  "token",
  "wallet",
] as const;

const HASH_RE = /^[a-z0-9_-]{8,128}$/i;
const PEER_RE = /^[a-z0-9_-]{1,64}$/i;

export type MeshEnvelopeKind = "beacon" | "delta" | "bye" | "sdp";

export interface MeshEnvelope {
  v: 1;
  from: string;
  seq: number;
  t: number;
  kind: MeshEnvelopeKind;
  blob: string;
}

export function isValidHash(value: unknown): value is string {
  return typeof value === "string" && HASH_RE.test(value);
}

export function isValidPeerId(value: unknown): value is string {
  return typeof value === "string" && PEER_RE.test(value);
}

/** Escaneo recursivo de claves (límite de profundidad) para el gate BR-04. */
export function containsForbiddenKeys(value: unknown, depth = 0): boolean {
  if (depth > 6 || value === null || value === undefined) return false;
  if (Array.isArray(value)) return value.some((v) => containsForbiddenKeys(v, depth + 1));
  if (typeof value === "object") {
    for (const key of Object.keys(value as Record<string, unknown>)) {
      const lower = key.toLowerCase();
      for (const forbidden of MESH_FORBIDDEN_KEYS) {
        if (lower === forbidden || lower.includes(forbidden)) return true;
      }
      if (containsForbiddenKeys((value as Record<string, unknown>)[key], depth + 1)) return true;
    }
  }
  return false;
}

export function validateEnvelope(input: unknown): { ok: true; envelope: MeshEnvelope } | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) return { ok: false, error: "ENVELOPE_MUST_BE_OBJECT" };
  const e = input as Record<string, unknown>;
  if (e.v !== 1) return { ok: false, error: "ENVELOPE_VERSION" };
  if (!isValidPeerId(e.from)) return { ok: false, error: "ENVELOPE_FROM" };
  if (typeof e.seq !== "number" || !Number.isFinite(e.seq) || e.seq < 0) return { ok: false, error: "ENVELOPE_SEQ" };
  if (typeof e.t !== "number" || !Number.isFinite(e.t)) return { ok: false, error: "ENVELOPE_T" };
  if (e.kind !== "beacon" && e.kind !== "delta" && e.kind !== "bye" && e.kind !== "sdp") {
    return { ok: false, error: "ENVELOPE_KIND" };
  }
  if (typeof e.blob !== "string" || e.blob.length > MESH_MAX_BLOB_CHARS) {
    return { ok: false, error: "ENVELOPE_BLOB_SIZE" };
  }
  try {
    if (JSON.stringify(e).length > MESH_MAX_ENVELOPE_JSON) return { ok: false, error: "ENVELOPE_TOO_LARGE" };
  } catch {
    return { ok: false, error: "ENVELOPE_SERIALIZE" };
  }
  if (containsForbiddenKeys(e)) return { ok: false, error: "BR04_PII_REJECTED" };
  return {
    ok: true,
    envelope: { v: 1, from: e.from as string, seq: e.seq as number, t: e.t as number, kind: e.kind, blob: e.blob as string },
  };
}

// ─── Stores efímeros (memoria por isolate, TTL corto) ────────────────────────

interface PeerPresence {
  peerId: string;
  seenAt: number;
  expiresAt: number;
}

interface RelayMsg {
  envelope: MeshEnvelope;
  expiresAt: number;
}

export interface MeshStores {
  rooms: Map<string, Map<string, PeerPresence>>;
  inboxes: Map<string, RelayMsg[]>;
  rate: Map<string, { count: number; resetAt: number }>;
  now: () => number;
}

export function createMeshStores(now: () => number = Date.now): MeshStores {
  return { rooms: new Map(), inboxes: new Map(), rate: new Map(), now };
}

/** Limpieza oportunista en cada request (sin timers → sin costo idle). */
export function sweepMeshStores(stores: MeshStores): void {
  const now = stores.now();
  for (const [room, peers] of stores.rooms) {
    for (const [id, p] of peers) {
      if (p.expiresAt <= now) peers.delete(id);
    }
    if (peers.size === 0) stores.rooms.delete(room);
  }
  for (const [inbox, msgs] of stores.inboxes) {
    const live = msgs.filter((m) => m.expiresAt > now);
    if (live.length === 0) stores.inboxes.delete(inbox);
    else if (live.length !== msgs.length) stores.inboxes.set(inbox, live);
  }
  for (const [ip, bucket] of stores.rate) {
    if (bucket.resetAt <= now) stores.rate.delete(ip);
  }
  // Caps duros anti-abuso (evict oldest = inserción más antigua de Map).
  while (stores.rooms.size > MESH_MAX_ROOMS) {
    const oldest = stores.rooms.keys().next().value;
    if (oldest === undefined) break;
    stores.rooms.delete(oldest);
  }
  while (stores.inboxes.size > MESH_MAX_INBOXES) {
    const oldest = stores.inboxes.keys().next().value;
    if (oldest === undefined) break;
    stores.inboxes.delete(oldest);
  }
}

export function checkRateLimit(stores: MeshStores, ip: string): boolean {
  const now = stores.now();
  const bucket = stores.rate.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    stores.rate.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (bucket.count >= MESH_RATE_LIMIT_PER_MIN) return false;
  bucket.count += 1;
  return true;
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

// ─── Router mesh (retorna null si la ruta no es /v1/mesh/*) ──────────────────

export interface MeshRouteResult {
  status: number;
  body: Record<string, unknown>;
}

async function readJsonBody(request: Request, maxChars: number): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  try {
    const text = await request.text();
    if (text.length > maxChars) return { ok: false, error: "BODY_TOO_LARGE" };
    if (!text) return { ok: false, error: "EMPTY_BODY" };
    return { ok: true, data: JSON.parse(text) };
  } catch {
    return { ok: false, error: "INVALID_JSON" };
  }
}

export async function routeMesh(request: Request, stores: MeshStores): Promise<MeshRouteResult | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/v1/mesh/")) return null;
  sweepMeshStores(stores);

  if (!checkRateLimit(stores, clientIp(request))) {
    return { status: 429, body: { error: "RATE_LIMITED", message: "Límite 30 req/min por IP en señalización mesh." } };
  }

  // GET /v1/mesh/health — sin estado, documenta el contrato efímero.
  if (url.pathname === "/v1/mesh/health" && request.method === "GET") {
    return {
      status: 200,
      body: {
        ok: true,
        mode: "mesh-first",
        persistence: "none-ephemeral",
        rendezvous_ttl_s: MESH_RENDEZVOUS_TTL_S,
        relay_ttl_s: MESH_RELAY_TTL_S,
        rate_limit_per_min: MESH_RATE_LIMIT_PER_MIN,
        note: "Backend solo señalización efímera. Datos de usuario nunca se almacenan ni operan; si cae, la mesh P2P sigue vía capas locales.",
      },
    };
  }

  // POST /v1/mesh/announce {room_hash, peer_id, ttl_s?}
  if (url.pathname === "/v1/mesh/announce" && request.method === "POST") {
    const parsed = await readJsonBody(request, 2048);
    if (!parsed.ok) return { status: 400, body: { error: parsed.error } };
    const data = parsed.data as Record<string, unknown>;
    if (containsForbiddenKeys(data)) return { status: 400, body: { error: "BR04_PII_REJECTED" } };
    const roomHash = data.room_hash;
    const peerId = data.peer_id;
    if (!isValidHash(roomHash)) return { status: 400, body: { error: "INVALID_ROOM_HASH" } };
    if (!isValidPeerId(peerId)) return { status: 400, body: { error: "INVALID_PEER_ID" } };
    const ttlS = typeof data.ttl_s === "number" && data.ttl_s > 0 ? Math.min(Math.floor(data.ttl_s), MESH_RENDEZVOUS_TTL_S) : MESH_RENDEZVOUS_TTL_S;
    const now = stores.now();
    let peers = stores.rooms.get(roomHash as string);
    if (!peers) {
      peers = new Map();
      stores.rooms.set(roomHash as string, peers);
    }
    if (!peers.has(peerId as string) && peers.size >= MESH_MAX_PEERS_PER_ROOM) {
      return { status: 429, body: { error: "ROOM_FULL" } };
    }
    peers.set(peerId as string, { peerId: peerId as string, seenAt: now, expiresAt: now + ttlS * 1000 });
    return { status: 200, body: { ok: true, expires_in_s: ttlS } };
  }

  // GET /v1/mesh/discover?room=<hash> | ?prefix=<4+ chars>
  if (url.pathname === "/v1/mesh/discover" && request.method === "GET") {
    const room = url.searchParams.get("room") || "";
    const prefix = url.searchParams.get("prefix") || "";
    if (room) {
      if (!isValidHash(room)) return { status: 400, body: { error: "INVALID_ROOM_HASH" } };
      const peers = stores.rooms.get(room);
      const list = peers
        ? [...peers.values()].map((p) => ({ peer_id: p.peerId, seen_at: p.seenAt }))
        : [];
      return { status: 200, body: { ok: true, room_hash: room, peers: list, count: list.length } };
    }
    if (prefix.length < 4 || prefix.length > 32 || !/^[a-z0-9_-]+$/i.test(prefix)) {
      return { status: 400, body: { error: "INVALID_PREFIX" } };
    }
    const lower = prefix.toLowerCase();
    const rooms: Array<{ room_hash: string; peers: number; last_seen: number }> = [];
    for (const [hash, peers] of stores.rooms) {
      if (hash.toLowerCase().startsWith(lower)) {
        let lastSeen = 0;
        for (const p of peers.values()) lastSeen = Math.max(lastSeen, p.seenAt);
        rooms.push({ room_hash: hash, peers: peers.size, last_seen: lastSeen });
        if (rooms.length >= 20) break;
      }
    }
    return { status: 200, body: { ok: true, rooms, count: rooms.length } };
  }

  // POST /v1/mesh/relay {inbox_hash, envelope} — buzón efímero, lectura destructiva.
  if (url.pathname === "/v1/mesh/relay" && request.method === "POST") {
    const parsed = await readJsonBody(request, MESH_MAX_ENVELOPE_JSON + 512);
    if (!parsed.ok) return { status: 400, body: { error: parsed.error } };
    const data = parsed.data as Record<string, unknown>;
    if (!isValidHash(data.inbox_hash)) return { status: 400, body: { error: "INVALID_INBOX_HASH" } };
    const validated = validateEnvelope(data.envelope);
    if (!validated.ok) return { status: 400, body: { error: validated.error } };
    const inbox = data.inbox_hash as string;
    let msgs = stores.inboxes.get(inbox);
    if (!msgs) {
      if (stores.inboxes.size >= MESH_MAX_INBOXES) return { status: 429, body: { error: "MAILBOX_OVERLOAD" } };
      msgs = [];
      stores.inboxes.set(inbox, msgs);
    }
    if (msgs.length >= MESH_MAX_MSGS_PER_INBOX) return { status: 429, body: { error: "INBOX_FULL" } };
    msgs.push({ envelope: validated.envelope, expiresAt: stores.now() + MESH_RELAY_TTL_S * 1000 });
    return { status: 200, body: { ok: true, queued: msgs.length } };
  }

  // GET /v1/mesh/relay?inbox=<hash>[&consume=0] — por defecto consume (borra al leer).
  if (url.pathname === "/v1/mesh/relay" && request.method === "GET") {
    const inbox = url.searchParams.get("inbox") || "";
    if (!isValidHash(inbox)) return { status: 400, body: { error: "INVALID_INBOX_HASH" } };
    const consume = url.searchParams.get("consume") !== "0";
    const msgs = stores.inboxes.get(inbox) || [];
    const envelopes = msgs.map((m) => m.envelope);
    if (consume) stores.inboxes.delete(inbox);
    return { status: 200, body: { ok: true, messages: envelopes, count: envelopes.length } };
  }

  return { status: 404, body: { error: "MESH_NOT_FOUND", message: "Usa /v1/mesh/health, /announce, /discover o /relay." } };
}
