import type { EdgeMesh } from "../../edge-mesh.js";
/**
 * Dashboard en tiempo real del estado de la red mesh.
 */
export declare class MalocaDashboard {
    private readonly mesh;
    constructor(mesh: EdgeMesh);
    /**
     * Retorna la topología actual de la red para visualización.
     */
    getNetworkGraph(): Promise<{
        nodes: {
            id: import("../../index.js").NodoId;
            status: string;
            latency: number;
        }[];
        links: never[];
    }>;
    /**
     * Retorna el ranking de karma de la red.
     */
    getKarmaLeaderboard(): Promise<{
        id: import("../../index.js").NodoId;
        karma: number;
    }[]>;
    /**
     * Retorna el estado de salud de todos los plugins/módulos.
     */
    getPluginHealth(): Promise<{
        core: string;
        chat: string;
        storage: string;
        identity: string;
        governance: string;
    }>;
    /**
     * Retorna los nodos activos en este momento.
     */
    getActiveNodes(): readonly import("../../index.js").NodoId[];
    private getKarmaValue;
}
//# sourceMappingURL=dashboard.d.ts.map