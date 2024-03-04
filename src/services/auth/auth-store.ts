import { create } from 'zustand';

import type { AuthSession, AuthUser } from './auth-types';

interface AuthState {
  user: AuthUser | null;
  userId: string;
  session: AuthSession | null;
  initialized: boolean;
}

export interface AuthStore extends AuthState {
  setUser: (args: AuthState['user']) => void;
  setUserId: (args: AuthState['userId']) => void;
  setSession: (args: AuthState['session']) => void;
  setInitialized: (args: AuthState['initialized']) => void;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
  user: null,
  userId: '',
  session: null,
  initialized: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setUser: (user) => set(() => ({ user })),
  setUserId: (userId) => set(() => ({ userId })),
  setSession: (session) => set(() => ({ session })),
  setInitialized: (initialized) => set(() => ({ initialized })),
}));
