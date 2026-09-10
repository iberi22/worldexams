# Copyright y formato — Cuentos SaberParaTodos

## 1. Protección de copia

1. El CÓDIGO del módulo cuentos sigue la licencia del repo (AGPLv3).
2. El CONTENIDO (textos, quizzes, SVG, nombres de personajes) es
   © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados.
   Lectura gratuita, reproducción prohibida sin autorización escrita.
3. Archivo legal: `questions_data/cuentos/LICENSE-CONTENT.md` (vale para
   todo el árbol `questions_data/cuentos/`).
4. Cada `cuento.md` lleva frontmatter `license: "PROPRIETARY-FREE-READ"`
   y header HTML de copyright en la primera línea.
5. Cada `.svg` lleva comentario de copyright en la primera línea.
6. El validador (ola C1.02) RECHAZA archivos sin header/frontmatter
   legal. La auditoría (ola C5.04) grepea el 100% del árbol.
7. Prohibido subir los textos a datasets, traducirlos fuera del repo o
   regenerarlos con IA externa sin registro en el issue.

## 2. Español neutro (regla de contenido)

- Sin países, ciudades, monedas, gentilicios ni instituciones reales.
- Sin voseo, sin modismos (vale: carro/coche → usar "auto"? NO: usar
  palabra neutra o ambas la primera vez: "el auto (coche)").
- Lista de veto del validador (mínimo): pesos, dólares, euros, soles,
  quetzal, guaraní, lempira, córdoba, balboa, colón; vos, tenés, hacé,
  mirá, che, parce, tío (como muletilla), compa, chido, chévere, bacán.

## 3. Formato cuento.md v1 (obligatorio)

```markdown
<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. Lectura gratuita, prohibida su reproducción. -->
---
slug: "tana-tucan-comparte"
titulo: "Tana la tucán que aprendió a compartir"
edad: "3-4"
idioma: "es-neutro"
eje: "animales"
habitat: "selva"
valor: "compartir"
personajes: ["tana", "tito", "lila"]
paginas: 8
license: "PROPRIETARY-FREE-READ"
version: 1
---

## Pagina 1
![alt: Tana ve el árbol de mangos](escenas/p1-arbol.svg)
Texto de la página (40-80 palabras, frases cortas, 1 idea).

## Pagina 2
...

## Quiz
### Pregunta 1
Texto...
- [x] A) Correcta
  <!-- feedback: por qué sí -->
- [ ] B) Distractor
  <!-- feedback: por qué no -->
- [ ] C) Distractor
  <!-- feedback: por qué no -->

### Explicacion
Moraleja en 2-3 frases para leer con el acudiente.
```

Reglas:
- 8-10 páginas, 30-80 palabras por página, 1 idea por página. (Rango calibrado
  2026-09-10: 40 era excesivo para lectura en voz alta a 3-4 años; 30 ≈ 20 s.)
- Quiz: exactamente 3 preguntas, 3 opciones A-C, exactamente una `[x]`,
  todas con feedback, más `### Explicacion` final.
- `![alt: ...]` obligatorio en cada escena (accesibilidad).
- Árbol de archivos por cuento:

```text
questions_data/cuentos/<slug>/
  cuento.md
  personajes/<nombre>.svg   (2-4 por cuento)
  escenas/p<N>-<nombre>.svg (8-10, o reutilizadas de piezas/)
```
