// Corpus-level checks that need to see more than one file.
//
// The per-file gate cannot catch the defect that produced most of the debt: a
// python generator that hard-codes a handful of stems and copies them into every
// week of every country. Each copy validates perfectly on its own. Only a view
// across the corpus shows that 9500 questions are 2292 stems, that twelve of
// them appear 278 times each, and that the same feedback string is reused on
// every one of those clones.
//
// Both checks below are conservative on purpose. A clone is not automatically
// wrong, and a repeated feedback string is not automatically wrong, so each one
// reports at the threshold where the pattern stops looking like pedagogy.

export const REASON_CLONE_MIN = 3; // same stem in N distinct bundles
export const FEEDBACK_REUSE_MIN = 20; // same feedback string on N distinct stems

/**
 * Group bundles by the normalised stem of each question.
 * @param {Map<string, string[]>} stemToBundles
 * @returns {{stem: string, bundles: string[], count: number}[]}
 */
export function findStemClones(stemToBundles, min = REASON_CLONE_MIN) {
  const out = [];
  for (const [stem, bundles] of stemToBundles) {
    if (bundles.length >= min) out.push({ stem, bundles, count: bundles.length });
  }
  return out.sort((a, b) => b.count - a.count);
}

/**
 * Group feedback strings by how many distinct stems they are attached to.
 * A feedback reused on hundreds of different stems is boilerplate, not an
 * explanation: it cannot be the reason for each of them.
 * @param {Map<string, Set<string>>} feedbackToStems
 */
export function findReusedFeedback(feedbackToStems, min = FEEDBACK_REUSE_MIN) {
  const out = [];
  for (const [feedback, stems] of feedbackToStems) {
    if (stems.size >= min) out.push({ feedback, count: stems.size });
  }
  return out.sort((a, b) => b.count - a.count);
}

/** Normalise a stem so that whitespace and case do not hide a clone. */
export function normaliseStem(stem) {
  return String(stem || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/** Normalise feedback for reuse counting, same reason. */
export function normaliseFeedback(feedback) {
  return String(feedback || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function summariseClones(clones, limit = 10) {
  if (!clones.length) return 'no cloned stems';
  const head = clones
    .slice(0, limit)
    .map((c) => `${c.count}x "${c.stem.slice(0, 60)}"`)
    .join('\n  ');
  const rest = clones.length > limit ? `\n  ... and ${clones.length - limit} more` : '';
  return `${clones.length} stems appear in 3+ bundles:\n  ${head}${rest}`;
}

export function summariseReuse(reused, limit = 10) {
  if (!reused.length) return 'no reused feedback';
  const head = reused
    .slice(0, limit)
    .map((r) => `${r.count}x "${r.feedback.slice(0, 60)}"`)
    .join('\n  ');
  const rest = reused.length > limit ? `\n  ... and ${reused.length - limit} more` : '';
  return `${reused.length} feedback strings are attached to 20+ distinct stems:\n  ${head}${rest}`;
}
