import { ReactNode } from 'react';
import { View } from 'react-native';

export const Book: React.FC<{ children?: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <View className={`relative ${className}`}>
      <BookShadows />
      <View className="bg-white w-[336px] h-[512px] flex items-center rounded-tr-0.5 rounded-br-0.5 right-0.5">
        <View className="bg-white h-[512px] pt-8 flex items-center rounded-tr-0.5 rounded-br-0.5">
          {children}
        </View>
      </View>
    </View>
  );
};

const BookShadows: React.FC = () => {
  return (
    <>
      {/* right rounded shadows */}
      <View className="absolute bg-page4 w-[336px] h-[512px] rounded-tr-0.5 rounded-br-0.5 z-0" />
      <View className="absolute bg-page3 w-[336px] h-[512px] rounded-tr-0.5 rounded-br-0.5 z-0 right-0.125" />
      <View className="absolute bg-page2 w-[336px] h-[512px] rounded-tr-0.5 rounded-br-0.5 z-0 right-0.25" />
      <View className="absolute bg-page1 w-[336px] h-[512px] rounded-tr-0.5 rounded-br-0.5 z-0 right-0.375" />
      {/* right middle shadows */}
      <View className="absolute bg-page0 w-[32px] h-[512px] -left-0 z-10" />
      <View className="absolute bg-page1 w-[16px] h-[512px] -left-0 z-10" />
      <View className="absolute bg-page2 w-[8px] h-[512px] -left-0 z-10" />
      <View className="absolute bg-page3 w-[4px] h-[512px] -left-0 z-10" />
      <View className="absolute bg-page4 w-[2px] h-[512px] -left-0 z-10" />
      {/* right rounded shadows */}
      <View className="absolute bg-white w-[336px] h-[512px] -translate-x-[336px] z-0" />
      {/* left middle shadows */}
      <View className="absolute bg-page0 w-[32px] h-[512px] -translate-x-[28px] z-10" />
      <View className="absolute bg-page1 w-[16px] h-[512px] -translate-x-[12px] z-10" />
      <View className="absolute bg-page2 w-[8px] h-[512px] -translate-x-[6px] z-10" />
      <View className="absolute bg-page3 w-[4px] h-[512px] -translate-x-[2px] z-10" />
      <View className="absolute bg-page4 w-[2px] h-[512px] -translate-x-0 z-10" />
    </>
  );
};
