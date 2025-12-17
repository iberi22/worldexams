# 🚀 Deployment Setup - Enfoque Profesional

## Arquitectura de Deployment

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Repository                     │
│                  (Private - saberparatodos)             │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Push to main
                     ↓
┌─────────────────────────────────────────────────────────┐
│              GitHub Actions Workflow                     │
│  ✓ Run Tests (Playwright E2E)                           │
│  ✓ Build (npm run build)                                │
│  ✓ Deploy (wrangler pages deploy)                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Deploy dist/
                     ↓
┌─────────────────────────────────────────────────────────┐
│            Cloudflare Pages                              │
│  Project: saberparatodos                                │
│  Production: https://saberparatodos.space               │
│  Preview: https://[commit].saberparatodos.pages.dev     │
└─────────────────────────────────────────────────────────┘
```

---

## PASO 1: Generar Cloudflare API Token

### 1.1 Crear Token con Permisos Mínimos

1. Ve a: https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"**
3. Usa template: **"Edit Cloudflare Workers"** como base
4. **Personaliza permisos:**

   ```
   Permissions:
   ├── Account
   │   └── Cloudflare Pages: Edit
   └── Zone
       └── [Tu dominio saberparatodos.space]
           └── DNS: Read (opcional, para custom domains)

   Account Resources:
   └── Include → [Tu cuenta] → All accounts

   Zone Resources:
   └── Include → Specific zone → saberparatodos.space

   TTL:
   └── Nunca expira (o 1 año para rotación de seguridad)
   ```

5. Click **"Continue to summary"**
6. Click **"Create Token"**
7. **COPIA EL TOKEN** (solo se muestra una vez):
   ```
   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 1.2 Obtener Account ID

1. En Cloudflare Dashboard, ve a cualquier página
2. En la URL verás: `https://dash.cloudflare.com/[ACCOUNT_ID]/...`
3. O ve a: **Workers & Pages** → Settings → Account ID

**Copia el Account ID:**
```
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## PASO 2: Configurar GitHub Secrets

### 2.1 Agregar Secrets al Repositorio

1. Ve a tu repo: https://github.com/iberi22/saberparatodos
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**

**Agrega estos 2 secrets:**

| Name | Value | Descripción |
|------|-------|-------------|
| `CLOUDFLARE_API_TOKEN` | `[Token del paso 1.1]` | Token con permisos Pages:Edit |
| `CLOUDFLARE_ACCOUNT_ID` | `[Account ID del paso 1.2]` | ID de tu cuenta Cloudflare |

### 2.2 Agregar Variables de Entorno (opcional)

**Actions** → **Variables** → **New repository variable**

| Name | Value |
|------|-------|
| `CLOUDFLARE_PROJECT_NAME` | `saberparatodos` |
| `PRODUCTION_BRANCH` | `main` |

---

## PASO 3: Crear GitHub Actions Workflow

Ver archivo: `.github/workflows/deploy-cloudflare.yml`

**Features:**
- ✅ Deploy automático en push a `main`
- ✅ Preview deployments en PRs
- ✅ Tests E2E antes de deploy
- ✅ Caché de node_modules
- ✅ Retry automático si falla
- ✅ Notificaciones de status

---

## PASO 4: Deploy Manual de Emergencia (Backup)

Ver script: `scripts/deploy-manual.ps1`

**Cuándo usar:**
- GitHub Actions está caído
- Hotfix urgente
- Testing local antes de push

**Uso:**
```powershell
cd saberparatodos
.\scripts\deploy-manual.ps1 -Environment production
```

---

## Flujo de Trabajo Diario

### Deploy Normal (Automático)

```bash
# 1. Hacer cambios
git add .
git commit -m "feat: nueva feature"

# 2. Push (trigger automático)
git push origin main

# 3. GitHub Actions se encarga del resto
# ✓ Build
# ✓ Test
# ✓ Deploy
# ✓ Notificación
```

### Preview de PR (Automático)

```bash
# 1. Crear rama feature
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y push
git push origin feature/nueva-funcionalidad

# 3. Crear PR en GitHub
# → GitHub Actions deploya preview automático
# → Comentario en PR con URL: https://[commit].saberparatodos.pages.dev
```

### Hotfix de Emergencia (Manual)

```powershell
# 1. Fix local
npm run build

# 2. Test local
npm run preview

# 3. Deploy manual
.\scripts\deploy-manual.ps1 -Environment production

# 4. Commit después (para sincronizar)
git add .
git commit -m "hotfix: critical bug"
git push origin main
```

---

## Verificación Post-Deploy

### Checklist

- [ ] **Health Check:** https://saberparatodos.space/
- [ ] **API JSON:** https://saberparatodos.space/api/CO/icfes/11/matematicas/index.json
- [ ] **PWA Manifest:** https://saberparatodos.space/manifest.json
- [ ] **Leaderboard:** https://saberparatodos.space/ranking
- [ ] **Consola sin errores:** F12 → Console (0 errors)

### Monitoreo

```bash
# Ver logs de Cloudflare
npx wrangler pages deployment tail --project-name=saberparatodos

# Ver últimos deployments
npx wrangler pages deployment list --project-name=saberparatodos
```

---

## Rollback en Caso de Problemas

### Opción 1: GitHub Actions (Recomendado)

1. Ve a: **Actions** → **Deploy to Cloudflare Pages**
2. Selecciona un deployment exitoso anterior
3. Click **"Re-run jobs"**

### Opción 2: Cloudflare Dashboard

1. Ve a: https://dash.cloudflare.com/
2. **Workers & Pages** → **saberparatodos** → **Deployments**
3. Encuentra el deployment exitoso anterior
4. Click **"..."** → **"Rollback to this deployment"**

### Opción 3: CLI Manual

```powershell
# Ver historial
npx wrangler pages deployment list --project-name=saberparatodos

# Rollback a deployment específico
npx wrangler pages deployment tail --project-name=saberparatodos --deployment-id=[ID]
```

---

## Seguridad

### ✅ Buenas Prácticas

- ✅ API Token con permisos mínimos (solo Pages:Edit)
- ✅ Secrets en GitHub (nunca en código)
- ✅ Token con expiración (rotación anual)
- ✅ 2FA en Cloudflare
- ✅ Branch protection en `main`

### ❌ Nunca Hacer

- ❌ Commitear `CLOUDFLARE_API_TOKEN` en código
- ❌ Compartir token en Slack/Discord
- ❌ Usar Service Role Key en frontend
- ❌ Deploy sin tests

---

## Costos (Gratis Tier)

| Servicio | Límite Gratis | Uso Estimado |
|----------|---------------|--------------|
| **GitHub Actions** | 2000 min/mes (privado) | ~50 min/mes |
| **Cloudflare Pages** | Unlimited | ∞ |
| **Builds** | 500/mes | ~30/mes |
| **Bandwidth** | Unlimited | ∞ |

**Total: $0/mes** 🆓

---

## Próximos Pasos

1. ✅ Generar Cloudflare API Token
2. ✅ Agregar secrets a GitHub
3. ✅ Crear workflow file
4. ✅ Push y verificar deploy automático
5. ✅ Configurar notificaciones (Discord/Slack)

---

**Documentación actualizada:** 16 dic 2025
