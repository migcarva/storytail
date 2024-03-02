import { create } from 'zustand';

import type { AuthSession, AuthUser } from './auth-types';

interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  initialized: boolean;
}

export interface AuthStore extends AuthState {
  setUser: (args: AuthState['user']) => void;
  setSession: (args: AuthState['session']) => void;
  setInitialized: (args: AuthState['initialized']) => void;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
  user: null,
  session: null,
  initialized: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setUser: (user) => set(() => ({ user })),
  setSession: (session) => set(() => ({ session })),
  setInitialized: (initialized) => set(() => ({ initialized })),
}));
