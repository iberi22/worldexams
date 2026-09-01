#!/usr/bin/env bash
# security-221-history-rewrite.sh
# Preparado 2026-09-01 — NO EJECUTA force-push sin coordinacion
# Ver docs/SECURITY_221_PREP.md y docs/SECURITY.md
set -euo pipefail

echo "=== WorldExams Security #221 — History Rewrite Plan (DRY-RUN) ==="
echo "Este script PREPARA el rewrite, no hace push."

FILTER=${1:-dry-run}  # dry-run | execute

# 1. Verificar estado actual
echo ""
echo "[1] Verificando secrets actuales..."
bash scripts/validate-secrets.sh || true
git log --all --oneline --grep="secret" -i | head -20 || true
echo "Secrets scan OK si no hay hallazgos arriba."

# 2. Listar archivos con historial sensible (placeholder — ajustar rutas reales)
echo ""
echo "[2] Archivos candidatos a purge (revisar manualmente):"
git log --all --name-only --pretty=format: | sort -u | grep -E "\.env|secrets|\.key" | head -20 || echo "  (ninguno detectado en log)"

# 3. Comando git-filter-repo (requiere pip install git-filter-repo)
echo ""
echo "[3] Comando propuesto (NO EJECUTADO en dry-run):"
cat << 'CMD'
  pip install git-filter-repo
  git clone --mirror git@github.com:iberi22/worldexams.git /tmp/worldexams-mirror.git
  cd /tmp/worldexams-mirror.git
  git filter-repo --invert-paths --path .env --path-glob '*.key' --force
  # Verificar con: git log --all -p | grep -i "SUPABASE_SERVICE_ROLE"
  # Solo con aprobacion de BELA:
  # git push --force --mirror
CMD

if [ "$FILTER" = "execute" ]; then
  echo ""
  echo "MODO EXECUTE solicitado — requiere confirmacion interactiva."
  read -p "¿Confirmas rewrite LOCAL (sin push)? (escribe YES): " c
  if [ "$c" != "YES" ]; then echo "Abortado."; exit 1; fi
  echo "Ejecutando filter-repo LOCAL..."
  # Seguridad: solo local, nunca push
  git filter-repo --invert-paths --path .env --force || echo "filter-repo falló o no instalado"
else
  echo ""
  echo "DRY-RUN completado. Para ejecutar local: bash scripts/security-221-history-rewrite.sh execute"
  echo "FORCE-PUSH a origin requiere aprobacion explicita de BELA + ventana coordinada."
fi
