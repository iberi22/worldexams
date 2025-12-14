import os
import re

# Configuration
FILES_TO_FIX = [
    r"src/content/questions/colombia/ingles/grado-11/CO-ING-11-part2-001-bundle.md",
    r"src/content/questions/colombia/ingles/grado-11/CO-ING-11-part3-001-bundle.md"
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

    # 1. Extract the first frontmatter
    first_fm_match = re.match(r'^(---.*?---)', content, re.DOTALL)
    if not first_fm_match:
        print(f"❌ No frontmatter found in {filepath}")
        return

    frontmatter = first_fm_match.group(1)
    body = content[len(frontmatter):]

    # 2. Remove garbage frontmatters from body
    # Look for --- followed by id: "..." and ending with ---
    # We use a regex that matches --- followed by newlines and keys, ending with ---
    # The garbage blocks seem to start with ---, newline, id: ...
    body = re.sub(r'---\s+id: ".*?".*?---', '', body, flags=re.DOTALL)

    # 3. Clean up extra newlines
    body = re.sub(r'\n{3,}', '\n\n', body)

    # 4. Ensure bundle_version in frontmatter
    if 'bundle_version: "2.1"' not in frontmatter:
        if 'bundle_version:' in frontmatter:
            frontmatter = re.sub(r'bundle_version: ".*?"', 'bundle_version: "2.1"', frontmatter)
        else:
            frontmatter = frontmatter.replace('---', 'bundle_version: "2.1"\n---', 1) # Replace the LAST --- of the first block? No, the first match includes the closing ---
            # Actually, replace the closing ---
            frontmatter = frontmatter[:-3] + 'bundle_version: "2.1"\n---'

    # 5. Reassemble
    new_content = frontmatter + body

    # 6. Add Metadata Table if missing
    if "# === METADATA GLOBAL === " not in new_content and "# === METADATA GLOBAL ===" not in new_content:
        # Extract ID for the table
        match = re.search(r'id: "(.*?)"', frontmatter)
        if match:
            file_id = match.group(1)
            metadata_section = METADATA_TEMPLATE.format(id=file_id)
            new_content += metadata_section.strip()
            print(f"  - Added Metadata Table to {filepath}")
        else:
            print(f"  ❌ Could not find ID in {filepath}")

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"✅ Fixed {filepath}")

def main():
    print("🔧 Starting Grade 11 English Fix...")
    for file_path in FILES_TO_FIX:
        fix_file(file_path)
    print("🏁 Done.")

if __name__ == "__main__":
    main()
