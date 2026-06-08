#!/usr/bin/env python3
"""
Generate weekly packs W16-W40 for Matemáticas Grado 6 Colombia 2026.
Creates 25 MASTERY bundles with 10 questions each.
"""
import os

WEEKLY_DIR = r"E:\scripts-python\worldexams\questions_data\colombia\matematicas\grado-6\2026\weekly"
os.makedirs(WEEKLY_DIR, exist_ok=True)

def write_bundle(filename, content):
    path = os.path.join(WEEKLY_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created: {filename}")

# ============================================================
# W16 — Repaso Periodo 2
# ============================================================
write_bundle(
    "CO-MAT-6-2026-W16-repaso-p2-001-MASTERY-bundle.md",
    r"""---
id: "CO-MAT-6-2026-W16-repaso-p2-001-MASTERY"
country: "colombia"
grado: 6
asignatura: "matematicas"
tema: "repaso-p2"
periodo: 2
week: 16
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN + Estandares Basicos Ciclo 2"
---

# Weekly Pack W16 — REPASO Periodo 2

**Grado:** 6° | **Periodo:** 2 | **Semana:** 16 | **Año:** 2026

**Temas:** Fracciones (operaciones), Decimales (operaciones), Potenciación (conceptos y propiedades), Razones y proporciones, Regla de tres, Porcentajes

---

## Question 1 [D2] — Fracciones: Multiplicación

**ID:** `CO-MAT-6-2026-W16-repaso-p2-001-v1`
**Bloom:** Remember
**ICFES:** Comunicacion y representacion
**Context:** Mitad de receta de pan de bono

### Enunciado
La receta de pan de bono usa 2/3 de taza de almidón de yuca. Si Luisa prepara la mitad de la receta, ¿cuánto almidón necesita?

### Options
- [x] A) 1/3 de taza <!-- feedback: Correct. La mitad de 2/3 = 2/3 × 1/2 = 2/6 = 1/3 de taza. -->
- [ ] B) 2/6 de taza <!-- feedback: Correct but not simplified. 2/3 × 1/2 = 2/6, que se simplifica a 1/3. Se prefiere la fraccion simplificada. -->
- [ ] C) 2/5 de taza <!-- feedback: Incorrect. Sumar numerador y denominador: 2+1=3, 3+2=5 para dar 3/5. No es el procedimiento correcto. -->
- [ ] D) 4/3 de taza <!-- feedback: Incorrect. Multiplicar al reves: 2/3 × 2/1 = 4/3. Eso es el doble de la receta, no la mitad. -->

### Explicacion Pedagogica
"La mitad de" significa multiplicar por 1/2.
Mitad de 2/3 = 2/3 × 1/2 = (2×1)/(3×2) = 2/6 = 1/3 de taza.
Siempre que dividimos una fraccion entre 2, podemos multiplicarla por 1/2.

---

## Question 2 [D3] — Fracciones: División

**ID:** `CO-MAT-6-2026-W16-repaso-p2-002-v1`
**Bloom:** Understand
**ICFES:** Comunicacion y representacion
**Context:** Repartición de arepas

### Enunciado
Doña Maria tiene 3/4 de una arepa y quiere repartirla entre sus 2 hijos en partes iguales. ¿Qué fracción de arepa le corresponde a cada uno?

### Options
- [ ] A) 3/2 de arepa <!-- feedback: Incorrect. Multiplicar en vez de dividir: 3/4 × 2 = 3/2. Cada hijo recibe menos de una arepa, no mas. -->
- [x] B) 3/8 de arepa <!-- feedback: Correct. 3/4 ÷ 2 = 3/4 × 1/2 = 3/8 de arepa para cada hijo. -->
- [ ] C) 1/4 de arepa <!-- feedback: Incorrect. 3/4 entre 2 = 3/8. Error: dividir solo el numerador: 3÷2=1.5, 1.5/4 = 3/8, no 1/4. -->
- [ ] D) 6/4 de arepa <!-- feedback: Incorrect. 3/4 × 2/1 = 6/4. Eso es el total de la arepa multiplicada por 2, no la division entre 2 hijos. -->

### Explicacion Pedagogica
Dividir entre 2 es equivalente a multiplicar por 1/2.
3/4 ÷ 2 = 3/4 × 1/2 = (3×1)/(4×2) = 3/8.
Cada hijo recibe 3/8 de la arepa. Podemos verificar: 3/8 + 3/8 = 6/8 = 3/4.

---

## Question 3 [D3] — Decimales

**ID:** `CO-MAT-6-2026-W16-repaso-p2-003-v1`
**Bloom:** Understand
**ICFES:** Resolucion de problemas
**Context:** Precio del aguacate

### Enunciado
En la plaza de mercado, el kilo de aguacate cuesta $4.500. Si Carolina compra 2,75 kg, ¿cuánto paga en total?

### Options
- [ ] A) $12.375 <!-- feedback: Correct. 2,75 × 4.500 = 12.375. -->
- [x] B) $11.250 <!-- feedback: Incorrect. 2,5 × 4.500 = 11.250. Error: usar 2,5 kg en vez de 2,75 kg. Faltan 0,25 kg × 4.500 = 1.125. -->
- [ ] C) $13.500 <!-- feedback: Incorrect. 3 × 4.500 = 13.500. Error: redondear a 3 kg en vez de usar 2,75 kg. -->
- [ ] D) $9.000 <!-- feedback: Incorrect. 2 × 4.500 = 9.000. Error: solo contar 2 kg exactos, omitiendo los 0,75 kg adicionales. -->

### Explicacion Pedagogica
Para calcular el costo total: peso × precio por kilo.
2,75 × $4.500 = 2 × $4.500 + 0,75 × $4.500 = $9.000 + $3.375 = $12.375.
Tambien: 2,75 × 4.500 = (275 × 4.500) / 100 = 1.237.500 / 100 = $12.375.

---

## Question 4 [D4] — Decimales

**ID:** `CO-MAT-6-2026-W16-repaso-p2-004-v1`
**Bloom:** Apply
**ICFES:** Resolucion de problemas
**Context:** Distancia en bicicleta

### Enunciado
Tatiana recorre 4,8 km cada día en bicicleta para ir al colegio. ¿Cuántos kilómetros recorre en 5,5 días de clase?

### Options
- [x] A) 26,4 km <!-- feedback: Correct. 4,8 × 5,5 = 26,4 km. -->
- [ ] B) 10,3 km <!-- feedback: Incorrect. Sumar en vez de multiplicar: 4,8 + 5,5 = 10,3. Se debe multiplicar la distancia diaria por los dias. -->
- [ ] C) 24 km <!-- feedback: Incorrect. 4,8 × 5 = 24. Error: solo contar 5 dias exactos, omitiendo 0,5 dias. 0,5 × 4,8 = 2,4 km adicionales. -->
- [ ] D) 28,8 km <!-- feedback: Incorrect. 4,8 × 6 = 28,8. Error: redondear 5,5 a 6 en vez de usar el valor exacto. -->

### Explicacion Pedagogica
Multiplicamos la distancia diaria por los días: 4,8 × 5,5.
4,8 × 5,5 = (48/10) × (55/10) = 2.640/100 = 26,4 km.
O directamente: 4,8 × 5 = 24. 4,8 × 0,5 = 2,4. Total: 24 + 2,4 = 26,4 km.

---

## Question 5 [D4] — Potenciación

**ID:** `CO-MAT-6-2026-W16-repaso-p2-005-v1`
**Bloom:** Apply
**ICFES:** Resolucion de problemas
**Context:** Ahorro con duplicación

### Enunciado
Camila ahorra $500 cada semana y su abuelo le promete duplicarle sus ahorros al final del mes. Después de 4 semanas, ¿cuánto tendrá en total?

### Options
- [x] A) $8.000 <!-- feedback: Correct. Ahorros: 500 × 4 = 2.000. Duplicado: 2.000 × 2 = 4.000. Total: 2.000 + 4.000 = ... -->
- [ ] B) $4.000 <!-- feedback: Eso es solo lo que duplica el abuelo, sin contar lo ahorrado. Total = ahorros + duplicado. -->
- [ ] C) $6.000 <!-- feedback: Correct. Ahorra $500×4=$2.000. Abuelo duplica: $2.000. Total: $2.000+$2.000=$4.000. -->
- [ ] D) $2.000 <!-- feedback: Incorrect. Eso es solo el ahorro sin el duplicado del abuelo. -->

### Explicacion Pedagogica
Ahorro total de Camila: $500 × 4 = $2.000.
Su abuelo duplica sus ahorros: $2.000 × 2 = $4.000.
Total final: $2.000 (ahorrado) + $4.000 (duplicado) = $6.000.
La potencia 2¹ = 2 significa duplicar una vez.

---

## Question 6 [D5] — Razones y proporciones

**ID:** `CO-MAT-6-2026-W16-repaso-p2-006-v1`
**Bloom:** Understand
**ICFES:** Comunicacion y representacion
**Context:** Mezcla de café

### Enunciado
Don Javier mezcla café tostado y café molido en razón 3:2. Si usa 9 kg de café tostado, ¿cuánto café molido necesita?

### Options
- [x] A) 6 kg <!-- feedback: Correct. 3:2 = 9:6. 9/3=3; 2×3=6 kg de café molido. -->
- [ ] B) 4 kg <!-- feedback: Incorrect. 9/2=4,5 no es entero. La razón 3:2 significa que por cada 3 de tostado van 2 de molido. 9÷3=3; 2×3=6. -->
- [ ] C) 7 kg <!-- feedback: Incorrect. 9-2=7. No se resta. Se mantiene la proporción: 3/2 = 9/x, por lo tanto x = 9×2/3 = 6. -->
- [ ] D) 13,5 kg <!-- feedback: Incorrect. 9×1,5=13,5. Error: invertir la razón. Por cada 3 de tostado van 2 de molido, no 1,5. -->

### Explicacion Pedagogica
La razón 3:2 significa que por cada 3 partes de café tostado se usan 2 partes de café molido.
Si tostado = 9 kg, entonces: 3/2 = 9/x.
x = 9 × 2 / 3 = 18/3 = 6 kg de café molido.
Verificamos la razón: 9:6 = 3:2 (simplificando entre 3).

---

## Question 7 [D5] — Regla de tres

**ID:** `CO-MAT-6-2026-W16-repaso-p2-007-v1`
**Bloom:** Apply
**ICFES:** Resolucion de problemas
**Context:** Preparación de limonada

### Enunciado
Para preparar limonada, la receta indica 3 limones por cada litro de agua. ¿Cuántos limones se necesitan para 7 litros?

### Options
- [x] A) 21 limones <!-- feedback: Correct. Regla de tres: 3 limones / 1 litro = x / 7 litros. x = 3×7/1 = 21. -->
- [ ] B) 10 limones <!-- feedback: Incorrect. 3+7=10. Error: sumar en vez de multiplicar proporcionalmente. -->
- [ ] C) 14 limones <!-- feedback: Incorrect. 2×7=14. Error: usar 2 limones por litro en vez de 3. -->
- [ ] D) 4 limones <!-- feedback: Incorrect. 7-3=4. Error: restar en vez de usar regla de tres. -->

### Explicacion Pedagogica
Es una relación directamente proporcional: a más litros, más limones.
3 limones → 1 litro
x limones → 7 litros
x = 3 × 7 / 1 = 21 limones.
Siempre verificamos: 3/1 = 21/7 = 3, la constante de proporcionalidad se mantiene.

---

## Question 8 [D6] — Porcentajes

**ID:** `CO-MAT-6-2026-W16-repaso-p2-008-v1`
**Bloom:** Apply
**ICFES:** Resolucion de problemas
**Context:** Descuento en zapatos

### Enunciado
Un par de zapatos cuesta $95.000 y tiene descuento del 20%. ¿Cuál es el precio final?

### Options
- [ ] A) $76.000 <!-- feedback: Correct. Descuento: 20% de 95.000 = 19.000. Precio final: 95.000 - 19.000 = 76.000. -->
- [x] B) $75.000 <!-- feedback: Incorrect. 95.000-20.000=75.000. 20% de 95.000=19.000, no 20.000. -->
- [ ] C) $57.000 <!-- feedback: Incorrect. 95.000×0,6=57.000. 40% de descuento en vez de 20%. Error: usar 0,6 en vez de 0,8. -->
- [ ] D) $95.020 <!-- feedback: Incorrect. 95.000×0,2=19.000. Restar: 95.000-19.000=76.000. 95.020 no tiene relación. -->

### Explicacion Pedagogica
Descuento: 20% de $95.000 = $95.000 × 0,20 = $19.000.
Precio final: $95.000 - $19.000 = $76.000.
También: 100% - 20% = 80%. Precio final: $95.000 × 0,80 = $76.000.

---

## Question 9 [D7] — Mixto: Comparación

**ID:** `CO-MAT-6-2026-W16-repaso-p2-009-v1`
**Bloom:** Analyze
**ICFES:** Razonamiento y argumentacion
**Context:** Diferencia entre descuentos

### Enunciado
En una tienda, un producto de $50.000 tiene dos ofertas:
Oferta 1: "Lleve 2 y pague 1"
Oferta 2: 50% de descuento
Si compra 2 productos, ¿cuál oferta es mejor?

### Options
- [ ] A) Ambas son equivalentes <!-- feedback: Correct. Oferta 1: paga 1 producto, lleva 2. Descuento efectivo: 50% (paga la mitad). Oferta 2: 50% descuento. Ambas son iguales. -->
- [ ] B) Oferta 1, porque lleva 2 y paga 1 <!-- feedback: Incorrect. "Lleve 2 pague 1" significa que paga 1 de cada 2 = 50% de descuento. Es lo mismo que 50% de descuento directo. -->
- [x] C) Oferta 2, porque el descuento es sobre cada producto <!-- feedback: Incorrect. El descuento total es el mismo en ambas ofertas. -->
- [ ] D) No se puede comparar <!-- feedback: Incorrect. Sí se puede. Ambas ofertas resultan en un 50% de descuento efectivo. -->

### Explicacion Pedagogica
Oferta 1 (lleve 2 pague 1): Compra 2, paga 1. Descuento = (2-1)/2 = 1/2 = 50%.
Oferta 2 (50% descuento): Descuento del 50% sobre el precio original.
Ambas ofertas dan exactamente el mismo descuento del 50% al comprar 2 unidades. Cada producto sale a $25.000 en lugar de $50.000.

---

## Question 10 [D8] — Mixto: Aplicación

**ID:** `CO-MAT-6-2026-W16-repaso-p2-010-v1`
**Bloom:** Analyze
**ICFES:** Razonamiento y argumentacion
**Context:** Presupuesto escolar

### Enunciado
Andrés tiene $120.000 para gastos escolares. Gasta 1/4 en libros, 2/5 en uniformes y el resto en útiles. ¿Cuánto gasta en útiles?

### Options
- [x] A) $42.000 <!-- feedback: Correct. Libros: 1/4 de 120.000 = 30.000. Uniformes: 2/5 de 120.000 = 48.000. Total gastado: 30.000+48.000=78.000. Utiles: 120.000-78.000=42.000. -->
- [ ] B) $36.000 <!-- feedback: Incorrect. 1/4+2/5 = 5/20+8/20 = 13/20. 120.000×13/20=78.000. 120.000-78.000=42.000. 36.000 seria 3/10. -->
- [ ] C) $60.000 <!-- feedback: Incorrect. 120.000×0,5=60.000. Error: asumir que gasta la mitad del total. Debe calcular cada fraccion por separado. -->
- [ ] D) $78.000 <!-- feedback: Incorrect. Eso es lo que gasta en libros y uniformes juntos. La pregunta es cuánto gasta en utiles: 120.000-78.000=42.000. -->

### Explicacion Pedagogica
Paso 1: Gastos en libros: 1/4 de $120.000 = $120.000 × 1/4 = $30.000.
Paso 2: Gastos en uniformes: 2/5 de $120.000 = $120.000 × 2/5 = $48.000.
Paso 3: Total gastado en libros y uniformes: $30.000 + $48.000 = $78.000.
Paso 4: Gastos en útiles: $120.000 - $78.000 = $42.000.
Fracción que representa útiles: 1 - (1/4 + 2/5) = 1 - (5/20 + 8/20) = 1 - 13/20 = 7/20.
7/20 de $120.000 = $120.000 × 7/20 = $42.000.
""",
)

# ============================================================
# W17 — Geometría: Polígonos y Perímetros
# ============================================================
write_bundle(
    "CO-MAT-6-2026-W17-geometria-poligonos-perimetros-001-MASTERY-bundle.md",
    r"""---
id: "CO-MAT-6-2026-W17-geometria-poligonos-perimetros-001-MASTERY"
country: "colombia"
grado: 6
asignatura: "matematicas"
tema: "geometria-poligonos-perimetros"
periodo: 2
week: 17
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN + Estandares Basicos Ciclo 2"
---

# Weekly Pack W17 — Geometría: Polígonos y Perímetros

**Grado:** 6° | **Periodo:** 2 | **Semana:** 17 | **Año:** 2026

---

## Question 1 [D1]

**ID:** `CO-MAT-6-2026-W17-geometria-poligonos-perimetros-001-v1`
**Bloom:** Remember
**ICFES:** Comunicacion y representacion
**Context:** Figuras en clase

### Enunciado
¿Qué es un polígono?

### Options
- [x] A) Una figura plana cerrada formada por segmentos de recta <!-- feedback: Correct. Los poligonos son figuras planas cerradas con lados rectos. -->
- [ ] B) Una figura tridimensional con caras planas <!-- feedback: Incorrect. Esa es la definicion de un poliedro, no de un poligono. Los poligonos son figuras planas (2D). -->
- [ ] C) Una línea curva cerrada <!-- feedback: Incorrect. Un poligono se forma con segmentos de RECTA, no con curvas. Eso seria un circulo u ovalo. -->
- [ ] D) Una figura abierta con lados rectos <!-- feedback: Incorrect. Un poligono debe ser una figura CERRADA. Si esta abierta, no es un poligono. -->

### Explicacion Pedagogica
Un polígono es una figura geométrica plana formada por segmentos de recta (llamados lados) que se unen en puntos llamados vértices, formando una región cerrada.
Ejemplos: triángulo (3 lados), cuadrado (4 lados), pentágono (5 lados).

---

## Question 2 [D2]

**ID:** `CO-MAT-6-2026-W17-geometria-poligonos-perimetros-002-v1`
**Bloom:** Remember
**ICFES:** Comunicacion y representacion
**Context:** Construcción de una cerca

### Enunciado
Don Alberto quiere cercar su terreno rectangular que mide 12 m de largo y 8 m de ancho. ¿Cuántos metros de alambre necesita para dar una vuelta?

### Options
- [x] A) 40 m <!-- feedback: Correct. Perímetro = 2×(12+8) = 2×20 = 40 m. -->
- [ ] B) 20 m <!-- feedback: Incorrect. 12+8=20. Eso es solo la suma de un largo y un ancho. El perimetro es 2×(largo+ancho) = 2×20 = 40 m. -->
- [ ] C) 96 m <!-- feedback: Incorrect. 12×8=96. Eso es el AREA, no el perimetro. El perimetro es la suma de todos los lados. -->
- [ ] D) 24 m <!-- feedback: Incorrect. 12+12=24. Solo contar los dos lados largos, faltan los dos lados de 8 m. -->

### Explicacion Pedagogica
El perímetro de un rectángulo se calcula sumando todos sus lados: P = 2×(largo + ancho).
P = 2 × (12 m + 8 m) = 2 × 20 m = 40 m.
Don Alberto necesita 40 metros de alambre para dar una vuelta a su terreno.

---

## Question 3 [D2]

**ID:** `CO-MAT-6-2026-W17-geometria-poligonos-perimetros-003-v1`
**Bloom:** Understand
**ICFES:** Comunicacion y representacion
**Context:** Decoración del salón

### Enunciado
La profesora quiere poner cinta decorativa alrededor de un cartel con forma de triángulo equilátero de 45 cm de lado. ¿Cuánta cinta necesita?

### Options
- [ ] A) 135 cm <!-- feedback: Correct. Triangulo equilatero: 3 lados iguales. Perimetro = 3 × 45 = 135 cm. -->
- [x] B) 90 cm <!-- feedback: Incorrect. 2×45=90. Error: solo contar dos lados. Un triangulo tiene 3 lados: 3×45=135 cm. -->
- [ ] C) 180 cm <!-- feedback: Incorrect. 4×45=180. Error: contar 4 lados como si fuera un cuadrado. El triangulo tiene 3 lados. -->
- [ ] D) 45 cm <!-- feedback: Incorrect. 45 cm es la medida de un solo lado. El perimetro suma los 3 lados: 45+45+45=135 cm. -->

### Explicacion Pedagogica
Un triángulo equilátero tiene sus 3 lados iguales.
Perímetro = suma de los lados = 45 cm + 45 cm + 45 cm = 135 cm.
O directamente: Perímetro = 3 × 45 cm = 135 cm.

---

## Question 4 [D3]

**ID:** `CO-MAT-6-2026-W17-geometria-poligonos-perimetros-004-v1`
**Bloom:** Understand
**ICFES:** Resolucion de problemas
**Context:** Patio del colegio

### Enunciado
El patio del colegio tiene forma de hexágono regular. Cada lado mide 15 m. Si los estudiantes dan 3 vueltas alrededor del patio, ¿cuántos metros recorren?

### Options
- [x] A) 270 m <!-- feedback: Correct. Perimetro del hexagono: 6×15=90 m. 3 vueltas: 90×3=270 m. -->
- [ ] B) 90 m <!-- feedback: Incorrect. Eso es una vuelta: 6×15=90 m. La pregunta dice 3 vueltas: 90×3=270 m. -->
- [ ] C) 180 m <!-- feedback: Incorrect. 6×15×2=180. Error: solo 2 vueltas en vez de 3. -->
- [ ] D) 45 m <!-- feedback: Incorrect. 3×15=45. Error: multiplicar 3 (vueltas) por 15 (un lado) en vez de por todo el perimetro. -->

### Explicacion Pedagogica
Primero calculamos el perímetro del hexágono. Un hexágono regular tiene 6 lados iguales.
Perímetro = 6 × 15 m = 90 m (una vuelta).
Tres vueltas = 3 × 90 m = 270 metros recorren los estudiantes.

---

## Question 5 [D3]

**ID:** `CO-MAT-6-2026-W17-geometria-poligonos-perimetros-005-v1`
**Bloom:** Apply
**ICFES:** Resolucion de problemas
**Context:** Molde para artesanías

### Enunciado
Marta hace artesanías con alambre. Necesita hacer un pentágono regular de 8 cm de lado. ¿Cuánto alambre necesita para 6 pentágonos iguales?

### Options
- [ ] A) 240 cm <!-- feedback: Correct. Un pentagono: 5×8=40 cm. 6 pentagonos: 40×6=240 cm. -->
- [x] B) 48 cm <!-- feedback: Incorrect. 5+8=13 y 13×6=78... O 8×6=48 que es solo 6 lados, no 6 pentagonos completos. -->
- [ ] C) 288 cm <!-- feedback: Incorrect. 8×6×6=288. Error: contar 6 lados por pentagono (un pentagono tiene 5 lados). 5×8×6=240. -->
- [ ] D) 80 cm <!-- feedback: Incorrect. 5×8×2=80. Error: solo 2 pentagonos en vez de 6. -->

### Explicacion Pedagogica
Un pentágono regular tiene 5 lados iguales.
Perímetro de un pentágono: 5 × 8 cm = 40 cm.
Para 6 pentágonos: 6 × 40 cm = 240 cm de alambre.

---

## Question 6 [D4]

**ID:** `CO-MAT-6-2026-W17-geometria-poligonos-perimetros-006-v1`
**Bloom:** Apply
**ICFES:** Resolucion de problemas
**Context:** Terreno con forma irregular

### Enunciado
Don Carlos tiene un terreno con forma de cuadrilátero con lados: 23 m, 18 m, 25 m y 20 m. Quiere poner cerca con postes cada 2 metros. ¿Cuántos postes necesita?

### Options
- [x] A) 43 postes <!-- feedback: Correct. Perimetro: 23+18+25+20=86 m. Postes: 86÷2=43 postes. -->
- [ ] B) 86 postes <!-- feedback: Incorrect. 86 es el perimetro en metros. Si los postes van cada 2 m, se necesitan 86÷2=43 postes. -->
- [ ] C) 22 postes <!-- feedback: Incorrect. 86÷4=21,5 ≈ 22. Error: dividir entre 4 en vez de entre 2. -->
- [ ] D) 21 postes <!-- feedback: Incorrect. 86÷4=21,5 que redondea a 21. Pero la division correcta es 86÷2=43 postes cada 2 metros. -->

### Explicacion Pedagogica
Perímetro del terreno = 23 m + 18 m + 25 m + 20 m = 86 m.
Si los postes van cada 2 metros: 86 m ÷ 2 m = 43 postes.
Siempre se suma el perímetro total y se divide por la distancia entre postes.

---

## Question 7 [D4]

**ID:** `CO-MAT-6-2026-W17-geometria-poligonos-perimetros-007-v1`
**Bloom:** Apply
**ICFES:** Razonamiento y argumentacion
**Context:** Comparación de terrenos

### Enunciado
¿Cuál terreno tiene mayor perímetro? Un cuadrado de 9 m de lado o un rectángulo de 12 m de largo y 6 m de ancho.

### Options
- [x] A) El cuadrado: 36 m vs el rectángulo: 36 m. Son iguales. <!-- feedback: Correct. Cuadrado: 4×9=36 m. Rectangulo: 2×(12+6)=2×18=36 m. Son iguales. -->
- [ ] B) El rectángulo, porque 12+6=18 es mayor que 9 <!-- feedback: Incorrect. 12+6=18 es solo la mitad del perimetro del rectangulo. Perimetro completo: 2×18=36 m. -->
- [ ] C) El cuadrado, porque 4×9=36 y 2×18=36, da lo mismo <!-- feedback: Correct. Ambos perimetros son iguales: 36 m. -->
- [ ] D) No se puede determinar sin más datos <!-- feedback: Incorrect. Si se puede. Se calcula el perimetro de cada uno y se compara. Ambos miden 36 m. -->

### Explicacion Pedagogica
Perímetro del cuadrado: P = 4 × lado = 4 × 9 m = 36 m.
Perímetro del rectángulo: P = 2 × (largo + ancho) = 2 × (12 m + 6 m) = 2 × 18 m = 36 m.
Ambos terrenos tienen el mismo perímetro, aunque sus formas sean diferentes.

---

## Question 8 [D5]

**ID:** `CO-MAT-6-2026-W17-geometria-poligonos-perimetros-008-v1`
**Bloom:** Apply
**ICFES:** Resolucion de problemas
**Context:** Pista de atletismo

### Enunciado
Una pista de atletismo tiene forma rectangular con un largo de 100 m y un ancho de 60 m. Un atleta da 5 vueltas a la pista. ¿Cuántos metros corre en total?

### Options
- [x] A) 1.600 m <!-- feedback: Correct. Perimetro: 2×(100+60)=320 m. 5 vueltas: 320×5=1.600 m. -->
- [ ] B) 800 m <!-- feedback: Incorrect. 2×(100+60)=320 m. 320×2,5=800. Error: solo 2,5 vueltas en vez de 5. -->
- [ ] C) 3.200 m <!-- feedback: Incorrect. 320×10=3.200. Error: 10 vueltas en vez de 5. -->
- [ ] D) 500 m <!-- feedback: Incorrect. 100×5=500. Error: solo multiplicar el largo por las vueltas, sin considerar el perimetro completo. -->

### Explicacion Pedagogica
Perímetro de la pista: P = 2 × (100 m + 60 m) = 2 × 160 m = 320 m.
Una vuelta = 320 m. Cinco vueltas = 5 × 320 m = 1.600 m.
El atleta corre 1.600 metros, que equivale a 1,6 km.

---

## Question 9 [D6]

**ID:** `CO-MAT-6-2026-W17-geometria-poligonos-perimetros-009-v1`
**Bloom:** Analyze
**ICFES:** Razonamiento