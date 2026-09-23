import type { MemoryRecord, NodeMemoryOptions } from "./types.js";
export declare class XavierStore {
    private readonly xavierUrl;
    private readonly xavierToken?;
    private readonly appId;
    private readonly instanceId;
    constructor(opts: NodeMemoryOptions);
    private getHeaders;
    postRecord(record: MemoryRecord): Promise<boolean>;
    loadRecords(path: string, query: string, limit?: number): Promise<MemoryRecord[]>;
}
//# sourceMappingURL=xavier-store.d.ts.map