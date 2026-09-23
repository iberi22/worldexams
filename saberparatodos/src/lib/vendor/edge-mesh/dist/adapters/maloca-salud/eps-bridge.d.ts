import type { EdgeMesh } from "../../edge-mesh.js";
import type { EPSData } from "./types.js";
export declare class EPSBridge {
    private readonly mesh;
    constructor(mesh: EdgeMesh);
    /**
     * Sincroniza datos de la EPS al mesh.
     */
    syncEPSData(epsData: EPSData): Promise<void>;
    /**
     * Verifica afiliación EPS de un paciente vía mesh.
     */
    verifyEPS(patientId: string, epsId: string): Promise<boolean>;
}
//# sourceMappingURL=eps-bridge.d.ts.map