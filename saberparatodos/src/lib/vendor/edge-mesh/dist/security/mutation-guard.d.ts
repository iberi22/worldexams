/**
 * Reserved Yjs transaction origin used for security reverts.
 * A revert transaction MUST NOT re-trigger guards nor be relayed to peers
 * as a new mutation of the remote peer.
 */
export declare const SECURITY_REVERT_ORIGIN: "edge-mesh:security-revert";
export type MutationAccion = "add" | "update" | "delete";
/** A single root-level Y.Map key change produced by a remote update. */
export interface MutationCambio {
    /** Root map name (Yjs shared type name). */
    readonly mapa: string;
    readonly clave: string;
    readonly accion: MutationAccion;
    /** Value before the remote update (undefined for additions). */
    readonly valorAnterior: unknown;
    /** Value after the remote update (undefined for deletions). */
    readonly valorNuevo: unknown;
}
/** Context passed to every registered guard for a remote mutation. */
export interface MutationGuardContext {
    /** Origin of the remote mutation (typically the peer NodoId). */
    readonly origen: unknown;
    readonly docId?: string;
    readonly namespace?: string;
    readonly cambios: readonly MutationCambio[];
}
export type MutationGuardDecision = boolean | {
    readonly permitido: boolean;
    readonly razon?: string;
};
/**
 * Guard callback. Return `true` / `{ permitido: true }` to allow the mutation.
 * If ANY registered guard denies, all changed keys are surgically reverted
 * to their previous values inside a single Yjs transaction whose origin is
 * `SECURITY_REVERT_ORIGIN`.
 */
export type MutationGuard = (ctx: MutationGuardContext) => MutationGuardDecision;
export interface MutationGuardResult {
    /** The remote update was applied to the document. */
    readonly aplicado: boolean;
    /** The mutation was denied and its keys reverted. */
    readonly revertido: boolean;
    readonly cambios: readonly MutationCambio[];
    /** Denial reasons reported by guards (empty when allowed). */
    readonly razones: readonly string[];
}
export declare function decisionPermitida(decision: MutationGuardDecision): boolean;
export declare function decisionRazon(decision: MutationGuardDecision, origen: unknown): string;
//# sourceMappingURL=mutation-guard.d.ts.map