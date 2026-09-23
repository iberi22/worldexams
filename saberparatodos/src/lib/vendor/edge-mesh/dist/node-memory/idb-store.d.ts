import type { MemoryRecord } from "./types.js";
export declare class IdbStore {
    private readonly dbName;
    private readonly storeName;
    private db;
    private initPromise;
    private useInMemory;
    private readonly memoryStore;
    constructor(appId: string, instanceId: string);
    private init;
    saveRecord(record: MemoryRecord): Promise<void>;
    getRecord(id: string): Promise<MemoryRecord | null>;
    getRecordByHash(hash: string): Promise<MemoryRecord | null>;
    hasHash(hash: string): Promise<boolean>;
    getUnsyncedRecords(): Promise<MemoryRecord[]>;
    getAllRecords(): Promise<MemoryRecord[]>;
    deleteRecord(id: string): Promise<void>;
    cleanExpired(ttlMs: number): Promise<void>;
    clearAll(): Promise<void>;
    close(): Promise<void>;
}
//# sourceMappingURL=idb-store.d.ts.map