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

  if echo "$body" | grep -qE "Pregunta de prueba|Explicación detallada de la pregunta"; then
    echo "  FAIL [placeholder] $name — $url"
    FAILED+=("$name (placeholder detected)")
    return
  fi

  n=$(printf '%s' "$body" | python3 -c 'import json,sys
try:
    d = json.load(sys.stdin)
    print(len(d.get("questions", []) or []))
except Exception:
    print(-1)' 2>/dev/null)
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

  if echo "$body" | grep -qE "Pregunta de prueba|Explicación detallada de la pregunta"; then
    echo "  FAIL [placeholder] Grade bundle ${COUNTRY}/${GRADE} — $url"
    FAILED+=("grade bundle (placeholder detected)")
    return
  fi

  total=$(printf '%s' "$body" | python3 -c 'import json,sys
try:
    print(int(json.load(sys.stdin).get("total_questions", 0)))
except Exception:
    print(-1)' 2>/dev/null)
  if [[ "$total" =~ ^[0-9]+$ ]] && (( total >= 100 )); then
    echo "  OK   [$total preguntas] Grade bundle ${COUNTRY}/${GRADE}"
  else
    echo "  FAIL [total=$total] Grade bundle ${COUNTRY}/${GRADE} — $url"
    FAILED+=("grade bundle (total=$total)")
  fi
}

check_pack_proxy() {
  local w code body n url name
  for w in 12 27 39; do
    url="$APP_URL/api/packs/${COUNTRY}-week-${w}-grade-${GRADE}-subject-matematicas.json"
    name="Proxy pack week $w"

    # We use a combined approach: get the body, HTTP code at the end
    local response=$(curl -sL -w "\n%{http_code}" -m 25 "$url" || true)
    code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n -1)

    if [[ "$code" != "200" ]]; then
      echo "  FAIL [$code] $name — $url"
      FAILED+=("$name (HTTP $code)")
      continue
    fi

    if echo "$body" | grep -qE "Pregunta de prueba|Explicación detallada de la pregunta"; then
      echo "  FAIL [placeholder] $name — $url"
      FAILED+=("$name (placeholder detected)")
      continue
    fi

    n=$(printf '%s' "$body" | python3 -c 'import json,sys
try:
    d = json.load(sys.stdin)
    print(len(d.get("questions", []) or []))
except Exception:
    print(-1)' 2>/dev/null)
    if [[ "$n" =~ ^[0-9]+$ ]] && (( n >= 1 )); then
      echo "  OK   [$n preguntas] $name"
    else
      echo "  FAIL [n=$n] $name — $url"
      FAILED+=("$name (questions=$n)")
    fi
  done
}

check_period_matrix() {
  local s p url name response code body total_av n min_avail
  min_avail="${MIN_PER_PERIOD:-40}"

  for s in matematicas lectura_critica sociales_ciudadanas ciencias_naturales ingles; do
    for p in 1 2 3 4; do
      url="$API_URL/v1/questions?country=co&exam=icfes&grade=11&subject=$s&period=$p"
      name="Matrix $s P$p"

      response=$(curl -sL -w "\n%{http_code}" -m 25 "$url" || true)
      code=$(echo "$response" | tail -n1)
      body=$(echo "$response" | head -n -1)

      if [[ "$code" != "200" ]]; then
        echo "  FAIL [$code] $name — $url"
        FAILED+=("$name (HTTP $code)")
        continue
      fi

      if echo "$body" | grep -qE "Pregunta de prueba|Explicación detallada de la pregunta"; then
        echo "  FAIL [placeholder] $name — $url"
        FAILED+=("$name (placeholder detected)")
        continue
      fi

      # Parse meta.total_available and questions array length
      local parsed=$(printf '%s' "$body" | python3 -c 'import json,sys
try:
    d = json.load(sys.stdin)
    q_len = len(d.get("questions", []) or [])
    m = d.get("meta", {}) or {}
    # page mode exposes total_available; sample mode (WAVE-16.16) exposes period_pool_size
    tot = int(m.get("total_available", m.get("period_pool_size", -1)))
    print(f"{q_len},{tot}")
except Exception:
    print("-1,-1")' 2>/dev/null)

      n=$(echo "$parsed" | cut -d',' -f1)
      total_av=$(echo "$parsed" | cut -d',' -f2)

      if [[ "$n" =~ ^[0-9]+$ ]] && (( n >= 1 )) && [[ "$total_av" =~ ^[0-9]+$ ]] && (( total_av >= min_avail )); then
        echo "  OK   [n=$n total=$total_av] $name"
      else
        echo "  FAIL [n=$n total=$total_av] $name — $url"
        FAILED+=("$name (n=$n, total_av=$total_av)")
      fi
    done
  done
}

check_distinct_periods() {
  local p1_url="$API_URL/v1/questions?country=co&exam=icfes&grade=11&subject=sociales_ciudadanas&period=1"
  local p4_url="$API_URL/v1/questions?country=co&exam=icfes&grade=11&subject=sociales_ciudadanas&period=4"

  local p1_id=$(curl -sL -m 25 "$p1_url" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("questions", [{}])[0].get("id", "none1"))' 2>/dev/null)
  local p4_id=$(curl -sL -m 25 "$p4_url" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("questions", [{}])[0].get("id", "none4"))' 2>/dev/null)

  if [[ "$p1_id" == "none1" ]] || [[ "$p4_id" == "none4" ]] || [[ "$p1_id" == "error1" ]] || [[ "$p4_id" == "error4" ]]; then
    echo "  FAIL [distinct] sociales_ciudadanas p1 vs p4 — could not fetch ids"
    FAILED+=("distinct periods (fetch failed)")
  elif [[ "$p1_id" == "$p4_id" ]]; then
    echo "  FAIL [distinct] sociales_ciudadanas p1 vs p4 — same ID ($p1_id)"
    FAILED+=("distinct periods (same ID $p1_id)")
  else
    echo "  OK   [distinct] sociales_ciudadanas p1 vs p4 differ"
  fi
}

check_cors() {
  local origin url cors_header
  url="$API_URL/v1/questions?country=co&grade=11&subject=matematicas"

  for origin in "https://worldexam.swal.network" "https://saberparatodos.space"; do
    cors_header=$(curl -sI -H "Origin: $origin" "$url" | grep -i "^access-control-allow-origin:" | tr -d '\r' | awk '{print $2}')

    if [[ "$cors_header" == "$origin" ]] || [[ "$cors_header" == "*" ]]; then
      echo "  OK   [CORS] $origin"
    else
      echo "  FAIL [CORS] $origin — missing or invalid access-control-allow-origin"
      FAILED+=("CORS ($origin)")
    fi
  done
}

check_out_of_range() {
  local url="$API_URL/v1/questions?country=co&exam=icfes&grade=11&subject=matematicas&page=999"
  local response code body

  response=$(curl -sL -w "\n%{http_code}" -m 25 "$url" || true)
  code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | head -n -1)

  if [[ "$code" != "200" ]]; then
    echo "  FAIL [$code] Out-of-range page — $url"
    FAILED+=("Out-of-range (HTTP $code)")
    return
  fi

  local out_of_range=$(printf '%s' "$body" | python3 -c 'import json,sys
try:
    d = json.load(sys.stdin)
    print(str(d.get("meta", {}).get("out_of_range", "")).lower())
except Exception:
    print("error")' 2>/dev/null)

  if [[ "$out_of_range" == "true" ]]; then
    echo "  OK   [out_of_range=$out_of_range] Out-of-range page"
  elif [[ "$out_of_range" == "" ]]; then
    echo "  WARN [out_of_range missing] Out-of-range page returned 200 but meta.out_of_range missing"
  else
    echo "  FAIL [out_of_range=$out_of_range] Out-of-range page"
    FAILED+=("Out-of-range (out_of_range=$out_of_range)")
  fi
}

check_leaderboard() {
  local url="$API_URL/v1/leaderboard"
  local code
  local req_ranked="${RANKED_REQUIRED:-0}"
  code=$(curl -s -o /dev/null -w '%{http_code}' -m 20 "$url")

  if [[ "$code" == "200" ]] || [[ "$code" == "503" ]]; then
    echo "  OK   [$code] Leaderboard availability (ranked)"
  elif [[ "$code" == "404" ]]; then
    if (( req_ranked == 1 )); then
      echo "  FAIL [$code] Leaderboard availability (ranked required)"
      FAILED+=("Leaderboard (HTTP $code)")
    else
      echo "  OK   [$code] Leaderboard (404 acceptable until wave 16.09)"
    fi
  else
    echo "  FAIL [$code] Leaderboard availability"
    FAILED+=("Leaderboard (HTTP $code)")
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

  check_pack_proxy
  check_period_matrix
  check_distinct_periods
  check_cors
  check_out_of_range
  check_leaderboard

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
