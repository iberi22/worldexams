import type { EdgeMesh } from "../../edge-mesh.js";
/**
 * WebSocket Gateway para tiempo real en el mesh Maloca.
 * Simulación de manejador de WS.
 */
export declare class MalocaWSGateway extends EventTarget {
    private readonly mesh;
    private activeSubscriptions;
    private readonly rateLimiter;
    constructor(mesh: EdgeMesh);
    /**
     * Conecta un cliente WS al mesh.
     */
    connectWS(profileId: string, clientIp?: string): Promise<{
        connectionId: string;
        profileId: string;
    }>;
    /**
     * Suscribe al cliente a tipos específicos de eventos.
     */
    subscribeToEvents(profileId: string, tipos: string[]): void;
    /**
     * Envía un evento desde el cliente externo al mesh.
     */
    emitMessage(evento: {
        type: string;
        payload: any;
    }): Promise<void>;
    /**
     * Maneja mensajes recibidos del mesh y los filtra para el cliente.
     */
    private handleMeshMessage;
}
//# sourceMappingURL=websocket.d.ts.map