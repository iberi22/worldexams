import { supabase } from './supabase';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan_tier: 'free' | 'pro' | 'enterprise';
  billing_email?: string;
  is_active: boolean;
  created_at: string;
}

export interface OrgMember {
  organization_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  user_email?: string; // Fetched separately
}

export const institutionalService = {
  /**
   * Create a new organization
   */
  async createOrganization(name: string, slug: string, billingEmail: string) {
    const { data: userData } = await supabase.auth.getUser();
    const ownerUserId = userData?.user?.id;

    const { data, error } = await supabase
      .from('organizations')
      .insert({
        name,
        slug,
        billing_email: billingEmail,
        owner_user_id: ownerUserId
      } as any)
      .select()
      .single() as any;

    if (error) throw error;

    // Bootstrap owner membership for the newly created organization.
    if (userData?.user) {
        await supabase.from('organization_members').insert({
            organization_id: data.id,
            user_id: userData.user.id,
            role: 'owner'
        } as any);
    }

    return data;
  },

  /**
   * Get user's organizations
   */
  async getUserOrganizations() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('organization_members')
      .select(`
        role,
        organization:organizations (
          id, name, slug, plan_tier, is_active
        )
      `)
      .eq('user_id', user.id) as any;

    if (error) throw error;
    return data.map((d: any) => ({ ...d.organization, role: d.role })); // Flatten
  },

  /**
   * Get members of an organization
   */
  async getOrganizationMembers(orgId: string) {
    const { data, error } = await supabase
      .from('organization_members')
      .select('*')
      .eq('organization_id', orgId) as any;

    if (error) throw error;
    return data;
  },

  /**
   * Invite member (Mockup for now)
   */
  async inviteMember(orgId: string, email: string, role: string) {
    // In real app: call Edge Function to send email or create pending invite
    console.log('Inviting', email, 'to', orgId, 'as', role);
    return { success: true };
  }
};
