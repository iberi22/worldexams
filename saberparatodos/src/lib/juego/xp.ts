/**
 * juego/xp.ts — Motor XP para ligas semanales (F1).
 *
 * XP = esfuerzo y constancia. NUNCA mide maestría (eso es el Elo).
 * Tiers por XP semanal: Bronce<500<Plata<1200<Oro<2500<Platino<5000<Diamante.
 */

import type { LigaTier, XpAction } from './types';

/** Puntos por acción (diseño aprobado 2026-09-23). */
export const XP_TABLE: Record<XpAction['kind'], number> = {
  respuesta: 10,
  correccion: 20,
  racha_diaria: 50,
  examen_completo: 25,
};

export const TIER_LIMITS: Array<{ tier: LigaTier; min: number }> = [
  { tier: 'Bronce', min: 0 },
  { tier: 'Plata', min: 500 },
  { tier: 'Oro', min: 1200 },
  { tier: 'Platino', min: 2500 },
  { tier: 'Diamante', min: 5000 },
];

export function tierFor(xpWeekly: number): LigaTier {
  let tier: LigaTier = 'Bronce';
  for (const t of TIER_LIMITS) {
    if (xpWeekly >= t.min) tier = t.tier;
  }
  return tier;
}

/** XP que falta para el siguiente tier (0 si ya es Diamante). */
export function xpToNextTier(xpWeekly: number): number {
  for (const t of TIER_LIMITS) {
    if (xpWeekly < t.min) return t.min - xpWeekly;
  }
  return 0;
}

/** Puntos de una acción. Multiplicador de racha opcional (días activos). */
export function awardXp(kind: XpAction['kind'], streakDays = 0): number {
  const base = XP_TABLE[kind];
  if (kind === 'respuesta' && streakDays >= 3) return Math.round(base * 1.5);
  return base;
}
