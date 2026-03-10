import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Header } from '@/components/common/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'

export function ErrorPage() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen px-4 py-4 sm:py-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <Header title={t('pages.error.headerTitle')} showBackButton />

        <Card>
          <CardHeader>
            <CardTitle>{t('pages.error.title')}</CardTitle>
            <CardDescription>{t('pages.error.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              to="/"
              className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t('pages.error.backHome')}
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
