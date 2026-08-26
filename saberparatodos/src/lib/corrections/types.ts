/**
 * WX-303 — Corrección colaborativa types
 * CorrectionReport -> draft -> reviewing -> approved/rejected -> patch exportable
 */

export type CorrectionErrorType = 'error_factual' | 'error_format' | 'error_distractor' | 'other';

export type CorrectionStatus = 'draft' | 'reviewing' | 'approved' | 'rejected';

export type ReviewVote = 'approve' | 'reject';

export interface Patch {
  file_path: string;
  diff_unified: string;
}

export interface Review {
  reviewer_node_hash: string;
  vote: ReviewVote;
  comment: string;
  timestamp: string; // ISO string
}

export interface CorrectionReport {
  id: string;
  question_id: string;
  question_bundle_path: string;
  error_type: CorrectionErrorType;
  description: string;
  reporter_node_hash: string;
  created_at: string; // ISO string
  status: CorrectionStatus;
  patches: Patch[];
  reviewers: Review[];
}

/** Input for creating a new report (server generates id, timestamps, status) */
export interface CreateCorrectionInput {
  question_id: string;
  question_bundle_path: string;
  error_type: CorrectionErrorType;
  description: string;
  reporter_node_hash: string;
  /** Optional: original vs proposed content for diff generation */
  original_content?: string;
  proposed_content?: string;
}

export interface ApproveInput {
  reviewer_node_hash: string;
  vote: ReviewVote;
  comment?: string;
}

export const CORRECTION_ERROR_TYPES: CorrectionErrorType[] = [
  'error_factual',
  'error_format',
  'error_distractor',
  'other',
];

export const CORRECTION_STATUSES: CorrectionStatus[] = ['draft', 'reviewing', 'approved', 'rejected'];

export function isCorrectionErrorType(v: string): v is CorrectionErrorType {
  return (CORRECTION_ERROR_TYPES as string[]).includes(v);
}

export function isCorrectionStatus(v: string): v is CorrectionStatus {
  return (CORRECTION_STATUSES as string[]).includes(v);
}
