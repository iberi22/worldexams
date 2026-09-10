# [Ola C4.05] feat-cuentos-b: Tomás y la casa que abraza el árbol (arquitecto, crear es abrazar)

> Ola C4 — Cuentos 06-10 (molde C3). Merge order: 5/5 | Risk: LOW | Effort: Medium 3-4h
> Disjoint island: `questions_data/cuentos/tomas-casa-arbol/` only.

---

## 1. Current State (MEDIBLE)

- Dir: `questions_data/cuentos/tomas-casa-arbol/` does NOT exist (0 files).
- Feature: `feat-cuentos-b` (C4) at 0%; seed `tana-tucan-comparte/cuento.md` is the format reference.
- Infra (ola C1, assumed): `saberparatodos/src/lib/cuentos/cuento-schema.ts`, `saberparatodos/scripts/validate_cuentos.js`.
- Evidence: `ls questions_data/cuentos/` shows only `LICENSE-CONTENT.md` + `tana-tucan-comparte`.

## 2. Desired State (DELTA — bible beats + quiz, inline, OBLIGATORIO)

Create `questions_data/cuentos/tomas-casa-arbol/cuento.md` — FULL text, neutral Spanish, format v1. TONE: create-not-remove — everyone says "cut it", Tomás says no and designs AROUND the tree; building never hurts roots.

- Frontmatter: `slug: "tomas-casa-arbol"`, titulo `"Tomás y la casa que abraza el árbol"`, `edad: "4-6"`, `idioma: "es-neutro"`, `eje: "oficios"`, `habitat: "arquitectura"`, `valor: "respeto"`, `personajes: ["tomas", "alba", "ceiba"]`, `paginas: 8`, `license: "PROPRIETARY-FREE-READ"`, `version: 1`.
- First line: `<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. Lectura gratuita, prohibida su reproducción. -->`
- 8 pages, 30-80 words/page, 1 idea per page, each with `![alt: ...](escenas/pN-....svg)`.
- Beats (copy from bible): 1) Tomás is asked for a house where a giant tree stands; 2) everyone says "cut it down"; 3) Tomás says no: he draws the house AROUND it; 4) hole for the trunk, roof with window to the sky; 5) they build without hurting roots; 6) the house hugs the tree and the tree gives shade; 7) Alba draws her first tree-house; 8) moral: creating is not removing, it is hugging ("crear no es quitar, es abrazar").
- Learning thread: shapes, materials (wood, clay/mud, glass), drawing plans. Tree is "Abuelo Ceiba" (generic, NO country). No real places/institutions.
- Quiz: Q1 ¿Qué querían cortar y por qué? (el árbol gigante, para hacer la casa) / Q2 ¿Qué inventó Tomás? (la casa alrededor del árbol, con hueco y ventana al cielo) / Q3 ¿Qué dibujó Alba al final? (su primera casa-árbol). Format: 3 `### Pregunta`, 3 options A-C, exactly one `- [x]`, EVERY option with `<!-- feedback: ... -->`, plus `### Explicacion`.
- Art: 3 SVGs `personajes/tomas.svg` (architect, signature #7BAE5A), `personajes/alba.svg` (girl), `personajes/ceiba.svg` (grandfather tree, friendly face, NO scary) — viewBox 200x200, round shapes, eyes template, copyright first line, <25KB + 8 scenes 800x450 ≤60 nodes <60KB, no text inside, no PNG/base64.

## 3. Web Research Required (4-6 queries, MANDATORY before writing)

1. search: "treehouse architecture build around tree protect roots kids"
2. search: "shapes materials wood clay glass preschool architecture activities"
3. search: "drawing floor plans with children simple shapes"
4. search: "respect nature stories children create without destroying"
5. search: "español neutro infantil evitar modismos"
6. search: "SVG friendly tree face flat children book vector"

## 4. Agent Session Prompt

"Before writing, please: 1. Read `docs/CUENTOS/00_BIBLIA.md` §10 + `02_COPYRIGHT_Y_FORMATO.md` + `01_DIRECCION_ARTE.md`. 2. Read seed `tana-tucan-comparte/cuento.md` + `personajes/tana.svg`, MIMIC exactly. 3. Research tree-friendly architecture + shapes/materials kid-facts. 4. Draft 8 pages (30-80 words), create-not-remove tone. 5. Validate until 0 errors."

## 5. Existing Code Patterns (MUST follow — seed)

- `questions_data/cuentos/tana-tucan-comparte/cuento.md` → copyright first line, frontmatter v1, `## Pagina N` + alt scenes, `## Quiz` + feedback + `### Explicacion`.
- `questions_data/cuentos/tana-tucan-comparte/personajes/tana.svg` → copyright comment, 200x200, eyes template, signature color.
- `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` §2 veto list.

## 6. Acceptance Criteria (VERIFICABLES POR COMANDO)

- [ ] `test -f questions_data/cuentos/tomas-casa-arbol/cuento.md`
- [ ] `node saberparatodos/scripts/validate_cuentos.js -- questions_data/cuentos/tomas-casa-arbol/cuento.md; echo $?` == 0
- [ ] `grep -c "^## Pagina" .../cuento.md` between 8 and 10; every page 30-80 words
- [ ] `grep -c "^### Pregunta" .../cuento.md` == 3 && `grep -c "^- \[x\]" .../cuento.md` == 3 && `grep -c "### Explicacion" .../cuento.md` == 1
- [ ] `grep -c "feedback:" .../cuento.md` >= 9
- [ ] `head -1 .../cuento.md | grep -c "© 2026 SaberParaTodos"` == 1 && `grep -c 'license: "PROPRIETARY-FREE-READ"' .../cuento.md` == 1
- [ ] `grep -ciE "pesos|dólares|dolares|euros|soles|quetzal|guaraní|guarani|lempira|córdoba|cordoba|balboa|colón|colon|vos |tenés|tenes|hacé|hace|mirá|mira|che |parce|compa|chido|chévere|chevere|bacán|bacan" .../cuento.md` == 0 (veto)
- [ ] Bible anchors: `grep -ci "alrededor" .../cuento.md` >= 1 && `grep -ci "ventana al cielo\|ventana" .../cuento.md` >= 1 && `grep -ci "abraz" .../cuento.md` >= 1
- [ ] `ls .../personajes/*.svg | wc -l` 2-4; `ls .../escenas/*.svg | wc -l` 8-10
- [ ] `grep -rc "image\|base64" questions_data/cuentos/tomas-casa-arbol/ | grep -v ":0" | wc -l` == 0
- [ ] SVG first lines carry `© 2026 SaberParaTodos`; `find ... -name "*.svg" -size +60k | wc -l` == 0

## 7. Files to Modify

| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `questions_data/cuentos/tomas-casa-arbol/cuento.md` | NEW | Full text v1: 8 pages + quiz | LOW |
| `questions_data/cuentos/tomas-casa-arbol/personajes/{tomas,alba,ceiba}.svg` | NEW | 3 SVGs, Tomás #7BAE5A | LOW |
| `questions_data/cuentos/tomas-casa-arbol/escenas/p1..p8-*.svg` | NEW | 8 scenes 800x450 | LOW |

## 8. DO NOT touch (Anti-Regression)

- `questions_data/cuentos/<any-other-slug>/` — other islands
- Validator/schema/lector code (C1/C2 islands)
- `.gitcore/features.json` — wave-end reconciliation
- `apps/worldexams-api/public/v1/packs` — never by hand
- No new npm deps; no secrets; no `$SWAL`/karma/telemetry (BR-03); no real countries/cities

## 9. Anti-Hallucination Guard ⚠️

1. **READ before write**: seed + 3 docs COMPLETOS.
2. **Bible is law**: §10 beats — around-tree design, trunk hole, sky window, Alba's drawing, hug moral; tree stays generic (no country).
3. **No invented architecture claims**: materials/shapes wording stays kid-simple and researched.
4. **Veto list is hard**: neutral Spanish only.
5. **No invented validator flags**: verify real CLI first.

## 10. PR Delivery Requirements (ANTI-EMPTY-PR) — OBLIGATORIO

- [ ] `git status --porcelain` non-empty BEFORE PR
- [ ] `git diff --stat HEAD` non-empty; PR ≥12 files (1 md + ≥11 svg)
- [ ] `wc -w .../cuento.md` >= 240
- [ ] If incomplete: NO PR — comment blocker
- [ ] PR body: validator output + §6 checklist

## 11. Verification

```bash
node saberparatodos/scripts/validate_cuentos.js -- questions_data/cuentos/tomas-casa-arbol/cuento.md
grep -c "^## Pagina" questions_data/cuentos/tomas-casa-arbol/cuento.md
grep -c "^- \[x\]" questions_data/cuentos/tomas-casa-arbol/cuento.md
ls questions_data/cuentos/tomas-casa-arbol/personajes/ questions_data/cuentos/tomas-casa-arbol/escenas/
find questions_data/cuentos/tomas-casa-arbol -name "*.svg" -size +60k | wc -l  # expect 0
```

## 12. Dependencies & Merge Order

- **Depends on:** C1 (schema + validator); if missing, format v1 literal.
- **Parallel with:** C4.01-C4.04 (disjoint islands).
- **Merge order within wave:** 5/5.
- **Expected effort:** Medium 3-4h.

## 13. Failure Recovery

| If this happens | Action |
|----------------|--------|
| Validator missing | Format v1 literal + manual greps; note in PR |
| Veto/word-count fails | Neutral synonym / rebalance pages |
| Tree reads scary | Rounder shapes, smile, warm greens; re-check art rules §3 |
| SVG heavy | Simplify, reuse piezas |
| PR conflicts | Rebase on main, re-verify, never touch other slugs |
