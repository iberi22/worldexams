#!/usr/bin/env python3
"""
Generación de Paquetes Rotativos de Preguntas (API v1)
======================================================
Implementa la estrategia de "Rotating Question Packs" para seguridad.

Lógica:
1. Calcula la semana actual (pack_id: YYYY-wWW).
2. Lee todas las preguntas de saberparatodos/src/content/questions/
3. Usa un seed determinístico (pack_id + grade + subject) para mezclar.
4. Selecciona 100 preguntas por asignatura/grado.
5. Genera jsons estáticos den api/v1/

Documentación: docs/ROTATING_QUESTION_PACKS.md
"""

import os
import json
import random
import hashlib
import datetime
import shutil
from pathlib import Path
from typing import List, Dict, Any

# Configuración
QUESTIONS_PER_PACK = 100
ROTATION_DAYS = 5
BASE_CONTENT_DIR = Path("saberparatodos/src/content/questions/colombia")
OUTPUT_API_DIR = Path("saberparatodos/public/api/v1/co/icfes")

GRADES = [3, 5, 7, 9, 11]

# Mapeo de asignaturas normalizadas
SUBJECT_MAPPING = {
    "matematicas": "matematicas",
    "ciencias-naturales": "ciencias_naturales",
    "sociales-ciudadanas": "sociales_y_ciudadanas",
    "lectura-critica": "lectura_critica",
    "ingles": "ingles",
    "filosofia": "filosofia", # Add missing subjects if any
    "tecnologia-informatica": "tecnologia" # Add missing subjects if any
}

def get_current_pack_id() -> str:
    """Calcula el ID del paquete basado en la semana del año."""
    today = datetime.date.today()
    year, week, _ = today.isocalendar()
    return f"{year}-w{week:02d}"

def get_next_rotation_date() -> str:
    """Calcula la fecha de la próxima rotación (aprox)."""
    today = datetime.date.today()
    # Simple logic: next Monday
    days_ahead = 7 - today.weekday()
    if days_ahead <= 0: days_ahead += 7
    next_monday = today + datetime.timedelta(days_ahead)
    return next_monday.isoformat()

def seeded_shuffle(items: List[Any], seed: str) -> List[Any]:
    """Mezcla una lista de manera determinística usando un seed."""
    # Convert seed string to integer
    hash_obj = hashlib.sha256(seed.encode('utf-8'))
    seed_int = int(hash_obj.hexdigest(), 16) % (2**32)

    rng = random.Random(seed_int)
    shuffled = items.copy()
    rng.shuffle(shuffled)
    return shuffled

def parse_bundle(file_path: Path) -> List[Dict[str, Any]]:
    """Lee un bundle MD y extrae las preguntas en formato JSON simple."""
    try:
        content = file_path.read_text(encoding='utf-8')
        if "---" not in content: return []

        # Parse frontmatter roughly
        frontmatter_raw = content.split("---")[1]
        metadata = {}
        for line in frontmatter_raw.split("\n"):
            if ":" in line:
                key, val = line.split(":", 1)
                metadata[key.strip()] = val.strip().strip('"\'')

        # Extract questions via Regex
        questions = []
        # Pattern to capture question blocks.
        # We also capture the header to extract difficulty
        headers = re.findall(r'## (Pregunta \d+.*)', content)
        chunks = re.split(r'## Pregunta \d+.*', content)[1:]

        for i, chunk in enumerate(chunks):
            header = headers[i] if i < len(headers) else ""
            q_data = {
                "id": f"{metadata.get('id', 'unk')}-v{i+1}",
                "difficulty": 3, # Default
                "statement": "",
                "options": [],
                "explanation": ""
            }

            # Extract Difficulty from Header
            # Format: ## Pregunta 1 (Muy Fácil A - Dificultad 1)
            diff_match = re.search(r'Dificultad\s*(\d)', header, re.IGNORECASE)
            if diff_match:
                q_data["difficulty"] = int(diff_match.group(1))
            else:
                # Heuristic mapping for common names if explicit difficulty missing
                lower_header = header.lower()
                if "muy fácil" in lower_header or "very easy" in lower_header: q_data["difficulty"] = 1
                elif "fácil" in lower_header or "easy" in lower_header or "low" in lower_header: q_data["difficulty"] = 2
                elif "media" in lower_header or "medium" in lower_header: q_data["difficulty"] = 3
                elif "difícil" in lower_header or "hard" in lower_header or "high" in lower_header: q_data["difficulty"] = 4
                if "muy difícil" in lower_header or "very hard" in lower_header: q_data["difficulty"] = 5

            # Extract Statement
            if "### Enunciado" in chunk:
                parts = chunk.split("### Enunciado")[1].split("### Opciones")[0]
                q_data["statement"] = parts.strip()

            # Extract Options
            if "### Opciones" in chunk:
                parts = chunk.split("### Opciones")[1]
                opts_part = parts.split("### Explicación")[0] if "### Explicación" in parts else parts
                options = []
                for line in opts_part.strip().split("\n"):
                    if "- [" in line:
                        is_correct = "- [x]" in line or "- [X]" in line
                        # Extract the option text: - [ ] A) Text
                        text_match = re.search(r'\]\s*[A-Z]\)\s*(.*)', line)
                        text = text_match.group(1).strip() if text_match else line.split("]")[1].strip()
                        options.append({"text": text, "is_correct": is_correct})
                q_data["options"] = options

            # Extract Explanation
            if "### Explicación" in chunk:
                # Support both "Explicación" and "Explicación Pedagógica"
                expl_part = chunk.split("### Explicación")[1].split("---")[0]
                # Clean up if it had "Pedagógica" in the split
                if expl_part.startswith(" Pedagógica"):
                    expl_part = expl_part[11:]
                q_data["explanation"] = expl_part.strip()

            if q_data["statement"] and q_data["options"]:
                questions.append(q_data)

        return questions

    except Exception as e:
        print(f"Error parsing {file_path.name}: {e}")
        return []

import re

def main():
    print("🔄 Generating Rotating Question Packs...")

    pack_id = get_current_pack_id()
    print(f"📦 Pack ID: {pack_id}")

    # Clean output dir
    # if OUTPUT_API_DIR.exists():
    #     shutil.rmtree(OUTPUT_API_DIR)
    OUTPUT_API_DIR.mkdir(parents=True, exist_ok=True)

    total_questions_exported = 0
    subjects_processed = set()

    for grade in GRADES:
        grade_dir = BASE_CONTENT_DIR
        # Finding subject dirs
        if not grade_dir.exists():
            print(f"⚠️ Content dir not found: {grade_dir}")
            continue

        for subject_path in grade_dir.iterdir():
            if not subject_path.is_dir(): continue

            subject_name = subject_path.name
            api_subject = SUBJECT_MAPPING.get(subject_name, subject_name.replace("-", "_"))

            # Look for grade folder inside subject (e.g. matematicas/grado-11)
            grade_sub_dir = subject_path / f"grado-{grade}"
            if not grade_sub_dir.exists():
                continue

            print(f"  Processing {subject_name} Grade {grade}...")

            # Collect all questions for this Subject/Grade
            all_questions = []
            for bundle_file in grade_sub_dir.rglob("*-bundle.md"):
                questions = parse_bundle(bundle_file)
                all_questions.extend(questions)

            if not all_questions:
                print(f"    No questions found.")
                continue

            # Shuffle and limit
            seed = f"{pack_id}-{grade}-{api_subject}"
            shuffled = seeded_shuffle(all_questions, seed)
            selected = shuffled[:QUESTIONS_PER_PACK]

            # Save Pack
            output_path = OUTPUT_API_DIR / str(grade) / api_subject
            output_path.mkdir(parents=True, exist_ok=True)

            pack_file = output_path / f"pack-{pack_id}.json"
            pack_data = {
                "pack_id": pack_id,
                "grade": grade,
                "subject": api_subject,
                "total": len(selected),
                "questions": selected
            }

            with open(pack_file, "w", encoding="utf-8") as f:
                json.dump(pack_data, f, indent=2, ensure_ascii=False)

            print(f"    ✅ Generated {pack_file} ({len(selected)} qs)")
            total_questions_exported += len(selected)
            subjects_processed.add(api_subject)

    # Generate Current Pack Metadata
    meta_file = OUTPUT_API_DIR / "current-pack.json"
    metadata = {
        "pack_id": pack_id,
        "generated_at": datetime.datetime.utcnow().isoformat() + "Z",
        "next_rotation": get_next_rotation_date(),
        "total_questions": total_questions_exported,
        "subjects": list(subjects_processed)
    }

    with open(meta_file, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

    print(f"\n🎉 Done! Total exposed questions: {total_questions_exported}")

if __name__ == "__main__":
    main()
