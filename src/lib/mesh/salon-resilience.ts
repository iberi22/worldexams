/**
 * Wave-Gov #1165 — Host Resilience.
 *
 * El host de un salon mesh puede desconectarse momentaneamente (wifi, suspend).
 * Este modulo guarda un snapshot del estado in-flight y permite recover
 * idempotente al reconectar con un resume token de un solo uso.
 */

import {
  tenantKey,
  type SalonEventBus,
  type SalonPeer,
  type SalonResult,
  type SalonTenant,
} from './salon-shared';

export interface HostInFlightState {
  tenantId: string;
  peers: SalonPeer[];
  results: SalonResult[];
  currentQuestionId: string | null;
  savedAt: number; // epoch ms
}

export interface ReconnectOutcome {
  recovered: boolean;
  reason?: 'unknown-token' | 'token-consumed' | 'tenant-mismatch' | 'ok';
  state?: HostInFlightState;
}

export interface HostResilience {
  /** El host llama esto al perder conexion (o periodicamente). */
  snapshot(state: Omit<HostInFlightState, 'tenantId' | 'savedAt'>, now: number): HostInFlightState;
  /** Token de reanudacion emitido tras el snapshot (un solo uso). */
  resumeToken(): string | null;
  reconnect(token: string, tenant: SalonTenant, now: number): ReconnectOutcome;
  lastSnapshot(): HostInFlightState | null;
  disconnectedSinceMs(now: number): number | null;
}

export function createHostResilience(
  tenant: SalonTenant,
  bus?: SalonEventBus,
  randomToken: () => string = defaultTokenFactory,
): HostResilience {
  const id = tenantKey(tenant);
  let snapshotState: HostInFlightState | null = null;
  let token: string | null = null;

  function snapshot(partial: Omit<HostInFlightState, 'tenantId' | 'savedAt'>, now: number) {
    snapshotState = { ...partial, tenantId: id, savedAt: now };
    token = randomToken();
    bus?.emit('salon:host:disconnect', tenant, { tenantId: id, savedAt: now });
    return snapshotState;
  }

  function reconnect(candidate: string, candidateTenant: SalonTenant, _now: number): ReconnectOutcome {
    void _now;
    if (!snapshotState || !token) return { recovered: false, reason: 'unknown-token' };
    if (candidate !== token) return { recovered: false, reason: 'unknown-token' };
    if (tenantKey(candidateTenant) !== snapshotState.tenantId) {
      return { recovered: false, reason: 'tenant-mismatch' };
    }
    const state = snapshotState;
    token = null; // un solo uso
    bus?.emit('salon:host:reconnect', candidateTenant, { tenantId: state.tenantId });
    return { recovered: true, reason: 'ok', state };
  }

  return {
    snapshot,
    resumeToken: () => token,
    reconnect,
    lastSnapshot: () => snapshotState,
    disconnectedSinceMs: (now) => (snapshotState ? now - snapshotState.savedAt : null),
  };
}

function defaultTokenFactory(): string {
  const rnd =
    typeof globalThis.crypto?.randomUUID === 'function'
      ? globalThis.crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  return `resume-${rnd}`;
}
