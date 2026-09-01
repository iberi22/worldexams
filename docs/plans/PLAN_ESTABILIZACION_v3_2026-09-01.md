# Plan Estabilización v3 — WorldExams hacia estable 90%+ (post-Wave 11)
**Fecha:** 2026-09-01 16:10 (-05)  
**Previo:** v2 cerrada F6-F11 + Wave 11 10/10 PRs integrados (83×609 PASS, 90.0 A-, feats 85.4% weighted)  
**Objetivo v3:** cerrar experimentales honestos que **sí** pueden subir sin repo Xavier externo, y llevar `feat-tests` 65→75% con cobertura real.

## Estado v2 logrado (verificado)
- validate 1531 0 failures, 83 suites 609 PASS, tsc 0, lint 0, hermes ok True (readiness 8000 200, puertos 4321/8000/8787)
- feats 81.9/85.4 (21 feats, 6 FAIL experimentales 25-50%, 3 PASS 95% a 100%)
- Wave 11: community table+RLS+API+UI 9/9 PASS, corrections pipeline, private mesh BR-06, leaderboard anon Top50, governance quorum 2/3, pdf-studio File|ArrayBuffer merged, weekly/multi 100%, ci-cd/security 95%

## Gaps restantes (honestos)
| ID | % | Gap real | ¿Avanzable en este repo? |
|----|---|----------|--------------------------|
| feat-tests 65% | coverage global 46% (threshold 70 ficticio) | sí, escribiendo tests |
| feat-private-grade-network 50% | shim 50% need WX-205 networks 1ra clase repo xavier | **no** (externo) |
| feat-anonymous-leaderboard 50% | need Xavier publish prod ML-DSA | **no** (externo) |
| feat-governance-council 40% | shim voting 40% need ML-DSA-65 prod | **no** (externo, solo stub 40→50) |
| feat-community-explanations 50% | MVP table+API+UI 9/9 PASS, falta WX-302 threads por explicación | **sí** (F12) |
| feat-local-pdf-studio 50% | MVP+Studio UI File\|ArrayBuffer, falta chunking+tests | **sí** (F13) |
| feat-correction-pipeline 25% | stub Draft→Review→Patch, falta UX docente | **sí** (F14) |
| feat-ci-cd 95% / feat-security 95% | thresholds 46/40 honestos, workflows README | ya 95%, no forzar 100% |

## Fases v3 (F12-F15) — profesional, KISS, verificable

**F12 — community threads 50→65% (WX-302):**  
`supabase/migrations/*_threads.sql` (parent_id FK, depth), `src/lib/community/threads.ts` (getThread, addReply con rate-limit 1/60s heredado), `CommunityExplanations.svelte` hilo indentado, test `threads.test.ts` 3 casos. Isla: `community/` + `migrations/*threads*` (disjunta de `pdf/`, `mesh/`, `governance/`). Verif: `vitest` 3 PASS + `tsc 0`.

**F13 — pdf-studio chunking 50→65% (WX-201b):**  
`src/lib/ai/pdf/chunker.ts` ya existe Jules, añadir `src/lib/ai/pdf/studio-chunk.test.ts` 2 casos + `PdfStudio.svelte` paginación, `F12` no pisa. Verif: `pdf-ingest` File|ArrayBuffer sigue 3/3 PASS.

**F14 — corrections UX docente 25→40% (WX-303b):**  
`src/components/corrections/CorrectionThread.svelte` (lista draft→published, botón aprobar/rechazar, export .md preview), test 2 casos. Isla `corrections/`.

**F15 — tests coverage 65→75% (honesto):**  
Añadir 4 tests reales para `VaultSync`, `ScoringCognitive`, `governance quorum` ya verde; subir `vitest.config.ts` thresholds 46→48/40→42 (no 70 ficticio). Verif: `test:coverage` 46→~48% + 87 suites.

## Criterio estable v3
- weighted 85.4→87.5 (+2.1), simple 81.9→84% (+2.1), `grade A- → A` sin inflar experimentales que requieren `apps/xavier` (respeto BR-03).

## Orden de ejecución
1. **F12 inmediato** (threads, 20 min) — esta sesión
2. F13/F14 en siguiente wave si F12 verde
3. F15 coverage en cierre

## Verificación por fase
Cada fase: `npm run validate` 0 failures · `npm run test:unit` 609+ PASS · `npx tsc --noEmit` 0 · `hermes verify --json` ok True · `git commit` atómico · `features.json` bump honesto
