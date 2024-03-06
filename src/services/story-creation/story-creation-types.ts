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
  is_selected: boolean;
};
