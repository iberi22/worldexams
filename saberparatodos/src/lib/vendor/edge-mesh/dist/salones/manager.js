// ─── SALON VIRTUAL ───────────────────────────────────────────────────────
// Un salón virtual es un namespace + canal de chat + Yjs doc compartido.
// Todo sincronizado en el mesh. Escalable a 50+ personas gracias al
// fan-out limitado del mesh manager.
import * as Y from "yjs";
import { ChatChannel, TIPO_CANAL } from "../chat/index.js";
import { generarId } from "../protocol/utils.js";
// ─── CONST OBJECT PATTERNS ────────────────────────────────────────────────
export const TIPO_SALON = {
    EXAMEN: "examen",
    REUNION: "reunion",
    CHAT: "chat",
};
export const ESTADO_SALON = {
    CREANDO: "creando",
    ACTIVO: "activo",
    CERRADO: "cerrado",
};
// ─── SALON VIRTUAL ────────────────────────────────────────────────────────
export class SalonVirtual extends EventTarget {
    id;
    config;
    edgeMesh;
    yjsAdapter;
    chatChannel;
    _estado = ESTADO_SALON.CREANDO;
    salonDoc;
    salonMap;
    salonParticipantes;
    salonContenido;
    constructor(config) {
        super();
        this.id = generarId();
        this.config = config;
        this.edgeMesh = config.edgeMesh;
        this.yjsAdapter = config.yjsAdapter;
        this.salonDoc = new Y.Doc();
        // Crear tipos Yjs para el salón
        this.salonMap = this.salonDoc.getMap(`salon:${this.id}:info`);
        this.salonParticipantes = this.salonDoc.getArray(`salon:${this.id}:participantes`);
        this.salonContenido = this.salonDoc.getMap(`salon:${this.id}:contenido`);
        // Crear canal de chat propio del salón
        this.chatChannel = new ChatChannel(config.creatorId, `salon:${this.id}`, this.yjsAdapter, TIPO_CANAL.SALON_VIRTUAL, config.edgeMesh.offlineQueue);
        // Inicializar metadata del salón
        Y.transact(this.salonDoc, () => {
            this.salonMap.set("id", this.id);
            this.salonMap.set("nombre", config.nombre);
            this.salonMap.set("tipo", config.tipo);
            this.salonMap.set("creador", config.creatorId);
            this.salonMap.set("fechaCreacion", Date.now());
            this.salonMap.set("estado", ESTADO_SALON.ACTIVO);
            this.salonMap.set("maxParticipantes", config.maxParticipantes);
        });
        // Re-enviar eventos del chat
        this.chatChannel.addEventListener("mensaje", ((ev) => {
            const customEv = ev;
            this.dispatchEvent(new CustomEvent("mensaje", {
                detail: { salonId: this.id, mensaje: customEv.detail.mensaje },
            }));
        }));
        // Observar cambios en participantes
        this.salonParticipantes.observe(() => {
            void this.notificarParticipantes();
        });
        this._estado = ESTADO_SALON.ACTIVO;
    }
    async notificarParticipantes() {
        const participantes = this.salonParticipantes.toArray();
        // El ChatChannel ya maneja los eventos usuarioConectado/usuarioDesconectado
    }
    // ─── METODOS PUBLICOS ────────────────────────────────────────────────
    async unirse(participanteId) {
        if (this._estado !== ESTADO_SALON.ACTIVO) {
            throw new Error(`Salon ${this.id} no esta activo (estado: ${this._estado})`);
        }
        const participantes = this.salonParticipantes.toArray();
        if (participantes.length >= this.config.maxParticipantes) {
            throw new Error(`Salon ${this.id} ha alcanzado el maximo de ${this.config.maxParticipantes} participantes`);
        }
        if (participantes.includes(participanteId))
            return; // Ya unido
        Y.transact(this.salonDoc, () => {
            this.salonParticipantes.push([participanteId]);
        });
        // Unir al canal de chat del salón
        await this.chatChannel.unirseAlCanal();
        this.dispatchEvent(new CustomEvent("participanteUnido", {
            detail: { salonId: this.id, participanteId },
        }));
        // Notificar sincronización de contenido
        this.dispatchEvent(new CustomEvent("contenidoSincronizado", {
            detail: { salonId: this.id, docId: `salon:${this.id}` },
        }));
    }
    async abandonar(participanteId) {
        const idx = this.salonParticipantes.toArray().indexOf(participanteId);
        if (idx !== -1) {
            Y.transact(this.salonDoc, () => {
                this.salonParticipantes.delete(idx, 1);
            });
        }
        await this.chatChannel.abandonarCanal();
        this.dispatchEvent(new CustomEvent("participanteSalio", {
            detail: { salonId: this.id, participanteId },
        }));
    }
    async obtenerParticipantes() {
        return this.salonParticipantes.toArray();
    }
    async enviarMensaje(texto) {
        await this.chatChannel.enviarMensaje(texto);
    }
    async cerrar() {
        this._estado = ESTADO_SALON.CERRADO;
        Y.transact(this.salonDoc, () => {
            this.salonMap.set("estado", ESTADO_SALON.CERRADO);
            // Limpiar participantes
            const len = this.salonParticipantes.length;
            if (len > 0) {
                this.salonParticipantes.delete(0, len);
            }
        });
        await this.chatChannel.abandonarCanal();
        this.salonDoc.destroy();
        this.dispatchEvent(new CustomEvent("estadoCambiado", {
            detail: { salonId: this.id, estado: ESTADO_SALON.CERRADO },
        }));
    }
    async compartirContenido(clave, valor) {
        Y.transact(this.salonDoc, () => {
            this.salonContenido.set(clave, valor);
        });
    }
    async obtenerContenido() {
        const contenido = new Map();
        for (const [clave, valor] of this.salonContenido) {
            contenido.set(clave, valor);
        }
        return contenido;
    }
    obtenerEstado() {
        return this._estado;
    }
    obtenerInfo() {
        return {
            id: this.id,
            nombre: this.config.nombre,
            tipo: this.config.tipo,
            creador: this.config.creatorId,
            fechaCreacion: this.salonMap.get("fechaCreacion"),
            estado: this._estado,
            participantes: this.salonParticipantes.toArray(),
            maxParticipantes: this.config.maxParticipantes,
        };
    }
}
// ─── SALONES MANAGER ───────────────────────────────────────────────────────
// Manager global de salones. Orquesta todos los salones activos.
export class SalonesManager {
    edgeMesh;
    salones;
    creadorPorSalon;
    yjsAdapter;
    constructor(edgeMesh) {
        this.edgeMesh = edgeMesh;
        this.salones = new Map();
        this.creadorPorSalon = new Map();
        this.yjsAdapter = edgeMesh.yjsAdapter;
    }
    // ─── CREACION ────────────────────────────────────────────────────────
    async crearSalon(nombre, tipo, maxParticipantes) {
        const config = {
            creatorId: this.edgeMesh.config.nodoId,
            nombre,
            tipo: tipo ?? TIPO_SALON.CHAT,
            maxParticipantes: maxParticipantes ?? 50,
            yjsAdapter: this.yjsAdapter,
            edgeMesh: this.edgeMesh,
        };
        const salon = new SalonVirtual(config);
        this.salones.set(salon.id, salon);
        this.creadorPorSalon.set(salon.id, this.edgeMesh.config.nodoId);
        // El creador se une automáticamente
        await salon.unirse(this.edgeMesh.config.nodoId);
        return salon;
    }
    // ─── UNION ───────────────────────────────────────────────────────────
    async unirseSalon(salonId) {
        const salon = this.salones.get(salonId);
        if (salon === undefined) {
            throw new Error(`Salon ${salonId} no encontrado`);
        }
        await salon.unirse(this.edgeMesh.config.nodoId);
        return salon;
    }
    // ─── ABANDONAR ───────────────────────────────────────────────────────
    async abandonarSalon(salonId) {
        const salon = this.salones.get(salonId);
        if (salon === undefined)
            return;
        await salon.abandonar(this.edgeMesh.config.nodoId);
    }
    // ─── CERRAR ──────────────────────────────────────────────────────────
    async cerrarSalon(salonId) {
        const salon = this.salones.get(salonId);
        if (salon === undefined) {
            throw new Error(`Salon ${salonId} no encontrado`);
        }
        const creador = this.creadorPorSalon.get(salonId);
        if (creador !== this.edgeMesh.config.nodoId) {
            throw new Error(`Solo el creador puede cerrar el salon ${salonId}`);
        }
        await salon.cerrar();
        this.salones.delete(salonId);
        this.creadorPorSalon.delete(salonId);
    }
    // ─── CONSULTAS ───────────────────────────────────────────────────────
    listarSalones() {
        return Array.from(this.salones.values());
    }
    obtenerSalon(salonId) {
        return this.salones.get(salonId) ?? null;
    }
    obtenerSalonesActivos() {
        return Array.from(this.salones.values()).filter((s) => s.obtenerEstado() === ESTADO_SALON.ACTIVO);
    }
    obtenerTotalSalones() {
        return this.salones.size;
    }
    // ─── LIMPIEZA ────────────────────────────────────────────────────────
    async cerrarTodosLosSalones() {
        for (const [id, _salon] of this.salones) {
            const salon = this.salones.get(id);
            await salon.cerrar();
        }
        this.salones.clear();
        this.creadorPorSalon.clear();
    }
}
//# sourceMappingURL=manager.js.map