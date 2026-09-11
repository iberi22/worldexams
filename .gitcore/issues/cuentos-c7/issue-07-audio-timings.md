# [Ola C7.07] feat-cuentos-c7: player AudioCuento con timings + fallback Web Speech

> Ola C7 redesign part B — Audio + timings. Merge order: AFTER C7.05, parallel with 06-08 (2-4/4) | Risk: MEDIUM | Effort: Large 5-6h
> Disjoint island: `saberparatodos/src/components/cuentos/lector/AudioCuento.svelte` (+ test, NEW) + `saberparatodos/scripts/generate-cuento-packs.js` (timings field only) + e2e spec. MP3s are NOT guaranteed present — the player MUST work fully with Web Speech fallback and pick up MP3s when they appear.

---

## 1. Current State (MEDIBLE)

- Narration today = `saberparatodos/src/components/cuentos/lector/read-aloud.ts` (Web Speech API, Spanish voice pick, word-boundary karaoke callback, graceful fallback) driven by `CuentoReader.svelte`. Free, zero deps, BR-03-clean.
- Pre-generated MP3s live in `saberparatodos/public/audio/cuentos/<slug>/p<N>.mp3` (edge-tts, `es-MX-DaliaNeural`, see `saberparatodos/scripts/gen-cuentos-audio.py`) — but ONLY 2 of 10 cuentos have audio on disk: `ls saberparatodos/public/audio/cuentos/` shows `bruno-zorro-paciencia tana-tucan-comparte`. The other 8 do NOT.
- Packs (`saberparatodos/public/v1/cuentos/*.json`, via `generate-cuento-packs.js`) carry NO timing data: `node -e "...'timings' in page..."` == false for every page.
- Parity target (`docs/CUENTOS/REDISENO_STORYCOMET.md` §1 item 5, §2 C7.07): narration MP3 per page + PRECOMPUTED per-word `timings` in the pack driving the highlight (no live sync), with Web Speech fallback. Scene SFX is an explicitly documented phase-2 gap — NOT this issue.

## 2. Desired State (DELTA — timings in packs + dual-mode player)

1. **Pack `timings` field** (`generate-cuento-packs.js` only, additive): every page object gains `timings: number[]` = per-word START offsets in seconds, estimated as: total page duration × per-word char-weight share. Total duration = real MP3 duration when `public/audio/cuentos/<slug>/p<N>.mp3` exists (probe via `ffprobe` if available, else parse MP3 header duration with zero new deps — document whichever method in the PR; pure estimate fallback allowed), else estimate `words × 0.45s` (child listening rate matching the `-5%` edge-tts rate). Words align 1:1 with the page's rendered words; `timings.length === words.length` enforced by the generator (pad/trim deterministically, never crash).
2. **NEW `AudioCuento.svelte`** in `saberparatodos/src/components/cuentos/lector/`: per-page narration player with play/pause, replay, rate (0.8-1.0 default 0.9), and karaoke highlight driven by pack `timings` when audio plays. Mode resolution at runtime, per page: MP3 file present → `<audio>` + timings highlight; absent → `read-aloud.ts` Web Speech ES path with boundary highlight (reuse, do not reimplement TTS). Switching must be seamless: same buttons, same highlight slot, neutral-Spanish status copy ("Narrando…", "Toca para escuchar").
3. **ACs pass WITH and WITHOUT mp3 files present** (explicit matrix, §6): full suite green on a checkout WITH the 2 existing audio dirs AND on a checkout with `public/audio/cuentos/` temporarily moved aside (fallback path 100%).
4. **Constraints:** free only (Web Speech + local MP3s, no cloud TTS keys in client); BR-03/BR-07 (no telemetry on play events — progress store only, as C2.05 does); reduced-motion respected for the highlight (instant word swap, no smooth-scroll-chasing when reduce is set); Svelte 5 runes; unlisted routes unchanged.

## 3. Web Research Required (4-6 queries, MANDATORY before writing)

1. search: "HTMLAudioElement word highlighting precomputed timings karaoke web"
2. search: "speechSynthesis boundary event word highlighting frontend"
3. search: "estimate mp3 duration nodejs no dependencies header parse"
4. search: "Svelte 5 audio player component two sources fallback pattern"
5. search: "es-MX child narration rate words per minute TTS estimate"

## 4. Agent Session Prompt

"Before writing, please: 1. Read `docs/CUENTOS/REDISENO_STORYCOMET.md` FULL (§1 item 5, §2 C7.07 — timings PRECOMPUTADOS, SFX is phase-2 gap) + `docs/CUENTOS/WAVE_PLAN.md` (hard constraints) + `saberparatodos/scripts/gen-cuentos-audio.py` (voice/rate/output layout). 2. Read `saberparatodos/src/components/cuentos/lector/read-aloud.ts` COMPLETO (reuse its voice pick + boundary callback — do NOT fork TTS logic) + `CuentoReader.svelte` (player integration point) + `saberparatodos/scripts/generate-cuento-packs.js` COMPLETO. 3. Run `ls saberparatodos/public/audio/cuentos/*/ | head` to see which MP3s actually exist. 4. Implement timings + AudioCuento + tests. 5. Run the §11 matrix WITH and WITHOUT mp3s before opening the PR."

## 5. Existing Code Patterns (MUST follow)

- `lector/read-aloud.ts` → `SpeakOptions` (`lang`, `rate`, `onBoundary`, `onEnd`, `onError`) + `ReadAloudFallbackInfo`. AudioCuento calls this module for fallback; no inline `speechSynthesis` calls outside it.
- `lector/CuentoReader.svelte` → pagination/autoplay/speed state; AudioCuento receives `page` + `timings` as props and emits `onEnd` so autoplay keeps working.
- `scripts/generate-cuento-packs.js` → CLI + page splitter shared with C7.05; timings computed in the same pass (needs C7.05's v2 fields merged — rebase first).
- `scripts/gen-cuentos-audio.py` → file layout `public/audio/cuentos/<slug>/p<N>.mp3`, voice `es-MX-DaliaNeural`, rate `-5%`. Player resolves URLs against exactly this layout.
- `lib/cuentos/progreso.ts` (C2.05) → the ONLY allowed persistence (local-first, no identity). Play events go nowhere else.

## 6. Acceptance Criteria (VERIFICABLES POR COMANDO)

WITH mp3s present (default checkout — Tana + Bruno have audio):
- [ ] `node saberparatodos/scripts/generate-cuento-packs.js --all` exits 0 AND `node -e "const fs=require('fs');for(const s of ['tana-tucan-comparte','bruno-zorro-paciencia']){const j=JSON.parse(fs.readFileSync('saberparatodos/public/v1/cuentos/'+s+'.json'));const pg=j.paginas||j.pages;if(!pg.every(p=>Array.isArray(p.timings)&&p.timings.length>0))throw s;}console.log('timings OK')"` passes.
- [ ] Generator never emits mismatched lengths: extend the check — every page `timings.length === <word count of rendered text>` (assertion script in PR).
- [ ] `cd saberparatodos && npm run test:unit -- src/components/cuentos` green, including AudioCuento tests: mode resolution (mp3 → audio element; missing → fallback), `onEnd` propagation, and timings-driven highlight index math (pure-function unit test, no audio hardware needed).
- [ ] E2E (new `tests/e2e/cuentos-audio.spec.ts`): open a Tana page WITH mp3, press play, assert a highlighted word appears within 10s; assert play/pause/replay controls; zero console errors. `npm run test -- cuentos-audio` green.

WITHOUT mp3s (fallback matrix — same commands, moved-aside audio):
- [ ] `mv saberparatodos/public/audio/cuentos /tmp/audio-cuentos-bak && node saberparatodos/scripts/generate-cuento-packs.js --all && <same timings assertion, all 10 slugs>` green; `mv /tmp/audio-cuentos-bak saberparatodos/public/audio/cuentos` restores. (Packs must generate estimated timings for all 10 with zero MP3s present.)
- [ ] Unit suite green WITHOUT mp3s (tests must mock/fixture audio presence — NEVER depend on real files on disk; prove it by running the suite in the moved-aside state).
- [ ] E2E fallback: with audio moved aside, spec asserts the player renders, speaks via the fallback path (assert status copy + no crash where SpeechSynthesis is stubbed), and completes `onEnd`. Restore audio afterwards and re-run the WITH suite.
- [ ] `cd saberparatodos && npm run lint` green in both states.
- [ ] Visual captures (`docs/CUENTOS/review/`): desktop + mobile spread with a highlighted word mid-narration + player controls visible.
- [ ] No new npm deps: `git diff HEAD --stat -- saberparatodos/package.json` empty. No cloud TTS keys: `grep -rinE "api[_-]?key|edge-tts|azure|elevenlabs" saberparatodos/src/components/cuentos/lector/AudioCuento.svelte | wc -l` == 0.

## 7. Files to Modify

| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/cuentos/lector/AudioCuento.svelte` | NEW | Dual-mode player (audio+timings / Web Speech fallback), Svelte 5 runes | MEDIUM — new reader core |
| `saberparatodos/src/components/cuentos/lector/AudioCuento.test.ts` | NEW | Mode resolution, highlight math, onEnd, no-disk-dependency | LOW |
| `saberparatodos/src/components/cuentos/lector/CuentoReader.svelte` | C2 + part-A version | Minimal integration: render AudioCuento per page, keep autoplay/speed working | MEDIUM — shared reader file |
| `saberparatodos/scripts/generate-cuento-packs.js` | C7.05 version | Add `timings` per page (duration × char weight; estimate fallback) | MEDIUM — feeds offline/PWA |
| `saberparatodos/public/v1/cuentos/*.json` | v2 packs | REGENERATED via script, never by hand | LOW |
| `saberparatodos/tests/e2e/cuentos-audio.spec.ts` | NEW | WITH + WITHOUT mp3 e2e (audio restore in teardown) | LOW |
| `docs/CUENTOS/review/audio-*.png` | NEW | Highlight + controls captures | LOW |

## 8. DO NOT touch (Anti-Regression)

- `saberparatodos/public/audio/cuentos/**` — MP3s are orchestrator-generated; tests move them aside and RESTORE (teardown mandatory, §6).
- `saberparatodos/src/components/cuentos/lector/read-aloud.ts` — reuse as-is; TTS logic lives there (fix only via separate issue if broken).
- `saberparatodos/scripts/gen-cuentos-audio.py` — generation tool, not the player pipeline.
- `saberparatodos/src/components/cuentos/arte/**`, `QuizCuento.svelte` — C7.06/C7.08 islands.
- `saberparatodos/src/pages/cuentos/**` — part-A island.
- `.gitcore/features.json` — orchestrator reconciles at wave end.
- Scene SFX (gust/boing/giggle per-scene MP3s) is an explicit phase-2 gap per REDISENO_STORYCOMET.md — do NOT scope-creep it in.
- No new npm deps; no secrets/keys in client; no `$SWAL`/karma/telemetry (BR-03); routes stay unlisted.

## 9. Anti-Hallucination Guard ⚠️

1. **READ before write**: `read-aloud.ts` + `CuentoReader.svelte` + pack generator COMPLETOS. The fallback already exists — this issue adds selection + timings, not a second TTS engine.
2. **Check what audio really exists**: `ls saberparatodos/public/audio/cuentos/` BEFORE designing. Only 2/10 slugs have MP3s — the fallback is the MAIN path, not the edge case.
3. **Tests must not depend on disk audio**: if the unit suite only passes with MP3s present, it is broken by definition — run it in the moved-aside state to prove it.
4. **Restore what you move**: any `mv` of `public/audio/cuentos/` MUST have a teardown restore in the same command block / spec teardown. Verify with `ls` after.
5. **Timings math is checkable**: `timings.length === word count` for every page, asserted by script, never by eye. Document the estimation constants (0.45s/word, char-weight) in the PR.
6. **No invented duration probing**: if `ffprobe` is absent and header parsing proves unreliable, SHIP the word-count estimate for all pages and say so plainly in the PR — do not fake precision.

## 10. PR Delivery Requirements (ANTI-EMPTY-PR) — OBLIGATORIO

- [ ] `git status --porcelain` shows new/modified files BEFORE opening PR.
- [ ] `git diff --stat HEAD` non-empty; PR contains ≥7 files (component + test + reader wire-up + generator + spec + regenerated packs + screenshots).
- [ ] PR body: §6 WITH-matrix AND WITHOUT-matrix outputs pasted (both timings assertions, both suites), estimation constants documented.
- [ ] Screenshots embedded (highlight mid-narration desktop + mobile).
- [ ] If work incomplete: NO PR — comment blocker on issue.

## 11. Verification

```bash
ls saberparatodos/public/audio/cuentos/
node saberparatodos/scripts/generate-cuento-packs.js --all
node -e "const fs=require('fs');for(const s of ['tana-tucan-comparte','bruno-zorro-paciencia']){const j=JSON.parse(fs.readFileSync('saberparatodos/public/v1/cuentos/'+s+'.json'));const pg=j.paginas||j.pages;if(!pg.every(p=>Array.isArray(p.timings)&&p.timings.length>0))throw s;}console.log('timings OK')"
cd saberparatodos && npm run test:unit -- src/components/cuentos && npm run lint
npm run test -- cuentos-audio
# WITHOUT matrix:
mv saberparatodos/public/audio/cuentos /tmp/audio-cuentos-bak && node saberparatodos/scripts/generate-cuento-packs.js --all && cd saberparatodos && npm run test:unit -- src/components/cuentos; cd /home/belal/proyectosSWAL/apps/worldexams && mv /tmp/audio-cuentos-bak saberparatodos/public/audio/cuentos && ls saberparatodos/public/audio/cuentos/
```

## 12. Dependencies & Merge Order

- **Depends on:** C7.05 merged FIRST (timings build on the v2 pack pass — rebase onto it; do NOT reimplement page splitting) + part-A C7.01-C7.04 merged (reader shell the player mounts into).
- **Parallel with:** C7.06, C7.08 after C7.05 (disjoint islands, verified: lector-audio vs arte vs quiz/loader).
- **Merge order within wave:** 2-4/4 (any order among 06/07/08 once 05 is in).
- **Expected effort:** Large 5-6h (generator timings + player + dual-matrix e2e + captures).

## 13. Failure Recovery

| If this happens | Action |
|----------------|--------|
| `ffprobe` missing AND header parsing unreliable | Ship word-count estimate (0.45s/word × char weight) for all pages; document plainly in PR |
| SpeechSynthesis stub makes fallback e2e flaky | Assert player state machine (status copy, control states, onEnd) rather than actual audio output |
| `timings.length` mismatches on pages with markup | Strip the same markup the renderer strips (mirror its splitter exactly); add the failing page as a fixture test |
| CuentoReader wire-up conflicts with sibling branches | Rebase on main; keep integration to a minimal conditional render |
| Audio dir not restored after matrix | `ls saberparatodos/public/audio/cuentos/` must show the 2 slugs; restore from git/CI artifacts if lost (MP3s are regenerable via `gen-cuentos-audio.py`, never hand-made) |
