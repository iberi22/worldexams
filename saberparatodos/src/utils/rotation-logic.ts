/**
 * Rotation Logic Utility
 * Core algorithms for deterministic question selection based on date.
 */

import { createHash } from 'node:crypto'; // Use node:crypto effectively via nodejs_compat

// Configuration
export const ROTATION_DAYS = 5;
export const QUESTIONS_PER_SUBJECT = 100; // Max questions per subject

// Types
export interface PackMetadata {
  pack_id: string;
  generated_at: string;
  next_rotation: string;
  rotation_days: number;
}

/**
 * Generate pack ID based on current date
 * Format: YYYY-pNNN (period number since start of year)
 */
export function getPackId(date: Date = new Date()): string {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const daysSinceStart = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const periodNumber = Math.floor(daysSinceStart / ROTATION_DAYS) + 1;

  return `${year}-p${String(periodNumber).padStart(3, '0')}`;
}

/**
 * Calculate next rotation date
 */
export function getNextRotationDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const daysSinceStart = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const currentPeriod = Math.floor(daysSinceStart / ROTATION_DAYS);
  const nextPeriodStart = new Date(startOfYear.getTime() + (currentPeriod + 1) * ROTATION_DAYS * 24 * 60 * 60 * 1000);

  return nextPeriodStart.toISOString();
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
