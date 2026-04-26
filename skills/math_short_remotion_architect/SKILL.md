---
name: math-short-remotion-architect
description: Use when building 15s vertical Remotion math explainer videos with fixed intro/outro timing and subtitle-ready alignment.
version: "1.0"
triggers:
  - "render a math explainer short video"
  - "build Remotion template for math"
  - "create 15s vertical video for question"
  - "generate math video with subtitles"
  - "produce Remotion video from question bundle"
example_usage: |
  ```
  Input: question_id, statement, explanation, narration_script,
         word_timestamps[], format=1080x1920, branding=worldexams
  Output: video_vertical.mp4, captions.srt, render_manifest.json
  ```
---

# Math Short Remotion Architect

**Skill:** `math_short_remotion_architect`  
**Version:** 1.0  
**Pipeline role:** Renders the visual + caption layer for math explainer shorts  
**Monorepo path:** `skills/math_short_remotion_architect/`

---

## Overview

This skill governs how 15-second vertical Remotion videos are built for math question explanations. It is invoked after `local_voice_and_timing_orchestrator` has produced the `voice.mp3` and `word_timestamps.json`. The architect uses those timing data to drive the visual sequence so that equation steps and narration stay synchronized.

The output is a render-ready Remotion project (or direct `ffmpeg`-based render) that produces:
- `video_vertical.mp4` — 1080×1920, 15 seconds
- `captions.srt` — subtitle file with word-level timing
- `render_manifest.json` — metadata about the render (model, timing source, brand)

---

## Trigger Conditions

Invoke this skill when any of the following is true:

1. A question bundle has passed validation and needs a video rendered
2. A `voice.mp3` + `word_timestamps.json` pair is available and `tts_manifest.json` is present
3. A request comes in to re-render an existing question's video (e.g., caption fix or branding update)
4. The pipeline is in "render" mode and the upstream `local_voice_and_timing_orchestrator` has completed successfully

**Do NOT invoke this skill when:**
- The question bundle is not yet validated (use the validator first)
- `word_timestamps.json` is absent or marked `pending_alignment` in `tts_manifest.json`
- The format requested is not `1080x1920` or duration is not `15s` (file a task to extend the skill)
- The branding is not `worldexams` or `saberparatodos` (other brands need separate template registration)

---

## Input Contract

The skill expects a JSON payload (typically passed via environment variables or a manifest file):

```json
{
  "question_id": "CO-MAT-11-quadratic-eq-001",
  "statement": "Resuelve: x² - 5x + 6 = 0",
  "explanation": "Factorizamos: (x-2)(x-3)=0 → x=2 o x=3",
  "narration_script": "Primero factorizamos el trinomio. Buscamos dos números que multiplicados den seis y sumados den menos cinco. Esos números son menos dos y menos tres. Entonces x menos dos por x menos tres es igual a cero. Por lo tanto x es igual a dos o x es igual a tres.",
  "word_timestamps": [
    { "word": "Primero", "start": 0.0, "end": 0.4 },
    { "word": "factorizamos", "start": 0.4, "end": 1.1 },
    ...
  ],
  "format": "1080x1920",
  "duration": "15s",
  "branding": "worldexams"
}
```

### Field Definitions

| Field | Type | Required | Description |
|---|---|---|---|
| `question_id` | string | ✅ | Unique bundle identifier (country-grade-topic-subtopic-nnn) |
| `statement` | string | ✅ | LaTeX-ready math statement to display |
| `explanation` | string | ✅ | Step-by-step explanation text |
| `narration_script` | string | ✅ | Full TTS narration script (es-CO locale) |
| `word_timestamps[]` | array | ✅ | Word-level timing from WhisperX alignment |
| `format` | string | ✅ | Must be `1080x1920` |
| `duration` | string | ✅ | Must be `15s` |
| `branding` | string | ✅ | `worldexams` or `saberparatodos` |

---

## Output Contract

The skill produces three files written to the question's output directory:

### `video_vertical.mp4`
- Resolution: 1080×1920 (vertical)
- Codec: H.264 (libx264) or H.265 where supported
- Duration: exactly 15 seconds
- Frame rate: 30 fps
- Bitrate: appropriate for mobile/social (target ≤ 8 Mbps)

### `captions.srt`
```
1
00:00:03,120 --> 00:00:03,680
Primero

2
00:00:03,680 --> 00:00:04,200
factorizamos
...
```
- Subtitle window follows the intro (first 3 seconds are brand animation, no captions)
- Captions active from t=3.0s to t=12.0s

### `render_manifest.json`
```json
{
  "question_id": "CO-MAT-11-quadratic-eq-001",
  "rendered_at": "2026-04-26T17:45:00Z",
  "format": "1080x1920",
  "duration_seconds": 15,
  "intro_duration": 3.0,
  "outro_duration": 3.0,
  "body_duration": 9.0,
  "branding": "worldexams",
  "timing_source": "word_timestamps.json",
  "voice_asset": "voice.mp3",
  "caption_file": "captions.srt",
  "video_file": "video_vertical.mp4",
  "renderer": "remotion-or-ffmpeg",
  "quality_flags": ["hd", "subtitle_ready"]
}
```

---

## Hard Rules

These rules must never be violated:

1. **Always vertical — 1080×1920.** Horizontal is not supported for shorts.
2. **Total duration always 15 seconds.** The timeline template is non-negotiable.
3. **Intro and outro fixed at 3 seconds each.** Body section is exactly 9 seconds.
4. **Preserve legibility.** Equations and step labels must be readable on a 6-inch phone screen at arm's length.
5. **No API secrets in source files.** Render configs must use environment-variable substitution, never hardcode tokens.
6. **Idempotent renders.** Re-running the same `question_id` with identical inputs must produce bit-identical output.

---

## Timeline Template

The 15-second video is divided into three fixed segments:

### Segment 1 — Intro (0.00–3.00s)
- Brand animation: logo + tagline reveal
- No narration (music overlay only, if configured)
- No captions
- Visual style: consistent with brand guidelines for the given `branding` value

### Segment 2 — Body (3.00–12.00s)
- Equation/problem resolution in short visual steps
- Each step appears in sync with the corresponding word/phrase in `word_timestamps[]`
- Step labels (`Paso 1`, `Paso 2`, etc.) fade in/out with each step
- Mathematical notation rendered via KaTeX or MathJax
- **Captions active** during this segment (derived from `captions.srt`)
- Audio: `voice.mp3` plays throughout (preceded by the voice from `local_voice_and_timing_orchestrator`)

### Segment 3 — Outro + CTA (12.00–15.00s)
- Brand logo repeat (smaller, bottom-right)
- CTA text: "Practica en worldexams.com" (or equivalent for `saberparatodos` branding)
- Social share buttons graphic (optional, A/B tested)
- No captions
- No narration (music fade-out)

---

## Rendering Options

### Option A — Remotion (recommended for complex animations)
```
remotion@latest
  ├── packages/fonts/
  ├── packages/katex/
  └── src/Root.tsx  ← driven by timeline template above
```

### Option B — ffmpeg-only (lightweight, no animation)
For cases where Remotion is unavailable or GPU is constrained:
```bash
ffmpeg -loop 1 -i slide_{n}.png -i voice.mp3 \
  -filter_complex "[0:v]scale=1080:1920,fps=30" \
  -t 15 -c:v libx264 -pix_fmt yuv420p video_vertical.mp4
```
- Each slide_{n}.png is a pre-generated step image
- Timing derived from `word_timestamps.json`
- Fallback to this mode is recorded in `render_manifest.json` as `renderer: "ffmpeg"`

---

## Memory Synchronization

After a successful render:
1. Write `render_manifest.json` to the bundle output directory
2. Update the question status in Cortex: `POST http://localhost:8003/memory/add`
   - path: `bundles/renders/{question_id}`
   - content: summary of render (success/fail, timing source, duration)
3. If render failed: write error to `render_manifest.json` with `status: "failed"` and log to Cortex at `errors/render/{question_id}`

---

## Failure Handling

| Failure mode | Action |
|---|---|
| Missing `word_timestamps.json` | Do not render. Set `render_manifest.json` status to `blocked_missing_timestamps`. Alert upstream orchestrator. |
| Invalid format/duration | Abort. Write error. Do not produce a partial video. |
| Rendering crashes (OOM) | Retry once with lower quality preset. If still fails, set `status: "failed"` and mark for manual review. |
| Brand not recognized | Abort. File a task to add brand template before proceeding. |

---

## Dependencies

- **Upstream:** `local_voice_and_timing_orchestrator` must have completed successfully
- **Downstream:** `social_distribution_manager` consumes `video_vertical.mp4` and `captions.srt`
- **Brand assets:** logo, CTA template, color palette for the given `branding` value must be registered

---

## Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-04-26 | Initial version — 15s vertical Remotion template, fixed intro/outro, word-timestamp sync, SRT caption generation |
