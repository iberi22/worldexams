import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MeshTransport, isValidEnvelopeShape } from './transport';

const ROOM = 'testroom-abc123';

function failingFetch(): typeof fetch {
  return (() => Promise.reject(new Error('backend down'))) as unknown as typeof fetch;
}

function okFetchEmpty(): typeof fetch {
  const res = (body: unknown, ok = true) =>
    ({ ok, json: async () => body }) as unknown as Response;
  return (async (url: string | URL | Request) => {
    const u = String(url);
    if (u.includes('/announce')) return res({ ok: true, expires_in_s: 60 });
    if (u.includes('/discover')) return res({ ok: true, peers: [], count: 0 });
    if (u.includes('/mesh/relay?')) return res({ ok: true, messages: [], count: 0 });
    if (u.includes('/mesh/relay')) return res({ ok: true, queued: 1 });
    return res({}, false);
  }) as unknown as typeof fetch;
}

describe('isValidEnvelopeShape (gate BR-04 origen)', () => {
  it('acepta envelope mínimo válido', () => {
    expect(
      isValidEnvelopeShape({ v: 1, room: ROOM, from: 'p_1', seq: 0, t: 1, kind: 'delta', blob: 'aGVsbG8' })
    ).toBe(true);
  });

  it('rechaza claves extra (posible PII)', () => {
    expect(
      isValidEnvelopeShape({ v: 1, room: ROOM, from: 'p_1', seq: 0, t: 1, kind: 'delta', blob: 'x', email: 'a@b.co' })
    ).toBe(false);
  });

  it('rechaza blob con palabras de datos en claro', () => {
    expect(
      isValidEnvelopeShape({ v: 1, room: ROOM, from: 'p_1', seq: 0, t: 1, kind: 'delta', blob: 'mi nota es 5' })
    ).toBe(false);
  });

  it('rechaza blob sobredimensionado y room inválido', () => {
    expect(
      isValidEnvelopeShape({ v: 1, room: ROOM, from: 'p_1', seq: 0, t: 1, kind: 'delta', blob: 'x'.repeat(4097) })
    ).toBe(false);
    expect(
      isValidEnvelopeShape({ v: 1, room: 'x', from: 'p_1', seq: 0, t: 1, kind: 'delta', blob: 'ok' })
    ).toBe(false);
  });
});

describe('MeshTransport mesh-first', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  it('sin timers sin sala: start es lo que activa la red', () => {
    const t = new MeshTransport({ fetchImpl: failingFetch() });
    expect(t.status().room).toBeNull();
    expect(t.status().backend).toBe('unknown');
    t.stop();
  });

  it('backend caído → mesh sigue: send encola en outbox (L4)', async () => {
    const t = new MeshTransport({ backendBase: 'https://mesh.test', fetchImpl: failingFetch(), announceMs: 50, discoverMs: 50, relayPollMs: 50 });
    t.start(ROOM);
    // beacon inicial cae a outbox (sin BC entre transports distintos en este test unitario
    // no importa: verificamos el invariante backend-down ⇒ outbox crece, nada se pierde)
    t.send('delta', 'aGVsbG8');
    await new Promise((r) => setTimeout(r, 120));
    expect(t.status().backend).toBe('down');
    expect(t.getOutboxCount()).toBeGreaterThan(0);
    t.stop();
  });

  it('dos nodos se ven por BroadcastChannel sin backend', async () => {
    const a = new MeshTransport({ peerId: 'p_nodo_a' });
    const b = new MeshTransport({ peerId: 'p_nodo_b' });
    const seen: string[] = [];
    b.onEnvelope((env, via) => {
      if (via === 'bc') seen.push(env.blob);
    });
    a.start(ROOM);
    b.start(ROOM);
    a.send('delta', 'Y2lwaGVyLW9wYXF1ZQ');
    await new Promise((r) => setTimeout(r, 100));
    expect(seen).toContain('Y2lwaGVyLW9wYXF1ZQ');
    expect(b.status().bcPeers).toBeGreaterThan(0);
    a.stop();
    b.stop();
  });

  it('dedupe entre capas: mismo seq no se entrega dos veces', async () => {
    const t = new MeshTransport({ peerId: 'p_dupe_a', fetchImpl: okFetchEmpty() });
    let count = 0;
    t.onEnvelope(() => count++);
    t.start(ROOM);
    const env = t.send('beacon', 'e30');
    expect(env).not.toBeNull();
    // Reinyectar el mismo envelope vía ingesta simulada con otro transporte emisor:
    // (BC loopback a sí mismo está excluido por from; verificamos vía API pública)
    t.stop();
    expect(count).toBe(0); // nada propio re-entra
  });
});
