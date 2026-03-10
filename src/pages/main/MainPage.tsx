import { ExternalLink, MessageCircle, PanelBottomOpen, SquareMousePointer } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Header } from '@/components/common/Header'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components/ui'
import { tgOpenLink, tgOpenTelegramLink } from '@/helpers/telegram'
import { useToast } from '@/hooks/useToast'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { openBaseModal, openSlideUpModal } from '@/store/ui'

export function MainPage() {
  const dispatch = useAppDispatch()
  const { success } = useToast()
  const { t } = useTranslation()
  const isAppReady = useAppSelector((state) => state.ui.isAppReady)
  const telegramMeta = useAppSelector((state) => state.data.telegramMeta)

  const environmentLabel = telegramMeta.isTelegram
    ? t('main.environmentTelegram')
    : t('main.environmentBrowser')

  return (
    <main className="min-h-screen px-4 py-4 sm:py-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <Header
          title={t('header.title')}
          actionSlot={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => tgOpenLink('https://core.telegram.org/bots/webapps')}
            >
              <ExternalLink className="h-4 w-4" />
              {t('main.openDocs')}
            </Button>
          }
        />

        <Card>
          <CardHeader>
            <CardTitle>{t('main.title')}</CardTitle>
            <CardDescription>{t('main.description')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border/80 bg-muted/35 p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{t('main.appReady')}</p>
              <p className="mt-1 text-sm font-medium">{isAppReady ? t('common.ready') : t('common.notReady')}</p>
            </div>
            <div className="rounded-xl border border-border/80 bg-muted/35 p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{t('main.environment')}</p>
              <p className="mt-1 text-sm font-medium">{environmentLabel}</p>
            </div>
            <div className="rounded-xl border border-border/80 bg-muted/35 p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{t('main.tgReady')}</p>
              <p className="mt-1 text-sm font-medium">
                {telegramMeta.isReady ? t('common.ready') : t('common.notReady')}
              </p>
            </div>
            <div className="rounded-xl border border-border/80 bg-muted/35 p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{t('main.tgExpanded')}</p>
              <p className="mt-1 text-sm font-medium">
                {telegramMeta.isExpanded ? t('common.ready') : t('common.notReady')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('main.controlsTitle')}</CardTitle>
            <CardDescription>{t('main.controlsDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button type="button" onClick={() => success(t('main.toastSuccess'))}>
              <SquareMousePointer className="h-4 w-4" />
              {t('main.showToast')}
            </Button>
            <Button type="button" variant="secondary" onClick={() => dispatch(openBaseModal())}>
              <SquareMousePointer className="h-4 w-4" />
              {t('main.openBaseModal')}
            </Button>
            <Button type="button" variant="secondary" onClick={() => dispatch(openSlideUpModal())}>
              <PanelBottomOpen className="h-4 w-4" />
              {t('main.openSheetModal')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => tgOpenTelegramLink('https://t.me/telegram')}
            >
              <MessageCircle className="h-4 w-4" />
              {t('main.openTelegramLink')}
            </Button>
            <Link
              to="/missing"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:ml-auto"
            >
              {t('main.openNotFound')}
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('main.uiDemoTitle')}</CardTitle>
            <CardDescription>{t('main.uiDemoDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="demo-input">{t('main.demoInputLabel')}</Label>
            <Input id="demo-input" placeholder={t('main.demoInputPlaceholder')} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
