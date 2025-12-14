import os

files_to_fix = [
    "src/content/questions/colombia/sociales-ciudadanas/grado-9/CO-SOC-9-economia-001-bundle.md",
    "src/content/questions/colombia/sociales-ciudadanas/grado-9/CO-SOC-9-geografia-001-bundle.md",
    "src/content/questions/colombia/sociales-ciudadanas/grado-9/CO-SOC-9-independencia-001-bundle.md",
    "src/content/questions/colombia/sociales-ciudadanas/grado-9/CO-SOC-9-revolucion-001-bundle.md"
]

metadata_table = """
# === Metadata de Validación ===

| Campo | Valor |
|---|---|
| Total Preguntas | 7 |
| Original (Dificultad 3) | 1 |
| Fácil (Dificultad 1-2) | 2 |
| Media (Dificultad 3) | 2 |
| Difícil (Dificultad 4-5) | 2 |

"""

for file_path in files_to_fix:
    full_path = os.path.join(os.getcwd(), file_path)
    if not os.path.exists(full_path):
        print(f"File not found: {full_path}")
        continue

    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()

    if "| Total Preguntas | 7 |" in content:
        print(f"Skipping {file_path} (already has metadata)")
        continue

    # Find where to insert. Ideally before "## 📊 Metadata de Validación"
    if "## 📊 Metadata de Validación" in content:
        parts = content.split("## 📊 Metadata de Validación")
        new_content = parts[0] + metadata_table + "## 📊 Metadata de Validación" + parts[1]
    else:
        # Append to end if not found
        new_content = content + "\n" + metadata_table

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Fixed {file_path}")
