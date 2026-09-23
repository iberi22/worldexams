export class SyncFlushManager {
    idbStore;
    xavierStore;
    onEvent;
    constructor(idbStore, xavierStore, onEvent) {
        this.idbStore = idbStore;
        this.xavierStore = xavierStore;
        this.onEvent = onEvent;
    }
    async flushOffline() {
        try {
            const unsynced = await this.idbStore.getUnsyncedRecords();
            if (unsynced.length === 0) {
                return 0;
            }
            let count = 0;
            for (const record of unsynced) {
                const success = await this.xavierStore.postRecord(record);
                if (success) {
                    record.synced = true;
                    await this.idbStore.saveRecord(record);
                    this.onEvent({
                        type: "synced",
                        record: { ...record },
                    });
                    count++;
                }
            }
            return count;
        }
        catch (e) {
            console.warn("[SyncFlushManager] Error flushing offline queue", e);
            return 0;
        }
    }
}
//# sourceMappingURL=sync-flush.js.map