import { AsrEngine } from "./asr-engine.js";
import { scanDeviceCapabilities, } from "./capability-scan.js";
import { LlmEngine } from "./llm-engine.js";
import { ModelManager, } from "./model-manager.js";
import { recommendFor as recommendForTier, } from "./model-registry.js";
import { TtsEngine } from "./tts-engine.js";
export * from "./asr-engine.js";
export * from "./capability-scan.js";
export * from "./llm-engine.js";
export * from "./model-manager.js";
export * from "./model-registry.js";
export * from "./sherpa-support.js";
export * from "./tts-engine.js";
export function createAiCore(options) {
    if (options.instanceId.trim().length === 0) {
        throw new Error("createAiCore requires a non-empty instanceId");
    }
    const modelManager = new ModelManager();
    const llm = new LlmEngine();
    const tts = new TtsEngine();
    const asr = new AsrEngine();
    return {
        mesh: options.mesh,
        instanceId: options.instanceId,
        llm,
        tts,
        asr,
        scan: scanDeviceCapabilities,
        recommend(device) {
            return typeof device === "string"
                ? recommendForTier(device)
                : modelManager.recommendFor(device);
        },
        ensureModel(modelId, onProgress) {
            return modelManager.ensure(modelId, onProgress);
        },
        removeModel(modelId) {
            return modelManager.remove(modelId);
        },
        listDownloaded() {
            return modelManager.downloaded();
        },
    };
}
//# sourceMappingURL=index.js.map