# 📊 Registro de Fuentes Utilizadas - World Exams

> **Propósito:** Evitar duplicación de preguntas y rastrear el uso de cada fuente.
> **Actualizado:** 2025-12-04
> **Formato:** Scaneable por scripts de validación

---

## 🔍 Cómo Usar Este Archivo

1. **Antes de generar preguntas:** Buscar si la fuente ya fue utilizada
2. **Después de generar:** Agregar entrada con ID único y hash
3. **Script de validación:** `npm run validate:sources`

---

## 📑 Formato de Entrada

```markdown
| Source ID | Original Question (hash) | Country | Subject | Grade | Bundle ID | Date | Status |
```

**Source ID Format:** `[SOURCE]-[CATEGORY]-[NUMBER]`
- `OTDB-MATH-001` = OpenTDB, Mathematics, question #001
- `OTQA-HIST-042` = OpenTriviaQA, History, question #042
- `WIKI-GEO-015` = Wikidata, Geography, entry #015

---

## 📚 OpenTDB (Open Trivia Database)

### Mathematics (Category 19)

| Source ID | Original Question (SHA256 first 8) | Countries Used | Bundle IDs | Date Added | Status |
|-----------|-----------------------------------|----------------|------------|------------|--------|
| OTDB-MATH-001 | `a7b3c2d1` | MX | MX-MAT-11-angulos-001 | 2025-12-04 | ✅ Used |
| OTDB-MATH-002 | `e5f6g7h8` | CO | CO-MAT-11-algebra-001 | 2025-12-04 | ✅ Used |
| OTDB-MATH-003 | | | | | ⬜ Available |

### History (Category 23)

| Source ID | Original Question (SHA256 first 8) | Countries Used | Bundle IDs | Date Added | Status |
|-----------|-----------------------------------|----------------|------------|------------|--------|
| OTDB-HIST-001 | `i9j0k1l2` | BR, US | BR-HIS-11-modern-001, US-HIS-11-modern-001 | 2025-12-04 | ✅ Used |
| OTDB-HIST-002 | `m3n4o5p6` | BR, US | BR-HIS-11-ancient-001, US-HIS-11-ancient-001 | 2025-12-04 | ✅ Used |

### Science & Nature (Category 17)

| Source ID | Original Question (SHA256 first 8) | Countries Used | Bundle IDs | Date Added | Status |
|-----------|-----------------------------------|----------------|------------|------------|--------|
| OTDB-SCI-001 | | | | | ⬜ Available |

### Geography (Category 22)

| Source ID | Original Question (SHA256 first 8) | Countries Used | Bundle IDs | Date Added | Status |
|-----------|-----------------------------------|----------------|------------|------------|--------|
| OTDB-GEO-001 | | | | | ⬜ Available |

---

## 📖 OpenTriviaQA (GitHub Dataset)

### General Knowledge

| Source ID | Original Question (SHA256 first 8) | Countries Used | Bundle IDs | Date Added | Status |
|-----------|-----------------------------------|----------------|------------|------------|--------|
| OTQA-GK-001 | | | | | ⬜ Available |

### Science

| Source ID | Original Question (SHA256 first 8) | Countries Used | Bundle IDs | Date Added | Status |
|-----------|-----------------------------------|----------------|------------|------------|--------|
| OTQA-SCI-001 | | | | | ⬜ Available |

---

## 🌐 Wikidata / Wikipedia

### Geography Facts

| Source ID | Wikidata QID | Countries Used | Bundle IDs | Date Added | Status |
|-----------|--------------|----------------|------------|------------|--------|
| WIKI-GEO-001 | Q170516 | | | | ⬜ Available |

### Historical Events

| Source ID | Wikidata QID | Countries Used | Bundle IDs | Date Added | Status |
|-----------|--------------|----------------|------------|------------|--------|
| WIKI-HIST-001 | | | | | ⬜ Available |

---

## 📝 Fuentes Propias (Human-Curated)

### Colombia - Currículo ICFES

| Source ID | Topic | Competencia | Countries Used | Bundle IDs | Date Added | Status |
|-----------|-------|-------------|----------------|------------|------------|--------|
| ICFES-MAT-003-001 | Suma y resta G3 | Resolución | CO | CO-MAT-03-suma-001 | 2025-12-04 | ✅ Used |
| ICFES-MAT-005-001 | Fracciones G5 | Razonamiento | CO | CO-MAT-05-fracciones-001 | 2025-12-04 | ✅ Used |
| ICFES-MAT-011-001 | Funciones G11 | Interpretación | CO | CO-MAT-11-funciones-001 | 2025-12-04 | ✅ Used |
| ICFES-LEN-003-001 | Comprensión G3 | Lectora | CO | CO-LEN-03-comprension-001 | 2025-12-04 | ✅ Used |
| ICFES-LEC-011-001 | Texto argumentativo G11 | Lectura crítica | CO | CO-LEC-11-argumentativo-001 | 2025-12-04 | ✅ Used |
| ICFES-CIE-011-001 | Genética G11 | Uso conocimiento | CO | CO-CIE-11-biologia-001 | 2025-12-04 | ✅ Used |
| ICFES-MAT-009-001 | Álgebra G9 | Resolución | CO | CO-MAT-09-algebra-001 | 2025-12-05 | ✅ Used |
| ICFES-LEN-009-001 | Comprensión lectora G9 | Lectura crítica | CO | CO-LEN-09-comprension-001 | 2025-12-05 | ✅ Used |
| ICFES-SOC-011-001 | Ciudadanas y Constitución G11 | Pensamiento social | CO | CO-SOC-11-ciudadanas-001 | 2025-12-05 | ✅ Used |
| ICFES-ING-011-001 | Reading Comprehension G11 | Comprensión | CO | CO-ING-11-reading-001 | 2025-12-05 | ✅ Used |
| ICFES-MAT-009-002 | Estadística G9 | Comunicación | CO | | | ⬜ Available |
| ICFES-LEC-002 | Texto filosófico G11 | Lectura crítica | CO | | | ⬜ Available |
| ICFES-CIE-011-002 | Química G11 | Explicación fenómenos | CO | | | ⬜ Available |
| ICFES-CIE-011-003 | Física G11 | Indagación | CO | | | ⬜ Available |

---

## 📊 Estadísticas de Uso

### Por Fuente

| Fuente | Total Disponible | Utilizadas | % Uso |
|--------|-----------------|------------|-------|
| OpenTDB | ~4,000 | 4 | 0.1% |
| OpenTriviaQA | ~10,000 | 0 | 0% |
| Wikidata | ∞ | 0 | 0% |
| ICFES (propias) | En desarrollo | 6 | - |

### Por País

| País | Bundles Generados | Preguntas Totales (x7) |
|------|-------------------|------------------------|
| 🇨🇴 Colombia | 10 | 70 |
| 🇲🇽 México | 1 | 7 |
| 🇧🇷 Brasil | 2 | 14 |
| 🇺🇸 USA | 2 | 14 |

### Por Grado (Colombia)

| Grado | Bundles | Preguntas | Asignaturas Cubiertas |
|-------|---------|-----------|----------------------|
| 3° | 2 | 14 | Matemáticas, Lenguaje |
| 5° | 1 | 7 | Matemáticas |
| 9° | 2 | 14 | Matemáticas, Lenguaje |
| 11° | 5 | 35 | Lectura Crítica, Matemáticas, Ciencias, Sociales, Inglés |

---

## 🔒 Reglas de No-Duplicación

### Regla 1: Una fuente, múltiples países
✅ **Permitido:** Usar `OTDB-MATH-001` para generar `MX-MAT-11-*` Y `CO-MAT-11-*`
- Cada país adapta el contexto cultural
- Se registran TODOS los países en la columna "Countries Used"

### Regla 2: No repetir fuente en mismo país
❌ **Prohibido:** Usar `OTDB-MATH-001` dos veces para Colombia
- Antes de generar, verificar si ya existe bundle para ese país

### Regla 3: Hash de verificación
- Cada pregunta original tiene un SHA256 hash (primeros 8 caracteres)
- El script de validación puede detectar duplicados automáticamente

---

## 🔄 Script de Validación

```bash
# Verificar si una fuente ya fue usada para un país
npm run validate:sources -- --source="OTDB-MATH-001" --country="CO"

# Listar fuentes disponibles para una categoría
npm run validate:sources -- --list --category="MATH"

# Generar reporte de uso
npm run validate:sources -- --report
```

---

## 📅 Historial de Actualizaciones

| Fecha | Acción | Responsable |
|-------|--------|-------------|
| 2025-12-04 | Creación inicial del registro | Copilot |
| 2025-12-04 | Agregadas fuentes OTDB utilizadas en PRs #30-41 | Copilot |

---

*Este archivo se actualiza automáticamente al generar nuevas preguntas.*
