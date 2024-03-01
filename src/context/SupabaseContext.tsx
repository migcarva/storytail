import { Session, User } from '@supabase/supabase-js';
import { useRouter, useSegments } from 'expo-router';
import { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { supabase } from '@/src/lib/supabase';

export const SupabaseContext = createContext<{
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (username: string, full_name: string) => Promise<void>;
  getProfile: () => Promise<{
    data: { username: string; updated_at: string; full_name: string } | null;
  }>;
}>({
  user: null,
  session: null,
  initialized: false,
  signUp: async () => {},
  signInWithPassword: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  updateProfile: async () => {},
  getProfile: async () => {
    return { data: null, updated_at: null, full_name: null };
  },
});

export const SupabaseProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  const segments = useSegments()[0];
  const router = useRouter();

  const signUp = async (email: string, password: string) => {
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
    if (!session) Alert.alert('Please check your inbox for email verification!');
  };

  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  const updateProfile = async (username: string, full_name: string) => {
    if (!session?.user) throw new Error('no user on the session!');

    const updates = { id: session?.user.id, username, full_name, updated_at: new Date() };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      throw error;
    }
  };

  const getProfile = async () => {
    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, full_name, updated_at`)
      .eq('id', session?.user.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    return { data };
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session ? session.user : null);
      setInitialized(true);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!initialized) return;

    if (!session && segments !== '(auth)') {
      router.replace('/(auth)');
    } else if (session && segments !== '(app)') {
      router.replace('/user-library');
    }
  }, [initialized, session, segments]);

  return (
    <SupabaseContext.Provider
      value={{
        user,
        session,
        initialized,
        signUp,
        signInWithPassword,
        signOut,
        resetPassword,
        updateProfile,
        getProfile,
      }}>
      {children}
    </SupabaseContext.Provider>
  );
};
