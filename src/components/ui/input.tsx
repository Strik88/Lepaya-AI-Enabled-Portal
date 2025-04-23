import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1 w-full">
        {label && (
          <label 
            htmlFor={props.id} 
            className="text-sm font-medium text-[#2C3138]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-[#EFEFEF] bg-white px-3 py-2 text-sm placeholder:text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#4E4CEC] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-[#FF6060] focus:ring-[#FF6060]',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs font-medium text-[#FF6060]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input }; 