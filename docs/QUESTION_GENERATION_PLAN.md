# 📚 Plan de Generación de Preguntas - World Exams

## 🎯 Objetivo
Generar un banco de preguntas diverso y de calidad para todos los países activos, utilizando fuentes públicas con atribución completa.

---

## 📊 Estado Actual de Preguntas

| País | Código | Preguntas Actuales | Meta Mínima | Prioridad |
|------|--------|-------------------|-------------|-----------|
| 🇨🇴 Colombia | CO | 97 | 500 | 🔴 Alta |
| 🇲🇽 México | MX | 10 | 500 | 🔴 Alta |
| 🇧🇷 Brasil | BR | 10 | 500 | 🔴 Alta |
| 🇺🇸 USA | US | 10 | 500 | 🔴 Alta |
| 🇦🇷 Argentina | AR | 3 | 200 | 🟡 Media |
| 🇨🇱 Chile | CL | 3 | 200 | 🟡 Media |
| 🇵🇪 Perú | PE | 3 | 200 | 🟡 Media |

---

## 🔍 Fuentes de Preguntas (Con Atribución)

### 1. Open Trivia Database (OpenTDB)
- **URL:** https://opentdb.com
- **Licencia:** CC BY-SA 4.0
- **Categorías disponibles:**
  - Science & Nature (ID: 17)
  - Mathematics (ID: 19)
  - History (ID: 23)
  - Geography (ID: 22)
  - General Knowledge (ID: 9)
  - Computers (ID: 18)
  - Art (ID: 25)
  - Politics (ID: 24)
- **Idioma:** Inglés (requiere traducción)
- **Límite:** 50 preguntas por request

### 2. Wikidata/Wikipedia
- **URL:** https://www.wikidata.org
- **Licencia:** CC0 / CC BY-SA 3.0
- **Uso:** Datos factuales para generar preguntas
- **Categorías:** Geografía, Historia, Ciencias, Cultura

### 3. Khan Academy (Inspiración)
- **URL:** https://www.khanacademy.org
- **Licencia:** CC BY-NC-SA 3.0
- **Uso:** Estructura de preguntas matemáticas y científicas
- **Nota:** Solo como inspiración, no copiar directamente

### 4. OpenStax
- **URL:** https://openstax.org
- **Licencia:** CC BY 4.0
- **Uso:** Contenido educativo de matemáticas, física, biología
- **Idiomas:** Inglés, Español

### 5. Repositorios GitHub Educativos
- **r-exams_matematicas:** Preguntas estilo ICFES
- **awesome-education:** Recursos educativos
- **Licencias:** Varían por repo

---

## 📅 Plan de Ejecución por Fases

### Fase 1: Países Prioritarios (Semana 1-2)
**Meta:** 200 preguntas por país

#### Colombia (CO) - Saber 11
```
Día 1: Matemáticas (50 preguntas)
  - OpenTDB: mathematics → 10 fuentes × 5 variaciones
  
Día 2: Ciencias Naturales (50 preguntas)
  - OpenTDB: science → 10 fuentes × 5 variaciones
  
Día 3: Lectura Crítica (50 preguntas)
  - Generar desde textos de Wikipedia/Wikisource
  
Día 4: Sociales/Historia (50 preguntas)
  - OpenTDB: history, geography → 10 fuentes × 5 variaciones
```

#### México (MX) - EXANI-II
```
Día 5: Matemáticas (50 preguntas)
Día 6: Español (50 preguntas)
Día 7: Ciencias (50 preguntas)
Día 8: Historia/Civismo (50 preguntas)
```

#### Brasil (BR) - ENEM
```
Día 9: Matemática (50 preguntas)
Día 10: Português (50 preguntas)
Día 11: Ciências (50 preguntas)
Día 12: História (50 preguntas)
```

#### USA (US) - SAT
```
Día 13: Math (50 preguntas)
Día 14: Reading (50 preguntas)
Día 15: Writing (50 preguntas)
Día 16: Science (50 preguntas)
```

### Fase 2: Países Secundarios (Semana 3)
**Meta:** 100 preguntas por país

- Argentina (AR): 25 por categoría × 4 categorías
- Chile (CL): 25 por categoría × 4 categorías
- Perú (PE): 25 por categoría × 4 categorías

---

## 🔄 Comandos de Ejecución

### Ejecutar Research Workflow

```bash
# Colombia - Matemáticas
gh workflow run research-questions.yml --repo iberi22/worldexams \
  -f country=CO -f category=mathematics -f num_questions=10 -f language=es

# Colombia - Ciencias
gh workflow run research-questions.yml --repo iberi22/worldexams \
  -f country=CO -f category=science -f num_questions=10 -f language=es

# Colombia - Historia
gh workflow run research-questions.yml --repo iberi22/worldexams \
  -f country=CO -f category=history -f num_questions=10 -f language=es

# México - Matemáticas
gh workflow run research-questions.yml --repo iberi22/worldexams \
  -f country=MX -f category=mathematics -f num_questions=10 -f language=es

# Brasil - Ciencias
gh workflow run research-questions.yml --repo iberi22/worldexams \
  -f country=BR -f category=science -f num_questions=10 -f language=pt

# USA - Math
gh workflow run research-questions.yml --repo iberi22/worldexams \
  -f country=US -f category=mathematics -f num_questions=10 -f language=en
```

---

## 📝 Formato de Atribución en Preguntas

Cada pregunta generada DEBE incluir:

```yaml
---
id: "CO-MAT-11-algebra-001"
grado: 11
asignatura: "Matemáticas"
tema: "Álgebra"
dificultad: 3
estado: published
creador: "Copilot"

# ATRIBUCIÓN OBLIGATORIA
source: "OpenTDB"
source_url: "https://opentdb.com"
source_license: "CC BY-SA 4.0"
inspired_by: "What is the square root of 144?"
variation: 1
generation_date: "2024-12-04"
---
```

---

## 🤖 Script de Ejecución Masiva

Ejecutar el siguiente script para generar todas las preguntas del plan:

```powershell
# Plan de ejecución masiva
$countries = @(
    @{code="CO"; lang="es"; categories=@("mathematics","science","history","geography")},
    @{code="MX"; lang="es"; categories=@("mathematics","science","history","general_knowledge")},
    @{code="BR"; lang="pt"; categories=@("mathematics","science","history","geography")},
    @{code="US"; lang="en"; categories=@("mathematics","science","history","computers")}
)

foreach ($country in $countries) {
    foreach ($category in $country.categories) {
        Write-Host "Generating: $($country.code) - $category"
        gh workflow run research-questions.yml --repo iberi22/worldexams `
            -f country=$($country.code) `
            -f category=$category `
            -f num_questions=10 `
            -f language=$($country.lang)
        Start-Sleep -Seconds 5  # Evitar rate limiting
    }
}
```

---

## ✅ Checklist de Calidad

Para cada lote de preguntas generadas:

- [ ] Verificar atribución de fuente completa
- [ ] Validar traducción al idioma correcto
- [ ] Confirmar formato de ID correcto
- [ ] Revisar que los distractores sean plausibles
- [ ] Verificar explicación clara
- [ ] Confirmar nivel de dificultad apropiado

---

## 📈 Métricas de Progreso

| Semana | Preguntas Generadas | Issues Creados | PRs Merged |
|--------|--------------------:|---------------:|-----------:|
| 1 | 0 | 2 | 0 |
| 2 | - | - | - |
| 3 | - | - | - |
| 4 | - | - | - |

---

## 🔗 Referencias

- [OpenTDB API Docs](https://opentdb.com/api_config.php)
- [Creative Commons Licenses](https://creativecommons.org/licenses/)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)

---

*Última actualización: 4 de diciembre de 2024*
