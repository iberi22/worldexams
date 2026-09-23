import { describe, it, expect } from "vitest";
import {
  routeMesh,
  createMeshStores,
  containsForbiddenKeys,
  validateEnvelope,
  type MeshStores,
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
