import { EdgeMesh } from "../edge-mesh.js";
import { KarmaManager } from "./karma.js";
import { MetadataManager } from "./metadata.js";
import { ProfileManager } from "./perfil.js";
export class MalocaKernel extends EdgeMesh {
    profiles;
    karma;
    metadata;
    adapters = new Map();
    constructor(config) {
        super(config);
        const profileOpLog = this.obtenerOLog("maloca_profiles");
        this.profiles = new ProfileManager(profileOpLog);
        const karmaOpLog = this.obtenerOLog("maloca_karma");
        this.karma = new KarmaManager(karmaOpLog, this.identity, (nodeId) => this.obtenerClavePublica(nodeId));
        const metadataOpLog = this.obtenerOLog("maloca_metadata");
        this.metadata = new MetadataManager(this.yjsAdapter, this.presence, metadataOpLog);
    }
    async iniciar() {
        await super.iniciar();
        await this.profiles.loadProfiles(this.snapshotRestored);
        await this.karma.loadFromOpLog(this.snapshotRestored);
        await this.metadata.syncMetadata();
    }
    async registerNode(tipo, identidad, metadatos) {
        if (tipo === "humano") {
            const perfil = {
                id: this.config.nodoId,
                identidad,
                alias: metadatos.alias || "Anónimo",
                nodos: [this.config.nodoId],
                proyectos: [],
                metadatos,
            };
            await this.profiles.upsertProfile(perfil, this.config.nodoId);
        }
        else {
            const perfil = {
                id: this.config.nodoId,
                tipo: metadatos.tipo || "servicio",
                version: metadatos.version || "1.0.0",
                capacidades: metadatos.capacidades || [],
            };
            await this.profiles.upsertProfile(perfil, this.config.nodoId);
        }
    }
    connectProject(projectId, adapter) {
        this.adapters.set(projectId, adapter);
    }
    async broadcastToNetwork(evento) {
        await this.transmitir({
            tipo: "maloca_evento",
            payload: evento,
        });
    }
    getNetworkStatus() {
        return {
            nodoId: this.config.nodoId,
            peers: this.presence.obtenerNodosActivos(),
            proyectosConectados: Array.from(this.adapters.keys()),
            perfilesRegistrados: this.profiles.listProfiles().length,
        };
    }
    getProfile(nodeId) {
        return this.profiles.getProfile(nodeId);
    }
    async emitKarma(tx) {
        await this.karma.emit(tx);
    }
}
//# sourceMappingURL=kernel.js.map