/**
 * Wave-Gov #1167 — Student Private View.
 *
 * Construye la vista de resultados que recibe un estudiante segun la
 * politica de privacidad del salon (#1166). El filtrado ocurre en el
 * nodo (mesh-local): un estudiante NUNCA recibe datos que no puede ver.
 */

import type { SalonResult } from './salon-shared';
import {
  type PrivacyMode,
  type ViewerContext,
  createPrivacyPolicy,
} from './salon-privacy';

export interface VisibleResultRow {
  alias: string;
  score: number | null; // null => oculto
  isSelf: boolean;
}

export interface StudentView {
  rows: VisibleResultRow[];
  ownScore: number | null;
  ownRank: number | null; // 1-based entre todos los resultados
  mode: PrivacyMode;
}

/**
 * Vista restringida para `viewer`. El host pasa `role: 'host'` y ve todo.
 * En modo private los demas aparecen sin puntaje; en anon/public aparecen
 * con alias publico u ofuscado respectivamente.
 */
export function buildStudentView(
  results: SalonResult[],
  viewer: ViewerContext,
  mode: PrivacyMode,
  hostId = '__host__',
): StudentView {
  const policy = createPrivacyPolicy(
    { country: '*', grade: 0, subject: '*', examId: '*' },
    hostId,
    mode,
  );
  const ranked = [...results].sort((a, b) => b.score - a.score);
  const rows: VisibleResultRow[] = ranked.map((r) => ({
    alias: policy.aliasFor(viewer, r.peerId),
    score: policy.canViewResult(viewer, r.peerId) ? r.score : null,
    isSelf: r.peerId === viewer.peerId,
  }));
  const own = results.find((r) => r.peerId === viewer.peerId) ?? null;
  const ownRank = own ? ranked.findIndex((r) => r.peerId === own.peerId) + 1 : null;

  return {
    rows,
    ownScore: own?.score ?? null,
    ownRank,
    mode,
  };
}

/** Resumen pedagogico minimo que SIEMPRE puede ver el propio estudiante. */
export function summarizeOwnResult(result: SalonResult): {
  score: number;
  answered: number;
  gradeLabel: string;
} {
  const gradeLabel =
    result.score >= 70 ? 'Destacado' : result.score >= 50 ? 'Suficiente' : 'En proceso';
  return { score: result.score, answered: Object.keys(result.answers).length, gradeLabel };
}
