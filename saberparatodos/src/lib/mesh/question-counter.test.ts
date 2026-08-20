import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  QuestionCounter,
  EDGE_MESH_COUNTERS_NAMESPACE,
  DEFAULT_BATCH_INTERVAL_MS,
  MAX_INCREMENTS_PER_BATCH,
} from './question-counter';

describe('QuestionCounter CRDT G-Counter', () => {
  let counterNodeA: QuestionCounter;
  let counterNodeB: QuestionCounter;

  beforeEach(() => {
    localStorage.clear();
    counterNodeA = new QuestionCounter('node-a');
    counterNodeB = new QuestionCounter('node-b');
  });

  afterEach(() => {
    counterNodeA.reset();
    counterNodeB.reset();
    vi.useRealTimers();
  });

  it('uses the specified edge-mesh namespace', () => {
    expect(counterNodeA.namespace).toBe('swallow/worldexams/counters');
    expect(EDGE_MESH_COUNTERS_NAMESPACE).toBe('swallow/worldexams/counters');
  });

  it('increments question usage locally before sync (offline accumulation)', () => {
    counterNodeA.increment('q1');
    counterNodeA.increment('q1', 2);
    counterNodeA.increment('q2', 5);

    expect(counterNodeA.getCount('q1')).toBe(3);
    expect(counterNodeA.getCount('q2')).toBe(5);
    expect(counterNodeA.getTotalPendingIncrements()).toBe(8);

    const pending = counterNodeA.getPendingIncrements();
    expect(pending).toEqual({ q1: 3, q2: 5 });
  });

  it('flushes pending increments into CRDT state vector on batch sync', () => {
    counterNodeA.increment('q1', 10);
    expect(counterNodeA.getTotalPendingIncrements()).toBe(10);

    const result = counterNodeA.sync();
    expect(result.syncedIncrements).toBe(10);
    expect(result.remainingPending).toBe(0);
    expect(result.namespace).toBe('swallow/worldexams/counters');

    expect(counterNodeA.getCount('q1')).toBe(10);
    expect(counterNodeA.getTotalPendingIncrements()).toBe(0);

    const state = counterNodeA.getState();
    expect(state).toEqual({
      q1: { 'node-a': 10 },
    });
  });

  it('enforces rate limit of max 100 increments per batch', () => {
    counterNodeA.increment('q1', 60);
    counterNodeA.increment('q2', 80);
    // Total pending = 140

    expect(counterNodeA.getTotalPendingIncrements()).toBe(140);

    // Batch 1
    const result1 = counterNodeA.sync();
    expect(result1.syncedIncrements).toBe(MAX_INCREMENTS_PER_BATCH); // 100
    expect(result1.remainingPending).toBe(40);

    // Total count for q1 and q2 should still equal 140 (state + remaining pending)
    expect(counterNodeA.getCount('q1') + counterNodeA.getCount('q2')).toBe(140);

    // Batch 2
    const result2 = counterNodeA.sync();
    expect(result2.syncedIncrements).toBe(40);
    expect(result2.remainingPending).toBe(0);

    const state = counterNodeA.getState();
    expect(state['q1']['node-a'] + state['q2']['node-a']).toBe(140);
  });

  it('correctly merges G-Counter CRDT states across nodes', () => {
    // Node A answers q1 15 times, q2 5 times
    counterNodeA.increment('q1', 15);
    counterNodeA.increment('q2', 5);
    counterNodeA.sync();

    // Node B answers q1 10 times, q3 7 times
    counterNodeB.increment('q1', 10);
    counterNodeB.increment('q3', 7);
    counterNodeB.sync();

    // Node A merges state from Node B
    counterNodeA.merge(counterNodeB.getState());

    // Total counts on Node A:
    // q1: 15 (Node A) + 10 (Node B) = 25
    // q2: 5 (Node A)
    // q3: 7 (Node B)
    expect(counterNodeA.getCount('q1')).toBe(25);
    expect(counterNodeA.getCount('q2')).toBe(5);
    expect(counterNodeA.getCount('q3')).toBe(7);

    // Node B merges state from Node A
    counterNodeB.merge(counterNodeA.getState());
    expect(counterNodeB.getCount('q1')).toBe(25);
    expect(counterNodeB.getCount('q2')).toBe(5);
    expect(counterNodeB.getCount('q3')).toBe(7);
  });

  it('ensures merge is idempotent, commutative, and associative', () => {
    counterNodeA.increment('q1', 10);
    counterNodeA.sync();

    counterNodeB.increment('q1', 20);
    counterNodeB.sync();

    const stateA = counterNodeA.getState();
    const stateB = counterNodeB.getState();

    // Idempotency: merging same state multiple times yields identical count
    counterNodeA.merge(stateB);
    const countFirstMerge = counterNodeA.getCount('q1');

    counterNodeA.merge(stateB);
    counterNodeA.merge(stateB);
    expect(counterNodeA.getCount('q1')).toBe(countFirstMerge);

    // Commutativity: merge(A, B) === merge(B, A)
    const freshA = new QuestionCounter('fresh-a');
    freshA.merge(stateA);
    freshA.merge(stateB);

    const freshB = new QuestionCounter('fresh-b');
    freshB.merge(stateB);
    freshB.merge(stateA);

    expect(freshA.getCount('q1')).toBe(freshB.getCount('q1'));
    expect(freshA.getState()).toEqual(freshB.getState());
  });

  it('persists state and pending increments to localStorage for offline durability', () => {
    counterNodeA.increment('q10', 4);
    counterNodeA.sync(); // committed into state
    counterNodeA.increment('q11', 3); // left in pending queue

    // Create a new instance representing app reload / restart
    const restored = new QuestionCounter('node-a');
    expect(restored.getCount('q10')).toBe(4);
    expect(restored.getCount('q11')).toBe(3);
    expect(restored.getPendingIncrements()).toEqual({ q11: 3 });
  });

  it('manages 5-minute auto-sync timer correctly', () => {
    vi.useFakeTimers();

    counterNodeA.startAutoSync(DEFAULT_BATCH_INTERVAL_MS);
    expect(counterNodeA.isAutoSyncRunning()).toBe(true);

    counterNodeA.increment('q99', 50);
    expect(counterNodeA.getTotalPendingIncrements()).toBe(50);

    // Fast-forward 4 minutes (should not have synced yet)
    vi.advanceTimersByTime(4 * 60 * 1000);
    expect(counterNodeA.getTotalPendingIncrements()).toBe(50);

    // Fast-forward 1 more minute (5 minutes total, trigger auto-sync)
    vi.advanceTimersByTime(1 * 60 * 1000);
    expect(counterNodeA.getTotalPendingIncrements()).toBe(0);
    expect(counterNodeA.getCount('q99')).toBe(50);

    counterNodeA.stopAutoSync();
    expect(counterNodeA.isAutoSyncRunning()).toBe(false);
  });
});
