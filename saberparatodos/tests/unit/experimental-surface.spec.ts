import { describe, it, expect } from 'vitest';
import {
  isExperimentalSurface,
  isProductionHostname,
  normalizeHostname,
} from '../../src/lib/experimental-surface';

describe('experimental-surface gate', () => {
  it('oculta en producción (apex y www)', () => {
    expect(isProductionHostname('saberparatodos.space')).toBe(true);
    expect(isProductionHostname('www.saberparatodos.space')).toBe(true);
    expect(isProductionHostname('SABERPARATODOS.SPACE')).toBe(true);
    expect(isExperimentalSurface('saberparatodos.space')).toBe(false);
    expect(isExperimentalSurface('www.saberparatodos.space')).toBe(false);
  });

  it('muestra en superficies internas (pages.dev, workers.dev, localhost)', () => {
    expect(isExperimentalSurface('develop.saberparatodos.pages.dev')).toBe(true);
    expect(isExperimentalSurface('saberparatodos.pages.dev')).toBe(true);
    expect(isExperimentalSurface('saberparatodos.preview.workers.dev')).toBe(true);
    expect(isExperimentalSurface('localhost')).toBe(true);
    expect(isExperimentalSurface('127.0.0.1')).toBe(true);
  });

  it('default seguro: hostname vacío → oculto (producción)', () => {
    expect(isExperimentalSurface('')).toBe(false);
    expect(normalizeHostname(undefined)).toBe('');
  });

  it('sin argumento en cliente usa window.location.hostname', () => {
    // En este entorno de test el hostname es localhost → experimental visible.
    expect(isExperimentalSurface()).toBe(!isProductionHostname(window.location.hostname));
  });
});
