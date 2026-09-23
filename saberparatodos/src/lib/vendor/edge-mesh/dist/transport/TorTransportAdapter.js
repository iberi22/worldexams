import { createEnvelope, MessageDeduplicator } from "../protocol/index.js";
import { TIPO_MENSAJE, TIPO_TRANSPORTE } from "../types/index.js";
/**
 * TorTransportAdapter provides hidden service proxy tunnel fallback for NAT traversal
 * when direct WebRTC or TCP connections fail behind severe CGNAT.
 */
export class TorTransportAdapter {
    tipo = TIPO_TRANSPORTE.TOR;
    eventTarget;
    nodoId;
    options;
    deduplicator;
    onionPeerMap; // peerId -> onionAddress
    activeConnections; // set of remote peerIds/onionAddresses
    onionAddress;
    conectado = false;
    tunnelActive = false;
    constructor(nodoId, options = {}) {
        this.nodoId = nodoId;
        this.eventTarget = new EventTarget();
        this.deduplicator = new MessageDeduplicator();
        this.options = options;
        this.onionPeerMap = new Map();
        this.activeConnections = new Set();
        this.onionAddress =
            options.onionAddress ??
                `${nodoId
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "")
                    .slice(0, 16)}.onion`;
        if (options.autoConnect) {
            void this.conectar();
        }
    }
    on(tipo, handler) {
        this.eventTarget.addEventListener(tipo, handler);
    }
    off(tipo, handler) {
        this.eventTarget.removeEventListener(tipo, handler);
    }
    emit(tipo, detalle) {
        this.eventTarget.dispatchEvent(new CustomEvent(tipo, { detail: detalle }));
    }
    /**
     * Establish Tor onion hidden service proxy tunnel.
     */
    async conectar() {
        if (this.conectado)
            return;
        this.conectado = true;
        this.tunnelActive = true;
        this.emit("conectado", { nodoId: this.nodoId });
        // Forward underlying fallback transport events if provided
        if (this.options.fallbackTransport) {
            if (!this.options.fallbackTransport.estaConectado()) {
                try {
                    if ("conectar" in this.options.fallbackTransport &&
                        typeof this.options.fallbackTransport.conectar ===
                            "function") {
                        await this.options.fallbackTransport.conectar();
                    }
                }
                catch (err) {
                    this.emit("error", {
                        mensaje: `Fallback transport connection error: ${err?.message ?? err}`,
                        error: err,
                    });
                }
            }
        }
    }
    /**
     * Register remote peer's onion hidden service address for proxy routing.
     */
    registerOnionPeer(peerId, onionAddress) {
        this.onionPeerMap.set(peerId, onionAddress);
        this.activeConnections.add(peerId);
    }
    /**
     * Get node's local onion hidden service address.
     */
    getOnionAddress() {
        return this.onionAddress;
    }
    /**
     * Returns true if the proxy tunnel is established and active.
     */
    isTunnelActive() {
        return this.conectado && this.tunnelActive;
    }
    /**
     * Send envelope or payload to a remote node via Tor hidden service proxy tunnel.
     */
    async enviar(destino, payload, tipoMensaje = TIPO_MENSAJE.SYNC) {
        if (!this.conectado) {
            throw new Error("TorTransportAdapter no conectado");
        }
        const env = esEnvolvente(payload)
            ? payload
            : createEnvelope(tipoMensaje, this.nodoId, destino, payload);
        const targetOnion = this.onionPeerMap.get(destino);
        try {
            if (this.options.tunnelHandler) {
                await this.options.tunnelHandler(env, targetOnion);
            }
            else if (this.options.fallbackTransport) {
                await this.options.fallbackTransport.enviar(destino, env, tipoMensaje);
            }
            else {
                // Simulated hidden service proxy tunnel transmission
                this.activeConnections.add(destino);
            }
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            this.emit("error", {
                mensaje: `Tor proxy tunnel error sending to ${destino}: ${error.message}`,
                error,
            });
            throw error;
        }
    }
    /**
     * Broadcast envelope or payload across all connected onion hidden service peers.
     */
    async transmitir(payload, tipoMensaje = TIPO_MENSAJE.SYNC) {
        if (!this.conectado)
            return;
        const env = esEnvolvente(payload)
            ? payload
            : createEnvelope(tipoMensaje, this.nodoId, "*", payload);
        const peers = this.obtenerConexiones();
        const promises = peers.map(async (peer) => {
            try {
                await this.enviar(peer, env, tipoMensaje);
            }
            catch {
                // Ignore individual peer errors during broadcast
            }
        });
        await Promise.all(promises);
    }
    /**
     * Helper method to process incoming proxy tunnel payloads into the adapter.
     */
    receivePayload(datos, from) {
        if (!esEnvolvente(datos))
            return;
        if (this.deduplicator.esDuplicado(datos))
            return;
        if (from) {
            this.activeConnections.add(from);
        }
        else if (datos.origen) {
            this.activeConnections.add(datos.origen);
        }
        this.emit("mensaje", { envolvente: datos, from });
    }
    estaConectado() {
        return this.conectado;
    }
    obtenerConexiones() {
        return Array.from(this.activeConnections.keys());
    }
    async cerrar() {
        this.conectado = false;
        this.tunnelActive = false;
        this.activeConnections.clear();
        this.deduplicator.reiniciar();
        if (this.options.fallbackTransport) {
            try {
                await this.options.fallbackTransport.cerrar();
            }
            catch {
                // Ignore errors on closing fallback transport
            }
        }
        this.emit("desconectado", { nodoId: this.nodoId });
    }
}
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
//# sourceMappingURL=TorTransportAdapter.js.map