import { describe, expect, it } from 'vitest';
import {
  INTERNATIONAL_HOST,
  SPANISH_HOST,
  baseLanguage,
  bundleLanguage,
  canonicalHostFor,
  canonicalUrlFor,
  countryLanguage,
  hostForRequest,
} from './canonical';
import { buildPreguntasSitemap, preguntasCanonicalUrls } from './sitemap';
import { buildRobotsTxt } from './robots';
import type { BundleEntry } from './bundle-fetcher';

const entry = (country: string, subject: string, id: string, gradeSlug = 'grado-11'): BundleEntry => ({
  id,
  countryDir: country,
  country,
  code: id.split('-')[0],
  subject,
  grade: 11,
  gradeSlug,
  week: 'W01',
  tema: '',
  total: 10,
  alignment: '',
});
const url = (e: BundleEntry) => `/preguntas/${e.country}/${e.gradeSlug}/${e.subject}/${e.id}/`;

describe('canonicalHostFor', () => {
  it('Spanish exams → saberparatodos.space', () => {
    expect(canonicalHostFor('colombia', 'es-CO')).toBe(SPANISH_HOST);
    expect(canonicalHostFor('argentina', 'es')).toBe(SPANISH_HOST);
    expect(canonicalHostFor('spain')).toBe(SPANISH_HOST);
  });

  it('non-Spanish exams (en / pt / fr) → worldexam.swal.network', () => {
    expect(canonicalHostFor('colombia', 'en')).toBe(INTERNATIONAL_HOST);
    expect(canonicalHostFor('brasil', 'pt-BR')).toBe(INTERNATIONAL_HOST);
    expect(canonicalHostFor('brasil')).toBe(INTERNATIONAL_HOST);
    expect(canonicalHostFor('guinea-ecuatorial', 'fr-GQ')).toBe(INTERNATIONAL_HOST);
  });

  it('builds absolute canonical URLs', () => {
    expect(canonicalUrlFor('/preguntas/colombia/', 'colombia')).toBe('https://saberparatodos.space/preguntas/colombia/');
    expect(canonicalUrlFor('preguntas/brasil/', 'brasil')).toBe('https://worldexam.swal.network/preguntas/brasil/');
  });
});

describe('bundle language from repo data', () => {
  it('uses the country locale from countries.config', () => {
    expect(countryLanguage('colombia')).toBe('es-CO');
    expect(countryLanguage('brasil')).toBe('pt-BR');
    expect(baseLanguage('pt-BR')).toBe('pt');
    expect(baseLanguage('')).toBe('es');
  });

  it('decides per bundle: foreign-language subjects override the country locale', () => {
    expect(bundleLanguage({ country: 'colombia', subject: 'matematicas' })).toBe('es-CO');
    expect(bundleLanguage({ country: 'colombia', subject: 'ingles' })).toBe('en');
    expect(bundleLanguage({ country: 'brasil', subject: 'matematica' })).toBe('pt-BR');
    expect(bundleLanguage({ country: 'mexico', subject: 'Inglés' })).toBe('en');
    expect(bundleLanguage({ country: 'guinea-ecuatorial', subject: 'frances' })).toBe('fr');
  });

  it('maps request hosts; unknown hosts (preview/localhost) fall back to the Spanish host', () => {
    expect(hostForRequest(new URL('https://worldexam.swal.network/preguntas/sitemap.xml'))).toBe(INTERNATIONAL_HOST);
    expect(hostForRequest(new URL('https://saberparatodos.space/robots.txt'))).toBe(SPANISH_HOST);
    expect(hostForRequest(new URL('http://localhost:4321/robots.txt'))).toBe(SPANISH_HOST);
  });
});

describe('per-host sitemaps', () => {
  const entries = [
    entry('colombia', 'matematicas', 'CO-MAT-11-2026-W01-x-001-MASTERY-bundle'),
    entry('colombia', 'ingles', 'CO-ING-11-2026-W01-y-001-MASTERY-bundle'),
    entry('brasil', 'matematica', 'BR-MAT-3EM-2026-W01-z-001-MASTERY-bundle', '3o-ano'),
  ];

  it('assigns every URL to the host of its language', () => {
    const urls = preguntasCanonicalUrls(entries, url);
    expect(urls).toContain('https://saberparatodos.space/preguntas/');
    expect(urls).toContain('https://saberparatodos.space/preguntas/colombia/grado-11/');
    expect(urls).toContain('https://saberparatodos.space/preguntas/colombia/grado-11/matematicas/CO-MAT-11-2026-W01-x-001-MASTERY-bundle/');
    expect(urls).toContain('https://worldexam.swal.network/preguntas/colombia/grado-11/ingles/');
    expect(urls).toContain('https://worldexam.swal.network/preguntas/colombia/grado-11/ingles/CO-ING-11-2026-W01-y-001-MASTERY-bundle/');
    expect(urls).toContain('https://worldexam.swal.network/preguntas/brasil/');
    expect(urls).toContain('https://worldexam.swal.network/preguntas/brasil/3o-ano/matematica/BR-MAT-3EM-2026-W01-z-001-MASTERY-bundle/');
  });

  it('never mixes hosts inside one sitemap', () => {
    const es = buildPreguntasSitemap(SPANISH_HOST, entries, url);
    const intl = buildPreguntasSitemap(INTERNATIONAL_HOST, entries, url);
    const locs = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs(es).length).toBeGreaterThan(0);
    expect(locs(intl).length).toBeGreaterThan(0);
    expect(locs(es).every((u) => u.startsWith(`${SPANISH_HOST}/`))).toBe(true);
    expect(locs(intl).every((u) => u.startsWith(`${INTERNATIONAL_HOST}/`))).toBe(true);
    expect(locs(es).length + locs(intl).length).toBe(preguntasCanonicalUrls(entries, url).length);
  });
});

describe('per-host robots.txt', () => {
  it('only announces sitemaps of the serving host', () => {
    const es = buildRobotsTxt(SPANISH_HOST, 'https://worldexam.swal.network');
    expect(es).toContain('Sitemap: https://saberparatodos.space/preguntas/sitemap.xml');
    expect(es).not.toContain('worldexam.swal.network');
    expect(es).toContain('Disallow: /api/');

    const intl = buildRobotsTxt(INTERNATIONAL_HOST, 'https://worldexam.swal.network/');
    expect(intl).toContain('Sitemap: https://worldexam.swal.network/sitemap-index.xml');
    expect(intl).toContain('Sitemap: https://worldexam.swal.network/preguntas/sitemap.xml');
    expect(intl).not.toContain('saberparatodos.space');
  });
});
