#!/usr/bin/env bash
# Run Playwright e2e on NixOS: provides system libs (nspr/nss/X11/gbm/...)
# that Playwright browsers need and NixOS doesn't ship globally.
# Libs live in ~/.nix-playwright-libs (see docs/CUENTOS/WAVE_PLAN.md e2e note).
# Usage: bash scripts/run-e2e-nixos.sh [playwright args...]
set -euo pipefail
# Playwright webServer uses a relative path (../node_modules), so always run
# from this script's directory (saberparatodos/).
cd "$(dirname "$0")/.."
export LD_LIBRARY_PATH="$HOME/.nix-playwright-libs/lib:$HOME/.nix-profile/lib:/nix/store/0iv8glcslgfcgn371lbjr5jjw5a6cqir-gcc-15.3.0-lib/lib${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
exec npx playwright test "$@"
