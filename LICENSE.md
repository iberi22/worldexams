# 📜 Licencias - World Exams Organization

**Última actualización:** 2025-12-12

---

## 🎯 Resumen

Este proyecto usa un **sistema de licencias duales** para contenido educativo:

- ✅ **Pregunta v1 (Original):** [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) - Uso comercial permitido
- 🔒 **Preguntas v2-v7 (Variantes):** [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) - Solo uso no-comercial

El **código fuente** (componentes Svelte, layouts Astro, utils TypeScript) está bajo [MIT License](https://opensource.org/licenses/MIT).

---

## 📚 Contenido Educativo (Preguntas)

### Pregunta v1 (Original) - CC BY-SA 4.0

**Licencia completa:** https://creativecommons.org/licenses/by-sa/4.0/legalcode

**Puedes:**
- ✅ Usar comercialmente (ej: en tu propia plataforma de pago)
- ✅ Adaptar, mezclar, transformar
- ✅ Redistribuir en cualquier medio o formato

**Debes:**
- ✅ Dar crédito apropiado (ver sección "Atribución" abajo)
- ✅ Indicar si hiciste cambios
- ✅ Compartir derivados bajo la **misma licencia** (ShareAlike)

**Ejemplo de uso:** Copiar pregunta v1 a tu aplicación educativa comercial, agregando atribución.

---

### Preguntas v2-v7 (Variantes) - CC BY-NC-SA 4.0

**Licencia completa:** https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode

**Puedes:**
- ✅ Usar para fines educativos no-comerciales
- ✅ Adaptar, mezclar, transformar
- ✅ Redistribuir en cualquier medio o formato

**Debes:**
- ✅ Dar crédito apropiado
- ✅ Indicar si hiciste cambios
- ✅ Compartir derivados bajo la **misma licencia** (ShareAlike)

**NO puedes:**
- ❌ Usar comercialmente (ej: vender acceso directo a estas preguntas)
- ❌ Licenciar a terceros por dinero
- ❌ Incluir en API comercial de pago

**Ejemplo de uso permitido:** Usar en tu escuela pública sin fines de lucro.

**Ejemplo de uso prohibido:** Vender acceso directo a estas preguntas en una app de pago.

---

## 💼 Party Mode: ¿Es Legal?

**SÍ.** Según el [FAQ oficial de Creative Commons](https://creativecommons.org/faq/#can-i-still-make-money-from-a-work-i-make-available-under-a-creative-commons-license):

> "You may use funding models that do not depend on using an NC license. For example, many artists and creators use crowdfunding or 'freemium' models where the basic content is free."

**Party Mode ($49/mes) es legal porque:**

1. ✅ **Vendemos el servicio/software**, no las preguntas directamente
2. ✅ Las preguntas son **input** para el servicio, no el producto final
3. ✅ El valor agregado es: multiplayer realtime, analytics avanzados, anti-cheat, reportes IA
4. ✅ Las preguntas v2-v7 están **disponibles gratis en GitHub**, no las vendemos

**Casos análogos exitosos:**
- **GitHub:** Vende hosting/CI/CD de código open source (incluso BY-NC)
- **WordPress.com:** Vende hosting de temas/plugins GPL (copyleft)
- **Red Hat:** Vende soporte/hosting de Linux (GPL)

---

## 💻 Código Fuente (MIT License)

```
MIT License

Copyright (c) 2025 World Exams Organization

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**Aplica a:**
- Componentes Svelte (`src/components/**/*.svelte`)
- Layouts Astro (`src/layouts/**/*.astro`)
- Utils TypeScript (`src/utils/**/*.ts`)
- Scripts de build (`scripts/**/*.ps1`, `scripts/**/*.sh`)
- Configuración (`astro.config.mjs`, `tailwind.config.mjs`)

**NO aplica a:**
- Preguntas educativas (`src/content/questions/**/*.md`) - Ver licencias duales arriba

---

## 📖 Cómo Dar Atribución

### Para Pregunta v1 (CC BY-SA 4.0)

```markdown
**Fuente:** [World Exams - SaberParaTodos](https://github.com/worldexams/saberparatodos)
**Licencia:** CC BY-SA 4.0
**ID Pregunta:** CO-MAT-11-algebra-001-v1
**Adaptado:** Sí, se tradujo al inglés y se cambió contexto de Bogotá a New York
```

### Para Preguntas v2-v7 (CC BY-NC-SA 4.0)

```markdown
**Fuente:** [World Exams - SaberParaTodos](https://github.com/worldexams/saberparatodos)
**Licencia:** CC BY-NC-SA 4.0 (uso no-comercial solamente)
**ID Pregunta:** CO-MAT-11-algebra-001-v5
**Uso:** Proyecto educativo sin fines de lucro
```

---

## 🤝 Contribuciones

Al contribuir preguntas a este repositorio, aceptas:

1. Licenciar tu pregunta v1 bajo **CC BY-SA 4.0**
2. Licenciar tus preguntas v2-v7 bajo **CC BY-NC-SA 4.0**
3. El código que contribuyas (Svelte, TypeScript, etc.) estará bajo **MIT License**

**Nota:** Si tu contenido está bajo otra licencia compatible (ej: CC0, Public Domain), indícalo en el frontmatter de la pregunta.

---

## ❓ Preguntas Frecuentes

### ¿Puedo usar v1 en mi app comercial?
✅ **Sí**, siempre que des atribución y compartas derivados bajo CC BY-SA 4.0.

### ¿Puedo usar v2-v7 en mi app comercial?
❌ **No directamente**. Pero puedes:
1. Vender servicios basados en ellas (como Party Mode)
2. Pedir permiso explícito al creador original
3. Usar solo v1 (que sí permite uso comercial)

### ¿Puedo vender cursos usando v2-v7?
🟡 **Depende**. Si el curso es gratis o de bajo costo educativo, **probablemente sí**. Si es comercial con ánimo de lucro, **probablemente no**. La línea es borrosa según el [FAQ de CC](https://creativecommons.org/faq/#does-my-use-violate-the-noncommercial-clause-of-the-licenses).

### ¿Por qué esta estructura de licencias?
Para permitir:
1. 🌍 **Marketing/SEO:** v1 es indexable y compartible libremente
2. 🔒 **Protección:** v2-v7 previene que competidores copien todo el contenido premium
3. 💰 **Monetización:** Podemos vender servicios (Party Mode) legalmente

---

## 📞 Contacto

Para permisos especiales, licencias comerciales, o preguntas legales:

- **Email:** iberi@worldexams.org
- **GitHub Discussions:** https://github.com/worldexams/saberparatodos/discussions

---

**Disclaimer Legal:** Esta es una explicación simplificada. Para términos legales completos, consulta las licencias oficiales enlazadas arriba. World Exams no es un bufete de abogados y este documento no constituye asesoría legal.
