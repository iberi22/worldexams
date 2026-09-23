// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const MAX_BATCH_SIZE = 500;
const TIEMPO_ESPERA_SYNC_MS = 2_000;
export class SyncEngine {
    eventTarget;
    docId;
    opLog;
    batchSize;
    timeoutMs;
    _direction;
    sincronizando = false;
    clockLocal = 0;
    clocksRemotos;
    constructor(config) {
        this.eventTarget = new EventTarget();
        this.docId = config.docId;
        this.opLog = config.opLog;
        this.batchSize = config.batchSize ?? MAX_BATCH_SIZE;
        this.timeoutMs = config.timeoutMs ?? TIEMPO_ESPERA_SYNC_MS;
        this._direction = config.direction ?? "bidireccional";
        this.clocksRemotos = new Map();
    }
    // ─── SYNC ────────────────────────────────────────────────────────────
    async sincronizar(peerId, enviar, recibir) {
        if (this.sincronizando) {
            throw new Error("Sync en progreso para este documento");
        }
        this.sincronizando = true;
        const inicio = Date.now();
        this.emit("syncIniciado", {
            docId: this.docId,
            peerId,
            direction: this._direction,
        });
        try {
            let operacionesEnviadas = 0;
            let operacionesRecibidas = 0;
            let conflictos = 0;
            // Fase 1: Enviar nuestras operaciones
            if (this._direction === "bidireccional" ||
                this._direction === "saliente") {
                const clockRemoto = this.clocksRemotos.get(peerId) ?? 0;
                const pendientes = await this.opLog.obtenerDesde(clockRemoto);
                const batches = [];
                for (let i = 0; i < pendientes.length; i += this.batchSize) {
                    batches.push(pendientes.slice(i, i + this.batchSize));
                }
                for (const batch of batches) {
                    await enviar(batch);
                    operacionesEnviadas += batch.length;
                }
            }
            // Fase 2: Recibir operaciones remotas
            if (this._direction === "bidireccional" ||
                this._direction === "entrante") {
                const operacionesRemotas = await recibir();
                const validadas = operacionesRemotas.filter(esOperacionValida);
                for (const opRaw of validadas) {
                    const op = opRaw;
                    const clockLocal = this.opLog.obtenerUltimaSecuencia();
                    if (op.secuencia <= clockLocal) {
                        conflictos++;
                        this.emit("conflictoDetectado", {
                            docId: this.docId,
                            operacionLocal: op,
                            operacionRemota: op,
                        });
                    }
                }
                const aplicadas = await this.opLog.aplicarOperaciones(validadas);
                operacionesRecibidas += aplicadas;
                // Actualizar clock del peer
                if (validadas.length > 0) {
                    const ultimaOp = validadas[validadas.length - 1];
                    this.clocksRemotos.set(peerId, ultimaOp.secuencia);
                }
            }
            const duracionMs = Date.now() - inicio;
            this.sincronizando = false;
            const resultado = {
                docId: this.docId,
                operacionesEnviadas,
                operacionesRecibidas,
                conflictos,
                duracionMs,
                exito: true,
            };
            this.emit("syncCompletado", { resultado, peerId });
            return resultado;
        }
        catch (error) {
            this.sincronizando = false;
            const mensaje = error instanceof Error ? error.message : "Error de sincronizacion";
            this.emit("syncError", {
                docId: this.docId,
                peerId,
                error: mensaje,
            });
            return {
                docId: this.docId,
                operacionesEnviadas: 0,
                operacionesRecibidas: 0,
                conflictos: 0,
                duracionMs: Date.now() - inicio,
                exito: false,
            };
        }
    }
    // ─── CLOCK ───────────────────────────────────────────────────────────
    actualizarClockLocal(clock) {
        this.clockLocal = Math.max(this.clockLocal, clock);
    }
    actualizarClockRemoto(peerId, clock) {
        this.clocksRemotos.set(peerId, clock);
    }
    obtenerClockLocal() {
        return this.clockLocal;
    }
    obtenerClockRemoto(peerId) {
        return this.clocksRemotos.get(peerId) ?? 0;
    }
    // ─── ESTADO ──────────────────────────────────────────────────────────
    estaSincronizando() {
        return this.sincronizando;
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
}
// ─── TYPE GUARD ────────────────────────────────────────────────────────────
function esOperacionValida(valor) {
    if (typeof valor !== "object" || valor === null)
        return false;
    const op = valor;
    return (typeof op.id === "string" &&
        typeof op.tipo === "string" &&
        typeof op.secuencia === "number" &&
        typeof op.timestamp === "number" &&
        typeof op.autor === "string");
}
//# sourceMappingURL=engine.js.map