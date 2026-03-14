# Configuración de Secrets de Supabase

Este archivo documenta los secrets necesarios para las Edge Functions.

## Secrets Actuales (✅ Configurados)

- `GEMINI_API_KEY` - API key de Google Gemini para análisis de texto
- `SUPABASE_URL` - URL del proyecto Supabase
- `SUPABASE_ANON_KEY` - Clave anónima pública
- `SUPABASE_SERVICE_ROLE_KEY` - Clave de servicio (solo backend)

## Secrets Pendientes (⚠️ Requeridos)

### REPLICATE_API_KEY
**Función:** `generate-infographic`
**Propósito:** Generar infografías educativas con Flux/SDXL
**Costo:** ~$0.003 por imagen (3 segundos de generación)

**Cómo obtenerlo:**
1. Ir a https://replicate.com
2. Crear cuenta gratuita
3. Ir a "Account Settings" → "API Tokens"
4. Copiar el token (comienza con `r8_...`)

**Configurar:**
```bash
supabase secrets set REPLICATE_API_KEY="r8_YOUR_TOKEN_HERE"
```

### CRON_SECRET
**Función:** `refill-credits`
**Propósito:** Autenticar cron job semanal de recarga de créditos
**Seguridad:** Token aleatorio para evitar ejecuciones no autorizadas

**Configurar:**
```bash
# Generar UUID aleatorio
supabase secrets set CRON_SECRET="$(uuidgen)"
```

**En Windows PowerShell:**
```powershell
$secret = [guid]::NewGuid().ToString()
supabase secrets set CRON_SECRET="$secret"
```

## Configurar Cron Job en Supabase

Después de configurar `CRON_SECRET`:

1. Ir al Dashboard de Supabase → Database → Cron Jobs
2. Crear nuevo Cron Job:
   - **Nombre:** `refill-credits-weekly`
   - **Schedule:** `0 0 * * 1` (Lunes 00:00 UTC)
   - **SQL:**
   ```sql
   SELECT
     net.http_post(
       url := 'https://tzmrgvtptdtsjcugwqyq.supabase.co/functions/v1/refill-credits',
       headers := jsonb_build_object(
         'Content-Type', 'application/json',
         'Authorization', 'Bearer ' || current_setting('app.settings.cron_secret')
       ),
       body := '{}'::jsonb
     ) AS request_id;
   ```

3. Guardar el secret en la configuración:
   ```sql
   ALTER DATABASE postgres SET app.settings.cron_secret = 'YOUR_CRON_SECRET_HERE';
   ```

## Verificar Configuración

```bash
# Listar todos los secrets
supabase secrets list

# Ver logs de una función
supabase functions logs generate-infographic

# Test local de una función
supabase functions serve generate-infographic
```

## Notas de Seguridad

- ❌ **NUNCA** commitear secrets en Git
- ✅ Usar `.env.local` para desarrollo local
- ✅ Usar Supabase Vault para producción
- ✅ Rotar secrets cada 90 días
- ✅ Usar diferentes keys para dev/staging/prod
