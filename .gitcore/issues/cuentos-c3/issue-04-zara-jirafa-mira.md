# [Ola C3.04] feat-cuentos-a-zara-jirafa — Zara la jirafa que miraba lejos

> Wave C3 — Cuentos 01-05 (content). No `jules` label yet (dispatch protocol: create
> without label, verify islands, then label in one loop). Merge order: 04/5 | Risk: LOW | Effort: Medium 3-5h

---

## 1. Current State (MEASURABLE)

- File: `questions_data/cuentos/zara-jirafa-mira/cuento.md` DOES NOT EXIST (`ls` 0 files) — greenfield issue.
- No `personajes/` or `escenas/` for this slug (0 SVGs).
- Closest reference: seed `tana-tucan-comparte/cuento.md` (format v1 to mimic) + `tana.svg` (SVG pattern).
- Validator `saberparatodos/scripts/validate_cuentos.js` PLANNED (C1.02) — does not exist yet; fallback greps in §6 are authoritative.

## 2. Desired State (FULL SPEC INLINE — bible beats + quiz)

Create `questions_data/cuentos/zara-jirafa-mira/cuento.md` with the FULL story text in neutral
Spanish (es-neutro): **8 pages, 30-80 words per page, short sentences, exactly 1 idea
per page**, following format v1 (`docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` §3) and the
seed reference `questions_data/cuentos/tana-tucan-comparte/cuento.md`.

**Frontmatter (exact keys):** `slug: "zara-jirafa-mira"`, `titulo`, `edad: "3-4"`,
`idioma: "es-neutro"`, `eje: "animales"`, `habitat: "sabana"`, `valor: "empatia"`,
`personajes: [...]`, `paginas: 8`, `license: "PROPRIETARY-FREE-READ"`, `version: 1`.
First line MUST be the HTML copyright header:
`<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. Lectura gratuita, prohibida su reproducción. -->`

**Story beats (from `docs/CUENTOS/00_BIBLIA.md` — implement ALL 8, one beat per page):**

1) Zara se burla de los bajitos sin querer
2) Mote el suricata se esconde, triste
3) Zara baja el cuello y ve su mundo pequeno
4) Entiende que asusta sin querer
5) Ayuda a Mote a vigilar desde lo alto (turnos)
6) Rugido el leon viejito les cuenta historias (bueno, come fruta caida)
7) Fiesta bajo la acacia
8) Moraleja: agachate para entender

**Quiz (exactly 3 questions × 3 options A-C, exactly one `- [x]` per question, EVERY
option with `<!-- feedback: ... -->`, plus final `### Explicacion` with the moral in
2-3 sentences for the caregiver). Base the quiz on these bible questions (reproduce
their intent exactly):**

### Pregunta 1 — Por que se escondio Mote? (correcta: porque se sintio pequeno / Zara lo asustaba sin querer)
### Pregunta 2 — Que hizo Zara para entender? (correcta: bajo el cuello y miro su mundo)
### Pregunta 3 — Como ayudan Zara y Mote juntos? (correcta: vigilan por turnos desde lo alto)

**Art:** 2-4 character SVGs in `personajes/` (signature color #F2C14E; viewBox
`0 0 200 200`; circles+ovals+rounded-rects construction; common eyes template — two
white circles + dark pupil + shine, same as `tana.svg`; NO text inside SVG; copyright
comment as FIRST line; each file < 25 KB, pure vector) + 8 scene SVGs in `escenas/`
(viewBox `0 0 800 450`, 3 planes, max 60 nodes, < 60 KB each; reuse piezas from
`docs/CUENTOS/01_DIRECCION_ARTE.md` §4 instead of redrawing sun/moon/clouds — compose,
don't redraw). Every page MUST reference its scene with `![alt: ...](escenas/...)`
(accessibility, alt text mandatory).

## 3. Web Research Required

**MANDATORY — 5 queries. The agent MUST research BEFORE writing (facts for
kids must be correct, language must be neutral).**

1. search: "giraffe neck facts for kids simple"
2. search: "savanna habitat acacia animals children"
3. search: "meerkat facts for kids"
4. search: "empathy stories preschool seeing others perspective"
5. search: "neutral Spanish escritura infantil consejos"

## 4. Agent Session Prompt

"Before writing, please:
1. Research the topics above and note 3-5 verified facts usable for ages 3-4.
2. Plan Zara (jirafa joven, cuello largo, firma #F2C14E), Mote (suricata), Rugido (leon viejito BUENO, sin dientes, come fruta caida — nunca aterrador) + 8 savanna scenes (acacias, atardecer).
2. Read `docs/CUENTOS/00_BIBLIA.md` (this cuento's beats + quiz), `docs/CUENTOS/01_DIRECCION_ARTE.md` (palette, signature color #F2C14E), and `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` (format v1 + veto list).
3. Read the FULL seed `questions_data/cuentos/tana-tucan-comparte/cuento.md` and mimic its structure exactly (frontmatter keys, `## Pagina N`, `![alt:]`, `## Quiz`, `### Pregunta N`, `- [x]/- [ ]` options with feedback, `### Explicacion`).
4. Read `questions_data/cuentos/tana-tucan-comparte/personajes/tana.svg` and reuse its SVG pattern (viewBox, common eyes, copyright comment).
5. Document findings (facts + word-count plan per page), then write `cuento.md` + SVGs, then run the Verification block below."

## 5. Existing Code Patterns (MUST follow)

- `questions_data/cuentos/tana-tucan-comparte/cuento.md` → format v1 reference: copyright HTML header line 1, YAML frontmatter, `## Pagina 1..8` with `![alt: ...]` + 30-80 words, `## Quiz` with `### Pregunta 1..3` (3 options, one `[x]`, all with feedback), `### Explicacion`.
- `questions_data/cuentos/tana-tucan-comparte/personajes/tana.svg` → SVG pattern: copyright comment first line, `<svg viewBox="0 0 200 200" role="img" aria-label="...">`, common eyes (white circle + dark pupil + shine), max 2-stop gradients, no teeth/weapons/red eyes.
- `docs/CUENTOS/01_DIRECCION_ARTE.md` §§2-4 → palette (#FDF6EC bg, #3A2E2A ink), signature color #F2C14E, scene spec (800×450, 3 planes, ≤60 nodes), piezas reuse.
- `questions_data/cuentos/LICENSE-CONTENT.md` → legal header text.

## 6. Acceptance Criteria (COMMAND-VERIFIABLE)

Validator: `node saberparatodos/scripts/validate_cuentos.js questions_data/cuentos/zara-jirafa-mira/cuento.md` (planned in C1.02 — **if the file does not exist yet, the fallback grep checks below are authoritative** and the agent must note `validator-missing-fallback-used` in the PR body).

- [ ] `test -f questions_data/cuentos/zara-jirafa-mira/cuento.md && head -1 questions_data/cuentos/zara-jirafa-mira/cuento.md | grep -c "© 2026 SaberParaTodos"` == 1
- [ ] `grep -c '^slug: "zara-jirafa-mira"' questions_data/cuentos/zara-jirafa-mira/cuento.md` == 1 && `grep -c 'license: "PROPRIETARY-FREE-READ"' questions_data/cuentos/zara-jirafa-mira/cuento.md` == 1 && `grep -c '^paginas: 8' questions_data/cuentos/zara-jirafa-mira/cuento.md` == 1
- [ ] `grep -c '^## Pagina' questions_data/cuentos/zara-jirafa-mira/cuento.md` == 8
- [ ] Every page 30-80 words: `awk '/^## Pagina/{if(n)print n,w; n=1; w=0; next} /^## Quiz/{print n,w; exit} /^!\[/{next} /^#/{next} /./{w+=NF}' questions_data/cuentos/zara-jirafa-mira/cuento.md` → all 8 counts in [30,80]
- [ ] `grep -c '^### Pregunta' questions_data/cuentos/zara-jirafa-mira/cuento.md` == 3 && `grep -c '^- \[ \]' questions_data/cuentos/zara-jirafa-mira/cuento.md` == 6 && `grep -c '^- \[x\]' questions_data/cuentos/zara-jirafa-mira/cuento.md` == 3 && `grep -c '<!-- feedback:' questions_data/cuentos/zara-jirafa-mira/cuento.md` == 9 && `grep -c '^### Explicacion' questions_data/cuentos/zara-jirafa-mira/cuento.md` == 1
- [ ] `grep -c '!\[alt:' questions_data/cuentos/zara-jirafa-mira/cuento.md` == 8 (alt text on every scene)
- [ ] Characters: `ls questions_data/cuentos/zara-jirafa-mira/personajes/*.svg | wc -l` in 2..4 && scenes: `ls questions_data/cuentos/zara-jirafa-mira/escenas/*.svg | wc -l` == 8
- [ ] `find questions_data/cuentos/zara-jirafa-mira/personajes -name '*.svg' -size +25k | wc -l` == 0 && `find questions_data/cuentos/zara-jirafa-mira/escenas -name '*.svg' -size +60k | wc -l` == 0
- [ ] `grep -ril 'base64\|<image' questions_data/cuentos/zara-jirafa-mira/ | wc -l` == 0 (pure vector, per 01_DIRECCION_ARTE.md §7) && every SVG: `head -1 <f> | grep -c '© 2026 SaberParaTodos'` == 1 && `grep -L 'viewBox' questions_data/cuentos/zara-jirafa-mira/*/*.svg | wc -l` == 0
- [ ] Neutral-Spanish veto list: `grep -rEic "pesos|dólares|dolares|euros|soles|quetzal|guaraní|guarani|lempira|córdoba|cordoba|balboa|colón|colon|vos|tenés|tenes|hacé|hace|mirá|mira|che|parce|tío|compa|chido|chévere|chevere|bac[aá]n" questions_data/cuentos/zara-jirafa-mira/cuento.md` == 0 (see 02_COPYRIGHT_Y_FORMATO.md §2)
- [ ] BR-03: `grep -ric 'swal\|\$swal\|karma\|telemet' questions_data/cuentos/zara-jirafa-mira/ | wc -l` == 0 (zero $SWAL tokens, karma, telemetry in kids flows)

## 7. Files to Modify

| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `questions_data/cuentos/zara-jirafa-mira/cuento.md` | NEW | Full story 8 pages 30-80 words/page + quiz 3Q x 3 options + Explicacion | LOW |
| `questions_data/cuentos/zara-jirafa-mira/personajes/zara.svg` | NEW | Jirafa joven cuello largo, firma #F2C14E, common eyes, < 25 KB | LOW |
| `questions_data/cuentos/zara-jirafa-mira/personajes/mote.svg` | NEW | Suricata Mote, same pattern, < 25 KB | LOW |
| `questions_data/cuentos/zara-jirafa-mira/personajes/rugido.svg` | NEW | Leon viejito bueno sin dientes, same pattern, < 25 KB | LOW |
| `questions_data/cuentos/zara-jirafa-mira/escenas/p1-*.svg` … `p8-*.svg` | NEW (8) | Sabana/acacias/atardecer, 800x450, reuse piezas, < 60 KB each | LOW |

## 8. DO NOT Touch (Anti-Regression)

- `questions_data/cuentos/tana-tucan-comparte/` — seed reference (C3.01 polishes it; C3.02-C3.05 MUST NOT modify it)
- Other `questions_data/cuentos/<other-slug>/` dirs — disjoint islands per issue
- `.gitcore/features.json` — reconciled at wave end by the orchestrator, never inside issues
- `saberparatodos/scripts/validate_cuentos.js` — C1.02 island (only READ/use it, never rewrite it here)
- `saberparatodos/src/components/cuentos/` — C1.04/C2 islands (reader + art system, out of scope)
- No new npm dependencies

## 9. Anti-Hallucination Guard

1. **READ seed first**: read the FULL `tana-tucan-comparte/cuento.md` + `tana.svg` before writing a single line; mimic the format exactly (frontmatter keys, heading levels, option/feedback syntax).
2. **No country refs**: NO countries, cities, currencies, demonyms, real institutions; NO voseo, NO slang (veto list in §6 must grep 0).
3. **Copyright headers mandatory**: HTML header line 1 of `cuento.md` + `license: "PROPRIETARY-FREE-READ"` frontmatter + comment line 1 of EVERY `.svg`; files without them are REJECTED.
4. **No invented facts**: every nature/science claim (desert adaptations, ice, savanna, ocean) must come from the Web Research step; when unsure, keep the text generic and behavioral (values), not encyclopedic.
5. **BR-03**: zero $SWAL tokens, zero karma, zero telemetry anywhere in kids content or components.

## 10. PR Delivery Requirements (ANTI-EMPTY-PR) — MANDATORY

- [ ] `git status --porcelain` shows new files BEFORE opening the PR
- [ ] `git diff --stat HEAD` is NOT empty; the PR MUST contain `questions_data/cuentos/zara-jirafa-mira/cuento.md` in the diff (`git show HEAD --name-only | grep -c 'cuentos/zara-jirafa-mira/cuento.md'` >= 1)
- [ ] All SVGs listed: `git show HEAD --name-only | grep -c 'cuentos/zara-jirafa-mira/.*\.svg'` >= 10 (characters + 8 scenes)
- [ ] `wc -l questions_data/cuentos/zara-jirafa-mira/cuento.md` >= 60 (full story + quiz, never a stub)
- [ ] If the work could not be completed: DO NOT open a PR — comment the blocker on the issue
- [ ] PR body states: validator result (or `validator-missing-fallback-used`), page word counts, veto-grep == 0, SVG sizes

## 11. Verification

```bash
node saberparatodos/scripts/validate_cuentos.js questions_data/cuentos/zara-jirafa-mira/cuento.md 2>&1 | tail -5 || echo "VALIDATOR-MISSING-USING-FALLBACK-GREPS"
grep -c '^## Pagina' questions_data/cuentos/zara-jirafa-mira/cuento.md  # expect 8
grep -c '^- \[x\]' questions_data/cuentos/zara-jirafa-mira/cuento.md  # expect 3
grep -c '<!-- feedback:' questions_data/cuentos/zara-jirafa-mira/cuento.md  # expect 9
grep -rEic "pesos|dólares|dolares|euros|soles|quetzal|guaraní|guarani|lempira|córdoba|cordoba|balboa|colón|colon|vos|tenés|tenes|hacé|hace|mirá|mira|che|parce|tío|compa|chido|chévere|chevere|bac[aá]n" questions_data/cuentos/zara-jirafa-mira/cuento.md  # expect 0
grep -ril 'base64\|<image' questions_data/cuentos/zara-jirafa-mira/ | wc -l  # expect 0
find questions_data/cuentos/zara-jirafa-mira -name '*.svg' | wc -l  # expect >= 10
find questions_data/cuentos/zara-jirafa-mira/personajes -name '*.svg' -size +25k | wc -l  # expect 0
```

## 12. Dependencies & Merge Order / Failure Recovery

- **Depends on:** C1 conceptually (schema C1.01 + validator C1.02) but file islands are disjoint → work can proceed in parallel using fallback greps if the validator is missing.
- **Parallel with:** all other C3 issues (disjoint `questions_data/cuentos/<slug>/` islands, verified 2026-09-10).
- **Merge order within wave:** 04/5.
- **Expected effort:** Medium 3-5h (full story text + quiz + 10-12 SVGs).

| If this happens | Action |
|----------------|--------|
| `validate_cuentos.js` missing | Use fallback greps in §6, note `validator-missing-fallback-used` in PR, do NOT block |
| Validator reports errors | Fix content (never edit the validator), re-run until 0 errors |
| Page word count outside 30-80 | Rewrite the page (split or expand), keep 1 idea per page |
| SVG > size limit or contains base64 | Simplify (fewer nodes, flat fills), re-check, never embed raster |
| Veto-list grep != 0 | Replace with neutral synonym, re-grep until 0 |
| PR conflicts with parallel C3 work | `git pull --rebase origin main`, re-run Verification, keep only own island |
| Story facts uncertain | Prefer generic value-focused wording over specific claims; cite research in PR |
