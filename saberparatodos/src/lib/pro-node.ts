/**
 * Pro = nodo SWAL activo (era privada, sin Stripe).
 * Un usuario es Pro si su instancia corre un nodo SWAL vivo: identidad
 * estable (instanceId) + mesh edge-mesh iniciado en esta sesión.
 * Las apps consumidoras deben llamar a markNodeActive() tras iniciar el mesh
 * (p2p-edge-mesh.iniciar) y gatear features premium con isProEnabled().
 */

import { getOrCreateSwalInstanceId } from './swal-instance-id';

const NODE_ACTIVE_KEY = 'swal.worldexams.nodeActiveAt';
/** Heartbeat window: el nodo se considera vivo si hubo actividad reciente. */
const NODE_ACTIVE_TTL_MS = 30 * 60 * 1000;

export interface ProNodeStatus {
  enabled: boolean;
  instanceId: string;
  reason: string;
  lastActiveAt: number | null;
}

export function markNodeActive(at: number = Date.now()): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(NODE_ACTIVE_KEY, String(at));
  } catch {
    // storage lleno o modo privado: el gate simplemente seguirá inactivo
  }
}

export function clearNodeActive(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(NODE_ACTIVE_KEY);
  } catch {
    // noop
  }
}

export function getProNodeStatus(now: number = Date.now()): ProNodeStatus {
  const instanceId = getOrCreateSwalInstanceId();
  if (typeof localStorage === 'undefined') {
    return { enabled: false, instanceId, reason: 'sin almacenamiento local (SSR)', lastActiveAt: null };
  }
  let lastActiveAt: number | null = null;
  try {
    const raw = localStorage.getItem(NODE_ACTIVE_KEY);
    lastActiveAt = raw ? Number(raw) : null;
  } catch {
    lastActiveAt = null;
  }
  const alive = lastActiveAt !== null && now - lastActiveAt < NODE_ACTIVE_TTL_MS;
  return {
    enabled: alive,
    instanceId,
    reason: alive
      ? 'nodo SWAL activo'
      : 'nodo inactivo: inicia el mesh (salones) para activar Pro',
    lastActiveAt,
  };
}

export function isProEnabled(now?: number): boolean {
  return getProNodeStatus(now).enabled;
}
