<script lang="ts">
  import { onMount } from 'svelte';
  import createGlobe from 'cobe';

  let canvas: HTMLCanvasElement;
  let phi = 0;
  let width = 0;

  // Country markers with their locations
  const countryMarkers = [
    { location: [19.4326, -99.1332], size: 0.08, color: [0, 0.4, 0.28] },      // Mexico
    { location: [-15.7801, -47.9292], size: 0.08, color: [0, 0.6, 0.22] },     // Brazil
    { location: [38.9072, -77.0369], size: 0.08, color: [0.24, 0.23, 0.43] },  // USA
    { location: [39.9042, 116.4074], size: 0.08, color: [0.87, 0.16, 0.06] },  // China
    { location: [28.6139, 77.2090], size: 0.08, color: [1, 0.6, 0.2] },        // India
    { location: [4.7110, -74.0721], size: 0.06, color: [1, 0.82, 0.08] },      // Colombia
    { location: [-34.6037, -58.3816], size: 0.06, color: [0.46, 0.72, 0.87] }, // Argentina
    { location: [-33.4489, -70.6693], size: 0.06, color: [0, 0.32, 0.6] },     // Chile
    { location: [-12.0464, -77.0428], size: 0.06, color: [0.82, 0.13, 0.16] }, // Peru
    { location: [48.8566, 2.3522], size: 0.06, color: [0, 0.14, 0.58] },       // France
    { location: [35.6762, 139.6503], size: 0.06, color: [1, 1, 1] },           // Japan
    { location: [37.5665, 126.9780], size: 0.06, color: [0, 0.32, 0.6] },      // Korea
    { location: [55.7558, 37.6173], size: 0.06, color: [1, 1, 1] },            // Russia
    { location: [-6.2088, 106.8456], size: 0.06, color: [0.82, 0.13, 0.16] },  // Indonesia
    { location: [30.0444, 31.2357], size: 0.06, color: [0.87, 0.16, 0.06] },   // Egypt
    { location: [6.5244, 3.3792], size: 0.06, color: [0, 0.53, 0.22] },        // Nigeria
  ];

  onMount(() => {
    let pointerInteracting: number | null = null;
    let pointerInteractionMovement = 0;

    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth;
      }
    };
    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.15],
      markerColor: [0, 1, 1],
      glowColor: [0, 0.5, 0.5],
      markers: countryMarkers,
      onRender: (state) => {
        if (!pointerInteracting) {
          phi += 0.003;
        }
        state.phi = phi + pointerInteractionMovement;
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    // Mouse interaction
    canvas.addEventListener('pointerdown', (e) => {
      pointerInteracting = e.clientX - pointerInteractionMovement;
      canvas.style.cursor = 'grabbing';
    });

    canvas.addEventListener('pointerup', () => {
      pointerInteracting = null;
      canvas.style.cursor = 'grab';
    });

    canvas.addEventListener('pointerout', () => {
      pointerInteracting = null;
      canvas.style.cursor = 'grab';
    });

    canvas.addEventListener('pointermove', (e) => {
      if (pointerInteracting !== null) {
        const delta = e.clientX - pointerInteracting;
        pointerInteractionMovement = delta / 100;
      }
    });

    // Fade in
    setTimeout(() => {
      canvas.style.opacity = '1';
    }, 100);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  });
</script>

<div class="relative w-full max-w-[600px] aspect-square">
  <canvas
    bind:this={canvas}
    class="w-full h-full cursor-grab opacity-0 transition-opacity duration-1000"
    style="contain: layout paint size;"
  ></canvas>
  <div class="globe-glow"></div>
</div>
