import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          // Base styles
          'w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder:text-white/40',
          'transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0',

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

Input.displayName = 'Input'

export { Input }
