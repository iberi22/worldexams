# 📚 Flujo de Sincronización de Preguntas - World Exams

> Historical context only. Si este documento asume repos de contenido separados o pasos en GitHub Actions UI, validarlo primero contra `docs/README.md` y `.gitcore/ARCHITECTURE.md`.

**Versión:** 2.0
**Fecha:** 2025-12-16
**Estado:** ✅ Implementado

---

## 🔄 Arquitectura General

```
┌──────────────────────────────────────────────────────────────────┐
│                   MUNDO REAL: GENERACIÓN                         │
│  1. Crear preguntas en formato Protocol v2.0                    │
│  2. Ubicación: src/content/questions/[país]/[asig]/grado-N/      │
│  3. Formato: [COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-###-bundle.md    │
└──────────────────────────────────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│                  REPO PRIVADO (Opcional)                         │
│  - ¿Dónde se almacenan originalmente las preguntas?             │
│  - ¿Existe `worldexams-content` repo privado?                   │
│  - Flujo actual: Los datos están en src/content/ público         │
└──────────────────────────────────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│              PUSH A MAIN + GITHUB ACTION TRIGGER                 │
│  - Detecta cambios en src/content/questions/**                  │
│  - Ejecuta: scripts/sync-questions-to-api.py                    │
│  - Normaliza: lectura-critica → lectura_critica                 │
│  - Copia: a api/v1/co/icfes/11/[subject]/                       │
└──────────────────────────────────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│                    BUILD PROCESO (npm run build)                 │
│  - Copia v1/ → dist/v1/                                         │
│  - Copia functions/ → dist/functions/                           │
│  - Prepara para deployment                                      │
└──────────────────────────────────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│            DEPLOYMENT A CLOUDFLARE PAGES                         │
│  - Sube dist/ a worldexams-api.pages.dev                        │
│  - Cloudflare sirve archivos estáticos JSON                     │
│  - Middleware valida CORS y seguridad                           │
└──────────────────────────────────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│              CLIENTE (saberparatodos.pages.dev)                  │
│  - Fetch: GET /v1/co/icfes/11/matematicas/1.json               │
│  - Recibe: 200 OK + JSON válido                                 │
│  - Renderiza: Preguntas en interfaz                             │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Directorios

### Entrada: Preguntas Generadas

```
src/content/questions/
├── colombia/
│   ├── matematicas/
│   │   ├── grado-3/
│   │   ├── grado-5/
│   │   ├── grado-7/
│   │   ├── grado-9/
│   │   └── grado-11/
│   │       ├── algebra/
│   │       │   └── CO-MAT-11-algebra-001-bundle.md
│   │       ├── aritmetica/
│   │       ├── geometria/
│   │       └── ...
│   ├── lectura-critica/
│   ├── ciencias-naturales/
│   ├── sociales-ciudadanas/
│   └── ingles/
│
└── mexico/
    ├── matematicas/
    ├── español/
    └── ...
```

### Salida: API JSON

```
api/v1/
├── co/
│   └── icfes/
│       ├── 3/
│       ├── 5/
│       ├── 7/
│       ├── 9/
│       └── 11/
│           ├── matematicas/
│           │   ├── 1.json        (Página 1: preguntas 1-10)
│           │   ├── 2.json        (Página 2: preguntas 11-20)
│           │   ├── 3.json
│           │   ├── 4.json
│           │   └── index.json    (Metadata: total páginas, etc)
│           ├── lectura_critica/
│           │   ├── 1.json
│           │   ├── index.json
│           │   └── ...
│           ├── ciencias_naturales/
│           ├── sociales_y_ciudadanas/
│           └── ingles/
│
├── mx/
│   └── enems/
│       └── 11/
│           └── ...
│
└── br/
    └── enem/
        └── ...
```

---

## 🔄 Mapeos y Normalizaciones

### Países

| Inglés | Carpeta | API Code | Repo |
|--------|---------|----------|------|
| Colombia | `colombia/` | `co` | `saber-co` |
| México | `mexico/` | `mx` | `saber-mx` / `exani-mx` |
| Argentina | `argentina/` | `ar` | `saber-ar` |
| Chile | `chile/` | `cl` | `saber-cl` / `paes-cl` |
| Perú | `peru/` | `pe` | `saber-pe` |
| Brasil | `brasil/` | `br` | `enem-br` |
| USA | `usa/` | `us` | `sat-us` |

### Asignaturas (Nombres Normalizados)

| Nombre UI | Carpeta Fuente | API Name | Grados |
|-----------|----------------|----------|--------|
| Lectura Crítica | `lectura-critica` | `lectura_critica` | 11 (CO) |
| Matemáticas | `matematicas` | `matematicas` | 3,5,7,9,11 |
| Ciencias Naturales | `ciencias-naturales` | `ciencias_naturales` | 3,5,7,9,11 |
| Sociales | `sociales-ciudadanas` | `sociales_y_ciudadanas` | 3,5,7,9,11 (CO) |
| Inglés | `ingles` | `ingles` | 3,5,7,9,11 |

**Regla de Normalización:** `guiones-medios` → `guiones_bajos`

### Exámenes

| Examen | Código | API Type | País |
|--------|--------|----------|------|
| Saber 11 | `saber11` | `icfes` | Colombia |
| Saber 9 | `saber9` | `icfes` | Colombia |
| Saber 5 | `saber5` | `icfes` | Colombia |
| Saber 3 | `saber3` | `icfes` | Colombia |
| ENEM | `enem` | `enem` | Brasil |
| ENEMS | `enems` | `enem` | México |
| PAES | `paes` | `paes` | Chile |

---

## 🛠️ Componentes del Sistema

### 1. Script Python: `sync-questions-to-api.py`

**Ubicación:** `scripts/sync-questions-to-api.py`
**Lenguaje:** Python 3.8+
**Uso:** `python scripts/sync-questions-to-api.py`

**Funcionalidad:**
- ✅ Detecta cambios en `src/content/questions/`
- ✅ Normaliza nombres (guiones → guiones_bajos)
- ✅ Mapea país → código API (colombia → co)
- ✅ Copia archivos a estructura correcta en `api/v1/`
- 🔄 Próximo: Parseá bundles .md y convierte a JSON

**Entrada:** Archivos `.md` (Protocol v2.0)

**Salida:** Estructura de carpetas en `api/v1/`

### 2. GitHub Action: `sync-questions-to-api.yml`

**Ubicación:** `.github/workflows/sync-questions-to-api.yml`
**Trigger:** Push a `main` con cambios en `src/content/questions/**`

**Pasos:**
1. Checkout código
2. Set up Python 3.11
3. Ejecutar script sync
4. Build API (`npm run build`)
5. Commit cambios
6. Deploy a Cloudflare Pages

**Secrets Requeridos:**
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### 3. Build Process: `build.bat` + `wrangler.toml`

**Ubicación:** `api/build.bat` y `api/wrangler.toml`

**Funcionalidad:**
- Copiar `v1/` → `dist/v1/`
- Copiar `functions/` → `dist/functions/`
- Prepare para Cloudflare Pages

**Comando:** `npm run build` → Ejecuta `build.bat`

### 4. Middleware: `_middleware.ts`

**Ubicación:** `api/functions/_middleware.ts`

**Funcionalidad:**
- ✅ Permitir acceso público a `/v1/**/*.json`
- ✅ Validar CORS desde `saberparatodos.pages.dev`
- ✅ Validación de API Key para endpoints protegidos
- ✅ Rate limiting por quota

---

## 🚀 Flujo de Ejecución Paso a Paso

### Escenario 1: Agregar Nueva Pregunta

```bash
# 1. Crear archivo con preguntas
cat > src/content/questions/colombia/matematicas/grado-11/algebra/CO-MAT-11-algebra-002-bundle.md << 'EOF'
---
id: "CO-MAT-11-algebra-002"
country: "CO"
grado: 11
asignatura: "Matemáticas"
tema: "Algebra"
protocol_version: "2.0"
total_questions: 7
---

# Pregunta Base: Sistemas de ecuaciones

## Pregunta 1 (Original)
...
EOF

# 2. Commit y Push
git add -A
git commit -m "feat: 7 nuevas preguntas de álgebra grado 11"
git push origin main

# 3. GitHub Action se dispara automáticamente:
# - ✅ Detecta cambios en src/content/questions/
# - ✅ Ejecuta sync-questions-to-api.py
# - ✅ Copia a api/v1/co/icfes/11/matematicas/
# - ✅ Build npm run build
# - ✅ Deploy con wrangler
# - ✅ Publica a https://worldexams-api.pages.dev

# 4. Verificar disponibilidad
curl https://worldexams-api.pages.dev/v1/co/icfes/11/matematicas/index.json
# Retorna: metadata actualizado

# 5. Cliente lo jala automáticamente
# - fetchQuestions() detecta cambios
# - Carga preguntas nuevas
# - Renderiza en interfaz
```

### Escenario 2: Modificar Pregunta Existente

```bash
# 1. Editar archivo existente
vim src/content/questions/colombia/matematicas/grado-11/algebra/CO-MAT-11-algebra-001-bundle.md

# 2. Commit
git commit -am "fix: corregir explicación de pregunta algebra-001"
git push

# 3. Sistema automático:
# - GitHub Action re-sincroniza
# - API se actualiza
# - Cliente recibe versión nueva
```

### Escenario 3: Sincronización Manual

```bash
# Si necesitas sincronizar sin esperar a GitHub Action:
cd api
npm run build           # Genera dist/

# Verificar estructura
ls -la dist/v1/co/icfes/11/matematicas/

# Deploy manual
npm run deploy          # Sube a Cloudflare Pages directamente
```

---

## 🧪 Testing y Validación

### Test 1: Verificar archivos se copian correctamente

```bash
# Local
cd api
npm run build
test -f dist/v1/co/icfes/11/matematicas/1.json && echo "✅ OK" || echo "❌ FALLA"

# Resultado esperado:
# ✅ OK
```

### Test 2: Verificar JSON está bien formado

```bash
# Local
npm run build
python -m json.tool dist/v1/co/icfes/11/matematicas/1.json > /dev/null && echo "✅ JSON válido" || echo "❌ JSON inválido"

# Resultado esperado:
# ✅ JSON válido
```

### Test 3: Verificar API responde

```bash
# Production
curl -s https://worldexams-api.pages.dev/v1/co/icfes/11/matematicas/1.json | \
  python -m json.tool | head -20

# Resultado esperado:
# {
#   "metadata": {
#     "total_pages": 4,
#     "total_questions": 343,
#     ...
#   },
#   "questions": [...]
# }
```

### Test 4: Verificar CORS

```bash
# Desde navegador en saberparatodos.pages.dev
fetch('https://worldexams-api.pages.dev/v1/co/icfes/11/matematicas/1.json')
  .then(r => r.json())
  .then(d => console.log('✅ CORS funciona', d.metadata))
  .catch(e => console.error('❌ CORS fallido', e))
```

---

## 🔍 Troubleshooting

### Problema 1: "Archivo no se sincroniza"

**Síntoma:** Creo archivo `.md` pero no aparece en `dist/v1/`

**Soluciones:**
1. Verificar ruta: `src/content/questions/[país]/[asig]/grado-N/[tema]/`
2. Verificar nombre: `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-###-bundle.md`
3. Ejecutar manualmente: `python scripts/sync-questions-to-api.py`
4. Hacer build local: `cd api && npm run build`
5. Verificar dist: `ls dist/v1/co/icfes/11/[asig]/`

### Problema 2: "API devuelve 404"

**Síntoma:** Curl retorna HTML 404

**Soluciones:**
1. Verificar URL: `https://worldexams-api.pages.dev/v1/co/icfes/11/matematicas/1.json`
2. Verificar archivo existe: `ls api/v1/co/icfes/11/matematicas/1.json`
3. Hacer build y deploy manualmente
4. Verificar Cloudflare deployment: https://dash.cloudflare.com

### Problema 3: "CORS bloqueado"

**Síntoma:** Error en navegador: `Access-Control-Allow-Origin`

**Soluciones:**
1. Verificar middleware: `api/functions/_middleware.ts`
2. Verificar origin whitelist incluye tu dominio
3. Probar con curl: `curl -v https://worldexams-api.pages.dev/...`
4. Si curl funciona, es problema del navegador (verificar console)

### Problema 4: "GitHub Action no se ejecuta"

**Síntoma:** Push a main pero no se sincroniza automáticamente

**Soluciones:**
1. Verificar cambios están en `src/content/questions/`
2. Verificar workflow existe: `.github/workflows/sync-questions-to-api.yml`
3. Ir a Actions tab en GitHub, ver si hay errores
4. Verificar secrets configurados: `CLOUDFLARE_API_TOKEN`, etc.
5. Ejecutar manualmente en GitHub Actions UI

---

## 📊 Monitoreo

### Métricas Clave

```bash
# Cantidad de preguntas por país
find api/v1 -name "*.json" -not -name "index.json" | wc -l

# Cantidad de preguntas por asignatura (Colombia)
find api/v1/co/icfes -name "*.json" -not -name "index.json" | wc -l

# Tamaño total del API
du -sh api/v1/

# Archivos modificados en sincronización
git log -1 --stat | grep api/v1/
```

### Logs

```bash
# Ver logs de GitHub Action
# Ir a: https://github.com/world-exams/worldexams/actions

# Ver logs de Cloudflare
# Ir a: https://dash.cloudflare.com → Pages → worldexams-api → Deployments

# Test local
python scripts/sync-questions-to-api.py --verbose
cd api && npm run build && npm run verify
```

---

## 🎯 Checklist para Nuevos Países

Cuando agregues un nuevo país (ej: Venezuela):

```bash
# 1. Agregar mapeos
# En scripts/sync-questions-to-api.py:
COUNTRY_MAP = {
    ...
    "venezuela": "ve",
}

# En .github/workflows/sync-questions-to-api.yml:
# (Automático, detecta cambios en src/content/questions/venezuela/)

# 2. Crear estructura base
mkdir -p src/content/questions/venezuela/matematicas/grado-12
mkdir -p src/content/questions/venezuela/español/grado-12

# 3. Agregar primera pregunta
cat > src/content/questions/venezuela/matematicas/grado-12/algebra/VE-MAT-12-algebra-001-bundle.md << 'EOF'
---
id: "VE-MAT-12-algebra-001"
country: "VE"
grado: 12
asignatura: "Matemáticas"
...
EOF

# 4. Commit y push
git add -A
git commit -m "feat: agregar soporte para Venezuela (VE)"
git push

# 5. Verificar después de ~5 minutos
curl https://worldexams-api.pages.dev/v1/ve/[exam-type]/12/matematicas/1.json
```

---

## 📚 Referencias

- [Protocol v2.0 de Preguntas](../docs/QUESTION_GENERATION_PROTOCOL_V2.md)
- [PLANNING.md - Arquitectura general](../PLANNING.md)
- [API_RESOLUTION_SUMMARY.md - Cómo se resolvieron los errores](../API_RESOLUTION_SUMMARY.md)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/cli-wrangler/)

---

*Documentación completada: 2025-12-16*
*Última actualización: Próxima revisión en enero 2026*
