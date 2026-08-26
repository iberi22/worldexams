# SWAL — Estado del proyecto y cómo auditarlo

**Proyecto:** WorldExams (nodo SWAL activo)  
**Última auditoría honesta:** 2026-08-26 — WX-105 (#993) — features.json v2 + implementation-score 77.7%  
**Protocolo:** GitCore 3.8 · MASTERY v5.2 · Nodo Pro = SWAL node (no Stripe)

> Esta guía es la referencia corta para cualquier agente o humano que quiera verificar el estado real del proyecto sin inflar números.

---

## 1. Mapa rápido SWAL

| Doc canónico | Ubicación |
|---|---|
| Goal unificado | `.gitcore/docs/SWAL_GOAL.md` → copia operativa de `docs/SWAL/GOAL.md` (monorepo) |
| Goal canónico extendido | `.gitcore/docs/SWAL_GOAL_CANONICAL.md` |
| Reglas private era | `.gitcore/docs/SWAL_PRIVATE_ERA.md` |
| AI Core on-device | `.gitcore/docs/SWAL_AI_CORE.md` |
| Decisiones éticas/redes | `docs/DECISIONS_2026-08-25-REDES-XAVIER-Y-ETICA.md` (D-101..D-105) |
| Orden de lectura agente | 1. `AGENTS.md` → 2. `docs/SWAL/README.md` (este) → 3. `.gitcore/ARCHITECTURE.md` → 4. `docs/SRS/` → 5. `.gitcore/features.json` |

Pro = nodo SWAL activo (`saberparatodos/src/lib/swal-pro-heartbeat.ts` + `swal-instance-id.ts`) · Xavier `app/worldexams/instance/{id}` · mesh `swal/worldexams/{id}` · sin Stripe.

---

## 2. Estado honesto actual (2026-08-26)

**features.json v2:** 14 features · 48% simple (672/14) · 54.5% ponderado (P0*3 P1*2 P2*1) · 7 passing / 7 failing

| Feature | P | % | Evidencia (ls) |
|---|---|---|---|
| feat-mastery-colombia | P0 | 100 | `questions_data/colombia/` 402 files 4540q 227% KPI |
| feat-mastery-uruguay | P0 | 100 | `questions_data/uruguay/` 40 bundles 800q (40% KPI) |
| feat-mastery-paraguay | P0 | 100 | `questions_data/paraguay/` 40 bundles 800q (40% KPI) |
| feat-weekly-packs | P0 | 92 | 1373 validados 1 fallo; 23808q publicados; MX/BR 200q pending |
| feat-multi-country | P0 | 98 | `apps/worldexams-api/src/index.ts` CORS restringido, 20 países |
| feat-ci-cd | P0 | 72 | `tests/`, `.husky/` 48 E2E declarados no verdes (SRC NEEDS MAINTENANCE) |
| feat-security | P1 | 90 | PRs #961 #964, `scripts/validate-secrets.sh` OK, history rewrite pendiente |
| feat-tests | P1 | 20 | `saberparatodos/tests/unit/` stubs, Issue #408 |
| feat-private-grade-network | P0 | 0 | planned WX-205+WX-204 (base en `apps/xavier/src/mesh/`) |
| feat-anonymous-leaderboard | P0 | 0 | planned WX-301 |
| feat-governance-council | P1 | 0 | planned WX-206/304 |
| feat-community-explanations | P1 | 0 | planned WX-203/302 |
| feat-local-pdf-studio | P1 | 0 | stubs `ai-core-client.ts` + `exam-generator.ts` pero sin PDF |
| feat-correction-pipeline | P2 | 0 | planned WX-303 |

**implementation-score:** 77.7% (weighted) / 75.4% (simple) — baja honesta desde 82.2% del 28-jul por 6 features planned D-101..D-105 + 4 correcciones de inflados.

Fórmula GitCore: `0.2*protocol(95) +0.15*src(90) +0.2*srs(88) +0.35*features(54.5) +0.1*swal(85) =77.7` — ver `.gitcore/implementation-score.json`.

**Country readiness:** 3/20 ready (CO 227% SV 115% CL 100%) — 23808q publicadas, gap 19032 (ver `npm run audit:country-readiness`).

---

## 3. Cómo auditar (comandos canónicos)

No afirmes estado sin correr estos 3. Todos son locales, sin Stripe, sin telemetría.

### 3.1 Validar bundles v5.2

```bash
npm run validate
# OK esperado: Validated 1373 bundle file(s). Failures: 1
# El fallo actual es CO-MAT-11-W01 Missing YAML frontmatter (único bloqueador para 100%)
npm run validate -- questions_data/colombia/lengua/grado-7/2026/weekly/CO-LEN-7-2026-W14-subordinacion-001-MASTERY-bundle.md
```

Reglas que valida: `bundle_index` obligatorio, `calibration` obligatorio, dificultad en rango `[D3-D4]..[D9-D10]`, conteo preguntas por grado (G3-5=8, G6-7=10, G8-10=12, G11/3EM=20), frontmatter exacto protocolo 5.2.

### 3.2 Country readiness KPI (2000q por país)

```bash
npm run audit:country-readiness
npm run audit:country-readiness -- --json | head -n 60
npm run audit:country-readiness -- --smoke-public   # si packs publicados en CDN
```

Estados: `published_validated` (cuenta para KPI) vs `validated_not_published` (falta `saberparatodos/scripts/generate-static-packs.js --all-weekly`) vs `legacy_or_invalid` (reparar). KPI = bundles en `questions_data/{country}/.../2026/weekly/` + validados + publicados con prefijo país (`co-`, `mx-`...).

### 3.3 Feature verify + implementation-score

```bash
bash .gitcore/scripts/verify-pipeline.sh
# OK esperado: 14/14 PASS (implemented_in existe en disco)
bash .gitcore/scripts/verify-pipeline.sh --json

cat .gitcore/features.json | python3 -c "import json; d=json.load(open('.gitcore/features.json')); print(d['metadata']['overall_progress_pct'], d['metadata']['overall_progress_weighted_pct'])"
cat .gitcore/implementation-score.json | python3 -c "import json, pprint; pprint.pprint(json.load(open('.gitcore/implementation-score.json'))['breakdown'])"
```

### 3.4 Checks adicionales

```bash
npm test                          # validate-secrets.sh (no secretos en stage)
grep -n "ALLOWED_ORIGINS" apps/worldexams-api/src/index.ts  # CORS restringido, no *
grep -r "swal-credits\|telemetry" saberparatodos/src --include="*.ts" | wc -l  # debe ser 0 en flujos examen (BR-03)
ls docs/SRS/                      # 7 archivos SRS (REQUIREMENTS, ARCHITECTURE, DATABASE, INTERFACES, NON-FUNCTIONAL, GLOSSARY, index)
```

---

## 4. Cómo leer features.json (v2 honesto)

- `metadata.overall_progress_pct` = promedio simple (48%). `overall_progress_weighted_pct` = ponderado P0*3 P1*2 P2*1 (54.5%) — el implementation-score usa el ponderado.
- Cada feature: `progress_pct` honesto con `evidence` (ruta `implemented_in` verificable con `ls`), `caveat` si MVP parcial, `priority` para peso.
- `passes: true/false` indica si el validador del feature pasa, no si es 100%.
- `implemented_in` vacío = planned (0%) — sin código en este repo, diseño en `docs/DECISIONS_*.md` + `docs/SRS/`.
- `verification_commands` lista los comandos para re-auditar.

Regla de oro WX-105: no inflar — si `implemented_in` no existe en `ls`, bajar % y dejar caveat. 6 features D-101..D-105 están en 0% honesto hasta WX-204..WX-301.

---

## 5. Publicación de packs (bundle .md → JSON API)

Un `.md` validado no se publica solo. Pipeline:

```bash
cd saberparatodos
node scripts/generate-static-packs.js --all-weekly --changed-only
# genera apps/worldexams-api/public/v1/packs/co-week-*.json etc.
curl https://api.saberparatodos.space/v1/packs/co-week-1-grade-7-subject-lengua.json
curl "https://api.saberparatodos.space/v1/questions?country=co&grade=7&subject=lengua"
```

No editar `.json` a mano — corregir el `.md`, validar, regenerar.

---

## 6. Decisiones D-101..D-105 (resumen ético)

Ver `docs/DECISIONS_2026-08-25-REDES-XAVIER-Y-ETICA.md`:

- **D-101** Multi-red Xavier nativa, **D-102** Red WorldExams separada de SWAL, **D-103** Ética menor: sin tokens/karma/telemetría, leaderboard anónimo opt-in, **D-104** Implicaciones sync cifrado payload mínimo, **D-105** Economía bifurcada: operador Xavier cobra storage rent, estudiante no.
- SRS REQ-008..013 trazan estas decisiones; features planned las implementan en WX-204..WX-303.

---

## 7. Checklist antes de PR

- [ ] `npm run validate` sin nuevos fallos (solo el CO-MAT-11-W01 conocido)
- [ ] `npm run audit:country-readiness` revisado (no romper ready counts)
- [ ] `bash .gitcore/scripts/verify-pipeline.sh` 14/14 PASS
- [ ] `features.json` y `implementation-score.json` sincronizados si tocaste features
- [ ] No tocar `questions_data/` si tu isla es `.gitcore/docs/SWAL` (WX-105)

*Generado WX-105 — isla solo `.gitcore/**` y `docs/SWAL/**` — no toca código app ni questions_data.*
