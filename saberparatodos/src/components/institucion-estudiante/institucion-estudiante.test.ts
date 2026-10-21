import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import JoinSchoolForm from './JoinSchoolForm.svelte';
import StudentAssignmentsList from './StudentAssignmentsList.svelte';

describe('JoinSchoolForm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('prefills the code from ?colegio= (teacher QR link)', () => {
    window.history.replaceState({}, '', '/perfil?colegio=abc-def#mi-colegio');
    render(JoinSchoolForm);
    expect((screen.getByLabelText('Código del grupo') as HTMLInputElement).value).toBe('ABCDEF');
  });

  it('starts empty without ?colegio=', () => {
    render(JoinSchoolForm);
    expect((screen.getByLabelText('Código del grupo') as HTMLInputElement).value).toBe('');
  });
});

describe('StudentAssignmentsList', () => {
  it('renders ISO dueAt strings and handles null', () => {
    render(StudentAssignmentsList, {
      assignments: [
        { id: 'a1', title: 'Fracciones', country: 'co', grade: 7, subject: 'matematicas', questionCount: 10, dueAt: '2026-11-05T12:00:00.000Z', done: false },
        { id: 'a2', title: 'Lectura', country: 'co', grade: 7, subject: null, questionCount: 10, dueAt: null, done: false }
      ]
    });
    const expected = new Date('2026-11-05T12:00:00.000Z').toLocaleDateString('es', { day: 'numeric', month: 'short' });
    expect(screen.getByText((t) => t.includes(`Entrega: ${expected}`))).toBeTruthy();
    expect(screen.getByText((t) => t.includes('Sin fecha límite'))).toBeTruthy();
  });
});
