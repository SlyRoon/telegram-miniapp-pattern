import { configureStore } from '@reduxjs/toolkit'
import { dataReducer } from '@/store/data'
import { uiReducer } from '@/store/ui'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    data: dataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
