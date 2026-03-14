import type { APIRoute } from 'astro';
import { getSupabaseUrl, resolveDeveloperSession } from '../../../lib/developers-auth';

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function slugifyOrganizationName(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

async function ensureDeveloperOrganization(session: Awaited<ReturnType<typeof resolveDeveloperSession>>) {
  if (!session) throw new Error('Sesión inválida.');

  const { data: existingMembership, error: membershipError } = await session.client
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (membershipError) throw membershipError;
  if (existingMembership?.organization_id) return existingMembership.organization_id;

  const email = session.user.email || 'developer@saberparatodos.space';
  const baseLabel = email.split('@')[0] || 'developer';
  const orgName = `${baseLabel} developers`;
  const orgSlug = `${slugifyOrganizationName(baseLabel) || 'developer'}-${session.user.id.slice(0, 8)}`;

  const { data: organization, error: orgError } = await session.client
    .from('organizations')
    .insert({
      name: orgName,
      slug: orgSlug,
      billing_email: email,
      owner_user_id: session.user.id,
    })
    .select('id')
    .single();

  if (orgError || !organization?.id) throw orgError || new Error('No fue posible crear la cuenta de desarrollador.');

  const { error: ownerInsertError } = await session.client.from('organization_members').insert({
    organization_id: organization.id,
    user_id: session.user.id,
    role: 'owner',
  });

  if (ownerInsertError) throw ownerInsertError;

  return organization.id;
}

export const GET: APIRoute = async ({ cookies, locals }) => {
  const session = await resolveDeveloperSession(cookies, locals);
  if (!session) return json({ error: 'No autorizado.' }, 401);

  const { data, error } = await session.client
    .from('api_keys')
    .select('id, name, key_prefix, current_usage, monthly_limit, is_active, created_at, organizations(name)')
    .order('created_at', { ascending: false });

  if (error) {
    return json({ error: 'No fue posible cargar tus claves.' }, 500);
  }

  const keys = Array.isArray(data) ? data : [];
  const totalUsage = keys.reduce((acc, key) => acc + Number(key.current_usage || 0), 0);
  const totalLimit = keys.reduce((acc, key) => acc + Number(key.monthly_limit || 0), 0);

  return json({
    keys,
    stats: {
      requests: totalUsage,
      monthly_limit: totalLimit,
    },
  });
};

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const session = await resolveDeveloperSession(cookies, locals);
  if (!session) return json({ error: 'No autorizado.' }, 401);

  try {
    const body = (await request.json()) as { name?: string };
    const organizationId = await ensureDeveloperOrganization(session);
    const supabaseUrl = getSupabaseUrl(locals);
    const response = await fetch(`${supabaseUrl}/functions/v1/generate-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        organization_id: organizationId,
        name: body.name?.trim() || 'Clave principal',
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      return json({ error: result.error || 'No fue posible crear la clave.' }, response.status);
    }

    return json({
      apiKey: result.apiKey,
      prefix: result.prefix,
      tier: result.tier,
      monthly_limit: result.monthly_limit,
    });
  } catch {
    return json({ error: 'No fue posible crear la clave.' }, 500);
  }
};
