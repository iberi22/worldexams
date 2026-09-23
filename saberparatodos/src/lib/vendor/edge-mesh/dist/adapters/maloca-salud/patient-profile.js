import * as Y from "yjs";
export class PerfilPacienteAdapter {
    mesh;
    constructor(mesh) {
        this.mesh = mesh;
    }
    /**
     * Registra un paciente como nodo mesh vinculando su perfil e identidad.
     */
    async registerPatient(perfil, _identidad) {
        const pacientes = this.mesh.yjsAdapter.getMap("maloca-salud:pacientes");
        Y.transact(this.mesh.yjsAdapter.doc, () => {
            pacientes.set(perfil.id, perfil);
        });
    }
    /**
     * Obtiene el historial médico de un paciente vía sync mesh.
     */
    async getMedicalHistory(patientId) {
        const historiales = this.mesh.yjsAdapter.getArray(`maloca-salud:historial:${patientId}`);
        return historiales.toArray();
    }
    /**
     * Vincula paciente-médico en el mesh.
     */
    async linkDoctor(patientId, doctorId) {
        const links = this.mesh.yjsAdapter.getMap("maloca-salud:links-paciente-medico");
        Y.transact(this.mesh.yjsAdapter.doc, () => {
            const existing = links.get(patientId) || [];
            if (!existing.includes(doctorId)) {
                links.set(patientId, [...existing, doctorId]);
            }
        });
    }
}
//# sourceMappingURL=patient-profile.js.map