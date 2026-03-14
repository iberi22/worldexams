# 🔐 Autenticación con Magic Links - World Exams

> **Decisión de Diseño:** Esta plataforma usa **únicamente Magic Links** para autenticación.
> **NO usamos contraseñas** en ninguna parte del sistema.

---

## 📋 Resumen

**Magic Links** (enlaces mágicos) son una forma de autenticación sin contraseña donde los usuarios reciben un enlace único en su correo que les permite iniciar sesión automáticamente.

### Ventajas vs Contraseñas:

| Aspecto | Magic Links ✅ | Contraseñas ❌ |
|---------|---------------|---------------|
| **Seguridad** | No hay contraseñas que robar | Riesgo de contraseñas débiles |
| **UX** | 1 clic en el email | Recordar contraseña |
| **Mantenimiento** | Sin "olvidé mi contraseña" | Flujo de recuperación complejo |
| **Ataques** | Inmune a fuerza bruta | Vulnerable a diccionarios |
| **Phishing** | Enlace único de un solo uso | Contraseña reutilizable |

---

## 🛠️ Implementación Actual

### Archivos Clave:

```
saberparatodos/
├── src/
│   ├── components/
│   │   └── Login.svelte              # Login con Magic Link
│   ├── pages/
│   │   └── register.astro            # Registro con Magic Link
│   └── lib/
│       ├── supabase.ts               # Cliente Supabase
│       └── auth.ts                   # Funciones de auth (GitHub OAuth)
└── SUPABASE_URL_CONFIG.md            # Configuración de URLs
```

---

## 📝 Flujos de Usuario

### 1. Registro (Nuevo Usuario)

**Frontend:** `saberparatodos/src/pages/register.astro`

```typescript
// Usuario ingresa email y nombre
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'estudiante@ejemplo.com',
  options: {
    emailRedirectTo: window.location.origin,
    data: {
      full_name: 'Juan Pérez'
    }
  }
});

// ✅ Magic Link enviado al correo
```

**Backend:** Supabase Auth maneja todo automáticamente:
1. Genera token único de un solo uso
2. Envía email con enlace (usando template de Supabase)
3. Token expira en 1 hora (configurable)

### 2. Inicio de Sesión (Usuario Existente)

**Frontend:** `saberparatodos/src/components/Login.svelte`

```typescript
// Usuario ingresa email
const { error } = await supabase.auth.signInWithOtp({
  email: 'estudiante@ejemplo.com',
  options: {
    emailRedirectTo: window.location.origin,
  }
});

// ✅ Magic Link enviado al correo
```

**Diferencia con registro:**
- Mismo método: `signInWithOtp()`
- Si el usuario ya existe → login
- Si el usuario no existe → signup automático (configurable)

### 3. Verificación de Enlace

Cuando el usuario hace clic en el enlace del correo:

```
https://saberparatodos.pages.dev/auth/confirm?token_hash=xxx&type=email
```

**Supabase Auth hace:**
1. Valida el token_hash
2. Crea/actualiza la sesión del usuario
3. Redirige a la app (según `emailRedirectTo`)
4. Usuario queda autenticado ✅

---

## ⚙️ Configuración de Supabase

### Dashboard → Authentication → Providers → Email

**Configuración requerida:**

| Setting | Valor | Descripción |
|---------|-------|-------------|
| **Enable Email Provider** | ✅ ON | Permite auth por email |
| **Confirm Email** | ✅ ON | Requiere verificación de email |
| **Enable Signup** | ✅ ON | Permite crear nuevas cuentas |
| **Double Confirm Email Changes** | ✅ ON | Seguridad al cambiar email |
| **Secure Email Change** | ✅ ON | Confirmar email antiguo y nuevo |
| **Enable Password Signup** | ❌ OFF | **IMPORTANTE: Deshabilitado** |

### Templates de Email

**Dashboard → Authentication → Email Templates**

Personalizar:
- **Magic Link** template (usado en login/signup)
- Asunto: "Tu enlace de acceso a SaberParaTodos"
- Contenido: Link + código de 6 dígitos (fallback)

---

## 🔗 URLs de Redirect

**Dashboard → Authentication → URL Configuration**

### Site URL:
```
https://saberparatodos.pages.dev/
```

### Redirect URLs:
```
# Producción
https://saberparatodos.pages.dev/**

# Desarrollo local
http://localhost:4321/**
http://127.0.0.1:4321/**

# Preview deployments (Cloudflare)
https://*.saberparatodos.pages.dev/**
```

**⚠️ IMPORTANTE:** Sin estas URLs configuradas, los Magic Links no funcionarán.

---

## 🧪 Testing

### Local Development:

1. **Iniciar servidor:**
```powershell
cd saberparatodos
npm run dev
```

2. **Probar registro:**
   - Ir a `http://localhost:4321/register`
   - Ingresar email de prueba
   - Revisar consola de Supabase o email real
   - Hacer clic en el enlace

3. **Probar login:**
   - Ir a `http://localhost:4321/`
   - Clic en "Ingresar"
   - Ingresar email
   - Hacer clic en enlace del correo

### Verificar en Supabase:

**Dashboard → Authentication → Users**
- Ver usuarios creados
- Verificar `email_confirmed_at` (debe tener timestamp)
- Ver `last_sign_in_at`

---

## 🚨 Problemas Comunes

### Error: "Invalid Redirect URL"

**Causa:** URL de la app no está en la lista de Redirect URLs

**Solución:**
1. Ir a Dashboard → Authentication → URL Configuration
2. Agregar la URL exacta (ej: `https://saberparatodos.pages.dev/**`)
3. Esperar 1-2 minutos para propagación

### Magic Link no llega

**Verificar:**
1. ✅ Email Provider habilitado en Supabase
2. ✅ Email correcto en el formulario
3. ✅ Revisar carpeta de spam
4. ✅ Límite de rate (1 enlace cada 60 segundos por default)

**Ver logs:**
Dashboard → Logs → Auth Logs

### Usuario no se crea

**Causa:** `shouldCreateUser: false` en options

**Solución:**
```typescript
await supabase.auth.signInWithOtp({
  email,
  options: {
    shouldCreateUser: true, // ✅ Permitir crear usuario
  }
});
```

---

## 🔒 Seguridad

### Tokens de Magic Link:

- **Único:** Cada enlace es diferente
- **Un solo uso:** Después de usarlo, se invalida
- **Expiracion:** 1 hora por defecto (configurable)
- **HTTPS only:** No funciona sin SSL

### Rate Limiting:

**Default en Supabase:**
- 1 Magic Link cada 60 segundos por email
- Configurable en Dashboard → Authentication → Rate Limits

### Best Practices:

✅ **Hacer:**
- Usar HTTPS en producción
- Configurar redirect URLs específicas (no `*`)
- Personalizar templates de email con branding
- Implementar CAPTCHA si hay spam

❌ **No hacer:**
- No usar Magic Links en apps nativas (usar OAuth)
- No deshabilitar "Confirm Email"
- No usar dominios genéricos en redirect

---

## 📚 Referencias

- [Supabase Passwordless Docs](https://supabase.com/docs/guides/auth/auth-email-passwordless)
- [Magic Link Best Practices](https://supabase.com/docs/guides/auth/auth-magic-link)
- [Configuración de URLs](../saberparatodos/SUPABASE_URL_CONFIG.md)

---

## 🎯 Próximos Pasos

### OAuth Providers Adicionales:

Además de Magic Links, también soportamos:
- ✅ **GitHub OAuth** (para desarrolladores)
- 🔜 Google OAuth (planeado)
- 🔜 Apple OAuth (planeado)

Ver: `saberparatodos/src/lib/auth.ts`

---

*Última actualización: 2026-01-01*
*Versión del protocolo: 1.0*
