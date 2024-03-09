import { AgeGroup, ArtStyle } from '@/src/types';

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: 0,
    description: 'Toddlers',
    min_age: 0,
    max_age: 2,
  },
  {
    id: 1,
    description: 'Preschool',
    min_age: 3,
    max_age: 5,
  },
  {
    id: 2,
    description: 'Early Readers',
    min_age: 6,
    max_age: 8,
  },
  {
    id: 3,
    description: 'Middle Grade',
    min_age: 9,
    max_age: 12,
  },
  {
    id: 4,
    description: 'Young Teens',
    min_age: 13,
    max_age: 15,
  },
];

export const STORY_PURPOSES_TYPES = [
  {
    id: 0,
    description: 'Surprise me',
  },
  {
    id: 1,
    description: 'Inspire Creativity',
  },
  {
    id: 2,
    description: 'Foster Empathy',
  },
  {
    id: 3,
    description: 'Stimulate Curiosity',
  },
  {
    id: 4,
    description: 'Teach a Lesson',
  },
  {
    id: 5,
    description: 'Boost Confidence',
  },
];

export const REACTION_TYPES = [
  { id: 1, text: 'Love', emoji: '❤️' },
  { id: 2, text: 'Inspired', emoji: '✨' },
  { id: 3, text: 'Friendship', emoji: '💕' },
  { id: 4, text: 'Curious', emoji: '🔍' },
  { id: 5, text: 'Wisdom', emoji: '🦉' },
  { id: 6, text: 'Adored', emoji: '😍' },
  { id: 7, text: 'Top', emoji: '🏆' },
  { id: 8, text: 'Fire', emoji: '🔥' },
];

export const BACKGROUND_OPTIONS = ['blue', 'yellow', 'orange', 'pink'];

export const ART_STYLES: ArtStyle[][] = [
  // 0-2
  [
    {
      id: 1,
      title: 'High-Contrast Monochrome',
      description:
        'Bold black-and-white patterns and illustrations designed to stimulate infant visual development and focus, utilizing simple geometric shapes and high contrast for early eye training.',
    },
    {
      id: 2,
      title: 'Soft Pastel Illustrations',
      description:
        'Gentle, soothing pastels with fluffy, cloud-like shapes that evoke warmth and comfort, ideal for creating a calm and nurturing environment.',
    },
    {
      id: 3,
      title: 'Watercolor Washes',
      description:
        'Light, airy watercolor illustrations that blend soft colors seamlessly, perfect for peaceful storytelling and visual exploration.',
    },
    {
      id: 4,
      title: 'Hand-Drawn Scribbles',
      description:
        'Mimicking the spontaneous joy of a child’s first scribbles, this style uses uneven lines and shapes, encouraging creativity and self-expression.',
    },
    {
      id: 5,
      title: 'Color Block',
      description:
        "Large, clearly defined blocks of bright colors, without intricate patterns, to help in color recognition and to captivate a toddler's attention with simplicity.",
    },
    {
      id: 6,
      title: 'Minimalist Shapes',
      description:
        'Utilizes basic geometric shapes with minimal detail, focusing on the essence of objects to aid in shape recognition and categorization.',
    },
    {
      id: 7,
      title: 'Textured Touch',
      description:
        'Illustrations that simulate textures visually, encouraging imagination about how different surfaces feel, such as fuzzy, smooth, or rough, to engage sensory curiosity.',
    },
    {
      id: 8,
      title: 'Silhouette Story',
      description:
        'Simple silhouettes against contrasting backgrounds, highlighting recognizable forms and activities without overwhelming details, suitable for early form and movement recognition.',
    },
    {
      id: 9,
      title: 'Primary Colors Pop',
      description:
        'Artwork emphasizing primary colors (red, blue, yellow) in bold, saturated tones, aiding in color differentiation and visual development.',
    },
    {
      id: 10,
      title: 'Cheerful Chalk Art',
      description:
        'Bright, playful illustrations with a chalk-like texture and appearance, bringing a tactile element to visual designs, reminiscent of sidewalk drawings.',
    },
  ],
  //3-5
  [
    {
      id: 11,
      title: 'Gentle Pastels',
      description:
        'Soft, soothing pastels employing fluffy, cloud-like shapes and textures that evoke warmth and comfort, perfect for calming stories.',
    },
    {
      id: 12,
      title: 'Bold Cartoons',
      description:
        'Characterized by bright, primary colors and simple, exaggerated forms and expressions, making characters easily recognizable and emotions clear.',
    },
    {
      id: 13,
      title: 'Watercolor Wash',
      description:
        'Light and airy watercolor techniques with subtle color transitions and a dreamy quality, ideal for gentle and whimsical tales.',
    },
    {
      id: 14,
      title: 'Crayon Scribbles',
      description:
        "Mimicking the look of children's crayon drawings with vibrant, uneven lines and a spontaneous feel, connecting with kids’ own art creations.",
    },
    {
      id: 15,
      title: 'Digital Flat Colors',
      description:
        "Utilizes flat, bold colors with clear outlines in a digital medium, offering a modern and clean aesthetic that's visually striking.",
    },
    {
      id: 16,
      title: 'Hand-Drawn Doodles',
      description:
        "Looks like it's drawn by hand with a loose, sketchy approach, incorporating scribbles and doodles that add a personal touch.",
    },
    {
      id: 17,
      title: 'Cut-Paper Collage',
      description:
        'Art made from cut-out pieces of colored paper, creating layered, textured illustrations that have a tangible, crafty feel.',
    },
    {
      id: 18,
      title: 'Chalkboard Fun',
      description:
        'Emulates the look of chalk on a blackboard, with white and colored chalk creating a playful and classroom-familiar visual style.',
    },
    {
      id: 19,
      title: 'Minimalist Shapes',
      description:
        'Focuses on simplicity and minimalism, using geometric shapes and a limited color palette to convey characters and settings.',
    },
    {
      id: 20,
      title: 'Retro Comic',
      description:
        'Inspired by vintage comics, with halftone dots, bold ink lines, and a limited color scheme, evoking nostalgia with a touch of humor.',
    },
  ],
  // 6-8
  [
    {
      id: 21,
      title: 'Digital Dreamscape',
      description:
        'Crisp, vibrant digital art that combines fantastical elements with clear, bright colors. Perfect for bringing modern, imaginative scenes to life with a touch of whimsy.',
    },
    {
      id: 22,
      title: 'Classic Comic',
      description:
        'Bold lines and dynamic action scenes reminiscent of traditional comic books. This style uses strong shadows and highlights to create movement and expression.',
    },
    {
      id: 23,
      title: 'Stylized Realism',
      description:
        'Real-world scenes and characters with exaggerated features or elements, blending realism with imaginative tweaks to enhance storytelling.',
    },
    {
      id: 24,
      title: 'Pixel Playground',
      description:
        'Retro-inspired pixel art that harks back to early video games, appealing to kids’ sense of adventure and nostalgia for arcade classics.',
    },
    {
      id: 25,
      title: 'Watercolor Wonderland',
      description:
        'Soft, flowing watercolors that blend reality with fantasy, perfect for stories that drift between dreamlike landscapes and real-world settings.',
    },
    {
      id: 26,
      title: 'Cut-Paper Collage',
      description:
        'Art that mimics the look of cut paper, layering colors and textures for a tactile, crafty appearance that stimulates creativity and hands-on activities.',
    },
    {
      id: 27,
      title: 'Expressive Sketchbook',
      description:
        'Loose, energetic sketches that capture the spontaneity and emotion of characters and scenes, as if pulled from an artist’s sketchbook.',
    },
    {
      id: 28,
      title: 'Vibrant Vector',
      description:
        'Clean, smooth lines and shapes filled with bright, flat colors, characteristic of vector art. Ideal for clear, upbeat scenes that pop off the page.',
    },
    {
      id: 29,
      title: 'Anime Adventure',
      description:
        'Inspired by Japanese anime, this style features characters with expressive eyes and dynamic poses, set in vividly imagined worlds.',
    },
    {
      id: 30,
      title: 'Whimsical Woodcut',
      description:
        'Art that looks like traditional woodcut prints, offering a timeless, textured approach that adds depth and a sense of folklore to stories.',
    },
  ],
  // 9-12
  [
    {
      id: 31,
      title: 'Graphic Novel Precision',
      description:
        'Sharp, detailed illustrations found in graphic novels, combining strong ink outlines with deep, expressive shading. Perfect for action-packed stories and dynamic character expressions.',
    },
    {
      id: 32,
      title: 'Surreal Fantasy',
      description:
        'Art that bends reality, blending fantastical elements with the real world in unexpected ways. Uses vibrant colors and imaginative scenarios to spark curiosity.',
    },
    {
      id: 33,
      title: 'Neo-Pop Art',
      description:
        'Bright, saturated colors and bold patterns inspired by the Pop Art movement, updated with modern themes and icons. Engages with its vibrant energy and cultural relevance.',
    },
    {
      id: 34,
      title: 'Digital 3D Render',
      description:
        'Three-dimensional, digitally rendered art that provides a lifelike depth and realism. Ideal for sci-fi and fantasy settings, offering a window into other worlds.',
    },
    {
      id: 35,
      title: 'Environmental Concept Art',
      description:
        'Detailed landscapes and environments that serve as backdrops for adventures. Rich in texture and atmosphere, pulling readers into the story’s setting.',
    },
    {
      id: 36,
      title: 'Manga Mastery',
      description:
        'Characters and stories presented in the distinct style of Japanese manga, with an emphasis on expressive characters and dramatic, serialized storytelling.',
    },
    {
      id: 37,
      title: 'Steampunk Intricacies',
      description:
        'A blend of Victorian-era industrial steam-powered machinery and futuristic innovations. Detailed, mechanical designs create a unique, alternative reality.',
    },
    {
      id: 38,
      title: 'Gothic Illustration',
      description:
        'Dark, moody art that evokes mystery and suspense. Uses shadow and light to create a sense of foreboding, perfect for mystery and horror genres.',
    },
    {
      id: 39,
      title: 'Renaissance Revival',
      description:
        'Artwork inspired by the Renaissance period, focusing on humanism, detail, and naturalism. Brings a classic touch to historical narratives.',
    },
    {
      id: 40,
      title: 'Minimalist Modern',
      description:
        'Uses simple, clean lines and a muted color palette to convey complex stories through minimal visual elements. Encourages readers to fill in the blanks with their imagination.',
    },
  ],
  // 13-15
  [
    {
      id: 41,
      title: 'Abstract Expressionism',
      description:
        'Art that prioritizes emotional expression through powerful abstract forms and vibrant colors, inviting interpretation and personal connection.',
    },
    {
      id: 42,
      title: 'Urban Street Art',
      description:
        'Inspired by graffiti and street murals, this style is characterized by bold lines, bright colors, and often incorporates elements of urban culture and commentary.',
    },
    {
      id: 43,
      title: 'Digital Hyperrealism',
      description:
        "Extremely detailed and realistic digital art that can blur the line between reality and illustration, appealing to teens' appreciation for skill and authenticity.",
    },
    {
      id: 44,
      title: 'Contemporary Anime',
      description:
        'Builds on traditional anime by incorporating modern themes and styles, often blending genres and experimenting with visual storytelling techniques.',
    },
    {
      id: 45,
      title: 'Surrealist Dreams',
      description:
        'Art that distorts reality in dreamlike ways, blending the familiar with the bizarre to explore subconscious themes and imaginative worlds.',
    },
    {
      id: 46,
      title: 'Indie Comic Flair',
      description:
        'Features the distinctive styles found in independent comics, emphasizing creative freedom, diverse themes, and unique, personal narratives.',
    },
    {
      id: 47,
      title: 'Cyberpunk Vibes',
      description:
        'Futuristic and neon-lit scenes inspired by cyberpunk themes, highlighting advanced technology, dystopian settings, and rebel characters.',
    },
    {
      id: 48,
      title: 'Ethereal Fantasy',
      description:
        'Soft, detailed art that evokes a sense of magic and otherworldliness, often depicting mythical creatures, ancient gods, and magical landscapes.',
    },
    {
      id: 49,
      title: 'Grunge Illustration',
      description:
        'Art that incorporates elements of the grunge aesthetic, such as textured backgrounds, rough edges, and a moody color palette, reflecting teen angst and rebellion.',
    },
    {
      id: 50,
      title: ' Retrofuturism',
      description:
        'Merges the retro aesthetics of past decades with futuristic concepts, creating a nostalgic yet forward-looking vision of the world.',
    },
  ],
];
