# Question Domain Refactor - Fase 2

Fecha: 2026-03-03
Repositorio: saberparatodos
Contexto: Colombia (CO)

## Objetivo

Completar la unificacion de logica de preguntas moviendo los flujos restantes de:

- `LocalReportsView.svelte`
- `roomState.svelte.ts`

hacia la capa de dominio `src/lib/questions/*`.

## Cambios aplicados

### 1) Stop Mode centralizado

Se agrego `src/lib/questions/stop-mode.ts` con:

- `prepareStopModeQuestions(...)`

Responsabilidad:

- Cargar pool para Stop Mode desde repositorio
- Filtrar ingles segun config
- Filtrar por dificultad (easy/medium/hard)
- Validar estructura minima de pregunta
- Mezclar y recortar al total solicitado

Integracion:

- `src/modules/exam-room/stores/roomState.svelte.ts` ahora usa `prepareStopModeQuestions(...)` en lugar de logica inline.

### 2) Lookup de preguntas centralizado

Se agrego `src/lib/questions/lookup.ts` con:

- `findQuestionById(...)`

Responsabilidad:

- Buscar por ID en pool bulk
- Resolver variantes de ID/bundle (`-vN`)
- Fallback a busqueda por grado/asignatura derivada del ID
- Fallback final a cache local persistente (`getKnownQuestion`)

Integracion:

- `src/components/LocalReportsView.svelte` ahora usa `findQuestionById(...)` y elimina logica duplicada de busqueda/fallback.

### 3) Exports del dominio

Se actualizo `src/lib/questions/index.ts` para exportar:

- `stop-mode.ts`
- `lookup.ts`

## Pruebas

### Unit tests agregados

- `src/lib/questions/stop-mode.test.ts`
- `src/lib/questions/lookup.test.ts`

### Suite ejecutada

- `npx vitest run src/lib/questions/subject.test.ts src/lib/questions/filters.test.ts src/lib/questions/sync.test.ts src/lib/questions/stop-mode.test.ts src/lib/questions/lookup.test.ts` -> OK
- `npm run lint` -> OK

## Resultado

- Menos complejidad en UI/store.
- Menos duplicacion de reglas de negocio.
- Logica de seleccion y lookup ahora centralizada y testeada.
- Comportamiento funcional preservado con fallback existentes.

