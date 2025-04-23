import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Define button variants using class-variance-authority
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-[#4E4CEC] text-white hover:bg-[#4E4CEC]/90', // Blurple
        secondary: 'bg-[#FF6060] text-white hover:bg-[#FF6060]/90', // Coral
        outline: 'border border-[#4E4CEC] text-[#4E4CEC] bg-transparent hover:bg-[#CAD5FF]/20', // Blurple with Light Blurple hover
        ghost: 'hover:bg-[#CAD5FF]/20 text-[#4E4CEC]', // Light Blurple hover with Blurple text
        link: 'text-[#4E4CEC] underline-offset-4 hover:underline', // Blurple text with underline
        destructive: 'bg-[#FF6060] text-white hover:bg-[#FF6060]/90', // Coral for destructive actions
        neutral: 'bg-[#F6F6F6] text-[#2C3138] hover:bg-[#EFEFEF]', // Silver to Light Grey with Charcoal text
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

// The Button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 