/**
 * Utility functions for grouping questions with identical shared reading context in ExamView.
 * Export groupQuestionsByContext definition and usage reference.
 */

export interface QuestionContextItem {
  id: string | number;
  context?: string;
}

export interface ContextGroup {
  context: string;
  questionIds: (string | number)[];
  isLong: boolean;
  startIndex: number;
}

/**
 * Same threshold rule as SharedContextLayout.svelte:
 * A context is long if trimmed length >= 140 or contains a newline character.
 */
export function isLongContextText(context?: string): boolean {
  const cleanContext = (context || '').trim();
  return cleanContext.length >= 140 || cleanContext.includes('\n');
}

/**
 * Groups CONSECUTIVE questions with identical context.trim().
 * Empty or whitespace-only context creates an individual single-question group.
 * Non-consecutive repeated contexts break group boundaries into separate groups.
 */
export function groupQuestionsByContext(
  questions: QuestionContextItem[]
): ContextGroup[] {
  // groupQuestionsByContext implementation
  if (!questions || questions.length === 0) {
    return [];
  }

  const groups: ContextGroup[] = [];
  let currentGroup: ContextGroup | null = null;

  questions.forEach((q, idx) => {
    const rawContext = q.context || '';
    const cleanContext = rawContext.trim();
    const isLong = isLongContextText(cleanContext);

    // Empty or whitespace-only contexts do not form shared groups
    if (cleanContext.length === 0) {
      groups.push({
        context: '',
        questionIds: [q.id],
        isLong: false,
        startIndex: idx
      });
      currentGroup = null;
      return;
    }

    if (currentGroup && currentGroup.context === cleanContext) {
      currentGroup.questionIds.push(q.id);
    } else {
      currentGroup = {
        context: cleanContext,
        questionIds: [q.id],
        isLong,
        startIndex: idx
      };
      groups.push(currentGroup);
    }
  });

  return groups;
}

/**
 * Determines if a short inline context badge should be displayed for a question.
 * For short contexts, the badge is shown ONLY on the first question of the group.
 */
export function shouldShowInlineBadge(
  group: ContextGroup | null | undefined,
  indexInExam: number
): boolean {
  if (!group || !group.context || group.isLong) {
    return false;
  }
  return indexInExam === group.startIndex;
}

/**
 * Returns a title for the shared context panel or inline badge header.
 * Formats as "Lectura compartida · preguntas X–Y" when the group is long
 * and contains 2 or more questions. Otherwise defaults to "Contexto de Lectura".
 */
export function getSharedContextTitle(
  group: ContextGroup | null | undefined
): string {
  if (group && group.isLong && group.questionIds.length >= 2) {
    const startNum = group.startIndex + 1;
    const endNum = group.startIndex + group.questionIds.length;
    return `Lectura compartida · preguntas ${startNum}–${endNum}`;
  }
  return 'Contexto de Lectura';
}

/**
 * Returns the effective context text to render for a given question.
 * - For long contexts, returns questionContext.
 * - For short contexts, returns questionContext ONLY if indexInExam corresponds
 *   to the first question of the group (shouldShowInlineBadge).
 * - Otherwise returns empty string.
 */
export function getEffectiveContextFor(
  group: ContextGroup | null | undefined,
  questionContext?: string,
  indexInExam: number = 0
): string {
  if (!questionContext) return '';
  if (group?.isLong) return questionContext;
  if (shouldShowInlineBadge(group, indexInExam)) {
    return questionContext;
  }
  return '';
}
