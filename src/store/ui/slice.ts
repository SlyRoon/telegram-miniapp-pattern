import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  isAppReady: boolean
  isBaseModalOpen: boolean
  isSlideUpModalOpen: boolean
}

const initialState: UiState = {
  isAppReady: false,
  isBaseModalOpen: false,
  isSlideUpModalOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAppReady(state, action: PayloadAction<boolean>) {
      state.isAppReady = action.payload
    },
    openBaseModal(state) {
      state.isBaseModalOpen = true
    },
    closeBaseModal(state) {
      state.isBaseModalOpen = false
    },
    openSlideUpModal(state) {
      state.isSlideUpModalOpen = true
    },
    closeSlideUpModal(state) {
      state.isSlideUpModalOpen = false
    },
    closeAllModals(state) {
      state.isBaseModalOpen = false
      state.isSlideUpModalOpen = false
    },
  },
})

export const {
  setAppReady,
  openBaseModal,
  closeBaseModal,
  openSlideUpModal,
  closeSlideUpModal,
  closeAllModals,
} = uiSlice.actions

export const uiReducer = uiSlice.reducer
