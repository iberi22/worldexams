import { describe, it, expect, beforeEach } from 'vitest';
import {
  getSemesterInfo,
  getScoreRange,
  filterByScope,
  upsertEntry,
  createEmptyLeaderboard,
  type ScoreSubmission,
  type LeaderboardEntry
} from './leaderboard';
import {
  getDeviceHash,
  getLeaderboardSettings,
  saveLeaderboardSettings,
  toggleAnonymousOptIn,
  mergeP2PScoreSubmission,
  p2pLeaderboardStore,
  createSubmission
} from './leaderboard-service';

describe('leaderboard semester logic', () => {
  it('should return correct semester info for Calendar A', () => {
    // Feb - Sem 1
    const feb = new Date(2025, 1, 15);
    const infoA1 = getSemesterInfo(feb, 'A');
    expect(infoA1.semester).toBe(1);
    expect(infoA1.start.getMonth()).toBe(1); // Feb

    // Aug - Sem 2
    const aug = new Date(2025, 7, 15);
    const infoA2 = getSemesterInfo(aug, 'A');
    expect(infoA2.semester).toBe(2);
    expect(infoA2.start.getMonth()).toBe(6); // Jul
  });

  it('should return correct semester info for Calendar B', () => {
    // Oct - Sem 1
    const oct = new Date(2025, 9, 15);
    const infoB1 = getSemesterInfo(oct, 'B');
    expect(infoB1.semester).toBe(1);
    expect(infoB1.start.getMonth()).toBe(8); // Sep

    // Mar - Sem 2
    const mar = new Date(2025, 2, 15);
    const infoB2 = getSemesterInfo(mar, 'B');
    expect(infoB2.semester).toBe(2);
    expect(infoB2.start.getMonth()).toBe(0); // Jan
  });

  it('should return correct semester info for standard calendar', () => {
    // Mar - Sem 1
    const mar = new Date(2025, 2, 15);
    const infoS1 = getSemesterInfo(mar, 'standard');
    expect(infoS1.semester).toBe(1);
    expect(infoS1.start.getMonth()).toBe(0); // Jan
    expect(infoS1.end.getMonth()).toBe(5); // Jun

    // Sep - Sem 2
    const sep = new Date(2025, 8, 15);
    const infoS2 = getSemesterInfo(sep, 'standard');
    expect(infoS2.semester).toBe(2);
    expect(infoS2.start.getMonth()).toBe(6); // Jul
    expect(infoS2.end.getMonth()).toBe(11); // Dec
  });
});

describe('leaderboard anonymous mode & deviceHash', () => {
  it('should generate a valid deviceHash', () => {
    const hash = getDeviceHash();
    expect(hash).toMatch(/^dev_[A-Z0-9]{6,8}$/);
  });

  it('should calculate obfuscated score range correctly', () => {
    expect(getScoreRange(375)).toBe('350 - 399');
    expect(getScoreRange(420)).toBe('400 - 449');
    expect(getScoreRange(0)).toBe('0 - 49');
  });

  it('should default settings to anonymous (privacy first)', () => {
    const settings = getLeaderboardSettings();
    expect(settings.isOptedIn).toBe(false);
  });

  it('should toggle opt-in settings correctly', () => {
    toggleAnonymousOptIn(true, 'TestUser');
    const updated = getLeaderboardSettings();
    expect(updated.isOptedIn).toBe(true);
    expect(updated.displayName).toBe('TestUser');

    toggleAnonymousOptIn(false);
    const reverted = getLeaderboardSettings();
    expect(reverted.isOptedIn).toBe(false);
  });
});

describe('leaderboard scope filtering & CRDT merge', () => {
  it('should filter leaderboard entries by scope', () => {
    const board = createEmptyLeaderboard('weekly');
    const sub1: ScoreSubmission = {
      anonymousId: 'user1',
      displayName: 'User 1',
      score: 300,
      stats: { questionsAnswered: 10, accuracy: 0.8, averageDifficulty: 3, longestStreak: 2, examsCompleted: 1, perfectScores: 0 },
      grade: '11',
      region: 'BOG',
      institutionId: 'inst-1',
      subjectId: 'math',
      examId: 'e1',
      timestamp: new Date().toISOString(),
      checksum: 'chk1'
    };

    const sub2: ScoreSubmission = {
      anonymousId: 'user2',
      displayName: 'User 2',
      score: 400,
      stats: { questionsAnswered: 10, accuracy: 0.9, averageDifficulty: 3, longestStreak: 3, examsCompleted: 1, perfectScores: 0 },
      grade: '11',
      region: 'MED',
      institutionId: 'inst-2',
      subjectId: 'science',
      examId: 'e2',
      timestamp: new Date().toISOString(),
      checksum: 'chk2'
    };

    upsertEntry(board, sub1);
    upsertEntry(board, sub2);

    expect(filterByScope(board, 'global').length).toBe(2);
    expect(filterByScope(board, 'country', 'BOG').length).toBe(1);
    expect(filterByScope(board, 'institution', 'inst-2').length).toBe(1);
    expect(filterByScope(board, 'subject', 'math').length).toBe(1);
  });

  it('should merge P2P score submission into CRDT store', () => {
    const sub: ScoreSubmission = {
      anonymousId: 'p2p-user',
      deviceHash: 'dev_123456',
      displayName: 'P2P Tester',
      score: 350,
      isAnonymous: true,
      stats: { questionsAnswered: 10, accuracy: 0.85, averageDifficulty: 3, longestStreak: 4, examsCompleted: 1, perfectScores: 0 },
      grade: '11',
      region: 'BOG',
      examId: 'p2p-e1',
      timestamp: new Date().toISOString(),
      checksum: 'p2pchk'
    };

    const merged = mergeP2PScoreSubmission(sub, 'weekly', 'global');
    expect(merged.entries.length).toBeGreaterThan(0);
    const entry = merged.entries.find(e => e.anonymousId === 'p2p-user' || e.deviceHash === 'dev_123456');
    expect(entry).toBeDefined();
    expect(entry?.isAnonymous).toBe(true);
    expect(entry?.scoreRange).toBe('350 - 399');
  });
});
