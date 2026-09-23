export class LicitanteProfileAdapter {
    mesh;
    profileCreatedHandlers;
    constructor(mesh) {
        this.mesh = mesh;
        this.profileCreatedHandlers = new Set();
        this.setupListeners();
    }
    setupListeners() {
        const licitantesMap = this.mesh.yjsAdapter.getMap("veeduria:licitantes");
        licitantesMap.observe((event) => {
            event.changes.keys.forEach((change, key) => {
                if (change.action === "add") {
                    const perfil = licitantesMap.get(key);
                    for (const handler of this.profileCreatedHandlers) {
                        handler(perfil);
                    }
                }
            });
        });
    }
    /**
     * Registra un manejador para cuando se crea un nuevo perfil de licitante.
     */
    onProfileCreated(handler) {
        this.profileCreatedHandlers.add(handler);
        return () => this.profileCreatedHandlers.delete(handler);
    }
    /**
     * Actualiza el karma de un licitante y lo sincroniza en el mesh.
     */
    async onKarmaChange(licitanteId, delta) {
        const licitantesMap = this.mesh.yjsAdapter.getMap("veeduria:licitantes");
        const perfil = licitantesMap.get(licitanteId);
        if (perfil) {
            const nuevoPerfil = {
                ...perfil,
                karma: perfil.karma + delta,
            };
            licitantesMap.set(licitanteId, nuevoPerfil);
            await this.mesh.transmitir({
                tipo: "veeduria:karma_actualizado",
                licitanteId,
                delta,
                nuevoKarma: nuevoPerfil.karma,
            });
        }
    }
    /**
     * Consulta la reputación (karma) de un licitante desde el mesh.
     */
    getLicitanteReputation(id) {
        const licitantesMap = this.mesh.yjsAdapter.getMap("veeduria:licitantes");
        const perfil = licitantesMap.get(id);
        return perfil ? perfil.karma : 0;
    }
}
//# sourceMappingURL=licitante-profile.js.map