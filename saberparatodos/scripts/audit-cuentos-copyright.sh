#!/usr/bin/env bash
# Audit script for Cuentos Copyright & License compliance (C1.06)
# Checks 100% of questions_data/cuentos/ files and public packs if present.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$WORKSPACE_ROOT/.." && pwd)"

# Overridable content and pack directories for testing
CUENTOS_DIR="${CUENTOS_DIR:-$REPO_ROOT/questions_data/cuentos}"
PACKS_DIR="${PACKS_DIR:-$WORKSPACE_ROOT/public/v1/cuentos}"

JSON_OUTPUT=false
for arg in "$@"; do
  if [ "$arg" = "--json" ]; then
    JSON_OUTPUT=true
  fi
done

EXPECTED_MD_HEADER="<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. Lectura gratuita, prohibida su reproducción. -->"
EXPECTED_SVG_HEADER="<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->"

# Data structures for tracking audit results
PASSED_COUNT=0
FAILED_COUNT=0
PACK_SKIPPED=false

# JSON arrays built dynamically
JSON_FILES_JSON="[]"

# Helper to append JSON element to an array
add_json_file_result() {
  local rel_path="$1"
  local status="$2" # "PASS" or "FAIL"
  local checks_json="$3" # JSON array of check objects

  # Escape rel_path for JSON safety
  local escaped_path
  escaped_path=$(echo "$rel_path" | sed 's/"/\\"/g')

  local file_obj="{\"file\":\"$escaped_path\",\"status\":\"$status\",\"checks\":$checks_json}"

  if [ "$JSON_FILES_JSON" = "[]" ]; then
    JSON_FILES_JSON="[$file_obj]"
  else
    JSON_FILES_JSON="${JSON_FILES_JSON%]},$file_obj]"
  fi
}

FAILED_FILES_LIST=""

if [ ! -d "$CUENTOS_DIR" ]; then
  if [ "$JSON_OUTPUT" = true ]; then
    echo "{\"pass\":0,\"fail\":1,\"packs_skipped\":true,\"files\":[],\"error\":\"CUENTOS_DIR not found: $CUENTOS_DIR\"}"
  else
    echo "ERROR: Directorio de cuentos no encontrado: $CUENTOS_DIR"
  fi
  exit 1
fi

# Find all relevant files in CUENTOS_DIR (.md and .svg)
SCANNED_FILES=()
while IFS= read -r file; do
  [ -n "$file" ] && SCANNED_FILES+=("$file")
done < <(find "$CUENTOS_DIR" -type f \( -name "*.md" -o -name "*.svg" \) | sort)

for file_path in "${SCANNED_FILES[@]}"; do
  # Get path relative to REPO_ROOT if possible
  rel_file_path="${file_path#$REPO_ROOT/}"
  file_name="$(basename "$file_path")"

  file_pass=true
  checks_json="[]"

  add_check() {
    local rule_id="$1"
    local check_status="$2" # "PASS" or "FAIL"
    local msg="$3"

    local escaped_msg
    escaped_msg=$(echo "$msg" | sed 's/"/\\"/g')
    local check_obj="{\"rule\":\"$rule_id\",\"status\":\"$check_status\",\"message\":\"$escaped_msg\"}"

    if [ "$checks_json" = "[]" ]; then
      checks_json="[$check_obj]"
    else
      checks_json="${checks_json%]},$check_obj]"
    fi

    if [ "$check_status" = "FAIL" ]; then
      file_pass=false
    fi
  }

  # 1. Header check (Line 1)
  line1="$(head -n 1 "$file_path" | tr -d '\r')"

  if [ "$file_name" = "LICENSE-CONTENT.md" ]; then
    # LICENSE-CONTENT.md has its own header check
    if grep -q "Licencia de contenido — Cuentos SaberParaTodos" "$file_path"; then
      add_check "CUENTO-E-LICENSE-DOC" "PASS" "Documento de licencia valido"
    else
      add_check "CUENTO-E-LICENSE-DOC" "FAIL" "Documento LICENSE-CONTENT.md no tiene titulo esperado"
    fi
  elif [[ "$file_path" == *.md ]]; then
    if [ "$line1" = "$EXPECTED_MD_HEADER" ]; then
      add_check "CUENTO-E-HEADER" "PASS" "Encabezado de copyright HTML correcto en linea 1"
    else
      add_check "CUENTO-E-HEADER" "FAIL" "Encabezado de copyright HTML faltante o invalido en linea 1"
    fi

    # Frontmatter license and version check
    if grep -q '^license: *"PROPRIETARY-FREE-READ"' "$file_path"; then
      add_check "CUENTO-E-FRONTMATTER-LICENSE" "PASS" "Campo license: 'PROPRIETARY-FREE-READ' presente en frontmatter"
    else
      add_check "CUENTO-E-FRONTMATTER-LICENSE" "FAIL" "Campo license: 'PROPRIETARY-FREE-READ' faltante en frontmatter"
    fi

    if grep -q '^version: *1' "$file_path"; then
      add_check "CUENTO-E-FRONTMATTER-VERSION" "PASS" "Campo version: 1 presente en frontmatter"
    else
      add_check "CUENTO-E-FRONTMATTER-VERSION" "FAIL" "Campo version: 1 faltante en frontmatter"
    fi

  elif [[ "$file_path" == *.svg ]]; then
    if [ "$line1" = "$EXPECTED_SVG_HEADER" ]; then
      add_check "CUENTO-E-HEADER" "PASS" "Encabezado de copyright XML/SVG correcto en linea 1"
    else
      add_check "CUENTO-E-HEADER" "FAIL" "Encabezado de copyright XML/SVG faltante o invalido en linea 1"
    fi
  fi

  # 2. Forbidden strings check
  # Check for $SWAL, telemetry, tracking, paid-TTS keys/refs, three / three.js
  forbidden_matches=()

  if grep -qiE '\$SWAL' "$file_path"; then
    forbidden_matches+=("\$SWAL")
  fi
  if grep -qiE 'telemetry' "$file_path"; then
    forbidden_matches+=("telemetry")
  fi
  if grep -qiE 'tracking' "$file_path"; then
    forbidden_matches+=("tracking")
  fi
  if grep -qiE 'elevenlabs|aws-polly|azure-speech|google-cloud-tts|apiKey|api_key' "$file_path"; then
    forbidden_matches+=("paid-TTS/apiKey")
  fi
  if grep -qiE 'three\.js|from ["\x27]three["\x27]|import .*three' "$file_path"; then
    forbidden_matches+=("three.js")
  fi

  if [ ${#forbidden_matches[@]} -eq 0 ]; then
    add_check "CUENTO-E-FORBIDDEN-STRINGS" "PASS" "Sin referencias a \$SWAL, telemetria, seguimiento, TTS de pago o Three.js"
  else
    forbidden_list="$(IFS=,; echo "${forbidden_matches[*]}")"
    add_check "CUENTO-E-FORBIDDEN-STRINGS" "FAIL" "Contenido prohibido detectado: $forbidden_list"
  fi

  # Aggregate file result
  if [ "$file_pass" = true ]; then
    PASSED_COUNT=$((PASSED_COUNT + 1))
    add_json_file_result "$rel_file_path" "PASS" "$checks_json"
  else
    FAILED_COUNT=$((FAILED_COUNT + 1))
    add_json_file_result "$rel_file_path" "FAIL" "$checks_json"
    FAILED_FILES_LIST="${FAILED_FILES_LIST}  - ${rel_file_path}\n"
  fi
done

# 3. Check generated packs directory if present
if [ -d "$PACKS_DIR" ]; then
  pack_files=()
  while IFS= read -r pack; do
    [ -n "$pack" ] && pack_files+=("$pack")
  done < <(find "$PACKS_DIR" -type f -name "*.json" | sort)

  for pack_path in "${pack_files[@]}"; do
    rel_pack_path="${pack_path#$REPO_ROOT/}"
    pack_pass=true
    checks_json="[]"

    add_pack_check() {
      local rule_id="$1"
      local check_status="$2"
      local msg="$3"
      local escaped_msg
      escaped_msg=$(echo "$msg" | sed 's/"/\\"/g')
      local check_obj="{\"rule\":\"$rule_id\",\"status\":\"$check_status\",\"message\":\"$escaped_msg\"}"

      if [ "$checks_json" = "[]" ]; then
        checks_json="[$check_obj]"
      else
        checks_json="${checks_json%]},$check_obj]"
      fi

      if [ "$check_status" = "FAIL" ]; then
        pack_pass=false
      fi
    }

    # Catalog exception: index.json lists entries (each with its own license),
    # it carries no story text, so entry-level license is sufficient.
    if [ "$(basename "$pack_path")" = "index.json" ]; then
      if grep -q '"license": *"PROPRIETARY-FREE-READ"' "$pack_path"; then
        add_pack_check "CUENTO-E-CATALOG-LICENSE" "PASS" "Catálogo con entradas licenciadas 'PROPRIETARY-FREE-READ'"
      else
        add_pack_check "CUENTO-E-CATALOG-LICENSE" "FAIL" "Catálogo sin entradas licenciadas"
      fi
    else
    if grep -q '"license": *"PROPRIETARY-FREE-READ"' "$pack_path"; then
      add_pack_check "CUENTO-E-PACK-LICENSE" "PASS" "Licencia 'PROPRIETARY-FREE-READ' en el paquete JSON"
    else
      add_pack_check "CUENTO-E-PACK-LICENSE" "FAIL" "Licencia faltante o incorrecta en el paquete JSON"
    fi

    if grep -q '"copyright":' "$pack_path"; then
      add_pack_check "CUENTO-E-PACK-COPYRIGHT" "PASS" "Campo 'copyright' presente en el paquete JSON"
    else
      add_pack_check "CUENTO-E-PACK-COPYRIGHT" "FAIL" "Campo 'copyright' faltante en el paquete JSON"
    fi
    fi

    if [ "$pack_pass" = true ]; then
      PASSED_COUNT=$((PASSED_COUNT + 1))
      add_json_file_result "$rel_pack_path" "PASS" "$checks_json"
    else
      FAILED_COUNT=$((FAILED_COUNT + 1))
      add_json_file_result "$rel_pack_path" "FAIL" "$checks_json"
      FAILED_FILES_LIST="${FAILED_FILES_LIST}  - ${rel_pack_path}\n"
    fi
  done
else
  PACK_SKIPPED=true
fi

# Output results
if [ "$JSON_OUTPUT" = true ]; then
  echo "{\"pass\":$PASSED_COUNT,\"fail\":$FAILED_COUNT,\"packs_skipped\":$PACK_SKIPPED,\"files\":$JSON_FILES_JSON}"
else
  echo "=================================================="
  echo " Auditoria de Copyright y Licencias de Cuentos"
  echo "=================================================="
  echo "Archivos escaneados pasados: $PASSED_COUNT"
  echo "Archivos escaneados fallidos: $FAILED_COUNT"
  if [ "$PACK_SKIPPED" = true ]; then
    echo "Paquetes compilados (public/v1/cuentos/): OMITIDO (directorio no existe aun)"
  else
    echo "Paquetes compilados (public/v1/cuentos/): VERIFICADOS"
  fi
  echo "--------------------------------------------------"

  if [ "$FAILED_COUNT" -gt 0 ]; then
    echo "ARCHIVOS CON ERRORES DE AUDITORIA:"
    printf "%b" "$FAILED_FILES_LIST"
    echo "=================================================="
    echo "RESULTADO: AUDITORIA FALLIDA (exit 1)"
    exit 1
  else
    echo "RESULTADO: AUDITORIA EXITOSA (PASS)"
    echo "=================================================="
    exit 0
  fi
fi

if [ "$FAILED_COUNT" -gt 0 ]; then
  exit 1
else
  exit 0
fi
