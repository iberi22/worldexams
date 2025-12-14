import os
import re
import glob

# Configuration
DIR_TO_FIX = r"src/content/questions/colombia/sociales-ciudadanas/grado-11"

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

    # 1. Structure Cleanup (Double Frontmatter)
    matches = list(re.finditer(r'^---.*?---', content, re.DOTALL | re.MULTILINE))
    if len(matches) > 1:
        first_fm = matches[0].group(0)
        body = content[len(first_fm):]
        body = re.sub(r'---\s+id: ".*?".*?---', '', body, flags=re.DOTALL)
        body = re.sub(r'\n{3,}', '\n\n', body)
        content = first_fm + body
        print(f"  - Cleaned structure in {filepath}")

    # 2. Fix Frontmatter: Update bundle_version
    if 'bundle_version: "1"' in content:
        content = content.replace('bundle_version: "1"', 'bundle_version: "2.1"')
        print(f"  - Updated bundle_version to 2.1 in {filepath}")
    elif 'bundle_version: "2.1"' not in content:
        if 'protocol_version: "2.1"' in content:
            content = content.replace('protocol_version: "2.1"', 'protocol_version: "2.1"\nbundle_version: "2.1"')
        elif 'protocol_version: "2.0"' in content:
             content = content.replace('protocol_version: "2.0"', 'protocol_version: "2.1"\nbundle_version: "2.1"')
        else:
             fm_match = re.match(r'^(---.*?---)', content, re.DOTALL)
             if fm_match:
                 fm = fm_match.group(1)
                 new_fm = fm[:-3] + 'bundle_version: "2.1"\n---'
                 content = content.replace(fm, new_fm, 1)
        print(f"  - Added bundle_version to {filepath}")

    # 3. Fix Headers (Ensure ## Pregunta X)
    content = re.sub(r'^# Pregunta (\d+)', r'## Pregunta \1', content, flags=re.MULTILINE)
    content = re.sub(r'^### Pregunta (\d+)', r'## Pregunta \1', content, flags=re.MULTILINE)
    print(f"  - Normalized headers in {filepath}")

    # 4. Add Metadata Table if missing
    if "# === METADATA GLOBAL === " not in content and "# === METADATA GLOBAL ===" not in content:
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
    print("🔧 Starting Grade 11 Socials Fix...")
    files = glob.glob(os.path.join(DIR_TO_FIX, "*.md"))
    for file_path in files:
        rel_path = os.path.relpath(file_path, os.getcwd())
        fix_file(rel_path)
    print("🏁 Done.")

if __name__ == "__main__":
    main()
