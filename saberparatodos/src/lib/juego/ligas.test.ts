import { describe, it, expect } from 'vitest';
import { buildLiga, ventanaLiga, getTier, LIGA_SIZE } from './ligas';

describe('Engine Ligas', () => {
  it('genera liga determinista de 30 miembros', () => {
    const liga = buildLiga(1300, '2026-W10', 'test-node');
    expect(liga.entries.length).toBe(LIGA_SIZE);
    expect(liga.tier).toBe('Oro');
    expect(liga.entries.filter(e => e.esJugador).length).toBe(1);
  });

  it('ventanaLiga devuelve exactamente 5 elementos cuando radio=2', () => {
    const liga = buildLiga(1300, '2026-W10', 'test-node');
    const windowEntries = ventanaLiga(liga, 2);
    expect(windowEntries.length).toBe(5);
  });

  it('calcula tier correctamente', () => {
    expect(getTier(0)).toBe('Bronce');
    expect(getTier(600)).toBe('Plata');
    expect(getTier(1300)).toBe('Oro');
    expect(getTier(3000)).toBe('Platino');
    expect(getTier(6000)).toBe('Diamante');
    expect(getTier(12000)).toBe('Maestro');
  });
});
