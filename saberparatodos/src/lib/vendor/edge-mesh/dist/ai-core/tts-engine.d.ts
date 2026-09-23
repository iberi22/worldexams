import type { ModelManager } from "./model-manager.js";
import { type SherpaOnnxLoader } from "./sherpa-support.js";
export interface SherpaTtsResult {
    readonly samples: Float32Array;
    readonly sampleRate: number;
}
export interface SherpaTtsRuntime {
    synthesize(text: string, options?: {
        readonly speakerId?: number;
        readonly speed?: number;
    }): Promise<SherpaTtsResult | ArrayBuffer>;
}
/**
 * VITS model files expected by sherpa-onnx OfflineTts. `model` is the ONNX
 * graph bytes, `tokens` the tokens.txt contents, and `dataDir` the path to
 * the extracted `espeak-ng-data` directory when the model needs it.
 */
export interface SherpaTtsFiles {
    readonly model: ArrayBuffer | Uint8Array;
    readonly tokens: string;
    readonly lexicon?: string;
    readonly dataDir?: string;
}
export interface SherpaTtsRuntimeOptions {
    readonly files: SherpaTtsFiles;
    readonly numThreads?: number;
    readonly sherpaLoader?: SherpaOnnxLoader;
}
export interface ManagedSherpaTtsRuntime extends SherpaTtsRuntime {
    free(): Promise<void>;
}
export interface TtsEngineOptions {
    readonly runtime?: SherpaTtsRuntime;
    readonly speakerId?: number;
    readonly speed?: number;
}
/**
 * Builds a SherpaTtsRuntime backed by a real sherpa-onnx WASM OfflineTts
 * instance. Throws when the optional `sherpa-onnx` dependency is missing or
 * the model files cannot be materialized (see writeModelFiles).
 */
export declare function createSherpaTtsRuntime(options: SherpaTtsRuntimeOptions): Promise<ManagedSherpaTtsRuntime>;
export declare class TtsEngine {
    private runtime?;
    private readonly speakerId?;
    private readonly speed?;
    private queue;
    constructor(options?: TtsEngineOptions);
    load(runtime: SherpaTtsRuntime): void;
    /**
     * Loads a VITS model from in-memory files and installs a real sherpa-onnx
     * runtime. Resolves to `false` (keeping the fallback chain) when the
     * optional dependency or a filesystem is unavailable.
     */
    loadFromFiles(files: SherpaTtsFiles, options?: {
        readonly numThreads?: number;
        readonly sherpaLoader?: SherpaOnnxLoader;
    }): Promise<boolean>;
    /**
     * Convenience loader that pulls model bytes from a ModelManager-managed
     * download and wires them into the sherpa-onnx runtime.
     *
     * TODO(packaging): approved TTS packs currently ship as `.tar.bz2`
     * archives (model.onnx + tokens.txt + espeak-ng-data). Extraction is not
     * implemented here — serve the extracted directory instead and call
     * loadFromFiles, or add a tar.bz2 decoder. Until then this returns
     * `false` for archive payloads and for raw payloads missing tokens.
     */
    loadFromModelManager(manager: ModelManager, modelId: string, options?: {
        readonly tokens?: string;
        readonly dataDir?: string;
        readonly sherpaLoader?: SherpaOnnxLoader;
    }): Promise<boolean>;
    speak(text: string): Promise<ArrayBuffer>;
    private synthesize;
}
//# sourceMappingURL=tts-engine.d.ts.map