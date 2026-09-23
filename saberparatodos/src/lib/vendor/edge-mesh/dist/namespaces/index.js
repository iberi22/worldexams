import { generarNonce } from "../protocol/utils.js";
export * from "./ivn-proofs.js";
export * from "./offers-gossip.js";
// ─── CONSTANTS ─────────────────────────────────────────────────────────────
export const NAMESPACE_POR_DEFECTO = "global";
/**
 * Canonical SWAL mesh data-plane namespace (NODE_PRO_AND_INSTANCES / DL-F1-02).
 * Two installs of the same app MUST use distinct instanceIds.
 */
export function swalNamespace(appId, instanceId) {
    const app = appId.trim();
    const instance = instanceId.trim();
    if (!app || !instance) {
        throw new Error("swalNamespace requires non-empty appId and instanceId");
    }
    if (app.includes("/") || instance.includes("/")) {
        throw new Error("swalNamespace segments must not contain '/'");
    }
    return `swal/${app}/${instance}`;
}
/** Parse `swal/{appId}/{instanceId}` → parts, or null if invalid. */
export function parseSwalNamespace(ns) {
    const parts = ns.split("/");
    if (parts.length !== 3 || parts[0] !== "swal" || !parts[1] || !parts[2]) {
        return null;
    }
    return { appId: parts[1], instanceId: parts[2] };
}
/** True when two namespaces belong to different instances (must not mix). */
export function namespacesAreIsolated(a, b) {
    if (a === b)
        return false;
    const pa = parseSwalNamespace(a);
    const pb = parseSwalNamespace(b);
    if (pa && pb) {
        return pa.appId !== pb.appId || pa.instanceId !== pb.instanceId;
    }
    return a !== b;
}
export class NamespaceManager {
    eventTarget = new EventTarget();
    espacios = new Map();
    constructor() {
        // Crear el namespace global por defecto
        this.crearEspacioInterno(NAMESPACE_POR_DEFECTO);
    }
    // ─── CREACION ────────────────────────────────────────────────────────
    crearEspacio(nombre, metadatos = {}) {
        return this.crearEspacioInterno(nombre, metadatos);
    }
    crearEspacioInterno(nombre, metadatos = {}) {
        const id = generarNonce();
        const espacio = {
            id,
            nombre,
            nodos: [],
            fechaCreacion: Date.now(),
            metadatos,
        };
        this.espacios.set(id, espacio);
        this.emit("espacioCreado", { espacio });
        return espacio;
    }
    eliminarEspacio(id) {
        const espacio = this.espacios.get(id);
        if (espacio === undefined)
            return false;
        if (espacio.nombre === NAMESPACE_POR_DEFECTO)
            return false;
        this.espacios.delete(id);
        this.emit("espacioEliminado", { id });
        return true;
    }
    // ─── MEMBRESIA ───────────────────────────────────────────────────────
    unirNodo(espacioId, nodoId) {
        const espacio = this.espacios.get(espacioId);
        if (espacio === undefined)
            return false;
        if (espacio.nodos.includes(nodoId))
            return true;
        const nuevosNodos = [...espacio.nodos, nodoId];
        this.espacios.set(espacioId, { ...espacio, nodos: nuevosNodos });
        this.emit("nodoUnido", { espacio: espacio.nombre, nodoId });
        return true;
    }
    abandonarNodo(espacioId, nodoId) {
        const espacio = this.espacios.get(espacioId);
        if (espacio === undefined)
            return false;
        if (!espacio.nodos.includes(nodoId))
            return false;
        const nuevosNodos = espacio.nodos.filter((n) => n !== nodoId);
        this.espacios.set(espacioId, { ...espacio, nodos: nuevosNodos });
        this.emit("nodoAbandono", { espacio: espacio.nombre, nodoId });
        return true;
    }
    // ─── CONSULTAS ───────────────────────────────────────────────────────
    obtenerEspacio(id) {
        return this.espacios.get(id) ?? null;
    }
    obtenerEspacioPorNombre(nombre) {
        for (const espacio of this.espacios.values()) {
            if (espacio.nombre === nombre)
                return espacio;
        }
        return null;
    }
    obtenerTodosLosEspacios() {
        return Array.from(this.espacios.values());
    }
    obtenerNodosEnEspacio(nombre) {
        const espacio = this.obtenerEspacioPorNombre(nombre);
        return espacio?.nodos ?? [];
    }
    obtenerEspaciosDeNodo(nodoId) {
        return Array.from(this.espacios.values()).filter((e) => e.nodos.includes(nodoId));
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
        this.espacios.clear();
        this.crearEspacioInterno(NAMESPACE_POR_DEFECTO);
    }
}
//# sourceMappingURL=index.js.map