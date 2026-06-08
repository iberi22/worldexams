#!/usr/bin/env python3
"""
Part 2: Topic-specific question generators for Matematicas G3.
"""

from gen_mat_g3_part1 import *

def gen_q_numeros(s, c, ci, t, b, ic, d, es):
    pairs = [
        ("Cual es el valor del digito 5 en el numero 453?", [
            opt("5 unidades", False, "Incorrecto. El 5 esta en la posicion de las decenas, no unidades."),
            opt("50 (cinco decenas)", True, "Correcto! En 453, el 5 ocupa la posicion de las decenas (50)."),
            opt("500 (cinco centenas)", False, "Incorrecto. En 453, el 5 no esta en centenas. La centena es 4 (400)."),
            opt("5", False, "Incorrecto. 5 sin contexto. En 453, el 5 vale 50 por estar en las decenas."),
        ], "En 453, el 4=centenas(400), el 5=decenas(50) y el 3=unidades(3)."),
        ("Cual de estos numeros es IMPAR? 246, 357, 480, 562", [
            opt("246", False, "Incorrecto. 246 termina en 6 (digito par)."),
            opt("357", True, "Correcto! 357 termina en 7, que es digito impar."),
            opt("480", False, "Incorrecto. 480 termina en 0 (digito par)."),
            opt("562", False, "Incorrecto. 562 termina en 2 (digito par)."),
        ], "Un numero es impar si termina en 1, 3, 5, 7 o 9. 357 termina en 7."),
        ("Que numero representa 600 + 40 + 8?", [
            opt("648", True, "Correcto! 600 + 40 + 8 = 648."),
            opt("684", False, "Incorrecto. 684 seria 600 + 80 + 4."),
            opt("468", False, "Incorrecto. 468 seria 400 + 60 + 8."),
            opt("864", False, "Incorrecto. 864 seria 800 + 60 + 4."),
        ], "600=6 centenas, 40=4 decenas, 8=8 unidades. Total: 648."),
        ("Que numero es mayor: 789 o 798?", [
            opt("789", False, "Incorrecto. 789 tiene 8 decenas, 798 tiene 9. 9 > 8."),
            opt("798", True, "Correcto! Centenas iguales, decenas: 9 > 8."),
            opt("Son iguales", False, "Incorrecto. Las decenas son diferentes."),
            opt("No se puede saber", False, "Si se puede: 798 > 789."),
        ], "Compara centenas (7=7). Luego decenas (9 > 8). 798 > 789."),
        ("Que numero esta ANTES de 500?", [
            opt("499", True, "Correcto! 499 + 1 = 500."),
            opt("500", False, "Incorrecto. 500 es el mismo numero."),
            opt("501", False, "Incorrecto. 501 sigue despues de 500."),
            opt("490", False, "Incorrecto. 490 esta 10 antes. El anterior inmediato es 499."),
        ], "El numero anterior es uno menos: 500 - 1 = 499."),
        ("Si 345 + 200 = 545, cuanto es 545 - 200?", [
            opt("345", True, "Correcto! Suma y resta son operaciones inversas."),
            opt("200", False, "Incorrecto. 545 - 200 = 345."),
            opt("545", False, "Incorrecto. 545 - 200 no da 545."),
            opt("745", False, "Incorrecto. 545 + 200 = 745. Aqui es resta."),
        ], "Si a+b=c, entonces c-b=a. 345+200=545, entonces 545-200=345."),
        ("Redondea 378 a la centena mas cercana.", [
            opt("300", False, "Incorrecto. 378 esta mas cerca de 400."),
            opt("380", False, "Incorrecto. Eso es redondeo a decenas."),
            opt("400", True, "Correcto! 378 > 350, se aproxima a 400."),
            opt("370", False, "Incorrecto. Eso es redondeo a decenas."),
        ], "Mira las decenas: 7 >= 5, entonces sube a la siguiente centena. 378 -> 400."),
        ("Cual es el MENOR? 234, 243, 324, 342", [
            opt("234", True, "Correcto! 234 tiene 2 centenas y 3 decenas."),
            opt("243", False, "Incorrecto. 243 > 234."),
            opt("324", False, "Incorrecto. 324 tiene 3 centenas."),
            opt("342", False, "Incorrecto. 342 es el mayor."),
        ], "Compara centenas primero. 234 y 243 tienen 2 centenas. Entre ellos, 3 < 4 decenas."),
        ("Completa: 100, 200, __, 400", [
            opt("300", True, "Correcto! Aumenta de 100 en 100."),
            opt("250", False, "Incorrecto. 200 + 100 = 300."),
            opt("350", False, "Incorrecto. 200 + 100 = 300."),
            opt("500", False, "Incorrecto. 500 iria despues de 400."),
        ], "Patron: cada numero aumenta en 100. 200 + 100 = 300."),
        ("Un numero tiene 5 centenas, 0 decenas y 4 unidades. Cual es?", [
            opt("504", True, "Correcto! 5 centenas=500, 0 decenas=0, 4 unidades=4."),
            opt("540", False, "Incorrecto. 540 tiene 4 decenas y 0 unidades."),
            opt("450", False, "Incorrecto. 450 tiene 4 centenas."),
            opt("405", False, "Incorrecto. 405 tiene 4 centenas."),
        ], "5 centenas=500, 0 decenas=0, 4 unidades=4. Total: 504."),
    ]
    idx = s % len(pairs)
    ctx = f"En {c} de {ci}"
    enun, opts, expl = pairs[idx]
    return q(b, ic, d, es, ctx, enun, opts, expl)

def gen_q_sumaresta(s, c, ci, t, b, ic, d, es):
    pairs = [
        (f"En {t}, don Carlos tiene 385 mangos y 427 naranjas. Cuantas frutas tiene en total?", [
            opt("702", False, "Incorrecto. 385+427=812."),
            opt("812", True, "Correcto! 385+427=812."),
            opt("712", False, "Incorrecto. Revisa decenas: 8+2+1=11."),
            opt("802", False, "Incorrecto. 5+7=12, llevas 1."),
        ], "Unidades:5+7=12(llevas1). Decenas:8+2+1=11(llevas1). Centenas:3+4+1=8. Total:812."),
        (f"En la biblioteca del {c}, hay 246 libros de ciencia y 189 de historia. Cuantos MAS de ciencia?", [
            opt("57", True, "Correcto! 246-189=57."),
            opt("67", False, "Incorrecto. 16-9=7, no 6."),
            opt("47", False, "Incorrecto. 16-9=7, no 6."),
            opt("57 menos", False, "Son 57 MAS de ciencia."),
        ], "Unidades:6-9=presto=16-9=7. Decenas:3-8=presto=13-8=5. Centenas:1-1=0. Diferencia:57."),
        (f"En {t}, un balon cuesta $24.500 y una camiseta $18.900. Cuanto gasto?", [
            opt("$43.400", True, "Correcto! 24.500+18.900=43.400."),
            opt("$42.400", False, "Revisa: 500+900=1.400."),
            opt("$33.400", False, "Decenas de mil: 2+1+1=4."),
            opt("$43.500", False, "500+900=1.400, llevas 1."),
        ], "Alinea por valor posicional. Unidades de mil:4+8+1=13. Decenas de mil:2+1+1=4. Total:43.400."),
        ("Cuanto es 376 + 248?", [
            opt("624", True, "Correcto! 376+248=624."),
            opt("614", False, "Unidades:6+8=14, llevas 1."),
            opt("524", False, "Centenas:3+2+1=6."),
            opt("634", False, "Decenas:7+4+1=12(llevas1). Centenas:3+2+1=6."),
        ], "Unidades:6+8=14(llevas1). Decenas:7+4+1=12(llevas1). Centenas:3+2+1=6. Total:624."),
        ("Santiago dice 456+387=833, Valeria dice 456+387=743. Quien tiene razon?", [
            opt("Ninguno, es 843", True, "Correcto! 456+387=843."),
            opt("Santiago, 833", False, "Decenas:5+8+1=14, escribes 4 no 3."),
            opt("Valeria, 743", False, "Valeria olvido sumar el 1 que se lleva."),
            opt("Ambos", False, "La suma tiene un solo resultado."),
        ], "Unidades:6+7=13(llevas1). Decenas:5+8+1=14(llevas1). Centenas:4+3+1=8. Resultado:843."),
        ("Cuanto es 700 - 350?", [
            opt("350", True, "Correcto! 700-350=350."),
            opt("450", False, "700-350=350."),
            opt("250", False, "700-450=250. Aqui es 700-350=350."),
            opt("300", False, "600-300=300. Aqui es 700-350=350."),
        ], "700-350. Piensa: 70 decenas - 35 decenas = 35 decenas = 350."),
        (f"En {t}, cuaderno $2.800, lapiz $1.200. Paga con $5.000, cuanto devuelven?", [
            opt("$1.000", True, "Correcto! 2.800+1.200=4.000. 5.000-4.000=1.000."),
            opt("$500", False, "Total: 4.000, no 4.500."),
            opt("$2.000", False, "Total compra: 4.000."),
            opt("$1.500", False, "2.800+1.200=4.000. 5.000-4.000=1.000."),
        ], "Suma: 2.800+1.200=4.000. Resta: 5.000-4.000=1.000. Vuelto: $1.000."),
        ("Cuanto es 803 - 245?", [
            opt("558", True, "Correcto! 803-245=558."),
            opt("568", False, "13-5=8, no 6."),
            opt("668", False, "803-200=603, 603-40=563, 563-5=558."),
            opt("458", False, "Centenas: 7-2=5."),
        ], "Unidades:3-5=presto=13-5=8. Decenas:-1-4=presto=9-4=5. Centenas:7-2=5. Resultado:558."),
        (f"Doña Maria compra 3kg papa a $1.200/kg y 2kg cebolla a $800/kg. Cuanto paga?", [
            opt("$5.200", True, "Correcto! 3x1.200=3.600, 2x800=1.600. Total:5.200."),
            opt("$3.600", False, "Faltan las cebollas."),
            opt("$4.400", False, "3x1.200=3.600, 2x800=1.600. Total:5.200."),
            opt("$6.000", False, "3x1.200=3.600, 2x800=1.600. Total:5.200."),
        ], "Papas:3x1.200=3.600. Cebollas:2x800=1.600. Total:3.600+1.600=5.200."),
        ("Pablo dice 345+200=545, Valentina dice 345+200=445. Quien tiene razon?", [
            opt("Pablo, 345+200=545", True, "Correcto! 300+200=500, 40+0=40, 5+0=5."),
            opt("Valentina, 345+200=445", False, "Valentina sumo mal: 300+200=500."),
            opt("Ambos equivocados", False, "Pablo tiene razon."),
            opt("Ninguno, es 555", False, "345+200=545."),
        ], "345+200: solo cambian centenas (3+2=5). Total:545."),
    ]
    idx = s % len(pairs)
    enun, opts, expl = pairs[idx]
    return q(b, ic, d, es, f"En {c} de {ci}", enun, opts, expl)

def gen_q_multdiv(s, c, ci, t, b, ic, d, es):
    pairs = [
        ("Hay 4 bolsas con 3 manzanas cada una. Que operacion calcula el total?", [
            opt("4 + 3 = 7", False, "No es suma. Son 4 grupos de 3."),
            opt("4 x 3 = 12", True, "Correcto! 4 grupos de 3 = 4 x 3 = 12."),
            opt("4 - 3 = 1", False, "La resta no calcula totales."),
            opt("4 ÷ 3", False, "La division no calcula totales."),
        ], "Multiplicacion es suma abreviada. 4 grupos de 3 = 3+3+3+3 = 4x3 = 12."),
        ("En el parque hay 7 arboles, cada uno con 5 pajaros. Cuantos pajaros hay?", [
            opt("35", True, "Correcto! 7 x 5 = 35."),
            opt("12", False, "7+5=12. Aqui se multiplica."),
            opt("25", False, "5x5=25. Son 7 arboles."),
            opt("40", False, "7x5=35, no 40."),
        ], "Grupos iguales: 7 arboles x 5 pajaros = 35 pajaros."),
        ("Don Miguel tiene 24 huevos y los empaca en cartones de 6. Cuantos cartones?", [
            opt("4", True, "Correcto! 24 ÷ 6 = 4 cartones."),
            opt("6", False, "6x6=36 huevos, son mas de 24."),
            opt("3", False, "3x6=18 huevos, le sobran 6."),
            opt("8", False, "8x6=48 huevos, el doble."),
        ], "Reparto equitativo: 24 huevos ÷ 6 por carton = 4 cartones."),
        ("Hay 36 estudiantes en 4 equipos iguales. Cuantos por equipo?", [
            opt("9", True, "Correcto! 36 ÷ 4 = 9."),
            opt("8", False, "8x4=32, no 36. 9x4=36."),
            opt("6", False, "6x4=24, no alcanza."),
            opt("10", False, "10x4=40, se pasa."),
        ], "Reparto: 36 ÷ 4 = 9. Verifica: 9 x 4 = 36."),
        ("Cuanto es 7 x 3?", [
            opt("21", True, "Correcto! 7x3=21."),
            opt("10", False, "7+3=10. Multiplicacion es diferente."),
            opt("24", False, "8x3=24. 7x3=21."),
            opt("28", False, "7x4=28. Aqui es 7x3=21."),
        ], "Tabla del 3: 3,6,9,12,15,18,21. 7x3=21."),
        ("6 empanadas a $1.500 cada una. Cuanto cuestan?", [
            opt("$9.000", True, "Correcto! 6 x 1.500 = 9.000."),
            opt("$7.500", False, "5x1.500=7.500. Son 6."),
            opt("$10.500", False, "7x1.500=10.500. Son 6."),
            opt("$8.000", False, "1.500x6. Separa: 1.000x6=6.000, 500x6=3.000. Total:9.000."),
        ], "1.500 x 6 = (1.000x6) + (500x6) = 6.000 + 3.000 = 9.000."),
        ('Maria dice: "6x4=24, entonces 24÷4=6". Es correcto?', [
            opt("Si, son operaciones inversas", True, "Correcto! Multiplicacion y division son inversas."),
            opt("No, da otro resultado", False, "Si, es correcto. 24÷4=6."),
            opt("Solo si usamos 6x4=24", False, "Siempre se cumple."),
            opt("No, 24÷4=8", False, "24÷4=6. 8x4=32."),
        ], "Si a x b = c, entonces c ÷ b = a. 6x4=24, entonces 24÷4=6."),
        ("3 paquetes de galletas a $2.500. Paga con $10.000. Vuelto?", [
            opt("$2.500", True, "Correcto! 3x2.500=7.500. 10.000-7.500=2.500."),
            opt("$3.000", False, "3x2.500=7.500. 10.000-7.500=2.500."),
            opt("$1.500", False, "10.000-7.500=2.500."),
            opt("$5.000", False, "Gasto:7.500, no 5.000."),
        ], "Total:3x2.500=7.500. Vuelto:10.000-7.500=2.500."),
        ("La profesora reparte 15 lapices entre 3 estudiantes. Que operacion?", [
            opt("15 x 3 = 45", False, "No es multiplicacion."),
            opt("15 - 3 = 12", False, "No es resta."),
            opt("15 ÷ 3 = 5", True, "Correcto! Reparto equitativo = division."),
            opt("15 + 3 = 18", False, "No es suma."),
        ], "Reparto en partes iguales = division. 15 ÷ 3 = 5 lapices cada uno."),
        ("En el recreo hay 8 mesas con 4 sillas cada una. Total sillas?", [
            opt("32", True, "Correcto! 8x4=32 sillas."),
            opt("12", False, "8+4=12. Hay grupos iguales, se multiplica."),
            opt("16", False, "4x4=16. Son 8 mesas."),
            opt("24", False, "6x4=24. Son 8 mesas."),
        ], "8 mesas x 4 sillas = 8x4 = 32 sillas."),
    ]
    idx = s % len(pairs)
    enun, opts, expl = pairs[idx]
    return q(b, ic, d, es, f"En {c} de {ci}", enun, opts, expl)
