import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

interface HeaderProps {
  title: string
  showBackButton?: boolean
  onBack?: () => void
  actionSlot?: ReactNode
  className?: string
}

export function Header({
  title,
  showBackButton = false,
  onBack,
  actionSlot,
  className,
}: HeaderProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }

    navigate(-1)
  }

  return (
    <header
      className={cn(
        'rounded-2xl border border-border/80 bg-card/95 px-4 py-3 shadow-[0_18px_45px_-35px_rgba(12,74,110,0.5)] backdrop-blur-md',
        className,
      )}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {showBackButton ? (
          <Button type="button" variant="ghost" size="sm" onClick={handleBack}>
            <ChevronLeft className="h-4 w-4" />
            {t('header.back')}
          </Button>
        ) : null}

        <h1 className="min-w-0 flex-1 truncate text-base font-semibold text-foreground sm:text-lg">
          {title}
        </h1>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-end gap-1 sm:gap-2">
        {actionSlot}
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  )
}
