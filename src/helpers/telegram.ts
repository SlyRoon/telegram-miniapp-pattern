import { APP_ENV } from '@/app/config'
import type {
  HapticFeedback,
  TelegramHapticImpactStyle,
  TelegramHapticNotificationType,
  TelegramMeta,
  TelegramWebApp,
} from '@/types'

const MIN_FULLSCREEN_WEBAPP_VERSION = '8.0'

let cachedTelegramMeta: TelegramMeta | null = null

const compareVersions = (left: string, right: string): number => {
  const leftParts = left.split('.').map((part) => Number.parseInt(part, 10) || 0)
  const rightParts = right.split('.').map((part) => Number.parseInt(part, 10) || 0)
  const maxLength = Math.max(leftParts.length, rightParts.length)

  for (let index = 0; index < maxLength; index += 1) {
    const leftPart = leftParts[index] ?? 0
    const rightPart = rightParts[index] ?? 0

    if (leftPart > rightPart) {
      return 1
    }

    if (leftPart < rightPart) {
      return -1
    }
  }

  return 0
}

export const getTelegramWebApp = (): TelegramWebApp | null => {
  if (typeof window === 'undefined') {
    return null
  }

  return window.Telegram?.WebApp ?? null
}

export const isTelegramMiniApp = (): boolean => Boolean(getTelegramWebApp())

export const tgReady = (): void => {
  getTelegramWebApp()?.ready()
}

export const tgExpand = (): void => {
  getTelegramWebApp()?.expand()
}

export const tgClose = (): void => {
  getTelegramWebApp()?.close?.()
}

export const tgDisableYSwipes = (): void => {
  getTelegramWebApp()?.disableVerticalSwipes?.()
}

export const tgRequestFullscreen = (): void => {
  if (!APP_ENV.enableFullscreen) {
    return
  }

  const tg = getTelegramWebApp()
  if (!tg || typeof tg.requestFullscreen !== 'function') {
    return
  }

  if (tg.version && compareVersions(tg.version, MIN_FULLSCREEN_WEBAPP_VERSION) < 0) {
    return
  }

  try {
    tg.requestFullscreen()
  } catch {
    // Old Telegram clients can throw `WebAppMethodUnsupported` even when the method exists.
  }
}

export const tgOpenFullScreen = (): void => {
  tgRequestFullscreen()
}

export const tgHaptic = (type: HapticFeedback): void => {
  const haptic = getTelegramWebApp()?.HapticFeedback

  if (type === 'success' || type === 'error' || type === 'warning') {
    haptic?.notificationOccurred(type)
    return
  }

  haptic?.impactOccurred(type)
}

export const tgHapticImpact = (style: TelegramHapticImpactStyle = 'light'): void => {
  tgHaptic(style)
}

export const tgHapticNotification = (type: TelegramHapticNotificationType = 'success'): void => {
  tgHaptic(type)
}

export const tgOpenLink = (url: string): void => {
  const tg = getTelegramWebApp()
  if (tg) {
    tg.openLink(url, { try_instant_view: true })
    return
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}

export const tgOpenTelegramLink = (url: string): void => {
  const tg = getTelegramWebApp()
  if (tg) {
    tg.openTelegramLink(url)
    return
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}

export const initTelegramMiniApp = (): TelegramMeta => {
  if (cachedTelegramMeta) {
    return cachedTelegramMeta
  }

  const tg = getTelegramWebApp()

  if (!tg) {
    cachedTelegramMeta = {
      isTelegram: false,
      isReady: false,
      isExpanded: false,
      isFullscreen: false,
      platform: null,
    }

    return cachedTelegramMeta
  }

  tgReady()
  tgExpand()
  tgDisableYSwipes()
  tgRequestFullscreen()

  cachedTelegramMeta = {
    isTelegram: true,
    isReady: true,
    isExpanded: Boolean(tg.isExpanded),
    isFullscreen: Boolean(tg.isFullscreen),
    platform: tg.platform ?? null,
  }

  return cachedTelegramMeta
}
