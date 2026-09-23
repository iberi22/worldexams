import type { EdgeMesh } from "../../edge-mesh.js";
export declare class EvidentiaVeeduria {
    private readonly mesh;
    constructor(mesh: EdgeMesh);
    /**
     * Notariza un contrato en Evidentia y actualiza su estado en el mesh.
     */
    notarizeContract(contratoHash: string): Promise<string>;
    /**
     * Obtiene la prueba de notarización de un contrato.
     */
    getBlockchainProof(contratoHash: string): string | null;
}
//# sourceMappingURL=evidentia-veeduria.d.ts.map