import { ESTADO_TRANSICIONES, } from "./node.js";
export class DefaultEdgeMeshNode {
    nodoId;
    eventTarget;
    estado = "offline";
    constructor(nodoId) {
        this.nodoId = nodoId;
        this.eventTarget = new EventTarget();
    }
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
    transicionar(nuevoEstado) {
        const transiciones = ESTADO_TRANSICIONES[this.estado];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        if (!transiciones.includes(nuevoEstado)) {
            throw new Error(`Transicion invalida: ${this.estado} -> ${nuevoEstado}`);
        }
        const estadoAnterior = this.estado;
        this.estado = nuevoEstado;
        this.emit("estadoCambiado", { estadoAnterior, estadoNuevo: nuevoEstado });
    }
    async conectar() {
        if (this.estado === "online" || this.estado === "conectando") {
            return;
        }
        this.transicionar("conectando");
        this.transicionar("online");
        this.emit("nodoConectado", { nodoId: this.nodoId });
    }
    async desconectar() {
        if (this.estado === "offline")
            return;
        this.transicionar("offline");
        this.emit("nodoDesconectado", { nodoId: this.nodoId });
    }
    async enviar(destino, payload) {
        const evento = new CustomEvent("enviar", {
            detail: { destino, payload },
        });
        this.eventTarget.dispatchEvent(evento);
    }
    async transmitir(payload) {
        const evento = new CustomEvent("transmitir", {
            detail: { payload },
        });
        this.eventTarget.dispatchEvent(evento);
    }
}
//# sourceMappingURL=DefaultEdgeMeshNode.js.map