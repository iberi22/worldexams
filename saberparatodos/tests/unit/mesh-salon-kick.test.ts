import { describe, it, expect } from 'vitest';
import { createSalonKickRegistry } from '../../src/lib/mesh/salon-kick';
import { createSalonEventBus } from '../../src/lib/mesh/salon-shared';

const tenant = { country: 'mx', grade: 8, subject: 'lengua', examId: 'ex2' };

describe('#1163 Host Kick Peer', () => {
  it('solo el host puede expulsar', () => {
    const reg = createSalonKickRegistry(tenant, 'host-1');
    reg.addPeer({ peerId: 'p1', role: 'student', joinedAt: 'now' });
    expect(reg.hostKick('p1', 'p1')).toBe(false);
    expect(reg.isKicked('p1')).toBe(false);
    expect(reg.hostKick('host-1', 'p1', 'fraude')).toBe(true);
    expect(reg.isKicked('p1')).toBe(true);
    expect(reg.peers()).toHaveLength(0);
  });

  it('expulsado no puede reentrar hasta lift del host', () => {
    const reg = createSalonKickRegistry(tenant, 'host-1');
    reg.hostKick('host-1', 'p2');
    reg.addPeer({ peerId: 'p2', role: 'student', joinedAt: 'now' });
    expect(reg.peers()).toHaveLength(0);
    expect(reg.liftKick('p2', 'p2')).toBe(false); // no es host
    expect(reg.liftKick('host-1', 'p2')).toBe(true);
    reg.addPeer({ peerId: 'p2', role: 'student', joinedAt: 'now2' });
    expect(reg.peers()).toHaveLength(1);
  });

  it('broadcast mesh event salon:kick con payload', () => {
    const bus = createSalonEventBus();
    const reg = createSalonKickRegistry(tenant, 'host-1', bus);
    reg.hostKick('host-1', 'p3', 'compartir pantalla');
    const ev = bus.history().find((e) => e.type === 'salon:kick');
    expect(ev).toBeDefined();
    expect(ev!.payload).toMatchObject({ peerId: 'p3', reason: 'compartir pantalla' });
    expect(reg.log()).toHaveLength(1);
  });

  it('el host no puede expulsarse a si mismo', () => {
    const reg = createSalonKickRegistry(tenant, 'host-1');
    expect(reg.hostKick('host-1', 'host-1')).toBe(false);
  });
});
