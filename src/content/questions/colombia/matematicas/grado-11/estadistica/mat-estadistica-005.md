---
id: "CO-MAT-11-estadistica-005"
country: "co"
grado: 11
asignatura: "Matemáticas"
tema: "Estadística"
dificultad: 4
estado: "draft"
creador: "Jules"
protocol_version: "2.0"
source: "Saber11-style"
---
# Pregunta
En una urna hay 4 bolas rojas y 6 bolas azules. Si se extraen 2 bolas sin reposición, ¿cuál es la probabilidad de que ambas sean rojas?

# Opciones
- [ ] A) 4/25
- [x] B) 2/15
- [ ] C) 1/5
- [ ] D) 3/10

# Explicación Pedagógica

**¿Por qué B es correcta?**
Este problema involucra probabilidad condicional. La probabilidad de que la primera bola sea roja es el número de bolas rojas (4) dividido por el número total de bolas (10), es decir, $P(\text{1ra roja}) = \frac{4}{10}$.
Como la extracción es sin reposición, después de sacar una bola roja, quedan 9 bolas en total, de las cuales 3 son rojas. La probabilidad de que la segunda bola también sea roja, dado que la primera fue roja, es $P(\text{2da roja | 1ra roja}) = \frac{3}{9}$.
La probabilidad de que ambos eventos ocurran es el producto de sus probabilidades: $P(\text{ambas rojas}) = \frac{4}{10} \times \frac{3}{9} = \frac{12}{90}$. Simplificando esta fracción, se obtiene $\frac{2}{15}$.

**¿Por qué las otras opciones son incorrectas?**
- **A) 4/25:** Este error ocurre si se calcula la probabilidad con reposición ($\frac{4}{10} \times \frac{4}{10} = \frac{16}{100} = \frac{4}{25}$).
- **C) 1/5:** Este es el resultado de simplificar incorrectamente la fracción.
- **D) 3/10:** Este valor podría obtenerse al sumar las probabilidades o cometer algún otro error de cálculo.

**Competencia evaluada:** Formulación y ejecución
**Componente:** Aleatorio
