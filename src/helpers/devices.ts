const getUserAgent = () => (typeof navigator === 'undefined' ? '' : navigator.userAgent)

export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') {
    return false
  }

  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const isIOS = (): boolean => /iPad|iPhone|iPod/.test(getUserAgent())

export const isAndroid = (): boolean => /Android/.test(getUserAgent())

export const isMobileDevice = (): boolean => isIOS() || isAndroid()
