# Reporte Fase 2 (P2) — Estantería 3D "Pequeños" (Three.js)

## 1. Decisiones de Escena y Renderizado

- **Fondo / Transparencia:** Se configuró `THREE.WebGLRenderer` con `{ alpha: true, antialias: true }` y el contenedor Svelte con fondo `bg-[#121832]/60` y `backdrop-blur-sm`. De esta manera, el canvas 3D permite ver el polvo de estrellas (`.pequenos-stars`) de la atmósfera nocturna original de la página por detrás, integrándose armónicamente con la paleta de colores (`#121832`, `#FFF9DC`, `#D4A94E`).
- **Geometría Procedural y Presupuesto:**
  - 2 estantes horizontales como tablas de madera modeladas con `THREE.BoxGeometry(9.2, 0.2, 1.4)` (24 triángulos en total) y `THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.7 })`.
  - 10 libros como `THREE.PlaneGeometry(1.35, 1.8)` dispuestos en dos filas de 5 (5 arriba, 5 abajo). Presupuesto geométrico total de la escena: ~44 triángulos, muy por debajo del límite estricto de <1000 triángulos.
  - Iluminación: `THREE.AmbientLight` cálida/blanca con intensidad 0.85 y `THREE.DirectionalLight` color `#FFF9DC` a 0.7 para dar profundidad sutil sin incurrir en post-procesamiento.
  - Idle Animation: Oscilación senoidal muy suave y sutil en el eje Y para los estantes y libros mientras no hay interacción activa.

## 2. Manejo del caso sin `coverEscena`

- Al iterar sobre la lista de cuentos:
  - Si `cuento.coverEscena` existe, se carga dinámicamente mediante `THREE.TextureLoader().load(cuento.coverEscena)` y se aplica un `THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })`.
  - Si `coverEscena` está ausente o no está definido, se usa como salvaguarda un `THREE.MeshStandardMaterial({ color: 0xd4a94e, roughness: 0.5, metalness: 0.2 })` (tono dorado de la paleta), evitando que la escena falle o se rompa.

## 3. Interacción y Navegación

- Se implementó `THREE.Raycaster` compatible con eventos de puntero tanto de ratón (`click`) como táctiles (`touchstart`).
- Al seleccionar un libro:
  - Se activa un lerp manual cúbico suave de la cámara (`camera.position` y `lookAt`) hacia una posición frontal enfocada al libro seleccionado (~550 ms).
  - Al completar la animación, se realiza la navegación a `/cuentos/${slug}/leer/` usando la metadata `userData.slug` del mesh.

## 4. Gestión de Memoria y Ciclo de Vida (Prevención de Fugas)

- El render loop utiliza `requestAnimationFrame` y cancela el frame con `cancelAnimationFrame` en el teardown.
- En `onDestroy` (y en el callback de cleanup de `onMount`):
  - Se remueven todos los listeners de eventos (`click`, `touchstart`, `resize`).
  - Se recorren y disponen explícitamente todas las geometrías (`geometry.dispose()`).
  - Se disponen todos los materiales (`material.dispose()`).
  - Se disponen todas las texturas cargadas (`texture.dispose()`).
  - Se libera el contexto de WebGL mediante `renderer.dispose()`.

## 5. Accesibilidad por Teclado y Fallback 2D

- **Escena 3D:** El canvas incluye `tabindex="0"`, `role="region"`, `aria-label` descriptivo y soporte táctil/ratón. Sin embargo, no se implementó un sistema de navegación raycasting por teclado tridimensional (flechas / tabulación entre mallas 3D individuales) para mantener la ligereza y evitar sobreingeniería.
- **Garantía Accesible:** Cuando el usuario navega con `prefers-reduced-motion: reduce`, o si el navegador/dispositivo no soporta WebGL, el módulo Three.js no se importa en lo absoluto y la escena 3D no se monta. El grid 2D semántico (`<section aria-label="Colección de cuentos interactivos" ...>`) con enlaces estándar y foco accesible permanece visible como la experiencia principal.
- Cuando WebGL está disponible y Three.js inicializa correctamente, se oculta el grid 2D con `document.querySelector('[data-pequenos-fallback]')?.setAttribute('hidden', '')`.

## 6. Resultado de Verificación de Tipos

Ejecución de `npx astro check` en `saberparatodos`:
```text
Result (603 files): 
- 0 errors
- 0 warnings
- 119 hints
```
Código de salida: 0. Cero errores de tipos y compilación limpia.
