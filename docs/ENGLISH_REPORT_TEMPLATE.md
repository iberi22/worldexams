# 🌍 International English Proficiency Report Template

## Design Specification

This report mimics the format of **TOEFL/IELTS** score reports but adapted for our Hybrid Protocol (ICFES Structure + International Rigor).

---

## 📊 Report Structure

### Header Section
```
╔══════════════════════════════════════════════════════════════╗
║  WORLD EXAMS - ENGLISH PROFICIENCY CERTIFICATE               ║
║  Based on ICFES Saber 11 Structure + International Standards ║
╚══════════════════════════════════════════════════════════════╝

Student: [Name]
Grade: [3-11]
Test Date: [YYYY-MM-DD]
Report ID: [Unique Hash]
```

### Overall Performance
```
┌─────────────────────────────────────────────────────────────┐
│ OVERALL CEFR LEVEL: B2 (Upper-Intermediate)                 │
│ Equivalent to: TOEFL 72-94 | IELTS 5.5-6.5                  │
└─────────────────────────────────────────────────────────────┘

Overall Score: 78/100
Percentile: Top 15% (National)
```

### Skill Breakdown (7 ICFES Parts)

```
┌─────────────────────────────────────────────────────────────┐
│ SKILL AREA PERFORMANCE                                      │
├─────────────────────────────────────────────────────────────┤
│ Part 1: Vocabulary (Lexical)           85/100  [████████▓░] │
│ CEFR: B2+ | Strength: Academic words                       │
│                                                             │
│ Part 2: Pragmatics (Signs/Notices)     90/100  [█████████░] │
│ CEFR: C1  | Strength: Real-world context                   │
│                                                             │
│ Part 3: Conversation (Communicative)   70/100  [███████░░░] │
│ CEFR: B1  | Area for Improvement: Idioms                   │
│                                                             │
│ Part 4: Grammar I (Cloze Basic)        75/100  [███████▓░░] │
│ CEFR: B2  | Focus: Prepositions, Articles                  │
│                                                             │
│ Part 5: Reading (Literal)              80/100  [████████░░] │
│ CEFR: B2  | Strength: Factual comprehension                │
│                                                             │
│ Part 6: Reading (Inferential)          65/100  [██████▓░░░] │
│ CEFR: B1+ | Area for Improvement: TOEFL-style inference    │
│                                                             │
│ Part 7: Grammar II (Cloze Advanced)    72/100  [███████▓░░] │
│ CEFR: B2  | Focus: Connectors, Complex structures          │
└─────────────────────────────────────────────────────────────┘
```

### Detailed Feedback

```
┌─────────────────────────────────────────────────────────────┐
│ STRENGTHS                                                   │
├─────────────────────────────────────────────────────────────┤
│ ✓ Strong academic vocabulary (Part 1: 85%)                 │
│ ✓ Excellent pragmatic understanding (Part 2: 90%)          │
│ ✓ Solid literal reading comprehension (Part 5: 80%)        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ AREAS FOR IMPROVEMENT                                       │
├─────────────────────────────────────────────────────────────┤
│ ⚠ Inferential reading needs work (Part 6: 65%)             │
│   → Practice TOEFL-style "What does the author imply?"     │
│                                                             │
│ ⚠ Conversational idioms (Part 3: 70%)                      │
│   → Study common phrasal verbs and expressions             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ RECOMMENDED STUDY PLAN                                      │
├─────────────────────────────────────────────────────────────┤
│ 1. Complete 5 more bundles focusing on "Inference" (Part 6)│
│ 2. Review "Idioms & Phrasal Verbs" flashcards              │
│ 3. Target CEFR B2→C1 transition materials                  │
│                                                             │
│ Estimated time to next level (C1): 3-4 months              │
└─────────────────────────────────────────────────────────────┘
```

### CEFR Descriptor

```
┌─────────────────────────────────────────────────────────────┐
│ YOUR CURRENT LEVEL: B2 (Independent User)                  │
├─────────────────────────────────────────────────────────────┤
│ You can:                                                    │
│ • Understand main ideas of complex texts                   │
│ • Interact with native speakers with fluency               │
│ • Produce clear, detailed text on various subjects         │
│ • Explain viewpoints on topical issues                     │
│                                                             │
│ Next level (C1 - Proficient User):                         │
│ • Understand demanding, longer texts                       │
│ • Express ideas fluently without obvious searching         │
│ • Use language flexibly for social, academic purposes      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Implementation Notes

**Data Structure (JSON):**
```json
{
  "student_id": "uuid",
  "test_date": "2026-01-01",
  "grade": 11,
  "overall_score": 78,
  "cefr_level": "B2",
  "parts": [
    {
      "part": 1,
      "name": "Vocabulary",
      "score": 85,
      "cefr": "B2+",
      "strength": "Academic words"
    },
    // ... 6 more parts
  ],
  "strengths": ["Strong academic vocabulary", "..."],
  "improvements": ["Inferential reading", "..."],
  "recommendations": ["Complete 5 more bundles...", "..."]
}
```

**Rendering:**
- Use ASCII art for terminal/PDF export
- Use Svelte components for web UI
- Generate PDF with charts using libraries like `jsPDF` + `Chart.js`
