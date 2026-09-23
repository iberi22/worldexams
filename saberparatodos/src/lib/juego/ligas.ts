/**
 * juego/ligas.ts — Ligas semanales de 30 (F4).
 *
 * - Grupo determinista: ligaId = hash(weekKey + tier) → el jugador cae siempre
 *   en el mismo grupo si su tier no cambia (sin servidor).
 * - 1 miembro real + 29 seudónimos `Estudiante_###` deterministas marcados
 *   `isSimulated` (placeholders de ritmo; JAMÁS se publican ni salen del
 *   dispositivo). Cuando haya peers reales vía SalonDirectory, los simulados
 *   se reemplazan por agregados anónimos (fase posterior).
 * - Ascenso top-5 / descenso bottom-5 por XP semanal. El Elo NO decide puestos.
 * - Todo on-device. Sin PII (BR-03/BR-04).
 */

import { tierFor } from './xp';
import type { LigaTier } from './types';

export const LIGA_SIZE = 30;
export const ASCIENDEN = 5;
export const DESCIENDEN = 5;

export interface LigaMiembro {
  alias: string;
  xp: number;
  puesto: number;
  esJugador: boolean;
  isSimulated: boolean;
}

export interface Liga {
  ligaId: string;
  weekKey: string;
  tier: LigaTier;
  miembros: LigaMiembro[];
  puestoJugador: number;
  /** -1 desciende, 0 se mantiene, +1 asciende */
  movimiento: -1 | 0 | 1;
}

/** Hash determinista corto (djb2 → base36). No criptográfico: solo agrupar. */
export function hashLiga(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = ((h * 33) ^ input.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}

export function ligaIdFor(weekKey: string, tier: LigaTier): string {
  return `liga-${weekKey}-${tier}-${hashLiga(`${weekKey}:${tier}`)}`.toLowerCase();
}

/** PRNG determinista (mulberry32) desde semilla numérica. */
function prng(seed: number): () => number {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Ritmo simulado creíble por tier (XP semanal típico del grupo). */
const RITMO_POR_TIER: Record<LigaTier, { min: number; max: number }> = {
  Bronce: { min: 20, max: 400 },
  Plata: { min: 300, max: 1100 },
  Oro: { min: 800, max: 2300 },
  Platino: { min: 1800, max: 4600 },
  Diamante: { min: 3500, max: 8000 },
};

/**
 * Construye la liga del jugador. `nodeHash` siembra los seudónimos para que
 * el grupo sea estable durante la semana (mismo jugador, mismo grupo).
 */
export function buildLiga(weekKey: string, xpWeekly: number, nodeHash = 'local'): Liga {
  const tier = tierFor(xpWeekly);
  const ligaId = ligaIdFor(weekKey, tier);
  const seed = parseInt(hashLiga(`${ligaId}:${nodeHash}`), 36) || 1;
  const rand = prng(seed);
  const ritmo = RITMO_POR_TIER[tier];

  const miembros: LigaMiembro[] = [
    { alias: 'TÚ', xp: xpWeekly, puesto: 0, esJugador: true, isSimulated: false },
  ];
  for (let i = 0; i < LIGA_SIZE - 1; i++) {
    const xp = Math.round(ritmo.min + rand() * (ritmo.max - ritmo.min));
    miembros.push({
      alias: `Estudiante_${String(Math.floor(rand() * 900) + 100)}`,
      xp,
      puesto: 0,
      esJugador: false,
      isSimulated: true,
    });
  }
  miembros.sort((a, b) => b.xp - a.xp || (a.esJugador ? -1 : 0));
  miembros.forEach((m, i) => (m.puesto = i + 1));

  const puestoJugador = miembros.find((m) => m.esJugador)?.puesto ?? LIGA_SIZE;
  const movimiento: Liga['movimiento'] =
    puestoJugador <= ASCIENDEN ? 1 : puestoJugador > LIGA_SIZE - DESCIENDEN ? -1 : 0;

  return { ligaId, weekKey, tier, miembros, puestoJugador, movimiento };
}

/** Mini-tabla alrededor del jugador (para la UI: 2 arriba, jugador, 2 abajo). */
export function ventanaLiga(liga: Liga, radio = 2): LigaMiembro[] {
  const idx = liga.miembros.findIndex((m) => m.esJugador);
  if (idx < 0) return liga.miembros.slice(0, 2 * radio + 1);
  return liga.miembros.slice(Math.max(0, idx - radio), idx + radio + 1);
}
