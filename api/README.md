# World Exams API Gateway

Este directorio contiene la lógica del API Gateway implementado con Cloudflare Pages Functions.

## 🚀 Despliegue

El API se despliega como un proyecto independiente en Cloudflare Pages.

### Prerrequisitos

1.  Tener instalado `wrangler` (CLI de Cloudflare).
2.  Tener las migraciones de Supabase aplicadas (`api_keys` y `increment_api_usage`).

### Configuración de Variables de Entorno

Para que el middleware funcione, debes configurar las siguientes variables de entorno en el dashboard de Cloudflare Pages (Settings > Environment variables):

*   `SUPABASE_URL`: Tu URL de proyecto Supabase.
*   `SUPABASE_ANON_KEY`: Tu clave anónima pública.

### Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo local (emulando Cloudflare Pages)
npm run dev

# Despliegue a producción
npm run deploy
```

## 🛡️ Seguridad

El middleware (`functions/_middleware.ts`) protege todas las rutas:

1.  **Whitelist:** Permite acceso sin key a orígenes confiables (`saberparatodos.pages.dev`, etc).
2.  **API Key:** Valida el header `x-api-key` contra la tabla `api_keys` en Supabase.
3.  **Cuotas:** Verifica y actualiza el uso de cuota (`quota_used` vs `quota_limit`).

## 📂 Estructura

*   `v1/`: Contiene los archivos estáticos JSON (el contenido del API).
*   `functions/`: Contiene el código del servidor (Workers).
*   `package.json`: Dependencias del proyecto.
