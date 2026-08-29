import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LocalMeshPairingService } from '../../src/lib/local-mesh-pairing';
import { generateQRCodeSVG } from '../../src/lib/qr-generator';

describe('LocalMeshPairingService', () => {
  let service: LocalMeshPairingService;

  beforeEach(() => {
    vi.useFakeTimers();
    service = new LocalMeshPairingService();
  });

  afterEach(() => {
    service.destroy();
    vi.useRealTimers();
  });

  it('announces room and notifies subscribers with ping & signal indicators', () => {
    let receivedRooms: any[] = [];
    service.subscribe((rooms) => {
      receivedRooms = rooms;
    });

    service.announceRoom({
      code: 'TESTROOM1',
      name: 'Salón 101',
      hostName: 'Prof. Diaz',
      subject: 'Matemáticas',
      grade: 11,
      playersCount: 5,
    });

    expect(receivedRooms.length).toBe(1);
    expect(receivedRooms[0].code).toBe('TESTROOM1');
    expect(receivedRooms[0].signalQuality).toBe('excellent');
    expect(receivedRooms[0].pingMs).toBeDefined();
  });

  it('cleans up expired room beacons older than 30 seconds', () => {
    let receivedRooms: any[] = [];
    service.subscribe((rooms) => {
      receivedRooms = rooms;
    });

    service.announceRoom({
      code: 'EXPIRED1',
      name: 'Salón Expirado',
      hostName: 'Host',
      subject: 'Física',
      grade: 10,
    });

    expect(receivedRooms.length).toBe(1);

    // Stop continuous beaconing to let it expire
    service.stopAnnouncing();

    // Advance 35 seconds
    vi.advanceTimersByTime(35000);
    service.cleanupExpiredRooms(30000);

    expect(receivedRooms.length).toBe(0);
  });
});

describe('generateQRCodeSVG', () => {
  it('generates a valid SVG string with dark and light rects', () => {
    const url = 'https://saberparatodos.pages.dev/sala-examenes?join=TEST123';
    const svg = generateQRCodeSVG(url);

    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('viewBox=');
    expect(svg).toContain('fill="#000000"');
    expect(svg).toContain('fill="#ffffff"');
  });

  it('accepts custom colors and quietZone configuration', () => {
    const svg = generateQRCodeSVG('ROOM_CODE_456', {
      darkColor: '#0f172a',
      lightColor: '#e2e8f0',
      quietZone: false,
    });

    expect(svg).toContain('fill="#0f172a"');
    expect(svg).toContain('fill="#e2e8f0"');
  });
});
