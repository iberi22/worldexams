import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, waitFor, within } from '@testing-library/svelte';
import { createMockTeacherApi } from '../../lib/institutions/mock-adapter';
import { InstApiError, TEACHER_SESSION_KEY } from '../../lib/institutions/teacher-client';
import LoginForm from './LoginForm.svelte';
import ResultsTab from './ResultsTab.svelte';
import StudentsTab from './StudentsTab.svelte';
import TeacherPanel from './TeacherPanel.svelte';
import VerifyLogin from './VerifyLogin.svelte';
import type { CountryOption } from './ui';

const countries: CountryOption[] = [
  {
    code: 'CO',
    name: 'Colombia',
    flag: '🇨🇴',
    subjects: [
      { id: 'matematicas', name: 'Matemáticas' },
      { id: 'lectura-critica', name: 'Lectura Crítica' },
    ],
    grades: [
      { id: 6, name: 'Grado 6°' },
      { id: 11, name: 'Grado 11°' },
    ],
  },
  { code: 'MX', name: 'México', flag: '🇲🇽', subjects: [], grades: [{ id: 9, name: '3° Secundaria' }] },
];

async function signedInMock(options: Parameters<typeof createMockTeacherApi>[0] = {}) {
  const api = createMockTeacherApi(options);
  const { devToken } = await api.requestLogin('profe@colegio.edu');
  const { sessionToken } = await api.verify(devToken as string);
  localStorage.setItem(TEACHER_SESSION_KEY, sessionToken);
  return api;
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.history.replaceState(null, '', '/');
});

describe('LoginForm', () => {
  it('requests a magic link and tells the teacher to check the inbox', async () => {
    const api = createMockTeacherApi();
    const spy = vi.spyOn(api, 'requestLogin');
    const { getByLabelText, getByRole, findByText } = render(LoginForm, { props: { api } });

    await fireEvent.input(getByLabelText('Correo electrónico'), { target: { value: ' profe@colegio.edu ' } });
    await fireEvent.click(getByRole('button', { name: 'Enviarme el enlace' }));

    expect(spy).toHaveBeenCalledWith('profe@colegio.edu');
    expect(await findByText('Revisa tu correo')).toBeTruthy();
    expect(document.activeElement?.textContent).toBe('Revisa tu correo');
  });

  it('rejects an invalid email without calling the API', async () => {
    const api = createMockTeacherApi();
    const spy = vi.spyOn(api, 'requestLogin');
    const { getByLabelText, getByRole } = render(LoginForm, { props: { api } });
    await fireEvent.input(getByLabelText('Correo electrónico'), { target: { value: 'nope' } });
    await fireEvent.click(getByRole('button', { name: 'Enviarme el enlace' }));
    expect(spy).not.toHaveBeenCalled();
    expect(getByRole('alert').textContent).toMatch(/correo válido/);
  });

  it('shows EMAIL_UNAVAILABLE in Spanish', async () => {
    const api = createMockTeacherApi({ emailUnavailable: true });
    const { getByLabelText, getByRole, findByRole } = render(LoginForm, { props: { api } });
    await fireEvent.input(getByLabelText('Correo electrónico'), { target: { value: 'profe@colegio.edu' } });
    await fireEvent.click(getByRole('button', { name: 'Enviarme el enlace' }));
    expect((await findByRole('alert')).textContent).toMatch(/envío de correos no está disponible/);
  });
});

describe('VerifyLogin (/institucion/entrar)', () => {
  it('verifies ?token=, stores the session and redirects to the panel', async () => {
    const api = createMockTeacherApi();
    const { devToken } = await api.requestLogin('profe@colegio.edu');
    window.history.replaceState(null, '', `/institucion/entrar?token=${devToken}`);
    const navigate = vi.fn();

    render(VerifyLogin, { props: { api, navigate } });

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/institucion'));
    expect(localStorage.getItem(TEACHER_SESSION_KEY)).toBe(api.state.sessionToken);
    expect(window.location.search).toBe('');
  });

  it('explains an invalid or reused link', async () => {
    const api = createMockTeacherApi();
    window.history.replaceState(null, '', '/institucion/entrar?token=used');
    const navigate = vi.fn();
    const { findByRole } = render(VerifyLogin, { props: { api, navigate } });
    expect((await findByRole('alert')).textContent).toMatch(/no es válido|expiró/);
    expect(navigate).not.toHaveBeenCalled();
    expect(localStorage.getItem(TEACHER_SESSION_KEY)).toBeNull();
  });
});

describe('TeacherPanel', () => {
  it('shows the login when there is no stored session', async () => {
    const api = createMockTeacherApi();
    const { findByText } = render(TeacherPanel, { props: { api, countries, defaultCountry: 'CO' } });
    expect(await findByText('Entrar al panel para colegios')).toBeTruthy();
  });

  it('goes back to login on 401 and clears the token', async () => {
    localStorage.setItem(TEACHER_SESSION_KEY, 'stale');
    const api = createMockTeacherApi();
    vi.spyOn(api, 'me').mockRejectedValue(new InstApiError(401, 'UNAUTHORIZED'));
    const { findByText } = render(TeacherPanel, { props: { api, countries, defaultCountry: 'CO' } });
    expect(await findByText(/sesión expiró/)).toBeTruthy();
    expect(await findByText('Entrar al panel para colegios')).toBeTruthy();
    expect(localStorage.getItem(TEACHER_SESSION_KEY)).toBeNull();
  });

  it('onboards an institution, then creating a group shows its join code', async () => {
    const api = await signedInMock();
    const create = vi.spyOn(api, 'createInstitution');
    const { findByText, getByLabelText, getByRole, findByTestId } = render(TeacherPanel, {
      props: { api, countries, defaultCountry: 'CO' },
    });

    expect(await findByText('Crea tu institución')).toBeTruthy();
    await fireEvent.input(getByLabelText('Nombre de la institución'), { target: { value: 'Colegio San José' } });
    await fireEvent.input(getByLabelText('Ciudad'), { target: { value: 'Medellín' } });
    await fireEvent.click(getByRole('button', { name: 'Crear institución' }));
    expect(create).toHaveBeenCalledWith({ name: 'Colegio San José', country: 'co', city: 'Medellín' });

    expect(await findByText('Así funciona, en 3 pasos')).toBeTruthy();
    expect((await findByTestId('plan-usage')).textContent).toBe('0 de 2 grupos en plan gratuito');

    await fireEvent.input(getByLabelText('Nombre del grupo'), { target: { value: '11-A' } });
    await fireEvent.click(getByRole('button', { name: 'Crear grupo' }));

    const code = await findByTestId('join-code');
    expect(code.textContent?.trim()).toBe(api.state.groups[0].joinCode);
    expect(code.textContent?.trim()).toMatch(/^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/);
    expect((await findByTestId('join-qr')).querySelector('svg path')).toBeTruthy();
  });

  it('shows plan usage and hides group creation at the free limit', async () => {
    const api = createMockTeacherApi({ seeded: true });
    localStorage.setItem(TEACHER_SESSION_KEY, 'mock-session');
    await api.createGroup({ name: '10-B', grade: 10 });
    const { findByTestId, queryByRole, getByText } = render(TeacherPanel, {
      props: { api, countries, defaultCountry: 'CO' },
    });
    expect((await findByTestId('plan-usage')).textContent).toBe('2 de 2 grupos en plan gratuito');
    expect(queryByRole('button', { name: 'Crear grupo' })).toBeNull();
    expect(getByText(/Usaste todos los grupos de tu plan/)).toBeTruthy();
  });

  it('maps a PLAN_LIMIT error from the API to a Spanish message', async () => {
    const api = createMockTeacherApi({ seeded: true, plan: 'school' });
    localStorage.setItem(TEACHER_SESSION_KEY, 'mock-session');
    vi.spyOn(api, 'createGroup').mockRejectedValue(new InstApiError(409, 'PLAN_LIMIT'));
    const { findByLabelText, getByRole, findByRole } = render(TeacherPanel, {
      props: { api, countries, defaultCountry: 'CO' },
    });
    await fireEvent.input(await findByLabelText('Nombre del grupo'), { target: { value: '9-C' } });
    await fireEvent.click(getByRole('button', { name: 'Crear grupo' }));
    expect((await findByRole('alert')).textContent).toMatch(/límite de tu plan/);
  });

  it('opens a group and switches tabs with the keyboard', async () => {
    const api = createMockTeacherApi({ seeded: true });
    localStorage.setItem(TEACHER_SESSION_KEY, 'mock-session');
    const { findByRole, getByRole } = render(TeacherPanel, { props: { api, countries, defaultCountry: 'CO' } });
    await fireEvent.click(await findByRole('button', { name: /11-A/ }));
    const tab = getByRole('tab', { name: 'Estudiantes' });
    expect(tab.getAttribute('aria-selected')).toBe('true');
    tab.focus();
    await fireEvent.keyDown(tab, { key: 'ArrowRight' });
    expect(getByRole('tab', { name: 'Tareas' }).getAttribute('aria-selected')).toBe('true');
    expect(document.activeElement?.id).toBe('inst-tab-tareas');
  });
});

describe('StudentsTab', () => {
  it('edits a student code and removes a student after confirmation', async () => {
    const api = createMockTeacherApi({ seeded: true });
    const update = vi.spyOn(api, 'updateStudentCode');
    const remove = vi.spyOn(api, 'removeStudent');
    const group = api.state.groups[0];
    const { findByText, getAllByLabelText, getByRole, queryByText } = render(StudentsTab, {
      props: { api, group, institutionName: 'Colegio Demo', onUnauthorized: vi.fn() },
    });
    await findByText('Tito');

    const [, titoCode] = getAllByLabelText('Código de estudiante');
    await fireEvent.input(titoCode, { target: { value: '1102' } });
    const titoRow = titoCode.closest('li') as HTMLElement;
    await fireEvent.click(within(titoRow).getByRole('button', { name: 'Guardar' }));
    expect(update).toHaveBeenCalledWith(group.id, 's_2', '1102');

    await fireEvent.click(getByRole('button', { name: 'Quitar a Tito del grupo' }));
    expect(remove).not.toHaveBeenCalled();
    const confirm = getByRole('button', { name: 'Sí, quitar' });
    expect(document.activeElement).toBe(confirm);
    await fireEvent.click(confirm);
    expect(remove).toHaveBeenCalledWith(group.id, 's_2');
    await waitFor(() => expect(queryByText('Tito')).toBeNull());
  });
});

describe('ResultsTab', () => {
  it('renders, sorts, filters and downloads the CSV', async () => {
    const api = createMockTeacherApi({ seeded: true });
    const csv = vi.spyOn(api, 'downloadResultsCsv');
    const createObjectURL = vi.fn(() => 'blob:mock');
    Object.assign(URL, { createObjectURL, revokeObjectURL: vi.fn() });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const group = api.state.groups[0];
    const country = countries[0];

    const { findAllByTestId, getAllByTestId, getByRole, getByLabelText, getByTestId } = render(ResultsTab, {
      props: { api, group, country, onUnauthorized: vi.fn() },
    });

    expect(await findAllByTestId('results-row')).toHaveLength(3);
    expect(getByTestId('results-average').textContent).toBe('75%');

    await fireEvent.click(getByRole('button', { name: /Puntaje/ }));
    const pcts = getAllByTestId('results-row').map((row) => row.children[4].textContent?.trim().split('%')[0]);
    expect(pcts).toEqual(['90', '80', '55']);
    expect(getByRole('columnheader', { name: /Puntaje/ }).getAttribute('aria-sort')).toBe('descending');

    await fireEvent.change(getByLabelText('Asignatura'), { target: { value: 'matematicas' } });
    expect(getAllByTestId('results-row')).toHaveLength(2);

    await fireEvent.click(getByRole('button', { name: 'Descargar CSV' }));
    await waitFor(() => expect(csv).toHaveBeenCalledWith(group.id, undefined));
    await waitFor(() => expect(click).toHaveBeenCalled());
    expect(createObjectURL).toHaveBeenCalled();
  });

  it('refetches with assignmentId when an assignment is selected', async () => {
    const api = createMockTeacherApi({ seeded: true });
    const results = vi.spyOn(api, 'getResults');
    const group = api.state.groups[0];
    const { findByRole, getByLabelText } = render(ResultsTab, {
      props: { api, group, country: countries[0], onUnauthorized: vi.fn() },
    });
    await findByRole('option', { name: 'Repaso de funciones' });
    await fireEvent.change(getByLabelText('Tarea'), { target: { value: 'a_1' } });
    await waitFor(() => expect(results).toHaveBeenLastCalledWith(group.id, 'a_1'));
  });
});
