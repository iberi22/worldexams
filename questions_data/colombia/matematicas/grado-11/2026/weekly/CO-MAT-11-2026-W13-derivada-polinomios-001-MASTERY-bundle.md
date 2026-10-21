---
id: "CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "derivada-polinomios"
periodo: "weekly"
week: "W13"
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

# Bundle MASTERY: Derivada de Polinomios - Grado 11

Este bundle evalúa la derivación de polinomios, las derivadas de orden superior y su uso en modelos de costo, ingreso y movimiento en contextos colombianos.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Algebraico
**Expected_Success:** 0.85
**Contexto:** En una fábrica de bocadillo de Vélez (Santander), el ingeniero de planta modela la temperatura de una paila con un polinomio y necesita su derivada.

### Enunciado
Para el polinomio $f(x) = 4x^5 - 3x^2 + 7x - 9$, ¿cuál es su derivada $f'(x)$?

### Opciones
- [ ] A) $20x^5 - 6x^2 + 7$
  <!-- feedback: Incorrecto. Multiplicó por el exponente pero no lo redujo en 1: la derivada de $x^5$ es $5x^4$, no $5x^5$. -->
- [ ] B) $4x^4 - 3x + 7$
  <!-- feedback: Incorrecto. Bajó el exponente pero olvidó multiplicar por él: $(4x^5)'=4\cdot 5x^4=20x^4$. -->
- [ ] C) $20x^4 - 6x$
  <!-- feedback: Incorrecto. Trató $7x$ como si fuera constante; la derivada de $7x$ es 7, no 0. -->
- [x] D) $20x^4 - 6x + 7$
  <!-- feedback: Correcto. Con la regla de la potencia: $(4x^5)'=20x^4$, $(-3x^2)'=-6x$, $(7x)'=7$ y la constante $-9$ tiene derivada 0. -->

### Explicacion Pedagogica
Se deriva término a término con $(ax^n)'=a\cdot n\,x^{n-1}$: $4\cdot 5x^4=20x^4$, $-3\cdot 2x=-6x$, $7\cdot 1=7$ y la derivada de $-9$ es 0. Por tanto $f'(x)=20x^4-6x+7$.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Algebraico
**Expected_Success:** 0.83
**Contexto:** Un grupo de estudiantes de ingeniería de la Universidad Nacional en Bogotá analiza un polinomio de grado 7 que describe la trayectoria de un brazo robótico.

### Enunciado
Si $p(x)$ es un polinomio de grado 7, ¿cuál es el grado de su tercera derivada $p'''(x)$?

### Opciones
- [ ] A) 3
  <!-- feedback: Incorrecto. Confundió el número de derivadas (3) con el grado resultante; el grado baja de 7 a 6, a 5 y a 4. -->
- [ ] B) 7
  <!-- feedback: Incorrecto. Derivar no conserva el grado: el término $ax^7$ se convierte en $7ax^6$, de grado menor. -->
- [ ] C) 6
  <!-- feedback: Incorrecto. El grado 6 corresponde solo a la primera derivada; faltan dos derivadas más, cada una restando 1. -->
- [x] D) 4
  <!-- feedback: Correcto. Cada derivada reduce el grado en 1: $7-3=4$. -->

### Explicacion Pedagogica
Si el término principal es $ax^7$, entonces $p'=7ax^6$, $p''=42ax^5$ y $p'''=210ax^4$. Como $a\neq 0$, el coeficiente $210a$ no se anula y el grado de la tercera derivada es exactamente $7-3=4$.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.80
**Contexto:** En un laboratorio de física de un colegio de Bucaramanga, la posición de un carrito sobre un riel se registra con un sensor y se ajusta a un polinomio.

### Enunciado
La posición del carrito es $s(t) = t^3 - 5t^2 + 2t + 1$ metros, con $t$ en segundos. ¿Cuál es su velocidad instantánea $s'(2)$?

### Opciones
- [ ] A) $-7$ m/s
  <!-- feedback: Incorrecto. $-7$ es $s(2)=8-20+4+1$, la posición en $t=2$; la velocidad exige evaluar la derivada, no la función. -->
- [x] B) $-6$ m/s
  <!-- feedback: Correcto. $s'(t)=3t^2-10t+2$, así que $s'(2)=12-20+2=-6$ m/s. -->
- [ ] C) $-8$ m/s
  <!-- feedback: Incorrecto. Olvidó el término $2$ que proviene de derivar $2t$: $12-20=-8$ no está completo. -->
- [ ] D) $34$ m/s
  <!-- feedback: Incorrecto. Cambió el signo del término $-10t$: $12+20+2=34$; la derivada de $-5t^2$ es $-10t$. -->

### Explicacion Pedagogica
La velocidad es la derivada de la posición: $s'(t)=3t^2-10t+2$. Evaluando, $s'(2)=3(4)-10(2)+2=-6$ m/s. El signo negativo indica que en ese instante el carrito se mueve en sentido contrario al eje elegido.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Algebraico
**Expected_Success:** 0.78
**Contexto:** Una cooperativa de Pasto combina dos modelos de ingreso: uno ya conocido, $f$, y una corrección cuadrática que aplica la contadora.

### Enunciado
Se define $g(x) = 3f(x) - 2x^2$. Si se sabe que $f'(1)=4$, ¿cuál es el valor de $g'(1)$?

### Opciones
- [ ] A) 10
  <!-- feedback: Incorrecto. Derivó $-2x^2$ como $-2$ en vez de $-4x$: $12-2=10$. -->
- [ ] B) 0
  <!-- feedback: Incorrecto. Olvidó el factor constante 3: $f'(1)-4=0$; la derivada de $3f$ es $3f'$. -->
- [x] C) 8
  <!-- feedback: Correcto. $g'(x)=3f'(x)-4x$, luego $g'(1)=3(4)-4(1)=8$. -->
- [ ] D) 12
  <!-- feedback: Incorrecto. Ignoró la derivada de $-2x^2$, que vale $-4$ en $x=1$: $12-4=8$, no 12. -->

### Explicacion Pedagogica
La derivada es lineal: $(3f-2x^2)'=3f'-4x$. Con $f'(1)=4$ se obtiene $g'(1)=3\cdot 4-4\cdot 1=12-4=8$. No hace falta conocer la fórmula de $f$, solo su derivada en el punto.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.75
**Contexto:** Una empresa de confecciones de Medellín estima su costo total de producción en miles de pesos colombianos (COP) según el número de chaquetas fabricadas.

### Enunciado
El costo es $C(q) = 0.02q^3 - 3q^2 + 200q + 50000$ (miles de COP). El costo marginal es $C'(q)$. ¿Cuál es el costo marginal cuando se producen 50 chaquetas?

### Opciones
- [ ] A) 1.100 mil COP por chaqueta
  <!-- feedback: Incorrecto. Ese es el costo promedio $C(50)/50=55000/50=1100$, no la tasa de cambio del costo. -->
- [ ] B) 650 mil COP por chaqueta
  <!-- feedback: Incorrecto. Cambió el signo del término $-6q$: $150+300+200=650$; la derivada de $-3q^2$ es $-6q$. -->
- [ ] C) 100 mil COP por chaqueta
  <!-- feedback: Incorrecto. No multiplicó por los exponentes: usó $0.02q^2-3q+200$, que da $50-150+200=100$. -->
- [x] D) 50 mil COP por chaqueta
  <!-- feedback: Correcto. $C'(q)=0.06q^2-6q+200$ y $C'(50)=150-300+200=50$. -->

### Explicacion Pedagogica
Se deriva: $C'(q)=0.02\cdot 3q^2-3\cdot 2q+200=0.06q^2-6q+200$. En $q=50$: $0.06(2500)-6(50)+200=150-300+200=50$. Producir una chaqueta adicional cerca de las 50 cuesta aproximadamente 50 mil COP; el costo fijo 50000 no influye en el marginal.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.73
**Contexto:** El perfil de altitud de una ruta ciclística en Boyacá se modela con un polinomio cúbico en función de la distancia recorrida (en km).

### Enunciado
Si $f(x) = 2x^3 - 9x^2 + 12x + 5$, ¿en qué valores de $x$ la pendiente del perfil es cero, es decir, $f'(x)=0$?

### Opciones
- [ ] A) $x = 0$ y $x = 3$
  <!-- feedback: Incorrecto. Omitió el término constante 12 de $f'$ y resolvió $6x^2-18x=0$. -->
- [x] B) $x = 1$ y $x = 2$
  <!-- feedback: Correcto. $f'(x)=6x^2-18x+12=6(x-1)(x-2)$, que se anula en 1 y en 2. -->
- [ ] C) $x = -1$ y $x = -2$
  <!-- feedback: Incorrecto. Error de signo al factorizar: $6(x-1)(x-2)$ se anula en valores positivos. -->
- [ ] D) $x = \frac{3}{2}$ únicamente
  <!-- feedback: Incorrecto. Resolvió $f''(x)=12x-18=0$, la segunda derivada, no la primera. -->

### Explicacion Pedagogica
Derivando: $f'(x)=6x^2-18x+12$. Se saca factor común 6: $6(x^2-3x+2)=6(x-1)(x-2)$. Igualando a cero, $x=1$ o $x=2$. En esos kilómetros el perfil de la ruta es momentáneamente plano.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.71
**Contexto:** En una pista de pruebas de Tocancipá se estudia el movimiento de un vehículo eléctrico; su posición en metros se describe con un polinomio en el tiempo (segundos).

### Enunciado
La posición es $s(t) = t^4 - 2t^3 + 5t$. La aceleración es $a(t)=s''(t)$. ¿Cuál es la aceleración en $t = 2$?

### Opciones
- [ ] A) $13$ m/s²
  <!-- feedback: Incorrecto. $13$ es $s'(2)=32-24+5$, la velocidad; la aceleración requiere derivar una vez más. -->
- [ ] B) $29$ m/s²
  <!-- feedback: Incorrecto. Conservó la constante 5 en la segunda derivada: la derivada de 5 es 0, así que $48-24=24$. -->
- [x] C) $24$ m/s²
  <!-- feedback: Correcto. $s''(t)=12t^2-12t$, así que $s''(2)=48-24=24$. -->
- [ ] D) $36$ m/s²
  <!-- feedback: Incorrecto. Evaluó la tercera derivada $s'''(t)=24t-12$ en $t=2$: $48-12=36$. -->

### Explicacion Pedagogica
Primera derivada: $s'(t)=4t^3-6t^2+5$ (velocidad). Segunda derivada: $s''(t)=12t^2-12t$ (aceleración), porque la constante 5 desaparece. Entonces $s''(2)=12(4)-12(2)=24$ m/s².

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Razonamiento
**Expected_Success:** 0.69
**Contexto:** En una clase de cálculo en Cartagena, un estudiante presenta en el tablero su derivada de un producto de dos polinomios.

### Enunciado
El estudiante escribe: si $f(x)=(x^2+1)(x-3)$, entonces $f'(x)=(2x)(1)=2x$. ¿Qué evaluación de su trabajo es correcta?

### Opciones
- [x] A) Derivó factor por factor, lo cual no es válido; al expandir $f(x)=x^3-3x^2+x-3$ se obtiene $f'(x)=3x^2-6x+1$
  <!-- feedback: Correcto. La derivada de un producto no es el producto de las derivadas; desarrollando y derivando resulta $3x^2-6x+1$. -->
- [ ] B) Debía derivar solo el primer factor: $f'(x)=2x(x-3)$
  <!-- feedback: Incorrecto. $2x(x-3)=2x^2-6x$ ignora la variación del factor $(x-3)$; falta el término $(x^2+1)\cdot 1$. -->
- [ ] C) El procedimiento es válido y $f'(x)=2x$
  <!-- feedback: Incorrecto. Basta probar en $x=0$: la derivada real vale $1$, mientras que $2x$ vale 0. -->
- [ ] D) Al expandir se obtiene $f'(x)=3x^2-6x-3$
  <!-- feedback: Incorrecto. Conservó la constante $-3$ al derivar; la derivada de una constante es 0, por lo que queda $+1$ del término $x$. -->

### Explicacion Pedagogica
Primero se desarrolla el producto: $(x^2+1)(x-3)=x^3-3x^2+x-3$. Luego se deriva término a término: $3x^2-6x+1$. El error del estudiante fue suponer que $(uv)'=u'v'$, lo cual es falso en general.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.67
**Contexto:** Una tienda de artesanías de Cali conoce la tasa a la que cambian sus ventas acumuladas y quiere recuperar el modelo original de ventas.

### Enunciado
¿Cuál de las siguientes funciones tiene como derivada $f'(x) = 6x^2 - 4x + 3$?

### Opciones
- [ ] A) $f(x) = 12x - 4$
  <!-- feedback: Incorrecto. Esa es la derivada de $6x^2-4x+3$, no una función cuya derivada sea $6x^2-4x+3$. -->
- [x] B) $f(x) = 2x^3 - 2x^2 + 3x + 10$
  <!-- feedback: Correcto. Al derivar: $6x^2-4x+3$; la constante 10 desaparece. -->
- [ ] C) $f(x) = 6x^3 - 4x^2 + 3x$
  <!-- feedback: Incorrecto. Su derivada es $18x^2-8x+3$; aumentó el exponente pero no dividió entre el nuevo exponente. -->
- [ ] D) $f(x) = 2x^3 - 4x^2 + 3x$
  <!-- feedback: Incorrecto. Su derivada es $6x^2-8x+3$; dividió el primer término pero no el segundo, $-4x$ proviene de $-2x^2$. -->

### Explicacion Pedagogica
Se verifica derivando cada candidata: $(2x^3-2x^2+3x+10)'=6x^2-4x+3$. Para $6x^3-4x^2+3x$ resulta $18x^2-8x+3$ y para $2x^3-4x^2+3x$ resulta $6x^2-8x+3$; $12x-4$ es la derivada de la expresión dada, no una función original.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.65
**Contexto:** En una panadería de Pasto se registra la temperatura del horno, en °C, durante los primeros minutos de encendido.

### Enunciado
La temperatura es $T(t) = -0.5t^2 + 12t + 20$, con $t$ en minutos. ¿En qué instante la tasa de cambio instantánea $T'(t)$ es igual a la tasa media de cambio en el intervalo $[0, 4]$?

### Opciones
- [ ] A) $t = 10$ min
  <!-- feedback: Incorrecto. 10 es el valor de la tasa media (°C/min), no el instante; falta resolver $-t+12=10$. -->
- [ ] B) $t = 4$ min
  <!-- feedback: Incorrecto. En $t=4$ la tasa instantánea es $-4+12=8$, distinta de la tasa media 10. -->
- [x] C) $t = 2$ min
  <!-- feedback: Correcto. La tasa media es $\frac{T(4)-T(0)}{4}=\frac{60-20}{4}=10$ y $T'(t)=-t+12=10$ da $t=2$. -->
- [ ] D) $t = 22$ min
  <!-- feedback: Incorrecto. Error de signo al despejar: de $-t+12=10$ se obtiene $t=2$, no $t=22$. -->

### Explicacion Pedagogica
Tasa media: $T(0)=20$ y $T(4)=-8+48+20=60$, así que $\frac{60-20}{4-0}=10$ °C/min. Tasa instantánea: $T'(t)=-t+12$. Igualando $-t+12=10$ se obtiene $t=2$ min, un instante dentro de $[0,4]$.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.62
**Contexto:** Un ingeniero de una empresa de energía en Barranquilla ajusta un modelo cúbico sin término cuadrático para la potencia de un aerogenerador.

### Enunciado
Se sabe que $f(x) = ax^3 + bx$ cumple $f'(1) = 5$ y $f''(1) = 12$. ¿Cuáles son los valores de $a$ y $b$?

### Opciones
- [ ] A) $a = 2$, $b = 3$
  <!-- feedback: Incorrecto. Usó $f'(1)=a+b$ en vez de $3a+b$: olvidó multiplicar por el exponente 3. -->
- [x] B) $a = 2$, $b = -1$
  <!-- feedback: Correcto. $f''(x)=6ax$ da $6a=12$, $a=2$; luego $f'(1)=3a+b=6+b=5$, $b=-1$. -->
- [ ] C) $a = 6$, $b = -13$
  <!-- feedback: Incorrecto. Supuso $f''(1)=2a$; la segunda derivada de $ax^3$ es $6ax$, que en 1 vale $6a$. -->
- [ ] D) $a = 4$, $b = -7$
  <!-- feedback: Incorrecto. Derivó $3ax^2$ como $3ax$, sin multiplicar por 2: $f''(1)=6a$, no $3a$. -->

### Explicacion Pedagogica
Derivadas: $f'(x)=3ax^2+b$ y $f''(x)=6ax$. De $f''(1)=6a=12$ se tiene $a=2$. Sustituyendo en $f'(1)=3a+b=5$: $6+b=5$, de modo que $b=-1$. El modelo es $f(x)=2x^3-x$.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.60
**Contexto:** Un emprendimiento de café especial en Pereira modela ingresos y costos (en miles de COP) según las libras vendidas por semana, $x$.

### Enunciado
Ingreso: $I(x)=120x-0.5x^2$; costo: $C(x)=0.5x^2+20x+3000$. La utilidad es $U=I-C$. ¿Qué valor tiene $U'(40)$ y qué significa?

### Opciones
- [x] A) $U'(40)=20$: vender la libra 41 aumenta la utilidad en aproximadamente 20 mil COP
  <!-- feedback: Correcto. $U(x)=-x^2+100x-3000$, $U'(x)=-2x+100$ y $U'(40)=20$, que mide el cambio aproximado por una libra adicional. -->
- [ ] B) $U'(40)=20$: la utilidad total con 40 libras es 20 mil COP
  <!-- feedback: Incorrecto. Confunde la derivada con la función: $U(40)=-1600+4000-3000=-600$, no 20. -->
- [ ] C) $U'(40)=100$: cada libra adicional siempre aporta 100 mil COP
  <!-- feedback: Incorrecto. 100 es solo el término constante de $U'(x)=-2x+100$; olvidó restar $2\cdot 40=80$. -->
- [ ] D) $U'(40)=60$: la utilidad crece 60 mil COP por libra
  <!-- feedback: Incorrecto. 60 es el costo marginal $C'(40)=40+20$; la utilidad marginal es $I'(40)-C'(40)=80-60=20$. -->

### Explicacion Pedagogica
$U(x)=(120x-0.5x^2)-(0.5x^2+20x+3000)=-x^2+100x-3000$. Entonces $U'(x)=-2x+100$ y $U'(40)=-80+100=20$. La utilidad marginal positiva indica que vender una libra más (la 41) incrementa la utilidad en cerca de 20 mil COP.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.58
**Contexto:** En el diseño de una rampa para el parque de patinaje de Envigado se busca un polinomio con condiciones dadas sobre sus derivadas.

### Enunciado
Un polinomio $p$ cumple $p''(x) = 6$ para todo $x$, $p'(0) = 4$ y $p(0) = -1$. ¿Cuál es $p(x)$?

### Opciones
- [x] A) $p(x) = 3x^2 + 4x - 1$
  <!-- feedback: Correcto. $p'(x)=6x+4$ y $p''(x)=6$; además $p'(0)=4$ y $p(0)=-1$. -->
- [ ] B) $p(x) = 6x^2 + 4x - 1$
  <!-- feedback: Incorrecto. Su segunda derivada es 12, no 6: faltó dividir entre 2 al pasar de $6$ a $3x^2$. -->
- [ ] C) $p(x) = 3x^2 - x + 4$
  <!-- feedback: Incorrecto. Intercambió los datos: aquí $p'(0)=-1$ y $p(0)=4$, al revés de lo pedido. -->
- [ ] D) $p(x) = x^3 + 4x - 1$
  <!-- feedback: Incorrecto. Su segunda derivada es $6x$, que no es la constante 6 para todo $x$. -->

### Explicacion Pedagogica
Si $p''(x)=6$, entonces $p'(x)=6x+c_1$ y con $p'(0)=4$ resulta $c_1=4$. Luego $p(x)=3x^2+4x+c_2$ y $p(0)=-1$ da $c_2=-1$. Así $p(x)=3x^2+4x-1$; se comprueba derivando dos veces.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.56
**Contexto:** Durante una monitoría en un colegio de Ibagué, una estudiante revisa la derivada de un binomio al cuadrado que calculó un compañero.

### Enunciado
El compañero afirma: si $f(x) = (2x - 1)^2$, entonces $f'(x) = 2(2x - 1) = 4x - 2$. ¿Cuál es el diagnóstico correcto?

### Opciones
- [ ] A) Su resultado $f'(x)=4x-2$ es correcto
  <!-- feedback: Incorrecto. En $x=1$ la derivada real es $8-4=4$, pero su fórmula da $2$. -->
- [ ] B) La derivada es $f'(x)=4x^2-4x+1$
  <!-- feedback: Incorrecto. Eso es $f(x)$ desarrollada, todavía sin derivar. -->
- [ ] C) La derivada es $f'(x)=8x+4$
  <!-- feedback: Incorrecto. Error de signo: la derivada de $-4x$ es $-4$, no $+4$. -->
- [x] D) Omitió el factor 2 de la derivada interna; al desarrollar $f(x)=4x^2-4x+1$ se obtiene $f'(x)=8x-4$
  <!-- feedback: Correcto. Desarrollando el cuadrado y derivando: $8x-4=2(2x-1)\cdot 2$. -->

### Explicacion Pedagogica
$(2x-1)^2=4x^2-4x+1$, cuya derivada es $8x-4$. El compañero aplicó $(u^2)'=2u$ olvidando multiplicar por $u'=2$; con la regla completa, $2(2x-1)\cdot 2=8x-4$, que coincide con el desarrollo.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.54
**Contexto:** Dos talleres de muebles en Cúcuta tienen modelos de costo distintos, en miles de COP, según el número de sillas $x$ que fabrican al día.

### Enunciado
Taller 1: $C_1(x) = 0.5x^2 + 10x$. Taller 2: $C_2(x) = x^2 - 6x + 100$. ¿Para qué producción los dos talleres tienen el mismo costo marginal?

### Opciones
- [ ] A) $x = 4$ sillas
  <!-- feedback: Incorrecto. Restó mal las constantes: de $x+10=2x-6$ se obtiene $x=10+6=16$, no $10-6$. -->
- [ ] B) $x = \frac{32}{3}$ sillas
  <!-- feedback: Incorrecto. Derivó $0.5x^2$ como $0.5x$: con $0.5x+10=2x-6$ resulta $\frac{32}{3}$, pero la derivada correcta es $x$. -->
- [ ] C) $x = -16$ sillas
  <!-- feedback: Incorrecto. Invirtió el signo al despejar; además, una producción negativa no tiene sentido en el contexto. -->
- [x] D) $x = 16$ sillas
  <!-- feedback: Correcto. $C_1'(x)=x+10$ y $C_2'(x)=2x-6$; $x+10=2x-6$ da $x=16$. -->

### Explicacion Pedagogica
Costos marginales: $C_1'(x)=x+10$ y $C_2'(x)=2x-6$. Igualando, $x+10=2x-6$, de donde $x=16$. En 16 sillas una silla adicional cuesta lo mismo en ambos talleres: $16+10=26$ y $32-6=26$ mil COP.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.52
**Contexto:** Un topógrafo del Eje Cafetero modela el perfil de una ladera con un polinomio cúbico que tiene un parámetro por ajustar.

### Enunciado
Para $f(x) = x^3 + kx^2 + 1$ se sabe que la tasa de cambio instantánea es cero en $x = 2$. ¿Cuál es el valor de $k$?

### Opciones
- [x] A) $k = -3$
  <!-- feedback: Correcto. $f'(x)=3x^2+2kx$, y $f'(2)=12+4k=0$ da $k=-3$. -->
- [ ] B) $k = 3$
  <!-- feedback: Incorrecto. Error de signo al despejar: $12+4k=0$ implica $4k=-12$. -->
- [ ] C) $k = -6$
  <!-- feedback: Incorrecto. Derivó $kx^2$ como $kx$ y resolvió $12+2k=0$; la derivada es $2kx$, que en 2 vale $4k$. -->
- [ ] D) $k = -\frac{9}{4}$
  <!-- feedback: Incorrecto. Resolvió $f(2)=8+4k+1=0$, que anula la función, no su tasa de cambio. -->

### Explicacion Pedagogica
La tasa de cambio instantánea es $f'(x)=3x^2+2kx$. Imponiendo $f'(2)=0$: $3(4)+2k(2)=12+4k=0$, así que $k=-3$. Comprobación: con $k=-3$, $f'(x)=3x^2-6x=3x(x-2)$, que se anula en $x=2$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.50
**Contexto:** En un semillero de matemáticas de Tunja, los estudiantes discuten propiedades generales de las derivadas de polinomios.

### Enunciado
¿Cuál de las siguientes afirmaciones sobre polinomios es verdadera?

### Opciones
- [ ] A) La derivada de todo polinomio de grado 3 tiene dos raíces reales distintas
  <!-- feedback: Incorrecto. Contraejemplo: $p(x)=x^3+x$ tiene $p'(x)=3x^2+1$, sin raíces reales. -->
- [ ] B) Si $p$ tiene grado $n$, su derivada de orden $n$ es igual a 0
  <!-- feedback: Incorrecto. La derivada de orden $n$ de $ax^n$ es $n!\,a$, constante no nula; se anula a partir del orden $n+1$. -->
- [x] C) Si $p$ tiene grado 4, entonces su cuarta derivada es una constante distinta de cero
  <!-- feedback: Correcto. Si el término principal es $ax^4$ con $a\neq 0$, la cuarta derivada es $24a\neq 0$. -->
- [ ] D) La derivada de $p(x) + 5$ es $p'(x) + 5$
  <!-- feedback: Incorrecto. La derivada de la constante 5 es 0, así que $(p+5)'=p'$. -->

### Explicacion Pedagogica
Derivar $ax^4$ cuatro veces da $4\cdot 3\cdot 2\cdot 1\cdot a=24a$, y los términos de menor grado desaparecen antes. Las otras afirmaciones fallan: $x^3+x$ tiene derivada sin raíces, la derivada $n$-ésima vale $n!\,a$ y una constante sumada no cambia la derivada.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.48
**Contexto:** Una fábrica de arepas de Barranquilla modela su costo total diario, en pesos colombianos, según el número $q$ de paquetes producidos.

### Enunciado
El costo es $C(q) = 0.001q^3 - 0.3q^2 + 40q + 200000$. Cuatro analistas opinan sobre el costo marginal $C'(q)$. ¿Cuál afirmación está bien justificada?

### Opciones
- [ ] A) $C'(100)=0$, así que producir más allá de 100 paquetes no cuesta nada
  <!-- feedback: Incorrecto. $C'(100)=30-60+40=10$, no 0; ese es el valor mínimo del costo marginal, que sigue siendo positivo. -->
- [x] B) $C'(q)>0$ para todo $q$, porque $0.003q^2-0.6q+40$ tiene discriminante $0.36-0.48<0$ y coeficiente principal positivo
  <!-- feedback: Correcto. Una cuadrática con discriminante negativo y $a>0$ es siempre positiva: el costo nunca baja al producir más. -->
- [ ] C) El costo marginal es constante e igual a 40 pesos
  <!-- feedback: Incorrecto. 40 es solo el término independiente de $C'(q)$; los términos $0.003q^2$ y $-0.6q$ hacen que varíe con $q$. -->
- [ ] D) El costo marginal es negativo entre $q=0$ y $q=200$ porque el término $-0.3q^2$ es negativo
  <!-- feedback: Incorrecto. Que un término sea negativo no hace negativa la suma; por ejemplo $C'(100)=10>0$. -->

### Explicacion Pedagogica
$C'(q)=0.003q^2-0.6q+40$. Su discriminante es $(-0.6)^2-4(0.003)(40)=0.36-0.48=-0.12<0$, y como $0.003>0$, la parábola queda siempre sobre el eje: $C'(q)>0$. Su mínimo está en $q=100$, donde vale $10$ pesos por paquete.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Numerico
**Expected_Success:** 0.47
**Contexto:** Una microempresa de mochilas en Valledupar calcula su costo total en miles de COP y quiere estimar cuánto cuesta producir una unidad más.

### Enunciado
Con $C(q) = q^2 + 5q$ (miles de COP), se producen 100 mochilas. ¿Cuál afirmación sobre el costo de la mochila número 101 es correcta?

### Opciones
- [ ] A) $C'(100)=205$ es exactamente el costo de la mochila 101
  <!-- feedback: Incorrecto. La derivada es una tasa instantánea; el costo exacto es $C(101)-C(100)=206$. -->
- [ ] B) $C(101)-C(100)=205$, igual que la derivada
  <!-- feedback: Incorrecto. $C(101)=10201+505=10706$ y $C(100)=10500$, cuya diferencia es 206. -->
- [x] C) $C'(100)=205$ aproxima ese costo; el valor exacto es $C(101)-C(100)=206$
  <!-- feedback: Correcto. $C'(q)=2q+5$ da 205, y $10706-10500=206$: la derivada es una aproximación muy cercana. -->
- [ ] D) El costo de la mochila 101 es $\frac{C(100)}{100}=105$
  <!-- feedback: Incorrecto. $\frac{C(100)}{100}$ es el costo promedio de las 100 primeras, no el costo de una unidad adicional. -->

### Explicacion Pedagogica
El costo marginal $C'(q)=2q+5$ vale $C'(100)=205$ mil COP. El costo exacto de la unidad 101 es $C(101)-C(100)=(10201+505)-(10000+500)=206$. La derivada estima el incremento con un error de solo 1 mil COP.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W13-derivada-polinomios-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.45
**Contexto:** En una olimpiada de matemáticas de Villavicencio se plantea un problema con un parámetro, y dos estudiantes, Ana y Luis, proponen respuestas.

### Enunciado
Para $p(x) = x^3 - 6x^2 + cx$, se busca el valor de $c$ con el que $p'(x)$ se anula en un único valor real de $x$. Ana dice $c=12$; Luis dice $c=36$. ¿Qué evaluación es correcta?

### Opciones
- [x] A) Ana tiene razón: el discriminante de $3x^2-12x+c$ es $144-12c$, que es cero si $c=12$
  <!-- feedback: Correcto. Con $c=12$, $p'(x)=3(x-2)^2$ se anula solo en $x=2$. -->
- [ ] B) Luis tiene razón, porque $144-4c=0$ da $c=36$
  <!-- feedback: Incorrecto. Omite el coeficiente $a=3$ en $b^2-4ac$: debe ser $144-4\cdot 3\cdot c=144-12c$. -->
- [ ] C) Ninguno: el valor correcto es $c=-12$
  <!-- feedback: Incorrecto. Con $c=-12$ el discriminante es $144+144=288>0$ y hay dos raíces distintas. -->
- [ ] D) Ninguno: el valor correcto es $c=4$
  <!-- feedback: Incorrecto. Con $c=4$, $144-48=96>0$; $p'$ tendría dos raíces reales. -->

### Explicacion Pedagogica
$p'(x)=3x^2-12x+c$. Tiene una única raíz real cuando su discriminante es cero: $(-12)^2-4(3)(c)=144-12c=0$, es decir $c=12$. Entonces $p'(x)=3x^2-12x+12=3(x-2)^2$, que solo se anula en $x=2$.
