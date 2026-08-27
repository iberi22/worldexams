import { describe, it, expect, beforeEach, vi } from 'vitest';
import fakeIndexedDB, { IDBKeyRange } from 'fake-indexeddb';
import {
  downloadAndStoreGradeBundle,
  getGradeBundle,
  isGradeOfflineAvailable,
  removeGradeBundle,
  getOfflineQuestionsBySubject
} from '../../src/lib/offline-grade-storage';
import * as apiService from '../../src/lib/api-service';

describe('offline-grade-storage', () => {
  beforeEach(() => {
    // Reset fakeIndexedDB between tests
    (globalThis as any).indexedDB = fakeIndexedDB;
    (globalThis as any).IDBKeyRange = IDBKeyRange;

    if (typeof window === 'undefined') {
      (globalThis as any).window = globalThis;
    } else {
      (window as any).indexedDB = fakeIndexedDB;
      (window as any).IDBKeyRange = IDBKeyRange;
    }
    vi.restoreAllMocks();
  });

  it('should return false / null when database is empty', async () => {
    const isAvailable = await isGradeOfflineAvailable('co', 11);
    expect(isAvailable).toBe(false);

    const bundle = await getGradeBundle('co', 11);
    expect(bundle).toBeNull();

    const questions = await getOfflineQuestionsBySubject('co', 11, 'matematicas');
    expect(questions).toEqual([]);
  });

  it('should download and store grade bundle, update progress, and retrieve it', async () => {
    const mockAppQuestions: apiService.AppQuestion[] = [
      {
        id: 'q-mat-1',
        text: '¿Cuánto es 2+2?',
        options: [
          { id: 'A', text: '3' },
          { id: 'B', text: '4' }
        ],
        correctOptionId: 'B',
        category: 'MATEMÁTICAS :: b1',
        grade: 11,
        difficulty: 3,
        bundleId: 'b1'
      }
    ];

    vi.spyOn(apiService, 'getAvailableSubjects').mockResolvedValue(['matematicas']);
    vi.spyOn(apiService, 'fetchQuestionsFromPacks').mockResolvedValue(mockAppQuestions);

    const progressPcts: number[] = [];
    const success = await downloadAndStoreGradeBundle('CO', 11, (pct) => {
      progressPcts.push(pct);
    });

    expect(success).toBe(true);
    expect(progressPcts).toContain(0);
    expect(progressPcts).toContain(100);

    const isAvailable = await isGradeOfflineAvailable('co', 11);
    expect(isAvailable).toBe(true);

    const bundle = await getGradeBundle('CO', 11);
    expect(bundle).not.toBeNull();
    expect(bundle?.country).toBe('co');
    expect(bundle?.grade).toBe(11);
    expect(bundle?.questions.length).toBe(1);
    expect(bundle?.questions[0].id).toBe('q-mat-1');
  });

  it('should handle large grade bundles (> 5MB) without data corruption', async () => {
    // Create a large question dataset > 5MB
    const largeQuestions: apiService.AppQuestion[] = [];
    const largeText = 'A'.repeat(5000); // ~5KB per question text

    for (let i = 0; i < 1100; i++) {
      largeQuestions.push({
        id: `q-large-${i}`,
        text: `Pregunta grande ${i}: ${largeText}`,
        options: [
          { id: 'A', text: 'Opción A' },
          { id: 'B', text: 'Opción B' }
        ],
        correctOptionId: 'A',
        category: 'LECTURA CRÍTICA :: b-large',
        grade: 11,
        difficulty: 3,
        bundleId: 'b-large'
      });
    }

    vi.spyOn(apiService, 'getAvailableSubjects').mockResolvedValue(['lectura_critica']);
    vi.spyOn(apiService, 'fetchQuestionsFromPacks').mockResolvedValue(largeQuestions);

    const success = await downloadAndStoreGradeBundle('co', 11);
    expect(success).toBe(true);

    const bundle = await getGradeBundle('co', 11);
    expect(bundle).not.toBeNull();
    expect(bundle?.questions.length).toBe(1100);
    expect(bundle?.sizeBytes).toBeGreaterThan(5 * 1024 * 1024); // > 5MB
    expect(bundle?.questions[1099].id).toBe('q-large-1099');
    expect(bundle?.questions[1099].statement).toContain('Pregunta grande 1099');
  });

  it('should filter offline questions by subject correctly', async () => {
    const mockMathQuestions: apiService.AppQuestion[] = [
      {
        id: 'q-mat-1',
        text: 'Math Q1',
        options: [{ id: 'A', text: '1' }],
        correctOptionId: 'A',
        category: 'MATEMÁTICAS :: b1',
        grade: 11,
        difficulty: 3
      }
    ];

    const mockSocialQuestions: apiService.AppQuestion[] = [
      {
        id: 'q-soc-1',
        text: 'Social Q1',
        options: [{ id: 'A', text: '1' }],
        correctOptionId: 'A',
        category: 'SOCIALES Y CIUDADANAS :: b1',
        grade: 11,
        difficulty: 3
      }
    ];

    vi.spyOn(apiService, 'getAvailableSubjects').mockResolvedValue(['matematicas', 'sociales_y_ciudadanas']);
    vi.spyOn(apiService, 'fetchQuestionsFromPacks').mockImplementation(async (_grade, subject) => {
      if (subject === 'matematicas') return mockMathQuestions;
      if (subject === 'sociales_y_ciudadanas') return mockSocialQuestions;
      return [];
    });

    await downloadAndStoreGradeBundle('co', 11);

    const mathQs = await getOfflineQuestionsBySubject('co', 11, 'matematicas');
    expect(mathQs.length).toBe(1);
    expect(mathQs[0].id).toBe('q-mat-1');

    const socialQs = await getOfflineQuestionsBySubject('co', 11, 'sociales');
    expect(socialQs.length).toBe(1);
    expect(socialQs[0].id).toBe('q-soc-1');

    const englishQs = await getOfflineQuestionsBySubject('co', 11, 'ingles');
    expect(englishQs.length).toBe(0);
  });

  it('should remove stored grade bundle', async () => {
    vi.spyOn(apiService, 'getAvailableSubjects').mockResolvedValue(['matematicas']);
    vi.spyOn(apiService, 'fetchQuestionsFromPacks').mockResolvedValue([
      {
        id: 'q-1',
        text: 'Q1',
        options: [],
        correctOptionId: 'A',
        category: 'MATEMÁTICAS',
        grade: 11,
        difficulty: 1
      }
    ]);

    await downloadAndStoreGradeBundle('co', 11);
    expect(await isGradeOfflineAvailable('co', 11)).toBe(true);

    await removeGradeBundle('co', 11);
    expect(await isGradeOfflineAvailable('co', 11)).toBe(false);
    expect(await getGradeBundle('co', 11)).toBeNull();
  });

  it('should fallback gracefully when network or pack fetching fails mid-download', async () => {
    vi.spyOn(apiService, 'getAvailableSubjects').mockResolvedValue(['matematicas', 'ciencias_naturales']);
    vi.spyOn(apiService, 'fetchQuestionsFromPacks').mockImplementation(async (_grade, subject) => {
      if (subject === 'matematicas') {
        return [
          {
            id: 'q-1',
            text: 'Q1',
            options: [],
            correctOptionId: 'A',
            category: 'MATEMÁTICAS',
            grade: 11,
            difficulty: 1
          }
        ];
      }
      throw new Error('Network error during download');
    });

    const success = await downloadAndStoreGradeBundle('co', 11);
    expect(success).toBe(false);
  });
});
