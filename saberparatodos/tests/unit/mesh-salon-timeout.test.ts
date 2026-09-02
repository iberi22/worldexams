import { describe, it, expect } from 'vitest';
import {
  createSalonTimeoutManager,
  SALON_TIMEOUT_MS,
} from '../../src/lib/mesh/salon-timeout';
import { createSalonEventBus } from '../../src/lib/mesh/salon-shared';

const tenant = { country: 'co', grade: 6, subject: 'ciencias', examId: 'ex3' };

describe('#1164 Host Timeout 5min', () => {
  it('aplica bloqueo de 5 minutos con countdown', () => {
    const mgr = createSalonTimeoutManager(tenant, 'host-1', undefined, () => 1000);
    const rec = mgr.apply('p1', 'pin fallido');
    expect(rec.until - rec.startedAt).toBe(SALON_TIMEOUT_MS);
    expect(mgr.countdownSeconds('p1', 1000)).toBe(300);
    expect(mgr.countdownSeconds('p1', 1000 + SALON_TIMEOUT_MS / 2)).toBe(150);
    expect(mgr.active('p1')).not.toBeNull();
  });

  it('lift automatico al expirar via tick', () => {
    const bus = createSalonEventBus();
    const mgr = createSalonTimeoutManager(tenant, 'host-1', bus, () => 0);
    mgr.apply('p2');
    expect(mgr.activeCount(1000)).toBe(1);
    const freed = mgr.tick(SALON_TIMEOUT_MS);
    expect(freed).toEqual(['p2']);
    expect(mgr.activeCount()).toBe(0);
    expect(mgr.countdownSeconds('p2')).toBeNull();
    expect(bus.history().some((e) => e.type === 'salon:timeout:lift' && (e.payload as { auto?: boolean }).auto)).toBe(true);
  });

  it('solo el host puede levantar el timeout manualmente', () => {
    const mgr = createSalonTimeoutManager(tenant, 'host-1', undefined, () => 0);
    mgr.apply('p3');
    expect(mgr.lift('p3', 'p3')).toBe(false);
    expect(mgr.lift('host-1', 'p3')).toBe(true);
    expect(mgr.active('p3')).toBeNull();
  });
});
