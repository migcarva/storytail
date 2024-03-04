import { useRouter, useSegments } from 'expo-router';
import { createContext, useEffect } from 'react';

import { supabase } from '@/src/lib/supabase';
import { useAuthStore } from '@/src/services/auth';
import type { Session } from '@/src/types';

export const SupabaseContext = createContext<{
  session: Session | null;
}>({
  session: null,
});

export const SupabaseProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { session, setSession } = useAuthStore();
  const segments = useSegments()[0];
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session && segments !== '(auth)') {
      router.replace('/(auth)');
    } else if (session && segments !== '(app)') {
      router.replace('/user-library');
    }
  }, [session, segments]);

  return <SupabaseContext.Provider value={{ session }}>{children}</SupabaseContext.Provider>;
};
