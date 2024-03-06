import { StoryCreationStep } from './story-creation-types';

export const stepStateMachine = (step: StoryCreationStep) => {
  let nextStep: StoryCreationStep | null, prevStep: StoryCreationStep | null;

  switch (step) {
    case 'dedication':
      prevStep = null;
      nextStep = 'age_group';
      break;
    case 'age_group':
      prevStep = 'dedication';
      nextStep = 'prompt';
      break;
    case 'prompt':
      prevStep = 'age_group';
      nextStep = 'purpose';
      break;
    case 'purpose':
      prevStep = 'prompt';
      nextStep = 'story_generation';
      break;
    case 'story_generation':
      prevStep = 'purpose';
      nextStep = 'character_selection';
      break;
    case 'character_selection':
      prevStep = 'story_generation';
      nextStep = 'story_illustration';
      break;
    case 'story_illustration':
      prevStep = 'character_selection';
      nextStep = 'in_review';
      break;
    case 'in_review':
      prevStep = 'story_illustration';
      nextStep = 'ready';
      break;
    case 'ready':
      prevStep = 'in_review';
      nextStep = null;
      break;
  }

  return { nextStep, prevStep };
};

export const getStepFromSearchParams = (step: string | string[] | undefined): StoryCreationStep => {
  switch (step) {
    case 'dedication':
      return 'dedication';
    case 'age_group':
      return 'age_group';
    case 'prompt':
      return 'prompt';
    case 'purpose':
      return 'purpose';
    case 'story_generation':
      return 'story_generation';
    case 'character_selection':
      return 'character_selection';
    case 'story_illustration':
      return 'story_illustration';
    case 'in_review':
      return 'in_review';
    case 'ready':
      return 'ready';
    default:
      // by default we return dedication, the inital story step
      return 'dedication';
  }
};
