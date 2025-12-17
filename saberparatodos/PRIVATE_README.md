# 🔒 Saberparatodos - Backend Privado

> **⚠️ REPOSITORIO PRIVADO** - Contiene configuración sensible y lógica de negocio

Este es el backend privado de **Saber Para Todos** (Colombia) para la organización World Exams.

## 🏗️ Arquitectura

```text
world-exams/
├── saberparatodos (PRIVADO) ← Este repo
│   ├── API endpoints (/src/pages/api/)
│   ├── Question bundles (259 bundles, 1,813 preguntas)
│   ├── Supabase config (migrations, edge functions)
│   └── Secrets (.env, wrangler.toml)
│
└── saber-co (PÚBLICO)
    └── Frontend UI (consume API de saberparatodos)
```

## 📦 Contenido

### API de Preguntas

**Endpoint:** `https://saberparatodos.pages.dev/api/[country]/[exam]/[grade]/[subject]/[page].json`

Ejemplo:
```
GET /api/colombia/saber/11/matematicas/1.json
```

Retorna:
```json
{
  "questions": [...],
  "metadata": { "total": 1813, "page": 1, "perPage": 50 }
}
```

### Banco de Preguntas

**Ubicación:** `src/content/questions/colombia/`

**Formato:** Protocol v2.0 (bundles de 7 preguntas)

**Estructura:**
```
src/content/questions/colombia/
├── matematicas/
│   ├── grado-11/
│   │   ├── CO-MAT-11-algebra-001-bundle.md (7 questions)
│   │   ├── CO-MAT-11-derivadas-001-bundle.md
│   │   └── ...
│   ├── grado-9/
│   ├── grado-7/
│   ├── grado-5/
│   └── grado-3/
├── lectura-critica/
├── ciencias-naturales/
├── sociales-ciudadanas/
└── ingles/
```

**Total:** 259 bundles × 7 preguntas = **1,813 preguntas**

### Supabase

**Base de datos compartida** con todos los países de World Exams.

**Tablas principales:**
- `questions_global` - Preguntas sincronizadas entre países
- `exam_results` - Resultados de exámenes (filtrado por `country_code='CO'`)
- `leaderboard_submissions` - Rankings (filtrado por `country_code='CO'`)
- `country_config` - Configuración de Colombia

**Edge Functions:**
- `telegram-bot` - Bot de Telegram para práctica
- `ai-tutor` - Tutor con IA (Deepseek)
- `submit-exam` - Envío de resultados
- `submit-leaderboard-score` - Envío de puntajes

**Migraciones:** `supabase/migrations/`

### Deployment (Cloudflare Pages)

**URL:** https://saberparatodos.pages.dev

**Configuración:** `wrangler.toml`

**Secrets (configurar en Cloudflare):**
```bash
npx wrangler pages secret put PUBLIC_SUPABASE_URL
npx wrangler pages secret put PUBLIC_SUPABASE_ANON_KEY
npx wrangler pages secret put COUNTRY_CODE
```

**Deploy manual:**
```bash
npm run build
npx wrangler pages deploy dist
```

**Deploy automático:** GitHub Actions (`.github/workflows/deploy-cloudflare.yml`)

## 🔐 Variables de Entorno

**`.env.example`** (plantilla para desarrollo local):
```env
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
COUNTRY_CODE=CO
```

**⚠️ NUNCA commitear:**
- `.env` con valores reales
- `SUPABASE_SERVICE_ROLE_KEY` (solo en org secrets)
- Tokens de Telegram, API keys

## 🚀 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Desarrollo (localhost:4321)
npm run dev

# Build
npm run build

# Preview del build
npm run preview

# Validar formato de preguntas
npm run validate
```

## 📝 Scripts

| Script | Descripción |
|--------|-------------|
| `scripts/generate-bundle.cjs` | Generar nuevo bundle de preguntas |
| `scripts/validate_content.js` | Validar formato de bundles |
| `scripts/update-leaderboards.mjs` | Actualizar rankings |
| `scripts/process-scores.mjs` | Procesar puntajes |

## 🎯 Roles de IA (AGENTS.md)

Este repo sigue las reglas de `AGENTS.md`:

- **🏗️ The Architect** - Supabase, schema, edge functions
- **🤖 The Generator** - Contenido de preguntas
- **🛡️ The Guardian** - Seguridad, RLS, secrets
- **📚 The Librarian** - Organización de archivos
- **🔄 The Synchronizer** - Deploy, webhooks, CI/CD

## 🌐 Multi-País

Este backend comparte base de datos con:
- 🇲🇽 México (exani-mx)
- 🇧🇷 Brasil (enem-br)
- 🇺🇸 USA (sat-us)
- 🇦🇷 Argentina (ingreso-ar)
- 🇨🇱 Chile (paes-cl)
- 🇵🇪 Perú (admision-pe)

**Filtrado crítico:** Siempre usar `country_code = 'CO'` en queries.

## 📚 Documentación

- `PLANNING.md` - Arquitectura del proyecto
- `TASK.md` - Tareas pendientes/completadas
- `docs/QUESTION_GENERATION_PROTOCOL_V2.md` - Protocol v2.0
- `docs/SUPABASE_SECRETS_SETUP.md` - Setup de Supabase
- `docs/SCRIPTS_GUIDE.md` - Guía de scripts

## 🔗 Enlaces

- **Landing:** https://world-exams.github.io
- **API:** https://saberparatodos.pages.dev/api/
- **Supabase:** https://supabase.com/dashboard/project/xxx
- **Cloudflare:** https://dash.cloudflare.com/

## ⚠️ Seguridad

**NO exponer:**
- `SUPABASE_SERVICE_ROLE_KEY`
- Tokens de Telegram
- API keys de terceros
- Configuración de producción

**SÍ exponer (público):**
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (protegido por RLS)
- `COUNTRY_CODE`

---

**Organización:** [World Exams](https://github.com/world-exams)  
**Licencia:** MIT (código) | CC BY-SA 4.0 (preguntas)
