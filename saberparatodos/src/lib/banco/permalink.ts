/**
 * Permalinks del "Banco social" hacia la página pública SEO de un bundle:
 *   /preguntas/{country}/{gradeSlug}/{subject}/{bundleId}/
 *
 * El runtime de la app no carga `preguntas-index.json` (pesa ~370 KB), así que
 * la URL se deriva del ID canónico del bundle v5.2:
 *   {CC}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle
 *
 * País y grado salen exactos del ID. Para la asignatura se usa el slug más
 * común de cada código; si un país usa una variante (p. ej. `matematica`),
 * la página pública redirige 301 a la URL canónica al encontrar el bundle por ID.
 */

/** Código ISO del bundle → carpeta de país en `questions_data/`. */
export const COUNTRY_DIR_BY_CODE: Record<string, string> = {
  AR: 'argentina',
  BO: 'bolivia',
  BR: 'brasil',
  CL: 'chile',
  CO: 'colombia',
  CR: 'costarica',
  DO: 'dominican_republic',
  EC: 'ecuador',
  ES: 'spain',
  GQ: 'guinea-ecuatorial',
  GT: 'guatemala',
  HN: 'honduras',
  MX: 'mexico',
  NI: 'nicaragua',
  PA: 'panama',
  PE: 'peru',
  PR: 'puerto-rico',
  PY: 'paraguay',
  SV: 'el-salvador',
  UY: 'uruguay',
};

/** Código de asignatura del bundle → slug de asignatura más frecuente. */
export const SUBJECT_SLUG_BY_CODE: Record<string, string> = {
  MAT: 'matematicas',
  CIE: 'ciencias-naturales',
  CN: 'ciencias-naturales',
  NAT: 'ciencias-naturales',
  LEN: 'lengua',
  LC: 'lectura-critica',
  LEC: 'lectura-critica',
  SOC: 'sociales',
  ING: 'ingles',
  POR: 'portugues',
  HIS: 'historia',
  COM: 'comunicacion',
  ESP: 'espanol',
};

const BUNDLE_ID_RE = /^([A-Z]{2})-([A-Z]+)-(\d{1,2}|3EM)-\d{4}-W\d{2}-.+-bundle$/i;

export interface PermalinkSource {
  id?: string | number | null;
  bundleId?: string | null;
}

/** Normaliza un ID de pregunta/bundle quitando el sufijo de versión `-vN`. */
export function toBundleId(source: PermalinkSource): string {
  const raw = String(source.bundleId || source.id || '').trim();
  return raw.replace(/-v\d+$/i, '');
}

/**
 * Construye la URL pública de la pregunta, o `null` si el ID no sigue el
 * formato canónico v5.2 (en ese caso no se muestra el enlace). Si se conoce el
 * ID de la pregunta, se añade `?revisar=<id>` para que la página haga scroll a ella.
 */
export function buildPublicQuestionUrl(source: PermalinkSource): string | null {
  const bundleId = toBundleId(source);
  const match = bundleId.match(BUNDLE_ID_RE);
  if (!match) return null;

  const [, code, subjectCode, gradeToken] = match;
  const countryDir = COUNTRY_DIR_BY_CODE[code.toUpperCase()];
  if (!countryDir) return null;

  const subject = SUBJECT_SLUG_BY_CODE[subjectCode.toUpperCase()] ?? subjectCode.toLowerCase();
  const gradeSlug = gradeToken.toUpperCase() === '3EM' ? '3o-ano' : `grado-${Number(gradeToken)}`;
  const country = countryDir.replace(/_/g, '-');

  const path = `/preguntas/${country}/${gradeSlug}/${subject}/${encodeURIComponent(bundleId)}/`;
  const questionId = String(source.id ?? '').trim();
  return questionId && questionId !== bundleId ? `${path}?revisar=${encodeURIComponent(questionId)}` : path;
}
