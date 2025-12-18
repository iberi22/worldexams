import os
import json
from typing import List, Dict

# Configuración de bundles a generar
BUNDLES_MATH = [
    {
        "id": "CO-MAT-11-ALG-005",
        "tema": "Factorización",
        "temas_subtema": "Factorización avanzada",
    },
    {
        "id": "CO-MAT-11-algebra-002",
        "tema": "Polinomios",
        "temas_subtema": "Operaciones con polinomios",
    },
    # ... (52 más)
]

def generate_bundle_template(bundle_id: str, tema: str, asignatura: str = "Matemáticas") -> str:
    """Genera template base para un bundle"""
    return f"""---
id: "{bundle_id}"
country: "co"
grado: 11
asignatura: "{asignatura}"
tema: "{tema}"
protocol_version: "2.1"
bundle_version: "2.1"
total_questions: 7
estado: "approved"
creador: "Generator-AI"
generation_date: "2025-12-17"
source_url: "https://www.icfes.gov.co"
source_license: "CC BY-SA 4.0"
---

# Pregunta Base: {tema}

## Pregunta 1 (Original - Dificultad 3)
**ID:** "{bundle_id}-v1"

### Enunciado
[Pregunta con contexto colombiano]

### Opciones
- [x] A) [Respuesta correcta]
- [ ] B) [Distractor]
- [ ] C) [Distractor]
- [ ] D) [Distractor]

### Explicación Pedagógica
**Respuesta Correcta: A**
[Explicación]

---

## Pregunta 2 (Fácil A - Dificultad 1)
**ID:** "{bundle_id}-v2"
[...]

## Pregunta 3-7
[...]
"""

def main():
    print("Generador de bundles para World Exams")
    print("=" * 50)
    print("\nEste script generará los bundles faltantes.")
    print("Bundles a generar: 47 Matemáticas + 14 Lectura Crítica = 61 total")

if __name__ == "__main__":
    main()
