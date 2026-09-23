import type { EdgeMesh } from "../../edge-mesh.js";
import type { PerfilLicitante } from "./types.js";
export declare class LicitanteProfileAdapter {
    private readonly mesh;
    private readonly profileCreatedHandlers;
    constructor(mesh: EdgeMesh);
    private setupListeners;
    /**
     * Registra un manejador para cuando se crea un nuevo perfil de licitante.
     */
    onProfileCreated(handler: (perfil: PerfilLicitante) => void): () => void;
    /**
     * Actualiza el karma de un licitante y lo sincroniza en el mesh.
     */
    onKarmaChange(licitanteId: string, delta: number): Promise<void>;
    /**
     * Consulta la reputación (karma) de un licitante desde el mesh.
     */
    getLicitanteReputation(id: string): number;
}
//# sourceMappingURL=licitante-profile.d.ts.map