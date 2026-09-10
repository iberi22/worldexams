# [Ola C4.03] feat-cuentos-b: Don Emilio y la mina que cuida el cerro (trabajo digno 2026)

> Ola C4 — Cuentos 06-10 (molde C3). Merge order: 3/5 | Risk: LOW | Effort: Medium 3-4h
> Disjoint island: `questions_data/cuentos/don-emilio-mina/` only.

---

## 1. Current State (MEDIBLE)

- Dir: `questions_data/cuentos/don-emilio-mina/` does NOT exist (0 files).
- Feature: `feat-cuentos-b` (C4) at 0%; seed `tana-tucan-comparte/cuento.md` is the format reference.
- Infra (ola C1, assumed): `saberparatodos/src/lib/cuentos/cuento-schema.ts`, `saberparatodos/scripts/validate_cuentos.js`.
- Evidence: `ls questions_data/cuentos/` shows only `LICENSE-CONTENT.md` + `tana-tucan-comparte`.

## 2. Desired State (DELTA — bible beats + quiz, inline, OBLIGATORIO)

Create `questions_data/cuentos/don-emilio-mina/cuento.md` — FULL text, neutral Spanish, format v1. TONE (bible note, binding): idealized RESPONSIBLE mining, pride of craft + technology + nature. NO accidents, NO victims — the sensor episode is an orderly drill/evacuation where everyone is safe.

- Frontmatter: `slug: "don-emilio-mina"`, titulo `"Don Emilio y la mina que cuida el cerro"`, `edad: "5-6"`, `idioma: "es-neutro"`, `eje: "oficios"`, `habitat: "mina"`, `valor: "trabajo"`, `personajes: ["emilio", "suli", "carbonilla"]`, `paginas: 8`, `license: "PROPRIETARY-FREE-READ"`, `version: 1`.
- First line: `<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. Lectura gratuita, prohibida su reproducción. -->`
- 8 pages, 30-80 words/page, 1 idea per page, each with `![alt: ...](escenas/pN-....svg)`.
- Beats (copy from bible): 1) Emilio as a boy collected shiny stones; 2) he studied and worked at the hill mine; 3) the 2026 mine: helmet with lamp, sensors, drones that inspect; 4) golden rule: for each hole, a new tree ("por cada hueco, un árbol nuevo"); 5) one day the sensor beeps: everyone exits in order (safe drill, nobody hurt); 6) Carbonilla the rescue dog helps check; 7) party for tree number one thousand; 8) moral: good work cares for people and land ("el trabajo bueno cuida a la gente y a la tierra").
- Learning thread: where metals come from (phones, bridges), safety gear, reforesting, technology (drones, sensors). No country, no company, no real institution.
- Quiz: Q1 ¿Qué estudiaba Emilio de niño sin saberlo? (las piedras brillantes / los metales) / Q2 ¿Qué revisan los drones? (la mina, que todo esté seguro) / Q3 ¿Cuál es la regla de oro de la mina? (por cada hueco, un árbol nuevo). Format: 3 `### Pregunta`, 3 options A-C, exactly one `- [x]`, EVERY option with `<!-- feedback: ... -->`, plus `### Explicacion`.
- Art: 3 SVGs `personajes/emilio.svg` (miner, helmet+lamp, signature #C97B3D), `personajes/suli.svg` (engineer), `personajes/carbonilla.svg` (dog) — viewBox 200x200, round friendly shapes, copyright first line, <25KB + 8 scenes 800x450 ≤60 nodes <60KB, no text inside, no PNG/base64.

## 3. Web Research Required (4-6 queries, MANDATORY before writing)

1. search: "modern responsible mining technology drones sensors 2025"
2. search: "mine reforestation one tree restoration kids explanation"
3. search: "where do metals come from phones bridges explanation children"
4. search: "mine safety helmet lamp sensors evacuation drill explained simply"
5. search: "español neutro infantil evitar modismos"
6. search: "SVG miner helmet lamp flat children illustration"

## 4. Agent Session Prompt

"Before writing, please: 1. Read `docs/CUENTOS/00_BIBLIA.md` §08 (incl. tone NOTE) + `02_COPYRIGHT_Y_FORMATO.md` + `01_DIRECCION_ARTE.md`. 2. Read seed `tana-tucan-comparte/cuento.md` + `personajes/tana.svg`, MIMIC exactly. 3. Research modern responsible mining tech (drones/sensors/reforestation). 4. Draft 8 pages (30-80 words), ZERO accident/victim language. 5. Validate until 0 errors."

## 5. Existing Code Patterns (MUST follow — seed)

- `questions_data/cuentos/tana-tucan-comparte/cuento.md` → copyright first line, frontmatter v1, `## Pagina N` + alt scenes, `## Quiz` + feedback + `### Explicacion`.
- `questions_data/cuentos/tana-tucan-comparte/personajes/tana.svg` → copyright comment, 200x200, eyes template, signature color.
- `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` §2 veto list.

## 6. Acceptance Criteria (VERIFICABLES POR COMANDO)

- [ ] `test -f questions_data/cuentos/don-emilio-mina/cuento.md`
- [ ] `node saberparatodos/scripts/validate_cuentos.js -- questions_data/cuentos/don-emilio-mina/cuento.md; echo $?` == 0
- [ ] `grep -c "^## Pagina" .../cuento.md` between 8 and 10; every page 30-80 words
- [ ] `grep -c "^### Pregunta" .../cuento.md` == 3 && `grep -c "^- \[x\]" .../cuento.md` == 3 && `grep -c "### Explicacion" .../cuento.md` == 1
- [ ] `grep -c "feedback:" .../cuento.md` >= 9
- [ ] `head -1 .../cuento.md | grep -c "© 2026 SaberParaTodos"` == 1 && `grep -c 'license: "PROPRIETARY-FREE-READ"' .../cuento.md` == 1
- [ ] `grep -ciE "pesos|dólares|dolares|euros|soles|quetzal|guaraní|guarani|lempira|córdoba|cordoba|balboa|colón|colon|vos |tenés|tenes|hacé|hace|mirá|mira|che |parce|compa|chido|chévere|chevere|bacán|bacan" .../cuento.md` == 0 (veto)
- [ ] Tone gate: `grep -ciE "accidente|muerto|muert|sangre|herid|atrapado|derrumbe|explosi" .../cuento.md` == 0 (NO accidents/victims)
- [ ] Bible anchors: `grep -ci "árbol nuevo\|arbol nuevo" .../cuento.md` >= 1 && `grep -ci "dron" .../cuento.md` >= 1 && `grep -ci "sensor" .../cuento.md` >= 1
- [ ] `ls .../personajes/*.svg | wc -l` 2-4; `ls .../escenas/*.svg | wc -l` 8-10
- [ ] `grep -rc "image\|base64" questions_data/cuentos/don-emilio-mina/ | grep -v ":0" | wc -l` == 0
- [ ] SVG first lines carry `© 2026 SaberParaTodos`; `find ... -name "*.svg" -size +60k | wc -l` == 0

## 7. Files to Modify

| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `questions_data/cuentos/don-emilio-mina/cuento.md` | NEW | Full text v1: 8 pages + quiz | LOW |
| `questions_data/cuentos/don-emilio-mina/personajes/{emilio,suli,carbonilla}.svg` | NEW | 3 SVGs, Emilio #C97B3D | LOW |
| `questions_data/cuentos/don-emilio-mina/escenas/p1..p8-*.svg` | NEW | 8 scenes 800x450 | LOW |

## 8. DO NOT touch (Anti-Regression)

- `questions_data/cuentos/<any-other-slug>/` — other islands
- Validator/schema/lector code (C1/C2 islands)
- `.gitcore/features.json` — wave-end reconciliation
- `apps/worldexams-api/public/v1/packs` — never by hand
- No new npm deps; no secrets; no `$SWAL`/karma/telemetry (BR-03); no real countries/companies in story

## 9. Anti-Hallucination Guard ⚠️

1. **READ before write**: seed + 3 docs COMPLETOS.
2. **Bible is law**: §08 beats + tone note — responsible idealized mining; never add danger/victims for drama.
3. **No invented tech claims**: drones/sensors/reforestation wording stays generic-kids; sources in PR.
4. **Veto list is hard**: neutral Spanish only.
5. **No invented validator flags**: verify real CLI first.

## 10. PR Delivery Requirements (ANTI-EMPTY-PR) — OBLIGATORIO

- [ ] `git status --porcelain` non-empty BEFORE PR
- [ ] `git diff --stat HEAD` non-empty; PR ≥12 files (1 md + ≥11 svg)
- [ ] `wc -w .../cuento.md` >= 240
- [ ] If incomplete: NO PR — comment blocker
- [ ] PR body: validator output + tone-gate grep output + §6 checklist

## 11. Verification

```bash
node saberparatodos/scripts/validate_cuentos.js -- questions_data/cuentos/don-emilio-mina/cuento.md
grep -c "^## Pagina" questions_data/cuentos/don-emilio-mina/cuento.md
grep -c "^- \[x\]" questions_data/cuentos/don-emilio-mina/cuento.md
grep -ciE "accidente|muerto|sangre|herid|atrapado|derrumbe|explosi" questions_data/cuentos/don-emilio-mina/cuento.md  # expect 0
ls questions_data/cuentos/don-emilio-mina/personajes/ questions_data/cuentos/don-emilio-mina/escenas/
find questions_data/cuentos/don-emilio-mina -name "*.svg" -size +60k | wc -l  # expect 0
```

## 12. Dependencies & Merge Order

- **Depends on:** C1 (schema + validator); if missing, format v1 literal.
- **Parallel with:** C4.01, C4.02, C4.04, C4.05 (disjoint islands).
- **Merge order within wave:** 3/5.
- **Expected effort:** Medium 3-4h.

## 13. Failure Recovery

| If this happens | Action |
|----------------|--------|
| Validator missing | Format v1 literal + manual greps; note in PR |
| Tone words flagged | Rewrite sensor scene as calm orderly drill, all safe, re-grep |
| Veto/word-count fails | Neutral synonym / rebalance pages |
| SVG heavy | Simplify, reuse piezas |
| PR conflicts | Rebase on main, re-verify, never touch other slugs |
