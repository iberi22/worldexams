# 🆓 Deploy GRATIS sin GitHub Actions

## ❌ Problema
- GitHub Actions en repos privados consume créditos (2000 min/mes)
- Error: `"account payments have failed or your spending limit needs to be increased"`

## ✅ Solución: Cloudflare Pages Direct GitHub Integration

**Deploy automático desde repo PÚBLICO sin usar GitHub Actions = 100% GRATIS** 🎉

---

## 🏗️ Arquitectura

```
┌──────────────────────────────────────────────────────────────┐
│  saberparatodos (PRIVADO)                                    │
│  - Backend + Preguntas                                       │
│  - NO se deploya directamente                                │
│  - Solo para desarrollo local                                │
└──────────────────────────────────────────────────────────────┘
                            │
                            │ Copia código UI manualmente (una vez)
                            ↓
┌──────────────────────────────────────────────────────────────┐
│  saber-co (PÚBLICO)                                          │
│  - Solo UI/Frontend                                          │
│  - Sin backend ni secretos                                   │
│  - Conectado a Cloudflare Pages                              │
└────────────┬─────────────────────────────────────────────────┘
             │
             │ Push to main (trigger automático)
             ↓
┌──────────────────────────────────────────────────────────────┐
│  Cloudflare Pages (Direct GitHub Integration)                │
│  ✅ NO usa GitHub Actions                                    │
│  ✅ Build automático en Cloudflare servers                   │
│  ✅ Deploy a saberparatodos.space                            │
│  ✅ 100% GRATIS                                              │
└────────────┬─────────────────────────────────────────────────┘
             │
             │ Fetch API
             ↓
┌──────────────────────────────────────────────────────────────┐
│  Supabase Edge Functions                                     │
│  - Backend desde worldexams-content (privado)                │
│  - API Gateway, AI Tutor, etc.                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Configuración (Una Sola Vez)

### PASO 1: Ejecutar Script de Setup

```powershell
cd E:\scripts-python\worldexams\saberparatodos
.\scripts\setup-cloudflare-integration.ps1
```

Este script:
1. ✅ Verifica autenticación en Cloudflare
2. 📋 Te da instrucciones paso a paso
3. ✅ Verifica que el proyecto esté configurado

---

### PASO 2: Configuración Manual en Cloudflare Dashboard

**Por qué manual?** El CLI de Wrangler NO soporta conectar GitHub automáticamente. Solo se hace una vez (2 minutos).

#### 2.1 Conectar GitHub

1. 🌐 Abre: https://dash.cloudflare.com/
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Click **"Connect GitHub"**
4. Autoriza **Cloudflare Pages** app
5. Selecciona **"Only select repositories"**
6. Escoge: **iberi22/saber-co** ✅
7. Click **"Install & Authorize"**

#### 2.2 Configurar Build Settings

| Campo | Valor |
|-------|-------|
| **Project name** | `saberparatodos` |
| **Production branch** | `main` |
| **Framework preset** | None |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` |

#### 2.3 Agregar Environment Variables

Click **"Add variable"** para cada una:

| Name | Value | Production | Preview |
|------|-------|------------|---------|
| `PUBLIC_SUPABASE_URL` | `https://tzmrgvtptdtsjcugwqyq.supabase.co` | ✅ | ✅ |
| `PUBLIC_SUPABASE_ANON_KEY` | `[Tu anon key]` | ✅ | ✅ |
| `PUBLIC_SITE_URL` | `https://saberparatodos.space` | ✅ | ❌ |
| `PUBLIC_SITE_URL` | `https://saberparatodos.pages.dev` | ❌ | ✅ |

**Dónde obtener `PUBLIC_SUPABASE_ANON_KEY`:**

```powershell
# En tu repo privado saberparatodos
cat .env | Select-String "PUBLIC_SUPABASE_ANON_KEY"
```

#### 2.4 Save and Deploy

1. Click **"Save and Deploy"**
2. ⏳ Espera 2-3 minutos (primer build)
3. ✅ Verás: **"Success! Your site is live!"**

---

### PASO 3: Configurar Custom Domain

1. En Cloudflare Pages project → **Settings** → **Custom domains**
2. Click **"Set up a custom domain"**
3. Ingresa: `saberparatodos.space`
4. Click **"Continue"**
5. Cloudflare detecta automáticamente el dominio (si ya está en tu cuenta)
6. Click **"Activate domain"**
7. ✅ DNS se configura automáticamente

---

## 📋 Workflow Diario (Automático)

Una vez configurado, el workflow es **totalmente automático**:

### Deploy Normal

```bash
cd E:\scripts-python\saber-co

# 1. Hacer cambios en UI
# (editar componentes, estilos, páginas)

# 2. Commit y push
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main

# ✨ Cloudflare detecta el push automáticamente
# → Build en Cloudflare servers (NO usa GitHub Actions)
# → Deploy a saberparatodos.space
# → Todo en 2-3 minutos
```

### Preview Deployments (PRs)

```bash
# 1. Crear rama feature
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y push
git push origin feature/nueva-funcionalidad

# 3. Crear PR en GitHub
# → Cloudflare deploya preview automático
# → URL: https://[commit-hash].saberparatodos.pages.dev
```

---

## 🔄 Sincronizar Cambios desde saberparatodos (privado)

Cuando hagas cambios en `saberparatodos` que quieras reflejar en `saber-co`:

### Opción 1: Script Automático de Sync

```powershell
# Ejecutar desde saberparatodos/
.\scripts\sync-to-public.ps1
```

Este script:
1. Copia `src/components/`, `src/pages/`, `src/lib/` a saber-co
2. Excluye backend (supabase/functions, scripts, .env)
3. Hace commit y push automático a saber-co
4. Trigger deploy automático

### Opción 2: Manual (más control)

```powershell
cd E:\scripts-python\worldexams

# 1. Copiar cambios de UI
Copy-Item -Recurse saberparatodos\src\components saber-co\src\ -Force
Copy-Item -Recurse saberparatodos\src\pages saber-co\src\ -Force
Copy-Item -Recurse saberparatodos\src\lib saber-co\src\ -Force
Copy-Item -Recurse saberparatodos\src\styles saber-co\src\ -Force

# 2. Commit en saber-co
cd saber-co
git add .
git commit -m "sync: update UI from saberparatodos"
git push origin main

# 3. Cloudflare deploya automáticamente
```

---

## 🔍 Monitoreo

### Ver Build Logs

**Opción 1: Dashboard**
- https://dash.cloudflare.com/ → Workers & Pages → saberparatodos → Deployments

**Opción 2: CLI**
```powershell
npx wrangler pages deployment list --project-name=saberparatodos
npx wrangler pages deployment tail --project-name=saberparatodos
```

### Ver Logs en Tiempo Real

```powershell
npx wrangler pages deployment tail --project-name=saberparatodos --follow
```

---

## 🔒 Seguridad

### ✅ Lo que SÍ está en saber-co (público)

- ✅ Componentes Svelte UI
- ✅ Páginas Astro
- ✅ Estilos CSS/Tailwind
- ✅ Configuración de país (Colombia)
- ✅ Assets públicos (imágenes, iconos)
- ✅ Variables públicas (`PUBLIC_*`)

### ❌ Lo que NO está en saber-co (privado)

- ❌ Edge Functions (Supabase)
- ❌ Scripts de backend
- ❌ Preguntas (src/content/questions)
- ❌ `.env` con secretos
- ❌ `SUPABASE_SERVICE_ROLE_KEY`
- ❌ API keys privadas

---

## 💰 Costos

| Servicio | Límite Gratis | Tu Uso |
|----------|---------------|--------|
| **GitHub Actions** | 0 min (no se usa) | 0 min ✅ |
| **Cloudflare Pages Builds** | 500/mes | ~30/mes ✅ |
| **Cloudflare Bandwidth** | Unlimited | ∞ ✅ |
| **Cloudflare Requests** | Unlimited | ∞ ✅ |

**Total: $0/mes** 🆓

---

## 🐛 Troubleshooting

### Error: "Build failed"

1. Ve a: Dashboard → Deployments → [Failed deployment] → View build log
2. Busca el error específico
3. Verifica que `package.json` tenga `"build": "astro build"`
4. Verifica variables de entorno

### Error: "Module not found"

- Verifica que `node_modules` no esté en `.gitignore` (debe estarlo)
- Verifica que `package.json` tenga todas las dependencias
- En Dashboard, retry deployment con "Clear cache"

### API retorna 404

- Verifica que `public/api/` exista en saber-co
- Verifica que Astro copie `public/` a `dist/`
- Verifica en build log: "Copied X files from public/"

### Custom domain no funciona

- Espera 5-10 minutos para propagación DNS
- Verifica en Dashboard → Custom domains → Status: "Active"
- Purge cache de Cloudflare: Dashboard → Caching → Purge Everything

---

## 📋 Checklist de Setup

- [ ] Ejecutar `setup-cloudflare-integration.ps1`
- [ ] Conectar GitHub en Cloudflare Dashboard
- [ ] Configurar build settings
- [ ] Agregar environment variables (4 variables)
- [ ] Deploy inicial exitoso
- [ ] Configurar custom domain (saberparatodos.space)
- [ ] Verificar sitio: https://saberparatodos.space
- [ ] Verificar API: https://saberparatodos.space/api/CO/icfes/11/matematicas/index.json
- [ ] Crear script de sync desde saberparatodos

---

## 🎯 Ventajas de Esta Arquitectura

1. **✅ 100% Gratis** - No usa GitHub Actions
2. **✅ Deploy Automático** - Push → Build → Deploy
3. **✅ Preview Deployments** - Cada PR tiene su URL
4. **✅ Rollback Fácil** - Click en deployment anterior
5. **✅ Backend Seguro** - Lógica privada en worldexams-content
6. **✅ Open Source UI** - Community puede contribuir a saber-co
7. **✅ Sin Límites** - Cloudflare Pages es ilimitado
8. **✅ CDN Global** - Deploy en 300+ datacenters

---

## 📝 Próximos Pasos

1. **Ahora:** Ejecutar `setup-cloudflare-integration.ps1`
2. **Dashboard:** Configurar GitHub integration (2 minutos)
3. **Verificar:** Primer deployment exitoso
4. **Script Sync:** Crear automatización para sincronizar cambios

---

**Actualizado:** 16 dic 2025
