import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'
import { tgHaptic } from '@/helpers/telegram'
import type { HapticFeedback } from '@/types'
import { cn } from '@/lib/utils'

const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:opacity-90',
        secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
        outline: 'border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
        ghost: 'bg-transparent text-foreground hover:bg-accent',
      },
      size: {
        md: 'h-10 px-4',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  hapticFeedback?: HapticFeedback
}

export function Button({ className, variant, size, hapticFeedback, onClick, ...props }: ButtonProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (hapticFeedback) {
      tgHaptic(hapticFeedback)
    }

    onClick?.(event)
  }

  return (
    <button
      className={cn(buttonStyles({ variant, size }), className)}
      onClick={handleClick}
      {...props}
    />
  )
}
