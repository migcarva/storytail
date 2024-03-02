import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  id: string;
  username: string | null;
  fullName: string | null;
  updatedAt: string | null;
}

export interface UserStore extends UserState {
  setUsername: (args: UserState['username']) => void;
  setFullName: (args: UserState['fullName']) => void;
  setUpdatedAt: (args: UserState['updatedAt']) => void;
}

const initialState: Pick<UserStore, keyof UserState> = {
  id: '',
  username: null,
  fullName: null,
  updatedAt: null,
};

const storageOptions = {
  name: 'User-Store',
  storage: createJSONStorage(() => AsyncStorage),
  // persisting only the selectedDigitalAsset
  // partialize: (state) => ({
  //   id: state.id,
  //   username: state.username,
  //   fullName: state.fullName,
  // }),
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUsername: (username) => set(() => ({ username })),
      setFullName: (fullName) => set(() => ({ fullName })),
      setUpdatedAt: (updatedAt) => set(() => ({ updatedAt })),
    }),
    storageOptions,
  ),
);

export default useUserStore;
