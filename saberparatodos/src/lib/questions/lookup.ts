import type { AppQuestion } from '../api-service';
import type { QuestionRepository } from './types';

const SUBJECT_CODE_MAP: Record<string, string> = {
  LEC: 'lectura_critica',
  MAT: 'matematicas',
  CNAT: 'ciencias_naturales',
  SOC: 'sociales_y_ciudadanas',
  ING: 'ingles',
  FIL: 'filosofia',
  FIS: 'ciencias_naturales',
  QUI: 'ciencias_naturales',
  BIO: 'ciencias_naturales',
  CIE: 'ciencias_naturales',
  NAT: 'ciencias_naturales',
  LEN: 'lenguaje',
  TECN: 'tecnologia_informatica'
};

function findInPool(pool: AppQuestion[], qid: string): AppQuestion | null {
  const qidLower = qid.toLowerCase();
  const bundleId = qid.replace(/-v\d+$/i, '').toLowerCase();

  const found = pool.find((q) => {
    const id = String(q.id || '').toLowerCase();
    const bundle = String(q.bundleId || '').toLowerCase();
    return id === qidLower ||
      id === bundleId ||
      bundle === bundleId ||
      id.startsWith(bundleId) ||
      bundle.startsWith(bundleId);
  });

  return found || null;
}

export async function findQuestionById(params: {
  questionId: string;
  repository: QuestionRepository;
  getKnownQuestion?: (id: string) => Promise<AppQuestion | null>;
}): Promise<AppQuestion | null> {
  const { questionId, repository, getKnownQuestion } = params;
  const qid = String(questionId);

  const bulkQuestions = await repository.fetchBulkQuestions([3, 5, 6, 7, 8, 9, 10, 11], 500);
  const foundInBulk = findInPool(bulkQuestions, qid);
  if (foundInBulk) return foundInBulk;

  const parts = qid.split('-');
  if (parts.length >= 3) {
    const subjectCode = parts[1];
    const grade = parseInt(parts[2], 10) || 11;
    const subject = SUBJECT_CODE_MAP[subjectCode] || subjectCode.toLowerCase();

    let specificQuestions = await repository.fetchQuestions(grade, subject, 1);

    if (specificQuestions.length === 0 && subject === 'ciencias_naturales') {
      const allGrades = [3, 5, 6, 7, 8, 9, 10, 11];
      for (const g of allGrades) {
        if (g === grade) continue;
        const more = await repository.fetchQuestions(g, subject, 1);
        specificQuestions = [...specificQuestions, ...more];
      }
    }

    const foundSpecific = findInPool(specificQuestions, qid);
    if (foundSpecific) return foundSpecific;
  }

  if (getKnownQuestion) {
    return (await getKnownQuestion(qid)) || null;
  }

  return null;
}

