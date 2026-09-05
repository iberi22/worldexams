/**
 * pool-activation — condicional de activación de la ruta enriquecida.
 *
 * REGLA (por diseño): las rutas de carga ampliada (mezcla diagnóstica de
 * grados inferiores, expansión deep-search) solo se ACTIVAN cuando el pool
 * disponible para el grado + materia (+ periodo) supera el umbral. Con pools
 * delgados (contenido en maduración) la lógica NO se elimina: queda presente
 * pero desactivada, y el examen se arma con el pool básico filtrado.
 */
import type { AppQuestion } from '../api-service';
import { subjectsMatch } from './subject';

/** Umbral: más de N preguntas por materia (+ periodo) = ruta activa. */
export const POOL_ACTIVATION_THRESHOLD = 100;

export interface PoolScope {
  grade?: number;
  subject?: string | null;
  period?: number;
}

export interface PoolActivation {
  active: boolean;
  count: number;
  threshold: number;
  reason: string;
}

/**
 * Mapea el campo `periodo` de los bundles v5.2 al periodo académico 1–4:
 * valores 1–4 son periodo explícito; semana curricular W (>4) => ceil(W/10).
 * Sin valor mapeable => null (no se puede descartar).
 */
export function mapPeriodoToPeriod(periodo: unknown): number | null {
  const raw = Number(periodo);
  if (!Number.isFinite(raw) || raw <= 0) return null;
  if (raw >= 1 && raw <= 4) return raw;
  return Math.min(4, Math.max(1, Math.ceil(raw / 10)));
}

export function countScopedPool(pool: AppQuestion[], scope: PoolScope): number {
  return pool.filter((q) => {
    if (!q) return false;
    if (scope.grade !== undefined && Number.isInteger(scope.grade) && q.grade !== scope.grade) return false;
    if (scope.subject && !subjectsMatch(q.category, scope.subject)) return false;
    if (scope.period !== undefined && scope.period !== null) {
      const hasPeriodo = q.periodo !== undefined && q.periodo !== null;
      if (hasPeriodo) {
        const mapped = mapPeriodoToPeriod(q.periodo);
        if (mapped === null || mapped !== Number(scope.period)) return false;
      }
      // Sin periodo declarado no se descarta: no se puede probar que no aplique.
    }
    return true;
  }).length;
}

export function getPoolActivation(pool: AppQuestion[], scope: PoolScope): PoolActivation {
  const count = countScopedPool(pool, scope);
  const active = count > POOL_ACTIVATION_THRESHOLD;
  const where = [
    scope.grade !== undefined ? `grado ${scope.grade}` : null,
    scope.subject ? `materia ${scope.subject}` : null,
    scope.period !== undefined && scope.period !== null ? `periodo ${scope.period}` : null,
  ]
    .filter(Boolean)
    .join(' + ');
  return {
    active,
    count,
    threshold: POOL_ACTIVATION_THRESHOLD,
    reason: active
      ? `Pool sólido (${count}>${POOL_ACTIVATION_THRESHOLD}) en ${where}: ruta enriquecida ACTIVA.`
      : `Pool en maduración (${count}≤${POOL_ACTIVATION_THRESHOLD}) en ${where}: ruta enriquecida DESACTIVADA por diseño (lógica conservada).`,
  };
}
