import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getCredits,
  addCredits,
  spendCredits,
  checkDailyReward,
  earnForAnsweringQuestion,
  earnForValidatingContent,
  getCreditHistory,
} from './swal-credits';

describe('swal-credits', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts with 0 credits by default', async () => {
    const credits = await getCredits();
    expect(credits).toBe(0);
  });

  it('adds credits correctly and logs transaction', async () => {
    const newTotal = await addCredits(10, 'Test credit addition');
    expect(newTotal).toBe(10);

    const credits = await getCredits();
    expect(credits).toBe(10);

    const history = await getCreditHistory();
    expect(history.length).toBeGreaterThan(0);
    expect(history[0].amount).toBe(10);
    expect(history[0].reason).toBe('Test credit addition');
  });

  it('spends credits correctly if sufficient balance', async () => {
    await addCredits(20, 'Initial deposit');

    const result = await spendCredits(5, 'Cloud model inference');
    expect(result.success).toBe(true);
    expect(result.credits).toBe(15);

    const current = await getCredits();
    expect(current).toBe(15);
  });

  it('refuses to spend credits if insufficient balance', async () => {
    await addCredits(5, 'Small deposit');

    const result = await spendCredits(10, 'Expensive query');
    expect(result.success).toBe(false);
    expect(result.credits).toBe(5);

    const current = await getCredits();
    expect(current).toBe(5);
  });

  it('claims daily reward of 10 credits once per day', async () => {
    const claim1 = await checkDailyReward();
    expect(claim1.claimed).toBe(true);
    expect(claim1.amountEarned).toBe(10);
    expect(claim1.credits).toBe(10);

    // Second claim on same day should fail
    const claim2 = await checkDailyReward();
    expect(claim2.claimed).toBe(false);
    expect(claim2.amountEarned).toBe(0);
    expect(claim2.credits).toBe(10);
  });

  it('earns +1 credit for answering questions', async () => {
    const newTotal = await earnForAnsweringQuestion('q-123');
    expect(newTotal).toBe(1);

    const history = await getCreditHistory();
    expect(history[0].type).toBe('answer_question');
    expect(history[0].reason).toContain('q-123');
  });

  it('earns +5 credits for validating content', async () => {
    const newTotal = await earnForValidatingContent('content-456');
    expect(newTotal).toBe(5);

    const history = await getCreditHistory();
    expect(history[0].type).toBe('validate_content');
    expect(history[0].reason).toContain('content-456');
  });
});
