export type Story = {
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

export type Chapter = {
  id: number;
  story_id: string;
  chapter_number: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};
