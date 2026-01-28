
export interface Env {
	SUPABASE_URL: string;
	SUPABASE_SERVICE_ROLE_KEY: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const apiKey = request.headers.get('x-api-key');

		if (!apiKey) {
			return new Response(JSON.stringify({ error: 'Missing API Key' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Auth logic
		const keyHash = await hashKey(apiKey);
		
		// In production, we'd use Cloudflare KV for caching the key status
		const authResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/api_keys?key_hash=eq.${keyHash}&select=*,organizations(*)`, {
			headers: {
				'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
				'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
			}
		});

		const keys = await authResponse.json() as any[];
		const keyData = keys?.[0];

		if (!keyData || !keyData.is_active) {
			return new Response(JSON.stringify({ error: 'Invalid or inactive API Key' }), {
				status: 403,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Rate Limiting Check
		if (keyData.current_usage >= keyData.monthly_limit) {
			return new Response(JSON.stringify({ 
				error: 'Rate limit exceeded', 
				message: `Monthly limit of ${keyData.monthly_limit} reached.` 
			}), {
				status: 429,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Routing
		if (url.pathname === '/v1/questions/random') {
			return handleRandomQuestion(request, env, keyData);
		}

		return new Response(JSON.stringify({ 
			message: 'World Exams API v1',
			org: keyData.organizations.name,
			tier: keyData.tier 
		}), {
			headers: { 'Content-Type': 'application/json' },
		});
	},
};

async function hashKey(key: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(key);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function handleRandomQuestion(request: Request, env: Env, keyData: any) {
	// Simple proxy to get-questions edge function or direct DB query
	const country = new URL(request.url).searchParams.get('country') || 'co';
	
	const dbResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/questions_global?country=eq.${country.toUpperCase()}&limit=1`, {
		headers: {
			'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
			'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
		}
	});

	const questions = await dbResponse.json();
	
	// Log usage (Async/Background)
	// In production use ctx.waitUntil()
	await logUsage(env, keyData, '/v1/questions/random', 200);

	return new Response(JSON.stringify(questions[0] || { error: 'No questions found' }), {
		headers: { 'Content-Type': 'application/json' },
	});
}

async function logUsage(env: Env, keyData: any, endpoint: string, status: number) {
	// Async execution via fetch - in production use ctx.waitUntil
	await Promise.all([
		// 1. Insert detailed log
		fetch(`${env.SUPABASE_URL}/rest/v1/usage_logs`, {
			method: 'POST',
			headers: {
				'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
				'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
				'Content-Type': 'application/json',
				'Prefer': 'return=minimal'
			},
			body: JSON.stringify({
				api_key_id: keyData.id,
				endpoint: endpoint,
				status_code: status
			})
		}),
		// 2. Increment counters in API Key table
		fetch(`${env.SUPABASE_URL}/rest/v1/api_keys?id=eq.${keyData.id}`, {
			method: 'PATCH',
			headers: {
				'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
				'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				current_usage: keyData.current_usage + 1,
				last_used_at: new Date().toISOString()
			})
		})
	]);
}

