import type { AppQuestion } from '../api-service';
import { CEFR_LEVEL_NUM } from '../english-proficiency';
import { filterByGradeAndDiagnostic, filterByPeriod, filterBySubject, filterValidQuestions, filterByCefrLevel, applyFilters } from './filters';
import { ensureBasePool, deepSearchPool, dedupeById } from './pool';
import { buildDiagnosticMixPool, selectExamQuestions } from './selection';
import type { QuestionSelectionDeps, QuestionSelectionRequest, QuestionSelectionResult } from './types';
import { buildPreuExamPool, getPreuQuestionBank } from '../preuniversitario/exam-pool';
import { isPreuRuntimeEnabled } from '../preuniversitario/catalog';
import { filterGrade11PreicfesReady } from './policy';
import { subjectsMatch } from './subject';
import { getPoolActivation, type PoolActivation } from './pool-activation';

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

  // DEFENSIVE FIX: Detect English Diagnostic from subject string if flag wasn't set.
  // 'Inglés Diagnóstico' (with accents) may not match a plain-text check in the UI layer.
  const _subjectNormLower = String(request.subject || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const isImplicitEnglishDiagnostic =
    !request.englishDiagnostic &&
    _subjectNormLower.includes('ingles') &&
    _subjectNormLower.includes('diagnost');
  if (isImplicitEnglishDiagnostic) {
    console.warn('[Orchestrator] Detected English Diagnostic from subject string — overriding englishDiagnostic=true.');
    warnings.push('Modo diagnóstico de inglés detectado por nombre de materia.');
    request = { ...request, englishDiagnostic: true, grade: request.grade === 0 ? 0 : request.grade };
  }

  let activation: PoolActivation | null = null;
  if (!request.englishDiagnostic) {
    pool = await ensureBasePool({
      repository: deps.repository,
      loadedQuestions: pool,
      grade: request.grade,
      subject: isPreuMode ? null : request.subject,
      threshold: isPreuMode ? 100 : 50,
      maxQuestions: isPreuMode ? 300 : 200,
      period: request.examMode === 'period' ? request.period : undefined
    });

    // Condicional de activación (>100 por materia+periodo): con pool sólido
    // la ruta enriquecida sigue ACTIVA; con pool en maduración la lógica se
    // conserva pero queda DESACTIVADA por diseño (se arma con el pool básico).
    // Diagnóstico inglés (multi-grado por diseño) no se acota por grado.
    activation = getPoolActivation(pool, {
      grade: request.englishDiagnostic ? undefined : request.grade,
      subject: isPreuMode ? null : request.subject,
      period: request.examMode === 'period' ? request.period : undefined,
    });
    console.info('[Orchestrator] Pool activation:', activation.reason);

    if (request.useDiagnostic && request.grade > 3 && activation.active) {
      try {
        const lowerGrades = [3, 5, 7, 9].filter((g) => g < request.grade);
        const diagnosticQuestions = await deps.repository.fetchBulkQuestions(lowerGrades, 50);
        pool = dedupeById([...pool, ...diagnosticQuestions]);
      } catch {
        warnings.push('No se pudieron cargar preguntas diagnósticas de refuerzo.');
      }
    } else if (request.useDiagnostic && request.grade > 3 && !activation.active) {
      warnings.push(`Mezcla diagnóstica desactivada por diseño: ${activation.count}≤${activation.threshold} en la materia/periodo.`);
    }
  }

  if (isPreuMode) {
    if (!isPreuRuntimeEnabled(request.countryCode)) {
      throw new Error('Preuniversitario todavia no esta disponible para este tenant.');
    }

    const localPreuQuestions = getPreuQuestionBank(request.countryCode, request.preuUniversity);
    if (localPreuQuestions.length === 0 && request.preuUniversity) {
      warnings.push(`No se encontraron preguntas PREU para ${request.preuUniversity}. Se usará el banco PREU general.`);
      pool = dedupeById([...pool, ...getPreuQuestionBank(request.countryCode)]);
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
  filtered = filterByGradeAndDiagnostic(filtered, request.grade, Boolean(request.useDiagnostic), Boolean(request.englishDiagnostic));

  // 🆕 For English, if current pool has insufficient questions of the selected CEFR level, load multi-grade level-aware pool
  if (subjectsMatch(request.subject, 'ingles') && (request.useDiagnostic || request.englishDiagnostic)) {
    const matchingCount = filterByCefrLevel(filtered, request.minCefrLevel).length;
    if (matchingCount < request.count) {
      const cefrNum = request.minCefrLevel ? CEFR_LEVEL_NUM[request.minCefrLevel] : undefined;
      const diagnosticPool = await deps.repository.fetchEnglishQuestionsAllGrades(100, true, cefrNum);
      pool = dedupeById([...pool, ...diagnosticPool]);
      filtered = filterByCefrLevel(filterBySubject(pool, request.subject), request.minCefrLevel);
    }
  }

  filtered = applyFilters(filtered, request);

  // Expansión deep-search: solo con pool sólido (activación >100). Con pool en
  // maduración la lógica se conserva pero queda DESACTIVADA por diseño: el
  // examen se arma con lo filtrado del pool básico (o falla con mensaje claro).
  if (filtered.length < request.count && !request.englishDiagnostic && activation?.active) {
    const searchPages = request.examMode === 'period' ? [1, 2, 3] : [1];
    const expandedPool = await deepSearchPool({
      repository: deps.repository,
      currentPool: pool,
      grade: request.grade,
      subject: request.subject,
      useDiagnostic: Boolean(request.useDiagnostic),
      pages: searchPages,
      period: request.examMode === 'period' ? request.period : undefined
    });

    pool = expandedPool;
    filtered = applyFilters(filterBySubject(expandedPool, request.subject), request);
  } else if (filtered.length < request.count && !request.englishDiagnostic && activation && !activation.active) {
    warnings.push(`Expansión deep-search desactivada por diseño: ${activation.count}≤${activation.threshold} en la materia/periodo.`);
  }

  if (filtered.length === 0) {
    console.error('[Orchestrator] No questions after filtering', {
      poolSize: pool.length,
      grade: request.grade,
      subject: request.subject,
      examMode: request.examMode,
      period: request.period,
      hasInglesSubject: pool.some(q => String(q.category || '').toLowerCase().includes('ingl')),
      sampleCategories: pool.slice(0, 5).map(q => q.category),
      sampleGrades: pool.slice(0, 5).map(q => q.grade)
    });
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
    const sample = filtered.slice(0, 3).map(q => ({
      id: q.id,
      hasText: !!q.text,
      hasCorrectId: !!q.correctOptionId,
      optionsCount: q.options?.length,
      sampleOption: q.options?.[0] ? { id: q.options[0].id, textLen: q.options[0].text?.length } : null
    }));
    console.error('[Orchestrator] All questions invalid (filterValidQuestions)', {
      filteredCount: filtered.length,
      invalidCount,
      sample
    });
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
