# Protocol v4.1 — Enfoque 2026: Maestría C2 (Alineación ICFES)

> **Versión:** 4.1 | **Fecha:** 2026-03-03 | **Alcance:** Grados 9, 10 y 11
> **Objetivo:** Lograr nivel C2 al terminar grado 11 mediante la "arquitectura del éxito" del ICFES real, pero con rigor léxico y sintáctico extendido (Dificultad 3-10).

---

## 1. Resumen: Enfoque 2026

Protocol v4.1 evoluciona la estructura v4.0 integrando las 7 partes oficiales del examen Saber 11:

| Elemento | Regla Protocolo v4.1 | Meta 2026 |
|----------|-----------------------|-----------|
| **Rigor** | Mimetismo ICFES real | Nivel C2 (Superior al B1 estándar) |
| **Partes** | 1 a 7 (Estructura fija) | Dominio total de formatos oficiales |
| **Dificultad** | 3 a 10 (Bloom+) | Pensamiento crítico y meta-cognición |
| **UI Ready** | Contexto Maestro | Soporte para Reading/Cloze Pro |

---

## 2. Distribución de Preguntas (20/bundle)

| **Intermedio** | v1-v4 | 3 (Media) | Apply | single |
| **Avanzado** | v5-v9 | 4 (Difícil) | Analyze | single |
| **Experto** | v10-v15 | 5 (Muy difícil) | Evaluate | single / multi-correct |
| **Extraordinario** | v16-v20 | 6-10 (Genio) | Create/Transfer | multi-correct / weighted |

### 2.1 Niveles Extraordinarios (6-10) — Detección de Genios

| Nivel | Nombre | Descripción | Ejemplo (Inglés) |
|-------|--------|-------------|-------------------|
| **6** | Análisis Profundo | Inferencia de premisas implícitas, lectura entre líneas | "¿Qué supuesto NO declarado sustenta el argumento del autor?" |
| **7** | Evaluación Crítica | Juzgar argumentos con evidencia contradictoria | "¿Cuál de estas críticas debilita MÁS el argumento?" |
| **8** | Síntesis Creativa | Integrar conceptos de múltiples dominios | "Combinando los textos A y B, ¿qué conclusión emerge?" |
| **9** | Razonamiento Abstracto | Paradojas, pensamiento lateral, meta-cognición | "¿Por qué este razonamiento aparentemente válido es falaz?" |
| **10** | Transferencia Extraordinaria | Aplicación a dominios inesperados | "¿Cómo este concepto lingüístico refleja principios de teoría de sistemas?" |

---

## 3. Competencias ICFES Evaluadas

### 3.1 Inglés
- **Comunicativa:** Comprensión global, propósito comunicativo
- **Lexical:** Vocabulario en contexto, colocaciones, registro
- **Gramatical:** Estructuras complejas, coherencia, cohesión
- **Pragmática:** Intención del hablante, actos de habla, implicatura

### 3.2 Matemáticas
- **Razonamiento cuantitativo:** Interpretación de datos, modelación
- **Resolución de problemas:** Estrategias, representaciones múltiples
- **Comunicación y argumentación:** Justificación formal

### 3.3 Ciencias Naturales
- **Uso comprensivo del conocimiento:** Fenómenos, modelos
- **Explicación de fenómenos:** Causalidad, predicción
- **Indagación:** Diseño experimental, variables, hipótesis

### 3.4 Lectura Crítica
- **Identificar y entender:** Contenido explícito, estructura
- **Reflexionar y evaluar:** Argumentos, perspectivas
- **Competencia comunicativa-escritora:** Producción

### 3.5 Sociales y Ciudadanas
- **Pensamiento social:** Multicausalidad, contexto histórico
- **Interpretación y análisis de perspectivas:** Sesgo, fuentes
- **Pensamiento reflexivo y sistémico:** Relaciones causa-efecto globales

---

## 4. Formato del Bundle

### 4.1 Frontmatter YAML

```yaml
---
id: "CO-ENG-09-health-001-PRO"
country: "co"
grado: 9
asignatura: "ingles"
tema: "Health and Modern Lifestyles"
periodo: 1
protocol_version: "4.0"
total_questions: 20
difficulty_range: "1-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["comunicativa", "lexical", "gramatical", "pragmatica"]
cognitive_levels: ["knowledge", "comprehension", "application", "analysis", "synthesis", "evaluation", "creation"]
estado: "draft"
creador: "Antigravity (Protocol v4.0)"
generation_date: "2026-03-02"
source: "Colombia Aprende / DBA Inglés"
source_license: "CC BY-SA 4.0"
---
```

### 4.2 Pregunta Estándar (single, Dificultad 1-5)

```markdown
## Question N (Variant Label - Difficulty X)

**ID:** `CO-ENG-09-health-001-PRO-vN`
**Type:** `single`
**ICFES:** Comunicativa
**Bloom:** Remember

### Contexto
[Breve contexto o texto de lectura]

### Enunciado
[Pregunta clara y específica]

### Options
- [x] A) Respuesta correcta
- [ ] B) Distractor basado en error común
- [ ] C) Distractor plausible
- [ ] D) Distractor plausible

### Explicación Pedagógica
[Justificación detallada — por qué A es correcta y B/C/D son incorrectas]
```

### 4.3 Pregunta Multi-Correcta (Dificultad 5-10)

```markdown
## Question N (Variant Label - Difficulty X)

**ID:** `CO-ENG-09-health-001-PRO-vN`
**Type:** `multi-correct`
**ICFES:** Comunicativa + Pragmática
**Bloom:** Evaluate

### Contexto
[Texto extenso con múltiples capas de significado, mínimo 100 palabras para D6+]

### Enunciado
Select ALL statements supported by the text. (Partial credit applies)

### Options
- [x] A) Statement supported directly <!-- weight: 1.0 -->
- [x] B) Statement supported implicitly <!-- weight: 0.5 -->
- [ ] C) Common misconception (surface reading)
- [ ] D) Plausible but contradicted by evidence
- [x] E) Requires cross-paragraph inference <!-- weight: 0.75 -->

### Scoring
- All 3 correct, 0 wrong: 3.0/3.0 (100%)
- 2 correct, 0 wrong: 2.0/3.0 (67%)
- Each wrong selection: -0.25

### Explicación Pedagógica
[Análisis detallado de cada opción con referencia al texto]
```

### 4.4 Pregunta Ponderada (Dificultad 8-10)

```markdown
## Question N (Variant Label - Difficulty X)

**ID:** `CO-ENG-09-health-001-PRO-vN`
**Type:** `weighted`
**ICFES:** Comunicativa + Pragmática + Lexical
**Bloom:** Create

### Contexto
[Escenario complejo que requiere integración de múltiples fuentes o perspectivas]

### Enunciado
Rank the following options from MOST to LEAST accurate interpretation:

### Options
- [x] A) Most accurate interpretation <!-- weight: 1.0 -->
- [x] B) Partially accurate <!-- weight: 0.6 -->
- [x] C) Minimally defensible <!-- weight: 0.3 -->
- [ ] D) Incorrect interpretation <!-- weight: 0.0 -->

### Scoring
- Best answer (A): 1.0 point
- Second best (B): 0.6 points
- Acceptable (C): 0.3 points
- Incorrect (D): 0.0 points

### Explicación Pedagógica
[Explicación de por qué el ranking es A > B > C > D, con evidencia textual y lógica]
```

---

## 5. Reglas de Calidad

### 5.1 Distractores
- **Dificultad 3:** Distractores claramente incorrectos pero no absurdos
- **Dificultad 4-5:** Distractores que representan errores conceptuales comunes
- **Dificultad 6-8:** Distractores que son parcialmente correctos (para multi-correcta)
- **Dificultad 9-10:** Todas las opciones son defensibles en cierto grado; la diferencia está en la calidad del razonamiento

### 5.2 Contextos
- **Dificultad 3-4:** Contexto breve (1-3 oraciones)
- **Dificultad 5-7:** Contexto moderado (1 párrafo, ~80 palabras)
- **Dificultad 8-10:** Contexto extenso (2+ párrafos, ~150-200 palabras) o múltiples textos

### 5.3 Competencias Implícitas (Visibles en la Pregunta)
Cada pregunta debe ejercitar al menos UNA de estas habilidades de forma que el estudiante la use activamente:
- **Inferencia:** Derivar información no explícita
- **Análisis:** Descomponer argumentos o estructuras
- **Síntesis:** Combinar información de múltiples fuentes
- **Evaluación:** Juzgar la calidad o validez de argumentos
- **Transferencia:** Aplicar conceptos a nuevos contextos

---

## 6. Nomenclatura de Archivos

```
CO-ENG-[GRADE]-[TOPIC]-[###]-PRO-v4-bundle.md
```

**Ejemplos:**
- `CO-ENG-09-health-001-PRO-v4-bundle.md`
- `CO-ENG-10-culture-003-PRO-v4-bundle.md`
- `CO-ENG-11-science-002-PRO-v4-bundle.md`

### 6.2 Ubicación Estructurada

Para mejorar la organización, cada grado contendrá subcarpetas por periodo:

```text
src/content/questions/colombia/ingles/grado-[N]/periodo-[1-4]/[archivo]-PRO-v4-bundle.md
```

**Ejemplo:**
`src/content/questions/colombia/ingles/grado-9/periodo-1/CO-ENG-09-routines-001-PRO-v4-bundle.md`

---

---

## 7. Referencia Estructural ICFES (Alineación v4.1)

Para garantizar la familiaridad absoluta del estudiante con el examen real, los bundles deben rotar o especializarse en estas 7 partes:

### Parte 1: Vocabulario (Matching)
- **Tarea:** Unir 5 descripciones cortas con una lista de 8 palabras (A-H).
- **Rigor:** 3 palabras quedan como distractores puros. En D6+, las definiciones usan lenguaje figurado.

### Parte 2: Avisos (Pragmática Contextual)
- **Tarea:** Identificar el lugar (School, Street, Hospital, etc.) donde aparecería un aviso.
- **Rigor:** Las opciones A-C deben ser lugares donde el mensaje sea plausible pero semánticamente incorrecto.

### Parte 3: Conversaciones Cortas
- **Tarea:** Completar un diálogo breve.
- **Rigor:** Enfoque en actos de habla y pragmática (ej: respuesta adecuada a una sugerencia).

### Parte 4: Cloze Lexical (Huecos 1-10)
- **Tarea:** Texto continuo. Elegir la palabra correcta para cada hueco (A-C).
- **Rigor:** Enfoque en sustantivos, verbos y adjetivos. Vocabulario graduado (A2 para G9 -> C2 para G11).

### Parte 5: Lectura Literal
- **Tarea:** Texto informativo. Preguntas de localización de hechos (A-C).
- **Rigor:** Distractores basados en "trampas de similitud léxica" (usar palabras del texto pero con lógica errónea).

### Parte 6: Lectura Inferencial
- **Tarea:** Texto de opinión o complejo. Preguntas sobre intención, tono y propósito (A-D).
- **Rigor:** Requiere síntesis global. A-D (4 opciones).

### Parte 7: Cloze Gramatical (Huecos 1-10)
- **Tarea:** Texto continuo denso. Elegir la opción gramatical correcta (A-D).
- **Rigor:** Preposiciones, verbos complejos, conectores lógicos, inversión. 4 opciones.

---

## 8. Tabla de Validación (Final del Bundle)

```markdown
## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 3 | single | Apply | Lexical | ⬜ |
| 2 | ...-v2 | 3 | single | Apply | Comunicativa | ⬜ |
| ... | ... | ... | ... | ... | ... | ... |
| 16 | ...-v16 | 6 | multi-correct | Analysis+ | Comunicativa+Pragmática | ⬜ |
| 17 | ...-v17 | 7 | multi-correct | Evaluate | Comunicativa+Lexical | ⬜ |
| 18 | ...-v18 | 8 | weighted | Create | Pragmática+Comunicativa | ⬜ |
| 19 | ...-v19 | 9 | weighted | Meta-cognitive | Comunicativa+Gramatical | ⬜ |
| 20 | ...-v20 | 10 | weighted | Transfer+ | Todas | ⬜ |
```

---

## 8. Niveles CEFR por Grado (Inglés)

| Grado | CEFR Target | Dificultad 3-5 | Dificultad 6-10 |
|-------|-------------|----------------|-----------------|
| **9** | B1 | A2-B1 | B1-B2+ |
| **10** | B1+ | B1-B1+ | B2-C1 |
| **11** | B2 | B1+-B2 | B2+-C1+ |

---

*Protocolo creado: 2026-03-02 | Versión: 4.0 | Autor: Antigravity*
