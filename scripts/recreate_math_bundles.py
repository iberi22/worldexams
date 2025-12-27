import os

def create_bundle(bundle_id, tema, subtemas, asignatura="Matemáticas", grado=11):
    path = f"e:/scripts-python/worldexams/src/content/questions/colombia/{asignatura.lower().replace('á', 'a')}/grado-{grado}/{bundle_id}-bundle.md"
    os.makedirs(os.path.dirname(path), exist_ok=True)

    content = f"""---
id: "{bundle_id}"
country: "co"
grado: {grado}
asignatura: "{asignatura}"
tema: "{tema}"
protocol_version: "2.1"
bundle_version: "2.1"
total_questions: 7
difficulty_distribution: "1 original (Medium) + 2 Low + 2 Medium + 2 High"
estado: "review"
creador: "Antigravity-Agent"
generation_date: "2025-12-27"
source_url: "https://www.icfes.gov.co"
source_license: "CC BY-SA 4.0"
---

# Pregunta Base: {tema}

> **Contexto:** {', '.join(subtemas)}

## Pregunta 1 (Original - Dificultad 3)
**ID:** "{bundle_id}-v1"

### Enunciado
[Pregunta base sobre {tema}]

### Opciones
- [x] A) [Correcta]
- [ ] B) [Distractor]
- [ ] C) [Distractor]
- [ ] D) [Distractor]

### Explicación Pedagógica
[Explicación detallada]

---

## Pregunta 2-7
[Variantes pedagógicas generadas incrementalmente]
"""
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {bundle_id}")

if __name__ == "__main__":
    # This is just a helper, I will actually write the content directly for quality
    pass
