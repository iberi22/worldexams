import { afterEach, describe, expect, it, vi } from 'vitest';
import { normalizeApiRoot, packIdCandidates, packUrl, selectBundleQuestions } from './pack-source';
import { packIdFor, entryFromBundle } from './index-builder.mjs';
import { getBundleQuestions, type BundleEntry } from './bundle-fetcher';
import bakedIndex from './preguntas-index.json';

describe('normalizeApiRoot / packUrl', () => {
  it('accepts a base with trailing /v1 (deploy-production) without doubling it', () => {
    expect(packUrl('https://api.saberparatodos.space/v1', 'ar-week-1-grade-6-subject-ciencias_naturales')).toBe(
      'https://api.saberparatodos.space/v1/packs/ar-week-1-grade-6-subject-ciencias_naturales.json'
    );
    expect(packUrl('https://api.saberparatodos.space/v1/', 'x')).toBe('https://api.saberparatodos.space/v1/packs/x.json');
  });

  it('accepts a base without /v1 (wrangler.toml)', () => {
    expect(packUrl('https://api.saberparatodos.space', 'x')).toBe('https://api.saberparatodos.space/v1/packs/x.json');
    expect(packUrl('https://api.saberparatodos.space/', 'x')).toBe('https://api.saberparatodos.space/v1/packs/x.json');
  });

  it('falls back to the public API for relative or empty bases (/api has no /v1/packs route)', () => {
    expect(packUrl('/api', 'x')).toBe('https://api.saberparatodos.space/v1/packs/x.json');
    expect(packUrl(undefined, 'x')).toBe('https://api.saberparatodos.space/v1/packs/x.json');
    expect(normalizeApiRoot('  http://127.0.0.1:8788/v1/ ')).toBe('http://127.0.0.1:8788');
  });
});

describe('pack ids', () => {
  it('mirrors generate-static-packs.js keys (frontmatter subject, underscores, 3EM → 11)', () => {
    expect(packIdFor({ country: 'argentina', subject: 'ciencias-naturales', grado: '6', week: 'W01' })).toBe(
      'ar-week-1-grade-6-subject-ciencias_naturales'
    );
    expect(packIdFor({ country: 'brasil', subject: 'matematica', grado: '3EM', week: 'W07' })).toBe(
      'br-week-7-grade-11-subject-matematica'
    );
    expect(packIdFor({ country: 'colombia', subject: 'Inglés', grado: '9', week: 'W12' })).toBe(
      'co-week-12-grade-9-subject-ingles'
    );
    expect(packIdFor({ country: 'costa-rica', subject: 'Matemáticas', grado: '11', week: 'W40' })).toBe(
      'cr-week-40-grade-11-subject-matematicas'
    );
  });

  it('builds index entries from bundle frontmatter (quoted or not, CRLF)', () => {
    const text = '---\r\nid: "AR-CIE-6-2026-W01-x-001-MASTERY-bundle"\r\ncountry: "argentina"\r\ngrado: 6\r\nasignatura: "ciencias-naturales"\r\ntema: "x"\r\nweek: "W01"\r\ntotal_questions: 10\r\nalignment: "NAP"\r\n---\r\n';
    const entry = entryFromBundle({
      countryDir: 'argentina',
      subjectDir: 'ciencias-naturales',
      gradeDir: 'grado-6',
      fileName: 'AR-CIE-6-2026-W01-x-001-MASTERY-bundle.md',
      text,
    });
    expect(entry).toMatchObject({
      id: 'AR-CIE-6-2026-W01-x-001-MASTERY-bundle',
      code: 'AR',
      grade: 6,
      week: 'W01',
      total: 10,
      alignment: 'NAP',
      packId: 'ar-week-1-grade-6-subject-ciencias_naturales',
    });
  });

  it('tries the indexed pack id first, then folder-derived variants', () => {
    expect(
      packIdCandidates({ code: 'AR', subject: 'ciencias-naturales', grade: 6, week: 'W01', packId: 'ar-week-1-grade-6-subject-ciencias_naturales' })
    ).toEqual(['ar-week-1-grade-6-subject-ciencias_naturales', 'ar-week-1-grade-6-subject-ciencias-naturales']);
  });

  it('the committed index covers every bundle and carries pack ids', () => {
    expect(bakedIndex.bundleCount).toBe(bakedIndex.bundles.length);
    expect(bakedIndex.bundles.length).toBeGreaterThan(3000);
    expect(bakedIndex.bundles.every((b) => typeof b.packId === 'string' && b.packId.length > 0)).toBe(true);
  });
});

describe('selectBundleQuestions', () => {
  it('keeps only the questions of the requested bundle when the pack is shared', () => {
    const qs = [
      { id: 'A-v1', bundle_id: 'A' },
      { id: 'B-v1', bundle_id: 'B' },
    ];
    expect(selectBundleQuestions(qs, 'A').map((q) => q.id)).toEqual(['A-v1']);
    expect(selectBundleQuestions(qs, 'C')).toEqual([]);
  });

  it('falls back to id prefix, then the whole pack, for untagged packs', () => {
    expect(selectBundleQuestions([{ id: 'A-v1' }, { id: 'B-v1' }], 'A').map((q) => q.id)).toEqual(['A-v1']);
    expect(selectBundleQuestions([{ id: 'q1' }], 'A').map((q) => q.id)).toEqual(['q1']);
  });
});

describe('getBundleQuestions on the edge (no filesystem)', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('fetches /v1/packs once (not /v1/v1) and maps the pack questions', async () => {
    vi.stubEnv('PUBLIC_API_BASE_URL', 'https://api.saberparatodos.space/v1');
    const original = process.versions;
    Object.defineProperty(process, 'versions', { value: { ...original, node: undefined }, configurable: true });
    const calls: string[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        calls.push(url);
        if (!url.endsWith('ciencias_naturales.json')) return new Response('nope', { status: 404 });
        return new Response(
          JSON.stringify({
            questions: [
              {
                id: 'AR-1-v1',
                bundle_id: 'AR-1',
                statement: '¿Qué es $x$?',
                context: 'Martina',
                difficulty: '4',
                bloom: 'Remember',
                explanation: 'Porque sí.\n\n---',
                options: [
                  { letter: 'B', text: 'El tejido', is_correct: false, feedback: 'Un tejido agrupa células.' },
                  { letter: 'A', text: 'La célula', is_correct: true, feedback: 'Correcto. La célula es la unidad básica.' },
                ],
              },
              { id: 'AR-2-v1', bundle_id: 'AR-2', statement: 'otro', options: [] },
            ],
          }),
          { status: 200 }
        );
      })
    );
    try {
      const entry: BundleEntry = {
        id: 'AR-1',
        countryDir: 'argentina',
        country: 'argentina',
        code: 'AR',
        subject: 'ciencias-naturales',
        grade: 6,
        gradeSlug: 'grado-6',
        week: 'W01',
        tema: 't',
        total: 1,
        alignment: '',
      };
      const questions = await getBundleQuestions(entry);
      expect(calls[0]).toBe('https://api.saberparatodos.space/v1/packs/ar-week-1-grade-6-subject-ciencias_naturales.json');
      expect(calls.every((u) => !u.includes('/v1/v1/'))).toBe(true);
      expect(questions).toHaveLength(1);
      expect(questions?.[0]).toMatchObject({
        id: 'AR-1-v1',
        difficulty: 'D4',
        bloom: 'Remember',
        context: 'Martina',
        explanation: 'Porque sí.',
      });
      expect(questions?.[0].options.map((o) => o.letter)).toEqual(['A', 'B']);
      expect(questions?.[0].options[0]).toEqual({
        letter: 'A',
        text: 'La célula',
        correct: true,
        feedback: 'Correcto. La célula es la unidad básica.',
      });
    } finally {
      Object.defineProperty(process, 'versions', { value: original, configurable: true });
    }
  });
});
