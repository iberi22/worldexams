---
id: "CO-MAT-09-algebra-001"
country: "CO"
grado: 9
asignatura: "Matemáticas"
tema: "Álgebra y funciones lineales"
dificultad: "Medium"
estado: "draft"
creador: "AI-WorldExams"
source_lang: "es-CO"
llm_model: "claude-sonnet-4-20250514"
agent: "Cascade"
ide: "VS Code"
bundle_version: "2.1"
total_questions: 7
difficulty_distribution: "1 original (3) + 2 fácil (1-2) + 2 media (3) + 2 difícil (4-5)"

# === SOURCE ATTRIBUTION ===
source: "ICFES-Curriculum"
source_url: "https://www.icfes.gov.co"
source_license: "Educational Use - Colombian Curriculum"
source_id: "ICFES-MAT-009-001"
original_concept: "Ecuaciones lineales"
competencia_icfes: "Formulación y ejecución"
componente: "Variacional"

# === UNIVERSAL SHARING ===
universal_question: true
applicable_exams: ["CO-Saber9", "MX-ENLACE-Media", "ES-ESO", "AR-Aprender"]
---

# Bundle: Álgebra y Funciones Lineales - Saber 9°

> **Contexto curricular:** Saber 9° evalúa competencias de razonamiento, comunicación y resolución en álgebra, incluyendo expresiones algebraicas, ecuaciones lineales, sistemas de ecuaciones y funciones.

---

## Pregunta 1 (Original)

**ID:** `CO-MAT-09-algebra-001-v1`
**Dificultad:** ⭐⭐⭐ (3/5 - Media)

### Enunciado

En una tienda de artesanías de Ráquira, Boyacá, don José vende vasijas de barro. El precio de venta $P$ (en pesos) de cada vasija depende del tamaño $t$ (en centímetros de altura) según la función:

$$P(t) = 2500t + 5000$$

Si don José quiere vender una vasija a $30.000$ pesos, ¿cuál debe ser la altura de la vasija?

### Opciones

- [ ] A) 8 cm
- [x] B) 10 cm
- [ ] C) 12 cm
- [ ] D) 15 cm

### Explicación

**¿Por qué B es correcta?**

Debemos encontrar $t$ cuando $P(t) = 30000$:

$$30000 = 2500t + 5000$$
$$30000 - 5000 = 2500t$$
$$25000 = 2500t$$
$$t = \frac{25000}{2500} = 10 \text{ cm}$$

**Verificación:** $P(10) = 2500(10) + 5000 = 25000 + 5000 = 30000$ ✓

**¿Por qué las otras no?**
- **A) 8 cm:** $P(8) = 2500(8) + 5000 = 25000$ pesos. Error al despejar.
- **C) 12 cm:** $P(12) = 2500(12) + 5000 = 35000$ pesos. Sobreestima el tamaño.
- **D) 15 cm:** $P(15) = 2500(15) + 5000 = 42500$ pesos. Confusión con el coeficiente.

**Competencia evaluada:** Resolución - despejar variable en función lineal

---

## Pregunta 2 (Variante Fácil)

**ID:** `CO-MAT-09-algebra-001-v2`
**Dificultad:** ⭐ (1/5 - Muy fácil)

### Enunciado

Si $x + 5 = 12$, ¿cuánto vale $x$?

### Opciones

- [ ] A) 5
- [x] B) 7
- [ ] C) 12
- [ ] D) 17

### Explicación

Despejamos $x$:
$$x = 12 - 5 = 7$$

**Verificación:** $7 + 5 = 12$ ✓

**¿Por qué las otras no?**
- **A) 5:** Es el número que se suma, no el resultado.
- **C) 12:** Es el resultado de la suma, no $x$.
- **D) 17:** Suma en vez de restar.

**Competencia evaluada:** Comunicación - operación básica de despeje

---

## Pregunta 3 (Variante Fácil)

**ID:** `CO-MAT-09-algebra-001-v3`
**Dificultad:** ⭐⭐ (2/5 - Fácil)

### Enunciado

En el restaurante "El Buen Sabor" de Cartagena, el valor total $V$ de un almuerzo corriente se calcula según la fórmula $V = 12000 + 2000n$, donde $n$ es el número de bebidas adicionales.

Si un cliente pagó $18.000$ pesos, ¿cuántas bebidas adicionales pidió?

### Opciones

- [ ] A) 2
- [x] B) 3
- [ ] C) 4
- [ ] D) 6

### Explicación

Despejamos $n$:
$$18000 = 12000 + 2000n$$
$$18000 - 12000 = 2000n$$
$$6000 = 2000n$$
$$n = 3 \text{ bebidas}$$

**Verificación:** $V(3) = 12000 + 2000(3) = 12000 + 6000 = 18000$ ✓

**Competencia evaluada:** Resolución - aplicación de ecuación lineal

---

## Pregunta 4 (Variante Media)

**ID:** `CO-MAT-09-algebra-001-v4`
**Dificultad:** ⭐⭐⭐ (3/5 - Media)

### Enunciado

La gráfica muestra la relación entre el tiempo (en horas) y la distancia recorrida (en kilómetros) por un bus intermunicipal que viaja de Bogotá a Medellín.

```
Distancia (km)
│
300├─────────────────────●
   │                   ╱
200├─────────────●───╱
   │           ╱
100├───────●─╱
   │     ╱
  0├───●─────────────────
   0   1   2   3   4   5  Tiempo (h)
```

Según la gráfica, ¿cuál es la velocidad promedio del bus en km/h?

### Opciones

- [ ] A) 50 km/h
- [x] B) 60 km/h
- [ ] C) 75 km/h
- [ ] D) 100 km/h

### Explicación

La velocidad promedio es la pendiente de la recta:

$$m = \frac{\Delta y}{\Delta x} = \frac{300 - 0}{5 - 0} = \frac{300}{5} = 60 \text{ km/h}$$

También se puede verificar con puntos intermedios:
- En $t=1$: $d=60$ → $\frac{60}{1} = 60$ km/h
- En $t=2$: $d=120$ → $\frac{120}{2} = 60$ km/h

**¿Por qué las otras no?**
- **A) 50 km/h:** Error de lectura o cálculo.
- **C) 75 km/h:** Confusión con la pendiente.
- **D) 100 km/h:** Lee mal la escala.

**Competencia evaluada:** Comunicación - interpretación de pendiente como tasa de cambio

---

## Pregunta 5 (Variante Media)

**ID:** `CO-MAT-09-algebra-001-v5`
**Dificultad:** ⭐⭐⭐ (3/5 - Media)

### Enunciado

Una empresa de servicios públicos en Cali cobra el servicio de agua según la función:

$$C(m) = 800m + 15000$$

donde $C$ es el costo en pesos y $m$ son los metros cúbicos consumidos. Si una familia quiere que su factura no supere $\$47.000$, ¿cuántos metros cúbicos puede consumir como máximo?

### Opciones

- [ ] A) 30 m³
- [ ] B) 35 m³
- [x] C) 40 m³
- [ ] D) 58 m³

### Explicación

Planteamos la inecuación:
$$800m + 15000 \leq 47000$$
$$800m \leq 47000 - 15000$$
$$800m \leq 32000$$
$$m \leq \frac{32000}{800}$$
$$m \leq 40$$

El consumo máximo es **40 m³**.

**Verificación:** $C(40) = 800(40) + 15000 = 32000 + 15000 = 47000$ ✓

**¿Por qué las otras no?**
- **A) 30 m³:** $C(30) = 39000$. Es válido pero no es el máximo.
- **B) 35 m³:** $C(35) = 43000$. Es válido pero no es el máximo.
- **D) 58 m³:** $C(58) = 61400$. Excede el presupuesto.

**Competencia evaluada:** Resolución - inecuaciones lineales

---

## Pregunta 6 (Variante Difícil)

**ID:** `CO-MAT-09-algebra-001-v6`
**Dificultad:** ⭐⭐⭐⭐ (4/5 - Difícil)

### Enunciado

En el mercado de la plaza de Villavicencio, doña Carmen vende naranjas y limones. El lunes vendió el doble de kilos de naranjas que de limones. Si en total vendió 36 kilos de frutas y cada kilo de naranjas cuesta $\$3.000$ y cada kilo de limones cuesta $\$4.500$, ¿cuánto dinero recibió doña Carmen por la venta del lunes?

### Opciones

- [ ] A) $\$108.000$
- [x] B) $\$126.000$
- [ ] C) $\$144.000$
- [ ] D) $\$162.000$

### Explicación

**Paso 1:** Definir variables
- Sea $L$ = kilos de limones
- Sea $N$ = kilos de naranjas = $2L$ (el doble)

**Paso 2:** Plantear ecuación
$$L + N = 36$$
$$L + 2L = 36$$
$$3L = 36$$
$$L = 12 \text{ kg de limones}$$
$$N = 2(12) = 24 \text{ kg de naranjas}$$

**Paso 3:** Calcular dinero total
- Naranjas: $24 \times 3000 = 72000$ pesos
- Limones: $12 \times 4500 = 54000$ pesos
- **Total:** $72000 + 54000 = 126000$ pesos

**¿Por qué las otras no?**
- **A) $108.000$:** Error al calcular los kilos (18+18 en vez de 24+12).
- **C) $144.000$:** Usa precios invertidos.
- **D) $162.000$:** Suma mal los productos.

**Competencia evaluada:** Resolución - sistema de ecuaciones con contexto

---

## Pregunta 7 (Variante Difícil)

**ID:** `CO-MAT-09-algebra-001-v7`
**Dificultad:** ⭐⭐⭐⭐⭐ (5/5 - Muy difícil)

### Enunciado

Una cooperativa cafetera en el Eje Cafetero ofrece dos planes de afiliación:

- **Plan A:** Cuota mensual de $\$50.000$ más $\$800$ por arroba de café vendida.
- **Plan B:** Sin cuota mensual, pero $\$1.200$ por arroba vendida.

Si un caficultor vende $x$ arrobas mensuales, ¿a partir de cuántas arrobas le conviene más el Plan A?

### Opciones

- [ ] A) Más de 100 arrobas
- [x] B) Más de 125 arrobas
- [ ] C) Más de 150 arrobas
- [ ] D) Siempre conviene el Plan B

### Explicación

**Paso 1:** Modelar los costos
- Costo Plan A: $C_A(x) = 50000 + 800x$
- Costo Plan B: $C_B(x) = 1200x$

**Paso 2:** Encontrar punto de equilibrio
$$50000 + 800x = 1200x$$
$$50000 = 1200x - 800x$$
$$50000 = 400x$$
$$x = 125 \text{ arrobas}$$

**Paso 3:** Analizar cuál conviene
- Si $x < 125$: Plan B es más barato
- Si $x = 125$: Ambos cuestan igual ($150.000$)
- Si $x > 125$: Plan A es más barato

**Verificación con x = 150:**
- $C_A(150) = 50000 + 800(150) = 170000$
- $C_B(150) = 1200(150) = 180000$
- Plan A ahorra $10.000$ ✓

**¿Por qué las otras no?**
- **A) Más de 100:** A 100 arrobas: $C_A = 130000$, $C_B = 120000$. Plan B aún es mejor.
- **C) Más de 150:** A 150 arrobas ya conviene A, pero el punto de cambio es 125.
- **D)** Plan B solo conviene si vende menos de 125 arrobas.

**Competencia evaluada:** Razonamiento - comparación de funciones lineales y análisis de decisiones

---

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Competencia ICFES | Componente | Validado |
|----------|-----|------------|-------------------|------------|----------|
| 1 | CO-MAT-09-algebra-001-v1 | Medium | Resolución | Numérico-variacional | ⬜ |
| 2 | CO-MAT-09-algebra-001-v2 | Low | Comunicación | Numérico-variacional | ⬜ |
| 3 | CO-MAT-09-algebra-001-v3 | Low | Resolución | Numérico-variacional | ⬜ |
| 4 | CO-MAT-09-algebra-001-v4 | Medium | Comunicación | Numérico-variacional | ⬜ |
| 5 | CO-MAT-09-algebra-001-v5 | Medium | Resolución | Numérico-variacional | ⬜ |
| 6 | CO-MAT-09-algebra-001-v6 | High | Resolución | Numérico-variacional | ⬜ |
| 7 | CO-MAT-09-algebra-001-v7 | High | Razonamiento | Numérico-variacional | ⬜ |

---

**Source ID:** `ICFES-MAT-009-001`
**Fecha de creación:** 2025-12-05
**Contexto cultural:** Ráquira (artesanías), Cartagena (restaurante), Bogotá-Medellín (transporte), Cali (servicios públicos), Villavicencio (mercado), Eje Cafetero (cooperativa)
