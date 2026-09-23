import type { EdgeMesh } from "../../edge-mesh.js";
import type { PostQuantumIdentity } from "../../identity/index.js";
import type { PacientePerfil } from "./types.js";
export declare class PerfilPacienteAdapter {
    private readonly mesh;
    constructor(mesh: EdgeMesh);
    /**
     * Registra un paciente como nodo mesh vinculando su perfil e identidad.
     */
    registerPatient(perfil: PacientePerfil, _identidad: PostQuantumIdentity): Promise<void>;
    /**
     * Obtiene el historial médico de un paciente vía sync mesh.
     */
    getMedicalHistory(patientId: string): Promise<unknown[]>;
    /**
     * Vincula paciente-médico en el mesh.
     */
    linkDoctor(patientId: string, doctorId: string): Promise<void>;
}
//# sourceMappingURL=patient-profile.d.ts.map