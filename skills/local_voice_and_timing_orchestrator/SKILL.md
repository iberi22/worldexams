---
name: local-voice-and-timing-orchestrator
description: Use when generating local cloned voice and word-level timestamps for short educational videos with XTTS v2, Piper, and WhisperX.
---

# Local Voice and Timing Orchestrator

Use this skill when the task is:
- Producing narration locally with cloned voice.
- Generating subtitles with word-level timing.
- Preparing audio assets for Remotion.

## Input contract

- `question_id`
- `narration_script`
- `voice_sample_refs[]`
- `locale` (`es-CO`)

## Output contract

- `voice.mp3`
- `word_timestamps.json`
- `tts_manifest.json` (model, runtime, fallback, quality flags)

## Default stack

- Primary TTS: `xtts-v2` local.
- Fallback TTS: `piper`.
- Alignment: `whisperx`.

## Resource guidance (8GB VRAM)

- Keep inference serial (one job at a time).
- Reduce alignment batch size if needed.
- Use lower precision/int8 path for alignment under memory pressure.

## Failure policy

- If XTTS fails: fallback to Piper and continue.
- If alignment fails: mark job `pending_alignment` and do not publish.
