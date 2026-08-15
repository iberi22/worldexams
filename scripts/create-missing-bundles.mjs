import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const subjects = [
  { folder: 'lectura-critica', code: 'LEC', name: 'lectura_critica' },
  { folder: 'ciencias-naturales', code: 'CIE', name: 'ciencias_naturales' },
  { folder: 'sociales-ciudadanas', code: 'SOC', name: 'sociales_y_ciudadanas' }
];

subjects.forEach(subj => {
  const dirPath = path.join(__dirname, `../questions_data/colombia/${subj.folder}/grado-11/2026/weekly/`);
  fs.mkdirSync(dirPath, { recursive: true });

  const bundlePath = path.join(dirPath, `CO-${subj.code}-11-2026-W01-test-001-MASTERY-bundle.md`);
  
  let content = `---
id: "CO-${subj.code}-11-2026-W01-test-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "${subj.name}"
tema: "test"
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
creador: "Jules-Agent"
---

# Bundle MASTERY: Test - Grado 11

Este bundle contiene 20 preguntas sobre **test** para grado 11,
alineadas con los DBA y Estándares Básicos de Competencias del MEN Colombia.
`;

  for (let i = 1; i <= 20; i++) {
    let dBand = "[D3-D4]";
    if (i > 4 && i <= 10) dBand = "[D5-D6]";
    if (i > 10 && i <= 16) dBand = "[D7-D8]";
    if (i > 16) dBand = "[D9-D10]";

    content += `
## Question ${i} ${dBand}
**ID:** CO-${subj.code}-11-2026-W01-test-001-MASTERY-bundle-v${i}
**Bloom:** Remember
**ICFES:** General
**Expected_Success:** 0.80
**Contexto:** Escenario de prueba.

### Enunciado
Pregunta de prueba ${i} para ${subj.name}

### Opciones
- [x] A) Respuesta correcta
  <!-- feedback: Es correcta. -->
- [ ] B) Incorrecta 1
  <!-- feedback: Es incorrecta. -->
- [ ] C) Incorrecta 2
  <!-- feedback: Es incorrecta. -->
- [ ] D) Incorrecta 3
  <!-- feedback: Es incorrecta. -->

### Explicacion Pedagogica
Explicación detallada de la pregunta ${i}.
`;
  }

  fs.writeFileSync(bundlePath, content, 'utf8');
  console.log("Bundle created successfully at", bundlePath);
});
