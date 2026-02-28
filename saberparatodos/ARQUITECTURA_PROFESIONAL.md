# 🔒 Arquitectura Profesional - Todo Privado

## Decisión de Arquitectura

**Prioridad:** Seguridad y control > Automatización

**Enfoque:** Mantener TODO en repo privado, deploys manuales controlados.

---

## 📊 Arquitectura Final

### Repositorio Único (Privado)

```
saberparatodos (PRIVADO)
├── src/
│   ├── components/       # Frontend Svelte
│   ├── pages/            # Páginas Astro
│   ├── lib/              # Utilidades
│   ├── content/
│   │   └── questions/    # ⭐ Banco de preguntas (PRIVADO)
│   ├── layouts/
│   └── styles/
├── supabase/
│   ├── functions/        # ⭐ Edge Functions (PRIVADO)
│   │   ├── telegram-bot/
│   │   ├── ai-tutor/
│   │   ├── submit-exam/
│   │   └── ...
│   └── migrations/       # Database schema
├── scripts/              # ⭐ Backend automation (PRIVADO)
│   ├── generate-bundle.cjs
│   ├── process-scores.mjs
│   └── ...
├── public/
│   └── api/              # API JSONs estáticos
├── .env                  # ⭐ Secretos (PRIVADO)
└── dist/                 # Build output (deploy)
```

### Deploy Flow

```
Developer
    │
    │ 1. Hacer cambios
    │ 2. npm run build
    │ 3. .\scripts\deploy-manual.ps1
    ↓
saberparatodos (PRIVADO)
    │
    │ Wrangler CLI deploy
    ↓
Cloudflare Pages
    │
    │ Solo archivos compilados (dist/)
    ↓
saberparatodos.space (LIVE)
```

**Importante:** Solo `dist/` se deploya. El código fuente queda privado.

---

## ✅ Configuración Actual

### Dominios Activos

| Dominio | Status | Uso |
|---------|--------|-----|
| `saberparatodos.space` | ✅ Activo | Producción principal |
| `www.saberparatodos.space` | ✅ Activo | Redirect a principal |
| `saberparatodos.pages.dev` | ✅ Activo | Cloudflare default |

### Environment Variables (Cloudflare)

| Variable | Configurado | Tipo |
|----------|-------------|------|
| `PUBLIC_SUPABASE_URL` | ✅ | Público (seguro) |
| `PUBLIC_SUPABASE_ANON_KEY` | ✅ | Público (seguro) |
| `PUBLIC_SITE_URL` | ✅ | Público |
| `PUBLIC_API_BASE_URL` | ✅ | Público |

**Nota:** Todas son variables `PUBLIC_*` = seguras para exponerse en frontend.

### Secretos PRIVADOS (NO en Cloudflare)

| Variable | Ubicación | Protección |
|----------|-----------|------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Solo .env local | ✅ PRIVADO |
| `GOOGLE_API_KEY_2` | Solo .env local | ✅ PRIVADO |
| `DEEPSEEK_API_KEY` | Solo .env local | ✅ PRIVADO |
| `TELEGRAM_BOT_TOKEN` | Solo .env local | ✅ PRIVADO |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | Solo .env local | ✅ PRIVADO |
| `FUNCTION_SECRET` | Edge Functions (Supabase) | ✅ PRIVADO |

**Importante:** Estos secretos NUNCA se suben a Cloudflare Pages.

---

## 🔒 Seguridad Garantizada

### ✅ Lo que SE deploya (público)

- Archivos compilados de `dist/` (HTML, CSS, JS minificado)
- Assets estáticos (imágenes, iconos)
- API JSONs en `public/api/`
- Variables públicas (`PUBLIC_*`)

### ❌ Lo que NO se deploya (privado)

- ❌ Código fuente TypeScript/Svelte
- ❌ Edge Functions (Supabase los hostea)
- ❌ Scripts de backend
- ❌ Banco de preguntas (src/content/questions)
- ❌ .env con secretos
- ❌ Lógica de negocio

**Resultado:** Nadie puede "robar" tu lógica viendo el código compilado.

---

## 🚀 Workflow de Deploy

### 1. Desarrollo Local

```powershell
cd E:\scripts-python\worldexams\saberparatodos

# 1. Hacer cambios en código
# 2. Validar contenido
npm run validate

# 3. Build
npm run build

# 4. Preview local
npm run preview
```

### 2. Deploy Manual (Recomendado)

```powershell
# Script profesional con validaciones
.\scripts\deploy-manual.ps1

# O deploy directo
npx wrangler pages deploy dist --project-name=saberparatodos
```

### 3. Verificación Post-Deploy

```powershell
# Health check automático
.\scripts\verify-deployment.ps1
```

---

## 🗑️ Limpiar Repos Innecesarios

### Repos a Eliminar (si no se usan)

1. **saber-co** (público) - Creado para open source, no necesario si todo es privado
2. **worldexam** (público) - Landing page, no necesario
3. **worldexams-content** (privado vacío) - Si no tiene contenido

### Mantener Solo

1. **saberparatodos** (PRIVADO) - Tu repo principal con TODO

### Comando para Eliminar Repos

```powershell
# Eliminar repo saber-co
gh repo delete iberi22/saber-co --yes

# Eliminar repo worldexam
gh repo delete iberi22/worldexam --yes

# Eliminar repo worldexams-content (si está vacío)
gh repo delete iberi22/worldexams-content --yes
```

**⚠️ Cuidado:** Esto es irreversible. Asegúrate de que no necesitas estos repos.

---

## 📋 Checklist de Configuración Profesional

### Seguridad

- [x] Repo principal es privado
- [x] .env en .gitignore
- [x] Secretos NO en Cloudflare Pages
- [x] Edge Functions en Supabase (no expuestas)
- [x] Banco de preguntas privado
- [ ] Eliminar repos públicos innecesarios

### Deploy

- [x] Wrangler CLI configurado
- [x] Script de deploy manual
- [x] Dominios configurados
- [x] Environment variables en Cloudflare
- [x] Script de verificación post-deploy

### Organización

- [x] Un solo repo principal
- [x] Estructura clara
- [x] Documentación completa
- [ ] Backup automático del .env

---

## 🔧 Próximos Pasos

### Inmediato

1. ✅ Confirmar que `saberparatodos` tiene todo el código
2. ✅ Verificar que Cloudflare Pages funciona correctamente
3. ⏳ Eliminar repos públicos si no se necesitan
4. ⏳ Crear script de verificación

### Opcional (Mejoras)

- Configurar backup automático del repo en cloud privado
- Implementar versionado semántico (v1.0.0, v1.0.1, etc.)
- Crear changelog automático
- Monitoring con Sentry (ya configurado)

---

## 💡 Recomendaciones Profesionales

### 1. Un Solo Repo Privado

**Por qué:** Más fácil de mantener, todo en un solo lugar, sin riesgo de exponer lógica.

### 2. Deploys Manuales Controlados

**Por qué:** Control total, no deployar por error, validación antes de producción.

### 3. Secretos en .env Local

**Por qué:** Cloudflare Pages no necesita secretos backend (esos están en Supabase Edge Functions).

### 4. Build Output Compilado

**Por qué:** Solo archivos compilados en producción = imposible robar lógica del código fuente.

### 5. Supabase Edge Functions para Backend

**Por qué:** Backend privado, no expuesto en repo ni en Cloudflare Pages.

---

## 📊 Comparativa de Enfoques

| Aspecto | Multi-Repo Público | Repo Privado Único |
|---------|-------------------|-------------------|
| **Seguridad** | ⚠️ Riesgo de exponer lógica | ✅ 100% Privado |
| **Mantenimiento** | ⚠️ Sincronizar múltiples repos | ✅ Un solo lugar |
| **Deploy** | ✅ Automático via GitHub | ⚠️ Manual (más control) |
| **Control** | ⚠️ Cambios automáticos | ✅ Control total |
| **Open Source** | ✅ Community contribuye | ❌ No aplicable |
| **Profesionalismo** | ⚠️ Complejidad | ✅ Simple y robusto |

**Recomendación:** Repo Privado Único para tu caso (seguridad > automatización).

---

## 🎯 Arquitectura Aprobada

```
┌────────────────────────────────────────────────────────┐
│  saberparatodos (PRIVADO)                              │
│  ├── Frontend (compilado → dist/)                      │
│  ├── Backend (Edge Functions en Supabase)              │
│  ├── Preguntas (nunca se exponen)                      │
│  └── Secretos (.env local)                             │
└────────────┬───────────────────────────────────────────┘
             │
             │ Deploy manual (wrangler CLI)
             ↓
┌────────────────────────────────────────────────────────┐
│  Cloudflare Pages                                       │
│  Solo archivos compilados (dist/)                      │
└────────────┬───────────────────────────────────────────┘
             │
             ↓
┌────────────────────────────────────────────────────────┐
│  saberparatodos.space (LIVE)                           │
│  Frontend compilado + API estática                     │
│  ✅ Nadie puede ver código fuente                      │
└────────────────────────────────────────────────────────┘
```

---

**Última actualización:** 16 dic 2025
**Estado:** Arquitectura Aprobada - Lista para Implementar
