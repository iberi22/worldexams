# 🔐 Configurar Variables de Entorno en Cloudflare Pages

## 📍 Ubicación

Ve a: https://dash.cloudflare.com/[account-id]/pages/view/saberparatodos/settings/environment-variables

## ⚙️ Variables Requeridas

### Para el Middleware de JWT (Functions)

Estas variables son usadas por `functions/api/_middleware.ts`:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `SUPABASE_URL` | `https://tzmrgvtptdtsjcugwqyq.supabase.co` | URL del proyecto Supabase |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Anon key de Supabase |
| `SUPABASE_JWT_SECRET` | (ver abajo) | Secret para verificar JWT tokens |

### Para el Cliente (Frontend)

Estas ya están en el código como `import.meta.env.PUBLIC_*`:

| Variable | Valor | Configuración |
|----------|-------|---------------|
| `PUBLIC_SUPABASE_URL` | `https://tzmrgvtptdtsjcugwqyq.supabase.co` | Astro build env |
| `PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Astro build env |

## 🔑 Obtener SUPABASE_JWT_SECRET

### Método 1: Dashboard de Supabase

1. Ve a: https://supabase.com/dashboard/project/tzmrgvtptdtsjcugwqyq/settings/api
2. Scroll hasta "JWT Settings"
3. Copia el valor de "JWT Secret"

### Método 2: CLI de Supabase

```bash
supabase secrets list --project-ref tzmrgvtptdtsjcugwqyq
```

## 📋 Pasos de Configuración

### 1. En Cloudflare Pages Dashboard

1. Ve a: https://dash.cloudflare.com
2. Click en "Pages" en el sidebar
3. Selecciona el proyecto "saberparatodos"
4. Ve a "Settings" → "Environment variables"

### 2. Agregar Variables para Production

Para cada variable:
1. Click en "Add variable"
2. Type: "Text"
3. Name: `SUPABASE_URL` (sin el prefijo PUBLIC_ para Functions)
4. Value: Pega el valor correspondiente
5. Environment: Selecciona "Production"
6. Click "Save"

Repite para:
- `SUPABASE_ANON_KEY`
- `SUPABASE_JWT_SECRET`

### 3. Agregar Variables para Preview (Opcional)

Si quieres que preview branches también funcionen:
1. Repite el paso 2 pero selecciona "Preview" en Environment
2. Usa los mismos valores o diferentes si tienes un proyecto de staging

### 4. Variables de Build (PUBLIC_*)

Las variables que empiezan con `PUBLIC_` se configuran automáticamente durante el build de Astro si están en el código fuente. No necesitas configurarlas en Cloudflare si ya están hardcodeadas en el código.

Si quieres override:
1. Agrega `PUBLIC_SUPABASE_URL` en Environment Variables
2. Agrega `PUBLIC_SUPABASE_ANON_KEY` en Environment Variables

## ✅ Verificar Configuración

Después de configurar las variables:

1. Ve a la pestaña "Deployments"
2. Click en "Retry deployment" en el último deployment
3. O haz un nuevo push a GitHub para trigger un nuevo deployment

Durante el deployment, verifica en los logs que no haya errores de variables faltantes.

## 🧪 Probar la API

### Test 1: Archivo JSON Público (Sin Auth)

```bash
curl https://saberparatodos.space/api/co/icfes/11/matematicas/1.json
```

Debería retornar el JSON con las preguntas.

### Test 2: Con JWT Token

1. Abre https://saberparatodos.space
2. Abre DevTools → Console
3. Ejecuta:
   ```javascript
   const { data: { session } } = await supabase.auth.getSession();
   console.log(session?.access_token);
   ```
4. Copia el token
5. Prueba en terminal:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
        https://saberparatodos.space/api/co/icfes/11/matematicas/1.json
   ```

## 🐛 Troubleshooting

### Error: "JWT verification failed"

- Verifica que `SUPABASE_JWT_SECRET` esté configurado
- Asegúrate de que sea el secret correcto de Supabase
- Verifica que no tenga espacios al inicio o final

### Error: "SUPABASE_JWT_SECRET not configured"

- La variable no está configurada en Cloudflare
- Verifica que el nombre sea exactamente `SUPABASE_JWT_SECRET`
- Redeploy después de agregar la variable

### Las variables no se actualizan

- Cloudflare cachea las variables de entorno
- Necesitas hacer un nuevo deployment después de cambiarlas
- Usa "Retry deployment" o haz un nuevo push

## 📚 Referencia

- [Cloudflare Pages Environment Variables](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Supabase JWT](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [DEPLOY_API_GUIDE.md](./DEPLOY_API_GUIDE.md) - Guía completa de deployment
