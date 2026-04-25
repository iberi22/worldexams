const fs = require('fs');
let c = fs.readFileSync('E:/scripts-python/worldexams/saberparatodos/src/lib/questions/orchestrator.ts', 'utf8');

const before = "import type { AppQuestion } from '../api-service';";
const after = `/**
 * Apply the core filter chain (grade, cefr, period, policy).
 */
function applyFilters(questions, request) {
  let filtered = questions;
  filtered = filterByGradeAndDiagnostic(filtered, request.grade, Boolean(request.useDiagnostic), Boolean(request.englishDiagnostic));
  filtered = filterByCefrLevel(filtered, request.minCefrLevel);
  filtered = filterByPeriod(filtered, { examMode: request.examMode, period: request.period, subject: request.subject, grade: request.grade });
  filtered = filterGrade11PreicfesReady(filtered);
  return filtered;
}

import type { AppQuestion } from '../api-service';`;

if (c.includes(before)) {
  c = c.replace(before, after);
  fs.writeFileSync('E:/scripts-python/worldexams/saberparatodos/src/lib/questions/orchestrator.ts', c);
  console.log('replaced import');
} else {
  console.log('NOT FOUND - import');
}

const firstBlock = `  filtered = filterBySubject(pool, request.subject);

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
  filtered = filterGrade11PreicfesReady(filtered);`;

const firstBlockAfter = `  filtered = filterBySubject(pool, request.subject);

  if (request.englishDiagnostic && filtered.length === 0) {
    const cefrNum = request.minCefrLevel ? (CEFR_LEVEL_NUM as any)[request.minCefrLevel] : undefined;
    const diagnosticPool = await deps.repository.fetchEnglishQuestionsAllGrades(100, true, cefrNum);
    pool = dedupeById([...pool, ...diagnosticPool]);
    filtered = filterBySubject(pool, request.subject);
  }

  filtered = applyFilters(filtered, request);`;

if (c.includes(firstBlock)) {
  c = c.replace(firstBlock, firstBlockAfter);
  fs.writeFileSync('E:/scripts-python/worldexams/saberparatodos/src/lib/questions/orchestrator.ts', c);
  console.log('replaced first filter block');
} else {
  console.log('first block NOT FOUND');
}

const secondBlock = `    pool = expandedPool;
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
    filtered = filterGrade11PreicfesReady(filtered);`;

const secondBlockAfter = `    pool = expandedPool;
    filtered = applyFilters(filterBySubject(expandedPool, request.subject), request);`;

if (c.includes(secondBlock)) {
  c = c.replace(secondBlock, secondBlockAfter);
  fs.writeFileSync('E:/scripts-python/worldexams/saberparatodos/src/lib/questions/orchestrator.ts', c);
  console.log('replaced second filter block');
} else {
  console.log('second block NOT FOUND');
}
