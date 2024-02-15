import Carousel from 'react-native-reanimated-carousel';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { Book } from '@/types';
import { withAnchorPoint } from '@/utils/anchor-points';
import FrontFacingBook from '@/components/books/FrontFacingBook';

interface BooksCarouselProps {
  books: Book[];
}

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default function BooksCarousel({ books }: BooksCarouselProps) {
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
    width: PAGE_WIDTH * 0.5,
    height: PAGE_HEIGHT * 0.6,
    autoPlay: false,
    loop: false,
  } as const;

  const booksAndNew = [
    ...books,
    {
      id: 0,
      title: 'create a new story',
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
}

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
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={[
          {
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 16,
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
    </Animated.View>
  );
};
