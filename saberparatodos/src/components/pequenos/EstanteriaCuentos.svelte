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

  let containerEl = $state<HTMLDivElement | null>(null);
  let canvasEl = $state<HTMLCanvasElement | null>(null);
  let status = $state<'checking' | 'ready' | 'unsupported'>('checking');

  // WebGL / Three.js state references to clean up in onDestroy
  let animFrameId: number | null = null;
  let cleanupFn: (() => void) | null = null;

  onMount(async () => {
    if (typeof window === 'undefined') return;

    // 1. Feature detection
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
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

    // Confirmed initialization: hide 2D fallback
    document.querySelector('[data-pequenos-fallback]')?.setAttribute('hidden', '');
    status = 'ready';

    const scene = new THREE.Scene();

    const aspect = containerEl.clientWidth / Math.max(containerEl.clientHeight, 480);
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    // Initial camera position centered on shelves
    const initialCamPos = new THREE.Vector3(0, 0, 11);
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
    // Row 1 (y = 1.6), Row 2 (y = -1.0)
    // Shelf planks are at y = 0.4 (supporting book bottom y = 0.5) and y = -2.2 (supporting book bottom y = -2.1)
    const bookWidth = 1.35;
    const bookHeight = 1.8;
    const bookGeo = new THREE.PlaneGeometry(bookWidth, bookHeight);
    disposables.geometries.push(bookGeo);

    const textureLoader = new THREE.TextureLoader();
    const bookMeshes: import('three').Mesh[] = [];

    // Up to 10 books
    const totalSlots = Math.min(cuentos.length, 10);
    const xOffsets = [-3.2, -1.6, 0, 1.6, 3.2];

    for (let i = 0; i < totalSlots; i++) {
      const cuento = cuentos[i];
      const isTopRow = i < 5;
      const colIndex = i % 5;
      const x = xOffsets[colIndex];
      const y = isTopRow ? 1.4 : -1.2;

      let bookMat: import('three').Material;

      if (cuento.coverEscena) {
        const texture = textureLoader.load(cuento.coverEscena);
        disposables.textures.push(texture);
        bookMat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide
        });
      } else {
        // Fallback color if no coverEscena
        bookMat = new THREE.MeshStandardMaterial({
          color: 0xd4a94e,
          roughness: 0.5,
          metalness: 0.2
        });
      }
      disposables.materials.push(bookMat);

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
    let startPos = new THREE.Vector3().copy(initialCamPos);
    let startLookAt = new THREE.Vector3().copy(initialLookAt);
    let targetPos = new THREE.Vector3().copy(initialCamPos);
    let targetLookAt = new THREE.Vector3().copy(initialLookAt);
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
          targetPos = new THREE.Vector3(mesh.position.x, mesh.position.y, 3.2);
          targetLookAt = new THREE.Vector3(mesh.position.x, mesh.position.y, 0.15);
          animationProgress = 0;
        }
      }
    }

    function handleClick(e: MouseEvent) {
      onPointerAction(e.clientX, e.clientY);
    }

    function handleTouch(e: TouchEvent) {
      if (e.touches.length > 0) {
        onPointerAction(e.touches[0].clientX, e.touches[0].clientY);
      }
    }

    canvasEl.addEventListener('click', handleClick);
    canvasEl.addEventListener('touchstart', handleTouch, { passive: true });

    // Responsive resize handler
    function handleResize() {
      if (!containerEl || !canvasEl) return;
      const width = containerEl.clientWidth;
      const height = Math.max(containerEl.clientHeight, 480);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', handleResize);

    // Render loop
    let lastTime = performance.now();

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
          window.location.href = destinationUrl;
          return;
        }
      } else {
        // Subtle floating idle motion for the shelf
        const time = currentTime * 0.001;
        shelfTop.position.y = 0.4 + Math.sin(time) * 0.02;
        shelfBottom.position.y = -2.2 + Math.sin(time) * 0.02;
        for (const book of bookMeshes) {
          book.position.y = book.userData.baseY + Math.sin(time + book.userData.index * 0.3) * 0.025;
        }
      }

      renderer.render(scene, camera);
    }

    animFrameId = requestAnimationFrame(animate);

    // Register full cleanup
    cleanupFn = () => {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }

      if (canvasEl) {
        canvasEl.removeEventListener('click', handleClick);
        canvasEl.removeEventListener('touchstart', handleTouch);
      }

      window.removeEventListener('resize', handleResize);

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
  });

  onDestroy(() => {
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
  aria-label="Estantería interactiva en 3D de cuentos"
>
  {#if status === 'checking'}
    <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[#FFF9DC]/80" aria-hidden="true">
      <div class="animate-pulse flex flex-col items-center gap-2">
        <span class="text-3xl">📚</span>
        <span class="text-sm font-semibold tracking-wide">Cargando biblioteca interactiva...</span>
      </div>
    </div>
  {/if}

  <canvas
    bind:this={canvasEl}
    class="w-full h-full block cursor-pointer select-none"
    style="touch-action: manipulation;"
    tabindex="0"
    role="region"
    aria-label="Estantería 3D interactiva de cuentos. Haz clic o toca una portada para empezar a leer."
  ></canvas>

  <div class="absolute bottom-3 left-4 right-4 pointer-events-none flex justify-between items-center text-xs text-[#FFF9DC]/60 font-body">
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
</style>
