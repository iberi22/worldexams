import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import AcademicBentoGrid from '../../src/components/AcademicBentoGrid.svelte';

describe('AcademicBentoGrid Ranked Entry Card', () => {
  const defaultProps = {
    runtimeCountry: {
      flag: '🇨🇴',
      name: 'Colombia',
      examAuthority: 'ICFES',
      examName: 'Saber 11',
      theme: { primary: '#10b981', secondary: '#047857', accent: '#059669' },
      grades: [{ id: 11, name: 'Grado 11' }, { id: 10, name: 'Grado 10' }],
      subjects: [],
      product: { siteName: 'WorldExams' }
    },
    countryCode: 'co',
    primaryLandingGrade: 11,
    secondaryLandingGrades: [10],
    supportsEnglishDiagnostic: false,
    preuEnabled: false,
    showExperimental: false,
    tenantExperience: 'icfes',
    onSelectGrade: vi.fn(),
    onStartEnglishDiagnostic: vi.fn(),
    onSelectPreu: vi.fn(),
    onOpenBlog: vi.fn()
  };

  it('does NOT render the Ranked card when onStartRanked is undefined', () => {
    const { queryByTestId } = render(AcademicBentoGrid, { props: defaultProps });
    const card = queryByTestId('ranked-card');
    expect(card).toBeNull();
  });

  it('renders the Ranked card when onStartRanked is provided', () => {
    const onStartRanked = vi.fn();
    const { getByTestId, getByText } = render(AcademicBentoGrid, {
      props: { ...defaultProps, onStartRanked }
    });

    const card = getByTestId('ranked-card');
    expect(card).not.toBeNull();

    // Verify text
    expect(getByText('Competitivo')).toBeDefined();
    expect(getByText('Ranked ICFES')).toBeDefined();
  });

  it('calls onStartRanked when the Ranked card is clicked', async () => {
    const onStartRanked = vi.fn();
    const { getByTestId } = render(AcademicBentoGrid, {
      props: { ...defaultProps, onStartRanked }
    });

    const card = getByTestId('ranked-card');
    // We assume FlashlightCard is a button inside or clicking it triggers
    // The closest button-like element inside the card is usually clicked.
    // The onClick prop is applied to FlashlightCard, which typically translates to a click on the root element of that component.
    await fireEvent.click(card.querySelector('button') || card.firstElementChild || card);

    expect(onStartRanked).toHaveBeenCalled();
  });
});
