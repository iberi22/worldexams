import { beforeEach, describe, expect, it } from 'vitest';
import { setOptIn } from '../../components/leaderboard/OptInManager';
import {
  AGGREGATE_STORAGE_KEY,
  fetchAggregateStats,
  publishAnonymousScore,
  validateNoPII,
  type AggregateStat,
} from './leaderboard-mesh';

describe('Leaderboard Publish & Aggregate Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('publishes valid anonymous score when opted in', async () => {
    setOptIn(true);
    const validTip = {
      node_hash: 'node_test12345678',
      subject: 'matematicas',
      week: 'W01',
      score: 85,
      avg: 90,
    };

    const published = await publishAnonymousScore(validTip);
    expect(published).toBe(true);

    const stats = await fetchAggregateStats();
    expect(stats).toHaveLength(1);
    expect(stats[0]).toMatchObject(validTip);
  });

  it('rejects payload containing forbidden PII keys or invalid fields', () => {
    const piiPayloads = [
      { node_hash: 'node_12345678', subject: 'lengua', week: 'W01', score: 80, avg: 85, email: 'user@example.com' },
      { node_hash: 'node_12345678', subject: 'lengua', week: 'W01', score: 80, avg: 85, student_id: '12345' },
      { node_hash: 'node_12345678', subject: 'lengua', week: 'W01', score: 80, avg: 85, name: 'Juan Perez' },
    ];

    for (const payload of piiPayloads) {
      expect(() => validateNoPII(payload)).toThrow(/PII|Campo no permitido/i);
    }
  });

  it('fetches, sorts, and limits Top 50 aggregated stats correctly', async () => {
    const rawItems: AggregateStat[] = Array.from({ length: 60 }, (_, i) => ({
      node_hash: `node_hash_${i.toString().padStart(3, '0')}`,
      subject: 'ciencias',
      week: 'W02',
      score: i + 10,
      avg: i + 1, // higher index = higher avg
    }));

    localStorage.setItem(AGGREGATE_STORAGE_KEY, JSON.stringify(rawItems));

    const stats = await fetchAggregateStats();
    expect(stats).toHaveLength(50);
    expect(stats[0].avg).toBe(60);
    expect(stats[49].avg).toBe(11);
  });
});
