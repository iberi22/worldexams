import { writable } from 'svelte/store';

const FLOATING_UI_RELEASE_DELAY_MS = 1800;

export const examLaunchOverlayActive = writable(false);
export const examLaunchFloatingUiBlocked = writable(false);

let releaseFloatingUiTimer: ReturnType<typeof setTimeout> | null = null;

export function activateExamLaunchOverlayUi() {
  if (releaseFloatingUiTimer) {
    clearTimeout(releaseFloatingUiTimer);
    releaseFloatingUiTimer = null;
  }

  examLaunchOverlayActive.set(true);
  examLaunchFloatingUiBlocked.set(true);
}

export function releaseExamLaunchOverlayUi() {
  examLaunchOverlayActive.set(false);

  if (releaseFloatingUiTimer) {
    clearTimeout(releaseFloatingUiTimer);
  }

  releaseFloatingUiTimer = setTimeout(() => {
    examLaunchFloatingUiBlocked.set(false);
    releaseFloatingUiTimer = null;
  }, FLOATING_UI_RELEASE_DELAY_MS);
}
