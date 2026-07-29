# SECURITY #221 — Preparación (ejecución diferida)

> Decisión del usuario (2026-07-28): **diferir ejecución**; documentar y preparar aquí,
> ejecutar al final del programa end-to-end con ventana de coordinación.

## Alcance

Issue #221: secretos expuestos en el historial git (Supabase service role, JWTs, API keys).
Riesgo: cualquier clone del repo (incluso privado) expone credenciales vivas.

## Estado del escaneo (2026-07-28)

- Historia: 514 commits (`git rev-list --all`).
- Escaneo ligero (últimos 20 commits, patrones sk-*/JWT/AKIA/ghp_/PRIVATE KEY/SUPABASE_SERVICE_ROLE):
  archivos sospechosos incluyen `apps/worldexams-api/wrangler.toml`, `docs/API_REAL_SETUP.md`,
  `.gitcore/planning/ISSUE_196_*`, workflows y prompts con tokens de ejemplo.
- `gitleaks`/`trufflehog` NO instalados en el entorno — requeridos para el escaneo completo.

## Plan de ejecución (ventana coordinada)

1. **Rotar primero** — invalidar TODAS las credenciales expuestas en Supabase/GitHub/HF/otros
   proveedores. Sin rotación, la reescritura de historia es cosmética.
2. **Escaneo completo** — `gitleaks detect --source . --report-path gitleaks-report.json`
   sobre toda la historia; clasificar hallazgos (vivos vs ejemplo/docs).
3. **Reescritura** — `git filter-repo` (recomendado sobre BFG para repos con submodules/LFS):
   - `git filter-repo --replace-text replacements.txt` con cada secreto vivo → `***REMOVED***`
   - o `--invert-paths --path <archivo>` para archivos que nunca debieron existir (.env reales).
4. **Verificación** — re-ejecutar gitleaks sobre la historia reescrita (0 hallazgos vivos).
5. **Force-push coordinado** — `git push --force-with-lease` en ventana acordada; todos los
   clones locales deben re-clonar o `git fetch + reset`. **Nunca sin confirmación del dueño.**
6. **Post** — actualizar `features.json` (feat-security → 100%), cerrar #221.

## Prerequisitos antes de ejecutar

- [ ] Credenciales rotadas (lista en issue #221).
- [ ] gitleaks instalado.
- [ ] Working tree limpio: la estrategia de commits del WIP actual (663 archivos) debe
      completarse ANTES (ver GIT_SYNC_STATUS.md) — la reescritura con árbol sucio es riesgosa.
- [ ] Backup: `git clone --mirror` fuera del workspace.

## Estrategia de git sync (WIP actual)

Árbol con 663 archivos modificados/nuevos tras el programa mesh-first + AI Core + end-to-end.
Agrupación sugerida de commits (en orden, cada uno verde):

1. `chore(infra)`: pnpm reinstall, playwright config Linux, package.json refs .ps1 muertas.
2. `feat(edge-mesh)`: SalonRegistry + discover awaitable + remote join + ai-core completo.
3. `feat(saberparatodos)`: mesh-first salones, authPersistence, AI adapters + UI, install prompt, pro-node, xavier-client.
4. `fix(api)`: CORS whitelist + country prefix map en packs.
5. `chore(content)`: limpieza dummies CR + regeneración de packs + audit alignment.
6. `docs(gitcore)`: features.json v3.0, SRS baseline, ROADMAP/TASK/MEMORY sync, DECISION notes.

Nada de esto se commitea sin instrucción explícita del usuario.
