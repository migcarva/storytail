import { DBChapter, DBRating, DBReaction, DBRead } from '@/src/types';

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
