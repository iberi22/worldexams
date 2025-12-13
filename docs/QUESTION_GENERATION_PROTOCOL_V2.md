# 📋 Protocolo de Generación de Preguntas v2.1

> **Versión:** 2.1 (actualizado con licencias duales)
> **Fecha:** 2025-12-12
> **Estado:** Activo
> **Anterior:** v2.0 (bundles de 7 preguntas), v1.0 (archivos individuales)

---

## 📌 Resumen Ejecutivo

El Protocolo v2.1 establece un nuevo estándar donde **cada archivo de pregunta contiene 7 variantes** organizadas por complejidad, con **licencias duales** para monetización controlada.

### Cambios Principales vs v2.0

| Aspecto | v2.0 | v2.1 (NEW) |
|---------|------|-----------|
| Licencias | Única (CC BY-SA 4.0 todo el bundle) | **Duales (v1: BY-SA, v2-v7: BY-NC-SA)** |
| Metadata | `protocol_version: "2.0"` | `protocol_version: "2.1"` + campo `licenses` |
| Monetización | Unclear | **Party Mode legal (vendemos servicio, no preguntas)** |

### Cambios vs v1.0

| Aspecto | v1.0 | v2.1 |
|---------|------|------|
| Preguntas por archivo | 1 | **7** |
| Variantes de complejidad | 6 variaciones aleatorias | **1 original + 2 fácil + 2 media + 2 difícil** |
| Contexto cultural | Opcional | **Obligatorio** |
| Explicaciones | Básicas | **Pedagógicas detalladas** |
| IDs | `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]` | `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]-v[1-7]` |
| Licencias | No especificadas | **v1: BY-SA, v2-v7: BY-NC-SA** |

---

## 🔄 Migración Gradual (v1.0 → v2.0)

La transición de v1.0 a v2.0 se realiza en **dos fases** para minimizar disrupciones:

### Fase 1: Actualización de Metadata ✅

**Objetivo:** Actualizar archivos existentes con la nueva metadata sin cambiar estructura.

**Acciones:**
- ✅ Agregar campo `protocol_version: "2.0"`
- ✅ Agregar campo `country: "[código]"`
- ✅ Normalizar IDs al formato `[COUNTRY]-[SUBJ]-[GRADE]-[topic]-[NNN]` (lowercase topic)
- ✅ Mejorar explicaciones pedagógicas
- ✅ Agregar competencias evaluadas
- ✅ Mantener 1 pregunta por archivo (temporalmente)

**Estado:** Formato válido pero no ideal. Se acepta durante periodo de transición.

**Ejemplo:**
```markdown
---
id: "CO-MAT-11-algebra-001"  # ✅ Sin sufijo -v1
protocol_version: "2.0"       # ✅ Indica intención de v2.0
country: "co"                 # ✅ Código de país
---
# 1 pregunta en el archivo (formato v1.0)
```

### Fase 2: Consolidación en Archivos de 7 Variantes 🚧

**Objetivo:** Agrupar preguntas en archivos multi-pregunta con progresión de dificultad.

**Acciones:**
- 🔄 Consolidar 7 preguntas relacionadas en un solo archivo
- 🔄 Agregar sufijos `-v1` a `-v7` en IDs
- 🔄 Implementar progresión de dificultad: 1-2-3-3-3-4-5
- 🔄 Ajustar metadata `total_questions: 7`

**Ejemplo:**
```markdown
---
id: "CO-MAT-11-algebra-001"
protocol_version: "2.0"
total_questions: 7
---

## Pregunta 1 (v1 - Original)
ID: CO-MAT-11-algebra-001-v1
Dificultad: 3

## Pregunta 2 (v2 - Fácil A)
ID: CO-MAT-11-algebra-001-v2
Dificultad: 1
...
```

### 🗓️ Roadmap de Migración

| Fase | Estado | Fecha | Descripción |
|------|--------|-------|-------------|
| **Fase 1** | ✅ Completado | Dic 2025 | PR #43 - Actualización metadata |
| **Fase 2** | 🚧 Pendiente | Q1 2026 | Issue #45 - Consolidación en 7 variantes |

### ⚠️ Nota Importante

**Durante el periodo de transición (Dic 2025 - Mar 2026):**
- ✅ Ambos formatos son válidos (1 pregunta y 7 preguntas)
- ✅ Nuevas preguntas DEBEN usar formato de 7 variantes
- ✅ Preguntas existentes pueden migrar gradualmente
- ✅ Archivos Fase 1 deben indicar `protocol_version: "2.0"` con disclaimer

**Después de Q1 2026:**
- ❌ Solo se aceptará formato de 7 variantes
- ✅ Todos los archivos v1.0 deben estar consolidados

---

## 🕵️ Paso 0: Investigación y Validación de Fuente

Antes de generar cualquier contenido, es **OBLIGATORIO** realizar una investigación web para obtener preguntas base validadas por humanos.

**Reglas de Oro:**
1.  **Nunca inventar desde cero:** La IA es un motor de variación, no de creación de currículo.
2.  **Fuente Autorizada:** Buscar preguntas liberadas del ICFES, EXANI, ENEM, o repositorios académicos confiables (.edu, .gov).
3.  **Verificación Humana:** Validar que la pregunta base tenga lógica, respuesta única y contexto claro.
4.  **Registro de Búsqueda:** Se debe registrar la query de búsqueda y la URL exacta en la metadata del archivo.

**Flujo de Trabajo:**
1.  **Buscar:** `search_web(query="preguntas liberadas icfes sociales grado 9")`
2.  **Seleccionar:** Elegir una pregunta real de un cuadernillo PDF o web oficial.
3.  **Adaptar:** Usarla como la variante `v1` (Original).
4.  **Generar:** Crear variaciones `v2-v7` basadas en esa semilla validada.

---

## 🎯 Estructura de 7 Preguntas por Archivo

Cada archivo `.md` debe contener exactamente 7 preguntas:

| # | Tipo | Dificultad | Descripción |
|---|------|------------|-------------|
| 1 | **Original** | 3 (Media) | Pregunta base adaptada de la fuente |
| 2 | **Fácil A** | 1-2 | Variación simplificada, reconocimiento básico |
| 3 | **Fácil B** | 1-2 | Variación simplificada con contexto diferente |
| 4 | **Media A** | 3 | Variación con aplicación práctica local |
| 5 | **Media B** | 3 | Variación con análisis o comparación |
| 6 | **Difícil A** | 4-5 | Variación multi-paso o síntesis |
| 7 | **Difícil B** | 4-5 | Variación con razonamiento complejo |

---

## 📁 Formato de Archivo v2.0

```markdown
---
# === METADATA GLOBAL ===
id: "[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]"
country: "[código ISO]"
grado: [número]
asignatura: "[Asignatura en idioma local]"
tema: "[Tema específico]"
protocol_version: "2.1"
total_questions: 7
estado: "draft|review|approved"
creador: "Copilot|AI-WorldExams|[Nombre]"
generation_date: "YYYY-MM-DD"

# === LICENSING (NEW v2.1) ===
licenses:
  v1: "CC BY-SA 4.0"        # Pregunta original (uso comercial permitido)
  v2-v7: "CC BY-NC-SA 4.0"  # Variantes (solo uso no-comercial)

# === SOURCE ATTRIBUTION ===
source: "OpenTDB"
source_url: "https://opentdb.com"
source_license: "CC BY-SA 4.0"
search_query: "[Query exacta usada para encontrar la fuente]"  # NEW v2.1
original_question: "[Pregunta original en inglés]"
original_answer: "[Respuesta original]"
---

# Pregunta Base: [Título descriptivo]

> **Fuente:** OpenTDB (CC BY-SA 4.0)
> **Original:** "[Pregunta original]"
> **Respuesta Original:** "[Respuesta]"

---

## Pregunta 1 (Original - Dificultad 3)

**ID:** `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]-v1`

### Enunciado

[Pregunta adaptada al contexto del país, con referencias culturales locales]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor 1 - error común específico]
- [ ] C) [Distractor 2 - error común específico]
- [ ] D) [Distractor 3 - error común específico]

### Explicación Pedagógica

**¿Por qué A es correcta?**
[Explicación detallada del concepto y por qué esta es la respuesta correcta]

**¿Por qué las otras son incorrectas?**
- **B)** [Explicación del error común que lleva a esta respuesta]
- **C)** [Explicación del error común que lleva a esta respuesta]
- **D)** [Explicación del error común que lleva a esta respuesta]

**Competencia evaluada:** [Competencia específica del currículo nacional]

---

## Pregunta 2 (Fácil A - Dificultad 1)

**ID:** `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]-v2`

### Enunciado

[Versión simplificada enfocada en reconocimiento básico]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor obvio]
- [ ] C) [Distractor obvio]
- [ ] D) [Distractor obvio]

### Explicación Pedagógica

[Explicación simple para estudiantes de nivel básico]

---

## Pregunta 3 (Fácil B - Dificultad 2)

**ID:** `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]-v3`

### Enunciado

[Versión simplificada con contexto cultural diferente]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor]
- [ ] C) [Distractor]
- [ ] D) [Distractor]

### Explicación Pedagógica

[Explicación con ejemplo del mundo real local]

---

## Pregunta 4 (Media A - Dificultad 3)

**ID:** `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]-v4`

### Enunciado

[Aplicación práctica con contexto local - moneda, ciudades, personajes]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor plausible]
- [ ] C) [Distractor plausible]
- [ ] D) [Distractor plausible]

### Explicación Pedagógica

[Explicación conectando teoría con práctica]

---

## Pregunta 5 (Media B - Dificultad 3)

**ID:** `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]-v5`

### Enunciado

[Variación que requiere análisis o comparación]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor analítico]
- [ ] C) [Distractor analítico]
- [ ] D) [Distractor analítico]

### Explicación Pedagógica

[Explicación que desarrolla pensamiento crítico]

---

## Pregunta 6 (Difícil A - Dificultad 4)

**ID:** `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]-v6`

### Enunciado

[Problema multi-paso que combina varios conceptos]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor de paso intermedio]
- [ ] C) [Distractor de paso intermedio]
- [ ] D) [Distractor de error de cálculo]

### Explicación Pedagógica

**Paso 1:** [Explicación del primer paso]
**Paso 2:** [Explicación del segundo paso]
**Resultado:** [Conclusión]

---

## Pregunta 7 (Difícil B - Dificultad 5)

**ID:** `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]-v7`

### Enunciado

[Problema de síntesis o evaluación con razonamiento complejo]

### Opciones

- [x] A) [Respuesta correcta]
- [ ] B) [Distractor sofisticado]
- [ ] C) [Distractor sofisticado]
- [ ] D) [Distractor sofisticado]

### Explicación Pedagógica

[Explicación avanzada que conecta múltiples conceptos y desarrolla pensamiento de orden superior]

---

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Validado |
|----------|-----|------------|----------|
| 1 | [ID]-v1 | 3 | ⬜ |
| 2 | [ID]-v2 | 1 | ⬜ |
| 3 | [ID]-v3 | 2 | ⬜ |
| 4 | [ID]-v4 | 3 | ⬜ |
| 5 | [ID]-v5 | 3 | ⬜ |
| 6 | [ID]-v6 | 4 | ⬜ |
| 7 | [ID]-v7 | 5 | ⬜ |
```

---

## 🌍 Reglas de Contextualización Cultural

### Obligatorio por País

| País | Moneda | Ciudades | Referencias Culturales |
|------|--------|----------|------------------------|
| 🇨🇴 CO | COP (Pesos) | Bogotá, Medellín, Cali | Café, vallenato, ICFES |
| 🇲🇽 MX | MXN (Pesos) | CDMX, Guadalajara, Monterrey | Tacos, UNAM, EXANI |
| 🇧🇷 BR | BRL (Reales) | São Paulo, Rio, Brasília | Futebol, ENEM, carnaval |
| 🇺🇸 US | USD (Dollars) | NYC, LA, Chicago | SAT, AP, college |
| 🇦🇷 AR | ARS (Pesos) | Buenos Aires, Córdoba | **Voseo obligatorio**, mate |

### Ejemplos de Contextualización

**Pregunta genérica (v1.0 - MAL):**
```
¿Cuál es el 15% de 200?
```

**Pregunta contextualizada (v2.0 - BIEN):**
```
En una tienda Éxito de Medellín, un producto cuesta $200,000 COP.
Si aplican un descuento del 15%, ¿cuánto dinero ahorras?
```

---

## ✅ Checklist de Validación v2.0

Antes de aprobar una pregunta, verificar:

### Formato
- [ ] Archivo contiene exactamente 7 preguntas
- [ ] Cada pregunta tiene ID único con sufijo `-v[1-7]`
- [ ] Frontmatter incluye `protocol_version: "2.1"`
- [ ] Atribución de fuente completa (CC BY-SA 4.0)
- [ ] `search_query` y `source_url` presentes y válidos


### Contenido
- [ ] Pregunta original adaptada con contexto cultural
- [ ] 2 preguntas fáciles (dificultad 1-2)
- [ ] 2 preguntas medias (dificultad 3)
- [ ] 2 preguntas difíciles (dificultad 4-5)
- [ ] Distractores representan errores comunes reales

### Pedagogía
- [ ] Explicaciones detalladas en cada pregunta
- [ ] Se explica por qué cada opción incorrecta está mal
- [ ] Competencia evaluada identificada
- [ ] Progresión lógica de dificultad

### Localización
- [ ] Moneda local usada en ejemplos numéricos
- [ ] Ciudades/lugares del país mencionados
- [ ] Referencias culturales apropiadas
- [ ] Idioma y modismos correctos (voseo en AR, etc.)

---

## 🔄 Migración de v1.0 a v2.0

### Para contenido existente:
1. **NO modificar archivos v1.0 existentes** (mantener retrocompatibilidad)
2. Crear nuevos archivos con sufijo `-bundle` para indicar v2.0
3. Ejemplo: `CO-MAT-11-fracciones-001-bundle.md`

### Para nuevo contenido:
1. Usar formato v2.0 desde el inicio
2. Generar 7 preguntas por archivo
3. Seguir naming convention: `[ID]-bundle.md`

---

## 📈 Métricas de Calidad

### KPIs por Archivo v2.0

| Métrica | Mínimo | Ideal |
|---------|--------|-------|
| Preguntas por archivo | 7 | 7 |
| Cobertura de dificultades | 3 niveles | 5 niveles (1-5) |
| Longitud de explicación | 50 palabras | 100+ palabras |
| Referencias culturales | 1 | 3+ |
| Distractores únicos | 12 (4×3) | 21 (7×3) |

---

## 🚨 Errores Comunes a Evitar

### ❌ NO hacer (v1.0 problems):
- Generar 6 preguntas casi idénticas (mismo concepto, diferente número)
- Omitir contexto cultural
- Usar explicaciones de una línea
- Repetir el mismo tipo de pregunta

### ✅ SÍ hacer (v2.0 standard):
- Variar el enfoque cognitivo (reconocer → aplicar → analizar → sintetizar)
- Incluir moneda, ciudades, nombres locales
- Explicar el "por qué" de cada distractor
- Escalar dificultad progresivamente

---

## 🔐 Licencias Duales (NEW v2.1)

### Rationale

**Objetivo:** Monetizar Party Mode ($49/mes) sin violar licencias open source.

**Estrategia:** Licencias mixtas dentro del mismo archivo bundle.

| Variante | Licencia | Uso Comercial | Acceso | Monetización |
|----------|----------|---------------|--------|--------------|
| **v1** (Original) | CC BY-SA 4.0 | ✅ Permitido | 🌍 Público | Marketing/SEO |
| **v2-v7** (Variantes) | CC BY-NC-SA 4.0 | ❌ Prohibido | 🌍 Público | Solo instituciones |

### ¿Por qué es legal vender Party Mode?

**Según [FAQ de Creative Commons](https://creativecommons.org/faq/#can-i-still-make-money-from-a-work-i-make-available-under-a-creative-commons-license):**

> "CC's NonCommercial (NC) licenses allow rights holders to maximize distribution while maintaining control of the commercialization of their works."

**Party Mode ($49/mes) es legal porque:**
1. ✅ **Vendemos el servicio/software**, no las preguntas directamente
2. ✅ **Preguntas BY-NC son input** para el servicio, no el producto final
3. ✅ **Casos análogos exitosos:**
   - GitHub vende hosting de código open source (incluso BY-NC)
   - WordPress.com vende hosting de temas/plugins GPL
   - Red Hat vende soporte/hosting de Linux (GPL)

### Implementación en Frontend

```typescript
// saberparatodos/src/utils/questionParser.ts
function filterByPlan(questions: Question[], userPlan: 'free' | 'institutional'): Question[] {
  if (userPlan === 'free') {
    // Solo v1 (referencia)
    return questions.filter(q => q.id.endsWith('-v1'));
  }
  // Instituciones ven todas (v1-v7)
  return questions;
}
```

### Disclaimers en README.md

Cada repo debe incluir:

```markdown
## 📜 Licencias

Este proyecto usa **licencias duales**:

- **v1 (Original):** [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) - Uso comercial permitido
- **v2-v7 (Variantes):** [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) - Solo uso no-comercial

**Party Mode** es legal porque vendemos el servicio de software, no las preguntas directamente.
```

---

## 📝 Ejemplo Completo: México Matemáticas

Ver archivo de ejemplo: `docs/examples/MX-MAT-11-angulos-001-bundle.md`

---

## 🔗 Referencias

- [PLANNING.md](../PLANNING.md) - Arquitectura global
- [AGENTS.md](../AGENTS.md) - Roles de IA
- [copilot-instructions.md](../.github/copilot-instructions.md) - Instrucciones Copilot

---

*Documento creado: 2025-12-04 | Protocolo activo desde esta fecha*
