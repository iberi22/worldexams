# [Wave 12.03] feat(seo): Enlaces contextuales a hilos y correcciones desde páginas estáticas de preguntas

## Summary
En las páginas públicas y estáticas `/preguntas/[...slug]` donde se listan las preguntas de práctica semanales, cada pregunta individual debe incluir un acceso interactivo hacia su hilo de discusión pedagógica y hacia la herramienta de corrección.

## Contexto Técnico & Archivos Objetivo
- `saberparatodos/src/pages/preguntas/[...slug].astro`
- `saberparatodos/src/pages/community/[question_id].astro`

## Criterios de Aceptación (AC)
1. **Botones Contextuales por Pregunta**:
   - Al pie de cada pregunta en `/preguntas/[...slug].astro`, añadir enlaces limpios:
     - `"💬 Ver debate e interpretaciones comunitarias"` → `/community/[question_id]`
     - `"🛠️ Reportar inconsistencia / sugerir parche"` → `/corrections`
2. **Contexto Completo**:
   - Asegurar que al navegar a `/community/[question_id]`, si la pregunta está en el banco local, se muestre su enunciado completo con opciones y fórmula matemática renderizada.
3. **Verificación**:
   - `npm run test:unit -w saberparatodos` pasa al 100%.
   - `npm run lint -w saberparatodos` limpio.
