import * as React from 'react';
import { Button, type ButtonProps } from './button';
import { Icon, type IconName } from '@/components/icons/icons';
import { cn } from '@/lib/cn';

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: IconName;
  iconSize?: 16 | 20 | 24;
  label: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, iconSize = 20, label, className, size = 'icon', variant = 'ghost', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        variant={variant}
        aria-label={label}
        title={label}
        className={cn('flex shrink-0 items-center justify-center', className)}
        {...props}
      >
        <Icon name={icon} size={iconSize} />
      </Button>
    );
  },
);
IconButton.displayName = 'IconButton';
