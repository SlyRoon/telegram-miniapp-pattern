import type { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { defaultToasterOptions } from '@/components/ui'
import { store } from '@/app/store'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-center" toastOptions={defaultToasterOptions} />
    </Provider>
  )
}
