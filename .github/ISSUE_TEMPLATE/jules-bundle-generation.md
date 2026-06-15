---
name: "Jules: Generacion de Bundles v5.2"
about: "Issue para que Jules genere bundles semanales MASTERY"
title: "[JULES] {PAIS} - {ASIGNATURA} {GRADO} - W{NN}-W{NN} ({NUM_BUNDLES} bundles)"
labels: ["jules", "generate-questions"]
assignees: []
---

## Reglas criticas para Jules

### Limite de capacidad

- Maximo: 15 bundles por issue.
- Ideal: 5-12 bundles por issue.
- Si el lote supera 15 bundles, crear issues separados.
- Si algun bundle ya existe, no regenerarlo salvo que este issue diga explicitamente `REPLACE`.

### Flujo obligatorio

1. Leer `AGENTS.md`.
2. Leer `skills/worldexams-bundle-generator/SKILL.md`.
3. Leer `skills/bundle-creator/SKILL.md`.
4. Leer `skills/bundle-creator/rules/{CODE}.md`.
5. Generar solo archivos `.md` finales en `questions_data`.
6. No crear scripts, logs, prompts ni archivos en `.worldexams`.
7. No borrar bundles existentes no listados como reemplazo.
8. Ejecutar `npm run validate -- {archivos_generados}`.
9. Corregir hasta que la validacion pase.
10. No afirmar que los bundles estan publicados en `saberparatodos.space`; la publicacion requiere generar static packs.
11. Comentar este issue con `[OK] Generados N bundles: {lista de IDs}`.

## Objetivo

{Descripcion concreta del lote}

## Configuracion

| Campo | Valor |
|-------|-------|
| Pais | {PAIS_NOMBRE} |
| Codigo | {CODE} |
| Asignatura | {asignatura} |
| Subject code | {SUBJ} |
| Grado | {N o 3EM} |
| Ano | 2026 |
| Protocolo | v5.2 |
| Tipo | weekly |
| Preguntas/bundle | {8, 10, 12 o 20} |
| Alignment | {curriculo/examen oficial} |
| Ruta | `questions_data/{pais}/{asignatura}/grado-{N}/2026/weekly/` |

## Bundles a generar

| # | Week | Tema | Archivo |
|---|------|------|---------|
| 1 | W01 | {tema-01} | `{CODE}-{SUBJ}-{GRADE}-2026-W01-{tema-01}-001-MASTERY-bundle.md` |
| 2 | W02 | {tema-02} | `{CODE}-{SUBJ}-{GRADE}-2026-W02-{tema-02}-001-MASTERY-bundle.md` |

## Frontmatter exacto

Cada archivo debe empezar con:

```yaml
---
id: "{CODE}-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle"
country: "{pais}"
grado: {N}
asignatura: "{asignatura}"
tema: "{tema}"
periodo: "weekly"
week: "W{NN}"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: {NUM_PREGUNTAS}
bundle_size: {NUM_PREGUNTAS}
alignment: "{alignment}"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---
```

Prohibido usar `semana` en reemplazo de `week`. Prohibido omitir `total_questions`, `bundle_type`, `license`, `tier` o `creador`.

## Formato exacto de pregunta

```markdown
## Question 1 [D3]
**ID:** {BUNDLE_ID}-v1
**Bloom:** Remember
**ICFES:** {competencia/eje}
**Expected_Success:** 0.90
**Contexto:** Contexto local util.

### Enunciado
Texto de la pregunta.

### Opciones
- [x] A) Respuesta correcta
  <!-- feedback: Explicacion de por que es correcta. -->
- [ ] B) Distractor
  <!-- feedback: Error conceptual que representa. -->
- [ ] C) Distractor
  <!-- feedback: Error conceptual que representa. -->
- [ ] D) Distractor
  <!-- feedback: Error conceptual que representa. -->

### Explicacion Pedagogica
Explicacion completa del concepto.
```

## Reglas anti-error

- No usar `## Pregunta`; usar `## Question`.
- No usar `**Context:**`; usar `**Contexto:**`.
- No usar `### Options`; usar `### Opciones`.
- No usar explicacion en negrita; usar `### Explicacion Pedagogica`.
- Exactamente una opcion `[x]` por pregunta.
- Cuatro opciones A-D con texto unico.
- Todas las opciones tienen feedback HTML.
- No usar "todas las anteriores", "ninguna de las anteriores", "A y B", ni equivalentes.
- No incluir `<think>`, `<process>`, prompts, logs ni markdown fences alrededor del bundle.

## Contexto regional

- Pais: {PAIS_NOMBRE}
- Moneda: {MONEDA}
- Ciudades/regiones: {CIUDADES}
- Curriculo: {CURRICULO}
- Examen/eje: {EXAMEN}
- Variante idiomatica: {VARIANTE}

## Validacion obligatoria

Antes de abrir PR:

```bash
npm run validate -- {archivo_1} {archivo_2}
```

## Publicacion en static packs

Despues de mergear bundles validados, el integrador debe ejecutar:

```bash
cd saberparatodos
node scripts/generate-static-packs.js --all-weekly --changed-only
```

Luego debe verificar al menos:

```bash
curl https://api.saberparatodos.space/v1/packs/{code}-week-{N}-grade-{G}-subject-{subject}.json
curl "https://api.saberparatodos.space/v1/questions?country={code}&grade={G}&subject={subject}"
```

## Criterios de aceptacion

- [ ] {NUM_BUNDLES} archivos creados en la ruta correcta.
- [ ] Ningun script, prompt, log o archivo temporal agregado.
- [ ] Ningun bundle existente eliminado salvo reemplazo explicito.
- [ ] Frontmatter v5.2 exacto.
- [ ] Nombre de archivo coincide con `id`.
- [ ] Conteo de preguntas correcto.
- [ ] Formato de preguntas exacto.
- [ ] Contexto regional correcto.
- [ ] `npm run validate -- {archivos}` pasa sin errores.
- [ ] No se afirma publicacion en produccion sin static packs verificados.
