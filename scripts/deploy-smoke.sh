#!/usr/bin/env bash
# =============================================================================
# deploy-smoke.sh — Post-deploy smoke test for WorldExams / SaberParaTodos
#
# Regla (lección 2026-08-29): el smoke test DEBE ejercitar los mismos endpoints
# y parámetros que consume el frontend, y DEBE fallar el job ante cualquier 4xx/
# payload vacío. Prohibido `|| echo "..."` (suprime exit codes → CI verde en falso).
#
# Checks:
#   1. App raíz                → 200
#   2. Worker /health          → 200  (ruta real: /health, NO /v1/health)
#   3. Grade bundle co/11      → 200 y total_questions >= 100
#   4. /v1/questions por las 5 materias ICFES G11 (params idénticos al front) → 200 y >=1 pregunta
#   5. Proxy app /api/questions (redirect al API) → 200 y >=1 pregunta
#   6. Pack estático vía /api/packs/... (proxy SSR → assets) → 200
#
# Uso:  bash scripts/deploy-smoke.sh
# Vars: APP_URL (default https://saberparatodos.space)
#       API_URL (default https://api.saberparatodos.space)
#       COUNTRY EXAM GRADE SUBJECTS (override de la matriz)
#       RETRIES (default 5) SLEEP (default 10) — tolera propagación edge
# =============================================================================
set -uo pipefail

APP_URL="${APP_URL:-https://saberparatodos.space}"
API_URL="${API_URL:-https://api.saberparatodos.space}"
COUNTRY="${COUNTRY:-co}"
EXAM="${EXAM:-icfes}"
GRADE="${GRADE:-11}"
SUBJECTS="${SUBJECTS:-matematicas lectura_critica ingles ciencias_naturales sociales_y_ciudadanas}"
RETRIES="${RETRIES:-5}"
SLEEP="${SLEEP:-10}"

FAILED=()

http_code() { curl -s -o /dev/null -w '%{http_code}' -m 20 "$1"; }

check_status() { # name url expected_regex
  local name="$1" url="$2" expected="${3:-^200$|^30[178]$}"
  local code
  code=$(http_code "$url")
  if [[ "$code" =~ $expected ]]; then
    echo "  OK   [$code] $name"
  else
    echo "  FAIL [$code] $name — $url"
    FAILED+=("$name (HTTP $code)")
  fi
}

check_json_questions() { # name url jq-field-for-count
  local name="$1" url="$2"
  local body n
  body=$(curl -sL -m 25 "$url" || true)
  n=$(printf '%s' "$body" | python3 -c 'import json,sys
try:
    d = json.load(sys.stdin)
    print(len(d.get("questions", []) or []))
except Exception:
    print(-1)' 2>/dev/null || echo -1)
  if [[ "$n" =~ ^[0-9]+$ ]] && (( n >= 1 )); then
    echo "  OK   [$n preguntas] $name"
  else
    echo "  FAIL [n=$n] $name — $url"
    FAILED+=("$name (questions=$n)")
  fi
}

check_bundle() {
  local url="$API_URL/v1/grades/${COUNTRY}/${GRADE}/bundle"
  local body total
  body=$(curl -s -m 25 "$url" || true)
  total=$(printf '%s' "$body" | python3 -c 'import json,sys
try:
    print(int(json.load(sys.stdin).get("total_questions", 0)))
except Exception:
    print(-1)' 2>/dev/null || echo -1)
  if [[ "$total" =~ ^[0-9]+$ ]] && (( total >= 100 )); then
    echo "  OK   [$total preguntas] Grade bundle ${COUNTRY}/${GRADE}"
  else
    echo "  FAIL [total=$total] Grade bundle ${COUNTRY}/${GRADE} — $url"
    FAILED+=("grade bundle (total=$total)")
  fi
}

run_round() {
  local round="$1"
  echo "── Ronda ${round}/${RETRIES} ──────────────────────────────"
  FAILED=()

  check_status "App raíz" "$APP_URL/" '^200$|^30[178]$'
  check_status "Worker health" "$API_URL/health" '^200$'
  check_bundle

  for subject in $SUBJECTS; do
    # Parámetros idénticos a los que envía el frontend (pack-fetcher.ts)
    check_json_questions "Questions ${COUNTRY}/G${GRADE}/$subject" \
      "$API_URL/v1/questions?grade=${GRADE}&page=1&country=${COUNTRY}&exam=${EXAM}&subject=${subject}"
  done

  # Mismo flujo vía el proxy SSR de la app (el front usa /api/* cuando no hay API_URL absoluta)
  check_json_questions "Proxy app /api/questions" \
    "$APP_URL/api/questions?grade=${GRADE}&page=1&country=${COUNTRY}&exam=${EXAM}&subject=lectura_critica"
  check_status "Proxy app /api/packs (asset)" \
    "$APP_URL/api/packs/${COUNTRY}-week-1-grade-${GRADE}-subject-matematicas.json" '^200$'

  if (( ${#FAILED[@]} == 0 )); then
    echo "✅ Smoke test completo: todos los checks pasaron."
    return 0
  fi
  echo "❌ ${#FAILED[@]} check(s) fallaron en esta ronda: ${FAILED[*]}"
  return 1
}

for round in $(seq 1 "$RETRIES"); do
  if run_round "$round"; then
    exit 0
  fi
  (( round < RETRIES )) && { echo "… reintentando en ${SLEEP}s (propagación edge)"; sleep "$SLEEP"; }
done

echo "🚨 SMOKE TEST FALLIDO tras ${RETRIES} rondas."
exit 1
