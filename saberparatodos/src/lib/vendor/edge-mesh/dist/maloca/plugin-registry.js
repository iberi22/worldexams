// ─── PLUGIN REGISTRY ───────────────────────────────────────────────────────
export class PluginRegistry extends EventTarget {
    mesh;
    plugins;
    NAMESPACE = "_maloca:plugins";
    constructor(mesh) {
        super();
        this.mesh = mesh;
        this.plugins = new Map();
        // Escuchar eventos de gossip para descubrir plugins de otros nodos
        this.mesh.addEventListener("gossipRecibido", (ev) => {
            const customEv = ev;
            const { mensaje } = customEv.detail;
            if (mensaje.namespace === this.NAMESPACE) {
                this.onPluginEvent(mensaje.payload);
            }
        });
    }
    async register(plugin) {
        const info = {
            ...plugin,
            nodoId: this.mesh.config.nodoId,
            timestamp: Date.now(),
            estado: "activo",
        };
        this.plugins.set(info.id, info);
        // Notificar a la red
        await this.mesh.transmitirConGossip(this.NAMESPACE, {
            tipo: "PLUGIN_REGISTERED",
            plugin: info,
        });
        this.dispatchEvent(new CustomEvent("pluginRegistrado", { detail: info }));
    }
    discover(tipo, capacidad) {
        return Array.from(this.plugins.values()).filter((p) => {
            const matchTipo = tipo ? p.tipo === tipo : true;
            const matchCapacidad = capacidad
                ? p.capacidades.includes(capacidad)
                : true;
            return matchTipo && matchCapacidad;
        });
    }
    getPlugin(pluginId) {
        return this.plugins.get(pluginId) ?? null;
    }
    listPlugins() {
        return Array.from(this.plugins.values());
    }
    async healthCheck(pluginId) {
        const plugin = this.plugins.get(pluginId);
        if (!plugin)
            return false;
        // Si es local, asumimos que está vivo si está en el mapa (o podríamos chequear endpoint)
        if (plugin.nodoId === this.mesh.config.nodoId) {
            return plugin.estado === "activo";
        }
        // Si es remoto, chequeamos si el nodo está activo en el mesh
        const peerInfo = this.mesh.obtenerPeerInfo(plugin.nodoId);
        return peerInfo !== null && peerInfo.estado === "activo";
    }
    onPluginEvent(evento) {
        if (typeof evento !== "object" || evento === null)
            return;
        const payload = evento;
        if (payload.tipo === "PLUGIN_REGISTERED" ||
            payload.tipo === "PLUGIN_DISCOVERED") {
            const { plugin } = payload;
            this.plugins.set(plugin.id, {
                ...plugin,
                timestamp: Date.now(), // Actualizar timestamp de avistamiento
            });
            this.dispatchEvent(new CustomEvent("pluginDescubierto", { detail: plugin }));
        }
    }
}
//# sourceMappingURL=plugin-registry.js.map