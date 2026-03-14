/**
 * Pack Storage Service
 * Manages cumulative storage of question packs across weeks
 *
 * Strategy:
 * - Packs are downloaded when new pack ID is detected
 * - Old packs are kept in storage for accumulated question pool
 * - Auto-cleanup removes packs older than MAX_STORED_PACKS
 * - Question pool combines ALL stored packs for maximum variety
 */

import type { APIQuestion } from './api-service';

const PACK_STORAGE_KEY = 'saberparatodos_question_packs';
const MAX_STORED_PACKS = 8; // ~6-8 weeks of packs

/**
 * Stored pack structure
 */
export interface StoredPack {
  packId: string;
  grade: number;
  subject: string;
  questions: APIQuestion[];
  downloadedAt: number;
  questionCount: number;
}

/**
 * Pack storage data structure in localStorage
 */
interface PackStorageData {
  packs: Record<string, StoredPack>;
  currentPackId: string | null;
  lastUpdated: number;
  version: number;
}

const STORAGE_VERSION = 1;

/**
 * Get default empty storage
 */
function getDefaultStorage(): PackStorageData {
  return {
    packs: {},
    currentPackId: null,
    lastUpdated: Date.now(),
    version: STORAGE_VERSION
  };
}

/**
 * Load storage data from localStorage
 */
function loadStorageData(): PackStorageData {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return getDefaultStorage();
  }

  try {
    const stored = localStorage.getItem(PACK_STORAGE_KEY);
    if (!stored) return getDefaultStorage();

    const data = JSON.parse(stored) as PackStorageData;

    // Version migration if needed
    if (!data.version || data.version < STORAGE_VERSION) {
      console.log('📦 Migrating pack storage to new version');
      return getDefaultStorage();
    }

    return data;
  } catch (e) {
    console.error('Error loading pack storage:', e);
    return getDefaultStorage();
  }
}

/**
 * Save storage data to localStorage
 */
function saveStorageData(data: PackStorageData): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  try {
    data.lastUpdated = Date.now();
    localStorage.setItem(PACK_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving pack storage:', e);
    // If quota exceeded, try to clean old packs
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      console.log('📦 Storage quota exceeded, cleaning old packs...');
      cleanOldPacks();
    }
  }
}

/**
 * Load all stored packs
 */
export function loadAllStoredPacks(): StoredPack[] {
  const data = loadStorageData();
  return Object.values(data.packs);
}

/**
 * Load stored packs filtered by grade
 */
export function loadStoredPacksForGrade(grade: number): StoredPack[] {
  const data = loadStorageData();
  return Object.values(data.packs).filter(pack => pack.grade === grade);
}

/**
 * Save a new pack to storage
 */
export function savePack(pack: StoredPack): void {
  const data = loadStorageData();

  // Create unique key for pack (packId + grade + subject)
  const key = `${pack.packId}-${pack.grade}-${pack.subject}`;

  // Check if we already have this pack
  if (data.packs[key]) {
    console.log(`📦 Pack already stored: ${key}`);
    return;
  }

  // Add new pack
  data.packs[key] = pack;
  console.log(`📦 Stored new pack: ${key} with ${pack.questionCount} questions`);

  // Update current pack ID
  data.currentPackId = pack.packId;

  // Clean old packs if needed
  const packKeys = Object.keys(data.packs);
  if (packKeys.length > MAX_STORED_PACKS * 5) { // Assuming ~5 subjects per grade
    cleanOldPacksInternal(data);
  }

  saveStorageData(data);
}

/**
 * Get current pack ID
 */
export function getCurrentPackId(): string | null {
  const data = loadStorageData();
  return data.currentPackId;
}

/**
 * Set current pack ID
 */
export function setCurrentPackId(packId: string): void {
  const data = loadStorageData();
  data.currentPackId = packId;
  saveStorageData(data);
}

/**
 * Check if a specific pack is already stored
 */
export function hasPackStored(packId: string, grade: number, subject: string): boolean {
  const data = loadStorageData();
  const key = `${packId}-${grade}-${subject}`;
  return !!data.packs[key];
}

/**
 * Get the combined question pool from all stored packs for a grade
 * This is the main method to get ALL available questions
 */
export function getQuestionPool(grade: number): APIQuestion[] {
  const packs = loadStoredPacksForGrade(grade);

  if (packs.length === 0) {
    console.log(`📦 No packs stored for grade ${grade}`);
    return [];
  }

  // Combine all questions from all packs
  const allQuestions: APIQuestion[] = [];
  const seenIds = new Set<string>();

  for (const pack of packs) {
    for (const question of pack.questions) {
      // Avoid duplicates (same question might be in multiple packs)
      if (!seenIds.has(question.id)) {
        seenIds.add(question.id);
        allQuestions.push(question);
      }
    }
  }

  console.log(`📦 Question pool for grade ${grade}: ${allQuestions.length} unique questions from ${packs.length} packs`);
  return allQuestions;
}

/**
 * Get the combined question pool from all stored packs for a grade AND subject
 */
export function getQuestionPoolBySubject(grade: number, subject: string): APIQuestion[] {
  const data = loadStorageData();

  // Filter packs by grade and subject
  const relevantPacks = Object.values(data.packs).filter(
    pack => pack.grade === grade && pack.subject.toLowerCase() === subject.toLowerCase()
  );

  if (relevantPacks.length === 0) {
    return [];
  }

  // Combine questions
  const allQuestions: APIQuestion[] = [];
  const seenIds = new Set<string>();

  for (const pack of relevantPacks) {
    for (const question of pack.questions) {
      if (!seenIds.has(question.id)) {
        seenIds.add(question.id);
        allQuestions.push(question);
      }
    }
  }

  return allQuestions;
}

/**
 * Get total questions available across all stored packs for a grade
 */
export function getTotalQuestionsAvailable(grade: number): number {
  return getQuestionPool(grade).length;
}

/**
 * Get storage statistics
 */
export function getPackStorageStats(): {
  totalPacks: number;
  totalQuestions: number;
  oldestPackDate: Date | null;
  newestPackDate: Date | null;
  packsByGrade: Record<number, number>;
} {
  const packs = loadAllStoredPacks();

  if (packs.length === 0) {
    return {
      totalPacks: 0,
      totalQuestions: 0,
      oldestPackDate: null,
      newestPackDate: null,
      packsByGrade: {}
    };
  }

  const sortedByDate = [...packs].sort((a, b) => a.downloadedAt - b.downloadedAt);
  const packsByGrade: Record<number, number> = {};
  let totalQuestions = 0;

  for (const pack of packs) {
    packsByGrade[pack.grade] = (packsByGrade[pack.grade] || 0) + 1;
    totalQuestions += pack.questionCount;
  }

  return {
    totalPacks: packs.length,
    totalQuestions,
    oldestPackDate: new Date(sortedByDate[0].downloadedAt),
    newestPackDate: new Date(sortedByDate[sortedByDate.length - 1].downloadedAt),
    packsByGrade
  };
}

/**
 * Clean old packs (internal helper)
 */
function cleanOldPacksInternal(data: PackStorageData): void {
  const packEntries = Object.entries(data.packs);

  if (packEntries.length <= MAX_STORED_PACKS * 5) {
    return; // No cleanup needed
  }

  // Sort by download date (oldest first)
  packEntries.sort((a, b) => a[1].downloadedAt - b[1].downloadedAt);

  // Keep only the newest packs
  const toKeep = packEntries.slice(-MAX_STORED_PACKS * 5);
  const toRemove = packEntries.slice(0, -MAX_STORED_PACKS * 5);

  // Remove old packs
  for (const [key] of toRemove) {
    delete data.packs[key];
    console.log(`📦 Cleaned old pack: ${key}`);
  }

  console.log(`📦 Cleaned ${toRemove.length} old packs, kept ${toKeep.length}`);
}

/**
 * Clean old packs (public function)
 */
export function cleanOldPacks(): void {
  const data = loadStorageData();
  cleanOldPacksInternal(data);
  saveStorageData(data);
}

/**
 * Clear all pack storage (for debugging/reset)
 */
export function clearPackStorage(): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  localStorage.removeItem(PACK_STORAGE_KEY);
  console.log('📦 Pack storage cleared');
}

/**
 * Export pack storage for debugging
 */
export function exportPackStorage(): string {
  const data = loadStorageData();
  return JSON.stringify(data, null, 2);
}

/**
 * Get unique pack IDs stored
 */
export function getStoredPackIds(): string[] {
  const packs = loadAllStoredPacks();
  const packIds = new Set(packs.map(p => p.packId));
  return Array.from(packIds);
}
