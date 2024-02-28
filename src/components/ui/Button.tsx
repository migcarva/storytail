import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import * as Slot from '@/src/lib/rn-primitives/slot-native';
import { cn, isTextChildren } from '@/src/utils/class';

const buttonVariants = cva('flex-row items-center justify-center rounded-full', {
  variants: {
    variant: {
      default: 'bg-purple',
      destructive: 'bg-orange',
      outline: 'border border-input bg-background',
      secondary: 'bg-blue',
      ghost: '',
      link: '',
    },
    size: {
      default: 'h-4 px-0.5 py-0.5',
      sm: 'h-2.5 px-0.25',
      lg: 'h-6 px-0.5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const buttonTextVariants = cva('text-black font-bodybold', {
  variants: {
    variant: {
      default: 'text-white',
      destructive: '',
      outline: '',
      secondary: '',
      ghost: '',
      link: 'underline-offset-4 underline',
    },
    size: {
      default: 'text-1.5 font-bodybold',
      sm: 'text-1',
      lg: 'text-2 font-heading',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> &
    VariantProps<typeof buttonVariants> & {
      textClass?: string;
      androidRootClass?: string;
    }
>(
  (
    {
      className,
      textClass,
      variant = 'default',
      size,
      children,
      androidRootClass,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Root = Platform.OS === 'android' ? View : Slot.Pressable;

    return (
      <Root
        className={cn(
          Platform.OS === 'android' && 'flex-row rounded-full overflow-hidden',
          Platform.OS === 'android' && androidRootClass,
        )}>
        <Pressable
          className={cn(
            buttonVariants({
              variant,
              size,
              className: cn(className, disabled && 'opacity-50'),
            }),
          )}
          ref={ref}
          disabled={disabled}
          {...props}>
          {isTextChildren(children)
            ? // @ts-ignore
              ({ pressed, hovered }) => (
                <Text
                  className={cn(
                    hovered && 'opacity-90',
                    pressed && 'opacity-70',
                    buttonTextVariants({ variant, size, className: textClass }),
                    disabled && 'opacity-100',
                  )}>
                  {children as string | string[]}
                </Text>
              )
            : children}
        </Pressable>
      </Root>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
