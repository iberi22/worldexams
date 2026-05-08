const fs = require('fs');
let c = fs.readFileSync('E:/scripts-python/worldexams/saberparatodos/src/lib/questions/orchestrator.ts', 'utf8');

// Remove the function that was placed before imports
const misplaced = `/**
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

`;

c = c.replace(misplaced, '');
fs.writeFileSync('E:/scripts-python/worldexams/saberparatodos/src/lib/questions/orchestrator.ts', c);
console.log('removed misplaced function');

const afterImports = `import { filterGrade11PreicfesReady } from './policy';

/**
 * Apply the core filter chain (grade, cefr, period, policy).
 */
function applyFilters(questions: AppQuestion[], request: { grade: number; subject: string; minCefrLevel?: string; examMode?: string; period?: string; useDiagnostic?: boolean; englishDiagnostic?: boolean }): AppQuestion[] {
  let filtered = questions;
  filtered = filterByGradeAndDiagnostic(filtered, request.grade, Boolean(request.useDiagnostic), Boolean(request.englishDiagnostic));
  filtered = filterByCefrLevel(filtered, request.minCefrLevel);
  filtered = filterByPeriod(filtered, { examMode: request.examMode, period: request.period, subject: request.subject, grade: request.grade });
  filtered = filterGrade11PreicfesReady(filtered);
  return filtered;
}

export async function loadEnglishDiagnosticPool(`;

c = c.replace("import { filterGrade11PreicfesReady } from './policy';\nexport async function loadEnglishDiagnosticPool(", afterImports);
fs.writeFileSync('E:/scripts-python/worldexams/saberparatodos/src/lib/questions/orchestrator.ts', c);
console.log('inserted function in correct position');
