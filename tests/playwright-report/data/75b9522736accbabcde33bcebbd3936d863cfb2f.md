# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: exam-creation-matrix.prod.test.ts >> Production exam creation matrix >> UI can start period exam for grade 11 Matemáticas
- Location: exam-creation-matrix.prod.test.ts:92:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('exam-shell')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('exam-shell')

```

```yaml
- main:
  - alert:
    - text: 💾
    - heading "Modo Local" [level=4]
    - button "Cerrar":
      - img
    - paragraph:
      - text: Tu progreso se guarda actualmente en el navegador durante las pruebas privadas. El registro e inicio de sesión en la nube permanecerán desactivados hasta el lanzamiento oficial, mientras que el flujo local sigue disponible bajo los
      - link "términos":
        - /url: /terminos
      - text: .
    - button "Entendido"
  - button "SaberParaTodos"
  - link "Guia":
    - /url: /guia-examen
  - button "Mi Perfil Offline":
    - img
  - button "Ver Historial Local":
    - img
  - main:
    - text: 🇨🇴 Colombia
    - paragraph: "Beta abierta :: v0.15.2"
    - heading "Saber Para Todos" [level=1]
    - paragraph: Interfaz preparatoria avanzada para pruebas estandarizadas. Entorno minimalista optimizado para enfoque y eficiencia.
    - img
    - text: 4000+ preguntas Banco Dinámico
    - paragraph: Las preguntas rotan semanalmente.
    - paragraph:
      - strong: "💡 Tip:"
      - text: Si no borras la app, acumularás todas las preguntas en tu dispositivo
      - strong: GRATIS
      - text: .
    - text: ICFES Saber · Colombia
    - img
    - text: 6 areas
    - img
    - text: 100% gratis
    - button "📅 3er Periodo Cierra en 28 días Saber 3°, 5°, 7°, 9° Faltan 61 días 🎓"
    - heading "Examenes tipo saber" [level=3]
    - button "SaberParaTodos Ingles Diagnostico Niveles A1 a B2+ · Evalua tu nivel real Sala ✓ Diagnostico multinivel":
      - img "SaberParaTodos"
      - text: Ingles Diagnostico Niveles A1 a B2+ · Evalua tu nivel real Sala ✓ Diagnostico multinivel
      - img
    - button "11° Grado Ruta principal"
    - button "9° Grado"
    - button "7° Grado"
    - button "5° Grado"
    - button "Ver más exámenes y Preuniversitario"
    - button "Revisar Banco social · discutir preguntas":
      - heading "Revisar" [level=3]
      - paragraph: Banco social · discutir preguntas
    - link "Guía Completa ICFES":
      - /url: /guia-examen
      - img
      - text: Guía Completa ICFES
    - paragraph: Conoce la estructura del examen y tips de estudio
    - text: 🇨🇴 © 2026 World Exams
  - heading "Configurar Examen" [level=2]
  - heading "📚 Configuración del Examen" [level=3]
  - text: Grado 11° Materia
  - combobox:
    - option "Simulacro Completo"
    - option "Matemáticas" [selected]
    - option "Lectura Crítica"
    - option "Ciencias Naturales"
    - option "Sociales y Ciudadanas"
    - option "Inglés"
    - option "Preuniversitario"
  - text: Modo de Examen
  - button "ICFES"
  - button "Por Periodo"
  - button "Periodo 1 Fundamentos y Funciones"
  - button "Periodo 2 Cálculo Diferencial"
  - button "Periodo 3 Cálculo Integral y Geometría"
  - button "Periodo 4 Probabilidad y Preparación Saber 11"
  - text: 🏛️
  - paragraph:
    - strong: Lineamientos de ICFES
    - text: Los periodos están alineados con los DBA (Derechos Básicos de Aprendizaje) vigentes. Selecciona el periodo actual de tu colegio.
  - button "Ver lineamientos MEN 2026": "?"
  - text: Cantidad de Preguntas
  - button "5"
  - button "10"
  - button "15"
  - button "30"
  - button "60"
  - switch [disabled]
  - heading "👥 Sala de Exámenes Requiere Login" [level=4]
  - text: DESACTIVADA
  - img
  - switch [disabled]
  - heading "Panel de Diagnóstico DESACTIVADO" [level=4]
  - paragraph: Detecta vacíos fundamentales con preguntas de grados anteriores.
  - paragraph: Inicia sesión para activar el modo diagnóstico y la mezcla de grados.
  - button "Cancelar"
  - button "Comenzar"
```

# Test source

```ts
  19  |   { grade: 11, subjectLabel: "Ciencias Naturales", periodLabel: /Periodo 1/i },
  20  | ];
  21  | 
  22  | describe("Production exam creation matrix", () => {
  23  |   test.describe.configure({ mode: "serial" });
  24  | 
  25  |   it("site root is healthy", async ({ page, browserName }) => {
  26  |     test.skip(browserName !== "chromium", "UI smoke runs only in chromium.");
  27  | 
  28  |     await page.addInitScript(() => {
  29  |       localStorage.setItem("spt_hide_hero", "true");
  30  |     });
  31  | 
  32  |     const response = await page.goto(siteBaseUrl, { waitUntil: "domcontentloaded" });
  33  |     expect(response?.status()).toBe(200);
  34  |     await expect(page.locator("body")).toContainText(/Domina el ICFES|Configurar Examen|SaberParaTodos/i);
  35  |   });
  36  | 
  37  |   for (const combo of examMatrix) {
  38  |     it(`API combo G${combo.grade} ${combo.subject} returns guest questions`, async ({ request, browserName }) => {
  39  |       test.skip(browserName !== "chromium", "Matrix runs once in chromium to keep production smoke bounded.");
  40  | 
  41  |       const response = await request.get(`${apiBaseUrl}/v1/questions`, {
  42  |         params: {
  43  |           country: "co",
  44  |           exam: "icfes",
  45  |           grade: String(combo.grade),
  46  |           subject: combo.subject,
  47  |           page: "1",
  48  |         },
  49  |       });
  50  | 
  51  |       expect(response.status()).toBe(200);
  52  |       const body = await response.json();
  53  |       expect(body.success).toBe(true);
  54  |       expect(body.is_guest).toBe(true);
  55  |       expect(Array.isArray(body.questions)).toBe(true);
  56  |       expect(body.questions.length).toBeGreaterThan(0);
  57  |       expect(body.questions.length).toBeLessThanOrEqual(10);
  58  |     });
  59  | 
  60  |     it(`same-origin proxy combo G${combo.grade} ${combo.subject} returns guest questions`, async ({ request, browserName }) => {
  61  |       test.skip(browserName !== "chromium", "Matrix runs once in chromium to keep production smoke bounded.");
  62  | 
  63  |       const response = await request.get(`${siteBaseUrl}/api/questions`, {
  64  |         params: {
  65  |           country: "co",
  66  |           exam: "icfes",
  67  |           grade: String(combo.grade),
  68  |           subject: combo.subject,
  69  |           page: "1",
  70  |         },
  71  |       });
  72  | 
  73  |       expect(response.status()).toBe(200);
  74  |       const body = await response.json();
  75  |       expect(body.success).toBe(true);
  76  |       expect(Array.isArray(body.questions)).toBe(true);
  77  |       expect(body.questions.length).toBeGreaterThan(0);
  78  |     });
  79  |   }
  80  | 
  81  |   it("same-origin pack proxy supports HEAD for ciencias 11", async ({ request, browserName }) => {
  82  |     test.skip(browserName !== "chromium", "Matrix runs once in chromium to keep production smoke bounded.");
  83  | 
  84  |     const response = await request.fetch(`${siteBaseUrl}/api/packs/co-week-1-grade-11-subject-ciencias_naturales.json`, {
  85  |       method: "HEAD",
  86  |     });
  87  | 
  88  |     expect(response.status()).toBe(200);
  89  |   });
  90  | 
  91  |   for (const combo of periodUiMatrix) {
  92  |     it(`UI can start period exam for grade ${combo.grade} ${combo.subjectLabel}`, async ({ page, browserName }) => {
  93  |       test.skip(browserName !== "chromium", "UI smoke runs only in chromium.");
  94  | 
  95  |       await page.addInitScript(() => {
  96  |         localStorage.setItem("spt_hide_hero", "true");
  97  |       });
  98  | 
  99  |       const query = new URLSearchParams({
  100 |         grade: String(combo.grade),
  101 |         subject: combo.subjectLabel,
  102 |       });
  103 | 
  104 |       await page.goto(`${siteBaseUrl}/?${query.toString()}`, { waitUntil: "domcontentloaded" });
  105 | 
  106 |       const modal = page.getByTestId("modal-content");
  107 |       await expect(modal).toBeVisible({ timeout: 15000 });
  108 | 
  109 |       page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  110 |       page.on('dialog', dialog => {
  111 |         console.log('BROWSER DIALOG:', dialog.type(), dialog.message());
  112 |         dialog.accept();
  113 |       });
  114 | 
  115 |       await page.getByRole("button", { name: /Por Periodo/i }).click();
  116 |       await page.getByRole("button", { name: combo.periodLabel }).first().click();
  117 |       await page.getByRole("button", { name: /^Comenzar$/i }).click();
  118 | 
> 119 |       await expect(page.getByTestId("exam-shell")).toBeVisible({ timeout: 20000 });
      |                                                    ^ Error: expect(locator).toBeVisible() failed
  120 |       await expect(page.getByTestId("options-grid")).toBeVisible({ timeout: 20000 });
  121 |     });
  122 |   }
  123 | });
  124 | 
```