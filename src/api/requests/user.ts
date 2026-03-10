import { apiClient } from '@/api/client'

type SupportedLanguage = 'en' | 'uk'

interface SetLanguagePayload {
  language: SupportedLanguage
}

export const userRequests = {
  setLanguage: (payload: SetLanguagePayload) =>
    apiClient.post('/user/set-language', payload),
}
