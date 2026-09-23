import type { EdgeMesh } from "../../edge-mesh.js";
import type { CitaInfo } from "./types.js";
export declare class CitaMeshAdapter {
    private readonly mesh;
    constructor(mesh: EdgeMesh);
    /**
     * Crea una cita médica replicada en el mesh.
     */
    createCita(citaInfo: CitaInfo): Promise<void>;
    /**
     * Sincroniza citas offline-first para un paciente.
     */
    syncCitas(patientId: string): Promise<CitaInfo[]>;
    /**
     * Consulta disponibilidad de un médico en una fecha específica vía mesh.
     */
    getAvailability(doctorId: string, fecha: string): Promise<string[]>;
}
//# sourceMappingURL=citas-distribuidas.d.ts.map