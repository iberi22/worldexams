---
name: worldexams-bundle-generator
description: Sistema de generación masiva de bundles de alta calidad para WorldExams. Implementa el Protocolo v5.1, asegura neutralidad regional y calidad psicométrica superior.
---

# WorldExams Bundle Generator Skill (Protocol v5.1)

Este skill otorga la capacidad de generar bundles de preguntas de alta calidad para la plataforma WorldExams, cumpliendo estrictamente con los estándares del ICFES (Colombia) y otros marcos nacionales.

## 🎯 Objetivo
Generar bundles de **20 preguntas** con dificultad progresiva, alineación curricular perfecta y sin errores técnicos (duplicados, alucinaciones o fugas de IA).

## 🛠️ Requisitos de Jules
Cuando este skill se active vía GitHub Issue, Jules debe:
1. Identificar el **País**, **Asignatura**, **Grado**, **Periodo** y **Tema**.
2. Verificar si es una **Regeneración** (si ya existe un archivo previo).
3. Generar el contenido siguiendo el **Workflow de Generación v5.1**.

---

## 📜 Protocolo de Generación v5.1

### 1. Estructura del Bundle
- **Archivo**: `[COUNTRY]-[SUBJ]-[GRADE]-P[N]-[TOPIC]-[###]-MASTERY-bundle.md`
- **Frontmatter**: YAML completo con `protocol_version: "5.1"`.
- **Cantidad**: EXACTAMENTE 20 preguntas.

### 2. Dificultad Progresiva (MASTERY)
| Rango | Dificultad | Nivel Bloom |
|-------|------------|-------------|
| 1-4   | D3-D4      | Remember / Understand |
| 5-10  | D5-D6      | Apply |
| 11-16 | D7-D8      | Analyze |
| 17-20 | D9-D10     | Evaluate / Create |

### 3. Anatomía de la Pregunta
Cada pregunta DEBE incluir:
- **ID**: `[BUNDLE_ID]-vN`
- **Bloom**: Nivel taxonómico.
- **ICFES**: Competencia específica según el marco oficial.
- **Contexto**: Situación relevante y moderna (evitar contextos genéricos).
- **Enunciado**: Claro, sin ambigüedades.
- **4 Opciones**: A, B, C, D.
  - **[x]** para la correcta.
  - **[ ]** para los distractores.
  - **feedback**: Explicación de por qué es correcta/incorrecta para CADA opción.
- **Explicación Pedagógica**: Resumen del concepto evaluado.

---

## 🚫 Reglas Anti-Errores (CRÍTICO)

1. **PROHIBIDO Distractores Duplicados**: El texto de las 4 opciones debe ser único. NUNCA repetir la opción correcta como un distractor.
2. **PROHIBIDO AI Leakage**: Eliminar bloques de `<think>`, `<process>` o cualquier residuo de la generación del modelo. El archivo debe empezar directamente con el frontmatter.
3. **PROHIBIDO Alucinaciones Científicas**: Validar símbolos químicos, fórmulas físicas y constantes universales. No inventar notación (ej: no usar `₇⁹Au`).
4. **PROHIBIDO "Todas las anteriores"**: No usar opciones tipo "todas las anteriores", "ninguna de las anteriores", "A y B son correctas".
5. **Contexto Útil**: El contexto debe ser necesario para resolver la pregunta o para dar marco situacional ICFES, no relleno decorativo.

---

## 📂 Ubicación Canónica
Los bundles deben guardarse en:
`questions_data/[country]/[asignatura]/grado-[N]/periodo-[P]/[tema]/[ID]-bundle.md`

## 🗺️ Reglas de Contextualización Regional

Jules debe adaptar el contenido según el país (`country`) definido en el issue:
- **Moneda**: Usar la moneda local (ej: `COP $` para Colombia, `CLP $` para Chile, `BRL R$` para Brasil).
- **Geografía**: Usar ciudades y regiones del país destino.
- **Nombres**: Usar nombres comunes en la cultura local.
- **Curriculum**: Mapear los temas a los exámenes nacionales (SIMCE en Chile, ECE en Perú, etc.).
- **Variante Idiomática**: Usar voseo (`vos`) para Argentina/Uruguay/Paraguay.

## ✅ Fase de Verificación (Obligatoria para Jules)

Antes de realizar el commit de un bundle, Jules DEBE:
1.  **Ejecutar el Auditor Local**:
    ```bash
    npx ts-node scripts/review-bundle.ts --bundle=[ruta_al_bundle]
    ```
2.  **Validar el resultado**: Si el auditor arroja `errors` o flags como `DUPLICATE_DISTRACTORS`, Jules debe corregir el archivo y volver a auditar.
3.  **Comprobar `bundle_size`**: Asegurarse de que el número de preguntas coincide con el frontmatter.

## 🤖 Instrucciones para Jules (System Prompt Integration)
"Eres Jules, el agente de generación de contenido de WorldExams. Tu misión es la excelencia pedagógica. Al recibir un issue con el label `jules` y una solicitud de bundle:
1. Lee este skill (`skills/worldexams-bundle-generator/SKILL.md`).
2. Genera el bundle siguiendo el protocolo v5.1.
3. **AUDITA** tu propio trabajo usando `scripts/review-bundle.ts` antes de subirlo.
4. Si el auditor falla, **CORRIGE** hasta que el reporte de revisión esté limpio.
5. Si es una regeneración de un bundle `minimax-m2.7`, asegúrate de que el nuevo contenido sea 100% original y superior en calidad."

---
*Versión 1.1 | Mayo 2026*
