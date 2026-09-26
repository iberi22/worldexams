<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  interface CuentoItem {
    slug: string;
    titulo: string;
    edad: string;
    coverEscena?: string;
  }

  interface Props {
    cuentos: CuentoItem[];
  }

  let { cuentos }: Props = $props();

  // The shelf has 10 slots (2 rows x 5). Any cuento beyond that has no book,
  // so in that case the 2D grid must stay visible or those cuentos would
  // silently vanish from the page.
  const MAX_SLOTS = 10;
  const shelfCuentos = $derived(cuentos.slice(0, MAX_SLOTS));

  let containerEl = $state<HTMLDivElement | null>(null);
  let canvasEl = $state<HTMLCanvasElement | null>(null);
  let status = $state<'checking' | 'ready' | 'unsupported'>('checking');
  // Index of the book whose keyboard link currently has focus (highlighted in 3D).
  let focusedIndex = $state<number | null>(null);

  // WebGL / Three.js state references to clean up in onDestroy
  let animFrameId: number | null = null;
  let cleanupFn: (() => void) | null = null;
  let destroyed = false;

  function fallbackEl(): HTMLElement | null {
    return document.querySelector<HTMLElement>('[data-pequenos-fallback]');
  }

  onMount(async () => {
    if (typeof window === 'undefined') return;

    // 1. Feature detection
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || cuentos.length === 0) {
      status = 'unsupported';
      return;
    }

    const testCanvas = document.createElement('canvas');
    const hasWebgl = Boolean(
      window.WebGLRenderingContext &&
      (testCanvas.getContext('webgl2') || testCanvas.getContext('webgl'))
    );

    if (!hasWebgl) {
      status = 'unsupported';
      return;
    }

    // 2. Dynamic import of Three.js
    let THREE: typeof import('three');
    try {
      THREE = await import('three');
    } catch {
      status = 'unsupported';
      return;
    }

    // The component may have been destroyed while the chunk was downloading;
    // don't create a renderer + endless rAF loop on a detached canvas.
    if (destroyed) return;

    if (!canvasEl || !containerEl) {
      status = 'unsupported';
      return;
    }

    // 3. Initialize Three.js Scene and Renderer
    let renderer: import('three').WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasEl,
        antialias: true,
        alpha: true, // Transparent to blend seamlessly with star background
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(containerEl.clientWidth, Math.max(containerEl.clientHeight, 480));
    } catch {
      // Renderer creation failed (lost context, driver bug, etc.): fall back
      // cleanly to the 2D grid instead of leaving a "loading" placeholder
      // pulsing forever above a section that never actually mounted.
      status = 'unsupported';
      return;
    }

    const scene = new THREE.Scene();

    const aspect = containerEl.clientWidth / Math.max(containerEl.clientHeight, 480);
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);

    // Books span x = -3.875..3.875 (outer book centre 3.2 + half width 0.675).
    // At a fixed z=11 a portrait phone viewport (aspect ~0.6) only shows about
    // +-3 units, cutting the outer columns off-screen (and making them
    // untappable). Pull the camera back just enough for narrow aspects.
    const FIT_HALF_WIDTH = 4.3;
    const BASE_CAMERA_Z = 11;
    function fittedCameraZ(a: number): number {
      const halfFovTan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      return Math.max(BASE_CAMERA_Z, FIT_HALF_WIDTH / (halfFovTan * a));
    }

    // Initial camera position centered on shelves
    const initialCamPos = new THREE.Vector3(0, 0, fittedCameraZ(aspect));
    const initialLookAt = new THREE.Vector3(0, 0, 0);

    camera.position.copy(initialCamPos);
    camera.lookAt(initialLookAt);

    // Track resources to dispose
    const disposables: {
      geometries: import('three').BufferGeometry[];
      materials: import('three').Material[];
      textures: import('three').Texture[];
    } = {
      geometries: [],
      materials: [],
      textures: []
    };

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff9dc, 0.7);
    dirLight.position.set(5, 8, 7);
    scene.add(dirLight);

    // Shelf geometry & material (2 planks for 2 rows of books)
    // Budget: 12 triangles per box * 2 = 24 triangles
    const shelfGeo = new THREE.BoxGeometry(9.2, 0.2, 1.4);
    disposables.geometries.push(shelfGeo);

    const shelfMat = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b,
      roughness: 0.7,
      metalness: 0.1
    });
    disposables.materials.push(shelfMat);

    // Top shelf (y = 0.4) and Bottom shelf (y = -2.2)
    const shelfTop = new THREE.Mesh(shelfGeo, shelfMat);
    shelfTop.position.set(0, 0.4, 0);
    scene.add(shelfTop);

    const shelfBottom = new THREE.Mesh(shelfGeo, shelfMat);
    shelfBottom.position.set(0, -2.2, 0);
    scene.add(shelfBottom);

    // Books: 2 rows of 5 books
    // Row 1 (y = 1.4), Row 2 (y = -1.2)
    // Shelf planks are at y = 0.4 (supporting book bottom y = 0.5) and y = -2.2 (supporting book bottom y = -2.1)
    const bookWidth = 1.35;
    const bookHeight = 1.8;
    const bookGeo = new THREE.PlaneGeometry(bookWidth, bookHeight);
    disposables.geometries.push(bookGeo);

    // Cover scenes are 16:9 SVGs (viewBox 800x450). Mapping them straight
    // onto a 3:4 book plane squashes them ~2.4x horizontally, so compose each
    // one onto a 3:4 canvas ("contain", framed) and use that as the texture.
    // The book shows a plain colour until the image loads, and keeps it if
    // the image fails (a failed TextureLoader would leave a black/blank book).
    const COVER_W = 360;
    const COVER_H = 480;
    function applyCover(url: string, mat: import('three').MeshBasicMaterial) {
      const img = new Image();
      if (/^https?:/i.test(url)) img.crossOrigin = 'anonymous';
      img.decoding = 'async';
      img.onload = () => {
        if (destroyed) return;
        try {
          const cv = document.createElement('canvas');
          cv.width = COVER_W;
          cv.height = COVER_H;
          const ctx = cv.getContext('2d');
          if (!ctx) return;
          ctx.fillStyle = '#1D2544';
          ctx.fillRect(0, 0, COVER_W, COVER_H);
          const pad = 18;
          const ratio = img.naturalWidth > 0 && img.naturalHeight > 0
            ? img.naturalHeight / img.naturalWidth
            : 450 / 800;
          const dw = COVER_W - pad * 2;
          const dh = Math.min(dw * ratio, COVER_H - pad * 2);
          ctx.drawImage(img, pad, (COVER_H - dh) / 2, dw, dh);
          ctx.strokeStyle = '#D4A94E';
          ctx.lineWidth = 8;
          ctx.strokeRect(4, 4, COVER_W - 8, COVER_H - 8);
          const tex = new THREE.CanvasTexture(cv);
          tex.colorSpace = THREE.SRGBColorSpace;
          disposables.textures.push(tex);
          mat.map = tex;
          mat.color.set(0xffffff);
          mat.needsUpdate = true;
        } catch {
          // Keep the plain colour book (e.g. browser refuses to rasterize the SVG).
        }
      };
      img.src = url;
    }

    const bookMeshes: import('three').Mesh[] = [];

    for (let i = 0; i < shelfCuentos.length; i++) {
      const cuento = shelfCuentos[i];
      const isTopRow = i < 5;
      const colIndex = i % 5;
      const x = [-3.2, -1.6, 0, 1.6, 3.2][colIndex];
      const y = isTopRow ? 1.4 : -1.2;

      const bookMat = new THREE.MeshBasicMaterial({ color: 0xd4a94e, side: THREE.DoubleSide });
      disposables.materials.push(bookMat);
      if (cuento.coverEscena) applyCover(cuento.coverEscena, bookMat);

      const bookMesh = new THREE.Mesh(bookGeo, bookMat);
      bookMesh.position.set(x, y, 0.15);
      bookMesh.userData = {
        slug: cuento.slug,
        titulo: cuento.titulo,
        baseY: y,
        index: i
      };

      scene.add(bookMesh);
      bookMeshes.push(bookMesh);
    }

    // Interaction & Animation State
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let isNavigating = false;
    const startPos = new THREE.Vector3().copy(initialCamPos);
    const startLookAt = new THREE.Vector3().copy(initialLookAt);
    const targetPos = new THREE.Vector3().copy(initialCamPos);
    const targetLookAt = new THREE.Vector3().copy(initialLookAt);
    const currentLookAt = new THREE.Vector3().copy(initialLookAt);
    let destinationUrl: string | null = null;
    let animationProgress = 0;

    function onPointerAction(clientX: number, clientY: number) {
      if (isNavigating || !canvasEl) return;
      const rect = canvasEl.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(bookMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0];
        const mesh = hit.object as import('three').Mesh;
        const slug = mesh.userData?.slug;
        if (slug) {
          isNavigating = true;
          destinationUrl = `/cuentos/${slug}/leer/`;
          // Freeze the animation's start point so the lerp below always runs
          // start -> target over the same ~550ms regardless of frame rate,
          // instead of an asymptotic per-frame factor that never truly
          // reaches the target (was desynced from the navigation timer).
          startPos.copy(camera.position);
          startLookAt.copy(currentLookAt);
          // Position camera zoomed in facing the chosen book
          targetPos.set(mesh.position.x, mesh.position.y, 3.2);
          targetLookAt.set(mesh.position.x, mesh.position.y, 0.15);
          animationProgress = 0;
        }
      }
    }

    // Only `click`: it fires for a mouse click and for a touch *tap*, but not
    // for a swipe. The previous `touchstart` listener navigated as soon as a
    // finger landed on a book — i.e. when a child merely started scrolling
    // the page over the (560px tall, near full-screen on phones) canvas.
    // `touch-action: manipulation` on the canvas already removes the tap delay.
    function handleClick(e: MouseEvent) {
      onPointerAction(e.clientX, e.clientY);
    }

    canvasEl.addEventListener('click', handleClick);

    // Responsive resize handler
    function handleResize() {
      if (!containerEl || !canvasEl) return;
      const width = containerEl.clientWidth;
      const height = Math.max(containerEl.clientHeight, 480);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      initialCamPos.z = fittedCameraZ(camera.aspect);
      if (!isNavigating) camera.position.copy(initialCamPos);
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', handleResize);

    // Render loop
    let lastTime = performance.now();

    function stopLoop() {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    }

    function animate(currentTime: number) {
      animFrameId = requestAnimationFrame(animate);

      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isNavigating) {
        animationProgress += delta * 1.8; // ~550ms transition
        const t = Math.min(animationProgress, 1);

        // Smooth cubic ease, applied from the frozen start point so the
        // camera visually finishes exactly when the navigation timer does,
        // on any frame rate.
        const ease = t * t * (3 - 2 * t);

        camera.position.lerpVectors(startPos, targetPos, ease);
        currentLookAt.lerpVectors(startLookAt, targetLookAt, ease);
        camera.lookAt(currentLookAt);

        if (t >= 1 && destinationUrl) {
          renderer.render(scene, camera);
          stopLoop();
          window.location.href = destinationUrl;
          return;
        }
      } else {
        // Subtle floating idle motion for the shelf
        const time = currentTime * 0.001;
        shelfTop.position.y = 0.4 + Math.sin(time) * 0.02;
        shelfBottom.position.y = -2.2 + Math.sin(time) * 0.02;
        for (const book of bookMeshes) {
          const focused = book.userData.index === focusedIndex;
          book.position.y = book.userData.baseY + Math.sin(time + book.userData.index * 0.3) * 0.025;
          book.position.z = focused ? 0.6 : 0.15;
          book.scale.setScalar(focused ? 1.12 : 1);
        }
      }

      renderer.render(scene, camera);
    }

    // Back/forward cache: when the child comes back from the reader with the
    // browser's back button, the page is restored as it was frozen — camera
    // zoomed into the book, loop stopped and isNavigating=true, which made
    // the shelf ignore every further tap. Reset to the idle state.
    function handlePageShow(e: PageTransitionEvent) {
      if (!e.persisted) return;
      isNavigating = false;
      destinationUrl = null;
      animationProgress = 0;
      camera.position.copy(initialCamPos);
      currentLookAt.copy(initialLookAt);
      camera.lookAt(currentLookAt);
      if (animFrameId === null && status === 'ready') {
        lastTime = performance.now();
        animFrameId = requestAnimationFrame(animate);
      }
    }

    window.addEventListener('pageshow', handlePageShow);

    // GPU context can be lost later (tab in background on low-memory phones,
    // driver reset). We don't try to restore it: stop rendering and hand the
    // page back to the accessible 2D grid instead of showing a dead canvas.
    function handleContextLost() {
      stopLoop();
      status = 'unsupported';
      fallbackEl()?.removeAttribute('hidden');
    }

    canvasEl.addEventListener('webglcontextlost', handleContextLost);

    // Register full cleanup
    cleanupFn = () => {
      stopLoop();

      if (canvasEl) {
        canvasEl.removeEventListener('click', handleClick);
        canvasEl.removeEventListener('webglcontextlost', handleContextLost);
      }

      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pageshow', handlePageShow);

      // Dispose Three.js objects
      for (const geo of disposables.geometries) {
        geo.dispose();
      }
      for (const mat of disposables.materials) {
        mat.dispose();
      }
      for (const tex of disposables.textures) {
        tex.dispose();
      }

      renderer.dispose();
    };

    // Confirmed initialization (scene fully built): only now hide the 2D
    // fallback — and only when every cuento has a book on the shelf.
    if (cuentos.length <= MAX_SLOTS) {
      fallbackEl()?.setAttribute('hidden', '');
    }
    status = 'ready';

    animFrameId = requestAnimationFrame(animate);
  });

  onDestroy(() => {
    destroyed = true;
    if (cleanupFn) {
      cleanupFn();
      cleanupFn = null;
    }
  });
</script>

<div
  bind:this={containerEl}
  class="pequenos-shelf-3d relative w-full rounded-2xl overflow-hidden border border-[#D4A94E]/30 bg-[#121832]/60 shadow-2xl backdrop-blur-sm"
  class:hidden={status === 'unsupported'}
  style="min-height: 480px; height: 560px;"
  role="region"
  aria-label="Estantería de cuentos"
>
  {#if status === 'checking'}
    <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[#FFF9DC]/80" aria-hidden="true">
      <div class="animate-pulse flex flex-col items-center gap-2">
        <span class="text-3xl">📚</span>
        <span class="text-sm font-semibold tracking-wide">Cargando biblioteca interactiva...</span>
      </div>
    </div>
  {/if}

  <!-- The canvas is purely visual for assistive tech: it can't expose the
       books. Keyboard and screen-reader users get the real links below. -->
  <canvas
    bind:this={canvasEl}
    class="w-full h-full block cursor-pointer select-none"
    style="touch-action: manipulation;"
    aria-hidden="true"
  ></canvas>

  {#if status === 'ready'}
    <!-- When the 3D shelf is active the 2D grid is hidden, so these links are
         the only way to reach the cuentos without a pointer. They are
         visually hidden until focused; focusing one lifts its book in 3D and
         shows a visible caption, so sighted keyboard users see where they are. -->
    <ul class="shelf-links" aria-label="Cuentos de la estantería">
      {#each shelfCuentos as cuento, i (cuento.slug)}
        <li>
          <a
            class="shelf-link"
            href={`/cuentos/${cuento.slug}/leer/`}
            onfocus={() => (focusedIndex = i)}
            onblur={() => {
              if (focusedIndex === i) focusedIndex = null;
            }}
          >
            Leer cuento: {cuento.titulo}, para {cuento.edad} años
          </a>
        </li>
      {/each}
    </ul>
  {/if}

  <div class="absolute bottom-3 left-4 right-4 pointer-events-none flex justify-between items-center text-xs text-[#FFF9DC]/60 font-body" aria-hidden="true">
    <span class="inline-flex items-center gap-1.5 bg-[#121832]/80 px-2.5 py-1 rounded-full border border-[#D4A94E]/20">
      ✨ Toca una portada para explorar
    </span>
    <span class="hidden sm:inline bg-[#121832]/80 px-2.5 py-1 rounded-full border border-[#D4A94E]/20">
      Vista 3D
    </span>
  </div>
</div>

<style>
  .pequenos-shelf-3d {
    perspective: 1000px;
  }

  .shelf-links {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Visually hidden until focused (standard sr-only pattern). */
  .shelf-link {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .shelf-link:focus {
    z-index: 2;
    width: auto;
    height: auto;
    margin: 0;
    clip: auto;
    overflow: visible;
    white-space: normal;
    left: 50%;
    bottom: 3.25rem; /* sobre la pista inferior; arriba lo tapa la cabecera fija */
    transform: translateX(-50%);
    max-width: calc(100% - 2rem);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 0.95rem;
    line-height: 1.25;
    background: #ff9f43;
    color: #20140a;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    outline: 3px solid #d4a94e;
    outline-offset: 3px;
  }
</style>
