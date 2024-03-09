import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { API_KEYS } from '@/src/lib/keys';
import { supabase } from '@/src/lib/supabase';
import type {
  DBChapter,
  DBCharacterImage,
  DBStory,
  GeneratedStory,
  NewStory,
  Story,
} from '@/src/types';

interface StoryCreationState {
  isReady: boolean;

  // local state
  prompt: string;
  dedication: string;
  age_group_id: string; // although we are storing numbers on the DB
  purpose_id: string; // although we are storing numbers on the DB

  // output of open AI
  generatedStory: GeneratedStory | null;
  generatedCharacters: { image_url: string; art_style_id: number }[];

  // output of db
  story: DBStory | null;
  chapters: DBChapter[];
  characters: DBCharacterImage[];
}

export interface StoryCreationStore extends StoryCreationState {
  setReady: (args: StoryCreationState['isReady']) => void;

  setPrompt: (args: StoryCreationState['prompt']) => void;
  setDedication: (args: StoryCreationState['dedication']) => void;
  setAgeGroupId: (args: StoryCreationState['age_group_id']) => void;
  setPurposeId: (args: StoryCreationState['purpose_id']) => void;

  setGeneratedStory: (args: StoryCreationState['generatedStory']) => void;
  setGeneratedCharacters: (args: StoryCreationState['generatedCharacters']) => void;

  setStory: (args: StoryCreationState['story']) => void;
  setChapters: (args: StoryCreationState['chapters']) => void;
  setCharacters: (args: StoryCreationState['characters']) => void;

  reset: () => void;

  addStory: (userId: string, story: NewStory) => Promise<Story>;
  addChapters: (
    userId: string,
    storyId: number,
    chapters: Partial<DBChapter>[],
  ) => Promise<DBChapter[] | null>;
  addCharacterImages: (
    storyId: number,
    characters: { image_url: string; art_style_id: number }[],
  ) => Promise<DBCharacterImage[] | null>;
  selectCharacter: (characterId: string) => Promise<DBCharacterImage | null>;
}

const initialState: Pick<StoryCreationStore, keyof StoryCreationState> = {
  isReady: false, // this is set to true when the users clicks "show it to me" or finishes reviewing it

  prompt: '',
  dedication: '',
  age_group_id: '0', // although we are storing numbers on the DB
  purpose_id: '0', // although we are storing numbers on the DB

  generatedStory: null,
  generatedCharacters: [],

  story: null,
  chapters: [],
  characters: [],
};

const storageOptions = {
  name: 'Story-Creation-Store',
  storage: createJSONStorage(() => AsyncStorage),
};

export const useStoryCreationStore = create<StoryCreationStore>()(
  persist(
    (set) => ({
      ...initialState,

      setReady: (isReady) => set(() => ({ isReady })),

      setPrompt: (prompt) => set(() => ({ prompt })),
      setDedication: (dedication) => set(() => ({ dedication })),
      setAgeGroupId: (age_group_id) => set(() => ({ age_group_id })),
      setPurposeId: (purpose_id) => set(() => ({ purpose_id })),

      setGeneratedStory: (generatedStory) => set(() => ({ generatedStory })),
      setGeneratedCharacters: (generatedCharacters) => set(() => ({ generatedCharacters })),

      setStory: (story) => set(() => ({ story })),
      setChapters: (chapters) => set(() => ({ chapters })),
      setCharacters: (characters) => set(() => ({ characters })),

      reset: () => set(() => ({ ...initialState })),

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

        set({ story: data ? data[0] : null });

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

        set({ chapters: data ? data : [] });

        return Promise.resolve(data ?? []);
      },
      addCharacterImages: async (storyId, characters) => {
        if (!storyId) return Promise.reject(new Error('Story id is required'));
        if (!characters) return Promise.reject(new Error('A list of characters is required'));

        const charactersArray = characters.map((character) => ({
          story_id: storyId,
          image_url: character.image_url,
          art_style_id: character.art_style_id,
          selected: false,
          created_at: new Date(),
        }));

        const { data, error, status } = await supabase
          .from(API_KEYS.characterImages)
          .insert(charactersArray)
          .select();

        if (error && status !== 406) {
          return Promise.reject(error);
        }

        set({ characters: data ? data : [] });

        return Promise.resolve(data ?? []);
      },
      selectCharacter: async (characterId) => {
        if (!characterId) return Promise.reject(new Error('Character id is required'));

        const { data, error, status } = await supabase
          .from(API_KEYS.characterImages)
          .update({ selected: true })
          .eq('id', characterId)
          .select();

        if (error && status !== 406) {
          return Promise.reject(error);
        }

        return Promise.resolve(data ? data[0] : null);
      },
    }),
    storageOptions,
  ),
);
