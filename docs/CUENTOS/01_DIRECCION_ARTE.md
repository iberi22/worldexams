# Dirección de arte — Cuentos SaberParaTodos

Hermes es dueño del diseño (personajes, SVG, animaciones). Este documento
es la ley visual. Jules la ejecuta, no la reinventa.

## 1. Principios

1. Cálido, no corporativo. Excepción explícita al tema edge-hive: los
   cuentos usan su propia paleta amable (fondo hueso, no fondo oscuro).
2. Formas grandes y redondas. Trazos gruesos (3-4px), ojos grandes,
   sonrisas simples. Nada realista, nada que asuste.
3. Un personaje = un color. Cada protagonista tiene color firma para que
   el niño lo reconozca sin leer.
4. Todo vectorial. Cero PNG/JPG de personajes. Solo SVG inline o archivos
   .svg. Las texturas son patrones SVG, no imágenes.
5. Movimiento suave y opcional. Toda animación respeta
   `prefers-reduced-motion` (se congela en pose final).

## 2. Paleta

- Fondo página: #FDF6EC (hueso cálido)
- Tinta texto: #3A2E2A (marrón suave, no negro puro)
- Acento alegría: #FF9F43 (naranja mango)
- Acento calma: #4FB6A3 (verde agua)
- Acento noche/magia: #5B6FD6 (azul cometa)
- Peligro/error amable: #E26D5A (terracota, nunca rojo puro)

Colores firma por cuento:
01 Tana tucán #FF9F43 · 02 Bruno zorro #E8B04B · 03 Nieve osa #BFD9E8 ·
04 Zara jirafa #F2C14E · 05 Lila tortuga #4FB6A3 · 06 Pipo/Mía #9B7EDE ·
07 Vela #5B6FD6 · 08 Emilio #C97B3D · 09 Lucía #E26D5A · 10 Tomás #7BAE5A

## 3. Personajes (reglas de dibujo)

- Construcción: círculos + óvalos + rectángulos redondeados. Sin paths
  libres salvo picos/aletas (máx 6 nodos).
- Ojos: dos círculos blancos + pupila oscura + brillo. Misma plantilla
  en todos (`ojos.svg` parcial reutilizable).
- Tamaño: viewBox 0 0 200 200 para retratos; cuerpo completo 0 0 200 260.
- Archivo por personaje: `questions_data/cuentos/<slug>/personajes/<nombre>.svg`
- Cada SVG lleva header de copyright (ver 02_COPYRIGHT_Y_FORMATO.md).
- Prohibido: dientes afilados, ojos rojos, armas, sangre, sombra
  realista, degradados complejos (máx 2 paradas).

## 4. Escenas

- Una escena = un SVG panorámico viewBox 0 0 800 450, 3 planos
  (fondo, medio, frente). Máx 60 nodos por escena.
- Reutilizar piezas: sol, luna, nube, árbol, ola, estrella viven en
  `saberparatodos/src/components/cuentos/arte/piezas/` y se componen,
  no se redibujan.
- Interactividad (lector): 2-3 zonas táctiles por escena con reacción
  (salto, giro, sonido WebAudio). Definidas en el JSON del cuento
  (`hotspots`), no hardcodeadas en el componente.

## 5. Animaciones

- Solo CSS keyframes + SMIL básico. Three.js PROHIBIDO en cuentos
  (costo, peso y batería; decisión anotada, reversible en ola futura).
- Tokens: `--t-bote` (salto 0.6s), `--t-respira` (escala 2.4s loop),
  `--t-aparece` (fade+sube 0.5s), `--t-meneo` (rotación ±6° 0.8s).
- Resaltado de lectura: palabra activa con fondo #FFE3B3 + escala 1.06,
  transición 0.15s. Sin parpadeos.
- Quizzes: correcta = bote + confeti SVG (12 piezas, 1.2s); incorrecta =
  meneo suave, sin sonido de error (solo tono neutro WebAudio).

## 6. Tipografía

- Títulos: la misma familia display del sitio (fallback: Baloo 2).
- Cuerpo cuento: sans redondeada, 1.35rem mínimo, interlineado 1.7.
- Nunca texto dentro del SVG (accesibilidad + traducción). El texto va
  en HTML; el SVG solo dibuja.

## 7. Checklist de entrega visual (para issues de Jules)

- [ ] SVG abre sin errores y pesa < 25 KB por personaje, < 60 KB escena
- [ ] `grep -c "image\|base64" <archivo>.svg` == 0 (puro vector)
- [ ] Personaje reconocible a 48px (favicon test)
- [ ] Funciona con `prefers-reduced-motion: reduce` (pose final visible)
- [ ] Captura desktop + móvil adjunta al PR (regla visual BELA)
