/**
 * Wave-Gov #1170 — Anti-Cheat Audit.
 *
 * Recoge senales del navegador del estudiante (tab switching, paste,
 * salida de fullscreen), las acumula por peer y produce un semaforo
 * (verde/amarillo/rojo) mas una bitacora de alertas para el host.
 * Todo se evalua mesh-local; el host decide las acciones (kick/timeout).
 */

import {
  type SalonEventBus,
  type SalonTenant,
} from './salon-shared';

export type CheatSignal = 'tab_switch' | 'paste' | 'fullscreen_exit' | 'copy';

export type TrafficLight = 'green' | 'yellow' | 'red';

export interface AuditEntry {
  id: string;
  peerId: string;
  signal: CheatSignal;
  severity: 1 | 2 | 3;
  at: number; // epoch ms
}

const SIGNAL_SEVERITY: Record<CheatSignal, 1 | 2 | 3> = {
  tab_switch: 2,
  paste: 3,
  fullscreen_exit: 2,
  copy: 1,
};

export const YELLOW_THRESHOLD = 4; // puntos de severidad acumulada
export const RED_THRESHOLD = 8;

export function signalSeverity(signal: CheatSignal): 1 | 2 | 3 {
  return SIGNAL_SEVERITY[signal];
}

export function trafficLightFor(peerSignals: CheatSignal[]): TrafficLight {
  const score = peerSignals.reduce((acc, s) => acc + SIGNAL_SEVERITY[s], 0);
  if (score >= RED_THRESHOLD) return 'red';
  if (score >= YELLOW_THRESHOLD) return 'yellow';
  return 'green';
}

export interface AntiCheatMonitor {
  record(peerId: string, signal: CheatSignal, at: number): AuditEntry | null;
  entries(peerId?: string): AuditEntry[];
  scoreFor(peerId: string): number;
  lightFor(peerId: string): TrafficLight;
  lights(): Record<string, TrafficLight>;
  /** PeerIds cuyo semaforo es rojo (candidatos a kick/timeout por el host). */
  redPeers(): string[];
  clear(peerId: string): void;
}

export function createAntiCheatMonitor(
  tenant: SalonTenant,
  bus?: SalonEventBus,
): AntiCheatMonitor {
  const log: AuditEntry[] = [];
  let seq = 0;

  function record(peerId: string, signal: CheatSignal, at: number): AuditEntry | null {
    if (!(signal in SIGNAL_SEVERITY)) return null;
    const entry: AuditEntry = {
      id: `ac-${tenant.examId}-${(seq += 1)}`,
      peerId,
      signal,
      severity: SIGNAL_SEVERITY[signal],
      at,
    };
    log.push(entry);
    const light = lightFor(peerId);
    if (light !== 'green') {
      bus?.emit('salon:anti-cheat:alert', tenant, entry);
    }
    return entry;
  }

  function scoreFor(peerId: string): number {
    return log
      .filter((e) => e.peerId === peerId)
      .reduce((acc, e) => acc + e.severity, 0);
  }

  function lightFor(peerId: string): TrafficLight {
    const score = scoreFor(peerId);
    if (score >= RED_THRESHOLD) return 'red';
    if (score >= YELLOW_THRESHOLD) return 'yellow';
    return 'green';
  }

  return {
    record,
    entries(peerId) {
      return peerId ? log.filter((e) => e.peerId === peerId) : [...log];
    },
    scoreFor,
    lightFor,
    lights() {
      const peers = new Set(log.map((e) => e.peerId));
      const out: Record<string, TrafficLight> = {};
      for (const p of peers) out[p] = lightFor(p);
      return out;
    },
    redPeers() {
      const peers = new Set(log.map((e) => e.peerId));
      return [...peers].filter((p) => lightFor(p) === 'red');
    },
    clear(peerId) {
      for (let i = log.length - 1; i >= 0; i -= 1) {
        if (log[i].peerId === peerId) log.splice(i, 1);
      }
    },
  };
}
