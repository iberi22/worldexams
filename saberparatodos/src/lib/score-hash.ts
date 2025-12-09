/**
 * Score Hash Utility
 *
 * Generates and validates hashes for exam scores to prevent:
 * - Score tampering (modifying points after completion)
 * - Replay attacks (submitting same exam multiple times)
 * - Fabricated submissions (creating fake exam results)
 *
 * Algorithm: SHA-256 hash of concatenated exam data + secret salt
 */

import type { ExamCompletionData } from '../types';

// Salt for hashing (not truly secret in client-side, but adds complexity)
// The real security comes from server-side validation of question sequences
const HASH_SALT = 'WX-OpenIcfes-2025';

/**
 * Generate a deterministic hash from exam completion data
 * This hash includes all relevant exam data to detect any modifications
 */
export async function generateScoreHash(
  examData: ExamCompletionData,
  totalScore: number,
  anonymousId: string
): Promise<string> {
  // Build canonical string from exam data
  // Order matters! Must be exactly reproducible
  const dataString = buildCanonicalString(examData, totalScore, anonymousId);

  // Generate SHA-256 hash
  const hash = await sha256(dataString);

  // Return first 16 chars for brevity (collision resistance still high)
  return hash.substring(0, 16);
}

/**
 * Build a canonical string representation of the exam data
 * This ensures the same data always produces the same hash
 */
function buildCanonicalString(
  examData: ExamCompletionData,
  totalScore: number,
  anonymousId: string
): string {
  // Sort questions by ID for deterministic ordering
  const sortedQuestions = [...examData.questions].sort((a, b) =>
    String(a.questionId).localeCompare(String(b.questionId))
  );

  // Build question fingerprint: "qId:correct:difficulty" for each
  const questionFingerprints = sortedQuestions.map(q =>
    `${q.questionId}:${q.isCorrect ? 1 : 0}:${q.difficulty}`
  ).join('|');

  // Include timing data (rounded to prevent timing attacks)
  const roundedTime = Math.round(examData.totalTimeMs / 10000) * 10000; // Round to 10s

  // Canonical format
  const canonical = [
    `v1`,                           // Version for future upgrades
    anonymousId,
    examData.subject || 'general',
    examData.grade || 0,
    totalScore,
    sortedQuestions.length,
    sortedQuestions.filter(q => q.isCorrect).length,
    roundedTime,
    questionFingerprints,
    HASH_SALT
  ].join(':');

  return canonical;
}

/**
 * SHA-256 hash function using Web Crypto API
 * Works in both browser and Node.js (with polyfill)
 */
async function sha256(message: string): Promise<string> {
  // Use Web Crypto API if available
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Fallback for environments without crypto.subtle
  // Simple hash (not cryptographically secure, but better than nothing)
  let hash = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).padStart(16, '0').substring(0, 16);
}

/**
 * Verify a score hash matches the expected value
 * Used on the server side to validate submissions
 */
export async function verifyScoreHash(
  examData: ExamCompletionData,
  totalScore: number,
  anonymousId: string,
  providedHash: string
): Promise<boolean> {
  const expectedHash = await generateScoreHash(examData, totalScore, anonymousId);
  return expectedHash === providedHash;
}

/**
 * Generate a simple checksum for quick validation
 * Not secure, but fast for basic sanity checks
 */
export function generateQuickChecksum(
  totalPoints: number,
  questionsAnswered: number,
  correctAnswers: number,
  examDurationMs: number
): string {
  // Simple formula that's hard to guess without knowing the algorithm
  const value = (totalPoints * 7) + (questionsAnswered * 13) + (correctAnswers * 17) +
                Math.floor(examDurationMs / 1000);
  return (value % 99999).toString().padStart(5, '0');
}

/**
 * Validate quick checksum
 */
export function validateQuickChecksum(
  totalPoints: number,
  questionsAnswered: number,
  correctAnswers: number,
  examDurationMs: number,
  providedChecksum: string
): boolean {
  const expected = generateQuickChecksum(totalPoints, questionsAnswered, correctAnswers, examDurationMs);
  return expected === providedChecksum;
}
