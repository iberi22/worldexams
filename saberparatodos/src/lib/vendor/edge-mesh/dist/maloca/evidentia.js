import { bytesAHex } from "../protocol/utils.js";
// ─── EVIDENTIA MANAGER ─────────────────────────────────────────────────────
export class EvidentiaManager extends EventTarget {
    identity;
    mesh;
    evidentias;
    NAMESPACE = "_maloca:evidentia";
    bridge;
    constructor(identity, mesh, bridge) {
        super();
        this.identity = identity;
        this.mesh = mesh;
        this.evidentias = new Map();
        this.bridge = bridge;
    }
    async notarize(contenido, tipo) {
        const encoder = new TextEncoder();
        const contenidoStr = JSON.stringify(contenido);
        const contenidoBytes = encoder.encode(contenidoStr);
        // Hashear contenido (SHA-256)
        const digest = await crypto.subtle.digest("SHA-256", contenidoBytes);
        const contenidoHash = bytesAHex(new Uint8Array(digest));
        // Firmar con PQC
        const firmaBytes = await this.identity.firmar(new Uint8Array(digest));
        const firmaPQC = bytesAHex(firmaBytes);
        // Crear hash de la notarización completa
        const notarizacionId = bytesAHex(new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(`${contenidoHash}${firmaPQC}${this.identity.nodoId}`))));
        const evidentia = {
            hash: notarizacionId,
            tipo,
            contenidoHash,
            emisor: this.identity.nodoId,
            firmaPQC,
            red: this.bridge ? "polygon-testnet" : "maloca-mesh",
            confirmaciones: 1,
            timestamp: Date.now(),
        };
        this.evidentias.set(evidentia.hash, evidentia);
        // Difundir en la red mesh / Polygon
        await this.broadcastToBlockchain(evidentia);
        this.dispatchEvent(new CustomEvent("notarizacionCreada", { detail: evidentia }));
        return evidentia;
    }
    async verify(hash) {
        const evidentia = this.evidentias.get(hash);
        if (!evidentia)
            return false;
        // Si tiene bridge de Polygon, podemos verificar on-chain
        if (this.bridge) {
            const root = evidentia.hash.startsWith("0x")
                ? evidentia.hash
                : `0x${evidentia.hash}`;
            const onChainOk = await this.bridge.verifyOnChain(root, []);
            if (onChainOk)
                return true;
        }
        // Por ahora, simulamos verificación de integridad básica
        return true;
    }
    getProof(hash) {
        return this.evidentias.get(hash) ?? null;
    }
    getBridge() {
        return this.bridge;
    }
    async broadcastToBlockchain(evidentia) {
        // Si hay bridge de Polygon, enviamos el anchor correspondientemente
        if (this.bridge) {
            const anchor = {
                merkleRoot: evidentia.hash.startsWith("0x")
                    ? evidentia.hash
                    : `0x${evidentia.hash}`,
                cid: evidentia.contenidoHash,
                timestamp: evidentia.timestamp,
            };
            try {
                await this.bridge.submitAnchor(anchor);
            }
            catch (_err) {
                // El bridge maneja el encolado interno en caso de error
            }
        }
        // Difundir vía gossip en el mesh como "blockchain adapter"
        await this.mesh.transmitirConGossip(this.NAMESPACE, {
            tipo: "DOC_NOTARIZED",
            evidentia,
        });
    }
}
// ─── SHA-256 UNIVERSAL (Web Crypto API) ────────────────────────────────────
// Reemplaza `node:crypto.createHash` para que edge-mesh sea universal
// (browser + node). Determinista: mismo SHA-256 sobre los mismos bytes.
const sha256Encoder = new TextEncoder();
async function sha256Hex(data) {
    const bytes = typeof data === "string" ? sha256Encoder.encode(data) : data;
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return bytesAHex(new Uint8Array(digest));
}
export class MerkleTree {
    leaves;
    root;
    buildPromise;
    buildGeneration = 0;
    signature;
    constructor(leaves = []) {
        this.leaves = [...leaves];
        this.root = "";
        // rebuild() es async (Web Crypto); se dispara y se espera vía buildPromise.
        this.buildPromise = this.rebuild();
    }
    getLeaves() {
        return [...this.leaves];
    }
    toJSON() {
        return {
            leaves: this.leaves,
            signature: this.signature,
        };
    }
    async add(leaf) {
        this.leaves.push(leaf);
        this.buildPromise = this.rebuild();
        await this.buildPromise;
    }
    async getRoot() {
        await this.buildPromise;
        return this.root;
    }
    async rebuild() {
        // Generación anti-race: si un rebuild previo termina después que uno nuevo,
        // su resultado se descarta (snapshot + guard de generación).
        const generation = ++this.buildGeneration;
        const snapshot = [...this.leaves];
        if (snapshot.length === 0) {
            this.root = "";
            return;
        }
        let level = [];
        for (const leaf of snapshot) {
            level.push(await hashLeaf(leaf));
        }
        while (level.length > 1) {
            const nextLevel = [];
            for (let i = 0; i < level.length; i += 2) {
                if (i + 1 < level.length) {
                    const left = level[i];
                    const right = level[i + 1];
                    const combined = left < right ? left + right : right + left;
                    nextLevel.push(await sha256Hex(combined));
                }
                else {
                    const left = level[i];
                    const combined = left + left;
                    nextLevel.push(await sha256Hex(combined));
                }
            }
            level = nextLevel;
        }
        if (generation === this.buildGeneration) {
            this.root = level[0] || "";
        }
    }
    async verify(leaf, proof) {
        let currentHash = await hashLeaf(leaf);
        for (const sibling of proof) {
            const combined = currentHash < sibling ? currentHash + sibling : sibling + currentHash;
            currentHash = await sha256Hex(combined);
        }
        return currentHash === (await this.getRoot());
    }
    async getProof(leaf) {
        let index = this.leaves.findIndex((l) => l.id === leaf.id);
        if (index === -1)
            return [];
        const proof = [];
        let level = [];
        for (const l of this.leaves) {
            level.push(await hashLeaf(l));
        }
        while (level.length > 1) {
            const nextLevel = [];
            for (let i = 0; i < level.length; i += 2) {
                if (i + 1 < level.length) {
                    const left = level[i];
                    const right = level[i + 1];
                    const combined = left < right ? left + right : right + left;
                    nextLevel.push(await sha256Hex(combined));
                    if (i === index) {
                        proof.push(right);
                    }
                    else if (i + 1 === index) {
                        proof.push(left);
                    }
                }
                else {
                    const left = level[i];
                    const combined = left + left;
                    nextLevel.push(await sha256Hex(combined));
                    if (i === index) {
                        proof.push(left);
                    }
                }
            }
            index = Math.floor(index / 2);
            level = nextLevel;
        }
        return proof;
    }
}
export async function hashLeaf(leaf) {
    const dataToHash = `${leaf.id}:${leaf.hash}:${leaf.timestamp}`;
    return sha256Hex(dataToHash);
}
export async function mergeMerkleTrees(treeA, treeB, identity) {
    // Atomic rollback check: take snapshots of leaves to prevent mutating treeA or treeB
    const originalLeavesA = treeA.getLeaves();
    const originalLeavesB = treeB.getLeaves();
    // Atomicidad: se trabaja sobre snapshots de leaves (originalLeavesA/B),
    // nunca se mutan treeA ni treeB. Cualquier error aborta sin efectos.
    const leavesMap = new Map();
    for (const leaf of originalLeavesA) {
        leavesMap.set(leaf.id, { a: leaf });
    }
    for (const leaf of originalLeavesB) {
        const entry = leavesMap.get(leaf.id) || {};
        entry.b = leaf;
        leavesMap.set(leaf.id, entry);
    }
    const mergedLeaves = [];
    const resolvedLeaves = [];
    const pendingLeaves = [];
    let conflictCount = 0;
    for (const [_, entry] of leavesMap.entries()) {
        if (entry.a && !entry.b) {
            mergedLeaves.push(entry.a);
        }
        else if (!entry.a && entry.b) {
            mergedLeaves.push(entry.b);
        }
        else if (entry.a && entry.b) {
            const leafA = entry.a;
            const leafB = entry.b;
            if (leafA.hash === leafB.hash) {
                // No conflict, they are identical
                mergedLeaves.push(leafA);
            }
            else {
                // Conflict!
                conflictCount++;
                const diff = Math.abs(leafA.timestamp - leafB.timestamp);
                const fiveMinutesMs = 5 * 60 * 1000;
                if (diff > fiveMinutesMs) {
                    // Resolve by LWW (Last-Writer-Wins)
                    const winner = leafA.timestamp > leafB.timestamp ? leafA : leafB;
                    resolvedLeaves.push(winner);
                    mergedLeaves.push(winner);
                }
                else {
                    // Irresoluble conflict, requires governance vote
                    pendingLeaves.push(leafA);
                    pendingLeaves.push(leafB);
                }
            }
        }
    }
    // Create merged tree
    const mergedTree = new MerkleTree(mergedLeaves);
    // El nuevo root se firma con ML-DSA-65
    if (identity) {
        const root = await mergedTree.getRoot();
        if (root) {
            const encoder = new TextEncoder();
            const rootBytes = encoder.encode(root);
            const digest = await crypto.subtle.digest("SHA-256", rootBytes);
            const signatureBytes = await identity.firmar(new Uint8Array(digest));
            mergedTree.signature = bytesAHex(signatureBytes);
        }
    }
    return {
        mergedTree,
        conflictCount,
        resolvedLeaves,
        pendingLeaves,
    };
}
//# sourceMappingURL=evidentia.js.map