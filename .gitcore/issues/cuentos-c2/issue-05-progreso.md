# [Ola C2.05] feat-cuentos-lector: child profiles progress localStorage to Supabase RLS

## 2. Current State (measurable)

- Reading progress is NOT stored anywhere: 0 profile files, 0 tables, reopening a story always restarts at page 1.
- Hard rules: BR-03/BR-07 (zero tokens, zero karma, zero telemetry in children flows) + child privacy: the synced payload must carry NO identity (no names, no emails, no device IDs).
- Target island `saberparatodos/src/lib/cuentos/progreso*` does not exist.

## 3. Desired State

- `progreso.ts` implements local-first progress: anonymous child profiles (`id` = random UUID generated on device, nickname chosen from a fixed neutral-Spanish word list, never typed PII) stored in `localStorage`; per-story record `{ slug, lastPage, finished, quizBest, updatedAt }`.
- Optional Supabase sync of the SAME anonymous payload to a `cuento_progreso` table guarded by RLS (anon insert/select restricted to the row's own `profile_id`, no auth identity required, no PII columns exist by design); offline-first with a pending queue flushed on reconnect.
- Unit tests cover: profile creation anonymity (no PII fields), localStorage round-trip, queue flush, and payload shape asserting the absence of identity fields.

## 4. Web Research Required

The assignee MUST run at least 4 of these queries and cite sources in the PR:
1. `Supabase RLS anonymous insert policy without auth row owner via client token`
2. `localStorage offline queue sync pattern reconnect flush JavaScript`
3. `COPPA GDPR children data minimization anonymous profiles no PII design`
4. `supabase-js upsert offline-first retry exponential backoff example`
5. `crypto randomUUID browser support fallback nanoid`
6. `Row Level Security policy USING WITH CHECK profile_id example postgres`

## 5. Agent Session Prompt

```text
You are an autonomous coding agent in repo /home/belal/proyectosSWAL/apps/worldexams.
Issue C2.05: create saberparatodos/src/lib/cuentos/progreso.ts (+ test, + SQL migration)
anonymous child profiles, localStorage-first progress, Supabase RLS sync, NO identity.
FIRST read: docs/CUENTOS/00_BIBLIA.md, docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md,
docs/CUENTOS/WAVE_PLAN.md (ola C2 table), saberparatodos/AGENTS.md (Supabase rules:
never expose SERVICE_ROLE_KEY, validate inputs), an existing supabase migration +
supabase-js usage in saberparatodos/src for client patterns.
Constraints: Svelte 5 runes in any UI glue; ABSOLUTE zero identity in payload
(BR-03/BR-07: no names, emails, device IDs — UUID + fixed nickname list only);
anon key only, RLS enforced; offline-first; neutral Spanish; absolute paths.
Verify with: npm run test -- progreso ; npx supabase db lint (if available).
Done = tests pass + no empty PR.
```

## 6. Existing Code Patterns

- `saberparatodos/AGENTS.md` Supabase rules — anon key client-side only, `SERVICE_ROLE_KEY` never in frontend, validate inputs before insert/update.
- Existing `supabase-js` client usage + migrations inside `saberparatodos/` — copy the client import path and migration naming convention exactly.
- Existing `*.test.ts` under `saberparatodos/` — Vitest patterns for mocking `localStorage` and the Supabase client.
- `saberparatodos/src/lib/` utilities — module style for `progreso.ts`.

## 7. Acceptance Criteria (command-verifiable)

- [ ] `createProfile()` yields `{ id: UUID, nickname: from fixed list }` — test asserts NO name/email/device fields exist on the object.
- [ ] Progress round-trips through `localStorage` (save page 5, reload equivalent, read back page 5).
- [ ] Sync payload type has no identity fields — enforced by a test that fails if keys outside the allow-list appear.
- [ ] RLS migration applies cleanly and anon role CANNOT read other profiles' rows (verified via SQL check or documented `psql` probe).
- [ ] Offline writes queue locally and flush on reconnect (test with mocked client offline/online).
- [ ] `npm run test -- progreso` passes: `cd saberparatodos && npm run test -- progreso`.

## 8. Files to Modify

| File | Action | Risk |
|------|--------|------|
| `saberparatodos/src/lib/cuentos/progreso.ts` | CREATE | Medium (privacy-critical logic) |
| `saberparatodos/src/lib/cuentos/progreso.test.ts` | CREATE | Low |
| `saberparatodos/supabase/migrations/*_cuento_progreso.sql` (follow existing naming) | CREATE | Medium-High (DB change, RLS must be correct) |

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
cd saberparatodos && npm run test -- progreso
ls src/lib/cuentos/progreso.ts
grep -rni "email\|nombre\|name\|device" src/lib/cuentos/progreso.ts || echo "NO_IDENTITY_OK"
```

### Dependencies & Merge Order

- Merge order position: **5 of 6** in ola C2.
- Depends on C1 schema (progress references story slugs). Independent UI-wise from C2.01-C2.04; C2.01/C2.03 call its hooks after merge. E2E (C2.06) asserts restore. Merge FIFTH.

### Failure Recovery

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| PII slips into payload | Free-text nickname input | Nickname from FIXED word list only, type-level allow-list test |
| RLS too permissive | `USING (true)` policy | Restrict to `profile_id`, negative test with second profile |
| Sync wipes local progress | Last-write-wins without clock | `updatedAt` comparison, local-first merge, queue on failure |
| Service key in frontend | Copied server example | Grep for SERVICE_ROLE in diff — must be absent |
