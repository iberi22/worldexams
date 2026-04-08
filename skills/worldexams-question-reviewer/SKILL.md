---
name: worldexams-question-reviewer
description: Sistema de revisión y validación de bundles de preguntas WorldExams. Detecta errores, califica calidad, aplica políticas de regeneración y mantiene historial de revisión.
---

# WorldExams Question Reviewer System

Sistema automático de revisión de bundles de preguntas. Cada tanda de revisión es ejecutada por un sub-agente que aplica el protocolo de validación completo.

## Trigger

Este skill se activa cuando:
- El cron job `worldexams-bundle-review` ejecuta un sub-agente de revisión
- Se hace manualmente: `Revisar bundle [ID]`
- Se solicita auditoría masiva: `Revisar todos los bundles de [país]`

## Workflow de Revisión

### FASE 1: Descubrimiento del Bundle

1. Identificar la ruta del bundle
2. Leer el frontmatter para extraer metadata:
   - `id`, `country`, `grado`, `asignatura`, `tema`, `periodo`
   - `bundle_size`, `protocol_version`
3. Verificar si existe historial de revisión previo en `supabase/questions_revision_history`

### FASE 2: Validación Estructural

Ejecutar checks en orden:

1. **Frontmatter válido**
   - Todos los campos obligatorios presentes
   - Formato de ID correcto: `CO-[AREA]-[GRADO]-P[N]-[TOPIC]-[###]-MASTERY`
   - `bundle_size` coincide con número de preguntas en archivo

2. **Estructura de preguntas**
   - Cada pregunta tiene: ID, Bloom, ICFES, Expected_Success, Enunciado, 4 opciones, 1 correcta, feedback, explicación
   - Formato consistente entre preguntas

3. **IDs únicos**
   - No hay IDs duplicados
   - No hay questions con IDs repetidos en el mismo bundle

### FASE 3: Validación de Contenido (por pregunta)

Para cada pregunta aplicar:

```
CHECKLIST_POR_PREGUNTA:
□ ¿Enunciado claro y sin ambigüedad?
□ ¿Contexto útil (no decorativo)?
□ ¿4 opciones homogéneas en categoría y registro?
□ ¿1 sola respuesta correcta?
□ ¿Distractores plausibles (representan errores reales)?
□ ¿Sin "todas las anteriores" / "ninguna de las anteriores"?
□ ¿Sin pistas gramaticales (correcta "brilla" por precisión)?
□ ¿Explicación pedagógicamente correcta?
□ ¿Feedback útil por opción?
□ ¿Lenguaje apropiado para el grado?
□ ¿Sin word salad?
□ ¿Sin pseudo-tecnicismo?
□ ¿Sin jerga grandilocuente sin función?
□ ¿Sin palabras repetidas artificialmente?
□ ¿Sin contexto morboso/sensacionalista innecesario?
```

### FASE 4: Validación Psicrométrica

1. **Dificultad progresiva**: Las primeras preguntas son más fáciles (reconocimiento), las últimas más difíciles (evaluación/transferencia)
2. **Discriminación**: Los distractores representan errores distintos y plausibles
3. **Success rate esperado**: Comparar `expected_success_rate` del frontmatter vs. el campo `Expected_Success` de cada pregunta

### FASE 5: Decisión

| Condición | Decisión |
|-----------|----------|
| 0 errores | ✅ `ACEPTAR` - Bundle listo para producción |
| 1 error | ⚠️ `CORREGIR_PUNTUAL` - Regenerar pregunta específica |
| 2+ errores | 🔴 `REGENERAR_BUNDLE` - Regenerar bundle completo |
| Errores sistemáticos (pattern crítico) | 🔴 `REGENERAR_BUNDLE` + flag `contamination` |

## Reglas de Regeneración

**REGENERAR bundle completo si:**
- 2+ preguntas con `[FALLA CRÍTICA]`
- 2+ preguntas con clave ambigua o no única
- Patrón sistemático de distractores absurdos
- Desalineación curricular amplia
- Estructura del bundle inconsistente

**CORREGIR pregunta puntual si:**
- 1 pregunta con error local (enunciado, opción, feedback)
- Error de formato en frontmatter
- ID duplicado

## Historial de Revisión

Por cada revisión, crear registro:

```json
{
  "bundle_id": "CO-MAT-11-ALGEBRA-001-MASTERY",
  "revision_id": "rev_20260402_001",
  "timestamp": "2026-04-02T18:00:00Z",
  "reviewer": "agent",
  "total_questions": 20,
  "errors_found": 0,
  "warnings": 0,
  "decision": "ACEPTAR",
  "questions_reviewed": [
    {
      "question_id": "CO-MAT-11-ALGEBRA-001-v1",
      "status": "ok",
      "errors": []
    }
  ],
  "flags": [],
  "next_review": "2026-04-09"
}
```

Guardar en:
- Tabla `questions_revision_history` en Supabase
- Archivo local: `.worldexams/revision-history/[bundle_id]/[revision_id].json`

## Comandos de Validación

```bash
# Validación de estructura
node saberparatodos/scripts/validate_content.js --scope=colombia --grade=11

# Auditoría de calidad
node saberparatodos/scripts/audit_question_quality.js --scope=colombia --grade-min=3 --grade-max=11

# Revisión específica de bundle
node scripts/review-bundle.js --bundle=CO-MAT-11-ALGEBRA-001-MASTERY
```

## Formato de Salida del Sub-Agente

```
📋 REVISIÓN DE BUNDLE: [ID]
País: [CO/MX/AR/CL/PE/BR]
Grado: [N]
Asignatura: [nombre]
Tema: [tema]
Bundle Size: [N] preguntas

═══════════════════════════════════════
RESULTADO: [✅ ACEPTAR / ⚠️ CORREGIR_PUNTUAL / 🔴 REGENERAR]
═══════════════════════════════════════

RESUMEN:
- Preguntas revisadas: [N]
- Errores encontrados: [N]
- Warnings: [N]
- Tiempo de revisión: [X]min

PREGUNTAS CON ERRORES:
1. [ID] - [tipo_error] - [descripción]
2. [ID] - [tipo_error] - [descripción]

ACCIONES REQUERIDAS:
- [lista de acciones]
```

## Sistema de Flags

| Flag | Significado | Acción |
|------|-------------|--------|
| `CONTAMINATION` | Bundle con contenido copiado/inválido | Regenerar + eliminar cache |
| `LOW_QUALITY` | bundle con qualityScore < 40 | Regenerar + marcar |
| `OUTDATED` | No revisado en > 30 días | Incluir en siguiente tanda |
| `PREMIUM_READY` | Pasó validación y listo para venta | Publicar a tabla premium |

## Configuración de Tandas

- **Tamaño de tanda**: 10 bundles por ejecución
- **Frecuencia**: Cada 6 horas (cron job)
- **Prioridad**: Bundles sin revisión reciente (> 7 días)
- **País por tanda**: Rotativo (CO → MX → AR → CL → PE → BR)

## Reglas de Comportamiento

- No modificar el bundle directamente durante la revisión
- Solo reportar errores y decisiones
- Si hay ambiguity, marcar como `CORREGIR_PUNTUAL` y explicar
- Para regeneración, el sub-agente de generación recibe el brief completo
- El historial es inmutable - nunca borrar entradas
