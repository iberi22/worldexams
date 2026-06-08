#!/usr/bin/env python3
"""
Part 3: Topic-specific question generators (Fracciones, Geometria, Tiempo, Datos, etc.)
"""

from gen_mat_g3_part1 import *

def gen_q_fracciones(s, c, ci, t, b, ic, d, es):
    pairs = [
        ("Que fraccion representa 1 de 4 partes iguales de una pizza?", [
            opt("1/4", True, "Correcto! 1 parte de 4 = 1/4."),
            opt("1/2", False, "1/2 seria 1 de 2 partes."),
            opt("1/3", False, "1/3 seria 1 de 3 partes."),
            opt("4/1", False, "4/1 significa 4 enteros."),
        ], "Fraccion como parte de un todo: numerador (partes que tomamos) / denominador (total de partes). 1 de 4 = 1/4."),
        ("Si una torta se divide en 3 partes iguales y comes 1, que fraccion comiste?", [
            opt("1/3", True, "Correcto! 1 de 3 partes = 1/3."),
            opt("2/3", False, "2/3 seria si comieras 2 partes."),
            opt("3/3", False, "3/3 es la torta completa."),
            opt("1/2", False, "1/2 seria 1 de 2 partes."),
        ], "Torta dividida en 3 partes. Comes 1 parte. Fraccion: 1/3."),
        ("Cual fraccion es MAYOR: 3/4 o 1/4?", [
            opt("3/4", True, "Correcto! 3/4 es mayor que 1/4 porque 3 > 1 con igual denominador."),
            opt("1/4", False, "1/4 es menor. Con igual denominador, compara numeradores."),
            opt("Son iguales", False, "3/4 y 1/4 tienen diferente numerador."),
            opt("No se puede comparar", False, "Si se puede: mismo denominador, mayor numerador = mayor fraccion."),
        ], "Con igual denominador (4), el numerador mayor indica fraccion mayor. 3 > 1, entonces 3/4 > 1/4."),
        ("Cual de estas es una fraccion equivalente a 1/2?", [
            opt("2/4", True, "Correcto! 1/2 = 2/4. Ambas representan la mitad."),
            opt("1/4", False, "1/4 es la cuarta parte, no la mitad."),
            opt("3/4", False, "3/4 son tres cuartos, mas de la mitad."),
            opt("2/2", False, "2/2 = 1 entero, no la mitad."),
        ], "Fracciones equivalentes representan la misma cantidad. 1/2 = 2/4 = 3/6 = 4/8. Todas son la mitad."),
        ("Si tienes 5/8 de una barra de chocolate y comes 3/8, cuanto te queda?", [
            opt("2/8", True, "Correcto! 5/8 - 3/8 = 2/8."),
            opt("8/8", False, "Eso seria el chocolate completo."),
            opt("1/8", False, "5-3=2. Quedan 2/8."),
            opt("5/8", False, "No, comiste 3/8, entonces quedan menos."),
        ], "Resta de fracciones con igual denominador: resta los numeradores. 5/8 - 3/8 = (5-3)/8 = 2/8."),
        ("En la clase de arte, cortaron una cartulina en 6 partes iguales. Se usaron 2 partes. Que fraccion se uso?", [
            opt("2/6", True, "Correcto! 2 de 6 partes = 2/6 = 1/3."),
            opt("6/2", False, "6/2 = 3, no es una fraccion menor que 1."),
            opt("4/6", False, "4/6 seria lo que sobro, no lo que se uso."),
            opt("1/6", False, "1/6 si solo usaran 1 parte. Usaron 2."),
        ], "Partes usadas / total partes = 2/6. Se puede simplificar a 1/3."),
        ("Que fraccion representa la mitad de un circulo?", [
            opt("1/2", True, "Correcto! La mitad es 1/2."),
            opt("1/4", False, "1/4 es un cuarto."),
            opt("2/2", False, "2/2 = 1 entero."),
            opt("1/1", False, "1/1 = 1 entero."),
        ], "La mitad significa 1 de 2 partes iguales = 1/2."),
        ("Tres amigos se reparten una pizza en partes iguales. Que fraccion le toca a cada uno?", [
            opt("1/3", True, "Correcto! 1 pizza ÷ 3 amigos = 1/3 cada uno."),
            opt("1/2", False, "1/2 solo si fueran 2 amigos."),
            opt("2/3", False, "2/3 es para 2 personas."),
            opt("3/3", False, "3/3 es la pizza completa."),
        ], "1 entero dividido en 3 partes iguales = 1/3 para cada uno."),
        ("Cual es menor: 1/4 o 1/2?", [
            opt("1/4", True, "Correcto! 1/4 significa 1 de 4 partes, 1/2 es 1 de 2. Entre mas partes, mas pequena cada una."),
            opt("1/2", False, "1/2 es mayor que 1/4."),
            opt("Son iguales", False, "Son diferentes. 1/4 < 1/2."),
            opt("Depende del entero", False, "Con el mismo entero, 1/4 siempre es menor que 1/2."),
        ], "A mayor denominador (con igual numerador), menor la fraccion. 4 > 2, entonces 1/4 < 1/2."),
        (f"En {c} de {ci}, un estudiante coloreo 3/5 de un dibujo. Cuanto falta por colorear?", [
            opt("2/5", True, "Correcto! 5/5 - 3/5 = 2/5."),
            opt("3/5", False, "Eso es lo que ya coloreo."),
            opt("5/5", False, "Eso seria el dibujo completo."),
            opt("1/5", False, "5-3=2, faltan 2/5."),
        ], "El total es 5/5. Coloreo 3/5. Falta: 5/5 - 3/5 = 2/5."),
    ]
    idx = s % len(pairs)
    enun, opts, expl = pairs[idx]
    return q(b, ic, d, es, f"En {c} de {ci}", enun, opts, expl)

def gen_q_geometria(s, c, ci, t, b, ic, d, es, is_perimarea=False):
    if is_perimarea:
        pairs = [
            ("Un cuadrado tiene 4 lados de 5 cm cada uno. Cual es su perimetro?", [
                opt("20 cm", True, "Correcto! 5+5+5+5=20 cm."),
                opt("25 cm", False, "5x5=25 es el area."),
                opt("15 cm", False, "5+5+5=15, faltaria un lado."),
                opt("10 cm", False, "5+5=10, solo dos lados."),
            ], "Perimetro es la suma de todos los lados. Cuadrado: 4 x 5 = 20 cm."),
            ("Un rectangulo mide 6 cm de largo y 3 cm de ancho. Cual es su perimetro?", [
                opt("18 cm", True, "Correcto! 6+3+6+3=18 cm."),
                opt("9 cm", False, "6+3=9, solo dos lados."),
                opt("12 cm", False, "6+6=12, faltan los otros dos."),
                opt("36 cm", False, "6x6=36, eso no es perimetro."),
            ], "Perimetro: suma de todos los lados. 6+3+6+3 = 18 cm."),
            ("En una cuadricula, una figura cubre 8 cuadrados. Cual es su area?", [
                opt("8 unidades cuadradas", True, "Correcto! Area = conteo de cuadrados = 8."),
                opt("8 unidades lineales", False, "El area se mide en unidades cuadradas, no lineales."),
                opt("4 unidades", False, "Debes contar todos los cuadrados."),
                opt("16 unidades", False, "8 no es 16."),
            ], "El area se calcula contando los cuadrados unitarios dentro de la figura. Area = 8 unidades cuadradas."),
            ("Un rectangulo tiene 4 filas de 3 cuadrados cada una. Cual es su area?", [
                opt("12 unidades cuadradas", True, "Correcto! 4 x 3 = 12 cuadrados."),
                opt("7 unidades", False, "4+3=7, no es area."),
                opt("14 unidades", False, "4x3=12, no 14."),
                opt("4 unidades", False, "Hay 12 cuadrados en total."),
            ], "Area = largo x ancho = 4 x 3 = 12 unidades cuadradas."),
        ]
    else:
        pairs = [
            ("Cuantos lados tiene un triangulo?", [
                opt("3", True, "Correcto! Triangulo tiene 3 lados."),
                opt("4", False, "4 lados es un cuadrilatero."),
                opt("2", False, "Una figura con 2 lados no es cerrada."),
                opt("5", False, "5 lados es un pentagono."),
            ], "Triangulo = 3 lados, 3 vertices. Tri significa 3."),
            ("Que figura geometrica tiene 4 lados iguales?", [
                opt("Cuadrado", True, "Correcto! Cuadrado: 4 lados iguales, 4 angulos rectos."),
                opt("Triangulo", False, "Triangulo tiene 3 lados."),
                opt("Circulo", False, "Circulo no tiene lados."),
                opt("Rectangulo", False, "Rectangulo tiene lados iguales de a pares."),
            ], "Cuadrado: 4 lados iguales, 4 esquinas (vertices)."),
            ("Un angulo recto mide cuantos grados?", [
                opt("90 grados", True, "Correcto! Angulo recto = 90 grados, como la esquina de un cuadrado."),
                opt("180 grados", False, "180 grados es un angulo llano (linea recta)."),
                opt("45 grados", False, "45 grados es un angulo agudo."),
                opt("360 grados", False, "360 grados es una vuelta completa."),
            ], "Angulo recto = 90 grados. Es el angulo de las esquinas de cuadrados y rectangulos."),
            ("Cual figura tiene eje de simetria?", [
                opt("Un cuadrado", True, "Correcto! Un cuadrado tiene 4 ejes de simetria."),
                opt("Un triangulo escaleno", False, "Triangulo escaleno no tiene ejes de simetria."),
                opt("Un rectangulo irregular", False, "Depende. Un rectangulo si tiene 2 ejes."),
                opt("Un circulo no tiene simetria", False, "El circulo tiene infinitos ejes de simetria."),
            ], "Eje de simetria: linea que divide la figura en dos partes identicas. Cuadrado: 4 ejes. Circulo: infinitos."),
            ("Cuantos vertices tiene un cuadrado?", [
                opt("4", True, "Correcto! Cuadrado tiene 4 vertices (esquinas)."),
                opt("3", False, "3 vertices es un triangulo."),
                opt("6", False, "6 vertices es un hexagono."),
                opt("0", False, "Las figuras geometricas tienen vertices."),
            ], "Vertices: puntos donde se unen los lados. Cuadrado: 4 vertices."),
            ("Que figura NO tiene lados?", [
                opt("Circulo", True, "Correcto! El circulo es una curva cerrada sin lados rectos."),
                opt("Triangulo", False, "Triangulo tiene 3 lados rectos."),
                opt("Cuadrado", False, "Cuadrado tiene 4 lados rectos."),
                opt("Pentagono", False, "Pentagono tiene 5 lados."),
            ], "Las figuras curvas como el circulo no tienen lados rectos. Se llaman curvas cerradas."),
            ("Cual de estos angulos es AGUDO?", [
                opt("30 grados", True, "Correcto! Agudo = menor de 90 grados. 30 < 90."),
                opt("90 grados", False, "90 grados es angulo recto."),
                opt("120 grados", False, "120 grados es obtuso (mayor de 90)."),
                opt("180 grados", False, "180 grados es angulo llano."),
            ], "Angulos agudos miden entre 0 y 90 grados. Angulos obtusos miden entre 90 y 180."),
            ("Cuantos lados tiene un pentagono?", [
                opt("5", True, "Correcto! Penta = 5. Pentagono = 5 lados."),
                opt("3", False, "3 lados = triangulo. Tri = 3."),
                opt("4", False, "4 lados = cuadrilatero. Tetra = 4."),
                opt("6", False, "6 lados = hexagono. Hexa = 6."),
            ], "Los nombres indican el numero de lados: pentagono (5), hexagono (6), octogono (8)."),
            ("Cual figura tiene 0 vertices?", [
                opt("Circulo", True, "Correcto! El circulo es una curva sin vertices."),
                opt("Cuadrado", False, "Cuadrado tiene 4 vertices."),
                opt("Triangulo", False, "Triangulo tiene 3 vertices."),
                opt("Rectangulo", False, "Rectangulo tiene 4 vertices."),
            ], "Vertices son las puntas donde se unen lados rectos. Un circulo no tiene vertices."),
        ]
    idx = s % len(pairs)
    enun, opts, expl = pairs[idx]
    return q(b, ic, d, es, f"En {c} de {ci}", enun, opts, expl)

def gen_q_tiempo(s, c, ci, t, b, ic, d, es):
    pairs = [
        ("Cuantos minutos tiene una hora?", [
            opt("60", True, "Correcto! 1 hora = 60 minutos."),
            opt("30", False, "30 minutos es media hora."),
            opt("100", False, "No, 1 hora = 60 minutos."),
            opt("24", False, "24 son las horas del dia."),
        ], "1 hora = 60 minutos. Media hora = 30 minutos."),
        ("Si son las 10:30, donde esta la manecilla de los minutos?", [
            opt("En el 6", True, "Correcto! 30 minutos = manecilla en el 6."),
            opt("En el 3", False, "3 = 15 minutos."),
            opt("En el 10", False, "10 = 50 minutos."),
            opt("En el 12", False, "12 = 0 o 60 minutos."),
        ], "Cada numero en el reloj = 5 minutos. Para 30: 30÷5=6. Manecilla en el 6."),
        ("Cuantos dias tiene una semana?", [
            opt("7", True, "Correcto! Una semana tiene 7 dias."),
            opt("5", False, "5 son los dias laborales."),
            opt("10", False, "No, una semana son 7 dias."),
            opt("30", False, "30 son los dias de un mes."),
        ], "Semana: lunes, martes, miercoles, jueves, viernes, sabado, domingo = 7 dias."),
        ("Si hoy es lunes, que dia sera manana?", [
            opt("Martes", True, "Correcto! Despues de lunes viene martes."),
            opt("Miercoles", False, "Miercoles es pasado manana."),
            opt("Domingo", False, "Domingo es 6 dias despues."),
            opt("Viernes", False, "Viernes es 4 dias despues."),
        ], "Los dias de la semana en orden: lunes, martes, miercoles, jueves, viernes, sabado, domingo."),
        ("Cuantos meses tiene un ano?", [
            opt("12", True, "Correcto! Un ano tiene 12 meses."),
            opt("10", False, "No, son 12 meses."),
            opt("30", False, "30 son los dias de un mes."),
            opt("365", False, "365 son los dias del ano."),
        ], "Enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre = 12 meses."),
        ("Si son las 3:00, que hora es?", [
            opt("Las 3 en punto", True, "Correcto! 3:00 = las 3 en punto."),
            opt("Las 3 y media", False, "3:30 seria las 3 y media."),
            opt("Las 3 y cuarto", False, "3:15 seria las 3 y cuarto."),
            opt("Las 4", False, "Las 4 seria 4:00."),
        ], "Cuando el minutero esta en el 12, es la hora en punto. 3:00 = las 3 en punto."),
        ("Un cuarto de hora son cuantos minutos?", [
            opt("15", True, "Correcto! 1/4 de hora = 60/4 = 15 minutos."),
            opt("30", False, "30 minutos = media hora."),
            opt("45", False, "45 minutos = tres cuartos de hora."),
            opt("20", False, "No. 60 ÷ 4 = 15 minutos."),
        ], "1 hora = 60 minutos. Un cuarto = 60 ÷ 4 = 15 minutos."),
        ("Si el reloj digital marca 2:45, como se lee?", [
            opt("Las 2 y 45 minutos", True, "Correcto! 2:45 = 2 horas y 45 minutos. Falta un cuarto para las 3."),
            opt("Las 2 y cuarto", False, "2:15 = 2 y cuarto."),
            opt("Las 3 en punto", False, "3:00 = 3 en punto."),
            opt("Las 2 y media", False, "2:30 = 2 y media."),
        ], "2:45 = 2 horas con 45 minutos. Tambien se dice 'un cuarto para las 3'."),
        ("Si son las 8:30, cuantos minutos faltan para las 9:00?", [
            opt("30", True, "Correcto! 9:00 - 8:30 = 30 minutos."),
            opt("60", False, "60 minutos es una hora. Solo faltan 30."),
            opt("15", False, "15 minutos = un cuarto. Aqui es media hora."),
            opt("45", False, "Faltan 30 minutos para las 9:00."),
        ], "De 8:30 a 9:00 hay 30 minutos (media hora)."),
        ("En el calendario, si hoy es 15 de marzo, en que mes estaremos en 30 dias?", [
            opt("Abril", True, "Correcto! Marzo tiene 31 dias. 15 + 30 = 45. 45 - 31 = 14 de abril."),
            opt("Marzo", False, "Marzo tiene 31 dias, 15+30=45 que es mas de 31."),
            opt("Febrero", False, "Estamos en marzo, no febrero."),
            opt("Mayo", False, "Mayo es muy lejano."),
        ], "Marzo tiene 31 dias. Del 15 al 31 son 16 dias. 30-16=14. Caemos el 14 de abril."),
    ]
    idx = s % len(pairs)
    enun, opts, expl = pairs[idx]
    return q(b, ic, d, es, f"En {c} de {ci}", enun, opts, expl)

def gen_q_datos(s, c, ci, t, b, ic, d, es):
    pairs = [
        ("En un pictograma, cada cara feliz representa 2 estudiantes. Hay 5 caras. Cuantos estudiantes son?", [
            opt("10", True, "Correcto! 5 x 2 = 10 estudiantes."),
            opt("5", False, "5 son las caras, cada una vale 2 estudiantes."),
            opt("7", False, "5+2=7. Debes multiplicar."),
            opt("15", False, "5x3=15. Cada cara vale 2."),
        ], "Pictograma: cada simbolo tiene un valor. 5 caras x 2 estudiantes = 10."),
        ("En una encuesta, 8 estudiantes prefieren matematicas, 5 prefieren ciencias y 3 prefieren ingles. Cual materia tiene mas preferencia?", [
            opt("Matematicas", True, "Correcto! 8 > 5 > 3."),
            opt("Ciencias", False, "5 < 8. Matematicas tiene mas."),
            opt("Ingles", False, "3 es el menor."),
            opt("Todas igual", False, "Los valores son diferentes."),
        ], "Compara las frecuencias: Matematicas=8, Ciencias=5, Ingles=3. La mayor es matematicas."),
        ("En una grafica de barras, la barra de fresa llega a 6 y la de chocolate a 9. Cual es la diferencia?", [
            opt("3", True, "Correcto! 9 - 6 = 3."),
            opt("15", False, "9+6=15, debes restar para encontrar la diferencia."),
            opt("6", False, "9-6=3."),
            opt("9", False, "9 es el valor de chocolate. Diferencia: 9-6=3."),
        ], "Diferencia = valor mayor - valor menor = 9 - 6 = 3."),
        ("Cual de estos eventos es IMPOSIBLE?", [
            opt("Que llueva caramelos", True, "Correcto! Los caramelos no caen del cielo."),
            opt("Que llueva manana", False, "Es posible, depende del clima."),
            opt("Que salga sol", False, "Es posible."),
            opt("Que alguien cumpla anos", False, "Es seguro que siempre alguien cumple anos."),
        ], "Evento imposible = no puede ocurrir jamas. Llover caramelos va contra las leyes de la naturaleza."),
        ("Lanzas una moneda. Que probabilidad hay de que caiga cara?", [
            opt("1 de 2 (50%)", True, "Correcto! Moneda: 2 resultados posibles, 1 favorable."),
            opt("1 de 4 (25%)", False, "25% es para 1 de 4. Moneda tiene 2 opciones."),
            opt("1 de 1 (100%)", False, "Si fuera 100%, siempre saldria cara."),
            opt("0%", False, "Si hay posibilidad, no es 0%."),
        ], "Probabilidad = casos favorables / casos posibles. Moneda: 1 cara / 2 opciones = 1/2 = 50%."),
        ("En una tabla de datos: lunes 15 ventas, martes 20, miercoles 18. Cual dia se vendio mas?", [
            opt("Martes, 20", True, "Correcto! 20 es el mayor de los tres."),
            opt("Lunes, 15", False, "15 es el menor."),
            opt("Miercoles, 18", False, "18 es mayor que 15 pero menor que 20."),
            opt("Todos igual", False, "Son diferentes."),
        ], "Compara los valores en la tabla. Martes tiene la frecuencia mas alta (20)."),
        ("Si en una bolsa hay 3 canicas rojas y 1 azul, cual color es MAS PROBABLE de sacar?", [
            opt("Roja, porque hay mas", True, "Correcto! 3 rojas > 1 azul, mas probable sacar roja."),
            opt("Azul, es mas especial", False, "La probabilidad depende de la cantidad."),
            opt("Ambas igual", False, "No, hay diferente cantidad."),
            opt("No se puede saber", False, "Si, hay mas rojas que azules."),
        ], "A mayor cantidad de un color, mayor probabilidad de sacarlo. 3/4 roja vs 1/4 azul."),
        ("Cual evento es SEGURO?", [
            opt("El sol saldra manana", False, "Es muy probable pero no 100% seguro."),
            opt("Un triangulo tiene 3 lados", True, "Correcto! Todos los triangulos tienen 3 lados."),
            opt("Manana llovera", False, "No se puede asegurar."),
            opt("Ganare la loteria", False, "Es muy improbable."),
        ], "Evento seguro = ocurre siempre. Todos los triangulos tienen 3 lados, es una definicion matematica."),
        ("En una grafica de barras, la barra mas alta indica:", [
            opt("La categoria con mayor frecuencia", True, "Correcto! Barra mas alta = mayor cantidad."),
            opt("La categoria mas importante", False, "La altura representa la cantidad numerica."),
            opt("La categoria mas pequena", False, "Barra mas pequena = menor frecuencia."),
            opt("El promedio", False, "Cada barra representa un valor, no el promedio."),
        ], "En graficas de barras, la altura de cada barra representa la frecuencia de esa categoria."),
    ]
    idx = s % len(pairs)
    enun, opts, expl = pairs[idx]
    return q(b, ic, d, es, f"En {c} de {ci}", enun, opts, expl)
