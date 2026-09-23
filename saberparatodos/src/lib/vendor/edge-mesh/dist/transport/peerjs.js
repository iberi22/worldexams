import Peer from "peerjs";
import { getReconnectDelay } from "../presence/peer-health.js";
import { createEnvelope, MessageDeduplicator } from "../protocol/index.js";
import { TIPO_MENSAJE, TIPO_TRANSPORTE } from "../types/index.js";
import { parseRelayUrl, resolveRelayUrl } from "./relay-config.js";
// ─── PEERJS TRANSPORT ──────────────────────────────────────────────────────
export class PeerJSTransport {
    tipo = TIPO_TRANSPORTE.PEERJS;
    eventTarget;
    nodoId;
    peer;
    opciones;
    conexiones;
    deduplicator;
    conectado = false;
    // Reconnection & queues
    reconnectAttempts = 0;
    reconnectTimer;
    pendingConnectionRequests = new Set();
    constructor(nodoId, options) {
        this.nodoId = nodoId;
        this.eventTarget = new EventTarget();
        this.conexiones = new Map();
        this.deduplicator = new MessageDeduplicator();
        this.opciones = options;
        this.iniciarPeer();
    }
    iniciarPeer() {
        if (this.peer) {
            try {
                this.peer.destroy();
            }
            catch {
                // Ignorar
            }
        }
        let host = this.opciones.host;
        let port = this.opciones.port;
        let path = this.opciones.path;
        let secure = this.opciones.secure;
        if (this.opciones.relayUrl ||
            process.env.SWAL_RELAY_URL ||
            process.env.SWAL_RELAY_PORT) {
            const resolvedUrl = resolveRelayUrl(this.opciones.relayUrl);
            const parsed = parseRelayUrl(resolvedUrl);
            if (!host)
                host = parsed.host;
            if (port === undefined)
                port = parsed.port;
            if (!path)
                path = parsed.path;
            if (secure === undefined)
                secure = parsed.secure;
        }
        this.peer = new Peer(this.opciones.peerId, {
            host,
            port,
            path,
            secure,
            key: this.opciones.key,
            debug: this.opciones.debug,
            config: this.opciones.config,
        });
        this.peer.on("open", () => {
            this.conectado = true;
            this.reconnectAttempts = 0;
            this.emit("conectado", { nodoId: this.nodoId });
            this.flushPendingConnections();
        });
        this.peer.on("connection", (conn) => {
            this.manejarConexion(conn);
        });
        this.peer.on("disconnected", () => {
            this.conectado = false;
            this.emit("desconectado", { nodoId: this.nodoId });
            this.programarReconexion();
        });
        this.peer.on("error", (error) => {
            this.emit("error", { mensaje: error.message, error });
            if (error.type === "unavailable-id" ||
                (error.message && error.message.includes("unavailable-id"))) {
                this.conectado = false;
                this.programarReinit();
            }
        });
    }
    programarReconexion() {
        if (this.reconnectTimer)
            return;
        const delay = getReconnectDelay(this.reconnectAttempts, {
            initialDelayMs: 100, // snappier delay for tests/robustness
            maxDelayMs: 15000,
        });
        this.reconnectAttempts++;
        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = undefined;
            if (this.peer && !this.peer.destroyed && !this.peer.disconnected) {
                return;
            }
            if (this.peer && !this.peer.destroyed) {
                try {
                    this.peer.reconnect();
                }
                catch {
                    this.iniciarPeer();
                }
            }
            else {
                this.iniciarPeer();
            }
        }, delay);
    }
    programarReinit() {
        if (this.reconnectTimer)
            return;
        const delay = getReconnectDelay(this.reconnectAttempts, {
            initialDelayMs: 100, // snappier delay for tests/robustness
            maxDelayMs: 15000,
        });
        this.reconnectAttempts++;
        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = undefined;
            this.iniciarPeer();
        }, delay);
    }
    flushPendingConnections() {
        for (const remotoId of this.pendingConnectionRequests) {
            this.pendingConnectionRequests.delete(remotoId);
            this.conectarRemoto(remotoId).catch((error) => {
                this.emit("error", {
                    mensaje: `No se pudo conectar al peer pendiente ${remotoId}`,
                    error,
                });
            });
        }
    }
    broadcastPeerList() {
        const peers = [this.opciones.peerId, ...this.obtenerConexiones()];
        this.transmitir({ peers }, TIPO_MENSAJE.PEER_LIST_UPDATE).catch((error) => {
            this.emit("error", {
                mensaje: "Error al transmitir la lista de peers",
                error,
            });
        });
    }
    // ─── EVENTOS ───────────────────────────────────────────────────────────
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
    // ─── CONEXION ──────────────────────────────────────────────────────────
    manejarConexion(conn) {
        const nodoRemoto = conn.peer;
        const alAbrir = () => {
            this.conexiones.set(nodoRemoto, conn);
            this.emit("conectado", { nodoId: nodoRemoto });
            this.broadcastPeerList();
        };
        if (conn.open) {
            alAbrir();
        }
        else {
            conn.once("open", alAbrir);
        }
        conn.on("data", (datos) => {
            this.manejarDatos(datos);
        });
        conn.on("close", () => {
            this.conexiones.delete(nodoRemoto);
            this.emit("desconectado", { nodoId: nodoRemoto });
            this.broadcastPeerList();
        });
        conn.on("error", (error) => {
            this.emit("error", {
                mensaje: `Conexion error con ${nodoRemoto}`,
                error,
            });
        });
    }
    manejarDatos(datos) {
        if (!esEnvolvente(datos))
            return;
        if (this.deduplicator.esDuplicado(datos))
            return;
        if (datos.tipo === TIPO_MENSAJE.PEER_LIST_UPDATE) {
            const payload = datos.payload;
            if (payload && Array.isArray(payload.peers)) {
                for (const peerId of payload.peers) {
                    if (peerId !== this.opciones.peerId &&
                        peerId !== this.nodoId &&
                        !this.conexiones.has(peerId) &&
                        !this.pendingConnectionRequests.has(peerId)) {
                        this.conectarRemoto(peerId).catch((error) => {
                            this.emit("error", {
                                mensaje: `Error al conectar a peer descubierto ${peerId}`,
                                error,
                            });
                        });
                    }
                }
            }
        }
        this.emit("mensaje", { envolvente: datos });
    }
    // ─── ENVIO ─────────────────────────────────────────────────────────────
    async enviar(destino, payload, tipoMensaje = TIPO_MENSAJE.SYNC) {
        const conn = this.conexiones.get(destino);
        if (conn === undefined) {
            throw new Error(`No hay conexion con el nodo ${destino}`);
        }
        // If caller already built an envelope, forward as-is.
        if (esEnvolvente(payload)) {
            conn.send(payload);
            return;
        }
        const env = createEnvelope(tipoMensaje, this.nodoId, destino, payload);
        conn.send(env);
    }
    async transmitir(payload, tipoMensaje = TIPO_MENSAJE.SYNC) {
        const env = esEnvolvente(payload)
            ? payload
            : createEnvelope(tipoMensaje, this.nodoId, "*", payload);
        const promesas = [];
        for (const conn of this.conexiones.values()) {
            promesas.push(new Promise((resolve) => {
                try {
                    conn.send(env);
                }
                catch {
                    // Ignorar errores individuales en broadcast
                }
                resolve();
            }));
        }
        await Promise.all(promesas);
    }
    async conectarRemoto(remotoId) {
        if (!this.conectado || this.peer.destroyed) {
            this.pendingConnectionRequests.add(remotoId);
            return;
        }
        const conn = this.peer.connect(remotoId, {
            reliable: true,
            serialization: "json",
        });
        this.manejarConexion(conn);
    }
    // ─── ESTADO ────────────────────────────────────────────────────────────
    estaConectado() {
        return this.conectado;
    }
    obtenerConexiones() {
        return Array.from(this.conexiones.keys());
    }
    async cerrar() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = undefined;
        }
        this.reconnectAttempts = 0;
        this.pendingConnectionRequests.clear();
        for (const conn of this.conexiones.values()) {
            try {
                conn.close();
            }
            catch {
                // Ignorar
            }
        }
        this.conexiones.clear();
        if (this.peer) {
            try {
                this.peer.destroy();
            }
            catch {
                // Ignorar
            }
        }
        this.conectado = false;
        this.deduplicator.reiniciar();
    }
}
// ─── TYPE GUARD ────────────────────────────────────────────────────────────
function esEnvolvente(valor) {
    if (typeof valor !== "object" || valor === null)
        return false;
    const candidate = valor;
    return (typeof candidate.id === "string" &&
        typeof candidate.tipo === "string" &&
        typeof candidate.origen === "string" &&
        typeof candidate.destino === "string" &&
        typeof candidate.timestamp === "number" &&
        candidate.payload !== undefined);
}
//# sourceMappingURL=peerjs.js.map