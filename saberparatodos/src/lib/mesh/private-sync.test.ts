import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WorldExamsNode } from './WorldExamsNode';
import type { TipData } from './WorldExamsNode';

const XAVIER_URL = 'http://127.0.0.1:8006';
const VALID_TIP: TipData = {
  node_hash: 'wx-node1234567890abc',
  subject: 'matematicas',
  week: 'W01',
  score: 90,
  avg: 85,
};

describe('Private grade mesh sync + BR-06 opt-in', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('opt-in false -> no sync and no network calls', async () => {
    const fetchMock = vi.fn();
    const node = new WorldExamsNode({
      xavierUrl: XAVIER_URL,
      optIn: false,
      fetchImpl: fetchMock as unknown as typeof fetch,
    });

    expect(node.isOptedIn()).toBe(false);

    const resGrade = await node.syncGrade(VALID_TIP);
    expect(resGrade).toEqual([]);

    const resPublish = await node.publish(VALID_TIP);
    expect(resPublish).toEqual([]);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('opt-in true -> sync grade succeeds and fetches aggregated vectors', async () => {
    const mockVectors = [{ subject: 'matematicas', week: 'W01', count: 5, avg: 82 }];
    const fetchMock = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ ok: true, vectors: mockVectors }),
      text: async () => JSON.stringify({ ok: true, vectors: mockVectors }),
    })) as unknown as typeof fetch;

    const node = new WorldExamsNode({
      xavierUrl: XAVIER_URL,
      optIn: false,
      fetchImpl: fetchMock,
    });

    node.enablePrivateSync(true);
    expect(node.isOptedIn()).toBe(true);

    const vectors = await node.syncGrade(VALID_TIP);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(vectors).toEqual(mockVectors);
  });

  it('PII rejection -> throws error if payload contains forbidden PII keys', async () => {
    const fetchMock = vi.fn();
    const node = new WorldExamsNode({
      xavierUrl: XAVIER_URL,
      optIn: true,
      fetchImpl: fetchMock as unknown as typeof fetch,
    });

    const badTip = { ...VALID_TIP, email: 'student@example.com' } as unknown as TipData;

    await expect(node.syncGrade(badTip)).rejects.toThrow(/PII|no permitido/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
