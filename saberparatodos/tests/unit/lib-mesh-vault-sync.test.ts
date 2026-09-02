/**
 * lib-mesh-vault-sync.test.ts
 * Tests para SyncManager (vault-sync P2P) — F15 coverage.
 *
 * Complementa los tests existentes para VaultSync en tests/e2e/mesh-sync.
 * Cubre la API pública de sync-manager.ts con casos reales (no mocks).
 */
import { describe, it, expect } from 'vitest';
import {
  SyncManager,
  syncManager,
  DEFAULT_SYNC_INTERVAL_MS
} from '../../../src/lib/mesh/sync-manager';

describe('mesh vault sync — SyncManager (T3 F15)', () => {
  it('SyncManager es una clase exportable', () => {
    expect(typeof SyncManager).toBe('function');
  });

  it('DEFAULT_SYNC_INTERVAL_MS = 5 minutos (300000ms)', () => {
    expect(DEFAULT_SYNC_INTERVAL_MS).toBe(300000);
  });

  it('syncManager es una instancia singleton de SyncManager', () => {
    expect(syncManager).toBeInstanceOf(SyncManager);
  });

  it('SyncManager.start() puede llamarse sin error', async () => {
    const mgr = new SyncManager();
    await mgr.start();
    // No assertion on internal state — just verify it doesn't throw
    await mgr.stop();
  });

  it('SyncManager.registerTask() y runOnce() ejecutan tareas', async () => {
    const mgr = new SyncManager();
    let executed = false;
    mgr.registerTask('test-task', async () => {
      executed = true;
      return { taskId: 'test-task', status: 'success', durationMs: 1 };
    });
    const report = await mgr.runOnce();
    expect(executed).toBe(true);
    expect(report).toBeDefined();
  });

  it('SyncManager.runOnce() devuelve SyncManagerReport con tasks ejecutadas', async () => {
    const mgr = new SyncManager();
    mgr.registerTask('a', async () => ({ taskId: 'a', status: 'success', durationMs: 1 }));
    mgr.registerTask('b', async () => ({ taskId: 'b', status: 'success', durationMs: 1 }));
    const report = await mgr.runOnce();
    expect(report).toHaveProperty('startedAt');
    expect(report).toHaveProperty('finishedAt');
    expect(report).toHaveProperty('results');
  });

  it('SyncManager maneja errores de task sin crashear', async () => {
    const mgr = new SyncManager();
    mgr.registerTask('failing', async () => {
      throw new Error('simulated failure');
    });
    const report = await mgr.runOnce();
    // El report debe completarse aunque una task falle
    expect(report).toBeDefined();
  });
});