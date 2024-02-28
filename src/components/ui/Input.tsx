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
        'flex h-4 w-full items-center rounded-full bg-background px-1 text-1.25 text-black leading-[0px]',
        className,
      )}
      placeholderClassName={cn('font-body text-blue', placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
