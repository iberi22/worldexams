/**
 * CRDT G-Counter (Grow-Only Counter) for question usage tracking.
 *
 * Requirements:
 * - Edge-mesh namespace: swallow/worldexams/counters
 * - Batch sync every 5 minutes (300,000 ms)
 * - Offline accumulation & durability
 * - Rate limit: max 100 increments per batch
 */

import { getOrCreateSwalInstanceId } from '../swal-instance-id';

export const EDGE_MESH_COUNTERS_NAMESPACE = 'swallow/worldexams/counters';
export const DEFAULT_BATCH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
export const MAX_INCREMENTS_PER_BATCH = 100;

const STORAGE_STATE_KEY = 'swallow.worldexams.counters.state';
const STORAGE_PENDING_KEY = 'swallow.worldexams.counters.pending';

/** G-Counter CRDT state matrix: questionId -> nodeId -> count */
export type QuestionCounterState = Record<string, Record<string, number>>;

/** Result returned after running a batch sync operation */
export interface BatchSyncResult {
  syncedIncrements: number;
  remainingPending: number;
  namespace: string;
  isOnline: boolean;
}

export class QuestionCounter {
  public readonly namespace: string = EDGE_MESH_COUNTERS_NAMESPACE;
  private nodeId: string;
  private state: QuestionCounterState = {};
  private pendingIncrements: Record<string, number> = {};
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(nodeId?: string) {
    this.nodeId = nodeId ?? getOrCreateSwalInstanceId();
    this.loadFromStorage();
  }

  /** Set or update the active node ID */
  public setNodeId(nodeId: string): void {
    this.nodeId = nodeId;
  }

  public getNodeId(): string {
    return this.nodeId;
  }

  /** Load persisted CRDT state & pending local buffer from localStorage */
  private loadFromStorage(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const rawState = localStorage.getItem(STORAGE_STATE_KEY);
      if (rawState) {
        this.state = JSON.parse(rawState) as QuestionCounterState;
      }
      const rawPending = localStorage.getItem(STORAGE_PENDING_KEY);
      if (rawPending) {
        this.pendingIncrements = JSON.parse(rawPending) as Record<string, number>;
      }
    } catch {
      // Fallback to empty state on parse/quota errors
    }
  }

  /** Persist current CRDT state & pending buffer to localStorage */
  private saveToStorage(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_STATE_KEY, JSON.stringify(this.state));
      localStorage.setItem(STORAGE_PENDING_KEY, JSON.stringify(this.pendingIncrements));
    } catch {
      // Storage quota error handling
    }
  }

  /** Check online status of the environment */
  public isOnline(): boolean {
    if (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean') {
      return navigator.onLine;
    }
    return true;
  }

  /**
   * Increment usage count for a specific question.
   * Accumulates locally when offline or between sync batches.
   */
  public increment(questionId: string, amount: number = 1): void {
    if (amount <= 0) return;
    this.pendingIncrements[questionId] = (this.pendingIncrements[questionId] || 0) + amount;
    this.saveToStorage();
  }

  /**
   * Get total count for a given question across all nodes in CRDT state,
   * including any pending local increments.
   */
  public getCount(questionId: string): number {
    let total = 0;

    // Sum across all node IDs in state vector
    const nodeMap = this.state[questionId];
    if (nodeMap) {
      for (const nodeId in nodeMap) {
        total += nodeMap[nodeId] || 0;
      }
    }

    // Include local unflushed pending increments
    total += this.pendingIncrements[questionId] || 0;

    return total;
  }

  /**
   * Get total counts for all tracked questions (including pending local increments).
   */
  public getAllCounts(): Record<string, number> {
    const questionIds = new Set<string>([
      ...Object.keys(this.state),
      ...Object.keys(this.pendingIncrements),
    ]);

    const result: Record<string, number> = {};
    for (const qId of questionIds) {
      const count = this.getCount(qId);
      if (count > 0) {
        result[qId] = count;
      }
    }
    return result;
  }

  /**
   * Returns the pending local increments queue that are waiting to be synced.
   */
  public getPendingIncrements(): Record<string, number> {
    return { ...this.pendingIncrements };
  }

  /**
   * Returns total number of pending increment units queued.
   */
  public getTotalPendingIncrements(): number {
    return Object.values(this.pendingIncrements).reduce((acc, val) => acc + val, 0);
  }

  /**
   * Returns full CRDT state matrix (questionId -> nodeId -> count).
   */
  public getState(): QuestionCounterState {
    // Deep clone to prevent external mutation
    const clone: QuestionCounterState = {};
    for (const qId in this.state) {
      clone[qId] = { ...this.state[qId] };
    }
    return clone;
  }

  /**
   * Merge a remote G-Counter state vector into local state.
   * Follows state-based CRDT join-semilattice property:
   *   merged[qId][nodeId] = max(local[qId][nodeId], remote[qId][nodeId])
   */
  public merge(remoteState: QuestionCounterState): void {
    if (!remoteState || typeof remoteState !== 'object') return;

    for (const qId in remoteState) {
      const remoteNodeMap = remoteState[qId];
      if (!remoteNodeMap || typeof remoteNodeMap !== 'object') continue;

      if (!this.state[qId]) {
        this.state[qId] = {};
      }

      for (const nId in remoteNodeMap) {
        const remoteVal = remoteNodeMap[nId];
        if (typeof remoteVal === 'number' && remoteVal >= 0) {
          const localVal = this.state[qId][nId] || 0;
          this.state[qId][nId] = Math.max(localVal, remoteVal);
        }
      }
    }

    this.saveToStorage();
  }

  /**
   * Execute batch sync operation:
   * - Applies up to MAX_INCREMENTS_PER_BATCH (100) pending local increments to local node's vector.
   * - Retains any remaining pending increments for future batches.
   * - Syncs updated CRDT state vector to the edge-mesh namespace `swallow/worldexams/counters`.
   */
  public sync(): BatchSyncResult {
    const totalPending = this.getTotalPendingIncrements();
    let incrementsToSync = Math.min(totalPending, MAX_INCREMENTS_PER_BATCH);
    let syncedIncrements = 0;

    if (incrementsToSync > 0) {
      for (const qId in this.pendingIncrements) {
        if (incrementsToSync <= 0) break;

        const pending = this.pendingIncrements[qId];
        if (pending <= 0) continue;

        const syncAmount = Math.min(pending, incrementsToSync);

        // Commit syncAmount to local node vector in CRDT state
        if (!this.state[qId]) {
          this.state[qId] = {};
        }
        this.state[qId][this.nodeId] = (this.state[qId][this.nodeId] || 0) + syncAmount;

        // Deduct from pending queue
        this.pendingIncrements[qId] -= syncAmount;
        if (this.pendingIncrements[qId] <= 0) {
          delete this.pendingIncrements[qId];
        }

        incrementsToSync -= syncAmount;
        syncedIncrements += syncAmount;
      }
    }

    const remainingPending = this.getTotalPendingIncrements();
    const online = this.isOnline();

    // Save updated state and pending queue locally
    this.saveToStorage();

    return {
      syncedIncrements,
      remainingPending,
      namespace: this.namespace,
      isOnline: online,
    };
  }

  /**
   * Start 5-minute periodic batch auto-sync timer.
   */
  public startAutoSync(intervalMs: number = DEFAULT_BATCH_INTERVAL_MS): void {
    this.stopAutoSync();
    this.timer = setInterval(() => {
      this.sync();
    }, intervalMs);
  }

  /**
   * Stop auto-sync timer.
   */
  public stopAutoSync(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * Returns true if auto-sync timer is running.
   */
  public isAutoSyncRunning(): boolean {
    return this.timer !== null;
  }

  /**
   * Reset local state and pending increments (mainly for testing/clearing).
   */
  public reset(): void {
    this.stopAutoSync();
    this.state = {};
    this.pendingIncrements = {};
    this.saveToStorage();
  }
}

/** Singleton instance export */
export const questionCounter = new QuestionCounter();
