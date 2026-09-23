import type { YjsAdapter } from "../edge-mesh.js";
import type { OpLog } from "../op-log/index.js";
import type { PresenceManager } from "../presence/index.js";
import type { MetadatosCompartidos } from "./types.js";
export declare class MetadataManager {
    private readonly yjs;
    private readonly presence;
    private readonly metadataMap;
    private readonly oplog?;
    constructor(yjs: YjsAdapter, presence: PresenceManager, oplog?: OpLog);
    getNetworkStatus(): {
        nodosActivos: number;
        totalNodos: number;
        latencias: {
            id: import("../index.js").NodoId;
            latencia: number | null;
        }[];
        latenciaPromedio: number;
        topologia: "mesh-p2p";
        timestamp: number;
    };
    getProfileCache(): {
        count: number;
        lastUpdate: number;
    };
    syncMetadata(key?: string, value?: any): Promise<void>;
    getProjectInfo(projectId: string): {} | null;
    getSharedMetadata(): MetadatosCompartidos;
}
//# sourceMappingURL=metadata.d.ts.map