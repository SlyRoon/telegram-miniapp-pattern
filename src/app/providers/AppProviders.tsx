import type { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from '@/app/store'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '14px',
            border: '1px solid var(--border)',
            background: 'color-mix(in srgb, var(--card) 92%, transparent)',
            color: 'var(--card-foreground)',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
    </Provider>
  )
}
