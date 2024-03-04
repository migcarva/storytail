import { supabase } from '@/src/lib/supabase';
import { API_KEYS } from '@/src/constants/keys';
import type { Chapter, Story } from '@/src/services/user-stories/user-stories-types';

export const getStories = async ({ userId }: { userId: string }) => {
  const { data, error, status } = await supabase
    .from(API_KEYS.stories)
    .select(`id, title, background_color`)
    .eq('user_id', userId);

  if (error && status !== 406) {
    throw error;
  }

  return data;
};

export const getStory = async ({ userId, storyId }: { userId: string; storyId: string }) => {
  const { data, error, status } = await supabase
    .from(API_KEYS.stories)
    .select(`*`)
    .eq('user_id', userId)
    .eq('story_id', storyId);

  if (error && status !== 406) {
    throw error;
  }

  return data;
};

export const addNewStory = async ({ user_id, story }: { user_id: string; story: Partial<Story> }) => {
  const { data, error, status } = await supabase
    .from(API_KEYS.stories)
    .insert([
      {
        user_id,
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
    throw error;
  }

  return data && data[0].id;
};

export const addChapters = async ({
  story_id,
  chapters,
}: {
  story_id: string;
  chapters: Partial<Chapter>[];
}) => {
  const chaptersArray = chapters.map((c) => ({
    story_id,
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
    throw error;
  }

  return data;
};
