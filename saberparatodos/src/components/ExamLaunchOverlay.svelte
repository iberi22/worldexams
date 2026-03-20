<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import type { ExamPerformanceSnapshot } from '../lib/local-intelligence';
  import type { IcfesBenchmarkConfig } from '../config/icfes-benchmarks';
  import ExamPerformanceSnapshotCard from './ExamPerformanceSnapshot.svelte';

  interface Props {
    open?: boolean;
    countdown: number;
    dontShowAgain?: boolean;
    snapshot: ExamPerformanceSnapshot | null;
    benchmark: IcfesBenchmarkConfig;
    onClose: () => void;
    onToggleDontShow: (checked: boolean) => void;
  }

  let {
    open = false,
    countdown,
    dontShowAgain = false,
    snapshot,
    benchmark,
    onClose,
    onToggleDontShow
  }: Props = $props();
</script>

{#if open}
  <div class="pointer-events-none fixed inset-x-0 top-4 z-[120] flex justify-center px-4 sm:top-5">
    <section
      in:fly={{ y: -18, duration: 260 }}
      out:fade={{ duration: 180 }}
      class="pointer-events-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/12 bg-[#090c13]/92 shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      data-testid="exam-launch-overlay"
      aria-live="polite"
    >
      <div class="relative overflow-hidden px-5 py-5 sm:px-6 sm:py-6">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(252,209,22,0.12),_transparent_45%),radial-gradient(circle_at_right,_rgba(0,56,147,0.18),_transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]"></div>

        <div class="relative">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-[10px] font-black uppercase tracking-[0.28em] text-[#FCD116]/75">Inicio de examen</div>
              <h3 class="mt-2 text-2xl font-black tracking-tight text-[#F5F5DC] sm:text-[2rem]">Entraste al intento activo.</h3>
              <p class="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
                El examen ya esta corriendo. Esta capsula se cierra sola para no dejar el arranque pegado encima del intento.
              </p>
            </div>

            <div class="flex items-center gap-2">
              <div class="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-center">
                <div class="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">Cierra en</div>
                <div class="text-lg font-black text-white" data-testid="overlay-countdown">{countdown}</div>
              </div>
              <button
                type="button"
                class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 transition-colors hover:border-white/20 hover:text-white"
                onclick={onClose}
                aria-label="Cerrar resumen de arranque"
                data-testid="overlay-close-button"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="mt-5">
            <ExamPerformanceSnapshotCard {snapshot} {benchmark} />
          </div>

          <label class="mt-5 flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-white/70">
            <input
              type="checkbox"
              class="h-4 w-4 rounded border-white/20 bg-transparent text-emerald-500 focus:ring-emerald-500"
              checked={dontShowAgain}
              onchange={(event) => onToggleDontShow((event.currentTarget as HTMLInputElement).checked)}
              data-testid="overlay-dont-show-checkbox"
            />
            <span>No volver a mostrar en futuros intentos</span>
          </label>
        </div>
      </div>
    </section>
  </div>
{/if}
