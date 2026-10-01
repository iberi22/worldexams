#!/usr/bin/env bash
# Syntax-check and run every script in scripts/.
#
# `pnpm run lint` is `eslint src/`, so a .mjs in scripts/ is never parsed by any
# lint. A refactor here shipped a call to a function that no longer existed and
# nothing failed: the script had simply never been run since. This closes that.
#
# `pnpm run test` is `validate-secrets.sh`, which checks .env hygiene and nothing
# else. Neither command touches this folder, which is where the corpus gates
# live.
set -uo pipefail
cd "$(dirname "$0")/.."

# Known-bad, pre-existing, unreachable from any entry point. Reported, not
# enforced: a broken legacy generator should not turn every commit red, but it
# should not be invisible either. Delete the file or fix it, then drop this line.
KNOWN_BAD=(scripts/generate_g6_w16_w40.py)
stale=0

fail=0

echo "== syntax =="
for f in scripts/*.mjs; do
  if node --check "$f" 2>/dev/null; then
    echo "  ok   $f"
  else
    echo "  FAIL $f"
    node --check "$f" 2>&1 | head -3
    fail=$((fail + 1))
  fi
done

if command -v python3 >/dev/null; then
  for f in scripts/*.py; do
    case " ${KNOWN_BAD[*]:-} " in
      *" $f "*) echo "  skip $f (known-bad)"; continue ;;
    esac
    if python3 -m py_compile "$f" 2>/dev/null; then
      echo "  ok   $f"
    else
      echo "  FAIL $f"
      python3 -m py_compile "$f" 2>&1 | head -3
      fail=$((fail + 1))
    fi
  done
fi

echo
echo "== suites =="
if npm run --silent test:quality; then :; else fail=$((fail + 1)); fi

echo
echo "== corpus =="
if node scripts/validate-bundles-v52.mjs; then :; else fail=$((fail + 1)); fi
if node scripts/check-feedback-language.mjs questions_data; then :; else fail=$((fail + 1)); fi

stale=0
for f in "${KNOWN_BAD[@]}"; do
  [ -e "$f" ] && stale=$((stale + 1))
done
if [ "$stale" -gt 0 ]; then
  echo
  echo "known-bad still present (does not fail this check): ${KNOWN_BAD[*]}"
fi

echo
if [ "$fail" -eq 0 ]; then
  echo "test:scripts OK${stale:+ ($stale known-bad)}"
else
  echo "test:scripts FAILED ($fail)"
  exit 1
fi
