# Rediseño nivel StoryComet — spec desde evidencia directa

Fecha: 2026-09-11. Método: navegación real con browser (loader, cover
door, HUD, reader gate, `story.json`, `scenes.js`, `__storylight` API,
DOM + computed styles). Captura: `review/storycomet-cover-door.png`.
Tipografías confirmadas: Andika (cuerpo lector), Fredoka, Baloo 2.

Veredicto honesto: nuestro motor (validador, packs, quiz, RLS, e2e) es
sólido; nuestra EXPERIENCIA es un artículo web. Esto no se arregla con
tweaks: el lector debe reescribirse como app inmersiva. Contenido
(textos, quizzes, SVG) se conserva al 100%.

## 1. Lo que StoryComet hace (visto, no supuesto)

1. **Shell nocturno**: vacío azul noche `#121832`, tarjetas crema
   `#FFF9DC`, dorado `#D4A94E`, botones de madera juguete (borde
   grueso tan + cara blanca + sombra suave + emoji).
2. **HUD persistente**: estrellas `/150`, checks `/75`, pins `/75` +
   4 botones redondos (sonido, idioma/bandera, perfil/oso, ajustes).
3. **Puerta por libro**: portada spotlight + blurb + progreso de
   descarga con copy lúdico ("Tidying the table…") + botón primario
   "Open the book" + "Back to the shelf".
4. **Spread inmersivo**: tarjeta crema con filigrana dorada en
   esquinas, SIN chrome adulto (sin nav, sin breadcrumbs, sin footer).
5. **Modelo `story.json`**: páginas con `text` con markup inline
   `{palabra:efecto/ref}`, `hint` (prompt para el acudiente),
   `words` (vocabulario), héroe GLB + clips, `narrator` (voz + speed
   + instructions por personaje), `bundled voice/mp3 + timings:true`
   (resaltado con timings PRECOMPUTADOS, no sync en vivo), `pins` con
   posiciones 3D, `quiz` con imágenes + right/wrong, `audio`
   (música + ambiente con provenance de generación IA).
6. **Escenas diorama 2.5D**: PNGs por capas (fondo/medio/frente) +
   normal maps + héroe GLB; hints táctiles ("Tap the lamp",
   "Drag the balloon", "Push the cloud").
7. **SFX por interacción**: MP3s (gust, boing, giggle, hoot…).
8. **Loader con encanto**: cielo pintado + luna dormida + copy
   ("Best with sound on · Touch everything").

Insight clave: paridad NO exige Three.js. Sus escenas son capas 2D
con parallax; Three.js es solo el renderer. Paridad = capas SVG +
parallax CSS/GSAP + tacto + SFX + timings.

## 2. Spec de rediseño (ola C7, 8 issues)

- C7.01 **Shell nocturno + HUD**: Layout modo lectura (`/cuentos/*`):
  fondo noche, HUD (estrellas/pins/progreso reales del store),
  4 botones redondos madera (sonido, idioma ES, perfil, ajustes).
  Sin nav/breadcrumb/footer en lectura.
- C7.02 **Puerta por libro**: `/cuentos/<slug>` se vuelve puerta
  (portada grande + blurb + botón "Abrir el cuento" + volver al
  estante). El texto completo vive en `/cuentos/<slug>/leer/`.
- C7.03 **Spread inmersivo**: tarjeta crema + filigrana SVG en
  esquinas + Andika 24px + paginación por dots + flechas grandes.
  Reemplaza el artículo actual (mover lectura a `/leer/`).
- C7.04 **Tipografías**: @fontsource/andika (cuerpo) + fredoka
  (display), locales, con fallback. (Regla Gara-G: fonts locales.)
- C7.05 **Contenido v2 (Jules, 10 cuentos)**: añadir por página
  `hint` (prompt acudiente) + `words` (vocabulario) al formato;
  validador los exige; packs los exponen. Backward compatible.
- C7.06 **Parallax 2.5D**: escenas SVG partidas en 3 planos
  (fondo/medio/frente reutilizando piezas) + parallax al mover/
  tocar + reacción táctil + reduced-motion. GSAP solo
  transform/opacity (skill 60fps-animation).
- C7.07 **Audio + timings**: narración MP3 por página (edge-tts,
  voz elegida) + `timings` estimados por palabra (duración audio
  × peso por caracteres) en el pack; player con resaltado por
  timings y fallback Web Speech. SFX UI con WebAudio synth
  (SFX por escena = gap documentado, fase 2).
- C7.08 **Quiz con imágenes + loader con encanto**: opciones con
  retratos SVG + feedback right/wrong existente; loader de
  `/cuentos/` con cielo/luna/copy lúdico (SVG, sin peso).

## 3. Lo que NO se toca

Textos, quizzes, validaciones, RLS, packs v1 (se extienden, no se
rompen), e2e existente (se amplía, no se reduce — lección #1301),
español neutro, copyright, modo no-listado.

## 4. Definición de paridad (verificable)

Captura desktop + móvil del spread Tana lado a lado con la puerta de
Otto: noche + crema + HUD + Andika + hint visible + palabra
resaltada al narrar + escena con 3 planos + quiz con imágenes.
Revisión con visión PASS = C7 cerrada.
