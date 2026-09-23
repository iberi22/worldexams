import * as Y from "yjs";
import type { IStorage } from "./index.js";
export interface YDocPersistenceOptions {
    /** Maximum number of incremental updates to keep before compaction. Default is 100. */
    readonly maxUpdatesBeforeCompaction?: number;
}
export declare class YDocPersistence {
    private readonly docName;
    private readonly doc;
    private readonly storage;
    private readonly updateHandler;
    private readonly maxUpdatesBeforeCompaction;
    private updateCount;
    /** Promise that resolves when the document is fully loaded and rehydrated from storage. */
    readonly whenLoaded: Promise<void>;
    constructor(docName: string, doc: Y.Doc, storage: IStorage, options?: YDocPersistenceOptions);
    private load;
    private toUint8Array;
    private storeUpdate;
    /**
     * Compacts the incremental updates of the document into a single snapshot/update
     * and clears previous individual incremental updates to save storage.
     */
    compact(): Promise<void>;
    destroy(): void;
}
//# sourceMappingURL=ydoc-persistence.d.ts.map