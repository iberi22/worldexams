const fs = require('fs');
let c = fs.readFileSync('E:/scripts-python/worldexams/saberparatodos/src/lib/questions/orchestrator.ts', 'utf8');

const firstBlock = `  filtered = filterByGradeAndDiagnostic(
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

const firstBlockAfter = `  filtered = applyFilters(filtered, request);`;

if (c.includes(firstBlock)) {
  c = c.replace(firstBlock, firstBlockAfter);
  fs.writeFileSync('E:/scripts-python/worldexams/saberparatodos/src/lib/questions/orchestrator.ts', c);
  console.log('replaced first filter block');
} else {
  console.log('first block NOT FOUND');
}
