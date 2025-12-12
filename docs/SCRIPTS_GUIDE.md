# 🚀 Scripts de Automatización - World Exams

## Scripts Disponibles

### 📝 `run-e2e-tests.ps1`

Script principal para ejecutar servidor de desarrollo + tests E2E automáticamente.

**Uso:**

```powershell
# Modo headless (sin UI)
.\scripts\run-e2e-tests.ps1

# Modo headed (con UI visible)
.\scripts\run-e2e-tests.ps1 -Headed

# Saltar verificación de build
.\scripts\run-e2e-tests.ps1 -SkipBuild

# Puerto personalizado
.\scripts\run-e2e-tests.ps1 -Port 3000

# Timeout personalizado (en segundos)
.\scripts\run-e2e-tests.ps1 -Timeout 180
```

**Características:**

- ✅ Detecta si el servidor ya está corriendo
- ✅ Inicia servidor automáticamente si es necesario
- ✅ Espera a que el servidor esté listo (max 30s)
- ✅ Ejecuta tests de Party Mode
- ✅ Cleanup automático (detiene servidor al terminar)
- ✅ Manejo de errores robusto

---

### 🔐 `add-licenses-metadata.ps1`

Migra bundles de preguntas a Protocol v2.1 agregando metadata de licencias.

**Uso:**

```powershell
# Dry run (solo mostrar qué se actualizaría)
.\scripts\add-licenses-metadata.ps1 -DryRun -Verbose

# Aplicar cambios reales
.\scripts\add-licenses-metadata.ps1

# Directorio personalizado
.\scripts\add-licenses-metadata.ps1 -SourceDir "src/content/questions/colombia"
```

**Características:**

- ✅ Agrega metadata `licenses` a frontmatter YAML
- ✅ Modo dry-run para preview
- ✅ Logging detallado
- ✅ Estadísticas de migración

---

### 🧪 `run-party-tests.ps1`

Script legacy para verificar servidor y ejecutar tests.

**Uso:**

```powershell
.\scripts\run-party-tests.ps1
.\scripts\run-party-tests.ps1 --headed
```

**Nota:** Se recomienda usar `run-e2e-tests.ps1` en su lugar.

---

## CI/CD Workflows

### `.github/workflows/e2e-tests.yml`

Workflow de GitHub Actions para ejecutar tests E2E en cada push/PR.

**Triggers:**

- Push a `main` o `develop`
- Pull requests a `main` o `develop`
- Cambios en `saberparatodos/src/**`, `tests/**`, o `package.json`
- Manual dispatch

**Jobs:**

1. **e2e-tests**
   - Instala dependencias
   - Instala Playwright browsers
   - Build de la aplicación
   - Inicia servidor de desarrollo
   - Ejecuta tests E2E
   - Sube artifacts (reportes, screenshots)

2. **notify**
   - Notifica resultados (Discord/Slack - opcional)

**Secrets Requeridos:**

```
SUPABASE_URL
SUPABASE_ANON_KEY
SENTRY_DSN (opcional)
```

**Configurar en GitHub:**

```
Settings > Secrets and variables > Actions > New repository secret
```

---

## Ejemplos de Uso

### Desarrollo Local

```powershell
# Terminal 1: Servidor manual
cd saberparatodos
npm run dev

# Terminal 2: Tests
cd saberparatodos
npm run test:party:headed
```

### Desarrollo con Script

```powershell
# Un solo comando para todo
.\scripts\run-e2e-tests.ps1 -Headed
```

### CI/CD

```yaml
# El workflow se ejecuta automáticamente en push
git add .
git commit -m "feat: new feature"
git push origin main
```

---

## Troubleshooting

### Error: "Puerto 4321 ya en uso"

```powershell
# Matar procesos en el puerto
Get-NetTCPConnection -LocalPort 4321 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }
```

### Error: "Playwright browsers not installed"

```powershell
cd saberparatodos
npx playwright install
```

### Error: "SUPABASE_URL is not defined"

Crea archivo `.env` en `saberparatodos/`:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## Mantenimiento

### Actualizar Playwright

```powershell
cd saberparatodos
npm install @playwright/test@latest
npx playwright install
```

### Verificar Tests

```powershell
# Verificar sintaxis
npm run lint

# Ejecutar tests en modo UI (debugging)
npm run test:ui
```

---

**Fecha:** 2025-12-12
**Versión:** 1.0
