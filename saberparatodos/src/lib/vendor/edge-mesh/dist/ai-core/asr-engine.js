import { decodeWavToFloat32, encodeWav, loadSherpaOnnx, resampleLinear, writeModelFiles, } from "./sherpa-support.js";
const DEFAULT_ASR_SAMPLE_RATE = 16_000;
/**
 * Builds a SherpaAsrRuntime backed by a real sherpa-onnx WASM
 * OfflineRecognizer. Throws when the optional `sherpa-onnx` dependency is
 * missing or the model files cannot be materialized.
 */
export async function createSherpaAsrRuntime(options) {
    const sherpa = await loadSherpaOnnx(options.sherpaLoader);
    if (sherpa === undefined) {
        throw new Error("The optional sherpa-onnx dependency is not installed; " +
            "ASR falls back to mock/empty transcriptions.");
    }
    const sampleRate = options.sampleRate ?? DEFAULT_ASR_SAMPLE_RATE;
    const files = options.files;
    const staged = {
        "tokens.txt": files.tokens,
    };
    const transducer = files.encoder !== undefined &&
        files.decoder !== undefined &&
        files.joiner !== undefined;
    const whisper = files.whisperEncoder !== undefined && files.whisperDecoder !== undefined;
    if (!transducer && !whisper) {
        throw new Error("ASR requires either transducer (encoder/decoder/joiner) or " +
            "whisper (whisperEncoder/whisperDecoder) model files");
    }
    if (transducer) {
        staged["encoder.onnx"] = files.encoder;
        staged["decoder.onnx"] = files.decoder;
        staged["joiner.onnx"] = files.joiner;
    }
    else {
        staged["whisper-encoder.onnx"] = files.whisperEncoder;
        staged["whisper-decoder.onnx"] = files.whisperDecoder;
    }
    const dir = await writeModelFiles(staged);
    let recognizer;
    try {
        recognizer = sherpa.createOfflineRecognizer({
            featConfig: { sampleRate, featureDim: 80 },
            modelConfig: {
                ...(transducer
                    ? {
                        transducer: {
                            encoder: `${dir.dir}/encoder.onnx`,
                            decoder: `${dir.dir}/decoder.onnx`,
                            joiner: `${dir.dir}/joiner.onnx`,
                        },
                    }
                    : {
                        whisper: {
                            encoder: `${dir.dir}/whisper-encoder.onnx`,
                            decoder: `${dir.dir}/whisper-decoder.onnx`,
                        },
                    }),
                tokens: `${dir.dir}/tokens.txt`,
                numThreads: options.numThreads ?? 1,
                provider: "cpu",
                debug: 0,
            },
        });
    }
    catch (error) {
        await dir.cleanup();
        throw error;
    }
    return {
        async transcribe(audio) {
            if (recognizer === undefined) {
                throw new Error("ASR runtime has been freed");
            }
            const decoded = decodeWavToFloat32(audio);
            const samples = resampleLinear(decoded.samples, decoded.sampleRate, sampleRate);
            const stream = recognizer.createStream();
            try {
                stream.acceptWaveform(sampleRate, samples);
                recognizer.decode(stream);
                const result = recognizer.getResult(stream);
                return result.text?.trim() ?? "";
            }
            finally {
                stream.free();
            }
        },
        async free() {
            recognizer?.free();
            recognizer = undefined;
            await dir.cleanup();
        },
    };
}
class SherpaVadAdapter {
    vad;
    constructor(vad) {
        this.vad = vad;
    }
    accept(samples) {
        this.vad.acceptWaveform(samples);
    }
    nextSegment() {
        if (this.vad.isEmpty())
            return undefined;
        const segment = this.vad.front();
        this.vad.pop();
        return segment.samples;
    }
    flushSegment() {
        this.vad.flush();
        return this.nextSegment();
    }
    free() {
        this.vad.free();
    }
}
/** Energy-based VAD used when no silero model is available. */
export class EnergyVad {
    options;
    buffered = [];
    speechFrames = 0;
    silenceFrames = 0;
    inSpeech = false;
    constructor(options = {}) {
        this.options = {
            threshold: options.threshold ?? 0.02,
            minSpeechFrames: options.minSpeechFrames ?? 3,
            maxSilenceFrames: options.maxSilenceFrames ?? 10,
        };
    }
    accept(samples) {
        let energy = 0;
        for (let index = 0; index < samples.length; index += 1) {
            energy += (samples[index] ?? 0) ** 2;
        }
        const rms = Math.sqrt(energy / Math.max(1, samples.length));
        if (rms >= this.options.threshold) {
            this.inSpeech = true;
            this.speechFrames += 1;
            this.silenceFrames = 0;
            this.buffered.push(samples);
            return;
        }
        if (!this.inSpeech)
            return;
        this.silenceFrames += 1;
        this.buffered.push(samples);
    }
    nextSegment() {
        if (!this.inSpeech ||
            this.speechFrames < this.options.minSpeechFrames ||
            this.silenceFrames < this.options.maxSilenceFrames) {
            return undefined;
        }
        return this.drain();
    }
    flushSegment() {
        if (this.speechFrames < this.options.minSpeechFrames) {
            this.reset();
            return undefined;
        }
        return this.drain();
    }
    free() {
        this.reset();
    }
    drain() {
        const chunks = this.buffered;
        this.reset();
        if (chunks.length === 0)
            return undefined;
        const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
        const merged = new Float32Array(total);
        let offset = 0;
        for (const chunk of chunks) {
            merged.set(chunk, offset);
            offset += chunk.length;
        }
        return merged;
    }
    reset() {
        this.buffered = [];
        this.speechFrames = 0;
        this.silenceFrames = 0;
        this.inSpeech = false;
    }
}
class StreamingAsrSessionImpl {
    engine;
    vad;
    sampleRate;
    language;
    onSegment;
    mediaStream;
    audioContext;
    node;
    running = false;
    queue = Promise.resolve();
    constructor(engine, vad, options) {
        this.engine = engine;
        this.vad = vad;
        this.sampleRate = options.sampleRate ?? DEFAULT_ASR_SAMPLE_RATE;
        this.language = options.language;
        this.onSegment = options.onSegment;
    }
    get active() {
        return this.running;
    }
    pushSamples(samples) {
        const task = this.queue
            .catch(() => undefined)
            .then(() => this.process(samples));
        this.queue = task;
        return task;
    }
    async start() {
        if (this.running)
            return;
        const mediaDevices = typeof navigator !== "undefined" ? navigator.mediaDevices : undefined;
        if (mediaDevices?.getUserMedia === undefined) {
            throw new Error("getUserMedia is unavailable; feed audio with pushSamples() instead.");
        }
        if (typeof AudioContext === "undefined") {
            throw new Error("AudioContext is unavailable; feed audio with pushSamples() instead.");
        }
        this.mediaStream = await mediaDevices.getUserMedia({
            audio: { channelCount: 1 },
        });
        this.audioContext = new AudioContext({ sampleRate: this.sampleRate });
        const source = this.audioContext.createMediaStreamSource(this.mediaStream);
        // ScriptProcessorNode is deprecated but needs no external worklet file;
        // TODO(audio): migrate to AudioWorkletNode with a bundled worklet.
        const processor = this.audioContext.createScriptProcessor(4096, 1, 1);
        processor.onaudioprocess = (event) => {
            const input = event.inputBuffer.getChannelData(0);
            void this.pushSamples(new Float32Array(input));
        };
        source.connect(processor);
        processor.connect(this.audioContext.destination);
        this.node = processor;
        this.running = true;
    }
    async stop() {
        this.node?.disconnect();
        this.node = undefined;
        for (const track of this.mediaStream?.getTracks() ?? []) {
            track.stop();
        }
        this.mediaStream = undefined;
        if (this.audioContext !== undefined) {
            await this.audioContext.close().catch(() => undefined);
            this.audioContext = undefined;
        }
        this.running = false;
        await this.queue.catch(() => undefined);
        const flushed = this.vad.flushSegment();
        if (flushed !== undefined)
            await this.emit(flushed);
        this.vad.free();
    }
    async process(samples) {
        this.vad.accept(samples);
        let segment = this.vad.nextSegment();
        while (segment !== undefined) {
            await this.emit(segment);
            segment = this.vad.nextSegment();
        }
    }
    async emit(samples) {
        const text = await this.engine.transcribe(encodeWav(samples, this.sampleRate), this.language === undefined ? undefined : { language: this.language });
        if (text.length > 0)
            this.onSegment?.(text, samples);
    }
}
/**
 * Creates a streaming ASR session: microphone frames (or manually pushed
 * samples) are segmented by a silero VAD when available, otherwise by an
 * energy-based fallback, and each segment is transcribed by the engine.
 */
export async function createStreamingAsr(engine, options = {}) {
    let vad = options.vad;
    if (vad === undefined && options.vadModel !== undefined) {
        const sherpa = await loadSherpaOnnx(options.sherpaLoader);
        if (sherpa !== undefined) {
            const staged = await writeModelFiles({
                "silero-vad.onnx": options.vadModel,
            });
            const sampleRate = options.sampleRate ?? DEFAULT_ASR_SAMPLE_RATE;
            const sherpaVad = sherpa.createVad({
                sileroVad: {
                    model: `${staged.dir}/silero-vad.onnx`,
                    threshold: 0.5,
                    minSpeechDuration: 0.25,
                    minSilenceDuration: 0.5,
                    windowSize: 512,
                },
                sampleRate,
                numThreads: 1,
                provider: "cpu",
                debug: 0,
            });
            const adapter = new SherpaVadAdapter(sherpaVad);
            const innerFree = adapter.free.bind(adapter);
            adapter.free = () => {
                innerFree();
                void staged.cleanup();
            };
            vad = adapter;
        }
        // Without sherpa-onnx or a writable FS we degrade to the energy VAD.
    }
    vad ??= new EnergyVad();
    return new StreamingAsrSessionImpl(engine, vad, options);
}
export class AsrEngine {
    runtime;
    mock;
    constructor(options = {}) {
        this.runtime = options.runtime;
        this.mock = options.mock ?? false;
    }
    load(runtime) {
        this.runtime = runtime;
    }
    /**
     * Loads offline recognizer model files and installs a real sherpa-onnx
     * runtime. Resolves to `false` when the optional dependency or a
     * filesystem is unavailable, keeping the mock/empty fallback.
     */
    async loadFromFiles(files, options = {}) {
        try {
            this.runtime = await createSherpaAsrRuntime({ files, ...options });
            return true;
        }
        catch {
            return false;
        }
    }
    async transcribe(audio, options) {
        if (this.runtime !== undefined) {
            try {
                return await this.runtime.transcribe(audio, {
                    language: options?.language ?? "es",
                });
            }
            catch {
                // Keep command flows usable when WASM initialization fails.
            }
        }
        return this.mock ? "comando de prueba" : "";
    }
}
//# sourceMappingURL=asr-engine.js.map