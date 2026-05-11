# Math Video Explanations: Architecture & MVP

This document defines the canonical architecture for the step-by-step math video explanation feature in SaberParaTodos.

## 1. UX Entry Points

Videos are integrated into the **Results View** (`ResultsView.svelte`) after a user completes an exam.

- **Visibility:** Only shown for countries with the `mathVideos` feature flag enabled in `config/countries.config.ts`.
- **Integration:** For each question in the result list:
    - If a video is **available** (exists in manifest and has a URL), a YouTube embed is displayed under an "Explicación paso a paso" header.
    - If a video is **pending** (status in manifest), a pulse animation informs the user that the video is being generated.
    - If no video is found, no video section is displayed.
- **Mobile First:** The player uses an aspect-ratio of 16:9 for compatibility, although the content is generated in 9:16 vertical format (optimized for YouTube Shorts/TikTok).

## 2. Content / Data Model

The video generation relies on a structured **Job Payload** (JSON) which now includes:

- `question_id`: Canonical ID of the question.
- `content.statement`: The original question text.
- `content.explanation`: The pedagogical explanation from the bundle.
- `content.steps`: An array of 3 steps (MVP) containing:
    - `label`: e.g., "Paso 1: Datos"
    - `math`: (Optional) LaTeX or math string for the visual overlay.
    - `explanation`: Short text for the narrator/overlay.

## 3. Generation Pipeline

The pipeline is primarily local-first for quality control:

1. **Queue Generation:** `npm run video:queue:v41` scans markdown bundles and identifies questions without published videos.
2. **Job Emission:** Individual JSON jobs are created in `video-pipeline/jobs/` or within `.md.assets/jobs/` folders.
3. **Execution:** `npm run video:jobs:run` processes jobs using:
    - **TTS:** XTTS v2 (Local) for natural Spanish (es-CO) voices.
    - **Alignment:** WhisperX to generate precise word-level timings.
    - **Render:** Remotion (`vertical-math-template.tsx`) to compose the final MP4.
4. **Manifesting:** `video-manifest-v41.json` is updated with the status and final URLs.

## 4. Storage Strategy

- **Source Code:** Remotion templates and scripts live in `saberparatodos/video-pipeline/`.
- **Artifacts:** Videos are uploaded to **YouTube** (as Shorts) to leverage global CDN and player features without incurring bandwidth costs.
- **Metadata:** Canonical URLs and status are stored in `src/content/video/video-manifest-v41.json`.

## 5. Rollout Strategy

- **Phase 1 (Private Prelaunch):** Feature flag `mathVideos: true` enabled only for Colombia. Manifest contains only select Grade 11 Math questions.
- **Phase 2:** Automated generation for all Grade 11 Math bundles.
- **Phase 3:** Public rollout and expansion to other subjects/countries.
