import { InMemoryStorage } from "../storage/index.js";
// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const MAX_OPERACIONES_EN_MEMORIA = 1_000;
export class OpLog {
    eventTarget;
    docId;
    storage;
    cache;
    maxEnMemoria;
    ultimaSecuencia = 0;
    totalOperaciones = 0;
    constructor(config) {
        this.eventTarget = new EventTarget();
        this.docId = config.docId;
        this.storage = config.storage ?? new InMemoryStorage();
        this.cache = new Map();
        this.maxEnMemoria = config.maxEnMemoria ?? MAX_OPERACIONES_EN_MEMORIA;
    }
    async cargarDesdeStorage() {
        const enStorage = await this.storage.list({
            prefijo: `op:${this.docId}:`,
        });
        let maxSeq = 0;
        for (const entry of enStorage) {
            const op = entry.valor;
            if (op && typeof op.secuencia === "number") {
                maxSeq = Math.max(maxSeq, op.secuencia);
                this.cache.set(op.id, op);
            }
        }
        this.ultimaSecuencia = maxSeq;
        this.totalOperaciones = enStorage.length;
    }
    // ─── APPEND ──────────────────────────────────────────────────────────
    async append(tipo, datos, autor) {
        this.ultimaSecuencia++;
        const operacion = {
            id: `${this.docId}:${this.ultimaSecuencia}:${Date.now()}`,
            tipo,
            datos,
            timestamp: Date.now(),
            autor,
            secuencia: this.ultimaSecuencia,
        };
        try {
            // Persistir
            await this.storage.set(this.crearClave(operacion.secuencia), operacion);
            // Cache en memoria
            this.cache.set(operacion.id, operacion);
            this.totalOperaciones++;
            // Limitar cache
            if (this.cache.size > this.maxEnMemoria) {
                const entradas = Array.from(this.cache.entries());
                const aEliminar = entradas.slice(0, this.cache.size - this.maxEnMemoria);
                for (const [key] of aEliminar) {
                    this.cache.delete(key);
                }
            }
            this.emit("operacionAgregada", {
                operacion,
                total: this.totalOperaciones,
            });
            return operacion;
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : "Error desconocido";
            this.emit("error", { mensaje, operacion });
            throw new Error(`Error al agregar operacion: ${mensaje}`);
        }
    }
    // ─── LECTURA ─────────────────────────────────────────────────────────
    async obtenerRango(desde, hasta) {
        const resultados = [];
        // Buscar en memoria primero
        for (const op of this.cache.values()) {
            if (op.secuencia >= desde && op.secuencia <= hasta) {
                resultados.push(op);
            }
        }
        // Buscar en storage si no tenemos todo
        const enStorage = await this.storage.list({
            prefijo: `op:${this.docId}:`,
        });
        for (const entry of enStorage) {
            const op = entry.valor;
            if (op.secuencia >= desde &&
                op.secuencia <= hasta &&
                !resultados.some((r) => r.id === op.id)) {
                resultados.push(op);
            }
        }
        return resultados.sort((a, b) => a.secuencia - b.secuencia);
    }
    async obtenerDesde(desde) {
        return this.obtenerRango(desde, this.ultimaSecuencia);
    }
    async obtenerTodas() {
        return this.obtenerRango(0, this.ultimaSecuencia);
    }
    async obtenerPorId(id) {
        // Cache primero
        const enCache = this.cache.get(id);
        if (enCache !== undefined)
            return enCache;
        // Storage
        const clave = `op:${this.docId}:${id}`;
        const entry = await this.storage.get(clave);
        return entry?.valor ?? null;
    }
    // ─── ESTADO ─────────────────────────────────────────────────────────
    obtenerUltimaSecuencia() {
        return this.ultimaSecuencia;
    }
    obtenerTotalOperaciones() {
        return this.totalOperaciones;
    }
    async obtenerTamanioStorage() {
        return this.storage.size();
    }
    // ─── COMPRESION ─────────────────────────────────────────────────────
    async comprimir(keepLast = 100) {
        const todas = await this.obtenerTodas();
        if (todas.length <= keepLast)
            return;
        const aEliminar = todas.slice(0, todas.length - keepLast);
        const desde = aEliminar[0]?.secuencia ?? 0;
        const hasta = aEliminar[aEliminar.length - 1]?.secuencia ?? 0;
        for (const op of aEliminar) {
            await this.storage.delete(this.crearClave(op.secuencia));
            this.cache.delete(op.id);
        }
        this.emit("logComprimido", { desde, hasta });
    }
    async compactar(secuencia) {
        const todas = await this.obtenerTodas();
        const aEliminar = todas.filter((op) => op.secuencia <= secuencia);
        if (aEliminar.length === 0)
            return;
        const desde = aEliminar[0].secuencia;
        const hasta = aEliminar[aEliminar.length - 1].secuencia;
        for (const op of aEliminar) {
            await this.storage.delete(this.crearClave(op.secuencia));
            this.cache.delete(op.id);
        }
        this.totalOperaciones = Math.max(0, this.totalOperaciones - aEliminar.length);
        this.emit("logComprimido", { desde, hasta });
    }
    // ─── LIMPIEZA ───────────────────────────────────────────────────────
    async reiniciar() {
        await this.storage.clear(`op:${this.docId}:`);
        this.cache.clear();
        this.ultimaSecuencia = 0;
        this.totalOperaciones = 0;
    }
    // ─── SYNC ───────────────────────────────────────────────────────────
    async aplicarOperaciones(operaciones) {
        let aplicadas = 0;
        for (const op of operaciones) {
            if (op.secuencia <= this.ultimaSecuencia)
                continue;
            try {
                await this.storage.set(this.crearClave(op.secuencia), op);
                this.cache.set(op.id, op);
                this.totalOperaciones++;
                this.ultimaSecuencia = Math.max(this.ultimaSecuencia, op.secuencia);
                aplicadas++;
            }
            catch {
                // Continuar con la siguiente
            }
        }
        return aplicadas;
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
    crearClave(secuencia) {
        return `op:${this.docId}:${secuencia}`;
    }
}
//# sourceMappingURL=index.js.map