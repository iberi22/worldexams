export class LLMRouterAdapter {
    edgeMesh;
    PROFILES_MAP_NAME = "xavier:profiles";
    constructor(edgeMesh) {
        this.edgeMesh = edgeMesh;
    }
    /**
     * Enruta un prompt al mejor proveedor disponible en el mesh que soporte el modelo requerido.
     * "Mejor" se define aquí como el de menor latencia entre los que están online.
     */
    async routePrompt(prompt, requiredModel) {
        const profilesMap = this.edgeMesh.yjsAdapter.getMap(this.PROFILES_MAP_NAME);
        let bestProvider = null;
        let minLatency = Infinity;
        for (const [nodeId, profile] of profilesMap.entries()) {
            const p = profile;
            if (p.capacidades && p.capacidades.includes(requiredModel)) {
                const health = this.edgeMesh.presence.obtenerSalud(nodeId);
                if (health && health.estado === "saludable") {
                    if (health.latenciaMs < minLatency) {
                        minLatency = health.latenciaMs;
                        bestProvider = nodeId;
                    }
                }
            }
        }
        if (!bestProvider)
            return null;
        // En un escenario real, aquí se enviaría el prompt al proveedor.
        // Por ahora, simulamos el enrutamiento devolviendo la info del proveedor.
        await this.edgeMesh.enviar(bestProvider, {
            tipo: "xavier:prompt",
            prompt,
            model: requiredModel,
        });
        return {
            providerId: bestProvider,
            latencyMs: minLatency,
        };
    }
    /**
     * Obtiene el estado de un proveedor LLM.
     */
    getProviderStatus(providerId) {
        return this.edgeMesh.presence.obtenerSalud(providerId);
    }
    /**
     * Comparte contexto con un grupo de agentes.
     */
    async shareContext(contexto, agentIds) {
        const promises = agentIds.map((id) => this.edgeMesh.enviar(id, {
            tipo: "xavier:context",
            contexto,
        }));
        await Promise.allSettled(promises);
    }
}
//# sourceMappingURL=llm-router.js.map