# Protocol v5.0 — Maestría ICFES: Arquitectura del Éxito (Mastery)

> **Versión:** 5.0 | **Fecha:** 2026-03-10 | **Estado:** Activo 🚀
> **Objetivo:** Generar ítems de alta fidelidad alineados con los Marcos de Referencia Saber (ICFES), integrando taxonomía de Bloom, rúbricas de evaluación y simulacros de calibración.

---

## 1. Distribución de Complejidad (20 Preguntas/Bundle)

Cada bundle debe seguir una progresión de dificultad 3-10, asegurando que los niveles superiores (D8-10) exijan síntesis y transferencia extraordinaria.

| Nivel | Habilidad Bloom | Dificultad | Tipo | Crédito |
|-------|-----------------|------------|------|---------|
| **Básico** | Recordar / Comprender | 3-4 | single | 100% |
| **Intermedio** | Aplicar / Analizar | 5-6 | single / multi | 100% / Partial |
| **Avanzado** | Evaluar / Sintetizar | 7-8 | multi-correct | Partial / Weighted |
| **Maestría** | Crear / Transferir | 9-10 | weighted / complex | Weighted |

---

## 2. Metadatos Técnicos Obligatorios (Frontmatter)

Cada bundle debe incluir en su metadata global:

```yaml
---
id: "CO-[ASIGNATURA]-[GRADO]-[PERIODO]-[TEMA]-[INDEX]-MASTERY"
protocol_version: "5.0"
alignment: "ICFES Saber 11 / Marcos Técnicos"
target_cefr: "B2-C1 (Inglés)"
---

## 1. Organización de Directorios (Optimal Hierarchy)
Para resolver el desajuste de versiones anteriores, el almacenamiento OBLIGATORIO en `questions_data/colombia/` sigue este orden:
`[Asignatura]/grado-[N]/periodo-[P]/[tema-kebab-case]/[archivo]-MASTERY-bundle.md`

**Ejemplo:**
`matematicas/grado-11/periodo-2/derivadas/CO-MAT-11-P2-derivadas-001-MASTERY-bundle.md`

---

## 2. Metadatos Técnicos Obligatorios (Frontmatter)
```yaml
periodo: [1-4]                      # OBLIGATORIO: Según malla curricular
bundle_index: [1-3]                 # OBLIGATORIO: 3 bundles por tema/periodo
modern_context: true
calibration:
  expected_success_rate: 0.65
  discrimination_index_target: ">= 0.2"
  simulated_responses: 100
rubric_baseline: "identificación_conflicto, ponderación_precedente, claridad_argumental"
---

## 2. Regla de Densidad (3 Bundles por Tema)
Para asegurar una base de preguntas robusta (Mastery), cada tema dentro de un periodo académico DEBE contar con **3 bundles distintos**:
- **Bundle 1:** Conceptos núcleo y aplicaciones estándar.
- **Bundle 2:** Casos de borde, excepciones y análisis sistémico.
- **Bundle 3:** Transferencia extraordinaria y retos de alta complejidad (D7-10).

---

## 3. Metadatos Técnicos Obligatorios (Frontmatter)
```

---

## 3. Estructura de Ítem - Requisitos de "Maestría"

Cada pregunta dentro del bundle debe contener los siguientes elementos enriquecidos:

### 3.1 Componentes del Ítem
- **ID Único:** `[ID]-vN`
- **Bloom Objective:** Objetivo específico del nivel (Ej: "Evaluar la validez de un argumento jurídico").
- **Competencia:** Referencia directa al marco ICFES (Ej: "Pensamiento Reflexivo y Sistémico").
- **Dificultad:** Escala 1-10.
- **Contexto Factual:** Máximo 120 palabras; debe incluir hechos reales, normas o fallos (si aplica).
- **Enunciado:** Claro y directo.

### 3.2 Reglas de Generación (Hard Constraints)
1. **Distractores Defendibles:** No generar opciones absurdas. Cada distractor debe ser defendible con un argumento jurídico, factual o conceptual (para inducir análisis profundo).
2. **Opciones Condicionales:** Incluir al menos una opción que use estructuras como "siempre que...", "solo cuando...", "a menos que...".
3. **Variación Aleatoria:** Cambiar hechos críticos en variantes (ej: montos, tipos de cargo, cláusulas, duración de contratos).
4. **Retroalimentación Específica:** Generar 1-2 líneas de feedback por CADA opción incorrecta.
5. **Rúbrica Corta:** Definir criterios de evaluación para la justificación (2-3 frases requeridas en simulacros).

---

## 4. Ejemplo de Pregunta Mastery (Dificultad 7+)

```markdown
## Question 18 (Variant High - Difficulty 9)

**ID:** `CO-LEN-11-critico-005-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Reflexionar y evaluar
**Expected_Success:** 0.35

### Contexto
Un columnista afirma que "la libertad de expresión en redes sociales es un derecho absoluto que prima sobre el buen nombre, ya que el espacio digital es por definición la plaza pública moderna".

### Enunciado
Considerando la jurisprudencia de la Corte Constitucional colombiana (Sentencia T-030/20), ¿cuál de las siguientes opciones representa la ponderación correcta del caso?

### Options
- [ ] A) El derecho es absoluto siempre que no se use lenguaje soez. <!-- feedback: La jurisprudencia aclara que NINGÚN derecho es absoluto. -->
- [x] B) El derecho prima solo cuando el contenido es de interés público, incluso si afecta el buen nombre, siempre que no sea difamación malintencionada. <!-- feedback: Correcto. La ponderación depende de la relevancia pública y la veracidad. -->
- [ ] C) El buen nombre siempre prevalece sobre la libertad de expresión en espacios privados como Facebook. <!-- feedback: Incorrecto. Facebook es considerado espacio de relevancia pública según la Corte. -->
- [ ] D) La libertad de expresión nunca puede ser limitada por algoritmos de moderación. <!-- feedback: Abstracto e incorrecto legalmente. -->

### Rúbrica de Justificación
1. **Identificación de la limitación:** Reconoce que el derecho no es absoluto.
2. **Uso de precedente:** Cita la necesidad de interés público.
3. **Claridad:** Redacción técnica y lógica.

### Explicación Pedagógica
La opción B es la única defendible jurídicamente en Colombia, basándose en el test de proporcionalidad. Las redes sociales no son "zonas de impunidad", pero el interés público protege el discurso crítico.
```

---

## 5. Validación mediante Simulación

Si se actúa bajo el rol de @jules, se debe realizar una validación interna:
- **Simulación:** Evaluar cómo responderían 100 perfiles (Bajo/Medio/Alto).
- **Ajuste:** Si la discriminación es < 0.2, reformular distractores para que no sean "trucos" sino análisis genuinos.

---

*Protocolo Maestro v5.0 | World Exams Organization | 2026*
