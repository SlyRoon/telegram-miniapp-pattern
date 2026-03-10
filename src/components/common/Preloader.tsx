import { LoaderCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Preloader() {
  const { t } = useTranslation()

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-xs rounded-2xl border border-border/80 bg-card/95 p-6 text-center shadow-[0_18px_50px_-40px_rgba(8,47,73,0.7)] backdrop-blur-sm">
        <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-primary" />
        <p className="mt-3 text-sm text-muted-foreground">{t('preloader.loading')}</p>
      </section>
    </main>
  )
}
