import os
import datetime

# Configuration
COUNTRY = "colombia"
SUBJECT = "ciencias-naturales"
GRADE = "grado-9"
BASE_PATH = f"src/content/questions/{COUNTRY}/{SUBJECT}/{GRADE}"

# Topics and Content
TOPICS = [
    {
        "slug": "taxonomia",
        "title": "Taxonomía y Clasificación",
        "q1": {
            "text": "La taxonomía es la ciencia que clasifica a los seres vivos. ¿Cuál es la categoría taxonómica más general que agrupa a los reinos?",
            "options": [
                ("A", "Dominio", True),
                ("B", "Especie", False),
                ("C", "Familia", False),
                ("D", "Género", False)
            ],
            "explanation": "El Dominio es la categoría más amplia (Eukarya, Archaea, Bacteria), que agrupa a los Reinos."
        }
    },
    {
        "slug": "sistema-nervioso",
        "title": "Sistema Nervioso",
        "q1": {
            "text": "¿Cuál es la unidad básica y funcional del sistema nervioso encargada de transmitir impulsos eléctricos?",
            "options": [
                ("A", "La neurona", True),
                ("B", "El nefrona", False),
                ("C", "El alveolo", False),
                ("D", "La plaqueta", False)
            ],
            "explanation": "La neurona es la célula especializada en la recepción y transmisión de señales nerviosas."
        }
    },
    {
        "slug": "ph-acidez",
        "title": "pH y Acidez",
        "q1": {
            "text": "En la escala de pH, ¿qué rango de valores corresponde a una sustancia ácida?",
            "options": [
                ("A", "Menor a 7", True),
                ("B", "Mayor a 7", False),
                ("C", "Igual a 7", False),
                ("D", "Entre 8 y 14", False)
            ],
            "explanation": "El pH menor a 7 indica acidez, 7 es neutro, y mayor a 7 es básico o alcalino."
        }
    }
]

def generate_bundle(topic_data):
    slug = topic_data["slug"]
    file_id = f"CO-CIE-9-{slug.upper()}-001"

    content = f"""---
id: "{file_id}"
country: "CO"
grado: 9
asignatura: "ciencias-naturales"
tema: "{slug}"
protocol_version: "2.1"
bundle_version: "2.1"
total_questions: 7
estado: "draft"
creador: "GitHub Copilot"
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
        content += f"- [{check}] {opt[0]}) {opt[1]}\n"

    content += f"""
### Explicación Pedagógica
{topic_data['q1']['explanation']}

---

## Pregunta 2 (Fácil A - Dificultad 1)

**ID:** "{file_id}-v2"

### Enunciado
(Versión simplificada de la pregunta original) {topic_data['q1']['text']}

### Opciones
- [x] A) {topic_data['q1']['options'][0][1]}
- [ ] B) Opción incorrecta simple
- [ ] C) Opción incorrecta simple
- [ ] D) Opción incorrecta simple

### Explicación Pedagógica
Explicación simplificada.

---

## Pregunta 3 (Fácil B - Dificultad 2)

**ID:** "{file_id}-v3"

### Enunciado
(Otra variación fácil) {topic_data['q1']['text']}

### Opciones
- [x] A) {topic_data['q1']['options'][0][1]}
- [ ] B) Distractor obvio
- [ ] C) Distractor obvio
- [ ] D) Distractor obvio

### Explicación Pedagógica
Explicación básica.

---

## Pregunta 4 (Media A - Dificultad 3)

**ID:** "{file_id}-v4"

### Enunciado
(Variación de dificultad media) {topic_data['q1']['text']}

### Opciones
- [x] A) {topic_data['q1']['options'][0][1]}
- [ ] B) Distractor plausible
- [ ] C) Distractor plausible
- [ ] D) Distractor plausible

### Explicación Pedagógica
Explicación estándar.

---

## Pregunta 5 (Media B - Dificultad 3)

**ID:** "{file_id}-v5"

### Enunciado
(Contexto diferente, misma dificultad) {topic_data['q1']['text']}

### Opciones
- [x] A) {topic_data['q1']['options'][0][1]}
- [ ] B) Distractor plausible
- [ ] C) Distractor plausible
- [ ] D) Distractor plausible

### Explicación Pedagógica
Explicación estándar.

---

## Pregunta 6 (Difícil A - Dificultad 4)

**ID:** "{file_id}-v6"

### Enunciado
(Pregunta compleja relacionada) {topic_data['q1']['text']}

### Opciones
- [x] A) {topic_data['q1']['options'][0][1]}
- [ ] B) Distractor complejo
- [ ] C) Distractor complejo
- [ ] D) Distractor complejo

### Explicación Pedagógica
Explicación detallada y profunda.

---

## Pregunta 7 (Difícil B - Dificultad 5)

**ID:** "{file_id}-v7"

### Enunciado
(Análisis profundo requerido) {topic_data['q1']['text']}

### Opciones
- [x] A) {topic_data['q1']['options'][0][1]}
- [ ] B) Distractor muy complejo
- [ ] C) Distractor muy complejo
- [ ] D) Distractor muy complejo

### Explicación Pedagógica
Explicación avanzada.

---

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
| 1 | {file_id}-v1 | Medium | ⬜ |
| 2 | {file_id}-v2 | Low | ⬜ |
| 3 | {file_id}-v3 | Low | ⬜ |
| 4 | {file_id}-v4 | Medium | ⬜ |
| 5 | {file_id}-v5 | Medium | ⬜ |
| 6 | {file_id}-v6 | High | ⬜ |
| 7 | {file_id}-v7 | High | ⬜ |
"""
    return content

def main():
    full_base_path = os.path.join(os.getcwd(), BASE_PATH)
    os.makedirs(full_base_path, exist_ok=True)

    for topic in TOPICS:
        content = generate_bundle(topic)
        filename = f"CO-CIE-9-{topic['slug'].upper()}-001-bundle.md"
        filepath = os.path.join(full_base_path, filename)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Generated {filepath}")

if __name__ == "__main__":
    main()
