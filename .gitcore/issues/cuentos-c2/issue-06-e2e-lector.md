# [Ola C2.06] feat-cuentos-lector: e2e lector desktop + mobile zero console errors

## 2. Current State (measurable)

- Olas C2.01-C2.05 create the reader, read-aloud, quiz, hotspots, and progress — but 0 end-to-end coverage exists for the story flow: `saberparatodos/tests/e2e/cuentos-lector.spec.ts` does not exist.
- Existing e2e suite (`saberparatodos/tests/e2e/*.spec.ts`, e.g. `pwa-offline-resilience.spec.ts`) proves the Playwright setup works; the lector flow has never been driven like a real user on desktop or mobile.
- Target quality bar: 0 console errors on the full read + quiz path, desktop 1280px and mobile 390px.

## 3. Desired State

- `cuentos-lector.spec.ts` drives the seed story (`tana-tucan-comparte`, 8 pages) end to end: open story page, paginate next/prev through all 8 pages, toggle autoplay + speed, trigger read-aloud controls (tolerating no-speech environments), tap a hotspot, answer all 3 quiz questions, reach the celebration state, reload and confirm progress restored.
- Runs on two projects/viewports (desktop 1280x800, mobile 390x844 with touch), fails on ANY console error or page error, and saves screenshots (first page, quiz, celebration) as PR evidence.
- No network telemetry assertions: the spec additionally fails if the reader flow issues non-static requests (packs/pages only).

## 4. Web Research Required

The assignee MUST run at least 4 of these queries and cite sources in the PR:
1. `Playwright multiple viewport projects desktop mobile config example`
2. `Playwright fail test on console error pageerror listener pattern`
3. `Playwright hasTouch tap mobile emulation test example`
4. `Playwright route abort analytics telemetry requests test`
5. `Playwright screenshot fullPage attachments CI artifacts`
6. `Playwright reduced-motion emulateMedia test accessibility`

## 5. Agent Session Prompt

```text
You are an autonomous coding agent in repo /home/belal/proyectosSWAL/apps/worldexams.
Issue C2.06: create saberparatodos/tests/e2e/cuentos-lector.spec.ts (desktop + mobile,
full reader + quiz flow, zero console errors, screenshots).
FIRST read: docs/CUENTOS/00_BIBLIA.md, docs/CUENTOS/WAVE_PLAN.md (ola C2 table),
saberparatodos/tests/e2e/pwa-offline-resilience.spec.ts (repo Playwright conventions),
playwright.config.* under saberparatodos, the C2.01/C2.03 components to learn selectors.
Constraints: real user flow only (no unit-test tricks); zero console/page errors allowed;
desktop 1280 + mobile 390 with touch; prefers-reduced-motion emulation covered;
neutral Spanish strings asserted where visible; absolute paths from repo root.
Verify with: npx playwright test cuentos-lector --project=chromium (and mobile project).
Done = green run + screenshots + no empty PR.
```

## 6. Existing Code Patterns

- `saberparatodos/tests/e2e/pwa-offline-resilience.spec.ts` — canonical repo Playwright patterns (init scripts, IndexedDB seeding, title assertions, flow structure); copy its describe/test skeleton.
- `playwright.config.*` under `saberparatodos/` — existing projects/dev-server config; add mobile viewport project alongside, do not fork the config.
- C2.01/C2.03 components — source of stable selectors (`data-testid` preferred; add them in the C2.01/C2.03 PRs if missing).
- `saberparatodos/src/pages/cuentos*` (C1.05) — routes the spec navigates (`/cuentos`, `/cuentos/[slug]`).

## 7. Acceptance Criteria (command-verifiable)

- [ ] Spec opens `/cuentos/tana-tucan-comparte` and paginates through all 8 pages (counter asserts `8 of 8`).
- [ ] Autoplay + speed toggle exercised; read-aloud controls clicked without throwing (speech absence tolerated, errors are not).
- [ ] A hotspot tapped; all 3 quiz questions answered; celebration state visible.
- [ ] Reload restores progress (C2.05 hook) — last page re-opens.
- [ ] ZERO console errors and ZERO page errors on both viewports — listener fails the test on first violation.
- [ ] `npx playwright test cuentos-lector` passes on chromium desktop + mobile projects; screenshots saved for first page, quiz, celebration.

## 8. Files to Modify

| File | Action | Risk |
|------|--------|------|
| `saberparatodos/tests/e2e/cuentos-lector.spec.ts` | CREATE | Low-Medium (test only, but gates the wave) |
| `playwright.config.*` mobile project entry (if absent) | MODIFY (additive) | Low |

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
cd saberparatodos && npx playwright test cuentos-lector
ls tests/e2e/cuentos-lector.spec.ts
ls test-results/ 2>/dev/null || ls playwright-report/ 2>/dev/null || echo CHECK_REPORT_DIR
```

### Dependencies & Merge Order

- Merge order position: **6 of 6** in ola C2.
- Depends on ALL of C2.01-C2.05 (drives reader, speech controls, quiz, hotspots, progress restore). Merge LAST — it is the wave gate. If a component PR is delayed, land the spec against available parts and extend, never weaken the zero-console-error gate.

### Failure Recovery

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Flaky autoplay timing | Fixed sleeps | Wait on counter text/state assertions, not timeouts |
| Speech API absent in CI browser | Assumes voices exist | Tolerate absence; assert NO errors, not speech output |
| Selectors break after component edits | Text-based selectors | Prefer `data-testid` hooks agreed with C2.01/C2.03 |
| Mobile tap fails | Click instead of tap / wrong viewport | Use mobile project with `hasTouch`, `tap()` on hotspots |
