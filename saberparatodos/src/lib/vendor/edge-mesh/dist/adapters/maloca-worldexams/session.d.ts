import type { NamespaceManager } from '../../namespaces/index.js';
import type { EvidentiaManager } from '../../maloca/evidentia.js';
import { type IStorage } from '../../storage/index.js';
import type { ExamenSesion, ResultadoExamen } from './profile.js';
/**
 * Gestiona sesiones de examen sobre los primitivos del core:
 * - NamespaceManager para garantizar que el namespace de la sesión existe.
 * - IStorage como KV por namespace (inyectable; InMemoryStorage por defecto).
 * - EvidentiaManager.notarize para anclar resultados al MerkleTree.
 */
export declare class ExamSessionManager {
    private readonly namespaceManager;
    private readonly evidentia;
    private readonly storage;
    constructor(namespaceManager: NamespaceManager, evidentia: EvidentiaManager, storage?: IStorage);
    private asegurarNamespace;
    crearSesion(sesion: ExamenSesion): Promise<string>;
    notarizarResultado(resultado: ResultadoExamen): Promise<string>;
    obtenerSesion(id: string, namespaceId?: string): Promise<ExamenSesion | null>;
}
//# sourceMappingURL=session.d.ts.map