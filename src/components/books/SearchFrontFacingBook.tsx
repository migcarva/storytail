import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { Book } from '@/src/types';

const SearchFrontFacingBook: React.FC<Book> = ({ title, stars, ageGroup, background }) => {
  const bgStyles = {
    yellow: 'bg-yellow',
    orange: 'bg-orange',
    pink: 'bg-pink',
    blue: 'bg-blue',
  };

  return (
    <View className="relative">
      <View
        className={`w-[148px] h-[218px] items-center justify-center bg-background px-2 py-2.5 rounded-tr-0.5 rounded-br-0.5 ${bgStyles[background as keyof typeof bgStyles]}`}
        style={{
          shadowColor: 'black',
          shadowOpacity: 0.32,
          shadowRadius: 8,
          shadowOffset: {
            width: 8,
            height: 8,
          },
        }}>
        <View className="absolute top-0.5">
          <AgeGroup ageGroup={ageGroup} />
        </View>
        <Title title={title} />
        <View className="absolute bottom-0.5">
          <Rating stars={stars} />
        </View>
      </View>
      <View className="bg-lightgrey absolute w-0.625 h-[218px] l-0.25" />
      <View className="bg-grey absolute w-0.25 h-[218px]" />
    </View>
  );
};

export default SearchFrontFacingBook;

const Title: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <Text
      textBreakStrategy="highQuality"
      lineBreakStrategyIOS="standard"
      className="text-1.25 text-black font-headingbold text-center break-normal ">
      {title}
    </Text>
  );
};

const AgeGroup: React.FC<{
  ageGroup: string;
}> = ({ ageGroup }) => {
  if (ageGroup.length === 0) return null;

  return (
    <View className="flex justify-center items-center flex-nowrap flex-col">
      <Ionicons name="book-outline" size={12} className="text-black" style={{}} />
      <Text className="text-0.75 text-black font-body">{ageGroup}</Text>
    </View>
  );
};

const Rating: React.FC<{
  stars: number;
}> = ({ stars }) => {
  if (stars === 0) return null;

  return (
    <View className="flex justify-center items-center flex-nowrap flex-row">
      {Array.from({ length: stars }, (_, index) => (
        <Ionicons key={index} name="star-outline" size={12} className="text-black" style={{}} />
      ))}
    </View>
  );
};
