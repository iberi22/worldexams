---
name: math-short-remotion-architect
description: Use when building 15s vertical Remotion math explainer videos with fixed intro/outro timing and subtitle-ready alignment.
---

# Math Short Remotion Architect

Use this skill when the task is:
- Building visual templates for math explanations.
- Rendering vertical short videos for question explanations.
- Applying retention editing structure (visual variety, continuity, audio sync, music cues).

## Input contract

JSON payload with:
- `question_id`
- `statement`
- `explanation`
- `narration_script`
- `word_timestamps[]`
- `format` (`1080x1920`, `15s`)
- `branding` (`worldexams`, `saberparatodos`)

## Output contract

- `video_vertical.mp4`
- `captions.srt`
- `render_manifest.json`

## Hard rules

- Always vertical (`1080x1920`).
- Total duration always `15s`.
- Intro and outro fixed at `3s` each.
- Preserve legibility for equations and step labels.
- No API secrets in source files.

## Timeline template

- `0.00-3.00`: Intro brand animation.
- `3.00-12.00`: Equation/problem resolution in short steps.
- `12.00-15.00`: Outro + CTA.
