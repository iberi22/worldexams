import type { ParPublico, PostQuantumIdentity } from "../identity/index.js";
import type { NodoId, PayloadVotacion } from "../types/index.js";
import { type Propuesta } from "./index.js";
export type Proposal = Propuesta;
export type Vote = PayloadVotacion;
export interface GovernanceEvent {
    readonly id: string;
    readonly tipo: string;
    readonly timestamp: number;
    readonly payload: unknown;
}
export interface GovernanceSnapshot {
    readonly propuestas: Proposal[];
    readonly timestamp: number;
    readonly firma?: Uint8Array;
    readonly publicNodeId?: NodoId;
}
export interface GovernanceMerge {
    resolveProposalConflicts(local: Proposal[], remote: Proposal[]): Promise<Proposal[]>;
    resolveVoteConflicts(local: Vote[], remote: Vote[]): Promise<Vote[]>;
    detectGovernanceFork(localEvents: GovernanceEvent[], remoteEvents: GovernanceEvent[]): Promise<boolean>;
}
export declare function stableStringify(val: unknown): string;
export declare function signGovernanceSnapshot(snapshot: Omit<GovernanceSnapshot, "firma" | "publicNodeId">, identity: PostQuantumIdentity): Promise<GovernanceSnapshot>;
export declare function verifyGovernanceSnapshot(snapshot: GovernanceSnapshot, parPublico: ParPublico, identity: PostQuantumIdentity): Promise<boolean>;
export declare class GovernanceMerger implements GovernanceMerge {
    resolveProposalConflicts(local: Proposal[], remote: Proposal[]): Promise<Proposal[]>;
    resolveVoteConflicts(local: Vote[], remote: Vote[]): Promise<Vote[]>;
    detectGovernanceFork(localEvents: GovernanceEvent[], remoteEvents: GovernanceEvent[]): Promise<boolean>;
}
//# sourceMappingURL=merge.d.ts.map