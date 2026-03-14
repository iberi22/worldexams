
// src/lib/exam-core.ts

/**
 * Fisher-Yates shuffle algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Mix local questions with universal questions from the pool
 */
export function mixQuestionsForExam(
  localQuestions: any[],
  pool: any,
  grade: number,
  subject: string,
  universalPercentage: number = 30,
  _minLocal: number = 5
): any[] {
  // If no pool or no local questions, return local only
  if (!pool || !pool.all || pool.all.length === 0 || localQuestions.length === 0) {
    return shuffleArray([...localQuestions]);
  }

  // Don't mix universal questions for subjects that require local context
  const excludedSubjects = ['SOCIALES', 'CIUDADANAS', 'HISTORIA'];
  if (subject && excludedSubjects.some(s => subject.toUpperCase().includes(s))) {
    console.log('Subject excluded from universal mixing:', subject);
    return shuffleArray([...localQuestions]);
  }

  // Calculate how many universal questions to add
  const targetCount = localQuestions.length;
  const maxUniversal = Math.floor(targetCount * (universalPercentage / 100));

  // Filter universal questions by criteria
  let universalCandidates = [...pool.all];

  // Filter by grade if specified
  if (grade && pool.byGrade && pool.byGrade[grade]) {
    universalCandidates = pool.byGrade[grade];
  }

  // Filter by subject if specified (case insensitive)
  if (subject && pool.bySubject) {
    const subjectKey = Object.keys(pool.bySubject).find(
      k => k.toUpperCase().includes(subject.toUpperCase()) ||
           subject.toUpperCase().includes(k.toUpperCase())
    );
    if (subjectKey) {
      universalCandidates = pool.bySubject[subjectKey];
    }
  }

  // Get IDs of local questions to avoid duplicates
  const localIds = new Set(localQuestions.map(q => q.id));
  universalCandidates = universalCandidates.filter(q => !localIds.has(q.id));

  // Shuffle and select universal questions
  const shuffledUniversal = shuffleArray(universalCandidates);
  const universalToAdd = shuffledUniversal.slice(0, maxUniversal);

  console.log(`Mixing: ${localQuestions.length} local + ${universalToAdd.length} universal`);

  // Combine and shuffle
  const mixed = [...localQuestions, ...universalToAdd];
  return shuffleArray(mixed);
}

// Normalize subject name for comparison (removes accents, replaces separators)
export function normalizeSubject(subject: string): string {
  if (!subject) return '';
  return subject
    .toUpperCase()
    .normalize('NFD') // Decompose combined chars (like 'é' to 'e' + '́')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .replace(/[-_]/g, ' ')           // Replace hyphens/underscores with space
    .trim();
}

// Check if two subjects match (handles different naming conventions)
export function subjectsMatch(categorySubject: string, selectedSubject: string): boolean {
  if (!selectedSubject) return true;
  // Safety check
  if (!categorySubject) return false;

  const normalizedCategory = normalizeSubject(categorySubject.split(' :: ')[0]);
  const normalizedSelected = normalizeSubject(selectedSubject);

  return normalizedCategory === normalizedSelected ||
         normalizedCategory.startsWith(normalizedSelected) ||
         normalizedSelected.startsWith(normalizedCategory);
}
