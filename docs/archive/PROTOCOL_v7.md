# Protocolo Mundial de Generación WorldExams v7

> **HISTORICAL / NON-DEFAULT (2026-07-28).**  
> New weekly MASTERY generation uses **Bundle Protocol v5.2** in `AGENTS.md`, validated with `npm run validate` (`scripts/validate-bundles-v52.mjs`).  
> See `docs/specs/ACTIVE_PROTOCOLS.md`. This v7 document is retained only for migration and audit context. Do not use `protocol_version: "7.0"` or `validate-bundles-v7.mjs` for new work.

Este protocolo unificaba v5.2 (Jules), v6.0 (Colombia Assessment Protocol) y reglas por país.
Históricamente, todo bundle MASTERY debía cumplir este protocolo para ser considerado de **calidad alta**.

---

## 1. Estructura Canónica del Bundle

### Frontmatter (YAML obligatorio)

```yaml
---
id: "{CODE}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle"
country: "{country_key}"
grado: {N}
asignatura: "{subject_key}"
tema: "{topic_slug}"
periodo: "weekly"
week: "W{NN}"
year: 2026
bundle_type: "weekly"
protocol_version: "7.0"
total_questions: {N}
bundle_size: {N}
alignment: "{official_standard}"
license: "FREE"
tier: "mastery"
creador: "Jules-Agent"
---
```

### Reglas del Frontmatter
- `id` debe coincidir con el filename (sin `.md`)
- `country` usa el country_key del README.md de ese país
- `asignatura` usa el subject_key del README.md
- `tier` debe ser `"mastery"` (nunca `"legacy"`)
- `protocol_version` debe ser `"7.0"`

### Anatomy exacta de cada pregunta

```markdown
## Question N [D{dificultad}]
**ID:** {BUNDLE_ID}-v{N}
**Bloom:** {Remember|Understand|Apply|Analyze|Evaluate}
**ICFES/Eje:** {competencia específica del país}
**Expected_Success:** 0.{NN}
**Contexto:** {contexto local, relevante, específico}

### Enunciado
{Texto de la pregunta, en idioma local, sin errores ortográficos}

### Opciones
- [x] A) {Respuesta correcta, con contenido real}
  <!-- feedback: {Explicación de por qué es correcta} -->
- [ ] B) {Distractor plausible}
  <!-- feedback: {Explicación de error común} -->
- [ ] C) {Distractor plausible}
  <!-- feedback: {Explicación de error común} -->
- [ ] D) {Distractor plausible}
  <!-- feedback: {Explicación de error común} -->

### Explicacion Pedagogica
{Explicación pedagógica en idioma local}
```

### Reglas de calidad de la pregunta

| Regla | Descripción |
|-------|-------------|
| **Sin placeholders** | NO usar "Opción A", "Opción B", "Option A", etc. |
| **Contenido real** | Cada opción debe tener texto de contenido real (no solo letras) |
| **1 correcta** | Exactamente 1 opción marcada con `[x]` |
| **4 opciones** | Exactamente 4 opciones (A-D) |
| **Feedback** | Cada opción debe tener `<!-- feedback: ... -->` |
| **Sin todo/ninguno** | No usar "todas las anteriores", "ninguna de las anteriores" o variantes |
| **Sin leakage** | No incluir `<think>`, `<process>`, prompts, ni notas internas |
| **Idioma local** | Feedbacks y explicaciones en el idioma nacional del país |
| **Contexto local** | Nombres, lugares, monedas, instituciones del país |
| **Sin fórmulas falsas** | No inventar fechas, constantes, leyes o datos del examen |

---

## 2. Cantidad de Preguntas por Grado

| Rango | Preguntas |
|-------|-----------|
| G3-G5  | 8 |
| G6-G7  | 10 |
| G8-G10 | 12 |
| G11+   | 20 |
| Brasil 3EM | 20 |

---

## 3. Asignación de Semanas (40 semanas lectivas)

El año lectivo se divide en 40 semanas (W01-W40) distribuidas en 4 periodos:

```
Periodo 1: W01-W10
Periodo 2: W11-W20
Periodo 3: W21-W30
Periodo 4: W31-W40
```

Cada semana debe cubrir un tema distinto siguiendo el currículo oficial del país.

---

## 4. Sistema de Archivos

```
questions_data/{country}/
  README.md                    ← Reglas contextuales del país
  {subject}/
    grado-{N}/
      2026/
        weekly/
          {CODE}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

### Archivos prohibidos en el árbol activo
- ❌ Bundles sin frontmatter YAML (`---`)
- ❌ Bundles sin preguntas (vacíos o sin `## Question N`)
- ❌ Bundles con opciones placeholder
- ❌ Bundles con feedback en inglés (excepto si la materia es inglés)
- ❌ Bundles con `protocol_version < 5.2`
- ❌ Bundles con `tier: legacy`

Estos archivos deben ser **ELIMINADOS** del árbol activo (no movidos a legacy).

---

## 5. Validación Automática (Pre-PR)

Antes de abrir un PR, Jules debe ejecutar:

```bash
node scripts/validate-bundles-v7.mjs {archivos}
```

Si hay fallos, se corrigen y se re-ejecuta hasta que pase limpio.

---

## 6. Proceso de Calidad

1. **Generación**: Jules usa las reglas del país (`questions_data/{country}/README.md`) y el protocolo v7
2. **Auto-validación**: Jules ejecuta el validador v7
3. **Revisión técnica**: OpenClaw verifica con el validador v7 que no haya placeholders, inglés, etc.
4. **Score de calidad**:
   - 90-100: Auto-merge ✅
   - 80-89: Revisión humana ❓
   - < 80: Rechazado, regenerar ❌

---

## 7. Template de Issue para Jules

```markdown
## Generar bundles {país} - {materia} - Grado {N}

### Contexto
- **País:** {nombre_país}
- **Materia:** {nombre_materia}
- **Grado:** {N}
- **Semanas:** W{NN}-W{NN}
- **Cantidad:** {N} bundles

### Reglas
- Seguir `PROTOCOL_v7.md` (strictamente)
- Leer `questions_data/{country}/README.md` para reglas contextuales
- Usar `protocol_version: "7.0"`
- Sin placeholders, sin inglés (excepto si es materia inglés)
- Contenido real en cada opción
- Cada bundle = {N} preguntas

### Temas sugeridos por semana
Basados en el currículo oficial de {país} para grado {N} en {materia}.

W{NN}: {tema_1}
W{NN}: {tema_2}
...

### Formato de salida
```text
questions_data/{country}/{subject}/grado-{N}/2026/weekly/{CODE}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

### Validación
```bash
node scripts/validate-bundles-v7.mjs questions_data/{country}/{subject}/grado-{N}/2026/weekly/*.md
```
```

---

## 8. Puntajes de Dificultad

| Dificultad | Etiqueta | Descripción |
|------------|----------|-------------|
| D2-D3 | Básico | Recuerdo/identificación |
| D4-D5 | Intermedio | Comprensión/aplicación simple |
| D6-D7 | Avanzado | Análisis/inferencia |
| D8-D10 | Experto | Evaluación/síntesis |

Distribuir dificultades a lo largo del bundle (mezclar niveles).

---

## 9. Reglas por Materia (Cross-country)

### Matemáticas
- Usar sistema numérico y notación del país
- Problemas contextualizados (moneda local, comercio local)
- Sin errores de cálculo

### Ciencias Naturales
- Alineado al currículo de ciencias del país
- Ejemplos con flora, fauna y ecosistemas locales
- Rigor conceptual verificado

### Lectura Crítica / Lengua
- Textos en el idioma oficial del país
- Autores locales, referencias culturales locales
- Sin sesgos políticos o religiosos

### Sociales / Ciudadanas
- Basado en la constitución e historia del país
- Eventos históricos verificables
- Sin sesgo partidista

### Inglés
- Inglés internacional con contextos del país
- Niveles CEFR según grado
- Vocabulario apropiado para la edad
