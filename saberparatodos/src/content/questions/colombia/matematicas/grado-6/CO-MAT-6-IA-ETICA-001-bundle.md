---
id: CO-MAT-6-IA-ETICA-001
country: co
grado: 6
asignatura: Matemáticas
tema: IA y Ética Algorítmica
protocol_version: '3.0'
total_questions: 10
estado: published
creador: Antigravity AI
generation_date: '2025-12-22'
source: World Exams Original
lineamientos:
  nacional: MEN - Pensamiento variacional y sistemas algebraicos
  internacional: UNESCO - Alfabetización en IA y Ética de los Datos
contexto: Futuro cercano - Ética en sistemas automatizados
llm_model: gemini-1.5-pro
agent: jules
ide: vscode
bundle_version: '2.0'
dificultad: 3
dba_id: DBA-TODO
creation_date: '2026-01-31'
---

# Pregunta Base: Sesgo Algorítmico y Probabilidad

> **Contexto:** En una escuela del futuro, una Inteligencia Artificial llamada "Edu-Score" decide quiénes entran al club de robótica basándose en datos históricos. Sin embargo, los estudiantes descubren que la IA tiene un "sesgo": prefiere a estudiantes que viven cerca de la escuela porque asocia la cercanía con la puntualidad.

---

## Pregunta 1 (Original - Dificultad 3)

**ID:** `CO-MAT-6-IA-ETICA-001-v1`

### Enunciado
Si la IA analiza a 100 aspirantes y tiene una regla que dice: "Si el estudiante vive a más de 5km, bajar su puntaje en un 20%". De los 100 aspirantes, 40 viven lejos. ¿A cuántos estudiantes les bajó el puntaje injustamente por su ubicación?

### Opciones
- [ ] A) 20 estudiantes
- [x] B) 40 estudiantes
- [ ] C) 80 estudiantes
- [ ] D) 60 estudiantes

### Explicación Pedagógica
> ### 📊 Info-Tarjeta: Sesgo Algorítmico
> **¿Por qué es importante?**: Los algoritmos no son siempre "justos". Si los datos con los que aprenden tienen prejuicios (como asumir que alguien lejos será impuntual), la IA repetirá esa injusticia.
> **Concepto Clave**: **Sesgo (Bias)**. Es un error sistemático que hace que una IA favorezca o perjudique a un grupo sin razón lógica.
> **Dato Curioso**: En 2018, una gran empresa tuvo que apagar su IA de contratación porque aprendió a discriminar a las mujeres basándose en datos de los últimos 10 años.
> **Análisis**: El enunciado dice claramente que 40 viven lejos y la regla se aplica a todos los que viven a más de 5km. Por tanto, 40 estudiantes son los afectados.

---

## Pregunta 2 (Fácil A - Dificultad 1)

**ID:** `CO-MAT-6-IA-ETICA-001-v2`

### Enunciado
La IA clasifica a los estudiantes en dos grupos: "Cerca" y "Lejos". Si hay 100 estudiantes y 60 están en el grupo "Cerca", ¿cuántos están en el grupo "Lejos"?

### Opciones
- [x] A) 40
- [ ] B) 60
- [ ] C) 100
- [ ] D) 0

### Explicación Pedagógica
> ### 📊 Info-Tarjeta: Clasificación Binaria
> **Concepto Clave**: La IA a menudo usa **Clasificación Binaria** (Cero o Uno, Sí o No).
> **Análisis**: 100 (Total) - 60 (Cerca) = 40 (Lejos).

---

## Pregunta 3 (Fácil B - Dificultad 2)

**ID:** `CO-MAT-6-IA-ETICA-001-v3`

### Enunciado
La IA tarda 2 segundos en procesar los datos de un estudiante. Si hay un grupo de 10 estudiantes "Lejos", ¿cuánto tiempo total invertirá la IA en procesarlos a todos?

### Opciones
- [ ] A) 5 segundos
- [ ] B) 12 segundos
- [x] C) 20 segundos
- [ ] D) 10 segundos

### Explicación Pedagógica
> ### 📊 Info-Tarjeta: Procesamiento en Lote
> **Dato Curioso**: Las IA modernas pueden procesar millones de datos en segundos gracias a las GPU (unidades de procesamiento gráfico).
> **Análisis**: 10 estudiantes × 2 segundos = 20 segundos.

---

## Pregunta 4 (Media A - Dificultad 3)

**ID:** `CO-MAT-6-IA-ETICA-001-v4`

### Enunciado
Para corregir el sesgo, los estudiantes proponen que la IA use la "Probabilidad de Puntualidad Real" en lugar de la distancia. Si un estudiante vive lejos pero ha llegado puntual 9 de cada 10 veces, ¿cuál es su probabilidad de ser puntual expresada en porcentaje?

### Opciones
- [ ] A) 9%
- [ ] B) 10%
- [x] C) 90%
- [ ] D) 19%

### Explicación Pedagógica
> ### 📊 Info-Tarjeta: Probabilidad y Datos
> **Concepto Clave**: La probabilidad ayuda a la IA a predecir el futuro basándose en hechos pasados, no en suposiciones.
> **Análisis**: 9/10 es igual a 0.9, que multiplicado por 100 nos da el 90%.

---

## Pregunta 5 (Media B - Dificultad 3)

**ID:** `CO-MAT-6-IA-ETICA-001-v5`

### Enunciado
Si la IA decide que el 30% de los cupos del club son para estudiantes "Lejos" para compensar el error, y el club tiene 20 cupos totales, ¿cuántos estudiantes de zonas lejanas entrarán?

### Opciones
- [ ] A) 3 estudiantes
- [x] B) 6 estudiantes
- [ ] C) 10 estudiantes
- [ ] D) 7 estudiantes

### Explicación Pedagógica
> ### 📊 Info-Tarjeta: Acciones Afirmativas Algorítmicas
> **¿Por qué es importante?**: A veces los programadores deben escribir reglas extra para asegurar la equidad (Equity).
> **Análisis**: El 30% de 20 es (30/100) × 20 = 6.

---

## Pregunta 6 (Difícil A - Dificultad 4)

**ID:** `CO-MAT-6-IA-ETICA-001-v6`

### Enunciado
Los datos de "Edu-Score" muestran que el costo promedio de transporte para los estudiantes de la zona Lejos es de $5,000 COP y para la zona Cerca es de $2,000 COP. Si un grupo de 5 estudiantes de zona Lejos y 5 de zona Cerca viajan juntos, ¿cuál es el costo promedio de transporte de este grupo de 10 personas?

### Opciones
- [ ] A) $7,000 COP
- [x] B) $3,500 COP
- [ ] C) $2,500 COP
- [ ] D) $4,000 COP

### Explicación Pedagógica
> ### 📊 Info-Tarjeta: Promedios Ponderados
> **Concepto Clave**: El promedio nos da una idea general de un grupo, pero puede ocultar desigualdades económicas.
> **Análisis**: Total Lejos = 5 × 5000 = 25000. Total Cerca = 5 × 2000 = 10000. Suma total = 35000. Promedio = 35000 / 10 = 3500.

---

## Pregunta 7 (Difícil B - Dificultad 5)

**ID:** `CO-MAT-6-IA-ETICA-001-v7`

### Enunciado
La IA detecta que si aumenta el número de servidores en un 50%, el sesgo disminuye porque puede analizar más variables. Si actualmente hay 8 servidores y analizan 4 variables cada uno, ¿cuántas variables totales podrá analizar la IA si aumenta los servidores en un 50% manteniendo las 4 variables por servidor?

### Opciones
- [ ] A) 32 variables
- [ ] B) 40 variables
- [x] C) 48 variables
- [ ] D) 60 variables

### Explicación Pedagógica
> ### 📊 Info-Tarjeta: Escalabilidad
> **Concepto Clave**: La **Escalabilidad** es la capacidad de un sistema para crecer y manejar más trabajo.
> **Análisis**: Aumento del 50% de 8 servidores = 4 servidores extra (total 12). 12 servidores × 4 variables = 48 variables.

---

## Pregunta 10 (Extra 3 - Dificultad 5)

**ID:** `CO-MAT-6-IA-ETICA-001-v10`

### Enunciado
Si la IA predice que la probabilidad de que un estudiante sea un "Genio de la Robótica" es del 0.05, ¿cómo se expresa este valor en fracción simplificada?

### Opciones
- [ ] A) 1/5
- [ ] B) 1/10
- [ ] C) 1/50
- [x] D) 1/20

### Explicación Pedagógica
> ### 📊 Info-Tarjeta: Precisión vs. Generalización
> **Dato Curioso**: Las IA a menudo trabajan con números decimales muy pequeños (pesos sinápticos) para tomar decisiones.
> **Análisis**: 0.05 = 5/100. Simplificando (dividiendo entre 5): 1/20.
