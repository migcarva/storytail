export const generateReplyInstructions = (ageGroup: string) => {
  const intro = `Reply Format:`;
  const mainCharacter = `<text of description of the main character(s) appearance and visuals>`;
  const chapters = '[C#]<text of the chapter number #>';
  let min, max, maxChapters;
  switch (ageGroup) {
    case '0-2':
      min = '10';
      max = '15';
      maxChapters = 4;
      break;
    case '3-5':
      min = '15';
      max = '25';
      maxChapters = 5;
      break;
    case '6-8':
      min = '20';
      max = '30';
      maxChapters = 6;
      break;
    case '9-12':
      min = '30';
      max = '40';
      maxChapters = 8;
      break;
  }

  const chapterInstructions = `Each chapter contains between ${min}-${max} words. Generate a total of ${maxChapters}`;

  return `${intro} ${mainCharacter} ${chapters}. ${chapterInstructions}`;
};

export const parseStory = (completion: string) => {
  const parsedStory = completion.split(/(\[C\d+\])/).filter(Boolean);

  const mainCharacterDescription = parsedStory[0];

  const chapters: { [key: string]: string } = {};
  // To organize chapters in an object with their markers
  for (let i = 1; i < parsedStory.length; i += 2) {
    const chapterMarker = `chapter${i}`;
    const chapterContent = parsedStory[i + 1]?.trim(); // Use trim to remove leading/trailing whitespace
    if (chapterContent) {
      chapters[chapterMarker] = chapterContent;
    }
  }

  return {
    mainCharacterDescription,
    chapters,
  };
};
