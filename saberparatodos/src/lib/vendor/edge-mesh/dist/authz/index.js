import { generarNonce } from "../protocol/utils.js";
import { InMemoryStorage } from "../storage/index.js";
// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const EXPIRACION_POR_DEFECTO_MS = 86_400_000; // 24h
export const CAPACIDAD_ESTANDAR = {
    LEER: "read",
    ESCRIBIR: "write",
    ADMIN: "admin",
    SINC: "sync",
    PRESENCIA: "presence",
    GOBERNANZA: "governance",
};
export class NamespaceAuthorizer {
    eventTarget;
    grants;
    reglasLocales;
    roleAssignments;
    capabilities;
    storage;
    constructor(storage) {
        this.eventTarget = new EventTarget();
        this.grants = new Map();
        this.reglasLocales = new Map();
        this.roleAssignments = new Map();
        this.capabilities = new Map();
        this.storage = storage ?? new InMemoryStorage();
        // Background loading during construction
        void this.loadGrants();
        void this.loadRoleAssignments();
        void this.loadCapabilities();
    }
    // ─── PERSISTENCE ─────────────────────────────────────────────────────
    async saveGrants() {
        await this.storage.put("authz:grants", Array.from(this.grants.entries()));
    }
    async loadGrants() {
        const data = await this.storage.get("authz:grants");
        if (data) {
            let loadedMap;
            if (Array.isArray(data)) {
                loadedMap = new Map(data);
            }
            else if (typeof data === "object" && data !== null && "valor" in data) {
                loadedMap = new Map(data.valor);
            }
            else {
                return;
            }
            for (const [key, value] of loadedMap) {
                if (!this.grants.has(key)) {
                    this.grants.set(key, value);
                }
            }
        }
    }
    async saveRoleAssignments() {
        await this.storage.put("authz:roleAssignments", Array.from(this.roleAssignments.entries()));
    }
    async loadRoleAssignments() {
        const data = await this.storage.get("authz:roleAssignments");
        if (data) {
            let loadedMap;
            if (Array.isArray(data)) {
                loadedMap = new Map(data);
            }
            else if (typeof data === "object" && data !== null && "valor" in data) {
                loadedMap = new Map(data.valor);
            }
            else {
                return;
            }
            for (const [key, value] of loadedMap) {
                if (!this.roleAssignments.has(key)) {
                    this.roleAssignments.set(key, value);
                }
            }
        }
    }
    async saveCapabilities() {
        await this.storage.put("authz:capabilities", Array.from(this.capabilities.entries()));
    }
    async loadCapabilities() {
        const data = await this.storage.get("authz:capabilities");
        if (data) {
            let loadedMap;
            if (Array.isArray(data)) {
                loadedMap = new Map(data);
            }
            else if (typeof data === "object" && data !== null && "valor" in data) {
                loadedMap = new Map(data.valor);
            }
            else {
                return;
            }
            for (const [key, value] of loadedMap) {
                if (!this.capabilities.has(key)) {
                    this.capabilities.set(key, value);
                }
            }
        }
    }
    // ─── GRANTS ──────────────────────────────────────────────────────────
    concederCapacidad(espacio, sujeto, capacidad, expiracionMs = EXPIRACION_POR_DEFECTO_MS, firma) {
        const grant = {
            id: generarNonce(),
            espacio,
            sujeto,
            capacidad,
            fechaEmision: Date.now(),
            fechaExpiracion: Date.now() + expiracionMs,
            firma: firma ?? new Uint8Array(0),
        };
        const clave = this.crearClave(espacio, sujeto, capacidad);
        this.grants.set(clave, grant);
        this.emit("capacidadConcedida", { grant });
        void this.saveGrants();
        return grant;
    }
    grant(espacio, sujeto, capacidad, expiracionMs, firma) {
        return this.concederCapacidad(espacio, sujeto, capacidad, expiracionMs, firma);
    }
    revocarCapacidad(espacio, sujeto, capacidad) {
        const clave = this.crearClave(espacio, sujeto, capacidad);
        const grant = this.grants.get(clave);
        if (grant === undefined)
            return false;
        this.grants.delete(clave);
        this.emit("capacidadRevocada", {
            id: grant.id,
            espacio,
            sujeto,
        });
        void this.saveGrants();
        return true;
    }
    revoke(espacio, sujeto, capacidad) {
        return this.revocarCapacidad(espacio, sujeto, capacidad);
    }
    verificarCapacidad(espacio, sujeto, capacidad) {
        // Siempre verificar admin
        if (this.verificarGrant(espacio, sujeto, "admin"))
            return true;
        return this.verificarGrant(espacio, sujeto, capacidad);
    }
    verificarGrant(espacio, sujeto, capacidad) {
        const clave = this.crearClave(espacio, sujeto, capacidad);
        const grant = this.grants.get(clave);
        if (grant === undefined) {
            this.emit("autorizacionFallida", {
                espacio,
                sujeto,
                capacidad,
                razon: "Sin permiso concedido",
            });
            return false;
        }
        if (Date.now() > grant.fechaExpiracion) {
            this.grants.delete(clave);
            this.emit("autorizacionFallida", {
                espacio,
                sujeto,
                capacidad,
                razon: "Permiso expirado",
            });
            void this.saveGrants();
            return false;
        }
        return true;
    }
    // ─── REGLAS LOCALES ──────────────────────────────────────────────────
    agregarReglaLocal(espacio, regla) {
        const reglas = this.reglasLocales.get(espacio) ?? new Set();
        reglas.add(regla);
        this.reglasLocales.set(espacio, reglas);
    }
    removerReglaLocal(espacio, regla) {
        const reglas = this.reglasLocales.get(espacio);
        if (reglas === undefined)
            return false;
        const resultado = reglas.delete(regla);
        if (reglas.size === 0) {
            this.reglasLocales.delete(espacio);
        }
        return resultado;
    }
    verificarReglaLocal(espacio, regla) {
        return this.reglasLocales.get(espacio)?.has(regla) ?? false;
    }
    // ─── CONSULTAS ───────────────────────────────────────────────────────
    obtenerGrantsDeNodo(sujeto) {
        return Array.from(this.grants.values()).filter((g) => g.sujeto === sujeto);
    }
    obtenerGrantsDeEspacio(espacio) {
        return Array.from(this.grants.values()).filter((g) => g.espacio === espacio);
    }
    obtenerTodosLosGrants() {
        return Array.from(this.grants.values());
    }
    limpiarGrantsExpirados() {
        const ahora = Date.now();
        let eliminados = 0;
        for (const [clave, grant] of this.grants) {
            if (ahora > grant.fechaExpiracion) {
                this.grants.delete(clave);
                eliminados++;
            }
        }
        if (eliminados > 0) {
            void this.saveGrants();
        }
        return eliminados;
    }
    // ─── ROLES & CAPABILITIES HELPER METHODS ─────────────────────────────
    updateRole(sujeto, rol) {
        const id = generarNonce();
        const assignment = { id, rol, sujeto };
        this.roleAssignments.set(sujeto, assignment);
        void this.saveRoleAssignments();
    }
    obtenerRoles() {
        return this.roleAssignments;
    }
    revokeRole(sujeto) {
        const res = this.roleAssignments.delete(sujeto);
        if (res) {
            void this.saveRoleAssignments();
        }
        return res;
    }
    concederCapacidades(espacio, caps) {
        this.capabilities.set(espacio, caps);
        void this.saveCapabilities();
    }
    obtenerCapacidades(espacio) {
        return this.capabilities.get(espacio);
    }
    obtenerGrantsMap() {
        return this.grants;
    }
    obtenerRoleAssignmentsMap() {
        return this.roleAssignments;
    }
    cargarGrantsMap(grants) {
        this.grants = new Map(grants);
        void this.saveGrants();
    }
    cargarRoleAssignmentsMap(roleAssignments) {
        this.roleAssignments = new Map(roleAssignments);
        void this.saveRoleAssignments();
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
    crearClave(espacio, sujeto, capacidad) {
        return `${espacio}::${sujeto}::${capacidad}`;
    }
}
// ─── FACTORY ───────────────────────────────────────────────────────────────
export function createNamespaceAuthorizer(storage) {
    return new NamespaceAuthorizer(storage);
}
//# sourceMappingURL=index.js.map