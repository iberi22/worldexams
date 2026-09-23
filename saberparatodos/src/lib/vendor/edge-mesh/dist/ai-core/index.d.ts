import { AsrEngine } from "./asr-engine.js";
import { type DeviceCapabilities, type DeviceTier } from "./capability-scan.js";
import { LlmEngine } from "./llm-engine.js";
import { type DownloadedModel, type ModelProgressCallback } from "./model-manager.js";
import { type ModelRecommendation } from "./model-registry.js";
import { TtsEngine } from "./tts-engine.js";
export * from "./asr-engine.js";
export * from "./capability-scan.js";
export * from "./llm-engine.js";
export type { LlmWorkerRequest, LlmWorkerResponse } from "./llm-worker.js";
export * from "./model-manager.js";
export * from "./model-registry.js";
export * from "./sherpa-support.js";
export * from "./tts-engine.js";
export interface CreateAiCoreOptions {
    readonly mesh?: unknown;
    readonly instanceId: string;
}
export interface AiCore {
    readonly mesh?: unknown;
    readonly instanceId: string;
    readonly llm: LlmEngine;
    readonly tts: TtsEngine;
    readonly asr: AsrEngine;
    scan(): Promise<DeviceCapabilities>;
    recommend(device: DeviceCapabilities | DeviceTier): ModelRecommendation;
    ensureModel(modelId: string, onProgress?: ModelProgressCallback): Promise<DownloadedModel>;
    removeModel(modelId: string): Promise<boolean>;
    listDownloaded(): Promise<DownloadedModel[]>;
}
export declare function createAiCore(options: CreateAiCoreOptions): AiCore;
//# sourceMappingURL=index.d.ts.map