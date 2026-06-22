import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-full font-semibold transition-all',
          {
            'bg-gradient-to-r from-accent-emerald to-accent-cyan text-navy-950 shadow-lg shadow-accent-emerald/20 hover:shadow-accent-emerald/40':
              variant === 'primary',
            'border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10':
              variant === 'secondary',
            'text-gray-400 hover:text-white': variant === 'ghost',
          },
          {
            'px-3 py-1.5 text-xs': size === 'sm',
            'px-6 py-2.5 text-sm': size === 'md',
            'px-8 py-3 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };