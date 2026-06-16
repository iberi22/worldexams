# México — Reglas de Generación de Bundles

## Examen Oficial
- **Examen:** EXANI-II (Examen Nacional de Ingreso a la Educación Superior)
- **Agencia:** CENEVAL (Centro Nacional de Evaluación para la Educación Superior)
- **Grados objetivo:** 12° (último año de preparatoria / Educación Media Superior)
- **Formato:** 168 preguntas + 20 piloto, 4.5 horas
- **Referencia:** https://www.ceneval.edu.mx/examenes-exani-ii

## Currículo (SEP — Marco Curricular Común)

### EXANI-II — Transversales Obligatorias (65%)
| Materia | Preguntas | Temas |
|---------|-----------|-------|
| Comprensión Lectora | 30 | Textos continuos y discontinuos, inferencias, vocabulario |
| Redacción Indirecta | 30 | Cohesión, coherencia, ortografía, puntuación |
| Pensamiento Matemático | 30 | Aritmética, álgebra, estadística, probabilidad, geometría, trigonometría |

### EXANI-II — Módulos Específicos (35%)
Administración, Aritmética, Biología, Cálculo Diferencial e Integral, Ciencias de la Salud, Ciencias Experimentales, Ciencias Sociales, Derecho, Economía, Filosofía, Física, Historia, Literatura, Matemáticas Financieras, Probabilidad y Estadística, Psicología, Química.

### Grado 11 — Matemáticas
- Números reales, álgebra elemental
- Ecuaciones lineales y cuadráticas
- Geometría euclidiana y trigonometría
- Funciones y gráficas
- Estadística descriptiva

### Grado 11 — Ciencias Naturales
- Biología celular y molecular
- Química general y orgánica
- Física: mecánica, termodinámica, electromagnetismo
- Ecología y evolución

### Grado 11 — Lectura Crítica
- Comprensión de textos argumentativos
- Análisis de textos literarios (narrativa, poesía)
- Textos periodísticos y de divulgación científica

### Grado 11 — Lengua
- Gramática y sintaxis del español
- Cohesión textual y redacción
- Tipologías textuales

### Grados 3-9
- Plan de estudios SEP: Español, Matemáticas, Ciencias, Historia, Geografía, Formación Cívica y Ética
- Dificultad progresiva por grado

## Reglas Culturales
- **Moneda:** Peso mexicano (MXN $)
- **Ciudades:** Ciudad de México, Guadalajara, Monterrey, Puebla, Cancún, Mérida, Oaxaca
- **Nombres:** Juan, María, José, Guadalupe, Pedro, Sofía, Miguel, Ana
- **Instituciones:** UNAM, IPN, IMSS, CONACYT, SEP
- **Contextos:** Tradiciones (Día de Muertos, 15 de Septiembre), gastronomía (tacos, mole, pozole), geografía (volcanes, playas, desiertos)

## Subjects Keys
| Subject | Key | Carpeta |
|---------|-----|---------|
| Matemáticas | matematicas | `matematicas/` |
| Lengua | lengua | `lengua/` |
| Lectura Crítica | lectura-critica | `lectura-critica/` |
| Ciencias Naturales | ciencias-naturales | `ciencias-naturales/` |
| Sociales/Ciudadanas | sociales-ciudadanas | `sociales-ciudadanas/` |
| Inglés | ingles | `ingles/` |

## Directorio Canónico
```
questions_data/mexico/
  {subject}/
    grado-{N}/
      2026/
        weekly/
          MX-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

## Distribución Semanal Sugerida (Matemáticas G11 EXANI-II)
- W01-W05: Aritmética y álgebra básica
- W06-W10: Ecuaciones y funciones
- W11-W15: Geometría y trigonometría
- W16-W20: Estadística y probabilidad
- W21-W30: Problemas de razonamiento matemático
- W31-W40: Integración y simulacros

## Validación
```bash
node scripts/validate-bundles-v7.mjs questions_data/mexico/**/*.md
```
