const getUserAgent = (): string => {
  if (typeof navigator === 'undefined') {
    return ''
  }

  return navigator.userAgent || navigator.vendor
}

const MOBILE_REGEX =
  /android|iphone|ipad|mobile|ipod|blackberry|opera mini|iemobile|wpdesktop|windows phone/i

export const isDesktop = (): boolean => {
  if (import.meta.env.VITE_DEBUG === 'true') {
    return true
  }

  return !MOBILE_REGEX.test(getUserAgent())
}

export const isMobile = (): boolean => !isDesktop()

export const isIOS = (): boolean => /iphone|ipad|ipod/i.test(getUserAgent())

export const isAndroid = (): boolean => /android/i.test(getUserAgent())

export const isTelegram = (): boolean =>
  typeof window !== 'undefined' && Boolean(window?.Telegram?.WebApp?.initData)

export const isStandalone = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches

export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') {
    return false
  }

  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const isMobileDevice = (): boolean => isMobile()
