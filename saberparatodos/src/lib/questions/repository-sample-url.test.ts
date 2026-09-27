import { describe, it, expect, vi, afterEach } from 'vitest';
import { defaultQuestionRepository } from './repository';

describe('defaultQuestionRepository.fetchSample request', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('calls the real API URL with mode=sample and a numeric seed (no literal "${...}")', async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ questions: [], meta: { mode: 'sample', period_pool_size: 120 } }), { status: 200 }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const result = await defaultQuestionRepository.fetchSample!(11, 'matematicas', { period: 2, limit: 10, seed: '12345' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const url = String((fetchMock.mock.calls[0] as unknown[])[0]);
    expect(url).not.toContain('${');
    expect(url).toMatch(/\/questions\?/);
    const params = new URL(url, 'https://example.test').searchParams;
    expect(params.get('mode')).toBe('sample');
    expect(params.get('period')).toBe('2');
    expect(params.get('limit')).toBe('10');
    expect(params.get('seed')).toBe('12345');
    expect(result.meta.mode).toBe('sample');
  });
});
