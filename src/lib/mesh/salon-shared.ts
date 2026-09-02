/**
 * Wave-Gov (#1162-#1174) — Tipos compartidos y bus de eventos mesh-local para salones.
 *
 * Edge-mesh first: todo el governance de salon opera sobre estado local del host.
 * La sincronizacion remota (si se necesita) debe pasar por XavierSyncClient existente.
 *
 * Tenant-aware: cada salon pertenece a un (country + grade + subject + examId).
 */

import type { TipData } from './types';

export type { TipData };

/** Identidad de tenant del salon (regla de dominio WorldExams). */
export interface SalonTenant {
  country: string; // ISO bajo: 'co' | 'mx' | ...
  grade: number; // 3..11
  subject: string; // 'matematicas' | 'lengua' | ...
  examId: string;
}

export function tenantKey(t: SalonTenant): string {
  return `${t.country}:${t.grade}:${t.subject}:${t.examId}`;
}

/** Peer conectado al salon via mesh local. */
export interface SalonPeer {
  peerId: string; // hash opaco (node_hash style, cero PII)
  role: 'host' | 'student';
  joinedAt: string; // ISO timestamp
}

/** Resultado de un estudiante en el salon (anonimizado por peerId). */
export interface SalonResult {
  peerId: string;
  score: number; // 0..100
  answers: Record<string, string>; // questionId -> 'A'|'B'|'C'|'D'
  answeredAt: string;
}

/** Tipos de eventos de governance del salon (broadcast mesh-local). */
export type SalonGovernanceEvent =
  | 'salon:pin:join'
  | 'salon:pin:denied'
  | 'salon:kick'
  | 'salon:timeout:apply'
  | 'salon:timeout:lift'
  | 'salon:host:disconnect'
  | 'salon:host:reconnect'
  | 'salon:privacy:change'
  | 'salon:anti-cheat:alert';

export interface SalonEvent<TPayload = unknown> {
  type: SalonGovernanceEvent;
  tenant: SalonTenant;
  payload: TPayload;
  at: string; // ISO
}

export type SalonEventListener<TPayload = unknown> = (
  ev: SalonEvent<TPayload>,
) => void;

/**
 * Bus de eventos mesh-local minimalista (sin servidor central).
 * Reutilizable por kick, timeout, resilience, privacy y anti-cheat.
 */
export interface SalonEventBus {
  on<T = unknown>(type: SalonGovernanceEvent, listener: SalonEventListener<T>): () => void;
  emit<T = unknown>(type: SalonGovernanceEvent, tenant: SalonTenant, payload: T): SalonEvent<T>;
  history(): SalonEvent[];
}

export function createSalonEventBus(maxHistory = 100): SalonEventBus {
  const listeners = new Map<SalonGovernanceEvent, Set<SalonEventListener<never>>>();
  const events: SalonEvent[] = [];

  return {
    on<T>(type: SalonGovernanceEvent, listener: SalonEventListener<T>) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type)!.add(listener as SalonEventListener<never>);
      return () => {
        listeners.get(type)?.delete(listener as SalonEventListener<never>);
      };
    },
    emit<T>(type: SalonGovernanceEvent, tenant: SalonTenant, payload: T) {
      const ev: SalonEvent<T> = { type, tenant, payload, at: new Date().toISOString() };
      events.push(ev);
      if (events.length > maxHistory) events.shift();
      for (const l of listeners.get(type) ?? []) {
        (l as SalonEventListener<T>)(ev);
      }
      return ev;
    },
    history() {
      return [...events];
    },
  };
}

/** Reloj inyectable para tests deterministas. */
export type Clock = () => number;
export const realClock: Clock = () => Date.now();
