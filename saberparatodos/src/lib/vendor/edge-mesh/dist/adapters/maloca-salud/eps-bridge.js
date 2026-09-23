import * as Y from "yjs";
export class EPSBridge {
    mesh;
    constructor(mesh) {
        this.mesh = mesh;
    }
    /**
     * Sincroniza datos de la EPS al mesh.
     */
    async syncEPSData(epsData) {
        const epsMap = this.mesh.yjsAdapter.getMap("maloca-salud:eps-data");
        Y.transact(this.mesh.yjsAdapter.doc, () => {
            epsMap.set(epsData.id, epsData);
        });
    }
    /**
     * Verifica afiliación EPS de un paciente vía mesh.
     */
    async verifyEPS(patientId, epsId) {
        const epsMap = this.mesh.yjsAdapter.getMap("maloca-salud:eps-data");
        const epsData = epsMap.get(epsId);
        if (epsData === undefined)
            return false;
        return epsData.pacientesAfiliados.includes(patientId);
    }
}
//# sourceMappingURL=eps-bridge.js.map