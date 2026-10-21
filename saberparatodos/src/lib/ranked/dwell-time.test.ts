import { describe, it, expect } from 'vitest';
import { DwellTimeTracker, type DwellTimeState } from './dwell-time';

describe('DwellTimeTracker', () => {
  it('accumulates visible time across multiple visits to the same question', () => {
    const tracker = new DwellTimeTracker();

    tracker.enter('q1', 0);
    tracker.leave(5_000);
    tracker.enter('q1', 6_000);
    tracker.leave(11_000);

    expect(tracker.total('q1')).toBe(10_000);
  });

  it('keeps per-question totals independent', () => {
    const tracker = new DwellTimeTracker();

    tracker.enter('q1', 0);
    tracker.leave(2_000);
    tracker.enter('q2', 2_000);
    tracker.leave(4_000);

    expect(tracker.total('q1')).toBe(2_000);
    expect(tracker.total('q2')).toBe(2_000);
  });

  it('includes the live visit in total() when `now` is provided', () => {
    const tracker = new DwellTimeTracker();
    tracker.enter('q1', 0);

    expect(tracker.total('q1', 5_000)).toBe(5_000);
    // Without `now` the still-open visit is not counted.
    expect(tracker.total('q1')).toBe(0);

    tracker.leave(7_000);
    expect(tracker.total('q1')).toBe(7_000);
    expect(tracker.total('q1', 999_000)).toBe(7_000);
  });

  it('never decreases the total when re-entering a question', () => {
    const tracker = new DwellTimeTracker();
    tracker.enter('q1', 0);
    tracker.leave(3_000);

    tracker.enter('q1', 10_000);
    tracker.leave(12_000);

    expect(tracker.total('q1')).toBe(5_000);
  });

  it('keeps growing while the student stays on the question (re-select never lowers ms)', () => {
    const tracker = new DwellTimeTracker();
    tracker.enter('q1', 0);

    const firstSelection = tracker.total('q1', 5_000);
    const secondSelection = tracker.total('q1', 9_000);

    expect(firstSelection).toBe(5_000);
    expect(secondSelection).toBe(9_000);
    expect(secondSelection).toBeGreaterThanOrEqual(firstSelection);
  });

  it('pause() stops accumulation and resume() continues without counting the hidden gap', () => {
    const tracker = new DwellTimeTracker();
    tracker.enter('q1', 0);
    tracker.pause(3_000);

    expect(tracker.total('q1')).toBe(3_000);

    tracker.resume(5_000);
    // The hidden gap (3000 -> 5000) must not be counted.
    expect(tracker.total('q1', 5_000)).toBe(3_000);

    tracker.leave(8_000);
    expect(tracker.total('q1')).toBe(6_000);
  });

  it('ignores pause/resume when no visit is open', () => {
    const tracker = new DwellTimeTracker();
    tracker.pause(1_000);
    tracker.resume(2_000);
    expect(tracker.total('q1')).toBe(0);

    tracker.enter('q1', 0);
    tracker.leave(1_000);
    tracker.pause(2_000);
    expect(tracker.total('q1')).toBe(1_000);
  });

  it('enter() closes a previous open visit before opening a new one', () => {
    const tracker = new DwellTimeTracker();
    tracker.enter('q1', 0);
    tracker.enter('q2', 4_000);
    tracker.leave(6_000);

    expect(tracker.total('q1')).toBe(4_000);
    expect(tracker.total('q2')).toBe(2_000);
  });

  it('serialize(now) credits the open visit and keeps it open', () => {
    const tracker = new DwellTimeTracker();
    tracker.enter('q1', 0);

    const snapshot = tracker.serialize(5_000);

    expect(snapshot.totals.q1).toBe(5_000);
    // The visit keeps running: the live segment is not lost.
    expect(tracker.total('q1', 7_000)).toBe(7_000);
  });

  it('serialize() without `now` does not credit the open visit', () => {
    const tracker = new DwellTimeTracker();
    tracker.enter('q1', 0);

    const snapshot = tracker.serialize();

    expect(snapshot.totals.q1).toBeUndefined();
    expect(tracker.total('q1', 3_000)).toBe(3_000);
  });

  it('serialize/restore keeps accumulated totals', () => {
    const tracker = new DwellTimeTracker();
    tracker.enter('q1', 0);
    tracker.leave(2_500);
    tracker.enter('q2', 3_000);
    tracker.leave(4_000);

    const snapshot: DwellTimeState = tracker.serialize(4_000);
    const restored = DwellTimeTracker.restore(snapshot);

    expect(restored.total('q1')).toBe(2_500);
    expect(restored.total('q2')).toBe(1_000);
  });

  it('restore() freezes an open visit so the reload gap is never counted', () => {
    const tracker = new DwellTimeTracker();
    tracker.enter('q1', 0);

    // The student looked at q1 for 5s, then the page was reloaded.
    const restored = DwellTimeTracker.restore(tracker.serialize(5_000));

    // Visible time before the reload is kept...
    expect(restored.total('q1')).toBe(5_000);
    // ...but the offline gap is not visible time.
    expect(restored.total('q1', 500_000)).toBe(5_000);

    restored.resume(500_000);
    restored.leave(502_000);
    expect(restored.total('q1')).toBe(7_000);
  });

  it('restore() keeps the current question and lets the caller reopen the visit', () => {
    const tracker = new DwellTimeTracker();
    tracker.enter('q1', 0);

    const restored = DwellTimeTracker.restore(tracker.serialize(5_000));
    expect(restored.current()).toBe('q1');

    restored.enter('q1', 500_000);
    expect(restored.total('q1', 502_000)).toBe(7_000);
  });

  it('restore() keeps a paused visit resumable', () => {
    const tracker = new DwellTimeTracker();
    tracker.enter('q1', 0);
    tracker.pause(4_000);

    const restored = DwellTimeTracker.restore(tracker.serialize(4_000));
    expect(restored.total('q1')).toBe(4_000);

    restored.resume(6_000);
    restored.leave(8_000);
    expect(restored.total('q1')).toBe(6_000);
  });

  it('serialize/restore round-trip keeps the paused flag', () => {
    const tracker = new DwellTimeTracker();
    tracker.enter('q1', 0);
    tracker.pause(4_000);

    const snapshot = tracker.serialize(4_000);
    expect(snapshot.paused).toBe(true);
    expect(snapshot.visitStartedAt).toBeNull();
    expect(snapshot.currentId).toBe('q1');

    const restored = DwellTimeTracker.restore(snapshot);
    expect(restored.total('q1', 900_000)).toBe(4_000);
  });
});
