# [Ola C5.01] feat-cuentos-logros-local: pins/achievements local-first + celebration component, zero telemetry

## 1. Current State (measurable)

- `saberparatodos/src/lib/cuentos/logros*` does NOT exist (0 files). No achievements system exists anywhere in the cuentos module.
- Waves C1–C4 are planned dependencies, not yet merged: C1 (schema `cuento-schema.ts` + validator `scripts/validate_cuentos.js` + static pack generator), C2 (reader `CuentoReader.svelte` + `QuizCuento.svelte` + progress `progreso*` in `saberparatodos/src/lib/cuentos/`), C3–C4 (10 `cuento.md` files under `questions_data/cuentos/<slug>/`).
- Progress persistence pattern from C2.05 (`progreso*`: localStorage-first, optional Supabase RLS sync with identity-free payload) is the planned base this issue builds on — verify it exists on the branch before starting; if C2.05 is not merged, implement logros against a minimal local `progreso` read interface and note the dependency in the PR.
- Hard constraints: BR-03 (zero $SWAL tokens, zero karma, zero telemetry in all children flows), BR-07 (reading 100% free, no login/paywall gate). Copyright: `questions_data/cuentos/LICENSE-CONTENT.md` + per-file headers (`02_COPYRIGHT_Y_FORMATO.md` §1). Content language: neutral Spanish only (§2 veto list).

## 2. Desired State

- New island `saberparatodos/src/lib/cuentos/logros.ts` (+ `logros.test.ts`): pure functions over progress data — `desbloquearLogro(progreso)`, `listarLogros(slug?)`, `tieneLogro(id)` — with a fixed catalog of achievements (e.g. `primera-lectura`, `cuento-completo-<slug>`, `quiz-3-3`, `cinco-cuentos`, `diez-cuentos`, `explorador-habitats`). All state in localStorage under a `cuentos:logros:v1` key; no network calls, no analytics events, no PII.
- New component `saberparatodos/src/components/cuentos/lector/CelebracionLogro.svelte` (Svelte 5 runes): shows the unlocked pin/badge with art-direction styling (palette #FDF6EC / #FF9F43 / #4FB6A3, tokens `--t-bote`, `--t-aparece`, confetti SVG max 12 pieces per `01_DIRECCION_ARTE.md` §5), respects `prefers-reduced-motion` (static final pose), announces via `aria-live="polite"` in neutral Spanish. No sound, or neutral WebAudio tone only.
- Wiring: reader (C2.01) calls `desbloquearLogro` on story-complete and quiz-complete (C2.03) events; celebration renders once per unlock (dedupe by stored id). Zero changes to quiz scoring logic.
- Validator-friendly: no new content files, so C1.02 validator must still pass unchanged.

## 3. Web Research (4–6 sources)

1. MDN — `Window.localStorage` API: synchronous string key-value storage, 5MB quota, per-origin; always wrap in try/catch (private mode throws). https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
2. Svelte 5 docs — Runes (`$state`, `$derived`, `$effect`, `$props`): component reactivity without legacy `export let` / stores for local UI state. https://svelte.dev/docs/svelte/runes
3. MDN — `prefers-reduced-motion` media query: freeze celebratory animation on final pose for vestibular safety (children audience). https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
4. MDN — `aria-live` regions: `aria-live="polite"` + `role="status"` for announcing unlocks to screen readers without focus theft. https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live
5. web.dev — "Rewarding habits without dark patterns" / gamification for kids: celebration must be non-competitive, no streaks-as-pressure, no social comparison; local-only badges recommended for under-7 audiences. https://web.dev/patterns/
6. OWASP Secure Coding — never store identity-linked data client-side for children; identity-free local keys only (supports BR-03 zero-telemetry claim).

## 4. Agent Session Prompt

> You are implementing C5.01 (feat-cuentos-logros-local) in `/home/belal/proyectosSWAL/apps/worldexams/saberparatodos`.
> Context: read `docs/CUENTOS/00_BIBLIA.md`, `01_DIRECCION_ARTE.md` (§2 palette, §5 animations), `02_COPYRIGHT_Y_FORMATO.md` (§1–§2), `WAVE_PLAN.md` (C5 table). Prior waves C1–C4 provide: `src/lib/cuentos/cuento-schema.ts`, `src/lib/cuentos/progreso*`, `src/components/cuentos/lector/CuentoReader.svelte`, `src/components/cuentos/lector/QuizCuento.svelte`, 10 `questions_data/cuentos/<slug>/cuento.md` files.
> Task: (1) create `src/lib/cuentos/logros.ts` — fixed achievement catalog (ids, neutral-Spanish names/descriptions, unlock predicates as pure functions of progress input); localStorage persistence key `cuentos:logros:v1` with try/catch + JSON schema guard; zero network imports. (2) create `src/lib/cuentos/logros.test.ts` — unit tests for every predicate + dedupe + corrupted-storage recovery. (3) create `src/components/cuentos/lector/CelebracionLogro.svelte` — Svelte 5 runes, art-direction palette, confetti ≤12 SVG pieces, `prefers-reduced-motion` static pose, `aria-live="polite"`, neutral Spanish strings only. (4) wire unlock calls into reader story-complete + quiz-complete events without changing scoring. (5) run `npm run test -- logros`, `npm run validate:cuentos` (must stay green), `npx astro check` if available. Constraints: BR-03 (zero telemetry/tokens/karma — grep must show no fetch/analytics in new files), BR-07 (no login gate), neutral Spanish (run veto grep), Svelte 5 runes (no legacy syntax), absolute imports from root. Do NOT touch `features.json`. Deliver a PR with tests passing and desktop+mobile screenshots of the celebration state.

## 5. Existing Code Patterns

- Progress island (C2.05, planned): `saberparatodos/src/lib/cuentos/progreso.ts` — localStorage-first with `cuentos:<...>:v1` key namespacing, JSON parse guards, identity-free payloads for optional Supabase RLS sync. Mirror its key naming, try/catch storage wrapper, and pure-function style in `logros.ts`.
- Quiz feedback (C2.03, planned + art direction §5): correct = `bote` bounce + confetti SVG (12 pieces, 1.2s); incorrect = soft `meneo`, no error sound. Reuse the same CSS tokens (`--t-bote`, `--t-aparece`) and confetti approach in `CelebracionLogro.svelte`.
- Reader events (C2.01, planned): `CuentoReader.svelte` emits page/story-complete events; subscribe to those rather than polling progress.
- Static pack shape (C1.03, planned): `public/v1/cuentos/<slug>.json` contains `slug`, `titulo`, `edad`, `valor` — use `slug` strings as logro keys (`cuento-completo-<slug>`), never titles.
- Repo test convention: colocated `*.test.ts` next to `src/lib/**` modules (check `src/lib` for the runner — vitest). Follow it.

## 6. Acceptance Criteria (command-verifiable)

1. `ls saberparatodos/src/lib/cuentos/logros.ts saberparatodos/src/lib/cuentos/logros.test.ts saberparatodos/src/components/cuentos/lector/CelebracionLogro.svelte` → all 3 exist.
2. `npm run test -- logros` (run inside `saberparatodos/`) → PASS, ≥10 test cases covering every catalog predicate + dedupe + corrupted-storage recovery.
3. `grep -rEn "fetch\(|XMLHttpRequest|navigator\.sendBeacon|analytics|gtag|plausible|posthog|supabase" saberparatodos/src/lib/cuentos/logros.ts saberparatodos/src/components/cuentos/lector/CelebracionLogro.svelte` → exit 1 (zero matches; BR-03).
4. `grep -rEn "vos |tenés|hacé|mirá|che |parce|chido|chévere|bacán|pesos|dólares" saberparatodos/src/lib/cuentos/logros.ts saberparatodos/src/components/cuentos/lector/CelebracionLogro.svelte` → exit 1 (neutral Spanish).
5. `grep -rEn "export let|\\$:|createEventDispatcher" saberparatodos/src/components/cuentos/lector/CelebracionLogro.svelte` → exit 1 (Svelte 5 runes only).
6. `grep -rEn "prefers-reduced-motion" saberparatodos/src/components/cuentos/lector/CelebracionLogro.svelte` → ≥1 match; `grep -c "aria-live" ...` → ≥1.
7. `node saberparatodos/scripts/validate_cuentos.js` (or `npm run validate:cuentos`) → 0 errors, 10/10 stories valid (no regression).
8. Unlocking the same achievement twice stores exactly one entry: covered by a test asserting `desbloquearLogro` idempotency.

## 7. Files + Risk

| File | Change | Risk |
|------|--------|------|
| `saberparatodos/src/lib/cuentos/logros.ts` | NEW (~150 lines, catalog + predicates + storage) | Low — new island, no dependents except reader wiring |
| `saberparatodos/src/lib/cuentos/logros.test.ts` | NEW (~120 lines) | None |
| `saberparatodos/src/components/cuentos/lector/CelebracionLogro.svelte` | NEW (~120 lines) | Low — isolated component; medium visual risk (kid aesthetics per art direction) |
| `saberparatodos/src/components/cuentos/lector/CuentoReader.svelte` | EDIT — subscribe unlock calls to existing complete events only | Medium — must not alter pagination/read-aloud/quiz logic; keep diff ≤20 lines |
| `saberparatodos/src/lib/cuentos/progreso.ts` | READ-ONLY reference (do not refactor) | Avoid scope creep |

Rollback: delete the 3 new files + revert the reader hunk; no schema/content changes involved.

## 8. DO NOT Touch

- `.gitcore/features.json` and any `features.json` — reconciliation happens at wave end, never inside issues.
- `questions_data/cuentos/**` (C3–C4 content), `saberparatodos/scripts/validate_cuentos.js`, `saberparatodos/scripts/generate-cuento-packs.js`, `public/v1/cuentos/**` artifacts.
- Quiz scoring (`QuizCuento.svelte` logic), reader pagination/read-aloud internals, Supabase RLS policies, auth/login flows (BR-07: no login gate may be added).
- `.env`, secrets, tokens, CI workflows, `package.json` dependencies (no new deps — vanilla Svelte + localStorage only).
- Any files outside the island listed in §7.

## 9. Anti-Hallucination (minimum 4)

1. Do NOT invent a progress API — read `saberparatodos/src/lib/cuentos/progreso.ts` first and import only exports that exist; if C2.05 is unmerged, define the minimal input type locally and document the assumption in the PR body.
2. Do NOT invent achievement names in non-neutral Spanish — every user-facing string must pass the §2 veto grep; quote the grep output in the PR.
3. Do NOT claim telemetry-free without evidence — paste the §6 criterion-3 grep output (exit 1) in the PR.
4. Do NOT claim visual correctness without screenshots — attach desktop + mobile captures of the celebration state (visual rule BELA).
5. Do NOT report `validate_cuentos` as passing without pasting its full stdout (must show 10/10).

## 10. PR Delivery Requirements (anti-empty-PR + test-nonempty)

- The PR must contain: the 3 new files with real logic (no stubs/TODO placeholders), the reader wiring hunk, passing `logros.test.ts` (≥10 cases), and the §6 evidence pastes (grep outputs, validator stdout, screenshots).
- An empty PR (docs-only, rename-only, or single-line change) or a PR with an empty/skipped test file will be rejected — CI must show the new test suite executing and passing.
- PR title: `[C5.01] feat-cuentos-logros-local: local-first pins + celebration, zero telemetry`. Body: what unlocked when (catalog table), storage key + quota behavior, BR-03 evidence, validator output, screenshots, dependency note re C2.05.
- No merge if `validate_cuentos` regresses or if any new network import appears in the diff (`git diff --stat` + import grep reviewed).

## 11. Verification (bash)

```bash
cd /home/belal/proyectosSWAL/apps/worldexams/saberparatodos
ls src/lib/cuentos/logros.ts src/lib/cuentos/logros.test.ts src/components/cuentos/lector/CelebracionLogro.svelte
npm run test -- logros
grep -rEn "fetch\(|XMLHttpRequest|navigator\.sendBeacon|analytics|gtag|plausible|posthog|supabase" src/lib/cuentos/logros.ts src/components/cuentos/lector/CelebracionLogro.svelte; test $? -eq 1 && echo "BR-03 OK: zero telemetry"
grep -rEn "vos |tenés|hacé|mirá|che |parce|chido|chévere|bacán|pesos|dólares" src/lib/cuentos/logros.ts src/components/cuentos/lector/CelebracionLogro.svelte; test $? -eq 1 && echo "NEUTRAL-ES OK"
grep -rEn "export let|\\$:" src/components/cuentos/lector/CelebracionLogro.svelte; test $? -eq 1 && echo "RUNES OK"
node scripts/validate_cuentos.js
git status --porcelain
```

## 12. Dependencies & Merge Order (C5 after C1–C4 + internal 1–4)

- Wave C5 merges only after C1–C4 are merged (schema/validator/reader/10 stories). Hard dependency: C2.05 progress module (read interface); soft dependency: C2.01 reader events, C2.03 quiz-complete event.
- Internal C5 order: **C5.01 merges FIRST** (01 of 1→4). C5.02 (SEO) and C5.03 (PWA) are independent of C5.01 and may run in parallel after it; C5.04 (final audit) merges LAST and covers C5.01 in its grep/telemetry audit.
- If C2.05 is missing at implementation time: implement against a local minimal interface, flag it in the PR body, and C5.04 must re-verify the wiring once C2.05 lands.

## 13. Failure Recovery

- Validator regresses → the change is content-agnostic by design; run `git stash` on the reader hunk, re-run validator to bisect; reader wiring must be event-subscription only, never content mutation.
- localStorage throws (private mode / quota) → wrapper catches and degrades to in-memory map for the session; celebration still renders; add a test for this path.
- Touching the same reader file as another C5 issue → rebase onto latest C5.01 base, keep wiring hunk ≤20 lines, resolve by keeping both event subscriptions.
- Screenshots show off-palette/off-tone visuals → fix against `01_DIRECCION_ARTE.md` §2/§5 before requesting review; do not iterate more than 3 times on the same file without posting a diff summary and changing strategy.
