# [Ola C4.01] feat-cuentos-b: El puente roto — Pipo y Mía deciden (honestidad)

> Ola C4 — Cuentos 06-10 (molde C3). Merge order: 1/5 | Risk: LOW | Effort: Medium 3-4h
> Disjoint island: `questions_data/cuentos/puente-roto-pipo-mia/` only.

---

## 1. Current State (MEDIBLE)

- Dir: `questions_data/cuentos/puente-roto-pipo-mia/` does NOT exist (0 files).
- Feature: `feat-cuentos-b` (C4) at 0% — cuentos 06-10 missing; seed `tana-tucan-comparte/cuento.md` exists as format reference.
- Infra (ola C1, assumed): `saberparatodos/src/lib/cuentos/cuento-schema.ts` (frontmatter v1), `saberparatodos/scripts/validate_cuentos.js` (validator).
- Evidence: `ls questions_data/cuentos/` shows only `LICENSE-CONTENT.md` + `tana-tucan-comparte`.

## 2. Desired State (DELTA — bible beats + quiz, inline, OBLIGATORIO)

Create `questions_data/cuentos/puente-roto-pipo-mia/cuento.md` — FULL text, neutral Spanish (español neutro panhispánico, §2 of `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md`), format v1:

- Frontmatter: `slug: "puente-roto-pipo-mia"`, titulo `"El puente roto: Pipo y Mía deciden"`, `edad: "5-6"`, `idioma: "es-neutro"`, `eje: "etica"`, `habitat: "bosque"`, `valor: "honestidad"`, `personajes: ["pipo", "mia", "bruno"]`, `paginas: 8`, `license: "PROPRIETARY-FREE-READ"`, `version: 1`.
- First line: `<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. Lectura gratuita, prohibida su reproducción. -->`
- 8 pages, 30-80 words/page, 1 idea per page, short sentences, each with `![alt: ...](escenas/pN-....svg)`.
- Beats (copy from bible, do NOT invent new plot): 1) Pipo y Mía (mapache siblings) play jumping and break one plank of the log bridge over the stream; 2) DILEMMA: stay silent and run, or warn; 3) Pipo wants silence from fear of scolding; 4) Mía says someone could fall; 5) together they warn Tejón Bruno (forest ranger); 6) small scolding + big help: the three repair it; 7) they put a sign "pasar de a uno" (cross one at a time); 8) moral: truth fixes more than silence ("la verdad arregla más que el silencio").
- Learning thread: cause and effect, repairing what is broken, apologizing.
- Quiz (exact questions): Q1 ¿Qué rompieron Pipo y Mía? (una tabla del puente) / Q2 ¿Qué quería hacer Pipo y qué dijo Mía? (callar por miedo / avisar porque alguien puede caerse) / Q3 ¿Qué hicieron después de avisar? (repararon el puente entre los tres + cartel). Format: 3 `### Pregunta`, 3 options A-C each, exactly one `- [x]`, EVERY option with `<!-- feedback: ... -->`, plus final `### Explicacion` (2-3 sentences for the caregiver).
- Art: 3 character SVGs `personajes/pipo.svg`, `personajes/mia.svg`, `personajes/bruno.svg` (Pipo/Mía signature #9B7EDE per `01_DIRECCION_ARTE.md`; viewBox `0 0 200 200`, circles+ovals, big eyes template, no sharp teeth/weapons, copyright comment first line, <25KB each) + 8 scene SVGs `escenas/p1..p8-*.svg` (viewBox `0 0 800 450`, 3 planes, ≤60 nodes, <60KB, no text inside SVG, no PNG/base64).

## 3. Web Research Required (4-6 queries, MANDATORY before writing)

1. search: "honesty dilemmas children's stories telling truth consequences"
2. search: "enseñar honestidad niños 5 años decir la verdad cuentos"
3. search: "cause and effect activities preschoolers repairing broken things"
4. search: "español neutro infantil evitar modismos lista veto"
5. search: "SVG flat characters preschool books big eyes thick strokes"

## 4. Agent Session Prompt

"Before writing, please: 1. Read `docs/CUENTOS/00_BIBLIA.md` §06 + `02_COPYRIGHT_Y_FORMATO.md` (format v1 + veto list) + `01_DIRECCION_ARTE.md` (§3-4). 2. Read `questions_data/cuentos/tana-tucan-comparte/cuento.md` + `personajes/tana.svg` and MIMIC structure/art style exactly. 3. Research the queries above (honesty dilemmas for kids). 4. Draft the 8 pages counting words per page (30-80). 5. Run the validator and fix until 0 errors."

## 5. Existing Code Patterns (MUST follow — seed)

- `questions_data/cuentos/tana-tucan-comparte/cuento.md` → copyright HTML first line, YAML frontmatter v1, `## Pagina N` + `![alt: ...](escenas/...)`, `## Quiz` + `### Pregunta N` + `- [x]/[ ]` + feedback comments + `### Explicacion`.
- `questions_data/cuentos/tana-tucan-comparte/personajes/tana.svg` → copyright comment, `viewBox="0 0 200 200"`, ellipse/circle construction, eyes template (white + pupil + shine), signature color.
- `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` §2 veto list → validator rejects on match.

## 6. Acceptance Criteria (VERIFICABLES POR COMANDO)

- [ ] `test -f questions_data/cuentos/puente-roto-pipo-mia/cuento.md`
- [ ] `node saberparatodos/scripts/validate_cuentos.js -- questions_data/cuentos/puente-roto-pipo-mia/cuento.md; echo $?` == 0
- [ ] `grep -c "^## Pagina" questions_data/cuentos/puente-roto-pipo-mia/cuento.md` between 8 and 10
- [ ] Every page 30-80 words (validator checks; spot: `awk '/^## Pagina/{p++}...'`)
- [ ] `grep -c "^### Pregunta" .../cuento.md` == 3 && `grep -c "^- \[x\]" .../cuento.md` == 3 && `grep -c "### Explicacion" .../cuento.md` == 1
- [ ] `grep -c "feedback:" .../cuento.md` >= 9 (every option has feedback)
- [ ] `head -1 .../cuento.md | grep -c "© 2026 SaberParaTodos"` == 1 && `grep -c 'license: "PROPRIETARY-FREE-READ"' .../cuento.md` == 1
- [ ] `grep -ciE "pesos|dólares|dolares|euros|soles|quetzal|guaraní|guarani|lempira|córdoba|cordoba|balboa|colón|colon|vos |tenés|tenes|hacé|hace|mirá|mira|che |parce|compa|chido|chévere|chevere|bacán|bacan" .../cuento.md` == 0 (veto)
- [ ] `ls questions_data/cuentos/puente-roto-pipo-mia/personajes/*.svg | wc -l` between 2 and 4
- [ ] `ls questions_data/cuentos/puente-roto-pipo-mia/escenas/*.svg | wc -l` between 8 and 10
- [ ] `grep -rc "image\|base64" questions_data/cuentos/puente-roto-pipo-mia/ | grep -v ":0" | wc -l` == 0 (pure vector)
- [ ] Each SVG first line contains `© 2026 SaberParaTodos`; each ≤60KB (`find ... -size +60k | wc -l` == 0)
- [ ] Quiz answers bible beats (tabla rota / Pipo callar-Mía avisar / reparar + cartel)

## 7. Files to Modify

| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `questions_data/cuentos/puente-roto-pipo-mia/cuento.md` | NEW | Full text v1: 8 pages + quiz + Explicacion | LOW |
| `questions_data/cuentos/puente-roto-pipo-mia/personajes/{pipo,mia,bruno}.svg` | NEW | 3 character SVGs, #9B7EDE accents | LOW |
| `questions_data/cuentos/puente-roto-pipo-mia/escenas/p1..p8-*.svg` | NEW | 8 scene SVGs 800x450 | LOW |

## 8. DO NOT touch (Anti-Regression)

- `questions_data/cuentos/<any-other-slug>/` — other islands (C3/C4 parallel)
- `saberparatodos/scripts/validate_cuentos.js`, `src/lib/cuentos/*`, lector/components — C1/C2 islands
- `.gitcore/features.json` — reconciled at wave end by orchestrator
- `apps/worldexams-api/public/v1/packs` — packs generated in C1.03/C5, never by hand
- No new npm deps; no secrets; no `$SWAL`/karma/telemetry in kids content (BR-03)

## 9. Anti-Hallucination Guard ⚠️

1. **READ before write**: read seed `cuento.md` + `tana.svg` + the 3 docs COMPLETOS before drafting.
2. **Bible is law**: beats + quiz above are copied from `00_BIBLIA.md` §06 — do NOT add characters, places, or plot twists.
3. **Veto list is hard**: any veto word fails validation; use neutral synonyms (auto→"auto (coche)" first use only if needed).
4. **No invented validator flags**: run `node saberparatodos/scripts/validate_cuentos.js -- --help` (or read it) for real CLI usage.
5. **Word counts are real**: count programmatically, never by eye.

## 10. PR Delivery Requirements (ANTI-EMPTY-PR) — OBLIGATORIO

- [ ] `git status --porcelain` shows new files BEFORE opening PR
- [ ] `git diff --stat HEAD` non-empty; PR contains ≥12 files (1 md + ≥11 svg)
- [ ] `wc -w questions_data/cuentos/puente-roto-pipo-mia/cuento.md` >= 240 (8 pages × 30 words minimum)
- [ ] If work incomplete: NO PR — comment blocker on issue
- [ ] PR body: validator output pasted + checklist of §6 with commands run

## 11. Verification

```bash
node saberparatodos/scripts/validate_cuentos.js -- questions_data/cuentos/puente-roto-pipo-mia/cuento.md
grep -c "^## Pagina" questions_data/cuentos/puente-roto-pipo-mia/cuento.md
grep -c "^- \[x\]" questions_data/cuentos/puente-roto-pipo-mia/cuento.md
ls questions_data/cuentos/puente-roto-pipo-mia/personajes/ questions_data/cuentos/puente-roto-pipo-mia/escenas/
find questions_data/cuentos/puente-roto-pipo-mia -name "*.svg" -size +60k | wc -l  # expect 0
```

## 12. Dependencies & Merge Order

- **Depends on:** C1 (schema C1.01 + validator C1.02) — if validator missing, follow `02_COPYRIGHT_Y_FORMATO.md` format v1 literally and note it in the PR.
- **Parallel with:** C4.02-C4.05 (disjoint slug islands, verified: no shared files).
- **Merge order within wave:** 1/5.
- **Expected effort:** Medium 3-4h (full prose + 11 SVGs).

## 13. Failure Recovery

| If this happens | Action |
|----------------|--------|
| Validator script missing (C1 not merged) | Follow format v1 doc literally; run grep checks of §6 manually; note in PR |
| Validator fails on word count | Rebalance words across pages (30-80), keep 1 idea/page |
| Veto word flagged | Replace with neutral synonym, re-run |
| SVG >60KB or >60 nodes | Simplify shapes, reuse piezas from `saberparatodos/src/components/cuentos/arte/piezas/` |
| PR conflicts | Rebase on main, re-run verification, never touch other slugs |
