/**
 * WX-303 — Collaborative Corrections Pipeline (Draft → Review → Patch export)
 * Protocol Version: 5.2
 *
 * Provides functions to create correction drafts, review correction proposals (nodal vote tally),
 * and export unified .md patches matching v5.2 frontmatter protocol.
 * Note: Patches are generated as in-memory .md content string; exportPatch NEVER auto-publishes to questions_data/.
 */

import {
  reportCorrection,
  approveCorrection,
  generatePatch,
  getCorrection,
  listCorrectionsByQuestion,
  listAllCorrections,
  clearAllCorrections,
} from './CorrectionEngine';
import type {
  CorrectionReport,
  CreateCorrectionInput,
  ApproveInput,
  Patch,
} from './types';

export * from './types';
export {
  getCorrection,
  listCorrectionsByQuestion,
  listAllCorrections,
  clearAllCorrections,
  generatePatch,
};

export const PROTOCOL_VERSION = '5.2';

/**
 * Creates a new draft correction report.
 * Validates description length (100 to 1000 characters per pipeline specification).
 */
export async function createCorrection(
  input: CreateCorrectionInput & { id?: string }
): Promise<CorrectionReport> {
  const desc = (input.description || '').trim();
  if (desc.length < 100 || desc.length > 1000) {
    throw new Error(`Description must be between 100 and 1000 characters (got ${desc.length})`);
  }

  return reportCorrection(input);
}

/**
 * Submits a reviewer vote (approve or reject) for a correction report.
 * Nodal voting: tallying >= 2 approvals moves status to 'approved', >= 2 rejects to 'rejected'.
 */
export async function reviewCorrection(
  id: string,
  reviewer: ApproveInput & { timestamp?: string },
  bundlePathHint?: string
): Promise<CorrectionReport> {
  return approveCorrection(id, reviewer, bundlePathHint);
}

/**
 * Exports an approved correction as a standalone v5.2 .md patch string with YAML frontmatter.
 * Never writes directly to questions_data/ to prevent accidental auto-publishing.
 */
export function exportPatch(correction: CorrectionReport): string {
  let patches = correction.patches;

  // Synthesize diff patch if none exists
  if (!patches || patches.length === 0) {
    const filePath = correction.question_bundle_path || 'unknown.md';
    const patchContent = [
      `--- a/${filePath}`,
      `+++ b/${filePath}`,
      `@@ -1,5 +1,6 @@`,
      ` ## Question ${correction.question_id}`,
      ` <!-- Error type: ${correction.error_type} -->`,
      `-<!-- Reported error: placeholder -->`,
      `+${correction.description}`,
    ].join('\n');

    patches = [
      {
        file_path: filePath,
        diff_unified: patchContent,
      },
    ];
  }

  const exportedAt = new Date().toISOString();
  const approvalsCount = correction.reviewers.filter((r) => r.vote === 'approve').length;

  const frontmatter = [
    '---',
    `id: "${correction.id}"`,
    `question_id: "${correction.question_id}"`,
    `question_bundle_path: "${correction.question_bundle_path}"`,
    `error_type: "${correction.error_type}"`,
    `status: "${correction.status}"`,
    `reporter_node_hash: "${correction.reporter_node_hash}"`,
    `created_at: "${correction.created_at}"`,
    `exported_at: "${exportedAt}"`,
    `protocol_version: "${PROTOCOL_VERSION}"`,
    `reviewers: ${correction.reviewers.length}`,
    `approvals: ${approvalsCount}`,
    '---',
    '',
  ].join('\n');

  const header = [
    `# Correction Patch — ${correction.id}`,
    '',
    `> Protocol: **v5.2** | Status: **${correction.status}** | Target: \`${correction.question_bundle_path}\``,
    '',
    `## Question ${correction.question_id}`,
    '',
    `### Description`,
    correction.description,
    '',
    `### Review Tally`,
    correction.reviewers.length === 0
      ? '_No reviewer votes recorded._'
      : correction.reviewers
          .map(
            (r) =>
              `- Node **${r.reviewer_node_hash}**: **${r.vote}** (${r.timestamp})${
                r.comment ? ` — _${r.comment}_` : ''
              }`
          )
          .join('\n'),
    '',
    `### Patch Diff (v5.2)`,
    '',
  ].join('\n');

  const patchBlocks = patches
    .map(
      (p: Patch) =>
        `#### \`${p.file_path}\`\n\n\`\`\`diff\n${p.diff_unified}\n\`\`\`\n`
    )
    .join('\n');

  const footer = [
    '---',
    '*Note: This export patch string must be reviewed and merged manually via PR. It is never auto-published to questions_data/.*',
  ].join('\n');

  return `${frontmatter}${header}${patchBlocks}\n${footer}\n`;
}
