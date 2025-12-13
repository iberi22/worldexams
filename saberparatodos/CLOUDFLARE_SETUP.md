# 🚀 Cloudflare Pages - Guía de Configuración

## 📋 Problemas Identificados

### 1. Error de Build: "pnpm-lock.yaml is not up to date"
**Causa:** Cache de Cloudflare tiene referencia a pnpm cuando el proyecto usa npm.
**Solución:** Clear build cache en Cloudflare Dashboard.

### 2. Node Version Mismatch
**Causa:** wrangler.toml tenía Node 18, el proyecto requiere Node 20.11.0
**Solución:** ✅ Ya corregido en commit `bc6d256`

### 3. Variables de Entorno Faltantes
**Causa:** Supabase credentials no configuradas en Cloudflare.
**Solución:** Configurar manualmente (ver pasos abajo).

---

## ✅ Cambios Aplicados (Commit bc6d256)

```toml
# wrangler.toml
[build]
command = "npm ci --legacy-peer-deps && npm run build"

[build.environment]
NODE_VERSION = "20"
NPM_FLAGS = "--legacy-peer-deps"
```

```
# .nvmrc
20.11.0
```

---

## 🔧 Configuración Manual Requerida

### Paso 1: Ir al Dashboard de Cloudflare

**URL:** https://dash.cloudflare.com/

1. Login con tu cuenta
2. Navega a: **Workers & Pages**
3. Selecciona: **saberparatodos**
4. Ve a: **Settings** > **Environment variables**

---

### Paso 2: Agregar Variables de Entorno

**⚠️ IMPORTANTE:** Configura estas variables para **Production** Y **Preview**

#### Variables Requeridas:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `PUBLIC_SUPABASE_URL` | `https://tzmrgvtptdtsjcugwqyq.supabase.co` | URL de Supabase |
| `PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bXJndnRwdGR0c2pjdWd3cXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMTc0NDYsImV4cCI6MjA3OTY5MzQ0Nn0.sPtxeTyDlF9sdQVrfM1wLp_RLKhI1sFk0W-h8Mc_VIc` | Anon Key de Supabase |
| `PUBLIC_API_BASE_URL` | `https://saberparatodos.pages.dev/api/v1` | Base URL para API |
| `PUBLIC_SITE_URL` | `https://saberparatodos.pages.dev` | URL del sitio |

#### Pasos para Agregar:

1. Click en **"Add variable"**
2. **Variable name:** `PUBLIC_SUPABASE_URL`
3. **Value:** `https://tzmrgvtptdtsjcugwqyq.supabase.co`
4. **Environment:** Selecciona **Production** Y **Preview**
5. Click **"Save"**
6. Repite para cada variable

---

### Paso 3: Limpiar Cache y Redeploy

1. Ve a: **Deployments** (tab principal)
2. Encuentra el deployment más reciente (el que falló)
3. Click en **"..."** (tres puntos)
4. Selecciona: **"Retry deployment"**
5. ✅ **IMPORTANTE:** Marca la opción **"Clear build cache and retry"**
6. Click **"Retry deployment"**

Esto eliminará el error de `pnpm-lock.yaml` y usará el nuevo `wrangler.toml`.

---

## 🔍 Verificación Post-Deployment

### 1. Build Exitoso

Deberías ver:
```
✓ Build succeeded
✓ Deploying...
✓ Deployment complete
```

### 2. Verificar Variables de Entorno

En el log de build, verifica que aparezcan:
```
PUBLIC_SUPABASE_URL=https://tzmrgvtptdtsjcugwqyq.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. Probar el Sitio

**URL:** https://saberparatodos.pages.dev

Verifica:
- ✅ Página carga correctamente
- ✅ Login con magic link funciona
- ✅ Party Mode accesible en `/party`
- ✅ No hay errores en la consola del navegador

### 4. Probar Autenticación

1. Intenta hacer login
2. Deberías recibir un email con magic link
3. Al hacer click, deberías ser autenticado
4. Verifica que el perfil de usuario se carga

---

## 🐛 Troubleshooting

### Error: "Invalid Supabase URL"

**Causa:** Variable `PUBLIC_SUPABASE_URL` no configurada.
**Solución:** Verifica que agregaste la variable en Cloudflare Dashboard.

### Error: "Authentication failed"

**Causa:** `PUBLIC_SUPABASE_ANON_KEY` incorrecta o faltante.
**Solución:** Verifica que copiaste la key completa (JWT largo).

### Build sigue fallando con pnpm error

**Causa:** Cache no se limpió correctamente.
**Solución:**
1. Ve a Settings > Builds & deployments
2. Scroll hasta "Build cache"
3. Click "Purge cache"
4. Retry deployment nuevamente

### Node version error

**Causa:** Cloudflare no leyó el nuevo `wrangler.toml`.
**Solución:**
1. Verifica que el commit `bc6d256` esté en la rama que se está deployando
2. Limpia cache y retry

---

## 📝 Checklist Final

- [ ] Variables de entorno configuradas en Production
- [ ] Variables de entorno configuradas en Preview
- [ ] Build cache limpiado
- [ ] Deployment exitoso
- [ ] Sitio carga en https://saberparatodos.pages.dev
- [ ] Login funciona correctamente
- [ ] Party Mode accesible
- [ ] No hay errores en consola del navegador

---

## 📞 Recursos

- **Cloudflare Dashboard:** https://dash.cloudflare.com/
- **Supabase Dashboard:** https://supabase.com/dashboard
- **GitHub Actions:** https://github.com/iberi22/worldexams/actions
- **Documentation:** https://developers.cloudflare.com/pages/

---

## 🎯 Siguiente Paso

Una vez que hayas completado todos los pasos arriba:

```bash
# Verificar que el deployment fue exitoso
npx wrangler pages deployment list --project-name=saberparatodos

# Ver logs del deployment
npx wrangler pages deployment tail --project-name=saberparatodos
```

---

*Última actualización: 2025-11-30 (Commit bc6d256)*
