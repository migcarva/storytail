import React from 'react';
import { Text } from 'react-native';

import { cn } from '@/src/utils/class';

const Label = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, onPress, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-1.25 font-body font-medium leading-none text-black', className)}
    {...props}
  />
));

Label.displayName = 'Label';

export { Label };
