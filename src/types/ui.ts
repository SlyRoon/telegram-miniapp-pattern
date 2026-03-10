export type ThemeMode = 'light' | 'dark'

export interface TelegramMeta {
  isTelegram: boolean
  isReady: boolean
  isExpanded: boolean
  isFullscreen: boolean
  platform: string | null
}
