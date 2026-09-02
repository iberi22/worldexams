import { describe, it, expect } from 'vitest';
import {
  createPrivacyPolicy,
  isPrivacyMode,
  PRIVACY_MODES,
} from '../../src/lib/mesh/salon-privacy';
import { createSalonEventBus } from '../../src/lib/mesh/salon-shared';

const tenant = { country: 'co', grade: 9, subject: 'ingles', examId: 'ex5' };

describe('#1166 Privacy Toggle', () => {
  it('valida modos soportados', () => {
    expect(PRIVACY_MODES).toEqual(['public', 'anon', 'private']);
    expect(isPrivacyMode('anon')).toBe(true);
    expect(isPrivacyMode('secreto')).toBe(false);
    expect(() => createPrivacyPolicy(tenant, 'h', 'x' as never)).toThrow(/invalido/);
  });

  it('public: todos ven todo con id real; anon: alias; private: solo propio', () => {
    const pub = createPrivacyPolicy(tenant, 'h', 'public');
    expect(pub.canViewResult({ peerId: 's1', role: 'student' }, 's2')).toBe(true);
    expect(pub.aliasFor({ peerId: 's1', role: 'student' }, 's2')).toBe('s2');

    const anon = createPrivacyPolicy(tenant, 'h', 'anon');
    expect(anon.canViewResult({ peerId: 's1', role: 'student' }, 's2')).toBe(true);
    expect(anon.aliasFor({ peerId: 's1', role: 'student' }, 's2')).toMatch(/^Estudiante \d+$/);

    const priv = createPrivacyPolicy(tenant, 'h', 'private');
    expect(priv.canViewResult({ peerId: 's1', role: 'student' }, 's1')).toBe(true);
    expect(priv.canViewResult({ peerId: 's1', role: 'student' }, 's2')).toBe(false);
    expect(priv.canViewResult({ peerId: 'h', role: 'host' }, 's2')).toBe(true);
  });

  it('setMode solo host y emite evento mesh', () => {
    const bus = createSalonEventBus();
    const pol = createPrivacyPolicy(tenant, 'h', 'public', bus);
    expect(pol.setMode('s1', 'private')).toBe(false);
    expect(pol.mode()).toBe('public');
    expect(pol.setMode('h', 'private')).toBe(true);
    expect(pol.mode()).toBe('private');
    expect(bus.history().some((e) => e.type === 'salon:privacy:change')).toBe(true);
  });
});
