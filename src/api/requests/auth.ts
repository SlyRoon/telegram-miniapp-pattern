import { apiClient } from '@/api/client'

interface LoginTelegramPayload {
  initData: string
}

export const authRequests = {
  loginWithTelegram: (payload: LoginTelegramPayload) =>
    apiClient.post('/auth/login', payload),
}
