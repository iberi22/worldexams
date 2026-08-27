import { supabase } from './supabase';

export interface UserProfile {
  id?: string;
  display_name?: string | null;
  avatar_url?: string | null;
  institution?: string | null;
  subjects_interest?: string[] | null;
  country?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

const LOCAL_STORAGE_PROFILE_KEY = 'worldexams_user_profile';

/**
 * Get profile from local storage (offline or optional mode)
 */
export function getLocalUserProfile(): UserProfile | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Error reading local user profile:', err);
    return null;
  }
}

/**
 * Save profile to local storage
 */
export function saveLocalUserProfile(profile: UserProfile): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Error saving local user profile:', err);
  }
}

/**
 * Delete profile from local storage
 */
export function deleteLocalUserProfile(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
  } catch (err) {
    console.error('Error removing local user profile:', err);
  }
}

/**
 * Fetch current authenticated user's profile from Supabase with fallback to local storage
 */
export async function fetchUserProfile(userId?: string): Promise<{ profile: UserProfile | null; isAuth: boolean }> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      const local = getLocalUserProfile();
      return { profile: local, isAuth: false };
    }

    const targetId = userId || user.id;

    const { data, error } = await supabase
      .from('profiles')
      .select('id, display_name, avatar_url, institution, subjects_interest, country, created_at, updated_at')
      .eq('id', targetId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching Supabase user profile:', error);
    }

    if (data) {
      const merged: UserProfile = {
        id: data.id,
        display_name: data.display_name,
        avatar_url: data.avatar_url,
        institution: data.institution,
        subjects_interest: data.subjects_interest,
        country: data.country,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
      saveLocalUserProfile(merged);
      return { profile: merged, isAuth: true };
    }

    const local = getLocalUserProfile();
    return { profile: local, isAuth: true };
  } catch (err) {
    console.error('Unexpected error in fetchUserProfile:', err);
    return { profile: getLocalUserProfile(), isAuth: false };
  }
}

/**
 * Save or update user profile in Supabase and local storage
 */
export async function saveUserProfile(profileData: Partial<UserProfile>): Promise<{ success: boolean; profile: UserProfile | null; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    const localExisting = getLocalUserProfile() || {};
    const updatedProfile: UserProfile = {
      ...localExisting,
      ...profileData,
      updated_at: new Date().toISOString()
    };

    saveLocalUserProfile(updatedProfile);

    if (!user) {
      return { success: true, profile: updatedProfile };
    }

    const payload = {
      id: user.id,
      display_name: profileData.display_name ?? null,
      avatar_url: profileData.avatar_url ?? null,
      institution: profileData.institution ?? null,
      subjects_interest: profileData.subjects_interest ?? null,
      country: profileData.country ?? null,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'id' })
      .select('id, display_name, avatar_url, institution, subjects_interest, country, created_at, updated_at')
      .single();

    if (error) {
      console.error('Error updating profile in Supabase:', error);
      return { success: false, profile: updatedProfile, error: error.message };
    }

    const saved: UserProfile = {
      id: data.id,
      display_name: data.display_name,
      avatar_url: data.avatar_url,
      institution: data.institution,
      subjects_interest: data.subjects_interest,
      country: data.country,
      created_at: data.created_at,
      updated_at: data.updated_at
    };

    saveLocalUserProfile(saved);
    return { success: true, profile: saved };
  } catch (err: any) {
    console.error('Unexpected error in saveUserProfile:', err);
    return { success: false, profile: null, error: err?.message || 'Error guardando perfil' };
  }
}

/**
 * Delete profile fields / resets profile data
 */
export async function deleteUserProfile(): Promise<{ success: boolean; error?: string }> {
  try {
    deleteLocalUserProfile();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: true };
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: null,
        avatar_url: null,
        institution: null,
        subjects_interest: null,
        country: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error clearing profile in Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Unexpected error in deleteUserProfile:', err);
    return { success: false, error: err?.message || 'Error eliminando perfil' };
  }
}
