#!/usr/bin/env python3
"""Generate W21 weekly bundle."""
import os; W=r"E:\scripts-python\worldexams\questions_data\colombia\matematicas\grado-6\2026\weekly"
def w(fname,content):
    open(os.path.join(W,fname),"w",encoding="utf-8").write(content)
    print(f"OK: {fname}")

def mak(s):
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

# W21
c = mak({"id":"CO-MAT-6-2026-W21-estadistica-recoleccion-datos-001-MASTERY","tema":"estadistica-recoleccion-datos","p":3,"w":21,"t":"Estadistica: Recoleccion y Organizacion de Datos","q":[
Q(1,"Remember",A,"Definicion","Que es la estadistica?",[(True,"La ciencia que recoge, organiza y analiza datos","Correcto."),(False,"La ciencia que estudia los numeros","Incorrecto."),(False,"La ciencia de las probabilidades","Incorrecto."),(False,"La ciencia que mide figuras geometricas","Incorrecto.")],"La estadistica recolecta, organiza, analiza e interpreta datos."),
Q(2,"Remember",A,"Tipos de variables","Cual es una variable cualitativa?",[(True,"El color de ojos","Correcto."),(False,"La estatura","Incorrecto, es cuantitativa."),(False,"La edad","Incorrecto, es cuantitativa."),(False,"El peso","Incorrecto, es cuantitativo.")],"Variables cualitativas: cualidades. Cuantitativas: numeros."),
Q(3,"Understand",R,"Recoleccion de datos","De 40 estudiantes, 15 prefieren Matematicas, 12 Ciencias, 8 Espanol y 5 Artes. Que tipo de datos son?",[(True,"Datos de variable cualitativa","Correcto."),(False,"Datos cuantitativos discretos","Incorrecto."),(False,"Datos cuantitativos continuos","Incorrecto."),(False,"Datos numericos","Incorrecto.")],"La variable 'asignatura preferida' es cualitativa."),
Q(4,"Understand",A,"Frecuencia absoluta","Encuesta mascotas: 10 perro, 8 gato, 5 pez, 2 ave. Frecuencia absoluta de 'gato'?",[(True,"8","Correcto."),(False,"10","Incorrecto, es de perro."),(False,"25","Incorrecto, es el total."),(False,"5","Incorrecto, es de pez.")],"Frecuencia absoluta de 'gato' = 8."),
Q(5,"Apply",R,"Frecuencia relativa","De 30 estudiantes, 12 usan gafas. Frecuencia relativa?",[(True,"0,4 (40%)","Correcto."),(False,"12","Incorrecto, es absoluta."),(False,"0,12","Incorrecto."),(False,"18","Incorrecto, son los que NO usan.")],"Frecuencia relativa = 12/30 = 0,4 = 40%."),
Q(6,"Apply",R,"Porcentaje","Vendidos 25 helados: 10 vainilla, 8 chocolate, 5 fresa, 2 limon. % de vainilla?",[(True,"40%","Correcto."),(False,"10%","Incorrecto."),(False,"25%","Incorrecto."),(False,"50%","Incorrecto.")],"10/25 x 100 = 40%."),
Q(7,"Apply",Z,"Organizar datos","Notas: 3.5; 4.0; 3.0; 4.5; 3.5; 2.5; 4.0; 5.0; 3.5; 4.0. Cual tiene mayor frecuencia?",[(True,"3.5 y 4.0 (3 veces c/u)","Correcto, empate."),(False,"Solo 3.5","Incorrecto, 4.0 tmb 3 veces."),(False,"Solo 4.0","Incorrecto, 3.5 tmb 3 veces."),(False,"5.0","Incorrecto, solo 1 vez.")],"3.5 (3) y 4.0 (3) tienen la mayor frecuencia."),
Q(8,"Apply",Z,"Rango","Temperaturas: 32, 34, 31, 33, 35, 32, 34. Rango?",[(True,"4 grados","Correcto."),(False,"3 grados","Incorrecto."),(False,"5 grados","Incorrecto."),(False,"7 grados","Incorrecto.")],"Max=35, Min=31, Rango=4."),
Q(9,"Analyze",Z,"Comparacion","Grupo A: notas 2.0-5.0. Grupo B: 3.0-4.5. Cual tiene mayor variabilidad?",[(True,"Grupo A (rango 3.0 vs 1.5)","Correcto."),(False,"Grupo B","Incorrecto."),(False,"Ambos igual","Incorrecto."),(False,"No se puede","Incorrecto.")],"Rango A=3.0; B=1.5. Mayor rango = mayor variab."),
Q(10,"Analyze",Z,"Analisis","12 perros, 8 gatos, 4 peces, 6 aves. Que fraccion son perros?",[(True,"12/30 = 2/5","Correcto."),(False,"12/26","Incorrecto."),(False,"12/20","Incorrecto."),(False,"1/2","Incorrecto.")],"Total=30, perros=12, fraccion=12/30=2/5."),
]})
w("CO-MAT-6-2026-W21-estadistica-recoleccion-datos-001-MASTERY-bundle.md", c)
print("W21 done")
