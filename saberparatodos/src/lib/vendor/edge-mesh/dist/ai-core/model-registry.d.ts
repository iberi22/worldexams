import type { DeviceTier } from "./capability-scan.js";
export type ModelKind = "llm" | "tts" | "asr";
export interface ModelRequirements {
    readonly webgpu?: boolean;
    readonly minMemoryMB: number;
}
export declare const MODEL_REGISTRY_VERSION = "2026.07.1";
export interface ApprovedModel {
    readonly id: string;
    readonly kind: ModelKind;
    /** Registry revision that last reviewed this entry. */
    readonly version: string;
    readonly sizeBytes: number;
    readonly requirements: ModelRequirements;
    readonly hfRepo?: string;
    readonly url?: string;
    readonly dtype: string;
    readonly recommendedTiers: readonly DeviceTier[];
}
export interface ModelRecommendation {
    readonly tier: DeviceTier;
    readonly primary: ApprovedModel;
    readonly fallbacks: readonly ApprovedModel[];
}
export declare const MODEL_REGISTRY: readonly ApprovedModel[];
export declare function getModel(modelId: string): ApprovedModel | undefined;
export declare function recommendFor(tier: DeviceTier): ModelRecommendation;
//# sourceMappingURL=model-registry.d.ts.map