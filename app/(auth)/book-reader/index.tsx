import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ReactNode } from 'react';
import { View, Text, Pressable } from 'react-native';

import colors from '@/src/utils/colors';
import { book } from '@/src/utils/mocks';

const Intro: React.FC = () => {
  const { title, summary, created_at, self_reads, reads, stars } = book;
  return (
    <View className="flex px-2 pt-6 h-full relative">
      <View className="flex mb-4">
        <Ionicons name="close" size={32} />
      </View>
      <Text className="text-2.5 font-heading w-[300px]">{title}</Text>
      <Text className="text-1 text-grey font-body w-[300px]">
        created on{' '}
        {new Date(created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text className="text-1 text-grey font-body w-[300px] pb-4">
        <Text>{stars > 0 ? `${stars} stars` : 'unrated'}</Text>
        <Text> - </Text>
        <Text>{reads} reads</Text>
      </Text>
      <Text className="text-1.5 font-body w-[300px]">{summary}</Text>
      <View className="flex justify-end items-center bottom-4 absolute w-full left-2">
        {self_reads > 0 && (
          <>
            <EditButton />
            <ReIllustrateButton />
            <CreateSagaButton />
          </>
        )}
        <ReadButton firstRead={self_reads === 0} />
      </View>
    </View>
  );
};

export default Intro;

const ReadButton: React.FC<{
  firstRead: boolean;
}> = ({ firstRead }) => {
  const text = firstRead ? 'start reading' : 'read again';
  return (
    <Link href="/reader" asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            className="flex flex-row items-center justify-center gap-1 px-2 py-0.75 border boder-solid border-black rounded-full mb-1 w-[256px] bg-purple"
            style={{ opacity: pressed ? 0.5 : 1 }}>
            <Text className="text-2 font-headingbold text-white">{text}</Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
};

const IconButton: React.FC<{
  text: string;
  icon: ReactNode;
  pressed: boolean;
}> = ({ text, icon, pressed }) => {
  return (
    <View
      className="flex flex-row items-center justify-center gap-1 px-2 py-0.5 border boder-solid border-black rounded-full mb-1 w-[256px]"
      style={{ opacity: pressed ? 0.5 : 1 }}>
      {icon}
      <Text className="text-1.25 font-bodybold">{text}</Text>
    </View>
  );
};

const EditButton: React.FC = () => {
  const Icon = <Ionicons name="build-outline" size={28} color={colors.black} />;
  return (
    <Link href="/edit-details" asChild>
      <Pressable>
        {({ pressed }) => <IconButton text="Edit details" icon={Icon} pressed={pressed} />}
      </Pressable>
    </Link>
  );
};

const ReIllustrateButton: React.FC = () => {
  const Icon = <Ionicons name="color-palette-outline" size={28} color={colors.black} />;
  return (
    <Link href="/edit-details" asChild>
      <Pressable>
        {({ pressed }) => <IconButton text="Re-illustrate" icon={Icon} pressed={pressed} />}
      </Pressable>
    </Link>
  );
};

const CreateSagaButton: React.FC = () => {
  const Icon = <Ionicons name="infinite-outline" size={28} color={colors.black} />;
  return (
    <Link href="/edit-details" asChild>
      <Pressable>
        {({ pressed }) => <IconButton text="Create Saga" icon={Icon} pressed={pressed} />}
      </Pressable>
    </Link>
  );
};
