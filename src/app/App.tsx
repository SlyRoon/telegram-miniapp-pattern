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
  const { isPreloading } = usePreloader()

  useEffect(() => {
    const telegramMeta = initTelegramMiniApp()
    dispatch(setTelegramMeta(telegramMeta))
  }, [dispatch])

  useEffect(() => {
    dispatch(setAppReady(!isPreloading))
  }, [dispatch, isPreloading])

  if (isPreloading) {
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
