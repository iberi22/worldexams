---
name: "🎯 Generate Question Bundles"
about: "Request question bundle generation in the private WorldExams workspace"
title: "[Generate] {NUM} bundles for {COUNTRY}"
labels: ["generate-questions", "copilot"]
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
| **Number of Bundles** | <!-- Number of bundle files requested --> |

### Cultural Context

<!-- Provide specific cultural references for this country -->

**Currency:**
**Major Cities:**
**Local References:**
**Language Notes:**

---

## 🎯 Protocol Requirements

Specify the protocol to use:

- [ ] Protocol v2.0
- [ ] Protocol v3.0
- [ ] Protocol v4.x / current product protocol

If not specified, the issue owner must resolve the protocol before implementation.

---

## 📁 File Structure

```
src/content/questions/{country}/{subject}/grado-{N}/{topic}/
└── {COUNTRY}-{SUBJ}-{GRADE}-{TOPIC}-{NNN}-bundle.md
```

---

## ✅ Quality Checklist

Before submitting PR, verify:

- [ ] Bundle structure matches the selected protocol
- [ ] IDs follow the selected protocol format
- [ ] Cultural context is appropriate
- [ ] Distractors represent common student errors
- [ ] Explanations are pedagogically useful
- [ ] Frontmatter includes the correct `protocol_version`
- [ ] No public release or external repo update is assumed

---

## 📚 References

- `docs/QUESTION_GENERATION_PROTOCOL_V2.md`
- `docs/QUESTION_GENERATION_PROTOCOL_V3.md`
- `docs/QUESTION_GENERATION_PROTOCOL_V4.md`

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
