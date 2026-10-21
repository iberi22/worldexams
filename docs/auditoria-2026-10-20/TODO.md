# TODO — Sprint de estabilidad 2026-10-20

Plan: [SPRINT_ESTABILIDAD.md](SPRINT_ESTABILIDAD.md). Ejecutores: pi experts free (`opencode-go/*-free`), revisión deepseek-v4.1-flash-free (opencode), verificación Haiku 5.5 + orquestador.
Regla: PRs listos para merge; **merge solo con OK explícito del owner**.

## Ola A — paralelo (islas disjuntas)

| ID | Rama / worktree | Alcance | Ejecutor | Estado |
|---|---|---|---|---|
| W1a | `fix/ranked-api-hardening` | R2 feedback leak, R4 filtro placeholders, A3 pool mínimo, sessionId crypto, cap answers, nickname trim (`ranked.ts`) | pi longcat | ✅ commit c9af0e8 (revisado) |
| W2 | `fix/ranking-ui-legacy` | R1 quitar ranking legacy, cabeceras de tabla, reintento; spec E2E alumno | pi beam | ✅ commit 3ade28e (revisado, fix onclick) |
| W3 | `fix/ranked-exam-client` | R5 tiempo por pregunta acumulado, mensajes flagged/no elegible, errores en español, testids | pi minimax (longcat 429) | ⏳ |
| W4 | `fix/score-submit-privacy` | R3 gate opt-in + elegibilidad en envío de puntaje | pi beam | ✅ commit 34d48ce (revisado) |
| W5 | ~~`fix/edge-mesh-resolution`~~ | A5: NO es bug del repo — `node_modules` local desfasado (pnpm). Con `npm ci` limpio: 169/169 suites, 1251 tests, astro check 0 errores. Cambio descartado (habría cambiado el runtime de prod al vendor) | — | ❌ descartado |
| W6 | `fix/content-placeholders` | R4 regla validador `unresolved-placeholder` + 317 `{city}` y 25 `{alignment}` resueltos | pi cat-jam | ✅ commit 675a3b2; test W6b en curso |
| W7 | `fix/content-factual-keys` | C4/C5/C6 + correcciones del revisor (firma Cartagena 26-sep, 450.000 homicidios CEV) | pi minimax + deepseek review | ✅ commit c2c23b2 |
| W8 | `ci/stability-gates` | A4 manifest bloqueante, astro check bloqueante, A8 E2E en preview, A9 ledger | pi cat-jam | ✅ commit f1a84b5 (revisado, 3 fixes) |
| W9 | `feat/ranked-exclusions-data` | Exclusiones ranked: MAT 420, ING 351, LC 93, CN 20 | pi beam (longcat 429) | ✅ commit 6bf62ea |

## Ola B — secuencial sobre W1a

| ID | Alcance | Estado |
|---|---|---|
| W1b | A1 submit atómico, A2 TTL 60+2 min, A6 season Bogotá, R5 regla servidor, A7 límite IP | ⏳ |
| W1c | C7 sampler (4 packs, ≤2 por pack, dedup enunciados) + cablear exclusiones W9 | ⏳ |
| W10 | `content/regen-packs`: packs regenerados (50) + manifest (+164) + **sync de 1751 packs alias desfasados** (10394 preguntas con otra respuesta bajo el mismo id; verificado contra la fuente) + check CI | ✅ e190559, 511ab01 (Haiku + orquestador) |
| W1c-pre | Regenerar `ranked-exclusions.ts` tras W10 (los packs cambiaron) | ⏳ |

## Ola C

| ID | Rama | Alcance | Ejecutor | Estado |
|---|---|---|---|---|
| W11 | `fix/generators-answer-position` | letra correcta determinista y balanceada en generadores | pi beam | ⏳ |
| W12 | `fix/student-ux-polish` | toast MODO LOCAL, overlay integridad ≤1.2 s, testids | pi cat-jam | ⏳ |

## Pendiente

- [ ] Generadores con letra fija por índice (`scripts/gen_*_weekly.py`)
- [ ] Regenerar CO-MAT-11 W01–W21, CO-ING-11 W01–W10, distractores LC (ola Jules)
- [ ] Revisar intento `flagged` de octubre en D1 con la regla nueva (escritura en prod)
- [ ] UX: onboarding, overlay integridad, toast MODO LOCAL, testids ExamView/ResultsView
