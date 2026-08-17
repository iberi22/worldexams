const fs = require('fs');
const file = 'saberparatodos/src/components/AdvancedSearch.svelte';
let content = fs.readFileSync(file, 'utf8');

const searchBlock = `  // Filter results
  $: filteredQuestions = questions.filter(q => {
    const normalizedQuery = normalizeText(debouncedQuery);

    // Text search (Smart Search across multiple fields)
    const matchesQuery = !debouncedQuery || (() => {
      const text = normalizeText(q.text);
      const category = normalizeText(q.category);
      const explanation = normalizeText(q.explanation);
      const id = normalizeText(q.id);
      const competencia = normalizeText(q.competencia);
      const grade = q.grade?.toString() || '';

      // Check all fields
      return text.includes(normalizedQuery) ||
             category.includes(normalizedQuery) ||
             explanation.includes(normalizedQuery) ||
             id.includes(normalizedQuery) ||
             competencia.includes(normalizedQuery) ||
             // Smart grade search (e.g. "grado 11", "11°", or just "11")
             grade === normalizedQuery ||
             \`grado \${grade}\` === normalizedQuery ||
             \`\${grade}°\` === normalizedQuery;
    })();

    // Grade filter
    const matchesGrade = !selectedGrade || q.grade === selectedGrade;

    // Subject filter (handles naming variations)
    const matchesSubject = subjectsMatch(q.category, selectedSubject);

    // Difficulty filter
    const matchesDifficulty = !selectedDifficulty || q.difficulty === selectedDifficulty;

    // Competencia filter
    const matchesCompetencia = !selectedCompetencia || q.competencia === selectedCompetencia;

    return matchesQuery && matchesGrade && matchesSubject && matchesDifficulty && matchesCompetencia;
  });

  // Group results by category
  $: groupedResults = filteredQuestions.reduce((acc, q) => {
    const category = q.category?.split(' > ')[0] || 'Sin categoría';
    if (!acc[category]) acc[category] = [];
    acc[category].push(q);
    return acc;
  }, {} as Record<string, any[]>);`;

const replaceBlock = `  // Filter results
  // ⚡ Bolt Optimization: Combine filtering and grouping into a single O(N) pass to avoid multiple array iterations
  let filteredQuestions: any[] = [];
  let groupedResults: Record<string, any[]> = {};

  $: {
    const normalizedQuery = normalizeText(debouncedQuery);
    const newFiltered: any[] = [];
    const newGrouped: Record<string, any[]> = {};

    for (const q of questions) {
      // Text search (Smart Search across multiple fields)
      const matchesQuery = !debouncedQuery || (() => {
        const text = normalizeText(q.text);
        const category = normalizeText(q.category);
        const explanation = normalizeText(q.explanation);
        const id = normalizeText(q.id);
        const competencia = normalizeText(q.competencia);
        const grade = q.grade?.toString() || '';

        // Check all fields
        return text.includes(normalizedQuery) ||
               category.includes(normalizedQuery) ||
               explanation.includes(normalizedQuery) ||
               id.includes(normalizedQuery) ||
               competencia.includes(normalizedQuery) ||
               // Smart grade search (e.g. "grado 11", "11°", or just "11")
               grade === normalizedQuery ||
               \`grado \${grade}\` === normalizedQuery ||
               \`\${grade}°\` === normalizedQuery;
      })();

      // Grade filter
      const matchesGrade = !selectedGrade || q.grade === selectedGrade;

      // Subject filter (handles naming variations)
      const matchesSubject = subjectsMatch(q.category, selectedSubject);

      // Difficulty filter
      const matchesDifficulty = !selectedDifficulty || q.difficulty === selectedDifficulty;

      // Competencia filter
      const matchesCompetencia = !selectedCompetencia || q.competencia === selectedCompetencia;

      if (matchesQuery && matchesGrade && matchesSubject && matchesDifficulty && matchesCompetencia) {
        newFiltered.push(q);
        const category = q.category?.split(' > ')[0] || 'Sin categoría';
        if (!newGrouped[category]) newGrouped[category] = [];
        newGrouped[category].push(q);
      }
    }

    filteredQuestions = newFiltered;
    groupedResults = newGrouped;
  }`;

content = content.replace(searchBlock, replaceBlock);
fs.writeFileSync(file, content, 'utf8');
