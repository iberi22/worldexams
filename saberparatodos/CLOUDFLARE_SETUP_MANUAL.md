# 📋 Guía Visual: Configurar Cloudflare Pages (Paso a Paso)

## ⏱️ Tiempo estimado: 5 minutos

---

## PASO 1: Abrir Cloudflare Dashboard

1. Abre en tu navegador: https://dash.cloudflare.com/
2. Inicia sesión con tu cuenta

---

## PASO 2: Crear Proyecto de Pages

### 2.1 Navegar a Pages

1. En el menú lateral izquierdo, click en **"Workers & Pages"**
2. Click en el botón **"Create application"** (naranja, arriba derecha)
3. Selecciona la pestaña **"Pages"**
4. Click en **"Connect to Git"**

### 2.2 Conectar GitHub

1. Click en el botón **"Connect GitHub"**
2. Se abrirá una ventana popup de GitHub
3. Click en **"Install & Authorize"** (o "Configure" si ya instalaste antes)
4. En la página de GitHub:
   - Selecciona **"Only select repositories"** (radio button)
   - En el dropdown, busca y selecciona: **"saber-co"** ✅
   - Click **"Install"** o **"Save"**

### 2.3 Seleccionar Repositorio

De vuelta en Cloudflare:

1. Verás una lista de repositorios
2. Busca **"iberi22/saber-co"**
3. Click en **"Begin setup"**

---

## PASO 3: Configurar Build Settings

### 3.1 Información del Proyecto

| Campo | Valor a Ingresar |
|-------|------------------|
| **Project name** | `saberparatodos` |
| **Production branch** | `main` |

### 3.2 Build Settings

| Campo | Valor a Ingresar |
|-------|------------------|
| **Framework preset** | `None` (dejar en blanco o seleccionar "None") |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory (Path)** | `/` (dejar vacío o poner `/`) |

### 3.3 Environment Variables

Click en **"Add variable"** y agrega las siguientes 3 variables:

#### Variable 1:
- **Variable name:** `PUBLIC_SUPABASE_URL`
- **Value:** `https://tzmrgvtptdtsjcugwqyq.supabase.co`
- **Environments:** ✅ Production ✅ Preview

#### Variable 2:
- **Variable name:** `PUBLIC_SUPABASE_ANON_KEY`
- **Value:** (Ver instrucciones abajo ⬇️)
- **Environments:** ✅ Production ✅ Preview

**Cómo obtener PUBLIC_SUPABASE_ANON_KEY:**

```powershell
# Opción 1: Desde .env
cd E:\scripts-python\worldexams\saberparatodos
cat .env | Select-String "PUBLIC_SUPABASE_ANON_KEY"

# Opción 2: Desde Supabase Dashboard
# 1. Ve a: https://supabase.com/dashboard/project/[tu-proyecto]
# 2. Settings → API
# 3. Copia "anon public" key
```

El valor debe empezar con: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3Mi...` (muy largo)

#### Variable 3:
- **Variable name:** `PUBLIC_SITE_URL`
- **Value:** `https://saberparatodos.space`
- **Environments:** ✅ Production (NO marcar Preview)

---

## PASO 4: Deploy

1. Scroll hasta abajo
2. Click en el botón **"Save and Deploy"** (naranja grande)
3. ⏳ Espera 2-3 minutos mientras Cloudflare hace el build

**Lo que verás:**
```
⏳ Building...
   Cloning repository...
   Installing dependencies...
   Running build...
   Deploying...
✅ Success! Your site is live!
```

4. ✅ Cuando termine verás: **"Success! Your site is live at [URL]"**

---

## PASO 5: Configurar Custom Domain

### 5.1 Navegar a Settings

1. En tu proyecto saberparatodos, click en **"Settings"** (pestaña superior)
2. En el menú lateral, click en **"Custom domains"**

### 5.2 Agregar Dominio

1. Click en **"Set up a custom domain"**
2. Ingresa: `saberparatodos.space`
3. Click **"Continue"**

### 5.3 Configurar DNS

**Si el dominio YA está en Cloudflare (mismo account):**
- ✅ Cloudflare lo detectará automáticamente
- Click **"Activate domain"**
- ✅ LISTO - DNS se configura automáticamente

**Si el dominio NO está en Cloudflare:**
1. Cloudflare te mostrará un CNAME record
2. Ve a tu proveedor de DNS actual
3. Agrega el CNAME que Cloudflare indica
4. Vuelve a Cloudflare y click **"Verify"**

### 5.4 Agregar www (Opcional)

1. Repite el proceso para: `www.saberparatodos.space`
2. Cloudflare configurará redirect automático `www → saberparatodos.space`

---

## PASO 6: Verificación

### 6.1 Verificar Deployment

1. Ve a la pestaña **"Deployments"**
2. Deberías ver tu deployment más reciente con estado: ✅ **"Success"**
3. Click en el deployment para ver detalles
4. Puedes ver el **"View build log"** para debug si es necesario

### 6.2 Verificar el Sitio

Abre en tu navegador:

**URLs a verificar:**

1. ✅ **Sitio principal:** https://saberparatodos.space
   - Debe cargar la página de inicio
   - NO debe mostrar errores en consola (F12 → Console)

2. ✅ **API JSON:** https://saberparatodos.space/api/CO/icfes/11/matematicas/index.json
   - Debe retornar JSON (no HTML)
   - Content-Type debe ser `application/json`

3. ✅ **Manifest:** https://saberparatodos.space/manifest.json
   - Debe retornar el manifest PWA

4. ✅ **Ranking:** https://saberparatodos.space/ranking
   - Debe cargar la página del ranking

### 6.3 Verificar en Consola

Presiona **F12** en el navegador:

- ❌ No debe haber errores de CORS
- ❌ No debe haber errores de 404
- ✅ Debe cargar preguntas desde el API
- ✅ Supabase debe estar conectado

---

## PASO 7: Re-ejecutar Script de Verificación

Ahora que el deployment está listo, vuelve a PowerShell:

```powershell
cd E:\scripts-python\worldexams\saberparatodos
.\scripts\setup-cloudflare-integration.ps1
```

Esta vez, cuando te pregunte: **"¿Ya completaste la configuración en el Dashboard?"**

Responde: **`y`**

El script verificará que todo esté funcionando correctamente.

---

## ✅ Checklist Final

- [ ] Cloudflare Pages project "saberparatodos" creado
- [ ] GitHub conectado a "iberi22/saber-co"
- [ ] Build settings configurados (npm run build → dist)
- [ ] 3 environment variables agregadas
- [ ] Primer deployment exitoso
- [ ] Custom domain "saberparatodos.space" configurado
- [ ] DNS activo (puede tomar 5-10 min)
- [ ] Sitio accesible: https://saberparatodos.space
- [ ] API retorna JSON correctamente
- [ ] No hay errores en consola del navegador

---

## 🎉 ¡Listo!

A partir de ahora:

**Cada push a `saber-co` → main = Deploy automático** 🚀

Sin GitHub Actions, sin costos, 100% gratis.

---

## 🐛 Troubleshooting Común

### Error: "Build failed - Module not found"

**Solución:** Verifica que `package.json` en saber-co tenga todas las dependencias.

```powershell
cd E:\scripts-python\saber-co
npm install
git add package-lock.json
git commit -m "fix: update dependencies"
git push origin main
```

### Error: "API retorna HTML 404"

**Solución:** Verifica que `public/api/` exista en saber-co.

```powershell
# Copiar desde saberparatodos si falta
Copy-Item -Recurse E:\scripts-python\worldexams\saberparatodos\public\api E:\scripts-python\saber-co\public\
cd E:\scripts-python\saber-co
git add public/api
git commit -m "fix: add API files"
git push origin main
```

### Error: "Environment variables no se aplican"

**Solución:**

1. Ve a Dashboard → saberparatodos → Settings → Environment variables
2. Verifica que las 3 variables estén ahí
3. Click en **"Retry deployment"** (no solo guardar)
4. Marca **"Clear build cache and retry"**

### Custom Domain no funciona después de 10 minutos

**Solución:**

1. Dashboard → saberparatodos → Settings → Custom domains
2. Verifica que el status sea **"Active"** (verde)
3. Si está "Pending", espera más tiempo (hasta 24h)
4. Si está "Failed", elimínalo y vuelve a agregarlo
5. Purge cache: Dashboard → Caching → Purge Everything

---

**Última actualización:** 16 dic 2025
