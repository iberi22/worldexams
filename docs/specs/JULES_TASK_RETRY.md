# ISSUE: Content Generation Retry (Strict Protocol V2.1)

**Assignee:** @Jules-AI
**Status:** Urgent / Recovery
**Context:** Previous batch was rejected due to format violations (Single files vs Bundles) and content mismatch (Trivia vs Academic).

## 📝 Instructions
We have established a **Strict Protocol V2.1**. You must strictly adhere to the structure defined in `docs/prompts/JULES_RECOVERY_PROMPT.md`.

### 🚨 Critical Requirements
1.  **File Format:** `*-bundle.md` (Not `.md`).
2.  **Structure:** 1 file contains **7 distinct question variants**.
3.  **Template:** You **MUST** copy the schema from `docs/prompts/JULES_RECOVERY_PROMPT.md` exactly, including the "Metadata Global" comments and the Validation Table at the end.
4.  **Verification:** After generating, run `node scripts/verify-protocol.js`. If it fails, start over.

### 🎯 Immediate Targets
1.  `src/content/questions/mexico/matematicas/grado-11/MX-MAT-11-cuadraticas-001-bundle.md`
2.  `src/content/questions/usa/math/grade-11/US-MAT-11-linear-001-bundle.md`

**Do not generate history trivia.** Focus on pure Math/Reading as per the curriculum.
