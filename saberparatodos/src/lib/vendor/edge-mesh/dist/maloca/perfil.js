export class ProfileManager {
    oplog;
    cache = new Map();
    constructor(oplog) {
        this.oplog = oplog;
    }
    /**
     * Carga todos los perfiles desde el OpLog hacia el cache en memoria.
     * Debe llamarse después de crear la instancia y antes de usar.
     */
    async loadProfiles(keepExistingCache = false) {
        await this.oplog.cargarDesdeStorage();
        if (!keepExistingCache) {
            this.cache.clear();
        }
        const ops = await this.oplog.obtenerTodas();
        for (const op of ops) {
            if (op.tipo === "profile:upsert") {
                const perfil = op.datos;
                this.cache.set(perfil.id, perfil);
            }
        }
    }
    exportCache() {
        return Array.from(this.cache.entries());
    }
    importCache(entries) {
        this.cache = new Map(entries);
    }
    /**
     * Registra o actualiza un perfil en la mesh.
     */
    async upsertProfile(perfil, autor) {
        this.cache.set(perfil.id, perfil);
        await this.oplog.append("profile:upsert", perfil, autor);
    }
    /**
     * Obtiene un perfil por su ID.
     */
    getProfile(id) {
        return this.cache.get(id);
    }
    /**
     * Lista todos los perfiles registrados.
     */
    listProfiles() {
        return Array.from(this.cache.values());
    }
    /**
     * Busca perfiles por alias (humanos) o por tipo (servicios).
     */
    searchProfiles(query) {
        const lower = query.toLowerCase();
        return this.listProfiles().filter((p) => {
            if ("alias" in p) {
                return p.alias.toLowerCase().includes(lower);
            }
            return p.id.toLowerCase().includes(lower);
        });
    }
    /**
     * Vincula un perfil humano a un proyecto.
     */
    async linkToProject(profileId, projectId) {
        const perfil = this.cache.get(profileId);
        if (!perfil)
            throw new Error(`Profile ${profileId} not found`);
        if (!("proyectos" in perfil))
            throw new Error(`Profile ${profileId} is not a human profile`);
        const updated = {
            ...perfil,
            proyectos: [...new Set([...perfil.proyectos, projectId])],
        };
        this.cache.set(profileId, updated);
        await this.upsertProfile(updated, profileId);
    }
    /**
     * Registra o actualiza un perfil en la mesh.
     */
    async register(profile) {
        await this.upsertProfile(profile, profile.id);
    }
    /**
     * Obtiene un perfil por su ID (cache local + lookup en la mesh/OpLog).
     */
    async get(id) {
        let profile = this.getProfile(id);
        if (!profile) {
            await this.loadProfiles(true);
            profile = this.getProfile(id);
        }
        return profile;
    }
    /**
     * Actualiza un perfil con sync.
     */
    async update(id, delta) {
        const existing = this.getProfile(id);
        if (!existing) {
            throw new Error(`Profile ${id} not found`);
        }
        const updated = { ...existing, ...delta };
        await this.upsertProfile(updated, id);
    }
    /**
     * Búsqueda distribuida de perfiles (recargando opLog).
     */
    async search(query) {
        await this.loadProfiles(true);
        return this.searchProfiles(query);
    }
}
//# sourceMappingURL=perfil.js.map