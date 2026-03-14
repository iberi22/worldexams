/**
 * CAPTCHA Verification Endpoint (Cloudflare Turnstile)
 * Verifies the Turnstile token with Cloudflare's siteverify API.
 */
import type { APIRoute } from 'astro';

// Using Cloudflare Turnstile test keys by default
// https://developers.cloudflare.com/turnstile/troubleshooting/testing/
const TURNSTILE_SECRET = import.meta.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';
const CAPTCHA_SECRET = import.meta.env.CAPTCHA_SECRET || 'spt-captcha-2026-worldexams-secret-key';

async function hmacSign(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const token = body.captchaToken || body.verificationToken || body.token;

    if (!token) {
      return new Response(JSON.stringify({
        verified: false,
        error: 'Missing Turnstile token',
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Verify with Cloudflare Turnstile API
    const formData = new FormData();
    formData.append('secret', TURNSTILE_SECRET);
    formData.append('response', token);
    // Optional: formData.append('remoteip', request.headers.get('cf-connecting-ip') || '');

    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const result = await fetch(url, {
      body: formData,
      method: 'POST',
    });

    const outcome = await result.json() as any;

    if (!outcome.success) {
      return new Response(JSON.stringify({
        verified: false,
        error: 'invalid_captcha',
        details: outcome['error-codes']
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Generate our internal verification token to safeguard the registration form
    const verificationPayload = JSON.stringify({
      verified: true,
      source: 'turnstile',
      ts: Date.now(),
      exp: Date.now() + 10 * 60 * 1000,
    });
    
    const verificationSig = await hmacSign(verificationPayload, CAPTCHA_SECRET);
    const verificationToken = btoa(verificationPayload) + '.' + verificationSig;

    return new Response(JSON.stringify({
      verified: true,
      verificationToken,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Turnstile verify error:', error);
    return new Response(JSON.stringify({
      verified: false,
      error: 'Server error',
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
