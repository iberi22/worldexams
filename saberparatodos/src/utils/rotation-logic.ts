/**
 * Rotation Logic Utility
 * Core algorithms for deterministic question selection based on date.
 */

import { createHash } from 'node:crypto'; // Use node:crypto effectively via nodejs_compat

// Configuration
export const ROTATION_DAYS = 7; // Weekly
export const MAX_WEEKLY_QUESTIONS = 200; // Increased to 200 per grade
export const QUESTIONS_PER_SUBJECT = 40; // ~200 / 5 subjects = 40 per subject

// Types
export interface PackMetadata {
  pack_id: string;
  generated_at: string;
  next_rotation: string;
  rotation_days: number;
}

/**
 * Helper to get the start of the week (Monday)
 * Ensures rotation happens on Monday 00:00 UTC
 */
export function getMondayEpoch(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay(); // 0 is Sunday, 1 is Monday...
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * Generate pack ID based on current date
 * Format: YYYY-WNN (ISO Week Number approx)
 */
export function getPackId(date: Date = new Date()): string {
  // Use a fixed Monday epoch to ensure consistent weekly buckets
  // Reference Monday: Jan 1, 2024
  const refMonday = new Date('2024-01-01T00:00:00Z');
  const diffMs = date.getTime() - refMonday.getTime();
  const weeksSinceRef = Math.floor(diffMs / (ROTATION_DAYS * 24 * 60 * 60 * 1000));

  return `W${weeksSinceRef}`;
}

/**
 * Calculate next rotation date separate from pack logic for UI
 */
export function getNextRotationDate(date: Date = new Date()): string {
  const refMonday = new Date('2024-01-01T00:00:00Z');
  const msPerWeek = ROTATION_DAYS * 24 * 60 * 60 * 1000;
  const diffMs = date.getTime() - refMonday.getTime();
  const currentWeekIndex = Math.floor(diffMs / msPerWeek);

  // Next cycle starts at Ref + (Weeks+1)
  const nextDate = new Date(refMonday.getTime() + (currentWeekIndex + 1) * msPerWeek);

  return nextDate.toISOString();
}

/**
 * Seeded random for reproducible shuffling
 * Uses basic hashing to generate a float 0-1
 */
export function seededRandom(seed: string): number {
  const hash = createHash('sha256').update(seed).digest('hex');
  return parseInt(hash.substring(0, 8), 16) / 0xffffffff;
}

/**
 * Seeded shuffle array (Fisher-Yates with seed)
 */
export function seededShuffle<T>(array: T[], seed: string): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const seedForIndex = `${seed}-${i}`;
    const j = Math.floor(seededRandom(seedForIndex) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
