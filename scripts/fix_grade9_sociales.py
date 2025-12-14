import os
import re

files = [
    r"e:\scripts-python\worldexams\src\content\questions\colombia\sociales-ciudadanas\grado-9\CO-SOC-9-economia-001-bundle.md",
    r"e:\scripts-python\worldexams\src\content\questions\colombia\sociales-ciudadanas\grado-9\CO-SOC-9-geografia-001-bundle.md",
    r"e:\scripts-python\worldexams\src\content\questions\colombia\sociales-ciudadanas\grado-9\CO-SOC-9-independencia-001-bundle.md",
    r"e:\scripts-python\worldexams\src\content\questions\colombia\sociales-ciudadanas\grado-9\CO-SOC-9-revolucion-001-bundle.md"
]

metadata_table = """
## 📊 Metadata de Validación

| Campo | Valor |
|---|---|
| Tipo | Bundle |
| Cantidad | 7 Preguntas |
| Dificultad | Variada (1-5) |
| Versión Protocolo | 2.1 |
| Total Preguntas | 7 |
| Original (Dificultad 3) | 1 |
| Fácil (Dificultad 1-2) | 2 |
| Media (Dificultad 3) | 2 |
| Difícil (Dificultad 4-5) | 2 |
"""

for file_path in files:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Fix Headers
    content = content.replace("(Original - Dificultad Medium)", "(Original - Dificultad 3)")
    content = content.replace("(Low A - Dificultad Low)", "(Fácil A - Dificultad 1)")
    content = content.replace("(Low B - Dificultad Low)", "(Fácil B - Dificultad 2)")
    content = content.replace("(Medium A - Dificultad Medium)", "(Media A - Dificultad 3)")
    content = content.replace("(Medium B - Dificultad Medium)", "(Media B - Dificultad 3)")
    content = content.replace("(High A - Dificultad High)", "(Difícil A - Dificultad 4)")
    content = content.replace("(High B - Dificultad High)", "(Difícil B - Dificultad 5)")

    # Fix Sections
    content = content.replace("# Opciones", "### Opciones")
    content = content.replace("# Pregunta", "### Enunciado")
    content = content.replace("# Explicación", "### Explicación Pedagógica")

    # Add Metadata Table if missing
    if "Metadata de Validación" not in content:
        content += "\n" + metadata_table

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Fixed {file_path}")
