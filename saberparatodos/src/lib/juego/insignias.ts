/**
 * juego/insignias.ts — Insignias on-device del módulo juego (F8).
 *
 * Patrón de `cuentos/logros.ts`: catálogo fijo + desbloqueo idempotente en
 * localStorage. Sin red, sin tokens, sin telemetría (BR-03).
 * IDs: `goat-{YYYY}-Q{N}-{pais}`, `finalista-hispano-{YYYY}`,
 * `olimpico-{YYYY}-Q{N}`, `liga-diamante-{weekKey}`, `racha-30`.
 */

export interface Insignia {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
}

export interface InsigniaDesbloqueada {
  id: string;
  desbloqueadoEn: string;
}

export const INSIGNIAS_STORAGE_KEY = 'wx-juego-insignias-v1';

let memoryStore: Record<string, InsigniaDesbloqueada> = {};

export function getInsigniasMap(): Record<string, InsigniaDesbloqueada> {
  /* v8 ignore next */
  if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(INSIGNIAS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          return parsed as Record<string, InsigniaDesbloqueada>;
        }
      }
    } catch {
      return { ...memoryStore };
    }
  }
  /* v8 ignore next */
  return { ...memoryStore };
}

function saveMap(map: Record<string, InsigniaDesbloqueada>): void {
  memoryStore = { ...map };
  /* v8 ignore start */
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(INSIGNIAS_STORAGE_KEY, JSON.stringify(map));
    } catch {
      /* quota: sigue en memoria */
    }
  }
  /* v8 ignore stop */
}

export function tieneInsignia(id: string): boolean {
  return Boolean(getInsigniasMap()[id]);
}

/**
 * Desbloquea idempotente. Retorna true solo si es NUEVA (para celebrar en UI).
 * Valida formato: minúsculas, números, guiones y puntos (nada de PII libre).
 */
export function desbloquearInsignia(id: string): boolean {
  if (!/^[a-z0-9][a-z0-9._-]{2,80}$/.test(id)) return false;
  const map = getInsigniasMap();
  if (map[id]) return false;
  map[id] = { id, desbloqueadoEn: new Date().toISOString() };
  saveMap(map);
  return true;
}

/** Insignia de campeón: `goat-2026-Q3-co`. País en minúsculas ISO/slug. */
export function insigniaGoat(season: string, pais: string): string {
  return `goat-${season.toLowerCase()}-${pais.toLowerCase()}`;
}

export function insigniaOlimpico(season: string): string {
  return `olimpico-${season.toLowerCase()}`;
}

export function insigniaFinalista(anio: number): string {
  return `finalista-hispano-${anio}`;
}

export function listarInsignias(): InsigniaDesbloqueada[] {
  return Object.values(getInsigniasMap());
}

export function _resetMemoryStoreForTest(): void {
  memoryStore = {};
}
