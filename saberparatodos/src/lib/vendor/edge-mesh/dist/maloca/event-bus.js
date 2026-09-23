import { InMemoryStorage } from "../storage/index.js";
// ─── EVENT TYPES ───────────────────────────────────────────────────────────
export const TIPO_EVENTO_MALOCA = {
    NODE_CONNECT: "NODE_CONNECT",
    NODE_DISCONNECT: "NODE_DISCONNECT",
    PROFILE_CREATED: "PROFILE_CREATED",
    PROFILE_UPDATED: "PROFILE_UPDATED",
    KARMA_TRANSACTION: "KARMA_TRANSACTION",
    PLUGIN_REGISTERED: "PLUGIN_REGISTERED",
    PLUGIN_DISCOVERED: "PLUGIN_DISCOVERED",
    DOC_NOTARIZED: "DOC_NOTARIZED",
    MESH_HEARTBEAT: "MESH_HEARTBEAT",
};
export class PersistentEventQueueImpl {
    storage;
    namespace;
    constructor(storage, namespace) {
        this.storage = storage;
        this.namespace = namespace;
    }
    async enqueue(event) {
        const key = `events:bus:${this.namespace}:${event.timestamp}:${Math.random().toString(36).substring(2, 9)}`;
        await this.storage.set(key, event);
    }
    async dequeueAll() {
        return this.replay(this.namespace);
    }
    async replay(namespace) {
        const prefix = `events:bus:${namespace}`;
        const entries = await this.storage.list({ prefijo: prefix });
        const now = Date.now();
        const validEvents = [];
        for (const entry of entries) {
            const event = entry.valor;
            if (now - event.timestamp < 3600000) {
                validEvents.push(event);
            }
            await this.storage.delete(entry.key);
        }
        return validEvents;
    }
    async clear() {
        const prefix = `events:bus:${this.namespace}`;
        await this.storage.clear(prefix);
    }
    async size() {
        const prefix = `events:bus:${this.namespace}`;
        const entries = await this.storage.list({ prefijo: prefix });
        const now = Date.now();
        let count = 0;
        for (const entry of entries) {
            const event = entry.valor;
            if (now - event.timestamp < 3600000) {
                count++;
            }
            else {
                await this.storage.delete(entry.key);
            }
        }
        return count;
    }
}
// ─── EVENT BUS ─────────────────────────────────────────────────────────────
export class EventBus extends EventTarget {
    mesh;
    opLog;
    handlers;
    NAMESPACE = "_maloca:events";
    queue;
    constructor(mesh, opLog, storage) {
        super();
        this.mesh = mesh;
        this.opLog = opLog;
        this.handlers = new Map();
        const actualStorage = storage ??
            opLog.storage ??
            new InMemoryStorage();
        this.queue = new PersistentEventQueueImpl(actualStorage, this.NAMESPACE);
        // Unir a namespace para ruteo de gossip
        void this.mesh.unirANamespace(this.NAMESPACE);
        // Escuchar eventos de la red
        this.mesh.addEventListener("gossipRecibido", (ev) => {
            const customEv = ev;
            const { mensaje } = customEv.detail;
            if (mensaje.namespace === this.NAMESPACE) {
                this.procesarEventoRemoto(mensaje.payload);
            }
        });
        // Replay automático al reconectar
        this.mesh.addEventListener("peerConectado", () => {
            void this.reconnectHandler();
        });
    }
    async emit(tipo, payload, destino = "*") {
        const evento = {
            tipo,
            origen: this.mesh.config.nodoId,
            destino,
            payload,
            timestamp: Date.now(),
        };
        // Registrar en OpLog local
        await this.opLog.append(`event:${tipo}`, evento, this.mesh.config.nodoId);
        // Emitir localmente
        this.notificarHandlers(evento);
        // Si es para toda la red o un nodo remoto
        if (destino === "*" || destino !== this.mesh.config.nodoId) {
            const peers = this.mesh.obtenerPeersEnNamespace(this.NAMESPACE);
            if (peers.length === 0) {
                await this.queue.enqueue(evento);
            }
            else {
                await this.mesh.transmitirConGossip(this.NAMESPACE, evento);
            }
        }
    }
    subscribe(tipo, handler) {
        const tipoStr = tipo;
        let set = this.handlers.get(tipoStr);
        if (!set) {
            set = new Set();
            this.handlers.set(tipoStr, set);
        }
        set.add(handler);
    }
    unsubscribe(tipo, handler) {
        const set = this.handlers.get(tipo);
        if (set) {
            set.delete(handler);
        }
    }
    async broadcastToPlugin(_pluginId, evento) {
        await this.emit(evento.tipo, evento.payload);
    }
    async getEventLog() {
        const ops = await this.opLog.obtenerTodas();
        return ops
            .filter((op) => op.tipo.startsWith("event:"))
            .map((op) => op.datos);
    }
    async reconnectHandler() {
        const peers = this.mesh.obtenerPeersEnNamespace(this.NAMESPACE);
        if (peers.length > 0) {
            const eventsToReplay = await this.queue.dequeueAll();
            for (const event of eventsToReplay) {
                await this.mesh.transmitirConGossip(this.NAMESPACE, event);
            }
        }
    }
    procesarEventoRemoto(evento) {
        // Evitar procesar eventos propios que vuelvan por gossip (aunque MeshManager ya lo hace)
        if (evento.origen === this.mesh.config.nodoId)
            return;
        // Verificar si es para nosotros o broadcast
        if (evento.destino === "*" || evento.destino === this.mesh.config.nodoId) {
            this.notificarHandlers(evento);
        }
    }
    notificarHandlers(evento) {
        const handlers = this.handlers.get(evento.tipo);
        if (handlers) {
            for (const handler of handlers) {
                try {
                    handler(evento);
                }
                catch (err) {
                    console.error(`Error en handler de evento ${evento.tipo}:`, err);
                }
            }
        }
        // También emitir vía EventTarget estándar
        this.dispatchEvent(new CustomEvent(evento.tipo, { detail: evento }));
    }
}
//# sourceMappingURL=event-bus.js.map