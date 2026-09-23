import type { NodoId } from "../types/index.js";
export interface SyncChunk<T = unknown> {
    readonly id: string;
    readonly docId: string;
    readonly payload: T;
    readonly lamportTimestamp: number;
    readonly nodeId: NodoId;
    readonly version: number;
    readonly createdAt: number;
}
export interface ChunkConflictResolution<T = unknown> {
    readonly winner: SyncChunk<T>;
    readonly loser: SyncChunk<T>;
    readonly resolutionStrategy: "lamport" | "node_tiebreak" | "manual";
}
export interface ChunkSyncConfig {
    readonly nodeId: NodoId;
    readonly maxRetries?: number;
    readonly retryDelayMs?: number;
}
export declare class ChunkSyncManager<T = unknown> {
    readonly nodeId: NodoId;
    private currentLamport;
    private readonly chunks;
    private readonly retryQueue;
    private readonly maxRetries;
    private readonly retryDelayMs;
    constructor(config: ChunkSyncConfig);
    getLamportTimestamp(): number;
    tick(): number;
    createChunk(docId: string, payload: T): SyncChunk<T>;
    receiveChunk(incoming: SyncChunk<T>): {
        accepted: boolean;
        resolution?: ChunkConflictResolution<T>;
    };
    getChunk(docId: string): SyncChunk<T> | undefined;
    enqueueRetry(chunk: SyncChunk<T>): void;
    getPendingRetries(): SyncChunk<T>[];
    clearQueue(): void;
}
//# sourceMappingURL=ChunkSyncManager.d.ts.map