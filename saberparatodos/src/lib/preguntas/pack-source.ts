/**
 * Resolución de packs estáticos del API para las páginas /preguntas/.
 *
 * `PUBLIC_API_BASE_URL` llega en dos formas según el entorno:
 *  - `https://api.saberparatodos.space/v1` (deploy-production, normalize-wrangler-config)
 *  - `https://api.saberparatodos.space` o `/api` (wrangler.toml)
 * Concatenar `/v1/packs` a la primera producía `/v1/v1/packs/...` (404) y la
 * página caía en "La vista previa interactiva ... no está disponible".
 */

/** API público que sirve los packs (mismo default que `pages/api/packs/[...slug].ts`). */
export const PUBLIC_API_ROOT = 'https://api.saberparatodos.space';

/**
 * Raíz absoluta del API sin `/` final ni sufijo `/v1`. Una base relativa
 * (`/api`, el valor de dev en wrangler.toml) no sirve aquí: el proxy del sitio
 * expone `/api/packs/`, no `/api/v1/packs/`, y un Worker que se hace fetch a sí
 * mismo no es fiable; se usa el API público, igual que ese proxy.
 */
export function normalizeApiRoot(base: string | undefined | null): string {
  const root = String(base ?? '')
    .trim()
    .replace(/\/+$/, '')
    .replace(/\/v1$/i, '')
    .replace(/\/+$/, '');
  return /^https?:\/\//i.test(root) ? root : PUBLIC_API_ROOT;
}

export function packUrl(base: string | undefined | null, packId: string): string {
  return `${normalizeApiRoot(base)}/v1/packs/${packId}.json`;
}

export interface PackLookupEntry {
  code: string;
  subject: string;
  grade: number | null;
  week: string;
  packId?: string;
}

/**
 * Claves de pack a probar, en orden: la del índice (calculada como
 * generate-static-packs.js) y luego variantes derivadas de la carpeta.
 */
export function packIdCandidates(entry: PackLookupEntry): string[] {
  const weekNum = Number(entry.week.replace(/^W/i, '')) || 1;
  const grade = entry.grade ?? 11;
  const base = `${entry.code.toLowerCase()}-week-${weekNum}-grade-${grade}-subject-`;
  const candidates = [
    entry.packId,
    `${base}${entry.subject.replace(/-/g, '_')}`,
    `${base}${entry.subject}`,
  ].filter((c): c is string => Boolean(c));
  return [...new Set(candidates)];
}

export interface ApiPackQuestion {
  id: string;
  statement?: string;
  context?: string;
  options?: { letter: string; text: string; is_correct: boolean; feedback?: string }[];
  explanation?: string;
  difficulty?: string | number;
  bloom?: string;
  bundle_id?: string;
}

/**
 * Preguntas del pack que pertenecen al bundle. Un pack agrupa todos los
 * bundles de (país, semana, grado, asignatura); si las preguntas traen
 * `bundle_id` se filtra por él, y si ninguna coincide el pack no es de este bundle.
 */
export function selectBundleQuestions(questions: ApiPackQuestion[], bundleId: string): ApiPackQuestion[] {
  const tagged = questions.some((q) => typeof q.bundle_id === 'string' && q.bundle_id);
  if (!tagged) {
    // Packs antiguos sin bundle_id: el id de pregunta suele ser `{bundleId}-vN`.
    const byPrefix = questions.filter((q) => String(q.id ?? '').startsWith(bundleId));
    return byPrefix.length ? byPrefix : questions;
  }
  return questions.filter((q) => q.bundle_id === bundleId);
}
