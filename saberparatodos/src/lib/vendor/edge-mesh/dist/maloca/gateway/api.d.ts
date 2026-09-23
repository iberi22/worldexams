import type { EdgeMesh } from "../../edge-mesh.js";
/**
 * REST API Gateway para el mesh Maloca.
 */
export declare class MalocaGatewayAPI {
    private readonly mesh;
    private readonly rateLimiter;
    constructor(mesh: EdgeMesh);
    private checkRateLimit;
    /**
     * GET /mesh/status
     */
    getMeshStatus(clientIp?: string): Promise<{
        status: string;
        totalNodes: number;
        activeNodes: readonly import("../../index.js").NodoId[];
        config: {
            nodoId: import("../../index.js").NodoId;
        };
    }>;
    /**
     * GET /profiles/:id
     */
    getProfile(id: string, clientIp?: string): Promise<any>;
    /**
     * POST /profiles
     */
    registerProfile(profile: any, clientIp?: string): Promise<{
        success: boolean;
        profile: any;
    }>;
    /**
     * GET /karma/:id
     */
    getKarma(id: string, clientIp?: string): Promise<{
        nodoId: string;
        karma: number;
        reputacion: string;
    }>;
    /**
     * POST /karma/emit
     */
    emitKarma(transaction: {
        to: string;
        amount: number;
        reason: string;
    }, clientIp?: string): Promise<{
        to: string;
        amount: number;
        reason: string;
        from: import("../../index.js").NodoId;
        timestamp: number;
        txId: string;
    }>;
    /**
     * GET /plugins
     */
    getPlugins(clientIp?: string): Promise<{
        id: string;
        status: string;
    }[]>;
    /**
     * POST /evidentia/notarize
     */
    notarizeDocument(doc: {
        hash: string;
        metadata: any;
    }, clientIp?: string): Promise<{
        hash: string;
        metadata: any;
        timestamp: number;
        author: import("../../index.js").NodoId;
        notarized: boolean;
    }>;
    private getKarmaValue;
    private calculateReputation;
}
//# sourceMappingURL=api.d.ts.map