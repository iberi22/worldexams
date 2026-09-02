/**
 * Wave-Gov #1164 — Host Timeout 5 min.
 *
 * Bloqueo temporal de 5 minutos para un peer (p. ej. tras 3 intentos de PIN
 * fallidos o una falta menor). El countdown se calcula localmente y el lift
 * es automatico al expirar; el host tambien puede levantarlo a mano.
 */

import {
  type Clock,
  type SalonEventBus,
  type SalonTenant,
  realClock,
} from './salon-shared';

export const SALON_TIMEOUT_MS = 5 * 60 * 1000;

export interface TimeoutRecord {
  peerId: string;
  startedAt: number; // epoch ms
  until: number; // epoch ms
  reason: string;
}

export interface SalonTimeoutState {
  active(peerId: string, now?: number): TimeoutRecord | null;
  apply(peerId: string, reason?: string, durationMs?: number): TimeoutRecord;
  countdownSeconds(peerId: string, now?: number): number | null;
  lift(callerId: string, peerId: string): boolean;
  /** Levanta todos los timeouts vencidos. Retorna los peerIds liberados. */
  tick(now?: number): string[];
  activeCount(now?: number): number;
}

export function createSalonTimeoutManager(
  tenant: SalonTenant,
  hostId: string,
  bus?: SalonEventBus,
  clock: Clock = realClock,
): SalonTimeoutState {
  const records = new Map<string, TimeoutRecord>();

  const nowOr = (now?: number) => now ?? clock();

  function active(peerId: string, now?: number): TimeoutRecord | null {
    const rec = records.get(peerId);
    if (!rec) return null;
    const t = nowOr(now);
    if (t >= rec.until) {
      records.delete(peerId);
      return null;
    }
    return rec;
  }

  function apply(peerId: string, reason = 'timeout', durationMs = SALON_TIMEOUT_MS): TimeoutRecord {
    const startedAt = nowOr();
    const rec: TimeoutRecord = { peerId, startedAt, until: startedAt + durationMs, reason };
    records.set(peerId, rec);
    bus?.emit('salon:timeout:apply', tenant, rec);
    return rec;
  }

  function countdownSeconds(peerId: string, now?: number): number | null {
    const rec = active(peerId, now);
    if (!rec) return null;
    return Math.ceil((rec.until - nowOr(now)) / 1000);
  }

  function lift(callerId: string, peerId: string): boolean {
    if (callerId !== hostId) return false;
    const had = records.delete(peerId);
    if (had) bus?.emit('salon:timeout:lift', tenant, { peerId, by: hostId });
    return had;
  }

  function tick(now?: number): string[] {
    const t = nowOr(now);
    const freed: string[] = [];
    for (const [peerId, rec] of [...records.entries()]) {
      if (t >= rec.until) {
        records.delete(peerId);
        freed.push(peerId);
        bus?.emit('salon:timeout:lift', tenant, { peerId, auto: true });
      }
    }
    return freed;
  }

  function activeCount(now?: number): number {
    tick(now);
    return records.size;
  }

  return { active, apply, countdownSeconds, lift, tick, activeCount };
}
