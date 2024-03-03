import OpenAI from 'openai';

import { AGE_GROUPS, STORY_PURPOSES_TYPES } from '@/src/lib/constants';
import { generateReplyInstructions, parseStory } from '@/src/services/open-ai/open-ai.utils';

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
}) {
  const ageRange = `${AGE_GROUPS[age_group_id - 1].min_age}-${AGE_GROUPS[age_group_id - 1].max_age}`;
  const purpose = STORY_PURPOSES_TYPES[purpose_id - 1].description;

  const instructions = [
    `You're a story generator of world winning stories for kids.`, // persona
    `Write an age-appropriate story for a ${ageRange} years old child`, // age group
    `that builds on this idea: "${prompt}".`, // story idea
    `Make sure the story is gentle, engaging and positive. Craft a story that will ${purpose}.`, // purpose
    generateReplyInstructions(ageRange),
  ];

  const finalPrompt = instructions.join(' ');
  // console.log('PROMPT: ', finalPrompt);

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: finalPrompt }],
      model: 'gpt-3.5-turbo',
    });
    // console.log('>>>>>>>>>>', completion);
    // console.log('>>>>>>>>>>', completion.choices[0]);
    if (!completion.choices[0].message.content) throw new Error('generating/parsing error');
    const parsedStory = parseStory(completion.choices[0].message.content);
    console.log(parsedStory);
  } catch (error) {
    console.error('Error generating story:', error);
    throw new Error('Failed to generate story');
  }
}
