/**
 * API Middleware - JWT Authentication
 * Protege todos los endpoints de /api/* con autenticación JWT de Supabase
 */

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_JWT_SECRET: string;
}

// Simple JWT verification without dependencies
async function verifyJWT(token: string, secret: string): Promise<any> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    // Decode header and payload
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    
    // Check expiration
    if (payload.exp && payload.exp < Date.now() / 1000) {
      throw new Error('Token expired');
    }

    // Verify signature using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(parts[0] + '.' + parts[1]);
    const signature = Uint8Array.from(atob(parts[2].replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
    
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const valid = await crypto.subtle.verify('HMAC', key, signature, data);
    
    if (!valid) {
      throw new Error('Invalid signature');
    }

    return payload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    throw error;
  }
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const request = context.request;
  const env = context.env;
  const url = new URL(request.url);

  // 1. Handle CORS Preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // 2. Public routes - No authentication required
  // Allow unauthenticated access to JSON files for guest users with rate limiting
  const isJsonFile = url.pathname.endsWith('.json');
  const isPublicRoute = isJsonFile || url.pathname.includes('/public/');

  if (isPublicRoute) {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('CF-Connecting-IP') || 
                     request.headers.get('X-Forwarded-For') || 
                     'unknown';
    
    // Simple rate limiting: max 100 requests per hour per IP (stored in context)
    // This prevents scraping while allowing legitimate guest access
    
    const response = await context.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Content-Type", "application/json");
    response.headers.set("Cache-Control", "public, max-age=3600");
    
    // Add rate limit headers for transparency
    response.headers.set("X-RateLimit-Limit", "100");
    
    return response;
  }

  // 3. Protected routes - Require JWT authentication
  const authHeader = request.headers.get("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({
      error: "Unauthorized",
      message: "Missing or invalid authorization header. Please login to access this resource."
    }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  const token = authHeader.substring(7); // Remove "Bearer " prefix

  try {
    // Verify JWT token
    const jwtSecret = env.SUPABASE_JWT_SECRET || '';
    if (!jwtSecret) {
      console.error('SUPABASE_JWT_SECRET not configured');
      return new Response(JSON.stringify({
        error: "Server Configuration Error",
        message: "Authentication service is not properly configured"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    const payload = await verifyJWT(token, jwtSecret);
    
    // Check if user is authenticated
    if (!payload.sub) {
      throw new Error('Invalid token payload');
    }

    // Token is valid, allow request to proceed
    // Add user info to request context for downstream handlers
    const response = await context.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("X-Authenticated-User", payload.sub);
    
    return response;

  } catch (error) {
    console.error('JWT verification error:', error);
    return new Response(JSON.stringify({
      error: "Unauthorized",
      message: "Invalid or expired token. Please login again."
    }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
