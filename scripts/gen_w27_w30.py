#!/usr/bin/env python3
"""Generate W27-W30 bundles."""
import os; W=r"E:\scripts-python\worldexams\questions_data\colombia\matematicas\grado-6\2026\weekly"
def write_bundle(fname, content):
    open(os.path.join(W,fname),"w",encoding="utf-8").write(content)
    print(f"OK: {fname}")
def make(s):
    L=[f"---\nid: \"{s['id']}\"\ncountry: \"colombia\"\ngrado: 6\nasignatura: \"matematicas\"\ntema: \"{s['tema']}\"\nperiodo: {s['p']}\nweek: {s['w']}\nyear: 2026\nbundle_type: \"weekly\"\nprotocol_version: \"5.2\"\ntotal_questions: 10\nbundle_size: 10\nalignment: \"DBA MEN + Estandares Basicos Ciclo 2\"\n---\n\n# Weekly Pack W{s['w']} -- {s['t']}\n\n**Grado:** 6 | **Periodo:** {s['p']} | **Semana:** {s['w']} | **Anio:** 2026"]
    if s.get("d"): L.append(f"\n**{s['d']}**")
    for i,q in enumerate(s["q"]):
        d=i+1;K=["A","B","C","D"]
        L.append(f"\n---\n\n## Question {d} [D{d}]\n\n**ID:** `{s['id']}-{q[0]:03d}-v1`\n**Bloom:** {q[1]}\n**ICFES:** {q[2]}\n**Context:** {q[3]}\n\n### Enunciado\n{q[4]}\n\n### Options")
        for j,(c,t,f) in enumerate(q[5]):L.append(f'- [{"x" if c else " "}] {K[j]}) {t} <!-- feedback: {f} -->')
        L.append(f"\n### Explicacion Pedagogica\n{q[6]}")
    return "\n".join(L)
A="Comunicacion y representacion";R="Resolucion de problemas";Z="Razonamiento y argumentacion"
Q=lambda s,b,i,c,e,o,x:(s,b,i,c,e,o,x)
def gen(idd,tema,p,w,tit,qs):
    write_bundle(f"CO-MAT-6-2026-{idd}.md", make({"id":f"CO-MAT-6-2026-{idd}","tema":tema,"p":p,"w":w,"t":tit,"q":qs}))

# W27 - Divisibilidad: Multiplos y divisores
gen("W27-divisibilidad-multiplos-divisores-001-MASTERY-bundle","divisibilidad-multiplos-divisores",4,27,"Divisibilidad: Multiplos y Divisores",[
Q(1,"Remember",A,"Definicion de multiplo","Que son los multiplos de un numero?",[(True,"Los resultados de multiplicar ese numero por enteros","Correcto."),(False,"Los numeros que lo dividen exactamente","Incorrecto, esos son divisores."),(False,"Los numeros menores que el","Incorrecto."),(False,"Los numeros que terminan en 0","Incorrecto.")],"Multiplos de n: n x 0, n x 1, n x 2, ..."),
Q(2,"Remember",A,"Definicion de divisor","Un numero A es divisor de B si...",[(True,"B dividido entre A da resultado exacto","Correcto."),(False,"A dividido entre B da resultado exacto","Incorrecto, al reves."),(False,"A es mayor que B","Incorrecto."),(False,"A es multiplo de B","Incorrecto.")],"Divisor: divide exactamente al numero."),
Q(3,"Understand",R,"Multiplos comunes","Cuales son los primeros 3 multiplos comunes de 2 y 3?",[(True,"6, 12, 18","Correcto."),(False,"2, 4, 6","Incorrecto."),(False,"3, 6, 9","Incorrecto."),(False,"6, 12, 24","Incorrecto.")],"Multiplos de 2: 2,4,6,8,10,12,14,16,18... De 3:3,6,9,12,15,18... Comunes: 6,12,18."),
Q(4,"Understand",R,"Divisores","Cuales son los divisores de 12?",[(True,"1, 2, 3, 4, 6, 12","Correcto."),(False,"1, 2, 3, 6, 12","Falta el 4."),(False,"2, 3, 4, 6","Falta 1 y 12."),(False,"1, 12, 24","Incorrecto.")],"12 se divide exactamente entre: 1,2,3,4,6,12."),
Q(5,"Apply",R,"Multiplos en contexto","Una fabrica empaca lapices en cajas de 6. Cuantos lapices pueden empacar sin que sobre ninguno?",[(True,"Cualquier multiplo de 6: 6, 12, 18, 24...","Correcto."),(False,"Solo numeros pares","Incorrecto."),(False,"Cualquier numero","Incorrecto."),(False,"Solo 6, 12 y 18","Incorrecto.")],"Debe ser multiplo de 6: numeros divisibles entre 6 exactamente."),
Q(6,"Apply",R,"Divisores en contexto","Se tienen 24 galletas para repartir entre varios ninos sin que sobre ninguna. Entre cuantos ninos se puede repartir?",[(True,"1, 2, 3, 4, 6, 8, 12 o 24","Correcto. Divisores de 24."),(False,"Solo entre 2, 4, 6 o 8","Incorrecto."),(False,"Entre cualquier numero","Incorrecto."),(False,"Solo entre 24 o 12","Incorrecto.")],"Debe ser divisor de 24: 1,2,3,4,6,8,12,24."),
Q(7,"Apply",Z,"Multiplo comun minimo","Un bus pasa cada 8 min y otro cada 12 min. Si pasan juntos a las 8am, cuando volveran a pasar juntos?",[(True,"8:24 am (mcm=24)","Correcto. mcm(8,12)=24 minutos."),(False,"8:12 am","Incorrecto."),(False,"8:16 am","Incorrecto."),(False,"8:20 am","Incorrecto.")],"mcm(8,12): 8=2^3, 12=2^2x3. mcm=2^3x3=24 minutos. 8:00+24min=8:24."),
Q(8,"Apply",Z,"Divisor comun maximo","Se tienen 36 manzanas y 48 naranjas para hacer bolsas iguales. Cual es el maximo numero de bolsas?",[(True,"12 bolsas (mcd=12)","Correcto. mcd(36,48)=12."),(False,"6 bolsas","Incorrecto."),(False,"24 bolsas","Incorrecto."),(False,"18 bolsas","Incorrecto.")],"mcd(36,48): 36=2^2x3^2, 48=2^4x3. mcd=2^2x3=12 bolsas. Cada bolsa: 3 manzanas, 4 naranjas."),
Q(9,"Analyze",Z,"Comparacion","El mcm(6,8) es mayor, menor o igual que el producto 6x8?",[(True,"Menor: mcm=24, producto=48","Correcto."),(False,"Mayor","Incorrecto."),(False,"Igual","Incorrecto."),(False,"No se puede","Incorrecto.")],"mcm(6,8)=24. 6x8=48. El mcm siempre es <= producto. Son iguales solo si los numeros son primos entre si."),
Q(10,"Analyze",Z,"Demostracion","Si un numero es multiplo de 4 y de 6, necesariamente es multiplo de 24?",[(True,"No. Puede ser 12 que no es multiplo de 24","Correcto. 12 es multiplo de 4 y 6, pero no de 24."),(False,"Si, porque 24 es el mcm","Incorrecto."),(False,"Solo si es par","Incorrecto."),(False,"Depende del numero","Correcto.")],"12 es multiplo de 4 y de 6 pero no de 24. Los multiplos comunes son multiplos del mcm(4,6)=12, no necesariamente de 24."),
])

# W28 - Divisibilidad: Criterios, mcm y mcd
gen("W28-divisibilidad-criterios-mcm-mcd-001-MASTERY-bundle","divisibilidad-criterios-mcm-mcd",4,28,"Divisibilidad: Criterios, mcm y mcd",[
Q(1,"Remember",A,"Criterio del 2","Cuando un numero es divisible entre 2?",[(True,"Cuando termina en 0, 2, 4, 6 u 8","Correcto."),(False,"Cuando termina en 0 o 5","Incorrecto, eso es el 5."),(False,"Cuando la suma de digitos es multiplo de 2","Incorrecto."),(False,"Cuando termina en 0","Incorrecto.")],"Un numero es divisible entre 2 si es par (termina en cifra par)."),
Q(2,"Remember",A,"Criterio del 3","Cuando un numero es divisible entre 3?",[(True,"Cuando la suma de sus digitos es multiplo de 3","Correcto."),(False,"Cuando termina en 3","Incorrecto."),(False,"Cuando termina en 3, 6 o 9","Incorrecto."),(False,"Cuando es impar","Incorrecto.")],"Ejemplo: 123 -> 1+2+3=6, 6 es multiplo de 3."),
Q(3,"Understand",A,"Criterio del 5","El numero 845 es divisible entre 5?",[(True,"Si, termina en 5","Correcto."),(False,"No, 8+4+5=17 no es multiplo de 5","Incorrecto."),(False,"Solo si termina en 0","Incorrecto."),(False,"No, porque 845/5=169 no es entero","Incorrecto.")],"Divisible entre 5 si termina en 0 o 5. 845 termina en 5, si es divisible."),
Q(4,"Understand",R,"Aplicar criterios","De estos numeros, cual es divisible entre 2 y 3?",[(True,"24","Correcto. Par y 2+4=6 multiplo de 3."),(False,"15","No es par."),(False,"22","2+2=4 no es multiplo de 3."),(False,"20","2+0=2 no es multiplo de 3.")],"24: par (divisible entre 2). 2+4=6 (divisible entre 3)."),
Q(5,"Apply",R,"Criterio del 6","Un numero es divisible entre 6 si...",[(True,"Es divisible entre 2 y 3 simultaneamente","Correcto."),(False,"Termina en 6","Incorrecto."),(False,"La suma de digitos da 6","Incorrecto."),(False,"Es multiplo de 3","Incorrecto.")],"Divisible entre 6 = divisible entre 2 y 3. Ej: 24, 36, 42."),
Q(6,"Apply",R,"Calcular mcm","mcm(6,9)?",[(True,"18","Correcto. 6=2x3, 9=3^2. mcm=2x3^2=18."),(False,"3","Incorrecto."),(False,"54","Incorrecto."),(False,"36","Incorrecto.")],"6=2x3, 9=3^2. mcm = 2 x 3^2 = 18."),
Q(7,"Apply",Z,"Calcular mcd","mcd(24,36)?",[(True,"12","Correcto. 24=2^3x3, 36=2^2x3^2. mcd=2^2x3=12."),(False,"6","Incorrecto."),(False,"72","Incorrecto."),(False,"4","Incorrecto.")],"24=2^3x3, 36=2^2x3^2. mcd=2^2x3=12."),
Q(8,"Apply",Z,"mcm aplicado","Dos luces parpadean cada 10s y 15s. Si encienden juntas, cada cuantos segundos coinciden?",[(True,"Cada 30 segundos (mcm=30)","Correcto."),(False,"Cada 15s","Incorrecto."),(False,"Cada 10s","Incorrecto."),(False,"Cada 25s","Incorrecto.")],"mcm(10,15): 10=2x5, 15=3x5. mcm=2x3x5=30s."),
Q(9,"Analyze",Z,"mcd aplicado","Se cortan dos listones de 60 cm y 84 cm en pedazos iguales del mayor tamano posible. Cuanto mide cada pedazo?",[(True,"12 cm (mcd=12)","Correcto. mcd(60,84)=12."),(False,"6 cm","Incorrecto."),(False,"24 cm","Incorrecto."),(False,"420 cm","Incorrecto.")],"60=2^2x3x5, 84=2^2x3x7. mcd=2^2x3=12 cm cada pedazo."),
Q(10,"Analyze",Z,"Demostracion","Si mcm(a,b)=a x b, que podemos decir de a y b?",[(True,"Son primos entre si (no tienen factores comunes)","Correcto."),(False,"Uno es multiplo del otro","Incorrecto."),(False,"Son numeros pares","Incorrecto."),(False,"Son iguales","Incorrecto.")],"mcm = producto solo cuando a y b son primos relativos (mcd=1). Ej: 4 y 9 -> mcm=36=4x9."),
])

# W29 - Numeros primos y compuestos, factorizacion
gen("W29-numeros-primos-factorizacion-001-MASTERY-bundle","numeros-primos-factorizacion",4,29,"Numeros Primos y Compuestos: Factorizacion",[
Q(1,"Remember",A,"Definicion de primo","Que es un numero primo?",[(True,"Tiene exactamente dos divisores: 1 y si mismo","Correcto."),(False,"Tiene mas de dos divisores","Incorrecto, ese es compuesto."),(False,"Solo es divisible entre 1","Falta: tambien entre si mismo."),(False,"Es impar","Incorrecto.")],"Numeros primos: 2,3,5,7,11,13,17,19,23..."),
Q(2,"Remember",A,"Numeros compuestos","Que es un numero compuesto?",[(True,"Tiene mas de dos divisores","Correcto."),(False,"Tiene solo dos divisores","Incorrecto, ese es primo."),(False,"Es el resultado de una suma","Incorrecto."),(False,"No tiene divisores","Incorrecto.")],"Compuesto: 4,6,8,9,10,12,14,15,16,18,20..."),
Q(3,"Understand",A,"Identificar primos","Cual de estos es un numero primo?",[(True,"17","Correcto. Solo divisible entre 1 y 17."),(False,"21","Incorrecto. 21=3x7."),(False,"27","Incorrecto. 27=3x9."),(False,"33","Incorrecto. 33=3x11.")],"17 solo se divide exactamente entre 1 y 17. Es primo."),
Q(4,"Understand",R,"Factorizacion prima","Cual es la factorizacion prima de 36?",[(True,"2^2 x 3^2","Correcto. 36=2x2x3x3=2^2x3^2."),(False,"2 x 3^3","2x27=54, no 36."),(False,"2^3 x 3","8x3=24, no 36."),(False,"6 x 6","No es factorizacion prima, 6 no es primo.")],"36=2x18=2x2x9=2x2x3x3=2^2x3^2."),
Q(5,"Apply",R,"Factorizar","Factorizacion prima de 60?",[(True,"2^2 x 3 x 5","Correcto. 60=2x30=2x2x15=2x2x3x5."),(False,"2^3 x 3 x 5","8x15=120, no 60."),(False,"2 x 3 x 5","30, no 60."),(False,"2 x 6 x 5","6 no es primo.")],"60=2x2x3x5=2^2x3x5."),
Q(6,"Apply",R,"Primos gemelos","Los primos gemelos son pares de primos que difieren en 2. Cual par son primos gemelos?",[(True,"11 y 13","Correcto. Difieren en 2 y ambos primos."),(False,"13 y 17","Diferen 4, no son gemelos."),(False,"7 y 11","Diferen 4."),(False,"2 y 3","Diferen 1, no gemelos.")],"11 y 13: ambos primos, diferencia de 2."),
Q(7,"Apply",Z,"Factorizacion aplicada","Cual es el menor numero que tiene exactamente 3 factores primos diferentes?",[(True,"30 (2, 3 y 5)","Correcto. 30=2x3x5."),(False,"6 (2x3)","Solo 2 factores."),(False,"12 (2x2x3)","Solo 2 factores diferentes."),(False,"48 (2^4x3)","Solo 2 factores diferentes.")],"30=2x3x5. Tiene 3 factores primos diferentes: 2, 3, 5."),
Q(8,"Apply",Z,"Arbol de factores","En el arbol de factores de 72, una rama llega a 8 y 9. Cuales son los factores primos de 72?",[(True,"2^3 x 3^2","Correcto. 8=2^3, 9=3^2."),(False,"2^2 x 3^2","36, no 72."),(False,"2^4 x 3^2","16x9=144, no 72."),(False,"2^3 x 3","8x3=24, no 72.")],"72=8x9=2x2x2x3x3=2^3x3^2."),
Q(9,"Analyze",Z,"Demostracion","Por que el 1 no es primo ni compuesto?",[(True,"Porque solo tiene un divisor (el 1)","Correcto. Primo=2 divisores, Compuesto>=3."),(False,"Porque es impar","Incorrecto."),(False,"Porque no se factoriza","Incorrecto."),(False,"Porque es el primer numero natural","Incorrecto.")],"Primo tiene exactamente 2 divisores. Compuesto tiene 3+. 1 tiene solo 1 divisor."),
Q(10,"Analyze",Z,"Aplicacion","Se factoriza 360 como 2^3 x 3^2 x 5. Cuales son todos sus divisores?",[(True,"Combinaciones de 2^0..3 x 3^0..2 x 5^0..1 = 4x3x2=24 divisores","Correcto."),(False,"12 divisores","Incorrecto."),(False,"360 divisores","Incorrecto."),(False,"8 divisores","Incorrecto.")],"Exponentes: 2(0-3)=4, 3(0-2)=3, 5(0-1)=2. 4x3x2=24 divisores."),
])

# W30 - Repaso Divisibilidad
gen("W30-repaso-divisibilidad-001-MASTERY-bundle","repaso-divisibilidad",4,30,"REPASO: Divisibilidad, mcm, mcd y Factorizacion",[
Q(1,"Remember",A,"Criterios","Cual numero es divisible entre 4?",[(True,"124 (termina en 24, 24/4=6)","Correcto."),(False,"122 (22/4 no es exacto)","Incorrecto."),(False,"123 (23/4 no es exacto)","Incorrecto."),(False,"125 (25/4 no es exacto)","Incorrecto.")],"Divisible entre 4 si sus ultimas 2 cifras forman multiplo de 4."),
Q(2,"Remember",A,"Multiplos","El mcm de dos numeros primos entre si es:",[(True,"Su producto","Correcto."),(False,"El menor","Incorrecto."),(False,"El mayor","Incorrecto."),(False,"1","Incorrecto.")],"Si mcd(a,b)=1, entonces mcm(a,b)=axb. Ej: mcm(4,9)=36."),
Q(3,"Understand",R,"mcm","mcm(12,18)?",[(True,"36","Correcto."),(False,"6","Incorrecto."),(False,"24","Incorrecto."),(False,"12","Incorrecto.")],"12=2^2x3, 18=2x3^2. mcm=2^2x3^2=36."),
Q(4,"Understand",R,"mcd","mcd(48,64)?",[(True,"16","Correcto. 48=2^4x3, 64=2^6. mcd=2^4=16."),(False,"8","Incorrecto."),(False,"4","Incorrecto."),(False,"24","Incorrecto.")],"48=2^4x3, 64=2^6. mcd=2^4=16."),
Q(5,"Apply",R,"Divisores","Divisores de 30?",[(True,"1,2,3,5,6,10,15,30","Correcto."),(False,"1,30,2,15","Incompleto."),(False,"2,3,5,6,10,15","Faltan 1 y 30."),(False,"1,2,3,4,5,6,10,15,30","4 no es divisor de 30.")],"30/4=7.5 no exacto. Divisores: 1,2,3,5,6,10,15,30."),
Q(6,"Apply",R,"Factorizar 48","Factorizacion prima de 48?",[(True,"2^4 x 3","Correcto. 48=2x24=2x2x12=2x2x2x6=2^4x3."),(False,"2^3 x 3","8x3=24."),(False,"2^2 x 3 x 4","4 no es primo."),(False,"2 x 3 x 8","8 no es primo.")],"48=16x3=2^4x3."),
Q(7,"Apply",Z,"Problema mcd","Se tienen 54 chocolates y 72 caramelos. Cuantas bolsas iguales se pueden hacer sin que sobre nada?",[(True,"18 (mcd=18)","Correcto. mcd(54,72)=18."),(False,"6","Incorrecto."),(False,"9","Incorrecto."),(False,"12","Incorrecto.")],"54=2x3^3, 72=2^3x3^2. mcd=2x3^2=18 bolsas."),
Q(8,"Apply",Z,"Problema mcm","Un semaforo se pone en verde cada 45s y otro cada 60s. Coinciden en verde a las 9am. Cuando volveran?",[(True,"9:03 am (mcm=180s=3min)","Correcto."),(False,"9:01","Incorrecto."),(False,"9:02","Incorrecto."),(False,"9:05","Incorrecto.")],"45=3^2x5, 60=2^2x3x5. mcm=2^2x3^2x5=180s=3min."),
Q(9,"Analyze",Z,"primo o compuesto","El numero 91 es primo o compuesto?",[(True,"Compuesto (7x13=91)","Correcto."),(False,"Primo","Incorrecto."),(False,"No se puede saber","Incorrecto."),(False,"Es primo porque no es par","Incorrecto.")],"91=7x13. Tiene 4 divisores: 1,7,13,91. Es compuesto."),
Q(10,"Analyze",Z,"Descomposicion","Cuantos divisores tiene 180?",[(True,"18 divisores","Correcto. 180=2^2x3^2x5. (2+1)(2+1)(1+1)=3x3x2=18."),(False,"12","Incorrecto."),(False,"24","Incorrecto."),(False,"30","Incorrecto.")],"180=2^2x3^2x5. Exponentes: 2,2,1. Divisores=(2+1)(2+1)(1+1)=3x3x2=18."),
])

print("W27-W30 done")
