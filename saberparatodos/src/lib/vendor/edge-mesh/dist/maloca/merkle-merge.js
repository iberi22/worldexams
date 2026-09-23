import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
// ─── HASH HELPERS ──────────────────────────────────────────────────────────
function sha256Hex(input) {
    return bytesToHex(sha256(new TextEncoder().encode(input)));
}
/**
 * Recompute a Merkle root from leaf hashes (odd last leaf duplicated).
 * Matches MerkleTreeManager pairing semantics; sync for merge path.
 */
function computeMerkleRoot(leafHashes) {
    if (leafHashes.length === 0)
        return sha256Hex("");
    let current = [...leafHashes];
    while (current.length > 1) {
        const next = [];
        for (let i = 0; i < current.length; i += 2) {
            const left = current[i];
            const right = current[i + 1] ?? left;
            next.push(sha256Hex(left + right));
        }
        current = next;
    }
    return current[0];
}
// ─── MERGE ─────────────────────────────────────────────────────────────────
/**
 * Merge two Merkle trees after a split-brain partition.
 *
 * 1. Equal roots → trivial merge (no conflict)
 * 2. Leaves keyed by hash: shared once, exclusives kept
 * 3. Same hash / different data → conflict:
 *    - |Δt| > conflictWindowMs → Last-Writer-Wins
 *    - |Δt| ≤ conflictWindowMs → pendingLeaves (governance)
 */
export function mergeMerkleTrees(localRoot, remoteRoot, localLeaves, remoteLeaves, conflictWindowMs = 300_000) {
    if (localRoot === remoteRoot) {
        return {
            mergedRoot: localRoot,
            conflictCount: 0,
            resolvedLeaves: localLeaves.map((leaf) => ({ hash: leaf.hash, leaf })),
            pendingLeaves: [],
        };
    }
    const localByHash = new Map();
    for (const leaf of localLeaves) {
        localByHash.set(leaf.hash, leaf);
    }
    const remoteByHash = new Map();
    for (const leaf of remoteLeaves) {
        remoteByHash.set(leaf.hash, leaf);
    }
    const allHashes = new Set([...localByHash.keys(), ...remoteByHash.keys()]);
    const resolvedLeaves = [];
    const pendingLeaves = [];
    let conflictCount = 0;
    for (const hash of allHashes) {
        const local = localByHash.get(hash);
        const remote = remoteByHash.get(hash);
        if (local && !remote) {
            resolvedLeaves.push({ hash, leaf: local });
            continue;
        }
        if (remote && !local) {
            resolvedLeaves.push({ hash, leaf: remote });
            continue;
        }
        if (!local || !remote)
            continue;
        // Same hash on both sides
        if (local.data === remote.data) {
            const winner = local.timestamp >= remote.timestamp ? local : remote;
            resolvedLeaves.push({ hash, leaf: winner });
            continue;
        }
        conflictCount += 1;
        const delta = Math.abs(local.timestamp - remote.timestamp);
        if (delta > conflictWindowMs) {
            // Last-Writer-Wins
            const winner = local.timestamp > remote.timestamp ? local : remote;
            resolvedLeaves.push({ hash, leaf: winner });
        }
        else {
            // Irresoluble within window — both sides await governance
            pendingLeaves.push({ hash, leaf: local });
            pendingLeaves.push({ hash, leaf: remote });
        }
    }
    const sortedHashes = resolvedLeaves.map((r) => r.leaf.hash).sort();
    const mergedRoot = computeMerkleRoot(sortedHashes);
    return {
        mergedRoot,
        conflictCount,
        resolvedLeaves,
        pendingLeaves,
    };
}
//# sourceMappingURL=merkle-merge.js.map