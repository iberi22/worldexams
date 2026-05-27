# Dev Deploy — Probar cambios localmente (BELA)

Este documento explica cómo ejecutar un **deploy de desarrollo** para probar los cambios más recientes de `saberparatodos` sin tocar producción.

---

## Requisitos

- Node.js ≥ 20 (recomendado 22 LTS)
- npm ≥ 10
- PowerShell ≥ 7.2 (Windows) o `pwsh`
- Cloudflare `wrangler` CLI (solo si haces deploy a preview remoto)

---

## Modos de deploy

| Modo | Comando | Qué hace |
|------|---------|----------|
| **Local** (default) | `.\scripts\dev-deploy.ps1` | Build + `astro preview` en `http://localhost:4321` |
| **Preview remoto** | `.\scripts\dev-deploy.ps1 -Target preview` | Build + deploy a Workers dev con subdominio temporal |

---

### 1. Deploy local (recomendado para iteración rápida)

```powershell
# Desde la raíz del repo (E:\scripts-python\worldexams)
.\scripts\dev-deploy.ps1
```

El script:
1. Verifica que no haya cambios sin commit (o usa `-Force` para saltarlo).
2. Corre `npm run build:saberparatodos`.
3. Levanta `astro preview` en `http://localhost:4321` con variables de entorno de **desarrollo** (`.env.development`).

> **No usa variables de producción.** `PUBLIC_SITE_URL` apunta a `localhost` y las credenciales de Supabase son las de dev (compartidas, read-only).

#### Probar después de levantar

Abre en navegador:
- **Home:** `http://localhost:4321`
- **Guía Colombia:** `http://localhost:4321/guia-examen?country=co`
- **API local:** `http://localhost:4321/api/questions?country=co&exam=saber11&grade=11&subject=matematicas&page=1`

Para detener: `Ctrl + C` en la terminal.

---

### 2. Deploy a Cloudflare Preview (para compartir URL)

```powershell
.\scripts\dev-deploy.ps1 -Target preview
```

Te pedirá tu **subdominio de Cloudflare Workers** (ej: `tu-cuenta`) y generará una URL como:

```
https://saberparatodos-dev-main.tu-cuenta.workers.dev
```

Este worker usa:
- `workers_dev = true` (sin rutas de producción).
- Variables de entorno de preview, no las de producción.
- Un nombre de proyecto único basado en la rama Git.

> **Nunca toca** `saberparatodos.space` ni rutas de producción.

---

## Variables de entorno de desarrollo

Las variables se cargan desde `saberparatodos/.env.development`:

| Variable | Valor dev |
|----------|-----------|
| `PUBLIC_SITE_URL` | `http://localhost:4321` |
| `PUBLIC_API_BASE_URL` | `http://localhost:4321/api` |
| `PUBLIC_SUPABASE_URL` | *(misma que prod, read-only dev DB)* |
| `PUBLIC_SUPABASE_ANON_KEY` | *(misma que prod, read-only dev DB)* |

> Si necesitas apuntar a otra instancia de Supabase para dev, edita `saberparatodos/.env.development` pero **no lo commiteeas** con secretos reales.

---

## Solución de problemas

### "Uncommitted changes detected"
Haz commit o stash de tus cambios antes de correr el script, o usa:
```powershell
.\scripts\dev-deploy.ps1 -Force
```

### Build falla
```powershell
# Limpieza completa
npm ci
npm run build:saberparatodos
```

### Puerto ocupado
```powershell
.\scripts\dev-deploy.ps1 -Port 3000
```

### Wrangler no está logueado
```powershell
npx wrangler login
```

---

## Flujo recomendado para BELA

1. Hacer cambios en `saberparatodos/src/...`
2. Commit: `git add -A && git commit -m "feat: ..."`
3. Correr: `.\scripts\dev-deploy.ps1`
4. Probar en `http://localhost:4321`
5. Si todo OK → `git push` y abrir PR.

---

*Última actualización: 2026-05-26*
