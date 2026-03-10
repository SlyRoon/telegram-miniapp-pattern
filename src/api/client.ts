import axios from 'axios'
import { APP_ENV } from '@/app/config'

export const apiClient = axios.create({
  baseURL: APP_ENV.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
})
