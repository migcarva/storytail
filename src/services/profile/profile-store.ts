import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { API_KEYS } from '@/src/lib/keys';
import { supabase } from '@/src/lib/supabase';
import type { Profile } from '@/src/services/profile/profile-types';

export interface ProfileStore extends Profile {
  setId: (args: Profile['id']) => void;
  setUsername: (args: Profile['username']) => void;
  setFullName: (args: Profile['full_name']) => void;
  setAvatarUrl: (args: Profile['avatar_url']) => void;
  setUpdatedAt: (args: Profile['updated_at']) => void;
  updateProfile: (
    userId: string,
    options: { username: string; full_name: string },
  ) => Promise<Profile>;
  getProfile: (userId: string) => Promise<Profile | null>;
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
      updateProfile: async (userId, options) => {
        if (!userId) return Promise.reject(new Error('User id is required'));
        if (!options) return Promise.reject(new Error('Options are required'));

        const updates = {
          id: userId,
          username: options.username,
          full_name: options.full_name,
          updated_at: new Date(),
        };

        const { error, status, data } = await supabase
          .from(API_KEYS.profiles)
          .upsert(updates)
          .select(`username, full_name, updated_at, avatar_url, id`);
        if (error && status !== 406 && !data) return Promise.reject(error);

        // after this point data exists
        set({ id: data![0].id });
        set({ username: data![0].username });
        set({ full_name: data![0].full_name });
        set({ avatar_url: data![0].avatar_url });
        set({ updated_at: data![0].updated_at });

        return Promise.resolve(data![0]);
      },
      getProfile: async (userId) => {
        if (!userId) return Promise.reject(new Error('User id is required'));

        const { data, error, status } = await supabase
          .from(API_KEYS.profiles)
          .select(`username, full_name, updated_at, avatar_url, id`)
          .eq('id', userId)
          .single();
        if (error && status !== 406) return Promise.reject(error);

        if (data) {
          set({ id: data.id });
          set({ username: data.username });
          set({ full_name: data.full_name });
          set({ avatar_url: data.avatar_url });
          set({ updated_at: data.updated_at });
        }
        return Promise.resolve(data);
      },
    }),
    storageOptions,
  ),
);
