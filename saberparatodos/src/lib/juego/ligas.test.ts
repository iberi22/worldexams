import { describe, it, expect } from 'vitest';
import { buildLiga, ventanaLiga, ligaIdFor, hashLiga, LIGA_SIZE } from './ligas';

describe('ligas (F4)', () => {
  it('grupo de 30 con 1 real + 29 simulados', () => {
    const liga = buildLiga('2026-W38', 1300, 'nodo1');
    expect(liga.miembros.length).toBe(LIGA_SIZE);
    expect(liga.miembros.filter((m) => m.esJugador).length).toBe(1);
    expect(liga.miembros.filter((m) => m.isSimulated).length).toBe(LIGA_SIZE - 1);
    expect(liga.tier).toBe('Oro');
    expect(liga.ligaId).toContain('oro');
  });

  it('determinista: mismos inputs → mismo grupo; el grupo no cambia con tu XP', () => {
    const a = buildLiga('2026-W38', 1300, 'nodo1');
    const b = buildLiga('2026-W38', 1300, 'nodo1');
    expect(a).toEqual(b);
    const c = buildLiga('2026-W38', 1350, 'nodo1');
    expect(c.ligaId).toBe(a.ligaId); // mismo grupo toda la semana
    expect(c.miembros.filter((m) => !m.esJugador).map((m) => m.alias)).toEqual(
      a.miembros.filter((m) => !m.esJugador).map((m) => m.alias),
    );
  });

  it('puestos ordenados y movimiento ascenso/descenso/permanencia', () => {
    const top = buildLiga('2026-W38', 99999);
    expect(top.puestoJugador).toBe(1);
    expect(top.movimiento).toBe(1);
    const bottom = buildLiga('2026-W38', 0, 'nodo1');
    expect(bottom.puestoJugador).toBe(LIGA_SIZE);
    expect(bottom.movimiento).toBe(-1);

    let permFound = false;
    for (let xp = 100; xp <= 500; xp += 10) {
      const mid = buildLiga('2026-W38', xp, 'nodo1');
      if (mid.movimiento === 0) {
        expect(mid.puestoJugador).toBeGreaterThan(5);
        expect(mid.puestoJugador).toBeLessThanOrEqual(25);
        permFound = true;
        break;
      }
    }
    expect(permFound).toBe(true);
  });

  it('ventanaLiga fallback si no encuentra al jugador', () => {
    const liga = buildLiga('2026-W38', 1300, 'nodo1');
    liga.miembros.forEach((m) => {
      m.esJugador = false;
    });
    const win = ventanaLiga(liga, 2);
    expect(win.length).toBe(5);
  });

  it('ventana de 5 alrededor del jugador', () => {
    const liga = buildLiga('2026-W38', 1300, 'nodo1');
    const win = ventanaLiga(liga, 2);
    expect(win.length).toBe(5);
    expect(win.some((m) => m.esJugador)).toBe(true);
  });

  it('ligaId estable y distinto por tier', () => {
    expect(ligaIdFor('2026-W38', 'Oro')).toBe(ligaIdFor('2026-W38', 'Oro'));
    expect(ligaIdFor('2026-W38', 'Oro')).not.toBe(ligaIdFor('2026-W38', 'Plata'));
    expect(hashLiga('a')).not.toBe(hashLiga('b'));
  });
});
