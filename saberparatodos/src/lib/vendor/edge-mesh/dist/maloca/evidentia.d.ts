import type { PostQuantumIdentity } from "../identity/index.js";
import type { MeshManager } from "../mesh/index.js";
import type { NodoId } from "../types/index.js";
import type { PolygonBridge } from "./polygon-bridge.js";
export interface Evidentia {
    readonly hash: string;
    readonly tipo: string;
    readonly contenidoHash: string;
    readonly emisor: NodoId;
    readonly firmaPQC: string;
    readonly red: string;
    readonly confirmaciones: number;
    readonly timestamp: number;
}
export declare class EvidentiaManager extends EventTarget {
    private readonly identity;
    private readonly mesh;
    private readonly evidentias;
    private readonly NAMESPACE;
    private readonly bridge?;
    constructor(identity: PostQuantumIdentity, mesh: MeshManager, bridge?: PolygonBridge);
    notarize(contenido: unknown, tipo: string): Promise<Evidentia>;
    verify(hash: string): Promise<boolean>;
    getProof(hash: string): Evidentia | null;
    getBridge(): PolygonBridge | undefined;
    broadcastToBlockchain(evidentia: Evidentia): Promise<void>;
}
export interface Leaf {
    readonly id: string;
    readonly hash: string;
    readonly timestamp: number;
    readonly data?: unknown;
}
export declare class MerkleTree {
    private leaves;
    private root;
    private buildPromise;
    private buildGeneration;
    signature?: string;
    constructor(leaves?: Leaf[]);
    getLeaves(): Leaf[];
    toJSON(): {
        leaves: Leaf[];
        signature?: string;
    };
    add(leaf: Leaf): Promise<void>;
    getRoot(): Promise<string>;
    private rebuild;
    verify(leaf: Leaf, proof: string[]): Promise<boolean>;
    getProof(leaf: Leaf): Promise<string[]>;
}
export declare function hashLeaf(leaf: Leaf): Promise<string>;
export interface MerkleMergeResult {
    mergedTree: MerkleTree;
    conflictCount: number;
    resolvedLeaves: Leaf[];
    pendingLeaves: Leaf[];
}
export declare function mergeMerkleTrees(treeA: MerkleTree, treeB: MerkleTree, identity?: PostQuantumIdentity): Promise<MerkleMergeResult>;
//# sourceMappingURL=evidentia.d.ts.map