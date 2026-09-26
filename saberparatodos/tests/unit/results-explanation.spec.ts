import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import QuestionExplanation from '../../src/components/results/QuestionExplanation.svelte';
import fs from 'fs';
import path from 'path';

describe('QuestionExplanation Component', () => {
  it('shows text and is open for wrong answers', () => {
    render(QuestionExplanation, {
      props: {
        explanation: 'Test Explanation Wrong',
        isCorrect: false
      }
    });

    const explanationNodes = screen.queryAllByTestId('results-explanation');
    expect(explanationNodes.length).toBe(1);

    const details = explanationNodes[0].querySelector('details');
    expect(details?.hasAttribute('open')).toBe(true);

    expect(explanationNodes[0].textContent).toContain('Explicación pedagógica');
    expect(explanationNodes[0].textContent).toContain('Test Explanation Wrong');
  });

  it('shows text and is closed for correct answers', () => {
    render(QuestionExplanation, {
      props: {
        explanation: 'Test Explanation Correct',
        isCorrect: true
      }
    });

    const explanationNodes = screen.queryAllByTestId('results-explanation');
    expect(explanationNodes.length).toBe(1);

    const details = explanationNodes[0].querySelector('details');
    expect(details?.hasAttribute('open')).toBe(false);

    expect(explanationNodes[0].textContent).toContain('Test Explanation Correct');
  });

  it('renders nothing if explanation is empty or whitespace', () => {
    render(QuestionExplanation, {
      props: {
        explanation: '   ',
        isCorrect: false
      }
    });

    const explanationNodes = screen.queryAllByTestId('results-explanation');
    expect(explanationNodes.length).toBe(0);
  });
});

describe('ResultsView Integration (Source Level)', () => {
  it('imports and uses QuestionExplanation', () => {
    const resultsViewSource = fs.readFileSync(path.join(__dirname, '../../src/components/ResultsView.svelte'), 'utf-8');

    expect(resultsViewSource).toContain("import QuestionExplanation from './results/QuestionExplanation.svelte';");
    expect(resultsViewSource).toContain("<QuestionExplanation explanation={q.explanation} isCorrect={isCorrect} />");
  });
});
