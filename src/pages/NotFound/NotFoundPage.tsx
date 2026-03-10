import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Header } from '@/components/common/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen px-4 py-4 sm:py-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <Header title={t('pages.notFound.headerTitle')} showBackButton />

        <Card>
          <CardHeader>
            <CardTitle>{t('pages.notFound.title')}</CardTitle>
            <CardDescription>{t('pages.notFound.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              to="/"
              className="inline-flex h-10 items-center rounded-xl border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              {t('pages.notFound.backHome')}
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
