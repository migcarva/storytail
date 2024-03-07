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
  is_ready: boolean;
};

// as of 6 March, 2024
// {
//   chapters: {
//     chapter1: 'Alfredo wakes up early.',
//     chapter2: 'He grabs his hammer.',
//     chapter3: 'And his saw.',
//     chapter4: 'Alfredo builds a house.',
//   },
//   mcDescription:
//     'Alfredo is a cheerful man with a big smile, wearing a blue overalls and a yellow hard hat.',
//   summary: 'Join Alfredo as he uses his tools to build and create amazing things for his friends.',
//   title: 'Alfredo the Happy Builder',
// };
export type GeneratedStory = {
  title: string;
  summary: string;
  mcDescription: string; // main character description
  chapters: any;
};

export type GeneratedChapter = {
  chapter_number: number;
  content: string;
  title: string;
  image_url: string;
};

export type GeneratedCharacter = {
  image_url: string;
};

export type StoryCreationStep =
  | 'dedication'
  | 'age_group'
  | 'prompt'
  | 'purpose'
  | 'story_generation'
  | 'character_selection'
  | 'story_illustration'
  | 'in_review'
  | 'ready';

export type SelectOption = {
  value: string;
  text: string;
};

export type InputConfig = {
  placeholder?: string;
};

export interface OptionTypes {
  input: InputConfig;
  select: SelectOption[];
  multiselect: SelectOption[];
}

export type StepProps<T, K extends keyof OptionTypes> = {
  setter: (arg: T) => void;
  value: T;
  question: string;
  type: K;
  options?: OptionTypes[K];
  nextStep: StoryCreationStep;
};

export interface StoryChapters {
  [key: string]: string;
}

export type ArtStyle = {
  title: string;
  description: string;
};
