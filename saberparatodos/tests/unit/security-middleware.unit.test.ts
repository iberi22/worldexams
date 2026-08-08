import { describe, it, expect } from 'vitest';
import { securityHeaders, applySecurityHeaders, jsonResponse, errorResponse } from '../../../src/middleware/security';

describe('Root Security Middleware Unit Tests', () => {
  it('should export standard security headers', () => {
    expect(securityHeaders['X-Frame-Options']).toBe('DENY');
    expect(securityHeaders['X-Content-Type-Options']).toBe('nosniff');
    expect(securityHeaders['X-XSS-Protection']).toBe('1; mode=block');
    expect(securityHeaders['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
  });

  it('should apply security headers to an existing Response', () => {
    const originalResponse = new Response('Ok', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });

    const securedResponse = applySecurityHeaders(originalResponse);

    expect(securedResponse.status).toBe(200);
    expect(securedResponse.headers.get('Content-Type')).toBe('text/plain');
    expect(securedResponse.headers.get('X-Frame-Options')).toBe('DENY');
    expect(securedResponse.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(securedResponse.headers.get('X-XSS-Protection')).toBe('1; mode=block');
  });

  it('should create a valid JSON response with security headers', async () => {
    const payload = { success: true, info: 'test' };
    const response = jsonResponse(payload, 201);

    expect(response.status).toBe(201);
    expect(response.headers.get('Content-Type')).toBe('application/json');
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(response.headers.get('X-Frame-Options')).toBe('DENY');

    const body = await response.json();
    expect(body).toEqual(payload);
  });

  it('should create an error response with security headers', async () => {
    const response = errorResponse('Invalid parameters', 400);

    expect(response.status).toBe(400);
    expect(response.headers.get('Content-Type')).toBe('application/json');
    expect(response.headers.get('X-Frame-Options')).toBe('DENY');

    const body = await response.json();
    expect(body.error).toBe('Invalid parameters');
  });
});
