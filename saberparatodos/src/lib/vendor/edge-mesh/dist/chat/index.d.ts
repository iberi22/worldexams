import type { YjsAdapter } from "../edge-mesh.js";
import type { NodoId } from "../types/index.js";
import { type ChatMessage, type OfflineMessageQueue } from "./offline-queue.js";
export declare const TIPO_MENSAJE_CHAT: {
    readonly TEXTO: "texto";
    readonly SISTEMA: "sistema";
    readonly ARCHIVO: "archivo";
    readonly EXAMEN: "examen";
    readonly SALON: "salon";
};
export type TipoMensajeChat = (typeof TIPO_MENSAJE_CHAT)[keyof typeof TIPO_MENSAJE_CHAT];
export declare const TIPO_CANAL: {
    readonly PUBLICO: "publico";
    readonly PRIVADO: "privado";
    readonly SALON_VIRTUAL: "salon_virtual";
};
export type TipoCanal = (typeof TIPO_CANAL)[keyof typeof TIPO_CANAL];
export declare const TIPO_PREGUNTA: {
    readonly OPCION_MULTIPLE: "opcion_multiple";
    readonly VERDADERO_FALSO: "verdadero_falso";
    readonly RESPUESTA_CORTA: "respuesta_corta";
    readonly ENSAYO: "ensayo";
};
export type TipoPregunta = (typeof TIPO_PREGUNTA)[keyof typeof TIPO_PREGUNTA];
export interface Mensaje {
    readonly id: string;
    readonly sender: string;
    readonly text: string;
    readonly timestamp: number;
    readonly type: TipoMensajeChat;
    readonly canal: string;
    readonly metadata?: Readonly<Record<string, unknown>>;
}
export interface Pregunta {
    readonly id: string;
    readonly tipo: TipoPregunta;
    readonly enunciado: string;
    readonly opciones?: readonly string[];
    readonly respuestaCorrecta?: unknown;
    readonly puntaje: number;
}
export interface ChatEventMap {
    mensaje: CustomEvent<{
        readonly mensaje: Mensaje;
    }>;
    historial: CustomEvent<{
        readonly mensajes: readonly Mensaje[];
    }>;
    usuarioConectado: CustomEvent<{
        readonly usuarioId: string;
        readonly canal: string;
    }>;
    usuarioDesconectado: CustomEvent<{
        readonly usuarioId: string;
        readonly canal: string;
    }>;
    error: CustomEvent<{
        readonly mensaje: string;
        readonly error?: Error;
    }>;
    rate_limited: CustomEvent<{
        readonly peerId: string;
        readonly resource: string;
    }>;
}
export interface ExamenEventMap {
    preguntaAgregada: CustomEvent<{
        readonly pregunta: Pregunta;
    }>;
    preguntaCambiada: CustomEvent<{
        readonly preguntaId: string;
        readonly cambios: Partial<Pregunta>;
    }>;
    respuestaNueva: CustomEvent<{
        readonly estudianteId: string;
        readonly preguntaId: string;
        readonly respuesta: unknown;
    }>;
    examenIniciado: CustomEvent<{
        readonly examenId: string;
    }>;
    examenFinalizado: CustomEvent<{
        readonly examenId: string;
    }>;
}
export declare class ChatChannel extends EventTarget {
    readonly nodoId: NodoId;
    readonly nombreCanal: string;
    readonly tipoCanal: TipoCanal;
    readonly yjsAdapter: YjsAdapter;
    readonly offlineQueue?: OfflineMessageQueue;
    peerId?: string;
    private readonly yjsText;
    private readonly yjsMeta;
    private readonly yjsUsuarios;
    private readonly yjsMensajes;
    private historialCache;
    private usuariosConectados;
    private readonly rateLimiter;
    constructor(nodoId: NodoId, nombreCanal: string, yjsAdapter: YjsAdapter, tipoCanal?: TipoCanal, offlineQueue?: OfflineMessageQueue);
    private inicializar;
    private cargarHistorialInicial;
    private actualizarDesdeYjs;
    private actualizarUsuarios;
    setPeerId(peerId: string): void;
    enviarMensajeDirecto(mensaje: ChatMessage): Promise<void>;
    sendMessage(texto: string, tipo?: TipoMensajeChat, metadata?: Readonly<Record<string, unknown>>): Promise<string>;
    enviarMensaje(texto: string, tipo?: TipoMensajeChat, metadata?: Readonly<Record<string, unknown>>): Promise<string>;
    unirseAlCanal(): Promise<void>;
    abandonarCanal(): Promise<void>;
    obtenerHistorial(limite?: number): Promise<readonly Mensaje[]>;
    obtenerUsuariosConectados(): readonly string[];
    limpiarHistorial(): Promise<void>;
}
export declare class ExamenCompartido extends EventTarget {
    readonly examenId: string;
    readonly yjsAdapter: YjsAdapter;
    private readonly yjsPreguntas;
    private readonly yjsRespuestas;
    private readonly yjsEstado;
    private cachePreguntas;
    private cacheRespuestas;
    constructor(examenId: string, yjsAdapter: YjsAdapter);
    private inicializar;
    private sincronizarPreguntas;
    cargarPreguntas(preguntas: readonly Pregunta[]): Promise<void>;
    agregarPregunta(pregunta: Pregunta): Promise<void>;
    actualizarPregunta(preguntaId: string, cambios: Partial<Pregunta>): Promise<void>;
    enviarRespuesta(estudianteId: string, preguntaId: string, respuesta: unknown): Promise<void>;
    obtenerRespuestas(): Promise<ReadonlyMap<string, unknown>>;
    obtenerRespuestasDeEstudiante(estudianteId: string): Promise<ReadonlyMap<string, unknown>>;
    obtenerPreguntas(): readonly Pregunta[];
    iniciarExamen(): Promise<void>;
    finalizarExamen(): Promise<void>;
    obtenerEstado(): Promise<Record<string, unknown>>;
}
export * from "./offline-queue.js";
//# sourceMappingURL=index.d.ts.map