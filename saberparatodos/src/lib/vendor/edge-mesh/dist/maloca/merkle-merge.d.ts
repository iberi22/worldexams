export interface Leaf {
    hash: string;
    data: string;
    timestamp: number;
    signature?: string;
}
export interface MerkleMergeResult {
    mergedRoot: string;
    conflictCount: number;
    resolvedLeaves: {
        hash: string;
        leaf: Leaf;
    }[];
    pendingLeaves: {
        hash: string;
        leaf: Leaf;
    }[];
}
/**
 * Merge two Merkle trees after a split-brain partition.
 *
 * 1. Equal roots → trivial merge (no conflict)
 * 2. Leaves keyed by hash: shared once, exclusives kept
 * 3. Same hash / different data → conflict:
 *    - |Δt| > conflictWindowMs → Last-Writer-Wins
 *    - |Δt| ≤ conflictWindowMs → pendingLeaves (governance)
 */
export declare function mergeMerkleTrees(localRoot: string, remoteRoot: string, localLeaves: Leaf[], remoteLeaves: Leaf[], conflictWindowMs?: number): MerkleMergeResult;
//# sourceMappingURL=merkle-merge.d.ts.map