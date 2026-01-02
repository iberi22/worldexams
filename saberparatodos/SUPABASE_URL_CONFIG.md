# Supabase URL Configuration for saberparatodos

> **🔐 Autenticación:** Esta plataforma usa **únicamente Magic Links** (enlaces mágicos).
> **NO usamos contraseñas** para mayor seguridad y mejor experiencia de usuario.

## Site URL
```
https://saberparatodos.pages.dev/
```

## Redirect URLs (Add all of these)

### Production URLs
```
https://saberparatodos.pages.dev/**
https://saberparatodos.pages.dev/auth/callback
https://saberparatodos.pages.dev/party
```

### Development URLs (for local testing)
```
http://localhost:4321/**
http://localhost:4321/auth/callback
http://127.0.0.1:4321/**
http://127.0.0.1:4321/auth/callback
```

### Cloudflare Preview URLs (optional but recommended)
```
https://*.saberparatodos.pages.dev/**
```

---

## Configuration Steps

1. **Site URL** (Main field at top):
   - Enter: `https://saberparatodos.pages.dev/`
   - Click "Save changes"

2. **Redirect URLs** (Bottom section):
   - Click "Add URL" for each of the URLs above
   - For production, minimum required:
     - `https://saberparatodos.pages.dev/**`
   - For development:
     - `http://localhost:4321/**`
   - Click "Save" after adding each URL

---

## Explanation

### Why these URLs?

- **`https://saberparatodos.pages.dev/**`** (wildcard)
  - Allows redirects to any page on your domain
  - Covers login, signup, party mode, etc.

- **`http://localhost:4321/**`**
  - For local development with Astro dev server
  - Port 4321 is Astro's default

- **`https://*.saberparatodos.pages.dev/**`**
  - 🔐 Magic Link Flow (Passwordless Authentication)

**Registro de usuario:**
1. Usuario ingresa su email en `/register`
2. Supabase envía magic link al correo
3. Usuario hace clic en el enlace → redirige a la app
4. Usuario queda autenticado automáticamente ✅

**Inicio de sesión:**
1. Usuario ingresa su email en `/` (Login.svelte)
2. Supabase envía magic link al correo
3. Usuario hace clic en el enlace → redirige a la app
4. Usuario queda autenticado automáticamente ✅

**¿Por qué sin contraseñas?**
- ✅ Mayor seguridad (sin riesgo de contraseñas débiles o robadas)
- ✅ Mejor UX (sin necesidad de recordar contraseñas)
- ✅ Sin flujo de "olvidé mi contraseña"
- ✅ Protección contra ataques de fuerza brutank to email
3. User clicks link → redirects to your app
4. Redirect URL must be in the allow list
5. User is authenticated ✅

---

## Current Configuration Screenshot

Based on your screenshot, you need to:

1. **Site URL field** should have: `https://saberparatodos.pages.dev/`
2. Click **"Add URL"** button in Redirect URLs section
3. Add each URL from the list above

---

## Quick Copy-Paste

For the Redirect URLs section, add these one by one:

```
https://saberparatodos.pages.dev/**
http://localhost:4321/**
```

That's the minimum. For more security and preview environments, add all the URLs listed above.

---

## After Saving

1. Click "Save changes" (green button)
2. Wait 1-2 minutes for changes to propagate
3. Test login at: https://saberparatodos.pages.dev
4. Verify magic link works correctly

---

*Last Updated: 2025-12-13*
