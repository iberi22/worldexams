import { ChatChannel, type Mensaje } from "../chat/index.js";
import type { EdgeMesh, YjsAdapter } from "../edge-mesh.js";
import type { NodoId } from "../types/index.js";
export declare const TIPO_SALON: {
    readonly EXAMEN: "examen";
    readonly REUNION: "reunion";
    readonly CHAT: "chat";
};
export type TipoSalon = (typeof TIPO_SALON)[keyof typeof TIPO_SALON];
export declare const ESTADO_SALON: {
    readonly CREANDO: "creando";
    readonly ACTIVO: "activo";
    readonly CERRADO: "cerrado";
};
export type EstadoSalon = (typeof ESTADO_SALON)[keyof typeof ESTADO_SALON];
export interface SalonConfig {
    readonly creatorId: NodoId;
    readonly nombre: string;
    readonly tipo: TipoSalon;
    readonly maxParticipantes: number;
    readonly yjsAdapter: YjsAdapter;
    readonly edgeMesh: EdgeMesh;
}
export interface SalonInfo {
    readonly id: string;
    readonly nombre: string;
    readonly tipo: TipoSalon;
    readonly creador: NodoId;
    readonly fechaCreacion: number;
    readonly estado: EstadoSalon;
    readonly participantes: readonly string[];
    readonly maxParticipantes: number;
}
export interface SalonEventMap {
    participanteUnido: CustomEvent<{
        readonly salonId: string;
        readonly participanteId: string;
    }>;
    participanteSalio: CustomEvent<{
        readonly salonId: string;
        readonly participanteId: string;
    }>;
    mensaje: CustomEvent<{
        readonly salonId: string;
        readonly mensaje: Mensaje;
    }>;
    contenidoSincronizado: CustomEvent<{
        readonly salonId: string;
        readonly docId: string;
    }>;
    estadoCambiado: CustomEvent<{
        readonly salonId: string;
        readonly estado: EstadoSalon;
    }>;
    error: CustomEvent<{
        readonly salonId: string;
        readonly mensaje: string;
        readonly error?: Error;
    }>;
}
export declare class SalonVirtual extends EventTarget {
    readonly id: string;
    readonly config: SalonConfig;
    readonly edgeMesh: EdgeMesh;
    readonly yjsAdapter: YjsAdapter;
    readonly chatChannel: ChatChannel;
    private _estado;
    private readonly salonDoc;
    private readonly salonMap;
    private readonly salonParticipantes;
    private readonly salonContenido;
    constructor(config: SalonConfig);
    private notificarParticipantes;
    unirse(participanteId: NodoId): Promise<void>;
    abandonar(participanteId: NodoId): Promise<void>;
    obtenerParticipantes(): Promise<readonly string[]>;
    enviarMensaje(texto: string): Promise<void>;
    cerrar(): Promise<void>;
    compartirContenido(clave: string, valor: unknown): Promise<void>;
    obtenerContenido(): Promise<ReadonlyMap<string, unknown>>;
    obtenerEstado(): EstadoSalon;
    obtenerInfo(): SalonInfo;
}
export declare class SalonesManager {
    private readonly edgeMesh;
    private readonly salones;
    private readonly creadorPorSalon;
    private readonly yjsAdapter;
    constructor(edgeMesh: EdgeMesh);
    crearSalon(nombre: string, tipo?: TipoSalon, maxParticipantes?: number): Promise<SalonVirtual>;
    unirseSalon(salonId: string): Promise<SalonVirtual>;
    abandonarSalon(salonId: string): Promise<void>;
    cerrarSalon(salonId: string): Promise<void>;
    listarSalones(): readonly SalonVirtual[];
    obtenerSalon(salonId: string): SalonVirtual | null;
    obtenerSalonesActivos(): readonly SalonVirtual[];
    obtenerTotalSalones(): number;
    cerrarTodosLosSalones(): Promise<void>;
}
//# sourceMappingURL=manager.d.ts.map