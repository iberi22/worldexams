import { describe, it, expect } from 'vitest';
import {
  seasonKey,
  seasonBounds,
  torneoWindow,
  ventanaEstado,
  esElegible,
  buildTorneoSet,
  TORNEO_SET_SIZE,
  TORNEO_WINDOW_MS,
} from './olimpiada';

describe('olimpiada (F7)', () => {
  it('seasons Q1–Q4 por mes calendario', () => {
    expect(seasonKey(new Date(2026, 0, 15).getTime())).toBe('2026-Q1');
    expect(seasonKey(new Date(2026, 2, 31).getTime())).toBe('2026-Q1');
    expect(seasonKey(new Date(2026, 3, 1).getTime())).toBe('2026-Q2');
    expect(seasonKey(new Date(2026, 8, 23).getTime())).toBe('2026-Q3');
    expect(seasonKey(new Date(2026, 11, 31).getTime())).toBe('2026-Q4');
  });

  it('bounds cubren el trimestre completo y valida formato', () => {
    const { start, end } = seasonBounds('2026-Q3');
    expect(new Date(start).getMonth()).toBe(6); // julio
    expect(new Date(end).getMonth()).toBe(8); // septiembre
    expect(end - start).toBeGreaterThan(89 * 86_400_000);

    expect(() => seasonBounds('bad-season')).toThrow('[olimpiada] season inválida');
  });

  it('ventana = últimas 72h del trimestre', () => {
    const { opensAt, closesAt } = torneoWindow('2026-Q3');
    expect(closesAt - opensAt).toBe(TORNEO_WINDOW_MS - 1); // ventana inclusiva
    expect(new Date(closesAt).getMonth()).toBe(8);
    // estados
    expect(ventanaEstado('2026-Q3', opensAt - 1)).toBe('futura');
    expect(ventanaEstado('2026-Q3', opensAt)).toBe('abierta');
    expect(ventanaEstado('2026-Q3', closesAt + 1)).toBe('cerrada');
  });

  it('elegibilidad: Oro+ 2 semanas + simulacro válido (elige el de mayor accuracy)', () => {
    const ok = esElegible(
      ['Oro', 'Plata', 'Diamante'],
      [
        { questions: 115, accuracy: 0.72 },
        { questions: 80, accuracy: 0.88 },
      ],
    );
    expect(ok.elegible).toBe(true);
    expect(ok.semanasOro).toBe(2);
    expect(ok.mejorSimulacro?.accuracy).toBe(0.88);
    expect(ok.motivos).toEqual([]);
  });

  it('rechaza sin semanas Oro y sin simulacro (motivos claros)', () => {
    const no = esElegible(['Plata', 'Bronce'], [{ questions: 20, accuracy: 0.9 }]);
    expect(no.elegible).toBe(false);
    expect(no.motivos.length).toBe(2);
    expect(no.mejorSimulacro).toBeNull();
  });

  it('set común de 20 con exclusiones o parámetro por defecto', () => {
    const pool = Array.from({ length: 40 }, (_, i) => ({ id: `q${i}`, elo: 1100 + (i % 5) * 50 }));
    const set = buildTorneoSet(pool, 1200, new Set(['q0', 'q1']));
    expect(set.length).toBe(TORNEO_SET_SIZE);
    expect(set.map((q) => q.id)).not.toContain('q0');

    const defaultSet = buildTorneoSet(pool, 1200);
    expect(defaultSet.length).toBe(TORNEO_SET_SIZE);
  });
});
