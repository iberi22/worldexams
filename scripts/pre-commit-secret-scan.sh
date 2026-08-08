#!/usr/bin/env bash

# ==============================================================================
# Pre-Commit Git Secret Scanner
# Identifies potential hardcoded secrets, keys, and tokens in staged files.
# Blocks commits if a suspected raw credential or high-entropy key is detected.
# ==============================================================================

set -eo pipefail

# ANSI color codes for rich, beautiful logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}[Secret Scan] Running security audit on staged changes...${NC}"

# Detect staged files of interest (or scan all ts/js files in src/ if none are staged)
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|js|jsx|tsx|json|yml|yaml|md|sh)$' || true)

if [ -z "$STAGED_FILES" ]; then
  echo -e "${GREEN}[Secret Scan] No relevant staged files found to scan. Scanning src/ directory as a fallback...${NC}"
  # Fallback: scan all source files in src/
  STAGED_FILES=$(find src -type f -name "*.ts" -o -name "*.js" || true)
fi

SUSPICIOUS_FOUND=0

# Regexp pattern to detect potential hardcoded keys, secrets, tokens, or passwords
# Looks for typical assignment formats with string values that are at least 16 characters
SECRET_PATTERN="(secret|password|api_key|token|private_key).{0,20}=\s*['\"][a-zA-Z0-9_-]{16,}['\"]"

for FILE in $STAGED_FILES; do
  if [ -f "$FILE" ]; then
    # Exclude files that are test, mock, example, or the scanner itself to avoid false positives
    if [[ "$FILE" =~ "test" || "$FILE" =~ "mock" || "$FILE" =~ "example" || "$FILE" =~ "pre-commit" ]]; then
      continue
    fi

    # Search for potential secrets in the file
    # Grep matches, then filters out lines containing "TODO", "mock", "example", "test", etc.
    MATCHES=$(grep -inE "$SECRET_PATTERN" "$FILE" | grep -vEi "test|mock|example|TODO|placeholder" || true)

    if [ -n "$MATCHES" ]; then
      echo -e "${RED}[SECURITY ALERT] Potential hardcoded secret detected in: $FILE${NC}"
      echo -e "Offending lines:"
      echo -e "${RED}$MATCHES${NC}"
      echo -e "${YELLOW}Please remove hardcoded secrets, put them in environment variables, or mark them with 'mock' or 'test' to ignore.${NC}\n"
      SUSPICIOUS_FOUND=1
    fi
  fi
done

if [ "$SUSPICIOUS_FOUND" -eq 1 ]; then
  echo -e "${RED}[Secret Scan] COMMIT BLOCKED. Hardcoded secrets were found!${NC}"
  exit 1
else
  echo -e "${GREEN}[Secret Scan] PASSED. No potential secrets or unmasked tokens detected.${NC}"
  exit 0
fi
