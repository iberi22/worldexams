/**
 * Nombres visibles y enlaces de práctica para las páginas de bundle /preguntas/.
 */
import { getCountryManifest } from '../country-manifest-loader';
import type { BundleEntry } from './bundle-fetcher';

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');

function titleCase(str: string): string {
  return str.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Nombre de la materia según el manifiesto del país (con tildes), o el slug en Title Case. */
export function subjectDisplayName(entry: Pick<BundleEntry, 'country' | 'subject'>): string {
  const manifest = getCountryManifest(entry.country) ?? getCountryManifest(entry.country.replace(/-/g, '_'));
  const needle = fold(entry.subject);
  const match = manifest?.subjects.find((s) => fold(s.id) === needle || fold(s.slug) === needle || fold(s.name) === needle);
  return match?.name ?? titleCase(entry.subject);
}

/**
 * Deep-link a la app: `/?country=XX&subject=...&grade=N` abre el modal de
 * simulacro con la materia y el grado preseleccionados (App.svelte), y
 * `country` fija el país en el middleware.
 */
export function practiceUrlFor(entry: Pick<BundleEntry, 'code' | 'grade'>, subjectName: string): string {
  const params = new URLSearchParams({
    country: entry.code.toUpperCase(),
    subject: subjectName,
    grade: String(entry.grade ?? 11),
  });
  return `/?${params.toString()}`;
}
