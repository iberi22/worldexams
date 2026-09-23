import type { EdgeMesh } from "../../edge-mesh.js";
import type { Contrato, LicitacionChileCompra, PerfilLicitante } from "./types.js";
export declare class ContractBridge {
    private readonly mesh;
    constructor(mesh: EdgeMesh);
    /**
     * Firma un contrato con PQC y lo registra en la red mesh.
     */
    submitContract(contrato: Contrato): Promise<void>;
    /**
     * Obtiene el estado de un contrato via mesh.
     */
    getContractStatus(hash: string): string | null;
    /**
     * Vincula un perfil de licitante a un nodo Maloca.
     */
    linkLicitante(perfil: PerfilLicitante): Promise<void>;
    /**
     * Sincroniza licitaciones de ChileCompra al mesh.
     */
    syncChileCompra(licitaciones: LicitacionChileCompra[]): Promise<void>;
}
//# sourceMappingURL=contract-bridge.d.ts.map