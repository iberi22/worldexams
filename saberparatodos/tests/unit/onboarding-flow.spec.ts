import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, fireEvent, cleanup, act } from '@testing-library/svelte/svelte5';
import OnboardingFlow, { ONBOARDING_SEEN_KEY } from '../../src/components/OnboardingFlow.svelte';
import { t, catalogKeys } from '../../src/lib/i18n';

// Frases que el copy de onboarding no puede afirmar (sin verificación en el código).
const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const FORBIDDEN = [
  'cuenta opcional',
  'crear una cuenta',
  'conta opcional',
  'criar uma conta',
  'nunca se pierde',
  'nunca se perde',
  'sincroniza tu',
  'sincronize seu',
  'caja fuerte',
  'cofre',
  'limites diarios',
];
const FORBIDDEN_WORDS = [/\bnotas\b/, /\banotacoes\b/];


describe('OnboardingFlow Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    // Stub Element.animate to prevent JSDOM errors with Svelte transitions
    Element.prototype.animate = vi.fn().mockImplementation(() => {
      const anim: any = {
        onfinish: null,
        cancel: vi.fn(),
      };
      setTimeout(() => {
        if (typeof anim.onfinish === 'function') {
          anim.onfinish();
        }
      }, 0);
      return anim;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    cleanup();
    document.body.innerHTML = '';
  });

  it('renders step 1 honest guest content initially if not seen', async () => {
    const { container } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600); // 500ms timeout for appearance
    });

    const flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).not.toBeNull();

    // Textos honestos: modo invitado, sin cuentas falsas
    expect(flow?.textContent).toContain('Modo invitado sin cuenta');
    expect(flow?.textContent).toContain('La plataforma funciona sin registro ni cuentas en la nube');
    expect(flow?.textContent).not.toContain('crear una cuenta es opcional');
  });

  it('exports the seen-flag key as a module export for App.svelte', () => {
    expect(ONBOARDING_SEEN_KEY).toBe('worldexams_onboarding_seen');
  });

  it('does not render if worldexams_onboarding_seen is true', async () => {
    localStorage.setItem('worldexams_onboarding_seen', 'true');
    const { container } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    const flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).toBeNull();
  });

  it('navigates through offline and honest steps when Siguiente is clicked', async () => {
    const { container, getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    let flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Modo invitado sin cuenta');

    // Step 2: Progreso local y honestidad offline
    const nextBtn = getByText('Siguiente');
    await fireEvent.click(nextBtn);

    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Progreso local en tu navegador');
    expect(flow?.textContent).toContain('No hay servidores de sincronización en la nube');

    // Step 3: Resultados de simulacros cifrados
    await fireEvent.click(nextBtn);
    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Resultados de simulacros cifrados');

    // Step 4: Preguntas sin conexión e IA local opcional
    await fireEvent.click(nextBtn);
    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Preguntas sin conexión e IA local opcional');

    // Step 5: Control total en el dispositivo
    await fireEvent.click(nextBtn);
    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Control total en tu dispositivo');
    expect(flow?.textContent).toContain('Empezar');
  });

  it('navigates to prev step when Anterior is clicked', async () => {
    const { container, getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    const nextBtn = getByText('Siguiente');
    await fireEvent.click(nextBtn);

    let flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Progreso local en tu navegador');

    const prevBtn = getByText('Anterior');
    await fireEvent.click(prevBtn);

    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Modo invitado sin cuenta');
  });

  it('dismisses the overlay, advances timers, and asserts absence before cleanup on Saltar', async () => {
    let dismissed = false;
    const { container, getByText } = render(OnboardingFlow, {
      props: {
        ondismiss: () => {
          dismissed = true;
        },
      },
    });

    await act(() => {
      vi.advanceTimersByTime(600);
    });

    let flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).not.toBeNull();

    const skipBtn = getByText('Saltar');
    await fireEvent.click(skipBtn);

    // Advance exit transition timers
    await act(() => {
      vi.advanceTimersByTime(500);
    });

    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).toBeNull();
    expect(localStorage.getItem('worldexams_onboarding_seen')).toBe('true');
    expect(dismissed).toBe(true);

    cleanup();
  });

  it('dismisses dialog on Escape key press (keyboard accessibility)', async () => {
    const { container } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    let flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).not.toBeNull();

    await fireEvent.keyDown(window, { key: 'Escape' });

    await act(() => {
      vi.advanceTimersByTime(500);
    });

    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).toBeNull();
    expect(localStorage.getItem('worldexams_onboarding_seen')).toBe('true');
  });

  it('has accessible dialog attributes and supports Tab focus trapping', async () => {
    const { container, getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.getAttribute('aria-label')).toBe('Bienvenida a SaberParaTodos');
    expect(dialog?.getAttribute('aria-describedby')).toBe('onboarding-body');

    const skipBtn = getByText('Saltar');
    const nextBtn = getByText('Siguiente');

    // Simulate Tab on last button wraps to first
    nextBtn.focus();
    expect(document.activeElement).toBe(nextBtn);

    await fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
    expect(document.activeElement).toBe(skipBtn);

    // Simulate Shift+Tab on first button wraps to last
    skipBtn.focus();
    expect(document.activeElement).toBe(skipBtn);

    await fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(nextBtn);
  });
  it('does not throw or block the app when localStorage.getItem fails', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage denied');
    });
    // render() lanza si onMount no captura el error de storage.
    const { container } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(container.querySelector('[data-testid="onboarding-flow"]')).toBeNull();
  });

  it('Saltar still closes the flow when localStorage.setItem and getItem fail', async () => {
    let dismissed = false;
    const { container, getByText } = render(OnboardingFlow, {
      props: {
        ondismiss: () => {
          dismissed = true;
        },
      },
    });
    await act(() => {
      vi.advanceTimersByTime(600);
    });
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage denied');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });

    await fireEvent.click(getByText('Saltar'));
    await act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(container.querySelector('[data-testid="onboarding-flow"]')).toBeNull();
    expect(dismissed).toBe(true);
  });

  it('states the data-loss consequence of step 5 identically in es and pt', () => {
    expect(t('onboarding.step5.body', 'es')).toBe(
      'Tus datos pertenecen a este navegador. Si borras los datos del sitio, tu historial se elimina; no se transfiere a otro dispositivo.'
    );
    expect(t('onboarding.step5.body', 'pt')).toBe(
      'Seus dados pertencem a este navegador. Se apagar os dados do site, seu histórico é excluído; não é transferido para outro dispositivo.'
    );
  });

  it('pins every onboarding string verbatim in es', () => {
    expect(Object.fromEntries(catalogKeys('es').filter((k) => k.startsWith('onboarding.')).map((k) => [k, t(k, 'es')]))).toEqual({
      'onboarding.title': 'Bienvenida a SaberParaTodos',
      'onboarding.skip': 'Saltar',
      'onboarding.prev': 'Anterior',
      'onboarding.next': 'Siguiente',
      'onboarding.start': 'Empezar',
      'onboarding.progress': 'Progreso',
      'onboarding.stepCount': 'Paso {current} de {total}',
      'onboarding.aiSettings': 'Ver Ajustes IA',
      'onboarding.step1.title': 'Modo invitado sin cuenta',
      'onboarding.step1.body': 'La plataforma funciona sin registro ni cuentas en la nube. Puedes practicar directamente como invitado sin ceder datos personales.',
      'onboarding.step2.title': 'Progreso local en tu navegador',
      'onboarding.step2.body': 'Tus resultados y simulacros se guardan exclusivamente en el almacenamiento local de este dispositivo. No hay servidores de sincronización en la nube.',
      'onboarding.step3.title': 'Resultados de simulacros cifrados',
      'onboarding.step3.body': 'Los resultados de tus simulacros se guardan cifrados en este navegador.',
      'onboarding.step4.title': 'Preguntas sin conexión e IA local opcional',
      'onboarding.step4.body': 'Algunas funciones de IA pueden correr en tu dispositivo si es compatible; las preguntas ya abiertas quedan disponibles sin conexión.',
      'onboarding.step5.title': 'Control total en tu dispositivo',
      'onboarding.step5.body': 'Tus datos pertenecen a este navegador. Si borras los datos del sitio, tu historial se elimina; no se transfiere a otro dispositivo.',
    });
  });

  it('pins every onboarding string verbatim in pt', () => {
    expect(Object.fromEntries(catalogKeys('pt').filter((k) => k.startsWith('onboarding.')).map((k) => [k, t(k, 'pt')]))).toEqual({
      'onboarding.title': 'Bem-vindo ao SaberParaTodos',
      'onboarding.skip': 'Pular',
      'onboarding.prev': 'Anterior',
      'onboarding.next': 'Próximo',
      'onboarding.start': 'Começar',
      'onboarding.progress': 'Progresso',
      'onboarding.stepCount': 'Passo {current} de {total}',
      'onboarding.aiSettings': 'Ver ajustes de IA',
      'onboarding.step1.title': 'Modo convidado sem conta',
      'onboarding.step1.body': 'A plataforma funciona sem cadastro e sem contas na nuvem. Você pode praticar diretamente como convidado sem fornecer dados pessoais.',
      'onboarding.step2.title': 'Progresso local no seu navegador',
      'onboarding.step2.body': 'Seus resultados e simulados são salvos exclusivamente no armazenamento local deste dispositivo. Não há sincronização na nuvem.',
      'onboarding.step3.title': 'Resultados de simulados criptografados',
      'onboarding.step3.body': 'Os resultados dos seus simulados são salvos criptografados neste navegador.',
      'onboarding.step4.title': 'Questões sem conexão e IA local opcional',
      'onboarding.step4.body': 'Algumas funções de IA podem rodar no seu dispositivo, se for compatível; as questões já abertas ficam disponíveis sem conexão.',
      'onboarding.step5.title': 'Controle total no seu dispositivo',
      'onboarding.step5.body': 'Seus dados pertencem a este navegador. Se apagar os dados do site, seu histórico é excluído; não é transferido para outro dispositivo.',
    });
  });

  it.each(['es', 'pt'] as const)('onboarding copy (%s) contains no unverifiable claims', (lang) => {
    const keys = catalogKeys(lang).filter((key) => key.startsWith('onboarding.'));
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) {
      const text = normalize(t(key, lang));
      for (const phrase of FORBIDDEN) {
        expect({ key, phrase, found: text.includes(phrase) }).toEqual({ key, phrase, found: false });
      }
      for (const pattern of FORBIDDEN_WORDS) {
        expect({ key, pattern: String(pattern), found: pattern.test(text) }).toEqual({
          key,
          pattern: String(pattern),
          found: false,
        });
      }
      // Promesa de sincronización/guardado en la nube: prohibida en cualquier paso.
      expect({ key, found: text.includes('guardad') && text.includes('en la nube') }).toEqual({
        key,
        found: false,
      });
    }
  });

  it('moves initial focus to the first button', async () => {
    const { getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(document.activeElement).toBe(getByText('Saltar'));
  });

  it('returns focus to the element that was focused before the dialog was shown', async () => {
    const opener = document.createElement('button');
    opener.textContent = 'Abrir';
    document.body.appendChild(opener);
    opener.focus();

    const { getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(document.activeElement).toBe(getByText('Saltar'));

    await fireEvent.keyDown(window, { key: 'Escape' });
    await act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(document.activeElement).toBe(opener);
    opener.remove();
  });

  it('restores focus to the element focused when the dialog is shown, not when mounted', async () => {
    const atMount = document.createElement('button');
    const atShow = document.createElement('button');
    document.body.append(atMount, atShow);
    atMount.focus();

    const { getByText } = render(OnboardingFlow);
    atShow.focus();
    await act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(document.activeElement).toBe(getByText('Saltar'));

    await fireEvent.keyDown(window, { key: 'Escape' });
    await act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(document.activeElement).toBe(atShow);
    atMount.remove();
    atShow.remove();
  });

  it('renders the Portuguese catalog when lang is pt', async () => {
    const { container, getByText } = render(OnboardingFlow, { props: { lang: 'pt' } });
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(getByText('Pular')).toBeTruthy();
    expect(container.querySelector('[data-testid="onboarding-flow"]')?.textContent).toContain(
      'Modo convidado sem conta'
    );

    await fireEvent.click(getByText('Próximo'));
    expect(container.querySelector('[data-testid="onboarding-flow"]')?.textContent).toContain(
      'Progresso local no seu navegador'
    );
    await fireEvent.click(getByText('Próximo'));
    expect(container.querySelector('[data-testid="onboarding-flow"]')?.textContent).toContain(
      'Resultados de simulados criptografados'
    );
    await fireEvent.click(getByText('Próximo'));
    expect(container.querySelector('[data-testid="onboarding-flow"]')?.textContent).toContain(
      'Questões sem conexão e IA local opcional'
    );
    await fireEvent.click(getByText('Próximo'));
    expect(container.querySelector('[data-testid="onboarding-flow"]')?.textContent).toContain(
      'Controle total no seu dispositivo'
    );
    expect(getByText('Começar')).toBeTruthy();
  });

  it('announces the step counter in a polite live region', async () => {
    const { container, getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });
    const live = container.querySelector('[aria-live="polite"]');
    expect(live?.textContent).toContain('Paso 1 de 5');

    await fireEvent.click(getByText('Siguiente'));
    expect(container.querySelector('[aria-live="polite"]')?.textContent).toContain('Paso 2 de 5');
  });

  it('brings focus back into the dialog when Tab is pressed while focus is outside', async () => {
    const { getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    (document.activeElement as HTMLElement | null)?.blur();
    expect(document.activeElement).toBe(document.body);
    await fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
    expect(document.activeElement).toBe(getByText('Saltar'));

    (document.activeElement as HTMLElement | null)?.blur();
    await fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(getByText('Siguiente'));
  });
});
