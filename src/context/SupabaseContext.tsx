import { Session, User } from '@supabase/supabase-js';
import { useRouter, useSegments } from 'expo-router';
import { createContext, useEffect } from 'react';

import { supabase } from '@/src/lib/supabase';
import { useAuthStore } from '@/src/services/auth';

export const SupabaseContext = createContext<{
  user: User | null;
  session: Session | null;
  initialized?: boolean;
}>({
  user: null,
  session: null,
  initialized: false,
});

export const SupabaseProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user, setUser, setUserId, session, setSession, initialized, setInitialized } =
    useAuthStore();
  const segments = useSegments()[0];
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session ? session.user : null);
      setUserId(session ? session.user.id : '');
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
      }}>
      {children}
    </SupabaseContext.Provider>
  );
};
