import {
  quarantinedBundleIds,
  quarantinedBundlePaths,
  quarantinedQuestionIds,
} from '../../generated/quarantine-manifest';

const quarantinedBundleIdSet = new Set<string>(quarantinedBundleIds);
const quarantinedBundlePathSet = new Set<string>(quarantinedBundlePaths);
const quarantinedQuestionIdSet = new Set<string>(quarantinedQuestionIds);

function normalizeValue(value: unknown): string {
  return String(value || '').trim();
}

function normalizePath(filePath: string | undefined): string {
  return normalizeValue(filePath).replace(/\\/g, '/').replace(/^\.?\//, '');
}

function parseBooleanLike(value: unknown): boolean {
  const normalized = normalizeValue(value).toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'yes';
}

function parseStatusLike(value: unknown): string {
  return normalizeValue(value).toLowerCase();
}

export function isBundleQuarantined(args: {
  bundleId?: unknown;
  filePath?: unknown;
  quarantine?: unknown;
  bundleStatus?: unknown;
}): boolean {
  const bundleId = normalizeValue(args.bundleId);
  const filePath = normalizePath(typeof args.filePath === 'string' ? args.filePath : undefined);

  if (parseBooleanLike(args.quarantine)) return true;
  if (parseStatusLike(args.bundleStatus) === 'quarantined') return true;
  if (bundleId && quarantinedBundleIdSet.has(bundleId)) return true;
  if (filePath && quarantinedBundlePathSet.has(filePath)) return true;
  return false;
}

export function isQuestionQuarantined(args: {
  questionId?: unknown;
  bundleId?: unknown;
  bundle_id?: unknown;
  filePath?: unknown;
  quarantine?: unknown;
  bundleStatus?: unknown;
}): boolean {
  const questionId = normalizeValue(args.questionId);
  if (questionId && quarantinedQuestionIdSet.has(questionId)) return true;

  return isBundleQuarantined({
    bundleId: args.bundleId || args.bundle_id,
    filePath: args.filePath,
    quarantine: args.quarantine,
    bundleStatus: args.bundleStatus,
  });
}

export function filterQuarantinedQuestions<T extends {
  id?: unknown;
  bundleId?: unknown;
  bundle_id?: unknown;
  quarantine?: unknown;
  bundleStatus?: unknown;
}>(questions: T[]): T[] {
  return questions.filter((question) => !isQuestionQuarantined({
    questionId: question.id,
    bundleId: question.bundleId,
    bundle_id: question.bundle_id,
    quarantine: question.quarantine,
    bundleStatus: question.bundleStatus,
  }));
}
