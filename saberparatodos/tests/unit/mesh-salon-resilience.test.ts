import { describe, it, expect } from 'vitest';
import { createHostResilience, type HostInFlightState } from '../../src/lib/mesh/salon-resilience';
import { createSalonEventBus } from '../../src/lib/mesh/salon-shared';

const tenant = { country: 'co', grade: 7, subject: 'matematicas', examId: 'ex4' };
const other = { country: 'mx', grade: 7, subject: 'matematicas', examId: 'ex4' };

function sampleState(): Omit<HostInFlightState, 'tenantId' | 'savedAt'> {
  return {
    peers: [{ peerId: 'p1', role: 'student', joinedAt: 'x' }],
    results: [{ peerId: 'p1', score: 80, answers: { q1: 'A' }, answeredAt: 'y' }],
    currentQuestionId: 'q2',
  };
}

describe('#1165 Host Resilience', () => {
  it('snapshot guarda estado in-flight y emite disconnect', () => {
    const bus = createSalonEventBus();
    const r = createHostResilience(tenant, bus, () => 'tok-1');
    const snap = r.snapshot(sampleState(), 5000);
    expect(snap.tenantId).toBe('co:7:matematicas:ex4');
    expect(snap.currentQuestionId).toBe('q2');
    expect(bus.history().some((e) => e.type === 'salon:host:disconnect')).toBe(true);
    expect(r.disconnectedSinceMs(9000)).toBe(4000);
  });

  it('reconnect idempotente: token de un solo uso', () => {
    const r = createHostResilience(tenant, undefined, () => 'tok-2');
    r.snapshot(sampleState(), 1);
    const ok = r.reconnect('tok-2', tenant, 2);
    expect(ok.recovered).toBe(true);
    expect(ok.state?.peers).toHaveLength(1);
    const again = r.reconnect('tok-2', tenant, 3);
    expect(again.recovered).toBe(false);
    expect(again.reason).toBe('unknown-token');
  });

  it('rechaza token invalido o tenant que no corresponde', () => {
    const r = createHostResilience(tenant, undefined, () => 'tok-3');
    expect(r.reconnect('nope', tenant, 1).reason).toBe('unknown-token');
    r.snapshot(sampleState(), 1);
    expect(r.reconnect('tok-3', other, 2).reason).toBe('tenant-mismatch');
    expect(r.reconnect('tok-3', tenant, 2).recovered).toBe(true);
  });
});
