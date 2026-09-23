import { type SherpaOnnxLoader } from "./sherpa-support.js";
export interface SherpaAsrRuntime {
    transcribe(audio: ArrayBuffer, options?: {
        readonly language?: string;
    }): Promise<string>;
}
export interface AsrEngineOptions {
    readonly runtime?: SherpaAsrRuntime;
    readonly mock?: boolean;
}
/**
 * Model files for an offline recognizer: either a Zipformer-style transducer
 * (encoder + decoder + joiner) or a Whisper encoder/decoder pair, plus the
 * shared tokens.txt contents.
 */
export interface SherpaAsrModelFiles {
    readonly encoder?: ArrayBuffer | Uint8Array;
    readonly decoder?: ArrayBuffer | Uint8Array;
    readonly joiner?: ArrayBuffer | Uint8Array;
    readonly whisperEncoder?: ArrayBuffer | Uint8Array;
    readonly whisperDecoder?: ArrayBuffer | Uint8Array;
    readonly tokens: string;
}
export interface SherpaAsrRuntimeOptions {
    readonly files: SherpaAsrModelFiles;
    readonly numThreads?: number;
    readonly sampleRate?: number;
    readonly sherpaLoader?: SherpaOnnxLoader;
}
export interface ManagedSherpaAsrRuntime extends SherpaAsrRuntime {
    free(): Promise<void>;
}
/**
 * Builds a SherpaAsrRuntime backed by a real sherpa-onnx WASM
 * OfflineRecognizer. Throws when the optional `sherpa-onnx` dependency is
 * missing or the model files cannot be materialized.
 */
export declare function createSherpaAsrRuntime(options: SherpaAsrRuntimeOptions): Promise<ManagedSherpaAsrRuntime>;
/** Frame-level abstraction over sherpa-onnx VAD and fallback detectors. */
export interface StreamingVad {
    accept(samples: Float32Array): void;
    /** Returns a completed speech segment, if one is ready. */
    nextSegment(): Float32Array | undefined;
    /** Force-emits any buffered speech at end of input. */
    flushSegment(): Float32Array | undefined;
    free(): void;
}
interface EnergyVadOptions {
    readonly threshold: number;
    readonly minSpeechFrames: number;
    readonly maxSilenceFrames: number;
}
/** Energy-based VAD used when no silero model is available. */
export declare class EnergyVad implements StreamingVad {
    private readonly options;
    private buffered;
    private speechFrames;
    private silenceFrames;
    private inSpeech;
    constructor(options?: Partial<EnergyVadOptions>);
    accept(samples: Float32Array): void;
    nextSegment(): Float32Array | undefined;
    flushSegment(): Float32Array | undefined;
    free(): void;
    private drain;
    private reset;
}
export interface StreamingAsrOptions {
    readonly runtime?: SherpaAsrRuntime;
    readonly vad?: StreamingVad;
    /** Silero VAD ONNX bytes; staged and loaded through sherpa-onnx. */
    readonly vadModel?: ArrayBuffer | Uint8Array;
    readonly sampleRate?: number;
    readonly language?: string;
    readonly onSegment?: (text: string, samples: Float32Array) => void;
    readonly sherpaLoader?: SherpaOnnxLoader;
}
export interface StreamingAsrSession {
    readonly active: boolean;
    /** Feeds raw float PCM (at the session sample rate) into the VAD/ASR. */
    pushSamples(samples: Float32Array): Promise<void>;
    /** Captures microphone audio via getUserMedia (browser only). */
    start(): Promise<void>;
    /** Flushes buffered speech and releases mic/VAD resources. */
    stop(): Promise<void>;
}
/**
 * Creates a streaming ASR session: microphone frames (or manually pushed
 * samples) are segmented by a silero VAD when available, otherwise by an
 * energy-based fallback, and each segment is transcribed by the engine.
 */
export declare function createStreamingAsr(engine: AsrEngine, options?: StreamingAsrOptions): Promise<StreamingAsrSession>;
export declare class AsrEngine {
    private runtime?;
    private readonly mock;
    constructor(options?: AsrEngineOptions);
    load(runtime: SherpaAsrRuntime): void;
    /**
     * Loads offline recognizer model files and installs a real sherpa-onnx
     * runtime. Resolves to `false` when the optional dependency or a
     * filesystem is unavailable, keeping the mock/empty fallback.
     */
    loadFromFiles(files: SherpaAsrModelFiles, options?: {
        readonly numThreads?: number;
        readonly sampleRate?: number;
        readonly sherpaLoader?: SherpaOnnxLoader;
    }): Promise<boolean>;
    transcribe(audio: ArrayBuffer, options?: {
        readonly language?: string;
    }): Promise<string>;
}
export {};
//# sourceMappingURL=asr-engine.d.ts.map