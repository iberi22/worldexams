import type { EdgeMeshEventMap, EstadoNodo, NodoId } from "../types/index.js";
import { type EdgeMeshNode } from "./node.js";
export declare class DefaultEdgeMeshNode implements EdgeMeshNode {
    readonly nodoId: NodoId;
    readonly eventTarget: EventTarget;
    estado: EstadoNodo;
    constructor(nodoId: NodoId);
    on<K extends keyof EdgeMeshEventMap>(tipo: K, handler: (ev: EdgeMeshEventMap[K]) => void): void;
    off<K extends keyof EdgeMeshEventMap>(tipo: K, handler: (ev: EdgeMeshEventMap[K]) => void): void;
    emit<K extends keyof EdgeMeshEventMap>(tipo: K, detalle: EdgeMeshEventMap[K]["detail"]): void;
    private transicionar;
    conectar(): Promise<void>;
    desconectar(): Promise<void>;
    enviar(destino: NodoId, payload: unknown): Promise<void>;
    transmitir(payload: unknown): Promise<void>;
}
//# sourceMappingURL=DefaultEdgeMeshNode.d.ts.map