---
name: local-voice-and-timing-orchestrator
description: Use when generating local cloned voice and word-level timestamps for short educational videos with XTTS v2, Piper, and WhisperX.
version: "1.0"
triggers:
  - "generate narration audio for a question bundle"
  - "produce voice.mp3 with word timestamps"
  - "run TTS locally with cloned voice"
  - "align subtitle timing with WhisperX"
  - "prepare audio assets for Remotion rendering"
example_usage: |
  ```
  Input: question_id, narration_script, voice_sample_refs[], locale=es-CO
  Output: voice.mp3, word_timestamps.json, tts_manifest.json
  Stack: XTTS-v2 (primary), Piper (fallback), WhisperX (alignment)
  Resource constraint: 8GB VRAM, serial inference
  ```
---

# Local Voice and Timing Orchestrator

**Skill:** `local_voice_and_timing_orchestrator`
**Version:** 1.0
**Pipeline role:** Produces narrated audio (`voice.mp3`) and word-level timing (`word_timestamps.json`) for the Remotion rendering pipeline
**Monorepo path:** `skills/local_voice_and_timing_orchestrator/`
**Primary TTS:** XTTS-v2 (local) | **Fallback:** Piper | **Alignment:** WhisperX

---

## Overview

This skill generates the spoken narration for a 15-second math explainer short. It runs entirely locally using XTTS-v2 for voice cloning and high-quality synthesis, falls back to Piper if XTTS is unavailable, and uses WhisperX to produce word-level timestamps that downstream `math_short_remotion_architect` consumes to synchronize equation steps with speech.

The output consists of three files:
- `voice.mp3` — the narrated audio
- `word_timestamps.json` — word-level timing for subtitle and visual sync
- `tts_manifest.json` — metadata about the TTS run (model, runtime, quality flags)

**Upstream:** This skill runs before `math_short_remotion_architect`.
**Downstream:** The `voice.mp3` and `word_timestamps.json` are the primary inputs for the Remotion render.

---

## Trigger Conditions

Invoke this skill when:

1. A question bundle has passed validation and is ready for audio production
2. The `narration_script` for the bundle is available
3. A `voice_sample_refs[]` array of one or more reference audio files exists for the target voice clone
4. The locale is `es-CO` (primary) or a supported locale variant
5. The pipeline is in "voice" or "full" mode

**Do NOT invoke this skill when:**
- The bundle has not passed validation (run validator first)
- `narration_script` is empty or exceeds the ~40-second limit for 15s video (scripts should be trimmed to fit within the 15s window)
- No voice sample is available for the requested clone profile (use the default voice until a sample is registered)
- The locale is not `es-CO` or a registered variant and no locale adaptation has been done
- A previous run produced a valid `tts_manifest.json` with `status: "success"` for the same `question_id` (skip — idempotent by `question_id`)

---

## Input Contract

```json
{
  "question_id": "CO-MAT-11-quadratic-eq-001",
  "narration_script": "Primero factorizamos el trinomio. Buscamos dos números que multiplicados den seis y sumados den menos cinco. Esos números son menos dos y menos tres. Entonces x menos dos por x menos tres es igual a cero. Por lo tanto x es igual a dos o x es igual a tres.",
  "voice_sample_refs": [
    "voices/colombia-female-teacher-ref-01.wav",
    "voices/colombia-female-teacher-ref-02.wav"
  ],
  "locale": "es-CO",
  "target_duration_seconds": 15,
  "branding": "worldexams"
}
```

### Field Definitions

| Field | Type | Required | Description |
|---|---|---|---|
| `question_id` | string | ✅ | Unique bundle identifier |
| `narration_script` | string | ✅ | Full Spanish narration text (es-CO, max ~40 words for 15s) |
| `voice_sample_refs[]` | string[] | ✅ | Paths to reference audio files for voice cloning |
| `locale` | string | ✅ | BCP-47 locale tag — currently only `es-CO` is fully supported |
| `target_duration_seconds` | number | ✅ | Must be `15` (matches video duration) |
| `branding` | string | ✅ | `worldexams` or `saberparatodos` |

---

## Output Contract

### `voice.mp3`
- Format: MP3, 22.05 kHz or 24 kHz (XTTS native)
- Duration: approximately `target_duration_seconds` (±0.5s tolerance)
- Quality: suitable for social media short (no audible artifacts at normal playback speed)

### `word_timestamps.json`
```json
{
  "question_id": "CO-MAT-11-quadratic-eq-001",
  "locale": "es-CO",
  "words": [
    { "word": "Primero", "start": 3.12, "end": 3.52 },
    { "word": "factorizamos", "start": 3.52, "end": 4.18 },
    { "word": "el", "start": 4.18, "end": 4.31 },
    { "word": "trinomio.", "start": 4.31, "end": 4.87 }
  ],
  "silence_ranges": [
    { "start": 0.0, "end": 3.0 },
    { "start": 12.5, "end": 15.0 }
  ],
  "total_duration_seconds": 15.0,
  "alignment_model": "whisperx"
}
```

### `tts_manifest.json`
```json
{
  "question_id": "CO-MAT-11-quadratic-eq-001",
  "status": "success",
  "tts_engine": "xtts-v2",
  "fallback_used": false,
  "voice_clone_profile": "colombia-female-teacher",
  "locale": "es-CO",
  "runtime": "local",
  "quality_flags": ["clone_match", "timing_aligned", "hd"],
  "alignment_model": "whisperx",
  "voice_asset": "voice.mp3",
  "timestamps_asset": "word_timestamps.json",
  "produced_at": "2026-04-26T17:40:00Z",
  "warnings": []
}
```

### Status Values in `tts_manifest.json`

| Status | Meaning |
|---|---|
| `success` | Full pipeline succeeded — all outputs valid |
| `fallback_used` | XTTS failed; Piper was used; quality may be lower |
| `pending_alignment` | TTS succeeded but WhisperX alignment failed or skipped |
| `failed` | TTS itself failed after fallback; needs manual review |

---

## Default Stack

### Primary TTS — XTTS-v2
- **Model:** `xttsv2` (Coqui) — run locally
- **Voice cloning:** requires 1+ reference audio files in `voice_sample_refs[]`
- **Locale support:** Spanish (es-CO) natively supported
- **Inference:** one job at a time (serial) to avoid VRAM exhaustion
- **Precision:** FP16 when VRAM allows, INT8 when constrained

### Fallback TTS — Piper
- **Model:** `piper-es-CO` voice model
- **Quality:** Lower than XTTS-v2 (not cloned, TTS only)
- **Invoked when:** XTTS-v2 fails (OOM, model not found, inference error)
- **Flag:** `fallback_used: true` in `tts_manifest.json`

### Alignment — WhisperX
- **Model:** `whisperx` with `word_timestamps=True`
- **Purpose:** Derive word-level timing from the generated `voice.mp3`
- **Batch size:** Reduce to 4 or 2 if OOM on 8GB VRAM systems
- **Precision path:** INT8 for alignment under memory pressure

---

## Resource Guidance (8GB VRAM)

When running on an 8GB VRAM system:

1. **Serial inference only.** Do not parallelize XTTS inference jobs. Run one job at a time.
2. **Monitor VRAM.** If OOM during XTTS inference, fall back to Piper immediately and log the event.
3. **Alignment batch size.** Default WhisperX batch size is 16. Reduce to 8, 4, or 2 if OOM during alignment.
4. **INT8 path.** Use `--compute_type int8` for WhisperX alignment when under memory pressure.
5. **XTTS precision.** Use FP16 by default; fall back to INT8 if stability issues arise.

---

## Failure Policy

| Failure mode | Action |
|---|---|
| XTTS fails (OOM, crash) | Fall back to Piper. Log `fallback_used: true`. Continue. |
| XTTS fails even after fallback attempt | Set `status: "failed"`. Do not produce partial outputs. Alert. |
| Alignment (WhisperX) fails | Set `status: "pending_alignment"`. Write `voice.mp3` and `tts_manifest.json`, but do NOT write `word_timestamps.json`. Do not publish. |
| Voice sample not found | Use default un-cloned voice. Log warning. Set `quality_flags` to exclude `clone_match`. |
| Script too long (>40 words) | Warn. Still attempt synthesis; if result exceeds 15s by >2s, set `status: "pending_trim"` and flag for script shortening. |

---

## Memory Synchronization

After each run:

1. Write `tts_manifest.json`, `voice.mp3`, and `word_timestamps.json` to the bundle directory
2. Update Cortex at `path: bundles/voice/{question_id}`:
   - content: summary (engine, fallback_used, status, produced_at)
3. If `status: "failed"`: write to `errors/voice/{question_id}` in Cortex with full error (masked if sensitive)

---

## Dependencies

- **Upstream:** Question validator must have passed
- **Upstream:** `narration_script` must be generated (typically by LLM from question generation)
- **Model files:** XTTS-v2 model files, Piper es-CO voice model, WhisperX model — all must be present locally
- **Voice samples:** Reference audio files registered under `voice_sample_refs[]`
- **Downstream:** `math_short_remotion_architect` consumes `voice.mp3` and `word_timestamps.json`

---

## Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-04-26 | Initial version — XTTS-v2 primary, Piper fallback, WhisperX alignment; 8GB VRAM serial guidance; failure policy with pending_alignment; idempotent by question_id |
