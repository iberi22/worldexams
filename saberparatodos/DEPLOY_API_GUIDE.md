# 🚀 Deploy SaberParaTodos con API Integrada

Esta guía explica cómo desplegar SaberParaTodos con la API integrada y protegida con JWT.

## 📋 Preparación

### 1. Obtener JWT Secret de Supabase

1. Ve a: https://supabase.com/dashboard/project/tzmrgvtptdtsjcugwqyq/settings/api
2. En la sección "JWT Settings", copia el "JWT Secret"
3. Actualiza el archivo `.env`:
   ```env
   SUPABASE_JWT_SECRET=tu-jwt-secret-aqui
   ```

### 2. Preparar archivos de la API

Los archivos JSON ya están en `public/api/` gracias al script `copy-api.ps1`.

## 🏗️ Build Local

```powershell
cd saberparatodos
npm run build
```

Esto ejecutará:
1. `prebuild`: Copia archivos de API a `public/api/`
2. `build`: Genera el sitio estático en `dist/`
3. `postbuild`: Indexa el contenido con Pagefind

## ☁️ Deploy a Cloudflare Pages

### Opción 1: Deploy Manual con Wrangler

```powershell
# Instalar wrangler si no lo tienes
npm install -g wrangler

# Login a Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist --project-name=saberparatodos
```

### Opción 2: GitHub Actions (Recomendado)

El repositorio ya tiene configurado el workflow `.github/workflows/deploy.yml`.

1. Push a main:
   ```powershell
   git add .
   git commit -m "feat: integrate API with JWT authentication"
   git push origin main
   ```

2. GitHub Actions automáticamente:
   - Ejecuta `npm run build`
   - Despliega a Cloudflare Pages
   - Configura variables de entorno

## 🔐 Configurar Variables de Entorno en Cloudflare

Ve a: https://dash.cloudflare.com → Pages → saberparatodos → Settings → Environment variables

### Variables de Producción

Agrega las siguientes variables:

| Variable | Valor |
|----------|-------|
| `SUPABASE_URL` | `https://tzmrgvtptdtsjcugwqyq.supabase.co` |
| `SUPABASE_ANON_KEY` | (Copia de `.env`) |
| `SUPABASE_JWT_SECRET` | (Copia de Supabase Dashboard > Settings > API) |

⚠️ **IMPORTANTE:** NO incluyas `PUBLIC_` en el prefijo para variables de Functions (middleware).

### Variables Públicas (Cliente)

Estas ya están en tu código como `import.meta.env.PUBLIC_*`:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

## 🔍 Arquitectura de la API

```
┌─────────────────────────────────────────────────────────┐
│  https://saberparatodos.space                           │
│  - Frontend Astro (dist/)                               │
│  - API Files (dist/api/*.json)                          │
│  - Functions (dist/functions/api/_middleware.ts)        │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  /api/* - Protected by JWT Middleware                  │
│  - Guest users: Access to .json files (rate limited)   │
│  - Authenticated: Full access with JWT token           │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  Supabase Auth                                          │
│  - Validates JWT tokens                                 │
│  - Issues access tokens                                 │
└─────────────────────────────────────────────────────────┘
```

## 🛡️ Seguridad

### Middleware JWT (_middleware.ts)

El middleware intercepta todas las peticiones a `/api/*` y:

1. **Archivos JSON (.json):** Acceso público con rate limiting (previene scraping)
2. **Otros endpoints:** Requieren JWT token en header `Authorization: Bearer <token>`

### Obtener Token JWT (Cliente)

El código en `api-service.ts` automáticamente:
1. Obtiene el token de la sesión de Supabase
2. Lo incluye en las peticiones a la API
3. Si no hay sesión, accede como invitado (limitado)

## ✅ Verificación

### 1. Verificar Build Local

```powershell
npm run build
npm run preview
```

Abre http://localhost:4321 y:
- Genera un examen
- Abre la consola del navegador
- Verifica que cargue las preguntas correctamente

### 2. Verificar en Producción

Después del deploy, abre https://saberparatodos.space y:

1. **Como invitado:**
   - Genera un examen
   - Deberías ver logs: "Fetching from /api/..."
   - Máximo 100 preguntas por sesión

2. **Como usuario autenticado:**
   - Regístrate/Login
   - Genera un examen
   - Deberías ver logs con "Authorization: Bearer ..."
   - Sin límite de preguntas

### 3. Probar la API Directamente

```bash
# Archivo JSON público (sin auth)
curl https://saberparatodos.space/api/co/icfes/11/matematicas/1.json

# Con JWT (si tienes un token)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     https://saberparatodos.space/api/co/icfes/11/matematicas/1.json
```

## 🔄 Actualizar Preguntas

1. Modifica archivos en `src/content/questions/`
2. Genera API:
   ```powershell
   pwsh -File ../scripts/generate-questions-api.ps1
   ```
3. Build y deploy:
   ```powershell
   npm run build
   wrangler pages deploy dist
   ```

## 🐛 Troubleshooting

### Error: "JWT verification failed"

1. Verifica que `SUPABASE_JWT_SECRET` esté configurado en Cloudflare Pages
2. Verifica que el token no haya expirado (usa `supabase.auth.getSession()`)
3. Revisa los logs de Functions en Cloudflare Dashboard

### Error: "Failed to fetch"

1. Verifica que los archivos JSON existan en `dist/api/`
2. Ejecuta `npm run prebuild` para copiar los archivos
3. Revisa la consola del navegador para ver la URL exacta

### Error: "Rate limit exceeded"

- Los usuarios invitados tienen límite de 100 requests/hora
- Autentícate para eliminar el límite

## 📊 Monitoreo

### Cloudflare Analytics

Ve a: https://dash.cloudflare.com → Pages → saberparatodos → Analytics

- Requests por hora
- Errores 4xx/5xx
- Latencia

### Logs de Functions

Ve a: https://dash.cloudflare.com → Pages → saberparatodos → Functions

- Logs en tiempo real
- Errores de middleware
- Validaciones de JWT

## 🎯 Ventajas de esta Arquitectura

1. **Todo en un solo lugar:** No necesitas worldexams-api separado
2. **Seguridad JWT:** Usa el mismo sistema de auth que el resto de la app
3. **Sin CORS:** API y frontend en el mismo dominio
4. **Escalable:** Cloudflare Pages escala automáticamente
5. **Costo $0:** Todo en el plan gratuito de Cloudflare
6. **Anti-scraping:** Rate limiting y JWT protegen la API
7. **Offline first:** PWA puede cachear preguntas para uso offline

## 📚 Referencias

- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Supabase JWT Authentication](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
