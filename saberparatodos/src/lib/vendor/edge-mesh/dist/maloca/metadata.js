export class MetadataManager {
    yjs;
    presence;
    metadataMap;
    oplog;
    constructor(yjs, presence, oplog) {
        this.yjs = yjs;
        this.presence = presence;
        this.metadataMap = this.yjs.getMap("maloca:metadata");
        this.oplog = oplog;
    }
    getNetworkStatus() {
        const nodosActivos = this.presence.obtenerNodosActivos();
        const totalNodos = this.presence.obtenerTotalNodos();
        const latencias = nodosActivos.map((id) => ({
            id,
            latencia: this.presence.obtenerLatencia(id),
        }));
        const validLatencies = latencias
            .map((l) => l.latencia)
            .filter((lat) => typeof lat === "number" && lat >= 0);
        const latenciaPromedio = validLatencies.length > 0
            ? validLatencies.reduce((a, b) => a + b, 0) /
                validLatencies.length
            : 0;
        return {
            nodosActivos: nodosActivos.length,
            totalNodos,
            latencias,
            latenciaPromedio,
            topologia: "mesh-p2p",
            timestamp: Date.now(),
        };
    }
    getProfileCache() {
        const profiles = this.yjs.getMap("maloca:profiles");
        return {
            count: profiles.size,
            lastUpdate: Date.now(),
        };
    }
    async syncMetadata(key, value) {
        if (key !== undefined) {
            this.metadataMap.set(key, value);
            if (this.oplog) {
                await this.oplog.append("metadata:sync", { key, value }, "metadata-manager");
            }
        }
        else if (this.oplog) {
            await this.oplog.cargarDesdeStorage();
            const ops = await this.oplog.obtenerTodas();
            for (const op of ops) {
                if (op.tipo === "metadata:sync") {
                    const data = op.datos;
                    this.metadataMap.set(data.key, data.value);
                }
            }
        }
    }
    getProjectInfo(projectId) {
        // Project info could be stored in metadataMap or a specialized projectMap
        const projects = this.yjs.getMap("maloca:projects");
        return projects.get(projectId) || null;
    }
    getSharedMetadata() {
        const status = this.getNetworkStatus();
        const profiles = this.getProfileCache();
        return {
            red: {
                nombre: "SWAL Mesh",
                version: "1.0.0",
                nodosActivos: status.nodosActivos,
            },
            perfiles: profiles.count,
            repositorios: this.metadataMap.get("repositorios") || [],
            plugins: this.metadataMap.get("plugins") || [],
        };
    }
}
//# sourceMappingURL=metadata.js.map