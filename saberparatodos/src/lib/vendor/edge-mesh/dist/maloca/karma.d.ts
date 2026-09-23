import type { PostQuantumIdentity } from "../identity/index.js";
import type { OpLog } from "../op-log/index.js";
import type { NodoId, ParPublico } from "../types/index.js";
import type { TransaccionKarma } from "./types.js";
/**
 * KarmaManager — motor de reputación para nodos de la mesh.
 *
 * Genérico: no contiene lógica de negocio (pesos por industria, umbrales, etc).
 * Cada adapter (VeedurIA, Hosteler-IA) registra sus propias reglas.
 */
export type { TransaccionKarma };
export declare class KarmaManager {
    private readonly oplog;
    private readonly identity;
    private cache;
    private readonly getPublicKey?;
    constructor(oplog: OpLog, identity: PostQuantumIdentity, getPublicKey?: (nodeId: NodoId) => ParPublico | undefined);
    /**
     * Carga el estado de karma desde el OpLog.
     * Debe llamarse después de crear la instancia.
     */
    loadFromOpLog(keepExistingCache?: boolean): Promise<void>;
    /**
     * Emite una transacción de karma firmada con la identidad PQC del nodo.
     */
    emit(txData: Omit<TransaccionKarma, "id" | "timestamp" | "firma"> & Partial<Pick<TransaccionKarma, "id" | "timestamp" | "firma">>): Promise<TransaccionKarma>;
    /**
     * Obtiene el score de karma de un nodo.
     */
    getScore(nodeId: NodoId): number;
    /**
     * Obtiene el historial de transacciones de un nodo.
     */
    getHistory(nodeId: NodoId): readonly TransaccionKarma[];
    /**
     * Aplica decay (olvido) al score de un nodo, o a todos si no se especifica.
     * - factor: 0.95 reduce 5%, 0.90 reduce 10%, etc.
     */
    applyDecay(nodeId?: NodoId, factor?: number): Promise<void>;
    /**
     * Verifica una firma de transacción contra una clave pública.
     */
    verify(tx: TransaccionKarma, publicKey?: ParPublico): Promise<boolean>;
    /**
     * Devuelve el peer con mejor karma en la mesh (para asignación de trabajo).
     * Si no hay peers con karma registrado, devuelve null.
     */
    getBestPeer(): NodoId | null;
    private applyTransaction;
    private applyDecayToCache;
}
//# sourceMappingURL=karma.d.ts.map