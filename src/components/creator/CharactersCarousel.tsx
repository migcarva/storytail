import { Image } from 'expo-image';
import { Dimensions, View } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { withAnchorPoint, blurhash } from '@/src/utils';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

const CharactersCarousel: React.FC<{
  charactersUrl: string[];
}> = ({ charactersUrl }) => {
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
    height: PAGE_HEIGHT * 0.4,
    autoPlay: false,
    loop: false,
  } as const;

  return (
    <Carousel
      {...baseOptions}
      defaultIndex={1}
      data={charactersUrl}
      renderItem={({ index, animationValue, item }) => (
        <Card animationValue={animationValue} key={index} index={index} characterUrl={item} />
      )}
    />
  );
};

export default CharactersCarousel;

const Card: React.FC<{
  index: number;
  animationValue: SharedValue<number>;
  characterUrl: string;
}> = ({ index, animationValue, characterUrl }) => {
  const WIDTH = PAGE_WIDTH / 1.5;
  const HEIGHT = PAGE_HEIGHT / 1.5;

  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-0.64, 0, 0.64],
      [0.64, 1, 0.64],
      Extrapolation.CLAMP,
    );

    const transform = {
      transform: [{ scale }],
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
        },
        cardStyle,
      ]}
      className="border border-solid border-black w-[300px] h-[300px] rounded-1">
      <View className="border border-solid border-black w-[300px] h-[300px] rounded-1">
        <Image source={characterUrl} placeholder={blurhash} contentFit="cover" transition={1000} />
      </View>
    </Animated.View>
  );
};
