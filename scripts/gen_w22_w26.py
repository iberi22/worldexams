#!/usr/bin/env python3
"""Generate ALL remaining bundles W22-W40 for Grado 6 Matematicas Colombia."""
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

# ========================================
# W22 - Estadistica: Graficos
# ========================================
gen("W22-estadistica-graficos-001-MASTERY-bundle","estadistica-graficos",3,22,"Estadistica: Graficos Estadisticos",[
Q(1,"Remember",A,"Tipos de graficos","Que grafico es mejor para frecuencias de categorias?",[(True,"Grafico de barras","Correcto."),(False,"Grafico de lineas","Incorrecto."),(False,"Grafico de dispersion","Incorrecto."),(False,"Histograma","Incorrecto.")],"El grafico de barras compara frecuencias de categorias."),
Q(2,"Remember",A,"Grafico circular","Para que se usa un grafico circular?",[(True,"Mostrar proporciones de un total","Correcto."),(False,"Mostrar cambios en el tiempo","Incorrecto."),(False,"Relacion entre variables","Incorrecto."),(False,"Encontrar la moda","Incorrecto.")],"El grafico circular muestra partes de un todo."),
Q(3,"Understand",R,"Interpretar barras","Frutas favoritas: 8 manzana, 12 banano, 6 uva, 4 naranja. Cuantos prefieren banano o manzana?",[(True,"20 estudiantes","Correcto. 12+8=20."),(False,"12 estudiantes","Incorrecto, son solo banano."),(False,"8 estudiantes","Incorrecto, son solo manzana."),(False,"30 estudiantes","Incorrecto, es el total.")],"Banano+manzana = 12+8 = 20 estudiantes."),
Q(4,"Apply",R,"Grafico circular","40 estudiantes: 18 futbol, 10 baloncesto, 8 voleibol, 4 natacion. Angulo para futbol?",[(True,"162 grados","Correcto. 18/40x360=162."),(False,"180 grados","Incorrecto."),(False,"90 grados","Incorrecto."),(False,"72 grados","Incorrecto.")],"Angulo = (18/40)x360 = 162 grados."),
Q(5,"Apply",R,"Leer barras","Ventas helados: vainilla 15, chocolate 12, fresa 8, lulo 5. Cuantos mas de vainilla que de fresa?",[(True,"7 mas","Correcto. 15-8=7."),(False,"3 mas","Incorrecto."),(False,"10 mas","Incorrecto."),(False,"4 mas","Incorrecto.")],"15-8=7 helados mas de vainilla que de fresa."),
Q(6,"Apply",R,"Grafico de lineas","Temperaturas: L28, M30, Mx31, J29, V32. Dia mas caluroso?",[(True,"Viernes (32 grados)","Correcto."),(False,"Miercoles (31)","Incorrecto."),(False,"Martes (30)","Incorrecto."),(False,"Jueves (29)","Incorrecto.")],"Viernes: 32 grados, la mas alta de la semana."),
Q(7,"Apply",Z,"Elegir grafico","Que grafico muestra cambios de poblacion en 50 anos?",[(True,"Grafico de lineas","Correcto."),(False,"Grafico de barras","Incorrecto."),(False,"Grafico circular","Incorrecto."),(False,"Pictograma","Incorrecto.")],"El de lineas muestra tendencias temporales."),
Q(8,"Apply",Z,"Pictograma"," Cada icono = 50 manzanas. 5 iconos = ?",[(True,"250 manzanas","Correcto. 5x50=250."),(False,"50 manzanas","Incorrecto."),(False,"10 manzanas","Incorrecto."),(False,"55 manzanas","Incorrecto.")],"5 x 50 = 250 manzanas."),
Q(9,"Analyze",Z,"Comparar graficos","Barras (frecuencias) vs Lineas (promedios/mes). Cual muestra tendencia?",[(True,"Lineas, muestra cambios en tiempo","Correcto."),(False,"Barras, muestra frecuencias","Incorrecto."),(False,"Ambos igual","Incorrecto."),(False,"Ninguno","Incorrecto.")],"Lineas: tendencias temporales. Barras: comparar categorias."),
Q(10,"Analyze",Z,"Tendencia","Ventas: Ene $2M, Feb $2.5M, Mar $3M, Abr $2.8M, May $3.5M. Que tendencia?",[(True,"General al alza","Correcto."),(False,"A la baja","Incorrecto."),(False,"Constante","Incorrecto."),(False,"No hay","Incorrecto.")],"Aunque abril bajo levemente, tendencia general es ascendente."),
])

# ========================================
# W23 - Estadistica: Medidas Tendencia Central 1
# ========================================
gen("W23-estadistica-medidas-tendencia-central-1-001-MASTERY-bundle","estadistica-medidas-tendencia-central-1",3,23,"Estadistica: Medidas de Tendencia Central (Parte 1)",[
Q(1,"Remember",A,"Definicion de media","Que es la media aritmetica?",[(True,"Suma de datos dividida entre el numero de datos","Correcto."),(False,"El valor que mas se repite","Incorrecto, es moda."),(False,"Valor central ordenado","Incorrecto, es mediana."),(False,"Diferencia entre mayor y menor","Incorrecto, es rango.")],"Media = suma de datos / cantidad de datos."),
Q(2,"Remember",A,"Definicion de moda","Que es la moda?",[(True,"Valor que aparece con mayor frecuencia","Correcto."),(False,"Valor que divide datos en dos partes","Incorrecto, es mediana."),(False,"Promedio de todos los datos","Incorrecto, es media."),(False,"Valor mas grande","Incorrecto.")],"La moda es el valor que mas se repite."),
Q(3,"Understand",R,"Calcular media","Edades: 10, 11, 10, 12, 12. Promedio?",[(True,"11 anos","Correcto. Suma=55, media=55/5=11."),(False,"10 anos","Incorrecto."),(False,"12 anos","Incorrecto."),(False,"11.5 anos","Incorrecto.")],"55/5 = 11 anos."),
Q(4,"Understand",R,"Calcular moda","Notas: 4.0, 3.5, 4.5, 4.0, 3.0, 4.0, 5.0, 3.5. Moda?",[(True,"4.0 (3 veces)","Correcto."),(False,"3.5 (2 veces)","Incorrecto."),(False,"5.0 (1 vez)","Incorrecto."),(False,"No hay","Incorrecto.")],"4.0 aparece 3 veces, es la moda."),
Q(5,"Apply",R,"Media en contexto","Temperaturas: 28, 31, 29, 32, 30. Media?",[(True,"30 grados","Correcto. Suma=150, media=30."),(False,"29","Incorrecto."),(False,"31","Incorrecto."),(False,"32","Incorrecto.")],"150/5=30 grados C."),
Q(6,"Apply",R,"Moda en contexto","Calzado: 36, 37, 36, 38, 37, 36, 39, 37, 36, 38. Talla mas comun?",[(True,"36 (4 veces)","Correcto."),(False,"37 (3 veces)","Incorrecto."),(False,"38 (2 veces)","Incorrecto."),(False,"39 (1 vez)","Incorrecto.")],"36 aparece 4 veces, es la moda."),
Q(7,"Apply",Z,"Dato faltante","Promedio de 4 notas = 3.5. Tres notas: 3.0, 4.0, 3.5. Cuarta nota?",[(True,"3.5","Correcto. Suma=14. 14-10.5=3.5."),(False,"4.0","Incorrecto."),(False,"3.0","Incorrecto."),(False,"2.5","Incorrecto.")],"4x3.5=14. 3+4+3.5=10.5. 14-10.5=3.5."),
Q(8,"Apply",Z,"Media ponderada","3 estudiantes: 14s, 2: 15s, 1: 16s. Tiempo promedio?",[(True,"14.67 s","Correcto."),(False,"15 s","Incorrecto."),(False,"14 s","Incorrecto."),(False,"14.5 s","Incorrecto.")],"Suma=3x14+2x15+1x16=42+30+16=88. Media=88/6=14.67s."),
])

# ========================================
# W24 - Estadistica: Medidas Tendencia Central 2 (mediana)
# ========================================
gen("W24-estadistica-medidas-tendencia-central-2-001-MASTERY-bundle","estadistica-medidas-tendencia-central-2",3,24,"Estadistica: Medidas de Tendencia Central (Parte 2 - Mediana)",[
Q(1,"Remember",A,"Definicion de mediana","Que es la mediana?",[(True,"El valor central de los datos ordenados","Correcto."),(False,"El valor mas repetido","Incorrecto, es moda."),(False,"El promedio de datos","Incorrecto, es media."),(False,"La diferencia entre extremos","Incorrecto, es rango.")],"Mediana: valor que divide datos ordenados en dos partes iguales."),
Q(2,"Remember",A,"Mediana impar","Cual es la mediana de: 5, 8, 3, 6, 9?",[(True,"6","Correcto. Orden: 3,5,6,8,9. Central=6."),(False,"5","Incorrecto."),(False,"8","Incorrecto."),(False,"3","Incorrecto.")],"Ordenados: 3,5,6,8,9. El central (3ro) es 6."),
Q(3,"Understand",R,"Mediana par","Edades: 10, 12, 8, 11, 9, 13. Mediana?",[(True,"10.5","Correcto. Orden:8,9,10,11,12,13. (10+11)/2=10.5."),(False,"10","Incorrecto."),(False,"11","Incorrecto."),(False,"10 y 11","Incorrecto.")],"Con 6 datos pares: (10+11)/2=10.5."),
Q(4,"Understand",R,"Comparar media y mediana","Sueldos: $1M, $1.2M, $1.1M, $1.3M, $5M. Que medida representa mejor el sueldo tipico?",[(True,"Mediana ($1.2M)","Correcto. La media ($1.92M) se distorsiona por $5M."),(False,"Media ($1.92M)","Incorrecto, el $5M infla la media."),(False,"Moda","Incorrecto, no hay moda clara."),(False,"Rango","Incorrecto, no representa tipicidad.")],"Mediana=1.2M no afectada por el valor extremo de $5M. Media=1.92M distorsionada."),
Q(5,"Apply",R,"Calcular mediana","Notas: 3.0, 4.5, 3.5, 5.0, 2.5, 4.0. Mediana?",[(True,"3.75","Correcto. Orden:2.5,3.0,3.5,4.0,4.5,5.0. (3.5+4.0)/2=3.75."),(False,"3.5","Incorrecto."),(False,"4.0","Incorrecto."),(False,"3.0","Incorrecto.")],"(3.5+4.0)/2=3.75."),
Q(6,"Apply",R,"Aplicacion mediana","Tiempos(min): 12, 15, 11, 14, 13, 16, 10. Mediana?",[(True,"13 min","Correcto. Orden:10,11,12,13,14,15,16. 4to=13."),(False,"12","Incorrecto."),(False,"14","Incorrecto."),(False,"13.5","Incorrecto.")],"7 datos, el 4to valor ordenado es 13."),
Q(7,"Apply",Z,"Media vs mediana","Edades: 25, 26, 27, 28, 29, 65. Que medida usar?",[(True,"Mediana (27.5)","Correcto. La media (33.3) se infla por 65."),(False,"Media (33.3)","Incorrecto."),(False,"Moda","Incorrecto."),(False,"Rango","Incorrecto.")],"Mediana=(27+28)/2=27.5. Media=(25+26+27+28+29+65)/6=33.3 distorsionada."),
Q(8,"Apply",Z,"Todas las medidas","Datos: 2, 4, 4, 6, 8, 8, 8, 10. Media, mediana y moda?",[(True,"Media=6.25, Mediana=7, Moda=8","Correcto. Suma=50, media=6.25. Med=(6+8)/2=7. Moda=8."),(False,"Media=6.25, Mediana=6, Moda=8","Incorrecto."),(False,"Media=6, Mediana=7, Moda=8","Incorrecto."),(False,"Media=5, Mediana=6, Moda=4","Incorrecto.")],"Suma=50, media=6.25. 8 datos: medianas=(6+8)/2=7. Moda=8."),
])

# ========================================
# W25 - Probabilidad Basica
# ========================================
gen("W25-probabilidad-conceptos-001-MASTERY-bundle","probabilidad-conceptos",3,25,"Probabilidad: Conceptos Basicos",[
Q(1,"Remember",A,"Definicion","Que es probabilidad?",[(True,"La medida de que ocurra un evento","Correcto."),(False,"El numero total de resultados","Incorrecto."),(False,"La certeza de que algo pasara","Incorrecto."),(False,"La estadistica de eventos","Incorrecto.")],"Probabilidad mide que tan posible es que ocurra un evento."),
Q(2,"Remember",A,"Rango","Entre que valores esta la probabilidad?",[(True,"0 y 1 (0% a 100%)","Correcto."),(False,"-1 y 1","Incorrecto."),(False,"0 y 100","Incorrecto."),(False,"1 y 10","Incorrecto.")],"Probabilidad siempre entre 0 (imposible) y 1 (seguro)."),
Q(3,"Understand",R,"Eventos","Lanzar un dado. Probabilidad de obtener 3?",[(True,"1/6","Correcto. 1 resultado favorable de 6 posibles."),(False,"1/2","Incorrecto."),(False,"1/3","Incorrecto."),(False,"1/12","Incorrecto.")],"P(3)=1/6. Un dado tiene 6 caras."),
Q(4,"Understand",R,"Eventos compuestos","Lanzar un dado. Probabilidad de par?",[(True,"3/6 = 1/2","Correcto. 2,4,6 son 3 favorables de 6."),(False,"2/6 = 1/3","Incorrecto."),(False,"4/6 = 2/3","Incorrecto."),(False,"1/6","Incorrecto.")],"Pares: 2,4,6. P=3/6=1/2."),
Q(5,"Apply",R,"Moneda","Lanzar una moneda 3 veces. Probabilidad de 3 caras?",[(True,"1/8","Correcto. Casos: CCC, CCS, CSC, CSS, SCC, SCS, SSC, SSS."),(False,"1/2","Incorrecto."),(False,"1/3","Incorrecto."),(False,"1/4","Incorrecto.")],"8 resultados posibles. Solo 1 es CCC: P=1/8."),
Q(6,"Apply",R,"Bolsa de canicas","Bolsa: 3 rojas, 2 azules, 5 verdes. Probabilidad de sacar azul?",[(True,"2/10 = 1/5","Correcto."),(False,"3/10","Incorrecto."),(False,"5/10 = 1/2","Incorrecto."),(False,"2/8 = 1/4","Incorrecto.")],"Total=10, azules=2. P=2/10=1/5."),
Q(7,"Apply",Z,"Evento seguro e imposible","En una bolsa solo con canicas rojas, que probabilidad hay de sacar roja?",[(True,"1 (100%)","Correcto. Seguro."),(False,"0 (0%)","Incorrecto."),(False,"0.5 (50%)","Incorrecto."),(False,"No se sabe","Incorrecto.")],"Todas son rojas: P=1, evento seguro."),
Q(8,"Apply",Z,"Suma de probabilidades","Lanzar un dado. P(1)+P(2)+P(3)+P(4)+P(5)+P(6) suma?",[(True,"1","Correcto. La suma de todas las probabilidades es 1."),(False,"6","Incorrecto."),(False,"1/6","Incorrecto."),(False,"0","Incorrecto.")],"1/6+1/6+1/6+1/6+1/6+1/6 = 6/6 = 1."),
Q(9,"Analyze",Z,"Comparar probabilidades","Bolsa A: 4 rojas, 6 azules. Bolsa B: 5 rojas, 5 azules. Cual tiene mayor P(sacar roja)?",[(True,"Bolsa B (5/10=0.5 > 4/10=0.4)","Correcto."),(False,"Bolsa A (4/10 vs 5/10)","Incorrecto."),(False,"Ambas igual","Incorrecto."),(False,"No se puede","Incorrecto.")],"P_A=4/10=0.4. P_B=5/10=0.5. B tiene mayor probabilidad."),
Q(10,"Analyze",Z,"Frecuencia vs probabilidad","Lanzaron una moneda 100 veces: 58 caras, 42 sellos. La probabilidad teorica de cara es 0.5. Que paso?",[(True,"La frecuencia relativa (0.58) se acerca a la teorica (0.5) pero no es exacta","Correcto."),(False,"La moneda esta mal","Incorrecto."),(False,"La probabilidad teorica cambia","Incorrecto."),(False,"No hay relacion","Incorrecto.")],"La frecuencia relativa 58/100=0.58 se aproxima a 0.5, sin ser exacta. Es la ley de grandes numeros."),
])

# ========================================
# W26 - Repaso Periodo 3
# ========================================
gen("W26-repaso-p3-001-MASTERY-bundle","repaso-p3",3,26,"REPASO Periodo 3",[
Q(1,"Remember",A,"Definiciones","Cual es la medida de tendencia central que considera todos los datos?",[(True,"La media","Correcto."),(False,"La mediana","Incorrecto."),(False,"La moda","Incorrecto."),(False,"El rango","Incorrecto.")],"La media usa todos los datos en su calculo."),
Q(2,"Remember",A,"Graficos","Que grafico es mejor para mostrar partes de un total?",[(True,"Circular (pastel)","Correcto."),(False,"Barras","Incorrecto."),(False,"Lineas","Incorrecto."),(False,"Dispersion","Incorrecto.")],"El grafico circular muestra proporciones."),
Q(3,"Understand",R,"Media ejercicio","Edades: 12, 14, 13, 15, 11. Promedio?",[(True,"13 anos","Correcto. Suma=65, media=13."),(False,"12","Incorrecto."),(False,"14","Incorrecto."),(False,"13.5","Incorrecto.")],"65/5=13."),
Q(4,"Understand",A,"Variable","Cual es cuantitativa?",[(True,"Estatura en cm","Correcto."),(False,"Color favorito","Incorrecto."),(False,"Tipo de mascota","Incorrecto."),(False,"Genero","Incorrecto.")],"Estatura es numerica y medible -> cuantitativa."),
Q(5,"Apply",R,"Probabilidad","Dado: P(numero mayor que 4)?",[(True,"2/6 = 1/3","Correcto. 5 y 6, dos resultados."),(False,"1/6","Incorrecto."),(False,"1/2","Incorrecto."),(False,"1/3...","Correcto.")],"Mayores que 4: 5 y 6. P=2/6=1/3."),
Q(6,"Apply",R,"Frecuencia","Mascotas: 15 perro, 10 gato, 5 pez. Frecuencia relativa de gato?",[(True,"10/30 = 1/3","Correcto."),(False,"10","Incorrecto."),(False,"15/30","Incorrecto."),(False,"1/2","Incorrecto.")],"10/30=1/3=0.33."),
Q(7,"Apply",Z,"Mediana","Notas: 2.5, 3.0, 4.0, 4.5, 5.0, 3.5. Mediana?",[(True,"3.75","Correcto. (3.5+4.0)/2=3.75."),(False,"3.5","Incorrecto."),(False,"4.0","Incorrecto."),(False,"4.25","Incorrecto.")],"Orden: 2.5,3.0,3.5,4.0,4.5,5.0. (3.5+4.0)/2=3.75."),
Q(8,"Apply",Z,"Probabilidad compuesta","Bolsa: 4 rojas, 3 azules, 3 verdes. P(roja o azul)?",[(True,"7/10","Correcto. 4+3=7 favorables de 10."),(False,"4/10","Incorrecto."),(False,"3/10","Incorrecto."),(False,"6/10","Incorrecto.")],"P(roja o azul) = (4+3)/10 = 7/10."),
Q(9,"Analyze",Z,"Analisis de datos","Salarios: 800K, 900K, 850K, 1M, 4M. Que medida usar?",[(True,"Mediana (900K)","Correcto. No afectada por valor extremo."),(False,"Media (1.51M)","Incorrecto."),(False,"Moda","Incorrecto."),(False,"Rango","Incorrecto.")],"Mediana=900K. Media=1.51M inflada por 4M."),
Q(10,"Analyze",Z,"Comparacion","Curso A: media 3.8, mediana 4.0. Curso B: media 3.8, mediana 3.5. Que curso es probablemente mejor?",[(True,"Curso A (mediana mas alta)","Correcto. Misma media pero A tiene mas notas altas."),(False,"Curso B","Incorrecto."),(False,"Ambos igual","Incorrecto."),(False,"No se puede","Incorrecto.")],"Misma media, pero mediana A=4.0 > B=3.5 sugiere que A tiene mejores notas."),
])

print("W22-W26 done")
