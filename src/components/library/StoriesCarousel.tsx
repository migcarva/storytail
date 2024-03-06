import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Pressable } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import FrontFacingBook from '@/src/components/books/FrontFacingBook';
import type { StorySummary } from '@/src/types';
import { withAnchorPoint } from '@/src/utils';
import colors from '@/src/utils/colors';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

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

const StoriesCarousel: React.FC<{
  summaries: StorySummary[];
}> = ({ summaries }) => {
  // adds one last "book" to the array
  // the last books allows for new story creation
  const summariesWithNew = [
    ...summaries,
    {
      id: 0,
      user_id: '',
      title: summaries.length === 0 ? 'create your first story' : 'create a new story',
      background_color: colors.white,
      age_group_id: 0,
      reads: [],
      ratings: [],
    },
  ];

  const [activeItem, setActiveItem] = useState<number>(summariesWithNew.length - 1);
  const router = useRouter();

  const handlePress = (index: number) => {
    setActiveItem(index); // todo use a persisted store!
    if (index === summariesWithNew.length - 1) {
      router.replace('/creator/dedication');
    } else {
      router.replace('/reader');
    }
  };

  return (
    <Carousel
      {...baseOptions}
      defaultIndex={activeItem}
      data={summariesWithNew}
      renderItem={({ index, animationValue, item }) => (
        <Link
          href={index === summariesWithNew.length - 1 ? '/creator/dedication' : '/reader'}
          asChild
          className="my-2">
          <Pressable onPress={() => handlePress(index)}>
            <Book
              animationValue={animationValue}
              key={index}
              index={index}
              story={item}
              isPlaceholder={index === summariesWithNew.length - 1}
            />
          </Pressable>
        </Link>
      )}
    />
  );
};

export default StoriesCarousel;

const Book: React.FC<{
  index: number;
  animationValue: SharedValue<number>;
  story: StorySummary;
  isPlaceholder: boolean;
}> = ({ index, animationValue, story, isPlaceholder }) => {
  const WIDTH = PAGE_WIDTH / 1.5;
  const HEIGHT = PAGE_HEIGHT / 1.5;

  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(animationValue.value, [-0.1, 0, 1], [1, 1, 1], Extrapolation.CLAMP);

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
        id={story.id}
        title={story.title}
        ratings={story.ratings}
        reads={story.reads}
        age_group_id={story.age_group_id}
        background_color={story.background_color}
        isPlaceholder={isPlaceholder}
      />
    </Animated.View>
  );
};
