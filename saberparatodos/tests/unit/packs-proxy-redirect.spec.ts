import { describe, it, expect } from 'vitest';
import { GET, OPTIONS } from '../../src/pages/api/packs/[...slug]';

describe('packs proxy redirect', () => {
    it('redirects valid slug with 307', async () => {
        const request = new Request('http://localhost/api/packs/valid-pack.json', { method: 'GET' });
        const response = await GET({ params: { slug: 'valid-pack.json' }, request, locals: {} } as any);

        expect(response.status).toBe(307);
        expect(response.headers.get('Location')).toBe('https://api.saberparatodos.space/v1/packs/valid-pack.json');
        expect(response.headers.get('Cache-Control')).toBe('public, max-age=300');
    });

    it('rejects invalid slug with path traversal', async () => {
        const request = new Request('http://localhost/api/packs/../etc.json', { method: 'GET' });
        const response = await GET({ params: { slug: '../etc.json' }, request, locals: {} } as any);

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data).toEqual({ error: 'Invalid pack path.' });
    });

    it('rejects invalid slug with multiple segments', async () => {
        const request = new Request('http://localhost/api/packs/a/b.json', { method: 'GET' });
        const response = await GET({ params: { slug: 'a/b.json' }, request, locals: {} } as any);

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data).toEqual({ error: 'Invalid pack path.' });
    });

    it('handles OPTIONS correctly', async () => {
        const request = new Request('http://localhost/api/packs/valid-pack.json', { method: 'OPTIONS' });
        const response = await OPTIONS({ params: { slug: 'valid-pack.json' }, request, locals: {} } as any);

        expect(response.status).toBe(204);
        expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    });
});
