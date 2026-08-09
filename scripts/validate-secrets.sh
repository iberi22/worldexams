#!/usr/bin/env bash

# =============================================================================
# scripts/validate-secrets.sh
# Validation of Environment Variables & Secrets Prevention Script
# =============================================================================

set -eo pipefail

# ANSI Color Codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0;0m' # No Color

echo -e "${BLUE}=== WorldExamns Secrets & Environment Validation ===${NC}"

# Check for staged files with sensitive names (added or modified only)
STAGED_SENSITIVE_FILES=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '\.env$|\.key$|\.pem$' || true)

if [ -n "$STAGED_SENSITIVE_FILES" ]; then
    echo -e "${RED}❌ ERROR: Staged sensitive files detected. These must not be committed:${NC}"
    echo "$STAGED_SENSITIVE_FILES" | while read -r file; do
        echo -e "  - ${RED}$file${NC}"
    done
    echo -e "${YELLOW}Please untrack these files using 'git rm --cached <file>' before committing.${NC}"
    exit 1
fi

# Scan staged changes for potential raw secrets/keys
echo -e "Checking staged files for potential secrets..."
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR)

SUSPICIOUS_FOUND=0
if [ -n "$STAGED_FILES" ]; then
    for file in $STAGED_FILES; do
        # Skip checking example env files or documentation files
        if [[ "$file" =~ \.example$ || "$file" =~ \.md$ || "$file" =~ ^tests/ ]]; then
            continue
        fi

        # Check staged diff lines for high-entropy secrets or raw credentials
        # Look for sk-proj-, ANTHROPIC_API_KEY values, stripe secrets, telegram tokens, etc.
        DIFF_SENSITIVE=$(git diff --cached "$file" | grep -E "^\+.*(sk-[a-zA-Z0-9]{20,}|[0-9]{8,10}:[a-zA-Z0-9_-]{35}|ghp_[a-zA-Z0-9]{36,})" || true)

        if [ -n "$DIFF_SENSITIVE" ]; then
            echo -e "${RED}❌ WARNING: Potential raw secret/key detected in staged changes in file: $file${NC}"
            echo -e "Matching content:\n$DIFF_SENSITIVE"
            SUSPICIOUS_FOUND=1
        fi
    done
fi

if [ "$SUSPICIOUS_FOUND" -ne 0 ]; then
    echo -e "${RED}❌ Commit aborted. Please remove potential raw secrets or keys.${NC}"
    exit 1
fi

# Environment Validation
echo -e "\nValidating local .env file against .env.example..."

if [ ! -f ".env.example" ]; then
    echo -e "${RED}❌ ERROR: .env.example file not found at the root!${NC}"
    exit 1
fi

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️ WARNING: No local .env file found. Creating a minimal .env file...${NC}"
    echo "CORTEX_URL=http://localhost:8003" > .env
    echo -e "${GREEN}Created default .env file.${NC}"
fi

# Read keys from .env.example
KEYS_IN_EXAMPLE=$(grep -oE '^[A-Z0-9_]+' .env.example | sort -u || true)

MISSING_KEYS=0
while read -r key; do
    if [ -z "$key" ]; then
        continue
    fi

    # Check if key is defined in local .env
    if ! grep -q "^$key=" .env; then
        # We can warn or note missing keys
        echo -e "${YELLOW}ℹ️  Note: Key '$key' from .env.example is not set in your local .env file.${NC}"
        MISSING_KEYS=$((MISSING_KEYS+1))
    fi
done <<< "$KEYS_IN_EXAMPLE"

# Verify .env.example does not contain real secrets
echo -e "\nVerifying .env.example only contains placeholders..."
REAL_SECRET_IN_EXAMPLE=$(grep -riE '=(sk-proj-|ghp_|8116938644:)' .env.example || true)

if [ -n "$REAL_SECRET_IN_EXAMPLE" ]; then
    echo -e "${RED}❌ ERROR: Real-looking secrets found in .env.example!${NC}"
    echo "$REAL_SECRET_IN_EXAMPLE"
    exit 1
fi

echo -e "${GREEN}✅ All checks passed successfully!${NC}"
exit 0
