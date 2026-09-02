import { describe, it, expect } from 'vitest';
import {
  createAntiCheatMonitor,
  trafficLightFor,
  signalSeverity,
  RED_THRESHOLD,
  YELLOW_THRESHOLD,
} from '../../src/lib/mesh/salon-anti-cheat';
import { createSalonEventBus } from '../../src/lib/mesh/salon-shared';

const tenant = { country: 'co', grade: 10, subject: 'historia', examId: 'ex6' };

describe('#1170 Anti-Cheat Audit', () => {
  it('severidades y umbrales del semaforo', () => {
    expect(signalSeverity('paste')).toBe(3);
    expect(signalSeverity('tab_switch')).toBe(2);
    expect(trafficLightFor([])).toBe('green');
    expect(trafficLightFor(['tab_switch', 'tab_switch'])).toBe('yellow'); // 4
    expect(trafficLightFor(['paste', 'paste'])).toBe('yellow'); // 6 < 8
    expect(trafficLightFor(['paste', 'paste', 'paste'])).toBe('red'); // 9
    expect(YELLOW_THRESHOLD).toBe(4);
    expect(RED_THRESHOLD).toBe(8);
  });

  it('monitor acumula por peer, bitacora y semaforos', () => {
    const m = createAntiCheatMonitor(tenant);
    m.record('s1', 'tab_switch', 100);
    m.record('s1', 'fullscreen_exit', 200);
    m.record('s2', 'paste', 300);
    expect(m.scoreFor('s1')).toBe(4);
    expect(m.lightFor('s1')).toBe('yellow');
    expect(m.lightFor('s2')).toBe('green'); // paste=3 < 4
    expect(m.entries('s1')).toHaveLength(2);
    expect(m.entries()).toHaveLength(3);
  });

  it('redPeers y clear por peer', () => {
    const bus = createSalonEventBus();
    const m = createAntiCheatMonitor(tenant, bus);
    m.record('s3', 'paste', 1);
    m.record('s3', 'paste', 2);
    m.record('s3', 'paste', 3);
    expect(m.lightFor('s3')).toBe('red');
    expect(m.redPeers()).toEqual(['s3']);
    expect(bus.history().filter((e) => e.type === 'salon:anti-cheat:alert').length).toBeGreaterThan(0);
    m.clear('s3');
    expect(m.redPeers()).toEqual([]);
    expect(m.entries('s3')).toHaveLength(0);
  });

  it('ignora senales desconocidas', () => {
    const m = createAntiCheatMonitor(tenant);
    expect(m.record('s9', 'telepatia' as never, 1)).toBeNull();
    expect(m.entries()).toHaveLength(0);
  });
});
