// import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Dimensions, View, Text, Image as RNImage, Pressable } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { ART_STYLES } from '@/src/lib/constants';
import { useStoryCreationStore } from '@/src/services/story-creation';
import { ArtStyle, DBCharacterImage } from '@/src/types';
import { withAnchorPoint } from '@/src/utils';

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
  height: PAGE_HEIGHT * 0.4,
  autoPlay: false,
  loop: false,
} as const;

const CharactersCarousel: React.FC = () => {
  const router = useRouter();
  const { selectCharacter, characters } = useStoryCreationStore();

  const handlePress = (id: string) => {
    selectCharacter(id);
    router.replace('/creator/generating');
  };

  return (
    <Carousel
      {...baseOptions}
      defaultIndex={1}
      data={characters}
      renderItem={({ index, animationValue, item }) => (
        <Pressable className="my-2" onPress={() => handlePress(item.id)}>
          <Card animationValue={animationValue} key={index} index={index} item={item} />
        </Pressable>
      )}
    />
  );
};

export default CharactersCarousel;

const Card: React.FC<{
  index: number;
  animationValue: SharedValue<number>;
  item: DBCharacterImage;
}> = ({ index, animationValue, item }) => {
  const { age_group_id } = useStoryCreationStore();
  const WIDTH = PAGE_WIDTH / 1.5;
  const HEIGHT = PAGE_HEIGHT / 1.5;

  const artStyle = ART_STYLES[parseInt(age_group_id, 10)].find(
    (style: ArtStyle) => style.id === item.art_Style_id,
  );

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
        <RNImage className="flex-1 w-[300px] h-[300px]" source={{ uri: item.image_url }} />
        <Text className="text-1 text-black text-center">{artStyle?.title}</Text>
      </View>
    </Animated.View>
  );
};
