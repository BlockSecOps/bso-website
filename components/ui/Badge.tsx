import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',

          // Variant styles
          {
            'bg-electric-500/20 text-electric-500 border border-electric-500/30': variant === 'default',
            'bg-success/20 text-success border border-success/30': variant === 'success',
            'bg-warning/20 text-warning border border-warning/30': variant === 'warning',
            'bg-error/20 text-error border border-error/30': variant === 'error',
          },

          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
