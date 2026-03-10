import { useRef, type TouchEventHandler } from 'react'

interface UseSwipeDownOptions {
  onSwipeDown: () => void
  threshold?: number
  enabled?: boolean
}

export function useSwipeDown({
  onSwipeDown,
  threshold = 70,
  enabled = true,
}: UseSwipeDownOptions) {
  const touchStartY = useRef<number | null>(null)
  const currentY = useRef<number | null>(null)

  const onTouchStart: TouchEventHandler<HTMLElement> = (event) => {
    if (!enabled) {
      return
    }

    touchStartY.current = event.touches[0]?.clientY ?? null
  }

  const onTouchMove: TouchEventHandler<HTMLElement> = (event) => {
    if (!enabled || touchStartY.current === null) {
      return
    }

    currentY.current = event.touches[0]?.clientY ?? null
  }

  const onTouchEnd: TouchEventHandler<HTMLElement> = () => {
    if (!enabled || touchStartY.current === null || currentY.current === null) {
      touchStartY.current = null
      currentY.current = null
      return
    }

    const delta = currentY.current - touchStartY.current
    if (delta > threshold) {
      onSwipeDown()
    }

    touchStartY.current = null
    currentY.current = null
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
