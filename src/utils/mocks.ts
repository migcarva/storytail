import { AGE_GROUPS } from '@/src/lib/constants';
import { Story } from '@/src/services/user-stories/user-stories-types';

export const userStoriesMock = [
  {
    id: 1,
    title: 'The little frog in the pond',
    ageGroup: AGE_GROUPS[1].id,
    stars: 4,
    background: 'orange',
  },
  {
    id: 2,
    title: 'Adventures of the sleepy koala',
    ageGroup: AGE_GROUPS[2].id,
    stars: 5,
    background: 'pink',
  },
  {
    id: 3,
    title: 'Mystery of the missing acorns',
    ageGroup: AGE_GROUPS[1].id,
    stars: 3,
    background: 'blue',
  },
  {
    id: 4,
    title: 'The curious kitten',
    ageGroup: AGE_GROUPS[2].id,
    stars: 4,
    background: 'yellow',
  },
  {
    id: 5,
    title: "Journey to the rainbow's end",
    ageGroup: AGE_GROUPS[3].id,
    stars: 5,
    background: 'pink',
  },
  {
    id: 6,
    title: 'The brave little toaster',
    ageGroup: AGE_GROUPS[1].id,
    stars: 4,
    background: 'orange',
  },
  {
    id: 7,
    title: "The wizard's apprentice",
    ageGroup: AGE_GROUPS[3].id,
    stars: 5,
    background: 'yellow',
  },
  {
    id: 8,
    title: 'Underwater escapades',
    ageGroup: AGE_GROUPS[2].id,
    stars: 4,
    background: 'pink',
  },
  {
    id: 9,
    title: 'The lost dinosaur',
    ageGroup: AGE_GROUPS[1].id,
    stars: 3,
    background: 'blue',
  },
  {
    id: 10,
    title: 'The night sky explorer',
    ageGroup: AGE_GROUPS[3].id,
    stars: 5,
    background: 'orange',
  },
] as Story[];

export const userNotificationsMock = {
  stories: [
    {
      id: 1,
      type: 'new-story',
      title: 'Cleaning the ocean with my friends',
      author: 'John Connor',
      seen: false,
    },
    {
      id: 2,
      type: 'new-story',
      title: 'Once upon a time in my bedroom',
      author: 'Sarah Griffin',
      seen: false,
    },
    {
      id: 3,
      type: 'new-reads',
      title: 'Vincent and the baby dragon',
      seen: false,
      ammount: 24,
    },
    {
      id: 4,
      type: 'new-story',
      title: 'My amazing spaceship',
      author: 'Michael Splitz',
      seen: false,
    },
    {
      id: 5,
      type: 'new-reads',
      title: 'The little frog in the pound',
      seen: false,
      ammount: 42,
    },
    {
      id: 6,
      type: 'book-shipped',
      title: 'Vincent goes to the moon',
      seen: false,
      date: '2 days ago',
    },
    {
      id: 7,
      type: 'new-story',
      title: 'Amazing intro to soup making',
      author: 'Agatha Davis',
      seen: true,
    },
    {
      id: 8,
      type: 'new-story',
      title: 'How to make friends',
      author: 'John John Florence',
      seen: true,
    },
    {
      id: 9,
      type: 'new-reads',
      title: 'The little frog in the pound',
      seen: true,
      ammount: 12,
    },
  ],
  comments: [
    {
      id: 1,
      type: 'new-comment',
      title: 'Vincent and the baby dragon',
      seen: false,
      ammount: 24,
    },
    {
      id: 2,
      type: 'new-comment',
      title: 'The little frog in the pound',
      seen: false,
      ammount: 42,
    },
    {
      id: 1,
      type: 'new-reply',
      title: 'Once upon a time in my bedroom',
      author: 'Sarah Griffin',
      seen: true,
    },
  ],
};

export const bookMock = {
  title: 'The Wild Adventures of Sarah and the Fox',
  summary: 'Sarah adventures into the wild with her beloved fox friend',
  created_at: 1715904000,
  stars: 0,
  reads: 0,
  self_reads: 0,
  chapters: [
    {
      text: 'Em uma pequena vila, vivia uma menina chamada Tina. Tina adorava passear no parque perto de sua casa. Um dia, enquanto caminhava, ela viu um lindo pássaro azul. O pássaro cantava uma música doce que enchia o ar de alegria.',
      image: '@/src/assets/images/book/ch1.webp',
    },
    {
      text: 'Tina sorriu e seguiu o pássaro até um grande poço. Lá, ela viu o pássaro beber água fresca. O pássaro então olhou para Tina e começou a dançar. Tina riu e começou a dançar também.',
      image: '@/src/assets/images/book/ch2.webp',
    },
    {
      text: 'De repente, o pássaro azul voou para cima, girando no ar. Tina olhou para cima, admirada. O pássaro desceu, pousou na mão de Tina e cantou uma bela canção. Tina sentiu uma alegria imensa.',
      image: '@/src/assets/images/book/ch3.webp',
    },
    {
      text: 'E assim, a floresta não só teve o seu rio de volta, mas também aprendeu uma lição valiosa sobre amizade, colaboração e respeito pelas diferenças.',
      image: '@/src/assets/images/book/ch1.webp',
    },
  ],
};

export const sessionMock = {
  access_token: '',
  expires_at: 1709252885,
  expires_in: 3600,
  refresh_token: '',
  token_type: 'bearer',
  user: {
    app_metadata: { provider: 'email', providers: [Array] },
    aud: 'authenticated',
    confirmation_sent_at: '2024-02-28T22:42:08.970976Z',
    confirmed_at: '2024-02-28T22:50:39.601144Z',
    created_at: '2024-02-28T22:42:08.967426Z',
    email: 'm@m',
    email_confirmed_at: '2024-02-28T22:50:39.601144Z',
    id: '6ee2d5dd-e9f0-495f-bc8b-5003428bb18c',
    identities: [[Object]],
    last_sign_in_at: '2024-02-28T23:26:58.575155Z',
    phone: '',
    role: 'authenticated',
    updated_at: '2024-02-29T23:28:05.931837Z',
    user_metadata: {},
  },
};
