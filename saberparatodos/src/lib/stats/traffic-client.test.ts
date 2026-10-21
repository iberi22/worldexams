import { describe, it, expect, vi } from 'vitest';
import {
  countryLabel,
  deviceLabel,
  fetchTrafficStats,
  flagEmoji,
  formatDay,
  pointsToPath,
  sparklinePoints,
} from './traffic-client';

const sample = {
  generatedAt: '2026-10-20T15:00:00.000Z',
  days: 7,
  totals: { pageLoads: 80, visits: 50 },
  byCountry: [],
  byDay: [],
  topPaths: [],
  byDevice: [],
  topReferrers: [],
};

describe('fetchTrafficStats', () => {
  it('requests the period and returns the data', async () => {
    const f = vi.fn(async () => new Response(JSON.stringify(sample), { status: 200 }));
    const out = await fetchTrafficStats(30, f as any, 'https://api.example/');
    expect(f).toHaveBeenCalledWith('https://api.example/v1/stats/traffic?days=30', expect.anything());
    expect(out).toEqual({ status: 'ok', data: sample });
  });

  it('maps 503 to not_configured', async () => {
    const f = vi.fn(async () => new Response('{"error":"STATS_NOT_CONFIGURED"}', { status: 503 }));
    expect(await fetchTrafficStats(7, f as any, 'x')).toEqual({ status: 'not_configured' });
  });

  it('maps upstream failures, bad bodies and network errors to error', async () => {
    expect(await fetchTrafficStats(7, (async () => new Response('', { status: 502 })) as any, 'x')).toEqual({ status: 'error' });
    expect(await fetchTrafficStats(7, (async () => new Response('{}', { status: 200 })) as any, 'x')).toEqual({ status: 'error' });
    expect(
      await fetchTrafficStats(7, (async () => {
        throw new Error('offline');
      }) as any, 'x'),
    ).toEqual({ status: 'error' });
  });
});

describe('labels', () => {
  it('names countries in Spanish and handles unknowns', () => {
    expect(countryLabel({ country: 'CO', iso2: 'CO' })).toBe('Colombia');
    expect(countryLabel({ country: 'XX' })).toBe('Desconocido');
    expect(countryLabel({ country: 'OTROS' })).toMatch(/^Otros países/);
    expect(countryLabel({ country: 'T1' })).toBe('T1');
  });

  it('builds flag emoji only for ISO codes', () => {
    expect(flagEmoji('CO')).toBe('🇨🇴');
    expect(flagEmoji('XX1')).toBe('');
    expect(flagEmoji(undefined)).toBe('');
  });

  it('translates device types', () => {
    expect(deviceLabel('mobile')).toBe('Móvil');
    expect(deviceLabel('desktop')).toBe('Computador');
    expect(deviceLabel('robot')).toBe('Robot');
    expect(deviceLabel('')).toBe('Desconocido');
  });

  it('formats ISO dates without timezone drift', () => {
    expect(formatDay('2026-10-01')).toMatch(/^1\s/);
    expect(formatDay('bad')).toBe('bad');
  });
});

describe('sparkline geometry', () => {
  it('scales from zero and spans the width', () => {
    const pts = sparklinePoints([0, 5, 10], 100, 50, 0);
    expect(pts).toEqual([
      { x: 0, y: 50 },
      { x: 50, y: 25 },
      { x: 100, y: 0 },
    ]);
    expect(pointsToPath(pts)).toBe('M0 50 L50 25 L100 0');
  });

  it('handles empty, single and all-zero series', () => {
    expect(sparklinePoints([], 100, 50)).toEqual([]);
    expect(sparklinePoints([3], 100, 50, 0)).toEqual([{ x: 50, y: 0 }]);
    expect(sparklinePoints([0, 0], 100, 50, 0).every((p) => p.y === 50)).toBe(true);
  });
});
