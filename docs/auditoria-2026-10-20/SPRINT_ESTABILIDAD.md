# Sprint de estabilidad — ranking, banco de preguntas y API (2026-10-20)

Fuente: auditoría del 2026-10-20 (orquestador Opus + 7 subagentes deepseek-v4.1-flash-free vía opencode + 3 subagentes Haiku 5.5).
Informes detallados en esta carpeta: `coh-*.md` (coherencia por área CO-11), `sufficiency.md`, `validator-analysis.md`.
Test E2E de alumno: `saberparatodos/tests/e2e/student-exam-journey.spec.ts` (3 pass, 1 fail = bug R1).

Todo hallazgo marcado ✔ fue verificado por el orquestador contra código, D1 o producción.

## Estado verificado

| Área | Estado | Evidencia |
|---|---|---|
| Ranking "semana/mes/año/total" | ROTO ✔ | `LeaderboardView.svelte:113` → `loadLeaderboard()` pide `/leaderboards/leaderboard-*.json`: 404 en prod, nunca existieron en git ni hay generador |
| Ranking oficial (D1) | Funciona, vacío ✔ | `GET /v1/leaderboard?season=2026-10` → `entries: []`. Único intento real del mes (40/40, 14 aciertos) quedó `flagged` con integridad limpia |
| Motivo del flag | Heurística ✔ | `ranked.ts:149`: flag si mediana de `ms` reportado por el cliente < 4000, aunque el reloj de servidor dio 518 s/40 = 13 s por respuesta. El cliente reinicia `questionStartTime` en prev/next/grid/recarga (`RankedExamView.svelte:117,174,181,458`) |
| API, CI de `main` | Verde | API vitest 52/52, último deploy prod 5/5 jobs |
| Vitest frontend | 169/169 suites, 1251 tests ✔ | con `npm ci` limpio; el fallo inicial era del `node_modules` local |
| Banco | 3027 bundles / 43 408 preguntas; estructura 100 % OK; 704 bundles fallan `--strict-quality` ✔ | `validator-analysis.md` |

## P0 — integridad, privacidad y bugs visibles (primero)

| # | Problema | Ubicación | Fix |
|---|---|---|---|
| R1 ✔ | Ranking semanal siempre en error; dos rankings en una pantalla; "Mesh P2P Active" hardcodeado; filtro País/Institución/Materia no filtra (`scopeValue` nunca se fija) | `LeaderboardView.svelte:52-140,239,274`, `leaderboard-service.ts:96-140` | Eliminar la sección legacy (static JSON + mesh simulado) y dejar solo `RankedLeaderboard`; si se quieren periodos, añadir `?period=week` al endpoint D1. Test 2 del spec E2E debe pasar a verde |
| R2 ✔ | **`/v1/ranked/start` entrega el feedback de cada opción antes de responder.** El feedback de la correcta delata la clave ("Se evalúa la función…" vs "Falta sumar 1") | `apps/worldexams-api/src/ranked.ts:348` | Devolver solo `{letter,text}` en `clientQuestions`; el feedback ya viaja en `review` tras el submit (`ranked.ts:128-135`). Test de contrato |
| R3 ✔ | **Privacidad: cada examen de práctica se envía automáticamente** (displayName, anonymousId, grado, región) a la edge function `submit-leaderboard-score` sin mirar el opt-in ni el umbral de 60 preguntas. Contradice el texto de `leaderboard.astro:39` | `ResultsView.svelte:214-237`, `leaderboard-service.ts:255-300` | Gate `getLeaderboardSettings().isOptedIn && isLeaderboardEligible(n)`; o eliminar el envío (nadie lee ese ranking, no existe el código de la edge function en el repo) |
| R4 ✔ | **Placeholder `{city}` servido en producción**: 1117 apariciones en 120 packs (ej. `CO-ING-11-2026-W03-…-v5`: "only used by academic elites in {city}."). `PLACEHOLDER_RE` del ranked no lo detecta | `ranked.ts:19`, packs `*-ingles.json` | Ampliar el filtro a `/\{[a-z_]+\}/` en ranked y `/v1/questions`; regla bloqueante en `validate-bundles-v52.mjs`; reparar los bundles fuente |
| R5 ✔ | Flag por mediana de `ms` del cliente expulsa intentos legítimos; la UI solo dice "Intento marcado por integridad", sin explicar que queda fuera del ranking | `ranked.ts:146-150`, `RankedExamView.svelte:155-158,506-512` | Cliente: acumular tiempo de permanencia por pregunta entre visitas. Servidor: decidir con reloj propio (`elapsedS`) y usar la mediana solo como señal secundaria (p. ej. < 1.5 s). UI: motivo + "no entra al ranking". Revisar el intento de oct (requiere aprobación para escribir D1) |

## P1 — estabilidad API / build / CI

| # | Problema | Ubicación | Fix |
|---|---|---|---|
| A1 ✔ | Doble submit no atómico (dos submits concurrentes → dos filas) | `ranked.ts:89,158-163` | `UPDATE … WHERE id=? AND submitted_at IS NULL` y comprobar `meta.changes`, o `db.batch` |
| A2 ✔ | TTL de sesión 90 min vs examen 60 min; recargando se obtienen ~90 min | `ranked.ts:20,94`, `RankedExamView.svelte:99,107` | TTL = 60 min + 2 min de gracia; rechazar submit fuera |
| A3 | Sin guard de pool mínimo: si falla el manifest, `/start` devuelve 200 con examen vacío | `ranked.ts:271-324` | 503 si `finalQuestions.length < 31`; test |
| A4 | `_manifest.json` commiteado desfasado (164 packs sin indexar; `--check` exit 1); preview solo avisa | `deploy-preview.yml:74`, `build-pack-manifest.mjs` | Regenerar + `--check` bloqueante en preview y en pre-commit de packs |
| A5 ✘ | ~~`@swal/edge-mesh` no resuelve~~ — falso positivo: era el `node_modules` local desfasado (layout pnpm). Con `npm ci` (lo que hace CI): 169/169 suites, 1251 tests, `astro check` 0 errores | — | Ninguno en el repo; `astro check` pasa a ser bloqueante en preview |
| A6 | Season en UTC: envíos de Colombia tras las 19:00 del último día caen en el mes siguiente | `ranked.ts:156,400` | Calcular season en `America/Bogota` (UTC-5) en submit y leaderboard |
| A7 | Límite 30 starts/día por IP bloquea aulas tras NAT | `ranked.ts:243-252` | Subir umbral o combinar device+IP |
| A8 | Sin E2E post-deploy (`e2e-tests.yml`, `monitor-deployment.yml` desactivados); smoke no prueba ranked | `.github/workflows/`, `scripts/deploy-smoke.sh:262` | Correr `student-exam-journey.spec.ts` contra preview; smoke de `ranked/start` en preview |
| A9 | Ranked no está en `.gitcore/features.json` → el pipeline no lo verifica | `.gitcore/features.json` | Añadir feature (PR GitCore con spec + tests, `status: planned`) |

## P1 — contenido del pool ranked (CO grado 11)

Las claves son correctas casi siempre; el problema es **plantillas, ítems sin estímulo y pistas de formato**.

| # | Área | Hallazgo | Acción |
|---|---|---|---|
| C1 | Matemáticas | W01–W21 = 21 semanas con 1 enunciado distinto cada una (420 ítems clonados con otro número; W01 pregunta "¿cuál es la función…?" con respuestas numéricas). 78 % de las sesiones ranked toca al menos una. El E2E de práctica sirvió 20 copias de la misma pregunta ✔ | Excluir W01–W21 del pool ranked ya (lista de exclusión) y regenerar |
| C2 | Inglés | 43.6 % bloqueante: 173 ítems sin texto de referencia, 144 duplicados con `{city}`, 32 con clave agramatical; 40/40 bundles con explicación de plantilla | Retirar del ranked los bloqueantes (lista en `coh-ingles.md`); regenerar W01–W10 |
| C3 | Lectura crítica | 34 % de ítems sin texto que leer; la correcta es la opción más larga en el 91.8 % (pista que sobrevive al barajado) | Retirar ítems sin estímulo; regenerar distractores de longitud similar |
| C4 | Sociales | 3 claves con errores factuales en W40 (lugar de firma del Acuerdo 24-nov-2016 = Teatro Colón de Bogotá; Informe CEV "Hay futuro si hay verdad", 28-jun-2022; figura inventada "RIT") | Corregir a mano |
| C5 | Ciencias | W20-v5 dato físico falso (100 cal ≠ 100 J); W40-v8 dos opciones verdaderas; W30 entero no usable; LaTeX roto en 57 ítems (21 no renderizan) | Corregir a mano / retirar W30 |
| C6 | Lectura crítica | W31-v12 clave invertida (deixis "aquella") | Corregir clave |
| C7 | Sampler | Corta tras 2 packs (40 preguntas) → un alumno ve 9 de 40 semanas al mes; sin dedup de enunciados | Cargar 4 packs y tomar ≤2 por pack; dedup por enunciado normalizado |

## P2 — deuda y UX

- Generadores con letra fija por índice (`templates[qnum % len]` en `scripts/gen_*_weekly.py`) → 646 bundles con clave idéntica; corregir antes de generar más.
- `lengua` de Colombia (3 840 preguntas) nunca se sirve: el alias `lectura_critica` gana siempre en `resolveWeekPackNames`.
- `questions_data/elsalvador/` (4000 preguntas en JSON con otro esquema) invisible para API; 17 packs con mayúscula muertos; 1962 packs alias duplicados.
- Sociales grado 8 y 10 de Colombia sin bundles.
- UX alumno (E2E): onboarding bloquea clics; overlay "Verificando integridad" ~3.9 s; toast "MODO LOCAL" tapa resultados; cabeceras de tabla partidas (`RankedLeaderboard.svelte:98-101` suma 10/12/14 columnas); errores en inglés y `alert()` en ranked (`RankedExamView.svelte:146,240`); umbrales contradictorios 60/31/"más de 30"; faltan `data-testid` en ExamView/ResultsView/RankedExamView.
- `sessionId` con `Math.random` (usar `crypto.getRandomValues`), sin límite de tamaño de `answers`, nickname sin `trim()`.

## Plan de ejecución (2 semanas)

**Ola 1 (días 1-3) — P0, sin contenido nuevo.** R2, R4 (filtro), A1, A2, A3 en un PR de API con tests; R1 + R3 + R5-UI en un PR de frontend. Criterio de salida: spec E2E 4/4 verde contra preview, API vitest verde, smoke prod.

**Ola 2 (días 3-6) — build/CI.** A5 (edge-mesh), A4 (manifest gate), A8 (E2E en preview), A6, A7, A9. Criterio: `astro check` 0 errores en CI, vitest 0 suites caídas.

**Ola 3 (días 4-10) — pool ranked limpio.** Lista de exclusión ranked (C1 W01-W21, C2 bloqueantes, C3 sin estímulo, C5 W30) aplicada en el sampler; correcciones manuales C4/C5/C6; C7 sampler. Regla `{placeholder}` bloqueante en el validador. Criterio: simulación de 5000 sesiones sin ítems excluidos ni placeholders.

**Ola 4 (días 8-14) — regeneración.** CO-MAT-11 W01-W21, CO-ING-11 W01-W10, distractores de lectura crítica; arreglar generadores. Candidato a ola Jules (revisar diffs: ~60 % de PRs Jules necesitan corrección del orquestador).
