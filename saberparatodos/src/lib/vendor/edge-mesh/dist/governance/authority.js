// ─── AUTHORITY MANAGER ─────────────────────────────────────────────────────
export class AuthorityManager {
    eventTarget;
    localNodeId;
    presence;
    currentMaster = null;
    running = false;
    checkInterval = null;
    constructor(localNodeId, presence, options) {
        this.eventTarget = new EventTarget();
        this.localNodeId = localNodeId;
        this.presence = presence;
        this.currentMaster = options?.initialMaster ?? null;
    }
    // ─── API DE AUTHORITY ───────────────────────────────────────────────────
    selectSuccessor(nodosActivos, masterActual) {
        const master = masterActual !== undefined ? masterActual : this.currentMaster;
        const candidatos = nodosActivos.filter((id) => id !== master);
        if (candidatos.length === 0) {
            return null;
        }
        // Deterministic sort: seniority (alphabetic order of NodoId string)
        const ordenados = [...candidatos].sort((a, b) => a.localeCompare(b));
        return ordenados[0] ?? null;
    }
    promoteSuccessor(nuevoMaster, razon = "manual") {
        const antiguoMaster = this.currentMaster;
        if (antiguoMaster === nuevoMaster) {
            return;
        }
        this.currentMaster = nuevoMaster;
        this.emit("failover", {
            antiguoMaster,
            nuevoMaster,
            razon,
        });
        if (nuevoMaster === this.localNodeId) {
            this.emit("promocionado", { nodoId: this.localNodeId });
        }
        else if (antiguoMaster === this.localNodeId) {
            this.emit("degradado", { nodoId: this.localNodeId });
        }
    }
    checkHostHealth(hostId) {
        if (hostId === this.localNodeId) {
            return true;
        }
        const activos = this.presence.obtenerNodosActivos();
        return activos.includes(hostId);
    }
    forceHostFailover() {
        this.handleMasterFailure("forced");
    }
    // ─── LIFECYCLE ──────────────────────────────────────────────────────────
    iniciar() {
        if (this.running)
            return;
        this.running = true;
        this.presence.on("nodoDesaparecio", this.handleNodoDesaparecio);
        // Periodic health check as a safety fallback
        this.checkInterval = setInterval(() => {
            this.verificarSaludMaster();
        }, 1000);
    }
    detener() {
        if (!this.running)
            return;
        this.running = false;
        this.presence.off("nodoDesaparecio", this.handleNodoDesaparecio);
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }
    // ─── GETTERS & HELPERS ───────────────────────────────────────────────────
    obtenerMaster() {
        return this.currentMaster;
    }
    obtenerTodosLosNodosActivos() {
        const activos = [...this.presence.obtenerNodosActivos()];
        if (!activos.includes(this.localNodeId)) {
            activos.push(this.localNodeId);
        }
        return activos;
    }
    handleNodoDesaparecio = (ev) => {
        const { nodoId } = ev.detail;
        if (nodoId === this.currentMaster) {
            this.handleMasterFailure("timeout");
        }
    };
    verificarSaludMaster() {
        if (this.currentMaster && this.currentMaster !== this.localNodeId) {
            if (!this.checkHostHealth(this.currentMaster)) {
                this.handleMasterFailure("timeout");
            }
        }
    }
    handleMasterFailure(razon) {
        const antiguoMaster = this.currentMaster;
        const todosActivos = this.obtenerTodosLosNodosActivos();
        const sucesor = this.selectSuccessor(todosActivos, antiguoMaster);
        if (sucesor) {
            this.promoteSuccessor(sucesor, razon);
        }
    }
    // ─── EVENTS ─────────────────────────────────────────────────────────────
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
// ─── FACTORY ───────────────────────────────────────────────────────────────
export function createAuthorityManager(localNodeId, presence, options) {
    return new AuthorityManager(localNodeId, presence, options);
}
//# sourceMappingURL=authority.js.map