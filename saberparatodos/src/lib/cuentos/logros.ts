/**
 * Local-First Achievements & Pins System for Cuentos
 * Feature: feat-cuentos-logros-local (Ola C5.01)
 *
 * Enforces BR-03 / BR-07: Zero identity, zero tokens, zero karma, zero telemetry.
 * All achievement state is stored strictly on-device in localStorage.
 */

import type { CuentoProgressRecord } from './progreso';

export interface Logro {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  slug?: string;
  condicion?: (progreso: Record<string, CuentoProgressRecord>, currentSlug?: string) => boolean;
}

export interface LogroDesbloqueado {
  id: string;
  desbloqueadoEn: string;
}

export const LOGROS_STORAGE_KEY = 'cuentos:logros:v1';

/**
  Fixed Catalog of Achievements in Neutral Spanish
 */
export const CATALOGO_LOGROS: readonly Logro[] = [
  {
    id: 'primera-lectura',
    nombre: 'Primera Lectura',
    descripcion: 'Has completado la lectura de tu primer cuento.',
    icono: '📖',
    condicion: (progreso) => {
      return Object.values(progreso).some((p) => p.finished || p.lastPage > 1);
    }
  },
  {
    id: 'quiz-3-3',
    nombre: 'Gran Sabio',
    descripcion: 'Has respondido todas las preguntas correctamente al primer intento.',
    icono: '🌟',
    condicion: (progreso) => {
      return Object.values(progreso).some((p) => p.quizBest >= 3);
    }
  },
  {
    id: 'tres-cuentos',
    nombre: 'Explorador Curioso',
    descripcion: 'Has completado 3 cuentos diferentes.',
    icono: '🧭',
    condicion: (progreso) => {
      const completados = Object.values(progreso).filter((p) => p.finished).length;
      return completados >= 3;
    }
  },
  {
    id: 'cinco-cuentos',
    nombre: 'Lector Constante',
    descripcion: 'Has completado 5 cuentos diferentes.',
    icono: '🏆',
    condicion: (progreso) => {
      const completados = Object.values(progreso).filter((p) => p.finished).length;
      return completados >= 5;
    }
  },
  {
    id: 'diez-cuentos',
    nombre: 'Gran Biblioteca',
    descripcion: 'Has completado 10 cuentos diferentes.',
    icono: '👑',
    condicion: (progreso) => {
      const completados = Object.values(progreso).filter((p) => p.finished).length;
      return completados >= 10;
    }
  }
] as const;

// In-memory fallback if localStorage is disabled or throws
let memoryStore: Record<string, LogroDesbloqueado> = {};

/**
 * Safely reads unlocked achievements map from storage.
 */
export function getLogrosDesbloqueadosMap(): Record<string, LogroDesbloqueado> {
  if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(LOGROS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          return parsed as Record<string, LogroDesbloqueado>;
        }
      }
    } catch {
      // Corrupted storage recovery: fall back to memoryStore or empty
      return { ...memoryStore };
    }
  }
  return { ...memoryStore };
}

/**
 * Safely saves unlocked achievements map to storage.
 */
function saveLogrosDesbloqueadosMap(map: Record<string, LogroDesbloqueado>): void {
  memoryStore = { ...map };
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(LOGROS_STORAGE_KEY, JSON.stringify(map));
    } catch {
      // QuotaExceededError or private browsing mode: soft fail, memory store retained
    }
  }
}

/**
 * Checks if a specific achievement ID is unlocked.
 */
export function tieneLogro(id: string): boolean {
  const map = getLogrosDesbloqueadosMap();
  return Boolean(map[id]);
}

/**
 * Returns list of unlocked achievement IDs with timestamps.
 */
export function getLogrosDesbloqueados(): LogroDesbloqueado[] {
  const map = getLogrosDesbloqueadosMap();
  return Object.values(map);
}

/**
 * Unlocks an achievement idempotently.
 * Returns true if this call newly unlocked the achievement, false if already unlocked or invalid.
 */
export function desbloquearLogro(id: string): boolean {
  const map = getLogrosDesbloqueadosMap();
  if (map[id]) {
    return false; // Already unlocked (idempotency/dedupe)
  }

  map[id] = {
    id,
    desbloqueadoEn: new Date().toISOString()
  };

  saveLogrosDesbloqueadosMap(map);
  return true;
}

/**
 * Lists all achievements in the catalog, optionally filtered by story slug or unlocked status.
 */
export function listarLogros(slug?: string): Array<Logro & { desbloqueado: boolean }> {
  const unlockedMap = getLogrosDesbloqueadosMap();
  let list = CATALOGO_LOGROS.map((logro) => ({
    ...logro,
    desbloqueado: Boolean(unlockedMap[logro.id])
  }));

  if (slug) {
    list = list.filter((l) => !l.slug || l.slug === slug);
  }

  return list;
}

/**
 * Evaluates progress against all catalog predicates and unlocks qualifying ones.
 * Returns array of newly unlocked Logro objects for trigger celebration UI.
 */
export function evaluarYDesbloquearLogros(
  progresoMap: Record<string, CuentoProgressRecord>,
  currentSlug?: string
): Logro[] {
  const nuevosLogros: Logro[] = [];

  // 1. Evaluate catalog fixed achievements
  for (const logro of CATALOGO_LOGROS) {
    if (!tieneLogro(logro.id) && logro.condicion) {
      if (logro.condicion(progresoMap, currentSlug)) {
        const unlocked = desbloquearLogro(logro.id);
        if (unlocked) {
          nuevosLogros.push(logro);
        }
      }
    }
  }

  // 2. Dynamic story-specific achievement: cuento-completo-<slug>
  if (currentSlug && progresoMap[currentSlug]?.finished) {
    const slugLogroId = `cuento-completo-${currentSlug}`;
    if (!tieneLogro(slugLogroId)) {
      const unlocked = desbloquearLogro(slugLogroId);
      if (unlocked) {
        nuevosLogros.push({
          id: slugLogroId,
          nombre: '¡Cuento Completado!',
          descripcion: `Has terminado de leer este cuento.`,
          icono: '🎉',
          slug: currentSlug
        });
      }
    }
  }

  return nuevosLogros;
}

/**
 * Resets memory store fallback (for testing purposes).
 */
export function _resetMemoryStoreForTest(): void {
  memoryStore = {};
}
