import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  OPT_IN_KEY,
  SHARED_STATS_KEY,
  REVOCATION_KEY,
  getOptIn,
  setOptIn,
  canShareData,
  revokeOptIn,
  getLocalNodeName,
  setLocalNodeName
} from './OptInManager';

describe('OptInManager — borde de privacidad BR-06', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('default privacy first: sin opt-in, canShareData false', () => {
    expect(getOptIn()).toBe(false);
    expect(canShareData()).toBe(false);
  });

  it('setOptIn true habilita compartir, persiste wx-opt-in', () => {
    setOptIn(true);
    expect(localStorage.getItem(OPT_IN_KEY)).toBe('true');
    expect(getOptIn()).toBe(true);
    expect(canShareData()).toBe(true);
  });

  it('setOptIn false revoca compartir', () => {
    setOptIn(true);
    setOptIn(false);
    expect(localStorage.getItem(OPT_IN_KEY)).toBe('false');
    expect(canShareData()).toBe(false);
  });

  it('revocación efectiva limpia datos compartidos y registra revocación', () => {
    setOptIn(true);
    localStorage.setItem(SHARED_STATS_KEY, JSON.stringify([{ node_hash: 'node_abc', subject: 'matematicas', week: 'W01', score: 90, avg: 85 }]));
    localStorage.setItem('worldexams_pending_scores', JSON.stringify([{ submission: { anonymousId: 'u1', score: 80 } }]));

    const hadOptIn = revokeOptIn();

    expect(hadOptIn).toBe(true);
    expect(localStorage.getItem(OPT_IN_KEY)).toBe('false');
    expect(localStorage.getItem(SHARED_STATS_KEY)).toBeNull();
    expect(localStorage.getItem('worldexams_pending_scores')).toBeNull();
    expect(localStorage.getItem(REVOCATION_KEY)).not.toBeNull();
    expect(canShareData()).toBe(false);
  });

  it('revocación emite señal wx:optin:revoked y wx:mesh:revoke', () => {
    const revokeSpy = vi.fn();
    const meshSpy = vi.fn();
    window.addEventListener('wx:optin:revoked', revokeSpy as any);
    window.addEventListener('wx:mesh:revoke', meshSpy as any);

    setOptIn(true);
    revokeOptIn();

    expect(revokeSpy).toHaveBeenCalled();
    expect(meshSpy).toHaveBeenCalled();
  });

  it('nombre de nodo customizable solo local', () => {
    setLocalNodeName('  Nodo-Andes-11  ');
    expect(getLocalNodeName()).toBe('Nodo-Andes-11');
    expect(localStorage.getItem('wx-node-name')).toBe('Nodo-Andes-11');

    setLocalNodeName('');
    expect(getLocalNodeName()).toBeNull();
  });
});
