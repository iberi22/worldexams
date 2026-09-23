export class AgentProfileAdapter {
    edgeMesh;
    PROFILES_MAP_NAME = "xavier:profiles";
    AGENTS_NAMESPACE = "xavier:agents";
    constructor(edgeMesh) {
        this.edgeMesh = edgeMesh;
    }
    /**
     * Registra un perfil de agente en el mesh.
     * El agente se une al namespace de agentes y publica su perfil en un Y.Map compartido.
     */
    async registerAgent(profile) {
        // 1. Unirse al namespace de agentes
        const ns = this.edgeMesh.namespaces.obtenerEspacioPorNombre(this.AGENTS_NAMESPACE);
        let nsId;
        if (!ns) {
            const newNs = this.edgeMesh.namespaces.crearEspacio(this.AGENTS_NAMESPACE);
            nsId = newNs.id;
        }
        else {
            nsId = ns.id;
        }
        this.edgeMesh.namespaces.unirNodo(nsId, profile.id);
        // 2. Guardar perfil en el Y.Map compartido a través del YjsAdapter
        const profilesMap = this.edgeMesh.yjsAdapter.getMap(this.PROFILES_MAP_NAME);
        profilesMap.set(profile.id, profile);
    }
    /**
     * Obtiene el estado de salud de un agente a través del PresenceManager.
     */
    getAgentStatus(agentId) {
        return this.edgeMesh.presence.obtenerSalud(agentId);
    }
    /**
     * Descubre agentes que posean una capacidad específica.
     */
    discoverAgents(capacidad) {
        const profilesMap = this.edgeMesh.yjsAdapter.getMap(this.PROFILES_MAP_NAME);
        const agents = [];
        for (const profile of profilesMap.values()) {
            const p = profile;
            if (p.capacidades && p.capacidades.includes(capacidad)) {
                agents.push(p);
            }
        }
        return agents;
    }
    /**
     * Obtiene todos los perfiles de agentes registrados.
     */
    getAllProfiles() {
        const profilesMap = this.edgeMesh.yjsAdapter.getMap(this.PROFILES_MAP_NAME);
        return Array.from(profilesMap.values());
    }
}
//# sourceMappingURL=agent-profile.js.map