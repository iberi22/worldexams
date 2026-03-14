# 📋 Protocolo de Generación de Preguntas v3.0

> **Versión:** 3.0
> **Fecha:** 2025-12-22
> **Estado:** Activo
> **Anterior:** v2.1 (bundles de 7 preguntas)

---

## 📌 Resumen Ejecutivo

El Protocolo v3.0 establece un nuevo estándar donde **cada archivo de pregunta contiene 10 variantes** organizadas por dificultad, con **2 preguntas por cada nivel de dificultad (1-5)**.

### Cambios Principales vs v2.1

| Aspecto | v2.1 | v3.0 (NEW) |
|---------|------|------------|
| Preguntas por bundle | 7 | **10** |
| Distribución | 1 orig + 2 fácil + 2 media + 2 difícil | **2 por cada nivel (1-5)** |
| Dificultades cubiertas | 1, 2, 3, 4, 5 (desigual) | **1, 2, 3, 4, 5 (equitativo)** |
| Variaciones | v1-v7 | **v1-v10** |
| Nombre archivo | `*-bundle.md` | `*-v3-bundle.md` |
| `protocol_version` | `2.1` | `3.0` |

---

## 🔍 Requisito de Investigación (NUEVO)

Para garantizar la calidad y relevancia:
1. **La Pregunta Base (v1) DEBE ser real**: Investigada en la web de pruebas anteriores (ICFES, Pre-ICFES, simulacros universitarios).
2. **Atribución Obligatoria**: Se debe incluir `source_url` directo a la fuente donde se encontró la pregunta o el material de referencia.
3. **No inventar**: La v1 no debe ser generada desde cero por la IA, sino adaptada de una fuente humana real. Las variantes v2-v10 sí son derivadas pedagógicas generadas.

---

## 🎯 Estructura de 10 Preguntas por Archivo

Cada archivo `.md` debe contener exactamente **10 preguntas** con la siguiente distribución:

| # | Variación | Dificultad | Tipo |
|---|-----------|------------|------|
| 1 | v1 | **1** | Muy Fácil A |
| 2 | v2 | **1** | Muy Fácil B |
| 3 | v3 | **2** | Fácil A |
| 4 | v4 | **2** | Fácil B |
| 5 | v5 | **3** | Media A |
| 6 | v6 | **3** | Media B |
| 7 | v7 | **4** | Difícil A |
| 8 | v8 | **4** | Difícil B |
| 9 | v9 | **5** | Muy Difícil A |
| 10 | v10 | **5** | Muy Difícil B |

### Descripción de Niveles de Dificultad

| Nivel | Descripción | Habilidad Cognitiva |
|-------|-------------|---------------------|
| **1** | Reconocimiento básico, definiciones simples | Recordar |
| **2** | Comprensión de conceptos, ejemplos directos | Comprender |
| **3** | Aplicación práctica, cálculos estándar | Aplicar |
| **4** | Análisis, comparaciones, multi-paso | Analizar |
| **5** | Síntesis, evaluación, razonamiento complejo | Evaluar/Crear |

---

## 📁 Formato de Archivo v3.0

```markdown
---
# === METADATA GLOBAL ===
id: "[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]"
country: "[código ISO]"
grado: [número]
asignatura: "[Asignatura en idioma local]"
tema: "[Tema específico]"
protocol_version: "3.0"
total_questions: 10
estado: "draft|review|approved"
creador: "[Nombre o AI]"
generation_date: "YYYY-MM-DD"
periodo: [1-4]

# === LICENSING ===
licenses:
  v1: "CC BY-SA 4.0"        # Pregunta nivel 1 (uso comercial permitido)
  v2-v10: "CC BY-NC-SA 4.0" # Variantes (solo uso no-comercial)

# === SOURCE ATTRIBUTION ===
source: "[Fuente]"
source_url: "[URL]"
source_license: "CC BY-SA 4.0"
search_query: "[Query usada para encontrar la fuente]"
---

# Pregunta Base: [Título descriptivo]

> **Fuente:** [Nombre de la fuente] (Licencia)
> **Tema:** [Tema específico]

---

## Pregunta 1 (Muy Fácil A - Dificultad 1)

**ID:** `[ID]-v1`

### Enunciado

[Pregunta de reconocimiento básico o definición simple]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor obvio]
- [ ] C) [Distractor obvio]
- [ ] D) [Distractor obvio]

### Explicación Pedagógica

[Explicación breve del concepto básico]

---

## Pregunta 2 (Muy Fácil B - Dificultad 1)

**ID:** `[ID]-v2`

### Enunciado

[Variación de reconocimiento con contexto diferente]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor]
- [ ] C) [Distractor]
- [ ] D) [Distractor]

### Explicación Pedagógica

[Explicación del concepto]

---

## Pregunta 3 (Fácil A - Dificultad 2)

**ID:** `[ID]-v3`

### Enunciado

[Pregunta de comprensión con ejemplo directo]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor plausible]
- [ ] C) [Distractor plausible]
- [ ] D) [Distractor plausible]

### Explicación Pedagógica

[Explicación con ejemplo]

---

## Pregunta 4 (Fácil B - Dificultad 2)

**ID:** `[ID]-v4`

### Enunciado

[Variación de comprensión con contexto local]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor]
- [ ] C) [Distractor]
- [ ] D) [Distractor]

### Explicación Pedagógica

[Explicación con referencia cultural]

---

## Pregunta 5 (Media A - Dificultad 3)

**ID:** `[ID]-v5`

### Enunciado

[Aplicación práctica del concepto]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor de error común]
- [ ] C) [Distractor de error común]
- [ ] D) [Distractor de error común]

### Explicación Pedagógica

[Explicación paso a paso]

---

## Pregunta 6 (Media B - Dificultad 3)

**ID:** `[ID]-v6`

### Enunciado

[Aplicación con contexto del mundo real]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor]
- [ ] C) [Distractor]
- [ ] D) [Distractor]

### Explicación Pedagógica

[Explicación conectando teoría y práctica]

---

## Pregunta 7 (Difícil A - Dificultad 4)

**ID:** `[ID]-v7`

### Enunciado

[Problema multi-paso o que requiere análisis]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor de paso intermedio]
- [ ] C) [Distractor de paso intermedio]
- [ ] D) [Distractor de error de cálculo]

### Explicación Pedagógica

**Paso 1:** [Explicación]
**Paso 2:** [Explicación]
**Resultado:** [Conclusión]

---

## Pregunta 8 (Difícil B - Dificultad 4)

**ID:** `[ID]-v8`

### Enunciado

[Análisis o comparación de conceptos]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor sofisticado]
- [ ] C) [Distractor sofisticado]
- [ ] D) [Distractor sofisticado]

### Explicación Pedagógica

[Explicación detallada con análisis]

---

## Pregunta 9 (Muy Difícil A - Dificultad 5)

**ID:** `[ID]-v9`

### Enunciado

[Problema de síntesis que combina múltiples conceptos]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor muy plausible]
- [ ] C) [Distractor muy plausible]
- [ ] D) [Distractor muy plausible]

### Explicación Pedagógica

[Explicación avanzada que conecta múltiples conceptos]

---

## Pregunta 10 (Muy Difícil B - Dificultad 5)

**ID:** `[ID]-v10`

### Enunciado

[Evaluación crítica o razonamiento complejo]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor de alto nivel]
- [ ] C) [Distractor de alto nivel]
- [ ] D) [Distractor de alto nivel]

### Explicación Pedagógica

[Explicación de orden superior que evalúa comprensión profunda]

---

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Validado |
|----------|-----|------------|----------|
| 1 | [ID]-v1 | 1 | ⬜ |
| 2 | [ID]-v2 | 1 | ⬜ |
| 3 | [ID]-v3 | 2 | ⬜ |
| 4 | [ID]-v4 | 2 | ⬜ |
| 5 | [ID]-v5 | 3 | ⬜ |
| 6 | [ID]-v6 | 3 | ⬜ |
| 7 | [ID]-v7 | 4 | ⬜ |
| 8 | [ID]-v8 | 4 | ⬜ |
| 9 | [ID]-v9 | 5 | ⬜ |
| 10 | [ID]-v10 | 5 | ⬜ |
```

---

## 🔄 Compatibilidad con v2.1

El sistema soporta **ambos formatos simultáneamente**:

| Protocolo | Identificación | Preguntas |
|-----------|----------------|-----------|
| v2.1 | `protocol_version: "2.1"` o ausente | 7 |
| v3.0 | `protocol_version: "3.0"` | 10 |

### Detección en Parser

```typescript
const protocolVersion = entry.data.protocol_version || '2.1';
const expectedQuestions = protocolVersion === '3.0' ? 10 : 7;
```

---

## ✅ Checklist de Validación v3.0

### Formato
- [ ] Archivo contiene exactamente 10 preguntas
- [ ] Cada pregunta tiene ID único con sufijo `-v[1-10]`
- [ ] Frontmatter incluye `protocol_version: "3.0"`
- [ ] `total_questions: 10` en metadata

### Distribución de Dificultades
- [ ] 2 preguntas de dificultad 1 (v1, v2)
- [ ] 2 preguntas de dificultad 2 (v3, v4)
- [ ] 2 preguntas de dificultad 3 (v5, v6)
- [ ] 2 preguntas de dificultad 4 (v7, v8)
- [ ] 2 preguntas de dificultad 5 (v9, v10)

### Pedagogía
- [ ] Cada pregunta tiene explicación pedagógica
- [ ] Progresión lógica de dificultad
- [ ] Distractores representan errores comunes

---

## 📈 Beneficios de v3.0

1. **Cobertura equitativa** de todos los niveles de dificultad
2. **Filtros funcionales** en el blog (todos los niveles 1-5 visibles)
3. **Mejor evaluación adaptativa** con más granularidad
4. **40% más contenido** por archivo (10 vs 7 preguntas)

---

## 🔗 Referencias

- [Protocol v2.1](./QUESTION_GENERATION_PROTOCOL_V2.md) - Versión anterior
- [PLANNING.md](../PLANNING.md) - Arquitectura global
- [AGENTS.md](../AGENTS.md) - Roles de IA

---

*Documento creado: 2025-12-22 | Protocolo activo desde esta fecha*
