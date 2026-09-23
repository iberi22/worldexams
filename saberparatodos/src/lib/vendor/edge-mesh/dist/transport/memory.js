import { createEnvelope, MessageDeduplicator } from "../protocol/index.js";
import { TIPO_MENSAJE, TIPO_TRANSPORTE } from "../types/index.js";
// ─── IN-PROCESS MESH BUS ───────────────────────────────────────────────────
const busPorSala = new Map();
/**
 * Deterministic multi-node transport for unit/integration tests (no WebRTC).
 */
export class MemoryTransport {
    tipo = TIPO_TRANSPORTE.MEMORIA;
    eventTarget;
    nodoId;
    roomId;
    deduplicator = new MessageDeduplicator();
    conectado = false;
    constructor(nodoId, options = {}) {
        this.nodoId = nodoId;
        this.eventTarget = new EventTarget();
        this.roomId = options.roomId ?? "default";
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
    async conectar() {
        const room = busPorSala.get(this.roomId) ?? new Set();
        room.add(this);
        busPorSala.set(this.roomId, room);
        this.conectado = true;
        this.emit("conectado", { nodoId: this.nodoId });
        // Announce presence to peers already in the room
        for (const peer of room) {
            if (peer === this)
                continue;
            peer.emit("conectado", { nodoId: this.nodoId });
            this.emit("conectado", { nodoId: peer.nodoId });
        }
    }
    async enviar(destino, payload, tipoMensaje = TIPO_MENSAJE.SYNC) {
        const room = busPorSala.get(this.roomId);
        if (!room)
            throw new Error("MemoryTransport no conectado");
        const target = Array.from(room).find((t) => t.nodoId === destino);
        if (!target)
            throw new Error(`No hay conexion con el nodo ${destino}`);
        const env = esEnvolvente(payload)
            ? payload
            : createEnvelope(tipoMensaje, this.nodoId, destino, payload);
        target.recibir(env, this.nodoId);
    }
    async transmitir(payload, tipoMensaje = TIPO_MENSAJE.SYNC) {
        const room = busPorSala.get(this.roomId);
        if (!room)
            return;
        const env = esEnvolvente(payload)
            ? payload
            : createEnvelope(tipoMensaje, this.nodoId, "*", payload);
        for (const peer of room) {
            if (peer === this)
                continue;
            peer.recibir(env, this.nodoId);
        }
    }
    recibir(env, from) {
        if (this.deduplicator.esDuplicado(env))
            return;
        this.emit("mensaje", { envolvente: env, from });
    }
    estaConectado() {
        return this.conectado;
    }
    obtenerConexiones() {
        const room = busPorSala.get(this.roomId);
        if (!room)
            return [];
        return Array.from(room)
            .filter((t) => t !== this)
            .map((t) => t.nodoId);
    }
    async cerrar() {
        const room = busPorSala.get(this.roomId);
        if (room) {
            room.delete(this);
            for (const peer of room) {
                peer.emit("desconectado", { nodoId: this.nodoId });
            }
            if (room.size === 0)
                busPorSala.delete(this.roomId);
        }
        this.conectado = false;
        this.deduplicator.reiniciar();
        this.emit("desconectado", { nodoId: this.nodoId });
    }
    /** Test helper: wipe all rooms (avoid cross-test pollution). */
    static resetAll() {
        busPorSala.clear();
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
//# sourceMappingURL=memory.js.map