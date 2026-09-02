/**
 * lib-mesh-vault-sync.test.ts
 * Tests para SyncManager (vault-sync P2P) — F15 coverage.
 *
 * Complementa los tests existentes para VaultSync en tests/e2e/mesh-sync.
 * Cubre la API pública de sync-manager.ts con casos reales (no mocks).
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  SyncManager,
  syncManager,
  DEFAULT_SYNC_INTERVAL_MS
} from '../../src/lib/mesh/sync-manager';

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

  it('SyncManager.isOnline() devuelve boolean', () => {
    const mgr = new SyncManager();
    const online = mgr.isOnline();
    expect(typeof online).toBe('boolean');
  });

  it('SyncManager.registerSyncTask() acepta una task handler', () => {
    const mgr = new SyncManager();
    let called = false;
    mgr.registerSyncTask('test-task', () => {
      called = true;
      return { taskName: 'test-task', success: true, syncedCount: 1 };
    });
    mgr.unregisterSyncTask('test-task');
    expect(called).toBe(false); // No se ejecuta solo al registrar
  });

  it('SyncManager.getSyncStatus() devuelve un objeto con status', () => {
    const mgr = new SyncManager();
    const status = mgr.getSyncStatus();
    expect(status).toBeDefined();
    expect(status).toHaveProperty('isAutoSyncRunning');
    expect(typeof status.isAutoSyncRunning).toBe('boolean');
  });

  it('SyncManager.startAutoSync / stopAutoSync toggles isAutoSyncRunning', () => {
    const mgr = new SyncManager();
    expect(mgr.isAutoSyncRunning()).toBe(false);
    mgr.startAutoSync(60000); // 1 minuto
    expect(mgr.isAutoSyncRunning()).toBe(true);
    mgr.stopAutoSync();
    expect(mgr.isAutoSyncRunning()).toBe(false);
  });

  it('SyncManager.destroy() limpia recursos sin crashear', () => {
    const mgr = new SyncManager();
    mgr.startAutoSync(60000);
    mgr.destroy();
    expect(mgr.isAutoSyncRunning()).toBe(false);
  });
});