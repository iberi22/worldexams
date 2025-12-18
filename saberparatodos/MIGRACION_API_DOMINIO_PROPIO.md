# 🚀 Plan de Migración: API a Dominio Propio (saberparatodos.space)

> **Fecha:** 17 de diciembre de 2025
> **Objetivo:** Eliminar duplicación de APIs y centralizar en saberparatodos.space

---

## 🎯 Problema Actual

### Situación:

```
┌─────────────────────────────────────────────────────────────┐
│  API EXTERNA (worldexams-api.pages.dev)                    │
│  - Middleware de autenticación                             │
│  - Control de cuotas                                        │
│  ❌ Problema: Dominio separado, CORS issues                 │
└─────────────────────────────────────────────────────────────┘
                        │
                        │ Script manual: copy-api.ps1
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  API LOCAL (saberparatodos.space/api/)                     │
│  - Archivos estáticos copiados manualmente                 │
│  - Sin autenticación                                        │
│  ❌ Problema: Desincronización, duplicación                 │
└─────────────────────────────────────────────────────────────┘
```

### Consecuencias:

1. ❌ **Desincronización:** API local con 350 preguntas, API externa con 364
2. ❌ **Duplicación:** Mismo contenido en 2 lugares
3. ❌ **Sin monetización:** API local no tiene control de acceso
4. ❌ **CORS:** Problemas al llamar API externa desde saberparatodos.space

---

## ✅ Solución Propuesta: API Unificada en saberparatodos.space

### Nueva Arquitectura:

```
┌─────────────────────────────────────────────────────────────┐
│  saberparatodos.space                                       │
│  ├── / (Frontend Astro)                                     │
│  ├── /api/ (Archivos JSON estáticos)                        │
│  └── /functions/ (Cloudflare Workers - Auth & Quotas)      │
│                                                             │
│  ✅ TODO en un solo dominio                                 │
│  ✅ Sin CORS                                                │
│  ✅ Control de acceso centralizado                          │
│  ✅ Sincronización automática                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Implementación en 3 Pasos

### Paso 1: Mover Middleware a saberparatodos/functions

**1.1 Crear estructura:**

```powershell
cd saberparatodos
mkdir functions
```

**1.2 Copiar middleware:**

```powershell
# Copiar desde api/functions/_middleware.ts
Copy-Item ..\api\functions\_middleware.ts .\functions\_middleware.ts
```

**1.3 Actualizar wrangler.toml en saberparatodos:**

```toml
name = "saberparatodos"
pages_build_output_dir = "dist"

# Environment variables (Cloudflare Dashboard)
# SUPABASE_URL
# SUPABASE_ANON_KEY
```

**1.4 Actualizar package.json:**

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && npm run copy-api",
    "copy-api": "pwsh -File scripts/copy-api.ps1",
    "preview": "astro preview",
    "deploy": "npm run build && wrangler pages deploy dist"
  },
  "dependencies": {
    "@cloudflare/workers-types": "^4.20240529.0",
    "@supabase/supabase-js": "^2.39.0"
  }
}
```

### Paso 2: Actualizar API Service (src/lib/api-service.ts)

**Antes:**
```typescript
const API_BASE_URL = '/api';
```

**Después (sin cambios - ya está bien):**
```typescript
const API_BASE_URL = '/api'; // ✅ Correcto - mismo dominio
```

**Ventaja:** Al estar en el mismo dominio, no necesitamos cambiar nada en el código.

### Paso 3: Automatizar Sincronización

**3.1 Modificar astro.config.mjs:**

```javascript
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://saberparatodos.space',
  integrations: [svelte(), tailwind(), sitemap()],

  // Hook de build para copiar API automáticamente
  vite: {
    build: {
      rollupOptions: {
        plugins: [{
          name: 'copy-api-on-build',
          buildEnd() {
            // Ejecutar copy-api.ps1 al finalizar build
            const { execSync } = require('child_process');
            execSync('pwsh -File scripts/copy-api.ps1', {
              stdio: 'inherit',
              cwd: __dirname
            });
          }
        }]
      }
    }
  }
});
```

---

## 🔧 Configuración de Cloudflare

### Variables de Entorno (Dashboard)

1. Ir a: https://dash.cloudflare.com/[ACCOUNT_ID]/pages/view/saberparatodos/settings/environment-variables

2. Agregar:
   ```
   SUPABASE_URL = https://tzmrgvtptdtsjcugwqyq.supabase.co
   SUPABASE_ANON_KEY = [tu_anon_key]
   ```

3. Aplicar a: **Production** y **Preview**

### Custom Domain

1. Settings → Custom domains → Add custom domain
2. Agregar: `saberparatodos.space`
3. DNS configurado automáticamente por Cloudflare

---

## 🗑️ Cleanup: Eliminar API Externa

Una vez que todo funcione en saberparatodos.space:

```powershell
# 1. Eliminar proyecto worldexams-api de Cloudflare Pages
# 2. Eliminar carpeta api/ del repo (opcional - mantener para referencia)
# 3. Actualizar workflows de GitHub Actions
```

---

## 📊 Comparación: Antes vs Después

| Aspecto | Antes (2 APIs) | Después (1 API) |
|---------|----------------|-----------------|
| **Dominios** | 2 (worldexams-api + saberparatodos) | 1 (saberparatodos) |
| **CORS** | ❌ Problemas potenciales | ✅ Sin problemas |
| **Sincronización** | ⚠️ Manual (copy-api.ps1) | ✅ Automática (build hook) |
| **Autenticación** | ✅ En API externa | ✅ En saberparatodos/functions |
| **Cuotas** | ✅ En API externa | ✅ En saberparatodos/functions |
| **Mantenimiento** | ❌ 2 deployments | ✅ 1 deployment |
| **Monetización** | ⚠️ Solo en API externa | ✅ Unificada |

---

## 🧪 Testing del Nuevo Setup

### Test 1: Acceso Público (Sin Auth)

```bash
curl https://saberparatodos.space/api/co/icfes/11/matematicas/index.json
```

**Esperado:**
```json
{
  "total_questions": 364,
  "pages": [...],
  "subject": "Matemáticas"
}
```

### Test 2: Acceso con API Key

```bash
curl -H "x-api-key: cliente-demo-2025" \
  https://saberparatodos.space/api/co/icfes/11/matematicas/1.json
```

**Esperado:** JSON completo + tracking de cuota

### Test 3: Frontend Integración

1. Abrir https://saberparatodos.space
2. Console del navegador debe mostrar:
   ```
   📍 API Base URL: /api
   🌍 Country: co, Exam: icfes
   ✅ Loaded 6 subjects
   📦 Found 100 cached questions for grade 11
   ✅ Exam Ready: 5 questions
   ```

---

## 🚀 Implementación Inmediata

### Opción A: Implementación Completa (Recomendado)

```powershell
# 1. Crear estructura de functions
cd saberparatodos
mkdir functions
Copy-Item ..\api\functions\_middleware.ts .\functions\_middleware.ts

# 2. Actualizar package.json
# (agregar dependencias @cloudflare/workers-types y @supabase/supabase-js)

# 3. Deploy
npm install
npm run build
npm run deploy
```

### Opción B: Quick Fix (Mientras tanto)

**Solución temporal ya aplicada:**
```powershell
# Sincronizar API local con externa (ya ejecutado)
pwsh -File scripts\copy-api.ps1
```

**Resultado:** ✅ App ahora tiene 364 preguntas actualizadas

---

## 📝 Checklist de Migración

### Inmediato (Hoy)

- [x] Sincronizar API local con `copy-api.ps1`
- [x] Verificar que app carga 364 preguntas
- [ ] Crear `saberparatodos/functions/_middleware.ts`
- [ ] Actualizar `package.json` con dependencias Workers
- [ ] Configurar variables de entorno en Cloudflare

### Corto Plazo (Esta Semana)

- [ ] Test completo de autenticación en saberparatodos.space
- [ ] Verificar control de cuotas funcional
- [ ] Documentar endpoints en `/docs`
- [ ] Eliminar API externa (worldexams-api.pages.dev)

### Mediano Plazo (2 Semanas)

- [ ] Automatizar sincronización en build
- [ ] Migrar todas las referencias de API externa a local
- [ ] Actualizar workflows de GitHub Actions
- [ ] Lanzar sistema de API keys para clientes

---

## 💰 Impacto en Monetización

### Ventajas:

1. ✅ **Mismo dominio:** Mejor UX, sin CORS
2. ✅ **Control unificado:** Una sola fuente de verdad
3. ✅ **Fácil venta:** API key = acceso a saberparatodos.space/api
4. ✅ **Marketing:** "Accede a la API oficial de SaberParaTodos"

### Pricing Sugerido:

| Plan | Requests/Mes | Precio | Incluye |
|------|--------------|--------|---------|
| **Free** | 1,000 | $0 | App web + 1k API calls |
| **Pro** | 10,000 | $9/mes | App + API + Analytics |
| **Business** | 50,000 | $39/mes | App + API + Priority Support |

---

## 🔗 Referencias

- **Cloudflare Pages Functions:** https://developers.cloudflare.com/pages/functions/
- **Supabase Auth con Workers:** https://supabase.com/docs/guides/auth/server-side/cloudflare-workers
- **API Keys Best Practices:** https://github.com/worldexams/docs/API_SECURITY.md

---

## 🎯 Próximo Paso

**¿Qué quieres hacer primero?**

1. **Implementar functions en saberparatodos/** (30 min)
2. **Configurar variables en Cloudflare** (10 min)
3. **Deploy y testing** (15 min)

**O prefieres que te genere los archivos listos para copiar/pegar?** 🚀
