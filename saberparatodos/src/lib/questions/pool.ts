import type { AppQuestion } from '../api-service';
import type { QuestionRepository } from './types';
import { resolveApiSubject } from './subject';

export function dedupeById(questions: AppQuestion[]): AppQuestion[] {
  const dedupe = new Map<string, AppQuestion>();
  questions.forEach((q) => {
    if (q?.id && !dedupe.has(q.id)) dedupe.set(q.id, q);
  });
  return Array.from(dedupe.values());
}

/**
 * Carga acotada a UNA materia del grado, página por página (corta en página
 * vacía o al llegar a maxQuestions). Evita descargar el grado completo cuando
 * el examen pidió una sola materia. La rama de grado-completo se conserva
 * intacta para Simulacro (subject null) y como fallback.
 */
async function fetchSubjectScopedPool(params: {
  repository: QuestionRepository;
  grade: number;
  apiSubject: string;
  maxQuestions: number;
  period?: number;
}): Promise<AppQuestion[]> {
  const { repository, grade, apiSubject, maxQuestions, period } = params;
  const maxPages = Math.max(1, Math.min(10, Math.ceil(maxQuestions / 10)));
  const out: AppQuestion[] = [];
  for (let page = 1; page <= maxPages; page++) {
    const batch = await repository.fetchQuestions(grade, apiSubject, page, period);
    if (!batch || batch.length === 0) break;
    out.push(...batch);
    if (out.length >= maxQuestions) break;
  }
  return out;
}

export async function ensureBasePool(params: {
  repository: QuestionRepository;
  loadedQuestions: AppQuestion[];
  grade: number;
  subject: string | null;
  threshold?: number;
  maxQuestions?: number;
  period?: number;
}): Promise<AppQuestion[]> {
  const { repository, loadedQuestions, grade, subject, period } = params;
  const threshold = params.threshold ?? 100;
  const maxQuestions = params.maxQuestions ?? 300;

  const apiSubject = resolveApiSubject(subject);
  const inMemoryCount = loadedQuestions.filter((q) => q.grade === grade).filter((q) => {
    if (!apiSubject) return true;
    return String(q.category || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(apiSubject.replace(/_/g, ' '));
  }).length;

  if (inMemoryCount >= threshold) {
    return loadedQuestions;
  }

  // D3: examen de UNA materia => trae solo esa materia (no el grado entero).
  // Simulacro (apiSubject '') conserva la rama de grado-completo.
  if (apiSubject) {
    const fetched = await fetchSubjectScopedPool({ repository, grade, apiSubject, maxQuestions, period });
    return dedupeById([...loadedQuestions, ...fetched]);
  }

  const fetched = await repository.fetchAllQuestionsForGrade(grade, true, maxQuestions, period);
  return dedupeById([...loadedQuestions, ...fetched]);
}

export async function deepSearchPool(params: {
  repository: QuestionRepository;
  currentPool: AppQuestion[];
  grade: number;
  subject: string | null;
  useDiagnostic: boolean;
  pages?: number[];
  period?: number;
}): Promise<AppQuestion[]> {
  const { repository, currentPool, grade, subject, useDiagnostic, period } = params;
  const pages = params.pages || [1];
  const searchGrades = useDiagnostic && grade > 3
    ? [grade, ...[3, 5, 7, 9].filter((g) => g < grade)]
    : [grade];

  const apiSubject = resolveApiSubject(subject);
  const fetchPromises: Promise<AppQuestion[]>[] = [];

  searchGrades.forEach((searchGrade) => {
    pages.forEach((page) => {
      fetchPromises.push(repository.fetchQuestions(searchGrade, apiSubject, page, period));
    });
  });

  const fetched = (await Promise.all(fetchPromises)).flat();
  return dedupeById([...currentPool, ...fetched]);
}
