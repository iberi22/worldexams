import type { OpLog } from "../op-log/index.js";
import { type IStorage } from "../storage/index.js";
export interface SnapshotConfig {
    /** Intervalo de auto-snapshot en ms. Default: 300000 (5 min). */
    intervalMs: number;
    /** Máximo de snapshots retenidos. Default: 3. */
    maxSnapshots: number;
    /** Namespaces a incluir en el snapshot. Vacío = todos. */
    include: string[];
}
export interface Snapshot {
    id: string;
    timestamp: number;
    state: Record<string, unknown>;
    prevSnapshotId?: string;
    signature?: string;
}
export interface SnapshotManagerOptions {
    storage?: IStorage;
    opLog?: OpLog;
    /** Proveedor de estado para auto-snapshot y recover. */
    getState?: () => Record<string, unknown> | Promise<Record<string, unknown>>;
    /** Si true (default cuando hay getState), inicia auto-snapshot. */
    autoStart?: boolean;
    intervalMs?: number;
    maxSnapshots?: number;
    include?: string[];
    /** Ops a conservar tras compactar. Default: 0. */
    opLogKeepLast?: number;
}
/**
 * Snapshot Manager orientado a recovery de estado y compactación de OpLog.
 * Coexiste con el SnapshotManager legacy de `index.ts` (versionado por doc).
 */
export declare class SnapshotManager {
    private readonly config;
    private readonly storage;
    private readonly opLog;
    private readonly getState;
    private readonly opLogKeepLast;
    private timer;
    private latestId;
    private pendingAuto;
    constructor(options?: SnapshotManagerOptions);
    /** Persiste un snapshot del estado (filtrado por `include` si aplica). */
    takeSnapshot(state: Record<string, unknown>): Promise<Snapshot>;
    /** Devuelve el snapshot más reciente, o null. */
    getLatestSnapshot(): Promise<Snapshot | null>;
    /** Restaura el estado desde el último snapshot. */
    recoverFromSnapshot(): Promise<Record<string, unknown> | null>;
    /**
     * Compacta el OpLog asociado tras un snapshot (descarta ops antiguas).
     * No-op si no hay OpLog configurado.
     */
    compactOpLog(): Promise<void>;
    /** Detiene el timer de auto-snapshot. */
    stop(): void;
    /** Espera a que termine el auto-snapshot en curso (útil en tests). */
    flushAutoSnapshot(): Promise<void>;
    /** Indica si el auto-snapshot está activo. */
    isAutoSnapshotRunning(): boolean;
    obtenerConfig(): Readonly<SnapshotConfig>;
    private startAutoSnapshot;
    private runAutoSnapshot;
    private filterState;
    private listSnapshots;
    private pruneOldSnapshots;
    private clave;
    private computeSignature;
}
export declare function createRecoverySnapshotManager(options?: SnapshotManagerOptions): SnapshotManager;
//# sourceMappingURL=manager.d.ts.map