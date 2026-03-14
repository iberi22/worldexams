# Question Domain Refactor - Fase 1

Fecha: 2026-03-03
Repositorio: saberparatodos
Contexto: Colombia (CO)

## Objetivo

Reducir complejidad en UI sin romper funcionamiento, extrayendo la logica de preguntas de los componentes principales hacia una capa de dominio reutilizable.

## Alcance aplicado

- Incluido:
  - `src/components/App.svelte`
  - `src/components/ExamConfigModal.svelte`
  - Nueva capa `src/lib/questions/*`
  - `src/lib/api-service.ts` (helper faltante)
- No incluido en esta fase:
  - `src/components/LocalReportsView.svelte`
  - `src/modules/exam-room/stores/roomState.svelte.ts`

## Cambios principales

### 1) Nueva capa de dominio de preguntas

Se creo `src/lib/questions/` con:

- `types.ts`: contratos de seleccion/repositorio
- `subject.ts`: normalizacion y match de asignaturas
- `filters.ts`: filtros por subject, grado/diagnostico, periodo y validacion
- `pool.ts`: merge/dedup y carga base/deep-search
- `selection.ts`: mezcla diagnostica y seleccion final
- `sync.ts`: sanitizacion de preguntas entrantes y payload de sala
- `orchestrator.ts`: casos de uso principales
  - `prepareSoloExamQuestions(...)`
  - `prepareRoomQuestions(...)`
  - `loadEnglishDiagnosticPool(...)`
- `repository.ts`: adaptador hacia `api-service`
- `index.ts`: barrel export

### 2) Integracion en App

En `src/components/App.svelte`:

- Se reemplazo la logica extensa de generacion de examen por llamadas al orquestador:
  - `prepareSoloExamQuestions(...)`
  - `prepareRoomQuestions(...)`
- Se centralizo validacion de preguntas sincronizadas con:
  - `sanitizeIncomingQuestions(...)`
- Se elimino duplicacion local de comparacion de asignaturas usando helper de dominio.
- Se corrigio carga para blog/grade change usando helper consistente de grado.

### 3) Integracion en ExamConfigModal

En `src/components/ExamConfigModal.svelte`:

- `createRoom()` ahora delega la seleccion de preguntas al orquestador (`prepareRoomQuestions`).
- `handleStart()` en modo periodo delega al orquestador (`prepareSoloExamQuestions` con `strictPeriod`).
- Se centralizo sanitizacion de preguntas entrantes (P2P/Realtime) con `sanitizeIncomingQuestions`.
- Se unifico naming legacy local (`party*` -> `room*`) para reducir deuda tecnica y evitar inconsistencias.

### 4) API service

En `src/lib/api-service.ts`:

- Se agrego:
  - `fetchQuestionsForGrade(grade, maxQuestions)` como wrapper de `fetchAllQuestionsForGrade(...)`

## Pruebas ejecutadas

### Unit tests nuevos (dominio)

- `src/lib/questions/subject.test.ts`
- `src/lib/questions/filters.test.ts`
- `src/lib/questions/sync.test.ts`

Resultado: OK

### Verificacion estatica

- `npm run lint` -> OK

### E2E

- Playwright de periodo no se ejecuto por conflicto de puerto (`localhost:4321` ya en uso en sesion activa).

## Riesgos y mitigacion

- Riesgo: diferencias sutiles de comportamiento al mover reglas de filtrado.
  - Mitigacion: mantener defaults y validaciones equivalentes (minimo 2 opciones, dedup por id, manejo diagnostico/periodo).
- Riesgo: sincronizacion host/guest con payloads no uniformes.
  - Mitigacion: sanitizacion centralizada de preguntas entrantes.

## Pendientes (Fase 2)

- Migrar `LocalReportsView.svelte` a la misma capa de dominio.
- Migrar `roomState.svelte.ts` para unificar estrategia de seleccion en modo sala.
- Ejecutar E2E completos una vez libre el puerto local.

