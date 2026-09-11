#!/usr/bin/env bash
# © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados.
# Script de Auditoría Final de Cierre - Módulo Cuentos (Ola C5.04)

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$WORKSPACE_ROOT/.." && pwd)"

FAILED_SECTIONS=0

echo "=========================================================================="
echo "      AUDITORÍA FINAL DE CIERRE DE CUENTOS (OLA C5.04 - SABERPARATODOS)   "
echo "=========================================================================="
echo "Directorio workspace: $WORKSPACE_ROOT"
echo "Directorio repo root: $REPO_ROOT"
echo "Fecha: $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
echo ""

# ------------------------------------------------------------------------
# SECCIÓN 1: Validador de Cuentos (validate_cuentos.js)
# ------------------------------------------------------------------------
echo "=========================================================================="
echo " [SECCIÓN 1/6] Validador de Cuentos (scripts/validate_cuentos.js)"
echo "=========================================================================="
VAL_LOG="/tmp/audit_cierre_sec1.log"
set +e
node "$SCRIPT_DIR/validate_cuentos.js" 2>&1 | tee "$VAL_LOG"
VAL_EXIT=$?
set -e

if [ $VAL_EXIT -eq 0 ] && (grep -q "Errores: 0" "$VAL_LOG" || grep -q "0 errors" "$VAL_LOG" || grep -q "validados exitosamente" "$VAL_LOG"); then
  echo ">>> SECCIÓN 1 RESULTADO: PASS (Validador ejecutado sin errores)"
else
  echo ">>> SECCIÓN 1 RESULTADO: FAIL (Se detectaron errores en el validador)"
  FAILED_SECTIONS=$((FAILED_SECTIONS + 1))
fi
echo ""

# ------------------------------------------------------------------------
# SECCIÓN 2: Auditoría de Encabezados de Copyright y Licencias
# ------------------------------------------------------------------------
echo "=========================================================================="
echo " [SECCIÓN 2/6] Auditoría de Encabezados de Copyright (C1.06 / C5.04)"
echo "=========================================================================="
COPYRIGHT_LOG="/tmp/audit_cierre_sec2.log"
set +e
bash "$SCRIPT_DIR/audit-cuentos-copyright.sh" 2>&1 | tee "$COPYRIGHT_LOG"
COPYRIGHT_EXIT=$?
set -e

if [ $COPYRIGHT_EXIT -eq 0 ]; then
  echo ">>> SECCIÓN 2 RESULTADO: PASS (100% de archivos con encabezado de copyright)"
else
  echo ">>> SECCIÓN 2 RESULTADO: FAIL (Inconsistencias en encabezados de copyright)"
  FAILED_SECTIONS=$((FAILED_SECTIONS + 1))
fi
echo ""

# ------------------------------------------------------------------------
# SECCIÓN 3: Filtro Veto de Español Neutro
# ------------------------------------------------------------------------
echo "=========================================================================="
echo " [SECCIÓN 3/6] Filtro Veto de Español Neutro"
echo "=========================================================================="
VETO_LOG="/tmp/audit_cierre_sec3.log"
VETO_REGEX="\b(vos|tenés|hacé|che|parce|chido|chévere|bacán|pibe|mola|chaval|güey|weón)\b"

set +e
VETO_MATCHES=$(grep -rn -iE "$VETO_REGEX" \
  "$REPO_ROOT/questions_data/cuentos/" \
  "$WORKSPACE_ROOT/src/lib/cuentos/" \
  "$WORKSPACE_ROOT/src/components/cuentos/" \
  "$WORKSPACE_ROOT/src/pages/cuentos/" 2>/dev/null)
set -e

echo "$VETO_MATCHES" | tee "$VETO_LOG"
if [ -n "$VETO_MATCHES" ]; then
  VETO_COUNT=$(echo "$VETO_MATCHES" | grep -v '^$' | wc -l)
else
  VETO_COUNT=0
fi

if [ "$VETO_COUNT" -eq 0 ]; then
  echo "Encontrados 0 términos en la lista de veto de español neutro."
  echo ">>> SECCIÓN 3 RESULTADO: PASS (Cero palabras vetadas detectadas)"
else
  echo "ERROR: Se encontraron $VETO_COUNT términos en la lista de veto."
  echo ">>> SECCIÓN 3 RESULTADO: FAIL (Términos vetados presentes)"
  FAILED_SECTIONS=$((FAILED_SECTIONS + 1))
fi
echo ""

# ------------------------------------------------------------------------
# SECCIÓN 4: Auditoría de Telemetría BR-03 (Cero tokens / karma / tracking)
# ------------------------------------------------------------------------
echo "=========================================================================="
echo " [SECCIÓN 4/6] Auditoría Telemetría BR-03 (Zero PII / Telemetry / Karma)"
echo "=========================================================================="
TELEMETRY_LOG="/tmp/audit_cierre_sec4.log"
set +e
TELEMETRY_MATCHES=$(grep -rn -E "window\.(gtag|analytics|dataLayer)|fetch\(.*telemetry|postMessage\(.*analytics|\$SWAL\(" \
  "$WORKSPACE_ROOT/src/lib/cuentos/" \
  "$WORKSPACE_ROOT/src/components/cuentos/" \
  "$WORKSPACE_ROOT/src/pages/cuentos/" \
  "$WORKSPACE_ROOT/public/sw.js" 2>/dev/null)
set -e

echo "$TELEMETRY_MATCHES" | tee "$TELEMETRY_LOG"
if [ -n "$TELEMETRY_MATCHES" ]; then
  TELEMETRY_COUNT=$(echo "$TELEMETRY_MATCHES" | grep -v '^$' | wc -l)
else
  TELEMETRY_COUNT=0
fi

if [ "$TELEMETRY_COUNT" -eq 0 ]; then
  echo "Encontradas 0 llamadas activas de telemetría, analytics, tokens o \$SWAL."
  echo ">>> SECCIÓN 4 RESULTADO: PASS (Cumplimiento BR-03 / BR-07 verificado)"
else
  echo "ERROR: Se detectaron $TELEMETRY_COUNT llamadas de telemetría/tracking activas."
  echo ">>> SECCIÓN 4 RESULTADO: FAIL (Llamadas de telemetría detectadas)"
  FAILED_SECTIONS=$((FAILED_SECTIONS + 1))
fi
echo ""

# ------------------------------------------------------------------------
# SECCIÓN 5: SEO, Sitemap Exclusion & JSON-LD Schemas
# ------------------------------------------------------------------------
echo "=========================================================================="
echo " [SECCIÓN 5/6] SEO, Sitemap Exclusion & JSON-LD Schemas"
echo "=========================================================================="
SEO_LOG="/tmp/audit_cierre_sec5.log"
{
  echo "--- Verificación de exclusión de Sitemap (Político No-Listado / Privado) ---"
  if grep -q "!page.includes('/cuentos/')" "$WORKSPACE_ROOT/astro.config.mjs"; then
    echo "✅ /cuentos/ está correctamente excluido del sitemap en astro.config.mjs"
  else
    echo "❌ ERROR: /cuentos/ NO está excluido del sitemap en astro.config.mjs"
  fi

  echo "--- Verificación de metadatos noindex en [slug].astro ---"
  if grep -q "noindex={true}" "$WORKSPACE_ROOT/src/pages/cuentos/[slug].astro"; then
    echo "✅ Layout noindex={true} configurado en [slug].astro"
  else
    echo "❌ ERROR: Layout noindex={true} faltante en [slug].astro"
  fi

  echo "--- Verificación de Schemas JSON-LD (BreadcrumbList & Book) ---"
  if grep -q "BreadcrumbList" "$WORKSPACE_ROOT/src/pages/cuentos/[slug].astro" && grep -q "'@type': 'Book'" "$WORKSPACE_ROOT/src/pages/cuentos/[slug].astro"; then
    echo "✅ Schemas BreadcrumbList y Book presentes en [slug].astro"
  else
    echo "❌ ERROR: Schemas JSON-LD faltantes en [slug].astro"
  fi

  echo "--- Escaneo de Cuentos Disponibles ---"
  SLUGS=$(find "$REPO_ROOT/questions_data/cuentos" -mindepth 1 -maxdepth 1 -type d | xargs -n1 basename | sort)
  SLUG_COUNT=$(echo "$SLUGS" | wc -l)
  echo "Cuentos disponibles en el repositorio ($SLUG_COUNT):"
  echo "$SLUGS"
} | tee "$SEO_LOG"

if grep -q "❌" "$SEO_LOG"; then
  echo ">>> SECCIÓN 5 RESULTADO: FAIL (Inconsistencias en metadatos o sitemap)"
  FAILED_SECTIONS=$((FAILED_SECTIONS + 1))
else
  echo ">>> SECCIÓN 5 RESULTADO: PASS (Exclusión de sitemap, noindex y schemas verificados)"
fi
echo ""

# ------------------------------------------------------------------------
# SECCIÓN 6: Pruebas E2E (Playwright - Desktop + Mobile)
# ------------------------------------------------------------------------
echo "=========================================================================="
echo " [SECCIÓN 6/6] Pruebas E2E (Playwright - Chromium + Mobile Chrome)"
echo "=========================================================================="
E2E_LOG="/tmp/audit_cierre_sec6.log"
set +e
(cd "$WORKSPACE_ROOT" && npx playwright test tests/e2e/cuentos-lector.spec.ts --project=chromium --project=mobile-chrome) 2>&1 | tee "$E2E_LOG"
E2E_EXIT=$?
set -e

if [ $E2E_EXIT -eq 0 ] && (grep -q "2 passed" "$E2E_LOG" || grep -q "passed" "$E2E_LOG"); then
  echo ">>> SECCIÓN 6 RESULTADO: PASS (Pruebas E2E exitosas en Chromium y Mobile Chrome)"
else
  echo ">>> SECCIÓN 6 RESULTADO: FAIL (Fallo en la aserción de resultados E2E)"
  FAILED_SECTIONS=$((FAILED_SECTIONS + 1))
fi
echo ""

# ------------------------------------------------------------------------
# RESUMEN Y ESTADO DE SALIDA
# ------------------------------------------------------------------------
echo "=========================================================================="
echo "                      RESUMEN DE AUDITORÍA FINAL                          "
echo "=========================================================================="
if [ "$FAILED_SECTIONS" -eq 0 ]; then
  echo "STATUS FINAL: ALL SECTIONS PASSED (0 fallos)"
  echo "=========================================================================="
  exit 0
else
  echo "STATUS FINAL: AUDIT FAILED ($FAILED_SECTIONS sección(es) con fallos)"
  echo "=========================================================================="
  exit 1
fi
