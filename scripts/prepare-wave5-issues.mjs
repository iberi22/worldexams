import fs from 'fs';
import path from 'path';

const issues = [
  {
    id: 'issue-01',
    title: '[Wave 5.02] test(e2e): Multi-Country Geo-Routing & Fallback Tenant Smoke Suite',
    labels: ['wave-5', 'jules', 'e2e-testing'],
    body: `# [Wave 5.02] test(e2e): Multi-Country Geo-Routing & Fallback Tenant Smoke Suite

> Wave 5 — QA & Testing Automation.
> Labels: \`wave-5\`, \`jules\`

---

## 📋 Context & Objective
WorldExams serves multiple Latin American countries, Spain, and Equatorial Guinea with dedicated tenant configurations. We need an end-to-end Playwright test verifying that country resolution via query parameter overrides (e.g., \`?country=mx\`, \`?country=ar\`, \`?country=cl\`) correctly sets tenant titles, exam authority badges, and subjects while cleanly falling back to Colombia (\`co\`) when unspecified.

## 🏝️ Disjoint File Island
- \`saberparatodos/tests/e2e/multi-country-routing.spec.ts\` [NEW]

## 🎯 Acceptance Criteria
- [ ] Create Playwright E2E test verifying query parameter tenant overrides (\`/?country=mx\`, \`/?country=ar\`, \`/?country=cl\`, \`/?country=pe\`).
- [ ] Verify that exam authority text matches the tenant config (e.g., "COMIPEMS / SEP" for MX, "Aprender" for AR, "PAES" for CL).
- [ ] Verify that navigating to \`/practica\` with country parameter loads country-specific subjects.
- [ ] Verify default fallback to Colombia when visiting \`/\` without query params.
- [ ] Test executes in headless mode with 0 failures: \`npx --prefix saberparatodos playwright test tests/e2e/multi-country-routing.spec.ts\`.

## 🧪 Verification Commands
\`\`\`bash
npx --prefix saberparatodos playwright test tests/e2e/multi-country-routing.spec.ts
\`\`\`
`
  },
  {
    id: 'issue-02',
    title: '[Wave 5.03] feat(questions-cl): Chile PAES Sciences & Math Wave Expansion (Weeks 11-20)',
    labels: ['wave-5', 'jules', 'curriculum-questions'],
    body: `# [Wave 5.03] feat(questions-cl): Chile PAES Sciences & Math Wave Expansion (Weeks 11-20)

> Wave 5 — Curriculum & Question Quality Expansion.
> Labels: \`wave-5\`, \`jules\`

---

## 📋 Context & Objective
Chile PAES (Prueba de Acceso a la Educación Superior) requires curriculum-aligned question bundles for Grade 11 across Ciencias Naturales (Biología, Física, Química) and Matemáticas (M1/M2) for weeks 11 through 20 under Protocol v4+.

## 🏝️ Disjoint File Island
- \`questions_data/chile/ciencias-naturales/grado-11/\` [NEW BUNDLES]
- \`questions_data/chile/matematicas/grado-11/\` [NEW BUNDLES]

## 🎯 Acceptance Criteria
- [ ] Add 10 markdown question bundles for \`questions_data/chile/ciencias-naturales/grado-11/\` (weeks 11 to 20).
- [ ] Add 10 markdown question bundles for \`questions_data/chile/matematicas/grado-11/\` (weeks 11 to 20).
- [ ] Each bundle must include valid YAML frontmatter (grade: 11, subject, period, protocol_version: 4).
- [ ] Each question must contain 4 options (A, B, C, D) with exactly one correct option and pedagogical explanation.
- [ ] Run validator: \`node scripts/validate-bundles-v52.mjs\` — 0 errors.

## 🧪 Verification Commands
\`\`\`bash
node scripts/validate-bundles-v52.mjs
\`\`\`
`
  },
  {
    id: 'issue-03',
    title: '[Wave 5.04] feat(questions-ar): Argentina Aprender Exam Humanities & Math Packs (Weeks 11-20)',
    labels: ['wave-5', 'jules', 'curriculum-questions'],
    body: `# [Wave 5.04] feat(questions-ar): Argentina Aprender Exam Humanities & Math Packs (Weeks 11-20)

> Wave 5 — Curriculum & Question Quality Expansion.
> Labels: \`wave-5\`, \`jules\`

---

## 📋 Context & Objective
Argentina Aprender evaluation requires curriculum-aligned question bundles for Grade 11 in Matemática and Ciencias Naturales for weeks 11 through 20 following Protocol v4+.

## 🏝️ Disjoint File Island
- \`questions_data/argentina/matematica/grado-11/\` [NEW BUNDLES]
- \`questions_data/argentina/ciencias-naturales/grado-11/\` [NEW BUNDLES]

## 🎯 Acceptance Criteria
- [ ] Add 10 markdown bundles for \`questions_data/argentina/matematica/grado-11/\` (weeks 11 to 20).
- [ ] Add 10 markdown bundles for \`questions_data/argentina/ciencias-naturales/grado-11/\` (weeks 11 to 20).
- [ ] Bundles must follow NAP (Núcleos de Aprendizajes Prioritarios) standard for secondary exit level.
- [ ] Each question must include thorough step-by-step resolution in Spanish.
- [ ] Validate content: \`node scripts/validate-bundles-v52.mjs\` — 0 errors.

## 🧪 Verification Commands
\`\`\`bash
node scripts/validate-bundles-v52.mjs
\`\`\`
`
  },
  {
    id: 'issue-04',
    title: '[Wave 5.05] feat(questions-br): Brasil ENEM Portuguese & Math Expansion (Weeks 11-20)',
    labels: ['wave-5', 'jules', 'curriculum-questions'],
    body: `# [Wave 5.05] feat(questions-br): Brasil ENEM Portuguese & Math Expansion (Weeks 11-20)

> Wave 5 — Curriculum & Question Quality Expansion.
> Labels: \`wave-5\`, \`jules\`

---

## 📋 Context & Objective
Brasil ENEM (Exame Nacional do Ensino Médio) requires high-quality question bundles in Portuguese and Mathematics for 3º Ano do Ensino Médio (Grade 11/12) for weeks 11 through 20.

## 🏝️ Disjoint File Island
- \`questions_data/brasil/matematica/grado-11/\` [NEW BUNDLES]
- \`questions_data/brasil/portugues/grado-11/\` [NEW BUNDLES]

## 🎯 Acceptance Criteria
- [ ] Add 10 markdown question bundles for \`questions_data/brasil/matematica/grado-11/\` (weeks 11 to 20).
- [ ] Add 10 markdown question bundles for \`questions_data/brasil/portugues/grado-11/\` (weeks 11 to 20).
- [ ] Enunciados and alternatives in Portuguese adhering to BNCC competencies.
- [ ] Each question contains clear pedagogical resolution.
- [ ] Validate content: \`node scripts/validate-bundles-v52.mjs\` — 0 errors.

## 🧪 Verification Commands
\`\`\`bash
node scripts/validate-bundles-v52.mjs
\`\`\`
`
  },
  {
    id: 'issue-05',
    title: '[Wave 5.06] feat(questions-mx): Mexico COMIPEMS & EXANI-II Natural Sciences Packs (Weeks 1-10)',
    labels: ['wave-5', 'jules', 'curriculum-questions'],
    body: `# [Wave 5.06] feat(questions-mx): Mexico COMIPEMS & EXANI-II Natural Sciences Packs (Weeks 1-10)

> Wave 5 — Curriculum & Question Quality Expansion.
> Labels: \`wave-5\`, \`jules\`

---

## 📋 Context & Objective
Mexico EXANI-II and COMIPEMS / Bachillerato exit evaluations require comprehensive Natural Sciences (Biología, Física, Química) packs for weeks 1 through 10 in Grade 11.

## 🏝️ Disjoint File Island
- \`questions_data/mexico/ciencias-naturales/grado-11/\` [NEW BUNDLES]

## 🎯 Acceptance Criteria
- [ ] Add 10 markdown question bundles in \`questions_data/mexico/ciencias-naturales/grado-11/\` (weeks 1 to 10).
- [ ] Curriculum coverage includes Biología celular, Mecánica clásica, Enlace químico y Termodinámica básica.
- [ ] Valid YAML frontmatter with \`grade: 11\`, \`subject: ciencias-naturales\`, \`protocol_version: 4\`.
- [ ] Full explanations for all options with distractor reasoning.
- [ ] Validate content: \`node scripts/validate-bundles-v52.mjs\` — 0 errors.

## 🧪 Verification Commands
\`\`\`bash
node scripts/validate-bundles-v52.mjs
\`\`\`
`
  },
  {
    id: 'issue-06',
    title: '[Wave 5.07] test(e2e): PWA Service Worker & Offline Cache Simulation Suite',
    labels: ['wave-5', 'jules', 'e2e-testing'],
    body: `# [Wave 5.07] test(e2e): PWA Service Worker & Offline Cache Simulation Suite

> Wave 5 — QA & Testing Automation.
> Labels: \`wave-5\`, \`jules\`

---

## 📋 Context & Objective
WorldExams is designed as an offline-first PWA. We need an end-to-end Playwright test validating that when the network is blocked (offline mode via \`page.route('**/*', ...)\`), previously cached pages and questions load cleanly from IndexedDB and Service Worker cache.

## 🏝️ Disjoint File Island
- \`saberparatodos/tests/e2e/pwa-offline-resilience.spec.ts\` [NEW]

## 🎯 Acceptance Criteria
- [ ] Create Playwright test that visits \`/ajustes/offline\` and seeds test question bundle in IndexedDB.
- [ ] Emulate network offline state by aborting external HTTP requests.
- [ ] Verify that navigating to \`/practica\` successfully retrieves cached questions from IndexedDB.
- [ ] Verify student can complete question selection without network errors.
- [ ] Test executes in headless mode with 0 failures: \`npx --prefix saberparatodos playwright test tests/e2e/pwa-offline-resilience.spec.ts\`.

## 🧪 Verification Commands
\`\`\`bash
npx --prefix saberparatodos playwright test tests/e2e/pwa-offline-resilience.spec.ts
\`\`\`
`
  },
  {
    id: 'issue-07',
    title: '[Wave 5.08] test(e2e): Exam Timer, Scoring & Local MMR Multiplier Validation Suite',
    labels: ['wave-5', 'jules', 'e2e-testing'],
    body: `# [Wave 5.08] test(e2e): Exam Timer, Scoring & Local MMR Multiplier Validation Suite

> Wave 5 — QA & Testing Automation.
> Labels: \`wave-5\`, \`jules\`

---

## 📋 Context & Objective
Validate the complete student exam lifecycle: timer countdown, question pagination, answer submission, score computation, and local MMR (Matchmaking Rating) progression calculated in IndexedDB.

## 🏝️ Disjoint File Island
- \`saberparatodos/tests/e2e/exam-scoring-mmr.spec.ts\` [NEW]

## 🎯 Acceptance Criteria
- [ ] Create Playwright test navigating to \`/practica\` and initiating a practice session.
- [ ] Verify timer starts counting down and remains visible across question transitions.
- [ ] Answer questions sequentially (mix of correct and incorrect answers).
- [ ] Finish exam and verify result screen displays percentage score, subject breakdown, and updated MMR rating.
- [ ] Verify result is saved in local IndexedDB \`exam_results\` store.
- [ ] Test executes in headless mode with 0 failures: \`npx --prefix saberparatodos playwright test tests/e2e/exam-scoring-mmr.spec.ts\`.

## 🧪 Verification Commands
\`\`\`bash
npx --prefix saberparatodos playwright test tests/e2e/exam-scoring-mmr.spec.ts
\`\`\`
`
  },
  {
    id: 'issue-08',
    title: '[Wave 5.09] fix(questions-latex): MathRenderer LaTeX Formatting & Entity Audit Harness',
    labels: ['wave-5', 'jules', 'quality-assurance'],
    body: `# [Wave 5.09] fix(questions-latex): MathRenderer LaTeX Formatting & Entity Audit Harness

> Wave 5 — Quality & Rendering Integrity.
> Labels: \`wave-5\`, \`jules\`

---

## 📋 Context & Objective
Ensure 100% clean rendering of mathematical expressions across all countries. Mathematical formulas using \\frac, \\sqrt, \\sum, and Greek letters must be free of escaped HTML entities (like &lt;, &gt;, &amp;) and render with zero KaTeX parse errors.

## 🏝️ Disjoint File Island
- \`scripts/audit-latex-formatting.mjs\` [NEW]
- \`saberparatodos/tests/unit/MathRenderer.spec.ts\` [MODIFY]

## 🎯 Acceptance Criteria
- [ ] Create script \`scripts/audit-latex-formatting.mjs\` scanning all \`.md\` and \`.json\` question files for unescaped/corrupted LaTeX expressions.
- [ ] Add unit tests in \`saberparatodos/tests/unit/MathRenderer.spec.ts\` verifying complex multiline equations, matrices, and fractions.
- [ ] Verify KaTeX error callback handles malformed input gracefully without crashing the UI.
- [ ] Script runs cleanly: \`node scripts/audit-latex-formatting.mjs\` (0 syntax errors).

## 🧪 Verification Commands
\`\`\`bash
node scripts/audit-latex-formatting.mjs
npx --prefix saberparatodos vitest run tests/unit/MathRenderer.spec.ts
\`\`\`
`
  },
  {
    id: 'issue-09',
    title: '[Wave 5.10] feat(questions-pe): Peru ECE/Admisión Social Sciences & Natural Sciences Packs (Weeks 1-10)',
    labels: ['wave-5', 'jules', 'curriculum-questions'],
    body: `# [Wave 5.10] feat(questions-pe): Peru ECE/Admisión Social Sciences & Natural Sciences Packs (Weeks 1-10)

> Wave 5 — Curriculum & Question Quality Expansion.
> Labels: \`wave-5\`, \`jules\`

---

## 📋 Context & Objective
Peru secondary exit and university admission exams (UNMSM, UNI, PUCP) require question packs for Grade 11 in Ciencias Sociales (Historia del Perú, Geografía, Economía) and Ciencias Naturales (Biología, Química, Física) for weeks 1 through 10.

## 🏝️ Disjoint File Island
- \`questions_data/peru/ciencias-sociales/grado-11/\` [NEW BUNDLES]
- \`questions_data/peru/ciencias-naturales/grado-11/\` [NEW BUNDLES]

## 🎯 Acceptance Criteria
- [ ] Add 10 markdown bundles for \`questions_data/peru/ciencias-sociales/grado-11/\` (weeks 1 to 10).
- [ ] Add 10 markdown bundles for \`questions_data/peru/ciencias-naturales/grado-11/\` (weeks 1 to 10).
- [ ] Questions adhere to MINEDU / DCN secondary curriculum standards.
- [ ] Step-by-step explanations for each question with conceptual keys.
- [ ] Validate content: \`node scripts/validate-bundles-v52.mjs\` — 0 errors.

## 🧪 Verification Commands
\`\`\`bash
node scripts/validate-bundles-v52.mjs
\`\`\`
`
  },
  {
    id: 'issue-10',
    title: '[Wave 5.11] test(e2e): Leaderboard Live Mesh Peer Discovery & Cross-Tab State Sync Suite',
    labels: ['wave-5', 'jules', 'e2e-testing'],
    body: `# [Wave 5.11] test(e2e): Leaderboard Live Mesh Peer Discovery & Cross-Tab State Sync Suite

> Wave 5 — QA & Testing Automation.
> Labels: \`wave-5\`, \`jules\`

---

## 📋 Context & Objective
Test the Leaderboard Live Mesh P2P component (\`LeaderboardLiveMesh.svelte\`) across two concurrent browser tabs/contexts to verify real-time peer discovery, BroadcastChannel message propagation, and Zero-PII standing presentation.

## 🏝️ Disjoint File Island
- \`saberparatodos/tests/e2e/leaderboard-mesh-sync.spec.ts\` [NEW]

## 🎯 Acceptance Criteria
- [ ] Create Playwright multi-page/multi-context test opening \`/leaderboard\` in two simultaneous pages.
- [ ] Verify that peer node count increments to >= 2 upon second client joining.
- [ ] Trigger mock score broadcast from Page A and verify live reactive update in Page B.
- [ ] Verify that all broadcast payloads contain node_hash and zero PII (no usernames, emails, or personal identifiers).
- [ ] Test executes in headless mode with 0 failures: \`npx --prefix saberparatodos playwright test tests/e2e/leaderboard-mesh-sync.spec.ts\`.

## 🧪 Verification Commands
\`\`\`bash
npx --prefix saberparatodos playwright test tests/e2e/leaderboard-mesh-sync.spec.ts
\`\`\`
`
  }
];

fs.mkdirSync(path.join('.hermes', 'wave5'), { recursive: true });

for (const iss of issues) {
  const filePath = path.join('.hermes', 'wave5', `${iss.id}.md`);
  fs.writeFileSync(filePath, iss.body, 'utf8');
  console.log(`Prepared ${iss.id} -> ${filePath}`);
}

export { issues };
