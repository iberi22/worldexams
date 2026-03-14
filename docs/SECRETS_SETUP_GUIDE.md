# 🔐 Configuración de Secrets para World Exams Bots

> Guía paso a paso para configurar las credenciales necesarias
> Historical context only. La configuración activa debe hacerse para el repo privado actual y para deploy/manual CLI; las referencias a organization secrets o GitHub Actions son legado.

**Fecha:** 16 de diciembre de 2025

---

## 📋 Secrets Requeridos

### 🔑 Lista Completa

| Secret | Dónde Obtenerlo | Necesario Para |
|--------|-----------------|----------------|
| `TELEGRAM_BOT_TOKEN` | @BotFather en Telegram | Bot de Telegram |
| `TELEGRAM_CHAT_ID` | Tu user ID en Telegram | Canal de notificaciones |
| `DISCORD_WEBHOOK_URL` | Server Settings → Integrations | Publicaciones Discord |
| `DISCORD_BOT_TOKEN` | Discord Developer Portal | Bot interactivo Discord |
| `TWITTER_API_KEY` | Twitter Developer Portal | Publicaciones Twitter |
| `TWITTER_API_SECRET` | Twitter Developer Portal | Auth Twitter |
| `TWITTER_ACCESS_TOKEN` | Twitter Developer Portal | Auth Twitter |
| `TWITTER_ACCESS_SECRET` | Twitter Developer Portal | Auth Twitter |
| `TWITTER_BEARER_TOKEN` | Twitter Developer Portal | API v2 Twitter |
| `GITHUB_TOKEN` | GitHub Settings → Developer | Triage de issues |
| `SUPABASE_URL` | Supabase Dashboard | Base de datos |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard | Edge Functions |

---

## 🚀 Paso a Paso

### 1️⃣ Telegram Bot

**Token del bot:** `TU_TOKEN_AQUI` (Obtenlo con @BotFather)

1. Ve al repositorio privado actual o al gestor de secretos realmente usado
2. Configura los secretos para el flujo manual/CLI activo
3. Click "New organization secret"
4. Nombre: `TELEGRAM_BOT_TOKEN`
5. Valor: `TU_TOKEN_RECIEN_GENERADO`
6. Da acceso solo al entorno o repositorio privado que realmente lo necesite

**Chat ID:**
1. New secret: `TELEGRAM_CHAT_ID`
2. Valor: `TU_CHAT_ID_NUMERICO`
3. Limitar acceso al entorno necesario

---

### 2️⃣ Discord Webhook

**Crear webhook:**

1. Ve a tu servidor de Discord
2. Server Settings → Integrations → Webhooks
3. Click "New Webhook"
4. Nombre: "World Exams Bot"
5. Canal: Selecciona el canal para publicaciones
6. Click "Copy Webhook URL"

**En GitHub:**
1. New organization secret: `DISCORD_WEBHOOK_URL`
2. Valor: `https://discord.com/api/webhooks/xxxxx/yyyyy`
3. Limitar acceso al entorno necesario

**Para bot interactivo (opcional ahora):**
1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. New Application → "World Exams Bot"
3. Bot → Add Bot
4. Reset Token → Copiar token
5. En GitHub: `DISCORD_BOT_TOKEN`

---

### 3️⃣ Twitter/X API

**Crear app en Twitter:**

1. Ve a [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Projects & Apps → Create App
3. Nombre: "World Exams Bot"
4. Environment: Production
5. Keys and tokens → Generate

**Copiar 5 secrets:**
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_SECRET`
- `TWITTER_BEARER_TOKEN`

**Permisos necesarios:**
- Read and Write
- Read Direct Messages (opcional)

---

### 4️⃣ GitHub Token

**Crear Personal Access Token:**

1. Ve a GitHub → Settings (tu perfil)
2. Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Nombre: "World Exams Bot Orchestrator"
5. Expiration: No expiration
6. Scopes:
   - ✅ `repo` (acceso completo a repos)
   - ✅ `workflow` (actualizar workflows)
   - ✅ `write:org` (leer issues de org)

**En el entorno operativo actual:**
1. Configura `GITHUB_TOKEN` solo si una herramienta local o servicio privado realmente lo necesita
2. Usa el mínimo scope posible

---

### 5️⃣ Supabase

**Ya tienes las credenciales:**

1. `SUPABASE_URL`: `https://tzmrgvtptdtsjcugwqyq.supabase.co`
2. `SUPABASE_SERVICE_ROLE_KEY`: (secret key del dashboard)

**En GitHub:**
1. New secret: `SUPABASE_URL`
2. Valor: `https://tzmrgvtptdtsjcugwqyq.supabase.co`
3. New secret: `SUPABASE_SERVICE_ROLE_KEY`
4. Valor: (copiar del dashboard Supabase → Settings → API)

---

## ✅ Verificar Configuración

### Script de Verificación

Crea un archivo `verify-secrets.ps1`:

```powershell
# Verificar que todos los secrets estén configurados en GitHub

$required_secrets = @(
    "TELEGRAM_BOT_TOKEN",
    "TELEGRAM_CHAT_ID",
    "DISCORD_WEBHOOK_URL",
    "TWITTER_API_KEY",
    "GITHUB_TOKEN",
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY"
)

Write-Host "`n🔍 Verificando secrets en GitHub..." -ForegroundColor Cyan

foreach ($secret in $required_secrets) {
    # Usar GitHub CLI
    $result = gh secret list --repo iberi22/worldexams | Select-String $secret

    if ($result) {
        Write-Host "  ✅ $secret" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $secret (FALTA)" -ForegroundColor Red
    }
}

Write-Host "`n"
```

**Ejecutar:**
```bash
./verify-secrets.ps1
```

---

## 🔒 Seguridad

### ⚠️ NUNCA HACER:

- ❌ Commitear archivos `.env` con secrets
- ❌ Publicar tokens en issues o PRs
- ❌ Compartir `SERVICE_ROLE_KEY` de Supabase
- ❌ Usar tokens de producción en testing local

### ✅ SIEMPRE HACER:

- ✅ Usar `.env.example` como template (sin valores reales)
- ✅ Agregar `.env` al `.gitignore`
- ✅ Rotar tokens comprometidos inmediatamente
- ✅ Usar secrets de organización en GitHub

---

## 🧪 Testing Local

### Configurar `.env` local

```bash
# En social-orchestrator/
cp .env.example .env

# Editar .env con tus valores LOCALES (diferentes a producción)
nano .env
```

**Ejemplo `.env` para testing:**

```env
# === TESTING LOCAL ===
# IMPORTANTE: NO usar los mismos tokens de producción

TELEGRAM_BOT_TOKEN=tu_token_de_prueba
TELEGRAM_CHAT_ID=tu_chat_id

# Webhook de Discord en canal de testing
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/test/xxxxx

# API Keys de desarrollo de Twitter
TWITTER_API_KEY=dev_key
TWITTER_API_SECRET=dev_secret

# Token personal de GitHub (solo para testing)
GITHUB_TOKEN=ghp_testing_xxxxx

# Supabase (mismo proyecto pero con precaución)
SUPABASE_URL=https://tzmrgvtptdtsjcugwqyq.supabase.co
SUPABASE_SERVICE_ROLE_KEY=testing_key
```

---

## 📊 Monitoreo

### Verificaciones históricas de workflows

```bash
# Listar workflows
gh workflow list --repo iberi22/worldexams

# Ver runs recientes
gh run list --repo iberi22/worldexams

# Ver logs de un run específico
gh run view <run-id> --log
```

### Dashboard de Secrets

```bash
# Listar todos los secrets del repo
gh secret list --repo iberi22/worldexams

# Verificar que un secret exista
gh secret list --repo iberi22/worldexams | grep TELEGRAM
```

---

## 🔄 Rotación de Secrets

### Cuando rotar:

- ✅ Cada 90 días (preventivo)
- ✅ Si hay sospecha de compromiso
- ✅ Cuando un colaborador sale del equipo
- ✅ Después de un incidente de seguridad

### Cómo rotar:

1. Generar nuevo token en el servicio (Twitter, GitHub, etc.)
2. Actualizar secret en el entorno operativo actual
3. Las ejecuciones manuales o automatizadas usarán el nuevo automáticamente
4. Revocar token antiguo después de 24h

---

## 📞 Soporte

Si tienes problemas:

1. Verifica que el secret esté donde realmente consume el sistema actual
2. Asegúrate de que el entorno de ejecución tenga acceso al secret
3. Verifica que el nombre del secret sea exacto (case-sensitive)
4. Checa los logs del workflow para errores específicos

---

## 🎯 Checklist Final

Antes de activar los bots en producción:

- [ ] Todos los secrets configurados en el entorno operativo correcto
- [ ] El entorno de ejecución tiene acceso a esos secrets
- [ ] `.env` local configurado para testing
- [ ] `.env` en `.gitignore`
- [ ] El flujo manual o scheduler elegido está verificado
- [ ] Tokens con permisos correctos
- [ ] Webhooks de Discord/Telegram probados
- [ ] GitHub CLI instalado y autenticado
- [ ] Primer test manual exitoso

---

*Documento creado por The Guardian 🛡️*
*Versión: 1.0 | Diciembre 2025*
