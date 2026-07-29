/**
 * Publish a locally generated exam into the active edge-mesh salon (host only).
 */
import { p2p } from '../p2p-edge-mesh';
import {
  generateLocalExam,
  toMeshPreguntas,
  type ExamGenerateRequest,
  type ExamGenerateResult,
} from './exam-generator';
import { recordMejoraInterna } from '../mejora-interna-telemetry';

export async function hostGenerateAndPublishExam(
  req: ExamGenerateRequest,
): Promise<ExamGenerateResult> {
  const result = await generateLocalExam(req);
  if (result.questions.length === 0) {
    throw new Error(result.warning || 'No se generaron preguntas');
  }

  const meshQs = toMeshPreguntas(result.questions);
  try {
    await p2p.cargarPreguntas(meshQs);
  } catch (err) {
    // Room may still hold questions locally; peers sync on start_game broadcast.
    console.warn('[salon-exam] ExamenCompartido publish deferred:', err);
  }

  // Session metadata (not canonical frontmatter)
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(
      'swal.salon.examMeta',
      JSON.stringify({
        ...result.metadata,
        mode: result.mode,
        questionCount: result.questions.length,
      }),
    );
  }

  recordMejoraInterna('ai.salon.publish_exam', {
    count: result.questions.length,
    mode: result.mode,
    grade: req.grade,
    subject: req.subject,
  });

  return result;
}
