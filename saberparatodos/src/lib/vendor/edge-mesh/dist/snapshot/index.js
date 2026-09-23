import { InMemoryStorage } from "../storage/index.js";
// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const SNAPSHOT_POR_DEFECTO_CADA = 100;
export class SnapshotManager {
    eventTarget;
    docId;
    interval;
    storage;
    maxSnapshots;
    contadorOperaciones = 0;
    versionActual = 0;
    datosActuales = null;
    nodosConfirmados;
    constructor(config) {
        this.eventTarget = new EventTarget();
        this.docId = config.docId;
        this.interval = config.interval ?? SNAPSHOT_POR_DEFECTO_CADA;
        this.storage = config.storage ?? new InMemoryStorage();
        this.maxSnapshots = config.maxSnapshots ?? 10;
        this.nodosConfirmados = new Set();
    }
    // ─── CREACION ────────────────────────────────────────────────────────
    incrementarOperaciones() {
        this.contadorOperaciones++;
        if (this.contadorOperaciones >= this.interval) {
            void this.crearSnapshot();
            return true;
        }
        return false;
    }
    async crearSnapshot(datos, nodos) {
        if (datos !== undefined) {
            this.datosActuales = datos;
        }
        if (this.datosActuales === null)
            return false;
        this.versionActual++;
        if (nodos !== undefined) {
            this.nodosConfirmados.clear();
            for (const n of nodos) {
                this.nodosConfirmados.add(n);
            }
        }
        // Guardar snapshot
        const clave = `snapshot:${this.docId}:${this.versionActual}`;
        await this.storage.set(clave, {
            datos: this.datosActuales,
            version: this.versionActual,
            timestamp: Date.now(),
            nodos: Array.from(this.nodosConfirmados),
        });
        // Limpiar snapshots viejos
        await this.limpiarSnapshotsViejos();
        this.contadorOperaciones = 0;
        const metadata = {
            version: this.versionActual,
            timestamp: Date.now(),
            nodos: Array.from(this.nodosConfirmados),
            tamanio: this.datosActuales.length,
            hash: await this.calcularHash(this.datosActuales),
        };
        this.emit("snapshotCreado", { snapshot: metadata, docId: this.docId });
        return true;
    }
    // ─── RESTAURACION ────────────────────────────────────────────────────
    async restaurarSnapshot(version) {
        const clave = `snapshot:${this.docId}:${version}`;
        const entry = await this.storage.get(clave);
        if (entry === null)
            return null;
        this.datosActuales = entry.valor.datos;
        this.versionActual = entry.valor.version;
        this.emit("snapshotRestaurado", { version, docId: this.docId });
        return this.datosActuales;
    }
    async restaurarUltimoSnapshot() {
        if (this.versionActual === 0)
            return null;
        return this.restaurarSnapshot(this.versionActual);
    }
    // ─── COMPARTIR ───────────────────────────────────────────────────────
    async prepararSnapshotCompartido() {
        if (this.datosActuales === null)
            return null;
        const snapshot = {
            docId: this.docId,
            version: this.versionActual,
            datos: this.datosActuales,
            nodosConfirmados: Array.from(this.nodosConfirmados),
        };
        this.emit("snapshotCompartido", { snapshot });
        return snapshot;
    }
    async recibirSnapshot(snapshot) {
        if (snapshot.docId !== this.docId)
            return false;
        if (snapshot.version <= this.versionActual)
            return false;
        const clave = `snapshot:${this.docId}:${snapshot.version}`;
        await this.storage.set(clave, {
            datos: snapshot.datos,
            version: snapshot.version,
            timestamp: Date.now(),
            nodos: snapshot.nodosConfirmados,
        });
        this.datosActuales = snapshot.datos;
        this.versionActual = snapshot.version;
        this.nodosConfirmados.clear();
        for (const n of snapshot.nodosConfirmados) {
            this.nodosConfirmados.add(n);
        }
        this.emit("snapshotRestaurado", {
            version: snapshot.version,
            docId: this.docId,
        });
        return true;
    }
    // ─── CONFIRMACION ────────────────────────────────────────────────────
    confirmarNodo(nodoId) {
        this.nodosConfirmados.add(nodoId);
    }
    obtenerNodosConfirmados() {
        return Array.from(this.nodosConfirmados);
    }
    // ─── CONSULTAS ───────────────────────────────────────────────────────
    obtenerVersionActual() {
        return this.versionActual;
    }
    obtenerContadorOperaciones() {
        return this.contadorOperaciones;
    }
    async obtenerSnapshotsDisponibles() {
        const entries = await this.storage.list({
            prefijo: `snapshot:${this.docId}:`,
        });
        return entries.map((e) => {
            const valor = e.valor;
            return {
                version: valor.version,
                timestamp: valor.timestamp,
                nodos: valor.nodos,
                tamanio: valor.datos.length,
                hash: "",
            };
        });
    }
    // ─── LIMPIEZA ────────────────────────────────────────────────────────
    async limpiarSnapshotsViejos() {
        const disponibles = await this.obtenerSnapshotsDisponibles();
        if (disponibles.length <= this.maxSnapshots)
            return;
        const ordenados = [...disponibles].sort((a, b) => a.version - b.version);
        const aEliminar = ordenados.slice(0, ordenados.length - this.maxSnapshots);
        for (const snap of aEliminar) {
            const clave = `snapshot:${this.docId}:${snap.version}`;
            await this.storage.delete(clave);
        }
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
    // ─── UTILIDADES ──────────────────────────────────────────────────────
    async calcularHash(datos) {
        const hashBuffer = await crypto.subtle.digest("SHA-256", datos.buffer);
        const hashArray = new Uint8Array(hashBuffer);
        return Array.from(hashArray)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
    }
    reiniciar() {
        this.contadorOperaciones = 0;
        this.versionActual = 0;
        this.datosActuales = null;
        this.nodosConfirmados.clear();
    }
}
// ─── FACTORY ───────────────────────────────────────────────────────────────
export function createSnapshotManager(config) {
    return new SnapshotManager(config);
}
//# sourceMappingURL=index.js.map