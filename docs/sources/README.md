# 🔍 Sistema de Tracking de Fuentes de Preguntas

> **Propósito:** Evitar duplicación de preguntas rastreando URLs y IDs de fuentes originales

---

## 📁 Estructura

```
docs/sources/
├── README.md                    # Este archivo
├── questions-registry.json      # Índice global de todas las preguntas usadas
├── opentdb/                     # Preguntas de OpenTDB
│   └── used-questions.json      # IDs de OpenTDB ya utilizados
├── khan-academy/                # Preguntas de Khan Academy
│   └── used-questions.json
├── custom/                      # Preguntas creadas por humanos
│   └── registry.json
└── by-country/                  # Índices por país
    ├── colombia.json
    ├── mexico.json
    └── brasil.json
```

---

## 🎯 Flujo de Generación

### Antes de Generar Nuevas Preguntas

1. **Consultar `questions-registry.json`**
   - Verificar que la pregunta original no esté ya usada
   - Buscar por `source_url` o `source_id`

2. **Registrar Nueva Pregunta**
   - Agregar entrada al registry
   - Incluir metadata completa

### Formato de Entrada en Registry

```json
{
  "pack_id": "CO-MAT-11-algebra-003",
  "source": "OpenTDB",
  "source_url": "https://opentdb.com/api.php?...",
  "source_id": "opentdb:12345",
  "original_question_hash": "sha256:abc123...",
  "used_date": "2025-12-10",
  "country": "CO",
  "grado": 11,
  "asignatura": "Matemáticas",
  "tema": "Álgebra",
  "pack_file": "api/v1/CO/icfes/11/matematicas/3.json",
  "question_ids": [
    "CO-MAT-11-algebra-003-v1",
    "CO-MAT-11-algebra-003-v2",
    "CO-MAT-11-algebra-003-v3",
    "CO-MAT-11-algebra-003-v4",
    "CO-MAT-11-algebra-003-v5",
    "CO-MAT-11-algebra-003-v6",
    "CO-MAT-11-algebra-003-v7"
  ]
}
```

---

## 🔒 Validación Anti-Duplicados

### Script de Validación (PowerShell)

```powershell
# Verificar si una fuente ya fue usada
function Test-QuestionSourceUsed {
    param(
        [string]$SourceUrl,
        [string]$SourceId
    )

    $registry = Get-Content "docs/sources/questions-registry.json" | ConvertFrom-Json

    $exists = $registry.questions | Where-Object {
        $_.source_url -eq $SourceUrl -or $_.source_id -eq $SourceId
    }

    if ($exists) {
        Write-Host "❌ DUPLICADO: Esta fuente ya fue usada" -ForegroundColor Red
        Write-Host "   Pack: $($exists.pack_id)" -ForegroundColor Yellow
        Write-Host "   Fecha: $($exists.used_date)" -ForegroundColor Yellow
        return $true
    } else {
        Write-Host "✅ NUEVO: Fuente disponible" -ForegroundColor Green
        return $false
    }
}

# Uso:
# Test-QuestionSourceUsed -SourceUrl "https://opentdb.com/..." -SourceId "opentdb:12345"
```

---

## 📊 Estadísticas de Uso

El registry permite generar estadísticas como:

- **Fuentes más utilizadas**
- **Preguntas por país**
- **Cobertura por asignatura**
- **Tasa de reutilización**

### Generar Reporte

```powershell
$registry = Get-Content "docs/sources/questions-registry.json" | ConvertFrom-Json

Write-Host "📊 Estadísticas de Fuentes" -ForegroundColor Cyan
Write-Host "════════════════════════════" -ForegroundColor Cyan
Write-Host "Total de packs: $($registry.questions.Count)"
Write-Host "Preguntas totales: $(($registry.questions.question_ids | Measure-Object).Count)"

# Por fuente
$registry.questions | Group-Object source | ForEach-Object {
    Write-Host "`n$($_.Name): $($_.Count) packs"
}

# Por país
$registry.questions | Group-Object country | ForEach-Object {
    Write-Host "$($_.Name): $($_.Count) packs"
}
```

---

## 🤝 Integración con Workflow de Jules

### 1. Pre-Generación (Jules)

```markdown
**Checklist antes de crear pack:**
- [ ] Consultar questions-registry.json
- [ ] Verificar que source_url NO existe
- [ ] Verificar que source_id NO existe
- [ ] Si es custom, generar hash único
```

### 2. Post-Generación (Jules)

```markdown
**Después de crear pack:**
- [ ] Agregar entrada al questions-registry.json
- [ ] Incluir source_url, source_id, fecha
- [ ] Commit con mensaje: "chore: registrar fuente [pack_id]"
```

### 3. Revisión (Humano)

- Validar que registry está actualizado
- Verificar no hay duplicados
- Aprobar PR solo si registry incluye nuevas fuentes

---

## 🎓 Fuentes Permitidas

| Fuente | URL Base | License | Notas |
|--------|----------|---------|-------|
| **OpenTDB** | https://opentdb.com | CC BY-SA 4.0 | Trivia general, adaptable |
| **Khan Academy** | https://www.khanacademy.org | CC BY-NC-SA 3.0 | Educativo, uso no comercial OK |
| **Wikipedia** | https://wikipedia.org | CC BY-SA 3.0 | Contenido factual |
| **Custom (AI)** | N/A | Proprietary | Generadas por Jules/Copilot |
| **ICFES Públicas** | https://www.icfes.gov.co | Público | Solo ejemplos liberados |

**PROHIBIDO:**
- ❌ Preguntas de exámenes reales sin permiso
- ❌ Contenido con copyright restrictivo
- ❌ Duplicar preguntas existentes en el registry

---

## 📝 Template de Metadata en Pack JSON

Cada pack debe incluir en su metadata:

```json
{
  "id": "CO-MAT-11-algebra-003",
  "source": "OpenTDB",
  "source_url": "https://opentdb.com/api.php?amount=1&category=19&difficulty=medium",
  "source_id": "opentdb:12345",
  "source_license": "CC BY-SA 4.0",
  "original_question_hash": "sha256:abc123def456...",
  "adaptation_notes": "Adaptado con contexto colombiano (Bogotá, COP)",
  "creador": "jules",
  "generation_date": "2025-12-10"
}
```

---

## 🚀 Comandos Útiles

```powershell
# Verificar duplicados en registry
$registry = Get-Content "docs/sources/questions-registry.json" | ConvertFrom-Json
$registry.questions | Group-Object source_id | Where-Object { $_.Count -gt 1 }

# Buscar pregunta por source_url
$registry.questions | Where-Object { $_.source_url -like "*opentdb*" }

# Contar preguntas por país
$registry.questions | Group-Object country | Sort-Object Count -Descending

# Listar últimas 10 fuentes usadas
$registry.questions | Sort-Object used_date -Descending | Select-Object -First 10 pack_id, source, used_date
```

---

**Versión:** 1.0
**Fecha:** 10 de diciembre de 2025
**Autor:** GitHub Copilot
