import type { EdgeMesh } from "../edge-mesh.js";
import { type NodeMemory } from "../node-memory/index.js";
export interface MalocaBackofficeOptions {
    mesh: EdgeMesh;
    instanceId: string;
    xavierUrl?: string;
    xavierToken?: string;
    ttlMs?: number;
}
/**
 * Maloca Backoffice unificado que adopta edge-mesh, Xavier y node-memory.
 */
export declare class MalocaBackoffice {
    readonly mesh: EdgeMesh;
    readonly nodeMemory: NodeMemory;
    readonly instanceId: string;
    constructor(opts: MalocaBackofficeOptions);
    /**
     * Persiste una sesión o decisión como un documento Y.Doc
     */
    registrarSesion(doc: any, tipo?: string): Promise<void>;
    /**
     * Guarda una decisión o evento semántico en la memoria del agente (Xavier)
     */
    registrarDecision(descripcion: string, titulo: string): Promise<void>;
    /**
     * Recupera RAG/decisiones desde Xavier
     */
    buscarDecisiones(query: string, limit?: number): Promise<any[]>;
}
//# sourceMappingURL=backoffice.d.ts.map