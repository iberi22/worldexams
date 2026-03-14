# 🔐 Configuración de la API Real (WorldExams API)

> Historical setup snapshot. Los endpoints, dominios y ruta de despliegue aquí descritos pueden no coincidir con el paquete `worldexams-api/` actual.
> Antes de usar este documento, valida la arquitectura activa contra `README.md`, `.gitcore/ARCHITECTURE.md` y `docs/specs/ACTIVE_PROTOCOLS.md`.

## 📋 Resumen

La aplicación SaberParaTodos ahora usa una API real protegida en lugar de archivos mock:

- **Desarrollo local:** Usa archivos estáticos en `/api` (sin autenticación)
- **Producción:** Usa `https://worldexams-api.pages.dev/v1` (archivos JSON públicos)

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│  saberparatodos.pages.dev (Frontend)                   │
│  - Detecta automáticamente el entorno (dev/prod)       │
│  - Dev: /api (archivos locales)                        │
│  - Prod: https://worldexams-api.pages.dev/v1           │
└─────────────────────────────────────────────────────────┘
                        ↓ fetch()
┌─────────────────────────────────────────────────────────┐
│  worldexams-api.pages.dev (Cloudflare Workers)         │
│  - Middleware de autenticación (_middleware.ts)        │
│  - Archivos JSON públicos (sin auth)                   │
│  - Endpoints protegidos (con x-api-key header)         │
└─────────────────────────────────────────────────────────┘
                        ↓ query
┌─────────────────────────────────────────────────────────┐
│  Supabase (tabla api_keys)                             │
│  - Validación de API keys                              │
│  - Control de cuotas (quota_limit, quota_used)         │
│  - Tracking de uso                                      │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Deploy de la API a Cloudflare Pages

### 1. Preparar los archivos

Los archivos JSON ya están generados en `api/v1/`. Necesitamos copiarlos a `api/dist/` para que Cloudflare los sirva:

```powershell
# Desde la raíz del proyecto
cd api
Copy-Item -Path "v1\*" -Destination "dist\" -Recurse -Force
Copy-Item -Path "functions\*" -Destination "dist\functions\" -Recurse -Force
```

### 2. Deploy a Cloudflare Pages

```bash
cd api
npm install
npx wrangler pages deploy dist --project-name=worldexams-api
```

### 3. Configurar variables de entorno en Cloudflare

Ve a: https://dash.cloudflare.com → Pages → worldexams-api → Settings → Environment variables

Agrega:
- `SUPABASE_URL`: `https://tzmrgvtptdtsjcugwqyq.supabase.co`
- `SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (la misma que en .env)

## 🔑 Configuración de API Key (Opcional)

La API key solo se necesita para endpoints protegidos. Los archivos JSON son públicos.

### Crear API key en Supabase

Ejecuta este SQL en el SQL Editor de Supabase:

```sql
INSERT INTO api_keys (
  key_hash,
  name,
  quota_limit,
  quota_used,
  status
) VALUES (
  'saberparatodos-prod-2024',
  'SaberParaTodos Production',
  10000000, -- 10 millones de requests
  0,
  'active'
);
```

### Configurar en Cloudflare Pages (saberparatodos)

Ve a: https://dash.cloudflare.com → Pages → saberparatodos → Settings → Environment variables

Agrega:
- `PUBLIC_API_BASE_URL`: `https://worldexams-api.pages.dev/v1`
- `PUBLIC_API_KEY`: `saberparatodos-prod-2024` (opcional, solo para endpoints protegidos)

## ✅ Verificación

### Desarrollo Local

1. Ejecuta `npm run dev` en saberparatodos
2. Abre la consola del navegador
3. Busca estos logs:
   ```
   🔧 API Configuration: LOCAL mode
   📡 API Base URL: /api
   🌐 Fetching questions from: /api/co/icfes/11/matematicas/1.json
   ✅ Loaded 100 questions for matematicas grade 11
   ```

### Producción

1. Abre https://saberparatodos.pages.dev
2. Abre la consola del navegador
3. Busca estos logs:
   ```
   🔧 API Configuration: PRODUCTION mode
   📡 API Base URL: https://worldexams-api.pages.dev/v1
   🌐 Fetching questions from: https://worldexams-api.pages.dev/v1/co/icfes/11/matematicas/1.json
   ✅ Loaded 100 questions for matematicas grade 11
   ```

### Probar la API directamente

```bash
# Sin API key (archivos JSON públicos)
curl https://worldexams-api.pages.dev/v1/co/icfes/11/matematicas/1.json

# Con API key (endpoints protegidos)
curl -H "x-api-key: saberparatodos-prod-2024" \
     https://worldexams-api.pages.dev/v1/co/icfes/11/matematicas/1.json
```

## 🛡️ Seguridad

### Protección Anti-Scraping

El middleware de la API (`_middleware.ts`) implementa:

1. **Whitelist de orígenes:** Permite acceso sin API key desde dominios confiables
2. **API Key requerida:** Para orígenes no whitelistados
3. **Control de cuotas:** Limita el uso por API key
4. **Rate limiting:** Previene abuso

### Archivos JSON Públicos

Los archivos en `/v1/*.json` son **públicos y no requieren autenticación** porque:
- Son estáticos y generados offline
- No contienen información sensible
- Facilitan el desarrollo y testing
- Permiten acceso rápido sin overhead de auth

### Endpoints Protegidos (Futuro)

Para endpoints dinámicos (ej: `/api/generate-exam`, `/api/submit-score`), se requerirá API key.

## 📊 Monitoreo

### Ver uso de API keys

```sql
SELECT
  name,
  quota_used,
  quota_limit,
  (quota_used::float / quota_limit * 100) as percent_used,
  last_used_at
FROM api_keys
WHERE status = 'active'
ORDER BY quota_used DESC;
```

### Logs de Cloudflare

Ve a: https://dash.cloudflare.com → Pages → worldexams-api → Analytics

## 🔄 Actualizar Preguntas

1. Modifica archivos en `src/content/questions/`
2. Ejecuta `pwsh -File scripts/generate-questions-api.ps1`
3. Copia archivos a `api/dist/`:
   ```powershell
   Copy-Item -Path "api\v1\*" -Destination "api\dist\" -Recurse -Force
   ```
4. Deploy a Cloudflare:
   ```bash
   cd api
   npx wrangler pages deploy dist --project-name=worldexams-api
   ```
5. Las preguntas se actualizan automáticamente en producción

## 🐛 Troubleshooting

### Error: "Failed to fetch questions"

1. Verifica la URL en la consola
2. Revisa los logs de Cloudflare Pages
3. Verifica que los archivos JSON existen en `api/dist/`
4. Prueba acceder directamente a la URL en el navegador

### Error: "Unauthorized"

1. Verifica que estás accediendo a archivos JSON (públicos)
2. Si es un endpoint protegido, verifica el API key
3. Revisa la whitelist en `_middleware.ts`

### Error: "Quota Exceeded"

1. Revisa el uso de cuota en Supabase
2. Aumenta el límite o reinicia el contador
3. Crea una nueva API key si es necesario

## 📚 Referencias

- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [WorldExams API Middleware](../api/functions/_middleware.ts)
