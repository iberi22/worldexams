import type { AppQuestion } from '../api-service';
import { filterByGradeAndDiagnostic, filterByPeriod, filterBySubject, filterValidQuestions, filterByCefrLevel } from './filters';
import { ensureBasePool, deepSearchPool, dedupeById } from './pool';
import { buildDiagnosticMixPool, selectExamQuestions } from './selection';
import type { QuestionSelectionDeps, QuestionSelectionRequest, QuestionSelectionResult } from './types';

export async function loadEnglishDiagnosticPool(
  deps: QuestionSelectionDeps,
  limit: number = 100
): Promise<AppQuestion[]> {
  return deps.repository.fetchEnglishQuestionsAllGrades(limit, true);
}

export async function prepareSoloExamQuestions(
  request: QuestionSelectionRequest,
  deps: QuestionSelectionDeps,
  currentPool: AppQuestion[] = []
): Promise<QuestionSelectionResult> {
  const warnings: string[] = [];
  let pool = [...currentPool];

  if (!request.englishDiagnostic) {
    pool = await ensureBasePool({
      repository: deps.repository,
      loadedQuestions: pool,
      grade: request.grade,
      subject: request.subject,
      threshold: 50,
      maxQuestions: 200
    });

    if (request.useDiagnostic && request.grade > 3) {
      try {
        const lowerGrades = [3, 5, 7, 9].filter((g) => g < request.grade);
        const diagnosticQuestions = await deps.repository.fetchBulkQuestions(lowerGrades, 50);
        pool = dedupeById([...pool, ...diagnosticQuestions]);
      } catch {
        warnings.push('No se pudieron cargar preguntas diagnósticas de refuerzo.');
      }
    }
  }

  let filtered = filterBySubject(pool, request.subject);
  filtered = filterByGradeAndDiagnostic(
    filtered,
    request.grade,
    Boolean(request.useDiagnostic),
    Boolean(request.englishDiagnostic)
  );
  filtered = filterByCefrLevel(filtered, request.minCefrLevel);
  filtered = filterByPeriod(filtered, {
    examMode: request.examMode,
    period: request.period,
    subject: request.subject,
    grade: request.grade
  });

  if (filtered.length < request.count && !request.englishDiagnostic) {
    const expandedPool = await deepSearchPool({
      repository: deps.repository,
      currentPool: pool,
      grade: request.grade,
      subject: request.subject,
      useDiagnostic: Boolean(request.useDiagnostic),
      pages: [1]
    });

    pool = expandedPool;
    filtered = filterBySubject(expandedPool, request.subject);
    filtered = filterByGradeAndDiagnostic(
      filtered,
      request.grade,
      Boolean(request.useDiagnostic),
      Boolean(request.englishDiagnostic)
    );
    filtered = filterByCefrLevel(filtered, request.minCefrLevel);
    filtered = filterByPeriod(filtered, {
      examMode: request.examMode,
      period: request.period,
      subject: request.subject,
      grade: request.grade
    });
  }

  if (filtered.length === 0) {
    throw new Error('No hay preguntas disponibles para esta configuración.');
  }

  if (request.strictPeriod && request.examMode === 'period' && filtered.length < request.count) {
    throw new Error(`No hay suficientes preguntas del periodo ${request.period}. Encontradas: ${filtered.length}/${request.count}.`);
  }

  const { validQuestions, invalidCount } = filterValidQuestions(filtered, 2);
  if (invalidCount > 0) {
    warnings.push(`Se omitieron ${invalidCount} preguntas inválidas del pool.`);
  }

  if (validQuestions.length === 0) {
    throw new Error('No se encontraron preguntas válidas con al menos 2 opciones.');
  }

  const mixPool = buildDiagnosticMixPool(validQuestions, {
    grade: request.grade,
    useDiagnostic: Boolean(request.useDiagnostic),
    diagnosticMixPercent: request.diagnosticMixPercent,
    count: request.count,
    minCefrLevel: request.minCefrLevel // 🆕
  });

  const { selectedQuestions, hadToRepeat } = selectExamQuestions(mixPool, request.count, deps.filterUnansweredQuestions);
  const validatedSelection = filterValidQuestions(selectedQuestions, 2).validQuestions;

  if (validatedSelection.length === 0) {
    throw new Error('No se encontraron preguntas válidas para armar el examen.');
  }

  return {
    pool,
    selectedQuestions: validatedSelection,
    hadToRepeat,
    warnings
  };
}

export async function prepareRoomQuestions(
  request: QuestionSelectionRequest,
  deps: QuestionSelectionDeps,
  currentPool: AppQuestion[] = []
): Promise<QuestionSelectionResult> {
  const result = await prepareSoloExamQuestions(
    {
      ...request,
      strictPeriod: false
    },
    deps,
    currentPool
  );

  // For room generation we do not force memory history recycling.
  if (result.selectedQuestions.length > request.count) {
    result.selectedQuestions = result.selectedQuestions.slice(0, request.count);
  }

  if (result.selectedQuestions.length < request.count) {
    result.warnings.push(
      `Solo se encontraron ${result.selectedQuestions.length} preguntas válidas de ${request.count} solicitadas.`
    );
  }

  return result;
}
