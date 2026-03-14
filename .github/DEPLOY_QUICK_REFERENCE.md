# 📋 Quick Reference: Deploy Protocol

## 🚨 REGLA CRÍTICA

**PROYECTO PRIVADO → NO GitHub Actions → Deploy Manual OBLIGATORIO**

## ⚡ Comandos Rápidos

### Deploy Completo (Recomendado)
```powershell
cd saberparatodos
pwsh -File scripts\deploy.ps1
```

### Deploy Manual (3 pasos)
```powershell
cd saberparatodos
pwsh -File scripts\copy-api.ps1    # 1. Sync API
npm run build                        # 2. Build
npx wrangler pages deploy dist --project-name=saberparatodos  # 3. Deploy
```

### Solo Actualizar Código (sin API)
```powershell
cd saberparatodos
npm run build && npx wrangler pages deploy dist --project-name=saberparatodos
```

## ❌ PROHIBIDO

- Crear `.github/workflows/*.yml`
- Mencionar "GitHub Actions" o "CI/CD automation"
- Sugerir "automated deployment"

## ✅ PERMITIDO

- Usar `wrangler` CLI
- Scripts PowerShell de deploy
- Comandos manuales locales

## 📖 Documentación Completa

Ver: `PROTOCOLO_DEPLOY_CLI.md`
