import { createNodeMemory } from "../node-memory/index.js";
/**
 * Maloca Backoffice unificado que adopta edge-mesh, Xavier y node-memory.
 */
export class MalocaBackoffice {
    mesh;
    nodeMemory;
    instanceId;
    constructor(opts) {
        this.mesh = opts.mesh;
        this.instanceId = opts.instanceId;
        this.nodeMemory = createNodeMemory({
            mesh: opts.mesh,
            appId: "maloca",
            instanceId: opts.instanceId,
            xavierUrl: opts.xavierUrl,
            xavierToken: opts.xavierToken,
            ttlMs: opts.ttlMs,
        });
    }
    /**
     * Persiste una sesión o decisión como un documento Y.Doc
     */
    async registrarSesion(doc, tipo = "sesion") {
        await this.nodeMemory.persistYDoc(doc, tipo);
    }
    /**
     * Guarda una decisión o evento semántico en la memoria del agente (Xavier)
     */
    async registrarDecision(descripcion, titulo) {
        await this.nodeMemory.saveMemory(descripcion, titulo, "decisiones");
    }
    /**
     * Recupera RAG/decisiones desde Xavier
     */
    async buscarDecisiones(query, limit) {
        return this.nodeMemory.loadFromXavier(`app/maloca/instance/${this.instanceId}`, query, limit);
    }
}
//# sourceMappingURL=backoffice.js.map