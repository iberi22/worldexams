# Issue Local Mirror: #221 - ­ƒÜ¿ SECURITY: Exposed secrets detected in git history

**GitHub Issue:** https://github.com/iberi22/worldexams/issues/221
**Status:** Open
**Labels:** 
**Synced:** 2026-04-18 14:58

## Descripcion Original (GitHub)

## ­ƒÜ¿ CRITICAL: Exposed Secrets Found in worldexams

### Detected Secrets
1. **GitHub PAT (ghp_)** ÔÇö found in git history across multiple commits
2. **OpenAI API Key (sk-)** ÔÇö found in git history
3. **Telegram Bot Token** ÔÇö found in `saberparatodos/supabase/functions/.env` (already removed)

### Immediate Actions Taken
- Ô£à Deleted `saberparatodos/.env` and `node_modules/saberparatodos/.env`
- Ô£à Deleted `saberparatodos/supabase/functions/.env`
- Ô£à Cleaned git cache for all `.env` files

### Required Actions (MANUAL)
1. **ROTATE `ghp_` token immediately** ÔÇö GitHub Settings ÔåÆ Developer settings ÔåÆ Personal access tokens ÔåÆ revoke
2. **ROTATE OpenAI API key** ÔÇö platform.openai.com ÔåÆ API keys ÔåÆ revoke the exposed key
3. **ROTATE Telegram bot token** ÔÇö @BotFather: `/revoke` then `/newbot`
4. **Scrub git history** ÔÇö Secrets remain in git history. Run:
   ```
   git filter-branch --force --index-filter "git rm --cached --ignore-unmatch saberparatodos/.env" --prune-empty --tag-name-filter cat -- --all
   ```

### Affected Files in History
- `saberparatodos/.env`
- `saberparatodos/supabase/functions/.env`
- `node_modules/saberparatodos/.env`
- `package-lock.json` files (may contain npm auth tokens)

### Prevention
- `.env` already in `.gitignore`
- Enable GitHub Secret Scanning push protection


---
*Espejo local generado por scripts/sync-issues.ps1. Re-ejecutar para actualizar.*
