import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { API_KEYS } from '@/src/lib/keys';
import { supabase } from '@/src/lib/supabase';
import type { DBChapter, Story, StorySummary } from '@/src/types';

interface UserStoriesState {
  stories: Story[]; // use this to store full stories details (after fetching individual stories)
  storiesSummaries: StorySummary[]; // use this for story listings
  story: Story | null; // going to be deprecated
}

export interface UserStoriesStore extends UserStoriesState {
  setStories: (args: UserStoriesState['stories']) => void;
  setStoriesSummaries: (args: UserStoriesState['storiesSummaries']) => void;
  setStory: (args: UserStoriesState['story']) => void; // to be deprecated

  getStories: (userId: string) => Promise<Story[]>;
  getStoriesSummaries: (userId: string) => Promise<StorySummary[]>;
  getStory: (userId: string, storyId: number) => Promise<Story | null>;

  addStory: (userId: string, story: Partial<Story>) => Promise<Story>;
  addChapters: (
    userId: string,
    storyId: string,
    chapters: Partial<DBChapter>[],
  ) => Promise<DBChapter[] | null>;
}

const initialState: Pick<UserStoriesStore, keyof UserStoriesState> = {
  stories: [],
  storiesSummaries: [],
  story: null,
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
      setStoriesSummaries: (storiesSummaries) => set(() => ({ storiesSummaries })),
      setStory: (story) => set(() => ({ story })),
      getStories: async (userId) => {
        if (!userId) return Promise.reject(new Error('User id is required'));

        const {
          data: stories,
          error,
          status,
        } = await supabase
          .from(API_KEYS.stories)
          // .select(`id, title, background_color`)
          .select(
            `id, user_id, title, summary, prompt, dedication, background_color, age_group_id, purpose_id, is_premium, is_published, created_at, updated_at, chapters (*),reads (*), ratings (*), reactions (*)`,
          )
          .eq('user_id', userId);

        if (error && status !== 406 && !stories) {
          return Promise.reject(error);
        }
        set({ stories: stories ?? [] });

        return Promise.resolve(stories ? stories : []);
      },
      getStoriesSummaries: async (userId) => {
        if (!userId) return Promise.reject(new Error('User id is required'));

        const {
          data: stories,
          error,
          status,
        } = await supabase
          .from(API_KEYS.stories)
          .select(`id, user_id, title, background_color, age_group_id,reads (*), ratings (*)`)
          .eq('user_id', userId);

        if (error && status !== 406 && !stories) {
          return Promise.reject(error);
        }
        set({ storiesSummaries: stories ?? [] });

        return Promise.resolve(stories ? stories : []);
      },
      getStory: async (userId, storyId) => {
        if (!userId) return Promise.reject(new Error('User id is required'));
        if (!storyId) return Promise.reject(new Error('Story id is required'));
        const {
          data: story,
          error,
          status,
        } = await supabase
          .from(API_KEYS.stories)
          .select(`*`)
          .eq('user_id', userId)
          .eq('id', storyId);

        if (error && status !== 406 && !story) {
          return Promise.reject(error);
        }

        set({ story: story ? story[0] : null });

        return Promise.resolve(story ? story[0] : null);
      },
      addStory: async (userId, story) => {
        if (!userId) return Promise.reject(new Error('User id is required'));
        if (!story) return Promise.reject(new Error('Story object is required'));

        const { data, error, status } = await supabase
          .from(API_KEYS.stories)
          .insert([
            {
              user_id: userId,
              title: story.title,
              summary: story.summary,
              dedication: story.dedication,
              prompt: story.prompt,
              background_color: story.background_color,
              is_premium: false,
              is_published: false,
              age_group_id: story.age_group_id,
              purpose_id: story.purpose_id,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ])
          .select();

        if (error && status !== 406) {
          return Promise.reject(error);
        }

        return Promise.resolve(data ? data[0] : null);
      },
      addChapters: async (userId, storyId, chapters) => {
        if (!userId) return Promise.reject(new Error('User id is required'));
        if (!storyId) return Promise.reject(new Error('Story id is required'));
        if (!chapters) return Promise.reject(new Error('A list of chapters is required'));

        const chaptersArray = chapters.map((c) => ({
          story_id: storyId,
          chapter_number: c.chapter_number,
          title: c.title,
          content: c.content,
          image_url: c.image_url,
          created_at: new Date(),
          updated_at: new Date(),
        }));

        const { data, error, status } = await supabase
          .from(API_KEYS.chapters)
          .insert(chaptersArray)
          .select();

        if (error && status !== 406) {
          return Promise.reject(error);
        }

        return Promise.resolve(data ?? null);
      },
    }),
    storageOptions,
  ),
);
