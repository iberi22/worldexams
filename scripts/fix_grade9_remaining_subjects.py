import os
import re

# Configuration
FILES_TO_FIX = [
    r"src/content/questions/colombia/ingles/grado-9/CO-ING-9-grammar-001-bundle.md",
    r"src/content/questions/colombia/lectura-critica/grado-9/CO-LEC-9-argumentacion-001-bundle.md",
    r"src/content/questions/colombia/matematicas/grado-9/CO-MAT-9-geometria-001-bundle.md"
]

METADATA_TEMPLATE = """
# === METADATA GLOBAL ===

# === Metadata de Validación ===

| Campo | Valor |
|---|---|
| Total Preguntas | 7 |
| Original (Dificultad 3) | 1 |
| Fácil (Dificultad 1-2) | 2 |
| Media (Dificultad 3) | 2 |
| Difícil (Dificultad 4-5) | 2 |

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Validado |
|---|---|---|---|
| 1 | {id}-v1 | Medium | ⬜ |
| 2 | {id}-v2 | Low | ⬜ |
| 3 | {id}-v3 | Low | ⬜ |
| 4 | {id}-v4 | Medium | ⬜ |
| 5 | {id}-v5 | Medium | ⬜ |
| 6 | {id}-v6 | High | ⬜ |
| 7 | {id}-v7 | High | ⬜ |
"""

def fix_file(filepath):
    full_path = os.path.join(os.getcwd(), filepath)
    if not os.path.exists(full_path):
        print(f"❌ File not found: {full_path}")
        return

    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Fix Frontmatter: Update bundle_version
    if 'bundle_version: "1"' in content:
        content = content.replace('bundle_version: "1"', 'bundle_version: "2.1"')
        print(f"  - Updated bundle_version to 2.1 in {filepath}")
    elif 'bundle_version: "2.1"' not in content:
        content = re.sub(r'(protocol_version: "2.1")', r'\1\nbundle_version: "2.1"', content)
        print(f"  - Added bundle_version to {filepath}")

    # 2. Fix Difficulty for English Q1
    if "CO-ING-9-grammar-001" in filepath:
        if "## Pregunta 1 (Original - Dificultad 2)" in content:
            content = content.replace("## Pregunta 1 (Original - Dificultad 2)", "## Pregunta 1 (Original - Dificultad 3)")
            print(f"  - Fixed Q1 Difficulty in {filepath}")

    # 3. Add Metadata Table if missing
    if "# === METADATA GLOBAL === " not in content and "# === METADATA GLOBAL ===" not in content:
        # Extract ID for the table
        match = re.search(r'id: "(.*?)"', content)
        if match:
            file_id = match.group(1)
            metadata_section = METADATA_TEMPLATE.format(id=file_id)
            content += metadata_section
            print(f"  - Added Metadata Table to {filepath}")
        else:
            print(f"  ❌ Could not find ID in {filepath}")

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Fixed {filepath}")

def main():
    print("🔧 Starting Grade 9 Remaining Subjects Fix...")
    for file_path in FILES_TO_FIX:
        fix_file(file_path)
    print("🏁 Done.")

if __name__ == "__main__":
    main()
