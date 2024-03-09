import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { AGE_GROUPS, ART_STYLES } from '@/src/lib/constants';
import { useAuthStore } from '@/src/services/auth';
import { generateChapterIllustrations } from '@/src/services/open-ai';
import { useStoryCreationStore } from '@/src/services/story-creation';
import { StoryChapters } from '@/src/types';
import colors from '@/src/utils/colors';

const Generating: React.FC = () => {
  const { session } = useAuthStore();
  const [isGenerated, setIsGenerateed] = useState(false);
  const { age_group_id, generatedStory, story, chapters, addChapters, characters } =
    useStoryCreationStore();

  const selectedCharacter = characters.find((c) => c.selected);

  const requestChaptersIllustration = async () => {
    if (
      !generatedStory?.mcDescription ||
      !session?.user.id ||
      !story?.id ||
      !selectedCharacter ||
      !age_group_id
    )
      return;

    const ageGroup = AGE_GROUPS[parseInt(age_group_id, 10)];

    await generateChapterIllustrations({ chapters, ageGroup, selectedCharacter });

    // const images = await generateCharacterImages({
    //   description: generatedStory?.mcDescription,
    //   ageGroup: `${ageGroup.min_age}-${ageGroup.max_age}`,
    //   artStyles: getRandomArtStylesForSelectedAge(parseInt(age_group_id, 10)),
    // });

    // if (images.length > 0) {
    //   addCharacterImages(story.id, images);
    // }

    // setIsGenerateed(true);
  };

  const saveChapters = async () => {
    if (generatedStory === null || !session?.user.id || !story?.id) return;

    const chaptersArray = Object.keys(generatedStory.chapters).map((key) => {
      const chapterNumber = parseInt(key.replace('chapter', ''), 10); // Extract the chapter number
      return {
        chapter_number: chapterNumber,
        content: (generatedStory.chapters as StoryChapters)[key],
        title: 'chapter_title',
        image_url: 'image_url',
      };
    });
    await addChapters(session.user.id, story.id, chaptersArray);
  };

  useEffect(() => {
    if (selectedCharacter) {
      // we have a selected character and ART Style.
      // generate the chapters illustrations with that.
      requestChaptersIllustration();
    } else if (chapters.length === 0) {
      // save chapters to DB
      // saveChapters();
    } else if (isGenerated) {
      router.replace('/creator/result');
    }
  }, [isGenerated, chapters, characters]);

  return (
    <View className="flex h-full bg-white justify-center items-center">
      <View className="flex items-center pb-4">
        <Ionicons
          name={isGenerated ? 'checkmark-done-outline' : 'color-palette-outline'}
          color={isGenerated ? colors.blue : colors.black}
          size={64}
        />
      </View>
      <View className="flex items-center">
        <Text className="text-2.5 text-center text-black font-headingbold w-[300px]">
          Get ready!
        </Text>
        <Text className="text-2.5 text-center text-black font-heading w-[300px]">
          we're painting your amazing story
        </Text>
      </View>
    </View>
  );
};

export default Generating;
