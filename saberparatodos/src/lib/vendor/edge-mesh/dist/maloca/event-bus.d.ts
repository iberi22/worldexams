import type { MeshManager } from "../mesh/index.js";
import type { OpLog } from "../op-log/index.js";
import { type IStorage } from "../storage/index.js";
import type { NodoId } from "../types/index.js";
export declare const TIPO_EVENTO_MALOCA: {
    readonly NODE_CONNECT: "NODE_CONNECT";
    readonly NODE_DISCONNECT: "NODE_DISCONNECT";
    readonly PROFILE_CREATED: "PROFILE_CREATED";
    readonly PROFILE_UPDATED: "PROFILE_UPDATED";
    readonly KARMA_TRANSACTION: "KARMA_TRANSACTION";
    readonly PLUGIN_REGISTERED: "PLUGIN_REGISTERED";
    readonly PLUGIN_DISCOVERED: "PLUGIN_DISCOVERED";
    readonly DOC_NOTARIZED: "DOC_NOTARIZED";
    readonly MESH_HEARTBEAT: "MESH_HEARTBEAT";
};
export type TipoEventoMaloca = (typeof TIPO_EVENTO_MALOCA)[keyof typeof TIPO_EVENTO_MALOCA];
export interface EventoMaloca {
    readonly tipo: TipoEventoMaloca | string;
    readonly origen: NodoId;
    readonly destino?: NodoId | "*";
    readonly payload: unknown;
    readonly firma?: Uint8Array;
    readonly timestamp: number;
}
export interface MeshEvent extends EventoMaloca {
}
export interface PersistentEventQueue {
    enqueue(event: MeshEvent): Promise<void>;
    dequeueAll(): Promise<MeshEvent[]>;
    replay(namespace: string): Promise<MeshEvent[]>;
    clear(): Promise<void>;
    size(): Promise<number>;
}
export declare class PersistentEventQueueImpl implements PersistentEventQueue {
    private readonly storage;
    private readonly namespace;
    constructor(storage: IStorage, namespace: string);
    enqueue(event: MeshEvent): Promise<void>;
    dequeueAll(): Promise<MeshEvent[]>;
    replay(namespace: string): Promise<MeshEvent[]>;
    clear(): Promise<void>;
    size(): Promise<number>;
}
export declare class EventBus extends EventTarget {
    private readonly mesh;
    private readonly opLog;
    private readonly handlers;
    private readonly NAMESPACE;
    readonly queue: PersistentEventQueue;
    constructor(mesh: MeshManager, opLog: OpLog, storage?: IStorage);
    emit(tipo: TipoEventoMaloca | string, payload: unknown, destino?: NodoId | "*"): Promise<void>;
    subscribe(tipo: TipoEventoMaloca | string, handler: (evento: EventoMaloca) => void): void;
    unsubscribe(tipo: TipoEventoMaloca | string, handler: (evento: EventoMaloca) => void): void;
    broadcastToPlugin(_pluginId: string, evento: Omit<EventoMaloca, "origen" | "timestamp" | "destino">): Promise<void>;
    getEventLog(): Promise<readonly EventoMaloca[]>;
    private reconnectHandler;
    private procesarEventoRemoto;
    private notificarHandlers;
}
//# sourceMappingURL=event-bus.d.ts.map