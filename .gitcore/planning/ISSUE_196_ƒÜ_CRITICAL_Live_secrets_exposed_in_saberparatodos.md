# Issue Local Mirror: #196 - ­ƒÜ¿ CRITICAL: Live secrets exposed in saberparatodos/.env

**GitHub Issue:** https://github.com/iberi22/worldexams/issues/196
**Status:** Open
**Labels:** 
**Synced:** 2026-04-18 14:58

## Descripcion Original (GitHub)

## SECURITY INCIDENT - Immediate Action Required

### Finding
Live secrets found in saberparatodos/.env (gitignored but present on disk):

| Secret | Risk |
|--------|------|
| TELEGRAM_BOT_TOKEN | Critical |
| GITHUB_PERSONAL_ACCESS_TOKEN | Critical |
| DEEPSEEK_API_KEY | High |
| SUPABASE_SERVICE_ROLE_KEY | Critical |
| FUNCTION_SECRET | High |
| INTERNAL_PREMIUM_API_KEY | High |

### Location
E:\scripts-python\worldexams\saberparatodos\.env

### Required Actions
1. **IMMEDIATE**: Rotate ALL exposed secrets
2. Move all secrets to GitHub Secrets / Supabase Dashboard env
3. Add pre-commit hook to detect secrets before commit
4. Update .env to use only placeholder values on disk

---
*Espejo local generado por scripts/sync-issues.ps1. Re-ejecutar para actualizar.*
