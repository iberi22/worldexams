# 💰 Estrategia de Monetización - World Exams

**Última actualización:** 2025-12-12
**Estado:** Plan de Implementación
**Objetivo:** Rentabilidad desde Día 1

---

## 🎯 Arquitectura de Repositorios: Modelo GitHub-First

### Decisión Estratégica: NO usar Supabase para preguntas

**Razón:** Con 30+ países y 30k preguntas, Supabase Free Tier (500MB) no escala.

**Solución:** GitHub como backend de contenido (Git = Base de Datos de Texto)

---

## 📦 Arquitectura de 2 Repositorios

```
┌─────────────────────────────────────────────────────────┐
│  REPO PÚBLICO: iberi22/worldexams                       │
│  Licencia: MIT (código) + CC BY-SA 4.0 (contenido)     │
├─────────────────────────────────────────────────────────┤
│  Contenido:                                             │
│  ✅ Código de plataforma (Astro/Svelte/TailwindCSS)     │
│  ✅ Preguntas v1 (SOLO referencias educativas)          │
│  ✅ Documentación técnica                               │
│  ✅ Schema Supabase (estructura, NO datos)              │
│  ✅ README, CONTRIBUTING, LICENSE                       │
│                                                         │
│  Estructura:                                            │
│  src/content/questions/                                 │
│    colombia/matematicas/grado-11/algebra/               │
│      CO-MAT-11-algebra-001-PUBLIC.md  (solo v1)        │
│    mexico/civismo/grado-11/                             │
│      MX-CIV-11-poderes-001-PUBLIC.md  (solo v1)        │
│                                                         │
│  Propósito: Marketing + SEO + Transparencia            │
└─────────────────────────────────────────────────────────┘
                         │
                         │ Git Submodule
                         ▼
┌─────────────────────────────────────────────────────────┐
│  REPO PRIVADO: iberi22/worldexams-premium               │
│  Licencia: Propietaria (World Exams Inc.)               │
├─────────────────────────────────────────────────────────┤
│  Contenido:                                             │
│  🔒 Preguntas v2-v7 (PRODUCCIÓN comercial)              │
│  🔒 Análisis IA propietario                             │
│  🔒 Algoritmos de adaptación                            │
│  🔒 Reportes premium (templates PDF)                    │
│  🔒 Integraciones B2B (LMS, Google Classroom)           │
│                                                         │
│  Estructura:                                            │
│  questions/                                             │
│    colombia/matematicas/grado-11/algebra/               │
│      CO-MAT-11-algebra-001-PREMIUM.md  (v2-v7)         │
│    mexico/civismo/grado-11/                             │
│      MX-CIV-11-poderes-001-PREMIUM.md  (v2-v7)         │
│                                                         │
│  Propósito: Core Product (Party Mode + Análisis IA)    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Estrategia de Acceso con GitHub

### Modelo: Git Submodules + GitHub Private Repo

**Ventajas:**
1. ✅ **Gratis:** GitHub Free = repos privados ilimitados
2. ✅ **Escalable:** 30k preguntas × 30 países = 900k archivos (GitHub soporta)
3. ✅ **Versionado:** Git history = auditoría completa de cambios
4. ✅ **Backup:** GitHub = 3 copias automáticas (alta disponibilidad)
5. ✅ **CI/CD:** GitHub Actions para validación/sincronización
6. ✅ **Seguridad:** Acceso granular con Personal Access Tokens

---

## 🏗️ Implementación Técnica

### 1. Separación de Contenido (Público vs Privado)

**Archivo Público:** `CO-MAT-11-algebra-001-PUBLIC.md`
```markdown
---
id: "CO-MAT-11-algebra-001"
protocol_version: "2.0"
public_preview: true
total_questions: 1  # Solo v1
source_license: "CC BY-SA 4.0"
---

# Pregunta Base: Ecuaciones Lineales (SOLO REFERENCIA)

> ⚠️ **Nota Educativa:** Esta pregunta se muestra SOLO con fines pedagógicos.
> Las preguntas reales de simulacros están en repo privado.

## Pregunta 1 (Original - v1)

**ID:** `CO-MAT-11-algebra-001-v1`
**Licencia:** CC BY-SA 4.0
**Uso:** Blog educativo (NO comercial)

### Enunciado
Resuelve: 2x + 5 = 13

### Opciones
- [ ] A) x = 3
- [x] B) x = 4
- [ ] C) x = 5
- [ ] D) x = 6

### Explicación
Para resolver: 2x = 13 - 5 = 8, entonces x = 4

---

## Preguntas v2-v7 (Premium) 🔒

**Estado:** Contenido comercial (repo privado)
**Acceso:** Solo para instituciones con suscripción activa

> Para acceder a las 6 variaciones premium con contexto cultural:
> https://saberparatodos.pages.dev/instituciones
```

**Archivo Privado:** `CO-MAT-11-algebra-001-PREMIUM.md`
```markdown
---
id: "CO-MAT-11-algebra-001"
protocol_version: "2.0"
total_questions: 6  # v2-v7
license: "Proprietary - World Exams Inc."
commercial_use: true
---

# Bundle Premium: Ecuaciones Lineales

## Pregunta 2 (Fácil A - v2)

**ID:** `CO-MAT-11-algebra-001-v2`
**Dificultad:** 1

### Enunciado
En Bogotá, un cuaderno cuesta $x. Si pagas $13,000 y recibes $5,000 de cambio, ¿cuánto cuesta?

[... 5 preguntas más v3-v7 ...]
```

---

### 2. Git Submodule Configuration

**En cada plataforma (saberparatodos/, exani-mx/, etc.):**

```bash
# Agregar repo privado como submodule
cd saberparatodos/
git submodule add https://github.com/iberi22/worldexams-premium.git src/content/questions-premium

# .gitmodules generado automáticamente
[submodule "src/content/questions-premium"]
  path = src/content/questions-premium
  url = https://github.com/iberi22/worldexams-premium.git
  branch = main
```

**Ventaja:** Cada deploy de Cloudflare Pages clona el submodule con token privado.

---

### 3. Cloudflare Pages Environment Variables

**En dashboard de Cloudflare Pages:**

```bash
# Token con acceso al repo privado
GITHUB_PREMIUM_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxx  # Personal Access Token (read-only)

# Build command (Cloudflare Pages)
cd saberparatodos && git submodule update --init --recursive && npm run build
```

**Resultado:** Build funciona, pero código privado NUNCA se publica en repo público.

---

## 💰 Modelo de Monetización Dual

### Flujo de Contenido

```
┌─────────────────────────────────────────────────────────┐
│  ESTUDIANTES GRATIS (B2C)                               │
├─────────────────────────────────────────────────────────┤
│  1. Acceden a saberparatodos.pages.dev                  │
│  2. Ven SOLO preguntas v1 (repo público)                │
│  3. Práctica con 1,000 preguntas v1 (suficiente)        │
│  4. Ven publicidad (Google AdSense)                     │
│  5. Party Mode: 1/hora, 10 estudiantes (limitado)      │
│                                                         │
│  Ingreso: $0.50-$2 CPM × 10k MAU = $200-$800/mes       │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼ Upgrade
┌─────────────────────────────────────────────────────────┐
│  INSTITUCIONES (B2B - TARGET PRINCIPAL)                 │
├─────────────────────────────────────────────────────────┤
│  1. Compran plan School/District ($49-$199/mes)         │
│  2. Acceso a 30k preguntas v2-v7 (repo privado)         │
│  3. Party Mode ilimitado                                │
│  4. Análisis IA pedagógico                              │
│  5. Exportar reportes PDF con branding                  │
│  6. Sin publicidad                                      │
│                                                         │
│  Ingreso: 20 colegios × $49 = $980/mes                  │
│           2 secretarías × $199 = $398/mes               │
│           TOTAL: $1,378/mes = $16,536/año               │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Plan de Implementación (7 Días)

### Día 1-2: Separación de Contenido

**Script:** `scripts/split-questions.ps1`

```powershell
# Separar v1 (público) de v2-v7 (privado)

$bundleFiles = Get-ChildItem -Path "src/content/questions" -Filter "*-bundle.md" -Recurse

foreach ($file in $bundleFiles) {
    $content = Get-Content $file.FullName -Raw

    # Extraer v1 (líneas hasta primer "## Pregunta 2")
    $v1Content = $content -split "## Pregunta 2" | Select-Object -First 1

    # Extraer v2-v7 (resto del contenido)
    $premiumContent = $content -replace "(?s).*?(## Pregunta 2.*)", '$1'

    # Guardar v1 en repo público
    $publicFile = $file.FullName -replace "-bundle.md", "-PUBLIC.md"
    $v1Content | Out-File -FilePath $publicFile -Encoding UTF8

    # Guardar v2-v7 en carpeta temporal (luego mover a repo privado)
    $premiumFile = $file.FullName -replace "src/content/questions", "temp/premium-questions" -replace "-bundle.md", "-PREMIUM.md"
    $premiumContent | Out-File -FilePath $premiumFile -Encoding UTF8
}

Write-Host "✅ Separación completa. Public: $(Get-ChildItem -Path 'src/content/questions' -Filter '*-PUBLIC.md' -Recurse | Measure-Object).Count archivos"
```

---

### Día 3: Crear Repo Privado

```bash
# 1. Crear repo en GitHub
gh repo create iberi22/worldexams-premium --private --description "Premium questions (v2-v7) for World Exams"

# 2. Inicializar y poblar
cd temp/premium-questions
git init
git add .
git commit -m "feat: Initial import of premium questions (v2-v7)"
git branch -M main
git remote add origin https://github.com/iberi22/worldexams-premium.git
git push -u origin main

# 3. Verificar tamaño
du -sh .git  # Debe ser <100MB para estar seguro
```

---

### Día 4: Configurar Submodules

```bash
# En cada plataforma
cd saberparatodos/
git submodule add https://github.com/iberi22/worldexams-premium.git src/content/questions-premium
git commit -m "feat: Add premium questions as submodule"
git push

# Repetir para exani-mx/, enem-br/, sat-us/, etc.
```

---

### Día 5: Actualizar .gitignore

```bash
# En repo público (worldexams/.gitignore)
cat >> .gitignore << 'EOF'

# ============================================
# PREMIUM CONTENT (Repo Privado)
# ============================================
# Preguntas v2-v7 están en submodule privado
src/content/questions-premium/
temp/premium-questions/

# Solo archivos PUBLIC se commitean
!*-PUBLIC.md
EOF
```

---

### Día 6: Configurar Cloudflare Pages

**Variables de entorno (Cloudflare Dashboard):**

```bash
GITHUB_PREMIUM_TOKEN=ghp_xxxxx  # Token con acceso al repo privado
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

**Build command:**
```bash
cd saberparatodos && git submodule update --init --recursive --remote && npm install && npm run build
```

---

### Día 7: Testing y Validación

**Checklist:**

- [ ] Repo público NO contiene archivos *-PREMIUM.md
- [ ] Repo privado solo accesible con token
- [ ] Cloudflare Pages build exitoso con submodule
- [ ] Frontend lee preguntas de ambos repos (público + privado)
- [ ] RLS en Supabase valida suscripción antes de servir v2-v7

---

## 📊 Proyecciones de Costos (GitHub-First)

| Recurso | Plan | Costo/mes | Límite | Suficiente para |
|---------|------|-----------|--------|-----------------|
| **GitHub** | Free | $0 | Repos privados ilimitados | ✅ 30k preguntas × 30 países |
| **Cloudflare Pages** | Free | $0 | 500 builds/mes | ✅ 10 deploys/día |
| **Supabase** | Free | $0 | 500MB DB | ✅ Solo metadata (NO preguntas) |
| **Google AdSense** | - | $0 | - | ✅ Ingresos pasivos |

**Total:** $0/mes hasta 10k MAU 🎉

**Upgrade necesario solo si:**
- >500 builds/mes en Cloudflare (poco probable)
- >500MB en Supabase (solo si guardas imágenes/videos)

---

## 🎯 Ventajas del Modelo GitHub-First

| Ventaja | Descripción |
|---------|-------------|
| **Costo $0** | GitHub Free = repos privados ilimitados |
| **Escalable** | Git soporta millones de archivos |
| **Versionado** | Historial completo de cambios (auditoría) |
| **Backup** | GitHub = 3 réplicas automáticas |
| **CI/CD** | GitHub Actions para validación |
| **Seguridad** | Acceso con tokens (revocables) |
| **Open Source** | Repo público para marketing/SEO |
| **Privado** | Repo privado para contenido comercial |

---

## ⚖️ Legal y Compliance

### Repo Público (worldexams)

**Licencia:** Dual
- Código: MIT License
- Preguntas v1: CC BY-SA 4.0

**Permite:**
- ✅ Fork y modificación
- ✅ Uso comercial del código
- ✅ Redistribución con atribución

**Obligaciones:**
- ⚠️ Atribuir fuente original (v1)
- ⚠️ ShareAlike (derivados también CC BY-SA)

---

### Repo Privado (worldexams-premium)

**Licencia:** Propietaria

**Prohibido:**
- ❌ Fork sin autorización
- ❌ Redistribución
- ❌ Acceso público

**Permitido:**
- ✅ Uso interno (World Exams Inc.)
- ✅ Acceso temporal para colaboradores
- ✅ Integración en plataformas propias

---

## 🚀 Roadmap de Rentabilidad

### Mes 1: Lanzamiento (Enero 2026)

**Acciones:**
- ✅ Separar contenido público/privado
- ✅ Configurar submodules
- ✅ Deploy en Cloudflare Pages
- ✅ Google AdSense activo
- ✅ Landing /instituciones con pricing

**KPIs:**
- 1,000 MAU
- 5 colegios en trial (30 días gratis)
- $50/mes en ads

---

### Mes 3: Primeros Clientes (Marzo 2026)

**Acciones:**
- ✅ Cerrar 10 colegios School ($49/mes)
- ✅ Implementar análisis IA básico
- ✅ Exportar reportes PDF

**KPIs:**
- 5,000 MAU
- 10 colegios × $49 = $490/mes
- $150/mes en ads
- **MRR: $640** (break-even operativo)

---

### Mes 6: Escalamiento (Junio 2026)

**Acciones:**
- ✅ Cerrar 20 colegios School + 2 District
- ✅ Partnership con asociación de colegios
- ✅ Open source repo público (marketing)

**KPIs:**
- 10,000 MAU
- 20 School × $49 = $980/mes
- 2 District × $199 = $398/mes
- $300/mes en ads
- **MRR: $1,678** (rentable)

---

### Año 1: Consolidación (Diciembre 2026)

**KPIs:**
- 50,000 MAU
- 50 School + 5 District + 1 Enterprise
- **MRR: $4,000**
- **ARR: $48,000**

---

## ✅ Decisión Final: Plan Ejecutable

### Arquitectura Recomendada

```
iberi22/worldexams (PÚBLICO)
├── src/content/questions/*-PUBLIC.md  (solo v1)
├── saberparatodos/
│   └── src/content/questions-premium/  (submodule → repo privado)
└── .gitignore  (ignora *-PREMIUM.md)

iberi22/worldexams-premium (PRIVADO)
└── questions/*-PREMIUM.md  (v2-v7)
```

### Próximos Pasos

1. ✅ Ejecutar script `split-questions.ps1`
2. ✅ Crear repo privado `worldexams-premium`
3. ✅ Configurar submodules en saberparatodos/
4. ✅ Actualizar .gitignore
5. ✅ Deploy en Cloudflare con token privado
6. ✅ Documentar en `MONETIZATION_STRATEGY.md`

**Tiempo estimado:** 7 días
**Costo:** $0 (GitHub Free)
**Rentabilidad:** Desde Mes 3 ($640 MRR)

---

*Versión: 1.0 | Diciembre 2025*
