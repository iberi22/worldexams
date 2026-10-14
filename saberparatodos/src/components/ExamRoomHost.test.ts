import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import ExamRoomHost from './ExamRoomHost.svelte';
import { roomState } from '../modules/exam-room/stores/roomState.svelte.ts';

// To avoid toBeInTheDocument error from jest-dom not being present or compatible:
// We use expect(el).toBeTruthy() to ensure it exists in the DOM.

// Instead of mocking the components, let's mock the `joinRoom` and `fetchPublicRooms` methods on `roomState` so that
// the real `ExamRoomPlayer` doesn't make P2P network calls.

describe('ExamRoomHost', () => {
  beforeEach(() => {
    // Reset roomState players before each test
    roomState.players = [];
    // Only mock if we haven't already. Since `roomState` is a singleton with actual methods,
    // we can spy on them or override them safely.
    roomState.fetchPublicRooms = vi.fn().mockImplementation(async () => {
      // Mock public rooms so joinRoom doesn't fail
      roomState.publicRooms = [{
        party_code: 'TEST42',
        host_name: 'Host',
        exam_config: {},
        students: [],
        max_students: 50,
        status: 'active',
        created_at: new Date().toISOString()
      }];
    });
    roomState.joinRoom = vi.fn().mockResolvedValue(undefined);
  });

  it('should render the input view initially', () => {
    render(ExamRoomHost);
    expect(screen.getByText('PARTY MODE')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ej: A1B2C3')).toBeTruthy();
  });

  it('should transition to playing view when a valid code is entered', async () => {
    render(ExamRoomHost);

    const input = screen.getByPlaceholderText('Ej: A1B2C3');
    const buttons = screen.getAllByRole('button', { name: /entrar/i });
    const button = buttons[buttons.length - 1]; // Use the inner button

    await fireEvent.input(input, { target: { value: 'XYZ123' } });
    await fireEvent.click(button);

    // Verify it changed views
    expect(screen.getByText('SALA: XYZ123')).toBeTruthy();
    expect(screen.getByText('Esperando a que se unan jugadores...')).toBeTruthy();
  });

  it('should render PartyPlayer components for joined players', async () => {
    // Mock connected players
    roomState.players = [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' }
    ] as any;

    render(ExamRoomHost);

    // Join party
    const input = screen.getByPlaceholderText('Ej: A1B2C3');
    const buttons = screen.getAllByRole('button', { name: /entrar/i });
    const button = buttons[buttons.length - 1]; // Use the inner button
    await fireEvent.input(input, { target: { value: 'TEST42' } });
    await fireEvent.click(button);

    // Verify players are rendered
    expect(screen.getByText('SALA: TEST42')).toBeTruthy();

    // Wait a tick for effects
    await new Promise(resolve => setTimeout(resolve, 0));

    // We pass isHost={true} so it shows "👑 Estás participando"
    const hostBadges = screen.getAllByText('👑 Estás participando');
    expect(hostBadges.length).toBe(2);
  });
});