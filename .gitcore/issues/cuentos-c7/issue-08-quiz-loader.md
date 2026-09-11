# [Ola C7.08] feat-cuentos-c7: quiz con retratos SVG + loader con encanto para /cuentos

> Ola C7 redesign part B — Quiz images + playful loader. Merge order: AFTER C7.05, parallel with 06-08 (2-4/4) | Risk: LOW | Effort: Medium 3-4h
> Disjoint island: `saberparatodos/src/components/cuentos/lector/QuizCuento.svelte` (options upgrade) + NEW `saberparatodos/src/components/cuentos/lector/CargandoCuento.svelte` + 2-line wire-up in the part-A door page. Zero weight: inline SVG + CSS only, no new deps.

---

## 1. Current State (MEDIBLE)

- Quiz today = `saberparatodos/src/components/cuentos/lector/QuizCuento.svelte` (3 questions, A-C text options, faces feedback, local progress via `progreso.ts` + `logros.ts`, zero telemetry per C2.03). Options are TEXT-ONLY — no portraits.
- Portrait assets exist and are unused by the quiz: `questions_data/cuentos/*/personajes/*.svg` (2-4 per cuento, viewBox `0 0 200 200`, copyright-commented) + generic `arte/piezas/*.svg`.
- `/cuentos` has NO loading state: static Astro pages (`saberparatodos/src/pages/cuentos/index.astro`, `[slug].astro` door from part-A C7.02) jump from click to content with no charm.
- Parity target (`docs/CUENTOS/REDISENO_STORYCOMET.md` §1 items 3+8, §2 C7.08): quiz options with images + right/wrong feedback (feedback logic already exists — keep it), and a loader with painted night sky + sleeping moon + playful copy (SVG, weightless).

## 2. Desired State (DELTA — portraits in quiz + charming loader)

1. **Quiz portraits:** every option row in `QuizCuento.svelte` shows a circular portrait (`<img>` resolving to `personajes/<nombre>.svg` when the option text names a cuento character — case-insensitive substring match against the cuento's `personajes` frontmatter list — else a generic `piezas/` motif: estrella for correct-celebration context, luna/neutral otherwise). Matching is data-driven from frontmatter + option text; NO quiz markdown changes (content frozen after C7.05). Portraits are decorative (`alt=""`, `aria-hidden`) so screen readers keep the current text flow; right/wrong feedback behavior + `onComplete` contract UNCHANGED.
2. **NEW `CargandoCuento.svelte`:** playful loader for the book journey — inline SVG night sky (reuse `piezas/estrella.svg` + `piezas/luna.svg` shapes, night `#121832` + cream `#FFF9DC` + gold `#D4A94E` per spec §1.1) + rotating playful copy lines in neutral Spanish ("Ordenando los colores…", "Despertando a la luna…", "Mejor con sonido · Toca todo"), CSS-only twinkle/float animation, `prefers-reduced-motion` = static sky + first copy line. Props: `lineas?: string[]`, `nota?: string`. Zero KB of new assets (inline SVG, no fonts beyond the part-A Andika/Fredoka stack, no images, no deps).
3. **Wire-up:** render `<CargandoCuento>` in the part-A door page (`[slug].astro` book-opening flow — 2-line integration, documented in the PR so part-A owners can spot it). If part-A's door exposes no loading slot, render it as the quiz-transition state inside `QuizCuento` instead and say so in the PR — either way it must be reachable in e2e, not a dead component.
4. **Constraints:** no new npm deps; no weight (loader adds <5KB gz to the route — assert via build output); BR-03/BR-07; reduced-motion; unlisted unchanged; Svelte 5 runes.

## 3. Web Research Required (4-6 queries, MANDATORY before writing)

1. search: "picture answer options preschool quiz app portrait UX children"
2. search: "SVG twinkle animation CSS only prefers-reduced-motion loader"
3. search: "playful loading copy kids apps examples microcopy"
4. search: "decorative images alt empty aria-hidden quiz accessibility"
5. search: "Svelte 5 $props default values component composition"

## 4. Agent Session Prompt

"Before writing, please: 1. Read `docs/CUENTOS/REDISENO_STORYCOMET.md` FULL (§1 items 3+8, §2 C7.08, §4 parity definition) + `docs/CUENTOS/01_DIRECCION_ARTE.md` (character/palette rules) + `docs/CUENTOS/WAVE_PLAN.md` (hard constraints: BR-03/BR-07, Svelte 5 runes, unlisted). 2. Read `saberparatodos/src/components/cuentos/lector/QuizCuento.svelte` + `QuizCuento.test.ts` COMPLETOS (keep the feedback + onComplete contract) + `arte/piezas/estrella.svg` + `arte/piezas/luna.svg` + the part-A door page. 3. Research the queries above (kids quiz imagery + CSS loaders). 4. Implement portraits + loader + wire-up. 5. Run every command in §11 including desktop+mobile captures."

## 5. Existing Code Patterns (MUST follow)

- `lector/QuizCuento.svelte` → question flow, faces feedback, `saveProgress`/`evaluable` via `progreso.ts` + `logros.ts`, `onComplete` prop. Add portraits INSIDE the option rows; do not restructure state.
- `lector/QuizCuento.test.ts` → existing quiz test style; add portrait-resolution tests in the same harness.
- `arte/piezas/{estrella,luna}.svg` → loader shapes (inline copies, keep the © comment lineage in a code comment).
- `arte/tokens.css` → night/cream/gold tokens; loader uses tokens, no hardcoded second palette.
- `lib/cuentos/cuento-schema.ts` → `personajes: string[]` frontmatter is the portrait-matching source of truth.
- Part-A door page (`src/pages/cuentos/[slug].astro`, C7.02) → the loader's mount point; touch it with exactly the documented lines, nothing else.

## 6. Acceptance Criteria (VERIFICABLES POR COMANDO)

- [ ] `test -f saberparatodos/src/components/cuentos/lector/CargandoCuento.svelte`.
- [ ] Quiz portraits: `grep -c "personajes\|retrato\|portrait" saberparatodos/src/components/cuentos/lector/QuizCuento.svelte` >= 2 AND a unit test asserts: option naming a character renders that character's SVG path; option naming nobody renders the generic motif; portraits carry `alt=""` + `aria-hidden`.
- [ ] Quiz contract intact: `cd saberparatodos && npm run test:unit -- src/components/cuentos` green (ALL pre-existing QuizCuento cases still pass, zero deleted).
- [ ] Loader weight: inline SVG + CSS only — `grep -c "http\|base64\|<image" .../CargandoCuento.svelte` == 0; no new `<img src>` assets; `git diff HEAD --stat -- saberparatodos/package.json` empty.
- [ ] Loader reduced-motion: source contains `prefers-reduced-motion` + unit test asserts static render under reduce.
- [ ] Loader reachable: e2e (extend `tests/e2e/cuentos-lector.spec.ts` or new `tests/e2e/cuentos-loader.spec.ts`) navigates the door → book flow (or quiz transition per §2.3) and asserts the loader node + at least one playful copy line visible; `npm run test -- <spec>` green on chromium + mobile emulation.
- [ ] E2E quiz-with-images: spec answers one question, asserts portrait `<img>` nodes present in options AND the existing right/wrong feedback still appears; zero console errors.
- [ ] `cd saberparatodos && npm run lint` green.
- [ ] Visual captures (`docs/CUENTOS/review/`): desktop + mobile screenshots of (a) quiz with portrait options, (b) loader mid-animation. Vision PASS = portraits circular + aligned, loader sky+moon+copy charming, no layout shift.
- [ ] Neutral Spanish + copyright: loader copy lines pass the veto grep (`grep -iE "vos |che |chido|chévere|bacán" .../CargandoCuento.svelte | wc -l` == 0); no quiz/character content altered (`git diff --stat -- questions_data/` empty).

## 7. Files to Modify

| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/cuentos/lector/QuizCuento.svelte` | C2 + part-A version | Portrait `<img>` per option (frontmatter-driven match + generic fallback); feedback logic untouched | MEDIUM — shared quiz file |
| `saberparatodos/src/components/cuentos/lector/QuizCuento.test.ts` (or `.test.ts` next to it — check first) | existing | Portrait resolution + alt/aria tests; zero deletions | LOW |
| `saberparatodos/src/components/cuentos/lector/CargandoCuento.svelte` | NEW | Night-sky + moon + rotating playful copy, CSS-only, reduced-motion static | LOW |
| `saberparatodos/src/components/cuentos/lector/CargandoCuento.test.ts` | NEW | Copy rotation, reduced-motion, props defaults | LOW |
| `saberparatodos/src/pages/cuentos/[slug].astro` | part-A door | 2-line loader wire-up ONLY (documented in PR) | LOW (rebase-sensitive) |
| `saberparatodos/tests/e2e/cuentos-loader.spec.ts` (or extend lector spec) | NEW/extend | Loader reachability + quiz-images e2e | LOW |
| `docs/CUENTOS/review/quiz-loader-*.png` | NEW | quiz + loader captures desktop + mobile | LOW |

## 8. DO NOT touch (Anti-Regression)

- `questions_data/cuentos/**` — content frozen after C7.05 (portraits READ from frontmatter/SVGs, never edited).
- `saberparatodos/scripts/*`, `src/lib/cuentos/*` — C7.05/C7.07 islands.
- `saberparatodos/src/components/cuentos/arte/**`, `EscenaInteractiva.svelte` — C7.06 island.
- `CuentoReader.svelte`, `read-aloud.ts`, `AudioCuento.svelte` — C7.07/part-A islands.
- Rest of `src/pages/cuentos/**` beyond the 2 documented loader lines; no nav links added (stays unlisted: `noindex`, out of sitemap).
- `.gitcore/features.json` — orchestrator reconciles at wave end.
- No new npm deps; no remote fonts/images in the loader (fonts locales rule); no `$SWAL`/karma/telemetry (BR-03).

## 9. Anti-Hallucination Guard ⚠️

1. **READ before write**: `QuizCuento.svelte` + its test + the door page COMPLETOS. The option-row markup and the door's loading slot (or absence) are facts to read, not guess.
2. **No content edits disguised as quiz work**: `git diff --stat -- questions_data/` MUST be empty. Portraits come from existing assets only.
3. **Dead components fail**: if the loader isn't reachable in e2e (no door slot AND no quiz-transition use), the issue is NOT done — wire it somewhere real per §2.3.
4. **Decorative means decorative**: portraits MUST NOT steal screen-reader focus — `alt=""` + `aria-hidden` asserted in tests, text flow unchanged.
5. **Weight claims need evidence**: "no weight" = the §6 greps (no http/base64/image) + route build size delta noted in the PR from `npm run build` output.
6. **Copy is neutral**: every loader line through the veto grep; playful ≠ dialectal (BR-07).

## 10. PR Delivery Requirements (ANTI-EMPTY-PR) — OBLIGATORIO

- [ ] `git status --porcelain` shows new/modified files BEFORE opening PR.
- [ ] `git diff --stat HEAD` non-empty; PR contains ≥7 files (quiz + quiz test + loader + loader test + door wire-up + spec + screenshots).
- [ ] PR body: §6 checklist with commands + outputs (unit, lint, e2e desktop + mobile, weight greps, veto grep).
- [ ] Screenshots embedded (quiz portraits + loader, desktop + mobile).
- [ ] If work incomplete: NO PR — comment blocker on issue.

## 11. Verification

```bash
test -f saberparatodos/src/components/cuentos/lector/CargandoCuento.svelte
grep -c "http\|base64\|<image" saberparatodos/src/components/cuentos/lector/CargandoCuento.svelte  # expect 0
grep -iE "vos |che |chido|chévere|bacán" saberparatodos/src/components/cuentos/lector/CargandoCuento.svelte | wc -l  # expect 0
git diff --stat -- questions_data/  # expect empty
cd saberparatodos && npm run test:unit -- src/components/cuentos && npm run lint
npm run test -- cuentos-loader
```

## 12. Dependencies & Merge Order

- **Depends on:** C7.05 merged FIRST (quiz portraits match against v2-validated `personajes` frontmatter; rebase onto it) + part-A C7.01-C7.04 merged (door page mount point + font stack the loader inherits).
- **Parallel with:** C7.06, C7.07 after C7.05 (disjoint islands, verified: quiz/loader vs arte vs lector-audio).
- **Merge order within wave:** 2-4/4 (any order among 06/07/08 once 05 is in).
- **Expected effort:** Medium 3-4h (quiz upgrade + loader + tests + e2e + captures).

## 13. Failure Recovery

| If this happens | Action |
|----------------|--------|
| Door page has no loading slot for the wire-up | Mount the loader as the quiz-transition state inside QuizCuento; document the choice in the PR |
| Option text matches two personajes (ambiguous) | First frontmatter-listed match wins; add the case as a unit fixture |
| Portrait SVG missing for a matched name | Fall back to the generic motif + `console.warn` (dev only); never break the quiz render |
| E2E loader timing flakes | Assert loader presence on a slowed navigation (route with artificial delay OK in spec) rather than exact frames |
| Door wire-up conflicts with part-A updates | Rebase on main; the wire-up is 2 lines — re-apply manually, never bulk-resolve the page |
