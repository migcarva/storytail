import { supabase } from '@/src/lib/supabase';

export const signUp = async (email: string, password: string) => {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }

  return { session };
};

export const signInWithPassword = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    throw error;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};
