/**
 * juego/goat.ts — GOAT of Season + final anual (F8).
 *
 * - Campeón por (season, país): mejor puntaje del torneo; desempate:
 *   accuracy → Elo → menor tiempo. Entradas con alias + node_hash: NUNCA
 *   nombres reales ni notas privadas (hall of fame anónimo, BR-03/BR-04).
 * - Final anual: compiten los 4 GOATs de la season más top Elo anual
 *   (el llamante aporta la lista; aquí solo el cómputo puro).
 * - Funciones puras (sin storage): el historial lo guarda la UI/caller.
 */

export interface GoatEntry {
  alias: string;
  nodeHash: string;
  pais: string;
  season: string;
  puntaje: number;
  accuracy: number;
  elo: number;
  tiempoMs: number;
}

export interface GoatResult {
  campeon: GoatEntry;
  podio: GoatEntry[]; // top-3 ordenado
  total: number;
}

function comparar(a: GoatEntry, b: GoatEntry): number {
  if (b.puntaje !== a.puntaje) return b.puntaje - a.puntaje;
  if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
  if (b.elo !== a.elo) return b.elo - a.elo;
  return a.tiempoMs - b.tiempoMs; // menos tiempo gana
}

/** Ordena una tabla de torneo con el desempate oficial. */
export function ordenarTabla(entries: GoatEntry[]): GoatEntry[] {
  return [...entries].sort(comparar);
}

/** Campeón + podio de un (season, país). Vacío → null (sin campeón). */
export function campeonDe(entries: GoatEntry[]): GoatResult | null {
  if (entries.length === 0) return null;
  const podio = ordenarTabla(entries).slice(0, 3);
  return { campeon: podio[0], podio, total: entries.length };
}

/** Filtra por llave season/país antes de coronar. */
export function campeonSeasonPais(entries: GoatEntry[], season: string, pais: string): GoatResult | null {
  const key = (e: GoatEntry) => e.season === season && e.pais.toLowerCase() === pais.toLowerCase();
  return campeonDe(entries.filter(key));
}

/**
 * Hall of fame anónimo: solo alias + país + season del campeón.
 * Nada de puntajes ni Elos (el honor, no el dato).
 */
export function hallEntry(result: GoatResult): { alias: string; pais: string; season: string } {
  return { alias: result.campeon.alias, pais: result.campeon.pais, season: result.campeon.season };
}

export const HALL_STORAGE_KEY = 'wx-juego-hall-v1';
const HALL_CAP = 60;

function readHall(): Array<{ alias: string; pais: string; season: string }> {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(HALL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Corona y persiste en el hall (dedupe por season+país: solo el vigente).
 * Retorna el resultado o null si no hay participantes.
 */
export function coronar(entries: GoatEntry[], season: string, pais: string): GoatResult | null {
  const result = campeonSeasonPais(entries, season, pais);
  if (!result) return null;
  try {
    const hall = readHall().filter((h) => !(h.season === season && h.pais.toLowerCase() === pais.toLowerCase()));
    hall.unshift(hallEntry(result));
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(HALL_STORAGE_KEY, JSON.stringify(hall.slice(0, HALL_CAP)));
    }
  } catch {
    /* quota: el resultado en memoria sigue válido */
  }
  return result;
}

/** Lee el hall persistido (más reciente primero). */
export function leerHall(): Array<{ alias: string; pais: string; season: string }> {
  return readHall();
}
