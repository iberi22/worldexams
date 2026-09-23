import { InMemoryStorage } from "../storage/index.js";
// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const DEFAULT_INTERVAL_MS = 300_000;
const DEFAULT_MAX_SNAPSHOTS = 3;
const STORAGE_PREFIX = "snapshot:recovery:";
const LATEST_KEY = `${STORAGE_PREFIX}latest`;
// ─── SNAPSHOT MANAGER (recovery + OpLog compaction) ────────────────────────
/**
 * Snapshot Manager orientado a recovery de estado y compactación de OpLog.
 * Coexiste con el SnapshotManager legacy de `index.ts` (versionado por doc).
 */
export class SnapshotManager {
    config;
    storage;
    opLog;
    getState;
    opLogKeepLast;
    timer = null;
    latestId = null;
    pendingAuto = null;
    constructor(options = {}) {
        this.storage = options.storage ?? new InMemoryStorage();
        this.opLog = options.opLog ?? null;
        this.getState = options.getState ?? null;
        this.opLogKeepLast = options.opLogKeepLast ?? 0;
        this.config = {
            intervalMs: options.intervalMs ?? DEFAULT_INTERVAL_MS,
            maxSnapshots: options.maxSnapshots ?? DEFAULT_MAX_SNAPSHOTS,
            include: options.include ?? [],
        };
        const shouldAutoStart = options.autoStart ?? this.getState !== null;
        if (shouldAutoStart) {
            this.startAutoSnapshot();
        }
    }
    /** Persiste un snapshot del estado (filtrado por `include` si aplica). */
    async takeSnapshot(state) {
        const filtered = this.filterState(state);
        const prevSnapshotId = this.latestId ?? undefined;
        const id = `snap-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        const timestamp = Date.now();
        const snapshot = {
            id,
            timestamp,
            state: filtered,
            ...(prevSnapshotId !== undefined ? { prevSnapshotId } : {}),
            signature: this.computeSignature(filtered),
        };
        await this.storage.set(this.clave(id), snapshot);
        await this.storage.set(LATEST_KEY, { id });
        this.latestId = id;
        await this.pruneOldSnapshots();
        return snapshot;
    }
    /** Devuelve el snapshot más reciente, o null. */
    async getLatestSnapshot() {
        if (this.latestId !== null) {
            const entry = await this.storage.get(this.clave(this.latestId));
            if (entry !== null)
                return entry.valor;
        }
        const meta = await this.storage.get(LATEST_KEY);
        if (meta !== null) {
            this.latestId = meta.valor.id;
            const entry = await this.storage.get(this.clave(meta.valor.id));
            if (entry !== null)
                return entry.valor;
        }
        const all = await this.listSnapshots();
        if (all.length === 0)
            return null;
        const latest = all.reduce((a, b) => a.timestamp >= b.timestamp ? a : b);
        this.latestId = latest.id;
        return latest;
    }
    /** Restaura el estado desde el último snapshot. */
    async recoverFromSnapshot() {
        const latest = await this.getLatestSnapshot();
        if (latest === null)
            return null;
        return structuredClone(latest.state);
    }
    /**
     * Compacta el OpLog asociado tras un snapshot (descarta ops antiguas).
     * No-op si no hay OpLog configurado.
     */
    async compactOpLog() {
        if (this.opLog === null)
            return;
        await this.opLog.comprimir(this.opLogKeepLast);
    }
    /** Detiene el timer de auto-snapshot. */
    stop() {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    /** Espera a que termine el auto-snapshot en curso (útil en tests). */
    async flushAutoSnapshot() {
        if (this.pendingAuto !== null) {
            await this.pendingAuto;
        }
    }
    /** Indica si el auto-snapshot está activo. */
    isAutoSnapshotRunning() {
        return this.timer !== null;
    }
    obtenerConfig() {
        return { ...this.config };
    }
    startAutoSnapshot() {
        if (this.timer !== null)
            return;
        if (this.config.intervalMs <= 0)
            return;
        this.timer = setInterval(() => {
            this.pendingAuto = this.runAutoSnapshot().finally(() => {
                this.pendingAuto = null;
            });
        }, this.config.intervalMs);
    }
    async runAutoSnapshot() {
        if (this.getState === null)
            return;
        const state = await this.getState();
        await this.takeSnapshot(state);
        await this.compactOpLog();
    }
    filterState(state) {
        if (this.config.include.length === 0) {
            return structuredClone(state);
        }
        const filtered = {};
        for (const ns of this.config.include) {
            if (Object.hasOwn(state, ns)) {
                filtered[ns] = structuredClone(state[ns]);
            }
        }
        return filtered;
    }
    async listSnapshots() {
        const entries = await this.storage.list({ prefijo: STORAGE_PREFIX });
        const snapshots = [];
        for (const entry of entries) {
            if (entry.key === LATEST_KEY)
                continue;
            const valor = entry.valor;
            if (typeof valor === "object" &&
                valor !== null &&
                typeof valor.id === "string" &&
                typeof valor.timestamp === "number") {
                snapshots.push(valor);
            }
        }
        return snapshots;
    }
    async pruneOldSnapshots() {
        const all = await this.listSnapshots();
        if (all.length <= this.config.maxSnapshots)
            return;
        const ordenados = [...all].sort((a, b) => a.timestamp - b.timestamp);
        const aEliminar = ordenados.slice(0, ordenados.length - this.config.maxSnapshots);
        for (const snap of aEliminar) {
            await this.storage.delete(this.clave(snap.id));
        }
    }
    clave(id) {
        return `${STORAGE_PREFIX}${id}`;
    }
    computeSignature(state) {
        const json = JSON.stringify(state);
        let h = 2166136261;
        for (let i = 0; i < json.length; i++) {
            h ^= json.charCodeAt(i);
            h = Math.imul(h, 16777619);
        }
        return (h >>> 0).toString(16).padStart(8, "0");
    }
}
export function createRecoverySnapshotManager(options) {
    return new SnapshotManager(options);
}
//# sourceMappingURL=manager.js.map