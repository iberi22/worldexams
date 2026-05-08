const fs = require('fs');
let c = fs.readFileSync('E:/scripts-python/worldexams/saberparatodos/src/lib/questions/orchestrator.ts', 'utf8');

// Replace first filter block (lines 99-112)
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
  }`;

const firstBlockAfter = `  filtered = applyFilters(filtered, request);

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
    filtered = applyFilters(filterBySubject(expandedPool, request.subject), request);
  }`;

if (c.includes(firstBlock)) {
  c = c.replace(firstBlock, firstBlockAfter);
  fs.writeFileSync('E:/scripts-python/worldexams/saberparatodos/src/lib/questions/orchestrator.ts', c);
  console.log('replaced first filter block');
} else {
  console.log('first block NOT FOUND');
  // Debug
  const idx = c.indexOf('filterByGradeAndDiagnostic');
  console.log(JSON.stringify(c.substring(idx, idx + 500)));
}
