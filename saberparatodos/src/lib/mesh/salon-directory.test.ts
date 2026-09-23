import { describe, it, expect, beforeEach } from 'vitest';
import { SalonDirectory, isValidAd } from './salon-directory';

const AD = {
  codigo: 'salacode-demo-01',
  nombre: 'Examen demo',
  hostNodoId: 'nodo_host_1',
  hostPeerId: 'p_host_1',
  subject: 'matematicas',
  grade: 11,
  region: 'CO',
  maxParticipantes: 30,
  status: 'esperando',
  createdAt: Date.now(),
};

describe('isValidAd (BR-04)', () => {
  it('acepta anuncio válido y rechaza PII/claves extra', () => {
    expect(isValidAd(AD)).toBe(true);
    expect(isValidAd({ ...AD, email: 'a@b.co' })).toBe(false);
    expect(isValidAd({ ...AD, codigo: 'x' })).toBe(false);
    expect(isValidAd({ ...AD, grade: 99 })).toBe(false);
  });
});

describe('SalonDirectory mesh-first (L0 sin backend)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('host anuncia y otro directorio lo lista por BroadcastChannel', async () => {
    const host = new SalonDirectory({ peerId: 'p_host_1' });
    const guest = new SalonDirectory({ peerId: 'p_guest_9' });
    guest.listen();
    host.host({ ...AD });
    await new Promise((r) => setTimeout(r, 150));
    const rooms = guest.listar();
    expect(rooms.length).toBe(1);
    expect(rooms[0].codigo).toBe(AD.codigo);
    expect(guest.buscar(AD.codigo)?.nombre).toBe('Examen demo');
    expect(guest.listar('MX')).toEqual([]);
    expect(guest.listar('CO').length).toBe(1);
    host.dispose();
    guest.dispose();
  });
});
