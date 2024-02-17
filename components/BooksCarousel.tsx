import { Dimensions } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import FrontFacingBook from '@/components/books/FrontFacingBook';
import type { Book } from '@/types';
import { withAnchorPoint } from '@/utils/anchor-points';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

const BooksCarousel: React.FC<{
  books: Book[];
}> = ({ books }) => {
  const baseOptions = {
    style: {
      width: PAGE_WIDTH,
      display: 'flex',
      justifyContent: 'center',
    },
    withAnimation: {
      type: 'spring',
      config: {
        damping: 16,
      },
    },
    vertical: false,
    width: PAGE_WIDTH * 0.5, // change this value to change the dimension of each item on the carouse;
    height: PAGE_HEIGHT * 0.6,
    autoPlay: false,
    loop: false,
  } as const;

  // adds one last "book" to the array
  // the last books allows for new story creation
  const booksAndNew = [
    ...books,
    {
      id: 0,
      title: books.length === 0 ? 'create your first story' : 'create a new story',
      stars: 0,
      ageGroup: '',
      background: 'white',
    },
  ];

  return (
    <Carousel
      {...baseOptions}
      defaultIndex={booksAndNew.length - 1}
      data={booksAndNew}
      renderItem={({ index, animationValue, item }) => (
        <Card animationValue={animationValue} key={index} index={index} book={item} />
      )}
    />
  );
};

export default BooksCarousel;

const Card: React.FC<{
  index: number;
  animationValue: Animated.SharedValue<number>;
  book: Book;
}> = ({ index, animationValue, book }) => {
  const WIDTH = PAGE_WIDTH / 1.5;
  const HEIGHT = PAGE_HEIGHT / 1.5;

  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-0.1, 0, 1],
      [0.95, 1, 1],
      Extrapolation.CLAMP,
    );

    const translateX = interpolate(animationValue.value, [-1, -0.2, 0, 1], [0, WIDTH * 0, 0, 0]);

    const transform = {
      transform: [
        { scale },
        { translateX },
        { perspective: 500 },
        {
          rotateY: `${interpolate(
            animationValue.value,
            [-1, 0, 0.4, 1],
            [60, 0, -30, -60],
            Extrapolation.CLAMP,
          )}deg`,
        },
      ],
    };

    return {
      ...withAnchorPoint(transform, { x: 0.5, y: 0.5 }, { width: WIDTH, height: HEIGHT }),
    };
  }, [index]);

  return (
    <Animated.View
      style={[
        {
          alignSelf: 'center',
          elevation: 16,
          paddingTop: 32,
        },
        cardStyle,
      ]}>
      <FrontFacingBook
        id={book.id}
        title={book.title}
        stars={book.stars}
        ageGroup={book.ageGroup}
        background={book.background}
      />
    </Animated.View>
  );
};
