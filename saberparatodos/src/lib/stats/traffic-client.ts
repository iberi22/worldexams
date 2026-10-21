/**
 * Client for GET /v1/stats/traffic (Cloudflare Web Analytics aggregates).
 * Aggregate-only data: no per-user information ever reaches the browser.
 */

export const STATS_PERIODS = [7, 30, 90] as const;
export type StatsPeriod = (typeof STATS_PERIODS)[number];

export interface TrafficStats {
  generatedAt: string;
  days: number;
  hosts?: string[];
  /** `countries` counts every country seen, before small ones are folded into OTROS. */
  totals: { pageLoads: number; visits: number; countries?: number };
  byCountry: Array<{ country: string; iso2?: string; pageLoads: number; visits: number; pct: number }>;
  byDay: Array<{ date: string; pageLoads: number }>;
  topPaths: Array<{ path: string; pageLoads: number }>;
  byDevice: Array<{ device: string; pageLoads: number; pct: number }>;
  topReferrers: Array<{ host: string; pageLoads: number }>;
}

export type TrafficResult =
  | { status: 'ok'; data: TrafficStats }
  | { status: 'not_configured' }
  | { status: 'error' };

export function getStatsApiBase(): string {
  const env = typeof import.meta !== 'undefined' ? import.meta.env : undefined;
  return env?.PUBLIC_STATS_API_BASE_URL || env?.PUBLIC_RANKED_API_BASE_URL || 'https://api.saberparatodos.space';
}

export async function fetchTrafficStats(
  days: StatsPeriod,
  fetchImpl: typeof fetch = fetch,
  base: string = getStatsApiBase(),
): Promise<TrafficResult> {
  try {
    const res = await fetchImpl(`${base.replace(/\/+$/, '')}/v1/stats/traffic?days=${days}`, {
      headers: { Accept: 'application/json' },
    });
    if (res.status === 503) return { status: 'not_configured' };
    if (!res.ok) return { status: 'error' };
    const data = (await res.json()) as TrafficStats;
    if (!data || typeof data !== 'object' || !data.totals) return { status: 'error' };
    return { status: 'ok', data };
  } catch {
    return { status: 'error' };
  }
}

let regionNames: Intl.DisplayNames | null | undefined;

/** Spanish country name for an ISO alpha-2 code; falls back to the raw value. */
export function countryLabel(entry: { country: string; iso2?: string }): string {
  if (entry.country === 'OTROS') return 'Otros países (menos de 3 visitas cada uno)';
  if (!entry.iso2) return entry.country === 'XX' || !entry.country ? 'Desconocido' : entry.country;
  if (regionNames === undefined) {
    try {
      regionNames = new Intl.DisplayNames(['es'], { type: 'region' });
    } catch {
      regionNames = null;
    }
  }
  try {
    return regionNames?.of(entry.iso2) || entry.iso2;
  } catch {
    return entry.iso2;
  }
}

/** Regional-indicator flag emoji for an ISO alpha-2 code ('' when not a code). */
export function flagEmoji(iso2?: string): string {
  if (!iso2 || !/^[A-Z]{2}$/.test(iso2)) return '';
  return String.fromCodePoint(...[...iso2].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

const DEVICE_LABELS: Record<string, string> = {
  mobile: 'Móvil',
  desktop: 'Computador',
  tablet: 'Tableta',
  smarttv: 'Smart TV',
  console: 'Consola',
};

export function deviceLabel(device: string): string {
  return DEVICE_LABELS[device.toLowerCase()] ?? (device ? device.charAt(0).toUpperCase() + device.slice(1) : 'Desconocido');
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('es-CO').format(Math.round(n));
}

/** "2026-10-19" -> "19 oct" without timezone shifts. */
export function formatDay(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  if (!y || !m || !d) return date;
  return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(Date.UTC(y, m - 1, d));
}

/**
 * Points of a line chart in a width x height box (y grows downward). The y scale
 * always starts at 0 so the trend is not exaggerated.
 */
export function sparklinePoints(values: number[], width: number, height: number, pad = 4): Array<{ x: number; y: number }> {
  if (values.length === 0) return [];
  const max = Math.max(1, ...values);
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const step = values.length > 1 ? innerW / (values.length - 1) : 0;
  return values.map((v, i) => ({
    x: Math.round((pad + (values.length > 1 ? i * step : innerW / 2)) * 10) / 10,
    y: Math.round((pad + innerH - (Math.max(0, v) / max) * innerH) * 10) / 10,
  }));
}

export function pointsToPath(points: Array<{ x: number; y: number }>): string {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
}
