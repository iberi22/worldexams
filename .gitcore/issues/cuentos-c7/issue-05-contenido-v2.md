# [Ola C7.05] feat-cuentos-c7: contenido v2 — hint + words en 10 cuentos + validador/schema/packs

> Ola C7 redesign part B — Content v2. Merge order: FIRST (1/4, blocks 06-08) | Risk: MEDIUM | Effort: Large 5-6h
> Disjoint island: `saberparatodos/scripts/validate_cuentos.js` + `saberparatodos/src/lib/cuentos/cuento-schema.ts` (+ tests) + `saberparatodos/scripts/generate-cuento-packs.js` + `questions_data/cuentos/*/cuento.md` (10 files, hint/words only — NO prose rewrites).

---

## 1. Current State (MEDIBLE)

- 10 cuentos exist in format v1 (`docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` §3): `ls questions_data/cuentos/` shows `bruno-zorro-paciencia don-emilio-mina lila-tortuga-red lucia-puentes nieve-osa-hielo puente-roto-pipo-mia tana-tucan-comparte tomas-casa-arbol vela-semilla-luna zara-jirafa-mira` (10 slugs + `LICENSE-CONTENT.md`).
- Format v1 pages carry only `## Pagina N` + `![alt: ...](escenas/...)` + text. Zero pages carry a caregiver prompt or vocabulary list: `grep -rc "Pista (familia)\|Palabras nuevas" questions_data/cuentos/*/cuento.md | grep -v ":0" | wc -l` == 0.
- Validator `saberparatodos/scripts/validate_cuentos.js` checks frontmatter, 8-10 pages, quiz 3x3, alt, copyright header, veto list — it knows NOTHING about hint/words.
- Schema `saberparatodos/src/lib/cuentos/cuento-schema.ts`: `CuentoPagina` = `{ n, alt, imagen, texto, wordCount }` — no `hint`, no `words`.
- Pack generator `saberparatodos/scripts/generate-cuento-packs.js` emits v1 fields only into `saberparatodos/public/v1/cuentos/`.

## 2. Desired State (DELTA — format v2, backward compatible)

Extend the pipeline end-to-end, then fill content for all 10 cuentos:

1. **Format v2 (additive, per page):** after each page's text, exactly two lines:
   ```markdown
   > Para conversar en familia: <1-2 frases, imperativo amable, español neutro>
   **Palabras nuevas:** <palabra1>, <palabra2>, <palabra3>
   ```
   Rules: hint 8-35 words, no questions to the child that demand an answer (prompt the caregiver, e.g. "Señala la luna y cuenta con tu hija..."); 2-4 words, lowercase, each MUST appear verbatim in that page's text (case-insensitive match); veto list (`02_COPYRIGHT_Y_FORMATO.md` §2) applies to hint + words too; NO country/city/currency/real-institution references (BR-07).
2. **Validator:** ERROR (exit != 0) if any page lacks hint or words, if a word is absent from its page text, or if hint/words hit the veto list. After this wave, v1-without-v2 FAILS validation — that is the point. Error messages in neutral Spanish with `file:line`.
3. **Schema (backward compatible):** `CuentoPagina` gains `hint: string` + `words: string[]`. `parseCuentoMd` NEVER throws on missing v2 lines (defaults `''` / `[]`) so v1 readers and old packs keep working.
4. **Packs (additive):** every page object in `public/v1/cuentos/<slug>.json` gains `hint` + `words`; add top-level `"format": 2`. No v1 field removed or renamed.
5. **Content:** add hint + words to EVERY page of ALL 10 `cuento.md` files. Prose, quiz, `Explicacion`, frontmatter, copyright header UNTOUCHED (byte-identical outside the added lines).

## 3. Web Research Required (4-6 queries, MANDATORY before writing)

1. search: "dialogic reading prompts parents preschool picture books examples"
2. search: "preguntas para conversar en familia lectura niños 3-6 años lectura dialógica"
3. search: "how to choose vocabulary words preschool read-aloud tier 2 words"
4. search: "español neutro infantil lista de modismos evitar cuentos"
5. search: "storybook caregiver prompt hint UX kids reading app"

## 4. Agent Session Prompt

"Before writing, please: 1. Read `docs/CUENTOS/00_BIBLIA.md` (character voices, 1 page per cuento is enough context) + `02_COPYRIGHT_Y_FORMATO.md` FULL (§1 copyright, §2 veto list, §3 format v1) + `docs/CUENTOS/REDISENO_STORYCOMET.md` §1 item 5 (the `hint`/`words` model) + `docs/CUENTOS/WAVE_PLAN.md` (hard constraints). 2. Read `saberparatodos/scripts/validate_cuentos.js` + `saberparatodos/src/lib/cuentos/cuento-schema.ts` + `saberparatodos/scripts/generate-cuento-packs.js` COMPLETOS before editing. 3. Research the queries above (dialogic reading + Tier-2 vocabulary). 4. Implement validator+schema+packs FIRST, regenerate packs, THEN write hint/words for all 10 cuentos. 5. Run every command in §11 and fix until green."

## 5. Existing Code Patterns (MUST follow)

- `saberparatodos/scripts/validate_cuentos.js` → `EXPECTED_HEADER`, `VETO_TOKENS`, per-file error accumulation, exit code contract. Add v2 checks in the same style (same error collector, Spanish messages).
- `saberparatodos/src/lib/cuentos/cuento-schema.ts` → `parseCuentoMd` (gray-matter, `CuentoParseError` with file/line). Parse the two v2 lines with line-anchored regexes; never throw on absence.
- `saberparatodos/scripts/generate-cuento-packs.js` → `--all / --changed-only / --slug=` CLI, reads `questions_data/cuentos/`, writes `public/v1/cuentos/`. Reuse its page splitter; add `hint`/`words`/`format`.
- `questions_data/cuentos/tana-tucan-comparte/cuento.md` → canonical page/quiz shape; v2 lines go AFTER page text, BEFORE the next `## Pagina` / `## Quiz`.
- Unit tests live next to code: `cuento-schema.test.ts`, `validate_cuentos.test.js` — extend, never delete cases.

## 6. Acceptance Criteria (VERIFICABLES POR COMANDO)

- [ ] `node saberparatodos/scripts/validate_cuentos.js --all` (or without `--all` if the flag differs — read the script first) exits 0.
- [ ] Per cuento: `for d in questions_data/cuentos/*/; do echo "$d $(grep -c '^## Pagina' $d/cuento.md) $(grep -c 'Para conversar en familia' $d/cuento.md) $(grep -c 'Palabras nuevas' $d/cuento.md)"; done` — the three numbers EQUAL per row (8-10 each).
- [ ] Every `Palabras nuevas` line has 2-4 comma-separated lowercase tokens: spot-check + validator enforces.
- [ ] Every listed word appears in its page text (validator enforces; spot: pick 3 pages, `grep -i` each word).
- [ ] `grep -riE "pesos|dólares|dolares|euros|soles|quetzal|guaraní|guarani|lempira|córdoba|cordoba|balboa|colón| vos |tenés|tenes|hacé|hace |mirá|mira |che |parce|compa|chido|chévere|chevere|bacán|bacan|platicar" questions_data/cuentos/*/cuento.md | wc -l` == 0 (veto holds on new lines too).
- [ ] Copyright intact: `head -1 questions_data/cuentos/*/cuento.md | grep -c "© 2026 SaberParaTodos"` == 10.
- [ ] `npx vitest run src/lib/cuentos` (cwd `saberparatodos`) green, INCLUDING a new backward-compat test: parsing a v1 page without v2 lines yields `hint: ''`, `words: []` and does NOT throw.
- [ ] `node saberparatodos/scripts/generate-cuento-packs.js --all && node -e "const fs=require('fs');const p='saberparatodos/public/v1/cuentos/tana-tucan-comparte.json';const j=JSON.parse(fs.readFileSync(p));if(j.format!==2)throw 0;const bad=j.paginas||j.pages||[];if(!bad.length||bad.some(pg=>typeof pg.hint!=='string'||!Array.isArray(pg.words)||!pg.words.length))throw 1;console.log('pack v2 OK, pages:',bad.length)"` passes.
- [ ] Prose untouched: `git diff --stat` on the 10 `cuento.md` shows ONLY added lines (`git diff | grep -c "^-[^-]"` == 0).
- [ ] Existing lector e2e (`saberparatodos/tests/e2e/cuentos-lector.spec.ts`) stays green — v2 lines must not break the reader (run with the project's configured runner).
- [ ] Visual: desktop + mobile screenshots of one spread (e.g. Tana p1) showing the hint rendered in the reader (capture paths committed under `docs/CUENTOS/review/`).

## 7. Files to Modify

| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/scripts/validate_cuentos.js` | v1 checks only | Add v2 ERROR checks (missing hint/words, word-in-text, veto on new lines) | MEDIUM — touches shared gate |
| `saberparatodos/scripts/validate_cuentos.test.js` | v1 cases | Add v2 pass/fail cases (missing hint, word absent, veto in hint) | LOW |
| `saberparatodos/src/lib/cuentos/cuento-schema.ts` | `CuentoPagina` v1 | Add `hint`, `words`; lenient parse | LOW |
| `saberparatodos/src/lib/cuentos/cuento-schema.test.ts` (or `cuentos-catalog.test.ts` if that hosts parser tests — check first) | existing | Backward-compat test (v1 parses, defaults) | LOW |
| `saberparatodos/scripts/generate-cuento-packs.js` | emits v1 | Emit `hint`/`words` per page + `"format": 2` | MEDIUM — feeds offline/PWA |
| `saberparatodos/public/v1/cuentos/*.json` | v1 packs | REGENERATED via script, never by hand | LOW |
| `questions_data/cuentos/<10 slugs>/cuento.md` | v1 prose | Append the 2 v2 lines per page only | LOW per file, MEDIUM in bulk |

## 8. DO NOT touch (Anti-Regression)

- `saberparatodos/src/components/cuentos/**` — lector/arte islands belong to C7.06-C7.08 (parallel after this issue).
- `saberparatodos/src/pages/cuentos/**` — C7.01-C7.04 island (part A).
- `saberparatodos/public/audio/cuentos/**` — MP3s generated by orchestrator; C7.07 consumes them.
- `.gitcore/features.json` — reconciled at wave end by orchestrator.
- `apps/worldexams-api/public/v1/packs` — weekly-exam packs, unrelated to cuento packs.
- Quiz blocks, `### Explicacion`, frontmatter, prose wording inside the 10 `cuento.md` — v2 ADDS lines only.
- No new npm deps; no secrets; no `$SWAL`/karma/telemetry anywhere near kids flows (BR-03); content stays unlisted (`noindex`, out of sitemap — WAVE_PLAN.md "Privado no-listado").

## 9. Anti-Hallucination Guard ⚠️

1. **READ before write**: validator + schema + pack generator COMPLETOS. Do not assume CLI flags (`--all`, `--slug=`) — read `process.argv` handling first.
2. **Added lines only**: any `-` line in `git diff` for `cuento.md` prose/quiz/frontmatter = instant fail. Verify with the §6 grep before pushing.
3. **Words must be real**: every vocabulary word verbatim in its page text — check with `grep -i`, never by eye.
4. **Veto list is hard**: hints are new prose and the easiest place to slip a modismo. Run the §6 veto grep on every commit.
5. **No invented pack shape**: read what the generator currently emits (run it on one slug, inspect JSON) before adding fields; keep every v1 key.
6. **Neutral means neutral**: no countries, cities, currencies, real institutions, voseo, or diminutives-as-dialect in hints (BR-07).

## 10. PR Delivery Requirements (ANTI-EMPTY-PR) — OBLIGATORIO

- [ ] `git status --porcelain` shows modified/new files BEFORE opening PR.
- [ ] `git diff --stat HEAD` non-empty; PR touches ≥15 files (3 code + ≥2 tests + 10 md + regenerated packs).
- [ ] Validator output for all 10 cuentos pasted in PR body + §6 checklist with commands run.
- [ ] Pack v2 proof pasted: the `node -e` JSON assertion output from §6.
- [ ] If work incomplete: NO PR — comment blocker on issue.

## 11. Verification

```bash
node saberparatodos/scripts/validate_cuentos.js --all
for d in questions_data/cuentos/*/; do echo "$d $(grep -c '^## Pagina' $d/cuento.md) $(grep -c 'Para conversar en familia' $d/cuento.md) $(grep -c 'Palabras nuevas' $d/cuento.md)"; done
git diff | grep -c "^-[^-]"  # expect 0
head -1 questions_data/cuentos/*/cuento.md | grep -c "© 2026 SaberParaTodos"  # expect 10
cd saberparatodos && npx vitest run src/lib/cuentos && node scripts/generate-cuento-packs.js --all
```

## 12. Dependencies & Merge Order

- **Depends on:** merged C1-C5 (validator/schema/packs exist) + part-A C7.01-C7.04 merged (reader renders pages; hint display needs a reader, but this issue does NOT touch the reader).
- **Blocks:** C7.06, C7.07, C7.08 — all three consume v2 packs/content. Merge THIS issue first.
- **Parallel with:** nothing in part B until merged.
- **Merge order within wave:** 1/4 (FIRST).
- **Expected effort:** Large 5-6h (3 pipeline files + tests + 80-100 hint/word blocks in neutral Spanish).

## 13. Failure Recovery

| If this happens | Action |
|----------------|--------|
| Validator flag differs from `--all` | Read argv parsing in the script; use the real flag; note it in the PR |
| A vocabulary word legitimately needs a form absent from the page (plural, diminutive) | Change the WORD to match the text, never the prose |
| Hint exceeds word budget | Shorten to 1 sentence; keep the caregiver action concrete (point, count, mimic, ask) |
| Pack regeneration diffs unrelated slugs | Regenerate with `--changed-only` if supported, else commit full regen and note it |
| PR conflicts with parallel C7 branches | Rebase on main; this issue merges FIRST so others rebase onto it, not vice versa |
