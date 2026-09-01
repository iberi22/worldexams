import { describe, it, expect, beforeEach } from 'vitest';
import {
  createCorrection,
  reviewCorrection,
  exportPatch,
  getCorrection,
  listCorrectionsByQuestion,
  clearAllCorrections,
  PROTOCOL_VERSION,
} from './index';

describe('Corrections Pipeline — createCorrection, reviewCorrection, exportPatch', () => {
  beforeEach(async () => {
    await clearAllCorrections();
  });

  it('createCorrection creates a draft report and enforces 100-1000 character description length', async () => {
    const validDescription =
      'La opción B en la pregunta contiene un error factual en el cálculo de la aceleración. Debería ser 9.8 m/s² en lugar de 9.8 m/s.';

    expect(validDescription.length).toBeGreaterThanOrEqual(100);
    expect(validDescription.length).toBeLessThanOrEqual(1000);

    const report = await createCorrection({
      question_id: 'CO-FIS-11-2026-W01-cinematica-001-v1',
      question_bundle_path:
        'questions_data/colombia/fisica/grado-11/2026/weekly/CO-FIS-11-2026-W01-cinematica-001-MASTERY-bundle.md',
      error_type: 'error_factual',
      description: validDescription,
      reporter_node_hash: 'node-reporter-001',
    });

    expect(report.id).toMatch(/^cr-/);
    expect(report.status).toBe('draft');
    expect(report.question_id).toBe('CO-FIS-11-2026-W01-cinematica-001-v1');
    expect(report.reporter_node_hash).toBe('node-reporter-001');

    // Persistence check
    const fetched = await getCorrection(report.id);
    expect(fetched).not.toBeNull();
    expect(fetched?.id).toBe(report.id);

    // Short description rejection (< 100 chars)
    await expect(
      createCorrection({
        question_id: 'Q-SHORT',
        question_bundle_path: 'questions_data/test/bundle.md',
        error_type: 'error_format',
        description: 'Demasiado corto.',
        reporter_node_hash: 'node-x',
      })
    ).rejects.toThrow(/Description must be between 100 and 1000 characters/);

    // Long description rejection (> 1000 chars)
    const longDesc = 'A'.repeat(1001);
    await expect(
      createCorrection({
        question_id: 'Q-LONG',
        question_bundle_path: 'questions_data/test/bundle.md',
        error_type: 'error_format',
        description: longDesc,
        reporter_node_hash: 'node-x',
      })
    ).rejects.toThrow(/Description must be between 100 and 1000 characters/);
  });

  it('reviewCorrection updates reviewer votes and tallies nodal approvals/rejections correctly', async () => {
    const description =
      'El distractor C repite la misma respuesta que la opción A, lo cual genera ambigüedad en la selección de respuesta para el estudiante en el examen.';

    const report = await createCorrection({
      question_id: 'CO-MAT-10-2026-W02-funciones-001-v3',
      question_bundle_path:
        'questions_data/colombia/matematicas/grado-10/2026/weekly/CO-MAT-10-2026-W02-funciones-001-MASTERY-bundle.md',
      error_type: 'error_distractor',
      description,
      reporter_node_hash: 'node-reporter-002',
    });

    expect(report.status).toBe('draft');

    // Single approval -> 'reviewing'
    const afterFirstReview = await reviewCorrection(report.id, {
      reviewer_node_hash: 'node-reviewer-alpha',
      vote: 'approve',
      comment: 'Verificado, distractor C es duplicado.',
    });

    expect(afterFirstReview.status).toBe('reviewing');
    expect(afterFirstReview.reviewers).toHaveLength(1);
    expect(afterFirstReview.reviewers[0].vote).toBe('approve');

    // Second approval -> 'approved' (nodal approval threshold >= 2)
    const afterSecondReview = await reviewCorrection(report.id, {
      reviewer_node_hash: 'node-reviewer-beta',
      vote: 'approve',
      comment: 'Aprobado para corrección.',
    });

    expect(afterSecondReview.status).toBe('approved');
    expect(afterSecondReview.reviewers).toHaveLength(2);

    // Test rejection flow
    const rejectReport = await createCorrection({
      question_id: 'CO-MAT-10-2026-W02-funciones-001-v4',
      question_bundle_path:
        'questions_data/colombia/matematicas/grado-10/2026/weekly/CO-MAT-10-2026-W02-funciones-001-MASTERY-bundle.md',
      error_type: 'other',
      description:
        'Sugerencia de cambio de formato para mejorar lectura del texto en dispositivos móviles con pantallas pequeñas.',
      reporter_node_hash: 'node-reporter-003',
    });

    await reviewCorrection(rejectReport.id, {
      reviewer_node_hash: 'node-reviewer-1',
      vote: 'reject',
      comment: 'No aplica.',
    });
    const rejectedStatus = await reviewCorrection(rejectReport.id, {
      reviewer_node_hash: 'node-reviewer-2',
      vote: 'reject',
      comment: 'Rechazado por ser estilo preferencial.',
    });

    expect(rejectedStatus.status).toBe('rejected');
  });

  it('exportPatch generates standalone v5.2 .md patch string with frontmatter and does not auto-publish to questions_data', async () => {
    const description =
      'Corrección del enunciado en la pregunta 5: ajustar el valor del término constante a 15 para mantener consistencia con la clave de respuestas.';

    const report = await createCorrection({
      question_id: 'CO-MAT-8-2026-W03-algebra-001-v5',
      question_bundle_path:
        'questions_data/colombia/matematicas/grado-8/2026/weekly/CO-MAT-8-2026-W03-algebra-001-MASTERY-bundle.md',
      error_type: 'error_format',
      description,
      reporter_node_hash: 'node-reporter-004',
    });

    await reviewCorrection(report.id, { reviewer_node_hash: 'rev-1', vote: 'approve' });
    const approvedReport = await reviewCorrection(report.id, { reviewer_node_hash: 'rev-2', vote: 'approve' });

    expect(approvedReport.status).toBe('approved');

    const exportedMd = exportPatch(approvedReport);

    expect(exportedMd).toMatch(/^---\n/);
    expect(exportedMd).toContain(`protocol_version: "${PROTOCOL_VERSION}"`);
    expect(exportedMd).toContain(`id: "${approvedReport.id}"`);
    expect(exportedMd).toContain(`question_id: "${approvedReport.question_id}"`);
    expect(exportedMd).toContain(`status: "approved"`);
    expect(exportedMd).toContain('## Question CO-MAT-8-2026-W03-algebra-001-v5');
    expect(exportedMd).toContain('### Patch Diff (v5.2)');
    expect(exportedMd).toContain('never auto-published to questions_data/');
  });
});
