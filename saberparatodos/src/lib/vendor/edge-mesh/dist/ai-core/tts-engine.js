import { encodeWav, loadSherpaOnnx, writeModelFiles, } from "./sherpa-support.js";
function fallbackTone(durationMs = 180) {
    const sampleRate = 16_000;
    const samples = new Float32Array(Math.max(1, Math.round((sampleRate * durationMs) / 1_000)));
    for (let index = 0; index < samples.length; index += 1) {
        samples[index] = Math.sin((2 * Math.PI * 220 * index) / sampleRate) * 0.03;
    }
    return encodeWav(samples, sampleRate);
}
async function browserSpeech(text) {
    if (typeof globalThis.speechSynthesis === "undefined" ||
        typeof globalThis.SpeechSynthesisUtterance === "undefined") {
        return null;
    }
    return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "es-ES";
        utterance.onend = () => resolve(fallbackTone(20));
        utterance.onerror = () => resolve(fallbackTone());
        globalThis.speechSynthesis.speak(utterance);
    });
}
/**
 * Builds a SherpaTtsRuntime backed by a real sherpa-onnx WASM OfflineTts
 * instance. Throws when the optional `sherpa-onnx` dependency is missing or
 * the model files cannot be materialized (see writeModelFiles).
 */
export async function createSherpaTtsRuntime(options) {
    const sherpa = await loadSherpaOnnx(options.sherpaLoader);
    if (sherpa === undefined) {
        throw new Error("The optional sherpa-onnx dependency is not installed; " +
            "TTS falls back to browser speech or a deterministic tone.");
    }
    const staged = await writeModelFiles({
        "model.onnx": options.files.model,
        "tokens.txt": options.files.tokens,
        ...(options.files.lexicon !== undefined
            ? { "lexicon.txt": options.files.lexicon }
            : {}),
    });
    let tts;
    try {
        tts = sherpa.createOfflineTts({
            model: {
                vits: {
                    model: `${staged.dir}/model.onnx`,
                    lexicon: options.files.lexicon !== undefined
                        ? `${staged.dir}/lexicon.txt`
                        : "",
                    tokens: `${staged.dir}/tokens.txt`,
                    dataDir: options.files.dataDir ?? "",
                },
                numThreads: options.numThreads ?? 1,
                debug: 0,
                provider: "cpu",
            },
        });
    }
    catch (error) {
        await staged.cleanup();
        throw error;
    }
    return {
        async synthesize(text, synthOptions) {
            if (tts === undefined)
                throw new Error("TTS runtime has been freed");
            const generated = tts.generate({
                text,
                sid: synthOptions?.speakerId ?? 0,
                speed: synthOptions?.speed ?? 1.0,
            });
            return { samples: generated.samples, sampleRate: generated.sampleRate };
        },
        async free() {
            tts?.free();
            tts = undefined;
            await staged.cleanup();
        },
    };
}
const BZIP2_MAGIC = [0x42, 0x5a, 0x68]; // "BZh"
const GZIP_MAGIC = [0x1f, 0x8b];
function hasMagic(bytes, magic) {
    return magic.every((byte, index) => bytes[index] === byte);
}
export class TtsEngine {
    runtime;
    speakerId;
    speed;
    queue = Promise.resolve();
    constructor(options = {}) {
        this.runtime = options.runtime;
        this.speakerId = options.speakerId;
        this.speed = options.speed;
    }
    load(runtime) {
        this.runtime = runtime;
    }
    /**
     * Loads a VITS model from in-memory files and installs a real sherpa-onnx
     * runtime. Resolves to `false` (keeping the fallback chain) when the
     * optional dependency or a filesystem is unavailable.
     */
    async loadFromFiles(files, options = {}) {
        try {
            this.runtime = await createSherpaTtsRuntime({ files, ...options });
            return true;
        }
        catch {
            return false;
        }
    }
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
    async loadFromModelManager(manager, modelId, options = {}) {
        const bytes = await manager.readBytes(modelId);
        if (bytes === undefined)
            return false;
        if (hasMagic(bytes, BZIP2_MAGIC) || hasMagic(bytes, GZIP_MAGIC)) {
            // Archive payloads need extraction first; see TODO above.
            return false;
        }
        if (options.tokens === undefined) {
            // A bare .onnx payload is not enough: VITS also needs tokens.txt.
            return false;
        }
        return this.loadFromFiles({
            model: bytes,
            tokens: options.tokens,
            ...(options.dataDir !== undefined ? { dataDir: options.dataDir } : {}),
        }, { sherpaLoader: options.sherpaLoader });
    }
    speak(text) {
        const task = this.queue
            .catch(() => undefined)
            .then(() => this.synthesize(text));
        this.queue = task.then(() => undefined, () => undefined);
        return task;
    }
    async synthesize(text) {
        if (this.runtime !== undefined) {
            try {
                const result = await this.runtime.synthesize(text, {
                    speakerId: this.speakerId,
                    speed: this.speed,
                });
                if (result instanceof ArrayBuffer)
                    return result;
                return encodeWav(result.samples, result.sampleRate);
            }
            catch {
                // Fall through to a platform voice or deterministic WAV.
            }
        }
        const spoken = await browserSpeech(text);
        return spoken ?? fallbackTone();
    }
}
//# sourceMappingURL=tts-engine.js.map