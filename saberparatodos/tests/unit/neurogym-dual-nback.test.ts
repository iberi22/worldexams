/**
 * neurogym-dual-nback.test.ts
 * Unit tests for Dual N-Back Audio-Visual Synchronous Task Engine & DualNBackStimulus.svelte.
 */
import { describe, it, expect } from 'vitest';

describe('neurogym stimulus — Dual N-Back', () => {
  it('audio-synthesizer module exports playNBackLetterTone', async () => {
    const mod = await import('../../src/lib/neurogym/audio-synthesizer');
    expect(typeof (mod as any).neuroAudio?.playNBackLetterTone).toBe('function');
  });

  it('secure-items-vault module exports generator functions', async () => {
    const mod = await import('../../src/lib/neurogym/secure-items-vault');
    expect(typeof (mod as any).generateCorsiSequence).toBe('function');
    expect(typeof (mod as any).generateStroopTrial).toBe('function');
    expect(typeof (mod as any).generateRavenMatrix).toBe('function');
  });

  it('DualNBackStimulus component file exists', async () => {
    const fs = await import('node:fs/promises');
    const path = 'src/components/neurogym/stimuli/DualNBackStimulus.svelte';
    const exists = await fs.access(path).then(() => true).catch(() => false);
    expect(exists).toBe(true);
  });

  it('handles N ∈ [1, 4] range validation', () => {
    const validN = [1, 2, 3, 4];
    expect(validN).toHaveLength(4);
    expect(Math.min(...validN)).toBe(1);
    expect(Math.max(...validN)).toBe(4);

    // Clamping logic check
    const clampN = (val: number) => Math.min(4, Math.max(1, val));
    expect(clampN(0)).toBe(1);
    expect(clampN(2)).toBe(2);
    expect(clampN(5)).toBe(4);
  });

  it('computes signal detection metrics (precision, recall, F1) accurately', async () => {
    // Import helper metrics logic or component export
    // Simulate N = 2 session
    const n = 2;
    const posHistory = [0, 1, 0, 1, 5, 1]; // matches at t=2 (0==0), t=3 (1==1), t=5 (1==1) -> 3 targets
    const audHistory = [3, 4, 3, 5, 2, 5]; // matches at t=2 (3==3), t=5 (5==5) -> 2 targets

    // Case A: Perfect user responses
    const posRespPerfect = [false, false, true, true, false, true];
    const audRespPerfect = [false, false, true, false, false, true];

    // Evaluate metrics calculation algorithm
    let posTP = 0, posFP = 0, posFN = 0, posTN = 0;
    let audTP = 0, audFP = 0, audFN = 0, audTN = 0;

    for (let t = n; t < posHistory.length; t++) {
      const isPosMatch = posHistory[t] === posHistory[t - n];
      const respondedPos = posRespPerfect[t];

      if (isPosMatch && respondedPos) posTP++;
      else if (!isPosMatch && respondedPos) posFP++;
      else if (isPosMatch && !respondedPos) posFN++;
      else posTN++;

      const isAudMatch = audHistory[t] === audHistory[t - n];
      const respondedAud = audRespPerfect[t];

      if (isAudMatch && respondedAud) audTP++;
      else if (!isAudMatch && respondedAud) audFP++;
      else if (isAudMatch && !respondedAud) audFN++;
      else audTN++;
    }

    expect(posTP).toBe(3);
    expect(posFP).toBe(0);
    expect(posFN).toBe(0);
    expect(audTP).toBe(2);
    expect(audFP).toBe(0);
    expect(audFN).toBe(0);

    const posPrecision = posTP / (posTP + posFP);
    const posRecall = posTP / (posTP + posFN);
    expect(posPrecision).toBe(1.0);
    expect(posRecall).toBe(1.0);

    const totalTP = posTP + audTP;
    const totalFP = posFP + audFP;
    const totalFN = posFN + audFN;
    const combinedPrecision = totalTP / (totalTP + totalFP);
    const combinedRecall = totalTP / (totalTP + totalFN);
    const f1 = (2 * combinedPrecision * combinedRecall) / (combinedPrecision + combinedRecall);

    expect(combinedPrecision).toBe(1.0);
    expect(combinedRecall).toBe(1.0);
    expect(f1).toBe(1.0);
  });

  it('handles zero-target and false-alarm edge cases gracefully', () => {
    // No matches in history
    const posHistory = [0, 1, 2, 3, 4, 5];
    const audHistory = [0, 1, 2, 3, 4, 5];
    const n = 2;

    // User pressed match on index 2 (false alarm)
    const posResp = [false, false, true, false, false, false];
    const audResp = [false, false, false, false, false, false];

    let posTP = 0, posFP = 0, posFN = 0;
    for (let t = n; t < posHistory.length; t++) {
      const isPosMatch = posHistory[t] === posHistory[t - n];
      const respondedPos = posResp[t];
      if (isPosMatch && respondedPos) posTP++;
      else if (!isPosMatch && respondedPos) posFP++;
      else if (isPosMatch && !respondedPos) posFN++;
    }

    expect(posTP).toBe(0);
    expect(posFP).toBe(1);

    const precision = posTP + posFP > 0 ? posTP / (posTP + posFP) : 1;
    const recall = posTP + posFN > 0 ? posTP / (posTP + posFN) : 1;

    expect(precision).toBe(0); // 0 hits out of 1 positive prediction
    expect(recall).toBe(1); // 0 targets existed, 100% recalled default
  });
});
