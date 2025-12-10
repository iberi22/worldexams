# 🎯 Instrucciones para @jules - Generación de Packs Colombia

> **Asignación:** Generar packs de preguntas para Colombia (ICFES)
> **Protocolo:** v2.0 (7 preguntas por pack)
> **Prioridad:** Grado 11° - Plan 105 Preguntas
> **Tag:** `@jules` para activar

---

## 🚨 NUEVO: Sistema Anti-Duplicación Obligatorio

**IMPORTANTE:** Antes de generar cualquier pack, DEBES consultar el registro de fuentes para evitar duplicados.

### Workflow Obligatorio

1. **ANTES de generar:**
   ```powershell
   # Consultar registry
   $registry = Get-Content "docs/sources/questions-registry.json" | ConvertFrom-Json
   $registry.questions | Format-Table pack_id, source, source_id
   ```

2. **Verificar que la fuente NO existe:**
   - Si usas OpenTDB: Verificar que el URL/categoría no esté en registry
   - Si usas Khan Academy: Verificar que el unit/lesson no esté usado
   - Si usas Wikipedia: Verificar que el artículo no esté registrado

3. **DESPUÉS de generar:**
   - Actualizar `docs/sources/questions-registry.json` con entrada nueva
   - Incluir: source_url, source_id, original_question_hash (SHA-256)

**Documentación completa:** [docs/sources/README.md](../sources/README.md)

---

## 📋 Contexto General

World Exams tiene múltiples repositorios (uno por país). Este repo es para **Colombia (Saber 11)**.

**Plan actual:** Generar 100+ preguntas para Grado 11° en 5 PRs durante 5 semanas.

**Documentos clave:**
- [Plan 100+ Preguntas](./plan-100-preguntas-grado11.md)
- [Sistema de Tracking](../sources/README.md)
- [Protocolo v2.0](../QUESTION_GENERATION_PROTOCOL_V2.md)

---

## 🎯 Tarea Asignada - Prioridad: PR #1 Matemáticas

### Objetivo Inmediato

Crear **3 packs de Matemáticas avanzadas** para Grado 11° siguiendo el Protocolo v2.0:

| Pack # | Tema | Competencia | Archivo Output | Template |
|--------|------|-------------|----------------|----------|
| **5** | Trigonometría | Razonamiento cuantitativo | `matematicas/5.json` | [PR1 Template](./PR-templates/PR1-matematicas-avanzadas.md) |
| **6** | Probabilidad avanzada | Resolución de problemas | `matematicas/6.json` | [PR1 Template](./PR-templates/PR1-matematicas-avanzadas.md) |
| **7** | Cálculo diferencial (límites) | Pensamiento matemático | `matematicas/7.json` | [PR1 Template](./PR-templates/PR1-matematicas-avanzadas.md) |

**Total:** 3 packs × 7 preguntas = **21 preguntas**

**Template detallado:** [docs/reports/PR-templates/PR1-matematicas-avanzadas.md](./PR-templates/PR1-matematicas-avanzadas.md)

### Próximos PRs (Semanas 2-5)

| PR | Semana | Asignatura | Packs | Preguntas | Template |
|----|--------|------------|-------|-----------|----------|
| #2 | 17 Dic | Lectura Crítica | 2 | 14 | [PR2](./PR-templates/PR2-lectura-critica-avanzada.md) |
| #3 | 24 Dic | Ciencias Naturales | 2 | 14 | [PR3](./PR-templates/PR3-ciencias-naturales-avanzadas.md) |
| #4 | 31 Dic | Sociales/Inglés/Info | 5 | 35 | [PR4](./PR-templates/PR4-mixto-sociales-ingles-informatica.md) |
| #5 | 7 Ene | Ciencias Sociales | 3 | 21 | [PR5](./PR-templates/PR5-ciencias-sociales-avanzadas.md) |

**Plan completo:** [plan-100-preguntas-grado11.md](./plan-100-preguntas-grado11.md)

---

## 🔍 CRÍTICO: Tracking de Fuentes

### Antes de Generar (OBLIGATORIO)

Ejecuta este script PowerShell para verificar si la fuente ya fue usada:

```powershell
function Test-QuestionSourceUsed {
    param(
        [string]$SourceUrl,
        [string]$SourceId
    )
    
    $registryPath = "docs/sources/questions-registry.json"
    $registry = Get-Content $registryPath | ConvertFrom-Json
    
    $exists = $registry.questions | Where-Object {
        $_.source_url -eq $SourceUrl -or $_.source_id -eq $SourceId
    }
    
    if ($exists) {
        Write-Host "❌ DUPLICADO: Esta fuente ya fue usada" -ForegroundColor Red
        Write-Host "Pack existente: $($exists.pack_id)" -ForegroundColor Yellow
        Write-Host "Fecha: $($exists.used_date)" -ForegroundColor Yellow
        return $true
    } else {
        Write-Host "✅ NUEVO: Puedes usar esta fuente" -ForegroundColor Green
        return $false
    }
}

# Ejemplo de uso
Test-QuestionSourceUsed -SourceUrl "https://www.khanacademy.org/math/trigonometry/unit-circle"
```

### Después de Generar (OBLIGATORIO)

Agregar entrada al registry `docs/sources/questions-registry.json`:

```json
{
  "pack_id": "CO-MAT-11-trigonometria-005",
  "source": "Khan Academy",
  "source_url": "https://www.khanacademy.org/math/trigonometry/unit-circle-trig-func",
  "source_id": "khan:trig-unit-circle-005",
  "original_question_hash": "sha256:...",
  "used_date": "2025-12-10",
  "country": "CO",
  "grado": 11,
  "asignatura": "Matemáticas",
  "tema": "Trigonometría",
  "pack_file": "api/v1/CO/icfes/11/matematicas/5.json",
  "question_ids": [
    "CO-MAT-11-trigonometria-005-v1",
    "CO-MAT-11-trigonometria-005-v2",
    "CO-MAT-11-trigonometria-005-v3",
    "CO-MAT-11-trigonometria-005-v4",
    "CO-MAT-11-trigonometria-005-v5",
    "CO-MAT-11-trigonometria-005-v6",
    "CO-MAT-11-trigonometria-005-v7"
  ],
  "notes": "Adaptado con contexto colombiano - Torre Colpatria, río Magdalena"
}
```

**IMPORTANTE:** 
- Actualizar `total_packs` y `total_questions` en el registry
- Incrementar contador en `sources_summary` para la fuente usada
- Generar SHA-256 hash si es contenido custom

---

## 📖 Protocolo v2.0 - Resumen Ejecutivo

### Estructura de Cada Pack

Cada archivo JSON debe contener **exactamente 7 preguntas** organizadas así:

| # | Tipo | Dificultad | ID Suffix | Descripción |
|---|------|------------|-----------|-------------|
| 1 | Original | 3 | `-v1` | Pregunta base con contexto colombiano |
| 2 | Fácil A | 1 | `-v2` | Versión simplificada - reconocimiento básico |
| 3 | Fácil B | 2 | `-v3` | Versión simplificada - contexto diferente |
| 4 | Media A | 3 | `-v4` | Aplicación práctica con cultura local |
| 5 | Media B | 3 | `-v5` | Análisis o comparación |
| 6 | Difícil A | 4 | `-v6` | Multi-paso o síntesis |
| 7 | Difícil B | 5 | `-v7` | Razonamiento complejo |

### Formato de ID

```
CO-[ASIGNATURA]-09-[TEMA]-[###]-v[1-7]
```

**Ejemplos:**
- `CO-MAT-09-ecuaciones-002-v1` (Matemáticas, pack 2, pregunta 1)
- `CO-LEN-09-inferencial-002-v3` (Lenguaje, pack 2, pregunta 3)
- `CO-CIU-09-derechos-001-v7` (Ciudadanas, pack 1, pregunta 7)

---

## 🇨🇴 Contextualización Cultural - Colombia

### Elementos Obligatorios

Cada pack debe incluir referencias culturales colombianas:

| Categoría | Elementos a Usar |
|-----------|------------------|
| **Ciudades** | Bogotá, Medellín, Cali, Barranquilla, Cartagena, Bucaramanga |
| **Moneda** | Pesos colombianos (COP) - usar símbolo `$` |
| **Personajes** | Gabriel García Márquez, Shakira, James Rodríguez, Mariana Pajón |
| **Comidas** | Bandeja paisa, ajiaco, arepa, empanadas |
| **Fiestas** | Carnaval de Barranquilla, Feria de Cali, Feria de las Flores |
| **Geografía** | Andes, Caribe, Amazonas, Pacífico, Orinoquía |
| **Institución** | ICFES (Instituto Colombiano para la Evaluación de la Educación) |

### Ejemplo de Contextualización

❌ **MAL (sin contexto):**
```json
{
  "statement": "Si un producto cuesta 200 y tiene un descuento del 15%, ¿cuánto pagas?",
  "options": [...]
}
```

✅ **BIEN (con contexto colombiano):**
```json
{
  "statement": "En una tienda Éxito de Medellín, unos tenis Nike cuestan $200,000 COP. Si hay una promoción del 15% de descuento, ¿cuánto dinero ahorras?",
  "options": [
    {
      "id": "a",
      "text": "$30,000 COP",
      "isCorrect": true
    },
    {
      "id": "b",
      "text": "$170,000 COP",
      "isCorrect": false
    },
    {
      "id": "c",
      "text": "$15,000 COP",
      "isCorrect": false
    },
    {
      "id": "d",
      "text": "$185,000 COP",
      "isCorrect": false
    }
  ],
  "explanation": "El 15% de $200,000 es: 0.15 × 200,000 = $30,000 COP. Este es el ahorro.\n\n**¿Por qué las otras opciones están mal?**\n- **B ($170,000):** Esto es el precio final con descuento, no el ahorro.\n- **C ($15,000):** Error común al calcular 15% de 100 en lugar de 200,000.\n- **D ($185,000):** Suma incorrecta del descuento al precio.\n\n**Competencia evaluada:** Razonamiento cuantitativo - porcentajes y aplicaciones comerciales."
}
```

---

## 📁 Estructura JSON Esperada

### Metadata Global (top del archivo)

**ACTUALIZADO para Grado 11:**

```json
{
  "id": "CO-MAT-11-trigonometria-005",
  "country": "CO",
  "grado": 11,
  "asignatura": "Matemáticas",
  "tema": "Trigonometría",
  "protocol_version": "2.0",
  "total_questions": 7,
  "estado": "draft",
  "creador": "jules",
  "generation_date": "2025-12-10",
  "source": "Khan Academy",
  "source_url": "https://www.khanacademy.org/math/trigonometry/unit-circle-trig-func",
  "source_license": "CC BY-NC-SA 3.0",
  "questions": [...]
}
```

**Fuentes permitidas:**
- **OpenTDB:** CC BY-SA 4.0 (https://opentdb.com)
- **Khan Academy:** CC BY-NC-SA 3.0 (https://www.khanacademy.org)
- **Wikipedia:** CC BY-SA 3.0 (https://wikipedia.org)
- **Custom (AI):** Proprietary (generación propia)
- **ICFES Públicas:** Public Domain (ejemplos liberados)

### Estructura de Cada Pregunta

```json
{
  "id": "CO-MAT-11-trigonometria-005-v1",
  "difficulty": 3,
  "type": "multiple_choice",
  "statement": "En Bogotá, desde la cima de la Torre Colpatria (196 metros de altura), un observador mide un ángulo de depresión de 30° hacia un punto en la calle. ¿A qué distancia horizontal (en metros) está ese punto desde la base de la torre?",
  "options": [
    {
      "id": "a",
      "text": "113 metros",
      "isCorrect": false
    },
    {
      "id": "b",
      "text": "339 metros",
      "isCorrect": true
    },
    {
      "id": "c",
      "text": "226 metros",
      "isCorrect": false
    },
    {
      "id": "d",
      "text": "196 metros",
      "isCorrect": false
    }
  ],
  "explanation": "Este es un problema de trigonometría aplicada. El ángulo de depresión desde la torre es igual al ángulo de elevación desde el punto en la calle (ángulos alternos internos).\n\nUsamos la tangente:\ntan(30°) = altura / distancia horizontal\ntan(30°) = 196 / d\nd = 196 / tan(30°)\nd = 196 / 0.577\nd ≈ 339 metros\n\n**¿Por qué las otras opciones están mal?**\n- **A (113m):** Error al usar seno en lugar de tangente.\n- **C (226m):** Error de cálculo al usar tan(45°) en lugar de tan(30°).\n- **D (196m):** Confunde la altura con la distancia horizontal.\n\n**Contexto colombiano:** Torre Colpatria es el edificio más icónico de Bogotá.\n\n**Competencia evaluada:** Razonamiento cuantitativo - Aplicación de trigonometría en contextos reales.",
  "competencia": "Razonamiento cuantitativo"
}
```

**Longitud mínima de explicación:** 50+ palabras (para Grado 11, idealmente 80+ palabras en asignaturas como Lectura Crítica)

---

## ✅ Checklist de Validación

Antes de crear el PR, verifica que cada pack cumpla con:

### Formato Técnico
- [ ] Archivo JSON válido (sin errores de sintaxis)
- [ ] Exactamente 7 preguntas por pack
- [ ] IDs únicos con sufijo `-v1` a `-v7`
- [ ] Campo `protocol_version: "2.0"` presente
- [ ] Campo `creador: "jules"` presente
- [ ] Fecha de generación correcta (YYYY-MM-DD)
- [ ] **NUEVO:** Campos `source`, `source_url`, `source_license` presentes
- [ ] **NUEVO:** Grado correcto (11 para plan actual)

### Contenido Pedagógico
- [ ] Distribución de dificultades: 1 original (3), 2 fáciles (1-2), 2 medias (3), 2 difíciles (4-5)
- [ ] Explicaciones de 50+ palabras por pregunta (80+ para Lectura Crítica)
- [ ] Se explica por qué cada opción incorrecta está mal
- [ ] Competencia ICFES identificada en cada pregunta
- [ ] Distractores representan errores comunes (no opciones absurdas)

### Localización Colombia (Grado 11)
- [ ] Al menos 1 referencia cultural por pack (Torre Colpatria, TransMilenio, DANE, etc.)
- [ ] Moneda en COP ($) si hay ejemplos numéricos
- [ ] Lenguaje colombiano (no "vosotros", usar "ustedes")
- [ ] Nombres comunes en Colombia (Andrés, Camila, Santiago, Valentina)
- [ ] Contexto geográfico correcto (Bogotá 2600m altitud, clima Medellín vs Cartagena)
- [ ] Referencias culturales avanzadas (Acuerdos de Paz 2016, Constitución 1991, TLC, etc.)

### Tracking de Fuentes (OBLIGATORIO)
- [ ] **ANTES:** Consultaste `questions-registry.json` para verificar NO duplicado
- [ ] **DESPUÉS:** Agregaste entrada al registry con todos los campos
- [ ] Fuente tiene licencia compatible (CC BY-SA, CC BY-NC-SA, Public Domain)
- [ ] `source_id` es único globalmente
- [ ] Si es custom, generaste SHA-256 hash del texto original

### Progresión de Dificultad (Protocol v2.0)
- [ ] v1 (Original - dif. 3): Pregunta estándar del tema
- [ ] v2 (Fácil A - dif. 1): Reconocimiento básico
- [ ] v3 (Fácil B - dif. 2): Comprensión simple
- [ ] v4 (Media A - dif. 3): Aplicación práctica
- [ ] v5 (Media B - dif. 3): Análisis o comparación
- [ ] v6 (Difícil A - dif. 4): Multi-paso o síntesis
- [ ] v7 (Difícil B - dif. 5): Razonamiento complejo

---

## 📂 Estructura de Directorios

Los archivos generados deben ir en:

```
api/v1/CO/icfes/11/[asignatura]/[numero].json
```

**Para PR #1 (Matemáticas Grado 11):**

```
api/v1/CO/icfes/11/matematicas/
├── 5.json     # Trigonometría
├── 6.json     # Probabilidad avanzada
└── 7.json     # Cálculo diferencial
```

**Mapeo de asignaturas (Grado 11):**

| Asignatura | Directorio | Ejemplo |
|------------|-----------|---------|
| Matemáticas | `matematicas/` | `matematicas/5.json` |
| Lectura Crítica | `lectura-critica/` | `lectura-critica/2.json` |
| Ciencias Naturales | `ciencias-naturales/` | `ciencias-naturales/3.json` |
| Sociales y Ciudadanas | `sociales-ciudadanas/` | `sociales-ciudadanas/3.json` |
| Inglés | `ingles/` | `ingles/2.json` |
| Informática | `informatica/` | `informatica/2.json` |
| Ciencias Sociales | `ciencias-sociales/` | `ciencias-sociales/3.json` |

**Nota:** Los directorios ya existen. Agrega los archivos numerados según el template del PR.

---

## 🎓 Especificaciones PR #1 - Matemáticas Avanzadas

### Pack 5 - Trigonometría

**Competencia:** Razonamiento cuantitativo

**Conceptos a evaluar:**
- Funciones trigonométricas (seno, coseno, tangente)
- Círculo unitario y ángulos notables (30°, 45°, 60°)
- Identidades trigonométricas básicas (sen² + cos² = 1)
- Ecuaciones trigonométricas simples
- Aplicaciones: altura de edificios, navegación

**Contexto colombiano obligatorio:**
- Torre Colpatria (Bogotá - 196m)
- Río Magdalena (navegación)
- Puente Pumarejo (Barranquilla)

**Progresión de dificultad:**
1. **v1 (dif. 3):** Evaluar sen, cos, tan en ángulos notables (30°, 45°, 60°)
2. **v2 (dif. 1):** Reconocer valores de seno en círculo unitario
3. **v3 (dif. 2):** Calcular coseno de ángulo usando calculadora
4. **v4 (dif. 3):** Aplicar identidad pitagórica (sen² + cos² = 1)
5. **v5 (dif. 3):** Resolver ecuación trigonométrica simple
6. **v6 (dif. 4):** Problema de altura (edificio Torre Colpatria Bogotá)
7. **v7 (dif. 5):** Navegación en río Magdalena (ángulos de elevación/depresión)

**Fuente sugerida:** Khan Academy - Trigonometry unit circle

---

### Pack 6 - Probabilidad Avanzada

**Competencia:** Resolución de problemas

**Conceptos a evaluar:**
- Probabilidad básica (eventos, espacio muestral)
- Probabilidad condicional
- Eventos independientes vs dependientes
- Distribuciones básicas
- Aplicaciones con datos reales

**Contexto colombiano obligatorio:**
- Datos meteorológicos de Medellín (lluvia frecuente)
- Estadísticas COVID Colombia (DANE)
- Elecciones presidenciales Colombia

**Progresión de dificultad:**
1. **v1 (dif. 3):** Probabilidad de sacar bola roja de urna
2. **v2 (dif. 1):** Identificar evento seguro vs imposible
3. **v3 (dif. 2):** Calcular probabilidad con monedas
4. **v4 (dif. 3):** Probabilidad de llover en Medellín (datos meteorológicos)
5. **v5 (dif. 3):** Eventos independientes (lanzar 2 dados)
6. **v6 (dif. 4):** Probabilidad condicional (COVID en Colombia 2020)
7. **v7 (dif. 5):** Distribución binomial (votos elecciones colombianas)

**Fuente sugerida:** OpenTDB Statistics category o Khan Academy Probability

---

### Pack 7 - Cálculo Diferencial (Límites)

**Competencia:** Pensamiento matemático

**Conceptos a evaluar:**
- Concepto intuitivo de límite
- Límites por sustitución directa
- Límites laterales
- Límites al infinito
- Indeterminaciones básicas (0/0)
- Aplicación: Regla de L'Hôpital

**Contexto colombiano obligatorio:**
- Crecimiento poblacional Bogotá (DANE)
- Velocidad de expansión urbana Medellín
- Límites de capacidad TransMilenio

**Progresión de dificultad:**
1. **v1 (dif. 3):** Calcular límite algebraico simple
2. **v2 (dif. 1):** Reconocer gráfica de función continua
3. **v3 (dif. 2):** Evaluar límite por sustitución directa
4. **v4 (dif. 3):** Límite lateral (función partida)
5. **v5 (dif. 3):** Límite al infinito (función racional)
6. **v6 (dif. 4):** Resolver indeterminación 0/0
7. **v7 (dif. 5):** Aplicar L'Hôpital (velocidad de crecimiento población Bogotá)

**Fuente sugerida:** Khan Academy - Differential Calculus (Limits)

---

## 🎓 Temas Específicos Grado 9 (ARCHIVADO - No prioritario)

<details>
<summary>Ver temas Grado 9 (click para expandir)</summary>

### Matemáticas Pack 2 - Ecuaciones Lineales

**Conceptos a evaluar:**
- Resolución de ecuaciones de primer grado
- Despeje de variables
- Problemas verbales traducidos a ecuaciones
- Verificación de soluciones

**Progresión de dificultad:**
1. **v1 (Media):** Ecuación simple tipo `2x + 5 = 13`
2. **v2 (Fácil):** Reconocer si un valor es solución
3. **v3 (Fácil):** Ecuación sin paréntesis
4. **v4 (Media):** Problema verbal con ecuación
5. **v5 (Media):** Ecuación con paréntesis y distribución
6. **v6 (Difícil):** Ecuación con fracciones
7. **v7 (Difícil):** Problema de dos ecuaciones simultáneas

---

### Matemáticas Pack 3 - Geometría

**Conceptos a evaluar:**
- Áreas de figuras planas (triángulo, rectángulo, círculo)
- Perímetros
- Teorema de Pitágoras
- Problemas aplicados con medidas

**Progresión de dificultad:**
1. **v1 (Media):** Área de un rectángulo conocidos base y altura
2. **v2 (Fácil):** Perímetro de un cuadrado
3. **v3 (Fácil):** Identificar fórmula correcta de área de triángulo
4. **v4 (Media):** Calcular área de una cancha de fútbol en Colombia
5. **v5 (Media):** Área de figura compuesta (dos rectángulos)
6. **v6 (Difícil):** Problema con Teorema de Pitágoras
7. **v7 (Difícil):** Optimización de área con perímetro fijo

---

### Lenguaje Pack 2 - Comprensión Inferencial

**Conceptos a evaluar:**
- Inferir información no explícita
- Identificar el propósito del autor
- Deducir significado de palabras por contexto
- Predecir consecuencias

**Progresión de dificultad:**
1. **v1 (Media):** Leer párrafo sobre Cartagena, inferir clima
2. **v2 (Fácil):** Identificar tono (alegre, triste, serio)
3. **v3 (Fácil):** Propósito básico (informar, entretener, persuadir)
4. **v4 (Media):** Inferir causa de un evento en el texto
5. **v5 (Media):** Deducir significado de palabra desconocida
6. **v6 (Difícil):** Inferir relación entre dos personajes
7. **v7 (Difícil):** Predecir desenlace basado en pistas

---

### Lenguaje Pack 3 - Tipología Textual

**Conceptos a evaluar:**
- Identificar tipo de texto (narrativo, expositivo, argumentativo)
- Reconocer estructura textual
- Identificar recursos literarios
- Diferenciar entre hecho y opinión

**Progresión de dificultad:**
1. **v1 (Media):** Clasificar texto como narrativo/expositivo/argumentativo
2. **v2 (Fácil):** Reconocer un cuento vs una noticia
3. **v3 (Fácil):** Identificar introducción, desarrollo, conclusión
4. **v4 (Media):** Reconocer metáfora en texto literario colombiano
5. **v5 (Media):** Diferenciar hecho de opinión en artículo
6. **v6 (Difícil):** Analizar estructura argumentativa (tesis, argumentos)
7. **v7 (Difícil):** Identificar múltiples recursos literarios

---

### Ciencias Naturales Pack 2 - Ecosistemas Colombianos

**Conceptos a evaluar:**
- Biodiversidad de Colombia (5 regiones naturales)
- Relaciones entre seres vivos (cadenas alimentarias)
- Adaptaciones al medio
- Conservación y amenazas

**Progresión de dificultad:**
1. **v1 (Media):** Identificar productores, consumidores, descomponedores en ecosistema amazónico
2. **v2 (Fácil):** Reconocer animales del Caribe colombiano
3. **v3 (Fácil):** Identificar región natural de Colombia en foto
4. **v4 (Media):** Explicar cadena alimentaria en páramo
5. **v5 (Media):** Comparar ecosistema Andino vs Pacífico
6. **v6 (Difícil):** Predecir efecto de deforestación en Amazonas
7. **v7 (Difícil):** Analizar problema de especies invasoras (ej: hipopótamos de Escobar)

---

### Ciencias Naturales Pack 3 - Reacciones Químicas

**Conceptos a evaluar:**
- Concepto de reacción química
- Reactivos y productos
- Conservación de la masa
- Tipos de reacciones (síntesis, descomposición)

**Progresión de dificultad:**
1. **v1 (Media):** Identificar reactivos y productos en ecuación simple
2. **v2 (Fácil):** Reconocer cambio físico vs químico (cocinar arepas)
3. **v3 (Fácil):** Símbolo químico de elementos comunes (Fe, O, H)
4. **v4 (Media):** Balancear ecuación simple
5. **v5 (Media):** Aplicar conservación de masa en reacción
6. **v6 (Difícil):** Clasificar tipo de reacción
7. **v7 (Difícil):** Problema estequiométrico básico

---

### Competencias Ciudadanas Pack 1 - Derechos Fundamentales

**Conceptos a evaluar:**
- Constitución Política de Colombia (1991)
- Derechos fundamentales (vida, igualdad, libertad)
- Deberes ciudadanos
- Mecanismos de protección (tutela, derecho de petición)

**Progresión de dificultad:**
1. **v1 (Media):** Identificar derecho fundamental vulnerado en caso
2. **v2 (Fácil):** Reconocer año de actual Constitución (1991)
3. **v3 (Fácil):** Listar derechos fundamentales
4. **v4 (Media):** Determinar cuándo usar tutela
5. **v5 (Media):** Relacionar derecho con deber correspondiente
6. **v6 (Difícil):** Analizar conflicto de derechos (libertad vs seguridad)
7. **v7 (Difícil):** Caso complejo con múltiples derechos afectados

---

### Competencias Ciudadanas Pack 2 - Convivencia y Paz

**Conceptos a evaluar:**
- Resolución pacífica de conflictos
- Empatía y manejo de emociones
- Acuerdos y normas de convivencia
- Diversidad y pluralidad

**Progresión de dificultad:**
1. **v1 (Media):** Identificar estrategia de resolución de conflicto
2. **v2 (Fácil):** Reconocer emoción en situación dada
3. **v3 (Fácil):** Elegir comportamiento empático
4. **v4 (Media):** Evaluar consecuencias de acciones en conflicto
5. **v5 (Media):** Proponer acuerdo para convivencia en colegio
6. **v6 (Difícil):** Analizar dilema moral en contexto colombiano
7. **v7 (Difícil):** Evaluar política pública de paz en Colombia

---

## 🚀 Workflow de Generación

### Paso 1: Preparar Prompt

Para cada pack, usa este template de prompt:

```
Genera un pack de preguntas v2.0 para Colombia Grado 9°.

**Asignatura:** [Matemáticas/Lenguaje/Ciencias/Ciudadanas]
**Tema:** [Tema específico]
**Pack número:** [#]

Requisitos:
- Exactamente 7 preguntas siguiendo protocolo v2.0
- Dificultades: 1, 2, 3, 3, 3, 4, 5
- Contexto cultural colombiano (ciudades: Bogotá, Medellín, Cali)
- Moneda en pesos colombianos (COP)
- IDs: CO-[ASIG]-09-[TEMA]-[###]-v[1-7]
- Explicaciones de 50+ palabras
- Competencias ICFES identificadas

Formato JSON según estructura especificada.
```

---

### Paso 2: Generar Contenido

Usa tu herramienta de generación preferida (Claude, GPT-4, Gemini) con el protocolo completo como contexto.

---

### Paso 3: Validar

Ejecuta checklist de validación (ver arriba).

---

### Paso 4: Crear PR

```bash
# Crear branch
git checkout -b jules/grado9-phase1

# Agregar archivos
git add api/v1/CO/icfes/9/matematicas/2.json
git add api/v1/CO/icfes/9/matematicas/3.json
git add api/v1/CO/icfes/9/lenguaje/2.json
# ... (resto de archivos)

# Commit
git commit -m "feat(colombia): agregar 8 packs Grado 9 - Fase 1

- Matemáticas: ecuaciones lineales, geometría
- Lenguaje: comprensión inferencial, tipología textual
- Ciencias Naturales: ecosistemas colombianos, reacciones químicas
- Competencias Ciudadanas: derechos fundamentales, convivencia y paz

Protocolo v2.0 (7 preguntas por pack)
Total: 56 preguntas generadas

@jules"

# Push
git push origin jules/grado9-phase1
```

---

### Paso 5: Crear Pull Request

**Título del PR:**
```
feat(colombia): Agregar 8 packs Grado 9 - Fase 1 by @jules
```

**Descripción del PR:**

```markdown
## 📋 Resumen

Este PR agrega **8 nuevos packs de preguntas** para Colombia Grado 9° siguiendo el Protocolo v2.0.

### Packs Incluidos

| Asignatura | Pack # | Tema | Archivo | Preguntas |
|------------|--------|------|---------|-----------|
| Matemáticas | 2 | Ecuaciones lineales | `matematicas/2.json` | 7 |
| Matemáticas | 3 | Geometría | `matematicas/3.json` | 7 |
| Lenguaje | 2 | Comprensión inferencial | `lenguaje/2.json` | 7 |
| Lenguaje | 3 | Tipología textual | `lenguaje/3.json` | 7 |
| Ciencias Naturales | 2 | Ecosistemas colombianos | `ciencias_naturales/2.json` | 7 |
| Ciencias Naturales | 3 | Reacciones químicas | `ciencias_naturales/3.json` | 7 |
| Competencias Ciudadanas | 1 | Derechos fundamentales | `competencias_ciudadanas/1.json` | 7 |
| Competencias Ciudadanas | 2 | Convivencia y paz | `competencias_ciudadanas/2.json` | 7 |

**Total:** 56 preguntas (8 packs × 7 preguntas)

---

## ✅ Checklist de Validación

### Formato Técnico
- [x] JSON válido (sin errores de sintaxis)
- [x] 7 preguntas por pack
- [x] IDs únicos con sufijos `-v1` a `-v7`
- [x] `protocol_version: "2.0"` presente
- [x] `creador: "jules"` presente
- [x] Fecha de generación: 2025-12-09

### Contenido Pedagógico
- [x] Distribución de dificultades: 2-3-2 (fácil-media-difícil)
- [x] Explicaciones de 50+ palabras
- [x] Explicación de opciones incorrectas
- [x] Competencias ICFES identificadas
- [x] Distractores plausibles (errores comunes)

### Localización Colombia
- [x] Referencias culturales (ciudades, comida, personajes)
- [x] Moneda en COP ($)
- [x] Lenguaje colombiano (ustedes, no vosotros)
- [x] Nombres comunes en Colombia
- [x] Contexto geográfico correcto

---

## 🎯 Impacto

Este PR completa la **Fase 1** del plan de contenido para Colombia:
- Grado 9° pasa de 3 packs a **11 packs** (+267% de contenido)
- Se crea nueva asignatura: Competencias Ciudadanas (antes 0 packs)
- Cobertura balanceada de todas las asignaturas oficiales ICFES

---

## 👀 Revisión Solicitada

Por favor revisar:
1. **Calidad pedagógica:** ¿Las preguntas evalúan correctamente los conceptos?
2. **Contextualización:** ¿Las referencias culturales son apropiadas y precisas?
3. **Progresión de dificultad:** ¿La escalera 1-2-3-3-3-4-5 se respeta?
4. **Distractores:** ¿Representan errores comunes de estudiantes colombianos de 9°?

---

## 📎 Referencias

- [Protocolo v2.0](../../docs/QUESTION_GENERATION_PROTOCOL_V2.md)
- [Análisis de packs](../../docs/reports/colombia-packs-status.md)
- [Configuración Colombia](../../saberparatodos/config/country.ts)

---

cc: @jules
```

---

## 🎓 Recursos Adicionales

### Ejemplos de Packs Existentes (para referencia)

Revisa estos packs bien formados:

- `api/v1/CO/icfes/11/matematicas/1.json` (pack grande, bien estructurado)
- `api/v1/CO/icfes/11/lectura_critica/1.json` (explicaciones detalladas)
- `api/v1/CO/icfes/11/sociales_y_ciudadanas/1.json` (buen contexto colombiano)

### Herramientas de Validación

```bash
# Validar sintaxis JSON
cat api/v1/CO/icfes/9/matematicas/2.json | jq .

# Contar preguntas
cat api/v1/CO/icfes/9/matematicas/2.json | jq '.questions | length'

# Verificar IDs únicos
cat api/v1/CO/icfes/9/matematicas/2.json | jq '.questions[].id'
```

---

## 🤝 Soporte

Si tienes dudas o necesitas clarificación:
1. **Revisa el [Protocolo v2.0](../QUESTION_GENERATION_PROTOCOL_V2.md)** completo
2. **Consulta el [análisis de packs](./colombia-packs-status.md)**
3. **Pregunta en el PR** o issue correspondiente

---

## 📅 Timeline

| Fecha | Hito |
|-------|------|
| **2025-12-09** | Inicio de Fase 1 (este documento) |
| **2025-12-16** | Entrega de 8 packs Grado 9 |
| **2025-12-23** | Revisión y merge (si aprobado) |
| **2026-01-06** | Inicio Fase 2 (Grado 5) |

---

¡Buena suerte con la generación, @jules! 🚀

---

*Documento generado por GitHub Copilot*
*Versión: 1.0 | Fecha: 2025-12-09*
