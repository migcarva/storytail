import { supabase } from '@/src/lib/supabase';
import { API_KEYS } from '@/src/queries/keys';

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
