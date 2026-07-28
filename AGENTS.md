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
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---
```

No usar `semana` como reemplazo de `week`. No usar `Context`, `Options` ni encabezados en ingles salvo `## Question`.

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
  <!-- feedback: Explica por que esta opcion es correcta. -->
- [ ] B) Distractor 1
  <!-- feedback: Explica el error conceptual. -->
- [ ] C) Distractor 2
  <!-- feedback: Explica el error conceptual. -->
- [ ] D) Distractor 3
  <!-- feedback: Explica el error conceptual. -->

### Explicacion Pedagogica
Explicacion completa del concepto evaluado.
```

Reglas:
- Usar `## Question N [D#]`, no `## Pregunta`.
- Usar `### Enunciado`, `### Opciones`, `### Explicacion Pedagogica`.
- Eje evaluado por pais: `**ICFES:**` es EXCLUSIVO de Colombia. Todos los demas paises usan `**EJE:**` (eje/componente evaluado). La entidad de cada pais (PAES, EXANI, ENEM, CNEB, Aprender...) va solo en el frontmatter `alignment`, nunca como marca dentro de las preguntas.
- Exactamente 4 opciones A-D.
- Exactamente una opcion con `[x]`.
- Todas las opciones tienen feedback HTML en la linea siguiente o inmediata.
- No usar "Todas las anteriores", "Ninguna de las anteriores", "A y B", ni equivalentes.

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
6. Todas las opciones tienen feedback.
7. Todas las preguntas tienen `### Explicacion Pedagogica`.
8. Contextualizar al pais destino.
9. Un PR de contenido solo debe agregar o modificar los bundles solicitados. No borrar bundles no solicitados.

## Validation Commands

```bash
npm run validate
npm run validate -- questions_data/colombia/lengua/grado-7/2026/weekly/CO-LEN-7-2026-W14-subordinacion-001-MASTERY-bundle.md
```

No abrir PR si `npm run validate` falla.

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
