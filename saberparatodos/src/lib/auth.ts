import { supabase } from './supabase';

export const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined
    }
  });

  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
