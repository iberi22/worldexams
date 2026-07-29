/**
 * Xavier memory client — namespace app/worldexams/instance/{instanceId}.
 * Cliente HTTP mínimo y opcional: si XAVIER_URL no está configurado o el
 * endpoint no responde, todas las operaciones degradan a no-op silencioso
 * (la app sigue siendo 100% local-first).
 */

import { getOrCreateSwalInstanceId } from './swal-instance-id';

export interface XavierMemory {
  id?: string;
  text: string;
  metadata?: Record<string, unknown>;
  createdAt?: number;
}

function getEndpoint(): string | null {
  const url =
    (typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string | undefined> }).env?.PUBLIC_XAVIER_URL) ||
    (typeof process !== 'undefined' ? process.env?.PUBLIC_XAVIER_URL : undefined);
  return url && url.trim() !== '' ? url.replace(/\/$/, '') : null;
}

export function xavierNamespace(): string {
  return `app/worldexams/instance/${getOrCreateSwalInstanceId()}`;
}

export function isXavierConfigured(): boolean {
  return getEndpoint() !== null;
}

async function request(path: string, init?: RequestInit): Promise<Response | null> {
  const endpoint = getEndpoint();
  if (!endpoint || typeof fetch === 'undefined') return null;
  try {
    const res = await fetch(`${endpoint}${path}`, {
      ...init,
      headers: { 'content-type': 'application/json', ...(init?.headers || {}) },
      signal: AbortSignal.timeout(5_000),
    });
    return res.ok ? res : null;
  } catch {
    return null;
  }
}

/** Guarda una memoria en el namespace de esta instancia. */
export async function xavierSave(text: string, metadata?: Record<string, unknown>): Promise<boolean> {
  const res = await request('/v1/memories', {
    method: 'POST',
    body: JSON.stringify({ namespace: xavierNamespace(), text, metadata }),
  });
  return res !== null;
}

/** Busca memorias del namespace de esta instancia. */
export async function xavierSearch(query: string, limit = 5): Promise<XavierMemory[]> {
  const res = await request(
    `/v1/memories/search?ns=${encodeURIComponent(xavierNamespace())}&q=${encodeURIComponent(query)}&limit=${limit}`,
  );
  if (!res) return [];
  try {
    const data = (await res.json()) as { memories?: XavierMemory[] } | XavierMemory[];
    return Array.isArray(data) ? data : data.memories ?? [];
  } catch {
    return [];
  }
}

/** Snapshot de perfil local (MMR/insights) hacia Xavier para continuidad entre dispositivos. */
export async function xavierSyncProfile(profile: Record<string, unknown>): Promise<boolean> {
  return xavierSave(JSON.stringify({ kind: 'profile-snapshot', profile }), {
    kind: 'profile-snapshot',
    syncedAt: Date.now(),
  });
}
