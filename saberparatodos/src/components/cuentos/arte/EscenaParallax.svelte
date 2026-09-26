<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
<script lang="ts">
  import './tokens.css';
  import './escena-viva.css';
  import type { Hotspot } from './EscenaSVG.svelte';
  import type { EscenaCapas } from '../../../lib/cuentos/escenas-capas';
  import { blip, nota, celebracion, sonido } from '../../../lib/cuentos/sonidos';

  /** Hotspot reportado a onHotspotTrigger (coordenadas en el viewBox 800x450). */
  type HotspotEvento = Hotspot & { accion?: string };

  export interface Props {
    fondo?: string;
    medio?: string;
    frente?: string;
    escenaCapas?: EscenaCapas;
    /** Marcadores por coordenadas (legado). Preferir data-hotspot dentro del SVG. */
    hotspots?: Hotspot[];
    tituloAccesible?: string;
    descripcionAccesible?: string;
    className?: string;
    onHotspotTrigger?: (hotspot: HotspotEvento) => void;
    onTapReaction?: () => void;
  }

  let {
    fondo = '',
    medio = '',
    frente = '',
    escenaCapas,
    hotspots = [],
    tituloAccesible = 'Escena parallax 2.5D',
    descripcionAccesible = '',
    className = '',
    onHotspotTrigger,
    onTapReaction
  }: Props = $props();

  const VB_W = 800;
  const VB_H = 450;

  let containerEl = $state<HTMLDivElement | null>(null);
  let svgEl = $state<SVGSVGElement | null>(null);
  let isBouncing = $state(false);
  let isReducedMotion = $state(false);

  // Cámara parallax (lerp). Solo se reescribe estado cuando hay movimiento real.
  let currX = $state(0);
  let currY = $state(0);
  let targetX = 0;
  let targetY = 0;
  let rafId: number | null = null;

  // Capa de "juego": globo de diálogo, chispas, zoom, conteo, pistas.
  let globo = $state<{ texto: string; left: number; top: number; abajo: boolean; key: number } | null>(null);
  let chispas = $state<{ id: number; left: number; top: number; dx: number; dy: number; color: string }[]>([]);
  let zoom = $state<{ id: string; s: number; tx: number; ty: number } | null>(null);
  let contador = $state<{ n: number; total: number; nombre: string; completo: boolean } | null>(null);
  let pistas = $state<{ id: string; left: number; top: number }[]>([]);
  let anuncio = $state('');

  const timers = new Set<ReturnType<typeof setTimeout>>();
  let seq = 0;

  function later(fn: () => void, ms: number) {
    const t = setTimeout(() => {
      timers.delete(t);
      fn();
    }, ms);
    timers.add(t);
    return t;
  }

  const rawFondo = $derived(escenaCapas?.fondo || fondo);
  const rawMedio = $derived(escenaCapas?.medio || medio);
  const rawFrente = $derived(escenaCapas?.frente || frente);
  const rawDefs = $derived(escenaCapas?.defs || '');
  const esInteractiva = $derived(
    hotspots.length > 0 || /data-hotspot=/.test(rawFondo + rawMedio + rawFrente)
  );

  // Profundidad por plano (transform-only). En zoom la cámara se centra.
  const fondoTransform = $derived(
    isReducedMotion ? 'none' : `translate3d(${(currX * -4).toFixed(2)}px, ${(currY * -4).toFixed(2)}px, 0px)`
  );
  const medioTransform = $derived(
    isReducedMotion ? 'none' : `translate3d(${(currX * 8).toFixed(2)}px, ${(currY * 8).toFixed(2)}px, 0px)`
  );
  const frenteTransform = $derived(
    isReducedMotion ? 'none' : `translate3d(${(currX * 16).toFixed(2)}px, ${(currY * 16).toFixed(2)}px, 0px)`
  );
  const stageTransform = $derived(
    zoom ? `translate(${zoom.tx.toFixed(2)}%, ${zoom.ty.toFixed(2)}%) scale(${zoom.s.toFixed(3)})` : 'none'
  );

  /** Compatibilidad: blip de toque de escena (ahora con AudioContext compartido). */
  function playWebAudioBlip(frequency = 659.25) {
    blip(frequency);
  }

  // ---------------- Cámara parallax ----------------
  function loop() {
    const dx = targetX - currX;
    const dy = targetY - currY;
    if (Math.abs(dx) < 0.002 && Math.abs(dy) < 0.002) {
      rafId = null; // convergió: el loop se duerme hasta el próximo movimiento
      return;
    }
    currX += dx * 0.1;
    currY += dy * 0.1;
    rafId = requestAnimationFrame(loop);
  }

  function setTarget(x: number, y: number) {
    if (isReducedMotion) return;
    targetX = zoom ? 0 : Math.max(-1, Math.min(1, x));
    targetY = zoom ? 0 : Math.max(-1, Math.min(1, y));
    if (rafId === null && typeof requestAnimationFrame !== 'undefined') {
      rafId = requestAnimationFrame(loop);
    }
  }

  function setTargetFromPoint(clientX: number, clientY: number) {
    if (isReducedMotion || !containerEl) return;
    const rect = containerEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    setTarget(
      (clientX - (rect.left + rect.width / 2)) / (rect.width / 2),
      (clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    );
  }

  function handlePointerMove(e: PointerEvent) {
    setTargetFromPoint(e.clientX, e.clientY);
  }

  function handleTouchMove(e: TouchEvent) {
    if (e.touches[0]) setTargetFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  }

  function handleDeviceOrientation(e: DeviceOrientationEvent) {
    if (isReducedMotion) return;
    if (e.gamma !== null && e.beta !== null) {
      setTarget(e.gamma / 45, e.beta / 45);
    }
  }

  // ---------------- Geometría ----------------
  /** Rect del elemento relativo al contenedor, en % (sirve con y sin zoom). */
  function rectRel(el: Element) {
    const c = containerEl!.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      cx: ((r.left - c.left + r.width / 2) / c.width) * 100,
      cy: ((r.top - c.top + r.height / 2) / c.height) * 100,
      top: ((r.top - c.top) / c.height) * 100,
      bottom: ((r.bottom - c.top) / c.height) * 100,
      w: r.width / c.width,
      h: r.height / c.height
    };
  }

  /** Centro del elemento en coordenadas del viewBox (sin zoom aplicado). */
  function centroViewBox(el: Element) {
    const s = svgEl!.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(((r.left + r.width / 2 - s.left) / s.width) * VB_W),
      y: Math.round(((r.top + r.height / 2 - s.top) / s.height) * VB_H)
    };
  }

  // ---------------- Capa de juego ----------------
  function mostrarGlobo(el: Element, texto: string | null, fijo = false) {
    if (!texto || !containerEl) return;
    if (fijo) {
      // En zoom el elemento ocupa casi toda la vista: el globo va abajo al centro.
      globo = { texto, left: 50, top: 96, abajo: false, key: ++seq };
    } else {
      const r = rectRel(el);
      const abajo = r.top < 24;
      globo = {
        texto,
        left: Math.max(16, Math.min(84, r.cx)),
        top: Math.max(4, Math.min(92, abajo ? r.bottom : r.top)),
        abajo,
        key: ++seq
      };
    }
    const k = globo.key;
    later(() => {
      if (globo?.key === k) globo = null;
    }, 2200);
  }

  function lanzarChispas(left: number, top: number, cantidad = 7) {
    if (isReducedMotion) return;
    const colores = ['#D4A94E', '#FF9F43', '#FFE3B3', '#4FB6A3'];
    const nuevas = Array.from({ length: cantidad }, (_, i) => {
      const ang = (Math.PI * 2 * i) / cantidad + Math.random() * 0.5;
      const dist = 34 + Math.random() * 26;
      return {
        id: ++seq,
        left,
        top,
        dx: Math.cos(ang) * dist,
        dy: Math.sin(ang) * dist,
        color: colores[i % colores.length]
      };
    });
    chispas = [...chispas, ...nuevas];
    const ids = new Set(nuevas.map((c) => c.id));
    later(() => {
      chispas = chispas.filter((c) => !ids.has(c.id));
    }, 850);
  }

  function reaccionar(el: Element, accion: string) {
    // Reinicia la animación aunque ya estuviera activa (toques repetidos).
    el.removeAttribute('data-reaccion');
    void (el as HTMLElement).getBoundingClientRect();
    el.setAttribute('data-reaccion', accion);
    later(() => el.getAttribute('data-reaccion') === accion && el.removeAttribute('data-reaccion'), 800);
  }

  function entrarZoom(el: Element, id: string) {
    // Fracciones relativas al propio svg: invariantes al zoom actual (escala uniforme).
    // Si el hotspot contiene un mini-juego de conteo, se encuadra ese grupo
    // (objetos pequeños → quedan del tamaño de un dedo en móvil).
    const foco = el.querySelector('[data-contar]') ?? el;
    const s0 = svgEl!.getBoundingClientRect();
    const r = foco.getBoundingClientRect();
    const cx = ((r.left + r.width / 2 - s0.left) / s0.width) * 100;
    const cy = ((r.top + r.height / 2 - s0.top) / s0.height) * 100;
    const w = r.width / s0.width;
    const h = r.height / s0.height;
    const s =Math.max(1.6, Math.min(2.6, Math.min(0.75 / Math.max(w, 0.01), 0.75 / Math.max(h, 0.01))));
    const clamp = (v: number) => Math.max(100 - s * 100, Math.min(0, v));
    zoom = { id, s, tx: clamp(50 - s * cx), ty: clamp(50 - s * cy) };
    targetX = targetY = 0;
    setTarget(0, 0);
    anuncio = 'Mirando de cerca. Toca la equis para volver.';
  }

  function salirZoom() {
    zoom = null;
    anuncio = 'Escena completa.';
  }

  function contar(el: Element) {
    const grupo = el.closest('[data-contar]');
    if (!grupo) return;
    const nombre = grupo.getAttribute('data-contar') || 'cosas';
    const total = grupo.querySelectorAll('[data-contable]').length;
    const ya = el.getAttribute('data-contado');

    if (ya) {
      nota(Number(ya) - 1);
      reaccionar(el, 'pop');
      return;
    }

    const n = grupo.querySelectorAll('[data-contado]').length + 1;
    el.setAttribute('data-contado', String(n));
    nota(n - 1);
    reaccionar(el, 'pop');

    // Número sobre el objeto contado (en su propio espacio SVG: sigue al parallax/idle).
    try {
      const bb = (el as SVGGraphicsElement).getBBox();
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', String(bb.x + bb.width / 2));
      t.setAttribute('y', String(bb.y - 6));
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('class', 'cuento-numero-contado');
      t.setAttribute('aria-hidden', 'true');
      t.textContent = String(n);
      el.appendChild(t);
    } catch {
      /* getBBox no disponible (jsdom): el contador HTML basta */
    }

    const completo = n >= total;
    contador = { n, total, nombre, completo };
    anuncio = completo ? `¡${n} ${nombre}! Los contaste todos.` : String(n);

    const r = rectRel(el);
    lanzarChispas(r.cx, r.cy, completo ? 12 : 5);
    if (completo) later(() => celebracion(), 250);
  }

  function activarHotspot(el: Element) {
    const id = el.getAttribute('data-hotspot') || '';
    const accion = (el.getAttribute('data-accion') || 'salto').toLowerCase();
    const etiqueta = el.getAttribute('data-etiqueta') || id;

    sonido(el.getAttribute('data-sonido') || undefined);

    if (accion === 'zoom') {
      if (zoom?.id === id) {
        salirZoom();
      } else {
        entrarZoom(el, id);
        // El globo se calcula tras aplicar el zoom (posición final).
        later(() => mostrarGlobo(el, el.getAttribute('data-dice'), true), isReducedMotion ? 0 : 480);
      }
    } else {
      reaccionar(el, accion === 'spin' ? 'giro' : accion);
      const r = rectRel(el);
      lanzarChispas(r.cx, r.top + r.h * 30);
      mostrarGlobo(el, el.getAttribute('data-dice'));
    }

    if (onHotspotTrigger) {
      const c = centroViewBox(el);
      onHotspotTrigger({ id, x: c.x, y: c.y, etiqueta, accion });
    }
  }

  /** Resuelve un toque/tecla sobre un elemento declarado. true = consumido. */
  function manejarObjetivo(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) return false;
    const contable = target.closest('[data-contable]');
    const hotspot = target.closest('[data-hotspot]');
    const dentroDeZoom = hotspot?.getAttribute('data-accion') === 'zoom';

    // Objetos pequeños contables: se cuentan de cerca (en zoom) o si no dependen de uno.
    if (contable && (!dentroDeZoom || zoom?.id === hotspot?.getAttribute('data-hotspot'))) {
      contar(contable);
      return true;
    }
    if (hotspot) {
      activarHotspot(hotspot);
      return true;
    }
    return false;
  }

  function triggerSceneTapReaction() {
    if (isBouncing) return;
    isBouncing = true;
    playWebAudioBlip();
    if (onTapReaction) onTapReaction();
    later(() => {
      isBouncing = false;
    }, 600);
  }

  // ---------------- Pistas: qué se puede tocar ----------------
  let pistaTimer: ReturnType<typeof setTimeout> | null = null;

  function programarPistas(ms: number) {
    if (pistaTimer) {
      clearTimeout(pistaTimer);
      timers.delete(pistaTimer);
    }
    pistaTimer = later(() => {
      if (!containerEl || zoom) return;
      pistas = Array.from(containerEl.querySelectorAll('[data-hotspot]')).map((el) => {
        const r = rectRel(el);
        return { id: el.getAttribute('data-hotspot') || '', left: r.cx, top: r.cy };
      });
      later(() => (pistas = []), 2600);
    }, ms);
  }

  function registrarInteraccion() {
    pistas = [];
    programarPistas(12000);
  }

  function handleClick(e: MouseEvent) {
    registrarInteraccion();
    if (manejarObjetivo(e.target)) return;
    if (zoom) {
      salirZoom();
      return;
    }
    triggerSceneTapReaction();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && zoom) {
      e.preventDefault();
      salirZoom();
      return;
    }
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    registrarInteraccion();
    if (e.target !== containerEl && manejarObjetivo(e.target)) return;
    // Espejo de handleClick: si el Enter/Space vino del botón visible de
    // salir-zoom (fuera de cualquier [data-hotspot]), su propio onclick ya
    // cerró el zoom pero el keydown sigue burbujeando hasta aquí — sin este
    // check se disparaba un rebote+sonido extra encima del cierre.
    if (zoom) {
      salirZoom();
      return;
    }
    triggerSceneTapReaction();
  }

  // ---------------- Ciclo de vida ----------------
  $effect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion = mediaQuery.matches;

    function handleMediaChange(e: MediaQueryListEvent) {
      isReducedMotion = e.matches;
      if (isReducedMotion) {
        targetX = targetY = 0;
        currX = currY = 0;
      }
    }

    if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', handleMediaChange);
    else if (mediaQuery.addListener) mediaQuery.addListener(handleMediaChange);

    // Pistas iniciales (sin movimiento: solo aparecen/desaparecen).
    if (esInteractiva) programarPistas(3500);

    // Con movimiento reducido NO se registran listeners de movimiento ni rAF.
    const conMovimiento = !isReducedMotion;
    if (conMovimiento && typeof window.DeviceOrientationEvent !== 'undefined') {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      if (conMovimiento && typeof window.DeviceOrientationEvent !== 'undefined') {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', handleMediaChange);
      else if (mediaQuery.removeListener) mediaQuery.removeListener(handleMediaChange);
      timers.forEach(clearTimeout);
      timers.clear();
    };
  });
</script>

<div
  bind:this={containerEl}
  class="cuento-parallax-container {className}"
  class:is-zoomed={zoom !== null}
  role="region"
  aria-label={tituloAccesible}
  data-zoom={zoom ? zoom.id : undefined}
  onpointermove={handlePointerMove}
  ontouchmove={handleTouchMove}
  onclick={handleClick}
  onkeydown={handleKeydown}
  tabindex="0"
>
  <div class="parallax-stage" style="transform: {stageTransform};">
    <svg
      bind:this={svgEl}
      viewBox="0 0 800 450"
      role={esInteractiva ? 'group' : 'img'}
      aria-label={tituloAccesible}
      class="cuento-parallax-svg"
    >
      <title>{tituloAccesible}</title>
      {#if descripcionAccesible}
        <desc>{descripcionAccesible}</desc>
      {/if}

      <defs>
        <rect id="parallax-canvas" width="800" height="450" fill="#FDF6EC" rx="12" />
        {#if rawDefs}
          {@html rawDefs}
        {/if}
      </defs>

      <!-- Base Canvas -->
      <use href="#parallax-canvas" />

      <!-- Plano 1: Fondo -->
      <g id="plano-fondo" data-plane="fondo" class="parallax-plane plane-fondo" style="transform: {fondoTransform};">
        {@html rawFondo}
      </g>

      <!-- Plano 2: Medio -->
      <g id="plano-medio" data-plane="medio" class="parallax-plane plane-medio" style="transform: {medioTransform};">
        {@html rawMedio}
      </g>

      <!-- Plano 3: Frente (Comprehends tap bounce reaction) -->
      <g
        id="plano-frente"
        data-plane="frente"
        class="parallax-plane plane-frente {isBouncing ? 'cuento-frente-bounce' : ''}"
        style="transform: {frenteTransform};"
      >
        {@html rawFrente}
      </g>

      <!-- Hotspots por coordenadas (legado; los SVG nuevos usan data-hotspot) -->
      {#if hotspots.length > 0}
        <g id="hotspots-parallax-layer">
          {#each hotspots as hs (hs.id)}
            <g
              class="cuento-hotspot-marker"
              data-hotspot-id={hs.id}
              transform={`translate(${hs.x}, ${hs.y})`}
              role="button"
              tabindex="0"
              aria-label={hs.etiqueta}
              onclick={(e) => {
                e.stopPropagation();
                if (onHotspotTrigger) onHotspotTrigger(hs);
              }}
              onkeydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onHotspotTrigger) onHotspotTrigger(hs);
                }
              }}
            >
              <circle cx="0" cy="0" r="30" fill="transparent" />
              <circle cx="0" cy="0" r="22" fill="#FF9F43" opacity="0.35" class="cuento-respira" />
              <circle cx="0" cy="0" r="14" fill="#FF9F43" stroke="#FFFFFF" stroke-width="3" />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            </g>
          {/each}
        </g>
      {/if}
    </svg>
  </div>

  <!-- Capa de juego (HTML, fuera del SVG: tipografía nítida y posiciones en %) -->
  <div class="escena-juego" aria-hidden="true">
    {#each pistas as p (p.id)}
      <span class="escena-pista" style="left: {p.left}%; top: {p.top}%;"></span>
    {/each}

    {#each chispas as c (c.id)}
      <span
        class="escena-chispa"
        style="left: {c.left}%; top: {c.top}%; --dx: {c.dx.toFixed(1)}px; --dy: {c.dy.toFixed(1)}px; color: {c.color};"
      >✦</span>
    {/each}

    {#if globo}
      {#key globo.key}
        <span
          class="escena-globo"
          class:abajo={globo.abajo}
          class:fijo={globo.top >= 96}
          data-testid="globo-escena"
          style="left: {globo.left}%; top: {globo.top}%;"
        >{globo.texto}</span>
      {/key}
    {/if}
  </div>

  {#if contador}
    <div
      class="escena-contador"
      class:completo={contador.completo}
      data-testid="contador-cuento"
      data-n={contador.n}
      aria-hidden="true"
    >
      <span class="contador-numero">{contador.n}</span>
      <span class="contador-texto">{contador.completo ? `¡${contador.nombre}!` : `de ${contador.total}`}</span>
    </div>
  {/if}

  {#if zoom}
    <button
      type="button"
      class="escena-salir-zoom"
      aria-label="Volver a ver toda la escena"
      data-testid="salir-zoom"
      onclick={(e) => {
        e.stopPropagation();
        salirZoom();
      }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" />
      </svg>
    </button>
  {/if}

  <span class="sr-only" aria-live="polite">{anuncio}</span>
</div>

<style>
  .cuento-parallax-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    background-color: var(--cuento-bg-hueso, #FDF6EC);
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(58, 46, 42, 0.08);
    overflow: hidden;
    cursor: pointer;
    touch-action: pan-y;
    outline: none;
  }

  .cuento-parallax-container:focus-visible {
    box-shadow: 0 0 0 3px var(--cuento-cometa, #5B6FD6);
  }

  .parallax-stage {
    transform-origin: 0 0;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }

  .cuento-parallax-svg {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 800 / 450;
  }

  .parallax-plane {
    will-change: transform;
    transform-origin: center center;
  }

  .cuento-frente-bounce {
    animation: cuento-frente-bounce-kf var(--t-bote, 0.6s) cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes cuento-frente-bounce-kf {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-18px);
    }
  }

  .cuento-hotspot-marker {
    cursor: pointer;
  }

  /* ---------- Capa de juego ---------- */
  .escena-juego {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .escena-globo {
    position: absolute;
    transform: translate(-50%, calc(-100% - 10px));
    max-width: 60%;
    padding: 0.4rem 0.85rem;
    border-radius: 1.1rem;
    background: #FFFDF7;
    border: 2.5px solid #D4A94E;
    color: var(--cuento-tinta, #3A2E2A);
    font-family: var(--font-cuentos-titulo, 'Fredoka', system-ui, sans-serif);
    font-weight: 600;
    font-size: clamp(0.95rem, 2.8vw, 1.35rem);
    line-height: 1.2;
    text-align: center;
    white-space: nowrap;
    box-shadow: 0 6px 16px rgba(18, 24, 50, 0.18);
    animation: escena-globo-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .escena-globo::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -9px;
    width: 14px;
    height: 14px;
    background: #FFFDF7;
    border-right: 2.5px solid #D4A94E;
    border-bottom: 2.5px solid #D4A94E;
    transform: translateX(-50%) rotate(45deg);
  }

  .escena-globo.fijo {
    transform: translate(-50%, -100%);
  }

  .escena-globo.fijo::after {
    display: none;
  }

  .escena-globo.abajo {
    transform: translate(-50%, 12px);
  }

  .escena-globo.abajo::after {
    top: -9px;
    bottom: auto;
    transform: translateX(-50%) rotate(225deg);
  }

  @keyframes escena-globo-in {
    from {
      opacity: 0;
      scale: 0.6;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  .escena-chispa {
    position: absolute;
    font-size: 1.1rem;
    line-height: 1;
    transform: translate(-50%, -50%);
    animation: escena-chispa-vuela 0.8s ease-out forwards;
    text-shadow: 0 0 6px rgba(255, 227, 179, 0.9);
  }

  @keyframes escena-chispa-vuela {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0.4);
    }
    100% {
      opacity: 0;
      transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.2) rotate(90deg);
    }
  }

  .escena-pista {
    position: absolute;
    width: 46px;
    height: 46px;
    margin: -23px 0 0 -23px;
    border-radius: 50%;
    border: 3px solid rgba(212, 169, 78, 0.95);
    box-shadow: 0 0 0 4px rgba(255, 227, 179, 0.45);
    animation: escena-pista-pulso 1.3s ease-out 2;
    opacity: 0;
  }

  @keyframes escena-pista-pulso {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    40% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(1.5);
    }
  }

  .escena-contador {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    background: #121832;
    color: #FFE3B3;
    border: 2px solid #D4A94E;
    font-family: var(--font-cuentos-titulo, 'Fredoka', system-ui, sans-serif);
    box-shadow: 0 4px 12px rgba(18, 24, 50, 0.3);
    pointer-events: none;
  }

  .contador-numero {
    font-size: 1.9rem;
    font-weight: 700;
    line-height: 1;
  }

  .contador-texto {
    font-size: 1rem;
    font-weight: 600;
  }

  .escena-contador.completo {
    background: #D4A94E;
    color: #121832;
    animation: escena-globo-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .escena-salir-zoom {
    position: absolute;
    right: 0.6rem;
    top: 0.6rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #121832;
    color: #FFE3B3;
    border: 2px solid #D4A94E;
    box-shadow: 0 4px 12px rgba(18, 24, 50, 0.3);
    cursor: pointer;
  }

  .escena-salir-zoom:focus-visible {
    outline: 3px solid var(--cuento-cometa, #5B6FD6);
    outline-offset: 2px;
  }

  .sr-only {
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

  @media (prefers-reduced-motion: reduce) {
    .parallax-plane {
      will-change: auto !important;
      transform: none !important;
      transition: none !important;
    }

    .parallax-stage {
      transition: none !important;
      will-change: auto;
    }

    .cuento-frente-bounce,
    .escena-globo,
    .escena-contador.completo {
      animation: none !important;
    }

    .escena-chispa {
      display: none;
    }

    /* Pistas estáticas (sin pulso) pero visibles un momento. */
    .escena-pista {
      animation: none !important;
      opacity: 1;
    }
  }
</style>
