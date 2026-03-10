import { useEffect, useState } from 'react'

export function usePreloader(delayMs = 900) {
  const [isPreloading, setIsPreloading] = useState(true)

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setIsPreloading(false)
    }, delayMs)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [delayMs])

  return { isPreloading }
}
