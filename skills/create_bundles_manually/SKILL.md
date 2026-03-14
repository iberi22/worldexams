---
name: create-bundles-manually
description: Use when manually creating or correcting question bundles under the WorldExams question protocol and curriculum alignment rules.
---

# 🛠️ Skill: Manual Question Bundle Creation

This guide details the process of creating question bundles manually, ensuring high pedagogical quality and compliance with **Protocol v3.0**. This process does **NOT** use automation scripts for content generation, relying instead on human (or agent) research and expertise.

## 📋 Prerequisites

1.  **DBA Standards**: Access to [Derechos Básicos de Aprendizaje (Mineducación)](https://www.mineducacion.gov.co/portal/men/Publicaciones/Guias/340021:Derechos-Basicos-de-Aprendizaje-DBA).
2.  **Protocol v3.0**: Understanding of the 10-question structure and metadata.
3.  **Topic Assignment**: A clear topic from the curriculum matrix or `task.md`.

---

## 🚀 Step-by-Step Creation Process

### 1. Select Topic & DBA Alignment
Identify the specific **DBA (Derecho Básico de Aprendizaje)** that corresponds to the grade and subject.
*Example: For Grade 4 Science, if the topic is "Force", look for the DBA related to "Physical forces and machines".*

### 2. Research Base Question (v1)
The first question (v1) must be based on a **real, high-quality source**.
- **Search**: Look for finding from ICFES, Saber 11, or reputable educational textbooks.
- **Criteria**: Must challenge the student at a level appropriate for the grade.
- **Attribution**: You MUST record the source URL and license.

### 3. Setup File Structure
Create a new `.md` file in the correct directory following this path pattern:
`src/content/questions/[country]/[subject]/grado-[N]/[topic]/[ID]-v3-bundle.md`

**Metadata Template:**
```markdown
---
id: "[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[001]"
country: "[iso-code]"
grado: [number]
asignatura: "[subject]"
tema: "[Topic Name]"
periodo: [1-4]
protocol_version: "3.0"
total_questions: 10
estado: "approved"
creador: "Manual-Creation"
generation_date: "YYYY-MM-DD"
licenses:
  v1: "CC BY-SA 4.0"
  v2-v10: "CC BY-NC-SA 4.0"
source: "Mineducacion Colombia - DBA"
source_url: "[URL]"
source_license: "CC BY-SA 4.0"
search_query: "[Research terms used]"
---
```

### 4. Pedagogical Development (The 10 Variations)
Develop 10 variations of the question, covering specific difficulty levels. **Do not copy-paste**. Each variation must teach or test a specific angle of the topic.

| ID Suffix | Difficulty | Type | Goal |
| :--- | :---: | :--- | :--- |
| **-v1** | 1 | Base Question | Definition / Basic Recognition |
| **-v2** | 1 | Context Variation | Recognition in a different context |
| **-v3** | 2 | Understanding | Explaining "Why" or "How" |
| **-v4** | 2 | Local Context | Applying concept to local culture/geography |
| **-v5** | 3 | Application | Solving a standard problem |
| **-v6** | 3 | Real World | Application in daily life scenarios |
| **-v7** | 4 | Analysis | Breaking down a complex problem |
| **-v8** | 4 | Comparison | Comparing two concepts or analyzing errors |
| **-v9** | 5 | Synthesis | Combining multiple concepts to solve a problem |
| **-v10** | 5 | Evaluation | Judging the value or validity of an idea |

### 5. Writing Rules (Strict)
- **Distractors**: Must be plausible errors, not random wrong answers.
- **Explanations**: Must be pedagogical (teaching *why* the answer is correct), not just stating the answer.
- **Language**: Use neutral Spanish appropriate for the region (e.g., Colombia).
- **Formatting**: Use standard Markdown headers (`#`, `##`, `###`).

### 6. Manual Validation
Before saving, check:
- [ ] Are there exactly 10 questions?
- [ ] Are IDs unique (`-v1` to `-v10`)?
- [ ] Is the `periodo` field correct?
- [ ] do the questions actually align with the DBA?

### 7. Save & Commit
Save the file. No build script is needed to generate the file, but you should run the validation script `npm run validate` if available to check formatting.

---

> **Note:** This manual process ensures that every bundle is crafted with educational intent, avoiding the pitfalls of low-quality automated generation.
