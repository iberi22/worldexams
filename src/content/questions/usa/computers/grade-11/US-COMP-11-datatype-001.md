---
id: US-COMP-11-datatype-001
country: usa
grado: 11
asignatura: Computer Science
tema: Data Representation
dificultad: 4
estado: published
creador: AI-WorldExams
source: OpenTDB (CC BY-SA 4.0)
source_lang: en-US
---
# Question
How many bits make up the significand (mantissa) portion of a single precision floating point number?

# Options
- [ ] A) 8
- [ ] B) 15
- [x] C) 23
- [ ] D) 53

# Explanation
In the IEEE 754 single precision floating point format, the significand (also called mantissa) uses 23 bits. The complete 32-bit format consists of: 1 sign bit, 8 exponent bits, and 23 significand bits.
- A) 8 bits is the size of the exponent portion
- B) 15 is not used in single precision floating point
- D) 53 bits is the significand size for double precision (64-bit) floating point
