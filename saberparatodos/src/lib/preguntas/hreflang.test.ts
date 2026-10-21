import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { bundleLanguage, hreflangFor, resolvePageLanguage } from './canonical';

const src = (rel: string) => readFileSync(resolve(__dirname, '../../', rel), 'utf8');

describe('hreflang follows the content language, not the visitor', () => {
  it('a CO page is es-CO whatever country the request comes from', () => {
    const coPage = hreflangFor('colombia', bundleLanguage({ country: 'colombia', subject: 'matematicas' }));
    expect(coPage).toBe('es-CO');
    // Googlebot desde EE. UU. (en-US) o un visitante con cookie BR (pt-BR): la página manda.
    expect(resolvePageLanguage(coPage, 'en-US')).toBe('es-CO');
    expect(resolvePageLanguage(coPage, 'pt-BR')).toBe('es-CO');
  });

  it('Spanish carries the country region; other languages keep their own tag', () => {
    expect(hreflangFor('argentina')).toBe('es-AR');
    expect(hreflangFor('colombia', 'es')).toBe('es-CO');
    expect(hreflangFor('colombia', bundleLanguage({ country: 'colombia', subject: 'ingles' }))).toBe('en');
    expect(hreflangFor('brasil', bundleLanguage({ country: 'brasil', subject: 'matematica' }))).toBe('pt-BR');
    expect(hreflangFor('guinea-ecuatorial', 'fr')).toBe('fr');
  });

  it('pages that declare nothing keep the runtime country language', () => {
    expect(resolvePageLanguage(undefined, 'es-MX')).toBe('es-MX');
    expect(resolvePageLanguage('', 'es-MX')).toBe('es-MX');
  });
});

describe('Layout and /preguntas/ pages wire hreflang from the page', () => {
  const layout = src('layouts/Layout.astro');

  it('Layout uses the page language for <html lang>, hreflang and og:locale', () => {
    expect(layout).toMatch(/const pageLanguage = resolvePageLanguage\(hreflang, countryConfig\.language\);/);
    expect(layout).toMatch(/<html lang=\{pageLanguage\}/);
    expect(layout).toMatch(/<link rel="alternate" hreflang=\{pageLanguage\} href=\{canonicalURL\} \/>/);
    expect(layout).toMatch(/const ogLocale = \(pageLanguage/);
    expect(layout).not.toMatch(/hreflang=\{countryConfig\.language\}/);
    expect(layout).not.toMatch(/<html lang=\{countryConfig\.language\}/);
  });

  it.each([
    'pages/preguntas/index.astro',
    'pages/preguntas/[country]/index.astro',
    'pages/preguntas/[country]/[grade]/index.astro',
    'pages/preguntas/[country]/[grade]/[subject]/index.astro',
    'pages/preguntas/[country]/[grade]/[subject]/[bundleId]/index.astro',
  ])('%s passes hreflang to Layout and emits no extra alternate link', (page) => {
    const source = src(page);
    expect(source).toMatch(/<Layout [^>]*hreflang=/);
    expect(source).not.toMatch(/rel="alternate"/);
  });
});
