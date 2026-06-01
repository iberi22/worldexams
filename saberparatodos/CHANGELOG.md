# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.15.0] - 2026-06-01

### v0.15.0: CI/CD Fixes + Preview Workflow + Packs Regeneration

#### Added
- **Preview Workflow**: deploy-preview.yml ó pushes a cualquier branch excepto main deployan a Cloudflare Pages preview (*.pages.dev) autom·ticamente
- **Production Gate**: Deploy a producciÛn requiere environment con aprobaciÛn manual
- **verify-deploy.mjs**: Script de verificaciÛn post-deploy (packs, versiÛn, endpoints, contexto)
- **Testing**: 150 packs regenerados con campo context extraÌdo correctamente desde markdown

#### Changed
- **CI/CD**: Node.js 20 ? 22, type check con 
px tsc --noEmit, sin cache npm para API
- **Token Cloudflare**: Nuevo token ''Edit Cloudflare Workers'' con permisos Workers + Pages
- **build-info.json**: version bump a 0.15.0

#### Fixed
- **deploy-api**: Variable CF_API_TOKEN no reconocida por Wrangler ? reemplazada por CLOUDFLARE_API_TOKEN
- **deploy-api**: Token Cloudflare expirado (creado hace 6 meses)
- **current.json**: Version inconsistente (1.0.0 ? 0.15.0)
- **Tag version**: CorrecciÛn de tags para alinearlos con commits reales

## [0.14.0] - 2026-06-01

### Context-Aware Questions + Shared Layout

#### Added
- **Context extractor** en `generate-static-packs.js`: parsing de `### Contexto` / `### Context` desde markdown a JSON
- **Campo `context`** en todos los packs generados (332/430 preguntas en matem√°ticas tienen contexto real)
- **Campo `cefr_level`** en packs de ingl√©s para filtrado por nivel MCER
- **SharedContextLayout**: Split-Pane en Desktop, Modal Drawer en m√≥viles para preguntas con contexto
- **Adaptive UI (`exam-room`)**: Layout de doble columna se activa autom√°ticamente solo cuando la pregunta tiene `context`

#### Fixed
- **Null pointer hydration crash** en PeriodTracker (#377)
- **Consolidaci√≥n de pools de ingl√©s**: unificaci√≥n global de todos los 10 niveles CEFR (A1-C2) para todas las preguntas de ingl√©s
- **CEFR level selector**: correcci√≥n del filtro por nivel MCER en preguntas de ingl√©s
- **Fallback multi-grade**: si el grado actual no tiene suficientes preguntas en el nivel CEFR solicitado, se toman de grados adyacentes

#### Deploy
- Regeneraci√≥n completa de 150 packs con campo `context`
- API Gateway actualizada (149 assets nuevos, version `319d37d0`)
- Frontend desplegado (98 assets nuevos, version `e60d95be`)
- `current.json` actualizado a `2026-06-01T17:05:46`

## [0.13.1] - 2026-04-15

### Lineamientos M.E.N. Colombia y referencias verificadas

#### Changed
- Se agregaron enlaces verificados a DBA, lineamientos curriculares, blogs oficiales, cuentas institucionales y PDFs de consulta.
- Se reordeno la tarjeta para priorizar el modo de examen y se reemplazo el texto de ayuda por un icono `?`.
- Se agrego la bandera amarilla para reportar una anomal√≠a con tooltip contextual.

#### Fixed
- `Simulacro Completo` ahora muestra un resumen global cuando no existe un DBA especifico para esa combinacion.

## [0.13.0] - Unreleased

### Transicion de Escala de Calificacion y UX (Alineacion ICFES)

#### Changed
- **Puntaje Unificado (0-500)**: Se rediseno el sistema ELO interno (anteriormente denominado "MMR") para que opere nativamente bajo la escala `0-500` del ICFES. El puntaje base de inicio ahora es `250` (anteriormente `1000`).
- **Rangos Revisados**: Los niveles del usuario (Iniciado a Gran Maestro) se ajustaron a los nuevos limites. Ahora se reflejan colores/feedback visual acordes desde `0` hasta `500+`.
- **Eliminacion de *Doble Calificacion***: La interfaz de usuario (`ScoreDisplay.svelte` y `LocalReportsView.svelte`) ya no destaca masivamente los "Puntos de Practica". Se renombraron a "Desempeno de Sesion" siendo el **Estimado ICFES** el unico gran protagonista en la UI para evitar confusiones.
- **Sistema de Inteligencias (Prompting Adaptativo)**: Se ajustaron todos los *prompts* que alimentan ChatGPT y NotebookLM (`notebooklm-source.json.ts`, `prompt-service.ts`) para que el coach de la IA comprenda que el usuario esta siendo calificado del 0 al 500 y no provea feedback basado en un sistema `0-3000`.
- **Sensibilidad del K-Factor y Momentum**: Se modifico la sensibilidad de los algoritmos de deteccion de arquetipos (estudiantes "en ascenso", "en regresion") para acomodarse a deltas puntuales de la escala 0-500, garantizando que el sistema los ubique correctamente de acuerdo a su historial de intentos y consistencia.

#### Fixed
- Modificaciones en pruebas unitarias de `mmr-system.ts`, `scoring.ts` y `prompt-service.ts` para que afirmen correctamente sobre los nuevos valores limites, evitando falsos positivos de regresion en E2E y flujos CI.
