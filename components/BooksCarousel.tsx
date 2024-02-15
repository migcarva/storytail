import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, Text, View } from 'react-native';
import SideFacingBook from './books/SideFacingBook';
import { Book } from '@/types';

interface BooksCarouselProps {
  books: Book[];
}

export default function BooksCarousel({ books }: BooksCarouselProps) {
  const width = Dimensions.get('window').width;

  /*
   CHECK: https://react-native-reanimated-carousel.vercel.app/Examples/parallax-layers
  */
  return (
    <Carousel
      data={books}
      style={{
        width: width,
        height: 316,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
      }}
      loop={false}
      width={32}
      height={316}
      scrollAnimationDuration={1000}
      onSnapToItem={(index) => console.log('current index:', index)}
      renderItem={({ index, item }) => (
        <View
          style={{
            marginLeft: 4,
            marginRight: 4,
          }}>
          <SideFacingBook
            id={item.id}
            title={item.title}
            stars={item.stars}
            ageGroup={item.ageGroup}
            background={item.background}
          />
        </View>
      )}
    />
  );
}
