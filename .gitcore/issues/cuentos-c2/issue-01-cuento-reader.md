# [Ola C2.01] feat-cuentos-lector: CuentoReader pagination + autoplay + speed

## 2. Current State (measurable)

- The story content exists as markdown (`questions_data/cuentos/tana-tucan-comparte/cuento.md`, 8 pages + quiz) and the C1 wave provides schema, validator, and static JSON packs.
- There is NO reader component: `saberparatodos/src/components/cuentos/lector/CuentoReader.svelte` does not exist (0 files under `src/components/cuentos/lector/`).
- Children aged 3-6 cannot paginate through a story in the app today.

## 3. Desired State

- A new `CuentoReader.svelte` component renders one story page at a time from the static pack JSON: page text (30-80 words per page), scene SVG, prev/next buttons, page counter (e.g. "3 of 8"), autoplay toggle, and reading-speed control (slow / normal).
- Autoplay advances pages on a timer scaled by the speed setting and pauses on user interaction.
- Full keyboard navigation (ArrowLeft/ArrowRight), large touch targets (>= 48px), art tokens from `docs/CUENTOS/01_DIRECCION_ARTE.md` (bone background #FDF6EC, ink #3A2E2A), neutral Spanish UI strings.

## 4. Web Research Required

The assignee MUST run at least 4 of these queries and cite sources in the PR:
1. `Svelte 5 runes $state $props $derived pagination component example`
2. `WCAG 2.2 target size 44px children touch interface guidelines`
3. `prefers-reduced-motion autoplay carousel accessibility pause control`
4. `Astro 6 island Svelte component client:visible hydration pattern`
5. `SVG responsive scaling viewBox preserveAspectRatio children app`
6. `reading speed control dyslexia-friendly children UI research`

## 5. Agent Session Prompt

```text
You are an autonomous coding agent in repo /home/belal/proyectosSWAL/apps/worldexams.
Issue C2.01: create saberparatodos/src/components/cuentos/lector/CuentoReader.svelte
(pagination, autoplay, speed control) for the story-reader wave.
FIRST read: docs/CUENTOS/00_BIBLIA.md, docs/CUENTOS/01_DIRECCION_ARTE.md,
docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md, docs/CUENTOS/WAVE_PLAN.md (ola C2 table),
questions_data/cuentos/tana-tucan-comparte/cuento.md,
saberparatodos/src/lib/cuentos/cuento-schema.ts (C1 types),
saberparatodos/src/components/CacheIndicator.svelte (existing Svelte style),
saberparatodos/tests/e2e/pwa-offline-resilience.spec.ts (test style).
Constraints: Svelte 5 runes only; zero tokens/telemetry (BR-03/BR-07); free built-in
APIs only; prefers-reduced-motion disables autoplay animation; neutral Spanish strings
only (veto list in 02_COPYRIGHT_Y_FORMATO.md section 2); art tokens only
(#FDF6EC/#3A2E2A/#FF9F43/#4FB6A3); absolute paths from repo root.
Verify with: npm run test -- lector ; npx astro check. Done = tests pass + no empty PR.
```

## 6. Existing Code Patterns

- `saberparatodos/src/components/CacheIndicator.svelte` — existing Svelte component style (`onMount`, local state, Tailwind classes); NEW code must use Svelte 5 runes instead of its legacy `$:` statements.
- `saberparatodos/src/lib/cuentos/cuento-schema.ts` (C1.01) — TypeScript types for story frontmatter, pages, quiz; import these types, do not redefine them.
- Static pack JSON produced by C1.03 (`public/v1/cuentos/<slug>.json`) — the reader consumes this shape (pages array with text + scene SVG path).
- `saberparatodos/tests/e2e/pwa-offline-resilience.spec.ts` — Playwright conventions used in this repo (seeding, `expect(page).toHaveTitle`).

## 7. Acceptance Criteria (command-verifiable)

- [ ] `CuentoReader.svelte` renders page 1 (text 30-80 words + scene SVG) of the seed story pack.
- [ ] Next/Prev buttons update the page and the counter (`page X of 8`): verified by component test.
- [ ] Autoplay advances one page per interval and pauses on manual navigation.
- [ ] Speed control changes the autoplay interval (slow interval > normal interval, asserted in test).
- [ ] ArrowLeft/ArrowRight keys navigate pages.
- [ ] `npx astro check` passes with 0 errors: `cd saberparatodos && npx astro check`.
- [ ] `prefers-reduced-motion: reduce` disables autoplay advancement.

## 8. Files to Modify

| File | Action | Risk |
|------|--------|------|
| `saberparatodos/src/components/cuentos/lector/CuentoReader.svelte` | CREATE | Medium (new core UI, consumed by pages + e2e) |
| `saberparatodos/tests/unit/cuento-reader.test.ts` (or nearest existing unit dir) | CREATE | Low |

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
cd saberparatodos && npm run test -- lector && npx astro check
ls src/components/cuentos/lector/CuentoReader.svelte
grep -rn "fetch\|analytics\|telemetry" src/components/cuentos/lector/ || echo "NO_TELEMETRY_OK"
```

### Dependencies & Merge Order

- Merge order position: **1 of 6** in ola C2.
- Depends on C1 (schema + static packs must exist). Blocks C2.06 (e2e drives this component). Merge FIRST so C2.02/C2.03 can wire into it.

### Failure Recovery

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Page text empty | Pack JSON shape mismatch | READ the generated pack JSON first, adapt to real field names |
| Autoplay never fires | Timer cleared on mount / SSR no window | Guard with `browser` check + `onMount`, test with fake timers |
| `astro check` type errors | Props typed against invented shape | Import C1 schema types, run `npx astro check` early |
| Buttons too small on mobile | Missing min-size classes | Enforce `min-h-[48px] min-w-[48px]` + Playwright viewport assert |

