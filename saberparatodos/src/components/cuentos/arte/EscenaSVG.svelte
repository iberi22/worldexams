<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
<script lang="ts">
  import './tokens.css';

  export interface PiezaInstancia {
    id?: string;
    tipo: string;
    x: number;
    y: number;
    escala?: number;
    rotacion?: number;
    opacidad?: number;
    plano?: 'fondo' | 'medio' | 'frente';
    animacion?: 'bote' | 'respira' | 'aparece' | 'meneo' | string;
  }

  export interface Hotspot {
    id: string;
    x: number;
    y: number;
    etiqueta: string;
    icono?: string;
  }

  export interface EscenaPlanos {
    fondo?: string;
    medio?: string;
    frente?: string;
  }

  export interface Props {
    piezas?: PiezaInstancia[];
    hotspots?: Hotspot[];
    tituloAccesible: string;
    descripcionAccesible?: string;
    escena?: EscenaPlanos;
    className?: string;
  }

  let {
    piezas = [],
    hotspots = [],
    tituloAccesible,
    descripcionAccesible = '',
    escena = {},
    className = ''
  }: Props = $props();

  const piezasFondo = $derived(piezas.filter((p) => p.plano === 'fondo'));
  const piezasMedio = $derived(piezas.filter((p) => !p.plano || p.plano === 'medio'));
  const piezasFrente = $derived(piezas.filter((p) => p.plano === 'frente'));

  function getAnimClass(anim?: string): string {
    if (!anim) return '';
    if (anim === 'bote') return 'cuento-bote';
    if (anim === 'respira') return 'cuento-respira';
    if (anim === 'aparece') return 'cuento-aparece';
    if (anim === 'meneo') return 'cuento-meneo';
    return anim;
  }

  function getTransform(p: PiezaInstancia): string {
    const scale = p.escala ?? 1;
    const rot = p.rotacion ?? 0;
    return `translate(${p.x}, ${p.y}) scale(${scale}) rotate(${rot})`;
  }
</script>

<div class="cuento-escena-container {className}">
  <svg
    viewBox="0 0 800 450"
    role="img"
    aria-label={tituloAccesible}
    class="cuento-escena-svg"
  >
    <title>{tituloAccesible}</title>
    {#if descripcionAccesible}
      <desc>{descripcionAccesible}</desc>
    {/if}

    <defs>
      <!-- Simbolos de piezas reutilizables del sistema -->
      <!-- Sol -->
      <g id="pieza-sol">
        <g fill="#FFB765">
          <rect x="-8" y="-72" width="16" height="24" rx="8"/>
          <rect x="-8" y="48" width="16" height="24" rx="8"/>
          <rect x="-72" y="-8" width="24" height="16" rx="8"/>
          <rect x="48" y="-8" width="24" height="16" rx="8"/>
          <rect x="-54" y="-54" width="22" height="16" rx="8" transform="rotate(45 -43 -46)"/>
          <rect x="31" y="31" width="22" height="16" rx="8" transform="rotate(45 42 39)"/>
          <rect x="31" y="-54" width="22" height="16" rx="8" transform="rotate(-45 42 -46)"/>
          <rect x="-54" y="31" width="22" height="16" rx="8" transform="rotate(-45 -43 39)"/>
        </g>
        <circle cx="0" cy="0" r="50" fill="#FF9F43"/>
        <circle cx="0" cy="0" r="44" fill="#FFB05B"/>
        <circle cx="-15" cy="-8" r="6" fill="#FFFFFF"/>
        <circle cx="-14" cy="-7" r="3" fill="#3A2E2A"/>
        <circle cx="-13" cy="-9" r="1.2" fill="#FFFFFF"/>
        <circle cx="15" cy="-8" r="6" fill="#FFFFFF"/>
        <circle cx="16" cy="-7" r="3" fill="#3A2E2A"/>
        <circle cx="17" cy="-9" r="1.2" fill="#FFFFFF"/>
        <circle cx="-24" cy="2" r="5" fill="#E26D5A" opacity="0.6"/>
        <circle cx="24" cy="2" r="5" fill="#E26D5A" opacity="0.6"/>
        <path d="M -12 8 Q 0 20 12 8" fill="none" stroke="#3A2E2A" stroke-width="3.5" stroke-linecap="round"/>
      </g>

      <!-- Luna -->
      <g id="pieza-luna">
        <path d="M 50 -50 Q 50 -40 60 -40 Q 50 -40 50 -30 Q 50 -40 40 -40 Q 50 -40 50 -50 Z" fill="#F2C14E" opacity="0.8"/>
        <path d="M 15 -60 C 55 -60 70 -20 50 20 C 30 60 -20 70 -50 45 C -5 45 30 15 15 -60 Z" fill="#F2C14E"/>
        <path d="M -8 -10 Q 2 0 12 -10" fill="none" stroke="#3A2E2A" stroke-width="3" stroke-linecap="round"/>
        <circle cx="6" cy="4" r="6" fill="#E26D5A" opacity="0.5"/>
        <path d="M 15 -60 Q 40 -70 35 -45 C 25 -50 18 -55 15 -60 Z" fill="#5B6FD6"/>
        <circle cx="36" cy="-44" r="6" fill="#FFFFFF"/>
      </g>

      <!-- Nube -->
      <g id="pieza-nube">
        <path d="M -70 20 Q -85 20 -85 5 Q -85 -15 -65 -15 Q -55 -40 -25 -40 Q 0 -50 25 -35 Q 50 -45 65 -25 Q 85 -20 85 2 Q 85 20 65 20 Z" fill="#BFD9E8" opacity="0.6" transform="translate(0, 6)"/>
        <path d="M -70 20 Q -85 20 -85 5 Q -85 -15 -65 -15 Q -55 -40 -25 -40 Q 0 -50 25 -35 Q 50 -45 65 -25 Q 85 -20 85 2 Q 85 20 65 20 Z" fill="#FFFFFF"/>
        <circle cx="-25" cy="-18" r="28" fill="#FFFFFF"/>
        <circle cx="25" cy="-20" r="32" fill="#FFFFFF"/>
        <circle cx="60" cy="-5" r="22" fill="#FFFFFF"/>
        <circle cx="-58" cy="-2" r="22" fill="#FFFFFF"/>
      </g>

      <!-- Árbol -->
      <g id="pieza-arbol">
        <path d="M -15 10 Q -18 60 -35 100 L 35 100 Q 18 60 15 10 Z" fill="#C97B3D"/>
        <path d="M -15 30 Q -40 20 -50 35" fill="none" stroke="#C97B3D" stroke-width="10" stroke-linecap="round"/>
        <path d="M 15 30 Q 40 20 50 35" fill="none" stroke="#C97B3D" stroke-width="10" stroke-linecap="round"/>
        <circle cx="0" cy="-25" r="75" fill="#4FB6A3"/>
        <circle cx="-35" cy="-15" r="48" fill="#7BAE5A"/>
        <circle cx="35" cy="-15" r="48" fill="#7BAE5A"/>
        <circle cx="0" cy="-50" r="52" fill="#7BAE5A"/>
        <circle cx="0" cy="-20" r="45" fill="#88C464"/>
        <circle cx="-25" cy="-45" r="7" fill="#FF9F43"/>
        <circle cx="25" cy="-40" r="7" fill="#FF9F43"/>
        <circle cx="0" cy="0" r="7" fill="#FF9F43"/>
        <circle cx="45" cy="-5" r="6" fill="#F2C14E"/>
        <circle cx="-45" cy="-5" r="6" fill="#F2C14E"/>
      </g>

      <!-- Ola -->
      <g id="pieza-ola">
        <path d="M -100 10 Q -70 -15 -35 0 Q 0 15 35 -15 Q 70 -40 100 -20 L 100 50 L -100 50 Z" fill="#5B6FD6" opacity="0.6"/>
        <path d="M -100 0 Q -65 -30 -30 -5 Q 5 20 40 -20 Q 75 -45 100 -25 L 100 50 L -100 50 Z" fill="#4FB6A3"/>
        <circle cx="-30" cy="-5" r="10" fill="#FFFFFF"/>
        <circle cx="40" cy="-20" r="12" fill="#FFFFFF"/>
        <circle cx="98" cy="-25" r="14" fill="#FFFFFF"/>
      </g>

      <!-- Estrella -->
      <g id="pieza-estrella">
        <circle cx="0" cy="0" r="48" fill="#F2C14E" opacity="0.25"/>
        <path d="M 0 -48 Q 5 -22 28 -16 Q 5 -10 0 16 Q -5 -10 -28 -16 Q -5 -22 0 -48 Z" fill="#F2C14E" transform="scale(1.2)"/>
        <circle cx="-7" cy="-5" r="4" fill="#3A2E2A"/>
        <circle cx="7" cy="-5" r="4" fill="#3A2E2A"/>
        <circle cx="-6" cy="-7" r="1.2" fill="#FFFFFF"/>
        <circle cx="8" cy="-7" r="1.2" fill="#FFFFFF"/>
        <path d="M -5 4 Q 0 9 5 4" fill="none" stroke="#3A2E2A" stroke-width="2.5" stroke-linecap="round"/>
      </g>

      <!-- Plantilla de Ojos -->
      <g id="pieza-ojos">
        <circle cx="-20" cy="0" r="16" fill="#FFFFFF"/>
        <circle cx="-18" cy="2" r="8" fill="#232D36"/>
        <circle cx="-15" cy="-2" r="3.5" fill="#FFFFFF"/>
        <circle cx="20" cy="0" r="16" fill="#FFFFFF"/>
        <circle cx="22" cy="2" r="8" fill="#232D36"/>
        <circle cx="25" cy="-2" r="3.5" fill="#FFFFFF"/>
      </g>
    </defs>

    <!-- Canvas de fondo -->
    <rect width="800" height="450" fill={escena?.fondo || '#FDF6EC'} rx="12" />

    <!-- Plano 1: Fondo -->
    <g id="plano-fondo" fill={escena?.fondo}>
      {#each piezasFondo as p (p.id || `${p.tipo}-${p.x}-${p.y}`)}
        <g
          transform={getTransform(p)}
          opacity={p.opacidad ?? 1}
          class={getAnimClass(p.animacion)}
        >
          <use href={`#pieza-${p.tipo}`} />
        </g>
      {/each}
    </g>

    <!-- Plano 2: Medio (por defecto) -->
    <g id="plano-medio" fill={escena?.medio}>
      {#each piezasMedio as p (p.id || `${p.tipo}-${p.x}-${p.y}`)}
        <g
          transform={getTransform(p)}
          opacity={p.opacidad ?? 1}
          class={getAnimClass(p.animacion)}
        >
          <use href={`#pieza-${p.tipo}`} />
        </g>
      {/each}
    </g>

    <!-- Plano 3: Frente -->
    <g id="plano-frente" fill={escena?.frente}>
      {#each piezasFrente as p (p.id || `${p.tipo}-${p.x}-${p.y}`)}
        <g
          transform={getTransform(p)}
          opacity={p.opacidad ?? 1}
          class={getAnimClass(p.animacion)}
        >
          <use href={`#pieza-${p.tipo}`} />
        </g>
      {/each}
    </g>

    <!-- Capa de Hotspots data-driven (marcadores para C2.04) -->
    <g id="hotspots-layer">
      {#each hotspots as hs (hs.id)}
        <g
          class="cuento-hotspot-marker"
          data-hotspot-id={hs.id}
          transform={`translate(${hs.x}, ${hs.y})`}
          role="button"
          tabindex="0"
          aria-label={hs.etiqueta}
        >
          <!-- Anillo pulsante -->
          <circle cx="0" cy="0" r="20" fill="#FF9F43" opacity="0.3" class="cuento-respira" />
          <!-- Marcador central -->
          <circle cx="0" cy="0" r="12" fill="#FF9F43" stroke="#FFFFFF" stroke-width="3" />
          <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
        </g>
      {/each}
    </g>
  </svg>
</div>

<style>
  .cuento-escena-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    background-color: var(--cuento-bg-hueso, #FDF6EC);
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(58, 46, 42, 0.08);
    overflow: hidden;
  }

  .cuento-escena-svg {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 800 / 450;
  }

  .cuento-hotspot-marker {
    cursor: pointer;
    outline: none;
  }

  .cuento-hotspot-marker:focus-visible circle {
    stroke: #5B6FD6;
    stroke-width: 4px;
  }
</style>
