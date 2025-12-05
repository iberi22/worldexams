# 📋 Protocolo de Generación de Preguntas v2.0

> **Versión:** 2.0  
> **Fecha:** 2025-12-04  
> **Estado:** Activo  
> **Anterior:** v1.0 (6 variaciones por fuente, archivo separado por pregunta)

---

## 📌 Resumen Ejecutivo

El Protocolo v2.0 establece un nuevo estándar donde **cada archivo de pregunta contiene 7 variantes** organizadas por complejidad, reemplazando el modelo anterior de archivos individuales.

### Cambios Principales vs v1.0

| Aspecto | v1.0 | v2.0 |
|---------|------|------|
| Preguntas por archivo | 1 | **7** |
| Variantes de complejidad | 6 variaciones aleatorias | **1 original + 2 fácil + 2 media + 2 difícil** |
| Contexto cultural | Opcional | **Obligatorio** |
| Explicaciones | Básicas | **Pedagógicas detalladas** |
| IDs | `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]` | `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[NNN]-v[1-7]` |

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
protocol_version: "2.0"
total_questions: 7
estado: "draft|review|approved"
creador: "Copilot|AI-WorldExams|[Nombre]"
generation_date: "YYYY-MM-DD"

# === SOURCE ATTRIBUTION ===
source: "OpenTDB"
source_url: "https://opentdb.com"
source_license: "CC BY-SA 4.0"
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
- [ ] Frontmatter incluye `protocol_version: "2.0"`
- [ ] Atribución de fuente completa (CC BY-SA 4.0)

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

## 📝 Ejemplo Completo: México Matemáticas

Ver archivo de ejemplo: `docs/examples/MX-MAT-11-angulos-001-bundle.md`

---

## 🔗 Referencias

- [PLANNING.md](../PLANNING.md) - Arquitectura global
- [AGENTS.md](../AGENTS.md) - Roles de IA
- [copilot-instructions.md](../.github/copilot-instructions.md) - Instrucciones Copilot

---

*Documento creado: 2025-12-04 | Protocolo activo desde esta fecha*
