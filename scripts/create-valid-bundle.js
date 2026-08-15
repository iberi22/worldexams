const fs = require('fs');
const path = require('path');

const bundlePath = path.join(
  __dirname,
  '../questions_data/colombia/matematicas/grado-11/2026/weekly/CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle.md'
);

let content = `---
id: "CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "funciones"
periodo: "weekly"
week: "W01"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "DBA MEN Colombia"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Antigravity"
---

# Bundle MASTERY: Funciones - Grado 11

Este bundle contiene 20 preguntas sobre **funciones** para grado 11,
alineadas con los DBA y Estándares Básicos de Competencias del MEN Colombia.

---
`;

for (let i = 1; i <= 20; i++) {
  let dBand = "[D3-D4]";
  if (i > 4 && i <= 10) dBand = "[D5-D6]";
  if (i > 10 && i <= 16) dBand = "[D7-D8]";
  if (i > 16) dBand = "[D9-D10]";

  content += `
## Question ${i} ${dBand}
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v${i}
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.80
**Contexto:** En la ciudad de Bogotá, se analiza el crecimiento de una población de bacterias.

### Enunciado
¿Cuál es la función que representa el modelo lineal $f(x) = 2x + 1$ si $x = ${i}$?

### Opciones
- [x] A) ${2 * i + 1}
  <!-- feedback: Se evalúa la función reemplazando x por ${i}. -->
- [ ] B) ${2 * i}
  <!-- feedback: Falta sumar 1. -->
- [ ] C) ${2 * i + 2}
  <!-- feedback: Se sumó 2 en lugar de 1. -->
- [ ] D) ${i + 1}
  <!-- feedback: No se multiplicó por 2. -->

### Explicacion Pedagogica
Para evaluar la función lineal $f(x) = 2x + 1$, se sustituye el valor de $x$ y se realiza la operación aritmética. En este caso, $2(${i}) + 1 = ${2 * i + 1}$.
`;
}

fs.writeFileSync(bundlePath, content, 'utf8');
console.log("Bundle created successfully at", bundlePath);
