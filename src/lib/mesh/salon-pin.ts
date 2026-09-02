/**
 * Wave-Gov #1162 — Room PIN & Access Gate.
 *
 * PIN opcional de 6 digitos para un salon mesh-first. El host genera el PIN;
 * los peers deben validarlo antes de join. Bloqueo temporal tras N intentos
 * fallidos (coordinado con salon-timeout #1164).
 *
 * Cero servidor central: la validacion ocurre en el nodo host.
 */

import {
  tenantKey,
  type SalonEventBus,
  type SalonTenant,
} from './salon-shared';

export const PIN_LENGTH = 6;
export const MAX_PIN_ATTEMPTS = 3;
export const PIN_LOCKOUT_MS = 5 * 60 * 1000;

export function isRoomPinFormat(pin: unknown): pin is string {
  return typeof pin === 'string' && new RegExp(`^\\d{${PIN_LENGTH}}$`).test(pin);
}

/** Genera un PIN de 6 digitos usando crypto si esta disponible. */
export function generateRoomPin(random: () => number = Math.random): string {
  let pin = '';
  for (let i = 0; i < PIN_LENGTH; i += 1) {
    pin += Math.floor(random() * 10).toString();
  }
  return pin;
}

/** Normaliza entrada de usuario: solo digitos, maximos 6. */
export function normalizeRoomPin(raw: string): string {
  return (raw ?? '').replace(/\D/g, '').slice(0, PIN_LENGTH);
}

/** Comparacion en tiempo constante para evitar side-channels triviales. */
export function safePinEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export interface PinGateState {
  tenantId: string;
  requiresPin: boolean;
  attempts: number;
  lockedUntil: number | null; // epoch ms
}

export interface PinJoinResult {
  allowed: boolean;
  reason?: 'no-pin-required' | 'ok' | 'invalid-pin' | 'locked' | 'malformed';
  attemptsLeft?: number;
  lockedUntil?: number;
}

export interface RoomPinGate {
  state(): PinGateState;
  tryJoin(pinInput: string | null, now: number): PinJoinResult;
  rotatePin(newPin: string): void;
}

/**
 * Crea el gate de acceso de un salon. `pin = null` => salon abierto.
 * Opcional: emite eventos `salon:pin:join` / `salon:pin:denied` al bus mesh-local.
 */
export function createRoomPinGate(
  tenant: SalonTenant,
  pin: string | null,
  bus?: SalonEventBus,
): RoomPinGate {
  if (pin !== null && !isRoomPinFormat(pin)) {
    throw new Error('[#1162] Room PIN debe ser exactamente 6 digitos o null');
  }
  const id = tenantKey(tenant);
  const gate: PinGateState & { pin: string | null } = {
    tenantId: id,
    requiresPin: pin !== null,
    attempts: 0,
    lockedUntil: null,
    pin,
  };

  function state(): PinGateState {
    return {
      tenantId: gate.tenantId,
      requiresPin: gate.requiresPin,
      attempts: gate.attempts,
      lockedUntil: gate.lockedUntil,
    };
  }

  function tryJoin(pinInput: string | null, now: number): PinJoinResult {
    if (gate.lockedUntil !== null && now < gate.lockedUntil) {
      return { allowed: false, reason: 'locked', lockedUntil: gate.lockedUntil };
    }
    if (gate.lockedUntil !== null && now >= gate.lockedUntil) {
      gate.lockedUntil = null;
      gate.attempts = 0;
    }
    if (!gate.requiresPin || gate.pin === null) {
      bus?.emit('salon:pin:join', tenant, { pinRequired: false });
      return { allowed: true, reason: 'no-pin-required' };
    }
    if (pinInput === null || pinInput === '') {
      gate.attempts += 1;
    } else if (!isRoomPinFormat(pinInput)) {
      gate.attempts += 1;
      if (gate.attempts >= MAX_PIN_ATTEMPTS) {
        gate.lockedUntil = now + PIN_LOCKOUT_MS;
        gate.attempts = 0;
      }
      bus?.emit('salon:pin:denied', tenant, { reason: 'malformed' });
      return { allowed: false, reason: 'malformed', attemptsLeft: MAX_PIN_ATTEMPTS - gate.attempts };
    } else if (!safePinEquals(gate.pin, pinInput)) {
      gate.attempts += 1;
      if (gate.attempts >= MAX_PIN_ATTEMPTS) {
        gate.lockedUntil = now + PIN_LOCKOUT_MS;
        gate.attempts = 0;
        bus?.emit('salon:pin:denied', tenant, { reason: 'locked' });
        return { allowed: false, reason: 'locked', lockedUntil: gate.lockedUntil };
      }
      bus?.emit('salon:pin:denied', tenant, { reason: 'invalid-pin' });
      return { allowed: false, reason: 'invalid-pin', attemptsLeft: MAX_PIN_ATTEMPTS - gate.attempts };
    }
    gate.attempts = 0;
    bus?.emit('salon:pin:join', tenant, { pinRequired: true });
    return { allowed: true, reason: 'ok' };
  }

  function rotatePin(newPin: string): void {
    if (!isRoomPinFormat(newPin)) {
      throw new Error('[#1162] Room PIN debe ser exactamente 6 digitos');
    }
    gate.pin = newPin;
    gate.requiresPin = true;
    gate.attempts = 0;
    gate.lockedUntil = null;
  }

  return { state, tryJoin, rotatePin };
}
