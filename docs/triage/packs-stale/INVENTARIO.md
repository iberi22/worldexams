# INVENTARIO — packs estalos en `apps/worldexams-api/public/v1/packs/`

Fecha: 2026-10-01 · repo `/home/belal/proyectosSWAL/apps/worldexams` (rama `main`) · **no se hizo commit**

Alcance real: de los ~4.900 ficheros de pack, **174 estaban desincronizados con su bundle Y eran
alcanzables por el worker** (lo que un usuario recibe de verdad). Otros 396 ficheros estalos son
inalcanzables. Verificado campo por campo: 570 ficheros estalos, 7.099 preguntas mal alineadas.
**Reparados 46 en esta sesion; 524 quedan inventariados en la seccion 8.**

---

## 1. Quien escribe en `v1/packs/`

Generador canonico: **`saberparatodos/scripts/generate-static-packs.js`**.

- `.husky/pre-push` -> `scripts/husky-guard.mjs --changed` (lineas 94-103): si hay bundles `.md`
  cambiados, corre `--all-weekly --changed-only --api-only` y despues ABORTA el push si los packs
  generados no estan commiteados. Ese es el bucle `commit -> regenerar -> commit`.
- Commits `chore(packs): publish ...` / `fix(packs): ...` de `Hermes Cron <hermes@swal.local>` y
  `Jules-Monitor <monitor@iberi22.dev>`.

`OUTPUT_DIRS` = `apps/worldexams-api/public/v1/packs` + `saberparatodos/public/api/packs`.
`scripts/build-full-grade-packs.mjs` escribe en `v1/grades/`, no interviene. Ningun cron de Hermes ni
workflow de GitHub Actions escribe aqui: el actor es un agente que corre el generador canonico.

## 2. El generador NO es la causa (verificado)

Ejecutado en sandbox (symlink a `questions_data`, salida a scratch; jamas toco packs reales):

```
$ node scripts/generate-static-packs.js --all-weekly --api-only
Generated .../packs/<x>.json with 20 questions     x 2.706
Static packs generation completed.

comparacion enunciado a enunciado de los 2.706 packs generados contra su bundle:
  packs con cualquier desalineacion : 1     (2 preguntas)
```

## 3. Causa raiz

### 3a. Alias duplicados — commit `cafb3a843d` (2026-08-28, `WorldExams Subagent`)

`feat(packs): generate canonical aliases for all subject variations across 21 countries`

Copio packs canonicos a nombres alternativos (`subject-english`, `subject-ing`,
`subject-matematica`...) para **2.062 ficheros**. Esos alias heredaron el contenido viejo del pack de
origen y nadie los regenero nunca: el generador actual solo produce el nombre canonico, asi que nunca
repara sus propios alias. Ese es el drift.

El worker (`SUBJECT_PACK_ALIASES`, `apps/worldexams-api/src/index.ts` lineas 76-82) prueba
`[ingles, english, ing]`, `[matematicas, matematica]`, `[lectura_critica, lengua, lenguaje, espanol]`,
`[sociales_ciudadanas, sociales_y_ciudadanas, sociales]`, `[ciencias_naturales, ciencias]` y, con
`_manifest.json`, se queda con el PRIMER alias que exista. Consecuencias:

- `sv-week-N-grade-11-subject-ingles` (bueno, 20 unicos) **oculta** a `-subject-english` y `-ing`
  (plantilla, 5 unicos): ahi el alumno recibe el bueno.
- `co-week-N-grade-11-subject-ingles` (plantilla) **gana** a `-subject-english` porque el canonico
  ingles no existe para esa semana: ahi el alumno recibe la plantilla.

### 3b. Los 5 enunciados plantilla nacen en `scripts/gen_ca_caribbean_generator.py`

`generate_english_question()` (lineas ~239-262) tiene una lista `templates` de 5 entradas cuyos
`stem` son EXACTAMENTE los 5 enunciados del hallazgo, y elige `templates[q_num % 5]`, luego cada
enunciado sale 4 veces en un bundle de 20. Ese generador wrote bundles para El Salvador
(`questions_data/el-salvador/ingles/grado-11/`) pese a llamarse `gen_ca_caribbean`. Sus 5 plantillas
de Ingles no dependen del tema semanal, asi que son inservibles para cualquier pais.

## 4. Alcance real: alcanzable vs. fichero muerto

Simulando `resolveWeekPackNames` + `getSubjectPackAliases` contra `_manifest.json` (4.831 packs):

| | ficheros | de ellos estalos |
|---|---|---|
| **Alcanzable** (el worker lo puede servir) | 2.473 | **174** |
| Inalcanzable (alias sombreado / nombre no canonico) | 2.424 | 396 |

## 5. Comprobado en produccion

```
$ curl -s https://api.saberparatodos.space/v1/packs/sv-week-10-grade-11-subject-ingles.json
  n= 20 uniq= 5
   - Choose the correct option: 'I ___ reading a book right now.'
   - What does 'benevolent' mean?
$ curl -s https://api.saberparatodos.space/v1/packs/sv-week-1-grade-11-subject-ingles.json
  n= 20 uniq= 20
   - Choose the sentence that is grammatically correct in the present simple.
```

## 6. Hecho en esta sesion: 46 packs reparados

Criterio para tocar un pack: (a) alcanzable, (b) desincronizado, (c) **su bundle NO esta siendo editado
ahora mismo por otro agente** — comprobado contra `git status questions_data/` (138 ficheros .md
modificados en el arbol en ese momento). Se regeneraron desde la salida del generador canonico
conservando el `generated_at` original, asi que el diff solo muestra cambio real de contenido.

Por pais: co=14, py=9, sv=8, cr=7, ec=6, uy=1, bo=1

**Verificacion 1** — enunciado a enunciado contra el bundle, sobre los 46 ficheros escritos:

```
packs rewritten : 46
questions       : 920
  MATCH bundle  : 920
  MISMATCH      : 0
  unverifiable  : 0
RESULT: PASS
```

**Verificacion 2** — `correct_answer` de las 920 preguntas contra la marca `[x]` del markdown: 0 discrepancias.

**Verificacion 3** — validator oficial sobre los 46 bundles afectados:

```
$ node scripts/validate-bundles-v52.mjs <los 46 ficheros .md>
quality: 0 errors, 121 warnings (rule counts: explanation-template: 27, answer-letter-bias: 14, explanation-short: 80)
Validated 46 bundle file(s). Failures: 0.
```

Los 121 warnings son deuda preexistente del CONTENIDO de los bundles, no de los packs, y no bloquean.

## 7. Resumen de pendientes

- **118** alcanzables con el bundle en edicion ahora. Los arregla la pasada que el propio
  `husky-guard` hara al commitearse esos bundles. Re-ejecutar la comparacion enunciado a enunciado antes de commitear.
- **10** alcanzables (Brasil W11-W20 matematicas) con el bundle ya borrado de `questions_data`: irreparables por regeneracion.
- **396** inalcanzables. Arreglo recomendado: borrarlos, y que el generador emita los alias DESDE el
  pack canonico cada vez que escribe (nunca como copiador puntual), que es justo lo que fallo en `cafb3a843d`.

---

## 8. Inventario fichero a fichero (524 pendientes)

Columnas: `pack` · `n` (preguntas del pack) · `ok` (enunciados que coinciden con el bundle) ·
`mal` (no coinciden) · `sin bundle` (el `bundle_id` ya no existe en `questions_data`) · `tipo`
(`TEMPLATES` = los 5 enunciados de `gen_ca_caribbean_generator.py`).

### 1-ALCANZABLE, bundle editado ahora por otro agente (esperar y regenerar) — 118 ficheros

Su bundle esta en `git status questions_data/` modificado AHORA (138 ficheros .md en el arbol de trabajo).
El generador los repara solo cuando esos bundles se commiteen:
`node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only --api-only`.
NO se tocaron aqui, para no pisar el trabajo de los otros agentes.

Por pais: sv=70, co=27, uy=10, pr=6, pe=3, py=2

| pack | n | ok | mal | sin bundle | tipo | bundle_id |
|---|---|---|---|---|---|---|
| `co-week-11-grade-11-subject-ingles.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W11-social-justice-001-MASTERY-bundle` |
| `co-week-12-grade-11-subject-ingles.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W12-philosophy-ethics-001-MASTERY-bundle` |
| `co-week-14-grade-11-subject-ingles.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W14-digital-citizenship-001-MASTERY-bundle` |
| `co-week-15-grade-11-subject-ingles.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W15-historical-turning-points-001-MASTERY-bundle` |
| `co-week-17-grade-11-subject-ingles.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W17-psychology-wellbeing-001-MASTERY-bundle` |
| `co-week-18-grade-11-subject-ingles.json.json` | 20 | 8 | 12 | 0 | - | `CO-ING-11-2026-W18-globalization-001-MASTERY-bundle` |
| `co-week-2-grade-11-subject-ingles.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W02-environmental-sustainability-001-MASTERY-bundle` |
| `co-week-20-grade-11-subject-ingles.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W20-review-p2-001-MASTERY-bundle` |
| `co-week-20-grade-7-subject-ciencias_naturales.json.json` | 10 | 9 | 1 | 0 | - | `CO-CN-7-2026-W20-sistema-nervioso-humano-001-MASTERY-bundle` |
| `co-week-21-grade-11-subject-ingles.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W21-environmental-activism-001-MASTERY-bundle` |
| `co-week-23-grade-11-subject-ingles.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W23-international-relations-001-MASTERY-bundle` |
| `co-week-24-grade-11-subject-ingles.json.json` | 20 | 8 | 12 | 0 | - | `CO-ING-11-2026-W24-tourism-heritage-001-MASTERY-bundle` |
| `co-week-26-grade-11-subject-ingles.json.json` | 20 | 8 | 12 | 0 | - | `CO-ING-11-2026-W26-education-systems-001-MASTERY-bundle` |
| `co-week-27-grade-11-subject-ingles.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W27-migration-diaspora-001-MASTERY-bundle` |
| `co-week-29-grade-11-subject-ingles.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W29-space-exploration-001-MASTERY-bundle` |
| `co-week-3-grade-11-subject-ingles.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W03-technological-breakthroughs-001-MASTERY-bundle` |
| `co-week-30-grade-11-subject-ingles.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W30-review-p3-001-MASTERY-bundle` |
| `co-week-32-grade-11-subject-ingles.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W32-youth-culture-001-MASTERY-bundle` |
| `co-week-33-grade-11-subject-ingles.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W33-conflict-resolution-001-MASTERY-bundle` |
| `co-week-35-grade-11-subject-ingles.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W35-governance-democracy-001-MASTERY-bundle` |
| `co-week-36-grade-11-subject-ingles.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W36-innovation-startups-001-MASTERY-bundle` |
| `co-week-38-grade-11-subject-ingles.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W38-comprehensive-review-1-001-MASTERY-bundle` |
| `co-week-39-grade-11-subject-ingles.json.json` | 20 | 12 | 8 | 0 | - | `CO-ING-11-2026-W39-comprehensive-review-2-001-MASTERY-bundle` |
| `co-week-5-grade-11-subject-ingles.json.json` | 20 | 8 | 12 | 0 | - | `CO-ING-11-2026-W05-cultural-diplomacy-001-MASTERY-bundle` |
| `co-week-6-grade-11-subject-ingles.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W06-economic-trends-001-MASTERY-bundle` |
| `co-week-8-grade-11-subject-ingles.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W08-human-rights-001-MASTERY-bundle` |
| `co-week-9-grade-11-subject-ingles.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W09-scientific-innovations-001-MASTERY-bundle` |
| `pe-week-1-grade-11-subject-ciencias_naturales.json.json` | 20 | 10 | 10 | 0 | - | `PE-NAT-11-2026-W01-tema-w01-001-MASTERY-bundle` |
| `pe-week-2-grade-11-subject-ciencias_naturales.json.json` | 20 | 10 | 10 | 0 | - | `PE-NAT-11-2026-W02-tema-w02-001-MASTERY-bundle` |
| `pe-week-3-grade-11-subject-ciencias_naturales.json.json` | 20 | 10 | 10 | 0 | - | `PE-NAT-11-2026-W03-tema-w03-001-MASTERY-bundle` |
| `pr-week-14-grade-11-subject-matematicas.json.json` | 20 | 16 | 4 | 0 | - | `PR-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle` |
| `pr-week-15-grade-11-subject-matematicas.json.json` | 20 | 4 | 16 | 0 | - | `PR-MAT-11-2026-W15-tema-w15-001-MASTERY-bundle` |
| `pr-week-16-grade-11-subject-matematicas.json.json` | 20 | 15 | 5 | 0 | - | `PR-MAT-11-2026-W16-tema-w16-001-MASTERY-bundle` |
| `pr-week-17-grade-11-subject-matematicas.json.json` | 20 | 5 | 15 | 0 | - | `PR-MAT-11-2026-W17-tema-w17-001-MASTERY-bundle` |
| `pr-week-18-grade-11-subject-matematicas.json.json` | 20 | 5 | 15 | 0 | - | `PR-MAT-11-2026-W18-tema-w18-001-MASTERY-bundle` |
| `pr-week-20-grade-11-subject-matematicas.json.json` | 20 | 14 | 6 | 0 | - | `PR-MAT-11-2026-W20-tema-w20-001-MASTERY-bundle` |
| `py-week-10-grade-11-subject-lengua.json.json` | 20 | 0 | 20 | 0 | - | `PY-LEN-11-2026-W10-tema-w10-001-MASTERY-bundle` |
| `py-week-3-grade-11-subject-matematicas.json.json` | 20 | 12 | 8 | 0 | - | `PY-MAT-11-2026-W03-tema-w03-001-MASTERY-bundle` |
| `sv-week-1-grade-11-subject-ciencias_naturales.json.json` | 20 | 7 | 13 | 0 | - | `SV-CIE-11-2026-W01-investigacion-cientifica-001-MASTERY-bundle` |
| `sv-week-10-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W10-conditionals-0-1-001-MASTERY-bundle` |
| `sv-week-10-grade-11-subject-sociales.json.json` | 20 | 15 | 5 | 0 | - | `SV-SOC-11-2026-W10-republica-cafetalera-001-MASTERY-bundle` |
| `sv-week-11-grade-11-subject-ciencias_naturales.json.json` | 20 | 8 | 12 | 0 | - | `SV-CIE-11-2026-W11-evolucion-001-MASTERY-bundle` |
| `sv-week-11-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W11-conditionals-2-3-001-MASTERY-bundle` |
| `sv-week-11-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W11-dictadura-martinez-001-MASTERY-bundle` |
| `sv-week-12-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W12-passive-voice-001-MASTERY-bundle` |
| `sv-week-12-grade-11-subject-sociales.json.json` | 20 | 16 | 4 | 0 | - | `SV-SOC-11-2026-W12-guerra-civil-sv-001-MASTERY-bundle` |
| `sv-week-13-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W13-acuerdos-paz-001-MASTERY-bundle` |
| `sv-week-14-grade-11-subject-ingles.json.json` | 20 | 14 | 6 | 0 | - | `SV-ING-11-2026-W14-relative-clauses-001-MASTERY-bundle` |
| `sv-week-14-grade-11-subject-sociales.json.json` | 20 | 2 | 18 | 0 | - | `SV-SOC-11-2026-W14-democracia-sv-001-MASTERY-bundle` |
| `sv-week-15-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W15-comparatives-superlatives-001-MASTERY-bundle` |
| `sv-week-15-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W15-constitucion-sv-001-MASTERY-bundle` |
| `sv-week-16-grade-11-subject-ingles.json.json` | 20 | 14 | 6 | 0 | - | `SV-ING-11-2026-W16-countable-uncountable-001-MASTERY-bundle` |
| `sv-week-16-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W16-organizacion-estado-001-MASTERY-bundle` |
| `sv-week-17-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W17-derechos-humanos-001-MASTERY-bundle` |
| `sv-week-18-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W18-prepositions-time-001-MASTERY-bundle` |
| `sv-week-18-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W18-participacion-ciudadana-001-MASTERY-bundle` |
| `sv-week-19-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W19-prepositions-place-001-MASTERY-bundle` |
| `sv-week-19-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W19-prehistoria-001-MASTERY-bundle` |
| `sv-week-2-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W02-present-continuous-001-MASTERY-bundle` |
| `sv-week-20-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W20-phrasal-verbs-001-MASTERY-bundle` |
| `sv-week-20-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W20-grecia-roma-001-MASTERY-bundle` |
| `sv-week-21-grade-11-subject-sociales.json.json` | 20 | 2 | 18 | 0 | - | `SV-SOC-11-2026-W21-edad-media-001-MASTERY-bundle` |
| `sv-week-22-grade-11-subject-ciencias_naturales.json.json` | 20 | 8 | 12 | 0 | - | `SV-CIE-11-2026-W22-reacciones-quimicas-001-MASTERY-bundle` |
| `sv-week-22-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W22-vocabulary-daily-001-MASTERY-bundle` |
| `sv-week-22-grade-11-subject-sociales.json.json` | 20 | 8 | 12 | 0 | - | `SV-SOC-11-2026-W22-renacimiento-001-MASTERY-bundle` |
| `sv-week-23-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W23-vocabulary-school-001-MASTERY-bundle` |
| `sv-week-23-grade-11-subject-sociales.json.json` | 20 | 1 | 19 | 0 | - | `SV-SOC-11-2026-W23-revolucion-francesa-001-MASTERY-bundle` |
| `sv-week-24-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W24-vocabulary-work-001-MASTERY-bundle` |
| `sv-week-25-grade-11-subject-ciencias_naturales.json.json` | 20 | 6 | 14 | 0 | - | `SV-CIE-11-2026-W25-cinematica-001-MASTERY-bundle` |
| `sv-week-25-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W25-primera-guerra-mundial-001-MASTERY-bundle` |
| `sv-week-26-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W26-vocabulary-environment-001-MASTERY-bundle` |
| `sv-week-27-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W27-vocabulary-health-001-MASTERY-bundle` |
| `sv-week-28-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W28-reading-main-idea-001-MASTERY-bundle` |
| `sv-week-28-grade-11-subject-sociales.json.json` | 20 | 17 | 3 | 0 | - | `SV-SOC-11-2026-W28-globalizacion-001-MASTERY-bundle` |
| `sv-week-29-grade-11-subject-ciencias_naturales.json.json` | 20 | 7 | 13 | 0 | - | `SV-CIE-11-2026-W29-luz-optica-001-MASTERY-bundle` |
| `sv-week-3-grade-11-subject-ciencias_naturales.json.json` | 20 | 8 | 12 | 0 | - | `SV-CIE-11-2026-W03-organelos-001-MASTERY-bundle` |
| `sv-week-3-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W03-pueblos-originarios-001-MASTERY-bundle` |
| `sv-week-30-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W30-reading-inference-001-MASTERY-bundle` |
| `sv-week-31-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W31-reading-vocabulary-001-MASTERY-bundle` |
| `sv-week-31-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W31-poblacion-migracion-001-MASTERY-bundle` |
| `sv-week-32-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W32-reading-purpose-001-MASTERY-bundle` |
| `sv-week-33-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W33-economia-sv-001-MASTERY-bundle` |
| `sv-week-34-grade-11-subject-ciencias_naturales.json.json` | 20 | 8 | 12 | 0 | - | `SV-CIE-11-2026-W34-salud-nutricion-001-MASTERY-bundle` |
| `sv-week-34-grade-11-subject-ingles.json.json` | 20 | 14 | 6 | 0 | - | `SV-ING-11-2026-W34-speaking-dialogues-001-MASTERY-bundle` |
| `sv-week-34-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W34-comercio-exterior-001-MASTERY-bundle` |
| `sv-week-35-grade-11-subject-ciencias_naturales.json.json` | 20 | 6 | 14 | 0 | - | `SV-CIE-11-2026-W35-cambio-climatico-001-MASTERY-bundle` |
| `sv-week-35-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W35-speaking-opinions-001-MASTERY-bundle` |
| `sv-week-35-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W35-desarrollo-sostenible-001-MASTERY-bundle` |
| `sv-week-36-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W36-writing-paragraphs-001-MASTERY-bundle` |
| `sv-week-36-grade-11-subject-sociales.json.json` | 20 | 0 | 20 | 0 | - | `SV-SOC-11-2026-W36-cambio-climatico-001-MASTERY-bundle` |
| `sv-week-37-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W37-ciudadania-global-001-MASTERY-bundle` |
| `sv-week-38-grade-11-subject-ciencias_naturales.json.json` | 20 | 8 | 12 | 0 | - | `SV-CIE-11-2026-W38-revision-integral-001-MASTERY-bundle` |
| `sv-week-38-grade-11-subject-ingles.json.json` | 20 | 14 | 6 | 0 | - | `SV-ING-11-2026-W38-writing-emails-001-MASTERY-bundle` |
| `sv-week-38-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W38-revision-integral-001-MASTERY-bundle` |
| `sv-week-39-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W39-writing-stories-001-MASTERY-bundle` |
| `sv-week-39-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W39-identidad-cultural-sv-001-MASTERY-bundle` |
| `sv-week-4-grade-11-subject-ingles.json.json` | 20 | 5 | 15 | 0 | - | `SV-ING-11-2026-W04-past-continuous-001-MASTERY-bundle` |
| `sv-week-4-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W04-historia-prehispanica-001-MASTERY-bundle` |
| `sv-week-40-grade-11-subject-ciencias_naturales.json.json` | 20 | 8 | 12 | 0 | - | `SV-CIE-11-2026-W40-celula-estructura-001-MASTERY-bundle` |
| `sv-week-40-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W40-integrated-skills-001-MASTERY-bundle` |
| `sv-week-5-grade-11-subject-ciencias_naturales.json.json` | 20 | 7 | 13 | 0 | - | `SV-CIE-11-2026-W05-division-celular-mitosis-001-MASTERY-bundle` |
| `sv-week-6-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W06-past-perfect-001-MASTERY-bundle` |
| `sv-week-6-grade-11-subject-sociales.json.json` | 20 | 16 | 4 | 0 | - | `SV-SOC-11-2026-W06-colonia-sv-001-MASTERY-bundle` |
| `sv-week-7-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W07-future-will-going-001-MASTERY-bundle` |
| `sv-week-7-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W07-independencia-ca-001-MASTERY-bundle` |
| `sv-week-8-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W08-future-perfect-001-MASTERY-bundle` |
| `sv-week-8-grade-11-subject-sociales.json.json` | 20 | 5 | 15 | 0 | - | `SV-SOC-11-2026-W08-federal-ca-001-MASTERY-bundle` |
| `sv-week-9-grade-11-subject-ingles.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W09-modal-verbs-001-MASTERY-bundle` |
| `uy-week-1-grade-11-subject-ciencias_naturales.json.json` | 20 | 17 | 3 | 0 | - | `UY-CIE-11-2026-W01-tema-w01-001-MASTERY-bundle` |
| `uy-week-10-grade-11-subject-ciencias_naturales.json.json` | 20 | 16 | 4 | 0 | - | `UY-CIE-11-2026-W10-tema-w10-001-MASTERY-bundle` |
| `uy-week-2-grade-11-subject-ciencias_naturales.json.json` | 20 | 16 | 4 | 0 | - | `UY-CIE-11-2026-W02-tema-w02-001-MASTERY-bundle` |
| `uy-week-3-grade-11-subject-ciencias_naturales.json.json` | 20 | 15 | 5 | 0 | - | `UY-CIE-11-2026-W03-tema-w03-001-MASTERY-bundle` |
| `uy-week-4-grade-11-subject-ciencias_naturales.json.json` | 20 | 16 | 4 | 0 | - | `UY-CIE-11-2026-W04-tema-w04-001-MASTERY-bundle` |
| `uy-week-5-grade-11-subject-ciencias_naturales.json.json` | 20 | 16 | 4 | 0 | - | `UY-CIE-11-2026-W05-tema-w05-001-MASTERY-bundle` |
| `uy-week-6-grade-11-subject-ciencias_naturales.json.json` | 20 | 18 | 2 | 0 | - | `UY-CIE-11-2026-W06-tema-w06-001-MASTERY-bundle` |
| `uy-week-7-grade-11-subject-ciencias_naturales.json.json` | 20 | 17 | 3 | 0 | - | `UY-CIE-11-2026-W07-tema-w07-001-MASTERY-bundle` |
| `uy-week-8-grade-11-subject-ciencias_naturales.json.json` | 20 | 16 | 4 | 0 | - | `UY-CIE-11-2026-W08-tema-w08-001-MASTERY-bundle` |
| `uy-week-9-grade-11-subject-ciencias_naturales.json.json` | 20 | 15 | 5 | 0 | - | `UY-CIE-11-2026-W09-tema-w09-001-MASTERY-bundle` |

### 2-ALCANZABLE, pendiente de decision (Brasil, bundle borrado de questions_data) — 10 ficheros

Los 200 enunciados son reales pero su `bundle_id` (`BR-MAT-11-2026-W1x-tema-w1x-001-MASTERY-bundle`)
ya no existe en `questions_data/`: no hay markdown contra el que regenerar. Decidir si se recuperan
los bundles desde git o se withdrawan estos 10 packs.

Por pais: br=10

| pack | n | ok | mal | sin bundle | tipo | bundle_id |
|---|---|---|---|---|---|---|
| `br-week-11-grade-11-subject-matematicas.json.json` | 40 | 20 | 0 | 20 | - | `BR-MAT-11-2026-W11-tema-w11-001-MASTERY-bundle` |
| `br-week-12-grade-11-subject-matematicas.json.json` | 20 | 0 | 0 | 20 | - | `BR-MAT-11-2026-W12-tema-w12-001-MASTERY-bundle` |
| `br-week-13-grade-11-subject-matematicas.json.json` | 20 | 0 | 0 | 20 | - | `BR-MAT-11-2026-W13-tema-w13-001-MASTERY-bundle` |
| `br-week-14-grade-11-subject-matematicas.json.json` | 20 | 0 | 0 | 20 | - | `BR-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle` |
| `br-week-15-grade-11-subject-matematicas.json.json` | 20 | 0 | 0 | 20 | - | `BR-MAT-11-2026-W15-tema-w15-001-MASTERY-bundle` |
| `br-week-16-grade-11-subject-matematicas.json.json` | 20 | 0 | 0 | 20 | - | `BR-MAT-11-2026-W16-tema-w16-001-MASTERY-bundle` |
| `br-week-17-grade-11-subject-matematicas.json.json` | 20 | 0 | 0 | 20 | - | `BR-MAT-11-2026-W17-tema-w17-001-MASTERY-bundle` |
| `br-week-18-grade-11-subject-matematicas.json.json` | 20 | 0 | 0 | 20 | - | `BR-MAT-11-2026-W18-tema-w18-001-MASTERY-bundle` |
| `br-week-19-grade-11-subject-matematicas.json.json` | 20 | 0 | 0 | 20 | - | `BR-MAT-11-2026-W19-tema-w19-001-MASTERY-bundle` |
| `br-week-20-grade-11-subject-matematicas.json.json` | 20 | 0 | 0 | 20 | - | `BR-MAT-11-2026-W20-tema-w20-001-MASTERY-bundle` |

### 3-INALCANZABLE (alias sombreado / nombre no canonico): el worker nunca lo pide — 396 ficheros

No son urgencia de usuario (el manifest + `resolveWeekPackNames` nunca los seleccionan) pero pesan
en el bundle de assets y ensucian cualquier auditoria. Son sobre todo los alias copiados por
`cafb3a843d` (`subject-english`, `subject-ing`, `subject-matematica`, `subject-Matematica`...).

Por pais: co=157, sv=95, ec=46, pe=21, py=21, pr=14, puerto=12, uy=12, cl=10, cr=7, bo=1

| pack | n | ok | mal | sin bundle | tipo | bundle_id |
|---|---|---|---|---|---|---|
| `bo-week-3-grade-11-subject-matematica.json.json` | 20 | 7 | 13 | 0 | - | `BO-MAT-11-2026-W03-tema-w03-001-MASTERY-bundle` |
| `cl-week-1-grade-11-subject-matematica.json.json` | 20 | 0 | 20 | 0 | - | `CL-MAT-11-2026-W01-numeros-reales-001-MASTERY-bundle` |
| `cl-week-10-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `CL-MAT-11-2026-W10-funcion-exponencial-001-MASTERY-bundle` |
| `cl-week-2-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `CL-MAT-11-2026-W02-razones-proporciones-001-MASTERY-bundle` |
| `cl-week-3-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `CL-MAT-11-2026-W03-potencias-raices-001-MASTERY-bundle` |
| `cl-week-4-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `CL-MAT-11-2026-W04-expresiones-algebraicas-001-MASTERY-bundle` |
| `cl-week-5-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `CL-MAT-11-2026-W05-ecuaciones-lineales-001-MASTERY-bundle` |
| `cl-week-6-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `CL-MAT-11-2026-W06-sistemas-ecuaciones-001-MASTERY-bundle` |
| `cl-week-7-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `CL-MAT-11-2026-W07-inecuaciones-001-MASTERY-bundle` |
| `cl-week-8-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `CL-MAT-11-2026-W08-funcion-lineal-001-MASTERY-bundle` |
| `cl-week-9-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `CL-MAT-11-2026-W09-funcion-cuadratica-001-MASTERY-bundle` |
| `co-week-1-grade-11-subject-english.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W01-global-issues-001-MASTERY-bundle` |
| `co-week-1-grade-11-subject-ing.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W01-global-issues-001-MASTERY-bundle` |
| `co-week-1-grade-6-subject-sociales.json.json` | 10 | 0 | 0 | 10 | - | `CO-SOC-6-civilizaciones-mesopotamia-egipto-001-v3-bundle` |
| `co-week-10-grade-11-subject-english.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W10-review-p1-001-MASTERY-bundle` |
| `co-week-10-grade-11-subject-ing.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W10-review-p1-001-MASTERY-bundle` |
| `co-week-10-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W10-repaso-p2-001-MASTERY-bundle` |
| `co-week-10-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W10-repaso-p2-001-MASTERY-bundle` |
| `co-week-10-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W10-p1-final-review-001-MASTERY-bundle` |
| `co-week-10-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W10-p1-final-review-001-MASTERY-bundle` |
| `co-week-11-grade-11-subject-english.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W11-social-justice-001-MASTERY-bundle` |
| `co-week-11-grade-11-subject-ing.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W11-social-justice-001-MASTERY-bundle` |
| `co-week-11-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W11-parts-of-body-001-MASTERY-bundle` |
| `co-week-11-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W11-parts-of-body-001-MASTERY-bundle` |
| `co-week-12-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W12-philosophy-ethics-001-MASTERY-bundle` |
| `co-week-12-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W12-philosophy-ethics-001-MASTERY-bundle` |
| `co-week-12-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W12-possessive-adjectives-001-MASTERY-bundle` |
| `co-week-12-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W12-possessive-adjectives-001-MASTERY-bundle` |
| `co-week-13-grade-11-subject-english.json.json` | 20 | 7 | 13 | 0 | - | `CO-ING-11-2026-W13-urban-development-001-MASTERY-bundle` |
| `co-week-13-grade-11-subject-ing.json.json` | 20 | 7 | 13 | 0 | - | `CO-ING-11-2026-W13-urban-development-001-MASTERY-bundle` |
| `co-week-13-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W13-describing-people-physical-001-MASTERY-bundle` |
| `co-week-13-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W13-describing-people-physical-001-MASTERY-bundle` |
| `co-week-14-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W14-digital-citizenship-001-MASTERY-bundle` |
| `co-week-14-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W14-digital-citizenship-001-MASTERY-bundle` |
| `co-week-14-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W14-house-furniture-001-MASTERY-bundle` |
| `co-week-14-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W14-house-furniture-001-MASTERY-bundle` |
| `co-week-14-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W14-describing-people-personality-001-MASTERY-bundle` |
| `co-week-14-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W14-describing-people-personality-001-MASTERY-bundle` |
| `co-week-15-grade-11-subject-english.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W15-historical-turning-points-001-MASTERY-bundle` |
| `co-week-15-grade-11-subject-ing.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W15-historical-turning-points-001-MASTERY-bundle` |
| `co-week-15-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W15-repaso-p3-001-MASTERY-bundle` |
| `co-week-15-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W15-repaso-p3-001-MASTERY-bundle` |
| `co-week-15-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W15-prepositions-place-basic-001-MASTERY-bundle` |
| `co-week-15-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W15-prepositions-place-basic-001-MASTERY-bundle` |
| `co-week-16-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W16-literature-arts-001-MASTERY-bundle` |
| `co-week-16-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W16-literature-arts-001-MASTERY-bundle` |
| `co-week-17-grade-11-subject-english.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W17-psychology-wellbeing-001-MASTERY-bundle` |
| `co-week-17-grade-11-subject-ing.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W17-psychology-wellbeing-001-MASTERY-bundle` |
| `co-week-17-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W17-parts-of-house-001-MASTERY-bundle` |
| `co-week-17-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W17-parts-of-house-001-MASTERY-bundle` |
| `co-week-18-grade-11-subject-english.json.json` | 20 | 8 | 12 | 0 | - | `CO-ING-11-2026-W18-globalization-001-MASTERY-bundle` |
| `co-week-18-grade-11-subject-ing.json.json` | 20 | 8 | 12 | 0 | - | `CO-ING-11-2026-W18-globalization-001-MASTERY-bundle` |
| `co-week-18-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W18-fruits-vegetables-001-MASTERY-bundle` |
| `co-week-18-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W18-fruits-vegetables-001-MASTERY-bundle` |
| `co-week-18-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W18-furniture-001-MASTERY-bundle` |
| `co-week-18-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W18-furniture-001-MASTERY-bundle` |
| `co-week-19-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W19-workplace-evolution-001-MASTERY-bundle` |
| `co-week-19-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W19-workplace-evolution-001-MASTERY-bundle` |
| `co-week-19-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W19-daily-routines-1-001-MASTERY-bundle` |
| `co-week-19-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W19-daily-routines-1-001-MASTERY-bundle` |
| `co-week-2-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W02-environmental-sustainability-001-MASTERY-bundle` |
| `co-week-2-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W02-environmental-sustainability-001-MASTERY-bundle` |
| `co-week-2-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W02-alphabet-spelling-001-MASTERY-bundle` |
| `co-week-2-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W02-alphabet-spelling-001-MASTERY-bundle` |
| `co-week-20-grade-11-subject-english.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W20-review-p2-001-MASTERY-bundle` |
| `co-week-20-grade-11-subject-ing.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W20-review-p2-001-MASTERY-bundle` |
| `co-week-20-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W20-p2-final-review-001-MASTERY-bundle` |
| `co-week-20-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W20-p2-final-review-001-MASTERY-bundle` |
| `co-week-21-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W21-environmental-activism-001-MASTERY-bundle` |
| `co-week-21-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W21-environmental-activism-001-MASTERY-bundle` |
| `co-week-22-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W22-ai-future-work-001-MASTERY-bundle` |
| `co-week-22-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W22-ai-future-work-001-MASTERY-bundle` |
| `co-week-22-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W22-likes-dislikes-001-MASTERY-bundle` |
| `co-week-22-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W22-likes-dislikes-001-MASTERY-bundle` |
| `co-week-23-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W23-international-relations-001-MASTERY-bundle` |
| `co-week-23-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W23-international-relations-001-MASTERY-bundle` |
| `co-week-24-grade-11-subject-english.json.json` | 20 | 8 | 12 | 0 | - | `CO-ING-11-2026-W24-tourism-heritage-001-MASTERY-bundle` |
| `co-week-24-grade-11-subject-ing.json.json` | 20 | 8 | 12 | 0 | - | `CO-ING-11-2026-W24-tourism-heritage-001-MASTERY-bundle` |
| `co-week-25-grade-11-subject-english.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W25-health-bioethics-001-MASTERY-bundle` |
| `co-week-25-grade-11-subject-ing.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W25-health-bioethics-001-MASTERY-bundle` |
| `co-week-25-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W25-frequency-adverbs-001-MASTERY-bundle` |
| `co-week-25-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W25-frequency-adverbs-001-MASTERY-bundle` |
| `co-week-26-grade-11-subject-english.json.json` | 20 | 8 | 12 | 0 | - | `CO-ING-11-2026-W26-education-systems-001-MASTERY-bundle` |
| `co-week-26-grade-11-subject-ing.json.json` | 20 | 8 | 12 | 0 | - | `CO-ING-11-2026-W26-education-systems-001-MASTERY-bundle` |
| `co-week-26-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W26-weather-001-MASTERY-bundle` |
| `co-week-26-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W26-weather-001-MASTERY-bundle` |
| `co-week-26-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W26-free-time-activities-001-MASTERY-bundle` |
| `co-week-26-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W26-free-time-activities-001-MASTERY-bundle` |
| `co-week-27-grade-11-subject-english.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W27-migration-diaspora-001-MASTERY-bundle` |
| `co-week-27-grade-11-subject-ing.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W27-migration-diaspora-001-MASTERY-bundle` |
| `co-week-27-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W27-sports-001-MASTERY-bundle` |
| `co-week-27-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W27-sports-001-MASTERY-bundle` |
| `co-week-28-grade-11-subject-english.json.json` | 20 | 12 | 8 | 0 | - | `CO-ING-11-2026-W28-energy-sources-001-MASTERY-bundle` |
| `co-week-28-grade-11-subject-ing.json.json` | 20 | 12 | 8 | 0 | - | `CO-ING-11-2026-W28-energy-sources-001-MASTERY-bundle` |
| `co-week-28-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W28-telling-time-001-MASTERY-bundle` |
| `co-week-28-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W28-telling-time-001-MASTERY-bundle` |
| `co-week-29-grade-11-subject-english.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W29-space-exploration-001-MASTERY-bundle` |
| `co-week-29-grade-11-subject-ing.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W29-space-exploration-001-MASTERY-bundle` |
| `co-week-3-grade-11-subject-english.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W03-technological-breakthroughs-001-MASTERY-bundle` |
| `co-week-3-grade-11-subject-ing.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W03-technological-breakthroughs-001-MASTERY-bundle` |
| `co-week-3-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W03-numbers-1-20-001-MASTERY-bundle` |
| `co-week-3-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W03-numbers-1-20-001-MASTERY-bundle` |
| `co-week-30-grade-11-subject-english.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W30-review-p3-001-MASTERY-bundle` |
| `co-week-30-grade-11-subject-ing.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W30-review-p3-001-MASTERY-bundle` |
| `co-week-30-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W30-repaso-p6-001-MASTERY-bundle` |
| `co-week-30-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W30-repaso-p6-001-MASTERY-bundle` |
| `co-week-30-grade-4-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-4-2026-W30-prepositions-place-001-MASTERY-bundle` |
| `co-week-30-grade-4-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-4-2026-W30-prepositions-place-001-MASTERY-bundle` |
| `co-week-30-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W30-p3-final-review-001-MASTERY-bundle` |
| `co-week-30-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W30-p3-final-review-001-MASTERY-bundle` |
| `co-week-31-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W31-financial-literacy-001-MASTERY-bundle` |
| `co-week-31-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W31-financial-literacy-001-MASTERY-bundle` |
| `co-week-32-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W32-youth-culture-001-MASTERY-bundle` |
| `co-week-32-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W32-youth-culture-001-MASTERY-bundle` |
| `co-week-32-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W32-countable-uncountable-001-MASTERY-bundle` |
| `co-week-32-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W32-countable-uncountable-001-MASTERY-bundle` |
| `co-week-33-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W33-conflict-resolution-001-MASTERY-bundle` |
| `co-week-33-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W33-conflict-resolution-001-MASTERY-bundle` |
| `co-week-33-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W33-how-much-many-001-MASTERY-bundle` |
| `co-week-33-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W33-how-much-many-001-MASTERY-bundle` |
| `co-week-34-grade-11-subject-english.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W34-biodiversity-001-MASTERY-bundle` |
| `co-week-34-grade-11-subject-ing.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W34-biodiversity-001-MASTERY-bundle` |
| `co-week-34-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W34-sports-001-MASTERY-bundle` |
| `co-week-34-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W34-sports-001-MASTERY-bundle` |
| `co-week-34-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W34-likes-dislikes-001-MASTERY-bundle` |
| `co-week-34-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W34-likes-dislikes-001-MASTERY-bundle` |
| `co-week-35-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W35-governance-democracy-001-MASTERY-bundle` |
| `co-week-35-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W35-governance-democracy-001-MASTERY-bundle` |
| `co-week-36-grade-11-subject-english.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W36-innovation-startups-001-MASTERY-bundle` |
| `co-week-36-grade-11-subject-ing.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W36-innovation-startups-001-MASTERY-bundle` |
| `co-week-36-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W36-giving-directions-001-MASTERY-bundle` |
| `co-week-36-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W36-giving-directions-001-MASTERY-bundle` |
| `co-week-37-grade-11-subject-english.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W37-future-cities-001-MASTERY-bundle` |
| `co-week-37-grade-11-subject-ing.json.json` | 20 | 11 | 9 | 0 | - | `CO-ING-11-2026-W37-future-cities-001-MASTERY-bundle` |
| `co-week-37-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W37-present-continuous-intro-001-MASTERY-bundle` |
| `co-week-37-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W37-present-continuous-intro-001-MASTERY-bundle` |
| `co-week-38-grade-11-subject-english.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W38-comprehensive-review-1-001-MASTERY-bundle` |
| `co-week-38-grade-11-subject-ing.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W38-comprehensive-review-1-001-MASTERY-bundle` |
| `co-week-38-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W38-describing-objects-001-MASTERY-bundle` |
| `co-week-38-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W38-describing-objects-001-MASTERY-bundle` |
| `co-week-39-grade-11-subject-english.json.json` | 20 | 12 | 8 | 0 | - | `CO-ING-11-2026-W39-comprehensive-review-2-001-MASTERY-bundle` |
| `co-week-39-grade-11-subject-ing.json.json` | 20 | 12 | 8 | 0 | - | `CO-ING-11-2026-W39-comprehensive-review-2-001-MASTERY-bundle` |
| `co-week-39-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W39-final-review-1-001-MASTERY-bundle` |
| `co-week-39-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W39-final-review-1-001-MASTERY-bundle` |
| `co-week-4-grade-11-subject-english.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W04-future-challenges-001-MASTERY-bundle` |
| `co-week-4-grade-11-subject-ing.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W04-future-challenges-001-MASTERY-bundle` |
| `co-week-40-grade-11-subject-english.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W40-comprehensive-review-3-001-MASTERY-bundle` |
| `co-week-40-grade-11-subject-ing.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W40-comprehensive-review-3-001-MASTERY-bundle` |
| `co-week-40-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W40-final-review-2-001-MASTERY-bundle` |
| `co-week-40-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W40-final-review-2-001-MASTERY-bundle` |
| `co-week-5-grade-11-subject-english.json.json` | 20 | 8 | 12 | 0 | - | `CO-ING-11-2026-W05-cultural-diplomacy-001-MASTERY-bundle` |
| `co-week-5-grade-11-subject-ing.json.json` | 20 | 8 | 12 | 0 | - | `CO-ING-11-2026-W05-cultural-diplomacy-001-MASTERY-bundle` |
| `co-week-5-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W05-numbers-colors-001-MASTERY-bundle` |
| `co-week-5-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W05-numbers-colors-001-MASTERY-bundle` |
| `co-week-6-grade-11-subject-english.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W06-economic-trends-001-MASTERY-bundle` |
| `co-week-6-grade-11-subject-ing.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W06-economic-trends-001-MASTERY-bundle` |
| `co-week-6-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W06-classroom-objects-001-MASTERY-bundle` |
| `co-week-6-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W06-classroom-objects-001-MASTERY-bundle` |
| `co-week-6-grade-6-subject-english.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W06-classroom-objects-001-MASTERY-bundle` |
| `co-week-6-grade-6-subject-ing.json.json` | 10 | 0 | 10 | 0 | - | `CO-ING-6-2026-W06-classroom-objects-001-MASTERY-bundle` |
| `co-week-7-grade-11-subject-english.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W07-media-ethics-001-MASTERY-bundle` |
| `co-week-7-grade-11-subject-ing.json.json` | 20 | 9 | 11 | 0 | - | `CO-ING-11-2026-W07-media-ethics-001-MASTERY-bundle` |
| `co-week-7-grade-3-subject-english.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W07-classroom-commands-001-MASTERY-bundle` |
| `co-week-7-grade-3-subject-ing.json.json` | 8 | 0 | 8 | 0 | - | `CO-ING-3-2026-W07-classroom-commands-001-MASTERY-bundle` |
| `co-week-8-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W08-human-rights-001-MASTERY-bundle` |
| `co-week-8-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W08-human-rights-001-MASTERY-bundle` |
| `co-week-9-grade-11-subject-english.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W09-scientific-innovations-001-MASTERY-bundle` |
| `co-week-9-grade-11-subject-ing.json.json` | 20 | 10 | 10 | 0 | - | `CO-ING-11-2026-W09-scientific-innovations-001-MASTERY-bundle` |
| `cr-week-10-grade-11-subject-matematica.json.json` | 20 | 12 | 8 | 0 | - | `CR-MAT-11-2026-W10-tema-w10-001-MASTERY-bundle` |
| `cr-week-3-grade-11-subject-matematica.json.json` | 20 | 14 | 6 | 0 | - | `CR-MAT-11-2026-W03-tema-w03-001-MASTERY-bundle` |
| `cr-week-4-grade-11-subject-matematica.json.json` | 20 | 12 | 8 | 0 | - | `CR-MAT-11-2026-W04-tema-w04-001-MASTERY-bundle` |
| `cr-week-5-grade-11-subject-matematica.json.json` | 20 | 12 | 8 | 0 | - | `CR-MAT-11-2026-W05-tema-w05-001-MASTERY-bundle` |
| `cr-week-7-grade-11-subject-matematica.json.json` | 20 | 12 | 8 | 0 | - | `CR-MAT-11-2026-W07-tema-w07-001-MASTERY-bundle` |
| `cr-week-8-grade-11-subject-matematica.json.json` | 20 | 12 | 8 | 0 | - | `CR-MAT-11-2026-W08-tema-w08-001-MASTERY-bundle` |
| `cr-week-9-grade-11-subject-matematica.json.json` | 20 | 12 | 8 | 0 | - | `CR-MAT-11-2026-W09-tema-w09-001-MASTERY-bundle` |
| `ec-week-1-grade-11-subject-espanol.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W01-comunicacion-elementos-001-MASTERY-bundle` |
| `ec-week-1-grade-11-subject-lenguaje.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W01-comunicacion-elementos-001-MASTERY-bundle` |
| `ec-week-1-grade-11-subject-matematica.json.json` | 20 | 18 | 2 | 0 | - | `EC-MAT-11-2026-W01-conjuntos-numericos-001-MASTERY-bundle` |
| `ec-week-10-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W10-future-continuous-perfect-001-MASTERY-bundle` |
| `ec-week-10-grade-11-subject-espanol.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W10-textos-argumentativos-001-MASTERY-bundle` |
| `ec-week-10-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W10-future-continuous-perfect-001-MASTERY-bundle` |
| `ec-week-10-grade-11-subject-lenguaje.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W10-textos-argumentativos-001-MASTERY-bundle` |
| `ec-week-10-grade-11-subject-matematica.json.json` | 20 | 19 | 1 | 0 | - | `EC-MAT-11-2026-W10-inecuaciones-lineales-001-MASTERY-bundle` |
| `ec-week-14-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W14-conditionals-type-0-1-001-MASTERY-bundle` |
| `ec-week-14-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W14-conditionals-type-0-1-001-MASTERY-bundle` |
| `ec-week-18-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W18-causative-have-get-001-MASTERY-bundle` |
| `ec-week-18-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W18-causative-have-get-001-MASTERY-bundle` |
| `ec-week-2-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W02-present-continuous-actions-001-MASTERY-bundle` |
| `ec-week-2-grade-11-subject-espanol.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W02-funciones-lenguaje-001-MASTERY-bundle` |
| `ec-week-2-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W02-present-continuous-actions-001-MASTERY-bundle` |
| `ec-week-2-grade-11-subject-lenguaje.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W02-funciones-lenguaje-001-MASTERY-bundle` |
| `ec-week-22-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W22-relative-clauses-non-defining-001-MASTERY-bundle` |
| `ec-week-22-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W22-relative-clauses-non-defining-001-MASTERY-bundle` |
| `ec-week-26-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W26-articles-definite-indefinite-001-MASTERY-bundle` |
| `ec-week-26-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W26-articles-definite-indefinite-001-MASTERY-bundle` |
| `ec-week-3-grade-11-subject-espanol.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W03-lengua-lenguaje-habla-001-MASTERY-bundle` |
| `ec-week-3-grade-11-subject-lenguaje.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W03-lengua-lenguaje-habla-001-MASTERY-bundle` |
| `ec-week-30-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W30-phrasal-verbs-inseparable-001-MASTERY-bundle` |
| `ec-week-30-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W30-phrasal-verbs-inseparable-001-MASTERY-bundle` |
| `ec-week-34-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W34-vocabulary-work-careers-001-MASTERY-bundle` |
| `ec-week-34-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W34-vocabulary-work-careers-001-MASTERY-bundle` |
| `ec-week-38-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W38-reading-detail-inference-001-MASTERY-bundle` |
| `ec-week-38-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W38-reading-detail-inference-001-MASTERY-bundle` |
| `ec-week-4-grade-11-subject-espanol.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W04-variedades-linguisticas-ecuador-001-MASTERY-bundle` |
| `ec-week-4-grade-11-subject-lenguaje.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W04-variedades-linguisticas-ecuador-001-MASTERY-bundle` |
| `ec-week-4-grade-11-subject-matematica.json.json` | 20 | 19 | 1 | 0 | - | `EC-MAT-11-2026-W04-logaritmos-propiedades-001-MASTERY-bundle` |
| `ec-week-5-grade-11-subject-espanol.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W05-comprension-literal-001-MASTERY-bundle` |
| `ec-week-5-grade-11-subject-lenguaje.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W05-comprension-literal-001-MASTERY-bundle` |
| `ec-week-6-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W06-present-perfect-experiences-001-MASTERY-bundle` |
| `ec-week-6-grade-11-subject-espanol.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W06-comprension-inferencial-001-MASTERY-bundle` |
| `ec-week-6-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `EC-ING-11-2026-W06-present-perfect-experiences-001-MASTERY-bundle` |
| `ec-week-6-grade-11-subject-lenguaje.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W06-comprension-inferencial-001-MASTERY-bundle` |
| `ec-week-6-grade-11-subject-matematica.json.json` | 20 | 19 | 1 | 0 | - | `EC-MAT-11-2026-W06-productos-notables-001-MASTERY-bundle` |
| `ec-week-7-grade-11-subject-espanol.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W07-comprension-critica-001-MASTERY-bundle` |
| `ec-week-7-grade-11-subject-lenguaje.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W07-comprension-critica-001-MASTERY-bundle` |
| `ec-week-8-grade-11-subject-espanol.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W08-textos-narrativos-001-MASTERY-bundle` |
| `ec-week-8-grade-11-subject-lenguaje.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W08-textos-narrativos-001-MASTERY-bundle` |
| `ec-week-8-grade-11-subject-matematica.json.json` | 20 | 19 | 1 | 0 | - | `EC-MAT-11-2026-W08-ecuaciones-lineales-001-MASTERY-bundle` |
| `ec-week-9-grade-11-subject-espanol.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W09-textos-expositivos-001-MASTERY-bundle` |
| `ec-week-9-grade-11-subject-lenguaje.json.json` | 20 | 0 | 0 | 20 | - | `EC-LEN-11-2026-W09-textos-expositivos-001-MASTERY-bundle` |
| `ec-week-9-grade-11-subject-matematica.json.json` | 20 | 19 | 1 | 0 | - | `EC-MAT-11-2026-W09-sistemas-ecuaciones-lineales-001-MASTERY-bundle` |
| `pe-week-1-grade-11-subject-ciencias.json.json` | 20 | 10 | 10 | 0 | - | `PE-NAT-11-2026-W01-tema-w01-001-MASTERY-bundle` |
| `pe-week-1-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `PE-ING-11-2026-W01-present-simple-001-MASTERY-bundle` |
| `pe-week-1-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `PE-ING-11-2026-W01-present-simple-001-MASTERY-bundle` |
| `pe-week-11-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `PE-MAT-11-2026-W11-inecuaciones-lineales-001-MASTERY-bundle` |
| `pe-week-12-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `PE-MAT-11-2026-W12-ecuaciones-cuadraticas-001-MASTERY-bundle` |
| `pe-week-13-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `PE-ING-11-2026-W13-countable-uncountable-001-MASTERY-bundle` |
| `pe-week-13-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `PE-ING-11-2026-W13-countable-uncountable-001-MASTERY-bundle` |
| `pe-week-14-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `PE-MAT-11-2026-W14-funcion-cuadratica-001-MASTERY-bundle` |
| `pe-week-15-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `PE-MAT-11-2026-W15-funcion-exponencial-001-MASTERY-bundle` |
| `pe-week-16-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `PE-MAT-11-2026-W16-funcion-logaritmica-001-MASTERY-bundle` |
| `pe-week-17-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `PE-MAT-11-2026-W17-sucesiones-progresiones-001-MASTERY-bundle` |
| `pe-week-17-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `PE-ING-11-2026-W17-prepositions-time-001-MASTERY-bundle` |
| `pe-week-17-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `PE-ING-11-2026-W17-prepositions-time-001-MASTERY-bundle` |
| `pe-week-18-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `PE-MAT-11-2026-W18-geometria-angulos-001-MASTERY-bundle` |
| `pe-week-19-grade-11-subject-Matematica.json.json` | 20 | 0 | 20 | 0 | - | `PE-MAT-11-2026-W19-geometria-triangulos-001-MASTERY-bundle` |
| `pe-week-21-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `PE-ING-11-2026-W21-phrasal-verbs-advanced-001-MASTERY-bundle` |
| `pe-week-21-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `PE-ING-11-2026-W21-phrasal-verbs-advanced-001-MASTERY-bundle` |
| `pe-week-5-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `PE-ING-11-2026-W05-present-perfect-001-MASTERY-bundle` |
| `pe-week-5-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `PE-ING-11-2026-W05-present-perfect-001-MASTERY-bundle` |
| `pe-week-9-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `PE-ING-11-2026-W09-conditionals-001-MASTERY-bundle` |
| `pe-week-9-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `PE-ING-11-2026-W09-conditionals-001-MASTERY-bundle` |
| `pr-week-12-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W12-modal-verbs-possibility-probability-001-MASTERY-bundle` |
| `pr-week-12-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W12-modal-verbs-possibility-probability-001-MASTERY-bundle` |
| `pr-week-14-grade-11-subject-matematica.json.json` | 20 | 16 | 4 | 0 | - | `PR-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle` |
| `pr-week-15-grade-11-subject-matematica.json.json` | 20 | 4 | 16 | 0 | - | `PR-MAT-11-2026-W15-tema-w15-001-MASTERY-bundle` |
| `pr-week-16-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W16-passive-voice-future-modals-001-MASTERY-bundle` |
| `pr-week-16-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W16-passive-voice-future-modals-001-MASTERY-bundle` |
| `pr-week-16-grade-11-subject-matematica.json.json` | 20 | 15 | 5 | 0 | - | `PR-MAT-11-2026-W16-tema-w16-001-MASTERY-bundle` |
| `pr-week-17-grade-11-subject-matematica.json.json` | 20 | 5 | 15 | 0 | - | `PR-MAT-11-2026-W17-tema-w17-001-MASTERY-bundle` |
| `pr-week-18-grade-11-subject-matematica.json.json` | 20 | 5 | 15 | 0 | - | `PR-MAT-11-2026-W18-tema-w18-001-MASTERY-bundle` |
| `pr-week-20-grade-11-subject-matematica.json.json` | 20 | 14 | 6 | 0 | - | `PR-MAT-11-2026-W20-tema-w20-001-MASTERY-bundle` |
| `pr-week-4-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W04-past-continuous-interrupted-001-MASTERY-bundle` |
| `pr-week-4-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W04-past-continuous-interrupted-001-MASTERY-bundle` |
| `pr-week-8-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W08-future-will-be-going-to-001-MASTERY-bundle` |
| `pr-week-8-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W08-future-will-be-going-to-001-MASTERY-bundle` |
| `puerto-rico-week-12-grade-11-subject-english.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W12-modal-verbs-possibility-probability-001-MASTERY-bundle` |
| `puerto-rico-week-12-grade-11-subject-ing.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W12-modal-verbs-possibility-probability-001-MASTERY-bundle` |
| `puerto-rico-week-12-grade-11-subject-ingles.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W12-modal-verbs-possibility-probability-001-MASTERY-bundle` |
| `puerto-rico-week-16-grade-11-subject-english.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W16-passive-voice-future-modals-001-MASTERY-bundle` |
| `puerto-rico-week-16-grade-11-subject-ing.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W16-passive-voice-future-modals-001-MASTERY-bundle` |
| `puerto-rico-week-16-grade-11-subject-ingles.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W16-passive-voice-future-modals-001-MASTERY-bundle` |
| `puerto-rico-week-4-grade-11-subject-english.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W04-past-continuous-interrupted-001-MASTERY-bundle` |
| `puerto-rico-week-4-grade-11-subject-ing.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W04-past-continuous-interrupted-001-MASTERY-bundle` |
| `puerto-rico-week-4-grade-11-subject-ingles.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W04-past-continuous-interrupted-001-MASTERY-bundle` |
| `puerto-rico-week-8-grade-11-subject-english.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W08-future-will-be-going-to-001-MASTERY-bundle` |
| `puerto-rico-week-8-grade-11-subject-ing.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W08-future-will-be-going-to-001-MASTERY-bundle` |
| `puerto-rico-week-8-grade-11-subject-ingles.json` | 20 | 0 | 20 | 0 | - | `PR-ING-11-2026-W08-future-will-be-going-to-001-MASTERY-bundle` |
| `py-week-1-grade-11-subject-espanol.json.json` | 20 | 4 | 16 | 0 | - | `PY-LEN-11-2026-W01-tema-w01-001-MASTERY-bundle` |
| `py-week-1-grade-11-subject-lenguaje.json.json` | 20 | 4 | 16 | 0 | - | `PY-LEN-11-2026-W01-tema-w01-001-MASTERY-bundle` |
| `py-week-10-grade-11-subject-espanol.json.json` | 20 | 0 | 20 | 0 | - | `PY-LEN-11-2026-W10-tema-w10-001-MASTERY-bundle` |
| `py-week-10-grade-11-subject-lenguaje.json.json` | 20 | 0 | 20 | 0 | - | `PY-LEN-11-2026-W10-tema-w10-001-MASTERY-bundle` |
| `py-week-2-grade-11-subject-espanol.json.json` | 20 | 6 | 14 | 0 | - | `PY-LEN-11-2026-W02-tema-w02-001-MASTERY-bundle` |
| `py-week-2-grade-11-subject-lenguaje.json.json` | 20 | 6 | 14 | 0 | - | `PY-LEN-11-2026-W02-tema-w02-001-MASTERY-bundle` |
| `py-week-3-grade-11-subject-espanol.json.json` | 20 | 3 | 17 | 0 | - | `PY-LEN-11-2026-W03-tema-w03-001-MASTERY-bundle` |
| `py-week-3-grade-11-subject-lenguaje.json.json` | 20 | 3 | 17 | 0 | - | `PY-LEN-11-2026-W03-tema-w03-001-MASTERY-bundle` |
| `py-week-3-grade-11-subject-matematica.json.json` | 20 | 12 | 8 | 0 | - | `PY-MAT-11-2026-W03-tema-w03-001-MASTERY-bundle` |
| `py-week-4-grade-11-subject-espanol.json.json` | 20 | 3 | 17 | 0 | - | `PY-LEN-11-2026-W04-tema-w04-001-MASTERY-bundle` |
| `py-week-4-grade-11-subject-lenguaje.json.json` | 20 | 3 | 17 | 0 | - | `PY-LEN-11-2026-W04-tema-w04-001-MASTERY-bundle` |
| `py-week-5-grade-11-subject-espanol.json.json` | 20 | 2 | 18 | 0 | - | `PY-LEN-11-2026-W05-tema-w05-001-MASTERY-bundle` |
| `py-week-5-grade-11-subject-lenguaje.json.json` | 20 | 2 | 18 | 0 | - | `PY-LEN-11-2026-W05-tema-w05-001-MASTERY-bundle` |
| `py-week-6-grade-11-subject-espanol.json.json` | 20 | 4 | 16 | 0 | - | `PY-LEN-11-2026-W06-tema-w06-001-MASTERY-bundle` |
| `py-week-6-grade-11-subject-lenguaje.json.json` | 20 | 4 | 16 | 0 | - | `PY-LEN-11-2026-W06-tema-w06-001-MASTERY-bundle` |
| `py-week-7-grade-11-subject-espanol.json.json` | 20 | 4 | 16 | 0 | - | `PY-LEN-11-2026-W07-tema-w07-001-MASTERY-bundle` |
| `py-week-7-grade-11-subject-lenguaje.json.json` | 20 | 4 | 16 | 0 | - | `PY-LEN-11-2026-W07-tema-w07-001-MASTERY-bundle` |
| `py-week-8-grade-11-subject-espanol.json.json` | 20 | 3 | 17 | 0 | - | `PY-LEN-11-2026-W08-tema-w08-001-MASTERY-bundle` |
| `py-week-8-grade-11-subject-lenguaje.json.json` | 20 | 3 | 17 | 0 | - | `PY-LEN-11-2026-W08-tema-w08-001-MASTERY-bundle` |
| `py-week-9-grade-11-subject-espanol.json.json` | 20 | 16 | 4 | 0 | - | `PY-LEN-11-2026-W09-tema-w09-001-MASTERY-bundle` |
| `py-week-9-grade-11-subject-lenguaje.json.json` | 20 | 16 | 4 | 0 | - | `PY-LEN-11-2026-W09-tema-w09-001-MASTERY-bundle` |
| `sv-week-1-grade-11-subject-ciencias.json.json` | 20 | 7 | 13 | 0 | - | `SV-CIE-11-2026-W01-investigacion-cientifica-001-MASTERY-bundle` |
| `sv-week-1-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W01-present-simple-001-MASTERY-bundle` |
| `sv-week-1-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W01-present-simple-001-MASTERY-bundle` |
| `sv-week-10-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W10-conditionals-0-1-001-MASTERY-bundle` |
| `sv-week-10-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W10-conditionals-0-1-001-MASTERY-bundle` |
| `sv-week-11-grade-11-subject-ciencias.json.json` | 20 | 8 | 12 | 0 | - | `SV-CIE-11-2026-W11-evolucion-001-MASTERY-bundle` |
| `sv-week-11-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W11-conditionals-2-3-001-MASTERY-bundle` |
| `sv-week-11-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W11-conditionals-2-3-001-MASTERY-bundle` |
| `sv-week-12-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W12-passive-voice-001-MASTERY-bundle` |
| `sv-week-12-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W12-passive-voice-001-MASTERY-bundle` |
| `sv-week-13-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W13-reported-speech-001-MASTERY-bundle` |
| `sv-week-13-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W13-reported-speech-001-MASTERY-bundle` |
| `sv-week-14-grade-11-subject-english.json.json` | 20 | 14 | 6 | 0 | - | `SV-ING-11-2026-W14-relative-clauses-001-MASTERY-bundle` |
| `sv-week-14-grade-11-subject-ing.json.json` | 20 | 14 | 6 | 0 | - | `SV-ING-11-2026-W14-relative-clauses-001-MASTERY-bundle` |
| `sv-week-15-grade-11-subject-ciencias.json.json` | 20 | 0 | 20 | 0 | - | `SV-CIE-11-2026-W15-biodiversidad-sv-001-MASTERY-bundle` |
| `sv-week-15-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W15-comparatives-superlatives-001-MASTERY-bundle` |
| `sv-week-15-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W15-comparatives-superlatives-001-MASTERY-bundle` |
| `sv-week-16-grade-11-subject-english.json.json` | 20 | 14 | 6 | 0 | - | `SV-ING-11-2026-W16-countable-uncountable-001-MASTERY-bundle` |
| `sv-week-16-grade-11-subject-ing.json.json` | 20 | 14 | 6 | 0 | - | `SV-ING-11-2026-W16-countable-uncountable-001-MASTERY-bundle` |
| `sv-week-17-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W17-articles-001-MASTERY-bundle` |
| `sv-week-17-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W17-articles-001-MASTERY-bundle` |
| `sv-week-18-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W18-prepositions-time-001-MASTERY-bundle` |
| `sv-week-18-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W18-prepositions-time-001-MASTERY-bundle` |
| `sv-week-19-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W19-prepositions-place-001-MASTERY-bundle` |
| `sv-week-19-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W19-prepositions-place-001-MASTERY-bundle` |
| `sv-week-2-grade-11-subject-ciencias.json.json` | 20 | 0 | 20 | 0 | - | `SV-CIE-11-2026-W02-celula-estructura-001-MASTERY-bundle` |
| `sv-week-2-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W02-present-continuous-001-MASTERY-bundle` |
| `sv-week-2-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W02-present-continuous-001-MASTERY-bundle` |
| `sv-week-20-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W20-phrasal-verbs-001-MASTERY-bundle` |
| `sv-week-20-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W20-phrasal-verbs-001-MASTERY-bundle` |
| `sv-week-21-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W21-collocations-001-MASTERY-bundle` |
| `sv-week-21-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W21-collocations-001-MASTERY-bundle` |
| `sv-week-22-grade-11-subject-ciencias.json.json` | 20 | 8 | 12 | 0 | - | `SV-CIE-11-2026-W22-reacciones-quimicas-001-MASTERY-bundle` |
| `sv-week-22-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W22-vocabulary-daily-001-MASTERY-bundle` |
| `sv-week-22-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W22-vocabulary-daily-001-MASTERY-bundle` |
| `sv-week-23-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W23-vocabulary-school-001-MASTERY-bundle` |
| `sv-week-23-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W23-vocabulary-school-001-MASTERY-bundle` |
| `sv-week-24-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W24-vocabulary-work-001-MASTERY-bundle` |
| `sv-week-24-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W24-vocabulary-work-001-MASTERY-bundle` |
| `sv-week-25-grade-11-subject-ciencias.json.json` | 20 | 6 | 14 | 0 | - | `SV-CIE-11-2026-W25-cinematica-001-MASTERY-bundle` |
| `sv-week-25-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W25-vocabulary-travel-001-MASTERY-bundle` |
| `sv-week-25-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W25-vocabulary-travel-001-MASTERY-bundle` |
| `sv-week-26-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W26-vocabulary-environment-001-MASTERY-bundle` |
| `sv-week-26-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W26-vocabulary-environment-001-MASTERY-bundle` |
| `sv-week-27-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W27-vocabulary-health-001-MASTERY-bundle` |
| `sv-week-27-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W27-vocabulary-health-001-MASTERY-bundle` |
| `sv-week-28-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W28-reading-main-idea-001-MASTERY-bundle` |
| `sv-week-28-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W28-reading-main-idea-001-MASTERY-bundle` |
| `sv-week-29-grade-11-subject-ciencias.json.json` | 20 | 7 | 13 | 0 | - | `SV-CIE-11-2026-W29-luz-optica-001-MASTERY-bundle` |
| `sv-week-29-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W29-reading-details-001-MASTERY-bundle` |
| `sv-week-29-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W29-reading-details-001-MASTERY-bundle` |
| `sv-week-3-grade-11-subject-ciencias.json.json` | 20 | 8 | 12 | 0 | - | `SV-CIE-11-2026-W03-organelos-001-MASTERY-bundle` |
| `sv-week-3-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W03-past-simple-001-MASTERY-bundle` |
| `sv-week-3-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W03-past-simple-001-MASTERY-bundle` |
| `sv-week-30-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W30-reading-inference-001-MASTERY-bundle` |
| `sv-week-30-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W30-reading-inference-001-MASTERY-bundle` |
| `sv-week-31-grade-11-subject-ciencias.json.json` | 20 | 0 | 20 | 0 | - | `SV-CIE-11-2026-W31-magnetismo-001-MASTERY-bundle` |
| `sv-week-31-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W31-reading-vocabulary-001-MASTERY-bundle` |
| `sv-week-31-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W31-reading-vocabulary-001-MASTERY-bundle` |
| `sv-week-32-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W32-reading-purpose-001-MASTERY-bundle` |
| `sv-week-32-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W32-reading-purpose-001-MASTERY-bundle` |
| `sv-week-33-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W33-listening-strategies-001-MASTERY-bundle` |
| `sv-week-33-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W33-listening-strategies-001-MASTERY-bundle` |
| `sv-week-34-grade-11-subject-ciencias.json.json` | 20 | 8 | 12 | 0 | - | `SV-CIE-11-2026-W34-salud-nutricion-001-MASTERY-bundle` |
| `sv-week-34-grade-11-subject-english.json.json` | 20 | 14 | 6 | 0 | - | `SV-ING-11-2026-W34-speaking-dialogues-001-MASTERY-bundle` |
| `sv-week-34-grade-11-subject-ing.json.json` | 20 | 14 | 6 | 0 | - | `SV-ING-11-2026-W34-speaking-dialogues-001-MASTERY-bundle` |
| `sv-week-35-grade-11-subject-ciencias.json.json` | 20 | 6 | 14 | 0 | - | `SV-CIE-11-2026-W35-cambio-climatico-001-MASTERY-bundle` |
| `sv-week-35-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W35-speaking-opinions-001-MASTERY-bundle` |
| `sv-week-35-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W35-speaking-opinions-001-MASTERY-bundle` |
| `sv-week-36-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W36-writing-paragraphs-001-MASTERY-bundle` |
| `sv-week-36-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W36-writing-paragraphs-001-MASTERY-bundle` |
| `sv-week-37-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W37-writing-essays-001-MASTERY-bundle` |
| `sv-week-37-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W37-writing-essays-001-MASTERY-bundle` |
| `sv-week-38-grade-11-subject-ciencias.json.json` | 20 | 8 | 12 | 0 | - | `SV-CIE-11-2026-W38-revision-integral-001-MASTERY-bundle` |
| `sv-week-38-grade-11-subject-english.json.json` | 20 | 14 | 6 | 0 | - | `SV-ING-11-2026-W38-writing-emails-001-MASTERY-bundle` |
| `sv-week-38-grade-11-subject-ing.json.json` | 20 | 14 | 6 | 0 | - | `SV-ING-11-2026-W38-writing-emails-001-MASTERY-bundle` |
| `sv-week-39-grade-11-subject-ciencias.json.json` | 20 | 0 | 20 | 0 | - | `SV-CIE-11-2026-W39-investigacion-cientifica-001-MASTERY-bundle` |
| `sv-week-39-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W39-writing-stories-001-MASTERY-bundle` |
| `sv-week-39-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W39-writing-stories-001-MASTERY-bundle` |
| `sv-week-4-grade-11-subject-english.json.json` | 20 | 5 | 15 | 0 | - | `SV-ING-11-2026-W04-past-continuous-001-MASTERY-bundle` |
| `sv-week-4-grade-11-subject-ing.json.json` | 20 | 5 | 15 | 0 | - | `SV-ING-11-2026-W04-past-continuous-001-MASTERY-bundle` |
| `sv-week-40-grade-11-subject-ciencias.json.json` | 20 | 8 | 12 | 0 | - | `SV-CIE-11-2026-W40-celula-estructura-001-MASTERY-bundle` |
| `sv-week-40-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W40-integrated-skills-001-MASTERY-bundle` |
| `sv-week-40-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W40-integrated-skills-001-MASTERY-bundle` |
| `sv-week-5-grade-11-subject-ciencias.json.json` | 20 | 7 | 13 | 0 | - | `SV-CIE-11-2026-W05-division-celular-mitosis-001-MASTERY-bundle` |
| `sv-week-5-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W05-present-perfect-001-MASTERY-bundle` |
| `sv-week-5-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W05-present-perfect-001-MASTERY-bundle` |
| `sv-week-6-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W06-past-perfect-001-MASTERY-bundle` |
| `sv-week-6-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W06-past-perfect-001-MASTERY-bundle` |
| `sv-week-7-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W07-future-will-going-001-MASTERY-bundle` |
| `sv-week-7-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W07-future-will-going-001-MASTERY-bundle` |
| `sv-week-8-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W08-future-perfect-001-MASTERY-bundle` |
| `sv-week-8-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W08-future-perfect-001-MASTERY-bundle` |
| `sv-week-9-grade-11-subject-english.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W09-modal-verbs-001-MASTERY-bundle` |
| `sv-week-9-grade-11-subject-ing.json.json` | 20 | 0 | 20 | 0 | - | `SV-ING-11-2026-W09-modal-verbs-001-MASTERY-bundle` |
| `uy-week-1-grade-11-subject-ciencias.json.json` | 20 | 17 | 3 | 0 | - | `UY-CIE-11-2026-W01-tema-w01-001-MASTERY-bundle` |
| `uy-week-10-grade-11-subject-ciencias.json.json` | 20 | 16 | 4 | 0 | - | `UY-CIE-11-2026-W10-tema-w10-001-MASTERY-bundle` |
| `uy-week-2-grade-11-subject-ciencias.json.json` | 20 | 16 | 4 | 0 | - | `UY-CIE-11-2026-W02-tema-w02-001-MASTERY-bundle` |
| `uy-week-3-grade-11-subject-ciencias.json.json` | 20 | 15 | 5 | 0 | - | `UY-CIE-11-2026-W03-tema-w03-001-MASTERY-bundle` |
| `uy-week-3-grade-11-subject-espanol.json.json` | 20 | 19 | 1 | 0 | - | `UY-LEN-11-2026-W03-tema-w03-001-MASTERY-bundle` |
| `uy-week-3-grade-11-subject-lenguaje.json.json` | 20 | 19 | 1 | 0 | - | `UY-LEN-11-2026-W03-tema-w03-001-MASTERY-bundle` |
| `uy-week-4-grade-11-subject-ciencias.json.json` | 20 | 16 | 4 | 0 | - | `UY-CIE-11-2026-W04-tema-w04-001-MASTERY-bundle` |
| `uy-week-5-grade-11-subject-ciencias.json.json` | 20 | 16 | 4 | 0 | - | `UY-CIE-11-2026-W05-tema-w05-001-MASTERY-bundle` |
| `uy-week-6-grade-11-subject-ciencias.json.json` | 20 | 18 | 2 | 0 | - | `UY-CIE-11-2026-W06-tema-w06-001-MASTERY-bundle` |
| `uy-week-7-grade-11-subject-ciencias.json.json` | 20 | 17 | 3 | 0 | - | `UY-CIE-11-2026-W07-tema-w07-001-MASTERY-bundle` |
| `uy-week-8-grade-11-subject-ciencias.json.json` | 20 | 16 | 4 | 0 | - | `UY-CIE-11-2026-W08-tema-w08-001-MASTERY-bundle` |
| `uy-week-9-grade-11-subject-ciencias.json.json` | 20 | 15 | 5 | 0 | - | `UY-CIE-11-2026-W09-tema-w09-001-MASTERY-bundle` |

---

## 9. Como evitar que vuelva a pasar

1. **Falta el gate.** Ningun script compara `pack.questions[i].statement` contra `### Enunciado`
   del bundle. `validate-bundles-v52.mjs` valida el markdown, no el pack derivado, y por eso
   `cafb3a843d` pudo deixar 2.062 alias viejos sin que nada se quejara. Anadir
   `scripts/validate-packs-vs-bundles.mjs` al pre-push, junto a `husky-guard.mjs`.
2. **El gate debe mirar el `_manifest.json`, no `ls`.** El manifest es el indice real de lo que se
   sirve; sin el, una auditoria por directorio reporta 4x los packs que importan.
3. **`gen_ca_caribbean_generator.py` no debe escribir fuera de CA/Caribbean**, y sus 5 plantillas
   de Ingles deben quedar prohibidas (`templates[q_num % 5]` es una bomba de duplicados).
4. **El generador debe emitir los alias al escribir el canonico.** Un alias copiado a mano puede
   quedar viejo respecto a su canonico para siempre; uno derivado en la misma pasada, no.
