# AGENTS.md - WorldExams / SaberParaTodos

## SWAL ecosystem (WorldExams como nodo activo)

- **Canonical:** `docs/SWAL/GOAL.md` · `docs/SWAL/PROJECT_MAP.md`
- **Pro:** Nodo SWAL activo — sin Stripe ni suscripciones externas
- **Memoria:** Xavier HTTP/MCP · namespaces `app/worldexams/instance/{instanceId}`
- **Mesh:** edge-mesh · `swal/worldexams/{instanceId}`
- **Token:** $SWAL ownership + stake yield
- **Protocolo:** GitCore 3.8+ · feature-verify / implementation-score
- **Generación de contenido:** Jules (label `jules` en issues)
- **Integración:** Pipeline cíclico automático cada 30 min

---

Este archivo es leido por Jules para generar y validar bundles. La fuente de verdad actual es el protocolo semanal v5.2.

## Project Overview

WorldExams genera bundles de preguntas educativas para Latinoamerica.
SaberParaTodos es la app web que distribuye estos bundles.

## Content Structure

La unica ruta canonica para bundles semanales 2026 es:

```text
questions_data/{country}/{subject}/grado-{N}/2026/weekly/
  {COUNTRY}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

Excepcion controlada para Brasil 3o ano de Ensino Medio:

```text
questions_data/brasil/matematica/3o-ano/2026/weekly/
  BR-MAT-3EM-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

No guardar bundles finales en `.worldexams/`, `scratch/`, `temp/`, `reports/` ni carpetas de prompts. No crear scripts, logs ni artefactos auxiliares en PRs de contenido.

## Supported Countries

CO, MX, AR, BR, CL, PE, EC, PA, CR, GT, DO, SV, HN, NI, ES, PR, GQ, UY, PY, BO

## Bundle Protocol v5.2

### File Naming

El nombre debe ser exactamente:

```text
{COUNTRY_CODE}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

Reglas:
- `COUNTRY_CODE`, `SUBJ`, `GRADE` y `WNN` van en mayusculas.
- `topic` va en kebab-case ASCII, sin espacios.
- El sufijo literal es `-001-MASTERY-bundle.md`.
- El `id` del frontmatter es el nombre del archivo sin `.md`.
- No usar variantes como `-MASTERY.md`, minusculas en el prefijo, ni omitir `001`.

### Frontmatter Exacto

Cada archivo empieza con YAML valido y con todos estos campos:

```yaml
---
id: "CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle"
country: "colombia"
grado: 6
asignatura: "matematicas"
tema: "numeros-enteros"
periodo: "weekly"
week: "W01"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN Colombia"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---
```

No usar `semana` como reemplazo de `week`. No usar `Context`, `Options` ni encabezados en ingles salvo `## Question`.

**Campos obligatorios del validador v5.2 (validate_content.js):**
- `bundle_index`: SIEMPRE presente (el validador emite ERROR si falta — campo obligatorio en v5.2).
- `calibration`: SIEMPRE presente (el validador emite warning si falta). Formato: `calibration: {difficulty_band: "D3-D4", expected_success: 0.8}`.
- **Dificultad en RANGO:** cada encabezado `## Question N` DEBE llevar el rango exacto `[D3-D4]`, `[D5-D6]`, `[D7-D8]` o `[D9-D10]` (nunca `[D3]` individual — el validador emite warning con `[D#]` suelto).

### Question Counts

- G3-G5: 8 preguntas
- G6-G7: 10 preguntas
- G8-G10: 12 preguntas
- G11 / 3EM Brasil: 20 preguntas

`total_questions`, `bundle_size` y el numero real de bloques `## Question N` deben coincidir.

### Question Format Exacto

```markdown
## Question 1 [D3]
**ID:** CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.90
**Contexto:** Escenario local, util para resolver o interpretar la pregunta.
### Enunciado
Texto de la pregunta.

### Opciones
- [x] A) Respuesta correcta
  <!-- feedback: Explica por que esta opcion es correcta: el concepto, la operacion o la formula concreta que la sostiene. -->
- [ ] B) Distractor 1
  <!-- feedback: Explica el error conceptual concreto que cometio el estudiante al elegirla: "olvidaste sumar el termino independiente", "confundiste el signo al despejar", "esta palabra significa X, no Y". -->
- [ ] C) Distractor 2
  <!-- feedback: Mismo nivel de detalle que B. Nombra el concepto o la operacion que hace que la opcion sea falsa. -->
- [ ] D) Distractor 3
  <!-- feedback: Mismo nivel de detalle que B y C. Cada distractor explica SU error, no el de los demas. -->

### Explicacion Pedagogica
Explicacion completa del concepto evaluado.
```

Reglas:
- **El feedback de la opcion CORRECTA no puede contradecir su marca `[x]`.** Si la
  opcion marcada dice que su propio metodo, formula o palabra no aplica al problema,
  el bundle esta mal aunque el gate pase. Ocurre: en CL-MAT-11-2026-W06 la opcion
  `[x]` "Factorizacion de Primos" lleva un feedback que dice que ese metodo no
  sirve para sistemas de ecuaciones. Ninguna regla automatica lo detecta todavia.
- **El feedback va en el idioma del bundle.** En un bundle de ingles, las cuatro
  explicaciones son de ingles. Se comprueba con `node scripts/check-feedback-language.mjs`.
- **Un calculo es la explicacion, y puede ser corta.** `F = ma = 2×3 = 6 N` son 16
  caracteres y son la razon entera. Lo que no vale es `Revisa el concepto`: eso no
  nombra ningun concepto. El largo no es el criterio; que diga algo, si.


- Usar `### Enunciado`, `### Opciones`, `### Explicacion Pedagogica`.
- Eje evaluado por pais: `**ICFES:**` es EXCLUSIVO de Colombia. Todos los demas paises usan `**EJE:**` (eje/componente evaluado). La entidad de cada pais (PAES, EXANI, ENEM, CNEB, Aprender...) va solo en el frontmatter `alignment`, nunca como marca dentro de las preguntas.
- Exactamente 4 opciones A-D.
- Exactamente una opcion con `[x]`.
- Todas las opciones tienen feedback HTML en la linea siguiente o inmediata.
- No usar "Todas las anteriores", "Ninguna de las anteriores", "A y B", ni equivalentes.

### Feedback obligatorio: las 4 opciones DEBEN explicar el porqué (regla innegociable)

**Esta regla no es negociable y aplica a TODOS los paises, todos los grados y todas las materias.**
Una opcion sin explicacion del porque es un defecto de contenido, no un detalle de redaccion.
Un distractor que no explica su error no cumple la funcion pedagogica: el estudiante ve que
fallo, pero no aprende por que, y la siguiente pregunta vuelve a fallar igual.

**Lo que esta PROHIBIDO** (el validador lo rechaza como ERROR):

| Prohibido | Por que esta mal | Correcto |
|---|---|---|
| `Incorrecto.` | No explica nada | `Incorrecto. "transportacion" son medios de transporte, no un lugar donde alojarse.` |
| `Correcto.` | No explica nada | `Correcto. "accommodation" corresponde a la definicion de lugar de hospedaje.` |
| `Incorrect. Try again.` / `Intenta de nuevo.` | Manda al estudiante a releer, no enseña | `Incorrect. Here "could" is past ability, not future possibility.` |
| `Incorrecto. Revisa el concepto.` | Igual: reenvia sin explicar | `Incorrect. "siempre" significa todos los dias, nunca "nunca".` |
| `Incorrecto. Tense.` | Nombra la categoria pero no el error concreto | `Incorrect. Aqui hace falta pasado: "started" ya es pasado, por eso va "couldn't".` |

**Lo que SI cumple**, para las 4 opciones:

1. Empieza con el veredicto (`Correcto.` / `Incorrecto.`) — opcional pero recomendado.
2. **Luego explica la razon**: el concepto, la operacion, la formula o el error especifico.
3. Cada distractor explica SU error, no el de los demas.
4. Una formula o calculo tambien es una explicacion valida:
   `Correcto. vf = v0 + a*t = 6 + 2*5 = 16 m/s.` es correcto aunque sea corto.

**Criterio que aplica el validador** (`scripts/validate-bundles-v52.mjs`):
despues de quitar el veredicto inicial, el texto restante debe
(a) medir al menos 18 caracteres, (b) no ser solo una instruccion de releer, y
(c) contener evidencia concreta: una expresion matematica, un numero con operador,
o vocabulario causal (`olvido`, `confundio`, `ignoro`, `señalaba`, `define`,
`significa`, `porque`, `equivale`, `se aplica`, `corresponde`...).
Una frase larga con prosa clara tambien se acepta.

**Consecuencia en el pipeline:** un bundle que falla esta regla NO se publica.
Ademas, si borras un bundle, debes regenerar los packs con:

```bash
cd saberparatodos && node scripts/generate-static-packs.js --all-weekly --changed-only
```

porque los packs son artefactos derivados: si no se regeneran, las preguntas del bundle
borrado siguen sirviéndose por el API aunque el `.md` ya no exista.

## Difficulty And Bloom

Para 10 preguntas:
- Q1-Q2: D3-D4, Remember/Understand
- Q3-Q5: D5-D6, Apply
- Q6-Q8: D7-D8, Analyze
- Q9-Q10: D9-D10, Evaluate

Para 20 preguntas:
- Q1-Q4: D3-D4
- Q5-Q10: D5-D6
- Q11-Q16: D7-D8
- Q17-Q20: D9-D10

Para 8 o 12 preguntas, mantener progresion creciente sin saltar de basico a experto al inicio.

## Regional Context

Jules debe leer `skills/bundle-creator/rules/{COUNTRY_CODE}.md` antes de generar.

Contexto minimo:
- Colombia: DBA MEN / Saber, ciudades colombianas, COP cuando haya dinero.
- Mexico: SEP/NEM y EXANI cuando aplique, ciudades mexicanas, MXN.
- Argentina: NAP/Aprender, voseo moderado, ciudades argentinas, ARS.
- Brasil: BNCC/ENEM, portugues brasileno, ciudades brasilenas, BRL.

## Calendar Rules For 2026 Weekly Packs

`W01-W40` es una secuencia curricular interna, no necesariamente una semana ISO ni una declaracion de calendario oficial nacional.

- Colombia: 40 semanas academicas es compatible con calendario escolar.
- Brasil: 200 dias lectivos equivalen a 40 semanas de 5 dias.
- Mexico: SEP usa calendario escolar por ciclo, no ano calendario; no afirmar que W01-W40 sea calendario SEP oficial.
- Argentina: el calendario varia por jurisdiccion; no afirmar calendario nacional unico W01-W40.

## Anti-Error Rules

1. No distractores duplicados.
2. No opciones "todas/ninguna de las anteriores".
3. No AI leakage: `<think>`, `<process>`, markdown fences alrededor del bundle, notas internas o prompts.
4. No alucinaciones cientificas, historicas o legales.
5. Exactamente una opcion `[x]` por pregunta.
6. Todas las opciones tienen feedback **que explica el porque** (ver seccion anterior). Feedback tipo `Incorrecto.` o `Revisa el concepto.` es ERROR.
7. Todas las preguntas tienen `### Explicacion Pedagogica`.
8. Contextualizar al pais destino.
9. Un PR de contenido solo debe agregar o modificar los bundles solicitados. No borrar bundles no solicitados.

---

## Post-Mortem: por que 109 bundles llegaron a produccion sin feedback (2026-09-30)

Esta seccion existe para que el error no se repita. **La causa fue el validador, no los agentes.**

### Que paso

Un usuario reporto que muchas preguntas de Colombia y de otros paises llegaban sin
explicacion. Al medir el corpus mergeado (2.789 bundles, 166.885 opciones):

| Modo de fallo | Opciones | Que era |
|---|---|---|
| DEAD | 3.788 (2,3%) | `Incorrecto.` / `Correcto.` / `Try again.` — no explica nada |
| VAGUE | 44.165 (26,5%) | `Revisa el concepto.` — presente pero no enseña |
| USEFUL | 118.932 (71,3%) | Explica la razon correctamente |

109 bundles (1.512 preguntas) eran dominantemente DEAD y se sirvian en produccion.

### Por que fallo el gate anterior

Protocol v5.2 validaba solo **presencia**:

```js
if (options.some((option) => !option.feedback)) errors.push(`every option needs feedback`);
```

Es decir: exigia que existiera un `<!-- feedback: -->`, no que explicara algo.
`<!-- feedback: Incorrecto. -->` pasa ese test perfectamente. El gate era
**estructural, no pedagogico**, asi que 109 bundles con feedback vacio se
mergearon sin friccion durante semanas.

Dos factores lo agravaron:

1. **Los agentes generaban por lote** (`bundle-batch-*`), asi que un patron incorrecto
   se repetia en decenas de archivos sin revision individual.
2. **La deteccion por longitud produce falsos positivos.** Una primera version de la
   regla uso "el feedback debe pesar 60+ caracteres" y marco como malo un feedback
   excelente y corto: `Correcto. vf = v0 + a*t = 6 + 2*5 = 16 m/s.` (~38 chars).
   La regla correcta es **pedagogica**, no de tamano.

### Lecciones (reglas permanentes)

1. **Un gate que valida presencia no valida calidad.** Si el requisito dice
   "explicar el por que", el validador debe exigir la razon, no la etiqueta.
2. **La deteccion debe ser semantica, no por longitud.** Quitar el veredicto inicial
   y preguntar si queda evidencia concreta (formula, numero, vocabulario causal).
   Un umbral de caracteres solo produce falsos positivos y falsos negativos.
3. **Todo content gate necesita su propio test que pueda fallar**
   (`node scripts/test-feedback-gate.mjs`, 7 casos). Un test que no puede fallar es
   peor que no tener test.
4. **Verificar la clasificacion con una segunda herramienta antes de borrar.**
   El clasificador Python y el gate JS se cruzaron sobre los mismos 109 bundles:
   109/109 de acuerdo. Sin ese cruce, un clasificador con bug habria borrado
   contenido bueno.
5. **Los artefactos derivados heredan el defecto.** Los packs JSON se generan del `.md`.
   Borrar un bundle sin regenerar los packs deja sus preguntas sirviéndose igual: el
   pack es un archivo independiente que el generador nunca borra.
6. **Un prune global es peligroso.** Un intento de borrar "packs no regenerados"
   elimino 2.499 packs legitimos de otros generadores. La regla correcta es por
   procedencia: borrar solo el pack cuyo pais/grado/semana corresponde a un bundle
   eliminado en este cambio.

## Validation Commands

```bash
npm run validate
npm run validate -- questions_data/colombia/lengua/grado-7/2026/weekly/CO-LEN-7-2026-W14-subordinacion-001-MASTERY-bundle.md

# El gate de feedback tiene su propio test. Correrlo cuando se toque el validador:
node scripts/test-feedback-gate.mjs
```

`npm run validate` con `--` sobre un DIRECTORIO (no un glob): el glob produce un
falso verde. No abrir PR si `npm run validate` falla.

**Nota sobre la cobertura:** el gate de feedback es mas estricto que el resto del
validador y por diseno va a fallar sobre bundles legacy que ya estan mergeados con
feedback vago (`Revisa el concepto.`). Eso es correcto: son la deuda que se va a
reparar por oleadas. Al validar contenido NUEVO, el fallo indica un defecto real
y debe corregirse antes de abrir el PR.

## Static Pack Publication

Un bundle `.md` validado no queda publicado automaticamente en `saberparatodos.space`.
Para que la app sirva examenes desde el API publico, los bundles weekly deben convertirse a packs JSON estaticos.

Decision arquitectonica:
- El bundle fuente y revisable siempre es el archivo `.md` en `questions_data`.
- Los archivos `.json` en `apps/worldexams-api/public/v1/packs` son artefactos derivados para servir el API; no son bundles fuente ni reemplazan al markdown.
- No editar packs JSON manualmente para corregir contenido. Corregir primero el `.md`, validar, y regenerar packs.
- El conversor debe preservar texto, respuesta correcta y feedback de cada opcion aunque el feedback HTML este en la linea siguiente a la opcion.

Comandos canonicos despues de integrar bundles:

```bash
cd saberparatodos
node scripts/generate-static-packs.js --all-weekly --changed-only
```

Verificaciones minimas:

```bash
curl https://api.saberparatodos.space/v1/packs/co-week-1-grade-7-subject-lengua.json
curl "https://api.saberparatodos.space/v1/questions?country=co&grade=7&subject=lengua"
curl "https://api.saberparatodos.space/v1/questions?country=mx&grade=11&subject=matematicas"
```

El API debe preferir packs con prefijo de pais (`co-`, `mx-`, `ar-`, `br-`) antes de usar packs genericos.

## AI Core on-device (SWAL)

- Runtime generico: `edge-mesh` → `createAiCore({ mesh, instanceId })` (ver `docs/SWAL/AI_CORE.md`).
- UI PWA: `/ajustes/ia` · tutor en Results · generacion local no publica a `questions_data/`.
- Smoke: `cd saberparatodos && npm run smoke:ai`

## Country Readiness KPI

La meta operativa para pruebas finales es 2000 preguntas por pais soportado.
Solo cuentan para esta meta los bundles que cumplen las tres condiciones:

1. Estan en la ruta canonica `questions_data/{country}/{subject}/grado-{N}/2026/weekly/`.
2. Pasan validacion estricta v5.2 con `npm run validate -- {archivo}`.
3. Estan publicados en `apps/worldexams-api/public/v1/packs` dentro de un pack con prefijo ISO del pais, por ejemplo `co-week-1-grade-7-subject-lengua.json`.

Contenido legacy, contenido v5.2 fuera de ruta canonica, packs genericos o fallback del API no cuentan como avance oficial del pais.

Comando canonico de auditoria:

```bash
npm run audit:country-readiness
npm run audit:country-readiness -- --json
npm run audit:country-readiness -- --smoke-public
```

Estados del reporte:
- `published_validated`: cuenta oficialmente hacia las 2000 preguntas.
- `validated_not_published`: el markdown pasa validacion, pero falta generar/publicar packs.
- `legacy_or_invalid`: hay contenido, pero debe repararse o regenerarse.
- `missing`: no hay contenido usable para ese pais.

## Jules Workflow

1. Leer este archivo.
2. Leer `skills/worldexams-bundle-generator/SKILL.md`.
3. Leer `skills/bundle-creator/SKILL.md`.
4. Leer la regla del pais correspondiente en `skills/bundle-creator/rules/`.
5. Generar solo los archivos solicitados.
6. Ejecutar `npm run validate -- {archivos_generados}`.
7. Corregir hasta que el validador pase.
8. No afirmar que el contenido esta publicado hasta que se generen/verifiquen los static packs.
9. Ejecutar `npm run audit:country-readiness` cuando el issue afecte cobertura por pais.
10. Comentar el issue con: `[OK] Generados N bundles: ID1, ID2, ...`.

---

## 🧹 POLÍTICA DE LIMPIEZA

El proyecto se mantiene limpio mediante:
1. **Branches:** Solo `main` y `develop` — branches de features se borran post-merge
2. **Scripts:** Solo `.mjs`, `.sh`, `.ts` — nada de `.ps1` (migrado a Linux)
3. **Temp:** `temp/`, `temp_*`, `*.log` están en `.gitignore` — no se commitean
4. **Issues:** Issues de Jules se cierran al completar el feature
5. **Documentación:** SRS, SRC, features.json siempre sincronizados

<!-- SWAL-ROUTING-START -->
## SWAL Routing Minimalista (SDD Hibrido F1)
> Antes de crear `.gitcore/sdd/` aplica routing organico (gentle-ai v2.3.0).
> - **Direct inline**: 1-3 files trivial -> inline sin delegar, sin SDD
> - **Delegated direct**: 4+ files o 2+ non-trivial -> delegate_task con Xavier skill search, sin SDD
> - **Optional SDD**: ambiguedad alta -> proponer SDD opcional, si SI crear `.gitcore/sdd/specs/###-feat/onepage.md` (1 pagina spec P1 + plan HOW minimo + tasks [P])
> Ver skill `sdd-hibrido` (`~/.hermes/skills/sdd-hibrido/references/routing.md`). `rm -rf .gitcore/sdd` limpia sin tocar features.json.
<!-- SWAL-ROUTING-END -->

<!-- SWAL-REGISTRY-START -->
## Skill Registry + Xavier Indexer (F1b)
> Skills viven FUERA de `.gitcore` (global `~/.hermes/skills` + proyecto `.skills/`). GitCore solo referencia via `.atl/skill-registry.md` + cache `.skill-registry.cache.json` y opcional `.gitcore/skill-registry.json`.
> - Refresh: `~/.hermes/scripts/skill-registry-refresh.sh --cwd <proyecto>`
> - Index: `~/.hermes/scripts/xavier-index-skills.sh --cwd <proyecto>` (Xavier tags [skill])
> - Antes de delegar: `xavier_search(tags=[skill]) -> skill_view(paths)`
> Ver skills `skill-registry` y `xavier-skill-indexer`.
<!-- SWAL-REGISTRY-END -->

<!-- SWAL-SDD-START -->
## SDD One-Page + SRS Mapping
> Spec efimero `.gitcore/sdd/specs/###-feat/onepage.md` referencia `REQ-xxx` durable de `docs/SRS/REQUIREMENTS.md` (IEEE 830 reduced). Drift detector `srs-src-drift-detector` mantiene traceabilidad. Docs humanos estables en `docs/`, specs AI en `.gitcore/sdd/` aislado.
<!-- SWAL-SDD-END -->

<!-- SWAL-ROUTING-START -->
## SWAL Routing Minimalista (SDD Hibrido F1)
> Antes de crear `.gitcore/sdd/` aplica routing organico (gentle-ai v2.3.0).
> - **Direct inline**: 1-3 files trivial -> inline sin delegar, sin SDD
> - **Delegated direct**: 4+ files o 2+ non-trivial -> delegate_task con Xavier skill search, sin SDD
> - **Optional SDD**: ambiguedad alta -> proponer SDD opcional, si SI crear `.gitcore/sdd/specs/###-feat/onepage.md` (1 pagina spec P1 + plan HOW minimo + tasks [P])
> Ver skill `sdd-hibrido` (`~/.hermes/skills/sdd-hibrido/references/routing.md`). `rm -rf .gitcore/sdd` limpia sin tocar features.json.
<!-- SWAL-ROUTING-END -->

<!-- SWAL-REGISTRY-START -->
## Skill Registry + Xavier Indexer (F1b)
> Skills viven FUERA de `.gitcore` (global `~/.hermes/skills` + proyecto `.skills/`). GitCore solo referencia via `.atl/skill-registry.md` + cache `.skill-registry.cache.json` y opcional `.gitcore/skill-registry.json`.
> - Refresh: `~/.hermes/scripts/skill-registry-refresh.sh --cwd <proyecto>`
> - Index: `~/.hermes/scripts/xavier-index-skills.sh --cwd <proyecto>` (Xavier tags [skill])
> - Antes de delegar: `xavier_search(tags=[skill]) -> skill_view(paths)`
> Ver skills `skill-registry` y `xavier-skill-indexer`.
<!-- SWAL-REGISTRY-END -->

<!-- SWAL-SDD-START -->
## SDD One-Page + SRS Mapping
> Spec efimero `.gitcore/sdd/specs/###-feat/onepage.md` referencia `REQ-xxx` durable de `docs/SRS/REQUIREMENTS.md` (IEEE 830 reduced). Drift detector `srs-src-drift-detector` mantiene traceabilidad. Docs humanos estables en `docs/`, specs AI en `.gitcore/sdd/` aislado.
<!-- SWAL-SDD-END -->
