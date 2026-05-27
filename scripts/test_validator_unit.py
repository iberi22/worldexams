
import sys
from pathlib import Path
from bundle_validator import BundleValidator

def test_validator():
    # Create a valid dummy bundle that meets Protocol v5.1 Mastery requirements
    questions = []
    # 4x D3-D4, 6x D5-D6, 6x D7-D8, 4x D9-D10
    difficulties = ["D3-D4"]*4 + ["D5-D6"]*6 + ["D7-D8"]*6 + ["D9-D10"]*4

    for i, diff in enumerate(difficulties, 1):
        q = f"""
## Question {i} [{diff}]

**ID:** `CO-MAT-11-P1-test-001-v{i}`
**Bloom:** Remember
**ICFES:** Competencia 1
**Expected_Success:** 0.8
**Context:** Contexto de prueba.

### Enunciado
Pregunta de prueba {i}?

### Options
- [x] A) Correcta <!-- feedback: Correcto -->
- [ ] B) Incorrecta <!-- feedback: Mal -->
- [ ] C) Otra <!-- feedback: Mal -->
- [ ] D) Final <!-- feedback: Mal -->

### Explicación Pedagógica
Explicación.
"""
        questions.append(q)

    content = f"""---
id: "CO-MAT-11-P1-test-001-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "test"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
---
{"".join(questions)}
"""
    test_file = Path("test_bundle_mastery.md")
    test_file.write_text(content, encoding="utf-8")

    validator = BundleValidator()
    result = validator.validate_file("test_bundle_mastery.md")

    print(f"Valid: {result.valid}")
    for issue in result.issues:
        print(f"Issue: {issue.message}")
    for warn in result.warnings:
        print(f"Warning: {warn}")

    test_file.unlink()

    if not result.valid:
        print("Test FAILED")
        sys.exit(1)

    print("Test passed!")

if __name__ == "__main__":
    test_validator()
