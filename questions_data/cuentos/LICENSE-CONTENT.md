# Licencia de contenido — Cuentos SaberParaTodos

© 2026 SaberParaTodos / WorldExams. Todos los derechos reservados.

Todo el contenido bajo `questions_data/cuentos/` (textos, quizzes,
nombres de personajes, archivos SVG, escenas y adaptaciones) es obra
original protegida por derechos de autor.

- Lectura: gratuita para todos los estudiantes, para siempre.
- Prohibido: copiar, reproducir, distribuir, traducir, adaptar o
  re-generar este contenido (total o parcial) por cualquier medio sin
  autorización escrita.
- Prohibido incluir este contenido en datasets públicos o entrenamiento
  / re-generación con IA externa (ver `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` §1 punto 7).
- El código del lector (componentes, scripts, estilos) NO está cubierto
  por esta licencia: sigue la licencia del repositorio (AGPLv3).

## Requisitos de encabezado y frontmatter

Cada archivo de contenido debe incluir su encabezado de copyright en la línea 1.
El validador `validate_cuentos.js` (regla `CUENTO-E-HEADER`) y la auditoría
`audit-cuentos-copyright.sh` exigen su presencia exacta.

### Plantilla para Markdown (`.md`):
Línea 1 exacta:
```html
<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. Lectura gratuita, prohibida su reproducción. -->
```

Frontmatter YAML requerido en cada `cuento.md`:
```yaml
license: "PROPRIETARY-FREE-READ"
version: 1
```

### Plantilla para SVG (`.svg`):
Línea 1 exacta:
```xml
<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
```
