<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
<script lang="ts">
  import { getProgress } from '../../lib/cuentos/progreso';

  export interface CuentoDoorData {
    slug: string;
    titulo: string;
    edad: string;
    valor?: string;
    habitat?: string;
    personajes?: string[];
    paginas?: number;
    coverEscena?: string;
  }

  export interface Props {
    cuento: CuentoDoorData;
  }

  let { cuento }: Props = $props();

  let lastPage = $state(1);
  let finished = $state(false);

  $effect(() => {
    if (typeof window !== 'undefined' && cuento?.slug) {
      const record = getProgress(cuento.slug);
      if (record) {
        lastPage = record.lastPage || 1;
        finished = Boolean(record.finished);
      }
    }
  });

  const ctaLabel = $derived.by(() => {
    if (finished) {
      return 'Volver a leer el cuento';
    }
    if (lastPage > 1) {
      return `Seguir en la página ${lastPage}`;
    }
    return 'Abrir el cuento';
  });

  const blurbText = $derived.by(() => {
    const partes: string[] = [];
    if (cuento.valor) {
      partes.push(`un relato ilustrado sobre ${cuento.valor.toLowerCase()}`);
    } else {
      partes.push('un relato ilustrado para leer en familia');
    }
    if (cuento.habitat) {
      partes.push(`ambientado en ${cuento.habitat.toLowerCase()}`);
    }
    const intro = partes.join(' ');
    const edadStr = `Diseñado para niñas y niños de ${cuento.edad} años.`;
    const personajesStr =
      cuento.personajes && cuento.personajes.length > 0
        ? `Acompaña a ${cuento.personajes.join(', ')} en esta aventura de lectura y aprendizaje.`
        : 'Disfruta de esta historia con actividades de comprensión al finalizar.';

    return `${cuento.titulo} es ${intro}. ${edadStr} ${personajesStr}`;
  });
</script>

<div class="puerta-libro-wrapper">
  <!-- Spotlight Cover Box -->
  <div class="spotlight-card">
    <div class="cover-frame">
      {#if cuento.coverEscena}
        <img
          src={cuento.coverEscena}
          alt={`Portada del cuento ${cuento.titulo}`}
          class="cover-image"
          loading="eager"
          decoding="async"
        />
      {:else}
        <div class="cover-placeholder" aria-label="Portada no disponible">
          <span class="placeholder-icon">📖</span>
        </div>
      {/if}
    </div>

    <!-- Book Title & Meta Badges -->
    <div class="door-header">
      <div class="meta-chips">
        <span class="chip chip-edad">Edad: {cuento.edad} años</span>
        {#if cuento.valor}
          <span class="chip chip-valor">Valor: {cuento.valor}</span>
        {/if}
        {#if cuento.habitat}
          <span class="chip chip-habitat">Hábitat: {cuento.habitat}</span>
        {/if}
      </div>

      <h1 class="book-title">{cuento.titulo}</h1>

      {#if cuento.personajes && cuento.personajes.length > 0}
        <p class="characters-list">
          Personajes: <strong class="characters-bold">{cuento.personajes.join(', ')}</strong>
        </p>
      {/if}
    </div>

    <!-- Blurb Card -->
    <div class="blurb-box">
      <p class="blurb-text">{blurbText}</p>
      {#if cuento.paginas}
        <p class="pages-count">📖 {cuento.paginas} páginas ilustradas con preguntas al final</p>
      {/if}
    </div>

    <!-- Action Buttons -->
    <div class="door-actions">
      <!-- Primary Wooden-Toy CTA -->
      <a
        href={`/cuentos/${cuento.slug}/leer/`}
        class="btn-primary-toy"
        aria-label={`${ctaLabel} - ${cuento.titulo}`}
      >
        <span class="btn-icon">✨</span>
        <span class="btn-text">{ctaLabel}</span>
      </a>

      <!-- Secondary Link Back to Shelf -->
      <a href="/cuentos/" class="btn-secondary-shelf">
        ← Volver al estante
      </a>
    </div>
  </div>
</div>

<style>
  .puerta-libro-wrapper {
    width: 100%;
    max-width: 42rem;
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem 1rem;
    box-sizing: border-box;
  }

  .spotlight-card {
    background-color: #ffffff;
    border: 2px solid rgba(58, 46, 42, 0.12);
    border-radius: 1.5rem;
    padding: 1.5rem;
    box-shadow: 0 10px 25px -5px rgba(58, 46, 42, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .cover-frame {
    width: 100%;
    aspect-ratio: 800 / 450;
    background-color: #fdf6ec;
    border-radius: 1rem;
    border: 1px solid rgba(58, 46, 42, 0.08);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04);
  }

  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  .spotlight-card:hover .cover-image {
    transform: scale(1.02);
  }

  .cover-placeholder {
    font-size: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .door-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .meta-chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .chip {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    color: #3a2e2a;
  }

  .chip-edad {
    background-color: rgba(255, 159, 67, 0.25);
  }

  .chip-valor {
    background-color: rgba(79, 182, 163, 0.25);
  }

  .chip-habitat {
    background-color: rgba(91, 111, 214, 0.2);
  }

  .book-title {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 800;
    color: #3a2e2a;
    margin: 0.25rem 0 0 0;
    letter-spacing: -0.02em;
  }

  .characters-list {
    font-size: 0.825rem;
    color: rgba(58, 46, 42, 0.75);
    margin: 0;
  }

  .characters-bold {
    color: #3a2e2a;
    font-weight: 700;
  }

  .blurb-box {
    background-color: #fdf6ec;
    border: 1px solid rgba(58, 46, 42, 0.1);
    border-radius: 1rem;
    padding: 1rem 1.25rem;
    text-align: center;
  }

  .blurb-text {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #3a2e2a;
    margin: 0 0 0.5rem 0;
  }

  .pages-count {
    font-size: 0.75rem;
    font-weight: 700;
    color: rgba(58, 46, 42, 0.65);
    margin: 0;
  }

  .door-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .btn-primary-toy {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: #ff9f43;
    color: #3a2e2a;
    font-size: 1.125rem;
    font-weight: 800;
    padding: 0.875rem 1.5rem;
    border-radius: 1rem;
    border: 3px solid #3a2e2a;
    box-shadow: 0 4px 0 #3a2e2a;
    text-decoration: none;
    transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.2s ease;
    box-sizing: border-box;
  }

  .btn-primary-toy:hover {
    background-color: #f08c2d;
    transform: translateY(-2px);
    box-shadow: 0 6px 0 #3a2e2a;
  }

  .btn-primary-toy:active {
    transform: translateY(2px);
    box-shadow: 0 2px 0 #3a2e2a;
  }

  .btn-secondary-shelf {
    font-size: 0.875rem;
    font-weight: 700;
    color: rgba(58, 46, 42, 0.8);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .btn-secondary-shelf:hover {
    background-color: rgba(58, 46, 42, 0.08);
    color: #3a2e2a;
  }

  @media (prefers-reduced-motion: reduce) {
    .cover-image,
    .btn-primary-toy,
    .btn-secondary-shelf {
      transition: none !important;
      transform: none !important;
    }
    .spotlight-card:hover .cover-image {
      transform: none !important;
    }
  }
</style>
