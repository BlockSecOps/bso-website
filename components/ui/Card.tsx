import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'outlined'
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', hover = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-2xl p-8',

          // Variant styles
          {
            // Glassmorphism
            'glass': variant === 'glass',

            // Solid background
            'bg-dark-300 border border-white/5': variant === 'solid',

            // Outlined
            'bg-transparent border-2 border-electric-500/30': variant === 'outlined',
          },

          // Hover effect
          {
            'transition-all duration-300 hover:-translate-y-2 hover:shadow-neon': hover,
          },

          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
