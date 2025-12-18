# 🚀 Guía Rápida: Deploy de Middleware a saberparatodos.space

> **Fecha:** 17 de diciembre de 2025
> **Estado:** ✅ Archivos listos, falta deploy

---

## ✅ Lo que ya está hecho:

1. ✅ **API sincronizada:** `public/api/` tiene 364 preguntas actualizadas
2. ✅ **Middleware creado:** `functions/_middleware.ts` (protección y cuotas)
3. ✅ **Dependencies actualizadas:** `@cloudflare/workers-types` agregada
4. ✅ **wrangler.toml configurado**

---

## 📋 Pasos para Deploy

### 1️⃣ Instalar Dependencias

```powershell
cd saberparatodos
npm install
```

**Verifica que se instale:**
- ✅ `@cloudflare/workers-types@4.20240529.0`

### 2️⃣ Configurar Variables de Entorno en Cloudflare

**Ir a:** https://dash.cloudflare.com/

1. **Seleccionar cuenta** → **Pages**
2. **Buscar proyecto:** `saberparatodos`
3. **Settings** → **Environment variables**
4. **Add variable (Production):**

   ```
   Name: SUPABASE_URL
   Value: https://tzmrgvtptdtsjcugwqyq.supabase.co
   ```

5. **Add variable (Production):**

   ```
   Name: SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bXJndnRwdGR0c2pjdWd3cXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2OTE1MjcsImV4cCI6MjA0NzI2NzUyN30.i4PN7AvKATSS1FZKsKyeMaHBjPd1xY7FWFcqDmfSqLs
   ```

6. **Apply to:**
   - [x] Production
   - [x] Preview

7. **Save**

### 3️⃣ Deploy a Cloudflare Pages

**Opción A: Via GitHub (Automático - Recomendado)**

```powershell
# Commit los cambios
git add saberparatodos/functions/_middleware.ts
git add saberparatodos/package.json
git add saberparatodos/wrangler.toml
git commit -m "feat: add API middleware with authentication and quotas"
git push origin main
```

**GitHub Actions** automáticamente:
1. Build Astro
2. Copia API con `copy-api.ps1`
3. Deploy a Cloudflare Pages
4. Middleware se activa automáticamente

**Opción B: Deploy Manual**

```powershell
cd saberparatodos

# Build
npm run build

# Deploy con Wrangler
npx wrangler pages deploy dist --project-name=saberparatodos
```

### 4️⃣ Verificar Deployment

**Test 1: Acceso público desde mismo dominio (sin API key)**

```bash
curl https://saberparatodos.space/api/co/icfes/11/matematicas/index.json
```

**Esperado:**
```json
{
  "total_questions": 364,
  "pages": [...],
  "subject": "Matemáticas"
}
```

**Test 2: Acceso externo sin API key (debe fallar)**

```bash
curl -H "Origin: https://external-site.com" \
  https://saberparatodos.space/api/co/icfes/11/matematicas/1.json
```

**Esperado:**
```json
{
  "error": "Unauthorized",
  "message": "Access from external origins requires a valid 'x-api-key' header."
}
```

**Test 3: Acceso externo con API key válida**

```bash
curl -H "Origin: https://external-site.com" \
     -H "x-api-key: saberparatodos-dev-2024" \
  https://saberparatodos.space/api/co/icfes/11/matematicas/1.json
```

**Esperado:** JSON completo con preguntas

---

## 🎯 Próximos Pasos Después del Deploy

### Inmediato:

- [ ] **Verificar que app carga preguntas** (abrir https://saberparatodos.space)
- [ ] **Revisar logs en Cloudflare** (Dashboard → Pages → saberparatodos → Logs)
- [ ] **Test con navegador:** Abrir DevTools Console y verificar:
  ```
  ✅ Loaded 6 subjects
  📦 Found 100 cached questions
  ✅ Exam Ready: 5 questions
  ```

### Esta Semana:

- [ ] **Eliminar API externa** (worldexams-api.pages.dev ya no necesario)
- [ ] **Crear página `/api/register`** para que clientes generen API keys
- [ ] **Documentar endpoints** en `/docs/api`

### Próximo Mes:

- [ ] **Sistema de pagos** (Stripe) para venta de API keys
- [ ] **Dashboard de clientes** (`/dashboard`) con uso y cuotas
- [ ] **Email automatizado** (bienvenida, alertas de cuota)

---

## 🐛 Troubleshooting

### Error: "Module not found: @supabase/supabase-js"

**Solución:**
```powershell
cd saberparatodos
npm install @supabase/supabase-js@latest
npm install @cloudflare/workers-types@latest
```

### Error: "SUPABASE_URL is undefined"

**Solución:**
- Verificar que las variables estén configuradas en Cloudflare Dashboard
- Hacer re-deploy: `npx wrangler pages deploy dist`

### App no carga preguntas

**Diagnóstico:**
1. Abrir DevTools → Console
2. Buscar errores en fetch a `/api/`
3. Verificar que `copy-api.ps1` se ejecutó en prebuild

**Solución:**
```powershell
# Re-sincronizar API manualmente
pwsh -File scripts/copy-api.ps1

# Re-build
npm run build
```

### Cache antiguo en navegador

**Solución:**
1. Hard refresh: `Ctrl + Shift + R` (Windows) o `Cmd + Shift + R` (Mac)
2. Limpiar cache de navegador
3. O agregar cache-busting: `?t=${Date.now()}` en fetch (ya implementado)

---

## 📊 Comparación: Antes vs Después del Deploy

| Aspecto | Antes | Después |
|---------|-------|---------|
| **API Endpoint** | `worldexams-api.pages.dev/v1` | `saberparatodos.space/api` |
| **CORS** | ⚠️ Requiere config | ✅ Sin problemas (mismo dominio) |
| **Auth para usuarios** | ❌ No | ✅ Opcional (mismo origen = libre) |
| **Auth para terceros** | ✅ Sí | ✅ Sí (x-api-key) |
| **Sincronización** | ⚠️ Manual | ✅ Automática (prebuild) |
| **Mantenimiento** | 2 deployments | 1 deployment |
| **Monetización** | ⚠️ Complejo | ✅ Directo (saberparatodos.space/api/register) |

---

## ✅ Checklist Final

### Pre-Deploy:
- [x] `functions/_middleware.ts` creado
- [x] `package.json` actualizado con workers-types
- [x] `wrangler.toml` configurado
- [x] `public/api/` sincronizada (364 preguntas)
- [ ] Variables de entorno en Cloudflare Dashboard

### Deploy:
- [ ] `npm install` ejecutado
- [ ] `npm run build` exitoso
- [ ] Deploy a Cloudflare (GitHub Actions o manual)
- [ ] Verificación de endpoints

### Post-Deploy:
- [ ] App carga preguntas correctamente
- [ ] Middleware protege endpoints externos
- [ ] Logs de Cloudflare sin errores
- [ ] Documentación actualizada

---

## 🚀 Comando de Deploy (Todo en Uno)

```powershell
# Desde saberparatodos/
npm install && npm run build && npx wrangler pages deploy dist --project-name=saberparatodos
```

**Tiempo estimado:** 2-3 minutos

---

**¿Necesitas ayuda con algún paso específico?** 🎯
