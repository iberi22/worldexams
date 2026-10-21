---
id: "CO-MAT-11-2026-W03-limites-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "limites"
periodo: "weekly"
week: "W03"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "DBA MEN Colombia"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Límites - Grado 11

Veinte situaciones colombianas para estimar, calcular e interpretar límites: tablas, sustitución directa, indeterminaciones 0/0, límites laterales, límites al infinito y casos en que el límite no existe.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v1
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.85
**Contexto:** Un sensor de una estación meteorológica en Medellín reporta valores de $f(x)$ cerca de $x = 2$: $f(1{,}9) = 4{,}61$; $f(1{,}99) = 4{,}9601$; $f(2{,}01) = 5{,}0401$; $f(2{,}1) = 5{,}41$.

### Enunciado
Según la tabla, ¿cuál es el valor más razonable para $\lim_{x \to 2} f(x)$?

### Opciones
- [ ] A) 4,9601
  <!-- feedback: Incorrecto. Ese es solo el valor en $x = 1{,}99$; el límite es el número al que se acercan los valores por ambos lados, no un dato de la tabla. -->
- [x] B) 5
  <!-- feedback: Correcto. Por la izquierda (4,61; 4,9601) y por la derecha (5,41; 5,0401) los valores se acercan a 5. -->
- [ ] C) No existe, porque la tabla no muestra $f(2)$.
  <!-- feedback: Incorrecto. El límite no depende del valor en $x = 2$; depende del comportamiento de $f$ cerca de 2, que la tabla sí muestra. -->
- [ ] D) 5,0401
  <!-- feedback: Incorrecto. Es el valor en $x = 2{,}01$; tomarlo ignora que los valores de la izquierda también convergen y que ambos lados apuntan a 5. -->

### Explicacion Pedagogica
Para estimar un límite con una tabla se observa la tendencia por ambos lados. Por la izquierda: 4,61 y 4,9601 crecen hacia 5. Por la derecha: 5,41 y 5,0401 decrecen hacia 5. Como ambos lados coinciden, $\lim_{x \to 2} f(x) = 5$. Los datos son de $f(x) = x^2 + 1$, y $2^2 + 1 = 5$.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Algebraico
**Expected_Success:** 0.83
**Contexto:** En una clase de cálculo de un colegio de Cúcuta se modela el costo de producción con un polinomio y se pide su límite cuando $x$ tiende a 3.

### Enunciado
¿Cuál es el valor de $\lim_{x \to 3} (2x^2 - x + 4)$?

### Opciones
- [x] A) 19
  <!-- feedback: Correcto. En un polinomio basta sustituir: $2(9) - 3 + 4 = 18 - 3 + 4 = 19$. -->
- [ ] B) 25
  <!-- feedback: Incorrecto. Se sumó $x$ en lugar de restarlo: $18 + 3 + 4 = 25$; el término es $-x = -3$. -->
- [ ] C) 13
  <!-- feedback: Incorrecto. Se calculó $2x^2$ como $2 \cdot 3 \cdot 2 = 12$; elevar al cuadrado es $3^2 = 9$ y luego multiplicar por 2 da 18. -->
- [ ] D) 37
  <!-- feedback: Incorrecto. Se elevó al cuadrado el producto, $(2 \cdot 3)^2 = 36$; en $2x^2$ el exponente afecta solo a $x$. -->

### Explicacion Pedagogica
Los polinomios son continuos, así que su límite en un punto es su valor en ese punto: $\lim_{x \to 3}(2x^2 - x + 4) = 2 \cdot 3^2 - 3 + 4$. Primero la potencia, $3^2 = 9$; luego $2 \cdot 9 = 18$; finalmente $18 - 3 + 4 = 19$.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Razonamiento
**Expected_Success:** 0.80
**Contexto:** En un taller de preparación Saber 11 en Bogotá se discute qué significa escribir $\lim_{x \to a} f(x) = L$.

### Enunciado
¿Cuál interpretación es correcta?

### Opciones
- [ ] A) Significa que necesariamente $f(a) = L$.
  <!-- feedback: Incorrecto. El límite puede existir aunque $f(a)$ no esté definida o sea distinto de $L$; la igualdad $f(a) = L$ es la condición de continuidad. -->
- [ ] B) Significa que $f(x)$ llega a valer exactamente $L$ para algún $x$ cercano a $a$.
  <!-- feedback: Incorrecto. El límite describe una tendencia: $f(x)$ se acerca a $L$; no exige que algún valor sea igual a $L$. -->
- [x] C) Los valores de $f(x)$ se acercan a $L$ cuando $x$ se acerca a $a$ por ambos lados, sin importar qué pase en $x = a$.
  <!-- feedback: Correcto. Esa es la idea del límite: tendencia de $f(x)$ cerca de $a$, por izquierda y derecha, independiente de $f(a)$. -->
- [ ] D) Significa que $f(x)$ se acerca a $L$ solo cuando $x$ se acerca a $a$ por la derecha.
  <!-- feedback: Incorrecto. Eso define el límite lateral derecho; el límite bilateral exige que ambos laterales existan y sean iguales. -->

### Explicacion Pedagogica
$\lim_{x \to a} f(x) = L$ quiere decir que podemos hacer $f(x)$ tan cercano a $L$ como queramos tomando $x$ suficientemente cerca de $a$ (por ambos lados, con $x \neq a$). Por ejemplo, $\frac{x^2 - 1}{x - 1}$ no está definida en 1, pero su límite en 1 es 2.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.78
**Contexto:** Una empresa de mensajería de Pereira usa una función $f$ definida por $f(x) = x + 1$ si $x < 2$, $f(2) = 5$ y $f(x) = 3x - 3$ si $x > 2$.

### Enunciado
¿Cuál es $\lim_{x \to 2} f(x)$?

### Opciones
- [ ] A) 5
  <!-- feedback: Incorrecto. 5 es el valor $f(2)$, que no interviene en el límite; los dos trozos se acercan a 3. -->
- [ ] B) No existe, porque $f(2)$ es distinto de los límites laterales.
  <!-- feedback: Incorrecto. Esa diferencia impide la continuidad, no la existencia del límite; los laterales valen 3 y 3. -->
- [x] C) 3
  <!-- feedback: Correcto. Por la izquierda $2 + 1 = 3$ y por la derecha $3(2) - 3 = 3$; los laterales coinciden. -->
- [ ] D) No existe, porque la función cambia de fórmula en $x = 2$.
  <!-- feedback: Incorrecto. Cambiar de fórmula no basta para que el límite falte; lo que importa es si los laterales coinciden, y aquí ambos valen 3. -->

### Explicacion Pedagogica
Se calculan los laterales con el trozo correspondiente. Izquierda: $\lim_{x \to 2^-}(x + 1) = 3$. Derecha: $\lim_{x \to 2^+}(3x - 3) = 3$. Como coinciden, $\lim_{x \to 2} f(x) = 3$. El valor $f(2) = 5$ no altera el límite; solo muestra que $f$ no es continua en 2.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.75
**Contexto:** Un analista de datos en Barranquilla encuentra la expresión $\frac{x^2 - 16}{x - 4}$ al calcular una razón de cambio y quiere su límite cuando $x \to 4$.

### Enunciado
¿Cuál es $\lim_{x \to 4} \dfrac{x^2 - 16}{x - 4}$?

### Opciones
- [ ] A) 0
  <!-- feedback: Incorrecto. Al sustituir se obtiene $\frac{0}{0}$, que es una indeterminación, no el número 0. -->
- [ ] B) No existe, porque se divide entre cero.
  <!-- feedback: Incorrecto. $\frac{0}{0}$ indica que hay que simplificar; tras factorizar el límite existe. -->
- [ ] C) 4
  <!-- feedback: Incorrecto. Se simplificó $\frac{x^2 - 16}{x - 4}$ como $x$, cancelando términos sueltos; lo correcto es factorizar $(x-4)(x+4)$. -->
- [x] D) 8
  <!-- feedback: Correcto. $\frac{(x - 4)(x + 4)}{x - 4} = x + 4$ para $x \neq 4$, y su límite es $4 + 4 = 8$. -->

### Explicacion Pedagogica
La sustitución directa da $\frac{16 - 16}{4 - 4} = \frac{0}{0}$. Se factoriza la diferencia de cuadrados: $x^2 - 16 = (x - 4)(x + 4)$. Para $x \neq 4$ se cancela $x - 4$ y queda $x + 4$, así $\lim_{x \to 4} (x + 4) = 8$.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.72
**Contexto:** En una práctica de la Universidad Industrial de Santander se analiza $\frac{\sqrt{x} - 3}{x - 9}$ cerca de $x = 9$.

### Enunciado
¿Cuál es $\lim_{x \to 9} \dfrac{\sqrt{x} - 3}{x - 9}$?

### Opciones
- [x] A) $\frac{1}{6}$
  <!-- feedback: Correcto. Multiplicando por el conjugado, queda $\frac{1}{\sqrt{x} + 3}$, que en 9 vale $\frac{1}{3 + 3}$. -->
- [ ] B) 0
  <!-- feedback: Incorrecto. El numerador tiende a 0, pero el denominador también; $\frac{0}{0}$ es indeterminado y no equivale a 0. -->
- [ ] C) 6
  <!-- feedback: Incorrecto. Se invirtió la fracción: tras racionalizar, el $\sqrt{x} + 3$ queda en el denominador, no en el numerador. -->
- [ ] D) No existe.
  <!-- feedback: Incorrecto. La forma $\frac{0}{0}$ se resuelve racionalizando, y el límite resultante es el número $\frac{1}{6}$. -->

### Explicacion Pedagogica
Al sustituir se obtiene $\frac{0}{0}$. Se multiplica por el conjugado $\sqrt{x} + 3$: $\frac{(\sqrt{x}-3)(\sqrt{x}+3)}{(x-9)(\sqrt{x}+3)} = \frac{x - 9}{(x-9)(\sqrt{x}+3)} = \frac{1}{\sqrt{x}+3}$. Entonces el límite es $\frac{1}{\sqrt{9} + 3} = \frac{1}{6}$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.70
**Contexto:** Una fábrica de cuadernos en Itagüí tiene costos fijos de 4 000 000 de pesos y un costo de 2 500 pesos por cuaderno; el costo promedio es $C(x) = \frac{2\,500x + 4\,000\,000}{x}$.

### Enunciado
¿A qué valor se acerca el costo promedio por cuaderno cuando la producción $x$ crece sin límite?

### Opciones
- [ ] A) 0 pesos
  <!-- feedback: Incorrecto. Solo la parte fija $\frac{4\,000\,000}{x}$ tiende a 0; el costo de 2 500 por unidad se mantiene. -->
- [ ] B) Crece sin límite.
  <!-- feedback: Incorrecto. El costo total crece, pero se divide entre $x$; el promedio disminuye hacia un valor fijo. -->
- [x] C) 2 500 pesos
  <!-- feedback: Correcto. $C(x) = 2\,500 + \frac{4\,000\,000}{x}$ y el segundo término tiende a 0 cuando $x \to \infty$. -->
- [ ] D) 4 000 000 pesos
  <!-- feedback: Incorrecto. Ese es el costo fijo total; repartido entre muchos cuadernos su aporte por unidad se vuelve despreciable. -->

### Explicacion Pedagogica
Se separa la fracción: $C(x) = \frac{2\,500x}{x} + \frac{4\,000\,000}{x} = 2\,500 + \frac{4\,000\,000}{x}$. Cuando $x \to \infty$, $\frac{4\,000\,000}{x} \to 0$, así $\lim_{x \to \infty} C(x) = 2\,500$ pesos. Por ejemplo, con un millón de cuadernos, $C = 2\,504$.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.68
**Contexto:** En un club de matemáticas de Valledupar se propone calcular $\lim_{x \to 1} \frac{x^3 - 1}{x^2 - 1}$, que aparece al estudiar el volumen de cajas.

### Enunciado
¿Cuál es el valor del límite?

### Opciones
- [ ] A) 1
  <!-- feedback: Incorrecto. Se cancelaron los "1" y las potencias como si $\frac{x^3 - 1}{x^2 - 1} = \frac{x^3}{x^2}$; no se pueden simplificar términos de una resta. -->
- [ ] B) No existe, porque da $\frac{0}{0}$.
  <!-- feedback: Incorrecto. $\frac{0}{0}$ es una indeterminación; al factorizar el límite resulta un número. -->
- [ ] C) $\frac{2}{3}$
  <!-- feedback: Incorrecto. Se invirtió el cociente; tras simplificar queda $\frac{x^2 + x + 1}{x + 1}$, con 3 arriba y 2 abajo. -->
- [x] D) $\frac{3}{2}$
  <!-- feedback: Correcto. $\frac{(x-1)(x^2+x+1)}{(x-1)(x+1)} = \frac{x^2 + x + 1}{x + 1} \to \frac{3}{2}$. -->

### Explicacion Pedagogica
Sustituir da $\frac{0}{0}$. Se factorizan: $x^3 - 1 = (x - 1)(x^2 + x + 1)$ (diferencia de cubos) y $x^2 - 1 = (x - 1)(x + 1)$. Cancelando $x - 1$: $\lim_{x \to 1} \frac{x^2 + x + 1}{x + 1} = \frac{1 + 1 + 1}{1 + 1} = \frac{3}{2}$.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.66
**Contexto:** Un programa que controla la dirección de un dron en el Eje Cafetero usa $s(x) = \frac{|x|}{x}$, que indica si una lectura es positiva o negativa.

### Enunciado
¿Cuál es $\lim_{x \to 0^-} \dfrac{|x|}{x}$?

### Opciones
- [ ] A) 1
  <!-- feedback: Incorrecto. Ese es el límite por la derecha; para $x < 0$, $|x| = -x$ y el cociente vale $-1$. -->
- [x] B) $-1$
  <!-- feedback: Correcto. Si $x < 0$, $\frac{|x|}{x} = \frac{-x}{x} = -1$, constante, así que el límite lateral izquierdo es $-1$. -->
- [ ] C) 0
  <!-- feedback: Incorrecto. El numerador y el denominador tienden a 0, pero su cociente es constante igual a $-1$ para todo $x < 0$. -->
- [ ] D) No existe.
  <!-- feedback: Incorrecto. El límite bilateral no existe, pero aquí se pide solo el lateral izquierdo, que sí existe y vale $-1$. -->

### Explicacion Pedagogica
Para $x < 0$ se cumple $|x| = -x$, por lo que $\frac{|x|}{x} = -1$ en todo el lado izquierdo; entonces $\lim_{x \to 0^-} \frac{|x|}{x} = -1$. Por la derecha el cociente es 1. Como los laterales difieren, el límite bilateral no existe, pero cada lateral sí.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.64
**Contexto:** Un entrenador de atletismo en Cali estudia la expresión $\frac{(3 + h)^2 - 9}{h}$, que da la rapidez media de crecimiento del área de un cuadrado de lado 3 m cuando el lado aumenta $h$ metros.

### Enunciado
¿Cuál es $\lim_{h \to 0} \dfrac{(3 + h)^2 - 9}{h}$?

### Opciones
- [ ] A) 0
  <!-- feedback: Incorrecto. Se desarrolló $(3 + h)^2$ como $9 + h^2$, olvidando el término $6h$; así quedaría $h \to 0$. -->
- [x] B) 6
  <!-- feedback: Correcto. $(3+h)^2 - 9 = 6h + h^2$, al dividir entre $h$ queda $6 + h \to 6$. -->
- [ ] C) 3
  <!-- feedback: Incorrecto. Se tomó el doble producto como $3h$ en lugar de $2 \cdot 3 \cdot h = 6h$. -->
- [ ] D) No existe.
  <!-- feedback: Incorrecto. La forma $\frac{0}{0}$ desaparece al expandir y simplificar; el resultado es el número 6. -->

### Explicacion Pedagogica
Al sustituir $h = 0$ queda $\frac{0}{0}$. Se expande: $(3 + h)^2 = 9 + 6h + h^2$, así el numerador es $6h + h^2 = h(6 + h)$. Para $h \neq 0$, el cociente es $6 + h$ y su límite es 6 m²/m: el área crece 6 veces más rápido que el lado en ese instante.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.62
**Contexto:** En un análisis de señales en un laboratorio de Bucaramanga aparece $g(x) = \frac{x^2 - 4}{|x - 2|}$ cerca de $x = 2$.

### Enunciado
¿Qué se puede concluir sobre $\lim_{x \to 2} g(x)$?

### Opciones
- [ ] A) Vale 4.
  <!-- feedback: Incorrecto. 4 es solo el límite por la derecha; por la izquierda $|x - 2| = -(x - 2)$ y el límite es $-4$. -->
- [ ] B) Vale 0.
  <!-- feedback: Incorrecto. Que numerador y denominador tiendan a 0 no da 0; al simplificar cada lado se obtiene $\pm(x + 2)$. -->
- [x] C) No existe, porque los límites laterales son 4 y $-4$.
  <!-- feedback: Correcto. Por la derecha $g(x) = x + 2 \to 4$ y por la izquierda $g(x) = -(x + 2) \to -4$. -->
- [ ] D) No existe, porque $g(2)$ no está definida.
  <!-- feedback: Incorrecto. La conclusión es correcta pero la razón no: un límite puede existir aunque $g(2)$ no esté definida; aquí falla porque los laterales difieren. -->

### Explicacion Pedagogica
Si $x > 2$: $|x - 2| = x - 2$ y $g(x) = \frac{(x-2)(x+2)}{x-2} = x + 2 \to 4$. Si $x < 2$: $|x - 2| = -(x - 2)$ y $g(x) = -(x + 2) \to -4$. Como $4 \neq -4$, el límite bilateral no existe. La causa es la diferencia de laterales, no la falta de $g(2)$.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.60
**Contexto:** Biólogos del lago de Tota (Boyacá) modelan la proporción de truchas marcadas con $R(x) = \frac{5x^3 - 2x}{2x^3 + 7x^2}$, donde $x$ son meses de seguimiento.

### Enunciado
¿Cuál es $\lim_{x \to \infty} R(x)$?

### Opciones
- [ ] A) 0
  <!-- feedback: Incorrecto. El límite es 0 cuando el grado del numerador es menor; aquí ambos son de grado 3. -->
- [x] B) $\frac{5}{2}$
  <!-- feedback: Correcto. Al dividir todo entre $x^3$: $\frac{5 - 2/x^2}{2 + 7/x} \to \frac{5}{2}$. -->
- [ ] C) $-\frac{2}{7}$
  <!-- feedback: Incorrecto. Se dividieron los coeficientes de los términos de menor grado; al infinito dominan los de mayor grado, $5x^3$ y $2x^3$. -->
- [ ] D) $\infty$
  <!-- feedback: Incorrecto. Crecería sin límite si el numerador tuviera mayor grado que el denominador; con grados iguales el límite es finito. -->

### Explicacion Pedagogica
Se divide numerador y denominador entre la mayor potencia, $x^3$: $R(x) = \frac{5 - \frac{2}{x^2}}{2 + \frac{7}{x}}$. Cuando $x \to \infty$, $\frac{2}{x^2} \to 0$ y $\frac{7}{x} \to 0$, de modo que $R(x) \to \frac{5}{2}$, el cociente de los coeficientes principales.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.58
**Contexto:** Un ingeniero eléctrico en Bogotá estudia la corriente $I(x) = \frac{x + 1}{x - 2}$ cuando la resistencia $x$ se acerca a 2 desde valores menores.

### Enunciado
¿Cuál es $\lim_{x \to 2^-} \dfrac{x + 1}{x - 2}$?

### Opciones
- [x] A) $-\infty$
  <!-- feedback: Correcto. El numerador tiende a 3 (positivo) y el denominador tiende a 0 con valores negativos, así que el cociente decrece sin límite. -->
- [ ] B) $+\infty$
  <!-- feedback: Incorrecto. Ese es el límite por la derecha; con $x < 2$ el denominador $x - 2$ es negativo y el signo del cociente es negativo. -->
- [ ] C) 0
  <!-- feedback: Incorrecto. Un denominador que tiende a 0 con numerador distinto de 0 hace crecer el cociente en valor absoluto, no lo anula. -->
- [ ] D) 3
  <!-- feedback: Incorrecto. 3 es el límite del numerador; se ignoró que el denominador se acerca a 0. -->

### Explicacion Pedagogica
Con $x = 1{,}9$: $\frac{2{,}9}{-0{,}1} = -29$; con $x = 1{,}99$: $\frac{2{,}99}{-0{,}01} = -299$. El numerador tiende a 3 y el denominador a $0^-$, por lo que $\frac{x+1}{x-2} \to -\infty$. Hay una asíntota vertical en $x = 2$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.56
**Contexto:** En una tarea, Camila (estudiante de Manizales) escribe: "al reemplazar $x = 0$ en $\frac{\sqrt{x + 4} - 2}{x}$ obtengo $\frac{0}{0}$; por lo tanto, $\lim_{x \to 0} \frac{\sqrt{x+4} - 2}{x}$ no existe".

### Enunciado
¿Qué evaluación del razonamiento de Camila es correcta?

### Opciones
- [x] A) Es incorrecto: $\frac{0}{0}$ es una indeterminación; al racionalizar el límite vale $\frac{1}{4}$.
  <!-- feedback: Correcto. $\frac{\sqrt{x+4} - 2}{x} = \frac{1}{\sqrt{x+4} + 2} \to \frac{1}{4}$. -->
- [ ] B) Es correcto: si se obtiene $\frac{0}{0}$, el límite no existe.
  <!-- feedback: Incorrecto. $\frac{0}{0}$ solo indica que la sustitución no decide; muchos límites con esa forma existen, como este, que vale $\frac{1}{4}$. -->
- [ ] C) Es incorrecto: el límite vale 0 porque el numerador tiende a 0.
  <!-- feedback: Incorrecto. El denominador también tiende a 0; el cociente de dos cantidades pequeñas puede ser cualquier número, aquí $\frac{1}{4}$. -->
- [ ] D) Es incorrecto: el límite vale $\frac{1}{2}$.
  <!-- feedback: Incorrecto. Tras racionalizar queda $\frac{1}{\sqrt{x+4} + 2}$; en 0 el denominador es $2 + 2 = 4$, no 2. -->

### Explicacion Pedagogica
Se multiplica por el conjugado: $\frac{(\sqrt{x+4} - 2)(\sqrt{x+4} + 2)}{x(\sqrt{x+4}+2)} = \frac{x + 4 - 4}{x(\sqrt{x+4}+2)} = \frac{1}{\sqrt{x+4}+2}$. Su límite en 0 es $\frac{1}{2 + 2} = \frac{1}{4}$. El error de Camila fue confundir indeterminación con inexistencia.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.54
**Contexto:** En la olimpiada de matemáticas de Antioquia se pide el valor de $a$ para que exista $\lim_{x \to 2} \frac{x^2 + ax - 6}{x - 2}$.

### Enunciado
¿Qué valor de $a$ hace que el límite exista y cuánto vale el límite?

### Opciones
- [ ] A) $a = -1$ y el límite vale 3
  <!-- feedback: Incorrecto. Con $a = -1$ el numerador en 2 es $4 - 2 - 6 = -4 \neq 0$, así que el cociente crece sin límite. -->
- [ ] B) $a = 3$ y el límite vale 0
  <!-- feedback: Incorrecto. Con $a = 3$ el numerador en 2 es $4 + 6 - 6 = 4$, no 0; el límite tampoco existe. -->
- [x] C) $a = 1$ y el límite vale 5
  <!-- feedback: Correcto. $4 + 2a - 6 = 0 \Rightarrow a = 1$, y $\frac{x^2 + x - 6}{x - 2} = x + 3 \to 5$. -->
- [ ] D) $a = 1$ y el límite no existe
  <!-- feedback: Incorrecto. El valor de $a$ es correcto, pero con él el numerador tiene el factor $x - 2$ y el límite existe: $x + 3 \to 5$. -->

### Explicacion Pedagogica
Como el denominador tiende a 0, el límite solo puede existir si el numerador también tiende a 0: $2^2 + 2a - 6 = 0 \Rightarrow a = 1$. Entonces $x^2 + x - 6 = (x - 2)(x + 3)$ y $\lim_{x \to 2} (x + 3) = 5$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.52
**Contexto:** Un topógrafo en Neiva compara la distancia $\sqrt{x^2 + 6x}$ con $x$ para valores muy grandes de $x$.

### Enunciado
¿Cuál es $\lim_{x \to \infty} \left(\sqrt{x^2 + 6x} - x\right)$?

### Opciones
- [ ] A) 0
  <!-- feedback: Incorrecto. "$\infty - \infty$" no es 0; es una indeterminación y hay que transformar la expresión. -->
- [ ] B) $\infty$
  <!-- feedback: Incorrecto. Ambos términos crecen, pero su diferencia se estabiliza; con $x = 1\,000$ la diferencia es aproximadamente 2,99. -->
- [ ] C) 6
  <!-- feedback: Incorrecto. Al racionalizar el denominador queda $\sqrt{x^2+6x} + x \approx 2x$, no $x$; por eso se divide $6x$ entre $2x$. -->
- [x] D) 3
  <!-- feedback: Correcto. $\frac{6x}{\sqrt{x^2 + 6x} + x} = \frac{6}{\sqrt{1 + 6/x} + 1} \to \frac{6}{2} = 3$. -->

### Explicacion Pedagogica
Se multiplica y divide por el conjugado: $\sqrt{x^2+6x} - x = \frac{x^2 + 6x - x^2}{\sqrt{x^2+6x} + x} = \frac{6x}{\sqrt{x^2+6x} + x}$. Dividiendo entre $x$: $\frac{6}{\sqrt{1 + 6/x} + 1} \to \frac{6}{1 + 1} = 3$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.50
**Contexto:** En un programa de restauración del páramo de Sumapaz, el número de frailejones plantados que sobreviven tras $t$ años se modela con $P(t) = \frac{8\,000t}{t + 4}$.

### Enunciado
¿Qué interpretación a largo plazo es correcta?

### Opciones
- [ ] A) La población crece sin límite porque $P(t)$ siempre aumenta.
  <!-- feedback: Incorrecto. Aumentar no implica crecer sin límite; $P(t) < 8\,000$ para todo $t$ porque $t < t + 4$. -->
- [ ] B) La población se estabiliza en 2 000 frailejones.
  <!-- feedback: Incorrecto. Se dividió $8\,000/4$; al infinito, $\frac{t}{t+4} \to 1$, así que el valor límite es 8 000. -->
- [ ] C) La población llega a 8 000 a los 4 años.
  <!-- feedback: Incorrecto. $P(4) = \frac{32\,000}{8} = 4\,000$; 8 000 no se alcanza en ningún tiempo finito. -->
- [x] D) La población se acerca a 8 000 frailejones sin llegar a alcanzarlos.
  <!-- feedback: Correcto. $\lim_{t \to \infty} \frac{8\,000t}{t+4} = 8\,000$ y $P(t) < 8\,000$ para todo $t \ge 0$. -->

### Explicacion Pedagogica
Dividiendo entre $t$: $P(t) = \frac{8\,000}{1 + 4/t} \to 8\,000$ cuando $t \to \infty$. Además $\frac{t}{t + 4} < 1$, así que $P(t)$ nunca llega a 8 000: hay una asíntota horizontal en 8 000. Por ejemplo $P(4) = 4\,000$ y $P(36) = 7\,200$.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.48
**Contexto:** En una evaluación de cálculo en Tunja se analiza $f(x) = \frac{x^2 - x - 2}{x - 2}$ alrededor de $x = 2$.

### Enunciado
¿Cuál afirmación es correcta?

### Opciones
- [ ] A) El límite en $x = 2$ no existe porque $f(2)$ no está definida.
  <!-- feedback: Incorrecto. El límite estudia valores cercanos a 2, no el valor en 2; al simplificar, $f(x) = x + 1 \to 3$. -->
- [x] B) $\lim_{x \to 2} f(x) = 3$, aunque $f(2)$ no existe.
  <!-- feedback: Correcto. $x^2 - x - 2 = (x - 2)(x + 1)$, así $f(x) = x + 1$ para $x \neq 2$ y el límite es 3. -->
- [ ] C) $f(2) = 3$.
  <!-- feedback: Incorrecto. En $x = 2$ el denominador es 0 y $f(2)$ no está definida; 3 es el límite, no el valor de la función. -->
- [ ] D) Hay una asíntota vertical en $x = 2$.
  <!-- feedback: Incorrecto. Para asíntota vertical el cociente debería crecer sin límite; aquí el factor $x - 2$ se cancela y hay solo un hueco en $(2, 3)$. -->

### Explicacion Pedagogica
Factorizando, $f(x) = \frac{(x-2)(x+1)}{x-2} = x + 1$ para $x \neq 2$. Por tanto $\lim_{x \to 2} f(x) = 3$, pero $f(2)$ no existe porque anula el denominador. La gráfica es la recta $y = x + 1$ con un hueco en $(2, 3)$, no una asíntota.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.47
**Contexto:** Una ciclista sube el Alto de Letras (Caldas) y su posición en metros es $s(t) = 0{,}5t^2 + 2t$, con $t$ en segundos, durante un tramo de prueba.

### Enunciado
La velocidad instantánea en $t = 4$ es $\lim_{h \to 0} \frac{s(4 + h) - s(4)}{h}$. ¿Cuál es su valor?

### Opciones
- [x] A) 6 m/s
  <!-- feedback: Correcto. $s(4+h) - s(4) = 6h + 0{,}5h^2$; dividido entre $h$ da $6 + 0{,}5h \to 6$. -->
- [ ] B) 4 m/s
  <!-- feedback: Incorrecto. Esa es la velocidad media entre 0 y 4 s, $\frac{s(4) - s(0)}{4} = \frac{16}{4}$; no es la instantánea. -->
- [ ] C) 16 m/s
  <!-- feedback: Incorrecto. 16 m es la posición $s(4)$, no una velocidad; falta el cociente de cambio. -->
- [ ] D) 2 m/s
  <!-- feedback: Incorrecto. 2 es solo el coeficiente del término lineal; se omitió el aporte de $0{,}5t^2$, que en $t = 4$ suma 4 m/s. -->

### Explicacion Pedagogica
$s(4) = 0{,}5(16) + 8 = 16$. $s(4 + h) = 0{,}5(16 + 8h + h^2) + 8 + 2h = 16 + 6h + 0{,}5h^2$. Entonces $\frac{s(4+h) - s(4)}{h} = 6 + 0{,}5h$, y su límite cuando $h \to 0$ es 6 m/s.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W03-limites-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.45
**Contexto:** Un profesor de Villavicencio propone cuatro funciones y pide identificar la que tiene límite igual a 2 cuando $x \to 1$.

### Enunciado
¿Cuál de estas funciones cumple $\lim_{x \to 1} f(x) = 2$?

### Opciones
- [ ] A) $f(x) = \frac{x^2 + 1}{x - 1}$
  <!-- feedback: Incorrecto. El numerador tiende a 2 y el denominador a 0, así que el cociente crece sin límite; no hay factor común que se cancele. -->
- [ ] B) $f(x) = \frac{|x - 1|}{x - 1}$
  <!-- feedback: Incorrecto. Sus laterales en 1 son $-1$ y 1; el límite no existe. -->
- [ ] C) $f(x) = \frac{x^2 - 1}{x + 1}$
  <!-- feedback: Incorrecto. Al simplificar queda $x - 1$, cuyo límite en 1 es 0, no 2. -->
- [x] D) $f(x) = \frac{x^2 - 1}{x - 1}$
  <!-- feedback: Correcto. $\frac{(x - 1)(x + 1)}{x - 1} = x + 1 \to 2$. -->

### Explicacion Pedagogica
Se analiza cada opción. A: $\frac{2}{0}$, tiende a infinito. B: el cociente vale $-1$ a la izquierda y 1 a la derecha, no hay límite. C: $\frac{(x-1)(x+1)}{x+1} = x - 1 \to 0$. D: $\frac{(x-1)(x+1)}{x-1} = x + 1 \to 2$. Solo D tiene límite 2.
