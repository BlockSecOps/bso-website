import { TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          // Base styles
          'w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder:text-white/40',
          'transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0',
          'resize-vertical min-h-[120px]',

          // States
          {
            'border-white/20 focus:border-electric-500 focus:ring-electric-500/30': !error,
            'border-error focus:border-error focus:ring-error/30': error,
          },

          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
