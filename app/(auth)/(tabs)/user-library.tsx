import { Text, View } from 'tamagui';

import BooksCarousel from '@/src/components/BooksCarousel';
import { AgeGroups } from '@/src/constants/AgeGroups';
import { Book } from '@/src/types';

const userStories = [
  {
    id: 1,
    title: 'The little frog in the pond',
    ageGroup: AgeGroups[1],
    stars: 4,
    background: 'extraordinary',
  },
  {
    id: 2,
    title: 'Adventures of the sleepy koala',
    ageGroup: AgeGroups[2],
    stars: 5,
    background: 'complementary',
  },
  {
    id: 3,
    title: 'Mystery of the missing acorns',
    ageGroup: AgeGroups[1],
    stars: 3,
    background: 'primary',
  },
  {
    id: 4,
    title: 'The curious kitten',
    ageGroup: AgeGroups[2],
    stars: 4,
    background: 'secondary',
  },
  {
    id: 5,
    title: "Journey to the rainbow's end",
    ageGroup: AgeGroups[3],
    stars: 5,
    background: 'complementary',
  },
  {
    id: 6,
    title: 'The brave little toaster',
    ageGroup: AgeGroups[1],
    stars: 4,
    background: 'extraordinary',
  },
  {
    id: 7,
    title: "The wizard's apprentice",
    ageGroup: AgeGroups[3],
    stars: 5,
    background: 'secondary',
  },
  {
    id: 8,
    title: 'Underwater escapades',
    ageGroup: AgeGroups[2],
    stars: 4,
    background: 'complementary',
  },
  {
    id: 9,
    title: 'The lost dinosaur',
    ageGroup: AgeGroups[1],
    stars: 3,
    background: 'primary',
  },
  {
    id: 10,
    title: 'The night sky explorer',
    ageGroup: AgeGroups[3],
    stars: 5,
    background: 'extraordinary',
  },
] as Book[];

const UserLibraryScreen: React.FC = () => {
  return (
    <View f={1} alignItems="center" justifyContent="center" backgroundColor="$accent">
      <Text
        fontSize="$3"
        color="$white"
        fontFamily="$heading"
        fontWeight="700"
        marginTop={96}
        marginBottom={48}>
        your library
      </Text>
      <View
        alignItems="center"
        justifyContent="center"
        backgroundColor="$accent"
        flexDirection="row"
        gap="$1">
        <BooksCarousel books={userStories} />
      </View>
    </View>
  );
};

export default UserLibraryScreen;
