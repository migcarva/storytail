import React from 'react';
import { TextInput } from 'react-native';

import { cn } from '@/src/utils/class';

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        'flex',
        'h-3',
        'w-full',
        'items-center',
        'rounded-md',
        'border',
        'border-input',
        'bg-background',
        'px-1',
        'text-1.25',
        'font-body',
        'leading-[0px]',
        // 'text-black',
        className,
      )}
      placeholderClassName={cn('font-body text-blue', placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
