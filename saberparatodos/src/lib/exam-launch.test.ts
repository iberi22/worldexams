import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CO_ICFES_2026_BENCHMARK } from '../config/icfes-benchmarks';
import { getExamLaunchOverlayHidden, setExamLaunchOverlayHidden } from './exam-launch-preferences';
import { buildExamPerformanceSnapshot, type UserProfile } from './local-intelligence';
import type { ExamResultRecord } from './idb-storage';

function createStorageMock() {
  const store = new Map<string, string>();

  return {
    getItem: vi.fn((key: string) => store.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      store.delete(key);
    })
  };
}

function createProfile(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    globalMMR: 1120,
    simulatedIcfesScore: 280,
    rankTitle: 'Avanzado',
    totalQuestions: 25,
    globalAccuracy: 0.68,
    subjects: {},
    competencies: {},
    topics: {},
    dailyActivity: {},
    recentHistory: [],
    advancedMetrics: {
      avgTimeCorrect: 0,
      avgTimeIncorrect: 0,
      consistencyScore: 0,
      worstTopics: []
    },
    ...overrides
  };
}

describe('exam launch snapshot helpers', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it('builds a populated snapshot from the latest local result', () => {
    const results: ExamResultRecord[] = [
      {
        id: 1,
        timestamp: 1_710_000_000_000,
        grade: 11,
        subject: 'MATEMATICAS',
        score: 74,
        totalQuestions: 20,
        correctCount: 15,
        timeSpentSeconds: 1200,
        answers: {},
        details: [],
        synced: false
      }
    ];

    const snapshot = buildExamPerformanceSnapshot(results, createProfile());

    expect(snapshot.hasHistory).toBe(true);
    expect(snapshot.latestScore).toBe(74);
    expect(snapshot.latestSubject).toBe('MATEMATICAS');
    expect(snapshot.simulatedIcfesScore).toBe(280);
    expect(snapshot.benchmarkScore).toBe(CO_ICFES_2026_BENCHMARK.benchmarkScore);
    expect(snapshot.benchmarkDelta).toBe(30);
    expect(snapshot.goalDelta).toBe(-20);
  });

  it('returns a clean empty state when there is no history', () => {
    const snapshot = buildExamPerformanceSnapshot([], createProfile());

    expect(snapshot.hasHistory).toBe(false);
    expect(snapshot.latestScore).toBeNull();
    expect(snapshot.simulatedIcfesScore).toBeNull();
    expect(snapshot.benchmarkDelta).toBeNull();
  });
});

describe('exam launch overlay preferences', () => {
  beforeEach(() => {
    const localStorage = createStorageMock();
    vi.stubGlobal('window', { localStorage });
    vi.stubGlobal('localStorage', localStorage);
  });

  it('defaults to visible when there is no saved preference', () => {
    expect(getExamLaunchOverlayHidden()).toBe(false);
  });

  it('persists the dont-show-again flag', () => {
    setExamLaunchOverlayHidden(true);
    expect(getExamLaunchOverlayHidden()).toBe(true);
  });
});
