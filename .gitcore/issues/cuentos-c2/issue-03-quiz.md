# [Ola C2.03] feat-cuentos-lector: QuizCuento 3 questions faces zero telemetry

## 2. Current State (measurable)

- Each `cuento.md` ends with a 3-question quiz (seed story `tana-tucan-comparte` has 3 questions with A/B/C options + feedback comments), but NO quiz component exists: `QuizCuento.svelte` = 0 files.
- Hard rule BR-03/BR-07: zero tokens, zero karma, zero telemetry in children flows. Quiz answers must NEVER leave the device.

## 3. Desired State

- `QuizCuento.svelte` renders the 3 quiz questions one at a time with big face buttons (happy / thinking / sad faces as inline SVG, art tokens only), instant encouraging feedback per answer (neutral Spanish, e.g. "¡Muy bien!" / "Casi, intenta otra vez"), progress dots, and a final celebration state.
- No network calls, no analytics events, no localStorage writes of answers beyond the progress hook contract from C2.05 (score kept in memory only by default).
- Keyboard + touch accessible, >= 48px targets, works with JS-driven Svelte island.

## 4. Web Research Required

The assignee MUST run at least 4 of these queries and cite sources in the PR:
1. `Svelte 5 runes quiz component state machine example`
2. `positive feedback wording preschoolers formative assessment research`
3. `emoji vs SVG faces children UI accessibility screen reader labels`
4. `COPPA GDPR children quiz data minimization no telemetry frontend`
5. `WCAGowing button accessible name Svelte aria-pressed quiz options`
6. `Astro Svelte island props serialization quiz JSON static pack`

## 5. Agent Session Prompt

```text
You are an autonomous coding agent in repo /home/belal/proyectosSWAL/apps/worldexams.
Issue C2.03: create saberparatodos/src/components/cuentos/lector/QuizCuento.svelte
(3 questions, face buttons, encouraging feedback, zero telemetry).
FIRST read: docs/CUENTOS/00_BIBLIA.md, docs/CUENTOS/01_DIRECCION_ARTE.md (palette,
no scary faces), docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md (neutral Spanish + quiz format),
docs/CUENTOS/WAVE_PLAN.md (ola C2 table),
questions_data/cuentos/tana-tucan-comparte/cuento.md (## Quiz section),
saberparatodos/src/components/CacheIndicator.svelte (style reference).
Constraints: Svelte 5 runes only; ABSOLUTE zero network/telemetry (BR-03/BR-07, no
fetch, no analytics, answers in memory); neutral Spanish; art tokens only;
prefers-reduced-motion for celebration; absolute paths from repo root.
Verify with: npm run test -- quiz ; npx astro check. Done = tests pass + no empty PR.
```

## 6. Existing Code Patterns

- `questions_data/cuentos/tana-tucan-comparte/cuento.md` (`## Quiz` section) — exact 3-question format with `[x]` correct option + `<!-- feedback: ... -->` comments the component data comes from.
- `saberparatodos/src/components/CacheIndicator.svelte` — component + Tailwind style reference (new code uses runes).
- `docs/CUENTOS/01_DIRECCION_ARTE.md` — palette (#FF9F43 joy, #4FB6A3 calm, #E26D5A friendly error, never pure red) and round friendly shapes for the face buttons.

## 7. Acceptance Criteria (command-verifiable)

- [ ] Renders question 1 of 3 with three face-button options (accessible names, `aria-pressed` on selection).
- [ ] Correct answer shows praise feedback (neutral Spanish) and advances; wrong answer shows retry hint without advancing.
- [ ] Progress dots show current question; final state celebrates completion.
- [ ] ZERO network: grep for fetch/XHR/analytics in the component returns empty; answers held in memory only.
- [ ] `npx astro check` passes: `cd saberparatodos && npx astro check`.
- [ ] Reduced-motion disables celebration animation (frozen final pose).

## 8. Files to Modify

| File | Action | Risk |
|------|--------|------|
| `saberparatodos/src/components/cuentos/lector/QuizCuento.svelte` | CREATE | Medium (children-facing, strict BR-03/BR-07) |
| Unit test for quiz flow (nearest existing unit dir) | CREATE | Low |

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
cd saberparatodos && npm run test -- quiz && npx astro check
```

### Dependencies & Merge Order

- Merge order position: **3 of 6** in ola C2.
- Independent of C2.01/C2.02 (can build in parallel); its data contract is the C1 quiz schema. Required by C2.06 e2e. Merge THIRD.

### Failure Recovery

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Feedback strings flagged by validator | Non-neutral word slipped in | Grep strings against veto list in 02_COPYRIGHT_Y_FORMATO.md section 2 |
| Faces look scary/off-palette | Custom colors | Use art tokens only, reuse eye template per 01_DIRECCION_ARTE.md |
| Answer leaks to network | Imported analytics helper | No imports beyond Svelte + types; grep gate in verification |
| Celebration loops forever | CSS animation without media query | Wrap in `@media (prefers-reduced-motion: no-preference)` |
