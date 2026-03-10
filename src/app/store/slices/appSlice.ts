import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  isCoreReady: boolean
}

const initialState: AppState = {
  isCoreReady: true,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCoreReady(state, action: PayloadAction<boolean>) {
      state.isCoreReady = action.payload
    },
  },
})

export const { setCoreReady } = appSlice.actions
export default appSlice.reducer
