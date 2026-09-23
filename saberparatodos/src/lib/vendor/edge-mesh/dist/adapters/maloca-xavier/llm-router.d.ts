import type { EdgeMesh } from "../../edge-mesh.js";
import type { HealthStatus, NodoId } from "../../types/index.js";
export interface PromptRouteResponse {
    readonly providerId: NodoId;
    readonly latencyMs: number;
}
export declare class LLMRouterAdapter {
    private readonly edgeMesh;
    private readonly PROFILES_MAP_NAME;
    constructor(edgeMesh: EdgeMesh);
    /**
     * Enruta un prompt al mejor proveedor disponible en el mesh que soporte el modelo requerido.
     * "Mejor" se define aquí como el de menor latencia entre los que están online.
     */
    routePrompt(prompt: string, requiredModel: string): Promise<PromptRouteResponse | null>;
    /**
     * Obtiene el estado de un proveedor LLM.
     */
    getProviderStatus(providerId: NodoId): HealthStatus | null;
    /**
     * Comparte contexto con un grupo de agentes.
     */
    shareContext(contexto: unknown, agentIds: readonly NodoId[]): Promise<void>;
}
//# sourceMappingURL=llm-router.d.ts.map