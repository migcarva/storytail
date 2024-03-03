import { supabase } from '@/src/lib/supabase';
import { API_KEYS } from '@/src/queries/keys';
import type { Chapter, Story } from '@/src/services/user-stories/user-stories-types';

type GetStoriesProps = {
  userId: string;
};

export const getStories = async ({ userId }: GetStoriesProps) => {
  const { data, error, status } = await supabase
    .from(API_KEYS.stories)
    .select(
      `id, user_id, prompt, title, summary, dedication, purpose_id, age_group_id, background_color, is_premium, is_published, created_At, updated_At`,
    )
    .eq('id', userId);

  if (error && status !== 406) {
    throw error;
  }

  return data;
};

type AddNewStoryProps = {
  user_id: string;
  story: Partial<Story>;
};

export const addNewStory = async ({ user_id, story }: AddNewStoryProps) => {
  const { data, error, status } = await supabase.from(API_KEYS.stories).insert([
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
  ]);

  if (error && status !== 406) {
    throw error;
  }

  return data;
};

type AddChaptersProps = {
  story_id: string;
  chapters: Partial<Chapter>[];
};

export const addChapters = async ({ story_id, chapters }: AddChaptersProps) => {
  const chaptersArray = chapters.map((c) => ({
    story_id,
    chapter_number: c.chapter_number,
    title: c.title,
    content: c.content,
    image_url: c.image_url,
    created_at: new Date(),
    updated_at: new Date(),
  }));
  const { data, error, status } = await supabase.from(API_KEYS.stories).insert(chaptersArray);

  if (error && status !== 406) {
    throw error;
  }

  return data;
};
