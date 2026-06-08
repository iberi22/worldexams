#!/usr/bin/env python3
"""Generate weekly bundles W19-W40 part 1 (W19-W24)"""
import os; WEEKLY = r"E:\scripts-python\worldexams\questions_data\colombia\matematicas\grado-6\2026\weekly"

def w(f,c):
    with open(os.path.join(WEEKLY,f),"w",encoding="utf-8") as fh: fh.write(c)
    print(f"OK: {f}")

def make(s):
    lines = [f"---\nid: \"{s['id']}\"\ncountry: \"colombia\"\ngrado: 6\nasignatura: \"matematicas\"\ntema: \"{s['tema']}\"\nperiodo: {s['periodo']}\nweek: {s['week']}\nyear: 2026\nbundle_type: \"weekly\"\nprotocol_version: \"5.2\"\ntotal_questions: 10\nbundle_size: 10\nalignment: \"DBA MEN + Estandares Basicos Ciclo 2\"\n---\n\n# Weekly Pack W{s['week']} — {s['title']}\n\n**Grado:** 6° | **Periodo:** {s['periodo']} | **Semana:** {s['week']} | **Año:** 2026"]
    if s.get("td"): lines.append(f"\n**{s['td']}**")
    lines.append("")
    for i,q in enumerate(s["q"]):
        d=i+1; lines.append(f"---\n\n## Question {d} [D{d}]\n\n**ID:** `{s['id']}-{q[0]:03d}-v1`\n**Bloom:** {q[1]}\n**ICFES:** {q[2]}\n**Context:** {q[3]}\n\n### Enunciado\n{q[4]}\n\n### Options")
        labels=["A","B","C","D"]
        for j,(c,text,fb) in enumerate(q[5]):
            m="x" if c else " "; lines.append(f'- [{m}] {labels[j]}) {text} <!-- feedback: {fb} -->')
        lines.append(f"\n### Explicacion Pedagogica\n{q[6]}\n")
    return "\n".join(lines)

A="Comunicacion y representacion"; R="Resolucion de problemas"; Z="Razonamiento y argumentacion"
Q=lambda s,b,i,c,e,o,x:(s,b,i,c,e,o,x)

# W19 - Geometria: Volumen y Capacidad
w19 = make({"id":"CO-MAT-6-2026-W19-geometria-volumen-capacidad-001-MASTERY","tema":"geometria-volumen-capacidad","periodo":2,"week":19,"title":"Geometr\u00eda: Volumen y Capacidad","q":[
    Q(1,"Remember",A,"Unidades de volumen","\u00bfQu\u00e9 unidad se usa para medir el volumen de un cuerpo?",
      [(True,"El metro c\u00fabico (m\u00b3)","Correcto. El volumen se mide en unidades c\u00fabicas."),
       (False,"El metro cuadrado (m\u00b2)","Incorrecto. El m\u00b2 mide \u00e1rea (2D), no volumen."),
       (False,"El metro (m)","Incorrecto. El metro mide longitud."),
       (False,"El litro (L)","Correcto tambi\u00e9n, pero la unidad base del SI es el metro c\u00fabico.")],
      "El volumen mide el espacio que ocupa un cuerpo. Su unidad base es el metro c\u00fabico (m\u00b3). Un litro equivale a 1 dm\u00b3."),
    Q(2,"Remember",A,"F\u00f3rmula del volumen del cubo","\u00bfCu\u00e1l es la f\u00f3rmula para calcular el volumen de un cubo?",
      [(True,"V = lado\u00b3","Correcto. Volumen del cubo = arista elevada al cubo."),
       (False,"V = 6 \u00d7 lado\u00b2","Incorrecto. Esa es el \u00e1rea superficial del cubo, no el volumen."),
       (False,"V = lado \u00d7 lado","Incorrecto. Eso da el \u00e1rea de una cara, no el volumen."),
       (False,"V = lado \u00d7 3","Incorrecto. El volumen se calcula multiplicando lado\u00d7lado\u00d7lado = lado\u00b3.")],
      "El volumen de un cubo se calcula elevando la longitud de su arista al cubo: V = a\u00b3 = a\u00d7a\u00d7a."),
    Q(3,"Understand",R,"Volumen de una caja","Una caja de zapatos mide 30 cm de largo, 20 cm de ancho y 15 cm de alto. \u00bfCu\u00e1l es su volumen?",
      [(True,"9.000 cm\u00b3","Correcto. V = 30\u00d720\u00d715 = 9.000 cm\u00b3."),
       (False,"65 cm\u00b3","Incorrecto. 30+20+15=65. Error: sumar en vez de multiplicar las tres dimensiones."),
       (False,"600 cm\u00b3","Incorrecto. 30\u00d720=600. Error: solo multiplicar largo\u00d7ancho, falta la altura."),
       (False,"900 cm\u00b3","Incorrecto. 30\u00d730=900. Error: c\u00e1lculo incorrecto. 30\u00d720\u00d715=9.000.")],
      "Volumen del prisma rectangular = largo\u00d7ancho\u00d7alto = 30\u00d720\u00d715 = 9.000 cm\u00b3."),
    Q(4,"Understand",R,"Capacidad de una piscina","Una piscina infantil tiene 2 m de largo, 1,5 m de ancho y 0,5 m de profundidad. \u00bfCu\u00e1ntos litros de agua caben? (1 m\u00b3=1.000 L)",
      [(True,"1.500 litros","Correcto. V=2\u00d71,5\u00d70,5=1,5 m\u00b3. 1,5\u00d71.000=1.500 L."),
       (False,"4 litros","Incorrecto. 2+1,5+0,5=4. Error: sumar dimensiones en vez de multiplicar."),
       (False,"15 litros","Incorrecto. V=2\u00d71,5\u00d70,5=1,5. 1,5 L? Error: olvidar convertir m\u00b3 a litros (\u00d71.000)."),
       (False,"3.000 litros","Incorrecto. 2\u00d71,5\u00d71=3 m\u00b3. Error: usar 1 m de profundidad en vez de 0,5 m.")],
      "V=2\u00d71,5\u00d70,5=1,5 m\u00b3. Como 1 m\u00b3=1.000 L, caben 1,5\u00d71.000=1.500 litros."),
    Q(5,"Apply",R,"Jugos para la venta","Do\u00f1a Mar\u00eda vende jugo en vasos cil\u00edndricos de 8 cm de di\u00e1metro y 12 cm de altura. \u00bfCu\u00e1l es el volumen aproximado de cada vaso? (V=\u03c0r\u00b2h, \u03c0\u22483,14)",
      [(True,"602,88 cm\u00b3","Correcto. r=4 cm. V=3,14\u00d74\u00b2\u00d712=3,14\u00d716\u00d712=602,88 cm\u00b3."),
       (False,"241,15 cm\u00b3","Incorrecto. 3,14\u00d74\u00b2\u00d712=602,88. Error: posible divisi\u00f3n entre 2,5."),
       (False,"1.205,76 cm\u00b3","Incorrecto. 3,14\u00d78\u00b2\u00d76=1.205,76. Error: usar di\u00e1metro en vez de radio (r=4, no 8)."),
       (False,"301,44 cm\u00b3","Incorrecto. 3,14\u00d74\u00b2\u00d76=301,44. Error: usar la mitad de la altura.")],
      "El radio es la mitad del di\u00e1metro: r=4 cm. V=\u03c0r\u00b2h=3,14\u00d716\u00d712=602,88 cm\u00b3."),
    Q(6,"Apply",R,"Cajas en un cami\u00f3n","Un cami\u00f3n tiene una caja de carga de 4 m de largo, 2 m de ancho y 2,5 m de alto. \u00bfCu\u00e1ntas cajas de 0,5 m\u00b3 caben?",
      [(True,"40 cajas","Correcto. Vol. cami\u00f3n=4\u00d72\u00d72,5=20 m\u00b3. Cajas=20\u00f70,5=40."),
       (False,"10 cajas","Incorrecto. 20\u00f72=10. Error: dividir entre 2 en vez de entre 0,5."),
       (False,"20 cajas","Incorrecto. 20 m\u00b3 es el volumen del cami\u00f3n. Cada caja ocupa 0,5 m\u00b3: 20\u00f70,5=40."),
       (False,"80 cajas","Incorrecto. 20\u00d74=80. Error: multiplicar en vez de dividir.")],
      "Volumen del cami\u00f3n: 4\u00d72\u00d72,5=20 m\u00b3. Cajas que caben: 20\u00f70,5=40 cajas."),
    Q(7,"Apply",Z,"Volumen vs capacidad","\u00bfCu\u00e1ntos vasos de 250 mL se pueden llenar con una jarra de 1,5 L? (1 L=1.000 cm\u00b3)",
      [(True,"6 vasos","Correcto. 1,5 L=1.500 mL. 1.500\u00f7250=6 vasos."),
       (False,"4 vasos","Incorrecto. 1.000\u00f7250=4. Error: usar 1 L en vez de 1,5 L."),
       (False,"60 vasos","Incorrecto. 1,5\u00d71.000=1.500. 1.500\u00f7250=6, no 60."),
       (False,"3 vasos","Incorrecto. 750\u00f7250=3. Error: usar 0,75 L en vez de 1,5 L.")],
      "1,5 L = 1.500 mL. Vasos = 1.500 \u00f7 250 = 6 vasos."),
    Q(8,"Apply",Z,"Volumen de un ladrillo","Un ladrillo mide 24 cm\u00d712 cm\u00d78 cm. \u00bfCu\u00e1ntos ladrillos se necesitan para un muro de 2,4 m\u00d71,8 m\u00d70,24 m?",
      [(True,"450 ladrillos","Correcto. V muro=240\u00d7180\u00d724=1.036.800 cm\u00b3. V ladrillo=24\u00d712\u00d78=2.304 cm\u00b3. 1.036.800\u00f72.304=450."),
       (False,"225 ladrillos","Incorrecto. Error: c\u00e1lculo a la mitad. 1.036.800\u00f72.304=450."),
       (False,"900 ladrillos","Incorrecto. Error: el doble. 450 es correcto."),
       (False,"36 ladrillos","Incorrecto. 24\u00d712\u00d78=2.304 cm\u00b3=0,002304 m\u00b3. 1,0368\u00f70,002304=450.")],
      "Convertir m a cm: muro=240\u00d7180\u00d724=1.036.800 cm\u00b3. Ladrillo=24\u00d712\u00d78=2.304 cm\u00b3. 1.036.800\u00f72.304=450 ladrillos."),
    Q(9,"Analyze",Z,"Relaci\u00f3n entre volumen y tiempo","Un grifo vierte 25 L por minuto en un tanque de 2 m de largo, 1,5 m de ancho y 1 m de alto. \u00bfCu\u00e1nto tarda en llenarse?",
      [(True,"120 minutos (2 horas)","Correcto. V=2\u00d71,5\u00d71=3 m\u00b3=3.000 L. Tiempo=3.000\u00f725=120 min=2 h."),
       (False,"60 minutos","Incorrecto. 3.000\u00f750=60. Error: usar 50 L/min en vez de 25 L/min."),
       (False,"180 minutos","Incorrecto. 3.000\u00f716,67=180. Error: c\u00e1lculo incorrecto."),
       (False,"240 minutos","Incorrecto. 3.000\u00f712,5=240. Error: usar la mitad del caudal.")],
      "Volumen del tanque=2\u00d71,5\u00d71=3 m\u00b3=3.000 L. Tiempo=3.000 L\u00f725 L/min=120 min=2 horas."),
    Q(10,"Analyze",Z,"Optimizaci\u00f3n de espacio","Un almac\u00e9n tiene 5 m de largo, 4 m de ancho y 3 m de alto. \u00bfCu\u00e1ntas cajas c\u00fabicas de 50 cm de lado caben sin apilar? (suelo)",
      [(True,"80 cajas","Correcto. 5 m=500 cm, 500\u00f750=10 de largo. 400\u00f750=8 de ancho. Total: 10\u00d78=80."),
       (False,"40 cajas","Incorrecto. 5\u00d74=20 m\u00b2 de piso. 0,5\u00d70,5=0,25 m\u00b2/caja. 20\u00f70,25=80, no 40."),
       (False,"120 cajas","Incorrecto. 10\u00d712=120 (usar 6 m de ancho en vez de 4 m)."),
       (False,"64 cajas","Incorrecto. 8\u00d78=64. Error: asumir que ambos lados miden 4 m.")],
      "Largo: 500\u00f750=10 cajas. Ancho: 400\u00f750=8 cajas. Sin apilar (suelo): 10\u00d78=80 cajas."),
]})
w("CO-MAT-6-2026-W19-geometria-volumen-capacidad-001-MASTERY-bundle.md", w19)

# W20 - Repaso Geometria
w20 = make({"id":"CO-MAT-6-2026-W20-repaso-geometria-001-MASTERY","tema":"repaso-geometria","periodo":2,"week":20,"title":"REPASO: Geometr\u00eda (Per\u00edmetros, \u00c1reas y Vol\u00famenes)","q":[
    Q(1,"Remember",A,"Definici\u00f3n de per\u00edmetro","\u00bfQu\u00e9 es el per\u00edmetro de una figura?",
      [(True,"La suma de todos sus lados","Correcto. El per\u00edmetro es la medida del contorno de una figura."),
       (False,"El espacio que ocupa","Incorrecto. Eso es el \u00e1rea. El per\u00edmetro es la suma de los lados."),
       (False,"La distancia entre dos v\u00e9rtices","Incorrecto. Eso es la medida de un lado espec\u00edfico, no de todo el contorno."),
       (False,"El producto de base por altura","Incorrecto. Esa es la f\u00f3rmula del \u00e1rea de un rect\u00e1ngulo.")],
      "El per\u00edmetro es la medida del contorno de una figura, se calcula sumando la longitud de todos sus lados."),
    Q(2,"Remember",A,"\u00c1rea del tri\u00e1ngulo","\u00bfCu\u00e1l es la f\u00f3rmula del \u00e1rea de un tri\u00e1ngulo?",
      [(True,"(base \u00d7 altura) \u00f7 2","Correcto. El tri\u00e1ngulo es la mitad del rect\u00e1ngulo que lo contiene."),
       (False,"base \u00d7 altura","Incorrecto. Esa es el \u00e1rea del rect\u00e1ngulo. El tri\u00e1ngulo es la mitad: (b\u00d7h)/2."),
       (False,"base + altura","Incorrecto. Se multiplica y divide entre 2, no se suma."),
       (False,"lado \u00d7 3","Incorrecto. Eso es el per\u00edmetro de un tri\u00e1ngulo equil\u00e1tero.")],
      "El \u00e1rea de un tri\u00e1ngulo es la mitad del \u00e1rea del rect\u00e1ngulo de igual base y altura: A=(b\u00d7h)/2."),
    Q(3,"Understand",R,"Per\u00edmetro de un terreno","Un lote rectangular mide 18 m de frente y 25 m de fondo. \u00bfCu\u00e1nto mide su per\u00edmetro?",
      [(True,"86 m","Correcto. P=2\u00d7(18+25)=2\u00d743=86 m."),
       (False,"43 m","Incorrecto. 18+25=43 es la suma de un frente y un fondo. Se multiplica por 2: 2\u00d743=86 m."),
       (False,"450 m","Incorrecto. 18\u00d725=450 es el \u00e1rea, no el per\u00edmetro."),
       (False,"61 m","Incorrecto. 18+25+18=61. Falta un lado de 25 m: 18+25+18+25=86.")],
      "Per\u00edmetro = 2\u00d7(largo+ancho)=2\u00d7(18+25)=2\u00d743=86 metros."),
    Q(4,"Understand",R,"\u00c1rea para sembrar","Don Pedro siembra ma\u00edz en un terreno cuadrado de 30 m de lado. \u00bfCu\u00e1l es el \u00e1rea que siembra?",
      [(True,"900 m\u00b2","Correcto. \u00c1rea del cuadrado = 30\u00b2 = 900 m\u00b2."),
       (False,"120 m\u00b2","Incorrecto. 30\u00d74=120 es el per\u00edmetro. \u00c1rea = lado\u00b2 = 30\u00d730=900."),
       (False,"60 m\u00b2","Incorrecto. 30\u00d72=60. Error: multiplicar lado por 2 en vez de elevarlo al cuadrado."),
       (False,"300 m\u00b2","Incorrecto. 30\u00d710=300. Error: multiplicar por 10 en vez de por 30.")],
      "\u00c1rea del cuadrado = lado\u00b2 = (30 m)\u00b2 = 900 m\u00b2."),
    Q(5,"Apply",R,"\u00c1rea de un tri\u00e1ngulo","Un terreno triangular tiene 12 m de base y 9 m de altura. \u00bfCu\u00e1l es su \u00e1rea?",
      [(True,"54 m\u00b2","Correcto. A=(12\u00d79)/2=108/2=54 m\u00b2."),
       (False,"108 m\u00b2","Incorrecto. 12\u00d79=108 es el \u00e1rea del rect\u00e1ngulo. El tri\u00e1ngulo es la mitad: 54 m\u00b2."),
       (False,"21 m\u00b2","Incorrecto. 12+9=21. Error: sumar en vez de multiplicar y dividir."),
       (False,"27 m\u00b2","Incorrecto. (12\u00d79)/4=27. Error: dividir entre 4 en vez de entre 2.")],
      "\u00c1rea del tri\u00e1ngulo = (base\u00d7altura)/2 = (12\u00d79)/2 = 108/2 = 54 m\u00b2."),
    Q(6,"Apply",R,"Cercar con alambre","Una parcela rectangular de 24 m por 15 m se cerca con 3 hilos de alambre. \u00bfCu\u00e1ntos metros de alambre se necesitan?",
      [(True,"234 m","Correcto. Per\u00edmetro=2\u00d7(24+15)=78 m. 3 hilos: 78\u00d73=234 m."),
       (False,"78 m","Incorrecto. Eso es para un hilo. La pregunta dice 3 hilos: 78\u00d73=234 m."),
       (False,"117 m","Incorrecto. 78\u00d71,5=117. Error: solo 1,5 hilos en vez de 3."),
       (False,"360 m","Incorrecto. 24\u00d715=360. Error: calcular \u00e1rea y no per\u00edmetro.")],
      "Per\u00edmetro = 2\u00d7(24+15)=78 m. 3 hilos = 78\u00d73 = 234 metros de alambre en total."),
    Q(7,"Apply",R,"\u00c1rea de un romboide","Un romboide tiene base de 18 cm y altura de 12 cm. \u00bfCu\u00e1l es su \u00e1rea?",
      [(True,"216 cm\u00b2","Correcto. A=base\u00d7altura=18\u00d712=216 cm\u00b2."),
       (False,"60 cm\u00b2","Incorrecto. 18+12+18+12=60. Error: calcular per\u00edmetro en vez de \u00e1rea."),
       (False,"108 cm\u00b2","Incorrecto. (18\u00d712)/2=108. Error: dividir entre 2 como si fuera tri\u00e1ngulo."),
       (False,"30 cm\u00b2","Incorrecto. 18+12=30. Error: sumar base y altura.")],
      "El \u00e1rea del romboide se calcula igual que la del rect\u00e1ngulo: A=base\u00d7altura=18\u00d712=216 cm\u00b2."),
    Q(8,"Analyze",Z,"Comparaci\u00f3n \u00e1rea y per\u00edmetro","Un cuadrado y un rect\u00e1ngulo tienen el mismo per\u00edmetro de 40 m. El cuadrado tiene 10 m de lado. \u00bfCu\u00e1l tiene mayor \u00e1rea?",
      [(True,"El cuadrado: 100 m\u00b2 vs rect\u00e1ngulo: 96 m\u00b2","Correcto. Cuadrado: A=10\u00b2=100 m\u00b2. Rect\u00e1ngulo con L=12, A=8: \u00e1rea=12\u00d78=96 m\u00b2 < 100."),
       (False,"El rect\u00e1ngulo tiene mayor \u00e1rea","Incorrecto. Con el mismo per\u00edmetro, el cuadrado siempre tiene la mayor \u00e1rea."),
       (False,"Ambas \u00e1reas son iguales","Incorrecto. Aunque tengan el mismo per\u00edmetro, las \u00e1reas pueden ser diferentes."),
       (False,"No se puede saber","Incorrecto. S\u00ed se puede: cuadrado A=100. Rect\u00e1ngulo con L=12, A=8: A=96<100.")],
      "Cuadrado: 10\u00d710=100 m\u00b2. Rect\u00e1ngulo (mismo per\u00edmetro): L=12, A=8, \u00e1rea=12\u00d78=96 m\u00b2. El cuadrado maximiza el \u00e1rea."),
    Q(9,"Analyze",Z,"Dise\u00f1o de un parque","Un parque rectangular de 50 m\u00d730 m tiene dos jardineras cuadradas de 4 m de lado cada una. \u00bfQu\u00e9 \u00e1rea de pasto queda?",
      [(True,"1.468 m\u00b2","Correcto. \u00c1rea parque=50\u00d730=1.500 m\u00b2. Jardineras=2\u00d7(4\u00b2)=32 m\u00b2. Pasto=1.500-32=1.468 m\u00b2."),
       (False,"1.484 m\u00b2","Incorrecto. 1.500-16=1.484. Error: descontar solo una jardinera, son dos."),
       (False,"1.500 m\u00b2","Incorrecto. Ese es el \u00e1rea total sin descontar las jardineras."),
       (False,"1.436 m\u00b2","Incorrecto. 1.500-64=1.436. Error: 64 ser\u00eda para 4 jardineras, pero son solo 2.")],
      "\u00c1rea del parque=50\u00d730=1.500 m\u00b2. Cada jardinera=4\u00d74=16 m\u00b2. Dos=32 m\u00b2. Pasto=1.500-32=1.468 m\u00b2."),
    Q(10,"Analyze",Z,"Volumen de una caja abierta","Se construye una caja abierta cortando cuadrados de 5 cm en las esquinas de una l\u00e1mina de 30 cm\u00d720 cm. \u00bfCu\u00e1l es el volumen de la caja?",
      [(True,"1.000 cm\u00b3","Correcto. Base: (30-10)\u00d7(20-10)=20\u00d710=200 cm\u00b2. Altura=5 cm. V=200\u00d75=1.000 cm\u00b3."),
       (False,"500 cm\u00b3","Incorrecto. (30-10)\u00d7(20-10)=200. 200\u00d75=1.000."),
       (False,"3.000 cm\u00b3","Incorrecto. 30\u00d720\u00d75=3.000. Error: no descontar las esquinas cortadas."),
       (False,"750 cm\u00b3","Incorrecto. (30-5)\u00d7(20-5)=25\u00d715=375. 375\u00d75=1.875. Error: restar 5 en vez de 10.")],
      "Al cortar cuadrados de 5 cm en cada esquina, la base mide (30-10)\u00d7(20-10)=20\u00d710=200 cm\u00b2. Altura=5 cm. Volumen=200\u00d75=1.000 cm\u00b3."),
]})
w("CO-MAT-6-2026-W20-repaso-geometria-001-MASTERY-bundle.md", w20)
print("W19-W20 done")
