export class CodeGraphAdapter {
    edgeMesh;
    INDEX_MAP_NAME = "xavier:codegraph:index";
    CODEGRAPH_NAMESPACE = "xavier:codegraph";
    constructor(edgeMesh) {
        this.edgeMesh = edgeMesh;
    }
    /**
     * Realiza una búsqueda distribuida en el code-graph.
     * Por ahora, consulta el índice compartido en el Y.Map.
     */
    searchGraph(query) {
        const indexMap = this.edgeMesh.yjsAdapter.getMap(this.INDEX_MAP_NAME);
        const results = [];
        for (const entry of indexMap.values()) {
            const e = entry;
            if (e.id.includes(query) || e.path.includes(query)) {
                results.push(e);
            }
        }
        return results;
    }
    /**
     * Indexa un plugin en el code-graph compartido.
     */
    async indexPlugin(pluginPath, metadata, dependencies) {
        // 1. Asegurar que estamos en el namespace
        const ns = this.edgeMesh.namespaces.obtenerEspacioPorNombre(this.CODEGRAPH_NAMESPACE);
        let nsId;
        if (!ns) {
            const newNs = this.edgeMesh.namespaces.crearEspacio(this.CODEGRAPH_NAMESPACE);
            nsId = newNs.id;
        }
        else {
            nsId = ns.id;
        }
        this.edgeMesh.namespaces.unirNodo(nsId, this.edgeMesh.config.nodoId);
        // 2. Actualizar el índice compartido
        const indexMap = this.edgeMesh.yjsAdapter.getMap(this.INDEX_MAP_NAME);
        const id = `plugin:${pluginPath}`;
        const entry = {
            id,
            path: pluginPath,
            metadata,
            dependencies,
        };
        indexMap.set(id, entry);
    }
    /**
     * Obtiene las dependencias de un módulo a través del mesh.
     */
    getDependencies(moduleId) {
        const indexMap = this.edgeMesh.yjsAdapter.getMap(this.INDEX_MAP_NAME);
        const entry = indexMap.get(moduleId);
        return entry?.dependencies ?? [];
    }
}
//# sourceMappingURL=codegraph-bridge.js.map