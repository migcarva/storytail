import { AgeGroups } from '@/src/constants/AgeGroups';
import { Book } from '@/src/types';

export const userStories = [
  {
    id: 1,
    title: 'The little frog in the pond',
    ageGroup: AgeGroups[1],
    stars: 4,
    background: 'orange',
  },
  {
    id: 2,
    title: 'Adventures of the sleepy koala',
    ageGroup: AgeGroups[2],
    stars: 5,
    background: 'pink',
  },
  {
    id: 3,
    title: 'Mystery of the missing acorns',
    ageGroup: AgeGroups[1],
    stars: 3,
    background: 'blue',
  },
  {
    id: 4,
    title: 'The curious kitten',
    ageGroup: AgeGroups[2],
    stars: 4,
    background: 'yellow',
  },
  {
    id: 5,
    title: "Journey to the rainbow's end",
    ageGroup: AgeGroups[3],
    stars: 5,
    background: 'pink',
  },
  {
    id: 6,
    title: 'The brave little toaster',
    ageGroup: AgeGroups[1],
    stars: 4,
    background: 'orange',
  },
  {
    id: 7,
    title: "The wizard's apprentice",
    ageGroup: AgeGroups[3],
    stars: 5,
    background: 'yellow',
  },
  {
    id: 8,
    title: 'Underwater escapades',
    ageGroup: AgeGroups[2],
    stars: 4,
    background: 'pink',
  },
  {
    id: 9,
    title: 'The lost dinosaur',
    ageGroup: AgeGroups[1],
    stars: 3,
    background: 'blue',
  },
  {
    id: 10,
    title: 'The night sky explorer',
    ageGroup: AgeGroups[3],
    stars: 5,
    background: 'orange',
  },
] as Book[];
