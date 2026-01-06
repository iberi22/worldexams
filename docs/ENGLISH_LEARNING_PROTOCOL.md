# 🌎 Protocolo Global de Inglés (LATAM/ES) v3.0

> **Versión:** 3.0-GLOBAL
> **Fecha:** 2026-01-04
> **Alcance:** Todo país hispanohablante (Colombia, México, Chile, Argentina, Perú, España, etc.)
> **Ubicación:** `src/content/questions/ingles/` (Centralizado)
> **Base:** Marco Común Europeo (CEFR) + Standards Internacionales (TOEFL/IELTS)

---

## 🎯 Objetivo: "Inglés Sin Fronteras"

El objetivo es estandarizar la enseñanza y evaluación del inglés a través de **todos los países de la organización**, utilizando un banco de preguntas centralizado y de alta calidad.

**La Filosofía:**
> "El inglés es una habilidad global, no local. Una pregunta de nivel B1 sirve igual para un estudiante en Bogotá que para uno en Santiago o Ciudad de México."

Este protocolo utiliza una estructura híbrida que combina lo mejor de los exámenes nacionales (tipo Saber 11/PAES/EXANI) con el rigor de estándares internacionales.

---

## �️ Mapeo de Niveles (Grade vs CEFR)

Para asegurar la compatibilidad con todos los sistemas educativos hispanohablantes, utilizamos el siguiente esquema de alineación:

| Nivel Global | CEFR | 🇨🇴 Colombia | 🇲🇽 México | 🇨🇱 Chile | 🇦🇷 Argentina |
|--------------|------|-------------|------------|----------|--------------|
| **Beginner** | **A1** | Grado 3-5 (Primaria) | Primaria 3°-6° | 3°-6° Básico | Primaria 3°-6° |
| **Elementary** | **A2** | Grado 6-8 (Secundaria) | Secundaria 1°-3° | 7°-8° Básico / I° Medio | Secundaria 1°-2° |
| **Intermediate** | **B1** | Grado 9-10 (Media) | Prep. 1°-2° | II°-III° Medio | Secundaria 3°-4° |
| **Advanced** | **B2+** | Grado 11-12 (Saber 11) | Prep. 3° (EXANI) | IV° Medio (PAES) | Secundaria 5°-6° |

---

## �📊 Estructura del Bundle Global (10 Preguntas)

Cada archivo contiene **una simulación comprimida** de las partes más comunes en exámenes estandarizados.

**Archivo:** `[COUNTRY]-ENG-[LEVEL]-[TOPIC]-[###]-bundle.md`
*Nota: Aunque usamos prefijos de país por legado (ej: `CO-`, `MX-`), el contenido se almacena centralmente en la carpeta `ingles/` y es reutilizable.*
**Ejemplo:** `CO-ENG-B2-technology-001-bundle.md`

| Pregunta | Parte ICFES | Habilidad (Skill) | Nivel Intl. (Inspiration) |
|---|---|---|---|
| **1-2** | **Parte 1 (Avisos/Matching)** | Lexical / Vocabulary | *TOEFL Vocab (Contexto)* |
| **3** | **Parte 2 (Avisos)** | Pragmatic Knowledge | *PET / KET (Real life signs)* |
| **4** | **Parte 3 (Conversación)** | Communicative | *IELTS Speaking (Scripts)* |
| **5-6** | **Parte 4 (Cloze I)** | Grammar (Basic) | *Cambridge Use of English* |
| **7** | **Parte 5 (Literal)** | Reading Comprehension | *TOEFL Factual Information* |
| **8** | **Parte 6 (Inferencial)** | Critical Reading | *TOEFL Inference / Rhetorical* |
| **9** | **Parte 7 (Cloze II)** | Grammar/Lexical (Adv) | *SAT Writing / C1 Advanced* |
| **10** | **Bonus Challenge** | Hardest Question | *C2 Proficiency / GRE Verbal* |

---

## 🏗️ Definición Detallada por Parte

### Parte 1 & 2: Léxico y Pragmática (Vocabulario de Alto Nivel)
En lugar de palabras simples ("Dog", "Cat"), usamos vocabulario académico o técnico del TOEFL relacionado con el tema.
*   **ICFES:** Match "Apple" with "Fruit".
*   **Hybrid:** Match "Obsolete" with "No longer produced".

### Parte 3: Conversaciones (Idioms & Phrasal Verbs)
Las conversaciones deben incluir usos naturales y modismos que suelen aparecer en series/películas, no solo inglés de libro de texto.
*   **Enfoque:** Social situations, polite requests, colloquial responses.

### Parte 4 & 7: Cloze Tests (Gramática en Contexto)
Textos conectados (no oraciones sueltas) que requieren entender la coherencia global.
*   **Inspiración:** Cambridge FCE/CAE Part 1 & 2.
*   **Focus:** Prepositions, relative clauses, linkers (However, Although, Despite).

### Parte 5 & 6: Lectura Crítica (TOEFL Logic)
Usamos textos de temas interesantes (Ciencia, Historia, Tecnología) y aplicamos tipos de pregunta TOEFL pero formato ABC/ABCD.
*   **Inference:** "¿Qué implica el autor sobre X?" (No está escrito explícitamente).
*   **Negative Factual:** "¿Cuál de estas NO se menciona?"
*   **Reference:** "¿A qué se refiere la palabra 'they' en la línea 12?"

---

## 📝 Formato del Archivo

```markdown
---
id: "CO-ENG-B2-innovation-001"
country: "co"
grado: 11
asignatura: "ingles"
tema: "innovation"
cefr_level: "B2"
protocol_version: "3.0-COL"
total_questions: 10
international_focus: "TOEFL Reading - Inference"
---

# Topic: Tech Innovation (B2+)

---

## Question 1 (Part 1 - Vocabulary)
ID: CO-ENG-B2-innovation-001-v1

### Contexto
**Definitions:**
1. A breakthrough or discovery.
2. To make something easier.
3. Outdated, no longer in use.

**Words:**
A. Facilitate
B. Obsolete
C. Innovation
D. Hinder

### Enunciado
Match definition **"3. Outdated, no longer in use"** with the correct word.

### Opciones
- [ ] A
- [x] B
- [ ] C
- [ ] D

### Explicación Pedagógica
**English:** 'Obsolete' means no longer produced or used. From Latin *obsoletus* (grown old).
*Español: 'Obsolete' significa que ya no se produce o usa. Del latín obsoletus (envejecido).*

**Vocabulary Table / Tabla de Vocabulario:**
| English | Español | Example |
|---------|---------|---------|
| Obsolete | Obsoleto | VHS is obsolete |
| Facilitate | Facilitar | Technology facilitates learning |
| Innovation | Innovación | iPhone was an innovation |

**TOEFL Strategy:** Essential for describing technology trends.
*Estrategia TOEFL: Esencial para describir tendencias tecnológicas.*

---

## Question 8 (Part 6 - Critical Reading)
ID: CO-ENG-B2-innovation-001-v8

### Contexto
**Reading Passage:**
"While many fear AI will replace human creativity, history suggests otherwise. The camera did not kill painting; it forced it to evolve into abstraction. Similarly, AI might not replace writers, but rather push them toward more deeply human narratives that algorithms cannot mimic."

### Enunciado
**Inference Question:** What does the author imply about the future of writing?

### Opciones
- [ ] A) It will be completely automated by algorithms.
- [ ] B) It will disappear like realistic painting.
- [x] C) It will transform to focus on distinctively human qualities.
- [ ] D) It will remain exactly the same as it is today.

### Explicación Pedagógica
**Correct Answer C:** The author compares writing to painting ("forced it to evolve"), implying writing will also evolve/transform, not disappear.
**TOEFL Strategy:** Look for "evolve" and "push toward", which implies transformation, not replacement (A) or stasis (D).

---

```

---

## 📦 Estrategia de Contenido: Universal vs. País-Específico

Para maximizar el alcance del contenido de inglés, clasificamos los bundles en dos categorías:

### Contenido Universal (`UNI-ENG-*`)

Los bundles con prefijo `UNI-ENG-` son **100% reutilizables** en todos los países hispanohablantes:

| Característica | Requisito |
|----------------|-----------|
| **Referencias culturales** | Neutrales o globalmente reconocidas (Apple, NASA, Netflix) |
| **Lugares** | Sin ciudades específicas o usar contextos genéricos ("a city", "your country") |
| **Moneda** | Dólares (USD) o sin moneda específica |
| **Nombres** | Internacionales (Alex, Maria, John) |
| **Fuentes** | "World Exams Original" o recursos abiertos (British Council, Cambridge) |

> [!TIP]
> **Para lanzamientos en nuevos países:** Usar exclusivamente bundles `UNI-ENG-*`.

### Contenido País-Específico (`CO-ING-*`, `MX-ING-*`, etc.)

Los bundles con prefijo de país contienen contexto cultural local:

| País | Ejemplos de Contenido |
|------|----------------------|
| 🇨🇴 Colombia | Feria de las Flores, Café colombiano, Shakira |
| 🇲🇽 México | Día de los Muertos, Frida Kahlo, Teotihuacán |
| 🇦🇷 Argentina | Tango, Messi, Patagonia |
| 🇨🇱 Chile | Desierto de Atacama, Pablo Neruda, PAES context |

> [!IMPORTANT]
> Los bundles `CO-ING-*` existentes deben **evaluarse antes de usarse en otros países**. Muchos contienen referencias a "Colombia", "ICFES", o lugares locales.

### Recomendación de Uso por País

| País Target | Bundles Recomendados |
|-------------|---------------------|
| 🇨🇴 Colombia | `UNI-ENG-*` + `CO-ING-*` (todos) |
| 🇲🇽 México | `UNI-ENG-*` + CO-ING sin referencias CO |
| 🇨🇱 Chile | `UNI-ENG-*` + CO-ING sin referencias CO |
| 🇦🇷 Argentina | `UNI-ENG-*` + CO-ING sin referencias CO |

---

## 🔮 Futuro: Multimedia (v4.0 Experimental)

*Esta sección se mantiene como referencia para futura implementación.*

(Ver anexo de protocolo v3.0-ENG original sobre `{{youtube}}` y `{{audio}}`).
Por ahora, nos enfocamos en **Texto y Lectura Crítica** sólida.
