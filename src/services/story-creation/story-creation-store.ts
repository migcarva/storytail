import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Story } from './story-creation-types';

export interface ProfileStore extends Profile {
  setId: (args: Profile['id']) => void;
  setUsername: (args: Profile['username']) => void;
  setFullName: (args: Profile['full_name']) => void;
  setAvatarUrl: (args: Profile['avatar_url']) => void;
  setUpdatedAt: (args: Profile['updated_at']) => void;
}

const initialState: Pick<ProfileStore, keyof Profile> = {
  id: '',
  username: '',
  full_name: '',
  avatar_url: '',
  updated_at: '',
};
const storageOptions = {
  name: 'User-Store',
  storage: createJSONStorage(() => AsyncStorage),
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      ...initialState,
      setId: (id) => set(() => ({ id })),
      setUsername: (username) => set(() => ({ username })),
      setFullName: (full_name) => set(() => ({ full_name })),
      setAvatarUrl: (avatar_url) => set(() => ({ avatar_url })),
      setUpdatedAt: (updated_at) => set(() => ({ updated_at })),
    }),
    storageOptions,
  ),
);
