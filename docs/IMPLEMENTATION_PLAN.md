# 🚀 Plan de Implementación: Arquitectura Dual Repo

**Objetivo:** Migrar de mono-repo a arquitectura público/privado usando GitHub como backend de contenido.

**Duración:** 7 días
**Costo:** $0 (GitHub Free)
**Rentabilidad esperada:** Mes 3 ($640 MRR)

---

## ✅ Checklist de Validación Pre-Implementación

Antes de ejecutar, verificar:

- [ ] Backup completo del repo actual (`git clone --mirror`)
- [ ] Branch de trabajo creado (`git checkout -b feat/dual-repo-architecture`)
- [ ] PowerShell 7+ instalado (`$PSVersionTable.PSVersion`)
- [ ] GitHub CLI instalado (`gh --version`)
- [ ] Cloudflare Pages cuenta activa
- [ ] Personal Access Token de GitHub creado (scope: `repo`)

---

## 📅 Día 1: Separación de Contenido

### Paso 1.1: Ejecutar Script de Separación

```powershell
# Desde raíz del proyecto
cd e:\scripts-python\worldexams

# Ejecutar script
.\scripts\split-questions.ps1
```

**Salida esperada:**
```
📦 Encontrados ~150 archivos bundle
✅ CO-MAT-11-algebra-001-bundle.md
✅ MX-CIV-11-poderes-001-bundle.md
...
📊 Resumen:
   Total bundles procesados: 150
   Archivos PUBLIC creados:  150
   Archivos PREMIUM creados: 150
   Errores:                  0
```

### Paso 1.2: Validar Separación

```powershell
# Verificar que PUBLIC solo tiene v1
$publicFiles = Get-ChildItem -Path "src/content/questions" -Filter "*-PUBLIC.md" -Recurse
Write-Host "Archivos PUBLIC creados: $($publicFiles.Count)"

# Verificar que PREMIUM tiene v2-v7
$premiumFiles = Get-ChildItem -Path "temp/premium-questions" -Filter "*-PREMIUM.md" -Recurse
Write-Host "Archivos PREMIUM creados: $($premiumFiles.Count)"

# Deben ser iguales
if ($publicFiles.Count -eq $premiumFiles.Count) {
    Write-Host "✅ Validación exitosa" -ForegroundColor Green
} else {
    Write-Host "❌ Error: Desbalance de archivos" -ForegroundColor Red
}
```

### Paso 1.3: Revisar Manualmente Muestra

```powershell
# Ver ejemplo de archivo PUBLIC
Get-Content "src/content/questions/colombia/sociales-ciudadanas/grado-11/CO-SOC-11-CIU-001-PUBLIC.md" | head -50

# Ver ejemplo de archivo PREMIUM
Get-Content "temp/premium-questions/colombia/sociales-ciudadanas/grado-11/CO-SOC-11-CIU-001-PREMIUM.md" | head -50
```

**Validar que:**
- ✅ PUBLIC solo tiene "## Pregunta 1" (v1)
- ✅ PUBLIC tiene disclaimer al final con link a /instituciones
- ✅ PREMIUM tiene "## Pregunta 2" a "## Pregunta 7" (v2-v7)
- ✅ PREMIUM tiene frontmatter con `license: "Proprietary"`

---

## 📅 Día 2: Crear Repositorio Privado

### Paso 2.1: Crear Repo en GitHub

```powershell
# Autenticarse con GitHub CLI
gh auth login

# Crear repo privado
gh repo create iberi22/worldexams-premium `
  --private `
  --description "Premium questions (v2-v7) for World Exams - Proprietary content" `
  --clone
```

### Paso 2.2: Poblar Repo Privado

```powershell
# Navegar al repo clonado
cd worldexams-premium/

# Copiar contenido premium
Copy-Item -Path "..\worldexams\temp\premium-questions\*" -Destination "questions\" -Recurse

# Crear README.md
@"
# World Exams - Premium Questions

**Licencia:** Propietaria (World Exams Inc.)
**Acceso:** Solo para instituciones con suscripción activa

## Contenido

Este repositorio contiene las **preguntas premium (v2-v7)** generadas por IA con contexto cultural local.

### Estructura

\`\`\`
questions/
  colombia/
    matematicas/grado-11/algebra/
      CO-MAT-11-algebra-001-PREMIUM.md  (v2-v7)
  mexico/
    civismo/grado-11/
      MX-CIV-11-poderes-001-PREMIUM.md  (v2-v7)
  ...
\`\`\`

## Seguridad

- ⚠️ **NO** hacer fork público
- ⚠️ **NO** compartir fuera del equipo autorizado
- ⚠️ Solo usar Personal Access Tokens (PAT) con scope \`repo\` (read-only)

## Acceso

Solo miembros del equipo con rol **Contributor** pueden leer.
Para agregar colaboradores: Settings → Collaborators and teams

---

*Repo privado - Confidencial*
"@ | Out-File -FilePath "README.md" -Encoding UTF8

# Crear .gitignore
@"
# Node
node_modules/

# OS
.DS_Store
Thumbs.db

# Backups
*.bak
*~
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8

# Commit inicial
git add .
git commit -m "feat: Initial import of premium questions (v2-v7)"
git push -u origin main
```

### Paso 2.3: Validar Repo Privado

```powershell
# Verificar que es privado
gh repo view iberi22/worldexams-premium --json isPrivate --jq '.isPrivate'
# Debe mostrar: true

# Verificar tamaño
cd worldexams-premium/
du -sh .git
# Debe ser <100MB
```

---

## 📅 Día 3: Configurar Submodules

### Paso 3.1: Agregar Submodule en Saberparatodos

```powershell
cd e:\scripts-python\worldexams\saberparatodos\

# Agregar submodule
git submodule add https://github.com/iberi22/worldexams-premium.git src/content/questions-premium

# Verificar
cat .gitmodules
# Debe mostrar:
# [submodule "src/content/questions-premium"]
#   path = src/content/questions-premium
#   url = https://github.com/iberi22/worldexams-premium.git
```

### Paso 3.2: Configurar Autenticación

```powershell
# Crear Personal Access Token en GitHub
# https://github.com/settings/tokens/new
# Scopes: repo (Full control of private repositories)

# Guardar token en .env (NO COMMITEAR)
@"
GITHUB_PREMIUM_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxx
"@ | Out-File -FilePath ".env" -Encoding UTF8 -Append

# Verificar que .env está en .gitignore
cat ..\.gitignore | grep ".env"
```

### Paso 3.3: Probar Clonación Automática

```powershell
# Simular clonación limpia (como lo hace Cloudflare)
cd ..
Remove-Item -Recurse -Force "saberparatodos/src/content/questions-premium"

# Clonar con autenticación
cd saberparatodos/
git submodule update --init --recursive --remote

# Validar
if (Test-Path "src/content/questions-premium/questions") {
    Write-Host "✅ Submodule clonado exitosamente" -ForegroundColor Green
} else {
    Write-Host "❌ Error al clonar submodule" -ForegroundColor Red
}
```

---

## 📅 Día 4: Actualizar Configuración Build

### Paso 4.1: Modificar astro.config.mjs

```javascript
// saberparatodos/astro.config.mjs

export default defineConfig({
  // ...configuración existente...

  vite: {
    resolve: {
      alias: {
        '@questions-public': '/src/content/questions',
        '@questions-premium': '/src/content/questions-premium/questions',
      },
    },
  },
});
```

### Paso 4.2: Actualizar package.json Scripts

```json
{
  "scripts": {
    "dev": "git submodule update --init --recursive --remote && astro dev",
    "build": "git submodule update --init --recursive --remote && astro build",
    "preview": "astro preview"
  }
}
```

### Paso 4.3: Crear Utility para Cargar Preguntas

```typescript
// saberparatodos/src/utils/loadQuestions.ts

import { getCollection } from 'astro:content';

export async function loadQuestions(plan: 'free' | 'institutional') {
  if (plan === 'free') {
    // Solo preguntas v1 (público)
    const publicQuestions = await import.meta.glob('@questions-public/**/*-PUBLIC.md');
    return parseQuestions(publicQuestions);
  } else {
    // Preguntas v2-v7 (premium)
    const premiumQuestions = await import.meta.glob('@questions-premium/**/*-PREMIUM.md');
    return parseQuestions(premiumQuestions);
  }
}
```

---

## 📅 Día 5: Configurar Cloudflare Pages

### Paso 5.1: Crear Variables de Entorno

**En Cloudflare Dashboard:**
1. Ir a Pages → saberparatodos → Settings → Environment Variables
2. Agregar:

```bash
GITHUB_PREMIUM_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxx  # Token con acceso a repo privado
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

### Paso 5.2: Actualizar Build Command

**En Cloudflare Dashboard:**
1. Pages → saberparatodos → Settings → Build & deployments
2. Build command:

```bash
cd saberparatodos && git submodule update --init --recursive --remote && npm install && npm run build
```

3. Build output directory: `saberparatodos/dist`

### Paso 5.3: Probar Deploy

```powershell
# Commit cambios
git add .
git commit -m "feat: Configure dual-repo architecture with submodules"
git push origin feat/dual-repo-architecture

# Crear PR
gh pr create --title "feat: Dual-repo architecture (public/private)" --body "Separa v1 (público) de v2-v7 (privado)"

# Mergear y triggear deploy
gh pr merge --auto --squash
```

---

## 📅 Día 6: Testing End-to-End

### Paso 6.1: Validar Frontend (Free Tier)

```powershell
# Acceder a https://saberparatodos.pages.dev
# Navegar a sección de práctica

# Verificar que:
# ✅ Solo se muestran preguntas v1 (público)
# ✅ Mensaje de "Upgrade para acceder a v2-v7"
# ✅ Link a /instituciones funciona
```

### Paso 6.2: Validar Frontend (Institutional)

```powershell
# Crear cuenta de prueba en Supabase
# Asignar plan School manualmente en tabla institutions

# Login en frontend
# Navegar a Party Mode

# Verificar que:
# ✅ Se muestran preguntas v2-v7 (premium)
# ✅ NO se muestran preguntas v1
# ✅ Contexto cultural correcto (ciudades, moneda)
```

### Paso 6.3: Validar Build Performance

```powershell
# Verificar tiempo de build en Cloudflare
# Dashboard → Deployments → Ver último deploy

# Debe ser <5 minutos
# Si es >5 min, optimizar submodule (shallow clone)
```

---

## 📅 Día 7: Documentación y Cierre

### Paso 7.1: Actualizar README.md Principal

```markdown
## 📁 Estructura de Repositorios

Este proyecto usa una **arquitectura dual**:

### Repositorio Público (este repo)
- **Código:** MIT License
- **Preguntas v1:** CC BY-SA 4.0
- **Propósito:** Marketing, SEO, transparencia

### Repositorio Privado
- **Repo:** [worldexams-premium](https://github.com/iberi22/worldexams-premium) 🔒
- **Preguntas v2-v7:** Propietaria
- **Propósito:** Contenido comercial (Party Mode)

### Integración
Las plataformas (saberparatodos/, exani-mx/, etc.) usan **Git Submodules** para acceder al contenido premium durante el build.
```

### Paso 7.2: Crear Guía para Colaboradores

```markdown
## 🤝 Guía para Colaboradores

### Agregar Nuevas Preguntas

1. **Crear bundle completo** (v1-v7) localmente
2. **Separar con script:**
   ```powershell
   .\scripts\split-questions.ps1
   ```
3. **Commitear v1 (público)** a worldexams
4. **Commitear v2-v7 (privado)** a worldexams-premium

### Acceso al Repo Privado

Solo miembros del equipo con rol **Contributor**. Contactar admin.
```

---

## ✅ Checklist Final de Validación

Antes de considerar completo, verificar:

- [ ] Repo público NO contiene archivos *-PREMIUM.md
- [ ] Repo privado es accesible solo con token
- [ ] Submodule se clona correctamente en Cloudflare Pages
- [ ] Frontend free tier muestra solo v1
- [ ] Frontend institutional muestra v2-v7
- [ ] Build time <5 minutos
- [ ] .gitignore ignora *-bundle.md y *-PREMIUM.md
- [ ] README.md actualizado con arquitectura dual
- [ ] MONETIZATION_STRATEGY.md documentado
- [ ] Personal Access Token guardado en 1Password/Bitwarden

---

## 🚨 Troubleshooting

### Error: "Submodule not cloned in Cloudflare"

**Solución:**
```bash
# Verificar que token está configurado
# Cloudflare Pages → Settings → Environment Variables
GITHUB_PREMIUM_TOKEN=ghp_xxx

# Build command debe incluir autenticación
git config --global url."https://${GITHUB_PREMIUM_TOKEN}@github.com/".insteadOf "https://github.com/"
git submodule update --init --recursive --remote
```

### Error: "Build timeout >10 min"

**Solución:**
```bash
# Usar shallow clone para submodule
git submodule update --init --recursive --remote --depth 1
```

### Error: "Questions not loading in frontend"

**Solución:**
```typescript
// Verificar alias en astro.config.mjs
vite: {
  resolve: {
    alias: {
      '@questions-premium': '/src/content/questions-premium/questions',
    },
  },
}

// Verificar import en componente
import questions from '@questions-premium/colombia/matematicas/...';
```

---

## 📊 Métricas de Éxito

Al finalizar Día 7, validar:

| Métrica | Objetivo | Método |
|---------|----------|--------|
| Archivos PUBLIC | 150+ | `ls src/content/questions/**/*-PUBLIC.md | wc -l` |
| Archivos PREMIUM | 150+ | `gh repo view worldexams-premium` |
| Build time | <5 min | Cloudflare Dashboard |
| Repo privado | 100% privado | `gh repo view --json isPrivate` |
| Costo | $0/mes | GitHub Free + Cloudflare Free |

---

*Versión: 1.0 | Diciembre 2025*
