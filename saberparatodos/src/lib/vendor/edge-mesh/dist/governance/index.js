import { hexABytes } from "../protocol/utils.js";
import { POLITICA_GOBERNANZA } from "../types/index.js";
// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const POLITICA_POR_DEFECTO = {
    politica: POLITICA_GOBERNANZA.DEMOCRATICA,
    umbral: 0.51,
    ventanaMs: 30_000,
    pesoNodo: {},
    reglas: [],
};
export const ESTADO_PROPUESTA = {
    ABIERTA: "abierta",
    APROBADA: "aprobada",
    RECHAZADA: "rechazada",
    EXPIRADA: "expirada",
};
export class GovernanceManager {
    eventTarget;
    politica;
    propuestas;
    timers;
    verificador;
    requireSignedVotes;
    constructor(politica, verificador, options) {
        this.eventTarget = new EventTarget();
        this.politica = { ...POLITICA_POR_DEFECTO, ...politica };
        this.propuestas = new Map();
        this.timers = new Map();
        this.verificador = verificador;
        this.requireSignedVotes = options?.requireSignedVotes ?? false;
    }
    // ─── PROPUESTAS ───────────────────────────────────────────────────────
    crearPropuesta(id, tipo, proponente, datos, expiracionMs) {
        const expiracion = expiracionMs ?? this.politica.ventanaMs;
        const propuesta = {
            id,
            tipo,
            proponente,
            datos,
            timestamp: Date.now(),
            expiracion: Date.now() + expiracion,
            votos: [],
            estado: ESTADO_PROPUESTA.ABIERTA,
        };
        this.propuestas.set(id, propuesta);
        const timer = setTimeout(() => {
            this.cerrarPropuesta(id);
        }, expiracion);
        this.timers.set(id, timer);
        this.emit("propuestaCreada", { propuesta });
        return propuesta;
    }
    votar(id, voto) {
        const propuesta = this.propuestas.get(id);
        if (propuesta === undefined)
            return false;
        if (propuesta.estado !== ESTADO_PROPUESTA.ABIERTA)
            return false;
        if (Date.now() > propuesta.expiracion)
            return false;
        // Requerir firma estricta si configurado
        if (this.requireSignedVotes && !voto.firma) {
            return false;
        }
        // Verificación criptográfica si hay verificador y firma
        if (this.verificador && voto.firma) {
            const clavePublica = this.verificador.obtenerClavePublica(voto.nodoId);
            if (!clavePublica)
                return false;
            const mensajeBytes = new TextEncoder().encode(JSON.stringify({
                propuestaId: id,
                nodoId: voto.nodoId,
                voto: voto.voto,
                timestamp: voto.timestamp,
            }));
            const firmaBytes = typeof voto.firma === "string"
                ? hexABytes(voto.firma)
                : voto.firma instanceof Uint8Array
                    ? voto.firma
                    : new Uint8Array(voto.firma);
            const valido = this.verificador.verificarFirma(mensajeBytes, firmaBytes, clavePublica);
            if (!valido)
                return false;
        }
        // Evitar voto duplicado del mismo nodo
        const yaVoto = propuesta.votos.some((v) => v.nodoId === voto.nodoId);
        if (yaVoto)
            return false;
        const nuevosVotos = [...propuesta.votos, voto];
        propuesta.votos = nuevosVotos;
        this.propuestas.set(id, propuesta);
        this.emit("votoRecibido", { propuesta: id, voto });
        // Verificar si ya se alcanzó el umbral
        if (this.verificarUmbral(propuesta)) {
            this.cerrarPropuesta(id, ESTADO_PROPUESTA.APROBADA);
        }
        return true;
    }
    cerrarPropuesta(id, forzar) {
        const propuesta = this.propuestas.get(id);
        if (propuesta === undefined)
            return;
        const timer = this.timers.get(id);
        if (timer !== undefined) {
            clearTimeout(timer);
            this.timers.delete(id);
        }
        let resultado;
        if (forzar !== undefined) {
            resultado = forzar;
        }
        else {
            resultado = this.verificarUmbral(propuesta)
                ? ESTADO_PROPUESTA.APROBADA
                : ESTADO_PROPUESTA.RECHAZADA;
        }
        propuesta.estado = resultado;
        this.propuestas.set(id, propuesta);
        this.emit("propuestaResultado", { propuesta: id, resultado });
    }
    verificarUmbral(propuesta) {
        const pesoTotal = this.calcularPesoTotal(propuesta);
        return pesoTotal >= this.politica.umbral;
    }
    calcularPesoTotal(propuesta) {
        return propuesta.votos.reduce((total, voto) => {
            const peso = this.politica.pesoNodo[voto.nodoId] ?? 1;
            return voto.voto === "a_favor" ? total + peso : total;
        }, 0);
    }
    // ─── POLITICA ─────────────────────────────────────────────────────────
    actualizarPolitica(politica) {
        this.politica = { ...this.politica, ...politica };
        this.emit("politicaCambiada", { politica: this.politica });
    }
    obtenerPolitica() {
        return { ...this.politica };
    }
    obtenerPropuestas(estado) {
        const todas = Array.from(this.propuestas.values());
        if (estado === undefined)
            return todas;
        return todas.filter((p) => p.estado === estado);
    }
    obtenerPropuesta(id) {
        return this.propuestas.get(id) ?? null;
    }
    importarPropuestas(propuestas) {
        for (const prop of propuestas) {
            this.propuestas.set(prop.id, { ...prop });
            if (prop.estado === ESTADO_PROPUESTA.ABIERTA) {
                const expiracionRestante = prop.expiracion - Date.now();
                const timerExistente = this.timers.get(prop.id);
                if (timerExistente) {
                    clearTimeout(timerExistente);
                }
                if (expiracionRestante > 0) {
                    const timer = setTimeout(() => {
                        this.cerrarPropuesta(prop.id);
                    }, expiracionRestante);
                    this.timers.set(prop.id, timer);
                }
                else {
                    this.cerrarPropuesta(prop.id);
                }
            }
            else {
                const timerExistente = this.timers.get(prop.id);
                if (timerExistente) {
                    clearTimeout(timerExistente);
                    this.timers.delete(prop.id);
                }
            }
        }
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
    // ─── LIMPIEZA ─────────────────────────────────────────────────────────
    limpiarPropuestasExpiradas() {
        const ahora = Date.now();
        for (const [id, propuesta] of this.propuestas) {
            if (propuesta.expiracion < ahora) {
                this.cerrarPropuesta(id);
            }
        }
    }
    destruir() {
        for (const timer of this.timers.values()) {
            clearTimeout(timer);
        }
        this.timers.clear();
        this.propuestas.clear();
    }
}
// ─── FACTORY ───────────────────────────────────────────────────────────────
export function createGovernanceManager(politica, verificador, options) {
    return new GovernanceManager(politica, verificador, options);
}
export * from "./authority.js";
export * from "./merge.js";
//# sourceMappingURL=index.js.map