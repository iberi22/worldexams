# Argentina — Reglas de Generación de Bundles

## Examen Oficial
- **Examen:** Aprender (Operativo Nacional de Evaluación)
- **Agencia:** Ministerio de Educación de la Nación (Secretaría de Evaluación e Información Educativa)
- **Grados objetivo:** 6° y 5°/6° Secundaria (último año)
- **Materias evaluadas:** Lengua, Matemática, Ciencias Sociales (rotatorio), Ciencias Naturales (rotatorio)
- **Referencia:** https://www.argentina.gob.ar/educacion/aprender

## Currículo (NAP — Núcleos de Aprendizajes Prioritarios)

### Grado 11 — Matemática
- Números reales y operaciones
- Expresiones algebraicas, ecuaciones y funciones
- Trigonometría y geometría analítica
- Estadística y probabilidad
- Análisis de funciones (límites, derivadas básicas)

### Grado 11 — Ciencias Naturales
- Biología molecular, genética
- Química general, soluciones y reacciones
- Física: mecánica clásica, termodinámica
- Ecología y evolución

### Grado 11 — Lengua
- Comprensión lectora de textos expositivos y argumentativos
- Producción de textos académicos
- Argumentación escrita
- Ensayo argumentativo

### Grado 11 — Lectura Crítica
- Análisis de textos narrativos y poéticos
- Textos periodísticos y de opinión
- Literatura argentina contemporánea

### Grado 6 — Lengua
- Lectura de cuentos y fábulas
- Comprensión de textos narrativos
- Gramática y ortografía básica

## Reglas Culturales
- **Voseo:** Usar "vos" en lugar de "tú" (ej: "¿vos creés?")
- **Moneda:** Peso argentino (ARS $)
- **Ciudades:** Buenos Aires, Córdoba, Rosario, Mendoza, La Plata, Bariloche, Salta
- **Nombres:** Juan, Martín, Lucía, Valentina, Facundo, Camila, Santiago, Sofía
- **Instituciones:** UBA, CONICET, INTA, hospitales públicos, escuelas técnicas
- **Contextos:** Feriados nacionales (25 de Mayo, 9 de Julio), mate, asado, fútbol, barrios porteños

## Subjects Keys
| Subject | Key | Carpeta |
|---------|-----|---------|
| Matemática | matematica | `matematica/` |
| Lengua | lengua | `lengua/` |
| Lectura Crítica | lectura-critica | `lectura-critica/` |
| Ciencias Naturales | ciencias-naturales | `ciencias-naturales/` |
| Sociales/Ciudadanas | sociales-ciudadanas | `sociales-ciudadanas/` |
| Inglés | ingles | `ingles/` |

## Directorio Canónico
```
questions_data/argentina/
  {subject}/
    grado-{N}/
      2026/
        weekly/
          AR-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

## Formato Obligatorio
- Seguir `PROTOCOL_v7.md` — strictamente
- `protocol_version: "7.0"`
- `country: "argentina"`
- `tier: "mastery"` (nunca "legacy")
- `creador: "Jules-Agent"`
- Sin placeholders, sin inglés en feedback

## Distribución Semanal Sugerida (Matemática G11)
- W01-W05: Números reales, álgebra, ecuaciones
- W06-W10: Funciones, gráficas, trigonometría
- W11-W20: Análisis, límites, derivadas
- W21-W30: Estadística, probabilidad
- W31-W40: Problemas integradores

## Validación
```bash
node scripts/validate-bundles-v7.mjs questions_data/argentina/**/*.md
```
