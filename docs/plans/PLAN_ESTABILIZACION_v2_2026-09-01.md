# Plan Estabilización v2 — WorldExams hacia estable completo
**Fecha:** 2026-09-01T14:35-05:00  
**Previo:** v1 F0-F5 commit 09ce3f69d (87.5 B+) + ports 4321/8000/8787 fc1bbdcff (hermes ok True)  
**Objetivo v2:** cerrar gaps restantes para versión estable sin inflar experimentales

## Estado v1 logrado
- validate 1531 bundles 0 failures, 76 suites 587 PASS, tsc 0, build 0, hermes verify ok True (readiness 8000)
- features 73% simple / 78% weighted (21 feats, 15 passing)
- puertos 4321/8000/8787 sin colisión (Xavier 8006, Ollama 11434 libres)

## Gaps restantes (honestos)
| ID | % | Gap real |
|----|---|----------|
| feat-weekly-packs | 96% | packs 13691 ok, pero audit legacy warn 611; necesita doc que multi-validator es canon |
| feat-multi-country | 98% | CORS ok, falta SEO multi-país + currículos MX/AR/BR parciales |
| feat-ci-cd | 85% | hermes ok, workflows disabled es correcto private era — necesita doc explícito |
| feat-security | 90% | hardening ok, history rewrite bloqueado sin coordinación BELA |
| feat-tests | 60% | 587 PASS pero sin coverage formal; meta 70% = coverage v8 report |
| feat-private-grade-network | 35% exp | shim mesh ok, falta WX-205 repo xavier externo |
| feat-anonymous-leaderboard | 30% exp | depende de anterior |
| feat-governance-council | 25% exp | shim VotingManager ok, falta ML-DSA repo xavier |
| feat-local-pdf-studio | 15% exp | stubs ok, falta PDF ingesta WX-201 |
| feat-community-explanations | 0% | sin tabla/api |
| feat-correction-pipeline | 0% | sin pipeline |

## Fases v2 (F6-F11) — profesional, verificable, KISS
**F6 — docs + score sync (gap de percepción, no código):** actualizar implementation-score.json a hermes ok True (era false por 8000), sincronizar docs/PROJECT_STATE, bump semanal-packs nota canon vs audit legacy.
**F7 — tests coverage formal:** `vitest run --coverage` con v8, report html, threshold 60% → feat-tests 60→70% (verificable `npm run test:coverage`).
**F8 — weekly-packs + multi-country cierres menores:** auditoría `generate-static-packs --check` y doc `docs/multi-country-SEO.md` stub + CORS test unitario → 96→99 y 98→99.
**F9 — local-pdf-studio ingesta MVP:** `saberparatodos/src/lib/ai/pdf-ingest.ts` (pdfjs-dist ya dep) + test con PDF sample → 15→30% (+ test coverage).
**F10 — community-explanations MVP:** `supabase/migrations/*_community_explanations.sql` + `saberparatodos/src/pages/api/explanations.ts` + componente `CommunityExplanations.svelte` + test → 0→40%.
**F11 — correction-pipeline stub:** `src/lib/corrections/` + `api/corrections.ts` draft→revisión→patch export, test → 0→25%.

**Criterio estable v2:** weighted 78→84% (+6), simple 73→80% (+7), sin inflar experimentales a 100% hasta repos externos (BR-03 respetado).

## Orden de ejecución (esta sesión)
1. F6 inmediato (score sync + docs) — 5 min
2. F7 coverage (verificable) — 15 min
3. F8 pack check — 10 min
4. Si queda contexto: F9 PDF ingesta stub — 20 min
F10/F11 en siguiente sesión (requieren supabase setup)

## Verificación por fase
Cada fase: `npm run validate` 0 failures · `npm run test:unit` 587 PASS · `npx tsc --noEmit` 0 · `hermes verify --json` ok True · `git commit` atómico
