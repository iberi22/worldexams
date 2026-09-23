import { openDB } from "idb";
export class IdbStore {
    dbName;
    storeName = "records";
    db = null;
    initPromise = null;
    useInMemory;
    memoryStore = new Map();
    constructor(appId, instanceId) {
        this.dbName = `node-memory-${appId}-${instanceId}`;
        this.useInMemory =
            typeof globalThis === "undefined" || !globalThis.indexedDB;
    }
    async init() {
        if (this.useInMemory)
            return null;
        if (this.db)
            return this.db;
        if (this.initPromise)
            return this.initPromise;
        const storeName = this.storeName;
        try {
            this.initPromise = openDB(this.dbName, 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, { keyPath: "id" });
                    }
                },
            });
            this.db = await this.initPromise;
            return this.db;
        }
        catch (e) {
            console.warn("[IdbStore] Failed to open IndexedDB, falling back to in-memory.", e);
            this.db = null;
            this.initPromise = null;
            this.useInMemory = true;
            return null;
        }
    }
    async saveRecord(record) {
        const db = await this.init();
        if (db) {
            await db.put(this.storeName, record);
        }
        else {
            this.memoryStore.set(record.id, { ...record });
        }
    }
    async getRecord(id) {
        const db = await this.init();
        if (db) {
            const val = await db.get(this.storeName, id);
            return val || null;
        }
        const val = this.memoryStore.get(id);
        return val ? { ...val } : null;
    }
    async getRecordByHash(hash) {
        if (this.useInMemory) {
            for (const rec of this.memoryStore.values()) {
                if (rec.contentHash === hash) {
                    return { ...rec };
                }
            }
            return null;
        }
        const db = await this.init();
        if (db) {
            const records = (await db.getAll(this.storeName));
            for (const rec of records) {
                if (rec.contentHash === hash) {
                    return rec;
                }
            }
        }
        return null;
    }
    async hasHash(hash) {
        const record = await this.getRecordByHash(hash);
        return record !== null;
    }
    async getUnsyncedRecords() {
        if (this.useInMemory) {
            return Array.from(this.memoryStore.values())
                .filter((r) => !r.synced)
                .map((r) => ({ ...r }));
        }
        const db = await this.init();
        if (db) {
            const all = (await db.getAll(this.storeName));
            return all.filter((r) => !r.synced);
        }
        return [];
    }
    async getAllRecords() {
        if (this.useInMemory) {
            return Array.from(this.memoryStore.values()).map((r) => ({ ...r }));
        }
        const db = await this.init();
        if (db) {
            const all = (await db.getAll(this.storeName));
            return all;
        }
        return [];
    }
    async deleteRecord(id) {
        const db = await this.init();
        if (db) {
            await db.delete(this.storeName, id);
        }
        else {
            this.memoryStore.delete(id);
        }
    }
    async cleanExpired(ttlMs) {
        const now = Date.now();
        if (this.useInMemory) {
            for (const [id, rec] of this.memoryStore.entries()) {
                if (now - rec.timestamp > ttlMs) {
                    this.memoryStore.delete(id);
                }
            }
            return;
        }
        const db = await this.init();
        if (db) {
            const all = (await db.getAll(this.storeName));
            for (const rec of all) {
                if (now - rec.timestamp > ttlMs) {
                    await db.delete(this.storeName, rec.id);
                }
            }
        }
    }
    async clearAll() {
        if (this.useInMemory) {
            this.memoryStore.clear();
            return;
        }
        const db = await this.init();
        if (db) {
            await db.clear(this.storeName);
        }
    }
    async close() {
        if (this.db) {
            this.db.close();
            this.db = null;
            this.initPromise = null;
        }
    }
}
//# sourceMappingURL=idb-store.js.map