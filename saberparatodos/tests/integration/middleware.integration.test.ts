import { describe, it, expect, vi } from 'vitest';
import { onRequest } from '../../src/middleware';

describe('Astro Middleware Integration Tests', () => {
  const createMockContext = (options: {
    url: string;
    headers?: Record<string, string>;
    cookies?: Record<string, string>;
  }) => {
    const headersMap = new Headers(options.headers || {});
    const cookiesMap = new Map<string, { value: string }>();
    if (options.cookies) {
      for (const [key, val] of Object.entries(options.cookies)) {
        cookiesMap.set(key, { value: val });
      }
    }

    return {
      request: {
        url: options.url,
        headers: headersMap,
      },
      cookies: {
        get: (name: string) => cookiesMap.get(name),
        set: vi.fn(),
      },
      locals: {} as Record<string, any>,
    };
  };

  const mockNext = async () => {
    return new Response('Mock Astro Page', {
      status: 200,
      headers: new Headers({ 'Content-Type': 'text/html' }),
    });
  };

  it('should apply security headers and CSP to responses', async () => {
    const context = createMockContext({
      url: 'https://saberparatodos.space/',
    });

    const response = await onRequest(context as any, mockNext);

    expect(response.status).toBe(200);
    expect(response.headers.get('X-Frame-Options')).toBe('DENY');
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(response.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(response.headers.get('Content-Security-Policy')).toContain("default-src 'self'");
  });

  it('should apply developer CSP on /developers paths', async () => {
    const context = createMockContext({
      url: 'https://saberparatodos.space/developers/api',
    });

    const response = await onRequest(context as any, mockNext);

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Security-Policy')).toContain("unpkg.com");
  });

  it('should detect country from url query param first', async () => {
    const context = createMockContext({
      url: 'https://saberparatodos.space/?country=MX',
    });

    await onRequest(context as any, mockNext);

    expect(context.locals.countryCode).toBe('MX');
    expect(context.locals.countryName).toContain('México');
  });

  it('should detect country from cookie if query param is absent', async () => {
    const context = createMockContext({
      url: 'https://saberparatodos.space/',
      cookies: { spt_country: 'ar' },
    });

    await onRequest(context as any, mockNext);

    expect(context.locals.countryCode).toBe('AR');
    expect(context.locals.countryName).toContain('Argentina');
  });

  it('should detect country from cf-ipcountry header if cookie/query absent', async () => {
    const context = createMockContext({
      url: 'https://saberparatodos.space/',
      headers: { 'cf-ipcountry': 'CL' },
    });

    await onRequest(context as any, mockNext);

    expect(context.locals.countryCode).toBe('CL');
    expect(context.locals.countryDetected).toBe(true);
    expect(context.locals.countryName).toContain('Chile');
  });

  it('should fallback to default country (CO) if no country detected', async () => {
    const context = createMockContext({
      url: 'https://saberparatodos.space/',
    });

    await onRequest(context as any, mockNext);

    expect(context.locals.countryCode).toBe('CO');
    expect(context.locals.countryName).toContain('Colombia');
  });

  it('should set countryHasContent correctly for countries with contents', async () => {
    const contextMX = createMockContext({
      url: 'https://saberparatodos.space/?country=MX',
    });
    await onRequest(contextMX as any, mockNext);
    expect(contextMX.locals.countryHasContent).toBe(true);

    const contextUnsupported = createMockContext({
      url: 'https://saberparatodos.space/?country=UY',
    });
    await onRequest(contextUnsupported as any, mockNext);
    expect(contextUnsupported.locals.countryHasContent).toBe(false);
  });
});
