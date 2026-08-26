# OLA MUSE-SPARK WORLDEXAMS — Plan maestro (2026-08-25)

Ejecución local con opencode-go + `opencode-go/muse-spark-1.2-contributor`.
5 subagentes en paralelo por ola, issues con islas de archivos disjuntas.
Fallback estable: `opencode-go/deepseek-v4-flash`.

## Decisiones fijadas ANTES de lanzar (para desacoplar issues)

- **D1 — Conflicto validador vs AGENTS.md**: el validador se alinea con AGENTS.md
  (G3-G5=8q, G6-G7=10q, G8-G10=12q, G11/3EM=20q). Es la fuente que leen los
  generadores; lo contrario obligaría a regenerar miles de preguntas. WX-104
  cambia el validador + documenta; los parches de contenido usan esa regla ya.
- **D2 — Redes privadas de mesh (Xavier-first)**: verificado 2026-08-25 en
  `apps/xavier/src/mesh/`: Xavier YA tiene la base — `private_mesh.rs`
  (PrivateMeshRegistry, sync cifrado por wallet), `/v1/f12/groups` (espacios),
  `acl.rs`→`enterprise/rbac.rs` (Permission{Read,Write,Delete,Share,Manage} por
  namespace/nodo), `service_network.rs`, `iroh_transport.rs`. GAPS reales:
  (1) redes planas — falta NETWORKS de primera clase (un nodo en N redes con
  identidad/ACL por red); (2) ACL local-only — falta GRANT CRUZADO granular
  ("recurso R → red X → permiso Y → expiry Z → revocable") para compartir
  información puntual entre espacios; (3) edge-mesh TS sigue single-mesh
  (salones=namespaces) — consume la red vía Xavier, no duplica lógica.
  Se aborda en WX-205 (repo apps/xavier).
- **D3 — Social**: el módulo social NO es solo pulir/responder preguntas. Diseño de 3 capas:
  1. Discusión por pregunta (existe, Giscus + api/comments).
  2. **Explicaciones comunitarias** (nuevo): cualquier persona escribe explicaciones
     alternativas/profundas por pregunta; TODOS los nodos califican (voto firmado
     ML-DSA-65); la mejor calificada emerge como "Explicación de la comunidad".
  3. Profundización: hilos POR EXPLICACIÓN (responder/citar/ampliar), y las
     correcciones alimentan el pipeline de contenido (draft → patch exportable).
- **D4 — Leaderboard (red de NOTAS, D-103)**: WorldExams es una red propia en
  Xavier, SEPARADA de la red SWAL. El leaderboard es una **red privada de notas
  estudiantiles**. Por protección de menores la app queda EXCLUIDA de tokens
  $SWAL/karma/telemetría: al instalar la PWA y opt-in solo se comparten notas y
  promedios ANÓNIMOS con la red; nombre/puesto/métricas visibles SOLO en el
  dispositivo del propio nodo. Sin ancla de identidad en Supabase (solo
  agregados). Detalle: docs/DECISIONS_2026-08-25-REDES-XAVIER-Y-ETICA.md.
- **D5 — Gobernanza**: reglas creadas por fundadores; modificables por el
  consejo de nodos (votación firmada + op-log) → WX-206.
- **D6 — Capa económica bifurcada**: persistencia worldexams en nodos Xavier
  genera retribución $SWAL al operador nodal (storage rent, D-105). La exclusión
  BR-03 aplica SOLO al usuario final (estudiante); el operador sí cobra.

## FASE 0 — Orquestador (secuencial, sin subagentes) — ~1h

Sin esto no hay base limpia para las olas.

| # | Acción |
|---|--------|
| F0.1 | Limpiar working tree: commit o descarte de los ~10 archivos modificados sobre `content/mx-lc-11-W11-W20-bundles` |
| F0.2 | Integrar ramas locales válidas: `content/mx-lc-11-W11-W20-bundles` (20 bundles) + `content/br-mat-11-W11-W20-bundles` (10) → main |
| F0.3 | Revisar + integrar los 6 PRs abiertos (#1036 supabase-schema, #1037 AGPL, #1038 PWA, #1039 profile, #1042 camera, #1056 E2E) con validación combinada en rama temporal; cosechar delta antes de cerrar duplicados; cerrar issues wave-2 asociados (#1025-#1035) |
| F0.4 | `node scripts/generate-static-packs.js --all-weekly --changed-only` + `npm run metrics:generation` + push main |

## OLA 1 — ESTABILIZACIÓN DE CONTENIDO (5 issues, islas disjuntas)

| ID | Isla de archivos (SOLO esto) | Alcance |
|----|------------------------------|---------|
| WX-101 | `questions_data/colombia/**` | Parchear 714 contentErrors (bundle_index, calibration, dificultad en rango, conteo según D1). okPct objetivo ≥95 |
| WX-102 | `questions_data/el-salvador/**`, `questions_data/argentina/**` | 35 + 12 contentErrors |
| WX-103 | `questions_data/chile/**`, `questions_data/peru/**` | 10 + 10 contentErrors |
| WX-104 | `saberparatodos/scripts/**`, `saberparatodos/package.json` | Aplicar D1 al validador, flag subset robusto, RECREAR `npm run audit:country-readiness` (hoy no existe y el skill lo referencia) |
| WX-105 | `.gitcore/**`, `docs/SWAL/**` | Issue #993: features.json v2 honesto sincronizado con código, implementation-score recalculado (82.2% es del 28-jul), guías SWAL |

**NO tocar entre sí**: 101-103 solo `questions_data/`; 104 solo scripts; 105 solo meta/docs.

### Post-OLA-1 (orquestador)
Merge secuencial 101→105 · `npm run validate` filtrando subsets · packs + métricas
regeneradas · `bash .gitcore/scripts/verify-pipeline.sh` · push.

## OLA 2 — IA LOCAL + SOCIAL BACKEND + CORE (5 issues)

| ID | Isla | Alcance |
|----|------|---------|
| WX-201 | `src/lib/ai/pdf/**` (+dep pdf.js, transformers.js ya vía web-llm ecosystem) | Ingesta PDF 100% local: extracción texto, chunking, embeddings WebGPU, persistencia IndexedDB. El PDF nunca sale del dispositivo |
| WX-202 | `src/pages/estudio.astro`, `src/components/studio/**` | Estudio de generación: subir PDF → RAG → preguntas v5.2 reusando `exam-generator.ts` + `COUNTRY_RULE_HINTS` + `validateLocalQuestion` → editar → export `.md` con naming canónico opcional. Marca `creador: local-llm`. Nunca auto-publica |
| WX-203 | `supabase/**`, `src/pages/api/explanations.ts` | Backend capa 2 (D3): tabla `community_explanations` + votos firmados + estados draft/published/flagged + API con rate-limit y moderación existentes. SIN karma/tokens (BR-03): reputación local de la red |
| WX-204 | `src/lib/mesh/**`, `docs/SWAL/ADR-worldexams-mesh.md` | Nodo worldexams en SU PROPIA red Xavier (D-102): sync cifrado por wallet vía `/v1/f12/private-mesh/sync`; payload de notas SOLO `{node_hash, subject, week, score, avg}` (BR-04); opt-in revocable (BR-06); cero PII. Persistencia vía nodos Xavier genera retribución storage rent al operador (D-105/D6) |
| WX-205 | `~/proyectosSWAL/apps/xavier/src/mesh/**` + `src/server/f12_routes.rs` (**repo distinto**) | Redes privadas de primera clase: `MeshNetwork{id, members, acl, rules}` sobre PrivateMeshRegistry (nodo en N redes: SWAL ≠ worldexams), GRANT CRUZADO granular (recurso→red→Permission→expiry→revocación), rutas `/v1/f12/networks/*`, tests. ADR nuevo en docs/adr/ |
| WX-206 | `saberparatodos/src/lib/governance/**` | Reglas de red fundadoras versionadas+firmadas; flujo de votación del consejo de nodos con quorum (BR-05); registro en op-log. Fase 2 de D-104 |

## OLA 3 — LEADERBOARD + GOBERNANZA + UI SOCIAL (5 issues)

| ID | Isla | Alcance |
|----|------|---------|
| WX-301 | `src/pages/leaderboard.astro`, `ranking.astro`, `src/components/leaderboard/**` | Leaderboard red privada de NOTAS (D-103/D-4): posiciones anónimas globales + panel privado local con nombre/puesto/métricas del propio nodo; opt-in revocable BR-06; SIN tokens/karma (BR-03); ancla Supabase solo agregados |
| WX-302 | `src/components/social/**` | Capa 3 (D3): hilos por explicación, responder/citar/ampliar, surface de la mejor explicación calificada por nodos |
| WX-303 | `src/lib/corrections/**`, `src/pages/api/corrections.ts` | Corrección colaborativa: reporte → draft → revisión por nodos → patch `.md` exportable listo para PR al pipeline de bundles |
| WX-304 | `saberparatodos/src/lib/governance/**` | Gobernanza (D5/BR-05): reglas fundadoras versionadas+firmadas, votación del consejo de nodos con quorum, registro en op-log |
| WX-305 | `src/pages/preguntas/**` | Issue #1023: rutas jerárquicas /preguntas/ con SEO por país/asignatura/tema |

## BACKLOG OLA 4 (candidatos, nada queda sin abordar)

Blog multi-tenant (fuera gate `isCO`, changelog por país) · CORS abierto +
security-221 diferido · feat-tests 20%→90% (battery completa) ·
#1035 analytics si su PR no se integra · verificación PWA post-#1038 · cobertura
W11-W40 masiva (vía Jules con label jules+generate-questions, NO muse-spark) ·
#930 Ecuador lengua 11 (dispatch Jules en paralelo, no consume slots) ·
cron de regeneración mensual de packs+métricas.

## MECÁNICA DE EJECUCIÓN (por ola)

```bash
# 0. Pre-vuelo
opencode stats                    # cuota Console Go; si Remaining <20% espaciar o usar flash
gh label create ola-N --force     # labels ANTES de crear issues (fallan silenciosos si no existen)

# 1. Crear issues SIN dispatch, body completo → releer cada uno → corregir → entonces sí
git worktree add .wt/wx-10N -b wx/ola1-0N origin/main   # 1 worktree por subagente

# 2. Lanzar 5 en paralelo (prompt SIEMPRE posicional primero en opencode v1.18.3)
cd ~/proyectosSWAL/apps/worldexams/.wt/wx-101 && \
  timeout 1500 opencode run "$(cat ../../.gitcore/planning/ola1/prompt-101.md)" \
  --model opencode-go/muse-spark-1.2-contributor
# (×5, terminal background=true, notify_on_complete=true)

# 3. Monitoreo
tail -f ~/.local/share/opencode/log/opencode.log | grep -i "stream error"
# ≥2 errores seguidos o sesión >10min sin escribir → probe:
opencode run "Reply with exactly: PING_OK" --model opencode-go/muse-spark-1.2-contributor
# falla → matar sesión colgada y relanzar con --model opencode-go/deepseek-v4-flash

# 4. Post-batch (orquestador)
git log wx/ola1-0N --oneline      # verificar commits reales, no self-reports
npm run validate                  # filtrar subset del PR
# merge secuencial + push + verificación de efectos con gh
```

### Template de prompt por issue
1. Contexto: repo, worktree asignado, isla de archivos EXACTA
2. Estado actual MEDIBLE (números de esta auditoría)
3. Delta deseado (archivos nuevos/modificados)
4. DO NOT TOUCH (islas de los otros 4)
5. Comandos de validación con salida esperada
6. Entregable: commits en TU rama + reporte `.gitcore/planning/olaN/report-XXX.md`
7. Anti-alucinación: leer archivos antes de editar, no inventar APIs,
   `npm run validate -- --country=X` y grepear solo TU subset
8. Advertencia de coexistencia si comparten package.json (solo tocar líneas propias)

### Métrica de éxito por ola
Ola 1: contentErrors totales 783 → <30 · Ola 2: pipeline PDF→preguntas funcional
offline + red privada worldexams activa en Xavier (networks + grants testeado,
`cargo test --workspace`) + payload de notas anónimo circulando ·
Ola 3: leaderboard de notas vivo (anónimo global / privado local, BR-03/04/06) +
gobernanza con quorum + hilos por explicación.
