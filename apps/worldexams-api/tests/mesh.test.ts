import { describe, it, expect } from "vitest";
import {
  routeMesh,
  createMeshStores,
  containsForbiddenKeys,
  validateEnvelope,
  type MeshStores,
  type MeshKV,
} from "../src/mesh";

function req(path: string, init?: RequestInit): Request {
  return new Request(`http://localhost${path}`, init);
}

function jsonReq(path: string, data: unknown): Request {
  return req(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

describe("mesh BR-04 gate", () => {
  it("detecta claves PII en cualquier profundidad", () => {
    expect(containsForbiddenKeys({ room_hash: "abc", peer_id: "p1" })).toBe(false);
    expect(containsForbiddenKeys({ email: "a@b.co" })).toBe(true);
    expect(containsForbiddenKeys({ nested: { nota: 5 } })).toBe(true);
    expect(containsForbiddenKeys([{ calificacion: 1 }])).toBe(true);
  });

  it("rechaza envelopes con PII o blob sobredimensionado", () => {
    const base = { v: 1, from: "p_1", seq: 0, t: 1, kind: "delta", blob: "cipher" };
    expect(validateEnvelope(base).ok).toBe(true);
    expect(validateEnvelope({ ...base, blob: "x".repeat(4097) }).ok).toBe(false);
    expect(validateEnvelope({ ...base, kind: "nota" }).ok).toBe(false);
  });
});

describe("mesh rendezvous efímero", () => {
  it("announce → discover lista el peer; expirado desaparece", async () => {
    let now = 1_000_000;
    const stores: MeshStores = createMeshStores(() => now);
    const room = "roomhash-demo-01";

    const ann = await routeMesh(jsonReq("/v1/mesh/announce", { room_hash: room, peer_id: "p_a" }), stores);
    expect(ann?.status).toBe(200);

    const disc = await routeMesh(req(`/v1/mesh/discover?room=${room}`), stores);
    expect(disc?.status).toBe(200);
    expect((disc?.body.peers as unknown[]).length).toBe(1);

    now += 61_000; // TTL 60s vencido
    const disc2 = await routeMesh(req(`/v1/mesh/discover?room=${room}`), stores);
    expect((disc2?.body.peers as unknown[]).length).toBe(0);
  });

  it("rechaza announce con PII y hashes inválidos", async () => {
    const stores = createMeshStores();
    const pii = await routeMesh(jsonReq("/v1/mesh/announce", { room_hash: "ok-room-01", peer_id: "p1", email: "x@y.co" }), stores);
    expect(pii?.status).toBe(400);
    expect(pii?.body.error).toBe("BR04_PII_REJECTED");
    const bad = await routeMesh(jsonReq("/v1/mesh/announce", { room_hash: "x", peer_id: "p1" }), stores);
    expect(bad?.status).toBe(400);
  });
});

describe("mesh relay mailbox (lectura destructiva)", () => {
  it("deposita y drena una vez; segundo GET vacío", async () => {
    const stores = createMeshStores();
    const inbox = "inboxhash-demo-01";
    const envelope = { v: 1, from: "p_a", seq: 1, t: 10, kind: "delta", blob: "opaque-cipher" };

    const dep = await routeMesh(jsonReq("/v1/mesh/relay", { inbox_hash: inbox, envelope }), stores);
    expect(dep?.status).toBe(200);

    const get1 = await routeMesh(req(`/v1/mesh/relay?inbox=${inbox}`), stores);
    expect((get1?.body.messages as unknown[]).length).toBe(1);

    const get2 = await routeMesh(req(`/v1/mesh/relay?inbox=${inbox}`), stores);
    expect((get2?.body.messages as unknown[]).length).toBe(0);
  });
});

describe("mesh health + rate limit", () => {
  it("health declara modo efímero sin persistencia", async () => {
    const stores = createMeshStores();
    const res = await routeMesh(req("/v1/mesh/health"), stores);
    expect(res?.status).toBe(200);
    expect(res?.body.persistence).toBe("none-ephemeral");
    expect(res?.body.mode).toBe("mesh-first");
  });

  it("rate-limit 30 req/min por IP", async () => {
    const stores = createMeshStores();
    const headers = { "cf-connecting-ip": "9.9.9.9" };
    let last = 0;
    for (let i = 0; i < 31; i++) {
      const res = await routeMesh(req("/v1/mesh/health", { headers }), stores);
      last = res?.status || 0;
    }
    expect(last).toBe(429);
  });

  it("retorna null fuera de /v1/mesh/*", async () => {
    const stores = createMeshStores();
    expect(await routeMesh(req("/v1/questions"), stores)).toBeNull();
  });
});

/** Fake KV compartido: simula el namespace entre isolates. */
function fakeKV(shared = new Map<string, string>()): MeshKV {
  return {
    async get(key: string) {
      return shared.has(key) ? shared.get(key)! : null;
    },
    async put(key: string, value: string) {
      shared.set(key, value);
    },
    async list(opts: { prefix: string; limit?: number }) {
      const keys = [...shared.keys()]
        .filter((k) => k.startsWith(opts.prefix))
        .slice(0, opts.limit ?? 100)
        .map((name) => ({ name }));
      return { keys };
    },
  };
}

describe("mesh KV efímero cross-isolate", () => {
  it("announce en isolate A → discover en isolate B lo ve", async () => {
    const kv = fakeKV();
    const room = "kvroom-cross-isolate-01";
    const storesA = createMeshStores();
    const ann = await routeMesh(jsonReq("/v1/mesh/announce", { room_hash: room, peer_id: "p_a" }), storesA, kv);
    expect(ann?.status).toBe(200);

    const storesB = createMeshStores(); // otro isolate: memoria vacía
    const disc = await routeMesh(req(`/v1/mesh/discover?room=${room}`), storesB, kv);
    expect(disc?.status).toBe(200);
    expect((disc?.body.peers as unknown[]).length).toBe(1);
  });

  it("sin KV el discover cross-isolate no ve nada (documenta best-effort)", async () => {
    const room = "kvroom-memory-only-01";
    const storesA = createMeshStores();
    await routeMesh(jsonReq("/v1/mesh/announce", { room_hash: room, peer_id: "p_a" }), storesA);
    const storesB = createMeshStores();
    const disc = await routeMesh(req(`/v1/mesh/discover?room=${room}`), storesB);
    expect((disc?.body.peers as unknown[]).length).toBe(0);
  });

  it("KV caído no rompe announce/discover (fallback memoria)", async () => {
    const deadKv: MeshKV = {
      async get() {
        throw new Error("kv down");
      },
      async put() {
        throw new Error("kv down");
      },
      async list() {
        throw new Error("kv down");
      },
    };
    const room = "kvroom-dead-kv-01";
    const stores = createMeshStores();
    const ann = await routeMesh(jsonReq("/v1/mesh/announce", { room_hash: room, peer_id: "p_a" }), stores, deadKv);
    expect(ann?.status).toBe(200);
    const disc = await routeMesh(req(`/v1/mesh/discover?room=${room}`), stores, deadKv);
    expect((disc?.body.peers as unknown[]).length).toBe(1);
  });

  it("health declara rendezvous kv-ephemeral con binding", async () => {
    const stores = createMeshStores();
    const res = await routeMesh(req("/v1/mesh/health"), stores, fakeKV());
    expect(res?.body.rendezvous).toBe("kv-ephemeral");
  });
});

describe("mesh KV relay cross-isolate", () => {
  const ENVELOPE = { v: 1, from: "p_kv_a", seq: 7, t: 1234567890, kind: "delta", blob: "Y2lwaGVy" };

  it("deposit en A → drain en B (lectura destructiva)", async () => {
    const kv = fakeKV();
    const inbox = "kvinbox-cross-01";
    const storesA = createMeshStores();
    const dep = await routeMesh(
      jsonReq("/v1/mesh/relay", { inbox_hash: inbox, envelope: ENVELOPE }),
      storesA,
      kv,
    );
    expect(dep?.status).toBe(200);

    const storesB = createMeshStores();
    const drain1 = await routeMesh(req(`/v1/mesh/relay?inbox=${inbox}`), storesB, kv);
    expect((drain1?.body.messages as unknown[]).length).toBe(1);
    const drain2 = await routeMesh(req(`/v1/mesh/relay?inbox=${inbox}`), storesB, kv);
    expect((drain2?.body.messages as unknown[]).length).toBe(0);
  });

  it("consume=0 no borra (peek repetible)", async () => {
    const kv = fakeKV();
    const inbox = "kvinbox-peek-01";
    const stores = createMeshStores();
    await routeMesh(jsonReq("/v1/mesh/relay", { inbox_hash: inbox, envelope: ENVELOPE }), stores, kv);
    const peek1 = await routeMesh(req(`/v1/mesh/relay?inbox=${inbox}&consume=0`), stores, kv);
    const peek2 = await routeMesh(req(`/v1/mesh/relay?inbox=${inbox}&consume=0`), stores, kv);
    expect((peek1?.body.messages as unknown[]).length).toBe(1);
    expect((peek2?.body.messages as unknown[]).length).toBe(1);
  });
});
