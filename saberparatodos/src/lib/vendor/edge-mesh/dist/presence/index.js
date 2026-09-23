import { createPostQuantumIdentity, generateKeypair, } from "../identity/index.js";
import { canonicalStringify } from "../protocol/canonical.js";
import { HealthChecker } from "./health.js";
// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const CONFIG_POR_DEFECTO = {
    heartbeatIntervalMs: 5_000,
    timeoutMs: 15_000,
    maxFallosConsecutivos: 3,
    latenciaAltaMs: 500,
    anuncioIntervalMs: 30_000,
};
export class MeshPresence {
    static onlineNodes = new Set();
    static isOnline(peerId) {
        return MeshPresence.onlineNodes.has(peerId);
    }
    static setOnline(peerId, online) {
        if (online) {
            MeshPresence.onlineNodes.add(peerId);
        }
        else {
            MeshPresence.onlineNodes.delete(peerId);
        }
    }
    static clear() {
        MeshPresence.onlineNodes.clear();
    }
}
export class PresenceManager {
    eventTarget;
    healthChecker;
    config;
    nodosConocidos;
    nodosAparecieron;
    transmitirHandler = null;
    intervaloAnuncio = null;
    onOnlineCallbacks = new Set();
    peerId;
    localIdentity;
    publicKeys = new Map();
    defaultIdentityValue;
    mesh = {
        broadcast: async (topic, payload) => {
            if (this.transmitirHandler) {
                await this.transmitirHandler(payload);
            }
        },
    };
    constructor(config = {}) {
        this.eventTarget = new EventTarget();
        this.config = { ...CONFIG_POR_DEFECTO, ...config };
        this.nodosConocidos = new Set();
        this.nodosAparecieron = new Set();
        const healthConfig = {
            heartbeatIntervalMs: this.config.heartbeatIntervalMs,
            timeoutMs: this.config.timeoutMs,
            maxFallosConsecutivos: this.config.maxFallosConsecutivos,
            latenciaAltaMs: this.config.latenciaAltaMs,
        };
        this.healthChecker = new HealthChecker(healthConfig);
        this.healthChecker.on("nodoCaido", (ev) => {
            this.nodosConocidos.delete(ev.detail.nodoId);
            this.emit("nodoDesaparecio", { nodoId: ev.detail.nodoId });
            MeshPresence.setOnline(ev.detail.nodoId, false);
        });
        this.healthChecker.on("saludCambiada", (ev) => {
            this.emit("estadoSaludCambiado", {
                nodoId: ev.detail.nodoId,
                estado: ev.detail.estadoNuevo,
            });
        });
        this.healthChecker.on("heartbeatRecibido", (ev) => {
            if (!this.nodosAparecieron.has(ev.detail.nodoId)) {
                this.nodosAparecieron.add(ev.detail.nodoId);
                if (!this.nodosConocidos.has(ev.detail.nodoId)) {
                    this.nodosConocidos.add(ev.detail.nodoId);
                    this.emit("nodoAparecio", { nodoId: ev.detail.nodoId });
                }
            }
            this.emit("latenciaActualizada", {
                nodoId: ev.detail.nodoId,
                latenciaMs: ev.detail.latenciaMs,
            });
            MeshPresence.setOnline(ev.detail.nodoId, true);
            this.onOnline(ev.detail.nodoId);
        });
    }
    // ─── INICIO / DETENCION ──────────────────────────────────────────────
    async iniciar(nodoId, transmitir, identity) {
        this.peerId = nodoId;
        this.transmitirHandler = transmitir;
        if (identity) {
            this.localIdentity = identity;
            this.registrarClavePublica(nodoId, identity.exportarPublico());
        }
        this.healthChecker.iniciar();
        this.intervaloAnuncio = setInterval(() => {
            this.anunciarPresencia(nodoId);
        }, this.config.anuncioIntervalMs);
        // Anuncio inicial
        this.anunciarPresencia(nodoId);
    }
    detener() {
        this.healthChecker.detener();
        if (this.intervaloAnuncio !== null) {
            clearInterval(this.intervaloAnuncio);
            this.intervaloAnuncio = null;
        }
        this.nodosConocidos.clear();
        this.nodosAparecieron.clear();
        this.transmitirHandler = null;
    }
    registrarClavePublica(nodoId, parPublico) {
        this.publicKeys.set(nodoId, parPublico);
    }
    getPublicKey(peerId) {
        return this.publicKeys.get(peerId);
    }
    get defaultIdentity() {
        if (!this.defaultIdentityValue) {
            this.defaultIdentityValue = createPostQuantumIdentity("default-presence", generateKeypair("ephemera"));
            // Also register its public key
            this.registrarClavePublica("default-presence", this.defaultIdentityValue.exportarPublico());
        }
        return this.defaultIdentityValue;
    }
    async sendHeartbeat(identity) {
        const payload = {
            peerId: this.peerId,
            timestamp: Date.now(),
            status: "online",
        };
        const canonical = canonicalStringify(payload);
        payload.signature = await identity.sign(canonical);
        await this.mesh.broadcast("presence:heartbeat", payload);
    }
    async onHeartbeat(peerId, signed, identity) {
        // Verify timestamp is within 30s window (A-03 / replay defense)
        const ahora = Date.now();
        if (Math.abs(ahora - signed.timestamp) > 30_000) {
            return false;
        }
        const payload = {
            peerId: signed.peerId,
            timestamp: signed.timestamp,
            status: signed.status,
        };
        const publicKey = this.getPublicKey(peerId);
        if (!publicKey) {
            return false;
        }
        return identity.verify(canonicalStringify(payload), signed.signature, publicKey);
    }
    async anunciarPresencia(nodoId) {
        if (this.transmitirHandler === null)
            return;
        if (this.localIdentity) {
            await this.sendHeartbeat(this.localIdentity).catch(() => {
                // Ignorar errores de transmision
            });
        }
        else {
            const heartbeat = this.healthChecker.generarHeartbeat(nodoId);
            await this.transmitirHandler(heartbeat).catch(() => {
                // Ignorar errores de transmision
            });
        }
    }
    // ─── PROCESAR PRESENCIA ──────────────────────────────────────────────
    async procesarHeartbeat(datos) {
        if (esSignedHeartbeat(datos)) {
            const identityToUse = this.localIdentity || this.defaultIdentity;
            const ok = await this.onHeartbeat(datos.peerId, datos, identityToUse);
            if (ok) {
                this.healthChecker.recibirHeartbeat(datos.peerId, datos.timestamp);
            }
        }
        else if (esHeartbeatValido(datos)) {
            this.healthChecker.recibirHeartbeat(datos.nodoId, datos.timestamp);
        }
    }
    // ─── CONSULTAS ───────────────────────────────────────────────────────
    obtenerNodosActivos() {
        return this.healthChecker.obtenerNodosActivos();
    }
    obtenerNodosConocidos() {
        return Array.from(this.nodosConocidos);
    }
    obtenerSalud(nodoId) {
        return this.healthChecker.obtenerSalud(nodoId);
    }
    obtenerLatencia(nodoId) {
        return this.healthChecker.obtenerLatencia(nodoId);
    }
    obtenerTotalNodos() {
        return this.nodosConocidos.size;
    }
    onOnline(peerId, callback) {
        if (callback) {
            this.onOnlineCallbacks.add(callback);
        }
        else {
            for (const cb of this.onOnlineCallbacks) {
                try {
                    cb(peerId);
                }
                catch (e) {
                    console.error("Error in onOnline callback:", e);
                }
            }
        }
    }
    /**
     * Registra un listener global que se invoca con el peerId cuando un nodo
     * pasa a online (sin requerir el peerId en la llamada).
     */
    addOnlineListener(callback) {
        this.onOnlineCallbacks.add(callback);
    }
    // ─── EVENTOS ─────────────────────────────────────────────────────────
    on(tipo, handler) {
        this.eventTarget.addEventListener(tipo, handler);
    }
    off(tipo, handler) {
        this.eventTarget.removeEventListener(tipo, handler);
    }
    emit(tipo, detalle) {
        const evento = new CustomEvent(tipo, { detail: detalle });
        this.eventTarget.dispatchEvent(evento);
    }
    reiniciar() {
        this.detener();
        this.healthChecker.reiniciar();
        this.nodosConocidos.clear();
        this.nodosAparecieron.clear();
    }
}
function esHeartbeatValido(valor) {
    if (typeof valor !== "object" || valor === null)
        return false;
    const hb = valor;
    return (typeof hb.nodoId === "string" &&
        typeof hb.timestamp === "number" &&
        typeof hb.secuencia === "number");
}
function esSignedHeartbeat(valor) {
    if (typeof valor !== "object" || valor === null)
        return false;
    const hb = valor;
    return (typeof hb.peerId === "string" &&
        typeof hb.timestamp === "number" &&
        (hb.status === "online" || hb.status === "away" || hb.status === "busy") &&
        typeof hb.signature === "string");
}
//# sourceMappingURL=index.js.map