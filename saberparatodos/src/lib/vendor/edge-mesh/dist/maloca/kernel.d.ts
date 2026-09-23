import { EdgeMesh } from "../edge-mesh.js";
import type { EdgeMeshConfig, NodoId } from "../types/index.js";
import { KarmaManager, type TransaccionKarma } from "./karma.js";
import { MetadataManager } from "./metadata.js";
import { type Perfil, ProfileManager } from "./perfil.js";
export declare class MalocaKernel extends EdgeMesh {
    readonly profiles: ProfileManager;
    readonly karma: KarmaManager;
    readonly metadata: MetadataManager;
    private adapters;
    constructor(config: EdgeMeshConfig);
    iniciar(): Promise<void>;
    registerNode(tipo: "humano" | "servicio", identidad: Uint8Array, metadatos: Record<string, any>): Promise<void>;
    connectProject(projectId: string, adapter: any): void;
    broadcastToNetwork(evento: any): Promise<void>;
    getNetworkStatus(): any;
    getProfile(nodeId: NodoId): Perfil | undefined;
    emitKarma(tx: Omit<TransaccionKarma, "firma" | "timestamp" | "id">): Promise<void>;
}
//# sourceMappingURL=kernel.d.ts.map