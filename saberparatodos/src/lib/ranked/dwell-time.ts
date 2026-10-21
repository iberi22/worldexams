/**
 * Pure, DOM-free dwell-time tracker.
 *
 * Accumulates the time a question stays VISIBLE across multiple visits. The
 * ranked exam used to compute `ms = Date.now() - questionStartTime` and reset
 * that baseline on every navigation/reload, which produced artificially low
 * values (a legitimate 13 s/question attempt got flagged because the median
 * dropped under 4 s). This tracker is monotonic per question: re-selecting an
 * answer never lowers the reported time.
 *
 * The tracker is serializable so it can live inside `ActiveRankedSession` and
 * survive a page reload. Time spent while the tab is hidden is not counted.
 *
 * Model:
 * - `totals` holds the *credited* visible milliseconds per question id.
 * - `currentId` is the question being looked at (even while paused).
 * - `visitStartedAt` is the start of the still-uncredited segment of the
 *   current visit; `null` means "no segment running" (paused, closed or
 *   restored from a snapshot).
 */
export interface DwellTimeState {
  /** Credited visible milliseconds per question id. */
  totals: Record<string, number>;
  /** Question currently being viewed (kept while paused). */
  currentId: string | null;
  /** Start of the current uncredited visit segment, or null when not running. */
  visitStartedAt: number | null;
  /** True while the tab is hidden: no visible time is accrued. */
  paused: boolean;
}

export class DwellTimeTracker {
  private state: DwellTimeState;

  constructor(initial: Partial<DwellTimeState> = {}) {
    this.state = {
      totals: { ...(initial.totals ?? {}) },
      currentId: initial.currentId ?? null,
      visitStartedAt: initial.visitStartedAt ?? null,
      paused: initial.paused ?? false
    };
  }

  /**
   * Opens a visible visit on `id` at `now`. Any previously open visit is
   * closed first (its elapsed time is credited). Entering while paused simply
   * reopens the visit: the hidden gap is never counted.
   */
  enter(id: string, now: number): void {
    this.closeVisit(now);
    this.state.currentId = id;
    this.state.visitStartedAt = now;
    this.state.paused = false;
  }

  /** Closes the current visit at `now`, crediting its elapsed time. */
  leave(now: number): void {
    this.closeVisit(now);
    this.state.currentId = null;
  }

  /**
   * Marks the current visit as interrupted (tab hidden). Elapsed time is
   * credited and the gap until `resume()` is not counted.
   */
  pause(now: number): void {
    if (this.state.paused) return;
    this.closeVisit(now);
    this.state.paused = true;
  }

  /** Re-opens the visit that was interrupted by `pause()`. */
  resume(now: number): void {
    if (!this.state.paused) return;
    this.state.paused = false;
    if (this.state.currentId !== null) {
      this.state.visitStartedAt = now;
    }
  }

  /**
   * Total visible milliseconds for `id`. When `now` is provided and the tracker
   * is currently inside that visit, the live elapsed time is included too.
   */
  total(id: string, now?: number): number {
    let total = this.state.totals[id] ?? 0;
    if (
      now !== undefined &&
      !this.state.paused &&
      this.state.currentId === id &&
      this.state.visitStartedAt !== null
    ) {
      total += Math.max(0, now - this.state.visitStartedAt);
    }
    return total;
  }

  /** The question currently being viewed, or `null` when no question is open. */
  current(): string | null {
    return this.state.currentId;
  }

  /**
   * Snapshot of the tracker. When `now` is given, the open visit segment is
   * credited up to that instant and keeps running, so persisting the tracker
   * never loses visible time nor inflates it.
   */
  serialize(now?: number): DwellTimeState {
    if (now !== undefined) {
      this.checkpoint(now);
    }
    return {
      totals: { ...this.state.totals },
      currentId: this.state.currentId,
      visitStartedAt: this.state.visitStartedAt,
      paused: this.state.paused
    };
  }

  /**
   * Restores a snapshot. A visit cannot span a page reload, so an open visit
   * is frozen: the offline gap is never counted as visible time. The caller is
   * expected to call `enter(questionId, now)` to open the visit again.
   */
  static restore(state: DwellTimeState): DwellTimeTracker {
    const tracker = new DwellTimeTracker(state);
    if (tracker.state.visitStartedAt !== null) {
      tracker.state.visitStartedAt = null;
      tracker.state.paused = true;
    }
    return tracker;
  }

  /** Credits the running segment up to `now` and restarts it at `now`. */
  private checkpoint(now: number): void {
    const id = this.state.currentId;
    if (id === null || this.state.visitStartedAt === null) return;
    const elapsed = now - this.state.visitStartedAt;
    if (elapsed > 0) {
      this.state.totals[id] = (this.state.totals[id] ?? 0) + elapsed;
    }
    this.state.visitStartedAt = now;
  }

  /** Credits the running segment and stops it. */
  private closeVisit(now: number): void {
    this.checkpoint(now);
    this.state.visitStartedAt = null;
  }
}
