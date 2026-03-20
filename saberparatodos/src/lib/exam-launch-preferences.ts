const EXAM_LAUNCH_OVERLAY_HIDDEN_KEY = 'spt_exam_launch_overlay_hidden_v1';

export function getExamLaunchOverlayHidden(): boolean {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return false;
  }

  return localStorage.getItem(EXAM_LAUNCH_OVERLAY_HIDDEN_KEY) === 'true';
}

export function setExamLaunchOverlayHidden(hidden: boolean): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(EXAM_LAUNCH_OVERLAY_HIDDEN_KEY, String(hidden));
}

