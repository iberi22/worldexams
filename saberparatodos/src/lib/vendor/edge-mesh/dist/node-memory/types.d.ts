import type * as Y from "yjs";
import type { EdgeMesh } from "../edge-mesh.js";
export type MemoryKind = "ydoc" | "semantic" | "agent" | string;
export interface NodeMemoryOptions {
    appId: string;
    instanceId: string;
    xavierUrl?: string;
    xavierToken?: string;
    ttlMs?: number;
    mesh?: EdgeMesh;
}
export interface MemoryRecord {
    id: string;
    appId: string;
    instanceId: string;
    kind: MemoryKind;
    content: string;
    contentHash: string;
    timestamp: number;
    title?: string;
    synced: boolean;
}
export interface MemoryEvent {
    type: "saved" | "synced" | "loaded";
    record: MemoryRecord;
}
export interface NodeMemory {
    persistYDoc(doc: Y.Doc, kind: MemoryKind): Promise<void>;
    loadFromXavier(path: string, query: string, limit?: number): Promise<MemoryRecord[]>;
    saveMemory(content: string, title: string, kind: MemoryKind): Promise<void>;
    subscribeChanges(cb: (ev: MemoryEvent) => void): () => void;
    flushOffline(): Promise<number>;
}
//# sourceMappingURL=types.d.ts.map