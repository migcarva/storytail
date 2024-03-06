export const generateInstruction = ({
  ageRange,
  prompt,
  purpose,
}: {
  ageRange: string;
  prompt: string;
  purpose: string;
}) => {
  const instructions = [
    `You're a story generator of world winning stories for kids.`, // persona
    `Write an age-appropriate story for a ${ageRange} years old child`, // age group
    `that builds on this idea: "${prompt}".`, // story idea
    `Make sure the story is gentle, engaging and positive. Craft a story that will ${purpose}.`, // purpose
    generateReplyInstructions(ageRange),
  ];

  return instructions.join(' ');
};

export const generateReplyInstructions = (ageGroup: string) => {
  const intro = `Reply Format:`;
  const title = `[t]<generated title for the story>`;
  const summary = `[s]<generated summary of the story>`;
  const mainCharacter = `[d]<description of the main character(s) appearance and visuals>`;
  const chapters = '[c#]<text of the chapter number #>';
  let min, max, maxChapters;
  switch (ageGroup) {
    case '0-2':
      min = '15';
      max = '20';
      maxChapters = 4;
      break;
    case '3-5':
      min = '20';
      max = '30';
      maxChapters = 5;
      break;
    case '6-8':
      min = '30';
      max = '40';
      maxChapters = 6;
      break;
    case '9-12':
      min = '40';
      max = '50';
      maxChapters = 8;
      break;
  }

  const chapterInstructions = `Each chapter contains between ${min}-${max} words. Generate a total of ${maxChapters}`;

  return `${intro} ${title} ${summary} ${mainCharacter} ${chapters}. ${chapterInstructions}`;
};

export const parseStory = (text: string) => {
  const storyParts = {
    title: '',
    summary: '',
    mcDescription: '',
    chapters: {},
  };

  const regex = /\[t\](.*?)\[s\](.*?)\[d\](.*?)(\[c\d+\].*)/s;
  const matches = text.match(regex);

  if (matches) {
    storyParts.title = matches[1].trim();
    storyParts.summary = matches[2].trim();
    storyParts.mcDescription = matches[3].trim();

    // The chapters need to be extracted from the remaining text
    const chaptersText = matches[4];

    // Adjusted regex for splitting chapters correctly
    const chaptersRegex = /(\[c\d+\])([^[]+)/g;

    let chapterMatch;
    while ((chapterMatch = chaptersRegex.exec(chaptersText)) !== null) {
      // Using the chapter number from the marker as the key
      const chapterKey = chapterMatch[1].replace(/[^\d]/g, ''); // Extracts number from marker

      // @ts-ignore
      storyParts.chapters[`chapter${chapterKey}`] = chapterMatch[2].trim();
    }
  }

  return storyParts;
};
