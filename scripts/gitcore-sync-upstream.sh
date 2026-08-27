#!/usr/bin/env bash
# =============================================================================
# scripts/gitcore-sync-upstream.sh
# Protocolo GitCore: Sincronización bidireccional entre Fork Personal y Org Upstream
# =============================================================================
set -euo pipefail

ORG_REMOTE="org-origin"
ORIGIN_REMOTE="origin"
CURRENT_BRANCH=$(git branch --show-current)

echo "🔄 [GitCore Sync] Iniciando sincronización en rama '${CURRENT_BRANCH}'..."

# 1. Asegurar que ambos remotos existen
if ! git remote | grep -q "^${ORG_REMOTE}$"; then
  echo "⚠️  Añadiendo remoto ${ORG_REMOTE}..."
  git remote add "${ORG_REMOTE}" "https://github.com/world-exams/world-exams.github.io.git"
fi

# 2. Fetch de ambos remotos
echo "📥 Trayendo referencias de origin y org-origin..."
git fetch "${ORIGIN_REMOTE}"
git fetch "${ORG_REMOTE}"

# 3. Verificaciones de integridad local
echo "🔍 Ejecutando pre-flight checks..."
npm test
npm run lint

# 4. Push a fork personal (origin)
echo "🚀 Sincronizando Fork Personal (origin/${CURRENT_BRANCH})..."
git push "${ORIGIN_REMOTE}" "${CURRENT_BRANCH}"

# 5. Push a upstream organización (org-origin)
echo "🚀 Sincronizando Upstream Organización (org-origin/${CURRENT_BRANCH})..."
git push "${ORG_REMOTE}" "${CURRENT_BRANCH}"

echo "✅ [GitCore Sync] Sincronización completada con éxito en ambos repositorios."
