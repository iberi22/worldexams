---
name: "🎯 Generate Questions (Protocol v2.0)"
about: "Request generation of question bundles with 7 variations each"
title: "[Generate] {NUM} {CATEGORY} bundles for {COUNTRY}"
labels: ["generate-questions-v2", "copilot"]
assignees: ["copilot"]
---

## 📋 Generation Request

### Target Configuration

| Parameter | Value |
|-----------|-------|
| **Country** | <!-- CO, MX, BR, US, AR, CL, PE --> |
| **Exam** | <!-- Saber 11, EXANI-II, ENEM, SAT, etc. --> |
| **Category** | <!-- mathematics, science, history, geography --> |
| **Grade** | <!-- 11, 12, etc. --> |
| **Number of Bundles** | <!-- Each bundle = 7 questions --> |

### Cultural Context

<!-- Provide specific cultural references for this country -->

**Currency:**
**Major Cities:**
**Local References:**
**Language Notes:**

---

## 🎯 Protocol v2.0 Requirements

Each bundle file MUST contain exactly **7 questions**:

| # | Type | Difficulty | Description |
|---|------|------------|-------------|
| 1 | **Original** | 3 | Base question adapted from source |
| 2 | **Easy A** | 1-2 | Simplified, basic recognition |
| 3 | **Easy B** | 1-2 | Simplified, different local context |
| 4 | **Medium A** | 3 | Practical application with local context |
| 5 | **Medium B** | 3 | Analysis or comparison |
| 6 | **Hard A** | 4-5 | Multi-step problem |
| 7 | **Hard B** | 4-5 | Complex reasoning/synthesis |

---

## 📁 File Structure

```
src/content/questions/{country}/{subject}/grado-{N}/{topic}/
└── {COUNTRY}-{SUBJ}-{GRADE}-{TOPIC}-{NNN}-bundle.md
```

---

## ✅ Quality Checklist

Before submitting PR, verify:

- [ ] Each file contains exactly 7 questions
- [ ] IDs follow format: `[BASE-ID]-v[1-7]`
- [ ] Difficulty progression is correct (1-2, 1-2, 3, 3, 4-5, 4-5)
- [ ] Cultural context appears in 4+ of 7 questions
- [ ] All distractors represent common student errors
- [ ] Explanations are detailed (50+ words each)
- [ ] Frontmatter includes `protocol_version: "2.0"`

---

## 📚 References

- [Protocol v2.0 Documentation](../docs/QUESTION_GENERATION_PROTOCOL_V2.md)
- [Example Bundle](../docs/examples/MX-MAT-11-angulos-001-bundle.md)

---

## 🔍 Source Questions (for Copilot to expand)

<!--
Copilot: Research OpenTDB or similar CC BY-SA 4.0 sources for
questions in the specified category. Each source question should
generate one bundle (7 variations).
-->

### Source 1
- **Original:**
- **Answer:**
- **Source:** OpenTDB (CC BY-SA 4.0)

### Source 2
- **Original:**
- **Answer:**
- **Source:** OpenTDB (CC BY-SA 4.0)

<!-- Add more sources as needed -->
