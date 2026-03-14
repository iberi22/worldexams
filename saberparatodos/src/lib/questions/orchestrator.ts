import type { AppQuestion } from '../api-service';
import { CEFR_LEVEL_NUM } from '../english-proficiency';
import { filterByGradeAndDiagnostic, filterByPeriod, filterBySubject, filterValidQuestions, filterByCefrLevel } from './filters';
import { ensureBasePool, deepSearchPool, dedupeById } from './pool';
import { buildDiagnosticMixPool, selectExamQuestions } from './selection';
import type { QuestionSelectionDeps, QuestionSelectionRequest, QuestionSelectionResult } from './types';
import { buildPreuExamPool, getPreuQuestionBank } from '../preuniversitario/exam-pool';
import { filterGrade11PreicfesReady } from './policy';

export async function loadEnglishDiagnosticPool(
  deps: QuestionSelectionDeps,
  limit: number = 100,
  cefrLevelNum?: number
): Promise<AppQuestion[]> {
  return deps.repository.fetchEnglishQuestionsAllGrades(limit, true, cefrLevelNum);
}

export async function prepareSoloExamQuestions(
  request: QuestionSelectionRequest,
  deps: QuestionSelectionDeps,
  currentPool: AppQuestion[] = []
): Promise<QuestionSelectionResult> {
  const warnings: string[] = [];
  let pool = [...currentPool];
  const isPreuMode = String(request.subject || '').toLowerCase() === 'preuniversitario';

  if (!request.englishDiagnostic) {
    pool = await ensureBasePool({
      repository: deps.repository,
      loadedQuestions: pool,
      grade: request.grade,
      subject: isPreuMode ? null : request.subject,
      threshold: isPreuMode ? 100 : 50,
      maxQuestions: isPreuMode ? 300 : 200
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

  if (isPreuMode) {
    const localPreuQuestions = getPreuQuestionBank(request.preuUniversity);
    if (localPreuQuestions.length === 0 && request.preuUniversity) {
      warnings.push(`No se encontraron preguntas PREU para ${request.preuUniversity}. Se usará el banco PREU general.`);
      pool = dedupeById([...pool, ...getPreuQuestionBank()]);
    } else {
      pool = dedupeById([...pool, ...localPreuQuestions]);
    }

    const preuPool = buildPreuExamPool(pool, request.count, request.preuUniversity);
    const { validQuestions, invalidCount } = filterValidQuestions(preuPool, 2);
    if (invalidCount > 0) {
      warnings.push(`Se omitieron ${invalidCount} preguntas inválidas del pool PREU.`);
    }

    if (validQuestions.length === 0) {
      throw new Error('No hay preguntas PREU válidas disponibles para esta configuración.');
    }

    const { selectedQuestions, hadToRepeat } = selectExamQuestions(validQuestions, request.count, deps.filterUnansweredQuestions);

    return {
      pool,
      selectedQuestions: filterValidQuestions(selectedQuestions, 2).validQuestions,
      hadToRepeat,
      warnings,
    };
  }

  let filtered = filterBySubject(pool, request.subject);

  // 🆕 For English Diagnostic, if pool is empty, fetch it with level awareness
  if (request.englishDiagnostic && filtered.length === 0) {
    const cefrNum = request.minCefrLevel ? (CEFR_LEVEL_NUM as any)[request.minCefrLevel] : undefined;
    const diagnosticPool = await deps.repository.fetchEnglishQuestionsAllGrades(100, true, cefrNum);
    pool = dedupeById([...pool, ...diagnosticPool]);
    filtered = filterBySubject(pool, request.subject);
  }

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
  filtered = filterGrade11PreicfesReady(filtered);

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
    filtered = filterGrade11PreicfesReady(filtered);
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
