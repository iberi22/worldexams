# 🔍 Verificación de Variables de Cloudflare

## ❌ Problema Encontrado

La variable `PUBLIC_SUPABASE_URL` tiene un **signo `=` al inicio** del valor:

```
❌ Incorrecto: =https://tzmrgvtptdtsjcugwqyq.supabase.co
✅ Correcto:   https://tzmrgvtptdtsjcugwqyq.supabase.co
```

Esto causa que Supabase no pueda conectarse correctamente.

---

## 🔧 Corrección Inmediata

### Paso 1: Editar la Variable

1. Ve a: https://dash.cloudflare.com/
2. Workers & Pages > **saberparatodos** > **Settings** > **Environment variables**
3. Encuentra la fila: `PUBLIC_SUPABASE_URL`
4. Click en el **ícono de editar** (lápiz) ✏️
5. **Borra el `=` al inicio del valor**
6. El valor debe quedar: `https://tzmrgvtptdtsjcugwqyq.supabase.co`
7. Click **"Save"**

### Paso 2: Aplicar a Preview También

Si configuraste Preview environment, repite el proceso:
1. Cambia el dropdown de **"Production"** a **"Preview"**
2. Edita `PUBLIC_SUPABASE_URL` de la misma forma
3. Borra el `=` al inicio

---

## ✅ Estado de las Variables

| Variable | Estado | Valor Esperado |
|----------|--------|----------------|
| `PUBLIC_SUPABASE_URL` | ❌ **ERROR** (tiene `=` al inicio) | `https://tzmrgvtptdtsjcugwqyq.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | ✅ Correcto | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `PUBLIC_API_BASE_URL` | ✅ Correcto | `https://saberparatodos.pages.dev/api/v1` |
| `PUBLIC_SITE_URL` | ✅ Correcto | `https://saberparatodos.pages.dev` |

---

## 🚀 Después de Corregir

### 1. Retry Deployment

1. Ve a: **Deployments** (pestaña principal)
2. Click en **"..."** (tres puntos) del deployment más reciente
3. Selecciona: **"Retry deployment"**
4. ✅ **Marca**: **"Clear build cache and retry"**
5. Click **"Retry deployment"**

### 2. Monitorear el Build

El build debería completarse exitosamente ahora:

```
✓ Build succeeded
✓ Deploying...
✓ Deployment complete
```

### 3. Verificar el Sitio

Una vez deployado, prueba:

- **URL:** https://saberparatodos.pages.dev
- ✅ El login debería funcionar
- ✅ Party Mode accesible en `/party`
- ✅ No más errores de autenticación

---

## 🐛 Si Persiste el Error

Si después de corregir el `=` aún hay problemas:

### Verificar en la Consola del Navegador

1. Abre https://saberparatodos.pages.dev
2. Presiona `F12` (DevTools)
3. Ve a la pestaña **Console**
4. Busca errores relacionados con Supabase

### Posibles Errores:

**Error:** `Invalid Supabase URL`
- Verifica que la variable no tenga espacios al inicio/final
- Debe ser exactamente: `https://tzmrgvtptdtsjcugwqyq.supabase.co`

**Error:** `Invalid API key`
- Verifica que `PUBLIC_SUPABASE_ANON_KEY` sea el JWT completo
- Debe empezar con: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.`

---

## 📝 Checklist de Verificación

- [ ] Edité `PUBLIC_SUPABASE_URL` en **Production**
- [ ] Borré el `=` al inicio del valor
- [ ] (Opcional) Edité `PUBLIC_SUPABASE_URL` en **Preview**
- [ ] Guardé los cambios
- [ ] Hice "Retry deployment" con "Clear build cache"
- [ ] El build completó exitosamente
- [ ] El sitio carga en https://saberparatodos.pages.dev
- [ ] El login funciona correctamente
- [ ] Party Mode está accesible

---

## 📊 Comandos de Verificación (Opcional)

Después del deployment, puedes verificar:

```powershell
# Ver el último deployment
npx wrangler pages deployment list --project-name=saberparatodos

# Ver logs en tiempo real (si hay errores)
npx wrangler pages deployment tail --project-name=saberparatodos
```

---

*Última verificación: 2025-12-13 14:58 UTC*
