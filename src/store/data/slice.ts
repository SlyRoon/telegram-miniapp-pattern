import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TelegramMeta } from '@/types'

type AppLanguage = 'en' | 'uk'

interface DataState {
  language: AppLanguage
  telegramMeta: TelegramMeta
}

const initialState: DataState = {
  language: 'en',
  telegramMeta: {
    isTelegram: false,
    isReady: false,
    isExpanded: false,
    isFullscreen: false,
    platform: null,
  },
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<AppLanguage>) {
      state.language = action.payload
    },
    setTelegramMeta(state, action: PayloadAction<TelegramMeta>) {
      state.telegramMeta = action.payload
    },
  },
})

export const { setLanguage, setTelegramMeta } = dataSlice.actions

export const dataReducer = dataSlice.reducer
