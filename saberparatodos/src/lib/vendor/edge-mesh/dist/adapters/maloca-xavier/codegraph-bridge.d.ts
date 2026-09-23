import type { EdgeMesh } from "../../edge-mesh.js";
export interface CodeGraphEntry {
    readonly id: string;
    readonly path: string;
    readonly metadata: Record<string, unknown>;
    readonly dependencies: readonly string[];
}
export declare class CodeGraphAdapter {
    private readonly edgeMesh;
    private readonly INDEX_MAP_NAME;
    private readonly CODEGRAPH_NAMESPACE;
    constructor(edgeMesh: EdgeMesh);
    /**
     * Realiza una búsqueda distribuida en el code-graph.
     * Por ahora, consulta el índice compartido en el Y.Map.
     */
    searchGraph(query: string): readonly CodeGraphEntry[];
    /**
     * Indexa un plugin en el code-graph compartido.
     */
    indexPlugin(pluginPath: string, metadata: Record<string, unknown>, dependencies: readonly string[]): Promise<void>;
    /**
     * Obtiene las dependencias de un módulo a través del mesh.
     */
    getDependencies(moduleId: string): readonly string[];
}
//# sourceMappingURL=codegraph-bridge.d.ts.map