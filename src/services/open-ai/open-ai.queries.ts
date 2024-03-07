import OpenAI from 'openai';

import { AGE_GROUPS, STORY_PURPOSES_TYPES } from '@/src/lib/constants';
import {
  generateInstruction,
  getRandomArtStylesForSelectedAge,
  parseStory,
} from '@/src/services/open-ai/open-ai.utils';
import { ArtStyle, GeneratedStory } from '@/src/types';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPEN_AI_KEY,
  // organization: 'org-zGXJoSFOcpCtjTCCYnisZWws',
});

export async function generateStory({
  age_group_id,
  purpose_id,
  prompt,
}: {
  age_group_id: number;
  purpose_id: number;
  prompt: string;
}): Promise<GeneratedStory> {
  const ageRange = `${AGE_GROUPS[age_group_id].min_age}-${AGE_GROUPS[age_group_id].max_age}`;
  const purpose = STORY_PURPOSES_TYPES[purpose_id].description;
  const finalPrompt = generateInstruction({ ageRange, purpose, prompt });

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: finalPrompt }],
      model: 'gpt-3.5-turbo',
    });

    if (!completion.choices[0].message.content) throw new Error('generating/parsing error');

    return parseStory(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error generating story:', error);
    throw new Error('Failed to generate story');
  }
}

export async function generateCharacterImages({
  description,
  ageGroup,
  artStyles,
}: {
  description: string;
  ageGroup: string;
  artStyles: ArtStyle[];
}): Promise<string[]> {
  const baseInstruction = `Create an illustration of the main character for a story intended for ${ageGroup} years old children. The background should be plain and light. Avoid any extraneous details`;
  const cDescription = `Character description: ${description}.`;
  try {
    const responses = await Promise.all([
      openai.images.generate({
        model: 'dall-e-3',
        prompt: `${baseInstruction} ${cDescription} ${artStyles[0].description}`,
        n: 1,
      }),
      openai.images.generate({
        model: 'dall-e-3',
        prompt: `${baseInstruction} ${cDescription} ${artStyles[1].description}`,
        n: 1,
      }),
      openai.images.generate({
        model: 'dall-e-3',
        prompt: `${baseInstruction} ${cDescription} ${artStyles[2].description}`,
        n: 1,
      }),
    ]);

    // Assuming the API response includes a way to get the image URL or binary data
    return responses
      .map((response) => {
        const imageUrl = response.data[0].url; // Adjust according to actual API response
        if (imageUrl) return imageUrl;
      })
      .filter((imageUrl) => imageUrl) as string[];
  } catch (error) {
    console.error('Error generating images:', error);
    throw new Error('Failed to generate images');
  }
}
