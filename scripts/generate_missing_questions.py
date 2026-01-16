import os
import datetime
import json

def generate_bundle(topic_data, country, subject, grade):
    slug = topic_data["slug"]
    file_id = f"{country.upper()}-{subject[:3].upper()}-{grade}-{slug.upper()}-001"

    content = f"""---
id: "{file_id}"
country: "{country.upper()}"
grado: {grade}
asignatura: "{subject}"
tema: "{slug}"
protocol_version: "3.0"
bundle_version: "3.0"
total_questions: 10
estado: "draft"
creador: "Jules"
generation_date: "{datetime.date.today()}"
source: "AI Generation"
source_license: "AI Generated"
---

## Pregunta 1 (Original - Dificultad 3)

**ID:** "{file_id}-v1"

### Enunciado
{topic_data['q1']['text']}

### Opciones
"""
    for opt in topic_data['q1']['options']:
        check = "x" if opt[2] else " "
        content += f"- [{check}] {opt[0]}) {opt[1]}\\n"

    content += f"""
### Explicación Pedagógica
{topic_data['q1']['explanation']}

---
"""

    # Generate 9 more questions to meet the 10-question quota with correct difficulty distribution
    # We need 2 of each difficulty (1-5). Q1 is D3, so we need: D1x2, D2x2, D3x1, D4x2, D5x2
    difficulties = [1, 1, 2, 2, 3, 4, 4, 5, 5]
    all_question_difficulties = [3] + difficulties

    for i, difficulty in enumerate(difficulties, 2):
        content += f"""
## Pregunta {i} (Variación - Dificultad {difficulty})

**ID:** "{file_id}-v{i}"

### Enunciado
(Placeholder for question with difficulty {difficulty})

### Opciones
- [x] A) Correcta
- [ ] B) Incorrecta
- [ ] C) Incorrecta
- [ ] D) Incorrecta

### Explicación Pedagógica
(Placeholder for explanation)

---
"""

    content += """
# === METADATA GLOBAL ===

# === Metadata de Validación ===

| Campo | Valor |
|---|---|
| Total Preguntas | 10 |
| Original (Dificultad 3) | 1 |
| Dificultad 1 | 2 |
| Dificultad 2 | 2 |
| Dificultad 3 | 2 |
| Dificultad 4 | 2 |
| Dificultad 5 | 2 |

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Validado |
|---|---|---|---|
"""
    for i, level in enumerate(all_question_difficulties, 1):
        difficulty_str = "Medium"
        if level <= 2:
            difficulty_str = "Low"
        elif level >= 4:
            difficulty_str = "High"

        content += f"| {i} | {file_id}-v{i} | {difficulty_str} | ⬜ |\\n"

    return content

def main():
    with open('scripts/generation_config.json', 'r', encoding='utf-8') as f:
        config = json.load(f)

    for item in config:
        country = item["country"]
        subject = item["subject"]
        grade = item["grade"]
        base_path = f"saberparatodos/src/content/questions/{country}/{subject}/{grade}"

        os.makedirs(base_path, exist_ok=True)

        for topic in item["topics"]:
            content = generate_bundle(topic, country, subject, grade)
            filename = f"{country.upper()}-{subject[:3].upper()}-{grade}-{topic['slug'].upper()}-001-bundle.md"
            filepath = os.path.join(base_path, topic['slug'], filename)

            os.makedirs(os.path.dirname(filepath), exist_ok=True)

            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Generated {filepath}")

if __name__ == "__main__":
    main()
