import { useEffect, type HTMLAttributes, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ModalVariant = 'center' | 'sheet'

export interface ModalProps {
  open: boolean
  onOpenChange: (next: boolean) => void
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  footer?: ReactNode
  variant?: ModalVariant
  closeOnOverlay?: boolean
  contentClassName?: string
  contentProps?: HTMLAttributes<HTMLDivElement>
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  variant = 'center',
  closeOnOverlay = true,
  contentClassName,
  contentProps,
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onOpenChange])

  if (!open) {
    return null
  }

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex bg-black/45 p-4 backdrop-blur-sm',
        variant === 'sheet' ? 'items-end justify-center sm:items-center' : 'items-center justify-center',
      )}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close modal overlay"
        onClick={() => {
          if (closeOnOverlay) {
            onOpenChange(false)
          }
        }}
      />

      <div
        className={cn(
          'relative z-10 w-full border border-border bg-card text-card-foreground shadow-xl',
          variant === 'center' && 'max-w-md rounded-2xl',
          variant === 'sheet' && 'max-w-lg rounded-2xl sm:rounded-2xl',
          contentClassName,
        )}
        {...contentProps}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {(title || description) && (
          <div className="space-y-1 px-5 pt-5">
            {title ? <h3 className="text-lg font-semibold text-foreground">{title}</h3> : null}
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
        )}

        <div className="px-5 py-4">{children}</div>

        {footer ? <div className="flex justify-end gap-2 px-5 pb-5">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  )
}
