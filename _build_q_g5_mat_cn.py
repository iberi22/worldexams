#!/usr/bin/env python3
"""Build Grade 5 Math + Science question data"""
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

D = {}

# ═══════ G5 MATEMATICAS P1 - Fracciones ═══════
D["5_matematicas_P1"] = [
    {"c":"En Bogot\u00e1, la profesora parte una torta en 8 partes iguales.","e":"\u00bfQu\u00e9 fracci\u00f3n representa una porci\u00f3n?","opts":[["A","1/2","No, 1/2 ser\u00edan 4 partes."],["B","1/4","No."],["C","1/8","Correcto. 1 parte de 8."],["D","1/8","Correcto. Una de ocho partes."]],"a":"C","fb":"La fracci\u00f3n 1/8 significa 1 parte de un total de 8 partes iguales."},
    {"c":"En Medell\u00edn, una pizza se dividi\u00f3 en 6 partes. Comieron 4.","e":"\u00bfQu\u00e9 fracci\u00f3n de pizza comieron?","opts":[["A","2/6","No, comieron 4."],["B","4/6","Correcto. 4 de 6 partes."],["C","6/4","No, eso es mayor que la unidad."],["D","1/6","No."]],"a":"B","fb":"Comieron 4 partes de 6: 4/6, que se puede simplificar a 2/3."},
    {"c":"En Cali preguntan.","e":"\u00bfCu\u00e1l fracci\u00f3n es MAYOR: 3/4 \u00f3 2/4?","opts":[["A","2/4","No."],["B","3/4","Correcto, 3/4 > 2/4."],["C","Son iguales","No."],["D","No se puede saber","S\u00ed."]],"a":"B","fb":"Con igual denominador, la fracci\u00f3n con numerador mayor es m\u00e1s grande."},
    {"c":"En Barranquilla, la profe escribe 6/8.","e":"\u00bfCu\u00e1l es la fracci\u00f3n equivalente simplificada de 6/8?","opts":[["A","1/2","No."],["B","2/3","No."],["C","3/4","Correcto. 6\u00f72=3, 8\u00f72=4."],["D","4/5","No."]],"a":"C","fb":"6/8 se simplifica dividiendo numerador y denominador entre 2: 3/4."},
    {"c":"En Bucaramanga: un litro de agua se divide en 5 vasos iguales.","e":"\u00bfQu\u00e9 fracci\u00f3n de litro tiene cada vaso?","opts":[["A","1/2 L","No."],["B","1/3 L","No."],["C","1/4 L","No."],["D","1/5 L","Correcto."]],"a":"D","fb":"1 litro \u00f7 5 vasos = 1/5 de litro por vaso."},
    {"c":"En Cartagena preguntan.","e":"\u00bfCu\u00e1l es 1/4 de 100?","opts":[["A","10","No."],["B","20","No."],["C","25","Correcto. 100\u00f74=25."],["D","50","No."]],"a":"C","fb":"1/4 de 100 = 100 \u00f7 4 = 25."},
    {"c":"En Pereira comparan fracciones.","e":"\u00bfCu\u00e1l fracci\u00f3n es equivalente a 1/2?","opts":[["A","2/3","No."],["B","3/6","Correcto. 3/6 = 1/2."],["C","1/3","No."],["D","2/5","No."]],"a":"B","fb":"3/6 se simplifica dividiendo entre 3: 1/2."},
    {"c":"En Manizales: la clase tiene 30 estudiantes, 10 son ni\u00f1as.","e":"\u00bfQu\u00e9 fracci\u00f3n representan las ni\u00f1as?","opts":[["A","1/2","No."],["B","1/3","Correcto. 10/30 = 1/3."],["C","1/4","No."],["D","2/3","No."]],"a":"B","fb":"10 ni\u00f1as de 30 estudiantes = 10/30 = 1/3."},
    {"c":"En C\u00facuta: \u00bfcu\u00e1nto es 1/2 + 1/4?","e":"\u00bfCu\u00e1l es el resultado?","opts":[["A","1/6","No."],["B","2/6","No."],["C","3/4","Correcto. 1/2=2/4, 2/4+1/4=3/4."],["D","1/4","No."]],"a":"C","fb":"1/2 = 2/4, entonces 2/4 + 1/4 = 3/4."},
    {"c":"En Ibagu\u00e9: 3/5 de un pastel son de chocolate.","e":"Si el pastel tiene 15 porciones, \u00bfcu\u00e1ntas son de chocolate?","opts":[["A","3","No."],["B","6","No."],["C","9","Correcto. 15\u00f75=3, 3x3=9."],["D","12","No."]],"a":"C","fb":"3/5 de 15 = (15\u00f75)x3 = 3x3 = 9 porciones."},
]

# ═══════ G5 MATEMATICAS P2 - Decimales ═══════
D["5_matematicas_P2"] = [
    {"c":"En Bogot\u00e1, la profe escribe 0.5 en el tablero.","e":"\u00bfA qu\u00e9 fracci\u00f3n equivale 0.5?","opts":[["A","1/3","No."],["B","1/2","Correcto. 0.5 = 1/2."],["C","1/4","No."],["D","3/4","No."]],"a":"B","fb":"0.5 se lee 'cinco d\u00e9cimas' = 5/10 = 1/2."},
    {"c":"En Medell\u00edn, un cuaderno cuesta $2,550.","e":"\u00bfC\u00f3mo se escribe $2,550 en decimal?","opts":[["A","$2.55","Correcto."],["B","$255.0","No."],["C","$25.50","No."],["D","$0.255","No."]],"a":"A","fb":"$2,550 = 2 mil 550 = $2.55 en notaci\u00f3n decimal con punto."},
    {"c":"En Cali: \u00bfcu\u00e1l n\u00famero es mayor: 0.75 \u00f3 0.7?","e":"\u00bfCu\u00e1l es MAYOR?","opts":[["A","0.75","Correcto. 0.75 = 0.75 > 0.70."],["B","0.7","No."],["C","Son iguales","No."],["D","No se puede saber","S\u00ed."]],"a":"A","fb":"0.75 > 0.7 porque 75 cent\u00e9simas > 70 cent\u00e9simas."},
    {"c":"En Barranquilla: 0.25 + 0.25.","e":"\u00bfCu\u00e1nto es?","opts":[["A","0.5","Correcto."],["B","0.25","No."],["C","0.75","No."],["D","1.0","No."]],"a":"A","fb":"0.25 + 0.25 = 0.50. Son dos cuartos = medio."},
    {"c":"En Bucaramanga: 1.5 - 0.3.","e":"\u00bfCu\u00e1nto es?","opts":[["A","1.2","Correcto."],["B","1.8","No, suma."],["C","1.0","No."],["D","0.2","No."]],"a":"A","fb":"1.5 - 0.3 = 1.2. Se resta d\u00e9cima a d\u00e9cima."},
    {"c":"En Cartagena: un dulce cuesta $0.75 y otro $0.50.","e":"\u00bfCu\u00e1nto cuestan los dos juntos?","opts":[["A","$1.00","No."],["B","$1.25","Correcto. 0.75+0.50=1.25."],["C","$1.50","No."],["D","$0.125","No."]],"a":"B","fb":"$0.75 + $0.50 = $1.25."},
    {"c":"En Pereira: \u00bfcu\u00e1l es 0.3 x 10?","e":"\u00bfCu\u00e1nto es?", "opts":[["A","0.03","No."],["B","3.0","Correcto. 0.3 x 10 = 3.0."],["C","0.30","No."],["D","30","No."]],"a":"B","fb":"Multiplicar por 10 corre el punto decimal una posici\u00f3n a la derecha."},
    {"c":"En Manizales: ordena 0.2, 0.15, 0.25.","e":"\u00bfOrden de menor a mayor?","opts":[["A","0.2, 0.15, 0.25","No."],["B","0.15, 0.2, 0.25","Correcto."],["C","0.25, 0.2, 0.15","No."],["D","0.15, 0.25, 0.2","No."]],"a":"B","fb":"0.15 (15/100), 0.2 (20/100), 0.25 (25/100)."},
    {"c":"En C\u00facuta: 0.75 = \u00bf? en fracci\u00f3n.","e":"\u00bfA qu\u00e9 fracci\u00f3n equivale 0.75?","opts":[["A","1/2","No."],["B","1/3","No."],["C","2/3","No."],["D","3/4","Correcto."]],"a":"D","fb":"0.75 = 75/100 = 3/4 simplificando."},
    {"c":"En Ibagu\u00e9: 2.5 + 1.75.","e":"\u00bfCu\u00e1nto es?","opts":[["A","3.25","No."],["B","4.25","Correcto. 2.5+1.75=4.25."],["C","3.75","No."],["D","5.00","No."]],"a":"B","fb":"2.5 + 1.75 = 2.50 + 1.75 = 4.25."},
]

# ═══════ G5 MATEMATICAS P3 - Geometría ═══════
D["5_matematicas_P3"] = [
    {"c":"En Bogot\u00e1, la profe muestra un transportador.","e":"\u00bfPara qu\u00e9 sirve el transportador?","opts":[["A","Medir longitudes","No, eso es la regla."],["B","Medir \u00e1ngulos","Correcto."],["C","Dibujar c\u00edrculos","No, eso es el comp\u00e1s."],["D","Pesar objetos","No."]],"a":"B","fb":"El transportador mide \u00e1ngulos en grados (0\u00b0 a 180\u00b0)."},
    {"c":"En Medell\u00edn dibujan \u00e1ngulos.","e":"\u00bfC\u00f3mo se llama un \u00e1ngulo de 90\u00b0?","opts":[["A","Agudo","No, es menor."],["B","Obtuso","No, es mayor."],["C","Recto","Correcto."],["D","Llano","No, es 180\u00b0."]],"a":"C","fb":"El \u00e1ngulo recto mide exactamente 90\u00b0."},
    {"c":"En Cali: \u00bfcu\u00e1nto miden los \u00e1ngulos internos de un tri\u00e1ngulo?","e":"\u00bfSuma total de \u00e1ngulos internos?","opts":[["A","90\u00b0","No."],["B","180\u00b0","Correcto."],["C","270\u00b0","No."],["D","360\u00b0","Eso es en cuadril\u00e1teros."]],"a":"B","fb":"La suma de los \u00e1ngulos internos de cualquier tri\u00e1ngulo es 180\u00b0."},
    {"c":"En Barranquilla miden el \u00e1rea de un rect\u00e1ngulo.","e":"\u00bfCu\u00e1l es la f\u00f3rmula del \u00e1rea del rect\u00e1ngulo?","opts":[["A","Lado x lado","No, eso es cuadrado."],["B","Base x altura","Correcto."],["C","Base + altura","No."],["D","2 x (base + altura)","Eso es per\u00edmetro."]],"a":"B","fb":"\u00c1rea del rect\u00e1ngulo = base x altura."},
    {"c":"En Bucaramanga: rect\u00e1ngulo de 5cm x 3cm.","e":"\u00bfCu\u00e1l es su \u00e1rea?","opts":[["A","8 cm\u00b2","No."],["B","15 cm\u00b2","Correcto. 5x3=15."],["C","16 cm\u00b2","No."],["D","30 cm\u00b2","No."]],"a":"B","fb":"\u00c1rea = 5cm x 3cm = 15 cm\u00b2 (cent\u00edmetros cuadrados)."},
    {"c":"En Cartagena: cuadrado de 4cm de lado.","e":"\u00bfCu\u00e1l es su per\u00edmetro?","opts":[["A","12 cm","No."],["B","8 cm","No."],["C","16 cm","Correcto. 4x4=16."],["D","4 cm","No."]],"a":"C","fb":"Per\u00edmetro del cuadrado = 4 x lado = 4 x 4 = 16 cm."},
    {"c":"En Pereira clasifican tri\u00e1ngulos.","e":"\u00bfC\u00f3mo se llama un tri\u00e1ngulo con 2 lados iguales?","opts":[["A","Equil\u00e1tero","Tres lados iguales."],["B","Escaleno","Todos diferentes."],["C","Is\u00f3sceles","Correcto."],["D","Rect\u00e1ngulo","Tiene \u00e1ngulo recto."]],"a":"C","fb":"El tri\u00e1ngulo is\u00f3sceles tiene dos lados iguales y uno diferente."},
    {"c":"En Manizales: \u00e1ngulo de 120\u00b0.","e":"\u00bfQu\u00e9 tipo de \u00e1ngulo es?","opts":[["A","Agudo","Menor a 90\u00b0."],["B","Recto","Exactamente 90\u00b0."],["C","Obtuso","Correcto. 120\u00b0 > 90\u00b0."],["D","Llano","180\u00b0."]],"a":"C","fb":"El \u00e1ngulo obtuso mide entre 90\u00b0 y 180\u00b0."},
    {"c":"En C\u00facuta: tri\u00e1ngulo con un \u00e1ngulo recto.","e":"\u00bfC\u00f3mo se llama?","opts":[["A","Acut\u00e1ngulo","Todos agudos."],["B","Obtus\u00e1ngulo","Uno obtuso."],["C","Rect\u00e1ngulo","Correcto. Tiene un \u00e1ngulo de 90\u00b0."],["D","Equil\u00e1tero","Tres lados iguales."]],"a":"C","fb":"El tri\u00e1ngulo rect\u00e1ngulo tiene un \u00e1ngulo de exactamente 90\u00b0."},
    {"c":"En Ibagu\u00e9: circunferencia de radio 3cm.","e":"\u00bfCu\u00e1l es su di\u00e1metro?","opts":[["A","3 cm","No."],["B","6 cm","Correcto. D = 2r = 6 cm."],["C","9 cm","No."],["D","1.5 cm","No."]],"a":"B","fb":"El di\u00e1metro es el doble del radio: 2 x 3 = 6 cm."},
]

# ═══════ G5 MATEMATICAS P4 - Estadística ═══════
D["5_matematicas_P4"] = [
    {"c":"En Bogot\u00e1, la profe pregunt\u00f3 a 20 estudiantes su color favorito. 8 dijeron azul, 5 rojo, 4 verde, 3 amarillo.","e":"\u00bfCu\u00e1l fue el color favorito?","opts":[["A","Rojo","No."],["B","Verde","No."],["C","Azul","Correcto. Mayor frecuencia."],["D","Amarillo","No."]],"a":"C","fb":"El color con mayor frecuencia (8/20) fue el azul: la moda."},
    {"c":"En Medell\u00edn registran temperaturas: 22\u00b0, 24\u00b0, 23\u00b0, 22\u00b0, 24\u00b0.","e":"\u00bfCu\u00e1l es la moda?","opts":[["A","22\u00b0 y 24\u00b0","Correcto. Ambos aparecen 2 veces."],["B","23\u00b0","No, solo una vez."],["C","22\u00b0","Tambi\u00e9n 24\u00b0."],["D","No hay moda","S\u00ed hay."]],"a":"A","fb":"La moda son los valores que m\u00e1s se repiten: 22\u00b0 y 24\u00b0 (bimodal)."},
    {"c":"En Cali: notas de 5 estudiantes: 3, 4, 5, 3, 5.","e":"\u00bfCu\u00e1l es el promedio?","opts":[["A","3.5","No."],["B","4.0","Correcto. (3+4+5+3+5)/5=4."],["C","4.5","No."],["D","3.0","No."]],"a":"B","fb":"Promedio = (3+4+5+3+5)/5 = 20/5 = 4.0."},
    {"c":"En Barranquilla preguntan.","e":"\u00bfQu\u00e9 es una tabla de frecuencias?","opts":[["A","Una tabla de multiplicar","No."],["B","Organiza datos con su frecuencia","Correcto."],["C","Un dibujo","No."],["D","Una suma","No."]],"a":"B","fb":"La tabla de frecuencias organiza datos mostrando cu\u00e1ntas veces aparece cada valor."},
    {"c":"En Bucaramanga: encuesta sobre mascotas: perro 12, gato 8, pez 5, ave 3.","e":"\u00bfCu\u00e1ntas personas respondieron?","opts":[["A","20","No."],["B","28","Correcto. 12+8+5+3=28."],["C","30","No."],["D","25","No."]],"a":"B","fb":"Total de respuestas: 12+8+5+3=28 personas."},
    {"c":"En Cartagena muestran una gr\u00e1fica de barras.","e":"\u00bfPara qu\u00e9 sirve una gr\u00e1fica de barras?","opts":[["A","Comparar cantidades","Correcto."],["B","Multiplicar","No."],["C","Dibujar paisajes","No."],["D","Escribir cuentos","No."]],"a":"A","fb":"La gr\u00e1fica de barras permite comparar visualmente cantidades entre categor\u00edas."},
    {"c":"En Pereira: datos 2, 4, 6, 8, 10.","e":"\u00bfCu\u00e1l es el rango?","opts":[["A","8","Correcto. 10-2=8."],["B","6","No."],["C","10","No."],["D","4","No."]],"a":"A","fb":"Rango = valor m\u00e1ximo - valor m\u00ednimo = 10 - 2 = 8."},
    {"c":"En Manizales: el profesor pregunta.","e":"\u00bfQu\u00e9 es la mediana?","opts":[["A","El valor que m\u00e1s se repite","Eso es moda."],["B","El valor central ordenando los datos","Correcto."],["C","La suma dividida entre la cantidad","Eso es promedio."],["D","El valor m\u00e1s alto","No."]],"a":"B","fb":"La mediana es el valor que queda en el centro cuando ordenamos los datos."},
    {"c":"En C\u00facuta: datos ordenados: 5, 7, 9, 12, 15.","e":"\u00bfCu\u00e1l es la mediana?","opts":[["A","7","No."],["B","9","Correcto. Valor central."],["C","12","No."],["D","5","No."]],"a":"B","fb":"Con 5 datos, la mediana es el tercer valor: 9."},
    {"c":"En Ibagu\u00e9: 6, 6, 7, 8, 8, 9.","e":"\u00bfCu\u00e1l es la moda?","opts":[["A","6 y 8","Correcto. Ambos aparecen 2 veces."],["B","7","No, una vez."],["C","9","No."],["D","Solo 6","Tambi\u00e9n 8."]],"a":"A","fb":"Datos bimodales: 6 y 8 aparecen con mayor frecuencia (2 cada uno)."},
]

# ═══════ G5 CIENCIAS NATURALES P1 - Sistema digestivo ═══════
D["5_ciencias-naturales_P1"] = [
    {"c":"En Bogot\u00e1, la profe explica el sistema digestivo.","e":"\u00bfD\u00f3nde comienza la digesti\u00f3n?","opts":[["A","En el est\u00f3mago","No, ah\u00ed contin\u00faa."],["B","En la boca","Correcto. Con la masticaci\u00f3n."],["C","En el intestino","No."],["D","En el es\u00f3fago","No."]],"a":"B","fb":"La digesti\u00f3n comienza en la boca con la masticaci\u00f3n y la saliva."},
    {"c":"En Medell\u00edn preguntan sobre nutrientes.","e":"\u00bfQu\u00e9 nutriente nos da energ\u00eda r\u00e1pida?","opts":[["A","Prote\u00ednas","Construyen m\u00fasculo."],["B","Vitaminas","Protegen."],["C","Carbohidratos","Correcto. Dan energ\u00eda."],["D","Grasas","Dan energ\u00eda pero m\u00e1s lenta."]],"a":"C","fb":"Los carbohidratos (pan, arroz, pasta) son la principal fuente de energ\u00eda."},
    {"c":"En Cali: \u00bfqu\u00e9 \u00f3rgano absorbe los nutrientes?","e":"\u00bfCu\u00e1l es?","opts":[["A","Est\u00f3mago","Absorbe poco."],["B","Intestino delgado","Correcto. Principal \u00f3rgano de absorci\u00f3n."],["C","Intestino grueso","Absorbe agua."],["D","H\u00edgado","Procesa nutrientes."]],"a":"B","fb":"El intestino delgado absorbe la mayor\u00eda de nutrientes hacia la sangre."},
    {"c":"En Barranquilla: funci\u00f3n del h\u00edgado.","e":"\u00bfQu\u00e9 funci\u00f3n cumple el h\u00edgado?","opts":[["A","Almacenar comida","No."],["B","Filtrar la sangre y procesar nutrientes","Correcto."],["C","Masticar","No."],["D","Absorber agua","No."]],"a":"B","fb":"El h\u00edgado procesa nutrientes, produce bilis y filtra sustancias."},
    {"c":"En Bucaramanga: \u00f3rgano que produce jugos g\u00e1stricos.","e":"\u00bfCu\u00e1l es?","opts":[["A","La boca","No, saliva."],["B","El est\u00f3mago","Correcto. Produce \u00e1cido clorh\u00eddrico."],["C","El p\u00e1ncreas","Produce jugo pancre\u00e1tico."],["D","El h\u00edgado","Produce bilis."]],"a":"B","fb":"El est\u00f3mago produce jugos g\u00e1stricos con \u00e1cido clorh\u00eddrico para digerir."},
    {"c":"En Cartagena: \u00bfpor qu\u00e9 debemos masticar bien?","e":"\u00bfRaz\u00f3n principal?","opts":[["A","Para comer m\u00e1s r\u00e1pido","No."],["B","Para facilitar la digesti\u00f3n","Correcto."],["C","Para no ensuciar","No."],["D","Para que no se note","No."]],"a":"B","fb":"Masticar bien reduce el tama\u00f1o de los alimentos facilitando la digesti\u00f3n."},
    {"c":"En Pereira: \u00faltima parte del digestivo.","e":"\u00bfD\u00f3nde se absorbe el agua de los alimentos?","opts":[["A","Est\u00f3mago","No."],["B","Intestino delgado","Absorbe nutrientes."],["C","Intestino grueso","Correcto. Absorbe agua."],["D","Boca","No."]],"a":"C","fb":"El intestino grueso absorbe el agua y forma las heces."},
    {"c":"En Manizales: la profe habla de la digesti\u00f3n.","e":"\u00bfCu\u00e1nto tiempo toma la digesti\u00f3n completa?","opts":[["A","15 minutos","No."],["B","1 hora","No."],["C","24-72 horas aproximadamente","Correcto."],["D","1 semana","No."]],"a":"C","fb":"La digesti\u00f3n completa puede tomar entre 24 y 72 horas."},
    {"c":"En C\u00facuta: \u00bfqu\u00e9 \u00f3rgano almacena la bilis?","e":"\u00bfCu\u00e1l es?","opts":[["A","P\u00e1ncreas","Produce insulina."],["B","H\u00edgado","Produce bilis."],["C","Ves\u00edcula biliar","Correcto. Almacena la bilis."],["D","Est\u00f3mago","No."]],"a":"C","fb":"La ves\u00edcula biliar almacena la bilis producida por el h\u00edgado."},
    {"c":"En Ibagu\u00e9: relaci\u00f3n entre digesti\u00f3n y nutrici\u00f3n.","e":"\u00bfCu\u00e1l es la relaci\u00f3n entre digesti\u00f3n y nutrici\u00f3n?","opts":[["A","Son lo mismo","No."],["B","La digesti\u00f3n descompone los alimentos y la nutrici\u00f3n usa los nutrientes","Correcto."],["C","No se relacionan","S\u00ed se relacionan."],["D","La nutrici\u00f3n es primero","No."]],"a":"B","fb":"La digesti\u00f3n procesa los alimentos; la nutrici\u00f3n utiliza los nutrientes obtenidos."},
]

append_to_data(D)
