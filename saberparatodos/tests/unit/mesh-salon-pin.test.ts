import { describe, it, expect } from 'vitest';
import {
  createRoomPinGate,
  generateRoomPin,
  isRoomPinFormat,
  normalizeRoomPin,
  safePinEquals,
  PIN_LENGTH,
  MAX_PIN_ATTEMPTS,
} from '../../src/lib/mesh/salon-pin';
import { createSalonEventBus } from '../../src/lib/mesh/salon-shared';

const tenant = { country: 'co', grade: 7, subject: 'matematicas', examId: 'ex1' };

describe('#1162 Room PIN & Access Gate', () => {
  it('genera y valida PIN de 6 digitos', () => {
    const pin = generateRoomPin();
    expect(pin).toHaveLength(PIN_LENGTH);
    expect(isRoomPinFormat(pin)).toBe(true);
    expect(isRoomPinFormat('12a456')).toBe(false);
    expect(normalizeRoomPin('a1b2*3 456789')).toBe('123456');
  });

  it('salon sin PIN permite join directo', () => {
    const gate = createRoomPinGate(tenant, null);
    const res = gate.tryJoin(null, 1000);
    expect(res.allowed).toBe(true);
    expect(res.reason).toBe('no-pin-required');
  });

  it('rechaza PIN invalido y bloquea tras MAX_PIN_ATTEMPTS', () => {
    const bus = createSalonEventBus();
    const gate = createRoomPinGate(tenant, '123456', bus);
    expect(gate.tryJoin('000000', 1).allowed).toBe(false);
    expect(gate.tryJoin('000000', 2).allowed).toBe(false);
    const third = gate.tryJoin('000000', 3);
    expect(third.allowed).toBe(false);
    expect(third.reason).toBe('locked');
    expect(gate.state().attempts).toBe(0);
    // bloqueado hasta PIN_LOCKOUT_MS
    expect(gate.tryJoin('123456', 3 + 1000).allowed).toBe(false);
    // desbloquea despues del lockout y el PIN correcto entra
    expect(gate.tryJoin('123456', 3 + 6 * 60 * 1000).allowed).toBe(true);
    expect(MAX_PIN_ATTEMPTS).toBe(3);
    expect(bus.history().some((e) => e.type === 'salon:pin:denied')).toBe(true);
    expect(bus.history().some((e) => e.type === 'salon:pin:join')).toBe(true);
  });

  it('safePinEquals solo acepta igualdad exacta y throw si formato invalido', () => {
    expect(safePinEquals('123456', '123456')).toBe(true);
    expect(safePinEquals('123456', '123457')).toBe(false);
    expect(() => createRoomPinGate(tenant, '12')).toThrow(/6 digitos/);
  });
});
