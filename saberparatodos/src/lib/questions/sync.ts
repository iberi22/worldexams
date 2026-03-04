import type { AppQuestion } from '../api-service';
import { filterValidQuestions } from './filters';

export function sanitizeIncomingQuestions(questions: unknown): AppQuestion[] {
  if (!Array.isArray(questions)) return [];
  const { validQuestions } = filterValidQuestions(questions as AppQuestion[], 2);
  return validQuestions;
}

export function buildRoomConfigPayload(config: {
  subject: string | null;
  grade: number;
  count: number;
  timeOption: number;
  examMode: 'simulacro' | 'period';
  period?: number;
  useDiagnostic?: boolean;
  diagnosticMixPercent?: number;
  questions: AppQuestion[];
  hostPeerId?: string | null;
}) {
  return {
    subject: config.subject,
    grade: config.grade,
    num_questions: config.count,
    time_option: config.timeOption,
    exam_mode: config.examMode,
    period: config.period,
    useDiagnostic: Boolean(config.useDiagnostic),
    diagnosticMixPercent: config.diagnosticMixPercent ?? 20,
    difficulty: 'NORMAL',
    questions: config.questions,
    host_peer_id: config.hostPeerId ?? null
  };
}
