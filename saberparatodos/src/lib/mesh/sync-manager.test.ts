import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SyncManager, syncManager, DEFAULT_SYNC_INTERVAL_MS } from './sync-manager';
import { questionCounter } from './question-counter';

describe('SyncManager', () => {
  let manager: SyncManager;

  beforeEach(() => {
    vi.useFakeTimers();
    questionCounter.reset();
    localStorage.clear();
    manager = new SyncManager();
  });

  afterEach(() => {
    manager.destroy();
    vi.restoreAllMocks();
  });

  it('should initialize with default sync tasks and report online status', () => {
    const status = manager.getSyncStatus();
    expect(status.isOnline).toBe(true);
    expect(status.isAutoSyncRunning).toBe(false);
    expect(status.isSyncing).toBe(false);
    expect(status.lastReport).toBeNull();
  });

  it('should allow registering and unregistering custom sync tasks', async () => {
    const mockTask = vi.fn().mockResolvedValue({
      taskName: 'custom-task',
      success: true,
      syncedCount: 5,
    });

    manager.registerSyncTask('custom-task', mockTask);
    const report = await manager.syncAll();

    expect(mockTask).toHaveBeenCalledTimes(1);
    const customResult = report.results.find((r) => r.taskName === 'custom-task');
    expect(customResult).toBeDefined();
    expect(customResult?.syncedCount).toBe(5);

    manager.unregisterSyncTask('custom-task');
    const newReport = await manager.syncAll();
    expect(newReport.results.find((r) => r.taskName === 'custom-task')).toBeUndefined();
  });

  it('should start and stop 5-minute periodic auto-sync timer', () => {
    const syncAllSpy = vi.spyOn(manager, 'syncAll').mockResolvedValue({
      timestamp: Date.now(),
      isOnline: true,
      totalTasksRan: 3,
      results: [],
    });

    manager.startAutoSync(DEFAULT_SYNC_INTERVAL_MS);
    expect(manager.isAutoSyncRunning()).toBe(true);

    // Fast-forward 5 minutes (300,000 ms)
    vi.advanceTimersByTime(DEFAULT_SYNC_INTERVAL_MS);
    expect(syncAllSpy).toHaveBeenCalledTimes(1);

    // Fast-forward another 5 minutes
    vi.advanceTimersByTime(DEFAULT_SYNC_INTERVAL_MS);
    expect(syncAllSpy).toHaveBeenCalledTimes(2);

    manager.stopAutoSync();
    expect(manager.isAutoSyncRunning()).toBe(false);

    vi.advanceTimersByTime(DEFAULT_SYNC_INTERVAL_MS);
    expect(syncAllSpy).toHaveBeenCalledTimes(2);
  });

  it('should process question counter batch increments during sync', async () => {
    questionCounter.increment('q-test-1', 10);
    expect(questionCounter.getTotalPendingIncrements()).toBe(10);

    const report = await manager.syncAll();
    const counterTask = report.results.find((r) => r.taskName === 'question-counter-batch');

    expect(counterTask).toBeDefined();
    expect(counterTask?.syncedCount).toBe(10);
    expect(questionCounter.getTotalPendingIncrements()).toBe(0);
  });

  it('should calculate pending queue count across modules', async () => {
    questionCounter.increment('q-test-1', 3);
    questionCounter.increment('q-test-2', 2);

    const pendingCount = await manager.getPendingQueueCount();
    expect(pendingCount).toBeGreaterThanOrEqual(5);
  });

  it('should trigger immediate sync when online network event fires', () => {
    const syncAllSpy = vi.spyOn(manager, 'syncAll').mockResolvedValue({
      timestamp: Date.now(),
      isOnline: true,
      totalTasksRan: 3,
      results: [],
    });

    // Simulate online window event
    window.dispatchEvent(new Event('online'));

    expect(syncAllSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle offline mode gracefully during syncAll', async () => {
    vi.spyOn(manager, 'isOnline').mockReturnValue(false);
    questionCounter.increment('q-offline', 4);

    const report = await manager.syncAll();
    expect(report.isOnline).toBe(false);
    // Offline sync still processes local question counter batch updates
    expect(report.totalTasksRan).toBe(1);
    expect(questionCounter.getTotalPendingIncrements()).toBe(0);
  });
});
