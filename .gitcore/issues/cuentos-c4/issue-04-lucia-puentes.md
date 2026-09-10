# [Ola C4.04] feat-cuentos-b: Lucía construye puentes (ingeniera, el error enseña)

> Ola C4 — Cuentos 06-10 (molde C3). Merge order: 4/5 | Risk: LOW | Effort: Medium 3-4h
> Disjoint island: `questions_data/cuentos/lucia-puentes/` only.

---

## 1. Current State (MEDIBLE)

- Dir: `questions_data/cuentos/lucia-puentes/` does NOT exist (0 files).
- Feature: `feat-cuentos-b` (C4) at 0%; seed `tana-tucan-comparte/cuento.md` is the format reference.
- Infra (ola C1, assumed): `saberparatodos/src/lib/cuentos/cuento-schema.ts`, `saberparatodos/scripts/validate_cuentos.js`.
- Evidence: `ls questions_data/cuentos/` shows only `LICENSE-CONTENT.md` + `tana-tucan-comparte`.

## 2. Desired State (DELTA — bible beats + quiz, inline, OBLIGATORIO)

Create `questions_data/cuentos/lucia-puentes/cuento.md` — FULL text, neutral Spanish, format v1. TONE: error-teaches — fallen stick bridges are joyful experiments, never shame; studying turns failure into the bridge that holds.

- Frontmatter: `slug: "lucia-puentes"`, titulo `"Lucía construye puentes"`, `edad: "5-6"`, `idioma: "es-neutro"`, `eje: "oficios"`, `habitat: "ingenieria"`, `valor: "perseverar"`, `personajes: ["lucia", "nico", "maestra"]`, `paginas: 8`, `license: "PROPRIETARY-FREE-READ"`, `version: 1`.
- First line: `<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. Lectura gratuita, prohibida su reproducción. -->`
- 8 pages, 30-80 words/page, 1 idea per page, each with `![alt: ...](escenas/pN-....svg)`.
- Beats (copy from bible): 1) two villages separated by the river never visit each other; 2) Lucía as a girl built stick bridges (they fell); 3) she studied: the ARCH shares the weight; 4) model that holds 10 stones; 5) the real bridge: plans, measurements, team; 6) opening day: Nico crosses first; 7) the villages hold a market together; 8) moral: every fallen bridge teaches how to make the one that holds ("cada puente caído enseña a hacer el que aguanta").
- Learning thread: arches and structures, plans and models, measuring. Keep physics kid-true: the arch spreads weight to the sides; measuring with steps/string/ruler.
- Quiz: Q1 ¿Por qué se caían los puentes de palitos? (no repartían el peso / les faltaba el arco) / Q2 ¿Qué reparte el peso? (el arco) / Q3 ¿Qué unió el puente además del río? (a los dos pueblos / el mercado). Format: 3 `### Pregunta`, 3 options A-C, exactly one `- [x]`, EVERY option with `<!-- feedback: ... -->`, plus `### Explicacion`.
- Art: 3 SVGs `personajes/lucia.svg` (engineer girl, signature #E26D5A), `personajes/nico.svg` (brother), `personajes/maestra.svg` — viewBox 200x200, round shapes, eyes template, copyright first line, <25KB + 8 scenes 800x450 ≤60 nodes <60KB, no text inside, no PNG/base64.

## 3. Web Research Required (4-6 queries, MANDATORY before writing)

1. search: "arch bridge how it works weight distribution explained kids"
2. search: "arco puente reparte peso explicación niños"
3. search: "kids build stick bridges STEM fall learn perseverance"
4. search: "measurement activities preschoolers steps string ruler"
5. search: "español neutro infantil evitar modismos"
6. search: "SVG bridge arch flat children book illustration"

## 4. Agent Session Prompt

"Before writing, please: 1. Read `docs/CUENTOS/00_BIBLIA.md` §09 + `02_COPYRIGHT_Y_FORMATO.md` + `01_DIRECCION_ARTE.md`. 2. Read seed `tana-tucan-comparte/cuento.md` + `personajes/tana.svg`, MIMIC exactly. 3. Research arch engineering kid-facts (NO invented physics). 4. Draft 8 pages (30-80 words), error-teaches tone. 5. Validate until 0 errors."

## 5. Existing Code Patterns (MUST follow — seed)

- `questions_data/cuentos/tana-tucan-comparte/cuento.md` → copyright first line, frontmatter v1, `## Pagina N` + alt scenes, `## Quiz` + feedback + `### Explicacion`.
- `questions_data/cuentos/tana-tucan-comparte/personajes/tana.svg` → copyright comment, 200x200, eyes template, signature color.
- `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` §2 veto list.

## 6. Acceptance Criteria (VERIFICABLES POR COMANDO)

- [ ] `test -f questions_data/cuentos/lucia-puentes/cuento.md`
- [ ] `node saberparatodos/scripts/validate_cuentos.js -- questions_data/cuentos/lucia-puentes/cuento.md; echo $?` == 0
- [ ] `grep -c "^## Pagina" .../cuento.md` between 8 and 10; every page 30-80 words
- [ ] `grep -c "^### Pregunta" .../cuento.md` == 3 && `grep -c "^- \[x\]" .../cuento.md` == 3 && `grep -c "### Explicacion" .../cuento.md` == 1
- [ ] `grep -c "feedback:" .../cuento.md` >= 9
- [ ] `head -1 .../cuento.md | grep -c "© 2026 SaberParaTodos"` == 1 && `grep -c 'license: "PROPRIETARY-FREE-READ"' .../cuento.md` == 1
- [ ] `grep -ciE "pesos|dólares|dolares|euros|soles|quetzal|guaraní|guarani|lempira|córdoba|cordoba|balboa|colón|colon|vos |tenés|tenes|hacé|hace|mirá|mira|che |parce|compa|chido|chévere|chevere|bacán|bacan" .../cuento.md` == 0 (veto)
- [ ] Bible anchors: `grep -ci "arco" .../cuento.md` >= 2 && `grep -ci "10 piedras\|diez piedras" .../cuento.md` >= 1 && `grep -ci "mercado" .../cuento.md` >= 1
- [ ] `ls .../personajes/*.svg | wc -l` 2-4; `ls .../escenas/*.svg | wc -l` 8-10
- [ ] `grep -rc "image\|base64" questions_data/cuentos/lucia-puentes/ | grep -v ":0" | wc -l` == 0
- [ ] SVG first lines carry `© 2026 SaberParaTodos`; `find ... -name "*.svg" -size +60k | wc -l` == 0

## 7. Files to Modify

| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `questions_data/cuentos/lucia-puentes/cuento.md` | NEW | Full text v1: 8 pages + quiz | LOW |
| `questions_data/cuentos/lucia-puentes/personajes/{lucia,nico,maestra}.svg` | NEW | 3 SVGs, Lucía #E26D5A | LOW |
| `questions_data/cuentos/lucia-puentes/escenas/p1..p8-*.svg` | NEW | 8 scenes 800x450 | LOW |

## 8. DO NOT touch (Anti-Regression)

- `questions_data/cuentos/<any-other-slug>/` — other islands
- Validator/schema/lector code (C1/C2 islands)
- `.gitcore/features.json` — wave-end reconciliation
- `apps/worldexams-api/public/v1/packs` — never by hand
- No new npm deps; no secrets; no `$SWAL`/karma/telemetry (BR-03); no real places/institutions

## 9. Anti-Hallucination Guard ⚠️

1. **READ before write**: seed + 3 docs COMPLETOS.
2. **Bible is law**: §09 beats — arch, 10 stones, Nico first, market; no extra inventions.
3. **No invented physics**: arch spreads weight — keep to researched kid-true wording.
4. **Veto list is hard**: neutral Spanish only.
5. **No invented validator flags**: verify real CLI first.

## 10. PR Delivery Requirements (ANTI-EMPTY-PR) — OBLIGATORIO

- [ ] `git status --porcelain` non-empty BEFORE PR
- [ ] `git diff --stat HEAD` non-empty; PR ≥12 files (1 md + ≥11 svg)
- [ ] `wc -w .../cuento.md` >= 240
- [ ] If incomplete: NO PR — comment blocker
- [ ] PR body: validator output + arch sources (2+ links) + §6 checklist

## 11. Verification

```bash
node saberparatodos/scripts/validate_cuentos.js -- questions_data/cuentos/lucia-puentes/cuento.md
grep -c "^## Pagina" questions_data/cuentos/lucia-puentes/cuento.md
grep -c "^- \[x\]" questions_data/cuentos/lucia-puentes/cuento.md
ls questions_data/cuentos/lucia-puentes/personajes/ questions_data/cuentos/lucia-puentes/escenas/
find questions_data/cuentos/lucia-puentes -name "*.svg" -size +60k | wc -l  # expect 0
```

## 12. Dependencies & Merge Order

- **Depends on:** C1 (schema + validator); if missing, format v1 literal.
- **Parallel with:** C4.01-C4.03, C4.05 (disjoint islands).
- **Merge order within wave:** 4/5.
- **Expected effort:** Medium 3-4h.

## 13. Failure Recovery

| If this happens | Action |
|----------------|--------|
| Validator missing | Format v1 literal + manual greps; note in PR |
| Physics wording doubt | Use researched phrasing (arch shares weight to sides); cite in PR |
| Veto/word-count fails | Neutral synonym / rebalance pages |
| SVG heavy | Simplify, reuse piezas |
| PR conflicts | Rebase on main, re-verify, never touch other slugs |
