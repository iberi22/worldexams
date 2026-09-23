import type { IdbStore } from "./idb-store.js";
import type { MemoryEvent } from "./types.js";
import type { XavierStore } from "./xavier-store.js";
export declare class SyncFlushManager {
    private readonly idbStore;
    private readonly xavierStore;
    private readonly onEvent;
    constructor(idbStore: IdbStore, xavierStore: XavierStore, onEvent: (ev: MemoryEvent) => void);
    flushOffline(): Promise<number>;
}
//# sourceMappingURL=sync-flush.d.ts.map