// import { Image } from 'expo-image';
import { Dimensions, View, Image as RNImage } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { DBCharacterImage } from '@/src/types';
import { withAnchorPoint } from '@/src/utils';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

const CharactersCarousel: React.FC<{
  charactersUrl: DBCharacterImage[];
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
        <Card
          animationValue={animationValue}
          key={index}
          index={index}
          characterUrl={item.image_url}
        />
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
      className=" w-[300px] h-[300px]">
      <View className="flex-1 border border-solid border-black justify-center items-center rounded-1 overflow-hidden">
        {/* TODO: understand why expo-image is not working! */}
        {/* <Image
          className="flex-1 w-[300px] h-[300px] justify-center items-center rounded-1 object-cover"
          source={{ uri: characterUrl }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        /> */}
        <RNImage className="flex-1 w-[300px] h-[300px]" source={{ uri: characterUrl }} />
      </View>
    </Animated.View>
  );
};
