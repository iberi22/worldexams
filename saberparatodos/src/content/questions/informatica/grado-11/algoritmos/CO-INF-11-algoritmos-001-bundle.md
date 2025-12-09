---
id: "CO-INF-11-algoritmos-001-bundle"
country: "CO"
grado: 11
asignatura: "Informática"
tema: "Algoritmos y Lógica"
dificultad: 3
estado: "draft"
creador: "Copilot"
source_lang: "es-CO"
llm_model: "Cascade"
agent: "Cascade"
ide: "VS Code"
bundle_version: "2.1"
total_questions: 7
difficulty_distribution: "Mixta (1-4)"
generation_date: "2025-12-06"

# === SOURCE ATTRIBUTION ===
source: "ICFES-Curriculum"
source_url: "https://www.icfes.gov.co"
source_license: "Educational Use - Colombian Curriculum"
source_id: "ICFES-INF-11-ALGO"
original_concept: "Computational thinking and algorithms"
competencia_icfes: "Pensamiento computacional"
componente: "Lógica y Programación"

# === UNIVERSAL SHARING ===
universal_question: true
applicable_exams: ["CO-Saber11", "MX-EXANI", "AP-Computer-Science"]
---

# Bundle: Algoritmos y Pensamiento Computacional

> **Contexto:** Resolución de problemas lógicos y conceptos básicos de programación.
> **Competencia:** Abstracción, descomposición y diseño de algoritmos.

---

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Competencia ICFES | Estado |
|----------|-----|------------|-------------------|--------|
| 1 | CO-INF-11-algoritmos-001-v1 | 3 | Eficiencia (Sorting) | ⬜ |
| 2 | CO-INF-11-algoritmos-001-v2 | 2 | Condicionales | ⬜ |
| 3 | CO-INF-11-algoritmos-001-v3 | 2 | Bucles | ⬜ |
| 4 | CO-INF-11-algoritmos-001-v4 | 3 | Variables | ⬜ |
| 5 | CO-INF-11-algoritmos-001-v5 | 1 | Hardware vs Software | ⬜ |
| 6 | CO-INF-11-algoritmos-001-v6 | 4 | Debugging (Lógica) | ⬜ |
| 7 | CO-INF-11-algoritmos-001-v7 | 2 | Diagramas de Flujo | ⬜ |

---

## Pregunta 1

**ID:** `CO-INF-11-algoritmos-001-v1`

### Enunciado

Un estudiante necesita organizar una lista de 50 nombres alfabéticamente (tarjetas físicas). ¿Cuál de los siguientes enfoques describe el algoritmo más eficiente y estructurado (equivalente a **Merge Sort**)?

### Opciones

- [ ] A) Mirar todas las tarjetas al mismo tiempo y adivinar el orden.
- [ ] B) Tomar una tarjeta, ponerla en una mesa, y repetir una por una buscando su lugar (Insertion Sort simple).
- [x] C) Dividir el mazo en dos mitades, ordenar cada mitad recursivamente y luego mezclar las mitades ordenadas.
- [ ] D) Lanzar las tarjetas al aire y ver si caen ordenadas.

### Explicación
**Divide y Vencerás:** La opción C describe la lógica de Merge Sort ($O(n \log n)$), que es mucho más eficiente para grandes volúmenes de datos que los métodos simples como mirar una por una.

---

## Pregunta 2

**ID:** `CO-INF-11-algoritmos-001-v2`

### Enunciado

En programación, una estructura **condicional** (`if-else`) se utiliza para:

### Opciones

- [ ] A) Repetir una acción muchas veces.
- [x] B) Tomar decisiones basadas en si una afirmación es verdadera o falsa.
- [ ] C) Almacenar un número decimal.
- [ ] D) Conectar el computador a internet.

### Explicación
**Decisión:** Permite que el programa ejecute diferentes bloques de código según se cumpla o no una condición (ej: "Si es mayor de edad, entrar; sino, salir").

---

## Pregunta 3

**ID:** `CO-INF-11-algoritmos-001-v3`

### Enunciado

¿Qué estructura de control usarías para imprimir los números del 1 al 100 sin escribir 100 líneas de código?

### Opciones

- [ ] A) Una variable.
- [ ] B) Un condicional.
- [x] C) Un bucle o ciclo (como `for` o `while`).
- [ ] D) Una base de datos.

### Explicación
**Iteración:** Los bucles permiten repetir una instrucción múltiples veces de forma automática y eficiente.

---

## Pregunta 4

**ID:** `CO-INF-11-algoritmos-001-v4`

### Enunciado

Analiza el siguiente pseudocódigo:
```
x = 5
y = 10
x = x + y
y = x - y
x = x - y
```
Al final, ¿cuánto valen `x` e `y`?

### Opciones

- [ ] A) x=15, y=5
- [ ] B) x=5, y=10 (no cambian)
- [x] C) x=10, y=5 (se intercambian)
- [ ] D) x=0, y=0

### Explicación
**Intercambio (Swap):**
1. x = 5 + 10 = 15
2. y = 15 - 10 = 5
3. x = 15 - 5 = 10
Resultado: x=10, y=5. Es un algoritmo clásico de intercambio sin variable temporal.

---

## Pregunta 5

**ID:** `CO-INF-11-algoritmos-001-v5`

### Enunciado

¿Cuál de los siguientes es un ejemplo de **Software**?

### Opciones

- [ ] A) El teclado.
- [ ] B) El disco duro.
- [x] C) El sistema operativo Windows.
- [ ] D) La memoria RAM.

### Explicación
**Intangible:** Software son los programas y datos. Hardware (A, B, D) son las partes físicas.

---

## Pregunta 6

**ID:** `CO-INF-11-algoritmos-001-v6`

### Enunciado

Tienes un algoritmo para hacer café que falla.
1. Calentar agua.
2. Servir agua en la taza.
3. Poner café en el filtro.
4. Poner filtro sobre la taza.
**Error:** El agua se sirve antes de pasar por el café. ¿Cómo lo corriges?

### Opciones

- [ ] A) Eliminar el paso 1.
- [x] B) Mover el paso 2 al final (después de poner filtro y café).
- [ ] C) Invertir paso 3 y 4.
- [ ] D) No tiene solución.

### Explicación
**Secuencialidad:** El orden importa. El agua debe pasar por el café PARA llegar a la taza como bebida. Servirla antes (paso 2) solo da agua caliente.

---

## Pregunta 7

**ID:** `CO-INF-11-algoritmos-001-v7`

### Enunciado

En un diagrama de flujo, ¿qué forma geométrica representa generalmente una **decisión** (Sí/No)?

### Opciones

- [ ] A) Rectángulo.
- [ ] B) Círculo.
- [x] C) Rombo.
- [ ] D) Flecha.

### Explicación
**Rombo:** Es el estándar para bifurcaciones condicionales. Rectángulo es proceso, Círculo/Ovalo es inicio/fin.
