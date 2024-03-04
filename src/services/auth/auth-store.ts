import { create } from 'zustand';

import { supabase } from '@/src/lib/supabase';
import type { AuthError, User, Session } from '@/src/services/auth/auth-types';

interface AuthState {
  session: Session | null;
  initialized: boolean;
}

export interface AuthStore extends AuthState {
  setSession: (args: AuthState['session']) => void;
  setInitialized: (args: AuthState['initialized']) => void;
  signInWithPassword: (email: string, password: string) => Promise<User | AuthError | null>;
  signUp: (email: string, password: string) => Promise<User | AuthError | null>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
  session: null,
  initialized: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setSession: (session) => set(() => ({ session })),
  setInitialized: (initialized) => set(() => ({ initialized })),
  signInWithPassword: async (email, password) => {
    if (!email) return Promise.reject(new Error('Email is required'));
    if (!password) return Promise.reject(new Error('Password is required'));

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return Promise.reject(error);

    set({ session: data.session });
    return Promise.resolve(data.user);
  },
  signUp: async (email, password) => {
    if (!email) return Promise.reject(new Error('Email is required'));
    if (!password) return Promise.reject(new Error('Password is required'));

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) return Promise.reject(error);

    set({ session: data.session });
    return Promise.resolve(data.user);
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return Promise.reject(error);
    set({ session: null });
    return Promise.resolve();
  },
  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return Promise.reject(error);
    return Promise.resolve();
  },
}));
