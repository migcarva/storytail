import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { AGE_GROUPS } from '@/src/lib/constants';
import { useAuthStore } from '@/src/services/auth';
import { StorySummary } from '@/src/types';

const FrontFacingBook: React.FC<
  {
    isPlaceholder: boolean;
  } & Partial<StorySummary>
> = ({
  title,
  ratings,
  // reads,
  // comments,
  age_group_id,
  background_color,
  isPlaceholder,
}) => {
  const { session } = useAuthStore();
  const bgStyles = {
    yellow: 'bg-yellow',
    orange: 'bg-orange',
    pink: 'bg-pink',
    blue: 'bg-blue',
  };

  const ownRating = ratings?.find((r) => r.user_id === session?.user.id);
  const ratingValue = ownRating?.rating || 0;

  return (
    <View className="relative">
      <View
        className={`w-[214px] h-[316px] items-center justify-center bg-background px-2 py-2.5 rounded-tr-0.5 rounded-br-0.5 ${bgStyles[background_color as keyof typeof bgStyles]}`}
        style={{
          shadowColor: 'black',
          shadowOpacity: 0.32,
          shadowRadius: 8,
          shadowOffset: {
            width: 16,
            height: 64,
          },
        }}>
        <View className="absolute top-0.5">
          {!isPlaceholder && age_group_id !== undefined && <AgeGroup age_group_id={age_group_id} />}
        </View>

        {title && <Title title={title} />}

        <View className="absolute bottom-0.5">
          {!isPlaceholder && ratingValue > 0 && <Rating rating={ratingValue} />}
        </View>
      </View>
      <View className="bg-lightgrey absolute w-0.625 h-[316px] l-0.25" />
      <View className="bg-grey absolute w-0.25 h-[316px]" />
    </View>
  );
};

export default FrontFacingBook;

const Title: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <Text
      textBreakStrategy="highQuality"
      lineBreakStrategyIOS="standard"
      className="text-1.5 text-black font-headingbold text-center break-normal ">
      {title}
    </Text>
  );
};

const AgeGroup: React.FC<{
  age_group_id: number;
}> = ({ age_group_id }) => {
  const ageGroup = AGE_GROUPS[age_group_id];
  const ageGroupText = `${ageGroup.min_age}-${ageGroup.max_age}`;

  return (
    <View className="flex justify-center items-center flex-nowrap flex-col">
      <Ionicons name="book-outline" size={16} className="text-black" style={{}} />
      <Text className="text-1 text-black font-body">{ageGroupText}</Text>
    </View>
  );
};

const Rating: React.FC<{
  rating: number;
}> = ({ rating }) => {
  if (rating === 0) return <Text className="text-1 text-black font-body">no rating yet</Text>;

  return (
    <View className="flex justify-center items-center flex-nowrap flex-row">
      {Array.from({ length: rating }, (_, index) => (
        <Ionicons key={index} name="star-outline" size={16} className="text-black" style={{}} />
      ))}
    </View>
  );
};
