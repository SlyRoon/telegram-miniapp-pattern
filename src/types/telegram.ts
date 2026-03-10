export type TelegramHapticImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
export type TelegramHapticNotificationType = 'error' | 'success' | 'warning'
export type HapticFeedback = TelegramHapticImpactStyle | TelegramHapticNotificationType

export interface TelegramWebAppUser {
  id: number
  is_bot?: boolean
  first_name?: string
  last_name?: string
  username?: string
  language_code?: string
}

export interface TelegramWebApp {
  initData?: string
  initDataUnsafe?: {
    user?: TelegramWebAppUser
  }
  version?: string
  platform?: string
  isExpanded?: boolean
  isFullscreen?: boolean
  ready: () => void
  expand: () => void
  close?: () => void
  disableVerticalSwipes?: () => void
  requestFullscreen?: () => void
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void
  openTelegramLink: (url: string) => void
  HapticFeedback?: {
    impactOccurred: (style: TelegramHapticImpactStyle) => void
    notificationOccurred: (type: TelegramHapticNotificationType) => void
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp
    }
  }
}

export {}
