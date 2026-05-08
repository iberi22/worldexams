"""
parse_question.py — Convierte una pregunta ICFES en steps educativos para Remotion.

Input: Pregunta del pending queue JSON
Output: Diccionario con title, topic, steps[], narration_script, estimated_seconds

La idea es tomar el statement + explanation y dividirlo en 3-4 pasos lógicos
con explicaciones cortas y la matemática resaltada en cada paso.
"""

import json
import re
import sys
from typing import TypedDict

class Step(TypedDict):
    label: str
    math: str
    explanation: str

class ParsedQuestion(TypedDict):
    title: str
    topic: str
    steps: list[Step]
    narration_script: str
    estimated_seconds: int  # palabras / 2.5

# Templates de pasos por tipo de problema
STEP_TEMPLATES = {
    "real-numbers": [
        ("Identifica el tipo de número", "¿Es racional o irracional?", "Clasifica el número según sus propiedades."),
        ("Aplica la definición", "Racional = p/q con q≠0", "Si puede expresarse como fracción, es racional."),
        ("Verifica la opción", "Respuesta correcta", "Selecciona la opción que cumple la condición."),
    ],
    "algebraic-expressions": [
        ("Identifica términos", "Términos semejantes", "Agrupa términos con la misma variable y exponente."),
        ("Simplifica", "Opera términos", "Suma o resta los coeficientes de términos semejantes."),
        ("Verifica resultado", "Expresión simplificada", "Comprueba que no haya más términos semejantes."),
    ],
    "equations": [
        ("Identifica la ecuación", "Tipo de ecuación", "Reconoce los términos constantes y variables."),
        ("Aísla la variable", "Operación inversa", "Aplica la operación contraria a ambos lados."),
        ("Resuelve", "Valor de la variable", "Despeja completamente la variable."),
        ("Verifica", "Comprobación", "Sustituye el valor en la ecuación original."),
    ],
    "geometry": [
        ("Identifica la figura", "Propiedades geométricas", "Reconoce el tipo de figura y sus elementos."),
        ("Aplica la fórmula", "Fórmula correspondiente", "Usa la fórmula correcta (área, volumen, etc.)."),
        ("Calcula", "Operación", "Sustituye los valores numéricos."),
        ("Verifica unidades", "Resultado final", "Confirma que las unidades son correctas."),
    ],
    "statistics": [
        ("Identifica los datos", "Conjunto de datos", "Ordena y organiza la información."),
        ("Aplica la medida", "Medida estadística", "Calcula media, mediana, moda según corresponda."),
        ("Interpreta", "Resultado", "Analiza qué significa el resultado en contexto."),
    ],
    "default": [
        ("Lee el enunciado", "Datos clave", "Identifica la información importante del problema."),
        ("Plantea la solución", "Estrategia", "Define los pasos para resolver el problema."),
        ("Ejecuta", "Operaciones", "Realiza los cálculos paso a paso."),
        ("Verifica", "Respuesta final", "Confirma que la respuesta es correcta."),
    ],
}

EXPLANATION_KEYWORDS = {
    "irracional": "real-numbers",
    "racional": "real-numbers",
    "fracción": "algebraic-expressions",
    "ecuación": "equations",
    "ecuaciones": "equations",
    "geometría": "geometry",
    "geometrica": "geometry",
    "área": "geometry",
    "volumen": "geometry",
    "estadística": "statistics",
    "media": "statistics",
    "mediana": "statistics",
    "probabilidad": "statistics",
}

def detect_topic(explanation: str, question_id: str) -> str:
    """Detecta el tema de la pregunta basado en keywords y el ID."""
    # Check question_id for topic hints
    lower_id = question_id.lower()
    for keyword, topic in EXPLANATION_KEYWORDS.items():
        if keyword in lower_id or keyword in explanation.lower():
            return topic
    return "default"

def extract_math_statements(explanation: str, steps_template: list[tuple]) -> list[str]:
    """Extrae expresiones matemáticas del explanation para asignarlas a los steps."""
    # Busca patrones como $...$ , $$\sqrt{...}$$, números con operaciones
    math_expressions = re.findall(r'\$[^$]+\$', explanation)
    if not math_expressions:
        # Si no hay LaTeX, busca patrones numéricos
        math_expressions = re.findall(r'[=×÷+\-]\s*[\d.]+|[\d.]+\s*[=×÷+\-]|\w+\s*=\s*\w+', explanation)
    
    # Si hay menos expresiones que steps, rellena con "—"
    math_assignments = []
    for i in range(len(steps_template)):
        if i < len(math_expressions):
            math_assignments.append(math_expressions[i].strip('$'))
        else:
            math_assignments.append(steps_template[i][1])
    return math_assignments

def generate_explanation_for_step(step_index: int, step_label: str, original_explanation: str, math_expr: str) -> str:
    """Genera una explicación breve y única para cada paso."""
    sentences = re.split(r'[.!?]+', original_explanation)
    sentences = [s.strip() for s in sentences if s.strip()]
    
    # Si hay suficientes oraciones, asigna una distinta a cada step
    if step_index < len(sentences):
        return sentences[step_index][:100].strip()
    
    # Fallback: busca la primera oración que contenga el math_expr
    for sentence in sentences:
        clean_math = math_expr.replace('$', '').strip()
        if clean_math and clean_math in sentence:
            return sentence[:100].strip()
    
    return sentences[0][:100].strip() if sentences else "Aplica el concepto matemático."

def parse_question(question_item: dict) -> ParsedQuestion:
    """Parse a question from the pending queue into Remotion-compatible steps."""
    payload = question_item.get("payload", {})
    content = payload.get("content", {})
    
    statement = content.get("statement", "Unknown")
    explanation = content.get("explanation", "")
    question_id = question_item.get("question_id", "unknown")
    
    # Clean statement (remove HTML/markdown)
    title = re.sub(r'\*\*', '', statement).strip()
    if len(title) > 60:
        title = title[:57] + "..."
    
    # Detect topic — prefer explanation over question_id
    topic = detect_topic(explanation, question_id)
    steps_template = STEP_TEMPLATES.get(topic, STEP_TEMPLATES["default"])
    
    # Extract math for each step
    math_assignments = extract_math_statements(explanation, steps_template)
    
    # Build steps
    steps = []
    narration_lines = []
    
    for i, (label, default_math, default_expl) in enumerate(steps_template):
        math_text = math_assignments[i] if i < len(math_assignments) else default_math
        step_explanation = generate_explanation_for_step(i, label, explanation, math_text)
        
        step: Step = {
            "label": label,
            "math": math_text,
            "explanation": step_explanation[:100],
        }
        steps.append(step)
        narration_lines.append(f"Paso {i+1}: {label}. {step_explanation}")
    
    # Build narration script from steps (SIEMPRE usar steps)
    narration_script = ". ".join(narration_lines) + ". "
    word_count = len(narration_script.split())
    estimated_seconds = max(20, min(40, round(word_count / 2.5)))  # target 20-40s
    
    # Convert topic ID to human-readable
    topic_labels = {
        "real-numbers": "Números Reales",
        "algebraic-expressions": "Expresiones Algebraicas",
        "equations": "Ecuaciones",
        "geometry": "Geometría",
        "statistics": "Estadística",
    }
    
    return {
        "title": title,
        "topic": topic_labels.get(topic, topic.replace("-", " ").title()),
        "steps": steps,
        "narration_script": narration_script,
        "estimated_seconds": estimated_seconds,
    }

def main():
    """Test with a sample question from the queue."""
    try:
        with open(r"E:\scripts-python\worldexams\saberparatodos\video-pipeline\queue\pending-v41-math.json", "r", encoding="utf-8") as f:
            queue = json.load(f)
    except FileNotFoundError:
        print("Queue file not found")
        sys.exit(1)
    
    if not queue.get("items"):
        print("No items in queue")
        sys.exit(1)
    
    # Parse first 3 as samples
    for i, item in enumerate(queue["items"][:3]):
        result = parse_question(item)
        print(f"\n{'='*60}")
        print(f"Question {i+1}: {result['title']}")
        print(f"Topic: {result['topic']}")
        print(f"Duration: ~{result['estimated_seconds']}s")
        print(f"Steps: {len(result['steps'])}")
        for s in result['steps']:
            print(f"  * [{s['label']}] {s['math']}")
            print(f"    -> {s['explanation']}")
        print(f"\nNarration: {result['narration_script'][:150]}...")

if __name__ == "__main__":
    main()
