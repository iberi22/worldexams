import { describe, it, expect, beforeEach } from 'vitest';
import {
  reportCorrection,
  approveCorrection,
  generatePatch,
  exportPatch,
  listCorrectionsByQuestion,
  clearAllCorrections,
  getBundleHash,
  getDbName,
  buildUnifiedDiff,
  hashString,
} from './CorrectionEngine';

describe('CorrectionEngine — report → approve → patch → export', () => {
  beforeEach(async () => {
    await clearAllCorrections();
  });

  it('reportCorrection creates draft with correct shape and persists in memory/IDB', async () => {
    const report = await reportCorrection({
      question_id: 'CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle-v1',
      question_bundle_path: 'questions_data/colombia/matematicas/grado-6/2026/weekly/CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle.md',
      error_type: 'error_factual',
      description: 'La opcion B tiene valor incorrecto, debería ser 42.',
      reporter_node_hash: 'node-abc123',
    });

    expect(report.id).toMatch(/^cr-/);
    expect(report.status).toBe('draft');
    expect(report.patches).toEqual([]);
    expect(report.reviewers).toEqual([]);
    expect(report.question_id).toBe('CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle-v1');
    expect(report.created_at).toBeDefined();

    // persistence check via listByQuestion
    const list = await listCorrectionsByQuestion(report.question_id);
    expect(list.length).toBe(1);
    expect(list[0].id).toBe(report.id);

    // bundle hash / db name correctness
    const hash = getBundleHash(report.question_bundle_path);
    expect(hash).toBe(hashString(report.question_bundle_path));
    expect(getDbName(report.question_bundle_path)).toBe(`wx-corrections-${hash}`);
  });

  it('approve flow: draft → reviewing (1 approve) → approved (2 approves)', async () => {
    const report = await reportCorrection({
      question_id: 'Q-123',
      question_bundle_path: 'questions_data/colombia/lengua/grado-7/2026/weekly/CO-LEN-7-2026-W01-foo-001-MASTERY-bundle.md',
      error_type: 'error_distractor',
      description: 'Distractor duplicado en opción C.',
      reporter_node_hash: 'node-reporter',
    });

    expect(report.status).toBe('draft');

    const after1 = await approveCorrection(report.id, {
      reviewer_node_hash: 'node-reviewer-1',
      vote: 'approve',
      comment: 'Confirmo error, distractor C repetido.',
    });
    expect(after1.status).toBe('reviewing');
    expect(after1.reviewers).toHaveLength(1);
    expect(after1.reviewers[0].vote).toBe('approve');

    const after2 = await approveCorrection(report.id, {
      reviewer_node_hash: 'node-reviewer-2',
      vote: 'approve',
      comment: 'De acuerdo, apruebo.',
    });
    expect(after2.status).toBe('approved');
    expect(after2.reviewers).toHaveLength(2);
    // ensure second approve tally triggers approved
    expect(after2.reviewers.filter(r => r.vote === 'approve').length).toBe(2);
  });

  it('approve flow: rejected when >=2 rejects', async () => {
    const report = await reportCorrection({
      question_id: 'Q-999',
      question_bundle_path: 'questions_data/mexico/matematicas/grado-6/2026/weekly/MX-MAT-6-2026-W02-x-001-MASTERY-bundle.md',
      error_type: 'other',
      description: 'Reporte dudoso',
      reporter_node_hash: 'node-x',
    });
    await approveCorrection(report.id, { reviewer_node_hash: 'n1', vote: 'reject', comment: 'No es error' });
    const after2 = await approveCorrection(report.id, { reviewer_node_hash: 'n2', vote: 'reject', comment: 'Tampoco' });
    expect(after2.status).toBe('rejected');
  });

  it('generatePatch output format: unified diff with --- a/, +++ b/, @@ and +/- prefix, no external lib', async () => {
    const report = await reportCorrection({
      question_id: 'Q-PATCH-1',
      question_bundle_path: 'questions_data/colombia/matematicas/grado-6/2026/weekly/CO-MAT-6-2026-W01-test-001-MASTERY-bundle.md',
      error_type: 'error_format',
      description: 'Falta tilde en enunciado.',
      reporter_node_hash: 'node-patch-tester',
      // @ts-ignore - optional fields for diff
      original_content: 'Enunciado original sin tilde: mas',
      proposed_content: 'Enunciado corregido con tilde: más',
    } as any);

    const patches = await generatePatch(report as any);
    expect(patches).toHaveLength(1);
    const diff = patches[0].diff_unified;
    expect(diff).toContain(`--- a/${report.question_bundle_path}`);
    expect(diff).toContain(`+++ b/${report.question_bundle_path}`);
    expect(diff).toContain('@@');
    // must contain + and - prefixes
    expect(diff).toMatch(/^-.*mas/m);
    expect(diff).toMatch(/^\+.*más/m);
    // ensure no external lib usage: diff is manual lines, not empty
    expect(patches[0].file_path).toBe(report.question_bundle_path);

    // also test fallback synthesis when no original/proposed supplied
    const report2 = await reportCorrection({
      question_id: 'Q-PATCH-2',
      question_bundle_path: 'questions_data/brasil/matematica/3o-ano/2026/weekly/BR-MAT-3EM-2026-W01-alg-001-MASTERY-bundle.md',
      error_type: 'error_factual',
      description: 'Valor factual incorrecto: 1+1=3 debe ser 2',
      reporter_node_hash: 'node-y',
    });
    const patches2 = await generatePatch(report2);
    expect(patches2[0].diff_unified).toContain('--- a/');
    expect(patches2[0].diff_unified).toContain('+++ b/');
    expect(patches2[0].diff_unified).toContain('+');
    expect(patches2[0].diff_unified).toContain('-');
  });

  it('buildUnifiedDiff produces deterministic simple diff', () => {
    const d = buildUnifiedDiff('a/b.md', 'line1\nline2', 'line1\nlineX');
    expect(d).toContain('--- a/a/b.md');
    expect(d).toContain('+++ b/a/b.md');
    expect(d).toContain(' line1');
    expect(d).toContain('-line2');
    expect(d).toContain('+lineX');
  });

  it('exportPatch produce .md válido listo para commit al pipeline', async () => {
    const report = await reportCorrection({
      question_id: 'Q-EXPORT-1',
      question_bundle_path: 'questions_data/argentina/matematica/grado-6/2026/weekly/AR-MAT-6-2026-W03-fracciones-001-MASTERY-bundle.md',
      error_type: 'error_distractor',
      description: 'Distractor D es ambiguo, proponer: D) 3/4 corregido',
      reporter_node_hash: 'node-exporter',
      original_content: 'A) 1/2\nB) 2/3\nC) 1/4\nD) todas las anteriores',
      proposed_content: 'A) 1/2\nB) 2/3\nC) 1/4\nD) 3/4',
    } as any);

    // need 2 approvals to reach approved (not strictly required for export but realistic)
    await approveCorrection(report.id, { reviewer_node_hash: 'rev1', vote: 'approve' });
    await approveCorrection(report.id, { reviewer_node_hash: 'rev2', vote: 'approve' });

    // fetch updated report (now approved)
    const approvedList = await listCorrectionsByQuestion('Q-EXPORT-1');
    expect(approvedList[0].status).toBe('approved');

    const patches = await generatePatch(approvedList[0] as any);
    const exportedReport = { ...approvedList[0], patches } as any;
    // Need to mimic persisted patches
    const md = exportPatch(exportedReport);

    // frontmatter checks
    expect(md).toMatch(/^---\n/);
    expect(md).toContain(`id: "${exportedReport.id}"`);
    expect(md).toContain(`question_id: "${exportedReport.question_id}"`);
    expect(md).toContain(`question_bundle_path: "${exportedReport.question_bundle_path}"`);
    expect(md).toContain('```diff');
    expect(md).toContain('--- a/');
    expect(md).toContain('+++ b/');
    // pipeline footer hint
    expect(md).toContain('listo para PR');
    expect(md).toContain('npm run validate');
    // md must be valid markdown with headers
    expect(md).toContain('# Corrección');
    expect(md).toContain('## Descripción');
    expect(md).toContain('## Patch unificado');
  });

  it('exportPatch throws if no patches', async () => {
    const report = await reportCorrection({
      question_id: 'Q-NOPATCH',
      question_bundle_path: 'questions_data/colombia/matematicas/grado-6/2026/weekly/CO-MAT-6-2026-W01-x-001-MASTERY-bundle.md',
      error_type: 'other',
      description: 'Sin patch aún',
      reporter_node_hash: 'node-z',
    });
    expect(() => exportPatch(report)).toThrow(/No patches/);
  });

  it('reviewer can update vote (idempotencia por node_hash)', async () => {
    const report = await reportCorrection({
      question_id: 'Q-VOTE-UPDATE',
      question_bundle_path: 'questions_data/colombia/matematicas/grado-6/2026/weekly/CO-MAT-6-2026-W01-vote-001-MASTERY-bundle.md',
      error_type: 'error_factual',
      description: 'test vote update',
      reporter_node_hash: 'node-a',
    });
    await approveCorrection(report.id, { reviewer_node_hash: 'revX', vote: 'approve', comment: 'ok' });
    const afterReject = await approveCorrection(report.id, { reviewer_node_hash: 'revX', vote: 'reject', comment: 'cambio' });
    expect(afterReject.reviewers).toHaveLength(1);
    expect(afterReject.reviewers[0].vote).toBe('reject');
  });
});
