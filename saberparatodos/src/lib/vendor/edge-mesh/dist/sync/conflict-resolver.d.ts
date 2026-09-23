/**
 * Conflict resolver for concurrent backlog updates.
 * Implements last-writer-wins with vector clocks.
 */
export interface VectorClock {
    [nodeId: string]: number;
}
export interface ConflictEntry {
    key: string;
    localValue: unknown;
    remoteValue: unknown;
    localClock: VectorClock;
    remoteClock: VectorClock;
    timestamp: number;
}
/**
 * Compare two vector clocks.
 * Returns: -1 if a < b, 0 if concurrent, 1 if a > b
 */
export declare function compareClocks(a: VectorClock, b: VectorClock): number;
/**
 * Resolve conflict using last-writer-wins.
 * If concurrent, use timestamp as tiebreaker.
 */
export declare function resolveConflict(local: unknown, remote: unknown, localClock: VectorClock, remoteClock: VectorClock, localTimestamp: number, remoteTimestamp: number): {
    winner: "local" | "remote";
    reason: string;
};
/**
 * Increment vector clock for a node.
 */
export declare function incrementClock(clock: VectorClock, nodeId: string): VectorClock;
//# sourceMappingURL=conflict-resolver.d.ts.map