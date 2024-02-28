import { type ClassValue } from 'clsx';
import { PressableStateCallbackType } from 'react-native';

export function cn(...inputs: ClassValue[]) {
  const classes = [];
  for (const input of inputs) {
    if (typeof input === 'string') {
      classes.push(input);
    }
  }
  return classes.join(' ');
}

export function isTextChildren(
  children: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode),
) {
  return Array.isArray(children)
    ? children.every((child) => typeof child === 'string')
    : typeof children === 'string';
}
