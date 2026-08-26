/**
 * XavierSyncClient tests — mock fetch, payload mínimo, Zero-PII (WX-204 / D-102)
 *
 * Corre con: npx vitest run tests/mesh/XavierSyncClient.test.ts
 * (también vía saberparatodos vitest si se copia el include)
 *
 * Verifica:
 *  - POST correcto a /v1/f12/private-mesh/sync con payload {node_hash, subject, week, score, avg}
 *  - Headers Content-Type: application/json
 *  - Rechazo local si payload contiene PII (email, name, phone, dni, etc.)
 *  - Rechazo si campos extra fuera del allow-list
 *  - Manejo de respuesta con vectores agregados anónimos
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { XavierSyncClient, SYNC_PATH } from '../../src/lib/mesh/XavierSyncClient';
import type { TipData } from '../../src/lib/mesh/types';

const XAVIER_URL = 'http://127.0.0.1:8006';
const VALID_TIP: TipData = {
  node_hash: 'wx-abc123def4567890',
  subject: 'matematicas',
  week: 'W01',
  score: 85,
  avg: 78,
};

function mockFetchOnce(json: unknown, opts: { ok?: boolean; status?: number } = {}) {
  const { ok = true, status = 200 } = opts;
  const mock = vi.fn(async () => ({
    ok,
    status,
    json: async () => json,
    text: async () => JSON.stringify(json),
  } as unknown as Response));
  return mock as unknown as typeof fetch;
}

describe('XavierSyncClient — payload mínimo y Zero-PII (BR-04)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('hace POST correcto a /v1/f12/private-mesh/sync con payload mínimo', async () => {
    const mockVectors = [{ subject: 'matematicas', week: 'W01', count: 12, avg: 72 }];
    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      expect(url).toBe(`${XAVIER_URL}${SYNC_PATH}`);
      expect(init?.method).toBe('POST');
      expect((init?.headers as Record<string, string>)['Content-Type']).toBe('application/json');
      const body = JSON.parse(init?.body as string);
      // Solo las 5 claves permitidas
      expect(Object.keys(body).sort()).toEqual(['avg', 'node_hash', 'score', 'subject', 'week'].sort());
      expect(body).toEqual(VALID_TIP);
      // No debe haber PII
      expect(body.email).toBeUndefined();
      expect(body.name).toBeUndefined();
      return {
        ok: true,
        status: 200,
        json: async () => ({ ok: true, vectors: mockVectors }),
        text: async () => JSON.stringify({ ok: true, vectors: mockVectors }),
      } as unknown as Response;
    }) as unknown as typeof fetch;

    const client = new XavierSyncClient({ xavierUrl: XAVIER_URL, fetchImpl: fetchMock, walletPrivateKey: 'test-key' });
    const vectors = await client.sync(VALID_TIP);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(vectors).toEqual(mockVectors);
  });

  it('envía header X-Wallet-Hash cuando hay walletPrivateKey', async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      expect((init?.headers as Record<string, string>)['X-Wallet-Hash']).toBeDefined();
      return {
        ok: true,
        status: 200,
        json: async () => ({ ok: true, vectors: [] }),
        text: async () => '',
      } as unknown as Response;
    }) as unknown as typeof fetch;

    const client = new XavierSyncClient({
      xavierUrl: XAVIER_URL,
      walletPrivateKey: 'my-secret-key',
      nodeHash: 'wx-node-hash-12345678',
      fetchImpl: fetchMock,
    });
    await client.sync(VALID_TIP);
    expect(fetchMock).toHaveBeenCalled();
  });

  it('falla si el payload contiene PII (email) — zero-PII guarantee', async () => {
    const fetchMock = mockFetchOnce({ ok: true, vectors: [] });
    const client = new XavierSyncClient({ xavierUrl: XAVIER_URL, fetchImpl: fetchMock });

    const tipWithPII = { ...VALID_TIP, email: 'student@example.com' } as unknown as TipData;
    await expect(client.sync(tipWithPII)).rejects.toThrow(/PII|no permitido/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('falla si el payload contiene name/phone/dni/student_id', async () => {
    const fetchMock = mockFetchOnce({ ok: true, vectors: [] });
    const client = new XavierSyncClient({ xavierUrl: XAVIER_URL, fetchImpl: fetchMock });

    for (const badKey of ['name', 'phone', 'dni', 'student_id', 'nombre', 'pii']) {
      const badTip = { ...VALID_TIP, [badKey]: 'LEAK' } as unknown as TipData;
      await expect(client.sync(badTip)).rejects.toThrow(/PII|no permitido/i);
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('falla si hay campo extra no permitido (aunque no sea PII obvio)', async () => {
    const fetchMock = mockFetchOnce({ ok: true, vectors: [] });
    const client = new XavierSyncClient({ xavierUrl: XAVIER_URL, fetchImpl: fetchMock });

    const tipWithExtra = { ...VALID_TIP, grade: 6 } as unknown as TipData;
    await expect(client.sync(tipWithExtra)).rejects.toThrow(/no permitido/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('falla si score/avg fuera de rango o week inválido', async () => {
    const fetchMock = mockFetchOnce({ ok: true, vectors: [] });
    const client = new XavierSyncClient({ xavierUrl: XAVIER_URL, fetchImpl: fetchMock });

    await expect(client.sync({ ...VALID_TIP, week: 'W99' as unknown as string })).rejects.toThrow(/week/i);
    await expect(client.sync({ ...VALID_TIP, score: 150 })).rejects.toThrow(/score/i);
    await expect(client.sync({ ...VALID_TIP, avg: -5 })).rejects.toThrow(/avg/i);
  });

  it('rechaza vectores agregados que contengan PII del server', async () => {
    const fetchMock = mockFetchOnce({
      ok: true,
      vectors: [{ subject: 'matematicas', week: 'W01', count: 5, avg: 80, email: 'leak@example.com' }],
    });
    const client = new XavierSyncClient({ xavierUrl: XAVIER_URL, fetchImpl: fetchMock });
    await expect(client.sync(VALID_TIP)).rejects.toThrow(/PII/i);
  });

  it('lanza error en HTTP no-ok', async () => {
    const fetchMock = mockFetchOnce({ error: 'unauthorized' }, { ok: false, status: 401 });
    const client = new XavierSyncClient({ xavierUrl: XAVIER_URL, fetchImpl: fetchMock });
    await expect(client.sync(VALID_TIP)).rejects.toThrow(/401/);
  });

  it('retorna vectores vacíos cuando aún no hay otros nodos', async () => {
    const fetchMock = mockFetchOnce({ ok: true, vectors: [] });
    const client = new XavierSyncClient({ xavierUrl: XAVIER_URL, fetchImpl: fetchMock });
    const vectors = await client.sync(VALID_TIP);
    expect(vectors).toEqual([]);
  });

  it('syncWithMeta retorna SyncResult con at y sent', async () => {
    const fetchMock = mockFetchOnce({ ok: true, vectors: [{ subject: 'matematicas', week: 'W01', count: 1, avg: 85 }] });
    const client = new XavierSyncClient({ xavierUrl: XAVIER_URL, fetchImpl: fetchMock });
    const result = await client.syncWithMeta(VALID_TIP);
    expect(result.sent).toEqual(VALID_TIP);
    expect(result.received.length).toBe(1);
    expect(result.at).toBeDefined();
  });
});

describe('XavierSyncClient — config', () => {
  it('requiere xavierUrl válido', () => {
    expect(() => new XavierSyncClient({ xavierUrl: '' } as unknown as { xavierUrl: string })).toThrow(/xavierUrl/i);
    expect(() => new XavierSyncClient({ xavierUrl: 'not-a-url' } as unknown as { xavierUrl: string })).toThrow();
  });

  it('expone syncUrl correcto', () => {
    const c = new XavierSyncClient({ xavierUrl: 'http://127.0.0.1:8006/', fetchImpl: mockFetchOnce({ ok: true, vectors: [] }) });
    expect(c.syncUrl).toBe(`http://127.0.0.1:8006${SYNC_PATH}`);
  });
});
