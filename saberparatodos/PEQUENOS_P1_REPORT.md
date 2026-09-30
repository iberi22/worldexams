# Reporte Fase 1 (P1): Portal "Pequeños" en SaberParaTodos

## 1. Archivos Creados y Modificados

- **Creado:** [`saberparatodos/src/pages/pequenos/index.astro`](saberparatodos/src/pages/pequenos/index.astro)
  - Página estática Astro (`prerender = true`) que constituye el portal de entrada de la sección "Pequeños" para primera infancia (3 a 6 años).
  - Título y metadatos SEO específicos: `Pequeños | Cuentos Infantiles Interactivos (3-6 años) | SaberParaTodos`.
  - Hero cálido, accesible y en español, destacando lectura en familia, valores y ausencia de publicidad.
  - Grid responsive de tarjetas para los 10 cuentos del catálogo oficial obtenidos mediante `getAllCuentosCatalog()`.
  - Cada tarjeta presenta la ilustración de portada (SVG de la página 1), badges de metadatos (rango de edad `edad`, valor, hábitat), personajes, cantidad de páginas interactivas y un botón/enlace prominente "Leer cuento" que apunta directamente a `/cuentos/{slug}/leer/`.
  - Accesibilidad cuidada: enlaces reales `<a>`, navegación completa por teclado, `focus-visible`, `aria-label` descriptivos en botones y respeto por `prefers-reduced-motion: reduce`.
  
- **Modificado:** [`saberparatodos/src/components/Navbar.astro`](saberparatodos/src/components/Navbar.astro)
  - Se agregó el enlace `{ href: '/pequenos', label: 'Pequeños', icon: 'kids' }` al array `navLinks` inmediatamente después de 'Prueba' y antes de 'Preparación'.
  - Visible tanto en la barra de navegación de escritorio como en el menú hamburguesa móvil desplegable.

- **Creado:** [`saberparatodos/PEQUENOS_P1_REPORT.md`](saberparatodos/PEQUENOS_P1_REPORT.md) (este documento explicativo).

---

## 2. Resolución de Portadas de Cuentos

- Se utilizó directamente el campo `coverEscena` proveído por `getAllCuentosCatalog()` de [`saberparatodos/src/lib/cuentos/cuentos-catalog.ts`](saberparatodos/src/lib/cuentos/cuentos-catalog.ts).
- `getAllCuentosCatalog()` procesa internamente los packs JSON o el markdown base y aplica `withPublicEscenas()`, normalizando la ruta de la imagen de la página 1 (`p1-*.svg`) hacia `/v1/cuentos/{slug}/escenas/...`.
- No se crearon ni generaron imágenes adicionales: el componente consume directamente los SVGs preexistentes como portadas en las tarjetas del grid con `loading="lazy"` y `decoding="async"`. Si algún cuento careciera de escena de portada, se implementó un fallback estético con icono de libro sin romper el renderizado.

---

## 3. Decisiones de Diseño y Arquitectura

1. **Tokens y Paleta Visual Nocturna:**
   - En lugar de inventar una paleta genérica o utilizar el tema oscuro frío de exámenes (`edge-hive`), se reutilizaron los tokens de color del shell de cuentos (`#121832` azul noche, `#FFF9DC` crema, `#D4A94E` dorado, `#FF9F43` mango, `#4FB6A3` agua).
   - Se incorporó un fondo sutil con patrón de polvo de estrellas (`pequenos-stars`) para mantener consistencia con el lector inmersivo (`shell.css`).
   - Se aplicaron las familias tipográficas del ecosistema de cuentos (`Fredoka` para display/títulos y `Andika` para cuerpo de texto).

2. **Aislamiento Estricto de la Fase 1:**
   - No se importó `CuentosShell.astro` ni su HUD de lectura, evitando mezclar estados de lectura interactiva con la landing del catálogo.
   - No se alteró ningún archivo bajo `saberparatodos/src/components/cuentos/lector/**` ni `saberparatodos/src/components/cuentos/arte/**`, previniendo colisiones con los trabajos en curso en el motor de lectura.
   - Cero dependencias 3D/Three.js para esta fase.

3. **Accesibilidad y Rendimiento (a11y + mobile-first):**
   - Tarjetas construidas como enlaces `<a>` reales semánticos (operables sin JavaScript).
   - El contenedor visual de la portada está vinculado con `tabindex="-1"` y `aria-hidden="true"`, dejando el foco y anuncio de lector de pantalla al título del cuento y al botón principal de acción con su respectivo `aria-label`.
   - Botón estilo juguete de madera ("toy button") con feedback visual táctil y transiciones desactivadas bajo `@media (prefers-reduced-motion: reduce)`.
   - Mobile-first: rejilla adaptable de 1 columna en smartphones, 2 columnas en pantallas medianas (sm) y 3 columnas en escritorio (lg).

---

## 4. Estado de Verificación

- Siguiendo la instrucción obligatoria del usuario, **no se corrieron comandos de shell pesados ni suites completas** (`astro check` sobre todo el proyecto ni `vitest run` sin filtros) para no consumir el presupuesto de tiempo.
- La sintaxis de Astro, TypeScript y estilos CSS fue inspeccionada estáticamente durante la escritura.
