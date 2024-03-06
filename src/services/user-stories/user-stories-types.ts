// this is used on Story Lists
export type StorySummary = {
  id: number;
  user_id: string;
  title: string;
  background_color: string;
  age_group_id: number;
  reads: DBRead[];
  ratings: DBRating[];
};

export type Story = {
  id: number;
  user_id: string;
  title: string;
  summary: string;
  prompt: string;
  dedication: string;
  background_color: string;
  age_group_id: number;
  purpose_id: number;
  is_premium: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  chapters: DBChapter[];
  reads: DBRead[];
  ratings: DBRating[];
  reactions: DBReaction[];
};

export type NewStory = {
  title: string;
  summary: string;
  prompt: string;
  dedication: string;
  background_color: string;
  age_group_id: number;
  purpose_id: number;
  is_premium: boolean;
  is_published: boolean;
};

export type DBStory = {
  id: number;
  user_id: string;
  title: string;
  summary: string;
  dedication: string;
  prompt: string;
  background_color: string;
  is_premium: boolean;
  is_published: boolean;
  age_group_id: number;
  purpose_id: number;
  created_at: string;
  updated_at: string;
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
