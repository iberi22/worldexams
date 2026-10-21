import { describe, it, expect } from 'vitest';
import { buildPublicQuestionUrl, toBundleId } from './permalink';
import bakedIndex from '../preguntas/preguntas-index.json';

describe('buildPublicQuestionUrl', () => {
  it('builds the SEO page URL from a canonical bundle id', () => {
    expect(
      buildPublicQuestionUrl({ bundleId: 'CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle' }),
    ).toBe('/preguntas/colombia/grado-6/matematicas/CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle/');
  });

  it('falls back to the question id and strips the -vN suffix', () => {
    expect(buildPublicQuestionUrl({ id: 'CO-CN-7-2026-W01-la-celula-001-MASTERY-bundle-v1' })).toBe(
      '/preguntas/colombia/grado-7/ciencias-naturales/CO-CN-7-2026-W01-la-celula-001-MASTERY-bundle/',
    );
    expect(toBundleId({ id: 'X-bundle-v12' })).toBe('X-bundle');
  });

  it('maps country dirs with underscores to the hyphenated route param', () => {
    expect(buildPublicQuestionUrl({ bundleId: 'DO-MAT-8-2026-W03-fracciones-001-MASTERY-bundle' })).toBe(
      '/preguntas/dominican-republic/grado-8/matematicas/DO-MAT-8-2026-W03-fracciones-001-MASTERY-bundle/',
    );
  });

  it('handles Brasil 3o ano do Ensino Medio', () => {
    expect(buildPublicQuestionUrl({ bundleId: 'BR-MAT-3EM-2026-W02-funcoes-001-MASTERY-bundle' })).toBe(
      '/preguntas/brasil/3o-ano/matematicas/BR-MAT-3EM-2026-W02-funcoes-001-MASTERY-bundle/',
    );
  });

  it('returns null for ids that are not canonical v5.2 bundles', () => {
    expect(buildPublicQuestionUrl({ id: 'q-123' })).toBeNull();
    expect(buildPublicQuestionUrl({ bundleId: '' })).toBeNull();
    expect(buildPublicQuestionUrl({ bundleId: 'ZZ-MAT-6-2026-W01-x-001-MASTERY-bundle' })).toBeNull();
  });

  it('matches country and grade of every bundle in the published index', () => {
    const bundles = (bakedIndex as { bundles: Array<{ id: string; country: string; gradeSlug: string; subject: string }> }).bundles;
    expect(bundles.length).toBeGreaterThan(0);
    let exact = 0;
    for (const entry of bundles) {
      const url = buildPublicQuestionUrl({ bundleId: entry.id });
      expect(url, entry.id).not.toBeNull();
      const [, , country, grade, subject, id] = url!.split('/');
      expect(country, entry.id).toBe(entry.country);
      expect(grade, entry.id).toBe(entry.gradeSlug);
      expect(decodeURIComponent(id), entry.id).toBe(entry.id);
      if (subject === entry.subject) exact++;
    }
    // Subject variants (e.g. "matematica") are resolved by the page's 301-by-id redirect.
    expect(exact / bundles.length).toBeGreaterThan(0.8);
  });
});
