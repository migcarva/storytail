export type DBProfile = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  updated_at: string;
};

export type DBCharacterImage = {
  id: string;
  story_id: number;
  image_url: string;
  selected: boolean;
  created_at: string;
};

export type DBStory = {
  id: number;
  user_id: string;
  title: string;
  summary: string;
  dedication: string;
  prompt: string;
  background_color: string;
  is_ready: boolean;
  is_premium: boolean;
  is_published: boolean;
  age_group_id: number;
  purpose_id: number;
  created_at: string;
  updated_at: string;
};

export type DBArtCover = {
  id: number;
  story_id: number;
  cover_url: string;
  created_at: string;
};

export type DBChapter = {
  id: number;
  story_id: string;
  chapter_number: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type DBRead = {
  id: number;
  story_id: string;
  user_id: string;
  created_at: string;
};

export type DBRating = {
  id: number;
  story_id: string;
  user_id: string;
  rating: number;
  created_at: string;
  updated_at: string;
};

export type DBReaction = {
  id: number;
  story_id: string;
  user_id: string;
  reaction_type_id: number;
  created_at: string;
};
