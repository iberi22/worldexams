export const MODEL_REGISTRY_VERSION = "2026.07.1";
export const MODEL_REGISTRY = [
    {
        id: "gemma-4-E2B-it-ONNX",
        kind: "llm",
        version: MODEL_REGISTRY_VERSION,
        sizeBytes: 1_600_000_000,
        requirements: { webgpu: true, minMemoryMB: 4_096 },
        hfRepo: "onnx-community/gemma-4-E2B-it-ONNX",
        url: "https://huggingface.co/onnx-community/gemma-4-E2B-it-ONNX/resolve/main/onnx/model_q4f16.onnx",
        dtype: "q4f16",
        recommendedTiers: ["high", "mid"],
    },
    {
        id: "gemma-4-E4B-it-ONNX",
        kind: "llm",
        version: MODEL_REGISTRY_VERSION,
        sizeBytes: 3_200_000_000,
        requirements: { webgpu: true, minMemoryMB: 8_192 },
        hfRepo: "onnx-community/gemma-4-E4B-it-ONNX",
        url: "https://huggingface.co/onnx-community/gemma-4-E4B-it-ONNX/resolve/main/onnx/model_q4f16.onnx",
        dtype: "q4f16",
        recommendedTiers: ["high"],
    },
    {
        id: "Qwen2.5-0.5B-Instruct",
        kind: "llm",
        version: MODEL_REGISTRY_VERSION,
        sizeBytes: 490_000_000,
        requirements: { minMemoryMB: 1_024 },
        hfRepo: "onnx-community/Qwen2.5-0.5B-Instruct",
        url: "https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct/resolve/main/onnx/model_q4.onnx",
        dtype: "q4",
        recommendedTiers: ["high", "mid", "low"],
    },
    {
        id: "vits-piper-es_ES-sharvard-medium",
        kind: "tts",
        version: MODEL_REGISTRY_VERSION,
        sizeBytes: 65_000_000,
        requirements: { minMemoryMB: 512 },
        url: "https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-piper-es_ES-sharvard-medium.tar.bz2",
        dtype: "float32",
        recommendedTiers: ["high", "mid", "low"],
    },
    {
        id: "sherpa-onnx-zipformer-es",
        kind: "asr",
        version: MODEL_REGISTRY_VERSION,
        sizeBytes: 150_000_000,
        requirements: { minMemoryMB: 1_024 },
        url: "https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-zipformer-es.tar.bz2",
        dtype: "int8",
        recommendedTiers: ["high", "mid"],
    },
    {
        id: "whisper-tiny-es-ONNX",
        kind: "asr",
        version: MODEL_REGISTRY_VERSION,
        sizeBytes: 75_000_000,
        requirements: { minMemoryMB: 512 },
        hfRepo: "onnx-community/whisper-tiny",
        url: "https://huggingface.co/onnx-community/whisper-tiny/resolve/main/onnx/encoder_model_quantized.onnx",
        dtype: "int8",
        recommendedTiers: ["high", "mid", "low"],
    },
];
const MODELS_BY_ID = new Map(MODEL_REGISTRY.map((model) => [model.id, model]));
export function getModel(modelId) {
    return MODELS_BY_ID.get(modelId);
}
export function recommendFor(tier) {
    const lite = MODELS_BY_ID.get("Qwen2.5-0.5B-Instruct");
    const standard = MODELS_BY_ID.get("gemma-4-E2B-it-ONNX");
    if (lite === undefined || standard === undefined) {
        throw new Error("The built-in LLM registry is incomplete");
    }
    if (tier === "low") {
        return { tier, primary: lite, fallbacks: [] };
    }
    // E4B stays explicitly opt-in even on high-tier desktops.
    return { tier, primary: standard, fallbacks: [lite] };
}
//# sourceMappingURL=model-registry.js.map