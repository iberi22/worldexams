import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/svelte';
import IcfesExamHub from '../../src/components/exam-hub/IcfesExamHub.svelte';

describe('IcfesExamHub', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with 5 areas including English', () => {
    const { getByTestId, getByText } = render(IcfesExamHub, {
      props: {
        grade: 11,
        onStartArea: vi.fn(),
        onStartSimulacro: vi.fn(),
        onStartEnglish: vi.fn(),
        onChangeExam: vi.fn()
      }
    });

    expect(getByTestId('icfes-hub')).toBeTruthy();
    expect(getByText('ICFES Saber 11')).toBeTruthy();
    expect(getByText('Matemáticas')).toBeTruthy();
    expect(getByText('Lectura Crítica')).toBeTruthy();
    expect(getByText('Sociales y Ciudadanas')).toBeTruthy();
    expect(getByText('Ciencias Naturales')).toBeTruthy();
    expect(getByText('Inglés')).toBeTruthy();
    expect(getByText('Diagnóstico CEFR')).toBeTruthy();
    expect(getByText('← Atrás')).toBeTruthy();
    expect(getByText('Cambiar tipo de examen')).toBeTruthy();
  });

  it('calls onChangeExam when clicking Atrás or Cambiar', async () => {
    const onChangeExam = vi.fn();
    const { getByText } = render(IcfesExamHub, {
      props: {
        grade: 11,
        onStartArea: vi.fn(),
        onStartSimulacro: vi.fn(),
        onStartEnglish: vi.fn(),
        onChangeExam
      }
    });

    await fireEvent.click(getByText('← Atrás'));
    expect(onChangeExam).toHaveBeenCalledTimes(1);

    await fireEvent.click(getByText('Cambiar tipo de examen'));
    expect(onChangeExam).toHaveBeenCalledTimes(2);
  });

  it('calls onStartArea with correct subject', async () => {
    const onStartArea = vi.fn();
    const { getByText } = render(IcfesExamHub, {
      props: {
        grade: 11,
        onStartArea,
        onStartSimulacro: vi.fn(),
        onStartEnglish: vi.fn(),
        onChangeExam: vi.fn()
      }
    });

    await fireEvent.click(getByText('Matemáticas'));
    expect(onStartArea).toHaveBeenCalledWith('matematicas');

    await fireEvent.click(getByText('Lectura Crítica'));
    expect(onStartArea).toHaveBeenCalledWith('lectura_critica');
  });

  it('calls onStartEnglish for Diagnostic button', async () => {
    const onStartEnglish = vi.fn();
    const { getByText } = render(IcfesExamHub, {
      props: {
        grade: 11,
        onStartArea: vi.fn(),
        onStartSimulacro: vi.fn(),
        onStartEnglish,
        onChangeExam: vi.fn()
      }
    });

    await fireEvent.click(getByText('Diagnóstico CEFR'));
    expect(onStartEnglish).toHaveBeenCalledTimes(1);
  });
});
