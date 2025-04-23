import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
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
          <textarea
            className={cn(
              'flex min-h-[80px] w-full rounded-md border border-[#EFEFEF] bg-white px-3 py-2 text-sm placeholder:text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#4E4CEC] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
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

Textarea.displayName = 'Textarea';

export { Textarea }; 