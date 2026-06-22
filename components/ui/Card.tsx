import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'emerald' | 'cyan' | 'none';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = 'none', ...props }, ref) => {
    return (
      <div
        className={cn(
          'glass-card p-6 transition-all',
          {
            'hover:border-accent-emerald/20 hover:glow-emerald': glow === 'emerald',
            'hover:border-accent-cyan/20 hover:glow-cyan': glow === 'cyan',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card };