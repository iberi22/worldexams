import type { AppQuestion } from '../api-service';

export function parseProtocolVersion(value?: string): number | null {
  if (!value) return null;
  const match = String(value).match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

export function inferProtocolVersion(question: Pick<AppQuestion, 'protocol_version' | 'bundleId' | 'id'>): number | null {
  const explicit = parseProtocolVersion(question.protocol_version);
  if (explicit !== null) return explicit;

  const fingerprint = `${question.bundleId || ''} ${question.id || ''}`.toLowerCase();
  if (fingerprint.includes('-pro-v5') || fingerprint.includes('-v5-bundle')) return 5;
  if (fingerprint.includes('-pro-v4') || fingerprint.includes('-v4-bundle')) return 4;
  if (fingerprint.includes('-v3-bundle')) return 3;
  if (fingerprint.includes('-bundle')) return 2;
  return null;
}

export function passesGrade11PreicfesPolicy(
  question: AppQuestion,
  minDifficulty: number = 1
): boolean {
  if (Number(question.grade) !== 11) return true;

  const protocolVersion = inferProtocolVersion(question);
  const difficulty = Number(question.difficulty || 0);

  return protocolVersion !== null && protocolVersion >= 4 && difficulty >= minDifficulty;
}

export function filterGrade11PreicfesReady(
  questions: AppQuestion[],
  minDifficulty: number = 1
): AppQuestion[] {
  return questions.filter((question) => passesGrade11PreicfesPolicy(question, minDifficulty));
}
