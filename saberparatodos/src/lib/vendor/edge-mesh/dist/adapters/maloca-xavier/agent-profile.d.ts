import type { EdgeMesh } from "../../edge-mesh.js";
import type { HealthStatus, NodoId } from "../../types/index.js";
export interface AgentProfile {
    readonly id: NodoId;
    readonly nombre: string;
    readonly capacidades: readonly string[];
    readonly metadatos: Record<string, unknown>;
}
export declare class AgentProfileAdapter {
    private readonly edgeMesh;
    private readonly PROFILES_MAP_NAME;
    private readonly AGENTS_NAMESPACE;
    constructor(edgeMesh: EdgeMesh);
    /**
     * Registra un perfil de agente en el mesh.
     * El agente se une al namespace de agentes y publica su perfil en un Y.Map compartido.
     */
    registerAgent(profile: AgentProfile): Promise<void>;
    /**
     * Obtiene el estado de salud de un agente a través del PresenceManager.
     */
    getAgentStatus(agentId: NodoId): HealthStatus | null;
    /**
     * Descubre agentes que posean una capacidad específica.
     */
    discoverAgents(capacidad: string): readonly AgentProfile[];
    /**
     * Obtiene todos los perfiles de agentes registrados.
     */
    getAllProfiles(): readonly AgentProfile[];
}
//# sourceMappingURL=agent-profile.d.ts.map