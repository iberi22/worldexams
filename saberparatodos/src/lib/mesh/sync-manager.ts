/**
 * Centralized Sync Manager for Offline-First PWA & Mesh Coordination.
 *
 * Orchestrates periodic batch sync every 5 minutes (300,000 ms),
 * persistent offline queue management, and immediate reconnect syncing.
 *
 * Modules coordinated:
 * - QuestionCounter (CRDT G-Counter delta-only batch sync)
 * - LeaderboardService (batch score submissions)
 * - PartySessions (offline session sync)
 */

import { questionCounter, type BatchSyncResult } from './question-counter';
import { syncPendingScores, getLocalPendingScores } from '../leaderboard-service';
import { getUnsyncedPartySessions, markPartySessionSynced } from '../idb-storage';

export const DEFAULT_SYNC_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes batch interval

export interface SyncTaskResult {
  taskName: string;
  success: boolean;
  syncedCount: number;
  details?: Record<string, unknown>;
  error?: string;
}

export interface SyncManagerReport {
  timestamp: number;
  isOnline: boolean;
  totalTasksRan: number;
  results: SyncTaskResult[];
}

export type SyncTaskHandler = () => Promise<SyncTaskResult> | SyncTaskResult;

export class SyncManager {
  private timer: ReturnType<typeof setInterval> | null = null;
  private syncTasks: Map<string, SyncTaskHandler> = new Map();
  private isSyncing = false;
  private lastReport: SyncManagerReport | null = null;
  private boundOnlineHandler: (() => void) | null = null;

  constructor() {
    this.registerDefaultTasks();
    this.setupNetworkListeners();
  }

  /**
   * Check current network status.
   */
  public isOnline(): boolean {
    if (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean') {
      return navigator.onLine;
    }
    return true;
  }

  /**
   * Set up window listeners for online/offline events.
   * On reconnect, triggers immediate sync.
   */
  private setupNetworkListeners(): void {
    if (typeof window === 'undefined') return;

    this.boundOnlineHandler = () => {
      console.log('[SyncManager] Network reconnected - triggering immediate sync');
      this.syncAll();
    };

    window.addEventListener('online', this.boundOnlineHandler);
  }

  /**
   * Register default offline-first mesh sync tasks.
   */
  private registerDefaultTasks(): void {
    // Task 1: Question Counter Delta Batch Sync
    this.registerSyncTask('question-counter-batch', async () => {
      const result: BatchSyncResult = questionCounter.sync();
      return {
        taskName: 'question-counter-batch',
        success: true,
        syncedCount: result.syncedIncrements,
        details: {
          remainingPending: result.remainingPending,
          namespace: result.namespace,
        },
      };
    });

    // Task 2: Leaderboard Score Submissions Batch Sync
    this.registerSyncTask('leaderboard-batch', async () => {
      const syncedCount = await syncPendingScores();
      const remainingPending = getLocalPendingScores().filter((s) => !s.synced).length;
      return {
        taskName: 'leaderboard-batch',
        success: true,
        syncedCount,
        details: {
          remainingPending,
        },
      };
    });

    // Task 3: Unsynced Party Sessions Batch Sync
    this.registerSyncTask('party-sessions-batch', async () => {
      const unsynced = await getUnsyncedPartySessions();
      let syncedCount = 0;

      for (const session of unsynced) {
        try {
          await markPartySessionSynced(session.sessionId);
          syncedCount++;
        } catch {
          // Continue syncing remaining sessions
        }
      }

      return {
        taskName: 'party-sessions-batch',
        success: true,
        syncedCount,
        details: {
          remainingPending: unsynced.length - syncedCount,
        },
      };
    });
  }

  /**
   * Register a custom sync task handler.
   */
  public registerSyncTask(name: string, handler: SyncTaskHandler): void {
    this.syncTasks.set(name, handler);
  }

  /**
   * Unregister a sync task.
   */
  public unregisterSyncTask(name: string): void {
    this.syncTasks.delete(name);
  }

  /**
   * Trigger immediate sync across all registered offline-first sync tasks.
   */
  public async syncAll(): Promise<SyncManagerReport> {
    if (this.isSyncing) {
      return (
        this.lastReport || {
          timestamp: Date.now(),
          isOnline: this.isOnline(),
          totalTasksRan: 0,
          results: [],
        }
      );
    }

    this.isSyncing = true;
    const isOnline = this.isOnline();
    const results: SyncTaskResult[] = [];

    if (!isOnline) {
      console.log('[SyncManager] Currently offline, skipping remote sync tasks');
      // Even if offline, question counter can process local batch updates
      try {
        const counterTask = this.syncTasks.get('question-counter-batch');
        if (counterTask) {
          const res = await counterTask();
          results.push(res);
        }
      } catch (e) {
        results.push({
          taskName: 'question-counter-batch',
          success: false,
          syncedCount: 0,
          error: String(e),
        });
      }

      this.isSyncing = false;
      this.lastReport = {
        timestamp: Date.now(),
        isOnline: false,
        totalTasksRan: results.length,
        results,
      };
      return this.lastReport;
    }

    for (const entry of Array.from(this.syncTasks.entries())) {
      const name = entry[0];
      const task = entry[1];
      try {
        const result = await task();
        results.push(result);
      } catch (err) {
        console.error(`[SyncManager] Task "${name}" failed during sync:`, err);
        results.push({
          taskName: name,
          success: false,
          syncedCount: 0,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    this.isSyncing = false;
    this.lastReport = {
      timestamp: Date.now(),
      isOnline: true,
      totalTasksRan: results.length,
      results,
    };

    return this.lastReport;
  }

  /**
   * Start 5 min periodic batch auto-sync timer.
   */
  public startAutoSync(intervalMs: number = DEFAULT_SYNC_INTERVAL_MS): void {
    this.stopAutoSync();
    this.timer = setInterval(() => {
      this.syncAll();
    }, intervalMs);
  }

  /**
   * Stop auto-sync timer and remove listeners.
   */
  public stopAutoSync(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * Returns true if 5 min auto-sync timer is running.
   */
  public isAutoSyncRunning(): boolean {
    return this.timer !== null;
  }

  /**
   * Get total number of pending items queued across all modules.
   */
  public async getPendingQueueCount(): Promise<number> {
    const pendingCounter = questionCounter.getTotalPendingIncrements();
    const pendingScores = getLocalPendingScores().filter((s) => !s.synced).length;
    const unsyncedSessions = (await getUnsyncedPartySessions()).length;

    return pendingCounter + pendingScores + unsyncedSessions;
  }

  /**
   * Get current sync status report.
   */
  public getSyncStatus(): {
    isOnline: boolean;
    isAutoSyncRunning: boolean;
    isSyncing: boolean;
    lastReport: SyncManagerReport | null;
  } {
    return {
      isOnline: this.isOnline(),
      isAutoSyncRunning: this.isAutoSyncRunning(),
      isSyncing: this.isSyncing,
      lastReport: this.lastReport,
    };
  }

  /**
   * Cleanup resource bindings.
   */
  public destroy(): void {
    this.stopAutoSync();
    if (typeof window !== 'undefined' && this.boundOnlineHandler) {
      window.removeEventListener('online', this.boundOnlineHandler);
    }
  }
}

/** Singleton instance export */
export const syncManager = new SyncManager();
