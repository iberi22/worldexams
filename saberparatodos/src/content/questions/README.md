# 🌍 WorldExams Question Bank Hub

> **Central Protocol & Directory Structure**
> **Version:** 1.0
> **Date:** 2025-12-17

## 📂 Directory Structure

This directory (`src/content/questions`) is the central repository for all standardized exam questions for the SaberParaTodos platform. Each country has its own dedicated subdirectory containing its specific protocol and content.

```
src/content/questions/
├── README.md           (This File - Global Rules)
├── colombia/           (ICFES)
│   ├── PROTOCOL.md     (Specifics: 4 options, COP)
│   └── ...
├── mexico/             (EXANI-II)
│   ├── PROTOCOL.md     (Specifics: 4 options, MXN)
│   └── ...
├── brasil/             (ENEM) - Note: 's' for Portuguese spelling
│   ├── PROTOCOL.md     (Specifics: 5 options, BRL)
│   └── ...
├── argentina/          (General/UBA)
│   ├── PROTOCOL.md     (Specifics: Voseo, ARS)
│   └── ...
└── chile/              (PAES)
│   ├── PROTOCOL.md     (Specifics: 4 options, CLP)
│   └── ...
```

---

## 🏷️ Universal Naming Convention

All question files across all countries MUST follow this strict naming pattern to ensure the API can parse them correctly.

**Format:**
`[COUNTRY]-[SUBJECT]-[GRADE]-[TOPIC]-[NNN]-bundle.md`

| Component | Description | Examples |
|-----------|-------------|----------|
| `[COUNTRY]` | ISO 3166-1 alpha-2 code (Upper Case) | `CO`, `MX`, `BR`, `AR`, `CL` |
| `[SUBJECT]` | Standard 3-letter Subject Slug | `MAT`, `SOC`, `LEC`, `CNAT`, `ING`, `FIL` |
| `[GRADE]`   | Grade Level | `11`, `9`, `3`, `5`, `7` |
| `[TOPIC]`   | Descriptive topic slug (kebab-case) | `algebra`, `historia-mexico`, `grammar` |
| `[NNN]`     | 3-digit sequential number | `001`, `002`, `099` |
| `bundle`    | **REQUIRED** suffix indicating v2.0+ | `bundle` |

**Examples:**
- `MX-MAT-11-algebra-001-bundle.md` (Mexico, Math, Grade 11)
- `BR-CNAT-11-ecologia-005-bundle.md` (Brazil, Natural Sciences, Grade 11)

---

## 🌎 Global Subject Mapping

We map local subject names to standardized codes for file naming.

| Code | Slug (Global) | Colombia (ICFES) | Mexico (EXANI) | Brazil (ENEM) | Chile (PAES) |
|------|---------------|------------------|----------------|---------------|--------------|
| **MAT** | `mathematics` | Matemáticas | Pensamiento Matemático | Matemática | Competencia Matemática |
| **SOC** | `social-studies`| Sociales y Ciudadanas | Historia / Civismo | Ciências Humanas | Historia y Cs. Sociales |
| **CNAT**| `sciences` | Ciencias Naturales | Ciencias Experimentales | Ciências da Natureza | Ciencias |
| **LEC** | `language` | Lectura Crítica | Comprensión Lectora | Linguagens | Competencia Lectora |
| **ING** | `english` | Inglés | Inglés | Inglês | Inglés |

---

## 📜 General Rules (All Countries)

1.  **7 Questions per Bundle:** All files must contain exactly 7 variants (v1-v7).
2.  **Dual Licensing:** All files must include the `licenses` metadata field.
3.  **Source Attribution:** All questions must be based on a real, cited source found via web search.
4.  **No Nested Folders:** Do not create subfolders inside the subject directories (e.g., no `mexico/math/algebra/`). ID is enough.
