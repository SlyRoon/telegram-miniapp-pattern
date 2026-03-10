import type { ReactNode } from 'react'
import type { ModalProps } from '@/components/ui'
import { Modal } from '@/components/ui'
import { useSwipeDown } from '@/hooks/useSwipeDown'

type SlideUpModalProps = Omit<ModalProps, 'variant' | 'children'> & {
  children: ReactNode
}

export function SlideUpModal({ children, ...props }: SlideUpModalProps) {
  const swipeHandlers = useSwipeDown({
    enabled: props.open,
    onSwipeDown: () => props.onOpenChange(false),
  })

  return (
    <Modal variant="sheet" {...props}>
      <div {...swipeHandlers} className="space-y-4">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-muted" />
        {children}
      </div>
    </Modal>
  )
}
