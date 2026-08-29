#!/usr/bin/env bash
# monitor-co-g11-wave.sh — Jules wave CO G11 W02-W40 (1110 + 1113-1128)
# Uso: bash scripts/monitor-co-g11-wave.sh        (one-shot status)
#      bash scripts/monitor-co-g11-wave.sh watch   (loop cada 5m)
set -e
REPO="iberi22/worldexams"
ISSUES=(1110 1113 1114 1115 1116 1117 1118 1119 1120 1121 1122 1123 1124 1125 1126 1127 1128)
watch_mode="${1:-}"

status_once() {
  echo "=== $(date -u +%Y-%m-%dT%H:%M:%SZ) CO G11 wave (17 issues, 156 bundles + 1 code fix) ==="
  echo "Issues:"
  for n in "${ISSUES[@]}"; do
    gh issue view "$n" -R "$REPO" --json number,title,state,labels --jq '"  #\(.number) \(.state) [\(.labels|map(.name)|join(","))] \(.title)"' 2>/dev/null || echo "  #$n ERR"
  done
  echo ""
  echo "PRs (open, vinculados a esta wave):"
  gh pr list -R "$REPO" --state open --json number,title,headRefName,state --jq '.[] | select(.headRefName | test("1110|matematicas|ciencias-naturales|lectura-critica|sociales-ciudadanas")) | "  PR #\(.number) [\(.state)] \(.headRefName) — \(.title)"' 2>/dev/null || echo "  (none yet)"
  echo ""
  echo "PRs merged recientemente (esta wave):"
  gh pr list -R "$REPO" --state merged --json number,title,headRefName,mergedAt --jq '.[] | select(.headRefName | test("1110|matematicas|ciencias-naturales|lectura-critica|sociales-ciudadanas")) | "  PR #\(.number) merged \(.mergedAt) \(.headRefName)"' 2>/dev/null | head -20
  echo ""
  # Conteos locales post-merge
  echo "Local content (post-merge verification, run after each batch merge):"
  echo -n "  CO bundles totales: "; find questions_data/colombia -name '*.md' 2>/dev/null | wc -l | tr -d ' '
  echo -n "  CO G11 matematicas W02-W40: "; find questions_data/colombia/matematicas/grado-11 -path '*weekly*W0[2-9]*.md' -o -path '*weekly*W[1-4][0-9].md' 2>/dev/null | grep -vc '/W01-' || echo 0
  echo "  Validate CO: (run: npm run validate -- --only questions_data/colombia 2>&1 | tail -5)"
  echo "  Packs: (run: node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only && npm run audit:country-readiness)"
  echo ""
  echo "Merge order recomendado (sin conflictos, file islands verificadas):"
  echo "  1) #1110 CODE fix (worker+orchestrator+UX) — independiente, merge primero si CI pasa (valida period param)"
  echo "  2) 16 content PRs 1113-1128 en cualquier orden (disjuntos por W + asignatura)"
  echo "  3) Tras cada batch merge: generate-static-packs + validate + audit:country-readiness"
  echo "  4) Smoke: bash scripts/deploy-smoke.sh + period probe una vez haya 1 pack P4 por materia"
  echo "  5) Cierre: npm run validate 0 errores, CO 558 bundles (402+156), deploy-production.yml verde"
}

if [ "$watch_mode" = "watch" ]; then
  while true; do status_once; echo "--- sleep 300s ---"; sleep 300; done
else
  status_once
fi
