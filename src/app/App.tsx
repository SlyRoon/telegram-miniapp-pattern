import { useEffect } from 'react'
import { AppProviders } from '@/app/providers/AppProviders'
import { AppRouter } from '@/app/router/AppRouter'
import { Preloader } from '@/components/common/Preloader'
import { ModalHost } from '@/components/modals/ModalHost'
import { initTelegramMiniApp } from '@/helpers/telegram'
import { usePreloader } from '@/hooks/usePreloader'
import { useAppDispatch } from '@/store/hooks'
import { setTelegramMeta } from '@/store/data'
import { setAppReady } from '@/store/ui'

function AppContent() {
  const dispatch = useAppDispatch()
  const { isOpen, closePreloader } = usePreloader()

  useEffect(() => {
    try {
      const telegramMeta = initTelegramMiniApp()
      dispatch(setTelegramMeta(telegramMeta))
    } finally {
      closePreloader()
    }
  }, [closePreloader, dispatch])

  useEffect(() => {
    dispatch(setAppReady(!isOpen))
  }, [dispatch, isOpen])

  if (isOpen) {
    return <Preloader />
  }

  return (
    <>
      <AppRouter />
      <ModalHost />
    </>
  )
}

export function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  )
}
