---
id: US-COMP-11-datatype-003
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
How many bits are used for the exponent in a single precision floating point number?

# Options
- [ ] A) 5
- [x] B) 8
- [ ] C) 11
- [ ] D) 23

# Explanation
In IEEE 754 single precision format, the exponent uses 8 bits. The complete format is: 1 sign bit + 8 exponent bits + 23 significand bits = 32 bits total.
- A) 5 bits is too small for the exponent range needed
- C) 11 bits is the exponent size for double precision (64-bit)
- D) 23 bits is the size of the significand, not the exponent
