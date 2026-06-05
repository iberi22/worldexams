#!/usr/bin/env python3
"""Build ALL question data for Grades 3, 5, 6 into _questions_data_full.json"""
import json, os

def append_to_data(new_data, filename="_questions_data_full.json"):
    existing = {}
    if os.path.exists(filename):
        with open(filename, "r", encoding="utf-8") as f:
            existing = json.load(f)
    existing.update(new_data)
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)
    print(f"Appended {len(new_data)} sets. Total: {len(existing)}")

# ════════════════════════════════════════════════════════════════
# GRADE 3 - MATEMATICAS (continuation)
# ════════════════════════════════════════════════════════════════

Q3M = {}

Q3M["3_matematicas_P2"] = [
    {"c":"En la tienda escolar de un colegio en Bogot\u00e1, Mar\u00eda compr\u00f3 un cuaderno por $2,500 y un l\u00e1piz por $800. Pag\u00f3 con $5,000.","e":"\u00bfCu\u00e1nto dinero gast\u00f3 Mar\u00eda en total?","opts":[["A","$3,000","Incorrecto."],["B","$3,300","Correcto. 2,500+800=3,300."],["C","$1,700","Incorrecto."],["D","$4,200","Incorrecto."]],"a":"B","fb":"Sumar los precios: 2.500+800=3.300."},
    {"c":"En Medell\u00edn, Juan ten\u00eda 450 canicas. Perdi\u00f3 175 jugando.","e":"\u00bfCu\u00e1ntas canicas le quedaron?","opts":[["A","375","No."],["B","275","Correcto. 450-175=275."],["C","325","No."],["D","285","No."]],"a":"B","fb":"Restar: 450-175=275 canicas restantes."},
    {"c":"En Cali, la profesora tiene 24 estudiantes y los divide en 4 equipos iguales.","e":"\u00bfCu\u00e1ntos estudiantes tiene cada equipo?","opts":[["A","4","No."],["B","6","Correcto. 24\u00f74=6."],["C","8","No."],["D","7","No."]],"a":"B","fb":"Dividir: 24\u00f74=6 estudiantes por equipo."},
    {"c":"En Barranquilla, la biblioteca tiene 5 estantes con 12 libros cada uno.","e":"\u00bfCu\u00e1ntos libros hay en total?","opts":[["A","50","No."],["B","60","Correcto. 5x12=60."],["C","72","No."],["D","48","No."]],"a":"B","fb":"Multiplicar: 5 estantes x 12 libros = 60 libros."},
    {"c":"En Bucaramanga, Mar\u00eda compr\u00f3 3 docenas de huevos. Una docena tiene 12 huevos.","e":"\u00bfCu\u00e1ntos huevos compr\u00f3 Mar\u00eda?","opts":[["A","24","No, 3x12=36."],["B","30","No."],["C","36","Correcto. 3x12=36."],["D","48","No."]],"a":"C","fb":"Una docena=12. 3 docenas=3x12=36 huevos."},
    {"c":"En Cartagena, los estudiantes compraron 4 paquetes de 10 colores cada uno.","e":"\u00bfCu\u00e1ntos colores compraron en total?","opts":[["A","40","Correcto. 4x10=40."],["B","14","Incorrecto."],["C","44","Incorrecto."],["D","30","Incorrecto."]],"a":"A","fb":"4 paquetes x 10 colores = 40 colores en total."},
    {"c":"En Pereira, la profesora reparti\u00f3 36 borradores entre 4 estudiantes en partes iguales.","e":"\u00bfCu\u00e1ntos borradores recibi\u00f3 cada uno?","opts":[["A","6","No."],["B","8","No."],["C","9","Correcto. 36\u00f74=9."],["D","12","No."]],"a":"C","fb":"Dividir: 36 borradores entre 4 estudiantes = 9 cada uno."},
    {"c":"En Manizales, hay 3 filas de \u00e1rboles con 8 \u00e1rboles en cada fila.","e":"\u00bfCu\u00e1ntos \u00e1rboles hay en total?","opts":[["A","11","No."],["B","16","No."],["C","24","Correcto. 3x8=24."],["D","32","No."]],"a":"C","fb":"3 filas x 8 \u00e1rboles = 24 \u00e1rboles en total."},
    {"c":"En C\u00facuta hay 25 estudiantes. Si faltaron 7, \u00bfcu\u00e1ntos asistieron?","e":"\u00bfCu\u00e1ntos estudiantes asistieron?","opts":[["A","18","Correcto. 25-7=18."],["B","32","No."],["C","17","No."],["D","20","No."]],"a":"A","fb":"25 estudiantes - 7 ausentes = 18 presentes."},
    {"c":"En Ibagu\u00e9, el profesor pregunta: si tengo 8 filas de 7 sillas cada una.","e":"\u00bfCu\u00e1ntas sillas hay en total?","opts":[["A","15","No."],["B","48","No."],["C","56","Correcto. 8x7=56."],["D","64","No."]],"a":"C","fb":"8 filas x 7 sillas = 56 sillas. Tabla del 7."},
]

Q3M["3_matematicas_P3"] = [
    {"c":"En clase de geometr\u00eda en un colegio de Bogot\u00e1, la profesora muestra una figura con 3 lados.","e":"\u00bfC\u00f3mo se llama una figura de 3 lados?","opts":[["A","Cuadrado","No, tiene 4 lados."],["B","C\u00edrculo","No, no tiene lados."],["C","Tri\u00e1ngulo","Correcto. 3 lados, 3 v\u00e9rtices."],["D","Rect\u00e1ngulo","No, tiene 4 lados."]],"a":"C","fb":"El tri\u00e1ngulo tiene 3 lados y 3 v\u00e9rtices."},
    {"c":"En Medell\u00edn dibujan figuras en el tablero.","e":"\u00bfCu\u00e1ntos lados tiene un cuadrado?","opts":[["A","2","No."],["B","4","Correcto. 4 lados iguales."],["C","6","No, eso es un hex\u00e1gono."],["D","3","No, eso es un tri\u00e1ngulo."]],"a":"B","fb":"El cuadrado tiene 4 lados iguales y 4 \u00e1ngulos rectos."},
    {"c":"En Cali preguntan sobre el c\u00edrculo.","e":"\u00bfCu\u00e1ntos lados tiene un c\u00edrculo?","opts":[["A","1","No."],["B","2","No."],["C","4","No."],["D","0","Correcto. El c\u00edrculo es una curva cerrada sin lados."]],"a":"D","fb":"El c\u00edrculo no tiene lados porque es una l\u00ednea curva cerrada."},
    {"c":"En Barranquilla miden \u00e1ngulos en figuras.","e":"\u00bfCu\u00e1ntos v\u00e9rtices tiene un rect\u00e1ngulo?","opts":[["A","3","No."],["B","4","Correcto. 4 v\u00e9rtices donde se unen los lados."],["C","5","No."],["D","2","No."]],"a":"B","fb":"El rect\u00e1ngulo tiene 4 v\u00e9rtices y 4 lados."},
    {"c":"En Bucaramanga comparan figuras.","e":"\u00bfEn qu\u00e9 se diferencia un cuadrado de un rect\u00e1ngulo?","opts":[["A","No se diferencian","S\u00ed se diferencian."],["B","El cuadrado tiene todos sus lados iguales","Correcto. Cuadrado: 4 lados iguales."],["C","El rect\u00e1ngulo es m\u00e1s peque\u00f1o","Incorrecto."],["D","El cuadrado no tiene \u00e1ngulos","Incorrecto."]],"a":"B","fb":"El cuadrado tiene 4 lados iguales; el rect\u00e1ngulo tiene lados opuestos iguales."},
    {"c":"En Cartagena dibujan figuras en cuadr\u00edcula.","e":"\u00bfQu\u00e9 figura tiene 5 lados?","opts":[["A","Pent\u00e1gono","Correcto. Penta=5."],["B","Hex\u00e1gono","No, hexa=6."],["C","Tri\u00e1ngulo","No, tri=3."],["D","Cuadrado","No, tiene 4."]],"a":"A","fb":"El pent\u00e1gono tiene 5 lados (penta, del griego = cinco)."},
    {"c":"En Pereira identifican figuras en objetos.","e":"\u00bfQu\u00e9 forma tiene una pelota?","opts":[["A","Cuadrado","No."],["B","C\u00edrculo","No, es 3D."],["C","Esfera","Correcto. La pelota tiene forma de esfera."],["D","Tri\u00e1ngulo","No."]],"a":"C","fb":"La esfera es un cuerpo redondo, como una pelota o un globo ter\u00e1queo."},
    {"c":"En Manizales doblan papel para hacer figuras.","e":"\u00bfQu\u00e9 figura se forma al doblar un cuadrado por la diagonal?","opts":[["A","Otro cuadrado","No."],["B","Rect\u00e1ngulo","No."],["C","Dos tri\u00e1ngulos","Correcto. La diagonal divide en 2 tri\u00e1ngulos."],["D","C\u00edrculo","No."]],"a":"C","fb":"La diagonal de un cuadrado lo divide en dos tri\u00e1ngulos rect\u00e1ngulos iguales."},
    {"c":"En C\u00facuta, la profe pregunta sobre \u00e1ngulos.","e":"\u00bfQu\u00e9 tipo de \u00e1ngulo tiene un cuadrado en sus esquinas?","opts":[["A","\u00c1ngulo agudo","No, mide menos de 90\u00b0."],["B","\u00c1ngulo obtuso","No, mide m\u00e1s de 90\u00b0."],["C","\u00c1ngulo recto","Correcto. 90\u00b0 exactos."],["D","\u00c1ngulo llano","No, mide 180\u00b0."]],"a":"C","fb":"El \u00e1ngulo recto mide exactamente 90\u00b0, como las esquinas de un cuadrado."},
    {"c":"En Ibagu\u00e9 crean figuras con palitos.","e":"Cada lado del tri\u00e1ngulo mide 5cm. \u00bfCu\u00e1l es su per\u00edmetro?","opts":[["A","10 cm","No."],["B","15 cm","Correcto. 5+5+5=15 cm."],["C","20 cm","No."],["D","25 cm","No."]],"a":"B","fb":"Per\u00edmetro=suma de lados. Tri\u00e1ngulo equil\u00e1tero: 5x3=15 cm."},
]

Q3M["3_matematicas_P4"] = [
    {"c":"En Bogot\u00e1, un estudiante mide su l\u00e1piz con una regla.","e":"Si el l\u00e1piz mide 12 cent\u00edmetros, \u00bfcu\u00e1ntos mil\u00edmetros son?","opts":[["A","120 mm","Correcto. 1cm=10mm, 12cm=120mm."],["B","12 mm","No."],["C","1200 mm","No."],["D","100 mm","No."]],"a":"A","fb":"1 cent\u00edmetro = 10 mil\u00edmetros. 12x10=120mm."},
    {"c":"En Medell\u00edn, la clase mide el largo del sal\u00f3n.","e":"\u00bfQu\u00e9 herramienta es mejor para medir la pared del sal\u00f3n?","opts":[["A","Regla de 15cm","Muy corta."],["B","Metro o cinta m\u00e9trica","Correcto."],["C","Balanza","Mide peso."],["D","Term\u00f3metro","Mide temperatura."]],"a":"B","fb":"Para medir longitudes grandes se usa un metro o cinta m\u00e9trica."},
    {"c":"En Cali, la profe pregunta cu\u00e1nto pesa una manzana.","e":"\u00bfQu\u00e9 unidad usamos para pesar una manzana?","opts":[["A","Litros","Mide l\u00edquidos."],["B","Gramos","Correcto. La manzana pesa unos 150-200g."],["C","Metros","Mide longitud."],["D","Horas","Mide tiempo."]],"a":"B","fb":"Los gramos (g) miden masa de objetos ligeros como frutas."},
    {"c":"En Barranquilla, el recreo dura 30 minutos.","e":"\u00bfA cu\u00e1ntas horas equivale?","opts":[["A","1 hora","No, 30min=1/2 hora."],["B","Media hora","Correcto. 30min = 0.5 hora."],["C","2 horas","No."],["D","Cuarto de hora","No, 15 min=1/4 hora."]],"a":"B","fb":"30 minutos es la mitad de una hora (1 hora = 60 minutos)."},
    {"c":"En Bucaramanga miden el agua en un vaso.","e":"Un vaso tiene 250 mililitros de agua. \u00bfCu\u00e1ntos litros son?","opts":[["A","2.5 L","No."],["B","0.25 L","Correcto. 1000mL=1L, 250mL=0.25L."],["C","0.5 L","No."],["D","25 L","No."]],"a":"B","fb":"1 litro = 1000 mililitros. 250/1000=0.25 litros."},
    {"c":"En Cartagena, la clase de 3\u00b0 empieza a las 8:00 y termina a las 10:30.","e":"\u00bfCu\u00e1nto dur\u00f3 la clase?","opts":[["A","1 hora","No."],["B","3 horas","No."],["C","2 horas y media","Correcto. 8:00 a 10:30=2.5h."],["D","2 horas","No."]],"a":"C","fb":"2 horas y 30 minutos (8:00 \u2192 10:30)."},
    {"c":"En Pereira usan la balanza.","e":"Un paquete de arroz pesa 1 kilogramo. \u00bfCu\u00e1ntos gramos son?","opts":[["A","100 g","No."],["B","500 g","No."],["C","1000 g","Correcto. 1kg=1000g."],["D","10000 g","No."]],"a":"C","fb":"1 kilogramo = 1000 gramos. El kilo es la unidad principal de masa."},
    {"c":"En Manizales, miden la temperatura de la ciudad.","e":"\u00bfQu\u00e9 instrumento mide la temperatura?","opts":[["A","Regla","No."],["B","Reloj","No."],["C","Term\u00f3metro","Correcto."],["D","Balanza","No."]],"a":"C","fb":"El term\u00f3metro mide la temperatura en grados Celsius (\u00b0C)."},
    {"c":"En C\u00facuta, la profe pregunta: \u00bfcu\u00e1ntas botellas de 500mL se necesitan para llenar 2 litros?","e":"\u00bfCu\u00e1ntas botellas se necesitan?","opts":[["A","2","No."],["B","3","No."],["C","4","Correcto. 500mLx4=2000mL=2L."],["D","5","No."]],"a":"C","fb":"2L=2000mL. 2000/500=4 botellas."},
    {"c":"En Ibagu\u00e9, la clase dura 45 minutos. Si empez\u00f3 a las 9:00.","e":"\u00bfA qu\u00e9 hora termina?","opts":[["A","9:45","Correcto."],["B","10:00","No."],["C","9:30","No."],["D","10:15","No."]],"a":"A","fb":"9:00 + 45 minutos = 9:45."},
]

append_to_data(Q3M)
