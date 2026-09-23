/**
 * E2E tests for Cloudflare Worker /v1/mesh/* live endpoints (wrangler dev).
 *
 * Dev server execution command:
 *   npm run dev -w @worldexams/worldexams-api
 *   (runs: wrangler dev --port 8787)
 *
 * Target Base URL: http://127.0.0.1:8787
 *
 * Note: These live integration tests require wrangler dev running on port 8787.
 * If the worker server is unreachable on :8787/health, tests are skipped automatically.
 */

import { test, expect } from '@playwright/test';

const WORKER_BASE_URL = 'http://127.0.0.1:8787';

let isServerRunning = false;

test.describe('Cloudflare Worker /v1/mesh/* Live Relay E2E', () => {

  test.beforeAll(async ({ request }) => {
    try {
      const response = await request.get(`${WORKER_BASE_URL}/health`, {
        timeout: 3000,
      });
      if (response.ok()) {
        isServerRunning = true;
      }
    } catch {
      isServerRunning = false;
    }
  });

  test.beforeEach(() => {
    test.skip(!isServerRunning, 'wrangler dev not running — start: npm run dev -w @worldexams/worldexams-api');
  });

  test('1. GET /v1/mesh/health returns 200 with mode, persistence, and Cache-Control: no-store', async ({ request }) => {
    const response = await request.get(`${WORKER_BASE_URL}/v1/mesh/health`);
    expect(response.status()).toBe(200);

    const headers = response.headers();
    expect(headers['cache-control']).toBe('no-store');

    const data = await response.json();
    expect(data).toHaveProperty('mode', 'mesh-first');
    expect(data).toHaveProperty('persistence', 'none-ephemeral');
  });

  test('2. POST /v1/mesh/announce registers peer and GET /v1/mesh/discover lists it', async ({ request }) => {
    const roomHash = `e2e-room-relay-${Date.now()}`;
    const peerId = 'p_e2e_1';

    const announceRes = await request.post(`${WORKER_BASE_URL}/v1/mesh/announce`, {
      data: {
        room_hash: roomHash,
        peer_id: peerId,
      },
    });

    expect(announceRes.status()).toBe(200);
    const announceData = await announceRes.json();
    expect(announceData).toHaveProperty('expires_in_s');
    expect(announceData.expires_in_s).toBeGreaterThanOrEqual(1);

    // Discover peers in room
    let discoverPeers: any[] = [];
    for (let attempt = 0; attempt < 3; attempt++) {
      const discoverRes = await request.get(`${WORKER_BASE_URL}/v1/mesh/discover?room=${roomHash}`);
      expect(discoverRes.status()).toBe(200);
      const discoverData = await discoverRes.json();
      const peers = discoverData.peers || discoverData;
      if (Array.isArray(peers) && peers.includes(peerId)) {
        discoverPeers = peers;
        break;
      }
      await new Promise((r) => setTimeout(r, 200));
    }

    expect(discoverPeers).toContain(peerId);
  });

  test('3. Relay roundtrip: POST /v1/mesh/relay queues envelope; first GET drains, second GET yields empty array', async ({ request }) => {
    const inboxHash = `e2e-inbox-${Date.now()}`;
    const envelope = {
      v: 1,
      from: 'p_e2e_1',
      seq: 0,
      t: Date.now(),
      kind: 'delta',
      blob: 'Y2lwaGVy',
    };

    const postRes = await request.post(`${WORKER_BASE_URL}/v1/mesh/relay`, {
      data: {
        inbox_hash: inboxHash,
        envelope,
      },
    });

    expect(postRes.status()).toBe(200);

    // First GET drains 1 message
    const firstGetRes = await request.get(`${WORKER_BASE_URL}/v1/mesh/relay?inbox=${inboxHash}`);
    expect(firstGetRes.status()).toBe(200);
    const firstGetData = await firstGetRes.json();
    const messages = Array.isArray(firstGetData) ? firstGetData : firstGetData.messages || [];
    expect(messages.length).toBe(1);

    // Second GET yields 0 messages (destructive read)
    const secondGetRes = await request.get(`${WORKER_BASE_URL}/v1/mesh/relay?inbox=${inboxHash}`);
    expect(secondGetRes.status()).toBe(200);
    const secondGetData = await secondGetRes.json();
    const secondMessages = Array.isArray(secondGetData) ? secondGetData : secondGetData.messages || [];
    expect(secondMessages.length).toBe(0);
  });

  test('4. BR-04: Announce and Relay with PII object keys return 400 BR04_PII_REJECTED', async ({ request }) => {
    // Note on BR-04 server-side validation semantics:
    // The server performs containsForbiddenKeys on payload and envelope OBJECT KEYS (e.g. 'email', 'name').
    // Payload blob word content scanning is performed client-side (delta-only); server validates object keys and blob byte size.
    // Therefore this test asserts KEY rejection (BR04_PII_REJECTED) on object keys.

    // 1. Announce with PII key 'email'
    const announcePiiRes = await request.post(`${WORKER_BASE_URL}/v1/mesh/announce`, {
      data: {
        room_hash: 'e2e-room-pii-01',
        peer_id: 'p1',
        email: 'x@y.co',
      },
    });

    expect(announcePiiRes.status()).toBe(400);
    const announcePiiData = await announcePiiRes.json();
    const announceErrStr = JSON.stringify(announcePiiData);
    expect(announceErrStr).toContain('BR04_PII_REJECTED');

    // 2. Relay with envelope containing forbidden key 'email'
    const relayPiiRes = await request.post(`${WORKER_BASE_URL}/v1/mesh/relay`, {
      data: {
        inbox_hash: 'e2e-inbox-pii-01',
        envelope: {
          v: 1,
          from: 'p1',
          email: 'x@y.co',
          blob: 'Y2lwaGVy',
        },
      },
    });

    expect(relayPiiRes.status()).toBe(400);
    const relayPiiData = await relayPiiRes.json();
    const relayErrStr = JSON.stringify(relayPiiData);
    expect(relayErrStr).toContain('BR04_PII_REJECTED');
  });

  test('5. Rate-limit: rapid GET requests eventually trigger 429 RATE_LIMITED', async ({ request }) => {
    let gotRateLimited = false;
    let lastStatus = 200;
    let lastResponseBody = '';

    // Loop rapid GET requests up to 40 attempts to trigger 30/min rate limit bucket
    for (let i = 0; i < 40; i++) {
      const res = await request.get(`${WORKER_BASE_URL}/v1/mesh/health`);
      lastStatus = res.status();
      if (lastStatus === 429) {
        gotRateLimited = true;
        lastResponseBody = await res.text();
        break;
      }
    }

    expect(gotRateLimited).toBe(true);
    expect(lastStatus).toBe(429);
    expect(lastResponseBody).toContain('RATE_LIMITED');
  });

  test('6. TTL expiration: Announce with ttl_s:1 expires after 1.5s and GET /v1/mesh/discover lists 0 peers', async ({ request }) => {
    const roomHash = `e2e-room-ttl-${Date.now()}`;
    const peerId = 'p_ttl_1';

    const announceRes = await request.post(`${WORKER_BASE_URL}/v1/mesh/announce`, {
      data: {
        room_hash: roomHash,
        peer_id: peerId,
        ttl_s: 1,
      },
    });

    expect(announceRes.status()).toBe(200);

    // Wait 1.5s for TTL expiration
    await new Promise((r) => setTimeout(r, 1500));

    const discoverRes = await request.get(`${WORKER_BASE_URL}/v1/mesh/discover?room=${roomHash}`);
    expect(discoverRes.status()).toBe(200);
    const discoverData = await discoverRes.json();
    const peers = Array.isArray(discoverData) ? discoverData : discoverData.peers || [];
    expect(peers.length).toBe(0);
  });

});
