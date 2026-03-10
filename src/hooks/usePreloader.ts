import { useCallback, useState } from 'react'

export function usePreloader() {
  const [isOpen, setIsOpen] = useState(true)

  const closePreloader = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, closePreloader }
}
