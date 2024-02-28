import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import * as Slot from '@/src/lib/rn-primitives/slot-native';
import { cn, isTextChildren } from '@/src/utils/class';

const buttonVariants = cva('flex-row items-center justify-center rounded-md', {
  variants: {
    variant: {
      default: 'bg-primary',
      destructive: 'bg-destructive',
      outline: 'border border-input bg-background',
      secondary: 'bg-secondary',
      ghost: '',
      link: '',
    },
    size: {
      default: 'h-10 px-2 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const buttonTextVariants = cva('font-medium font-body', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      link: 'text-primary underline-offset-4 underline',
    },
    size: {
      default: 'text-1.5 font-medium',
      sm: 'text-1 font-medium',
      lg: 'text-2 font-medium',
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
          Platform.OS === 'android' && 'flex-row rounded-md overflow-hidden',
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
