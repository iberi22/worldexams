/**
 * Shared helpers for the optional `sherpa-onnx` WASM runtime.
 *
 * The npm package ships the Node.js WASM build (Emscripten, synchronous
 * initialization). In browsers the k2-fsa project distributes the WASM
 * assets (`sherpa-onnx-wasm-main.js` / `.wasm` / `.data`) separately, so
 * browser deployments must provide their own loader until the assets are
 * bundled here.
 */
export interface SherpaOnnxGeneratedAudio {
    readonly samples: Float32Array;
    readonly sampleRate: number;
}
export interface SherpaOnnxOfflineTts {
    readonly sampleRate: number;
    readonly numSpeakers: number;
    generate(config: {
        readonly text: string;
        readonly sid?: number;
        readonly speed?: number;
    }): SherpaOnnxGeneratedAudio;
    free(): void;
}
export interface SherpaOnnxOfflineStream {
    acceptWaveform(sampleRate: number, samples: Float32Array): void;
    free(): void;
}
export interface SherpaOnnxRecognitionResult {
    readonly text?: string;
}
export interface SherpaOnnxOfflineRecognizer {
    createStream(): SherpaOnnxOfflineStream;
    decode(stream: SherpaOnnxOfflineStream): void;
    getResult(stream: SherpaOnnxOfflineStream): SherpaOnnxRecognitionResult;
    free(): void;
}
export interface SherpaOnnxSpeechSegment {
    readonly samples: Float32Array;
    readonly start: number;
}
export interface SherpaOnnxVad {
    acceptWaveform(samples: Float32Array): void;
    isEmpty(): boolean;
    isDetected(): boolean;
    front(): SherpaOnnxSpeechSegment;
    pop(): void;
    clear(): void;
    flush(): void;
    free(): void;
}
/** Minimal structural view of the `sherpa-onnx` npm package entry point. */
export interface SherpaOnnxModule {
    createOfflineTts(config: unknown): SherpaOnnxOfflineTts;
    createOfflineRecognizer(config: unknown): SherpaOnnxOfflineRecognizer;
    createVad(config: unknown): SherpaOnnxVad;
    readonly version?: string;
}
export type SherpaOnnxLoader = () => Promise<SherpaOnnxModule>;
/**
 * Loads `sherpa-onnx` via dynamic import. Resolves to `undefined` when the
 * optional dependency is not installed instead of throwing.
 */
export declare function loadSherpaOnnx(loader?: SherpaOnnxLoader): Promise<SherpaOnnxModule | undefined>;
export interface TempModelDir {
    readonly dir: string;
    cleanup(): Promise<void>;
}
/**
 * Writes named binary/text model files into a fresh temporary directory and
 * returns its absolute path. Only available where `node:fs` exists (the
 * sherpa-onnx npm WASM build reads model files from the real filesystem).
 */
export declare function writeModelFiles(files: Readonly<Record<string, ArrayBuffer | Uint8Array | string>>): Promise<TempModelDir>;
/** Encodes mono float PCM into a 16-bit RIFF/WAVE buffer. */
export declare function encodeWav(samples: Float32Array, sampleRate: number): ArrayBuffer;
export interface DecodedWav {
    readonly samples: Float32Array;
    readonly sampleRate: number;
}
/** Decodes a RIFF/WAVE buffer (16-bit PCM or 32-bit float) to mono float PCM. */
export declare function decodeWavToFloat32(audio: ArrayBuffer): DecodedWav;
/** Naive linear resampler; sufficient for VAD/ASR preview-quality audio. */
export declare function resampleLinear(samples: Float32Array, fromRate: number, toRate: number): Float32Array;
//# sourceMappingURL=sherpa-support.d.ts.map