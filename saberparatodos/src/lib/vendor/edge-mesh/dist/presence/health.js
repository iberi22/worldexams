import { ESTADO_SALUD } from "../types/index.js";
// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const CONFIG_POR_DEFECTO = {
    heartbeatIntervalMs: 5_000,
    timeoutMs: 15_000,
    maxFallosConsecutivos: 3,
    latenciaAltaMs: 500,
};
export class HealthChecker {
    eventTarget;
    estados;
    heartbeatsRecibidos;
    tiemposEnvio;
    config;
    intervalo = null;
    secuencia = 0;
    constructor(config = {}) {
        this.eventTarget = new EventTarget();
        this.estados = new Map();
        this.heartbeatsRecibidos = new Map();
        this.tiemposEnvio = new Map();
        this.config = { ...CONFIG_POR_DEFECTO, ...config };
    }
    // ─── HEARTBEAT ────────────────────────────────────────────────────────
    generarHeartbeat(nodoId) {
        this.secuencia++;
        return {
            nodoId,
            timestamp: Date.now(),
            secuencia: this.secuencia,
            intervaloMs: this.config.heartbeatIntervalMs,
        };
    }
    recibirHeartbeat(nodoId, timestamp) {
        const ahora = Date.now();
        const latenciaMs = ahora - timestamp;
        this.heartbeatsRecibidos.set(nodoId, ahora);
        this.tiemposEnvio.set(nodoId, timestamp);
        const existente = this.estados.get(nodoId);
        const estadoAnterior = existente?.estado ?? ESTADO_SALUD.DESCONOCIDO;
        let nuevoEstado;
        let fallos = existente?.fallosConsecutivos ?? 0;
        if (latenciaMs > this.config.timeoutMs) {
            fallos++;
            nuevoEstado = ESTADO_SALUD.FALLANDO;
        }
        else if (latenciaMs > this.config.latenciaAltaMs) {
            fallos = 0;
            nuevoEstado = ESTADO_SALUD.LENTO;
        }
        else {
            fallos = 0;
            nuevoEstado = ESTADO_SALUD.SALUDABLE;
        }
        this.estados.set(nodoId, {
            nodoId,
            estado: nuevoEstado,
            ultimoHeartbeat: ahora,
            latenciaMs,
            fallosConsecutivos: fallos,
        });
        this.emit("heartbeatRecibido", {
            nodoId,
            timestamp,
            latenciaMs,
        });
        if (estadoAnterior !== nuevoEstado) {
            this.emit("saludCambiada", {
                nodoId,
                estadoAnterior,
                estadoNuevo: nuevoEstado,
            });
        }
        if (fallos >= this.config.maxFallosConsecutivos) {
            this.emit("nodoCaido", { nodoId });
        }
    }
    // ─── MONITOREO ────────────────────────────────────────────────────────
    verificarTimeouts() {
        const ahora = Date.now();
        for (const [nodoId, ultimoHb] of this.heartbeatsRecibidos) {
            if (ahora - ultimoHb > this.config.timeoutMs) {
                this.emit("timeout", { nodoId });
                this.emit("nodoCaido", { nodoId });
            }
        }
    }
    iniciar() {
        this.intervalo = setInterval(() => {
            this.verificarTimeouts();
        }, this.config.heartbeatIntervalMs);
    }
    detener() {
        if (this.intervalo !== null) {
            clearInterval(this.intervalo);
            this.intervalo = null;
        }
    }
    // ─── CONSULTAS ────────────────────────────────────────────────────────
    obtenerSalud(nodoId) {
        return this.estados.get(nodoId) ?? null;
    }
    obtenerTodasLasSaludes() {
        return Array.from(this.estados.values());
    }
    obtenerNodosActivos() {
        const ahora = Date.now();
        const activos = [];
        for (const [nodoId, ultimoHb] of this.heartbeatsRecibidos) {
            if (ahora - ultimoHb < this.config.timeoutMs) {
                activos.push(nodoId);
            }
        }
        return activos;
    }
    obtenerLatencia(nodoId) {
        const estado = this.estados.get(nodoId);
        return estado?.latenciaMs ?? null;
    }
    // ─── EVENTOS ──────────────────────────────────────────────────────────
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
        this.estados.clear();
        this.heartbeatsRecibidos.clear();
        this.tiemposEnvio.clear();
        this.secuencia = 0;
    }
}
//# sourceMappingURL=health.js.map