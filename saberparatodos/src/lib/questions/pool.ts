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

export async function ensureBasePool(params: {
  repository: QuestionRepository;
  loadedQuestions: AppQuestion[];
  grade: number;
  subject: string | null;
  threshold?: number;
  maxQuestions?: number;
}): Promise<AppQuestion[]> {
  const { repository, loadedQuestions, grade, subject } = params;
  const threshold = params.threshold ?? 100;
  const maxQuestions = params.maxQuestions ?? 300;

  const apiSubject = resolveApiSubject(subject);
  const inMemoryCount = loadedQuestions.filter((q) => q.grade === grade).filter((q) => {
    if (!apiSubject) return true;
    return String(q.category || '').toLowerCase().includes(apiSubject.replace(/_/g, ' '));
  }).length;

  if (inMemoryCount >= threshold) {
    return loadedQuestions;
  }

  const fetched = await repository.fetchAllQuestionsForGrade(grade, true, maxQuestions);
  return dedupeById([...loadedQuestions, ...fetched]);
}

export async function deepSearchPool(params: {
  repository: QuestionRepository;
  currentPool: AppQuestion[];
  grade: number;
  subject: string | null;
  useDiagnostic: boolean;
  pages?: number[];
}): Promise<AppQuestion[]> {
  const { repository, currentPool, grade, subject, useDiagnostic } = params;
  const pages = params.pages || [1];
  const searchGrades = useDiagnostic && grade > 3
    ? [grade, ...[3, 5, 7, 9].filter((g) => g < grade)]
    : [grade];

  const apiSubject = resolveApiSubject(subject);
  const fetchPromises: Promise<AppQuestion[]>[] = [];

  searchGrades.forEach((searchGrade) => {
    pages.forEach((page) => {
      fetchPromises.push(repository.fetchQuestions(searchGrade, apiSubject, page));
    });
  });

  const fetched = (await Promise.all(fetchPromises)).flat();
  return dedupeById([...currentPool, ...fetched]);
}
