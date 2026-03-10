import { apiClient } from '@/api/client'

interface TelegramInitPayload {
  initData: string
  platform?: string
}

export const telegramRequests = {
  syncSession: (payload: TelegramInitPayload) =>
    apiClient.post('/telegram/session', payload),
}
