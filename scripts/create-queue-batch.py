#!/usr/bin/env python3
"""Create batch queue for PE/EC/BO/BR bundles."""
import json
from pathlib import Path

queue_path = Path("E:/scripts-python/worldexams/.worldexams/generation/queue.json")
queue_path.parent.mkdir(parents=True, exist_ok=True)

queue = {"tasks": [], "batch": "JULES-2026-07-07", "lastUpdated": "2026-07-07T07:00:00Z"}

# PE Matematicas G11 W01-W20 (20 tasks)
topics_pe = [
    ("numeros-enteros", "Números Enteros"),
    ("operaciones-algebraicas", "Operaciones Algebraicas"),
    ("ecuaciones-lineales", "Ecuaciones Lineales"),
    ("funciones", "Funciones"),
    ("geometria-plana", "Geometría Plana"),
    ("trigonometria", "Trigonometría"),
    ("estadistica", "Estadística"),
    ("probabilidad", "Probabilidad"),
    ("razonamiento-logico", "Razonamiento Lógico"),
    ("sistemas-ecuaciones", "Sistemas de Ecuaciones"),
    ("inecuaciones", "Inecuaciones"),
    ("polinomios", "Polinomios"),
    ("radicales", "Radicales"),
    ("logaritmos", "Logaritmos"),
    ("sucesiones", "Sucesiones"),
    ("geometria-analitica", "Geometría Analítica"),
    ("vectores", "Vectores"),
    ("matrices", "Matrices"),
    ("numeros-complejos", "Números Complejos"),
    ("combinatoria", "Combinatoria"),
]
for i, (topic, _) in enumerate(topics_pe):
    queue["tasks"].append({
        "id": f"pe-mate-g11-w{i+1:02d}-{topic}",
        "status": "pending",
        "country": "peru",
        "subject": "matematicas",
        "grado": 11,
        "periodo": i + 1,
        "topic": topic,
        "bundleIndex": 1,
        "title": f"PE Matemáticas G11 W{i+1:02d} - {topic}"
    })

# EC Matematicas G11 W01-W20 (20 tasks)
topics_ec = [
    ("numeros-reales", "Números Reales"),
    ("algebra", "Álgebra"),
    ("funciones", "Funciones"),
    ("geometria", "Geometría"),
    ("trigonometria", "Trigonometría"),
    ("probabilidad", "Probabilidad"),
    ("estadistica", "Estadística"),
    ("razonamiento", "Razonamiento"),
    ("matrices", "Matrices"),
    ("derivadas", "Derivadas"),
    ("vectores", "Vectores"),
    ("sucesiones", "Sucesiones"),
    ("logaritmos", "Logaritmos"),
    ("combinatoria", "Combinatoria"),
    ("numeros-complejos", "Números Complejos"),
    ("geometria-analitica", "Geometría Analítica"),
    ("sistemas-lineales", "Sistemas Lineales"),
    ("inecuaciones", "Inecuaciones"),
    ("polinomios", "Polinomios"),
    ("fracciones-algebraicas", "Fracciones Algebraicas"),
]
for i, (topic, _) in enumerate(topics_ec):
    queue["tasks"].append({
        "id": f"ec-mate-g11-w{i+1:02d}-{topic}",
        "status": "pending",
        "country": "ecuador",
        "subject": "matematicas",
        "grado": 11,
        "periodo": i + 1,
        "topic": topic,
        "bundleIndex": 1,
        "title": f"EC Matemáticas G11 W{i+1:02d} - {topic}"
    })

# BO Matematicas G11 W01-W10 (10 tasks)
topics_bo = [
    ("numeros-enteros", "Números Enteros"),
    ("algebra-basica", "Álgebra Básica"),
    ("ecuaciones", "Ecuaciones"),
    ("geometria", "Geometría"),
    ("trigonometria", "Trigonometría"),
    ("estadistica", "Estadística"),
    ("probabilidad", "Probabilidad"),
    ("funciones", "Funciones"),
    ("razonamiento", "Razonamiento"),
    ("sistemas", "Sistemas de Ecuaciones"),
]
for i, (topic, _) in enumerate(topics_bo):
    queue["tasks"].append({
        "id": f"bo-mate-g11-w{i+1:02d}-{topic}",
        "status": "pending",
        "country": "bolivia",
        "subject": "matematicas",
        "grado": 11,
        "periodo": i + 1,
        "topic": topic,
        "bundleIndex": 1,
        "title": f"BO Matemáticas G11 W{i+1:02d} - {topic}"
    })

# BR Matematica 3EM W21-W30 (10 tasks)
topics_br = [
    ("matrizes", "Matrizes"),
    ("determinantes", "Determinantes"),
    ("sistemas-lineares", "Sistemas Lineares"),
    ("analise-combinatoria", "Análise Combinatória"),
    ("probabilidade", "Probabilidade"),
    ("estatistica", "Estatística"),
    ("geometria-espacial", "Geometria Espacial"),
    ("geometria-analitica", "Geometria Analítica"),
    ("numeros-complexos", "Números Complexos"),
    ("polinomios", "Polinômios"),
]
for i, (topic, _) in enumerate(topics_br):
    queue["tasks"].append({
        "id": f"br-mate-3em-w{i+21:02d}-{topic}",
        "status": "pending",
        "country": "brazil",
        "subject": "matematicas",
        "grado": 11,
        "periodo": i + 21,
        "topic": topic,
        "bundleIndex": 1,
        "title": f"BR Matemática 3EM W{i+21:02d} - {topic}"
    })

with open(queue_path, "w", encoding="utf-8") as f:
    json.dump(queue, f, indent=2, ensure_ascii=False)

print(f"Creado queue con {len(queue['tasks'])} tareas")
print(f"  PE: {len(topics_pe)} tasks (W01-W20)")
print(f"  EC: {len(topics_ec)} tasks (W01-W20)")
print(f"  BO: {len(topics_bo)} tasks (W01-W10)")
print(f"  BR: {len(topics_br)} tasks (W21-W30)")
