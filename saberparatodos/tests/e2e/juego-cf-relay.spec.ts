/**
 * E2E Live Relay Tests for Cloudflare Worker /v1/mesh/* endpoints
 *
 * Requirements:
 * Requires local Cloudflare Worker running on port 8787:
 *   npm run dev -w @worldexams/worldexams-api
 *   or: wrangler dev --port 8787
 *
 * If 127.0.0.1:8787 is unreachable, tests in this suite automatically skip.
 */

import { test, expect } from "@playwright/test";

const WORKER_BASE_URL = "http://127.0.0.1:8787";

test.describe("Cloudflare Worker /v1/mesh/* E2E Live Relay", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(async ({ request }) => {
    try {
      const res = await request.get(`${WORKER_BASE_URL}/v1/mesh/health`, {
        timeout: 3000,
      });
      if (!res.ok()) {
        test.skip(
          true,
          "wrangler dev not running — start: npm run dev -w @worldexams/worldexams-api"
        );
      }
    } catch {
      test.skip(
        true,
        "wrangler dev not running — start: npm run dev -w @worldexams/worldexams-api"
      );
    }
  });

  test("1. GET /v1/mesh/health returns 200, mesh-first mode, ephemeral persistence and no-store headers", async ({
    request,
  }) => {
    const response = await request.get(`${WORKER_BASE_URL}/v1/mesh/health`);
    expect(response.status()).toBe(200);

    const headers = response.headers();
    expect(headers["cache-control"]).toBe("no-store");

    const data = await response.json();
    expect(data).toMatchObject({
      ok: true,
      mode: "mesh-first",
      persistence: "none-ephemeral",
      rendezvous_ttl_s: 60,
      relay_ttl_s: 120,
      rate_limit_per_min: 30,
    });
    expect(typeof data.note).toBe("string");
  });

  test("2. Announce peer and discover listed peer in room", async ({
    request,
  }) => {
    const runId = Date.now();
    const roomHash = `e2e-room-relay-${runId}`;
    const peerId = `p_e2e_${runId}`;

    const announceRes = await request.post(
      `${WORKER_BASE_URL}/v1/mesh/announce`,
      {
        data: {
          room_hash: roomHash,
          peer_id: peerId,
        },
      }
    );
    expect(announceRes.status()).toBe(200);

    const announceData = await announceRes.json();
    expect(announceData).toMatchObject({
      ok: true,
      expires_in_s: 60,
    });

    // Discover room peers (with retry to handle multi-isolate worker dev behavior)
    let found = false;
    let discoverData: any = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      const discoverRes = await request.get(
        `${WORKER_BASE_URL}/v1/mesh/discover?room=${roomHash}`
      );
      expect(discoverRes.status()).toBe(200);
      discoverData = await discoverRes.json();

      if (
        discoverData.ok &&
        Array.isArray(discoverData.peers) &&
        discoverData.peers.some((p: any) => p.peer_id === peerId)
      ) {
        found = true;
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    expect(found).toBe(true);
    expect(discoverData.room_hash).toBe(roomHash);
  });

  test("3. Relay roundtrip: enqueue envelope and perform destructive read", async ({
    request,
  }) => {
    const runId = Date.now();
    const inboxHash = `e2e-inbox-${runId}`;
    const senderPeer = `p_e2e_${runId}`;
    const timestamp = Date.now();

    const envelope = {
      v: 1,
      from: senderPeer,
      seq: 0,
      t: timestamp,
      kind: "delta",
      blob: "Y2lwaGVy",
    };

    const relayPost = await request.post(`${WORKER_BASE_URL}/v1/mesh/relay`, {
      data: {
        inbox_hash: inboxHash,
        envelope,
      },
    });
    expect(relayPost.status()).toBe(200);

    const postData = await relayPost.json();
    expect(postData.ok).toBe(true);
    expect(postData.queued).toBeGreaterThanOrEqual(1);

    // First GET: drains 1 message
    const drain1Res = await request.get(
      `${WORKER_BASE_URL}/v1/mesh/relay?inbox=${inboxHash}`
    );
    expect(drain1Res.status()).toBe(200);

    const drain1Data = await drain1Res.json();
    expect(drain1Data.ok).toBe(true);
    expect(drain1Data.count).toBe(1);
    expect(drain1Data.messages).toHaveLength(1);
    expect(drain1Data.messages[0]).toEqual(envelope);

    // Second GET: destructive read means 0 messages remain
    const drain2Res = await request.get(
      `${WORKER_BASE_URL}/v1/mesh/relay?inbox=${inboxHash}`
    );
    expect(drain2Res.status()).toBe(200);

    const drain2Data = await drain2Res.json();
    expect(drain2Data.ok).toBe(true);
    expect(drain2Data.count).toBe(0);
    expect(drain2Data.messages).toHaveLength(0);
  });

  test("4. BR-04: Announce with PII payload keys is rejected with BR04_PII_REJECTED", async ({
    request,
  }) => {
    // Note on server-side PII validation semantics:
    // The server-side mesh.ts containsForbiddenKeys helper recursively inspects JSON Object KEYS
    // and Array values, NOT string contents/words inside opaque blobs.
    // Therefore, BR-04 rejection triggers when forbidden keys (such as 'email', 'nombre', etc.)
    // appear as JSON envelope/payload keys.
    const runId = Date.now();
    const piiRoomHash = `e2e-room-pii-${runId}`;

    const announcePii = await request.post(
      `${WORKER_BASE_URL}/v1/mesh/announce`,
      {
        data: {
          room_hash: piiRoomHash,
          peer_id: "p1",
          email: "x@y.co",
        },
      }
    );
    expect(announcePii.status()).toBe(400);

    const piiData = await announcePii.json();
    expect(piiData.error).toBe("BR04_PII_REJECTED");
  });

  test("5. TTL expiration: announce with ttl_s: 1 expires after 1.5s", async ({
    request,
  }) => {
    const runId = Date.now();
    const ttlRoomHash = `e2e-room-ttl-${runId}`;
    const ttlPeerId = `p_ttl_${runId}`;

    const announceRes = await request.post(
      `${WORKER_BASE_URL}/v1/mesh/announce`,
      {
        data: {
          room_hash: ttlRoomHash,
          peer_id: ttlPeerId,
          ttl_s: 1,
        },
      }
    );
    expect(announceRes.status()).toBe(200);

    const announceData = await announceRes.json();
    expect(announceData.expires_in_s).toBe(1);

    // Wait 1.5s for TTL expiration
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const discoverRes = await request.get(
      `${WORKER_BASE_URL}/v1/mesh/discover?room=${ttlRoomHash}`
    );
    expect(discoverRes.status()).toBe(200);

    const discoverData = await discoverRes.json();
    expect(discoverData.ok).toBe(true);
    expect(discoverData.count).toBe(0);
    expect(discoverData.peers).toHaveLength(0);
  });

  test("6. Rate limit: rapid GET /v1/mesh/health requests trigger 429 RATE_LIMITED", async ({
    request,
  }) => {
    let hitRateLimit = false;
    let lastStatus = 200;
    let lastBody: any = null;

    // Loop rapid requests up to cap 40 until 429 is encountered
    for (let i = 0; i < 40; i++) {
      const res = await request.get(`${WORKER_BASE_URL}/v1/mesh/health`);
      lastStatus = res.status();
      if (lastStatus === 429) {
        hitRateLimit = true;
        lastBody = await res.json();
        break;
      }
    }

    expect(hitRateLimit).toBe(true);
    expect(lastStatus).toBe(429);
    expect(lastBody.error).toBe("RATE_LIMITED");
  });
});
