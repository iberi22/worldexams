import os
import re

files = [
    r"e:\scripts-python\worldexams\src\content\questions\colombia\sociales-ciudadanas\grado-9\CO-SOC-9-economia-001-bundle.md",
    r"e:\scripts-python\worldexams\src\content\questions\colombia\sociales-ciudadanas\grado-9\CO-SOC-9-geografia-001-bundle.md",
    r"e:\scripts-python\worldexams\src\content\questions\colombia\sociales-ciudadanas\grado-9\CO-SOC-9-independencia-001-bundle.md",
    r"e:\scripts-python\worldexams\src\content\questions\colombia\sociales-ciudadanas\grado-9\CO-SOC-9-revolucion-001-bundle.md"
]

for file_path in files:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Fix Headers (#### Enunciado -> ## Pregunta)
    content = content.replace("#### Enunciado", "## Pregunta")

    # Fix Explicación (##### Explicación Pedagógica Pedagógica -> ### Explicación Pedagógica)
    # Also handle cases where it might be just ##### Explicación Pedagógica
    content = content.replace("##### Explicación Pedagógica Pedagógica", "### Explicación Pedagógica")
    content = content.replace("##### Explicación Pedagógica", "### Explicación Pedagógica")

    # Fix Double Enunciado
    content = content.replace("### Enunciado\n\n### Enunciado", "### Enunciado")
    content = content.replace("### Enunciado\n### Enunciado", "### Enunciado")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Repaired {file_path}")
