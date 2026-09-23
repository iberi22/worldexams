import { InMemoryStorage } from '../../storage/index.js';
/**
 * Gestiona sesiones de examen sobre los primitivos del core:
 * - NamespaceManager para garantizar que el namespace de la sesión existe.
 * - IStorage como KV por namespace (inyectable; InMemoryStorage por defecto).
 * - EvidentiaManager.notarize para anclar resultados al MerkleTree.
 */
export class ExamSessionManager {
    namespaceManager;
    evidentia;
    storage;
    constructor(namespaceManager, evidentia, storage) {
        this.namespaceManager = namespaceManager;
        this.evidentia = evidentia;
        this.storage = storage ?? new InMemoryStorage();
    }
    asegurarNamespace(nombre) {
        if (!this.namespaceManager.obtenerEspacioPorNombre(nombre)) {
            this.namespaceManager.crearEspacio(nombre);
        }
    }
    async crearSesion(sesion) {
        this.asegurarNamespace(sesion.namespaceId);
        const payload = JSON.stringify({
            id: sesion.id,
            examinadorId: sesion.examinadorId,
            examinadoId: sesion.examinadoId,
            fechaInicio: sesion.fechaInicio,
            estado: sesion.estado,
        });
        await this.storage.set(`${sesion.namespaceId}:examen:${sesion.id}`, payload);
        return sesion.id;
    }
    async notarizarResultado(resultado) {
        const evidentia = await this.evidentia.notarize(resultado, 'examen-resultado');
        return evidentia.hash;
    }
    async obtenerSesion(id, namespaceId = 'worldexams') {
        const entry = await this.storage.get(`${namespaceId}:examen:${id}`);
        if (!entry)
            return null;
        const parsed = JSON.parse(entry.valor);
        return {
            ...parsed,
            fechaInicio: new Date(parsed.fechaInicio),
            metadataCifrada: new Uint8Array(),
        };
    }
}
//# sourceMappingURL=session.js.map