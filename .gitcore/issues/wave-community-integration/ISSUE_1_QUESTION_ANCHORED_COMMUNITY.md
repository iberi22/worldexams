# [Wave 12.01] feat(ui): Integrar discusión comunitaria y corrección v5.2 directamente en el modal y vista de preguntas (ArticleView / BlogView)

## Summary
Actualmente la discusión comunitaria y la corrección colaborativa se encuentran en rutas separadas. Este issue conecta de forma nativa la UI de discusión (`ThreadedExplanation`) y la propuesta de parches (`CorrectionThread`) dentro de la vista individual de preguntas (`ArticleView.svelte` y `BlogView.svelte`). Al abrir cualquier pregunta del banco, el estudiante o docente podrá ver las explicaciones, debatir alternativas y enviar propuestas de corrección sin salir del contexto de la pregunta.

## Contexto Técnico & Archivos Objetivo
- `saberparatodos/src/components/ArticleView.svelte`
- `saberparatodos/src/components/BlogView.svelte`
- `saberparatodos/src/components/community/ThreadedExplanation.svelte`
- `saberparatodos/src/components/corrections/CorrectionThread.svelte`

## Criterios de Aceptación (AC)
1. **Tabs en Detalle de Pregunta**:
   - En `ArticleView.svelte`, debajo de la explicación de la pregunta, incluir un selector de pestañas:
     - Tab 1: **"💡 Explicación Oficial"** (muestra la clave y solución pedagógica).
     - Tab 2: **"💬 Debate Comunitario"** (monta `ThreadedExplanation` con `questionId={question.id}`).
     - Tab 3: **"🛠️ Proponer Corrección"** (monta `CorrectionThread` permitiendo sugerir ajustes a distractores o enunciado con diff visual v5.2).
2. **Acceso directo desde el banco interactivo**:
   - En `BlogView.svelte`, cada tarjeta de pregunta incluye un badge con el contador de aportes y un botón directo `"Debatir en Comunidad"`.
3. **Persistencia & Fallback**:
   - Funciona sin requerir login obligatorio ni conexión a Supabase externa (modo in-memory / local storage node hash garantizado).
4. **Verificación**:
   - `npm run test:unit -w saberparatodos` pasa al 100%.
   - `npm run lint -w saberparatodos` limpio (0 errores, 0 advertencias).
