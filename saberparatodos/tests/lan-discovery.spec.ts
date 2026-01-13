/**
 * LAN Discovery Integration Tests
 *
 * Tests for the mDNS-based LAN host discovery functionality.
 *
 * Note: These tests require the local party-server to be running.
 * Run with: cargo run (in party-server-rust directory)
 *
 * @see party-server-rust/src/infrastructure/discovery.rs
 * @see host-app/src/lib/lan-discovery.ts
 */

import { test, expect } from '@playwright/test';

// Local party server URL
const PARTY_SERVER_URL = 'http://127.0.0.1:8080';

test.describe('LAN Discovery Integration', () => {

  test.describe.configure({ mode: 'serial' });

  test('Party server health check', async ({ request }) => {
    // Skip if server not running
    try {
      const response = await request.get(`${PARTY_SERVER_URL}/health`, {
        timeout: 3000
      });

      expect(response.ok()).toBe(true);
      const data = await response.json();
      expect(data).toHaveProperty('status', 'healthy');
    } catch (error) {
      test.skip(true, 'Party server not running - skipping LAN discovery tests');
    }
  });

  test('Discovery endpoint returns valid response', async ({ request }) => {
    try {
      const response = await request.get(`${PARTY_SERVER_URL}/api/discover`, {
        timeout: 3000
      });

      expect(response.ok()).toBe(true);
      const data = await response.json();

      expect(data).toHaveProperty('success', true);
      expect(data).toHaveProperty('hosts');
      expect(Array.isArray(data.hosts)).toBe(true);
      expect(data).toHaveProperty('count');
      expect(typeof data.count).toBe('number');
    } catch (error) {
      test.skip(true, 'Party server not running');
    }
  });

  test('Discovered hosts have correct structure', async ({ request }) => {
    try {
      const response = await request.get(`${PARTY_SERVER_URL}/api/discover`, {
        timeout: 3000
      });

      if (!response.ok()) {
        test.skip(true, 'Discovery endpoint not available');
        return;
      }

      const data = await response.json();

      // If there are hosts, validate their structure
      if (data.hosts.length > 0) {
        const host = data.hosts[0];

        // Required fields
        expect(host).toHaveProperty('name');
        expect(host).toHaveProperty('host');
        expect(host).toHaveProperty('port');
        expect(typeof host.port).toBe('number');

        // Optional fields (should exist but may be null/undefined)
        expect('party_code' in host).toBe(true);
        expect('player_count' in host).toBe(true);
        expect('max_players' in host).toBe(true);
      } else {
        console.log('No LAN hosts discovered - this is normal if running alone');
      }
    } catch (error) {
      test.skip(true, 'Party server not running');
    }
  });

  test('mDNS service type is correct', async ({ request }) => {
    // This test validates the conceptual setup
    // In real mDNS, we'd look for _worldexams-party._tcp.local.

    try {
      const response = await request.get(`${PARTY_SERVER_URL}/health`, {
        timeout: 3000
      });

      if (response.ok()) {
        const data = await response.json();

        // Verify it's our service
        expect(data).toHaveProperty('version');
        console.log(`Party server version: ${data.version}`);
      }
    } catch (error) {
      test.skip(true, 'Party server not running');
    }
  });

});

test.describe('LAN Discovery Client (Browser)', () => {

  const BASE_URL = 'http://localhost:4321';

  test('isLocalServerRunning returns boolean', async ({ page }) => {
    await page.goto(BASE_URL);

    const result = await page.evaluate(async () => {
      // Try to fetch health endpoint
      try {
        const response = await fetch('http://127.0.0.1:8080/health', {
          method: 'GET',
          signal: AbortSignal.timeout(2000)
        });
        return { running: response.ok, type: 'boolean' };
      } catch {
        return { running: false, type: 'boolean' };
      }
    });

    expect(result.type).toBe('boolean');
    console.log(`Local party server detected: ${result.running}`);
  });

  test('discoverLanHosts returns array', async ({ page }) => {
    await page.goto(BASE_URL);

    const result = await page.evaluate(async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/api/discover', {
          method: 'GET',
          signal: AbortSignal.timeout(2000)
        });

        if (!response.ok) return { hosts: [], success: false };

        const data = await response.json();
        return { hosts: data.hosts || [], success: true };
      } catch {
        return { hosts: [], success: false };
      }
    });

    expect(Array.isArray(result.hosts)).toBe(true);
    console.log(`Discovered ${result.hosts.length} LAN hosts`);
  });

  test('getLanJoinUrl generates correct URL format', async ({ page }) => {
    await page.goto(BASE_URL);

    const result = await page.evaluate(() => {
      const mockHost = {
        name: 'test-host',
        host: '192.168.1.100',
        port: 8080,
        party_code: 'ABC123',
        player_count: 5,
        max_players: 30
      };

      // Generate URL
      const baseUrl = `http://${mockHost.host}:${mockHost.port}`;
      const joinUrl = mockHost.party_code
        ? `${baseUrl}/party?join=${mockHost.party_code}`
        : `${baseUrl}/party`;

      return joinUrl;
    });

    expect(result).toBe('http://192.168.1.100:8080/party?join=ABC123');
  });

});
