import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { Story } from './user-stories-types';

interface UserStoriesState {
  stories: Story[] | null;
}

export interface UserStoriesStore extends UserStoriesState {
  setStories: (args: UserStoriesState['stories']) => void;
}

const initialState: Pick<UserStoriesStore, keyof UserStoriesState> = {
  stories: [],
};

const storageOptions = {
  name: 'User-Stories-Store',
  storage: createJSONStorage(() => AsyncStorage),
};

export const useUserStoriesStore = create<UserStoriesStore>()(
  persist(
    (set) => ({
      ...initialState,
      setStories: (stories) => set(() => ({ stories })),
    }),
    storageOptions,
  ),
);
