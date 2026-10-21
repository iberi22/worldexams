/**
 * Host canónico de las páginas públicas /preguntas/ (decisión del owner, 2026-10-21):
 * exámenes en español → https://saberparatodos.space; cualquier otro idioma
 * → https://worldexam.swal.network.
 *
 * Idioma: el locale del país (`config/countries.config.ts`, p. ej. `pt-BR`),
 * salvo que la materia sea de lengua extranjera (`ingles` → en, `portugues` → pt,
 * `frances` → fr). Como el idioma depende de país + materia, todos los bundles
 * de un mismo listado de materia comparten host.
 */
import { getCountryManifest } from '../country-manifest-loader';

export const SPANISH_HOST = 'https://saberparatodos.space';
export const INTERNATIONAL_HOST = 'https://worldexam.swal.network';

const SUBJECT_LANGUAGES: Record<string, string> = {
  ingles: 'en',
  english: 'en',
  portugues: 'pt',
  portuguese: 'pt',
  frances: 'fr',
  french: 'fr',
};

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');

export function baseLanguage(tag: string | null | undefined): string {
  return String(tag ?? '').trim().toLowerCase().split(/[-_]/)[0] || 'es';
}

/** Locale del país según el manifiesto (`es` si el país no está configurado). */
export function countryLanguage(country: string): string {
  const manifest = getCountryManifest(country) ?? getCountryManifest(country.replace(/-/g, '_'));
  return manifest?.language || 'es';
}

/** Idioma de una materia de lengua extranjera, o null si se dicta en el idioma del país. */
export function subjectLanguage(subject: string | null | undefined): string | null {
  return SUBJECT_LANGUAGES[fold(String(subject ?? ''))] ?? null;
}

/** Idioma (BCP 47) en que está escrito un bundle o un listado de materia. */
export function bundleLanguage(entry: { country: string; subject?: string | null }): string {
  return subjectLanguage(entry.subject) ?? countryLanguage(entry.country);
}

/** Host canónico: español → saberparatodos.space; otro idioma → worldexam.swal.network. */
export function canonicalHostFor(country: string, language?: string | null): string {
  return baseLanguage(language || countryLanguage(country)) === 'es' ? SPANISH_HOST : INTERNATIONAL_HOST;
}

/** URL canónica absoluta de una ruta /preguntas/ en el idioma indicado. */
export function canonicalUrlFor(path: string, country: string, language?: string | null): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${canonicalHostFor(country, language)}${clean}`;
}

/**
 * Valor de hreflang / <html lang> de una página de examen: el idioma del
 * contenido, nunca el país del visitante. Español lleva región del país
 * (`es-CO`); otro idioma va tal cual (`en`, `pt-BR`, `fr`).
 */
export function hreflangFor(country: string, language?: string | null): string {
  const countryTag = countryLanguage(country);
  const tag = String(language || countryTag).trim();
  if (baseLanguage(tag) === 'es' && !/[-_]/.test(tag)) {
    return baseLanguage(countryTag) === 'es' && /[-_]/.test(countryTag) ? countryTag : 'es';
  }
  return tag;
}

/** Idioma de la página para Layout: el de la página si lo declara, si no el del país en runtime. */
export function resolvePageLanguage(pageLanguage: string | null | undefined, runtimeLanguage: string): string {
  return String(pageLanguage ?? '').trim() || runtimeLanguage;
}

/** Host al que corresponde una petición (para sitemap/robots); hosts desconocidos → español. */
export function hostForRequest(url: URL): string {
  return url.hostname === new URL(INTERNATIONAL_HOST).hostname ? INTERNATIONAL_HOST : SPANISH_HOST;
}
