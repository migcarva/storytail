import { BACKGROUND_OPTIONS } from '@/src/lib/constants';

export const randomiseBackgroundColor = () => {
  const randomBackgroundColor =
    BACKGROUND_OPTIONS[Math.floor(Math.random() * BACKGROUND_OPTIONS.length)];
  return randomBackgroundColor;
};
