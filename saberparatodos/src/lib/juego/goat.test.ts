import { describe, it, expect, beforeEach } from 'vitest';
import { campeonDe, campeonSeasonPais, ordenarTabla, hallEntry, coronar, leerHall, HALL_STORAGE_KEY, type GoatEntry } from './goat';
import {
  desbloquearInsignia,
  tieneInsignia,
  insigniaGoat,
  insigniaOlimpico,
  insigniaFinalista,
  listarInsignias,
  _resetMemoryStoreForTest,
  INSIGNIAS_STORAGE_KEY,
} from './insignias';

const base = (over: Partial<GoatEntry>): GoatEntry => ({
  alias: 'Estudiante_123',
  nodeHash: 'node_abc',
  pais: 'co',
  season: '2026-Q3',
  puntaje: 1000,
  accuracy: 0.8,
  elo: 1500,
  tiempoMs: 600_000,
  ...over,
});

describe('goat (F8)', () => {
  it('campeón = mejor puntaje', () => {
    const r = campeonDe([base({ alias: 'A', puntaje: 900 }), base({ alias: 'B', puntaje: 1100 })]);
    expect(r?.campeon.alias).toBe('B');
    expect(r?.total).toBe(2);
  });

  it('desempate: accuracy → Elo → menor tiempo', () => {
    const porAccuracy = campeonDe([
      base({ alias: 'A', puntaje: 1000, accuracy: 0.9, elo: 1200 }),
      base({ alias: 'B', puntaje: 1000, accuracy: 0.8, elo: 2000 }),
    ]);
    expect(porAccuracy?.campeon.alias).toBe('A');
    const porTiempo = campeonDe([
      base({ alias: 'A', tiempoMs: 500_000 }),
      base({ alias: 'B', tiempoMs: 400_000 }),
    ]);
    expect(porTiempo?.campeon.alias).toBe('B');
  });

  it('filtra por season/país (case-insensitive) y vacío → null', () => {
    const entries = [
      base({ alias: 'CO1', pais: 'co', season: '2026-Q3', puntaje: 1200 }),
      base({ alias: 'MX1', pais: 'mx', season: '2026-Q3', puntaje: 9999 }),
      base({ alias: 'CO2', pais: 'CO', season: '2026-Q2', puntaje: 9999 }),
    ];
    expect(campeonSeasonPais(entries, '2026-Q3', 'co')?.campeon.alias).toBe('CO1');
    expect(campeonDe([])).toBeNull();
    expect(ordenarTabla(entries)[0].alias).toBe('MX1'); // global sin filtro
  });

  it('hall of fame solo alias+país+season (sin puntajes)', () => {
    const r = campeonDe([base({})])!;
    expect(hallEntry(r)).toEqual({ alias: 'Estudiante_123', pais: 'co', season: '2026-Q3' });
  });

  it('coronar persiste y reemplaza al vigente (dedupe season+país)', () => {
    localStorage.clear();
    const entries = [base({ alias: 'A', puntaje: 900 }), base({ alias: 'B', puntaje: 1100 })];
    expect(coronar(entries, '2026-Q3', 'co')?.campeon.alias).toBe('B');
    expect(coronar([], '2026-Q3', 'mx')).toBeNull();
    expect(coronar([base({ alias: 'C', puntaje: 5000 })], '2026-Q3', 'CO')?.campeon.alias).toBe('C');
    const hall = leerHall();
    expect(hall.length).toBe(1); // reemplaza al vigente co/Q3
    expect(hall[0]).toEqual({ alias: 'C', pais: 'co', season: '2026-Q3' });
    expect(JSON.parse(localStorage.getItem(HALL_STORAGE_KEY) || '[]').length).toBe(1);
  });
});

describe('insignias (F8)', () => {
  beforeEach(() => {
    localStorage.clear();
    _resetMemoryStoreForTest();
  });

  it('desbloqueo idempotente + formato válido', () => {
    expect(desbloquearInsignia('goat-2026-q3-co')).toBe(true);
    expect(desbloquearInsignia('goat-2026-q3-co')).toBe(false); // ya estaba
    expect(tieneInsignia('goat-2026-q3-co')).toBe(true);
    expect(desbloquearInsignia('HACK <script>')).toBe(false); // PII/inyección
    expect(desbloquearInsignia('x')).toBe(false); // muy corto
    expect(listarInsignias().length).toBe(1);
    expect(JSON.parse(localStorage.getItem(INSIGNIAS_STORAGE_KEY) || '{}')['goat-2026-q3-co']).toBeTruthy();
  });

  it('constructores de IDs', () => {
    expect(insigniaGoat('2026-Q3', 'CO')).toBe('goat-2026-q3-co');
    expect(insigniaOlimpico('2026-Q3')).toBe('olimpico-2026-q3');
    expect(insigniaFinalista(2026)).toBe('finalista-hispano-2026');
  });
});
