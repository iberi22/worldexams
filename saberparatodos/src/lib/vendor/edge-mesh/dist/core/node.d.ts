import type { EdgeMeshEventMap, EstadoNodo, NodoId } from "../types/index.js";
import { DefaultEdgeMeshNode } from "./DefaultEdgeMeshNode.js";
export { DefaultEdgeMeshNode };
export declare const ESTADO_TRANSICIONES: {
    readonly offline: readonly ["conectando"];
    readonly conectando: readonly ["online", "offline"];
    readonly online: readonly ["suspendido", "reconectando", "offline"];
    readonly suspendido: readonly ["reconectando", "offline"];
    readonly reconectando: readonly ["online", "offline"];
    readonly eliminado: readonly [];
};
export type TransicionEntrada = (typeof ESTADO_TRANSICIONES)[keyof typeof ESTADO_TRANSICIONES][number];
export interface EdgeMeshNode {
    readonly nodoId: NodoId;
    readonly eventTarget: EventTarget;
    estado: EstadoNodo;
    conectar(): Promise<void>;
    desconectar(): Promise<void>;
    enviar(destino: NodoId, payload: unknown): Promise<void>;
    transmitir(payload: unknown): Promise<void>;
    on<K extends keyof EdgeMeshEventMap>(tipo: K, handler: (ev: EdgeMeshEventMap[K]) => void): void;
    off<K extends keyof EdgeMeshEventMap>(tipo: K, handler: (ev: EdgeMeshEventMap[K]) => void): void;
    emit<K extends keyof EdgeMeshEventMap>(tipo: K, detalle: EdgeMeshEventMap[K]["detail"]): void;
}
export declare function createEdgeMeshNode(nodoId: NodoId): EdgeMeshNode;
//# sourceMappingURL=node.d.ts.map