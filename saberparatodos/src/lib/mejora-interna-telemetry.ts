/**
 * Encrypted "mejora interna" telemetry stub for SWAL mesh.
 * Uses local buffer + namespace helper; full EncryptedNamespacePlugin wiring is next.
 */
import { getOrCreateSwalInstanceId, swalWorldexamsNamespace } from './swal-instance-id';

export type MejoraInternaEvent = {
  type: string;
  at: number;
  payload?: Record<string, unknown>;
};

const BUFFER_KEY = 'swal.worldexams.mejoraInterna.buffer';

function readBuffer(): MejoraInternaEvent[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BUFFER_KEY);
    return raw ? (JSON.parse(raw) as MejoraInternaEvent[]) : [];
  } catch {
    return [];
  }
}

function writeBuffer(events: MejoraInternaEvent[]) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(BUFFER_KEY, JSON.stringify(events.slice(-200)));
  } catch {
    // ignore quota
  }
}

/** Record anonymized product-improvement signal (no exam stems / PII). */
export function recordMejoraInterna(type: string, payload: Record<string, unknown> = {}) {
  const events = readBuffer();
  events.push({
    type,
    at: Date.now(),
    payload: {
      ...payload,
      instanceId: getOrCreateSwalInstanceId(),
      namespace: `${swalWorldexamsNamespace()}/telemetry`,
    },
  });
  writeBuffer(events);
}

export function peekMejoraInternaBuffer(): MejoraInternaEvent[] {
  return readBuffer();
}

/**
 * Placeholder flush — when edge-mesh EncryptedNamespacePlugin is wired,
 * encrypt and gossip under swal/worldexams/{id}/telemetry.
 */
export async function flushMejoraInternaStub(): Promise<{ queued: number; namespace: string }> {
  const events = readBuffer();
  return {
    queued: events.length,
    namespace: `${swalWorldexamsNamespace()}/telemetry`,
  };
}
