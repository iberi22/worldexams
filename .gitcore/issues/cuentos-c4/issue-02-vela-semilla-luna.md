# [Ola C4.02] feat-cuentos-b: Vela la niña astronauta y la semilla de la Luna (curiosidad con método)

> Ola C4 — Cuentos 06-10 (molde C3). Merge order: 2/5 | Risk: LOW | Effort: Medium 3-4h
> Disjoint island: `questions_data/cuentos/vela-semilla-luna/` only.

---

## 1. Current State (MEDIBLE)

- Dir: `questions_data/cuentos/vela-semilla-luna/` does NOT exist (0 files).
- Feature: `feat-cuentos-b` (C4) at 0% — cuentos 06-10 missing; seed `tana-tucan-comparte/cuento.md` exists as format reference.
- Infra (ola C1, assumed): `saberparatodos/src/lib/cuentos/cuento-schema.ts` (frontmatter v1), `saberparatodos/scripts/validate_cuentos.js` (validator).
- Evidence: `ls questions_data/cuentos/` shows only `LICENSE-CONTENT.md` + `tana-tucan-comparte`.

## 2. Desired State (DELTA — bible beats + quiz, inline, OBLIGATORIO)

Create `questions_data/cuentos/vela-semilla-luna/cuento.md` — FULL text, neutral Spanish, format v1:

- Frontmatter: `slug: "vela-semilla-luna"`, titulo `"Vela la niña astronauta y la semilla de la Luna"`, `edad: "4-6"`, `idioma: "es-neutro"`, `eje: "espacio"`, `habitat: "sistema-solar"`, `valor: "curiosidad"`, `personajes: ["vela", "tuerca", "abuela"]`, `paginas: 8`, `license: "PROPRIETARY-FREE-READ"`, `version: 1`.
- First line: `<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. Lectura gratuita, prohibida su reproducción. -->`
- 8 pages, 30-80 words/page, 1 idea per page, short sentences, each with `![alt: ...](escenas/pN-....svg)`.
- Beats (copy from bible, do NOT invent new plot): 1) Vela (6-year-old girl) wants to plant on the Moon; 2) she asks: what does a seed need?; 3) robot Tuerca shows data: no air, no water; 4) home experiment: 3 glasses (light+water, no water, no light); 5) they observe for 7 suns (days); 6) conclusion: on the Moon a little glass house (greenhouse/invernadero) would be needed; 7) they draw the lunar base with greenhouse; 8) moral: asking and testing is how astronauts travel ("preguntar y probar es como viajan los astronautas").
- Learning thread: basic solar system (Sun, Earth, Moon), day/night, plants need light + water. Facts must be CORRECT: the Moon has no air to breathe and almost no water; the Sun gives light and warmth; day/night is Earth turning.
- Quiz: Q1 ¿Qué necesita una semilla? (luz y agua) / Q2 ¿Qué pasó con cada vaso? (solo creció el de luz+agua) / Q3 ¿Qué inventó Vela para la Luna? (una casita de cristal / invernadero). Format: 3 `### Pregunta`, 3 options A-C each, exactly one `- [x]`, EVERY option with `<!-- feedback: ... -->`, plus final `### Explicacion`.
- Art: 3 character SVGs `personajes/vela.svg`, `personajes/tuerca.svg`, `personajes/abuela.svg` (Vela signature #5B6FD6; viewBox `0 0 200 200`, big eyes template, friendly robot with round shapes, copyright comment first line, <25KB) + 8 scene SVGs `escenas/p1..p8-*.svg` (800x450, 3 planes, ≤60 nodes, <60KB, no text inside, no PNG/base64).

## 3. Web Research Required (4-6 queries, MANDATORY before writing)

1. search: "solar system basics preschool Sun Earth Moon simple facts"
2. search: "why plants need light water experiment kids three cups"
3. search: "Moon no atmosphere no water facts for children"
4. search: "greenhouse how it works simple explanation kids"
5. search: "español neutro infantil evitar modismos"
6. search: "SVG night sky stars preschool book flat vector"

## 4. Agent Session Prompt

"Before writing, please: 1. Read `docs/CUENTOS/00_BIBLIA.md` §07 + `02_COPYRIGHT_Y_FORMATO.md` (format v1 + veto list) + `01_DIRECCION_ARTE.md`. 2. Read `questions_data/cuentos/tana-tucan-comparte/cuento.md` + `personajes/tana.svg` and MIMIC structure/art style. 3. Research the queries above (solar system + seed experiment facts — NO invented science). 4. Draft 8 pages counting words (30-80/page). 5. Run the validator until 0 errors."

## 5. Existing Code Patterns (MUST follow — seed)

- `questions_data/cuentos/tana-tucan-comparte/cuento.md` → copyright first line, frontmatter v1, `## Pagina N` + `![alt: ...]`, `## Quiz` + feedback + `### Explicacion`.
- `questions_data/cuentos/tana-tucan-comparte/personajes/tana.svg` → copyright comment, viewBox 200x200, ellipse/circle construction, eyes template, signature color.
- `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` §2 veto list → validator rejects on match.

## 6. Acceptance Criteria (VERIFICABLES POR COMANDO)

- [ ] `test -f questions_data/cuentos/vela-semilla-luna/cuento.md`
- [ ] `node saberparatodos/scripts/validate_cuentos.js -- questions_data/cuentos/vela-semilla-luna/cuento.md; echo $?` == 0
- [ ] `grep -c "^## Pagina" questions_data/cuentos/vela-semilla-luna/cuento.md` between 8 and 10
- [ ] Every page 30-80 words (validator checks)
- [ ] `grep -c "^### Pregunta" .../cuento.md` == 3 && `grep -c "^- \[x\]" .../cuento.md` == 3 && `grep -c "### Explicacion" .../cuento.md` == 1
- [ ] `grep -c "feedback:" .../cuento.md` >= 9
- [ ] `head -1 .../cuento.md | grep -c "© 2026 SaberParaTodos"` == 1 && `grep -c 'license: "PROPRIETARY-FREE-READ"' .../cuento.md` == 1
- [ ] `grep -ciE "pesos|dólares|dolares|euros|soles|quetzal|guaraní|guarani|lempira|córdoba|cordoba|balboa|colón|colon|vos |tenés|tenes|hacé|hace|mirá|mira|che |parce|compa|chido|chévere|chevere|bacán|bacan" .../cuento.md` == 0 (veto)
- [ ] Science facts correct: mentions Sun/Earth/Moon, seed needs light+water, Moon has no air/water (`grep -ci "invernadero\|casita de cristal" .../cuento.md` >= 1)
- [ ] `ls questions_data/cuentos/vela-semilla-luna/personajes/*.svg | wc -l` between 2 and 4
- [ ] `ls questions_data/cuentos/vela-semilla-luna/escenas/*.svg | wc -l` between 8 and 10
- [ ] `grep -rc "image\|base64" questions_data/cuentos/vela-semilla-luna/ | grep -v ":0" | wc -l` == 0
- [ ] Each SVG first line `© 2026 SaberParaTodos`; `find ... -name "*.svg" -size +60k | wc -l` == 0

## 7. Files to Modify

| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `questions_data/cuentos/vela-semilla-luna/cuento.md` | NEW | Full text v1: 8 pages + quiz + Explicacion | LOW |
| `questions_data/cuentos/vela-semilla-luna/personajes/{vela,tuerca,abuela}.svg` | NEW | 3 SVGs, Vela #5B6FD6 | LOW |
| `questions_data/cuentos/vela-semilla-luna/escenas/p1..p8-*.svg` | NEW | 8 scene SVGs 800x450 | LOW |

## 8. DO NOT touch (Anti-Regression)

- `questions_data/cuentos/<any-other-slug>/` — other islands
- `saberparatodos/scripts/validate_cuentos.js`, `src/lib/cuentos/*`, lector/components — C1/C2 islands
- `.gitcore/features.json` — reconciled at wave end
- `apps/worldexams-api/public/v1/packs` — never by hand
- No new npm deps; no secrets; no `$SWAL`/karma/telemetry (BR-03)

## 9. Anti-Hallucination Guard ⚠️

1. **READ before write**: seed files + 3 docs COMPLETOS first.
2. **Bible is law**: beats + quiz from `00_BIBLIA.md` §07 — no new planets, aliens, or plot changes.
3. **No invented science**: Moon/Earth/Sun facts must match web research; cite sources in PR body.
4. **Veto list is hard**: neutral Spanish only.
5. **No invented validator flags**: check real CLI before asserting usage.

## 10. PR Delivery Requirements (ANTI-EMPTY-PR) — OBLIGATORIO

- [ ] `git status --porcelain` shows new files BEFORE opening PR
- [ ] `git diff --stat HEAD` non-empty; PR contains ≥12 files (1 md + ≥11 svg)
- [ ] `wc -w questions_data/cuentos/vela-semilla-luna/cuento.md` >= 240
- [ ] If incomplete: NO PR — comment blocker
- [ ] PR body: validator output + science sources (2+ links) + §6 checklist

## 11. Verification

```bash
node saberparatodos/scripts/validate_cuentos.js -- questions_data/cuentos/vela-semilla-luna/cuento.md
grep -c "^## Pagina" questions_data/cuentos/vela-semilla-luna/cuento.md
grep -c "^- \[x\]" questions_data/cuentos/vela-semilla-luna/cuento.md
ls questions_data/cuentos/vela-semilla-luna/personajes/ questions_data/cuentos/vela-semilla-luna/escenas/
find questions_data/cuentos/vela-semilla-luna -name "*.svg" -size +60k | wc -l  # expect 0
```

## 12. Dependencies & Merge Order

- **Depends on:** C1 (schema C1.01 + validator C1.02); if validator missing, follow format v1 literally.
- **Parallel with:** C4.01, C4.03-C4.05 (disjoint slug islands).
- **Merge order within wave:** 2/5.
- **Expected effort:** Medium 3-4h.

## 13. Failure Recovery

| If this happens | Action |
|----------------|--------|
| Validator missing | Format v1 literal + manual grep checks; note in PR |
| Word count fails | Rebalance 30-80/page, 1 idea/page |
| Veto flagged | Neutral synonym, re-run |
| Science doubt (e.g. water on Moon) | Keep bible wording ("sin aire ni agua"), cite NASA kids sources in PR |
| SVG too heavy | Simplify, reuse piezas, re-check 60 nodes/60KB |
| PR conflicts | Rebase on main, re-verify, never touch other slugs |
