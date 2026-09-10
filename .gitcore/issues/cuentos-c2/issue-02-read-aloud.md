# [Ola C2.02] feat-cuentos-lector: read-aloud Web Speech ES voices + highlight

## 2. Current State (measurable)

- `saberparatodos/src/components/cuentos/lector/read-aloud.ts` does not exist (0 lines, 0 tests).
- No text-to-speech exists anywhere in the app; stories are silent text + SVG.
- Constraint: only FREE speech is allowed (Web Speech API, OS voices). No paid/cloud TTS.

## 3. Desired State

- A framework-free `read-aloud.ts` module wrapping the Web Speech API: `speak(text, lang)`, `stop()`, `pause()/resume()`, `pickSpanishVoice()` preferring `es-*` voices, adjustable `rate` (0.8 / 1.0), word-boundary highlight callback (`onboundary`) for karaoke-style highlighting, and graceful manual fallback (plain text display + tip) when `speechSynthesis` is unavailable.
- Unit test file `read-aloud.test.ts` mocking `speechSynthesis` covers: voice picking, speak/stop, boundary callback, and no-API fallback. All UI strings neutral Spanish.

## 4. Web Research Required

The assignee MUST run at least 4 of these queries and cite sources in the PR:
1. `Web Speech API SpeechSynthesisUtterance onboundary word highlighting example`
2. `speechSynthesis getVoices async voiceschanged Chrome Android empty list fix`
3. `pick Spanish es-ES es-MX voice speechSynthesis lang matching`
4. `Web Speech API unsupported browser fallback pattern feature detection`
5. `speechSynthesis rate pitch recommended values children language learning`
6. `vitest mock window speechSynthesis unit test example`

## 5. Agent Session Prompt

```text
You are an autonomous coding agent in repo /home/belal/proyectosSWAL/apps/worldexams.
Issue C2.02: create saberparatodos/src/components/cuentos/lector/read-aloud.ts plus
read-aloud.test.ts (Web Speech API, Spanish voices, word highlight, manual fallback).
FIRST read: docs/CUENTOS/00_BIBLIA.md, docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md
(neutral Spanish veto list), docs/CUENTOS/WAVE_PLAN.md (ola C2 table),
saberparatodos/src/components/CacheIndicator.svelte (code style),
an existing *.test.ts under saberparatodos/ for test conventions.
Constraints: Svelte 5 runes in any component glue; zero tokens/telemetry (BR-03/BR-07);
FREE speech only (window.speechSynthesis, no cloud TTS keys); prefers-reduced-motion
respected by callers; neutral Spanish strings; absolute paths from repo root.
Verify with: npm run test -- read-aloud. Done = tests pass + no empty PR.
```

## 6. Existing Code Patterns

- Existing `*.test.ts` files under `saberparatodos/` — Vitest conventions for mocking browser APIs (mirror these for `speechSynthesis` mocks).
- `saberparatodos/src/lib/` — plain TypeScript utility modules (framework-free); `read-aloud.ts` follows the same pattern (no `.svelte` needed).
- `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` section 2 — neutral-Spanish veto list applying to all user-facing strings and fallback tips.

## 7. Acceptance Criteria (command-verifiable)

- [ ] `pickSpanishVoice()` returns an `es-*` voice when present, falls back deterministically otherwise (test with mocked voice lists).
- [ ] `speak()` calls `speechSynthesis.speak` with `lang` starting `es` and the configured `rate`.
- [ ] `stop()` cancels synthesis; `pause()/resume()` delegate correctly.
- [ ] Word-boundary callback fires via `onboundary` events (karaoke highlight hook).
- [ ] When `speechSynthesis` is undefined, module reports `supported: false` and callers show the manual fallback — no exceptions thrown.
- [ ] `npm run test -- read-aloud` passes: `cd saberparatodos && npm run test -- read-aloud`.

## 8. Files to Modify

| File | Action | Risk |
|------|--------|------|
| `saberparatodos/src/components/cuentos/lector/read-aloud.ts` | CREATE | Low-Medium (new module, consumed by C2.01) |
| `saberparatodos/src/components/cuentos/lector/read-aloud.test.ts` | CREATE | Low |

## 9. DO NOT Touch

- `.gitcore/features.json` (reconciled at wave end, never inside issues).
- `questions_data/cuentos/**` story content (owned by olas C3/C4).
- C1 files outside this island (`cuento-schema.ts`, `validate_cuentos.js`, `generate-cuento-packs.js`, art pieces) — READ-ONLY reference.
- Secrets: `.env`, `SUPABASE_SERVICE_ROLE_KEY`, any token/key file.
- Deploy/CI config (`wrangler.json`, workflows), `dist/`, `node_modules/`.
- Other countries' bundles or unrelated components/pages.

## 10. Anti-Hallucination Guard

1. READ every file listed in section 6 before writing a single line; cite file paths with line numbers in the PR description.
2. Svelte 5 runes ONLY (`$state`, `$props`, `$derived`, `$effect`); legacy `$:` reactive statements and `export let` are forbidden in new code.
3. NEVER use Svelte template syntax (`{#if}`, `{#each}`, `{#await}`) inside `.astro` files — Astro components use JSX-like expressions only.
4. Use ABSOLUTE paths from the repo root (`saberparatodos/src/...`) in all docs and PR text; verify each path exists with `ls` before referencing it.
5. Do NOT invent APIs: only Web platform / `supabase-js` / Playwright APIs confirmed by the section-3 research may be used; no guessed function names.

## 11. PR Delivery Requirements (anti-empty-PR)

- The PR MUST add real implementation code in the files of section 8 — a docs-only or empty diff will be rejected (`git diff --stat` must show added source lines, not just markdown).
- Include the new test/spec file with passing assertions; CI green (`npm run test`, `npx astro check`) is required before merge.
- UI issues (C2.01/C2.03/C2.04) MUST attach before/after screenshots (desktop 1280px + mobile 390px) in the PR body.
- PR body MUST list: sources consulted (section 3), files changed with absolute paths, verification commands run with output, and confirmation of zero telemetry (BR-03/BR-07).

## 12. Verification, Dependencies & Merge Order, Failure Recovery

### Verification (bash)

```bash
cd saberparatodos && npm run test -- read-aloud
ls src/components/cuentos/lector/read-aloud.ts src/components/cuentos/lector/read-aloud.test.ts
```

### Dependencies & Merge Order

- Merge order position: **2 of 6** in ola C2.
- Standalone module (no C1 dependency beyond strings). Consumed by C2.01 after both merge — C2.01 wires `speak/stop` into reader controls. Merge SECOND.

### Failure Recovery

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `getVoices()` returns [] | Browser loads voices async | Listen to `voiceschanged` + retry, test both timings |
| Tests fail in Node (no window) | Direct `window.speechSynthesis` access | Feature-detect + injectable synthesis handle for tests |
| Wrong-language voice picked | Naive exact-locale match | Match `lang.toLowerCase().startsWith('es')` with priority list |
| Boundary events missing on some platforms | OS-dependent support | Degrade to sentence-level highlight, never crash |
